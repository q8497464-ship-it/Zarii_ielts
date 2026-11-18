# Listening Feature Module

## Overview
The Listening module simulates the IELTS Listening exam with 4 sections of increasing complexity. It features synthesized/recorded audio playback, speed control, sectional navigation, 10-minute final transfer time simulation, and automated scoring according to official IELTS band thresholds.

## Architecture
```
src/features/listening/
├── components/          # Test runner, audio controllers, and results view
│   └── index.ts
├── hooks/               # Custom hooks for playback state and question responses
│   ├── useListeningTest.ts
│   └── index.ts
├── services/            # Audio synthesizer, content loaders, and marking
│   ├── listeningService.ts
│   └── index.ts
├── store/               # Zustand store for audio volume and playback rates
│   ├── listeningStore.ts
│   └── index.ts
├── types.ts             # Domain types for Listening sections, questions, and scoring
├── index.ts             # Module public barrel export
├── audioEngine.ts       # Web Audio API / HTML5 Audio controller
├── marking.ts           # IELTS Listening scoring engine
├── listeningContent.ts  # Static listening test dataset loader
└── README.md            # Feature documentation
```

## Scoring & Rules
- Total: 40 questions across 4 sections.
- Marking: Exact spelling match, case-insensitive, ignores extra punctuation.
- Score Conversion: 39-40 = Band 9.0, 37-38 = Band 8.5, etc.
