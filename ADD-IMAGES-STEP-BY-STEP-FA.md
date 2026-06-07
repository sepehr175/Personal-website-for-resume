# 📸 راهنمای قدم به قدم اضافه کردن عکس‌ها

## 🎯 مراحل دقیق:

### مرحله 1: ذخیره عکس‌ها از چت

از عکس‌هایی که فرستادی، باید اینا رو ذخیره کنی:

1. **عکس اول** (Snapp - سبز) → `snapp.jpg`
2. **عکس دوم** (باشگاه - صورتی) → `gym.jpg`
3. **عکس سوم** (CNN - قرمز/سفید) → `cnn.jpg`
4. **عکس چهارم** (GenUnitAI - AI بنفش) → `ai-agent.jpg`
5. **عکس پنجم** (Monster - سبز/سیاه Neon) → `monster.jpg`
6. **عکس ششم** (وکیل - سبز/آبی) → `lawyer.jpg`

---

### مرحله 2: کپی عکس‌ها

#### روش 1: File Explorer (ساده‌ترین)

1. عکس‌ها رو از چت Download کن
2. برو به این مسیر:
   ```
   C:\Users\User\Downloads\sepehr-portfolio\sepehr-portfolio\frontend\public\projects\
   ```
3. اگه پوشه `projects` نیست، بسازش (کلیک راست → New → Folder)
4. عکس‌ها رو کپی کن توی این پوشه
5. **مهم**: اسم‌هاشون رو دقیقاً طبق لیست بالا بذار (با حروف کوچیک!)

#### روش 2: PowerShell

```powershell
# پوشه رو بساز
cd C:\Users\User\Downloads\sepehr-portfolio\sepehr-portfolio\frontend\public
mkdir projects

# بعد عکس‌ها رو از Downloads کپی کن
Copy-Item "C:\Users\User\Downloads\عکس_اول.jpg" "projects\snapp.jpg"
Copy-Item "C:\Users\User\Downloads\عکس_دوم.jpg" "projects\gym.jpg"
Copy-Item "C:\Users\User\Downloads\عکس_سوم.jpg" "projects\cnn.jpg"
Copy-Item "C:\Users\User\Downloads\عکس_چهارم.jpg" "projects\ai-agent.jpg"
Copy-Item "C:\Users\User\Downloads\عکس_پنجم.jpg" "projects\monster.jpg"
Copy-Item "C:\Users\User\Downloads\عکس_ششم.jpg" "projects\lawyer.jpg"
```

---

### مرحله 3: چک کن اسم‌ها درست باشن

**دقت کن**:
- همه حروف باید کوچیک باشن
- فاصله نباشه
- پسوند `.jpg` باشه

✅ درست:
```
snapp.jpg
gym.jpg
cnn.jpg
ai-agent.jpg
monster.jpg
lawyer.jpg
```

❌ اشتباه:
```
Snapp.JPG
snapp .jpg
snapp-1.jpg
gym (1).jpg
```

---

### مرحله 4: Refresh مرورگر

بعد از اضافه کردن عکس‌ها:
1. برو به مرورگر
2. بزن `Ctrl + Shift + R` (Hard Refresh)
3. باید عکس‌ها نمایش داده بشن!

---

## 🗺️ نقشه عکس‌ها:

```
عکس 1: Snapp (سبز Snapp!)
  └─> snapp.jpg

عکس 2: باشگاه (صورتی MORE)
  └─> gym.jpg

عکس 3: CNN (قرمز/سفید خبری)
  └─> cnn.jpg

عکس 4: AI Agent (بنفش ارائه‌های زیبا)
  └─> ai-agent.jpg

عکس 5: Monster (سبز UNLEASH THE CHARGE)
  └─> monster.jpg

عکس 6: وکیل (سبز/آبی مشاوره حقوقی)
  └─> lawyer.jpg
```

---

## ✅ چک نهایی:

بعد از اضافه کردن، این دستور رو بزن:

```powershell
cd C:\Users\User\Downloads\sepehr-portfolio\sepehr-portfolio\frontend\public\projects
ls
```

باید این خروجی رو ببینی:
```
snapp.jpg
gym.jpg
cnn.jpg
ai-agent.jpg
monster.jpg
lawyer.jpg
```

---

## 🐛 عیب‌یابی:

### عکس نمایش داده نمیشه؟
1. اسم فایل رو چک کن (حروف کوچیک!)
2. مسیر رو چک کن (`frontend/public/projects/`)
3. Hard Refresh کن (`Ctrl + Shift + R`)
4. اگه باز نشد، npm start رو دوباره اجرا کن

---

**موفق باشی!** 🚀
