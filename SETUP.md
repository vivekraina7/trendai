# EduTrend AI — Setup & Run Guide

> **Stack:** Next.js 15 · FastAPI · SQLite · ChromaDB · Google Gemini 2.0 Flash  
> **Cost:** 100% free for local development

---

## Prerequisites

Make sure you have these installed before starting:

| Tool | Version | Install |
|------|---------|---------|
| Node.js | 18 or above | https://nodejs.org |
| Python | 3.11 or above | https://python.org |
| `uv` (Python package manager) | latest | `curl -LsSf https://astral.sh/uv/install.sh \| sh` |

---

## Step 1 — Get the Code

```bash
# If you received a zip, extract it. Otherwise clone from GitHub:
git clone <repo-url>
cd trendai
```

---

## Step 2 — Configure API Keys

### 2a. Backend `.env`

Open **`backend/.env`** and fill in the values below:

```env
# ── REQUIRED ─────────────────────────────────────────────────────────────────

# Gemini API Key (FREE — 1 million tokens/day)
# Get it at: https://aistudio.google.com/app/apikey
GEMINI_API_KEY=your_gemini_api_key_here

# JWT secret — change this to any random long string
JWT_SECRET=change_me_to_any_long_random_string_2026

# ── OPTIONAL: Google OAuth (for "Sign in with Google" button) ─────────────────
# Get from: https://console.cloud.google.com
#   1. Create a project → APIs & Services → Credentials
#   2. Create OAuth 2.0 Client ID (Web Application)
#   3. Add Authorized Redirect URI: http://localhost:8000/api/auth/google/callback
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=

# ── OPTIONAL: GitHub OAuth (for "Sign in with GitHub" button) ────────────────
# Get from: https://github.com/settings/developers → New OAuth App
#   Homepage URL:       http://localhost:3000
#   Callback URL:       http://localhost:8000/api/auth/github/callback
GITHUB_CLIENT_ID=
GITHUB_CLIENT_SECRET=

# ── OPTIONAL: Email (for real password reset emails) ─────────────────────────
# Without this, reset codes are shown on-screen (fine for local dev)
# Works with Gmail App Passwords: https://myaccount.google.com/apppasswords
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_gmail_app_password
FROM_EMAIL=your_email@gmail.com

# ── App settings (leave as-is for local dev) ─────────────────────────────────
FRONTEND_URL=http://localhost:3000
BACKEND_PORT=8000
DB_PATH=./edutrend.db
CHROMA_PATH=./chroma_db
```

> **Note:** Only `GEMINI_API_KEY` and `JWT_SECRET` are required to run the app.  
> OAuth and SMTP are optional features that can be added later.

---

### 2b. Frontend `.env.local`

Open **`edutrend-ai/.env.local`** (already configured, no changes needed for local):

```env
NEXT_PUBLIC_API_URL=http://localhost:8000
NEXTAUTH_SECRET=any_random_string
NEXTAUTH_URL=http://localhost:3000
```

---

## Step 3 — Install Dependencies

### Backend (Python)

```bash
cd backend
uv sync
```

> `uv sync` reads `pyproject.toml` and installs all Python dependencies automatically.

### Frontend (Node.js)

```bash
cd edutrend-ai
npm install
```

---

## Step 4 — Run the Project

You need **two terminal windows** running simultaneously.

### Terminal 1 — Backend API

```bash
cd backend
uv run uvicorn main:app --reload --port 8000
```

You should see:
```
✅ Database initialised at ./edutrend.db
INFO:     Uvicorn running on http://127.0.0.1:8000
```

### Terminal 2 — Frontend

```bash
cd edutrend-ai
npm run dev
```

You should see:
```
✓ Ready in 1836ms
```

---

## Step 5 — Open in Browser

| URL | What it is |
|-----|-----------|
| http://localhost:3000 | Main application |
| http://localhost:3000/signup | Create an account |
| http://localhost:3000/login | Sign in |
| http://localhost:3000/dashboard | Analytics dashboard |
| http://localhost:3000/ai-mentor | AI chat + PDF upload |
| http://localhost:3000/trends | Live trend explorer |
| http://localhost:3000/learning-path | Learning paths |
| http://localhost:8000/docs | Backend API docs (Swagger UI) |

---

## Where to Get Each API Key

### 🔑 Gemini API Key (REQUIRED)

1. Go to **https://aistudio.google.com/app/apikey**
2. Sign in with your Google account
3. Click **"Create API Key"**
4. Copy and paste it into `backend/.env` as `GEMINI_API_KEY`

> Free tier: 1,000,000 tokens/day on Gemini 2.0 Flash — more than enough.

---

### 🔑 Google OAuth (OPTIONAL — for Google login button)

