# Writing Feature Module

## Overview
The Writing module handles IELTS Academic & General Training Task 1 and Task 2 essays. It includes a distraction-free exam editor, live word counters, Task 1 chart and visual data renderers, Task 2 idea generators, paraphrase practice, and a dual-engine evaluation architecture (AI-powered examiner + $0 deterministic rule-based fallback).

## Architecture
```
src/features/writing/
├── components/            # Editor, chart viewer, idea modal, feedback page
│   └── index.ts
├── hooks/                 # Editor state and word count validation
│   ├── useWritingEditor.ts
│   └── index.ts
├── services/              # AI evaluator, deterministic rules, calibration
│   ├── writingService.ts
│   └── index.ts
├── store/                 # Zustand store for offline essay draft autosaving
│   ├── writingStore.ts
│   └── index.ts
├── types.ts               # Domain types for prompts, submissions, and feedback
├── index.ts               # Module public barrel export
├── aiEvaluator.ts         # Serverless/Direct AI examiner evaluation
├── ruleBasedEvaluator.ts  # 100% offline rule-based band scoring fallback
├── sentenceHighlighter.ts # Academic vocabulary & syntax highlighting
├── task1TrendExtractor.ts # Visual data key trend extraction
└── README.md              # Feature documentation
```

## Evaluation Criteria
Essays are evaluated across the 4 official IELTS criteria:
1. **Task Achievement / Task Response (TA/TR)**
2. **Coherence & Cohesion (CC)**
3. **Lexical Resource (LR)**
4. **Grammatical Range & Accuracy (GRA)**
When an AI provider is unavailable or quota is exceeded, the deterministic rule-based evaluator immediately grades the essay based on vocabulary richness, sentence structures, paragraphing, and essay length.
