# Zarii IELTS — Comprehensive Testing Strategy & QA Manual

This document outlines the testing architecture for Zarii IELTS, combining automated CI pipelines with structured manual QA checklists for real-world hardware, browser audio engines, and mobile environments.

---

## 1. Automated Testing Architecture

Zarii uses a multi-tier automated test suite running on Vitest, Playwright, and GitHub Actions ($0 paid infrastructure):

| Test Suite | Purpose | Execution Command |
|---|---|---|
| **Unit Tests (`vitest`)** | Band conversion tables, answer variant marking logic, SM-2 scheduling, study plan generator, and JSON schemas. | `npm run test` |
| **Calibration Tests** | Evaluates 6 benchmark essays with known examiner bands to guarantee MAE $\le 0.25$. | `npm run test:calibration` |
| **Content Validator** | Validates structure, questions, and required fields across 36 JSON test files. | `npm run validate-content` |
| **Content Audit** | Verifies 1,000+ answers exist verbatim in passages and scripts without duplication. | `npm run audit-content` |
| **End-to-End (`playwright`)** | Simulates complete user journeys (onboarding, exams, editor, flashcards, backup). | `npm run test:e2e` |
| **CI Workflow** | Runs lint, type-check, unit tests, calibration, content checks, and production build on every push. | `.github/workflows/ci.yml` |

---

## 2. Manual QA Checklist (Hardware & Real-World Environments)

Automated headless browsers cannot verify acoustic fidelity, microphone audio levels, mobile virtual keyboard shifts, or hardware-accelerated speech engines. Follow this checklist before each release.

---

### A. Web Speech Audio Engine (Listening & Speaking Mock)

- [ ] **Autoplay Permission Handshake**:
  - Open `/practice/listening/test/list-test-01?mode=practice` in a fresh browser session.
  - Verify audio does not play unexpectedly until candidate explicitly presses "Start Section" or "Play".
- [ ] **Multi-Speaker Synthesis**:
  - Listen to Section 1 dialogue turns between Speaker A and Speaker B.
  - Verify voices have distinguishable pitch and rate separation.
  - Confirm conversational pauses (400ms–800ms) occur naturally between dialogue exchanges.
- [ ] **Playback Controls**:
  - Test `0.8x`, `1.0x`, and `1.2x` playback speed toggles.
  - Test scrubbing / seek slider in Practice Mode.
  - Confirm Exam Mode restricts audio to playing exactly once per section with appropriate warnings.
- [ ] **Platform Voice Fallbacks**:
  - Verify speech synthesis works on Windows (Microsoft David/Zira/Mark), macOS (Samantha/Daniel), iOS Safari, and Android Chrome.

---

### B. Microphone & Live Speech Recognition (Speaking Practice)

- [ ] **Permission Prompt Flow**:
  - Visit `/practice/speaking/mock`.
  - Click "Start Recording" or enter Pre-Check screen.
  - Verify browser prompts for microphone permission; clicking "Allow" proceeds smoothly.
  - Verify friendly guidance is shown if user clicks "Block" or "Dismiss".
- [ ] **Animated Audio-Level Ring**:
  - Speak into microphone at varying volumes (whisper, conversational, loud).
  - Verify audio visualizer ring pulses dynamically in response to voice input.
- [ ] **Live Web Speech Transcript**:
  - Speak English phrases during Part 1 practice.
  - Verify live transcription streams into candidate transcript container with fading animations.
- [ ] **Part 2 Preparation Countdown**:
  - Enter Part 2 cue card practice.
  - Confirm 60-second preparation countdown displays prominently.
  - Verify acoustic chime or visual alert triggers when 60s prep finishes and 2-minute recording begins.
- [ ] **Audio Blob Persistence**:
  - Confirm recorded audio blob is saved locally to IndexedDB `speakingSessions` table and can be replayed on the results page.

---

### C. Mobile Browsers & Touch Interactions (iOS Safari & Android Chrome)

- [ ] **Viewport & Dynamic Address Bar (360px – 430px)**:
  - Test on iPhone (Safari) and Android (Chrome).
  - Verify full-height layouts adapt when browser URL bar shows/collapses (`100dvh`).
  - Verify no horizontal scrollbars appear on viewport (`overflow-x-hidden`).
