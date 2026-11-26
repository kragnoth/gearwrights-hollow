# Gearwright's Hollow

A Minecraft 1.21.1 NeoForge modpack by Kragnoth. This repo is the streamlined build edition of
[dying_world](https://github.com/kragnoth/dying_world), which stays as the archive and holds the original
structure generators. Everything here is the finished pack, so building it needs nothing but Python.

## Layout

| Path | What it is |
|---|---|
| `pack/manifest.json`, `pack/modlist.html` | The mod list, exactly as a CurseForge export writes it |
| `pack/overrides/` | Everything that goes into the instance folder: `config/`, `defaultconfigs/`, `kubejs/` (scripts, assets and the whole datapack in `kubejs/data/`), `resourcepacks/`, `options.txt` |
| `server/` | Dedicated-server files: start scripts, `server-mods.txt` (SHA-1 + CurseForge URL per mod), README |
| `build.py` | Checks the pack and builds both zips |
| `docs/` | CurseForge page and logo |

## Build

Needs Python 3.8 or newer, nothing else.

```sh
python3 build.py                  # version from pack/manifest.json
python3 build.py "1.0.7 Alpha"    # or name it
```

The zips land in `dist/`:

- `Gearwrights_Hollow_<version>.zip`: the client pack. Import it into CurseForge, Prism or another launcher, or upload it to CurseForge.
- `Gearwrights_Hollow_Server_<version>.zip`: the server. Unzip it and run `start.sh` or `start.bat`. It downloads the mods and NeoForge itself.

`python3 build.py check` runs only the checks:
- the datapack JSON is valid;
- every Dying World structure exists;
- the KubeJS scripts have no `const` inside loops or `try` blocks, which breaks Rhino;
- `server-mods.txt` matches the manifest.

No Python? Open the repo's **Actions** tab, pick **build**, then **Run workflow**. It makes a GitHub release with both zips attached.

## Changing the pack

**Configs, scripts and data.** Edit the files under `pack/overrides/`, or copy them over from your test instance (Prism: `instances/<name>/minecraft/`). The folders line up one to one.

**Adding, removing or updating mods.**
1. Change the mods in your launcher instance and export it for CurseForge.
2. Copy the export's `manifest.json` and `modlist.html` into `pack/`.
3. For each new or updated mod, find its file on CurseForge, copy the download link (`https://edge.forgecdn.net/files/…/….jar`) and run:
   ```sh
   python3 build.py add-mod https://edge.forgecdn.net/files/9828/689/cultivar-0.2.16.jar
   ```
   This adds the mod to `server/server-mods.txt` with its SHA-1 and drops the version it replaces.
4. For a removed mod, delete its line from `server/server-mods.txt`.
5. Run `python3 build.py check`. It names anything still missing.

A mod that crashes a dedicated server goes into `CLIENT_ONLY` at the top of `build.py` instead. Resource packs never go into `server-mods.txt`; the check tells them apart by their absence from `modlist.html`.

Jars that aren't on CurseForge go in `pack/overrides/mods/`. They ship in both zips.
