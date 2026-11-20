# Zarii IELTS Architecture Baseline & Specification

> **Version:** `ielts-stable-v1`  
> **Baseline Date:** November 2026  
> **Repository:** `Zarii_ielts`  
> **Purpose:** Comprehensive architecture, routing, storage, and feature specification of the standalone IELTS preparation platform prior to introducing the General English Course and Dictionary extensions.

---

## 1. Master Route Directory

All routes in Zarii IELTS are strictly categorized, protected by route-level authorization guards, and mapped to user-facing breadcrumbs and metadata.

### 1.1 Public Informational & Authentication Routes (Root Level)

| Route Path | Component / Page | Access Control | Description |
|---|---|---|---|
| `/` | `LandingPage.tsx` | Public | High-conversion marketing landing page with feature showcase, hero section, band score preview, and CTA triggers. |
| `/login` | `LoginPage.tsx` | Public (Guest/Student) | Standard candidate sign-in supporting Email + Password, Google OAuth, and Instant Guest Exploration mode. |
| `/signup` | `SignUpPage.tsx` | Public | Candidate registration with preferred name capture, study goal selection (Academic vs General), and initial target band. |
| `/forgot-password` | `ForgotPasswordPage.tsx` | Public | Password recovery flow dispatching secure magic links/recovery tokens via Supabase Auth. |
| `/reset-password` | `ResetPasswordPage.tsx` | Token Protected | Secure password reset form triggered by authenticated recovery tokens. |
| `/verify-email` | `VerifyEmailPage.tsx` | Public | Candidate email verification notice with resend rate-limiting protection. |
| `/about` | `AboutPage.tsx` | Public | Mission, instructional pedagogy, and IELTS exam band accuracy standards. |
| `/contact` | `ContactPage.tsx` | Public | Support inbox, problem reporting, and inquiries. |
| `/privacy` | `PrivacyPage.tsx` | Public | Privacy policy detailing local-first IndexedDB data retention and cookie/session encryption. |
| `/terms` | `TermsPage.tsx` | Public | Platform terms of service, non-commercial educational use terms. |
| `/faq` | `FaqPage.tsx` | Public | Comprehensive frequently asked questions covering scoring, audio devices, and AI grading. |

---

### 1.2 Student Workspace Application (`/app/*`)

Protected by `StudentAuthGuard`. Redirects unauthenticated non-guest candidates to `/login`. Operates within the authenticated student `AppShell` with top bar, mobile bottom bar, and responsive navigation drawer.

