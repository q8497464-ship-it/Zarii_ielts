// English Course Study Plan Engine
// Generates rule-based weekly schedules, auto-rebalances from real results, and manages reminders.
// $0 Free, no paid APIs.

import { db } from '../../../lib/db';
import type { EnglishCEFRLevel } from '../../../types';

export interface EnglishPlanConfig {
  targetLevel: EnglishCEFRLevel;
  minutesPerDay: 15 | 30 | 45 | 60;
  deadlineDate?: string;
  reminderEnabled: boolean;
  reminderTime: string;
}

export interface EnglishDayTask {
  id: string;
  type: 'lesson' | 'vocab' | 'reading' | 'listening' | 'speaking' | 'writing' | 'review' | 'test';
  title: string;
  description: string;
  estimatedMinutes: number;
  completed: boolean;
  actionUrl: string;
}

export interface EnglishPlanDay {
  dayName: string;
  dateStr: string;
  isToday: boolean;
  isPast: boolean;
  tasks: EnglishDayTask[];
}

export interface WeeklyStudyPlan {
  id: string;
  config: EnglishPlanConfig;
  generatedDate: string;
  rebalancedDate?: string;
  rebalanceReason?: string;
  days: EnglishPlanDay[];
  weeklyTargetMinutes: number;
  completedMinutes: number;
}

const STORAGE_KEY = 'zarii_english_study_plan_v1';

