#!/usr/bin/env bash
# Gearwright's Hollow server: downloads the mods (checked by SHA-1), installs NeoForge on first run, starts the server.
cd "$(dirname "$0")"
NF=21.1.262
mkdir -p mods
TRACK=mods/.server-mods-installed      # jars this script installed (so updates can remove old versions)
sha1() { if command -v sha1sum >/dev/null 2>&1; then sha1sum "$1" | cut -d' ' -f1; else shasum -a 1 "$1" | cut -d' ' -f1; fi; }
# remove jars installed by an earlier version of these server files that are no longer listed
wanted=$(grep -v '^#' server-mods.txt | while read -r s u; do [ -n "$u" ] && e="${u##*/}" && printf '%b\n' "${e//%/\\x}"; done)
if [ -f "$TRACK" ]; then
  while IFS= read -r old; do
    [ -n "$old" ] || continue
    if ! printf '%s\n' "$wanted" | grep -qxF -- "$old" && [ -f "mods/$old" ]; then echo "Removing old $old"; rm -f "mods/$old"; fi
  done < "$TRACK"
fi
fail=0
while read -r sum url; do
  case "$sum" in ''|\#*) continue ;; esac
  enc="${url##*/}"; name=$(printf '%b' "${enc//%/\\x}")
  dst="mods/$name"
  if [ -f "$dst" ] && [ "$(sha1 "$dst")" = "$sum" ]; then continue; fi
  echo "Downloading $name"
  if ! curl -fsSL --retry 3 -o "$dst.part" "$url" || [ "$(sha1 "$dst.part")" != "$sum" ]; then
    echo "  FAILED: $name"; rm -f "$dst.part"; fail=1; continue
  fi
  mv "$dst.part" "$dst"
done < server-mods.txt
if [ "$fail" != 0 ]; then echo "Some mods failed to download. Run start.sh again to retry."; exit 1; fi
printf '%s\n' "$wanted" > "$TRACK"

if [ ! -f run.sh ]; then
  echo "Installing NeoForge $NF"
  curl -fsSL -o neoforge-installer.jar "https://maven.neoforged.net/releases/net/neoforged/neoforge/$NF/neoforge-$NF-installer.jar" || exit 1
  java -jar neoforge-installer.jar --install-server . || exit 1
  rm -f neoforge-installer.jar neoforge-installer.jar.log
fi
grep -qs '^-Xmx' user_jvm_args.txt || printf -- '\n-Xms4G\n-Xmx8G\n' >> user_jvm_args.txt

if ! grep -qs "eula=true" eula.txt; then
  echo "Read https://aka.ms/MinecraftEULA, then set eula=true in eula.txt and run start.sh again."
  echo "eula=false" > eula.txt
  exit 1
fi
exec bash run.sh nogui
