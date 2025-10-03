<<<<<<< HEAD
# MoHUA Dashboard - Simple Push Script (No Admin Required)
# This script will try to use existing Git or guide you to install it

Write-Host "========================================" -ForegroundColor Green
Write-Host "MoHUA Dashboard - Simple Push Script" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green
Write-Host ""

# Check if Git is available
Write-Host "Checking for Git installation..." -ForegroundColor Yellow
try {
    $gitVersion = git --version
    Write-Host "Git found: $gitVersion" -ForegroundColor Green
    $gitAvailable = $true
} catch {
    Write-Host "Git not found. Let's try to find it..." -ForegroundColor Yellow
    $gitAvailable = $false
    
    # Try common Git installation paths
    $gitPaths = @(
        "C:\Program Files\Git\bin\git.exe",
        "C:\Program Files (x86)\Git\bin\git.exe",
        "$env:USERPROFILE\AppData\Local\Programs\Git\bin\git.exe"
    )
    
    foreach ($path in $gitPaths) {
        if (Test-Path $path) {
            Write-Host "Found Git at: $path" -ForegroundColor Green
            $env:Path += ";$(Split-Path $path)"
            try {
                $gitVersion = git --version
                Write-Host "Git working: $gitVersion" -ForegroundColor Green
                $gitAvailable = $true
                break
            } catch {
                Write-Host "Git found but not working from this path" -ForegroundColor Yellow
            }
        }
    }
}

if (-not $gitAvailable) {
    Write-Host ""
    Write-Host "Git is not installed or not in PATH." -ForegroundColor Red
    Write-Host ""
    Write-Host "Please choose one of these options:" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "Option 1: Install Git manually" -ForegroundColor Cyan
    Write-Host "1. Download from: https://git-scm.com/download/win" -ForegroundColor White
    Write-Host "2. Install with default settings" -ForegroundColor White
    Write-Host "3. Restart PowerShell and run this script again" -ForegroundColor White
    Write-Host ""
    Write-Host "Option 2: Use GitHub Web Interface (Recommended)" -ForegroundColor Cyan
    Write-Host "1. Go to: https://github.com/A-Pag-org/MoHUA-Dashboard" -ForegroundColor White
    Write-Host "2. Click 'Add file' -> 'Upload files'" -ForegroundColor White
    Write-Host "3. Drag and drop ALL files from this folder:" -ForegroundColor White
    Write-Host "   $PWD" -ForegroundColor Gray
    Write-Host "4. Commit with message: 'Complete Landing Page implementation'" -ForegroundColor White
    Write-Host ""
    Write-Host "Option 3: Run as Administrator" -ForegroundColor Cyan
    Write-Host "Right-click PowerShell -> 'Run as Administrator' -> Run install-and-push.ps1" -ForegroundColor White
    Write-Host ""
    Read-Host "Press Enter to exit"
    exit 1
}

Write-Host ""
Write-Host "Git is available! Proceeding with push..." -ForegroundColor Green
Write-Host ""

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
Read-Host "Press Enter to exit"
=======
# MoHUA Dashboard - Simple Push Script (No Admin Required)
# This script will try to use existing Git or guide you to install it

Write-Host "========================================" -ForegroundColor Green
Write-Host "MoHUA Dashboard - Simple Push Script" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green
Write-Host ""

# Check if Git is available
Write-Host "Checking for Git installation..." -ForegroundColor Yellow
try {
    $gitVersion = git --version
    Write-Host "Git found: $gitVersion" -ForegroundColor Green
    $gitAvailable = $true
} catch {
    Write-Host "Git not found. Let's try to find it..." -ForegroundColor Yellow
    $gitAvailable = $false
    
    # Try common Git installation paths
    $gitPaths = @(
        "C:\Program Files\Git\bin\git.exe",
        "C:\Program Files (x86)\Git\bin\git.exe",
        "$env:USERPROFILE\AppData\Local\Programs\Git\bin\git.exe"
    )
    
    foreach ($path in $gitPaths) {
        if (Test-Path $path) {
            Write-Host "Found Git at: $path" -ForegroundColor Green
            $env:Path += ";$(Split-Path $path)"
            try {
                $gitVersion = git --version
                Write-Host "Git working: $gitVersion" -ForegroundColor Green
                $gitAvailable = $true
                break
            } catch {
                Write-Host "Git found but not working from this path" -ForegroundColor Yellow
            }
        }
    }
}

if (-not $gitAvailable) {
    Write-Host ""
    Write-Host "Git is not installed or not in PATH." -ForegroundColor Red
    Write-Host ""
    Write-Host "Please choose one of these options:" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "Option 1: Install Git manually" -ForegroundColor Cyan
    Write-Host "1. Download from: https://git-scm.com/download/win" -ForegroundColor White
    Write-Host "2. Install with default settings" -ForegroundColor White
    Write-Host "3. Restart PowerShell and run this script again" -ForegroundColor White
    Write-Host ""
    Write-Host "Option 2: Use GitHub Web Interface (Recommended)" -ForegroundColor Cyan
    Write-Host "1. Go to: https://github.com/A-Pag-org/MoHUA-Dashboard" -ForegroundColor White
    Write-Host "2. Click 'Add file' -> 'Upload files'" -ForegroundColor White
    Write-Host "3. Drag and drop ALL files from this folder:" -ForegroundColor White
    Write-Host "   $PWD" -ForegroundColor Gray
    Write-Host "4. Commit with message: 'Complete Landing Page implementation'" -ForegroundColor White
    Write-Host ""
    Write-Host "Option 3: Run as Administrator" -ForegroundColor Cyan
    Write-Host "Right-click PowerShell -> 'Run as Administrator' -> Run install-and-push.ps1" -ForegroundColor White
    Write-Host ""
    Read-Host "Press Enter to exit"
    exit 1
}

Write-Host ""
Write-Host "Git is available! Proceeding with push..." -ForegroundColor Green
Write-Host ""

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
Read-Host "Press Enter to exit"
>>>>>>> 8279627c3a04b1e7daa397b6afe3d19b3ed85e4c
