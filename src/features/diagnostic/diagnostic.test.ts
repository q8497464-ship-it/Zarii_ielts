import { describe, it, expect } from 'vitest';
import {
  evaluateDiagnostic,
  DIAGNOSTIC_READING_PASSAGE,
  DIAGNOSTIC_LISTENING_SECTION,
} from './diagnosticContent';
import {
  generateStudyPlan,
  rescheduleMissedTasks,
  recalculateWeeklyPlan,
} from '../plan/planGenerator';
import type { StudyPlanDay, DiagnosticWeaknessItem } from '../../types';

describe('IELTS Diagnostic Assessment Evaluation', () => {
  it('correctly evaluates perfect reading and listening score', () => {
    const perfectReading: Record<string, string> = {
      diag_r_01: 'TRUE',
      diag_r_02: 'FALSE',
      diag_r_03: 'NOT GIVEN',
      diag_r_04: 'A',
      diag_r_05: 'B',
      diag_r_06: 'Paragraph 3',
      diag_r_07: 'A',
      diag_r_08: 'rural',
      diag_r_09: 'evapotranspiration',
      diag_r_10: '2.5',
    };

    const perfectListening: Record<string, string> = {
      diag_l_01: 'Mansoor',
      diag_l_02: 'Environmental',
      diag_l_03: '84920',
      diag_l_04: 'C',
      diag_l_05: 'Elmfield',
      diag_l_06: '165',
      diag_l_07: 'C',
      diag_l_08: 'cupboards',
      diag_l_09: 'B',
      diag_l_10: '250',
    };

    const result = evaluateDiagnostic(
      perfectReading,
      perfectListening,
      'This is an extensive, well-argued academic response. Furthermore, it contains robust thesis points. However, opposing perspectives must also be acknowledged. Therefore, balanced conclusions are achieved.',
      ['I work as an environmental engineer, which I find immensely rewarding.', 'I travelled to the northern mountains where I learned valuable lessons about resilience and preparation.', 'International technology has vastly accelerated cultural exchange while occasionally promoting superficial tourism.']
    );

    expect(result.skills.reading.rawScore).toBe(10);
    expect(result.skills.reading.estimatedBand).toBe(9.0);
    expect(result.skills.listening.rawScore).toBe(10);
    expect(result.skills.listening.estimatedBand).toBe(9.0);
    expect(result.overallBand).toBeGreaterThanOrEqual(7.5);
  });

  it('correctly maps question-type weaknesses and flags low-accuracy areas', () => {
    // Only answer 2 correctly in reading and 3 in listening
    const partialReading: Record<string, string> = {
      diag_r_01: 'TRUE',
      diag_r_02: 'TRUE', // WRONG (correct is FALSE)
      diag_r_03: 'TRUE', // WRONG (correct is NOT GIVEN)
      diag_r_04: 'B', // WRONG
      diag_r_05: 'A', // WRONG
      diag_r_06: 'Paragraph 1', // WRONG
      diag_r_07: 'B', // WRONG
      diag_r_08: 'rural', // CORRECT
    };

    const partialListening: Record<string, string> = {
      diag_l_01: 'Mansoor', // CORRECT
      diag_l_02: 'Mechanical', // WRONG
      diag_l_03: '84920', // CORRECT
    };

    const result = evaluateDiagnostic(
      partialReading,
      partialListening,
      'A short diagnostic answer with minimal words.',
      ['Brief spoken answer.']
    );

    expect(result.weaknesses.length).toBeGreaterThan(0);
    const criticals = result.weaknesses.filter((w) => w.severity === 'critical');
    expect(criticals.length).toBeGreaterThan(0);
    expect(result.overallBand).toBeLessThanOrEqual(6.5);
  });
});

