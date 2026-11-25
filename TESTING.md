# Zarii — Comprehensive Testing & Quality Assurance Manual

This document outlines the testing architecture for Zarii, combining automated CI pipelines with structured verification checklists for two learning tracks, the built-in dictionary, offline storage, and responsive viewports.

---

## 1. Automated Testing Suite

Zarii maintains strict automated quality gates. All suites run with $0 cloud dependencies:

| Command | Suite | Purpose | Pass Criteria |
|---|---|---|---|
| `npm run test` | Vitest Unit Suite | Scoring formulas, SM-2 flashcard intervals, RLS policies, auth rules | 100% passing |
| `npm run test:regression` | IELTS Regression Suite | Validates band score calculators and runs full 21-test IELTS Playwright suite | 0 failures |
| `npm run validate-course` | Course Schema & Content | Validates all English course JSON lessons against schema across all units | 0 errors |
| `npm run validate-dictionary` | Dictionary Integrity Audit | Audits 622 shard JSON files, definitions, inflections, and ARPAbet IPA mappings | 0 errors |
| `npm run audit-mcq` | MCQ Position Balance | Audits answer key distribution across Grammar, Reading, Listening, and Course | 25% balance ($\pm 10\%$) |
| `npm run test:e2e` | Playwright E2E | End-to-end browser user flows across desktop and mobile viewports | All specs green |
| `npm run build` | Production Build | Full TypeScript type checking (`tsc -b`) and Vite production bundle | 0 type errors |

---

## 2. Key E2E Verification Suites

### A. IELTS Integrity & Backward Compatibility (`e2e/track-migration-and-redirects.spec.ts`)
- Verifies that legacy un-prefixed URLs (`/practice`, `/mock`, `/vocab`, `/dashboard`) redirect to `/app/ielts/*`.
- Verifies that pre-migration student profiles preserve all historical attempts, study plans, and flashcards tagged with `track: 'ielts'`.
- Tests the 1-click database rollback mechanism from the pre-migration snapshot.

### B. Dictionary & Tap-to-Lookup (`e2e/dictionary-flow.spec.ts`)
- **Prefix Autocomplete**: Instant search suggestions debounced at 120ms with zero layout shifts.
- **Morphological Inflections**: Typing *"running"* maps to *"run"*; irregular plurals and past tenses resolve correctly.
- **Exam Mode Protection**: Tap-to-lookup listeners are strictly unmounted during timed reading tests and mock exams.
- **Offline Pack**: Tests downloading the 20,000 Essential Words pack into IndexedDB and verifying offline lookup.

### C. English Lesson Player (`e2e/english-lesson-player.spec.ts`)
- Focus view top-bar with progress segments, close button, and report problem menu.
- Step-by-step section flow: Explain $\rightarrow$ Timeline SVG $\rightarrow$ Audio Sentences $\rightarrow$ Practice $\rightarrow$ Quiz $\rightarrow$ Summary.
- Right-to-left Urdu explanation toggle (`اردو میں دیکھیں`).
- Auto-save progress after each step and resume on page reload.
- Unit Test flow with 20 questions, 70% passing threshold, and failure explanation reviews.

### D. Multi-Viewport & Accessibility (`e2e/accessibility-responsive.spec.ts`)
- Verifies zero horizontal layout overflow across 7 standard viewports:
  - Mobile Mini: 360px
  - Mobile Standard: 390px
  - Tablet Portrait: 768px
  - Laptop Small: 1024px
  - Laptop Standard: 1366px
  - Desktop HD: 1440px
  - Desktop Ultrawide: 1920px
- Keyboard navigation: Arrow keys advance lesson sections; Tab and Enter control dictionary search suggestions.
