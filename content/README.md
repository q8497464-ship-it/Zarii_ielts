# Zarii IELTS Content Architecture & Schemas

Welcome to the **Zarii** open IELTS content repository. All tests, reading passages, listening scripts, writing prompts, and vocabulary items in this directory are structured as static JSON files.

## Zero Cost & Open License Principle

1. **Strictly Original or Openly Licensed (CC BY / CC BY-SA / Public Domain)**
   - Never scrape or republish proprietary test materials from Cambridge IELTS, British Council, IDP, or Pearson.
   - All academic passages are adapted from open access science publications, encyclopedias, or custom authored by linguistic specialists.
2. **Offline & Serverless Compatible**
   - The entire test content is distributed statically under `/content` and imported directly by Vite into the client application.
   - Requires $0 hosting on Cloudflare Pages, Netlify, or Vercel.

---

## Directory Organization

```text
content/
├── schemas/
│   ├── reading-test.schema.json      # JSON Schema (Draft 7) for Reading tests
│   ├── listening-test.schema.json    # JSON Schema for Listening tests
│   ├── writing-prompt.schema.json    # JSON Schema for Task 1 & Task 2 prompts
│   ├── speaking-card.schema.json     # JSON Schema for Speaking simulator cards
│   └── vocab-word.schema.json        # JSON Schema for Spaced Repetition vocabulary
├── reading/
│   └── sample-reading-01.json        # 3 passages, 40 questions, T/F/NG, MCQ, summary
├── listening/
│   └── sample-listening-01.json      # 4 sections, scripts, speaker dialogues
├── writing/
│   └── sample-writing-01.json        # Prompts, Band 8.5 sample essays, rubrics
├── speaking/
│   └── sample-speaking-01.json       # Part 1, Part 2 cue cards, Part 3 discussions
└── vocab/
    └── sample-vocab-01.json          # Academic Word List (AWL), collocations, flashcards
```

---

## Schema Reference

### 1. Reading Test (`reading-test.schema.json`)
- **Root Fields**: `id`, `title`, `testType` (`academic` | `general`), `difficulty` (`easy` | `standard` | `challenging`), `timeLimitMinutes` (default 60), `passages` (3 passages), `attribution`.
- **Passage Fields**: `passageNumber` (1, 2, or 3), `title`, `subtitle`, `text`, `wordCount` (~800-1000 words), `questionGroups`.
- **Question Types**:
  - `multiple_choice_single`
  - `multiple_choice_multi`
  - `true_false_not_given`
  - `yes_no_not_given`
  - `matching_headings`
  - `matching_information`
  - `matching_features`
  - `sentence_completion`
  - `summary_completion`
  - `diagram_label_completion`
  - `short_answer`

### 2. Listening Test (`listening-test.schema.json`)
- **Sections**: 4 sections mirroring IELTS:
  - Section 1: Everyday social dialogue (2 speakers, form/table completion).
  - Section 2: Everyday monologue (e.g. tour guide or radio announcement).
  - Section 3: Educational/academic discussion (up to 4 speakers).
  - Section 4: Academic lecture monologue.
- **Audio Delivery**: Supported via recorded audio files (`audioUrl`) and Web Speech API synthesis (`audioScript` array with speaker names and dialogue text).

### 3. Writing Prompt (`writing-prompt.schema.json`)
- **Fields**: `id`, `taskType` (`task1_academic`, `task1_general`, `task2`), `title`, `promptText`, `minWordCount` (150 or 250), `recommendedMinutes` (20 or 40), `sampleAnswers` (with band score and examiner commentary), `checklist`.

### 4. Speaking Card (`speaking-card.schema.json`)
- **Fields**: `id`, `part` (1, 2, or 3), `topic`, `cueCard` (with `bulletPoints`, `prepTimeSeconds: 60`, `speakTimeSeconds: 120`), `discussionQuestions`, `tips`, `sampleBand9Response`.

### 5. Vocab Word (`vocab-word.schema.json`)
- **Fields**: `id`, `word`, `phonetic`, `partOfSpeech`, `definition`, `academicBandTarget` (e.g. 7.5), `collocations`, `ieltsTopic`, `exampleSentences`, `synonyms`, `academicWordList: true`.

---

## Validation

You can validate any JSON file against its schema using any standard JSON Schema Draft-7 validator:
```bash
npx ajv-cli validate -s content/schemas/reading-test.schema.json -d content/reading/sample-reading-01.json
```
