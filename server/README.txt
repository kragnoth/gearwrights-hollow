Gearwright's Hollow - server files (1.0.3 Alpha)

Requirements: Java 21 and an internet connection on first start. 8 GB RAM for the server
(user_jvm_args.txt).

1. Unzip into an empty folder.
2. Run start.sh (Linux/macOS) or start.bat (Windows). It downloads the mods from CurseForge
   (each file checked against its SHA-1) and installs NeoForge 21.1.262. This takes a few minutes.
3. Accept the Minecraft EULA by setting eula=true in eula.txt, then run the start script again.

Later starts skip anything already downloaded. If a download fails, run the script again.
When you update to newer server files, unzip them over the old ones: old mod versions the
script installed are removed automatically. Mods you added yourself are left alone.

Players use the normal client pack. These client-only mods crash a dedicated server and are
not part of the server: Create JEI Compat, Easy Auto Cycler, Sodium, Reese's Sodium Options,
Saros Boosted Brightness and Freecam.
