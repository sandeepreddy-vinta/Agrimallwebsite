<#
    Build and deploy agrimall.io.

        cd "E:\San\WorkSpace\Claude WorkSpace\Agrimall Website"
        .\scripts\deploy.ps1

    Options:
        -SkipBuild      reuse the existing dist/ (after you have already built)
        -NoInvalidate   skip the CloudFront invalidation
        -WhatIf         print what would happen, change nothing

    Cache headers are not cosmetic. Vite fingerprints everything in assets/, so those
    files are immutable forever. index.html is NOT fingerprinted — it is the file that
    points at the new bundle. Cache it and visitors keep loading the old build even
    after an invalidation expires.
#>
[CmdletBinding(SupportsShouldProcess = $true)]
param(
    [switch]$SkipBuild,
    [switch]$NoInvalidate
)

$ErrorActionPreference = "Stop"
$root = Split-Path -Parent $PSScriptRoot
Set-Location $root

# ---- config ----------------------------------------------------------------
$configPath = Join-Path $root "deploy.config.json"
if (-not (Test-Path $configPath)) { throw "deploy.config.json not found in $root" }
$cfg = Get-Content $configPath -Raw | ConvertFrom-Json

foreach ($key in @("bucket", "distributionId")) {
    if ($cfg.$key -like "REPLACE-*" -or [string]::IsNullOrWhiteSpace($cfg.$key)) {
        throw "deploy.config.json: '$key' is not set. Run 'aws s3 ls' and 'aws cloudfront list-distributions' to find it."
    }
}

$bucket = $cfg.bucket
$dist   = $cfg.distributionId

# ---- preflight -------------------------------------------------------------
Write-Host "`n=== Preflight ===" -ForegroundColor Cyan

# Redirecting a native command's stderr turns it into an ErrorRecord, which
# $ErrorActionPreference = "Stop" then treats as terminating — so a missing
# credential would blow up here instead of reaching the check below. Relax the
# preference just for this call.
$identityJson = ""
try {
    $ErrorActionPreference = "SilentlyContinue"
    $identityJson = (aws sts get-caller-identity --output json 2>$null) -join ""
}
finally {
    $ErrorActionPreference = "Stop"
}

if ([string]::IsNullOrWhiteSpace($identityJson)) {
    # -WhatIf is meant to be runnable before the credentials exist, so that the
    # script itself can be checked first. A real deploy still stops here.
    if ($WhatIfPreference) {
        Write-Warning "AWS credentials not configured. The real run will stop here until 'aws configure' is done."
        Write-Host "  AWS identity : (unavailable)"
    }
    else {
        throw "AWS credentials not configured or expired. Run 'aws configure' (or 'aws configure sso') first."
    }
}
else {
    $identity = $identityJson | ConvertFrom-Json
    Write-Host "  AWS identity : $($identity.Arn)"
}
Write-Host "  Bucket       : s3://$bucket"
Write-Host "  Distribution : $dist"

# Entity details must be filled in — a placeholder reaching production is worse
# than a failed deploy, because it looks fine until a reviewer reads it.
$company = Get-Content (Join-Path $root "src\config\company.ts") -Raw
if ($company -match "\[NAME\]") {
    throw "src/config/company.ts still contains [NAME]. Set grievanceOfficer before deploying."
}

# The WhatsApp Cloud API number cannot receive a voice call or an SMS. If it
# ever ends up in phoneHref it becomes a tel: link in eight places, including
# the grievance officer contact that India's IT Rules require to be reachable.
if ($company -match 'phoneHref:\s*"\+?919493636363"') {
    throw "src/config/company.ts: phoneHref is the WhatsApp Cloud API number, which takes no calls. Use the office voice line."
}
if ($company -match 'phone(Display|Href):\s*"[^"]*[Xx]{3}') {
    throw "src/config/company.ts: phone number still contains a placeholder."
}
Write-Host "  company.ts   : no placeholders" -ForegroundColor Green