| Route Path | Component / Page | Category | Description |
|---|---|---|---|
| `/app` | `HomePage.tsx` | Learn | Main candidate cockpit: personalized greeting ("Good afternoon, [Candidate Name]"), inline name editor, daily study streak with freeze shield, daily goal ring, quick practice triggers, and recent activity. |
| `/app/practice` | `PracticePage.tsx` | Learn | Module hub for all 4 IELTS test components: Reading, Listening, Writing, and Speaking with progress rings. |
| `/app/practice/reading` | `ReadingPage.tsx` | Learn | Catalog of authentic 3-passage Academic and General Training reading exams with difficulty badges and completion status. |
| `/app/practice/reading/test/:testId` | `ReadingTestRunner.tsx` | Exam | Official computer-delivered exam interface: split-pane layout (passage left, questions right), text highlighter, font scaling, answer navigator, and countdown timer. |
| `/app/practice/reading/results/:attemptId` | `ReadingResultsPage.tsx` | Progress | Detailed reading scorecard: raw score (out of 40), official band score (0.0 - 9.0), question-by-question review with passage text justification and explanations. |
| `/app/practice/listening` | `ListeningPage.tsx` | Learn | Catalog of authentic 4-section listening tests with native British, Australian, and North American speaker recordings. |
| `/app/practice/listening/test/:testId` | `ListeningTestRunner.tsx` | Exam | Real-time audio test runner with standard single-play audio constraints, volume control, section tabs, and auto-submission on timer expiry. |
| `/app/practice/listening/results/:attemptId` | `ListeningResultsPage.tsx` | Progress | Listening scorecard with audio script synchronization, correct vs candidate response comparison, and band estimate. |
| `/app/practice/writing` | `WritingPage.tsx` | Learn | Academic Task 1 (graphs, charts, processes), General Task 1 (formal/informal letters), and Task 2 (discursive essay prompts). |
| `/app/practice/writing/prompt/:promptId` | `WritingEditor.tsx` | Learn | Timed exam word processor: real-time live word count, time warning, collapsible Task 1 graph viewer, and embedded IELTS Phrase Bank helper. |
| `/app/practice/writing/submission/:submissionId` | `WritingFeedbackPage.tsx` | Progress | Comprehensive 4-criterion IELTS evaluation (Task Achievement/Response, Coherence & Cohesion, Lexical Resource, Grammatical Range & Accuracy) with local rule fallback and calibrated band scoring. |
| `/app/practice/speaking` | `SpeakingPage.tsx` | Learn | Speaking module hub with Part 1 interview, Part 2 long turn cue cards, Part 3 analytical discussions, and full mock simulators. |
| `/app/practice/speaking/mock` | `SpeakingMockRunner.tsx` | Exam | Virtual IELTS examiner simulation: automated prompts, 1-minute prep timer with scratchpad, audio recording, and live speech recognition. |
| `/app/practice/speaking/part1` | `SpeakingPart1Practice.tsx` | Learn | Rapid familiar question prompt practice (Work, Study, Hometown, Hobbies) with instant voice recording. |
| `/app/practice/speaking/part2` | `SpeakingPart2Practice.tsx` | Learn | Cue-card practice with structured 60-second preparation countdown and 2-minute speaking timer. |
| `/app/practice/speaking/shadowing` | `SpeakingShadowing.tsx` | Learn | Native speaker sentence shadowing for fluency, intonation, and pronunciation drills. |
| `/app/practice/speaking/results/:sessionId` | `SpeakingResultsPage.tsx` | Progress | Speaking scorecard: Fluency, Lexical Resource, Grammar, Pronunciation ratings, transcribed speech feedback, and acoustic duration stats. |
| `/app/mock` | `MockPage.tsx` | Learn | Full-length simulated mock exam catalog with timed 3-hour test instructions and diagnostic recommendations. |
| `/app/mock/exam/:mockId` | `MockExamRunner.tsx` | Exam | Strict 3-hour computer-delivered simulation (Listening 30m -> Reading 60m -> Writing 60m -> Speaking). Enforces empty-attempt guards (no fake bands on unattempted sections). |
| `/app/vocab` | `VocabPage.tsx` | Learn | Master vocabulary and grammar cockpit: 602 enriched words across 22 IELTS topics, daily word of the day, pronunciation audio (UK/US), collocations, and Urdu meanings. |
| `/app/vocab/flashcards` | `VocabFlashcards.tsx` | Learn | SuperMemo-2 (SM-2) spaced repetition review system with learning steps, interval previews (1d, 6d, etc.), lapse tracking, and keyboard shortcuts (Space, 1-4). |
| `/app/vocab/quiz` | `VocabQuiz.tsx` | Learn | 10 practice modes (Meaning MCQ, Synonyms, Fill-in-the-blank, Collocation builder, Word families, Odd-one-out, Dictation spelling) with anti-guessing option shuffle. |
| `/app/vocab/bank` | `PersonalWordBank.tsx` | Learn | Student's saved word bank, custom decks, difficult word tags, CSV export/import, and printable vocabulary sheets. |
| `/app/vocab/phrases` | `PhraseBankPage.tsx` | Learn | High-scoring IELTS phrases and discourse markers categorized for Task 1, Task 2, and Speaking with one-click copy. |
| `/app/grammar/lesson/:lessonId` | `GrammarLessonRunner.tsx` | Learn | 15 structured grammar lessons (Foundations to Advanced) with rule guides, interactive exercises, and error correction. |
| `/app/diagnostic` | `DiagnosticPage.tsx` | Learn | 30-minute quick diagnostic exam assessing starting English proficiency and estimating baseline band score. |
| `/app/dashboard` | `DashboardPage.tsx` | Progress | Comprehensive analytics dashboard: overall band estimate, skill radar chart, 30-day score history, and mistake review tab. |
| `/app/plan` | `PlanPage.tsx` | Learn | Dynamic study timetable automatically rebalanced based on target band, days until exam, and historical module performance. |
| `/app/settings` | `SettingsPage.tsx` | Account | IELTS candidate profile, test type toggle, typography preferences (Inter/Dyslexic/Serif), theme switcher (light/dark/system), and complete database export/backup. |
| `/app/lessons` | `QuestionLessonsPage.tsx` | Learn | Strategic question-type masterclasses explaining timing traps, distractor elimination, and band 8+ tactics. |
| `/app/design-system` | `DesignSystemPage.tsx` | System | Zarii design token catalog: palette (`#124F40`, `#5BB78D`, `#F7FAF8`), typography scales, buttons, badges, and modals. |

