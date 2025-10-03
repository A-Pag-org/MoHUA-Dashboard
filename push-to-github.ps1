<<<<<<< HEAD
Write-Host "========================================" -ForegroundColor Green
Write-Host "MoHUA Dashboard - Push to GitHub" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green
Write-Host ""

Write-Host "Checking if Git is installed..." -ForegroundColor Yellow
try {
    $gitVersion = git --version
    Write-Host "Git is installed: $gitVersion" -ForegroundColor Green
} catch {
    Write-Host "Git is not installed. Please install Git first." -ForegroundColor Red
    Write-Host "Download from: https://git-scm.com/download/win" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "After installing Git, run this script again." -ForegroundColor Yellow
    Read-Host "Press Enter to exit"
    exit 1
}

Write-Host ""
Write-Host "Initializing Git repository..." -ForegroundColor Yellow
git init

Write-Host "Adding remote repository..." -ForegroundColor Yellow
git remote add origin https://github.com/A-Pag-org/MoHUA-Dashboard.git

Write-Host "Adding all files..." -ForegroundColor Yellow
git add .

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

Write-Host "Pushing to GitHub..." -ForegroundColor Yellow
git push -u origin main

Write-Host ""
Write-Host "========================================" -ForegroundColor Green
Write-Host "Push completed successfully!" -ForegroundColor Green
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
Read-Host "Press Enter to exit"
=======
Write-Host "========================================" -ForegroundColor Green
Write-Host "MoHUA Dashboard - Push to GitHub" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green
Write-Host ""

Write-Host "Checking if Git is installed..." -ForegroundColor Yellow
try {
    $gitVersion = git --version
    Write-Host "Git is installed: $gitVersion" -ForegroundColor Green
} catch {
    Write-Host "Git is not installed. Please install Git first." -ForegroundColor Red
    Write-Host "Download from: https://git-scm.com/download/win" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "After installing Git, run this script again." -ForegroundColor Yellow
    Read-Host "Press Enter to exit"
    exit 1
}

Write-Host ""
Write-Host "Initializing Git repository..." -ForegroundColor Yellow
git init

Write-Host "Adding remote repository..." -ForegroundColor Yellow
git remote add origin https://github.com/A-Pag-org/MoHUA-Dashboard.git

Write-Host "Adding all files..." -ForegroundColor Yellow
git add .

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

Write-Host "Pushing to GitHub..." -ForegroundColor Yellow
git push -u origin main

Write-Host ""
Write-Host "========================================" -ForegroundColor Green
Write-Host "Push completed successfully!" -ForegroundColor Green
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
Read-Host "Press Enter to exit"
>>>>>>> 8279627c3a04b1e7daa397b6afe3d19b3ed85e4c
