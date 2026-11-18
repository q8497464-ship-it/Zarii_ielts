import type { TestAttempt, IELTSModule, TestType } from '../../types';

export type { TestAttempt, IELTSModule, TestType };

export interface MockExamSectionConfig {
  module: IELTSModule;
  title: string;
  durationMinutes: number;
  testId: string;
  isCompleted: boolean;
  score?: number;
  bandEstimate?: number;
}

export interface MockExamSession {
  examId: string;
  testType: TestType;
  currentSectionIndex: number;
  sections: MockExamSectionConfig[];
  startedAt: string;
  isFinished: boolean;
  overallBandEstimate?: number;
}
