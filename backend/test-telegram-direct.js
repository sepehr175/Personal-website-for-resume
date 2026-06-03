// تست مستقیم ارسال به Telegram API
const https = require('https');

const BOT_TOKEN = "8912565501:AAHX22IYXHcwhPv2bo1zwkKxZGwqSyYgVcM";
const CHAT_ID = "5176532576";

// لیست hostهایی که امتحان می‌کنیم
const HOSTS = [
  { name: "API اصلی", host: "api.telegram.org" },
  { name: "IP مستقیم 1", host: "149.154.167.220" },
  { name: "IP مستقیم 2", host: "149.154.175.50" },
  { name: "IP مستقیم 3", host: "149.154.167.99" },
];

const testMessage = {
  chat_id: CHAT_ID,
  text: `🧪 تست اتصال

این یه پیام تستی هست که مستقیماً از Node.js ارسال شده.

⏰ ${new Date().toLocaleString("fa-IR", { timeZone: "Asia/Tehran" })}

✅ اگه این پیام رو دیدی یعنی سیستم کار می‌کنه!`
};

async function testHost(hostInfo) {
  return new Promise((resolve) => {
    console.log(`\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`);
    console.log(`🧪 در حال تست: ${hostInfo.name}`);
    console.log(`   Host: ${hostInfo.host}`);

    const payload = JSON.stringify(testMessage);
    const options = {
      hostname: hostInfo.host,
      path: `/bot${BOT_TOKEN}/sendMessage`,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(payload)
      },
      timeout: 10000
    };

    const startTime = Date.now();
    const req = https.request(options, (res) => {
      let body = '';
      res.on('data', chunk => body += chunk);
      res.on('end', () => {
        const duration = Date.now() - startTime;
        try {
          const json = JSON.parse(body);
          if (json.ok) {
            console.log(`   ✅ موفق! پیام ارسال شد (${duration}ms)`);
            console.log(`   📱 پیام ID: ${json.result.message_id}`);
            resolve({ success: true, host: hostInfo, duration });
          } else {
            console.log(`   ❌ خطای Telegram: ${json.description}`);
            resolve({ success: false, host: hostInfo, error: json.description });
          }
        } catch (e) {
          console.log(`   ❌ خطا در parse کردن response`);
          resolve({ success: false, host: hostInfo, error: 'Invalid JSON' });
        }
      });
    });

    req.setTimeout(10000, () => {
      console.log(`   ⏱️ Timeout (10 ثانیه)`);
      req.destroy();
      resolve({ success: false, host: hostInfo, error: 'Timeout' });
    });

    req.on('error', (err) => {
      console.log(`   ❌ خطای اتصال: ${err.message}`);
      resolve({ success: false, host: hostInfo, error: err.message });
    });

    req.write(payload);
    req.end();
  });
}

async function main() {
  console.log(`
╔════════════════════════════════════════════════════════════════╗
║                                                                ║
║        🧪 تست مستقیم اتصال به Telegram Bot API               ║
║                                                                ║
╚════════════════════════════════════════════════════════════════╝
`);

  console.log(`Bot Token: ${BOT_TOKEN.substring(0, 20)}...`);
  console.log(`Chat ID: ${CHAT_ID}`);
  console.log(`\nدر حال تست ${HOSTS.length} host مختلف...\n`);

  const results = [];
  
  for (const host of HOSTS) {
    const result = await testHost(host);
    results.push(result);
    await new Promise(r => setTimeout(r, 1000)); // صبر 1 ثانیه بین تست‌ها
  }

  console.log(`\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`);
  console.log(`\n📊 خلاصه نتایج:\n`);

  const successful = results.filter(r => r.success);
  const failed = results.filter(r => !r.success);

  if (successful.length > 0) {
    console.log(`✅ موفق (${successful.length}):`);
    successful.forEach(r => {
      console.log(`   • ${r.host.name} - ${r.duration}ms`);
    });
  }

  if (failed.length > 0) {
    console.log(`\n❌ ناموفق (${failed.length}):`);
    failed.forEach(r => {
      console.log(`   • ${r.host.name} - ${r.error}`);
    });
  }

  console.log(`\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n`);

  if (successful.length === 0) {
    console.log(`⚠️  هیچ کدوم از hostها کار نکرد!`);
    console.log(`\n💡 راه‌حل‌ها:`);
    console.log(`   1. VPN/Proxy وصل کن و دوباره تست کن`);
    console.log(`   2. از Xray استفاده کن (راهنما: SETUP-XRAY-FA.md)`);
    console.log(`   3. بررسی کن Bot Token و Chat ID درست باشن`);
    console.log(`   4. مطمئن شو بات رو Start کردی (@AskSphere742Bot)`);
  } else {
    console.log(`🎉 حداقل یک host کار کرد!`);
    console.log(`   Backend حالا می‌تونه از این hostها استفاده کنه.`);
  }

  console.log(`\n`);
}

main().catch(console.error);
