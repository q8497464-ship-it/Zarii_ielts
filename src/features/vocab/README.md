# Vocabulary & Grammar Feature Module

## Overview
The Vocabulary & Grammar module delivers curated IELTS lexical items (Band 7+ collocations, topic-specific vocabulary, academic word lists) and essential grammar lessons. It integrates a scientifically backed SuperMemo-2 (SM-2) spaced-repetition algorithm with personal word bank management and flashcard testing.

## Architecture
```
src/features/vocab/
├── components/          # Flashcards, interactive quiz, personal bank, grammar runner
│   └── index.ts
├── hooks/               # Spaced repetition session hooks
│   ├── useVocabSession.ts
│   └── index.ts
├── services/            # SM-2 engine, vocabulary & grammar dataset loaders
│   ├── vocabService.ts
│   └── index.ts
├── store/               # Zustand store for search queries and topic filters
│   ├── vocabStore.ts
│   └── index.ts
├── types.ts             # Domain types for words, grammar lessons, and SM2 items
├── index.ts             # Module public barrel export
├── sm2.ts               # SuperMemo-2 spaced-repetition scheduling algorithm
├── vocabContent.ts      # Topic-based IELTS vocabulary loader
└── README.md            # Feature documentation
```

## Spaced Repetition (SM-2) Engine
- Each word is tracked with `intervalDays`, `repetitionCount`, and `easeFactor` (default 2.5).
- Student ratings (0-5) adjust the ease factor and calculate the exact subsequent review date.
- All spaced-repetition state is stored offline in Dexie `vocabProgress` table.
