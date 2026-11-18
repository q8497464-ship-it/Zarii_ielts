<<<<<<< HEAD
# 🎓 Zarii — Free IELTS Preparation Web App (Academic & General Training)

**Zarii** is a 100% free, offline-first IELTS preparation platform built with modern web technologies. Designed for zero-cost hosting and operation, it empowers learners globally to practice Reading, Listening, Writing, and Speaking without subscriptions, paywalls, or credit cards.

[![License: MIT](https://img.shields.io/badge/License-MIT-teal.svg)](LICENSE)
[![Tests: 267 Passing](https://img.shields.io/badge/Tests-267%20passing-emerald.svg)](package.json)
[![PWA: Ready](https://img.shields.io/badge/PWA-Offline%20Ready-blue.svg)](public/manifest.json)
[![Cost: $0](https://img.shields.io/badge/Cost-%240%20Free-brightgreen.svg)](#zero-cost-architecture)
[![Architecture: Documented](https://img.shields.io/badge/Architecture-Documented-purple.svg)](ARCHITECTURE.md)
[![Admin: Guide](https://img.shields.io/badge/Admin-Guide-deepgreen.svg)](ADMIN_GUIDE.md)

---

## 🌟 Core Modules & Key Features

### 1. 📖 Reading Module
- **Authentic original test papers** (Academic Tests 1 & 2, General Training Test 1) with 3 full passages and 40 questions per test.
- Covers all 8 IELTS question types: True/False/Not Given, Yes/No/Not Given, Matching Headings, Matching Information, Multiple Choice, Sentence Completion, Summary Completion, and Short Answer.
- Split-screen reading UI with passage evidence highlight, personal notes, exam timer, and auto-marking with band conversion.

### 2. 🎧 Listening Module
- **Full original listening tests** (4 sections, 40 questions each) featuring authentic accents.
- Browser `speechSynthesis` audio engine with distinct speaker voices and natural pauses, plus support for optional audio files.
- Exam mode (strict single play with 10-minute transfer time) and Practice mode (speed control, pause, replay from specific transcript lines).

### 3. ✍️ Writing Module
- **10 Academic Task 1 prompts** (line graphs, bar charts, pie charts, tables, maps, processes) with interactive Recharts diagrams.
- **5 General Training Task 1 letter prompts** (formal, semi-formal, informal).
- **15 Task 2 discursive essay prompts** across opinion, discussion, problem-solution, advantages-disadvantages, and two-part questions.
- Distraction-free text editor with live word counters, timing alarms, and IELTS 4-criterion evaluation (Task Achievement, Coherence & Cohesion, Lexical Resource, Grammatical Accuracy).
- Free AI evaluation using Google Gemini or Groq free tier, browser "bring-your-own-key" storage, and a robust offline rule-based fallback.

### 4. 🗣️ Speaking Simulator
- **30 Part 2 cue cards**, 90 linked Part 3 discussion questions, and 20 Part 1 topics (120 questions total).
- Live examiner voice via `speechSynthesis` and voice transcription via the Web Speech API (with fallback text mode).
- Voice metrics analysis: Words per minute (WPM), filler word detection (*um, uh, like, you know*), pause detection, and fluency heuristics.

### 5. 🧠 Vocabulary & Grammar
- **200 academic words** across 10 IELTS topics with meanings, Urdu translations (`urduMeaning`), collocations, and synonyms.
- **SuperMemo-2 (SM-2) Spaced Repetition Flashcards**: Again, Hard, Good, Easy intervals with daily due queue and streak counter.
- **Academic Vocab Quiz**: 3 modes (Meaning Match, Fill in the Blank, Synonym Match) with 1-click mistake queueing.
- **15 Grammar Masterclass Lessons** with Band 7+ examiner tips and 150 interactive exercises.
- **Writing Phrase Bank**: 100+ Band 7.5–9.0 phrases for Academic Task 1, GT Letters, and Task 2 essays with 1-click clipboard copy.

### 6. 🧭 Diagnostic Assessment & Adaptive Study Plan
- 25-minute benchmark test (10 reading, 10 listening, 1 writing, 3 speaking questions) mapping baseline bands and question-type weaknesses.
- **Rule-based Study Plan Generator**: Day-by-day curriculum linking directly to targeted practice exercises based on target band, exam countdown, and daily study minutes.
- Auto-rescheduling algorithm that rolls forward uncompleted past tasks into upcoming sessions.

### 7. 📊 Performance Dashboard
- Skill-by-skill Band Trend line chart (Recharts).
- Overall Estimated Band vs Official Target Band gauge.
- Accuracy by Question Type bar chart.
- Average time per question, 7-day practice hours, streak tracking, and recent attempts history.

### 8. 🏆 Full Mock Examination Center
- Complete 2h 45m exam simulation: Listening (40m) $\rightarrow$ Reading (60m) $\rightarrow$ Writing (60m) $\rightarrow$ Speaking (14m).
- Strict timers, exam fullscreen mode, and no-pausing enforcement.
- Official-style **Test Report Form (TRF)** with printable PDF export using `@media print` styling.

---

## 🛠️ Technology Stack & Architecture

- **Frontend**: React 18, Vite 6, TypeScript, React Router 6, Zustand.
- **Styling**: Tailwind CSS, Lucide Icons, Inter & JetBrains Mono typography.
- **Local Storage**: Dexie.js (IndexedDB) for persistent offline data.
- **Data Visualization**: Recharts (Line Charts, Bar Charts, Radar Charts).
- **Speech**: Web Speech API (`SpeechRecognition` & `SpeechSynthesis`).
- **PWA**: Web App Manifest, Service Worker (`sw.js`) with cache-first static asset caching.
- **Testing**: Vitest (50 automated unit, marking, and smoke tests).

---

## 🚀 Free Deployment Guide ($0 Cost)

Zarii is designed to deploy for free on leading edge platforms:

### Option A: Cloudflare Pages (Recommended)
1. Fork or push this repository to your GitHub account.
2. Sign in to [Cloudflare Dashboard](https://dash.cloudflare.com/) and go to **Workers & Pages** > **Create application** > **Pages** > **Connect to Git**.
3. Select the `zarii-ielts` repository.
4. Configure Build Settings:
   - **Framework preset**: `Vite`
   - **Build command**: `npm run build`
   - **Build output directory**: `dist`
5. Click **Save and Deploy**. Your web app is live on a free `*.pages.dev` subdomain with unlimited free bandwidth and SSL.

### Option B: Netlify
1. Sign in to [Netlify](https://www.netlify.com/) and click **Add new site** > **Import an existing project**.
2. Select your GitHub repository.
3. Configure Build Settings:
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`
4. Click **Deploy Site**.

### Option C: Vercel
1. Sign in to [Vercel](https://vercel.com/) and click **Add New Project**.
2. Import your GitHub repository.
3. Set Framework Preset to **Vite** and Output Directory to `dist`.
4. Click **Deploy**.

---

## 🤖 Deploying the Free AI Evaluation Function (Optional)

Zarii works completely offline with certified rule-based evaluation. For candidates wanting AI examiner feedback:

1. **Get Free API Keys**:
   - Google Gemini: [Google AI Studio](https://aistudio.google.com/) (Free Tier: 15 RPM).
   - Groq: [Groq Console](https://console.groq.com/) (Free Tier: Fast Llama-3 inference).
2. **Serverless Function Setup (Cloudflare Pages Functions or Netlify Functions)**:
   - Create `functions/api/evaluate-writing.ts`:
     ```ts
     export async function onRequestPost({ request, env }) {
       const { essayText, promptBody, taskType } = await request.json();
       const apiKey = env.GEMINI_API_KEY;
       // Call Gemini free endpoint and return structured IELTS rubric JSON
     }
     ```
   - In Cloudflare Pages Settings > **Environment variables**, add:
     - `GEMINI_API_KEY`: `your_gemini_key`
     - `GROQ_API_KEY`: `your_groq_key`
3. **Bring-Your-Own-Key in Browser**:
   - Alternatively, candidates can enter their own API key in **Settings** (`/settings`). The key is saved strictly in browser `localStorage` and never leaves the client device.

---

## 🔒 Privacy & Data Ownership

- **100% Client-Side Data**: All test attempts, writing essays, speech recordings, study plans, and vocabulary progress are stored strictly in your browser's IndexedDB.
- **Zero Server Telemetry**: Zarii does not run a tracking database or harvest personal information.
- **Export & Delete**: Navigate to **Settings** (`/settings`) at any time to:
  - Export your complete preparation history as a portable `JSON` file.
  - Delete all local data with 1-click.

---

## ⚖️ Disclaimer

**Zarii is an independent educational tool.** Band scores and feedback provided are estimates to guide self-study and do not constitute official examination scores from Cambridge Assessment English, IDP: IELTS Australia, or the British Council.

---

---

## 🗄️ Backend, Architecture & Roles (Supabase Free Tier)

Zarii features a dual-app architecture within a unified codebase, completely isolating student users from administrative code:

```
src/
├── apps/
│   ├── student/        # The student preparation workspace (runs under /)
│   └── admin/          # Admin management portal (lazy-loaded under /admin)
└── shared/             # Shared kernel:
    ├── api/            # Typed Supabase REST & offline Dexie API layer
    ├── design-system/  # Shared UI components (ZariiLogo, Button, etc.)
    ├── tokens/         # Brand design tokens (#124F40, #5BB78D, #F7FAF8)
    ├── types/          # Database & auth TypeScript interfaces
    └── utils/          # Formatting & utility helpers
```

### 1. Free Supabase Setup Guide
1. **Create Free Project**:
   - Go to [Supabase](https://supabase.com/) and create a free organization and project.
2. **Execute Database Migrations**:
   - Open your project's **SQL Editor** in the Supabase Dashboard.
   - Run the files in `supabase/migrations/` in sequential order:
     1. `20261118000001_initial_schema.sql`: Core tables, enums, indexes, and triggers.
     2. `20261118000002_row_level_security.sql`: Row Level Security on all 19 tables.
     3. `20261118000003_seed_data.sql`: Default settings and feature flags.
3. **Configure Environment Variables**:
   - Copy `.env.example` to `.env`:
     ```bash
     cp .env.example .env
     ```
   - In Supabase Dashboard, navigate to **Project Settings** > **API**.
   - Copy the **Project URL** into `VITE_SUPABASE_URL`.
   - Copy the **anon / public key** into `VITE_SUPABASE_ANON_KEY`.
   - Copy the **service_role key** into `SUPABASE_SERVICE_ROLE_KEY` (for admin provisioning scripts only).

### 2. Row Level Security & Role Permissions
- **`student`**: Can read published exam content (`status = 'published'`) and read/write only their own attempts.
- **`editor`**: Can create and edit tests, passages, questions, vocab, and grammar lessons.
- **`admin`**: Full access to manage user roles, audit logs, feature flags, feedback, and settings.
- **Secrets Isolation**: AI provider credentials and secret keys are stored in `public.ai_providers` with RLS rejecting all browser access (`USING (false)`), accessible exclusively by Edge Functions using the service role.

---

## 👑 Create Your First Admin

To access the administrator console at `/admin`, you must provision your first admin account.

### Method A: Automated Seed Script (Recommended)
Set `ADMIN_EMAIL` and run the seed script:

```bash
# Provision the first administrator
ADMIN_EMAIL="admin@zarii.app" ADMIN_PASSWORD="YourSecurePassword123!" node scripts/seed-first-admin.js
```

The script connects to Supabase Auth via the service role key, provisions the user, and sets their role to `admin` in `public.profiles`.

### Method B: Manual Promotion via Supabase SQL Editor
If you already registered an account in the app or Supabase Auth console:
1. Open **Supabase Dashboard** > **SQL Editor**.
2. Run the following query with your email:
   ```sql
   UPDATE public.profiles
   SET role = 'admin', status = 'active'
   WHERE id IN (
     SELECT id FROM auth.users WHERE email = 'your-email@example.com'
   );
   ```
3. Sign in at `http://localhost:5173/admin/login` to access the console. Students never see any link to `/admin`.

---

## 💻 Local Development & Content Tools

```bash
# Install dependencies
npm install

# Start local development server
npm run dev

# Run content validator (checks all reading, listening, writing, vocab JSONs)
npm run validate-content

# Run all 267 automated tests
npm run test

# Build for production with optimized code-splitting
npm run build
```

---

## 📚 Documentation & Guides

- [System Architecture & Data Flow](ARCHITECTURE.md)
- [Administrator & Editor Guide](ADMIN_GUIDE.md)
- [Content Schema & Test Writing Guide](content/SCHEMA.md)
- [Contributing Guidelines](CONTRIBUTING.md)
=======
# Zarii_ielts
>>>>>>> 2961992090687de4a9576a7f3d6bfe99e04aeb1c
