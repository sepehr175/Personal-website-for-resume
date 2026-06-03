@echo off
echo ╔═══════════════════════════════════════════════════════════════════╗
echo ║                                                                   ║
echo ║        🚀 Sepehr Portfolio - راه‌اندازی کامل                     ║
echo ║                                                                   ║
echo ╚═══════════════════════════════════════════════════════════════════╝
echo.
echo این اسکریپت دو ترمینال جدید باز می‌کنه:
echo   1. Xray Proxy Server
echo   2. Backend با SOCKS5
echo.
echo بعد از اجرا، خودت باید Frontend رو اجرا کنی:
echo   cd frontend
echo   npm start
echo.
echo ═══════════════════════════════════════════════════════════════════
echo.

REM چک کن xray.exe هست؟
if not exist "xray.exe" (
    echo ❌ xray.exe پیدا نشد!
    echo.
    echo لطفاً اول Xray رو دانلود کن:
    echo   1. برو به: https://github.com/XTLS/Xray-core/releases
    echo   2. دانلود کن: Xray-windows-64.zip
    echo   3. Extract کن xray.exe رو اینجا
    echo.
    pause
    exit /b 1
)

REM چک کن xray-config.json هست؟
if not exist "xray-config.json" (
    echo ❌ xray-config.json پیدا نشد!
    echo.
    echo این فایل باید توی پوشه backend باشه.
    echo.
    pause
    exit /b 1
)

REM چک کن node_modules هست؟
if not exist "node_modules" (
    echo ⚠️  node_modules پیدا نشد!
    echo.
    echo در حال نصب dependencies...
    call npm install
    echo.
)

echo ✅ همه چیز آماده!
echo.
echo 🚀 در حال راه‌اندازی...
echo.

REM اجرای Xray در ترمینال جدید
echo 📡 راه‌اندازی Xray Proxy...
start "Xray Proxy Server" cmd /k "xray.exe run -c xray-config.json"

REM صبر 3 ثانیه تا Xray start بشه
timeout /t 3 /nobreak >nul

REM اجرای Backend در ترمینال جدید
echo 🔧 راه‌اندازی Backend با SOCKS5...
start "Backend Server (SOCKS5)" cmd /k "npm start"

echo.
echo ═══════════════════════════════════════════════════════════════════
echo.
echo ✅ دو ترمینال باز شد:
echo    1️⃣  Xray Proxy Server (پورت 10808)
echo    2️⃣  Backend Server (پورت 3001)
echo.
echo 📝 حالا باید Frontend رو اجرا کنی:
echo.
echo    cd frontend
echo    npm start
echo.
echo بعد از اجرا، برو به: http://localhost:3000
echo.
echo ═══════════════════════════════════════════════════════════════════
echo.
pause
