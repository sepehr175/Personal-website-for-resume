# 🔧 رفع سریع خطا: Repository not found

## ❌ خطا

```
remote: Repository not found.
fatal: repository 'https://github.com/[USERNAME]/Personal-website-for-resume.git/' not found
```

## 🎯 مشکل چیه؟

`[USERNAME]` رو عوض نکردی! باید username واقعی GitHub خودت رو بذاری.

---

## ✅ راه حل سریع

### مرحله 1: پیدا کردن Username

1. **لاگین کن به GitHub:**
   - برو به: https://github.com/login
   - Email: `sphr89023@gmail.com`
   - Password: `1387skma`

2. **پیدا کن username رو:**
   - بعد از لاگین، بالا سمت راست، روی عکس پروفایلت کلیک کن
   - Username شما اونجاست (مثلاً: `sepehr175` یا `sepehr89` یا...)
   - **کپی کن این username رو!**

---

### مرحله 2: اسکریپت خودکار (ساده‌ترین)

```powershell
# در پوشه sepehr-portfolio
./fix-github-remote.ps1
```

این اسکریپت:
- ✅ Remote قدیمی رو پاک می‌کنه
- ✅ Remote جدید با username درست اضافه می‌کنه
- ✅ راهنماییت می‌کنه برای ساخت repo و push

---

### مرحله 3: دستی (اگه اسکریپت کار نکرد)

```bash
# 1. پاک کن remote قدیمی
git remote remove origin

# 2. اضافه کن remote جدید با username واقعی
# ⚠️ عوض کن YOUR_USERNAME رو با username که پیدا کردی
git remote add origin https://github.com/YOUR_USERNAME/Personal-website-for-resume.git

# 3. چک کن درست شد
git remote -v
# باید ببینی URL با username واقعیت
```

---

### مرحله 4: ساخت Repository

**اگه repository رو نساختی:**

1. برو به: https://github.com/new

2. تنظیمات:
   - **Repository name:** `Personal-website-for-resume`
   - **Description:** Portfolio website with React and Node.js
   - **Public** ✅
   - **بدون README** (چون ما داریم)
   - **بدون .gitignore** (چون ما داریم)

3. کلیک: **Create repository**

---

### مرحله 5: ساخت Personal Access Token

GitHub دیگه پسورد معمولی قبول نمی‌کنه!

1. برو به: https://github.com/settings/tokens/new

2. تنظیمات:
   - **Note:** `Portfolio Upload`
   - **Expiration:** `90 days`
   - **Scopes:** فقط `repo` ✅

3. کلیک: **Generate token**

4. **کپی کن token** (فقط یه بار نشون داده میشه!)

---

### مرحله 6: Push کردن

```bash
git push -u origin main
```

وقتی از password می‌پرسه:
- **Username:** username واقعی GitHub شما
- **Password:** Token که کپی کردی (نه پسورد معمولی!)

---

## ✅ چک کردن موفقیت

اگه موفق شد، باید ببینی:

```
Enumerating objects: X, done.
Counting objects: 100% (X/X), done.
...
To https://github.com/YOUR_USERNAME/Personal-website-for-resume.git
 * [new branch]      main -> main
```

بعد برو به:
```
https://github.com/YOUR_USERNAME/Personal-website-for-resume
```

باید همه فایل‌های پروژه رو ببینی! 🎉

---

## 🧪 تست

```bash
# چک کن remote درسته
git remote -v

# باید ببینی:
origin  https://github.com/YOUR_USERNAME/Personal-website-for-resume.git (fetch)
origin  https://github.com/YOUR_USERNAME/Personal-website-for-resume.git (push)

# ⚠️ نباید [USERNAME] ببینی!
```

---

## ❌ خطاهای دیگه

### "Repository not found" هنوز میاد

**دلایل:**
1. Repository هنوز ساخته نشده
2. Username اشتباه نوشتی
3. Repository اسمش فرق می‌کنه

**راه حل:**
```bash
# چک کن repo وجود داره
# برو به: https://github.com/YOUR_USERNAME?tab=repositories
# باید Personal-website-for-resume رو ببینی
```

### "Authentication failed"

**دلایل:**
1. Token اشتباه وارد شده
2. Token expire شده
3. Token scope نداره

**راه حل:**
- Token جدید بساز
- مطمئن شو scope `repo` داره ✅

---

## 💡 نکته مهم

هر جا که `[USERNAME]` می‌بینی، باید با **username واقعی GitHub** خودت عوضش کنی!

مثال:
- ❌ اشتباه: `https://github.com/[USERNAME]/...`
- ✅ درست: `https://github.com/sepehr175/...`

---

## 🚀 دستورات کامل (کپی-پیست)

```bash
# 1. Username خودت رو پیدا کن از GitHub

# 2. پاک کن remote قدیمی
git remote remove origin

# 3. اضافه کن remote جدید (عوض کن YOUR_USERNAME)
git remote add origin https://github.com/YOUR_USERNAME/Personal-website-for-resume.git

# 4. برو repo بساز: https://github.com/new

# 5. برو token بساز: https://github.com/settings/tokens/new

# 6. Push کن
git push -u origin main
# Username: YOUR_USERNAME
# Password: YOUR_TOKEN
```

---

**موفق باشی! 🚀**
