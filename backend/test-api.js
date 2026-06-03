// Test script to check if the backend API is working
const https = require('https');

const testMessage = {
  name: "Test User",
  email: "test@example.com",
  message: "This is a test message from the test script"
};

const data = JSON.stringify(testMessage);

const options = {
  hostname: 'localhost',
  port: 3001,
  path: '/send-message',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': data.length
  }
};

console.log('🧪 Testing API...\n');
console.log('Sending test message:', testMessage);
console.log('\nWaiting for response...\n');

const req = https.request(options, (res) => {
  let body = '';
  
  res.on('data', (chunk) => {
    body += chunk;
  });
  
  res.on('end', () => {
    console.log('Status Code:', res.statusCode);
    console.log('Response:', body);
    
    try {
      const json = JSON.parse(body);
      console.log('\n✅ Response parsed successfully:');
      console.log(JSON.stringify(json, null, 2));
      
      if (json.ok) {
        if (json.fallback) {
          console.log('\n⚠️ Message was saved locally (Telegram failed)');
          console.log('Check http://localhost:3001/messages to see saved messages');
        } else {
          console.log('\n🎉 Success! Message sent to Telegram!');
        }
      } else {
        console.log('\n❌ Error:', json.error);
      }
    } catch (e) {
      console.error('\n❌ Failed to parse response:', e.message);
    }
  });
});

req.on('error', (e) => {
  console.error('❌ Request failed:', e.message);
  console.log('\nMake sure the backend is running:');
  console.log('  cd backend');
  console.log('  npm start');
});

req.write(data);
req.end();
