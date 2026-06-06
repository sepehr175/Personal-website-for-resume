# 🚀 Sepehr's Portfolio - Vercel Ready

Modern portfolio website with React frontend and Telegram contact form integration, optimized for Vercel deployment.

## ✨ Features

- 🎨 Beautiful, responsive React portfolio
- 📱 Contact form with direct Telegram integration
- ☁️ Serverless architecture (Vercel Functions)
- 🔒 Secure environment variables handling
- ⚡ Fast deployment and automatic CI/CD
- 🌐 Custom domain support

## 📁 Project Structure

```
sepehr-portfolio/
├── api/
│   └── send-message.js       # Vercel Serverless Function (Telegram API)
├── frontend/
│   ├── src/
│   │   ├── Portfolio.jsx     # Main React component
│   │   └── index.js          # Entry point
│   ├── public/
│   │   └── index.html
│   └── package.json
├── vercel.json               # Vercel configuration
├── .gitignore
├── .env.example
└── package.json
```

## 🚀 Quick Start

### 1. Prerequisites

- Node.js 16+
- Vercel account (free)
- GitHub account
- Telegram bot token (from [@BotFather](https://t.me/BotFather))
- Your Telegram Chat ID (from [@userinfobot](https://t.me/userinfobot))

### 2. Local Development

```bash
# Install dependencies
cd frontend
npm install

# Start development server
npm start
```

Open [http://localhost:3000](http://localhost:3000)

### 3. Deploy to Vercel

#### Option A: Using Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

#### Option B: Using GitHub Integration (Recommended)

1. Push to GitHub:
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
git push -u origin main
```

2. Go to [vercel.com](https://vercel.com)
3. Click **New Project**
4. Import your GitHub repository
5. Configure build settings:
   - **Build Command**: `cd frontend && npm install && npm run build`
   - **Output Directory**: `frontend/build`
   - **Install Command**: `npm install`

6. Add Environment Variables:
   - `TELEGRAM_BOT_TOKEN`: Your bot token from @BotFather
   - `TELEGRAM_CHAT_ID`: Your chat ID

7. Click **Deploy**

## 🔧 Environment Variables

Create these in Vercel Dashboard → Project Settings → Environment Variables:

| Variable | Description | Example |
|----------|-------------|---------|
| `TELEGRAM_BOT_TOKEN` | Bot token from @BotFather | `1234567890:ABCdef...` |
| `TELEGRAM_CHAT_ID` | Your Telegram user ID | `123456789` |

⚠️ **Never commit these values to Git!**

## 📝 Configuration

### API Endpoint

The contact form automatically uses:
- **Development**: `http://localhost:3000/api/send-message`
- **Production**: `https://your-domain.vercel.app/api/send-message`

No manual configuration needed! The frontend uses `window.location.origin`.

### Custom Domain

1. Go to Vercel Dashboard → Project → Settings → Domains
2. Add your custom domain
3. Update DNS records as instructed

## 🧪 Testing

### Test the API locally:

```bash
curl -X POST http://localhost:3000/api/send-message \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"test@example.com","message":"Hello!"}'
```

### Test the deployed API:

```bash
curl -X POST https://your-site.vercel.app/api/send-message \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"test@example.com","message":"Hello from Vercel!"}'
```

## 🐛 Troubleshooting

### Build fails on Vercel

- Check build logs in Vercel Dashboard
- Ensure `frontend/package.json` is valid
- Try clearing build cache: Settings → General → Clear Cache

### Telegram messages not received

1. Verify bot token and chat ID in Environment Variables
2. Make sure you've sent `/start` to your bot
3. Test the bot token:
   ```
   https://api.telegram.org/bot<YOUR_TOKEN>/getMe
   ```

### 404 on API endpoint

- Ensure `api/send-message.js` exists in root
- Check `vercel.json` routing configuration
- Redeploy the project

## 📚 Documentation

- **Full Farsi Guide**: [VERCEL-DEPLOY-GUIDE-FA.md](./VERCEL-DEPLOY-GUIDE-FA.md)
- **Vercel Docs**: [vercel.com/docs](https://vercel.com/docs)
- **Telegram Bot API**: [core.telegram.org/bots/api](https://core.telegram.org/bots/api)

## 🔄 Updating

When you push changes to GitHub, Vercel automatically rebuilds and deploys:

```bash
git add .
git commit -m "Update portfolio"
git push
```

## 📊 Monitoring

View analytics in Vercel Dashboard:
- Page views
- API calls
- Performance metrics
- Error logs

## 📄 License

MIT License - feel free to use this for your own portfolio!

## 🤝 Contact

- **Telegram**: [@S0phr](https://t.me/S0phr)
- **Instagram**: [@sepcode1](https://instagram.com/sepcode1)
- **GitHub**: [@sepehr175](https://github.com/sepehr175)

---

Built with ❤️ using React & Vercel
