import type { StudyPlanDay, IELTSModule } from '../../types';

export type { StudyPlanDay, IELTSModule };

export interface DailyStudyTask {
  id: string;
  module: IELTSModule;
  title: string;
  durationMinutes: number;
  completed: boolean;
  link: string;
}

export interface GeneratedStudySchedule {
  startDate: string;
  examDate: string;
  totalDays: number;
  dailyMinutes: number;
  days: StudyPlanDay[];
}
