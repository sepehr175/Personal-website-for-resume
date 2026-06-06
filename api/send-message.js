// Vercel Serverless Function
// این فایل روی Vercel به عنوان API endpoint اجرا میشه

const https = require('https');

// خواندن Environment Variables از Vercel
const TG_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const TG_CHAT_ID = process.env.TELEGRAM_CHAT_ID;

/**
 * ارسال پیام به تلگرام (بدون proxy - Vercel مستقیم اتصال داره)
 */
function sendToTelegram(text) {
  return new Promise((resolve, reject) => {
    const payload = JSON.stringify({
      chat_id: TG_CHAT_ID,
      text: text,
      parse_mode: 'Markdown',
    });

    const options = {
      hostname: 'api.telegram.org',
      path: `/bot${TG_BOT_TOKEN}/sendMessage`,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(payload),
      },
      timeout: 15000,
    };

    const req = https.request(options, (res) => {
      let body = '';
      res.on('data', (chunk) => (body += chunk));
      res.on('end', () => {
        try {
          const json = JSON.parse(body);
          resolve(json);
        } catch {
          reject(new Error('Invalid JSON from Telegram'));
        }
      });
    });

    req.setTimeout(15000, () => {
      req.destroy();
      reject(new Error('Timeout'));
    });

    req.on('error', (err) => reject(err));

    req.write(payload);
    req.end();
  });
}

/**
 * Vercel Serverless Function Handler
 */
module.exports = async (req, res) => {
  // تنظیم CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // پاسخ به OPTIONS request (preflight)
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // فقط POST قبول می‌کنیم
  if (req.method !== 'POST') {
    return res.status(405).json({
      ok: false,
      error: 'Method not allowed. Use POST.',
    });
  }

  // چک کردن Environment Variables
  if (!TG_BOT_TOKEN || !TG_CHAT_ID) {
    console.error('❌ Environment Variables تنظیم نشده!');
    return res.status(500).json({
      ok: false,
      error: 'Server configuration error. Contact admin.',
    });
  }

  // دریافت داده‌های فرم
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({
      ok: false,
      error: 'لطفاً تمام فیلدها رو پر کن (نام، ایمیل، پیام)',
    });
  }

  console.log(`📨 پیام جدید از: ${name} (${email})`);

  // فرمت کردن پیام برای تلگرام
  const text = `
🔔 *پیام جدید از پورتفولیو*

👤 *نام:* ${name}
📧 *ایمیل:* ${email}

💬 *پیام:*
${message}

⏰ ${new Date().toLocaleString('fa-IR', { timeZone: 'Asia/Tehran' })}
  `.trim();

  // تلاش برای ارسال (3 بار)
  for (let attempt = 1; attempt <= 3; attempt++) {
    try {
      console.log(`📤 تلاش ${attempt}/3...`);

      const result = await sendToTelegram(text);

      if (result.ok) {
        console.log(`✅ پیام ارسال شد! ID: ${result.result.message_id}`);
        return res.status(200).json({
          ok: true,
          message: 'پیام با موفقیت ارسال شد!',
          message_id: result.result.message_id,
        });
      } else {
        console.log(`⚠️ خطای Telegram: ${result.description}`);
        return res.status(500).json({
          ok: false,
          error: `خطای تلگرام: ${result.description}`,
        });
      }
    } catch (err) {
      console.log(`❌ تلاش ${attempt} ناموفق: ${err.message}`);

      // اگه آخرین تلاش بود
      if (attempt === 3) {
        console.error('❌ همه تلاش‌ها ناموفق بود');
        return res.status(500).json({
          ok: false,
          error: 'خطا در ارسال پیام. لطفاً مستقیم تماس بگیر:',
          contacts: {
            telegram: '@S0phr',
            instagram: '@sepcode1',
          },
        });
      }

      // صبر قبل از retry
      await new Promise((r) => setTimeout(r, 1000 * attempt));
    }
  }
};