- [ ] **Touch Targets (WCAG AA 44x44px minimum)**:
  - Verify answer radio buttons, checkboxes, bottom navigation icons, and question drawer pills are easily tappable with single thumbs.
- [ ] **Virtual Keyboard Ergonomics**:
  - Open `/practice/writing/prompt/t2-01` on a mobile device.
  - Tap into the text editor.
  - Verify virtual keyboard does not obscure the live word count ticker or sticky exam timer.
- [ ] **Mobile Bottom Navigation**:
  - Verify 5-item bottom bar (Home, Practice, Smart, Vocab, Settings) switches routes with active highlight indicators.

---

### D. Offline Mode & Service Worker Verification

- [ ] **PWA Offline Pre-Caching**:
  - Visit `/welcome` and browse Home dashboard.
  - Turn off Wi-Fi and Ethernet (Airplane Mode).
  - Refresh the page (`Ctrl + R` or `Cmd + R`).
  - Verify app shell, icons, and layout render completely offline without network error screens.
- [ ] **On-Demand Offline Download**:
  - Connect to Wi-Fi. Go to `/practice/reading`.
  - Click "Download for offline" on `Academic Reading Practice Test 1`.
  - Verify toast confirms "Downloaded for Offline Use" and card badge changes to "Offline Ready".
  - Disconnect Wi-Fi completely.
  - Launch the test and complete Passage 1.
  - Verify all text, questions, and marking execute flawlessly offline.
- [ ] **Service Worker Update Cycle**:
  - Modify `public/sw.js` cache version.
  - Reload page and confirm new worker activates without caching stale assets.

---

### E. Data Safety & Database Recovery

- [ ] **Debounced Draft Autosave**:
  - In Writing Editor, type continuously for 30 seconds.
  - Verify status displays "Saving draft..." and transitions smoothly to "All changes saved locally" 800ms after typing ceases.
  - Hard-refresh browser; confirm essay draft is fully restored.
- [ ] **Database Export & Import**:
  - Go to `/settings`.
  - Click "Export Progress as JSON". Verify valid JSON file downloads (`zarii-backup-YYYY-MM-DD.json`).
  - Click "Delete All Data" in Danger Zone. Confirm test records reset.
  - Click "Import Progress from JSON" and select exported file.
  - Confirm all test history, target bands, and mistake logs are restored.
- [ ] **Emergency Corruption Recovery**:
  - Simulate IndexedDB lock or corrupted storage.
  - Verify Zarii Error Boundary surfaces the "Database Recovery Options" banner with "Export Salvaged Backup" and "Reset & Reopen" buttons.

---

### F. Accessibility & Display Customization

- [ ] **High-Contrast Theme**:
  - Toggle High-Contrast theme in Settings.
  - Verify all text achieves WCAG AAA 7:1+ contrast against backgrounds.
- [ ] **Dyslexia-Friendly Typography**:
  - Switch font preference to Dyslexia-friendly in Settings.
  - Verify increased character spacing and weighted letter stems render correctly across reading passages.
- [ ] **Keyboard-Only Navigation**:
  - Navigate entire exam flow using only `Tab`, `Shift + Tab`, `Enter`, and Arrow keys.
  - Verify focus rings (`ring-2 ring-teal-500`) are visible on every interactive element.
  - Press `Esc` to close modals and drawers.
  - Press `Ctrl/Cmd + K` to open Command Palette.

---

## 3. QA Sign-Off Matrix

| Area | Tested By | Date | Environment (OS / Browser) | Result (Pass/Fail) | Notes |
|---|---|---|---|---|---|
| Audio Synthesizer | QA | — | Win 11 / Chrome 125 | ☐ Pass / ☐ Fail | |
| Microphone STT | QA | — | macOS 14 / Safari 17 | ☐ Pass / ☐ Fail | |
| Mobile Touch UI | QA | — | iPhone 15 / Safari | ☐ Pass / ☐ Fail | |
| Android Chrome | QA | — | Pixel 8 / Chrome | ☐ Pass / ☐ Fail | |
| Offline PWA | QA | — | Chrome / Airplane Mode | ☐ Pass / ☐ Fail | |
| JSON Backup/Restore | QA | — | Desktop Firefox | ☐ Pass / ☐ Fail | |
