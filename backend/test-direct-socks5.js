// تست مستقیم SOCKS5 برای تلگرام
const https = require('https');
const { SocksProxyAgent } = require('socks-proxy-agent');

const BOT_TOKEN = "8912565501:AAHX22IYXHcwhPv2bo1zwkKxZGwqSyYgVcM";
const CHAT_ID = "5176532576";
const SOCKS_PROXY = "socks5://127.0.0.1:10808";

console.log('🧪 تست مستقیم ارسال به تلگرام با SOCKS5...\n');
console.log(`Bot Token: ${BOT_TOKEN.substring(0, 25)}...`);
console.log(`Chat ID: ${CHAT_ID}`);
console.log(`Proxy: ${SOCKS_PROXY}\n`);

const testMessage = {
  chat_id: CHAT_ID,
  text: `🎉 تست موفق!

این پیام مستقیماً از طریق SOCKS5 proxy ارسال شد.

✅ اگه این رو می‌بینی یعنی سیستم کاملاً کار می‌کنه!

⏰ ${new Date().toLocaleString('fa-IR', { timeZone: 'Asia/Tehran' })}`
};

const payload = JSON.stringify(testMessage);
const agent = new SocksProxyAgent(SOCKS_PROXY);

const options = {
  hostname: 'api.telegram.org',
  path: `/bot${BOT_TOKEN}/sendMessage`,
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': Buffer.byteLength(payload)
  },
  agent: agent,
  timeout: 30000
};

console.log('📤 در حال ارسال...\n');

const req = https.request(options, (res) => {
  let body = '';
  res.on('data', chunk => body += chunk);
  res.on('end', () => {
    try {
      const json = JSON.parse(body);
      console.log('📥 پاسخ دریافت شد:\n');
      console.log(JSON.stringify(json, null, 2));
      
      if (json.ok) {
        console.log('\n✅ SUCCESS! پیام با موفقیت ارسال شد!');
        console.log(`📱 Message ID: ${json.result.message_id}`);
        console.log('\n🎉 برو تلگرامت رو چک کن!');
      } else {
        console.log('\n❌ خطا از طرف Telegram API:');
        console.log(`   ${json.description}`);
      }
    } catch (e) {
      console.log('\n❌ خطا در parse کردن response');
      console.log('Body:', body);
    }
  });
});

req.setTimeout(30000, () => {
  console.log('❌ Timeout - اتصال خیلی طول کشید');
  req.destroy();
});

req.on('error', (err) => {
  console.log('\n❌ خطا در اتصال:');
  console.log(`   ${err.message}`);
  console.log('\nاحتمالاً:');
  console.log('   - Xray اجرا نیست');
  console.log('   - پورت 10808 در دسترس نیست');
  console.log('   - کانفیگ VLESS مشکل داره');
});

req.write(payload);
req.end();