---

### 1.3 Admin Management Portal (`/admin/*`)

Protected by `AdminGuard` (verifies `admin` or `editor` role via Supabase Auth + local session fallback). Features independent dark glass styling.

| Admin Section Route | Component / Page | Permitted Roles | Description |
|---|---|---|---|
| `/admin` | `AdminOverviewPage.tsx` | `admin` | Real-time candidate exam throughput, active users, 30-day signups, and quick system health metrics. |
| `/admin/content` | `AdminContentPage.tsx` | `admin`, `editor` | Full content management system: create, edit, audit, validate, and publish reading/listening tests, question banks, writing prompts, and vocabulary. |
| `/admin/users` | `AdminUsersPage.tsx` | `admin` | Candidate user management: cohort filtering, target band distributions, account status toggles, and data deletion. |
| `/admin/analytics` | `AdminAnalyticsPage.tsx` | `admin` | Platform-wide scoring distributions, module abandonment rates, question difficulty discrimination, and cohort analytics. |
| `/admin/ai` | `AdminAIPage.tsx` | `admin` | AI provider configuration (Anthropic, OpenAI, Gemini), prompt rubric editors, token consumption logs, and USD cost trackers. |
| `/admin/communication` | `AdminCommunicationPage.tsx` | `admin`, `editor` | Global broadcast announcements, banner scheduling, and candidate feedback ticket resolution. |
| `/admin/settings` | `AdminSettingsPage.tsx` | `admin` | Site-wide feature flags (e.g. self-registration toggle), maintenance mode banners, and exam timing rules. |
| `/admin/system` | `AdminSystemPage.tsx` | `admin` | Security audit trail logs, Dexie/Supabase database health checks, telemetry ring buffer, and media asset storage. |
| `/admin/login` | `AdminLoginPage.tsx` | Public Admin | Dedicated secure administrative login screen with generic credential protection and rate-limiting lockout. |
| `/admin/setup-2fa` | `AdminMfaSetupPage.tsx` | Admin | TOTP multi-factor authentication QR enrollment and recovery codes generator. |
| `/admin/verify-2fa` | `AdminMfaChallengePage.tsx` | Admin | TOTP 6-digit challenge prompt required before entering high-privilege administrative routes. |

---

### 1.4 Backward-Compatibility URL Redirects

To prevent broken links from external study guides, email announcements, or legacy bookmarks, the root router in `src/App.tsx` redirects all un-prefixed URLs to `/app/*`:

```
/practice/*       -> /app/practice/*
/mock/*           -> /app/mock/*
/vocab/*          -> /app/vocab/*
/grammar          -> /app/vocab?tab=grammar
/grammar/*        -> /app/vocab?tab=grammar
/diagnostic       -> /app/diagnostic
/dashboard        -> /app/dashboard
/progress         -> /app/dashboard
/plan             -> /app/plan
/settings         -> /app/settings
/profile          -> /app/settings
/mistakes         -> /app/dashboard?tab=mistakes
/lessons          -> /app/lessons
/strategies       -> /app/lessons
/weekly-review    -> /app/dashboard?tab=weekly-review
/achievements     -> /app/dashboard?tab=achievements
/badges           -> /app/dashboard?tab=achievements
/habits           -> /app/dashboard?tab=achievements
/welcome          -> /app
```

