# اسکریپت برای درست کردن GitHub remote

Write-Host "╔═══════════════════════════════════════════════════════╗" -ForegroundColor Cyan
Write-Host "║                                                       ║" -ForegroundColor Cyan
Write-Host "║    🔧 درست کردن GitHub Remote                        ║" -ForegroundColor Cyan
Write-Host "║                                                       ║" -ForegroundColor Cyan
Write-Host "╚═══════════════════════════════════════════════════════╝" -ForegroundColor Cyan
Write-Host ""

Write-Host "مشکل: remote URL هنوز [USERNAME] داره!" -ForegroundColor Yellow
Write-Host ""

# نمایش remote فعلی
Write-Host "Remote فعلی:" -ForegroundColor Cyan
git remote -v
Write-Host ""

Write-Host "═══════════════════════════════════════════════════════" -ForegroundColor Cyan
Write-Host ""
Write-Host "برای پیدا کردن username خودت:" -ForegroundColor Yellow
Write-Host ""
Write-Host "  1. برو به GitHub: https://github.com/login" -ForegroundColor Cyan
Write-Host "     لاگین کن با:" -ForegroundColor Cyan
Write-Host "       Email: sphr89023@gmail.com" -ForegroundColor White
Write-Host "       Password: 1387skma" -ForegroundColor White
Write-Host ""
Write-Host "  2. بعد از لاگین، username شما بالا سمت راسته" -ForegroundColor Cyan
Write-Host "     (مثلاً: sepehr175 یا sepehr89 یا ...)" -ForegroundColor Cyan
Write-Host ""
Write-Host "═══════════════════════════════════════════════════════" -ForegroundColor Cyan
Write-Host ""

$username = Read-Host "Username واقعی GitHub خودت رو بنویس"

if ([string]::IsNullOrWhiteSpace($username)) {
    Write-Host ""
    Write-Host "❌ Username نمی‌تونه خالی باشه!" -ForegroundColor Red
    pause
    exit
}

Write-Host ""
Write-Host "═══════════════════════════════════════════════════════" -ForegroundColor Cyan
Write-Host ""

# پاک کردن remote قدیمی
Write-Host "🗑️  پاک کردن remote قدیمی..." -ForegroundColor Yellow
git remote remove origin

# اضافه کردن remote جدید
$newUrl = "https://github.com/$username/Personal-website-for-resume.git"
Write-Host "✅ اضافه کردن remote جدید:" -ForegroundColor Green
Write-Host "   $newUrl" -ForegroundColor White
git remote add origin $newUrl

Write-Host ""
Write-Host "✅ Remote درست شد!" -ForegroundColor Green
Write-Host ""

# نمایش remote جدید
Write-Host "Remote جدید:" -ForegroundColor Cyan
git remote -v

Write-Host ""
Write-Host "═══════════════════════════════════════════════════════" -ForegroundColor Cyan
Write-Host ""
Write-Host "⚠️  حالا باید repository رو در GitHub بسازی:" -ForegroundColor Yellow
Write-Host ""
Write-Host "  1. برو به: https://github.com/new" -ForegroundColor Cyan
Write-Host ""
Write-Host "  2. تنظیمات:" -ForegroundColor Cyan
Write-Host "     - Repository name: Personal-website-for-resume" -ForegroundColor White
Write-Host "     - Public ✅" -ForegroundColor White
Write-Host "     - بدون README" -ForegroundColor White
Write-Host ""
Write-Host "  3. کلیک: Create repository" -ForegroundColor Cyan
Write-Host ""
Write-Host "═══════════════════════════════════════════════════════" -ForegroundColor Cyan
Write-Host ""

$createRepo = Read-Host "Repository رو ساختی؟ (y/n)"

if ($createRepo -eq "y") {
    Write-Host ""
    Write-Host "═══════════════════════════════════════════════════════" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "⚠️  برای push کردن نیاز به Personal Access Token داری!" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "اگه Token نداری:" -ForegroundColor Cyan
    Write-Host "  1. برو به: https://github.com/settings/tokens/new" -ForegroundColor White
    Write-Host "  2. Note: Portfolio Upload" -ForegroundColor White
    Write-Host "  3. Expiration: 90 days" -ForegroundColor White
    Write-Host "  4. Scope: فقط repo ✅" -ForegroundColor White
    Write-Host "  5. Generate token" -ForegroundColor White
    Write-Host "  6. کپی کن token رو!" -ForegroundColor White
    Write-Host ""
    
    $hasToken = Read-Host "Token داری؟ (y/n)"
    
    if ($hasToken -eq "y") {
        Write-Host ""
        Write-Host "🚀 در حال push..." -ForegroundColor Green
        Write-Host ""
        Write-Host "وقتی از password پرسید:" -ForegroundColor Yellow
        Write-Host "  Username: $username" -ForegroundColor White
        Write-Host "  Password: [Token که کپی کردی]" -ForegroundColor White
        Write-Host ""
        
        git push -u origin main
        
        if ($LASTEXITCODE -eq 0) {
            Write-Host ""
            Write-Host "═══════════════════════════════════════════════════════" -ForegroundColor Cyan
            Write-Host ""
            Write-Host "🎉 موفق! پروژه آپلود شد!" -ForegroundColor Green
            Write-Host ""
            Write-Host "Repository شما:" -ForegroundColor Cyan
            Write-Host "  https://github.com/$username/Personal-website-for-resume" -ForegroundColor White
            Write-Host ""
        } else {
            Write-Host ""
            Write-Host "❌ خطا در push!" -ForegroundColor Red
            Write-Host ""
            Write-Host "دلایل احتمالی:" -ForegroundColor Yellow
            Write-Host "  - Repository هنوز ساخته نشده" -ForegroundColor Cyan
            Write-Host "  - Token اشتباه وارد شده" -ForegroundColor Cyan
            Write-Host "  - Username اشتباه هست" -ForegroundColor Cyan
            Write-Host ""
        }
    } else {
        Write-Host ""
        Write-Host "برو Token بساز و بعد این دستور رو اجرا کن:" -ForegroundColor Yellow
        Write-Host ""
        Write-Host "  git push -u origin main" -ForegroundColor Cyan
        Write-Host ""
    }
} else {
    Write-Host ""
    Write-Host "برو repository بساز و بعد این دستور رو اجرا کن:" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "  git push -u origin main" -ForegroundColor Cyan
    Write-Host ""
}

Write-Host ""
pause
