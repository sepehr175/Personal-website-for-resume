# 📤 آپلود پروژه به GitHub

## 🎯 اطلاعات Repository

- **نام Repository:** Personal-website-for-resume
- **وضعیت:** Public
- **ایمیل GitHub:** sphr89023@gmail.com

---

## 🚀 مراحل آپلود (کپی-پیست دستورات)

### مرحله 1: راه‌اندازی Git در پروژه

باز کن **PowerShell** یا **Git Bash** در پوشه `sepehr-portfolio` و این دستورات رو اجرا کن:

```bash
# رفتن به پوشه اصلی پروژه
cd sepehr-portfolio

# initialize کردن git
git init

# تنظیم اطلاعات کاربری
git config user.email "sphr89023@gmail.com"
git config user.name "Sepehr Karimi"

# اضافه کردن همه فایل‌ها
git add .

# ساختن اولین commit
git commit -m "Initial commit: Personal website for resume with Telegram integration"
```

---

### مرحله 2: ساخت Repository در GitHub

**روش A: از طریق مرورگر (ساده‌تر)**

1. برو به: https://github.com/login
2. لاگین کن با:
   - Email: `sphr89023@gmail.com`
   - Password: `1387skma`

3. برو به: https://github.com/new
4. تنظیمات:
   - **Repository name:** `Personal-website-for-resume`
   - **Description:** Portfolio website with React frontend and Node.js backend, featuring Telegram bot integration for contact form
   - **Public** رو انتخاب کن ✅
   - **بدون README** (چون ما داریم)
   - **بدون .gitignore** (چون ما داریم)
   - **بدون license** (فعلاً)

5. کلیک کن **Create repository**

6. صفحه جدید باز میشه که دستورات رو نشون میده - **نگه دار این صفحه باز!**

---

**روش B: از طریق GitHub CLI (اگه نصب داری)**

```bash
# لاگین به GitHub
gh auth login

# ساخت repository
gh repo create Personal-website-for-resume --public --source=. --remote=origin --push
```

---

### مرحله 3: اتصال و Push کردن

بعد از ساختن repository، این دستورات رو اجرا کن:

```bash
# اضافه کردن remote
git remote add origin https://github.com/[USERNAME]/Personal-website-for-resume.git

# ⚠️ [USERNAME] رو با username واقعی GitHub خودت عوض کن!
# مثلاً اگه username شما sepehr175 هست:
# git remote add origin https://github.com/sepehr175/Personal-website-for-resume.git

# تغییر نام branch به main
git branch -M main

# Push کردن به GitHub
git push -u origin main
```

**توجه:** وقتی `git push` می‌زنی، از شما username و password می‌خواد:
- **Username:** username GitHub شما
- **Password:** یه Personal Access Token (نه پسورد معمولی!)

---

### مرحله 4: ساخت Personal Access Token

GitHub دیگه پسورد معمولی رو قبول نمی‌کنه. باید یه **Personal Access Token** بسازی:

1. برو به: https://github.com/settings/tokens
2. کلیک کن **Generate new token** → **Generate new token (classic)**
3. تنظیمات:
   - **Note:** "Portfolio Upload Token"
   - **Expiration:** 90 days (یا هر چی بخوای)
   - **Scopes:** فقط `repo` رو تیک بزن ✅
4. کلیک کن **Generate token**
5. **کپی کن token** رو (فقط یه بار نشون داده میشه!)
6. این token رو وقتی `git push` می‌زنی به عنوان password استفاده کن

---

## 🔐 استفاده از Token برای Push

```bash
# وقتی git push می‌زنی و از password می‌پرسه:
Username: [username-github-شما]
Password: [token-که-کپی-کردی]
```

---

## 📝 .gitignore (مهم!)

من یه `.gitignore` برات ساختم که فایل‌های حساس رو push نمی‌کنه:

```
node_modules/
messages/
*.log
.env
xray.exe
geoip.dat
geosite.dat
```

اگه وجود نداره، بساز:

```bash
# در پوشه اصلی پروژه
cat > .gitignore << 'EOF'
node_modules/
messages/
*.log
.env
xray.exe
geoip.dat
geosite.dat
EOF

# اضافه کن به git
git add .gitignore
git commit -m "Add .gitignore"
git push
```

---

## 🎯 دستورات سریع (کپی همه رو بزن)

```bash
# مرحله 1: Initialize
cd sepehr-portfolio
git init
git config user.email "sphr89023@gmail.com"
git config user.name "Sepehr Karimi"

# مرحله 2: Add & Commit
git add .
git commit -m "Initial commit: Personal website for resume"

# مرحله 3: Remote & Push
# ⚠️ عوض کن [USERNAME] رو با username GitHub خودت
git remote add origin https://github.com/[USERNAME]/Personal-website-for-resume.git
git branch -M main
git push -u origin main
```

---

## ✅ چک کردن موفقیت

بعد از push، برو به:
```
https://github.com/[USERNAME]/Personal-website-for-resume
```

باید همه فایل‌های پروژه رو ببینی! 🎉

---

## 🔄 آپدیت کردن (در آینده)

وقتی تغییری دادی و می‌خوای دوباره push کنی:

```bash
git add .
git commit -m "توضیح تغییرات"
git push
```

---

## 📁 ساختار Repository در GitHub

بعد از آپلود، repository شما این ساختار رو داره:

```
Personal-website-for-resume/
├── README.md (یا README-START-HERE.md)
├── backend/
│   ├── server.js
│   ├── package.json
│   └── ...
├── frontend/
│   ├── src/
│   ├── public/
│   └── package.json
└── راهنماهای فارسی (*.md)
```

---

## ⚠️ نکات امنیتی

1. **Token رو ذخیره کن** - فقط یه بار نشون داده میشه
2. **Token رو به کسی نده** - مثل پسورده
3. **اگه Token گم شد** - یه token جدید بساز
4. **.gitignore** - مطمئن شو `messages/` و `xray.exe` push نشن

---

## 🎨 اضافه کردن README زیبا

بعد از push، یه README خوب بساز:

```bash
# کپی کن README اصلی
cp README-START-HERE.md README.md

# یا یه README جدید بساز:
cat > README.md << 'EOF'
# 🎨 Personal Website for Resume

Portfolio website with React frontend and Node.js backend.

## Features
- ✅ Modern, animated UI
- ✅ Contact form with Telegram integration
- ✅ Fully responsive design
- ✅ VLESS proxy support

## Quick Start
See [WORKING-SOLUTION-FA.md](WORKING-SOLUTION-FA.md) for setup instructions.

## Tech Stack
- Frontend: React
- Backend: Node.js + Express
- Proxy: Xray (VLESS)
- Messaging: Telegram Bot API
EOF

git add README.md
git commit -m "Add README"
git push
```

---

## 🚀 دیپلوی کردن (اختیاری)

بعد از push به GitHub، می‌تونی deploy کنی:

### Frontend → Vercel

1. برو به: https://vercel.com
2. Import کن repository رو
3. Root Directory: `frontend`
4. Deploy!

### Backend → Railway

1. برو به: https://railway.app
2. New Project → Deploy from GitHub
3. Select: `Personal-website-for-resume`
4. Root Directory: `backend`
5. Deploy!

---

## 📞 کمک نیاز داری؟

اگه توی هر مرحله‌ای گیر کردی:
1. لاگ خطا رو بخون
2. چک کن username و token درست باشن
3. مطمئن شو repository ساخته شده
4. بگو تا کمکت کنم!

---

**موفق باشی! 🚀**