---

## 2. Data Stores & Schema Baseline

Zarii operates on a **hybrid local-first architecture**:
1. **Client IndexedDB (`ZariiIELTS_DB`)**: Stores candidate test attempts, question responses, writing drafts, vocabulary repetitions, study plans, and preferences. Enables 100% offline exam readiness.
2. **Cloud Supabase Postgres**: Centralizes official test content, user authentication, profile sync, and administrative audit trails.

---

### 2.1 Client IndexedDB Tables (`ZariiIELTS_DB`)

Defined in `src/lib/db.ts` (Version 3 schema):

| Table Name | Primary Key / Index Schema | Model Type | Purpose |
|---|---|---|---|
| `profile` | `++id, testType, targetBand, onboardingCompleted, createdAt, updatedAt` | `UserProfile` | Candidate profile data: preferred name, target band (5.0-9.0), exam date, study minutes goal, and test type (`academic` \| `general`). |
| `attempts` | `++id, testId, testType, module, completedAt, status, startedAt` | `TestAttempt` | Full records of candidate exam sessions: raw score, calculated band, time spent, and module type (`reading`, `listening`, `writing`, `speaking`, `mock`). |
| `responses` | `++id, attemptId, questionId, module, isCorrect` | `QuestionResponse` | Granular question-level user answers, correctness flag, and time taken per question. |
| `writingSubmissions`| `++id, promptId, taskType, submittedAt` | `WritingSubmission` | Candidate essays/letters, final word count, criterion scores, examiner commentary, and rubric grades. |
| `speakingSessions` | `++id, cardId, part, recordedAt` | `SpeakingSession` | Recorded audio metadata, speech-to-text transcripts, and 4-criterion band assessments. |
| `vocabProgress` | `++id, wordId, box, nextReviewAt, mastered` | `VocabProgress` | SM-2 spaced repetition state: interval (days), ease factor, repetitions, lapses, difficult tag, and due date. |
| `studyPlan` | `++id, dayIndex, dateStr, module, completed` | `StudyPlanDay` | Scheduled daily tasks, target duration, assigned exercises, and completion timestamps. |
| `settings` | `++id, theme, updatedAt` | `AppSettings` | User preferences: theme (`light`, `dark`, `system`), text size, audio playback speed, and sound toggles. |
| `mistakes` | `++id, questionId, module, questionType, isMastered, createdAt, lastReviewedAt` | `MistakeItem` | Mistake notebook entries: tagged question type, error reason, explanation, and mastery state. |

---

### 2.2 Cloud Supabase Postgres Tables

Defined in `supabase/migrations/20261118000001_initial_schema.sql`:

