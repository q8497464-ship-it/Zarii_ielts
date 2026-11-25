# Contributing to Zarii English & IELTS

Thank you for your interest in making English education and IELTS preparation 100% free, accessible, and high-quality for students worldwide!

---

## Architecture & Stability Rules

> [!IMPORTANT]
> **Core Stability Mandates**:
> 1. **Zero Route Breakages**: Any renamed or restructured URL must have an explicit redirect configured in `src/App.tsx`.
> 2. **Database Schema Continuity**: The local IndexedDB (`src/lib/db.ts`) schema must maintain backwards compatibility. Any changes must bump the Dexie version with an upgrade function.
> 3. **Scoring Integrity**: IELTS band conversion tables, Cambridge rounding rules, and empty-attempt guards (`src/features/mock/mockScoring.ts`) must never be altered or bypassed.
> 4. **No Mixing of Band Scores and CEFR Levels**: CEFR levels (A1 to C1) belong strictly to the English Course track; numerical Band Scores (0.0 to 9.0) belong strictly to the IELTS track.
> 5. **MCQ Balance & Zero Tells**: Multiple choice questions must be evenly distributed across positions A, B, C, D (~25% each) and avoid length/grammar tells.

---

## Content Integrity & Originality Standards

1. **NO Copyrighted Materials**:
   - **Never copy** Cambridge University Press, British Council, IDP, Oxford, British Council, or Duolingo.
   - All passages, lessons, exercises, dialogues, audio scripts, and sample essays must be **100% original** or under permissive open licenses (CC-BY).
2. **Quality & Formatting**:
   - **English Course Lessons**: Follow the lesson schema (`content/course/<level>/<unit>/<lesson>.json`) with clear Can-Do objectives, explanation callouts (*Rule, Tip, Careful*), model sentences with audio, varied exercise types, and 5-question quizzes.
   - **Urdu Notes**: Optional comparative notes highlighting English SVO vs Urdu SOV patterns, articles, and prepositions. Mark notes as `"needs native review"` in metadata.
   - **Dictionary Entries**: Sourced only from verified open corpora (Open English WordNet, CMU Pronouncing Dictionary). Custom entries and overrides must be added via the patch layer.

---

## Validation & Quality Checks Before Submitting a PR

Before opening a pull request, run all automated validation scripts:

```bash
# 1. Validate all English Course JSON lessons against schema
npm run validate-course

# 2. Validate dictionary shards, entries, and inflections
npm run validate-dictionary

# 3. Audit MCQ answer distribution (guarantees balanced A/B/C/D keys)
npm run audit-mcq

# 4. Run full Vitest unit & regression suites
npm run test:regression

# 5. Verify TypeScript compilation and production build
npm run build
```

---

## Submitting Pull Requests
1. Fork the repository and create a feature branch (`git checkout -b feature/course-a2-unit-01`).
2. Commit your validated files with conventional commit messages (`git commit -m "feat(course): add A2 Unit 1 lessons on past simple"`).
3. Push to your branch and open a Pull Request.
4. Verify all automated CI checks pass.