# ---- build -----------------------------------------------------------------
if (-not $SkipBuild) {
    Write-Host "`n=== Build ===" -ForegroundColor Cyan
    if ($PSCmdlet.ShouldProcess("dist/", "npm run build")) {
        # npm writes ordinary notices (the browserslist warning, for one) to
        # stderr. If the caller captures this script's output, PowerShell turns
        # each of those lines into an ErrorRecord, and "Stop" makes it fatal --
        # a successful build then looks like a failed one. Judge the build by
        # its exit code, which is the only thing that actually says.
        try {
            $ErrorActionPreference = "Continue"
            npm run build
        }
        finally {
            $ErrorActionPreference = "Stop"
        }
        if ($LASTEXITCODE -ne 0) { throw "Build failed." }
    }
}

$distDir  = Join-Path $root "dist"
$assetDir = Join-Path $distDir "assets"

# Under -WhatIf the build above did not actually run, so there may legitimately
# be no dist/ to audit. Skip rather than abort — aborting made the dry run
# impossible on a clean checkout.
if ($WhatIfPreference -and -not (Test-Path (Join-Path $distDir "index.html"))) {
    Write-Host "  bundle audit : skipped (no dist/ — nothing was built under -WhatIf)" -ForegroundColor Yellow
}
else {
    if (-not (Test-Path (Join-Path $distDir "index.html"))) { throw "dist/index.html missing — build first." }

    # Catch a stale Gmail address or leftover boilerplate before it ships.
    $jsFiles = @(Get-ChildItem -Path $assetDir -Filter *.js -ErrorAction SilentlyContinue)
    if ($jsFiles.Count -eq 0) { throw "No JS bundle in dist/assets — the build did not produce one." }
    $bundle = $jsFiles | ForEach-Object { Get-Content $_.FullName -Raw }

    foreach ($bad in @("sreemohanagrimall@gmail.com", "Lovable Generated")) {
        if ($bundle -match [regex]::Escape($bad)) { throw "Build contains '$bad' — fix before deploying." }
    }
    Write-Host "  bundle audit : clean" -ForegroundColor Green
}

# ---- upload ----------------------------------------------------------------
Write-Host "`n=== Upload ===" -ForegroundColor Cyan

if ($PSCmdlet.ShouldProcess("s3://$bucket", "sync dist/")) {
    # 1. Fingerprinted assets — cache forever.
    aws s3 sync (Join-Path $distDir "assets") "s3://$bucket/assets" --delete `
        --cache-control "public,max-age=31536000,immutable"
    if ($LASTEXITCODE -ne 0) { throw "assets sync failed." }

    # 2. Everything else except index.html — logo, favicon, robots.txt. Short cache,
    #    because these keep their filenames across releases.
    aws s3 sync "$distDir" "s3://$bucket" --delete `
        --exclude "assets/*" --exclude "index.html" `
        --cache-control "public,max-age=300"
    if ($LASTEXITCODE -ne 0) { throw "root sync failed." }

    # 3. index.html — never cached.
    aws s3 cp (Join-Path $distDir "index.html") "s3://$bucket/index.html" `
        --cache-control "no-cache,no-store,must-revalidate" `
        --content-type "text/html; charset=utf-8"
    if ($LASTEXITCODE -ne 0) { throw "index.html upload failed." }
}

# ---- invalidate ------------------------------------------------------------
if (-not $NoInvalidate) {
    Write-Host "`n=== Invalidate ===" -ForegroundColor Cyan
    if ($PSCmdlet.ShouldProcess($dist, "CloudFront invalidation /*")) {
        $inv = aws cloudfront create-invalidation --distribution-id $dist --paths "/*" --output json | ConvertFrom-Json
        Write-Host "  invalidation : $($inv.Invalidation.Id) ($($inv.Invalidation.Status))"
        Write-Host "  edges usually catch up within 1-2 minutes."
    }
}

Write-Host "`nDeployed. Now verify:" -ForegroundColor Green
Write-Host "  .\scripts\verify-live.ps1`n"

# Without this the script inherits $LASTEXITCODE from the last native
# command, which can be non-zero even on a clean run.
exit 0