| Table Name | Primary Key | Foreign Keys / Relationships | Purpose |
|---|---|---|---|
| `profiles` | `id UUID` | `REFERENCES auth.users(id)` | User identity, verified name, role (`student`, `admin`, `editor`), target band, and avatar. |
| `tests` | `id TEXT` | `created_by -> profiles(id)` | Official exam headers: skill (`reading`, `listening`, `writing`, `speaking`, `full`), difficulty, duration, and published status. |
| `sections` | `id TEXT` | `test_id -> tests(id)` | Test subdivisions: Reading Passage 1-3, Listening Part 1-4. |
| `passages` | `id TEXT` | `section_id -> sections(id)` | Reading texts, titles, subheadings, and academic word counts. |
| `questions` | `id TEXT` | `section_id -> sections(id)` | Questions, question types (MCQ, True/False/Not Given, Heading Matching, Fill-blank), correct answer keys, and explanations. |
| `writing_prompts` | `id TEXT` | `created_by -> profiles(id)` | Task 1 and Task 2 prompts, visual chart image URLs, and model band 9 answers. |
| `speaking_cards` | `id TEXT` | `created_by -> profiles(id)` | Cue card topics, follow-up discussion questions, and vocabulary hints. |
| `vocab_words` | `id TEXT` | `None` | Academic word list database with phonetic transcription, Urdu translations, collocations, and example sentences. |
| `grammar_lessons` | `id TEXT` | `None` | 15 grammar lesson modules, practice exercise sets, and difficulty tiers. |
| `media_assets` | `id UUID` | `uploaded_by -> profiles(id)` | Listening test audio recordings, Task 1 infographics, and instructional media. |
| `attempts` | `id UUID` | `user_id -> profiles(id)` | Cloud sync of completed candidate exam attempts. |
| `writing_submissions`| `id UUID`| `user_id -> profiles(id)` | Synced candidate essay submissions and AI evaluation records. |
| `speaking_sessions` | `id UUID` | `user_id -> profiles(id)` | Synced candidate speaking session transcripts and scores. |
| `announcements` | `id UUID` | `created_by -> profiles(id)` | Administrative announcements, maintenance alerts, and exam tips. |
| `feedback` | `id UUID` | `user_id -> profiles(id)` | Candidate issue reports, bug reports, and suggestions. |
| `settings` | `key TEXT` | `None` | Key-value store for global platform configurations. |
| `feature_flags` | `key TEXT` | `None` | Dynamic switches: self-registration, public AI evaluation, guest exploration. |
| `ai_providers` | `id TEXT` | `None` | Configured AI LLM providers, model mappings, and rate limits. |
| `ai_usage_log` | `id UUID` | `user_id -> profiles(id)` | Cost and token consumption ledger per AI assessment. |
| `audit_log` | `id UUID` | `actor_id -> profiles(id)` | Administrative security log recording logins, content changes, and role modifications. |

---

## 3. Storage Keys & State Persistence

### 3.1 LocalStorage Keys Registry

| Storage Key | Format / Type | Purpose |
|---|---|---|
| `zarii_candidate_name` | `string` | Resolved human name of candidate (prioritizes OAuth full name > email name > profile name). |
| `zarii_guest_mode` | `'true' \| 'false'` | Indicates candidate has entered the application in local offline guest mode. |
| `zarii_theme` | `'light' \| 'dark' \| 'system' \| 'high-contrast'` | Visual theme preference applied to `<html>` root element. |
| `zarii_text_size` | `'normal' \| 'medium' \| 'large'` | Accessibility font scale multiplier for reading passages. |
| `zarii_font_family` | `'inter' \| 'dyslexic' \| 'serif'` | Typography preference (Inter vs OpenDyslexic vs Serif). |
| `zarii_line_spacing` | `'normal' \| 'relaxed' \| 'loose'` | Reading passage paragraph vertical spacing. |
| `zarii_sidebar_collapsed`| `'true' \| 'false'` | Desktop sidebar folded/expanded toggle. |
| `zarii_remember_email` | `string` | Saved email address for candidate login form convenience. |
| `zarii_supabase_session` | `JSON string` | Cached Supabase GoTrue Auth session token and user identity. |
| `zarii_admin_auth` | `JSON string` | Active admin portal authentication credentials and role token. |
| `zarii_admin_session` | `JSON string` | Administrator active session timestamp and expiry. |
| `zarii_admin_mfa_factors`| `JSON string` | Local MFA secret and backup codes registry. |
| `zarii_maintenance_mode` | `'true' \| 'false'` | Emergency platform maintenance lockdown flag. |
| `zarii_signup_disabled` | `'true' \| 'false'` | Temporary new candidate registration pause flag. |
| `zarii_analytics_enabled`| `'true' \| 'false'` | Local candidate telemetry and usage tracking toggle. |
| `zarii_diagnostic_seed` | `string` | Randomization seed for diagnostic test question order. |
| `zarii_last_plan_rebalance`| `ISO Date string` | Timestamp of last automated study plan schedule regeneration. |
| `zarii_habit_streak` | `JSON string` | Daily study streak count, freeze shields remaining, and active days. |
| `zarii_habit_xp` | `number` | Total candidate experience points earned through study sessions. |
| `zarii_habit_badges` | `JSON string` | Unlocked achievement badges and milestone timestamps. |
| `zarii_habit_weekly_challenge`| `JSON string` | Current weekly study goal targets and progress percentage. |
| `zarii_vocab_streak` | `number` | Consecutive daily vocabulary flashcard review streak. |
| `zarii_vocab_last_date` | `YYYY-MM-DD` | Date of last completed vocabulary review session. |

