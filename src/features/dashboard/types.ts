import type { TestAttempt, IELTSModule } from '../../types';

export type { TestAttempt, IELTSModule };

export interface ModuleBandScore {
  module: IELTSModule;
  currentBand: number;
  targetBand: number;
  testCount: number;
  trend: 'improving' | 'stable' | 'declining';
}

export interface SkillProgressSummary {
  overallBandEstimate: number;
  targetBand: number;
  daysRemaining: number;
  studyStreakDays: number;
  modules: Record<IELTSModule, ModuleBandScore>;
}

export interface RecommendationCard {
  id: string;
  title: string;
  description: string;
  module: IELTSModule;
  actionUrl: string;
  priority: 'high' | 'medium' | 'low';
}
