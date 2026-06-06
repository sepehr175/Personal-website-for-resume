const express = require("express");
const cors = require("cors");
const https = require("https");
const fs = require("fs");
const path = require("path");
const { SocksProxyAgent } = require("socks-proxy-agent");

const app = express();

// ── Telegram Credentials ──────────────────────────────────────────────────────
// 🔴 هشدار: این فایل فقط برای Development محلی هست!
// 🔴 روی Vercel از api/send-message.js استفاده میشه!
const TG_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN || "YOUR_TOKEN_HERE";
const TG_CHAT_ID = process.env.TELEGRAM_CHAT_ID || "YOUR_CHAT_ID_HERE";
const PORT = process.env.PORT || 3001;

// ── SOCKS5 Proxy Configuration (از کانفیگ VLESS شما) ───────────────────────
// Xray روی localhost:10808 یه SOCKS5 proxy میسازه
const SOCKS_PROXY = process.env.SOCKS_PROXY || "socks5://127.0.0.1:10808";

console.log(`🔒 استفاده از SOCKS5 Proxy: ${SOCKS_PROXY}`);

// ── Fallback Storage ──────────────────────────────────────────────────────────
const MESSAGES_DIR = path.join(__dirname, "messages");
if (!fs.existsSync(MESSAGES_DIR)) {
  fs.mkdirSync(MESSAGES_DIR, { recursive: true });
}

app.use(cors({ origin: "*", methods: ["POST", "GET"] }));
app.use(express.json());

// ── Helper Functions ──────────────────────────────────────────────────────────

function saveMessageLocally(name, email, message) {
  const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
  const filename = `message-${timestamp}.json`;
  const filepath = path.join(MESSAGES_DIR, filename);

  const data = {
    name,
    email,
    message,
    timestamp: new Date().toISOString(),
    status: "telegram_failed",
  };

  fs.writeFileSync(filepath, JSON.stringify(data, null, 2));
  console.log(`💾 پیام ذخیره شد محلی: ${filename}`);
  return filepath;
}

// ارسال به تلگرام با SOCKS5 Proxy
function sendToTelegramViaSocks5(text) {
  return new Promise((resolve, reject) => {
    const payload = JSON.stringify({
      chat_id: TG_CHAT_ID,
      text: text,
      parse_mode: "Markdown",
    });

    // ایجاد SOCKS5 Agent
    const agent = new SocksProxyAgent(SOCKS_PROXY);

    const options = {
      hostname: "api.telegram.org",
      path: `/bot${TG_BOT_TOKEN}/sendMessage`,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Content-Length": Buffer.byteLength(payload),
      },
      agent: agent, // استفاده از SOCKS5 proxy
      timeout: 30000,
    };

    const req = https.request(options, (res) => {
      let body = "";
      res.on("data", (chunk) => (body += chunk));
      res.on("end", () => {
        try {
          const json = JSON.parse(body);
          resolve(json);
        } catch {
          reject(new Error("Invalid JSON response from Telegram"));
        }
      });
    });

    req.setTimeout(30000, () => {
      req.destroy();
      reject(new Error("Connection timeout (30s)"));
    });

    req.on("error", (err) => {
      reject(err);
    });

    req.write(payload);
    req.end();
  });
}

// ── Routes ────────────────────────────────────────────────────────────────────

app.get("/", (req, res) => {
  res.json({
    ok: true,
    status: "🚀 Sepehr Portfolio Backend (با SOCKS5 Proxy)",
    proxy: SOCKS_PROXY,
    telegram_api: "api.telegram.org",
    chat_id: TG_CHAT_ID,
    note: "این سرور از طریق Xray SOCKS5 proxy به تلگرام وصل میشه"
  });
});

app.post("/send-message", async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({
      ok: false,
      error: "لطفاً تمام فیلدها رو پر کن (نام، ایمیل، پیام)",
    });
  }

  console.log(`\n📨 پیام جدید از: ${name} (${email})`);

  const text = `
🔔 *پیام جدید از پورتفولیو*

👤 *نام:* ${name}
📧 *ایمیل:* ${email}

💬 *پیام:*
${message}

⏰ ${new Date().toLocaleString("fa-IR", { timeZone: "Asia/Tehran" })}
  `.trim();

  // تلاش برای ارسال با retry (3 بار)
  for (let attempt = 1; attempt <= 3; attempt++) {
    try {
      console.log(`📤 تلاش ${attempt}/3 - ارسال از طریق SOCKS5 Proxy...`);
      
      const result = await sendToTelegramViaSocks5(text);

      if (result.ok) {
        console.log(`✅ موفق! پیام با ID ${result.result.message_id} ارسال شد`);
        return res.status(200).json({
          ok: true,
          message: "پیام با موفقیت ارسال شد به تلگرام!",
          message_id: result.result.message_id,
        });
      } else {
        console.log(`⚠️ خطای Telegram API: ${result.description}`);
        return res.status(500).json({
          ok: false,
          error: `خطای تلگرام: ${result.description}`,
        });
      }
    } catch (err) {
      console.log(`❌ تلاش ${attempt} ناموفق: ${err.message}`);

      // اگه آخرین تلاش بود
      if (attempt === 3) {
        console.log(`\n💾 همه تلاش‌ها ناموفق - ذخیره محلی پیام...`);

        try {
          saveMessageLocally(name, email, message);

          const errorMsg = err.message.includes("ECONNREFUSED") || err.message.includes("ENOTFOUND")
            ? "❌ SOCKS5 Proxy در دسترس نیست!\n\n🔧 مطمئن شو که Xray داره اجرا هست:\n   cd backend\n   ./start-xray.bat\n\n✅ پیام ذخیره شده - بعد از وصل شدن proxy، دوباره ارسال میشه."
            : err.message.includes("timeout")
            ? "⏱️ Timeout - اتصال خیلی طول کشید.\n\n✅ پیام ذخیره شده. لطفاً اتصال اینترنت و Xray رو چک کن."
            : `⚠️ خطا در اتصال: ${err.message}\n\n✅ پیام ذخیره شده محلی.`;

          return res.status(200).json({
            ok: true,
            warning: errorMsg + `\n\n📱 همین الان می‌تونی از این راه‌ها باهام تماس بگیری:
• تلگرام: @S0phr
• اینستاگرام: @sepcode1`,
            fallback: true,
          });
        } catch (saveErr) {
          console.error("❌ خطا در ذخیره محلی:", saveErr);
          return res.status(500).json({
            ok: false,
            error: "مشکلی پیش اومد. لطفاً مستقیم تماس بگیر: @S0phr یا @sepcode1",
          });
        }
      }

      // صبر قبل از retry بعدی
      const waitTime = Math.pow(2, attempt - 1) * 1000; // 1s, 2s, 4s
      console.log(`⏳ صبر ${waitTime}ms قبل از تلاش بعدی...`);
      await new Promise((r) => setTimeout(r, waitTime));
    }
  }
});