### 3.2 SessionStorage Keys Registry

| Storage Key | Format / Type | Purpose |
|---|---|---|
| `zarii_splash_shown` | `'true'` | Session flag ensuring the animated startup splash displays only once per browser session. |
| `zarii_oauth_error` | `string` | Stores transient OAuth callback errors during social login redirects. |

---

## 4. Scoring Logic Baseline

IELTS scoring in Zarii strictly adheres to official British Council / Cambridge English calibration rules:

1. **Reading & Listening Raw-to-Band Tables**:
   - Academic Reading: $40 \text{ questions} \rightarrow 39\text{--}40 = 9.0$, $37\text{--}38 = 8.5$, $35\text{--}36 = 8.0$, down to $<4 = 0.0$.
   - General Training Reading: $40 \text{ questions} \rightarrow 40 = 9.0$, $39 = 8.5$, $37\text{--}38 = 8.0$, down to $<5 = 0.0$.
   - Listening: $40 \text{ questions} \rightarrow 39\text{--}40 = 9.0$, $37\text{--}38 = 8.5$, down to $<4 = 0.0$.
2. **Overall Band Rounding (Cambridge Rule)**:
   - Calculate arithmetic average of 4 skills: $\text{avg} = \frac{L + R + W + S}{4}$.
   - Fractional part $< 0.25 \rightarrow \text{floor}$ (e.g. $6.125 \rightarrow 6.0$).
   - Fractional part $\ge 0.25$ and $< 0.75 \rightarrow \text{half-band } 0.5$ (e.g. $6.25 \rightarrow 6.5$, $6.625 \rightarrow 6.5$).
   - Fractional part $\ge 0.75 \rightarrow \text{next whole band}$ (e.g. $6.75 \rightarrow 7.0$).
3. **Empty-Attempt Guards (`mockScoring.ts`)**:
   - Every skill result has an assessment status: `not_attempted | incomplete | assessed_ai | assessed_rules | unavailable`.
   - **Crucial Rule:** Unattempted or skipped sections receive **NO numeric band** (status `not_attempted`).
   - The overall band is calculated **ONLY when all four skills are assessed**. Otherwise, overall is rendered as `"Not available"`.

---

## 5. Easter Eggs & Special Features

1. **Hidden Surprise Heart (`src/features/surprise/`)**:
   - Quiet 18px rose heart icon situated in student top bar adjacent to theme toggle.
   - Stage 1: Full-screen portal overlay (`#surprise-root` in `document.body`) with blooming rose SVG animation and custom greeting for Zarmeen Tariq.
   - Stage 2: Interactive opening envelope with wax seal revealing handwritten love note from Qamar.
   - Protected: Never visible on landing page, login pages, or admin console.
2. **Cute Animated Splash Screen (`src/components/loader/`)**:
   - High-performance stroke-dasharray SVG animation of open book + dropping 'Z' logo mark.
   - Shown once per session with 300ms smooth fade-out.

---

## 6. Protection Mandate for Future Features

Before and after adding the **General English Course** and **English Dictionary**:
1. All routes listed in Section 1 MUST remain accessible with identical path signatures or permanent redirects.
2. The IndexedDB schema (Section 2.1) MUST maintain backwards compatibility; any new tables must use Dexie version bumping (`version(4)`).
3. The official IELTS band scoring and empty-attempt guards (Section 4) MUST NEVER be modified or bypassed.
4. The regression suite (`npm run test:regression`) MUST pass with zero failures.
