# Fix GitHub Remote
Write-Host "==================================================" -ForegroundColor Cyan
Write-Host "   Fix GitHub Remote - [USERNAME] Problem" -ForegroundColor Cyan
Write-Host "==================================================" -ForegroundColor Cyan
Write-Host ""

Write-Host "Current remote:" -ForegroundColor Yellow
git remote -v
Write-Host ""

Write-Host "Problem: URL contains [USERNAME] placeholder!" -ForegroundColor Red
Write-Host ""

Write-Host "To find your GitHub username:" -ForegroundColor Cyan
Write-Host "1. Go to: https://github.com/login" -ForegroundColor White
Write-Host "2. Login with:" -ForegroundColor White
Write-Host "   Email: sphr89023@gmail.com" -ForegroundColor Gray
Write-Host "   Password: 1387skma" -ForegroundColor Gray
Write-Host "3. Your username is in the top-right corner" -ForegroundColor White
Write-Host ""

$username = Read-Host "Enter your GitHub username"

if ([string]::IsNullOrWhiteSpace($username)) {
    Write-Host "Username cannot be empty!" -ForegroundColor Red
    pause
    exit
}

Write-Host ""
Write-Host "Removing old remote..." -ForegroundColor Yellow
git remote remove origin

Write-Host "Adding new remote..." -ForegroundColor Green
$newUrl = "https://github.com/$username/Personal-website-for-resume.git"
git remote add origin $newUrl

Write-Host ""
Write-Host "New remote:" -ForegroundColor Green
git remote -v

Write-Host ""
Write-Host "==================================================" -ForegroundColor Cyan
Write-Host "Done! Now you need to:" -ForegroundColor Green
Write-Host ""
Write-Host "1. Create repository on GitHub:" -ForegroundColor White
Write-Host "   https://github.com/new" -ForegroundColor Cyan
Write-Host "   - Name: Personal-website-for-resume" -ForegroundColor Gray
Write-Host "   - Public" -ForegroundColor Gray
Write-Host ""
Write-Host "2. Create Personal Access Token:" -ForegroundColor White
Write-Host "   https://github.com/settings/tokens/new" -ForegroundColor Cyan
Write-Host "   - Scope: repo" -ForegroundColor Gray
Write-Host ""
Write-Host "3. Push:" -ForegroundColor White
Write-Host "   git push -u origin main" -ForegroundColor Cyan
Write-Host "   Username: $username" -ForegroundColor Gray
Write-Host "   Password: [your token]" -ForegroundColor Gray
Write-Host ""
Write-Host "==================================================" -ForegroundColor Cyan
Write-Host ""
pause
