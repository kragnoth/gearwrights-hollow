#!/usr/bin/env python3
"""Gearwright's Hollow build script. Needs only Python 3.8+ (no extra packages).

  python3 build.py [version]     check, then build dist/Gearwrights_Hollow_<version>.zip (CurseForge client pack)
                                 and dist/Gearwrights_Hollow_Server_<version>.zip (dedicated server)
  python3 build.py check         only run the checks
  python3 build.py add-mod URL   add or update a server mod from its CurseForge download URL
                                 (https://edge.forgecdn.net/files/1234/567/name.jar), with its SHA-1

<version> defaults to the "version" in pack/manifest.json. Quote versions with spaces: python3 build.py "1.0.7 Alpha"
"""
import hashlib, json, os, re, sys, urllib.request, zipfile
from pathlib import Path

ROOT = Path(__file__).resolve().parent
PACK = ROOT / "pack"
OVERRIDES = PACK / "overrides"
SERVER = ROOT / "server"
DIST = ROOT / "dist"

# CurseForge project IDs of mods that crash a dedicated server, so they're not in server/server-mods.txt
CLIENT_ONLY = {1422344: "Create JEI Compat", 1242344: "Easy Auto Cycler", 394468: "Sodium",
               511319: "Reese's Sodium Options", 1371053: "Saros Boosted Brightness", 557076: "Freecam",
               854213: "Colorful Hearts"}
# Files the game rewrites at runtime; never packed even if they exist locally
SKIP = re.compile(r"(^|/)\.bak\.|\.bak\.\d+$|^config/jei/world/|^config/wastelandvision/(\.generated/|mappings-)")
# Folders of the client pack that the server zip also needs
SERVER_PARTS = ("config/", "defaultconfigs/", "kubejs/")


def manifest():
    return json.loads((PACK / "manifest.json").read_text(encoding="utf-8"))


def override_files():
    for f in sorted(OVERRIDES.rglob("*")):
        rel = f.relative_to(OVERRIDES).as_posix()
        if f.is_file() and not SKIP.search(rel):
            yield f, rel


# ------------------------------------------------------------------------------------------------ checks
def check_json(errs):
    n = 0
    for f, rel in override_files():
        if rel.startswith("kubejs/") and f.suffix in (".json", ".mcmeta"):   # (mod configs may be JSON5 with comments)
            n += 1
            try:
                json.loads(f.read_text(encoding="utf-8"))
            except Exception as e:
                errs.append(f"{rel}: invalid JSON ({e})")
    return n


def check_structures(errs):
    """Every structure a dying_world structure set names must exist, with its biome tag."""
    data = OVERRIDES / "kubejs/data"
    for f in sorted((data / "dying_world/worldgen/structure_set").glob("*.json")):
        j = json.loads(f.read_text(encoding="utf-8"))
        for e in j.get("structures", []):
            ns, _, sid = e["structure"].partition(":")
            if ns != "dying_world":
                continue
            sf = data / ns / "worldgen/structure" / f"{sid}.json"
            if not sf.exists():
                errs.append(f"{f.name}: missing structure {e['structure']}")
                continue
            b = json.loads(sf.read_text(encoding="utf-8")).get("biomes", "")
            if isinstance(b, str) and b.startswith("#dying_world:"):
                if not (data / "dying_world/tags/worldgen/biome" / f"{b.split(':', 1)[1]}.json").exists():
                    errs.append(f"{sf.name}: missing biome tag {b}")
        pl = j.get("placement", {})
        if pl.get("spacing", 1) <= pl.get("separation", 0):
            errs.append(f"{f.name}: spacing must be greater than separation")


def _strip_js(src):
    """Blank out comments and string literals, keeping offsets."""
    out, i, n = list(src), 0, len(src)
    while i < n:
        if src.startswith("//", i):
            j = src.find("\n", i); j = n if j < 0 else j
        elif src.startswith("/*", i):
            j = src.find("*/", i + 2); j = n if j < 0 else j + 2
        elif src[i] in "'\"`":
            j = i + 1
            while j < n and src[j] != src[i]:
                j += 2 if src[j] == "\\" else 1
            j += 1
        else:
            i += 1; continue
        out[i:j] = [c if c == "\n" else " " for c in src[i:j]]; i = j
    return "".join(out)


def _block(s, i):
    """Span of the body starting at or after i (a {...} block or a single line)."""
    while i < len(s) and s[i].isspace():
        i += 1
    if i < len(s) and s[i] == "{":
        d = 0
        for j in range(i, len(s)):
            d += {"{": 1, "}": -1}.get(s[j], 0)
            if d == 0:
                return i, j
    j = s.find("\n", i)
    return i, len(s) if j < 0 else j


def check_kubejs(errs):
    """Rhino (KubeJS 2101): `const` inside a loop or try block breaks at runtime. Use `let` there."""
    for f in sorted((OVERRIDES / "kubejs").rglob("*.js")):
        src = f.read_text(encoding="utf-8", errors="replace"); s = _strip_js(src)
        for m in re.finditer(r"\b(?:for|while)\s*\(|\btry\b", s):
            i = m.end()
            if m.group(0) != "try":                       # skip the loop header (...)
                d = 1
                while i < len(s) and d:
                    d += {"(": 1, ")": -1}.get(s[i], 0); i += 1
            a, b = _block(s, i)
            for c in re.finditer(r"\bconst\b", s[a:b]):
                line = src.count("\n", 0, a + c.start()) + 1
                errs.append(f"{f.relative_to(OVERRIDES).as_posix()}:{line}: use let, not const, inside loops/try")


