<#
    Check the live site the way a verification reviewer's tooling does — by status
    code, not by eye.

        cd "E:\San\WorkSpace\Claude WorkSpace\Agrimall Website"
        .\scripts\verify-live.ps1

    A deep link that renders correctly while returning 404 is the specific failure
    this catches. CloudFront can rewrite the path to /index.html and still pass the
    original 404 status through; the page looks perfect in a browser and reads as
    missing to Meta and Google.
#>
param([string]$BaseUrl)

$ErrorActionPreference = "Stop"
$root = Split-Path -Parent $PSScriptRoot
$cfg  = Get-Content (Join-Path $root "deploy.config.json") -Raw | ConvertFrom-Json
if (-not $BaseUrl) { $BaseUrl = $cfg.siteUrl }

Write-Host "`nChecking $BaseUrl`n" -ForegroundColor Cyan

$failed = $false
foreach ($route in $cfg.routes) {
    $url = if ($route -eq "/") { $BaseUrl.TrimEnd("/") } else { $BaseUrl.TrimEnd("/") + $route }
    $code = & curl.exe -s -o NUL -w "%{http_code}" --max-time 20 $url
    $ok   = ($code -eq "200")
    if (-not $ok) { $failed = $true }
    $colour = if ($ok) { "Green" } else { "Red" }
    "{0,-40} {1}" -f $url, $code | Write-Host -ForegroundColor $colour
}

# The footer must carry the entity details a reviewer compares with the GST
# certificate. Rendered client-side, so fetch and check the bundle instead.
Write-Host "`nChecking published entity details" -ForegroundColor Cyan
$html = & curl.exe -s --max-time 20 $BaseUrl
$assetMatch = [regex]::Match($html, '/assets/(index-[A-Za-z0-9_-]+\.js)')
if ($assetMatch.Success) {
    $js = & curl.exe -s --max-time 30 "$BaseUrl/assets/$($assetMatch.Groups[1].Value)"
    $checks = @{
        "Legal name"      = "Sree Mohan Agri Mall"
        "GSTIN"           = "37AELFS0346C1Z5"
        "Domain email"    = "agrimall@agrimall.io"
        "Grievance block" = "Grievance Officer"
    }
    foreach ($k in $checks.Keys | Sort-Object) {
        $present = $js -match [regex]::Escape($checks[$k])
        if (-not $present) { $failed = $true }
        "{0,-40} {1}" -f $k, $(if ($present) { "present" } else { "MISSING" }) |
            Write-Host -ForegroundColor $(if ($present) { "Green" } else { "Red" })
    }
    if ($js -match "sreemohanagrimall@gmail\.com") {
        $failed = $true
        "{0,-40} {1}" -f "Stale Gmail address", "PRESENT — should be removed" | Write-Host -ForegroundColor Red
    }
} else {
    Write-Host "  could not locate the JS bundle from $BaseUrl" -ForegroundColor Yellow
}

if ($failed) {
    Write-Host "`nNot ready to submit for verification.`n" -ForegroundColor Red
    exit 1
}
Write-Host "`nAll checks passed — the website half of verification is ready.`n" -ForegroundColor Green