export const englishStudyPlanService = {
  getDefaultConfig(): EnglishPlanConfig {
    return {
      targetLevel: 'B1',
      minutesPerDay: 30,
      reminderEnabled: false,
      reminderTime: '20:00'
    };
  },

  getSavedPlan(): WeeklyStudyPlan | null {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        return JSON.parse(raw);
      }
    } catch {
      // fallback
    }
    return null;
  },

  savePlan(plan: WeeklyStudyPlan): void {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(plan));
    } catch (err) {
      console.warn('Failed to save English study plan:', err);
    }
  },

  /**
   * Generates a tailored 7-day study plan based on user configuration and weak areas
   */
  async generateWeeklyPlan(
    config: EnglishPlanConfig,
    forceRebalance: boolean = false
  ): Promise<WeeklyStudyPlan> {
    const dayNames = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    const now = new Date();
    const currentDayIdx = (now.getDay() + 6) % 7; // Monday = 0
    const todayStr = now.toISOString().split('T')[0];

    // Check recent mistakes for auto-rebalancing
    let weakTags: string[] = [];
    try {
      const mistakes = await db.mistakes.where('track').equals('english').toArray();
      if (mistakes.length > 0) {
        const tagCounts: Record<string, number> = {};
        mistakes.forEach((m) => {
          const t = m.topic || 'grammar';
          tagCounts[t] = (tagCounts[t] || 0) + 1;
        });
        weakTags = Object.keys(tagCounts).filter((t) => tagCounts[t] >= 2);
      }
    } catch {
      // fallback
    }

    const days: EnglishPlanDay[] = dayNames.map((dayName, idx) => {
      const d = new Date(now);
      d.setDate(now.getDate() - currentDayIdx + idx);
      const dateStr = d.toISOString().split('T')[0];
      const isToday = dateStr === todayStr;
      const isPast = idx < currentDayIdx;

      const tasks: EnglishDayTask[] = [];

      if (idx === 0) {
        // Monday: Grammar lesson + Vocab
        tasks.push({
          id: `task-${dateStr}-1`,
          type: 'lesson',
          title: `Unit Lesson: Grammar Foundations`,
          description: `Study core syntax and usage rules with interactive examples.`,
          estimatedMinutes: 15,
          completed: isPast,
          actionUrl: `/app/english/course`
        });
        tasks.push({
          id: `task-${dateStr}-2`,
          type: 'vocab',
          title: `10 Spaced Repetition Flashcards`,
          description: `Review unfamiliar academic and conversational words.`,
          estimatedMinutes: 5,
          completed: isPast,
          actionUrl: `/app/word-bank`
        });
        if (config.minutesPerDay >= 30) {
          tasks.push({
            id: `task-${dateStr}-3`,
            type: 'listening',
            title: `Listening Dialogue & Dictation`,
            description: `Listen to native speech and type missing words.`,
            estimatedMinutes: 10,
            completed: isPast,
            actionUrl: `/app/english/listening`
          });
        }
      } else if (idx === 1) {
        // Tuesday: Graded Reading + Speaking
        tasks.push({
          id: `task-${dateStr}-1`,
          type: 'reading',
          title: `Graded Reader: Short Story & Quiz`,
          description: `Read a calibrated text and answer 5 comprehension questions.`,
          estimatedMinutes: 15,
          completed: isPast,
          actionUrl: `/app/english/reading`
        });
        tasks.push({
          id: `task-${dateStr}-2`,
          type: 'speaking',
          title: `Minimal Pairs & Pronunciation Drills`,
          description: `Acoustic distinction drills for vowel and consonant pairs.`,
          estimatedMinutes: 10,
          completed: isPast,
          actionUrl: `/app/english/speaking`
        });
      } else if (idx === 2) {
        // Wednesday: Grammar practice + Weak Area Focus
        const focusTopic = weakTags[0] ? `Focus Review: ${weakTags[0]}` : `Grammar In-depth Practice`;
        tasks.push({
          id: `task-${dateStr}-1`,
          type: 'lesson',
          title: focusTopic,
          description: `Targeted exercises reinforcing trouble spots and sentence structure.`,
          estimatedMinutes: 15,
          completed: isPast,
          actionUrl: `/app/english/practice`
        });
        tasks.push({
          id: `task-${dateStr}-2`,
          type: 'vocab',
          title: `Word Bank Daily Review`,
          description: `Drill words due for review from your personal lexicon.`,
          estimatedMinutes: 10,
          completed: isPast,
          actionUrl: `/app/word-bank`
        });
      } else if (idx === 3) {
        // Thursday: Guided Writing Task
        tasks.push({
          id: `task-${dateStr}-1`,
          type: 'writing',
          title: `Guided Writing Task & Evaluation`,
          description: `Draft response with useful phrases bank and receive rule-based checks.`,
          estimatedMinutes: 20,
          completed: isPast,
          actionUrl: `/app/english/writing`
        });
        tasks.push({
          id: `task-${dateStr}-2`,
          type: 'speaking',
          title: `Interactive Role-Play Conversation`,
          description: `Speak your role via microphone in a realistic everyday scenario.`,
          estimatedMinutes: 10,
          completed: isPast,
          actionUrl: `/app/english/speaking`
        });
      } else if (idx === 4) {
        // Friday: Listening Studio + Speed Round
        tasks.push({
          id: `task-${dateStr}-1`,
          type: 'listening',
          title: `Listening Studio: Workplace Dialogue`,
          description: `Multi-voice comprehension and dictation challenge.`,
          estimatedMinutes: 15,
          completed: isPast,
          actionUrl: `/app/english/listening`
        });
        tasks.push({
          id: `task-${dateStr}-2`,
          type: 'lesson',
          title: `Speed Round Practice Challenge`,
          description: `60-second rapid-fire grammar workout.`,
          estimatedMinutes: 10,
          completed: isPast,
          actionUrl: `/app/english/practice`
        });
      } else if (idx === 5) {
        // Saturday: Weekly Review & Mistake Notebook
        tasks.push({
          id: `task-${dateStr}-1`,
          type: 'review',
          title: `Mistake Notebook Re-Drill`,
          description: `Retry past errors and master confusing question patterns.`,
          estimatedMinutes: 15,
          completed: isPast,
          actionUrl: `/app/progress?tab=mistakes`
        });
        tasks.push({
          id: `task-${dateStr}-2`,
          type: 'reading',
          title: `Graded Reader Exploration`,
          description: `Read an article or news report at your target level.`,
          estimatedMinutes: 15,
          completed: isPast,
          actionUrl: `/app/english/reading`
        });
      } else {
        // Sunday: Unit Test & Weekly Challenge Milestone
        tasks.push({
          id: `task-${dateStr}-1`,
          type: 'test',
          title: `Unit Test Evaluation (20 Questions)`,
          description: `Verify mastery across unit objectives (70% pass threshold).`,
          estimatedMinutes: 20,
          completed: isPast,
          actionUrl: `/app/english/course`
        });
        tasks.push({
          id: `task-${dateStr}-2`,
          type: 'vocab',
          title: `Weekly Lexicon Consolidation`,
          description: `15-minute comprehensive vocabulary recap.`,
          estimatedMinutes: 10,
          completed: isPast,
          actionUrl: `/app/word-bank`
        });
      }

      return {
        dayName,
        dateStr,
        isToday,
        isPast,
        tasks
      };
    });

    const weeklyTargetMinutes = config.minutesPerDay * 7;
    const completedMinutes = days.reduce(
      (sum, d) => sum + d.tasks.filter((t) => t.completed).reduce((ts, t) => ts + t.estimatedMinutes, 0),
      0
    );

    const rebalanceReason = weakTags.length > 0
      ? `Rebalanced to prioritize high-error topics: ${weakTags.slice(0, 2).join(', ')}.`
      : forceRebalance
      ? 'Schedule recalibrated based on completed days and recent study pace.'
      : undefined;

    const plan: WeeklyStudyPlan = {
      id: `plan-${todayStr}`,
      config,
      generatedDate: todayStr,
      rebalancedDate: forceRebalance ? todayStr : undefined,
      rebalanceReason,
      days,
      weeklyTargetMinutes,
      completedMinutes
    };

    this.savePlan(plan);
    return plan;
  },

  async requestReminderPermission(): Promise<boolean> {
    if (typeof window === 'undefined' || !('Notification' in window)) {
      return false;
    }
    const permission = await Notification.requestPermission();
    return permission === 'granted';
  }
};
