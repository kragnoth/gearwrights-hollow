# Gearwright's Hollow server (Windows): downloads the mods (checked by SHA-1) and installs NeoForge on first run.
$ErrorActionPreference = 'Stop'
$ProgressPreference = 'SilentlyContinue'
Set-Location $PSScriptRoot
$NF = '21.1.262'
New-Item -ItemType Directory -Force mods | Out-Null
$track = Join-Path 'mods' '.server-mods-installed'   # jars this script installed (so updates can remove old versions)
$wanted = @(Get-Content server-mods.txt | Where-Object { $_ -notmatch '^\s*(#|$)' } | ForEach-Object { [uri]::UnescapeDataString((($_ -split '\s+', 2)[1] -split '/')[-1]) })
if (Test-Path -LiteralPath $track) {
    foreach ($old in Get-Content -LiteralPath $track) {
        if ($old -and ($wanted -notcontains $old) -and (Test-Path -LiteralPath (Join-Path 'mods' $old))) {
            Write-Host "Removing old $old"; Remove-Item -LiteralPath (Join-Path 'mods' $old)
        }
    }
}
$failed = $false
foreach ($line in Get-Content server-mods.txt) {
    if ($line -match '^\s*(#|$)') { continue }
    $sum, $url = $line -split '\s+', 2
    $name = [uri]::UnescapeDataString(($url -split '/')[-1])
    $dst = Join-Path 'mods' $name
    if ((Test-Path -LiteralPath $dst) -and ((Get-FileHash -LiteralPath $dst -Algorithm SHA1).Hash.ToLower() -eq $sum)) { continue }
    Write-Host "Downloading $name"
    try {
        Invoke-WebRequest -Uri $url -OutFile "$dst.part" -UseBasicParsing
        if ((Get-FileHash -LiteralPath "$dst.part" -Algorithm SHA1).Hash.ToLower() -ne $sum) { throw 'checksum mismatch' }
        Move-Item -Force -LiteralPath "$dst.part" -Destination $dst
    } catch {
        Write-Host "  FAILED: $name ($_)"
        Remove-Item -ErrorAction SilentlyContinue -LiteralPath "$dst.part"
        $failed = $true
    }
}
if ($failed) { Write-Host 'Some mods failed to download. Run start.bat again to retry.'; exit 1 }
Set-Content -LiteralPath $track -Value $wanted
if (-not (Test-Path run.bat)) {
    Write-Host "Installing NeoForge $NF"
    Invoke-WebRequest -Uri "https://maven.neoforged.net/releases/net/neoforged/neoforge/$NF/neoforge-$NF-installer.jar" -OutFile neoforge-installer.jar -UseBasicParsing
    & java -jar neoforge-installer.jar --install-server .
    if ($LASTEXITCODE -ne 0) { exit 1 }
    Remove-Item -ErrorAction SilentlyContinue neoforge-installer.jar, neoforge-installer.jar.log
}
if (-not ((Test-Path user_jvm_args.txt) -and (Select-String -Path user_jvm_args.txt -Pattern '^-Xmx' -Quiet))) {
    Add-Content user_jvm_args.txt "`r`n-Xms4G`r`n-Xmx8G"
}
exit 0
