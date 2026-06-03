# 🎯 راهنمای ساده - 3 قدم تا اجرا

## قدم 1️⃣: دانلود Xray (فقط یه بار)

```bash
cd backend
```

برو به این لینک و دانلود کن:
👉 https://github.com/XTLS/Xray-core/releases

دانلود کن: **Xray-windows-64.zip**

Extract کن و کپی کن فایل **xray.exe** رو توی پوشه `backend/`

---

## قدم 2️⃣: نصب (فقط یه بار)

```bash
cd backend
npm install
```

---

## قدم 3️⃣: اجرا (هر بار)

### روش A: اتوماتیک (ساده‌تر) ⭐

```bash
cd backend
./START-ALL.bat
```

این دو تا ترمینال باز می‌کنه:
- Xray Proxy
- Backend Server

بعدش در یه ترمینال جدید:
```bash
cd frontend
npm start
```

### روش B: دستی (کنترل بیشتر)

**ترمینال 1:**
```bash
cd backend
./start-xray.bat
```

**ترمینال 2:**
```bash
cd backend
npm run start:proxy
```

**ترمینال 3:**
```bash
cd frontend
npm start
```

---

## ✅ تست

برو به: **http://localhost:3000**

اسکرول کن پایین، فرم Contact رو پر کن، ارسال کن!

---

## ❌ مشکل داری؟

فایل **FINAL-SOLUTION-FA.md** رو بخون - همه چیز توضیح داده شده!

---

**موفق باشی! 🚀**
