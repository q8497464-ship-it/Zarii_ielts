# Speaking Feature Module

## Overview
The Speaking module facilitates IELTS Speaking exam preparation across Part 1 (Introduction/Interview), Part 2 (Long Turn with Cue Card and 1-minute prep timer), and Part 3 (Two-way Discussion). It leverages native browser Web Speech API for voice synthesis and real-time speech-to-text recognition, supplemented by acoustic fluency analytics (WPM, pause frequency, filler word count) and AI examiner assessment.

## Architecture
```
src/features/speaking/
├── components/            # Practice runners for Part 1, 2, 3, shadowing, and results
│   └── index.ts
├── hooks/                 # Custom hooks for recording and mic permissions
│   ├── useSpeakingRecorder.ts
│   └── index.ts
├── services/              # Speech recognition, audio metrics, AI evaluation
│   ├── speakingService.ts
│   └── index.ts
├── store/                 # Zustand store for live speech transcription state
│   ├── speakingStore.ts
│   └── index.ts
├── types.ts               # Domain types for cue cards, sessions, and speech metrics
├── index.ts               # Module public barrel export
├── speakingAnalysis.ts    # Client-side heuristic analysis (WPM, pauses, fillers)
├── speakingAiEvaluator.ts # Multimodal/transcript AI examiner scoring
├── speechUtils.ts         # Web Speech API wrapper with graceful fallbacks
└── README.md              # Feature documentation
```

## Privacy & Audio Handling
- Audio recordings are processed locally in the browser.
- Voice transcripts are generated on-device via Web Speech API and stored in Dexie `speakingSessions`.
- Optional AI analysis sends text transcripts only to the configured LLM provider.
