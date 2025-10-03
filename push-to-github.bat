<<<<<<< HEAD
@echo off
echo ========================================
echo MoHUA Dashboard - Push to GitHub
echo ========================================
echo.

echo Checking if Git is installed...
git --version >nul 2>&1
if %errorlevel% neq 0 (
    echo Git is not installed. Please install Git first.
    echo Download from: https://git-scm.com/download/win
    echo.
    echo After installing Git, run this script again.
    pause
    exit /b 1
)

echo Git is installed. Proceeding with push...
echo.

echo Initializing Git repository...
git init

echo Adding remote repository...
git remote add origin https://github.com/A-Pag-org/MoHUA-Dashboard.git

echo Adding all files...
git add .

echo Committing changes...
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

echo Pushing to GitHub...
git push -u origin main

echo.
echo ========================================
echo Push completed successfully!
echo ========================================
echo.
echo Your MoHUA Dashboard is now live on GitHub!
echo Repository: https://github.com/A-Pag-org/MoHUA-Dashboard
echo.
echo Next steps:
echo 1. Go to https://vercel.com
echo 2. Sign in with GitHub
echo 3. Import your repository
echo 4. Deploy to Vercel
echo.
pause
=======
@echo off
echo ========================================
echo MoHUA Dashboard - Push to GitHub
echo ========================================
echo.

echo Checking if Git is installed...
git --version >nul 2>&1
if %errorlevel% neq 0 (
    echo Git is not installed. Please install Git first.
    echo Download from: https://git-scm.com/download/win
    echo.
    echo After installing Git, run this script again.
    pause
    exit /b 1
)

echo Git is installed. Proceeding with push...
echo.

echo Initializing Git repository...
git init

echo Adding remote repository...
git remote add origin https://github.com/A-Pag-org/MoHUA-Dashboard.git

echo Adding all files...
git add .

echo Committing changes...
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

echo Pushing to GitHub...
git push -u origin main

echo.
echo ========================================
echo Push completed successfully!
echo ========================================
echo.
echo Your MoHUA Dashboard is now live on GitHub!
echo Repository: https://github.com/A-Pag-org/MoHUA-Dashboard
echo.
echo Next steps:
echo 1. Go to https://vercel.com
echo 2. Sign in with GitHub
echo 3. Import your repository
echo 4. Deploy to Vercel
echo.
pause
>>>>>>> 8279627c3a04b1e7daa397b6afe3d19b3ed85e4c
