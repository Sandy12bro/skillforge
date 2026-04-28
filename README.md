# 🚀 CodeArena

> **Neo-Brutalist learning platform for interactive coding education**

[![Live Demo](https://img.shields.io/badge/Live%20Demo-Visit%20Now-brightgreen?style=for-the-badge&logo=vercel)](https://codearena-team.vercel.app/)
[![GitHub stars](https://img.shields.io/github/stars/Sandy12bro/codearena?style=for-the-badge&logo=github)](https://github.com/Sandy12bro/codearena)
[![License](https://img.shields.io/badge/License-MIT-blue?style=for-the-badge)](LICENSE)

## 🎯 What is CodeArena?

CodeArena is a **Neo-Brutalist interactive coding learning and development platform** that combines:
- 🤖 **AI-Powered Code Simulation** - Step-by-step code execution visualization
- 🎮 **Interactive Playground** - Practice coding with real-time feedback
- 📊 **Personal Dashboard** - Track your learning progress and achievements
- �️ **Learning Roadmaps** - Structured paths for skill development
- 🏆 **Gamification System** - Earn XP and compete on leaderboards
- 🔐 **Secure Authentication** - Firebase-based user management
- 🎨 **Modern UI/UX** - Neo-brutalist design with responsive layout

---

## ✨ Key Features

| Feature | Description | Tech Stack |
|---------|-------------|-----------|
| 🔐 **Secure Authentication** | Firebase-based login/signup | Firebase Auth |
| 👤 **User Management** | Complete profile system with MongoDB | MongoDB & Mongoose |
| 📊 **Personal Dashboard** | Track your learning progress | Next.js & React |
| � **Code Playground** | Interactive coding environment | Next.js API Routes |
| 🤖 **AI Code Simulation** | Step-by-step code execution | Gemini API |
| 🗺️ **Learning Roadmaps** | Structured skill development paths | Next.js |
| 🏆 **Gamification** | XP system and leaderboards | MongoDB |
| 🎨 **Neo-Brutalist Design** | Modern, bold UI/UX | Tailwind CSS |

---

## 🚀 Quick Start

### 🌐 Try It Now
**Visit our live application**: [https://codearena-team.vercel.app/](https://codearena-team.vercel.app/)

### 🛠️ Local Development

#### Prerequisites
- [Node.js](https://nodejs.org/) (v18 or higher)
- [MongoDB](https://www.mongodb.com/) (local or Atlas)
- [Firebase Project](https://console.firebase.google.com/)
- [Gemini API Key](https://makersuite.google.com/app/apikey) (for AI features)

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
cp .env.example .env  # Configure your environment variables
npm start
```

**3. Frontend Setup**
```bash
cd frontend
npm install
cp .env.example .env.local  # Configure your environment variables
npm run dev
```

The application will be available at `http://localhost:3000`

---

## 📁 Project Architecture

```
codearena/
├── 📂 frontend/          # Next.js frontend application
│   ├── 📂 src/
│   │   ├── 📂 app/          # Next.js app directory
│   │   │   ├── 🎮 playground/    # Code playground
│   │   │   ├── 📊 dashboard/     # User dashboard
│   │   │   ├── 🔐 login/          # Authentication
│   │   │   ├── � profile/        # Profile management
│   │   │   ├── 🗺️ roadmap/        # Learning roadmaps
│   │   │   ├── 🤖 ai-tools/       # AI-powered tools
│   │   │   ├── � api/           # API routes
│   │   │   └── 📄 page.tsx        # Home page
│   │   ├── 📂 components/    # Reusable components
│   │   ├── 📂 context/        # React context providers
│   │   ├── 📂 lib/            # Utility functions
│   │   └── 📂 data/           # Static data
│   ├── � globals.css         # Global styles
│   ├── ⚙️ next.config.ts       # Next.js configuration
│   ├── 📦 package.json         # Frontend dependencies
│   └── 🔧 .env.example         # Environment variables template
├── 📂 backend/           # Node.js API server
│   ├── ⚡ server.js            # Express server
│   ├── 🗄️ models/             # MongoDB models
│   ├── 🛠️ utils/              # Utility functions
│   ├── � package.json         # Backend dependencies
│   └── � .env.example         # Environment variables template
├── 📄 vercel.json         # Vercel deployment config
├── 📄 README.md           # This file
└── 📄 LICENSE             # MIT License
```

---

## 🔌 API Documentation

### Frontend API Routes (Next.js)
```http
POST /api/simulate     # AI-powered code simulation
POST /api/run          # Simple code execution
GET  /api/*            # Next.js API routes
```

### Backend API Routes (Express)
```http
POST /signup          # Register new user
POST /sync-user       # Sync user from Firebase
GET  /user/:email     # Get user profile
PUT  /user/:email     # Update profile
POST /update-profile  # Quick profile update
POST /run             # Code execution endpoint
POST /simulate        # Advanced code simulation
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
- **Next.js 14** - React framework with App Router
- **React 18** - UI library
- **TypeScript** - Type-safe JavaScript
- **Tailwind CSS** - Utility-first CSS framework
- **Firebase** - Authentication & real-time features
- **Gemini API** - AI-powered code simulation

### Backend Technologies
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - ODM for MongoDB
- **CORS** - Cross-origin resource sharing

### Deployment
- **Vercel** - Frontend hosting & deployment
- **Railway** - Backend hosting (alternative)
- **Serverless Functions** - Next.js API routes

---

## 🎮 Interactive Demo

[![CodeArena Demo](https://img.shields.io/badge/Try%20Demo-Live%20Now-orange?style=for-the-badge&logo=vercel)](https://codearena-team.vercel.app/)

**Experience CodeArena in action**:
1. ✅ **Create your account** with Firebase authentication
2. � **Try the code playground** with real-time simulation
3. 📊 **Explore your dashboard** with progress tracking
4. 🗺️ **Follow learning roadmaps** for structured development
5. 🏆 **Compete on leaderboards** with gamified learning

---

## 🤝 Contributing

We love contributions! Here's how you can help:

1. 🍴 **Fork** this repository
2. 🌿 **Create** a feature branch: `git checkout -b feature/amazing-feature`
3. 💾 **Commit** your changes: `git commit -m 'Add amazing feature'`
4. 📤 **Push** to the branch: `git push origin feature-amazing-feature`
5. 🔃 **Open** a Pull Request

---

## 📞 Support & Contact

- 🐛 **Bug Reports**: [GitHub Issues](https://github.com/Sandy12bro/codearena/issues)
- 💡 **Feature Requests**: [GitHub Discussions](https://github.com/Sandy12bro/codearena/discussions)
- 📧 **Email**: support@codearena.dev

---

## 📜 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

---

<div align="center">

### 🎉 **Thanks for checking out CodeArena!** 🎉

**Made with ❤️ by the CodeArena Team**

---

#### 👥 **Our Amazing Team**

**👑 Team Leader:** Sanskar Bhasme

**🎨 Team Members:**
- Prachi Jadhav
- Bhakti Mandal
- Sneha Jain

---

[![GitHub followers](https://img.shields.io/github/followers/Sandy12bro?style=social)](https://github.com/Sandy12bro)
[![Twitter](https://img.shields.io/twitter/follow/codearena_dev?style=social)](https://twitter.com/codearena_dev)

</div>
