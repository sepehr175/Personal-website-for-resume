# 🎨 Personal Website for Resume

A modern, animated portfolio website built with React and Node.js, featuring seamless Telegram bot integration for the contact form.

[![React](https://img.shields.io/badge/React-18.0+-61DAFB?style=flat&logo=react&logoColor=white)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-18.0+-339933?style=flat&logo=node.js&logoColor=white)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express-4.18+-000000?style=flat&logo=express&logoColor=white)](https://expressjs.com/)
[![Telegram](https://img.shields.io/badge/Telegram-Bot_API-26A5E4?style=flat&logo=telegram&logoColor=white)](https://core.telegram.org/bots/api)

---

## ✨ Features

- 🎨 **Modern Animated UI** - Smooth transitions and interactive elements
- 📱 **Fully Responsive** - Works perfectly on all devices
- 💬 **Telegram Integration** - Contact form messages sent directly to Telegram
- 🔄 **Auto Retry** - 3 attempts with exponential backoff
- 💾 **Local Fallback** - Messages saved locally if Telegram is unavailable
- 🔒 **VLESS Proxy Support** - Built-in support for bypassing filtering
- 🌐 **Multi-language** - Persian and English documentation

---

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ installed
- Xray-core (for proxy functionality)
- Telegram bot token and chat ID

### Installation

```bash
# Clone the repository
git clone https://github.com/[your-username]/Personal-website-for-resume.git
cd Personal-website-for-resume

# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

### Running the Application

**Option 1: Automatic (Windows)**

```bash
cd backend
./START-ALL.bat
```

Then in a new terminal:
```bash
cd frontend
npm start
```

**Option 2: Manual**

```bash
# Terminal 1: Xray Proxy
cd backend
./start-xray.bat

# Terminal 2: Backend
cd backend
npm start

# Terminal 3: Frontend
cd frontend
npm start
```

Visit `http://localhost:3000` and test the contact form!

---

## 📂 Project Structure

```
Personal-website-for-resume/
├── backend/                    # Node.js backend
│   ├── server.js              # Main server with SOCKS5 proxy
│   ├── xray-config.json       # VLESS configuration
│   ├── start-xray.bat         # Xray launcher
│   └── START-ALL.bat          # Complete setup launcher
│
├── frontend/                   # React frontend
│   ├── src/
│   │   ├── index.js
│   │   └── Portfolio.jsx      # Main component
│   └── public/
│
└── Documentation/              # Persian guides
    ├── WORKING-SOLUTION-FA.md
    ├── SETUP-XRAY-FA.md
    └── ...
```

---

## 🔧 Configuration

### Backend Configuration

Edit `backend/server.js`:

```javascript
const TG_BOT_TOKEN = "YOUR_BOT_TOKEN";
const TG_CHAT_ID = "YOUR_CHAT_ID";
const PORT = process.env.PORT || 3001;
```

### VLESS Configuration

Edit `backend/xray-config.json`:

```json
{
  "outbounds": [{
    "protocol": "vless",
    "settings": {
      "vnext": [{
        "address": "YOUR_SERVER",
        "port": 443,
        "users": [{
          "id": "YOUR_UUID"
        }]
      }]
    }
  }]
}
```

---

## 🎯 How It Works

```
┌─────────────┐
│   Frontend  │  Contact form submission
│ (React App) │
└──────┬──────┘
       │ POST /send-message
       ↓
┌─────────────────┐
│    Backend      │  Node.js + Express
│  (with SOCKS5)  │
└──────┬──────────┘
       │ SOCKS5 Proxy
       ↓
┌─────────────────┐
│      Xray       │  Proxy server
│  (VLESS/WS/TLS) │
└──────┬──────────┘
       │
       ↓
┌─────────────────┐
│  Telegram API   │  Bot sends message
└──────┬──────────┘
       │
       ↓
   ✅ Your Chat!
```

---

## 🧪 Testing

### Test SOCKS5 Connection

```bash
curl --socks5 127.0.0.1:10808 https://api.telegram.org
```

### Test Direct Message Send

```bash
cd backend
node test-direct-socks5.js
```

This sends a test message directly to your Telegram chat.

---

## 📖 Documentation

For detailed setup instructions in Persian:

- **Quick Start**: `README-SIMPLE-FA.md`
- **Complete Guide**: `WORKING-SOLUTION-FA.md`
- **Xray Setup**: `SETUP-XRAY-FA.md`
- **GitHub Upload**: `UPLOAD-TO-GITHUB.md`

---

## 🛠️ Tech Stack

### Frontend
- React 18
- Inline CSS with animations
- Responsive design

### Backend
- Node.js + Express
- Telegram Bot API
- SOCKS5 Proxy Agent
- Local fallback storage

### Proxy
- Xray-core
- VLESS protocol
- WebSocket + TLS transport

---

## 🌟 Features in Detail

### Contact Form
- Real-time validation
- Loading states
- Success/error messages
- Auto-clear on success

### Telegram Integration
- Direct message sending
- Retry mechanism (3 attempts)
- Exponential backoff
- Local message storage as fallback

### Proxy Support
- SOCKS5 proxy via Xray
- VLESS protocol support
- Automatic connection handling
- Network filtering bypass

---

## 🚀 Deployment

### Frontend (Vercel)

```bash
cd frontend
vercel --prod
```

### Backend (Railway)

```bash
cd backend
railway up
```

Update `frontend/src/Portfolio.jsx`:
```javascript
const BACKEND_URL = "https://your-backend-url.railway.app";
```

---

## 🔒 Security Notes

- Never commit `.env` files
- Keep your bot token private
- Use environment variables for production
- The `messages/` folder is gitignored
- Xray binary is not included in repo

---

## 📝 Environment Variables

Create `.env` file in `backend/`:

```env
TG_BOT_TOKEN=your_bot_token
TG_CHAT_ID=your_chat_id
SOCKS_PROXY=socks5://127.0.0.1:10808
PORT=3001
```

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

---

## 📞 Contact

- **Telegram**: [@S0phr](https://t.me/S0phr)
- **Instagram**: [@sepcode1](https://www.instagram.com/sepcode1)
- **GitHub**: [sepehr175](https://github.com/sepehr175)
- **LinkedIn**: [Sepehr Karimi](https://www.linkedin.com/in/sepehr-karimi-53a29837b)

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

## 🙏 Acknowledgments

- Telegram Bot API
- Xray-core project
- React team
- Express.js team

---

**Made with ❤️ by Sepehr Karimi**

⭐ Star this repo if you find it helpful!
