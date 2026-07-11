$ErrorActionPreference = "Stop"

$rootPath = Split-Path -Parent $PSScriptRoot
$port = 8081
$device = adb devices | Select-String "^emulator-.*\sdevice$"

if (-not $device) {
    Start-Process -FilePath emulator -ArgumentList @(
        "-avd",
        "lifechange_api36",
        "-no-snapshot-load",
        "-netdelay",
        "none",
        "-netspeed",
        "full"
    )
}

adb wait-for-device
$bootLimit = (Get-Date).AddMinutes(3)

do {
    $booted = (& adb shell getprop sys.boot_completed).Trim()

    if ($booted -eq "1") {
        break
    }

    Start-Sleep -Seconds 2
} while ((Get-Date) -lt $bootLimit)

if ($booted -ne "1") {
    throw "Android emulator boot timed out."
}

$metro = Get-NetTCPConnection -LocalPort $port -State Listen -ErrorAction SilentlyContinue

if ($metro) {
    $metro.OwningProcess | Sort-Object -Unique | ForEach-Object {
        Stop-Process -Id $_ -Force -ErrorAction SilentlyContinue
    }
    Start-Sleep -Seconds 1
}

& adb reverse "tcp:$port" "tcp:$port"

if ($LASTEXITCODE -ne 0) {
    throw "Could not forward Metro port $port to the emulator."
}

Push-Location $rootPath

try {
    & bunx react-native run-android --mode debug --no-packager

    if ($LASTEXITCODE -ne 0) {
        throw "react-native run-android failed with exit code $LASTEXITCODE."
    }

    & bunx react-native start
    exit $LASTEXITCODE
}
finally {
    Pop-Location
}
