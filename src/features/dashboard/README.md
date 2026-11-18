# Performance Dashboard (Progress) Feature Module

## Overview
The Performance Dashboard delivers actionable learning analytics for IELTS students. It visualizes estimated overall band progression over time, per-skill sub-scores (Listening, Reading, Writing, Speaking), exam countdown milestones, study streaks, and dynamic recommendations targeting the student's weakest question types.

## Architecture
```
src/features/dashboard/
├── components/          # Analytics views, band progression charts, and skill breakdowns
│   └── index.ts
├── hooks/               # Analytics calculation and date filtering hooks
│   ├── useDashboardStats.ts
│   └── index.ts
├── services/            # Recommendation heuristics and attempt metrics
│   ├── dashboardService.ts
│   └── index.ts
├── store/               # Zustand store for dashboard view tabs
│   ├── dashboardStore.ts
│   └── index.ts
├── types.ts             # Domain types for progress summaries and recommendations
├── index.ts             # Module public barrel export
├── recommendations.ts   # Rule-based diagnostic recommendation engine
└── README.md            # Feature documentation
```

## Privacy & Offline Storage
- All metrics are calculated client-side from local IndexedDB (`attempts`, `responses`, `profile`).
- No personal test data or scores are transmitted to external telemetry servers.
