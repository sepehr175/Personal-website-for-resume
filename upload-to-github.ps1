# Script for uploading to GitHub
# راهنما: این اسکریپت رو با PowerShell اجرا کن

Write-Host "╔═══════════════════════════════════════════════════════╗" -ForegroundColor Cyan
Write-Host "║                                                       ║" -ForegroundColor Cyan
Write-Host "║    📤 آپلود پروژه به GitHub                          ║" -ForegroundColor Cyan
Write-Host "║                                                       ║" -ForegroundColor Cyan
Write-Host "╚═══════════════════════════════════════════════════════╝" -ForegroundColor Cyan
Write-Host ""

# چک کن git نصب هست؟
try {
    $gitVersion = git --version
    Write-Host "✅ Git نصب شده: $gitVersion" -ForegroundColor Green
} catch {
    Write-Host "❌ Git نصب نیست!" -ForegroundColor Red
    Write-Host ""
    Write-Host "لطفاً Git رو نصب کن از:" -ForegroundColor Yellow
    Write-Host "  https://git-scm.com/download/win" -ForegroundColor Cyan
    Write-Host ""
    pause
    exit
}

Write-Host ""
Write-Host "═══════════════════════════════════════════════════════" -ForegroundColor Cyan
Write-Host ""

# پرسیدن username GitHub
$username = Read-Host "Username GitHub خودت رو بنویس"

if ([string]::IsNullOrWhiteSpace($username)) {
    Write-Host "❌ Username نمی‌تونه خالی باشه!" -ForegroundColor Red
    pause
    exit
}

Write-Host ""
Write-Host "═══════════════════════════════════════════════════════" -ForegroundColor Cyan
Write-Host ""
Write-Host "⚠️  توجه: برای push کردن به GitHub نیاز به Personal Access Token داری" -ForegroundColor Yellow
Write-Host ""
Write-Host "Personal Access Token رو اینجا بساز:" -ForegroundColor Cyan
Write-Host "  https://github.com/settings/tokens/new" -ForegroundColor White
Write-Host ""
Write-Host "Scopes مورد نیاز: فقط 'repo' ✅" -ForegroundColor Yellow
Write-Host ""
Read-Host "وقتی Token رو ساختی، Enter بزن تا ادامه بدیم"

Write-Host ""
Write-Host "═══════════════════════════════════════════════════════" -ForegroundColor Cyan
Write-Host ""
Write-Host "🚀 شروع آپلود..." -ForegroundColor Green
Write-Host ""

# Initialize git
if (Test-Path ".git") {
    Write-Host "⚠️  Git قبلاً initialize شده، رد می‌شیم..." -ForegroundColor Yellow
} else {
    Write-Host "📁 Initialize کردن Git..." -ForegroundColor Cyan
    git init
    
    if ($LASTEXITCODE -eq 0) {
        Write-Host "✅ Git initialize شد" -ForegroundColor Green
    } else {
        Write-Host "❌ خطا در initialize کردن Git!" -ForegroundColor Red
        pause
        exit
    }
}

Write-Host ""

# تنظیم user config
Write-Host "⚙️  تنظیم user config..." -ForegroundColor Cyan
git config user.email "sphr89023@gmail.com"
git config user.name "Sepehr Karimi"
Write-Host "✅ User config تنظیم شد" -ForegroundColor Green

Write-Host ""

# Add files
Write-Host "📦 اضافه کردن فایل‌ها..." -ForegroundColor Cyan
git add .

if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ فایل‌ها اضافه شدن" -ForegroundColor Green
} else {
    Write-Host "❌ خطا در اضافه کردن فایل‌ها!" -ForegroundColor Red
    pause
    exit
}

Write-Host ""

# Commit
Write-Host "💾 ساختن commit..." -ForegroundColor Cyan
git commit -m "Initial commit: Personal website for resume with Telegram integration"

if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ Commit ساخته شد" -ForegroundColor Green
} else {
    Write-Host "⚠️  یا commit ساخته نشد یا چیزی برای commit وجود نداره" -ForegroundColor Yellow
}

Write-Host ""

# Add remote
$repoUrl = "https://github.com/$username/Personal-website-for-resume.git"
Write-Host "🔗 اضافه کردن remote: $repoUrl" -ForegroundColor Cyan

$remoteExists = git remote get-url origin 2>$null
if ($remoteExists) {
    Write-Host "⚠️  Remote قبلاً اضافه شده" -ForegroundColor Yellow
    $changeRemote = Read-Host "می‌خوای عوضش کنی؟ (y/n)"
    if ($changeRemote -eq "y") {
        git remote set-url origin $repoUrl
        Write-Host "✅ Remote آپدیت شد" -ForegroundColor Green
    }
} else {
    git remote add origin $repoUrl
    Write-Host "✅ Remote اضافه شد" -ForegroundColor Green
}

Write-Host ""

# Change branch to main
Write-Host "🌿 تغییر branch به main..." -ForegroundColor Cyan
git branch -M main
Write-Host "✅ Branch عوض شد" -ForegroundColor Green

Write-Host ""
Write-Host "═══════════════════════════════════════════════════════" -ForegroundColor Cyan
Write-Host ""
Write-Host "🚀 آماده Push!" -ForegroundColor Green
Write-Host ""
Write-Host "حالا باید:" -ForegroundColor Yellow
Write-Host "  1. Repository رو در GitHub بسازی (اگه نساختی)" -ForegroundColor Cyan
Write-Host "  2. وقتی دستور بعدی رو اجرا می‌کنی:" -ForegroundColor Cyan
Write-Host "     - Username: $username" -ForegroundColor White
Write-Host "     - Password: [Personal Access Token که ساختی]" -ForegroundColor White
Write-Host ""
$confirmPush = Read-Host "آماده‌ای برای push؟ (y/n)"

if ($confirmPush -eq "y") {
    Write-Host ""
    Write-Host "📤 در حال push..." -ForegroundColor Cyan
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
        Write-Host "❌ خطا در push کردن!" -ForegroundColor Red
        Write-Host ""
        Write-Host "احتمالاً:" -ForegroundColor Yellow
        Write-Host "  - Repository هنوز ساخته نشده" -ForegroundColor Cyan
        Write-Host "  - Token اشتباه وارد شده" -ForegroundColor Cyan
        Write-Host "  - Username اشتباه هست" -ForegroundColor Cyan
        Write-Host ""
        Write-Host "برو این لینک رو چک کن:" -ForegroundColor Yellow
        Write-Host "  https://github.com/$username/Personal-website-for-resume" -ForegroundColor White
        Write-Host ""
    }
} else {
    Write-Host ""
    Write-Host "⏸️  لغو شد. وقتی آماده شدی، این دستور رو اجرا کن:" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "  git push -u origin main" -ForegroundColor Cyan
    Write-Host ""
}

Write-Host ""
pause
