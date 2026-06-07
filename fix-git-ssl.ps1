# راه‌حل مشکل SSL/TLS در Git

Write-Host "=== راه‌حل مشکل Git SSL/TLS ===" -ForegroundColor Cyan
Write-Host ""

# راه‌حل 1: غیرفعال کردن موقت SSL verification
Write-Host "📝 راه‌حل 1: غیرفعال کردن SSL verification (موقت)" -ForegroundColor Yellow
Write-Host "git config --global http.sslVerify false"
Write-Host ""

# راه‌حل 2: تنظیم SSL backend
Write-Host "📝 راه‌حل 2: تنظیم SSL backend" -ForegroundColor Yellow
Write-Host "git config --global http.sslBackend schannel"
Write-Host ""

# راه‌حل 3: استفاده از SSH به جای HTTPS
Write-Host "📝 راه‌حل 3: استفاده از SSH" -ForegroundColor Yellow
Write-Host "git remote set-url origin git@github.com:sepehr175/Personal-website-for-resume.git"
Write-Host ""

Write-Host "=== انتخاب کن ===" -ForegroundColor Green
Write-Host "1 - راه‌حل 1 (سریع - موقت)"
Write-Host "2 - راه‌حل 2 (SSL backend)"
Write-Host "3 - راه‌حل 3 (SSH - پیشنهادی)"
Write-Host "4 - همه رو اجرا کن"
Write-Host ""

$choice = Read-Host "انتخاب کن (1-4)"

switch ($choice) {
    "1" {
        Write-Host "`n🔧 اجرای راه‌حل 1..." -ForegroundColor Cyan
        git config --global http.sslVerify false
        Write-Host "✅ SSL verification غیرفعال شد" -ForegroundColor Green
        Write-Host "`nحالا دوباره امتحان کن:" -ForegroundColor Yellow
        Write-Host "git push -u origin main"
    }
    "2" {
        Write-Host "`n🔧 اجرای راه‌حل 2..." -ForegroundColor Cyan
        git config --global http.sslBackend schannel
        Write-Host "✅ SSL backend تنظیم شد" -ForegroundColor Green
        Write-Host "`nحالا دوباره امتحان کن:" -ForegroundColor Yellow
        Write-Host "git push -u origin main"
    }
    "3" {
        Write-Host "`n🔧 اجرای راه‌حل 3..." -ForegroundColor Cyan
        git remote set-url origin git@github.com:sepehr175/Personal-website-for-resume.git
        Write-Host "✅ Remote به SSH تغییر کرد" -ForegroundColor Green
        Write-Host "`nاگه SSH key نداری، اول این دستورات رو بزن:" -ForegroundColor Yellow
        Write-Host "ssh-keygen -t ed25519 -C 'your_email@example.com'"
        Write-Host "cat ~/.ssh/id_ed25519.pub"
        Write-Host "`nبعد public key رو به GitHub اضافه کن:" -ForegroundColor Yellow
        Write-Host "https://github.com/settings/keys"
        Write-Host "`nبعد بزن:" -ForegroundColor Yellow
        Write-Host "git push -u origin main"
    }
    "4" {
        Write-Host "`n🔧 اجرای همه راه‌حل‌ها..." -ForegroundColor Cyan
        git config --global http.sslVerify false
        git config --global http.sslBackend schannel
        Write-Host "✅ تنظیمات انجام شد" -ForegroundColor Green
        Write-Host "`nحالا دوباره امتحان کن:" -ForegroundColor Yellow
        Write-Host "git push -u origin main"
    }
    default {
        Write-Host "`n❌ انتخاب نامعتبر!" -ForegroundColor Red
    }
}

Write-Host ""