def server_mods():
    """[(sha1, url, fileID)] from server/server-mods.txt"""
    out = []
    for line in (SERVER / "server-mods.txt").read_text(encoding="utf-8").splitlines():
        if line.strip() and not line.startswith("#"):
            sha, url = line.split()[:2]
            a, b = re.search(r"/files/(\d+)/(\d+)/", url).groups()
            out.append((sha, url, int(a) * 1000 + int(b)))
    return out


def check_server_mods(errs):
    """server-mods.txt = manifest minus CLIENT_ONLY minus resource packs (manifest projects modlist.html doesn't list)."""
    man = {f["fileID"]: f["projectID"] for f in manifest()["files"]}
    srv = {fid for _, _, fid in server_mods()}
    for fid in sorted(srv - set(man)):
        errs.append(f"server-mods.txt: file {fid} is not in pack/manifest.json (old version? run add-mod with the new URL)")
    listed = {int(p) for p in re.findall(r"curseforge\.com/projects/(\d+)", (PACK / "modlist.html").read_text(encoding="utf-8"))}
    packs = {p for p in man.values() if p not in listed}
    for fid in sorted(set(man) - srv):
        p = man[fid]
        if p not in CLIENT_ONLY and p not in packs:
            errs.append(f"server-mods.txt: project {p} file {fid} is missing (python3 build.py add-mod <its download URL>), "
                        "or add it to CLIENT_ONLY in build.py if it crashes a server")
    for fid in sorted(srv & set(man)):
        if man[fid] in CLIENT_ONLY:
            errs.append(f"server-mods.txt: {CLIENT_ONLY[man[fid]]} is client-only and crashes a server")
    return len(srv)


def check():
    errs = []
    nj = check_json(errs)
    check_structures(errs)
    check_kubejs(errs)
    ns = check_server_mods(errs)
    print(f"checked {nj} JSON files, KubeJS scripts, structure sets, {ns} server mods")
    if errs:
        print("\n".join(errs))
        sys.exit(f"{len(errs)} problem(s) found")
    print("OK")


# ------------------------------------------------------------------------------------------------ build
def build(version):
    check()
    DIST.mkdir(exist_ok=True)
    tag = version.replace(" ", "_")
    man = manifest(); man["version"] = version
    client = DIST / f"Gearwrights_Hollow_{tag}.zip"
    with zipfile.ZipFile(client, "w", zipfile.ZIP_DEFLATED) as z:
        z.writestr("manifest.json", json.dumps(man, indent=2) + "\n")
        z.write(PACK / "modlist.html", "modlist.html")
        files = list(override_files())
        for f, rel in files:
            z.write(f, "overrides/" + rel)
    print(f"wrote {client} ({len(files)} override files)")

    server = DIST / f"Gearwrights_Hollow_Server_{tag}.zip"
    n = 0
    with zipfile.ZipFile(server, "w", zipfile.ZIP_DEFLATED) as z:
        for f in sorted(SERVER.iterdir()):
            if not f.is_file():
                continue
            if f.name == "README.txt":                    # "server files (x.y.z)" -> this version
                z.writestr(f.name, re.sub(r"\(\d[^)]*\)", f"({version})", f.read_text(encoding="utf-8"), count=1))
            else:
                info = zipfile.ZipInfo(f.name, (1980, 1, 1, 0, 0, 0))
                info.external_attr = (0o755 if f.suffix == ".sh" else 0o644) << 16   # start.sh stays executable
                z.writestr(info, f.read_bytes(), zipfile.ZIP_DEFLATED)
            n += 1
        for f, rel in override_files():
            # jars in overrides/mods are mods that aren't on CurseForge; the server needs them too
            if rel.startswith(SERVER_PARTS) or (rel.startswith("mods/") and rel.endswith(".jar")):
                z.write(f, rel); n += 1
    print(f"wrote {server} ({n} files)")


def add_mod(url):
    m = re.match(r"https://edge\.forgecdn\.net/files/(\d+)/(\d+)/([^/]+\.jar)$", url)
    if not m:
        sys.exit("expected https://edge.forgecdn.net/files/<first digits>/<last 3 digits>/<file>.jar")
    fid = int(m.group(1)) * 1000 + int(m.group(2))
    print(f"downloading {m.group(3)} ...")
    with urllib.request.urlopen(url) as r:
        sha = hashlib.sha1(r.read()).hexdigest()
    projects = {f["fileID"]: f["projectID"] for f in manifest()["files"]}
    if fid not in projects:
        print("note: this file ID is not in pack/manifest.json yet; copy in the manifest.json from your CurseForge export first")
    rows = []
    for s, u, f in server_mods():
        if u == url:
            continue
        if fid in projects and f not in projects:        # manifest moved on: an old version of this or another mod
            print(f"removed old entry {u.rsplit('/', 1)[1]} (not in pack/manifest.json)")
            continue
        rows.append((s, u))
    rows.append((sha, url))
    rows.sort(key=lambda r: r[1].rsplit("/", 1)[1].lower())
    head = [l + "\n" for l in (SERVER / "server-mods.txt").read_text(encoding="utf-8").splitlines() if l.startswith("#")]
    (SERVER / "server-mods.txt").write_text("".join(head) + "".join(f"{s} {u}\n" for s, u in rows), encoding="utf-8")
    print(f"server-mods.txt: {m.group(3)} {sha}")


if __name__ == "__main__":
    os.chdir(ROOT)
    args = sys.argv[1:]
    if args[:1] == ["check"]:
        check()
    elif args[:1] == ["add-mod"] and len(args) == 2:
        add_mod(args[1])
    elif len(args) <= 1 and not (args and args[0].startswith("-")):
        build(args[0] if args else manifest().get("version", "dev"))
    else:
        print(__doc__); sys.exit(1)