1. Go to **https://console.cloud.google.com**
2. Create a new project (or use an existing one)
3. Navigate to **APIs & Services → Credentials**
4. Click **"Create Credentials" → "OAuth 2.0 Client ID"**
5. Application type: **Web application**
6. Add to **Authorized Redirect URIs**:
   ```
   http://localhost:8000/api/auth/google/callback
   ```
7. Copy **Client ID** → `GOOGLE_CLIENT_ID` in `backend/.env`
8. Copy **Client Secret** → `GOOGLE_CLIENT_SECRET` in `backend/.env`

---

### 🔑 GitHub OAuth (OPTIONAL — for GitHub login button)

1. Go to **https://github.com/settings/developers**
2. Click **"New OAuth App"**
3. Fill in:
   - **Application name:** EduTrend AI
   - **Homepage URL:** `http://localhost:3000`
   - **Authorization callback URL:** `http://localhost:8000/api/auth/github/callback`
4. Click **"Register application"**
5. Copy **Client ID** → `GITHUB_CLIENT_ID` in `backend/.env`
6. Click **"Generate a new client secret"**
7. Copy **Client Secret** → `GITHUB_CLIENT_SECRET` in `backend/.env`

---

### 📧 Gmail SMTP (OPTIONAL — for password reset emails)

Without this, the reset code is shown directly on screen (works fine for development).

To enable real emails:
1. Go to **https://myaccount.google.com/apppasswords**
2. Sign in and create an App Password for "Mail"
3. Add these to `backend/.env`:
   ```
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=587
   SMTP_USER=your_gmail@gmail.com
   SMTP_PASS=xxxx xxxx xxxx xxxx   ← the app password (16 chars)
   FROM_EMAIL=your_gmail@gmail.com
   ```

---

## Features Overview

| Feature | Status | Notes |
|---------|--------|-------|
| Email / Password Auth | ✅ Ready | Register & login works out of the box |
| Google Login | ⚙️ Optional | Add `GOOGLE_CLIENT_ID` to enable |
| GitHub Login | ⚙️ Optional | Add `GITHUB_CLIENT_ID` to enable |
| AI Mentor Chat | ✅ Ready | Needs `GEMINI_API_KEY`; falls back to demo mode without it |
| PDF / Doc Upload (RAG) | ✅ Ready | Upload PDFs in AI Mentor — AI answers from the doc |
| Live Trends (GitHub, HackerNews) | ✅ Ready | Auto-syncs every 24 hours |
| Learning Path Tracker | ✅ Ready | Enroll, mark modules complete, track progress |
| Forgot Password | ✅ Ready | Shows OTP on screen if SMTP not configured |
| Dashboard Charts | ✅ Ready | Pulls live data from backend |

---

## Troubleshooting

**Backend won't start (`Address already in use`)**
```bash
lsof -ti:8000 | xargs kill -9
```

**Frontend shows blank data on Dashboard / Trends**
- Make sure the backend is running on port 8000
- Check `edutrend-ai/.env.local` has `NEXT_PUBLIC_API_URL=http://localhost:8000`

**AI Mentor returns "quota exceeded"**
- Your Gemini API key has hit its quota
- Try creating a new key at https://aistudio.google.com/app/apikey
- The app falls back to demo mode automatically

**`uv: command not found`**
```bash
curl -LsSf https://astral.sh/uv/install.sh | sh
# Then restart your terminal
```

**`npm: command not found`**
- Install Node.js from https://nodejs.org (LTS version)

---

## Project Structure

```
trendai/
├── backend/                  # FastAPI Python backend
│   ├── main.py               # App entry point
│   ├── agent.py              # Gemini AI + RAG logic
│   ├── scraper.py            # GitHub/HackerNews trend scraper
│   ├── db.py                 # SQLite database setup
│   ├── auth.py               # JWT + password hashing
│   ├── .env                  # ← Your API keys go here
│   └── routes/
│       ├── auth_routes.py    # Register / Login
│       ├── oauth_routes.py   # Google & GitHub OAuth
│       ├── mentor_routes.py  # AI chat endpoint
│       ├── trends_routes.py  # Trend data API
│       ├── progress_routes.py# Learning path progress
│       ├── docs_routes.py    # PDF upload & RAG
│       └── password_routes.py# Forgot / Reset password
│
└── edutrend-ai/              # Next.js frontend
    ├── src/app/
    │   ├── page.tsx          # Landing page
    │   ├── dashboard/        # Analytics dashboard
    │   ├── ai-mentor/        # AI chat + PDF upload
    │   ├── trends/           # Live trend explorer
    │   ├── learning-path/    # Learning paths
    │   ├── login/            # Sign in page
    │   ├── signup/           # Create account
    │   ├── forgot-password/  # Password reset
    │   └── auth/callback/    # OAuth redirect handler
    ├── src/lib/api.ts        # API client (all backend calls)
    └── .env.local            # Frontend environment config
```

---

*Built with ❤️ using Google Gemini, FastAPI, and Next.js*
