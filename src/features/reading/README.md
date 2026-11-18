# Reading Feature Module

## Overview
The Reading module delivers full-length and sectional IELTS Reading tests for Academic and General Training tracks. It features split-screen passage reading with text highlighting, multiple IELTS question formats (True/False/Not Given, Heading Matching, Summary Completion, Multiple Choice), an exam countdown timer, and an automated scoring engine with band calculation.

## Architecture
```
src/features/reading/
├── components/          # Test runner, passage display, and result view components
│   └── index.ts
├── hooks/               # Custom hooks for timer, answers, and session management
│   ├── useReadingTest.ts
│   └── index.ts
├── services/            # Content loaders and marking engine
│   ├── readingService.ts
│   └── index.ts
├── store/               # Zustand store for transient reading UI state
│   ├── readingStore.ts
│   └── index.ts
├── types.ts             # Domain types for Reading tests, passages, and scores
├── index.ts             # Module public barrel export
├── marking.ts           # IELTS official standard raw-to-band conversion & marking
├── readingContent.ts    # Static test loader and question filtering
└── README.md            # Feature documentation
```

## Data Flow & Scoring
1. **Content Ingestion**: Tests are loaded from `content/reading/*.json` with passage splits and question sets.
2. **Session Execution**: `ReadingTestRunner` manages split-pane rendering, auto-saving responses to local state.
3. **Automated Marking**: `marking.ts` compares user submissions against accepted canonical answers and calculates raw scores out of 40 and official 9-band IELTS estimates.
4. **Persistence**: Completed attempts are stored in Dexie `attempts` and `responses` tables for analytics and progress tracking.

## Testing
- `marking.test.ts`: Verifies exact match, case insensitivity, number-word equivalents, and Academic vs. General Training band boundary mappings.
