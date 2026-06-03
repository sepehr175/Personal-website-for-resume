const express = require("express");
const cors = require("cors");
const https = require("https");
const http = require("http");
const fs = require("fs");
const path = require("path");

const app = express();

// ── Telegram credentials ──────────────────────────────────────────────────────
const TG_BOT_TOKEN = "8912565501:AAHX22IYXHcwhPv2bo1zwkKxZGwqSyYgVcM";
const TG_CHAT_ID = "5176532576";
const PORT = process.env.PORT || 3001;

// Telegram API hosts (fallback order)
const TG_API_HOSTS = [
  "api.telegram.org",           // اصلی (فیلتره)
  "149.154.167.220",            // IP مستقیم
  "149.154.175.50",             // IP دیگه
  process.env.TELEGRAM_PROXY    // از env اگه تنظیم شده
].filter(Boolean);

// Messages directory
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
  console.log(`💾 پیام ذخیره شد: ${filename}`);
  return filepath;
}

// روش 1: HTTPS به Telegram
function sendViaHTTPS(host, payload) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: host,
      path: `/bot${TG_BOT_TOKEN}/sendMessage`,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Content-Length": Buffer.byteLength(payload),
      },
      timeout: 15000,
    };

    const req = https.request(options, (res) => {
      let body = "";
      res.on("data", (chunk) => (body += chunk));
      res.on("end", () => {
        try {
          resolve(JSON.parse(body));
        } catch {
          reject(new Error("Invalid response"));
        }
      });
    });

    req.setTimeout(15000, () => {
      req.destroy();
      reject(new Error("Timeout"));
    });

    req.on("error", reject);
    req.write(payload);
    req.end();
  });
}

// روش 2: استفاده از Webhook (اگه سرور خارجی داشته باشی)
async function sendViaWebhook(data) {
  // این قسمت فعلاً غیرفعاله - میشه بعداً فعالش کرد
  return null;
}

// ── Routes ────────────────────────────────────────────────────────────────────

app.get("/", (req, res) => {
  res.json({
    ok: true,
    status: "🚀 Sepehr Portfolio Backend (Ultimate Edition)",
    telegram_hosts: TG_API_HOSTS,
    features: [
      "Multi-host fallback",
      "Auto retry (3x per host)",
      "Local storage backup",
      "Multiple send methods"
    ]
  });
});

app.post("/send-message", async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({
      ok: false,
      error: "لطفاً تمام فیلدها رو پر کن (نام، ایمیل، پیام)"
    });
  }

  console.log(`\n📨 پیام جدید از ${name} (${email})`);

  const text = `
🔔 *پیام جدید از پورتفولیو*

👤 *نام:* ${name}
📧 *ایمیل:* ${email}

💬 *پیام:*
${message}

⏰ ${new Date().toLocaleString("fa-IR", { timeZone: "Asia/Tehran" })}
  `.trim();

  const payload = JSON.stringify({
    chat_id: TG_CHAT_ID,
    text,
    parse_mode: "Markdown",
  });

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // Strategy: سعی می‌کنیم از همه hostها با retry
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  for (const host of TG_API_HOSTS) {
    console.log(`\n🌐 در حال تلاش با: ${host}`);
    
    for (let attempt = 1; attempt <= 3; attempt++) {
      try {
        console.log(`  📤 تلاش ${attempt}/3...`);
        const result = await sendViaHTTPS(host, payload);

        if (result.ok) {
          console.log(`  ✅ موفق! پیام ارسال شد به تلگرام`);
          return res.status(200).json({
            ok: true,
            message: "پیام با موفقیت ارسال شد!",
            via: host
          });
        } else {
          console.log(`  ⚠️ خطای Telegram API:`, result.description);
        }
      } catch (err) {
        console.log(`  ❌ خطا: ${err.message}`);
        
        if (attempt < 3) {
          const wait = Math.pow(2, attempt - 1) * 500; // 500ms, 1s, 2s
          console.log(`  ⏳ صبر ${wait}ms قبل از تلاش بعدی...`);
          await new Promise((r) => setTimeout(r, wait));
        }
      }
    }
    
    console.log(`  ⛔ ${host} کار نکرد، رفتن به host بعدی...`);
  }

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // اگه هیچ کدوم کار نکرد: پیام رو local ذخیره کن
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  console.log(`\n💾 همه تلاش‌ها ناموفق - ذخیره محلی پیام...`);
  
  try {
    saveMessageLocally(name, email, message);

    return res.status(200).json({
      ok: true,
      warning: `⚠️ متأسفانه نتونستم به تلگرام وصل بشم (احتمالاً فیلتره).

✅ نگران نباش! پیام شما محلی ذخیره شده و من دریافتش می‌کنم.

📱 می‌تونی همین الان از راه‌های زیر هم باهام تماس بگیری:
• تلگرام: @S0phr
• اینستاگرام: @sepcode1

🙏 ممنون از پیامت - به زودی جوابت رو میدم!`,
      fallback: true,
    });
  } catch (saveErr) {
    console.error("❌ خطا در ذخیره محلی:", saveErr.message);
    return res.status(500).json({
      ok: false,
      error: `متأسفانه مشکلی پیش اومد. لطفاً مستقیماً از این راه‌ها باهام تماس بگیر:
      
📱 تلگرام: @S0phr
📸 اینستاگرام: @sepcode1

یا ایمیل بزن به: sepehr.dev@gmail.com`
    });
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

    res.json({ ok: true, count: messages.length, messages });
  } catch (err) {
    res.status(500).json({ ok: false, error: err.message });
  }
});

// ارسال دستی پیام‌های ذخیره شده (برای بعد از وصل شدن VPN)
app.post("/retry-messages", async (req, res) => {
  try {
    const files = fs.readdirSync(MESSAGES_DIR).filter((f) => f.endsWith(".json"));
    
    if (files.length === 0) {
      return res.json({ ok: true, message: "هیچ پیام ذخیره شده‌ای وجود نداره!" });
    }

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
📤 زمان ارسال مجدد: ${new Date().toLocaleString("fa-IR")}
      `.trim();

      const payload = JSON.stringify({
        chat_id: TG_CHAT_ID,
        text,
        parse_mode: "Markdown",
      });

      try {
        const result = await sendViaHTTPS(TG_API_HOSTS[0], payload);
        
        if (result.ok) {
          fs.unlinkSync(filepath); // پاک کن بعد از ارسال موفق
          results.push({ file, status: "✅ ارسال شد" });
        } else {
          results.push({ file, status: "❌ خطا: " + result.description });
        }
      } catch (err) {
        results.push({ file, status: "❌ خطا: " + err.message });
      }
    }

    res.json({
      ok: true,
      message: `${results.filter(r => r.status.includes("✅")).length} پیام از ${files.length} ارسال شد`,
      results
    });
  } catch (err) {
    res.status(500).json({ ok: false, error: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`
╔════════════════════════════════════════════════════════════════╗
║                                                                ║
║   🚀 Sepehr Portfolio Backend - Ultimate Edition              ║
║                                                                ║
║   📡 Running on: http://localhost:${PORT}                        ║
║   📬 Telegram Chat ID: ${TG_CHAT_ID}                        ║
║   🌐 Fallback Hosts: ${TG_API_HOSTS.length}                                        ║
║                                                                ║
║   ⚡ Features:                                                 ║
║      • Multi-host retry                                       ║
║      • Auto fallback storage                                  ║
║      • Manual retry endpoint                                  ║
║                                                                ║
╚════════════════════════════════════════════════════════════════╝
  `);
});
