# Contributing to Zarii IELTS

Thank you for your interest in making IELTS preparation 100% free, accessible, and high-quality for students worldwide!

---

## Content Integrity & Originality Rules

1. **NO Copyrighted Materials**:
   - **Never copy** Cambridge University Press, British Council, IDP, or actual examination papers.
   - All passages, questions, dialogues, audio scripts, and model essays must be **100% original** or under a permissive open license (CC-BY).
2. **Quality & Standard**:
   - Academic passages should reflect authentic scientific or humanities writing (700–950 words).
   - Questions must match real IELTS specifications (True/False/Not Given, Headings, Form Completion, etc.).
   - Model essays must demonstrate genuine Band 7.5+ lexical resource and grammatical complexity.

---

## Adding Content Step-by-Step

### 1. Adding a Reading Test
1. Create or edit a JSON file in `content/reading/` (e.g. `academic-test-03.json`).
2. Provide 3 passages with 40 questions total.
3. Every question must include `id`, `prompt`, `correctAnswer`, `explanation`, and `evidence` (the exact sentence in the passage).

### 2. Adding a Listening Test
1. Create a JSON file in `content/listening/` (e.g. `listening-test-03.json`).
2. Provide 4 sections with `audioScript` (speaker turns) and 40 questions total.
3. Provide accepted spelling variations in `correctAnswer` (e.g. `["420", "four hundred and twenty"]`).

### 3. Adding Vocabulary Words
1. Add entries to `content/vocab/academic-words.json` or import using CSV:
   ```bash
   node scripts/bulk-import-csv.js vocab my_words.csv output.json
   ```
2. Include Urdu translations, collocations, and high-quality example sentences.

---

## Validation & Verification Before Submitting a PR

Before opening a pull request, verify that all JSON tests comply with the schema and all unit tests pass:

```bash
# 1. Validate all content files
npm run validate-content

# 2. Run unit tests
npm run test

# 3. Verify TypeScript and production build
npm run build
```

---

## Submitting Pull Requests
1. Fork the repository and create a feature branch (`git checkout -b content/reading-test-03`).
2. Commit your validated JSON files (`git commit -m "feat(content): add original Academic Reading Test 3"`).
3. Push to your branch and open a Pull Request.
4. Describe the topic and confirm that all materials are original.
