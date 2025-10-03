# MoHUA Dashboard - Automatic Git Installation and Push Script
# This script will download, install Git, and push the code to GitHub

Write-Host "========================================" -ForegroundColor Green
Write-Host "MoHUA Dashboard - Auto Install & Push" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green
Write-Host ""

# Check if running as administrator
$isAdmin = ([Security.Principal.WindowsPrincipal] [Security.Principal.WindowsIdentity]::GetCurrent()).IsInRole([Security.Principal.WindowsBuiltInRole] "Administrator")

if (-not $isAdmin) {
    Write-Host "This script needs to run as Administrator to install Git." -ForegroundColor Red
    Write-Host "Please right-click PowerShell and select 'Run as Administrator'" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "Alternative: Use the GitHub Web Interface method instead:" -ForegroundColor Cyan
    Write-Host "1. Go to: https://github.com/A-Pag-org/MoHUA-Dashboard" -ForegroundColor White
    Write-Host "2. Click 'Add file' -> 'Upload files'" -ForegroundColor White
    Write-Host "3. Drag and drop all files from this folder" -ForegroundColor White
    Write-Host ""
    Read-Host "Press Enter to exit"
    exit 1
}

Write-Host "Running as Administrator. Proceeding with Git installation..." -ForegroundColor Green
Write-Host ""

# Download and install Git
Write-Host "Downloading Git for Windows..." -ForegroundColor Yellow
$gitUrl = "https://github.com/git-for-windows/git/releases/download/v2.51.0.windows.1/Git-2.51.0-64-bit.exe"
$gitInstaller = "$env:TEMP\Git-installer.exe"

try {
    Invoke-WebRequest -Uri $gitUrl -OutFile $gitInstaller -UseBasicParsing
    Write-Host "Git downloaded successfully!" -ForegroundColor Green
    
    Write-Host "Installing Git (this may take a few minutes)..." -ForegroundColor Yellow
    Start-Process -FilePath $gitInstaller -ArgumentList "/VERYSILENT", "/NORESTART", "/NOCANCEL", "/SP-", "/CLOSEAPPLICATIONS", "/RESTARTAPPLICATIONS", "/COMPONENTS=icons,ext\reg\shellhere,assoc,assoc_sh" -Wait
    
    Write-Host "Git installation completed!" -ForegroundColor Green
    
    # Refresh PATH environment variable
    $env:Path = [System.Environment]::GetEnvironmentVariable("Path","Machine") + ";" + [System.Environment]::GetEnvironmentVariable("Path","User")
    
    # Wait a moment for PATH to update
    Start-Sleep -Seconds 3
    
    # Verify Git installation
    try {
        $gitVersion = git --version
        Write-Host "Git installed successfully: $gitVersion" -ForegroundColor Green
    } catch {
        Write-Host "Git installation may need a system restart to work properly." -ForegroundColor Yellow
        Write-Host "Please restart your computer and run this script again." -ForegroundColor Yellow
        Read-Host "Press Enter to exit"
        exit 1
    }
    
} catch {
    Write-Host "Failed to download or install Git: $($_.Exception.Message)" -ForegroundColor Red
    Write-Host "Please install Git manually from: https://git-scm.com/download/win" -ForegroundColor Yellow
    Read-Host "Press Enter to exit"
    exit 1
}

Write-Host ""
Write-Host "Proceeding with Git operations..." -ForegroundColor Green

# Initialize Git repository
Write-Host "Initializing Git repository..." -ForegroundColor Yellow
git init

# Add remote repository
Write-Host "Adding remote repository..." -ForegroundColor Yellow
git remote add origin https://github.com/A-Pag-org/MoHUA-Dashboard.git

# Add all files
Write-Host "Adding all files..." -ForegroundColor Yellow
git add .

# Commit changes
Write-Host "Committing changes..." -ForegroundColor Yellow
git commit -m "Complete Landing Page implementation with React, TypeScript, and Material-UI

- ✅ Header component with MoHUA branding and DSP/C&D/MRS navigation
- ✅ Hero Section with leading cities performance tiles
- ✅ Stats Overview with double bar charts for each program
- ✅ Quick Access navigation tiles
- ✅ Responsive design with Material-UI components
- ✅ Color-coded performance indicators (Green/Amber/Red)
- ✅ TypeScript interfaces and type safety
- ✅ Vercel deployment configuration
- ✅ Complete project structure ready for DSP dashboard development"

# Push to GitHub
Write-Host "Pushing to GitHub..." -ForegroundColor Yellow
git push -u origin main

Write-Host ""
Write-Host "========================================" -ForegroundColor Green
Write-Host "SUCCESS! Push completed successfully!" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green
Write-Host ""
Write-Host "Your MoHUA Dashboard is now live on GitHub!" -ForegroundColor Cyan
Write-Host "Repository: https://github.com/A-Pag-org/MoHUA-Dashboard" -ForegroundColor Cyan
Write-Host ""
Write-Host "Next steps:" -ForegroundColor Yellow
Write-Host "1. Go to https://vercel.com" -ForegroundColor White
Write-Host "2. Sign in with GitHub" -ForegroundColor White
Write-Host "3. Import your repository" -ForegroundColor White
Write-Host "4. Deploy to Vercel" -ForegroundColor White
Write-Host ""
Write-Host "Your dashboard will be live at: https://mohua-dashboard.vercel.app" -ForegroundColor Green
Write-Host ""

# Clean up
if (Test-Path $gitInstaller) {
    Remove-Item $gitInstaller -Force
}

Read-Host "Press Enter to exit"
