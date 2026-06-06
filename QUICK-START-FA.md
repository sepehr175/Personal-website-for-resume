# ⚡ شروع سریع - آپلود به Vercel

راهنمای خلاصه برای Deploy سریع!

## 📋 چیزایی که لازم داری

1. **توکن ربات تلگرام**: از [@BotFather](https://t.me/BotFather) بگیر
2. **Chat ID**: از [@userinfobot](https://t.me/userinfobot) بگیر  
3. **حساب GitHub**: ساخت در [github.com](https://github.com)
4. **حساب Vercel**: ساخت در [vercel.com](https://vercel.com) (رایگان)

---

## 🚀 مراحل کلیدی

### 1️⃣ آپلود به GitHub

```bash
cd sepehr-portfolio

git init
git add .
git commit -m "Ready for Vercel"
git remote add origin https://github.com/USERNAME/REPO.git
git push -u origin main
```

🔴 **مهم**: `USERNAME` و `REPO` رو عوض کن!

---

### 2️⃣ Deploy به Vercel

1. برو به [vercel.com](https://vercel.com) و Login با GitHub
2. بزن **New Project** → انتخاب کن repository
3. **Framework**: Create React App
4. **Build Settings**:
   ```
   Build Command: cd frontend && npm install && npm run build
   Output Directory: frontend/build
   ```

5. **Environment Variables** (خیلی مهم!):
   ```
   TELEGRAM_BOT_TOKEN = توکن_ربات_تلگرام
   TELEGRAM_CHAT_ID = آیدی_چت_تلگرام
   ```

6. بزن **Deploy** و صبر کن!

---

### 3️⃣ تست

بعد از Deploy، لینک سایت رو باز کن و فرم Contact رو تست کن. پیام باید بیاد تو تلگرامت! 🎉

---

## ❓ مشکل داری؟

راهنمای کامل رو ببین: [VERCEL-DEPLOY-GUIDE-FA.md](./VERCEL-DEPLOY-GUIDE-FA.md)

یا تماس بگیر: [@S0phr](https://t.me/S0phr)

---

**موفق باشی!** 🚀
