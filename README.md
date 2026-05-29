<div align="center">

![Header](https://capsule-render.vercel.app/api?type=waving&color=0:0d0d0d,50:1a1a2e,100:16213e&height=200&section=header&text=Iklash+Ahamed&fontSize=64&fontColor=ffffff&animation=fadeIn&fontAlignY=38&desc=AI-Powered%20Developer%20Portfolio&descAlignY=58&descSize=20&descColor=a78bfa)

[![Typing SVG](https://readme-typing-svg.demolab.com?font=Fira+Code&weight=600&size=20&duration=3000&pause=800&color=A78BFA&center=true&vCenter=true&width=700&lines=AI+Portfolio+Assistant;Semantic+Vector+Search;AI+Email+Generator;Interactive+Developer+Showcase;Full+Stack+%7C+AI+Builder+%7C+SDE+Candidate)](https://git.io/typing-svg)

<br/>

[![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)](https://nextjs.org)
[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-0055FF?style=for-the-badge&logo=framer&logoColor=white)](https://www.framer.com/motion)
[![Pinecone](https://img.shields.io/badge/Pinecone-000000?style=for-the-badge&logo=pinecone&logoColor=white)](https://pinecone.io)
[![Gemini AI](https://img.shields.io/badge/Gemini_AI-4285F4?style=for-the-badge&logo=google&logoColor=white)](https://ai.google.dev)
[![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://vercel.com)

<br/>

[![Live Demo](https://img.shields.io/badge/Live_Demo--a78bfa?style=for-the-badge)](https://iklash-portfolio.vercel.app/)
[![GitHub Stars](https://img.shields.io/github/stars/Ahamedin/iklashPortfolio?style=for-the-badge&color=fbbf24&labelColor=1e1b4b)](https://github.com/Ahamedin/iklashPortfolio)
[![License](https://img.shields.io/badge/License-MIT-a78bfa?style=for-the-badge)](LICENSE)

</div>

---

## 📌 What is this Portfolio?

A modern **AI-powered developer portfolio** built to showcase projects, skills, experience, and technical expertise through an immersive and interactive user experience.

> Built with Next.js · TypeScript · Pinecone · OpenRouter · Google Gemini · Framer Motion

The platform integrates AI-powered chat, vector search, intelligent email generation, semantic retrieval, and modern animated UI experiences — all backed by scalable full-stack architecture.

---

## ✨ Features

<table>
<tr>
<td width="50%">

### 🎨 Interactive Portfolio Experience
- Modern responsive portfolio UI
- Smooth animations via Framer Motion & Anime.js
- Fully responsive across all devices
- Immersive developer showcase

### 🤖 AI Portfolio Assistant
- AI-powered conversational assistant
- Context-aware responses
- Portfolio-based intelligent Q&A
- Vector search enhanced retrieval
- OpenRouter LLM integration

### ✉️ AI Email Generator
- Generate professional emails instantly
- AI-assisted email drafting
- Gmail SMTP integration
- Email validation with Abstract API

</td>
<td width="50%">

### 🔍 Semantic Search & AI Retrieval
- Pinecone vector database integration
- Semantic portfolio search
- Google Gemini embeddings
- Context-aware AI responses

### 🛠️ Developer Utilities
- GitHub integrations
- LeetCode support
- Interactive developer tools
- Dynamic portfolio workflows

### 🔐 Security & Backend
- JWT authentication
- Protected API routes
- CORS middleware support
- Secure environment-based configuration

</td>
</tr>
</table>

---

## 🛠️ Tech Stack

| Layer | Technology |
|:---|:---|
| **Frontend** | Next.js, React.js, TypeScript, Tailwind CSS |
| **UI & Animations** | Framer Motion, Anime.js, Lucide React, React Icons |
| **Backend** | Next.js API Routes, Node.js |
| **AI Integration** | OpenRouter, Tavily Search, Google Gemini |
| **Vector Database** | Pinecone |
| **Email Services** | Nodemailer, Gmail SMTP |
| **Authentication** | JWT |
| **Deployment** | Vercel |

---

## 🗂️ Project Structure

```bash
My-Portfolio/
├── app/                  # Next.js App Router pages & layouts
├── components/           # Reusable UI components
├── lib/                  # Utilities, helpers, AI client setup
├── public/               # Static assets
├── scripts/              # Vector store init & embed scripts
├── middleware/           # CORS & auth middleware
├── styles/               # Global styles
└── types/                # TypeScript type definitions
```

---

## ⚡ Getting Started

### Prerequisites
- Node.js 18+
- A [Pinecone](https://app.pinecone.io) account
- An [OpenRouter](https://openrouter.ai) API key
- A [Google AI Studio](https://ai.google.dev) Gemini API key
- A [Tavily](https://tavily.com) API key
- Gmail account with App Password enabled

### 1. Clone the repository

```bash
git clone https://github.com/Ahamedin/iklashPortfolio.git
```

### 2. Navigate to project

```bash
cd iklashPortfolio
```

### 3. Install dependencies

```bash
npm install --legacy-peer-deps
```

---

## 🔑 Environment Variables

Create a `.env.local` file in the root directory:

```env
# ====================================
# Gmail SMTP Configuration
# Generate App Password:
# https://myaccount.google.com/apppasswords
# ====================================
EMAIL_USER=your_email@gmail.com
EMAIL_APP_PASSWORD=your_gmail_app_password

# ====================================
# Abstract API
# https://app.abstractapi.com/
# ====================================
ABSTRACT_API_KEY=your_abstract_api_key

# ====================================
# OpenRouter AI
# https://openrouter.ai/
# ====================================
OPENROUTER_API_KEY=your_openrouter_api_key

# ====================================
# Tavily Search API
# https://tavily.com/
# ====================================
TAVILY_API_KEY=your_tavily_api_key

# ====================================
# Pinecone Vector Database
# https://app.pinecone.io/
# ====================================
PINECONE_API_KEY=your_pinecone_api_key
PINECONE_INDEX_NAME=portfolio-embeddings

# ====================================
# Google Gemini API
# https://ai.google.dev/
# ====================================
GOOGLE_API_KEY=your_google_api_key

# ====================================
# JWT Authentication
# Generate: node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
# ====================================
JWT_SECRET=your_jwt_secret
JWT_EXPIRY=1m

# ====================================
# Allowed Origins
# ====================================
ALLOWED_ORIGINS=http://localhost:3000,https://your-domain.vercel.app
```

---

## 🧠 Vector Store Setup

Initialize Pinecone vector embeddings:

```bash
npm run init-vector-store
```

Embed theme structure:

```bash
npm run embed-theme
```

---

## 🚀 Running the App

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build

```bash
npm run build
npm run start
```

---

## ☁️ Deployment

Optimized for **Vercel** deployment.

| Setting | Value |
|:---|:---|
| **Install Command** | `npm install --legacy-peer-deps` |
| **Build Command** | `npm run build` |
| **Output Directory** | `.next` |

> Add all environment variables in your Vercel project settings before deploying.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/Ahamedin/iklashPortfolio)

---

## 🔭 AI Features Included

- [x] OpenRouter LLM Integration
- [x] Tavily Web Search
- [x] Pinecone Semantic Search
- [x] Google Gemini Embeddings
- [x] AI Email Generation
- [x] Context-Aware Portfolio Assistant

---

## 👨‍💻 Author

<div align="center">

**Iklash Ahamed**

[![GitHub](https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/Ahamedin)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/iklashahamed)
[![Portfolio](https://img.shields.io/badge/Portfolio-a78bfa?style=for-the-badge&logo=vercel&logoColor=white)](https://iklash-portfolio.vercel.app/)

*Full Stack Developer · AI Builder · SDE Candidate*

</div>

---

## 📄 License

This project is open-source and available under the **MIT License**.

---

<div align="center">

![Footer](https://capsule-render.vercel.app/api?type=waving&color=0:0d0d0d,50:1a1a2e,100:16213e&height=100&section=footer&animation=fadeIn)

*If this project helped you, consider giving it a ⭐ — it means a lot!*

</div>
