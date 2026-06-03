# 🔧 راهنمای تست و رفع مشکل ETIMEDOUT

## 📋 خلاصه تغییرات انجام شده

من مشکل `ETIMEDOUT` رو با این روش‌ها حل کردم:

### ✅ چه کارهایی انجام شد؟

1. **Automatic Retry (تلاش مجدد خودکار)**
   - حالا سیستم 3 بار تلاش می‌کنه پیام رو بفرسته
   - بین هر تلاش یه تاخیر exponential داره: 1 ثانیه، 2 ثانیه، 4 ثانیه

2. **Connection Timeout (محدودیت زمانی اتصال)**
   - تایم‌اوت رو روی 30 ثانیه گذاشتم
   - اگه تا 30 ثانیه جواب نداد، خطا میده

3. **Local Fallback Storage (ذخیره محلی پیام‌ها)**
   - اگه تلگرام کار نکرد، پیام رو توی پوشه `backend/messages/` ذخیره می‌کنه
   - می‌تونی از طریق `http://localhost:3001/messages` پیام‌ها رو ببینی

4. **Proxy Support (پشتیبانی از پروکسی)**
   - می‌تونی از متغیر `TELEGRAM_PROXY` برای استفاده از پروکسی استفاده کنی

5. **Smart Error Messages (پیام‌های خطای هوشمند)**
   - اگه تلگرام کار نکرد، به کاربر راهنمایی می‌ده که از اینستاگرام یا تلگرام مستقیم باهات تماس بگیره

---

## 🚀 روش‌های حل مشکل

### روش 1️⃣: استفاده از VPN (توصیه می‌شه)

این بهترین راهه! احتمالاً API تلگرام در کشور شما فیلتره.

1. یه VPN وصل کن (مثلاً Cloudflare WARP، Psiphon، یا هر VPN دیگه)
2. Backend رو ریستارت کن:
```bash
cd backend
npm start
```
3. الان تست کن - باید کار کنه!

### روش 2️⃣: استفاده از Telegram Proxy

اگه VPN نداری، می‌تونی از پروکسی استفاده کنی:

**Windows PowerShell:**
```powershell
cd backend
$env:TELEGRAM_PROXY="api.telegram.org"
npm start
```

**Linux/Mac:**
```bash
cd backend
TELEGRAM_PROXY="api.telegram.org" npm start
```

### روش 3️⃣: چک کردن پیام‌های ذخیره شده

حتی اگه تلگرام کار نکنه، پیام‌ها ذخیره میشن!

1. Backend رو اجرا کن
2. برو به: `http://localhost:3001/messages`
3. تمام پیام‌های ذخیره شده رو می‌بینی

---

## 🧪 تست کردن

### مرحله 1: Backend رو اجرا کن

```bash
cd backend
npm start
```

باید این رو ببینی:
```
🚀 Backend running → http://localhost:3001
📬 Telegram Chat ID: 5176532576
```

### مرحله 2: Frontend رو اجرا کن (ترمینال جدید)

```bash
cd frontend
npm start
```

### مرحله 3: تست کن!

1. برو به `http://localhost:3000`
2. اسکرول کن پایین تا قسمت Contact
3. فرم رو پر کن و روی "Send Message" کلیک کن
4. منتظر بمون...

#### ✅ اگه موفق شد:
```
✅ Message sent!
Sepehr received it on Telegram. He'll reply soon!
```

#### ⚠️ اگه Fallback فعال شد:
```
✅ Message sent!
⚠️ Cannot connect to Telegram right now (might be blocked). 
Your message was saved and I'll receive it manually.
You can also reach me on Instagram @sepcode1
```

#### ❌ اگه خطا داد:
```
✗ Try Again
Cannot reach the server. Make sure the backend is running.
```

---

## 🔍 دیباگ و بررسی

### چک کن Backend داره کار می‌کنه؟

برو به: `http://localhost:3001/`

باید این رو ببینی:
```json
{"ok": true, "status": "Sepehr portfolio backend is running ✅"}
```

### ببین چه پیام‌هایی ذخیره شده؟

برو به: `http://localhost:3001/messages`

```json
{
  "ok": true,
  "count": 2,
  "messages": [
    {
      "name": "Ali",
      "email": "ali@example.com",
      "message": "سلام، می‌خوام یه پروژه سفارش بدم",
      "timestamp": "2025-06-03T10:30:00.000Z",
      "status": "telegram_failed"
    }
  ]
}
```

### لاگ‌های Backend رو چک کن

وقتی پیام می‌فرستی، باید این لاگ‌ها رو ببینی:

```
📤 Attempt 1/3 - Sending to Telegram (api.telegram.org)...
❌ Attempt 1 failed: connect ETIMEDOUT 149.154.166.110:443
⏳ Waiting 1000ms before retry...
📤 Attempt 2/3 - Sending to Telegram (api.telegram.org)...
❌ Attempt 2 failed: connect ETIMEDOUT 149.154.166.110:443
⏳ Waiting 2000ms before retry...
📤 Attempt 3/3 - Sending to Telegram (api.telegram.org)...
❌ Attempt 3 failed: connect ETIMEDOUT 149.154.166.110:443
💾 Message saved locally: message-2025-06-03T10-30-00-000Z.json
```

---

## 💡 نکات مهم

### چرا ETIMEDOUT میده؟

این IP که توی خطا می‌بینی (`149.154.166.110:443`) مربوط به سرورهای تلگرامه. احتمالاً:

1. **تلگرام فیلتره** - در کشور شما API تلگرام بسته است
2. **فایروال** - فایروال یا آنتی‌ویروس اتصال رو بلاک می‌کنه
3. **مشکل شبکه** - اینترنت شما کنده یا ناپایداره

### راه حل نهایی

اگه هیچ کدوم کار نکرد:

1. **پیام‌های محلی رو چک کن**: `http://localhost:3001/messages`
2. **کاربرها می‌تونن مستقیماً باهات تماس بگیرن**:
   - Instagram: [@sepcode1](https://www.instagram.com/sepcode1)
   - Telegram: [@S0phr](https://t.me/S0phr)

---

## 📞 راه‌های ارتباطی مستقیم

اگه مشکل حل نشد، کاربرها می‌تونن از این راه‌ها باهات تماس بگیرن:

- 📸 **Instagram**: [@sepcode1](https://www.instagram.com/sepcode1?igsh=dXZkb29iY3VkczMw)
- ✈️ **Telegram**: [@S0phr](https://t.me/S0phr)
- ⌥ **GitHub**: [sepehr175](https://github.com/sepehr175)
- ◈ **LinkedIn**: [Sepehr Karimi](https://www.linkedin.com/in/sepehr-karimi-53a29837b)

---

## ✨ خلاصه

حالا سیستم خیلی قوی‌تر شده:

✅ 3 بار سعی می‌کنه ارسال کنه  
✅ پیام‌ها رو محلی ذخیره می‌کنه  
✅ پیام‌های خطای واضح و راهنما نشون میده  
✅ از پروکسی پشتیبانی می‌کنه  
✅ تایم‌اوت رو مدیریت می‌کنه  

**امتحان کن و اگه مشکلی بود بگو!** 🚀
