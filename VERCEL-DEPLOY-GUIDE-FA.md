# 🚀 راهنمای کامل آپلود پروژه روی Vercel

این راهنما قدم به قدم به شما نشون می‌ده چطور پروژه پورتفولیو رو روی Vercel دیپلوی کنید.

---

## 📋 پیش‌نیازها

1. **حساب GitHub** - برای آپلود کد
2. **حساب Vercel** - رایگان در [vercel.com](https://vercel.com)
3. **ربات تلگرام**:
   - با [@BotFather](https://t.me/BotFather) یه ربات بساز و توکنش رو بگیر
   - Chat ID خودت رو از [@userinfobot](https://t.me/userinfobot) بگیر

---

## 🔧 مرحله 1: آماده‌سازی پروژه

### 1.1 - چک کردن فایل‌ها

مطمئن شو این فایل‌ها وجود دارن:

```
sepehr-portfolio/
├── api/
│   └── send-message.js       ← API برای تلگرام (بدون Express)
├── frontend/
│   ├── src/
│   │   ├── Portfolio.jsx     ← آپدیت شده برای Vercel
│   │   └── index.js
│   ├── public/
│   │   └── index.html
│   └── package.json
├── vercel.json               ← تنظیمات Vercel
├── .gitignore                ← فایل‌های مخفی
└── .env.example              ← نمونه Environment Variables
```

✅ همه فایل‌های بالا الان وجود دارن!

### 1.2 - تست محلی (اختیاری)

اگه می‌خوای اول محلی تست کنی:

```bash
cd sepehr-portfolio/frontend
npm install
npm start
```

سایت روی `http://localhost:3000` اجرا میشه.

---

## 📤 مرحله 2: آپلود به GitHub

### 2.1 - نصب Git (اگه نداری)

از [git-scm.com](https://git-scm.com) دانلود و نصب کن.

### 2.2 - ایجاد Repository

1. برو به [github.com/new](https://github.com/new)
2. اسم بذار مثلاً: `my-portfolio`
3. Privacy رو **Public** یا **Private** انتخاب کن
4. هیچی رو تیک نزن (نه README، نه .gitignore)
5. بزن **Create repository**

### 2.3 - آپلود کد

داخل پوشه `sepehr-portfolio` این دستورات رو بزن:

```bash
# مقداردهی اولیه Git
git init

# اضافه کردن همه فایل‌ها
git add .

# اولین Commit
git commit -m "Initial commit - Portfolio ready for Vercel"

# اضافه کردن GitHub remote
git remote add origin https://github.com/USERNAME/REPO-NAME.git

# Push به GitHub
git branch -M main
git push -u origin main
```

⚠️ **نکته**: `USERNAME` و `REPO-NAME` رو با اطلاعات خودت عوض کن!

**مثال واقعی**:
```bash
git remote add origin https://github.com/sepehr175/my-portfolio.git
```

---

## ☁️ مرحله 3: Deploy روی Vercel

### 3.1 - ورود به Vercel

1. برو به [vercel.com](https://vercel.com)
2. بزن **Sign Up** (یا Login اگه قبلاً ساختی)
3. با **GitHub** وارد شو

### 3.2 - Import کردن پروژه

1. داخل Dashboard بزن **Add New** → **Project**
2. لیست repository‌های GitHub رو می‌بینی
3. پیدا کن `my-portfolio` (یا هر اسمی که گذاشتی)
4. بزن **Import**

### 3.3 - تنظیمات Deploy

صفحه تنظیمات Deploy باز میشه:

**Framework Preset**: انتخاب کن **Create React App**

**Root Directory**: بذار همونطوری که هست (`.`)

**Build and Output Settings**:
- Build Command: `cd frontend && npm install && npm run build`
- Output Directory: `frontend/build`

این تنظیمات رو بذار همینطور:
```
Build Command: cd frontend && npm install && npm run build
Output Directory: frontend/build
Install Command: npm install (این رو نیاز نیست عوض کنی)
```

### 3.4 - اضافه کردن Environment Variables

پایین صفحه قسمت **Environment Variables** رو پیدا کن:

**Variable 1**:
- Name: `TELEGRAM_BOT_TOKEN`
- Value: توکن ربات تلگرام (مثلاً `8912565501:AAHX...`)

**Variable 2**:
- Name: `TELEGRAM_CHAT_ID`
- Value: Chat ID خودت (مثلاً `5176532576`)

⚠️ **خیلی مهم**: این اطلاعات رو هیچ‌جا لو نده! روی Vercel امن‌ن.

### 3.5 - شروع Deploy

بزن **Deploy** و صبر کن (1-3 دقیقه).

وقتی تموم شد، یه لینک بهت میده مثل:
```
https://my-portfolio-xyz123.vercel.app
```

---

## ✅ مرحله 4: تست کردن

### 4.1 - باز کردن سایت

لینکی که Vercel داده رو باز کن.

### 4.2 - تست فرم

1. برو به بخش **Contact** (آخر سایت)
2. اطلاعاتت رو وارد کن:
   - نام
   - ایمیل
   - پیام
3. بزن **Send Message**

### 4.3 - چک کردن تلگرام

ظرف چند ثانیه باید پیام به ربات تلگرامت برسه:

```
🔔 پیام جدید از پورتفولیو

👤 نام: تست
📧 ایمیل: test@example.com

💬 پیام:
سلام! این یه تست هست.

⏰ 1403/03/17 - 14:30
```

---

## 🔧 عیب‌یابی

### مشکل 1: Environment Variables کار نمی‌کنه

**علت**: متغیرها درست تنظیم نشدن

**راه‌حل**:
1. برو به Vercel Dashboard
2. انتخاب کن پروژه → **Settings** → **Environment Variables**
3. چک کن که `TELEGRAM_BOT_TOKEN` و `TELEGRAM_CHAT_ID` درست باشن
4. بعد از تغییر، برو به **Deployments** و بزن **Redeploy**

### مشکل 2: API کار نمی‌کنه / 404 Error

**علت**: مسیر API اشتباه هست یا فایل `api/send-message.js` وجود نداره

**راه‌حل**:
1. مطمئن شو که فایل `api/send-message.js` داخل repository هست
2. ساختار درست:
   ```
   sepehr-portfolio/
   ├── api/
   │   └── send-message.js
   └── frontend/
   ```
3. بعد از اضافه کردن فایل:
   ```bash
   git add api/send-message.js
   git commit -m "Add Vercel API function"
   git push
   ```

### مشکل 3: Build Failed

**علت**: مشکل در نصب dependencies

**راه‌حل**:
- داخل Vercel بزن **View Build Logs**
- اگه خطای `npm install` داری، مطمئن شو `frontend/package.json` درسته
- اگه مشکل حل نشد، Build Command رو عوض کن به:
  ```
  cd frontend && rm -rf node_modules && npm install && npm run build
  ```

### مشکل 4: پیام نمیاد

**علت**:
- توکن یا Chat ID اشتباه هست
- ربات تلگرام Block شده

**راه‌حل**:
1. توکن و Chat ID رو دوباره چک کن
2. یه بار به ربات `/start` بفرست تو تلگرام
3. مطمئن شو ربات رو Block نکردی
4. تست کن با این API:
   ```
   https://api.telegram.org/bot<TOKEN>/getMe
   ```
   باید اطلاعات ربات رو نشون بده

---

## 🔄 آپدیت پروژه

وقتی بخوای کد رو تغییر بدی:

```bash
# تغییرات رو بده
git add .
git commit -m "Updated design"
git push
```

Vercel به صورت خودکار دوباره Deploy می‌کنه! ⚡

---

## 🌐 دامین سفارشی (اختیاری)

اگه دامین خودت رو داری:

1. برو به Vercel → پروژه → **Settings** → **Domains**
2. دامینت رو اضافه کن (مثلاً `sepehr.dev`)
3. DNS records رو طبق راهنمای Vercel تنظیم کن

---

## 📊 مانیتورینگ

**Vercel Analytics**:
- داخل Dashboard پروژه، بخش **Analytics** رو ببین
- تعداد بازدید، سرعت سایت و... رو نشون میده

**تست API**:
- می‌تونی این لینک رو تو مرورگر باز کنی:
  ```
  https://your-site.vercel.app/api/send-message
  ```
  باید خطای `405 Method not allowed` بده (درسته، چون GET پشتیبانی نمیشه)

---

## 🎉 تمام!

حالا سایتت live هست! 🚀

**لینک سایت**: `https://your-project.vercel.app`

چیزایی که کار می‌کنه:
✅ سایت پورتفولیو
✅ فرم Contact
✅ ارسال پیام به تلگرام
✅ Responsive Design
✅ Fast loading
✅ Free hosting!

---

## 🆘 کمک بیشتر

اگه مشکلی پیش اومد:
- مستندات Vercel: [vercel.com/docs](https://vercel.com/docs)
- Telegram: [@S0phr](https://t.me/S0phr)

موفق باشی! 🎯
