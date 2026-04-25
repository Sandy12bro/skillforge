# 🚀 CodeArena

> **Level up your coding skills with AI-powered learning and personalized roadmaps!**

[![Live Demo](https://img.shields.io/badge/Live%20Demo-Visit%20Now-brightgreen?style=for-the-badge&logo=vercel)](https://codearena-team.vercel.app/)
[![GitHub stars](https://img.shields.io/github/stars/Sandy12bro/codearena?style=for-the-badge&logo=github)](https://github.com/Sandy12bro/codearena)
[![License](https://img.shields.io/badge/License-MIT-blue?style=for-the-badge)](LICENSE)

## 🎯 What is CodeArena?

CodeArena is your ultimate **placement preparation platform** that combines:
- 📱 **WhatsApp-based daily tasks** to keep you consistent
- 🗺️ **Personalized learning roadmaps** tailored to your goals
- 🤖 **AI-powered feedback** to accelerate your progress
- 🎮 **Gamified experience** to make learning fun

---

## ✨ Key Features

| Feature | Description | Tech Stack |
|---------|-------------|-----------|
| 🔐 **Secure Authentication** | Firebase-based login/signup | Firebase Auth |
| 👤 **User Management** | Complete profile system | MongoDB |
| 📊 **Personal Dashboard** | Track your progress | Vanilla JS |
| 🎨 **Responsive Design** | Works on all devices | CSS3 |
| ⚡ **Real-time Updates** | Instant feedback system | Express.js |
| 🛡️ **Data Security** | Encrypted user data | Mongoose |

---

## 🚀 Quick Start

### 🌐 Try It Now
**Visit our live application**: [https://codearena-team.vercel.app/](https://codearena-team.vercel.app/)

### 🛠️ Local Development

#### Prerequisites
- [Node.js](https://nodejs.org/) (v14 or higher)
- [MongoDB](https://www.mongodb.com/) (local or Atlas)
- [Firebase Project](https://console.firebase.google.com/)

#### 🎯 Setup in 3 Steps

**1. Clone & Install**
```bash
git clone https://github.com/Sandy12bro/codearena.git
cd codearena
```

**2. Backend Setup**
```bash
cd backend
npm install
cp .env.example .env  # Configure your environment
npm start
```

**3. Frontend Setup**
```bash
cd ../frontend
# Configure Firebase in firebase.js
# Open index.html in your browser
```

---

## 📁 Project Architecture

```
codearena/
├── 📂 frontend/          # React-like frontend
│   ├── 🎨 index.html     # Main landing page
│   ├── 🔐 login.html     # Authentication
│   ├── 📊 dashboard.html # User dashboard
│   ├── 👤 profile.html   # Profile management
│   └── 🎯 signup.html    # Registration
├── 📂 backend/           # Node.js API
│   ├── ⚡ server.js       # Express server
│   ├── 🗄️ models/        # MongoDB models
│   └── 🔧 package.json   # Dependencies
└── 📚 Documentation
```

---

## 🔌 API Documentation

### Authentication Endpoints
```http
POST /api/signup     # Register new user
GET  /api/user/:email # Get user profile
PUT  /api/user/:email # Update profile
POST /api/update-profile # Quick profile update
```

### Response Format
```json
{
  "success": true,
  "message": "Operation completed",
  "data": { ... }
}
```

---

## 🛠️ Tech Stack

### Frontend Technologies
- **HTML5** - Semantic markup
- **CSS3** - Modern styling with animations
- **JavaScript ES6+** - Modern web development
- **Firebase** - Authentication & real-time features

### Backend Technologies
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - ODM for MongoDB

### Deployment
- **Vercel** - Frontend hosting
- **Serverless Functions** - Backend API

---

## 🎮 Interactive Demo

[![CodeArena Demo](https://img.shields.io/badge/Try%20Demo-Live%20Now-orange?style=for-the-badge&logo=vercel)](https://codearena-team.vercel.app/)

**Experience CodeArena in action**:
1. ✅ Create your account
2. 🎯 Set your learning goals
3. 📊 Track your progress
4. 🏆 Unlock achievements

---

## 🤝 Contributing

We love contributions! Here's how you can help:

1. 🍴 **Fork** this repository
2. 🌿 **Create** a feature branch: `git checkout -b feature/amazing-feature`
3. 💾 **Commit** your changes: `git commit -m 'Add amazing feature'`
4. 📤 **Push** to the branch: `git push origin feature/amazing-feature`
5. 🔃 **Open** a Pull Request

### 👥 Development Team
- **Team Leader** - Sanskar Bhasme
- **Frontend** - Prachi Jadhav & Bhakti Mandal
- **Backend** - Sneha Jain
- **DevOps** - Sanskar Bhasme

---

## 📞 Support & Contact

- 🐛 **Bug Reports**: [GitHub Issues](https://github.com/Sandy12bro/codearena/issues)
- 💡 **Feature Requests**: [GitHub Discussions](https://github.com/Sandy12bro/codearena/discussions)
- 📧 **Email**: support@codearena.dev

---

## 📜 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

---

## 🌟 Star History

[![Star History Chart](https://api.star-history.com/svg?repos=Sandy12bro/codearena&type=Date)](https://star-history.com/#Sandy12bro/codearena&Date)

---

<div align="center">

### 🎉 **Thanks for checking out CodeArena!** 🎉

**Made with ❤️ by the CodeArena Team**

---

#### 👥 **Our Amazing Team**

**👑 Team Leader: Sanskar Bhasme**

**🎨 Frontend Team:**
- Prachi Jadhav
- Bhakti Mandal

**⚡ Backend Team:**
- Sneha Jain

---

[![GitHub followers](https://img.shields.io/github/followers/Sandy12bro?style=social)](https://github.com/Sandy12bro)
[![Twitter](https://img.shields.io/twitter/follow/codearena_dev?style=social)](https://twitter.com/codearena_dev)

</div>
