# Study Plan Feature Module

## Overview
The Study Plan module generates dynamic, personalized IELTS study schedules tailored to the user's exam date, daily available study time, and target band. Daily study tasks rotate across the 4 modules with milestone mock tests and rest days.

## Architecture
```
src/features/plan/
├── components/          # Calendar and timeline daily task view
│   └── index.ts
├── hooks/               # Custom hook for completing tasks and navigating schedule days
│   ├── useStudyPlanSession.ts
│   └── index.ts
├── services/            # Automated schedule generator service
│   ├── planService.ts
│   └── index.ts
├── store/               # Zustand store for plan display modes (timeline/calendar)
│   ├── planStore.ts
│   └── index.ts
├── types.ts             # Domain types for daily tasks and schedule plans
├── index.ts             # Module public barrel export
├── planGenerator.ts     # Algorithmic study schedule synthesis
└── README.md            # Feature documentation
```

## Scheduling Logic
- Days are generated from `startDate` to `examDate` (up to 90 days).
- Task duration matches the student's `dailyStudyMinutes` selected during onboarding or in Settings.
- Progress check mock exams are strategically placed every 7 to 10 days.
