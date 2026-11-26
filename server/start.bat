@echo off
rem Gearwright's Hollow server: downloads the mods, installs NeoForge on first run, starts the server.
cd /d "%~dp0"
powershell -NoProfile -ExecutionPolicy Bypass -File "%~dp0install.ps1"
if errorlevel 1 (
  pause
  exit /b 1
)
findstr /c:"eula=true" eula.txt >nul 2>&1
if errorlevel 1 (
  echo Read https://aka.ms/MinecraftEULA, then set eula=true in eula.txt and run start.bat again.
  echo eula=false> eula.txt
  pause
  exit /b 1
)
call run.bat nogui
