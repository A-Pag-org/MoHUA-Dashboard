# MoHUA Dashboard - File Verification Script
# This script checks if all required files are present for deployment

Write-Host "========================================" -ForegroundColor Green
Write-Host "MoHUA Dashboard - File Verification" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green
Write-Host ""

$requiredFiles = @(
    "package.json",
    "vite.config.ts", 
    "tsconfig.json",
    "tsconfig.node.json",
    "index.html",
    "vercel.json",
    "README.md",
    ".gitignore"
)

$requiredFolders = @(
    "src",
    "src/components",
    "src/components/Common",
    "src/pages",
    "src/pages/LandingPage",
    "src/pages/DSP",
    "src/types",
    "src/utils"
)

$requiredSrcFiles = @(
    "src/App.tsx",
    "src/main.tsx",
    "src/components/Common/Header.tsx",
    "src/pages/LandingPage/LandingPage.tsx",
    "src/pages/LandingPage/HeroSection.tsx",
    "src/pages/LandingPage/StatsOverview.tsx",
    "src/pages/LandingPage/QuickAccess.tsx",
    "src/pages/DSP/DSPDashboard.tsx",
    "src/types/index.ts",
    "src/utils/constants.ts"
)

Write-Host "Checking root files..." -ForegroundColor Yellow
$missingFiles = @()
foreach ($file in $requiredFiles) {
    if (Test-Path $file) {
        Write-Host "✅ $file" -ForegroundColor Green
    } else {
        Write-Host "❌ $file - MISSING" -ForegroundColor Red
        $missingFiles += $file
    }
}

Write-Host ""
Write-Host "Checking folders..." -ForegroundColor Yellow
foreach ($folder in $requiredFolders) {
    if (Test-Path $folder) {
        Write-Host "✅ $folder/" -ForegroundColor Green
    } else {
        Write-Host "❌ $folder/ - MISSING" -ForegroundColor Red
        $missingFiles += $folder
    }
}

Write-Host ""
Write-Host "Checking src files..." -ForegroundColor Yellow
foreach ($file in $requiredSrcFiles) {
    if (Test-Path $file) {
        Write-Host "✅ $file" -ForegroundColor Green
    } else {
        Write-Host "❌ $file - MISSING" -ForegroundColor Red
        $missingFiles += $file
    }
}

Write-Host ""
Write-Host "========================================" -ForegroundColor Green

if ($missingFiles.Count -eq 0) {
    Write-Host "🎉 ALL FILES READY FOR DEPLOYMENT!" -ForegroundColor Green
    Write-Host ""
    Write-Host "Next steps:" -ForegroundColor Yellow
    Write-Host "1. Go to: https://github.com/A-Pag-org/MoHUA-Dashboard" -ForegroundColor White
    Write-Host "2. Click 'Add file' -> 'Upload files'" -ForegroundColor White
    Write-Host "3. Drag and drop ALL files from this folder" -ForegroundColor White
    Write-Host "4. Commit and deploy to Vercel" -ForegroundColor White
} else {
    Write-Host "⚠️  MISSING FILES DETECTED!" -ForegroundColor Red
    Write-Host ""
    Write-Host "Missing files:" -ForegroundColor Yellow
    foreach ($file in $missingFiles) {
        Write-Host "  - $file" -ForegroundColor Red
    }
    Write-Host ""
    Write-Host "Please ensure all files are created before deployment." -ForegroundColor Yellow
}

Write-Host ""
Write-Host "Current directory: $PWD" -ForegroundColor Gray
Write-Host ""
Read-Host "Press Enter to exit"
