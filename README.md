# 🎓 Zarii — English Course & IELTS Preparation Web App (A1 to C1 & Academic / General Training)

**Zarii** is a 100% free, offline-first learning platform built with modern web technologies. Designed for zero-cost hosting and operation, it empowers learners globally with two complete learning tracks: a comprehensive **General English Course (A1 to C1)** and authentic **IELTS Preparation (Academic & General Training)**, powered by a built-in 144,000-word offline dictionary.

[![License: MIT](https://img.shields.io/badge/License-MIT-teal.svg)](LICENSE)
[![Tests: Passing](https://img.shields.io/badge/Tests-Passing-emerald.svg)](package.json)
[![PWA: Ready](https://img.shields.io/badge/PWA-Offline%20Ready-blue.svg)](public/manifest.json)
[![Cost: $0](https://img.shields.io/badge/Cost-%240%20Free-brightgreen.svg)](#zero-cost-architecture)
[![Architecture: Documented](https://img.shields.io/badge/Architecture-Documented-purple.svg)](ARCHITECTURE.md)
[![Admin: Guide](https://img.shields.io/badge/Admin-Guide-deepgreen.svg)](ADMIN_GUIDE.md)

---

## 🌟 Two Learning Tracks

### Track 1: 📚 General English Course (A1 to C1)
- **Structured Curriculum**: 8 to 12 units per level; 5 to 8 bite-sized lessons (8–15 minutes) per unit.
- **Interactive Focus Lesson Player**: Step-by-step learning sections:
  - *Rule Explanations*: Clear typography, accent chips, and callouts (*Rule, Tip, Careful*).
  - *Timelines & Diagrams*: Accessible visual representations of grammatical tenses.
  - *Model Sentences with Speech*: Native browser `speechSynthesis` audio playback.
  - *Practice Exercises*: 6 interactive formats (Multiple Choice, Reorder Sentence, Fill in the Blanks, Categorize, Matching Pairs, and Error Correction) with instant feedback and retries.
  - *Bilingual Urdu Support*: Optional right-to-left Urdu explanations (`اردو میں دیکھیں`) comparing English SVO vs Urdu SOV structure.
  - *5-Question Checkpoint Quiz* & *Summary Box*.
- **Unit Reviews & Unit Tests**: 20 questions covering unit objectives with a strict 70% passing threshold and daily retry cooling.
- **Skills Practice Studio**:
  - *Reading Library*: Original graded readers across A1–C1 with audio read-along and comprehension quizzes.
  - *Listening Studio*: Dialogues and monologue talks with speed controls (0.75x, 1.0x, 1.25x), dictation drills, and post-answer transcript reveals.
  - *Speaking & Pronunciation*: Shadowing drills, minimal-pair discrimination (*ship/sheep, v/w, th*), sentence stress, and role-play.
  - *Writing Studio*: Guided sentence building, email drafting, paragraph architecture, and instant grammar rule checks.
  - *Daily 15*: Guided multi-skill daily workout combining vocabulary, grammar, reading, and listening.

### Track 2: 🎯 IELTS Preparation (Academic & General Training)
- **Reading Module**: Full original test papers with dual-pane passage viewing, line highlighting, and all 8 IELTS question types.
- **Listening Module**: 4 sections per test with authentic multi-speaker audio, question progress tracking, and exam/practice modes.
- **Writing Module**: 10 Academic Task 1 prompts with Recharts visual graphs, 5 GT Task 1 letter prompts, and 15 Task 2 essay prompts with automated rubric-based evaluation.
- **Speaking Simulator**: Part 1-3 simulator with live Web Speech recognition, cue card timers, and fluency/WPM metrics.
- **Full Mock Exam Center**: Authentic 2h 45m timed mock exam with strict no-pause enforcement and printable official-style Test Report Form (TRF).
- **Adaptive Diagnostic Assessment**: 25-minute benchmark diagnostic mapping weaknesses to tailored study tasks.

---

## 📖 Shared Built-in 144k English Dictionary

Zarii includes an offline-first, client-side English dictionary containing over 144,000 headwords:
- **No Giant Bundles**: Partitioned into 622 static sharded JSON files (~30–80 KB each).
- **Fast Prefix Autocomplete**: High-performance client-side prefix trie indexing headwords and 144,386 inflections (*running $\rightarrow$ run*).
- **Pronunciation & Audio**: ARPAbet phonetic respelling, standard IPA, and native browser speech synthesis (US/UK).
- **Safe-Mode & CEFR Bands**: Offensive words hidden by default; estimated CEFR levels (A1 to C1) for all common words.
- **Tap-to-Lookup Everywhere**: Tap or select any word inside lessons, reading passages, or questions to pop up definitions and save directly to your personal Word Bank.
- **Exam Mode Protection**: Tap-to-lookup is strictly disabled during timed mock exams to preserve authentic testing conditions.
- **Offline Storage Pack**: 1-click download of the Essential 20,000 Word Pack for 100% offline lookup.

---

## 🛠️ Technology Stack & Architecture

- **Frontend**: React 18, Vite 6, TypeScript, React Router 6, Zustand.
- **Styling**: Tailwind CSS, Lucide Icons, Inter typography.
- **Local Database**: Dexie.js (IndexedDB) with automatic migrations and pre-migration backup snapshots.
- **Speech**: Web Speech API (`SpeechRecognition` & `SpeechSynthesis`).
- **PWA**: Web App Manifest, Service Worker (`sw.js`) with cache-first asset caching.
- **Validation & Quality**: Custom Node.js validation scripts ensuring 0 errors across 454 exercises and 144k dictionary entries.

---

## 🧪 Validation & Testing Commands

| Command | Purpose |
|---|---|
| `npm run test` | Run Vitest unit tests |
| `npm run test:regression` | Run IELTS scoring regression tests & Playwright regression suite |
| `npm run validate-course` | Validate all English Course JSON lessons against schema (0 errors required) |
| `npm run validate-dictionary` | Validate 622 dictionary shard files, definitions, and inflections |
| `npm run audit-mcq` | Audit answer position balance (25% across A/B/C/D) and verify 0 tells |
| `npm run build` | Full production TypeScript check (`tsc -b`) and Vite production bundle |

---

## 🔒 Privacy & Data Ownership

- **100% Client-Side Data**: All practice attempts, dictionary downloads, essays, speech sessions, and study plans are stored strictly in your browser's IndexedDB.
- **Zero Third-Party Telemetry**: No Google Tag Manager, no Amplitude, no tracking cookies.
- **Export & Delete**: Export your complete preparation history as a portable `JSON` file or wipe local data in 1-click via **Settings** (`/app/settings`).

---

## ⚖️ Disclaimer

*IELTS is a registered trademark of its owners. Zarii is independent and not affiliated with or endorsed by IELTS partners. Course levels and certificates are for self-study purposes and are not official qualifications.*
