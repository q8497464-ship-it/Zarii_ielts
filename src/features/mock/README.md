# Mock Exam Feature Module

## Overview
The Mock Exam module offers full-length, timed 3-hour simulated IELTS exam sessions. It chains Listening (30 min + 10 min transfer), Reading (60 min), and Writing (60 min) with strict transitions, followed by an integrated or standalone Speaking interview session and an official IELTS TRF-style (Test Report Form) performance summary.

## Architecture
```
src/features/mock/
├── components/          # Multi-stage mock exam runner and score report form
│   └── index.ts
├── hooks/               # Mock session state and section transition hooks
│   ├── useMockExam.ts
│   └── index.ts
├── services/            # Mock dataset loader and overall band rounder
│   ├── mockService.ts
│   └── index.ts
├── store/               # Zustand store for mock exam section durations
│   ├── mockStore.ts
│   └── index.ts
├── types.ts             # Domain types for mock sections and exam sessions
├── index.ts             # Module public barrel export
├── mockData.ts          # Curated full-length mock exam definitions
└── README.md            # Feature documentation
```

## Overall Band Calculation
In accordance with official IELTS standards, the overall band score is calculated by taking the arithmetic mean of all 4 sub-skills, rounding to the nearest half-band:
- Fractional part < 0.25 rounds down to the whole band.
- Fractional part >= 0.25 and < 0.75 rounds to 0.5.
- Fractional part >= 0.75 rounds up to the next whole band.
