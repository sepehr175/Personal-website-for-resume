# ساخت پوشه عکس‌های پروژه

Write-Host "📁 ساخت پوشه عکس‌های پروژه..." -ForegroundColor Cyan
Write-Host ""

$projectsPath = "frontend/public/projects"

# ساخت پوشه
if (-not (Test-Path $projectsPath)) {
    New-Item -ItemType Directory -Path $projectsPath -Force | Out-Null
    Write-Host "✅ پوشه ساخته شد: $projectsPath" -ForegroundColor Green
} else {
    Write-Host "✅ پوشه از قبل موجود بود" -ForegroundColor Green
}

Write-Host ""
Write-Host "📝 حالا عکس‌ها رو با این اسم‌ها اینجا بذار:" -ForegroundColor Yellow
Write-Host "   $projectsPath" -ForegroundColor Cyan
Write-Host ""
Write-Host "   1. snapp.jpg      - عکس Snapp" -ForegroundColor White
Write-Host "   2. gym.jpg        - عکس باشگاه" -ForegroundColor White
Write-Host "   3. cnn.jpg        - عکس CNN" -ForegroundColor White
Write-Host "   4. ai-agent.jpg   - عکس GenUnitAI" -ForegroundColor White
Write-Host "   5. monster.jpg    - عکس Monster" -ForegroundColor White
Write-Host "   6. lawyer.jpg     - عکس وکیل" -ForegroundColor White
Write-Host ""

# باز کردن پوشه در File Explorer
Write-Host "📂 باز کردن پوشه در File Explorer..." -ForegroundColor Cyan
Start-Process (Resolve-Path $projectsPath).Path

Write-Host ""
Write-Host "✨ تمام! حالا عکس‌ها رو از Downloads کپی کن اینجا" -ForegroundColor Green
Write-Host ""
