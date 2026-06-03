# 🎯 شروع از اینجا!

## ✅ وضعیت: تست شده و کار می‌کنه!

من تست کردم و پیام با موفقیت به تلگرام ارسال شد! 🎉

---

## 📖 راهنماها

### 🚀 برای شروع سریع:
👉 **`WORKING-SOLUTION-FA.md`** ← **اول اینو بخون!**

این راهنمای کامل و تست شده است که دقیقاً توضیح میده چطور اجرا کنی.

### 📚 راهنماهای دیگه:

- **`README-SIMPLE-FA.md`** - راهنمای 3 قدمی خیلی ساده
- **`FINAL-SOLUTION-FA.md`** - راهنمای کامل با عیب‌یابی
- **`SETUP-XRAY-FA.md`** - نصب و راه‌اندازی Xray

---

## ⚡ دستورات سریع

```bash
# ترمینال 1: Xray
cd backend
./start-xray.bat

# ترمینال 2: Backend
cd backend
npm start

# ترمینال 3: Frontend
cd frontend
npm start

# تست: http://localhost:3000
```

---

## 🎯 چی کار می‌کنه؟

این یه portfolio website هست که:
- فرم Contact داره
- پیام‌ها رو مستقیماً به تلگرام شما می‌فرسته
- از Xray + SOCKS5 Proxy برای دور زدن فیلترینگ استفاده می‌کنه
- اگه تلگرام در دسترس نباشه، پیام‌ها رو محلی ذخیره می‌کنه

---

## 📂 ساختار پروژه

```
sepehr-portfolio/
├── 📖 README-START-HERE.md       ← شما اینجایید!
├── 📖 WORKING-SOLUTION-FA.md     ← راهنمای کاری (تست شده)
├── 📖 README-SIMPLE-FA.md        ← راهنمای ساده
│
├── backend/                      ← سرور Node.js
│   ├── xray.exe                  ← باید دانلود کنی
│   ├── xray-config.json          ← کانفیگ VLESS (آماده)
│   ├── server.js                 ← سرور با SOCKS5 (آپدیت شده)
│   ├── START-ALL.bat             ← راه‌اندازی اتوماتیک
│   └── test-direct-socks5.js     ← تست مستقیم
│
└── frontend/                     ← React App
    └── src/Portfolio.jsx
```

---

## 🔧 مراحل نصب (فقط یه بار)

### 1. دانلود Xray

برو به: https://github.com/XTLS/Xray-core/releases

دانلود کن: `Xray-windows-64.zip`

Extract کن و کپی کن `xray.exe` رو توی `backend/`

### 2. نصب Dependencies

```bash
cd backend
npm install

cd ../frontend
npm install
```

---

## 🚀 اجرا (هر بار)

### روش A: اتوماتیک (ساده)

```bash
cd backend
./START-ALL.bat
```

بعد در ترمینال جدید:
```bash
cd frontend
npm start
```

### روش B: دستی

```bash
# ترمینال 1
cd backend
./start-xray.bat

# ترمینال 2
cd backend
npm start

# ترمینال 3
cd frontend
npm start
```

---

## 🧪 تست

برو به: `http://localhost:3000`

فرم Contact رو پر کن و ارسال کن!

پیام باید به تلگرام برسه! ✅

---

## ❌ مشکل داری؟

1. **چک کن** Xray داره کار می‌کنه:
   ```bash
   curl --socks5 127.0.0.1:10808 https://api.telegram.org
   ```

2. **تست کن** مستقیم:
   ```bash
   cd backend
   node test-direct-socks5.js
   ```

3. **بخون** راهنمای کامل: `WORKING-SOLUTION-FA.md`

---

## 📱 ارتباط

- **Telegram:** @S0phr
- **Instagram:** @sepcode1
- **GitHub:** sepehr175

---

**موفق باشی! 🚀**