describe('Adaptive Study Plan Generator & Rescheduling', () => {
  it('generates a day-by-day study curriculum matching daily minutes and exam timeframe', () => {
    const weaknesses: DiagnosticWeaknessItem[] = [
      {
        questionType: 'matching_headings',
        questionTypeLabel: 'Reading: Matching Headings',
        module: 'reading',
        correct: 1,
        total: 4,
        accuracy: 25,
        severity: 'critical',
        advice: 'Practice identifying topic sentences.',
      },
    ];

    const plan = generateStudyPlan(7.5, '2026-12-17', 60, weaknesses);
    expect(plan.length).toBeGreaterThanOrEqual(25);

    // Verify first non-rest day total task minutes equal dailyMinutes (60)
    const firstActiveDay = plan.find((d) => !d.isRestDay);
    expect(firstActiveDay).toBeDefined();
    expect(firstActiveDay?.tasks).toBeDefined();

    const totalMinutes = firstActiveDay!.tasks!.reduce((acc, t) => acc + t.estimatedMinutes, 0);
    expect(totalMinutes).toBe(60);

    // Verify tasks have target paths and descriptions
    for (const task of firstActiveDay!.tasks!) {
      expect(task.targetPath).toBeTruthy();
      expect(task.title).toBeTruthy();
      expect(task.description).toBeTruthy();
    }
  });

  it('correctly auto-reschedules missed tasks from past dates into upcoming days', () => {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayStr = yesterday.toISOString().split('T')[0];

    const todayStr = new Date().toISOString().split('T')[0];

    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const tomorrowStr = tomorrow.toISOString().split('T')[0];

    const initialPlan: StudyPlanDay[] = [
      {
        dayIndex: 1,
        dateStr: yesterdayStr,
        module: 'reading',
        taskTitle: 'Reading Day',
        estimatedMinutes: 60,
        completed: false, // MISSED!
        tasks: [
          {
            id: 't_missed_1',
            title: 'Matching Headings Drill',
            description: 'Uncompleted task from yesterday',
            module: 'reading',
            targetPath: '/practice/reading',
            estimatedMinutes: 25,
            completed: false,
          },
        ],
      },
      {
        dayIndex: 2,
        dateStr: todayStr,
        module: 'listening',
        taskTitle: 'Listening Day',
        estimatedMinutes: 60,
        completed: false,
        tasks: [
          {
            id: 't_today_1',
            title: 'Listening Audio Section',
            description: 'Today task',
            module: 'listening',
            targetPath: '/practice/listening',
            estimatedMinutes: 35,
            completed: false,
          },
        ],
      },
      {
        dayIndex: 3,
        dateStr: tomorrowStr,
        module: 'writing',
        taskTitle: 'Writing Day',
        estimatedMinutes: 60,
        completed: false,
        tasks: [],
      },
    ];

    const rescheduled = rescheduleMissedTasks(initialPlan);

    // Yesterday should now be resolved
    expect(rescheduled[0].completed).toBe(true);

    // The missed task should be rolled over into today or tomorrow
    const rolledOverTask = rescheduled[1].tasks?.find((t) => t.id === 't_missed_1');
    expect(rolledOverTask).toBeDefined();
    expect(rolledOverTask?.title).toContain('[Rolled Over]');
  });

  it('recalculates weekly plan while preserving past completed days', () => {
    const pastDay: StudyPlanDay = {
      dayIndex: 1,
      dateStr: '2026-01-01',
      module: 'reading',
      taskTitle: 'Past Completed Day',
      estimatedMinutes: 60,
      completed: true,
      tasks: [],
    };

    const recalculated = recalculateWeeklyPlan(
      [pastDay],
      8.0,
      '2026-12-30',
      45
    );

    // Past completed day must remain first
    expect(recalculated[0].dateStr).toBe('2026-01-01');
    expect(recalculated[0].completed).toBe(true);

    // Future days must have 45 minutes
    expect(recalculated.length).toBeGreaterThan(1);
    expect(recalculated[1].estimatedMinutes).toBe(45);
  });
});