// دیدن پیام‌های ذخیره شده
app.get("/messages", (req, res) => {
  try {
    const files = fs.readdirSync(MESSAGES_DIR).filter((f) => f.endsWith(".json"));
    const messages = files
      .map((f) => {
        const content = fs.readFileSync(path.join(MESSAGES_DIR, f), "utf8");
        return JSON.parse(content);
      })
      .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

    res.json({
      ok: true,
      count: messages.length,
      messages: messages,
    });
  } catch (err) {
    res.status(500).json({ ok: false, error: err.message });
  }
});

// ارسال مجدد پیام‌های ذخیره شده (بعد از وصل شدن proxy)
app.post("/retry-saved-messages", async (req, res) => {
  try {
    const files = fs.readdirSync(MESSAGES_DIR).filter((f) => f.endsWith(".json"));

    if (files.length === 0) {
      return res.json({
        ok: true,
        message: "هیچ پیام ذخیره شده‌ای برای ارسال مجدد وجود نداره!",
      });
    }

    console.log(`\n🔄 ارسال مجدد ${files.length} پیام ذخیره شده...`);

    const results = [];

    for (const file of files) {
      const filepath = path.join(MESSAGES_DIR, file);
      const data = JSON.parse(fs.readFileSync(filepath, "utf8"));

      const text = `
🔔 *پیام ذخیره شده (ارسال مجدد)*

👤 *نام:* ${data.name}
📧 *ایمیل:* ${data.email}

💬 *پیام:*
${data.message}

⏰ زمان اصلی: ${new Date(data.timestamp).toLocaleString("fa-IR")}
📤 ارسال مجدد: ${new Date().toLocaleString("fa-IR")}
      `.trim();

      try {
        console.log(`   📤 ${file}...`);
        const result = await sendToTelegramViaSocks5(text);

        if (result.ok) {
          fs.unlinkSync(filepath); // پاک کن بعد از ارسال موفق
          console.log(`   ✅ ارسال شد`);
          results.push({ file, status: "✅ ارسال شد" });
        } else {
          console.log(`   ❌ خطا: ${result.description}`);
          results.push({ file, status: `❌ ${result.description}` });
        }
      } catch (err) {
        console.log(`   ❌ خطا: ${err.message}`);
        results.push({ file, status: `❌ ${err.message}` });
      }

      // صبر 500ms بین هر پیام
      await new Promise((r) => setTimeout(r, 500));
    }

    const successCount = results.filter((r) => r.status.includes("✅")).length;

    res.json({
      ok: true,
      message: `${successCount} از ${files.length} پیام با موفقیت ارسال شد`,
      results: results,
    });
  } catch (err) {
    res.status(500).json({ ok: false, error: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`
╔═══════════════════════════════════════════════════════════════════╗
║                                                                   ║
║   🚀 Sepehr Portfolio Backend - با SOCKS5 Proxy                  ║
║                                                                   ║
║   📡 Backend: http://localhost:${PORT}                              ║
║   🔒 Proxy: ${SOCKS_PROXY}                            ║
║   📬 Telegram: api.telegram.org                                   ║
║   💬 Chat ID: ${TG_CHAT_ID}                                    ║
║                                                                   ║
║   ⚡ نکته مهم:                                                    ║
║      • اول Xray رو اجرا کن: ./start-xray.bat                    ║
║      • Xray باید روی localhost:10808 باشه                       ║
║      • اگه پورت فرق داره، متغیر SOCKS_PROXY رو تنظیم کن        ║
║                                                                   ║
╚═══════════════════════════════════════════════════════════════════╝
  `);

  console.log(`\n✅ Backend آماده دریافت پیام!`);
  console.log(`🧪 تست کن: http://localhost:${PORT}/\n`);
});
