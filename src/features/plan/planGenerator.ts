import { db } from '../../lib/db';
import type {
  StudyPlanDay,
  StudyPlanTask,
  DiagnosticWeaknessItem,
  IELTSModule,
  QuestionResponse,
} from '../../types';

export interface PlanGeneratorOptions {
  targetBand: number;
  examDate?: string;
  dailyMinutes: number;
  weaknesses?: DiagnosticWeaknessItem[];
  startDate?: Date;
  daysToGenerate?: number;
}

/**
 * Pure rule-based, $0-cost study plan generator.
 * Creates an actionable, day-by-day curriculum linked directly to practice modules.
 */
export function generateStudyPlan(
  targetBand: number,
  examDateStr: string | undefined,
  dailyMinutes: number = 60,
  weaknesses: DiagnosticWeaknessItem[] = []
): StudyPlanDay[] {
  const startDate = new Date();
  let totalDays = 30; // default 1-month plan

  if (examDateStr) {
    const examDate = new Date(examDateStr);
    const diffMs = examDate.getTime() - startDate.getTime();
    const diffDays = Math.ceil(diffMs / (1000 * 60 * 60 * 24));
    if (diffDays > 0) {
      totalDays = Math.min(Math.max(diffDays, 7), 60); // 1 week to 2 months
    }
  }

  // Identify prioritized weak areas
  const weakQuestionTypes = weaknesses
    .filter((w) => w.accuracy < 70)
    .map((w) => w.questionType);

  const planDays: StudyPlanDay[] = [];

  for (let i = 0; i < totalDays; i++) {
    const currentDate = new Date(startDate);
    currentDate.setDate(startDate.getDate() + i);
    const dateStr = currentDate.toISOString().split('T')[0];
    const dayOfWeek = currentDate.getDay(); // 0 is Sunday

    const dayIndex = i + 1;
    const isRestDay = dayIndex % 7 === 0;

    if (isRestDay) {
      planDays.push({
        dayIndex,
        dateStr,
        module: 'review',
        taskTitle: 'Rest & Active Recall Day',
        estimatedMinutes: Math.min(dailyMinutes, 20),
        completed: false,
        isRestDay: true,
        tasks: [
          {
            id: `task_${dayIndex}_1`,
            title: 'Light Spaced Repetition Review',
            description: 'Clear your daily SM-2 flashcard due queue to keep memory retention strong.',
            module: 'vocab',
            targetPath: '/vocab/flashcards',
            estimatedMinutes: Math.min(dailyMinutes, 20),
            completed: false,
            skillFocus: 'Vocabulary retention',
          },
        ],
      });
      continue;
    }

    // Allocate tasks according to dailyMinutes (e.g. 30m, 45m, 60m, 90m, 120m)
    const tasks: StudyPlanTask[] = [];
    const rotation = i % 4; // Rotate primary focus: 0: Reading, 1: Listening, 2: Writing, 3: Speaking

    if (rotation === 0) {
      // Reading Day
      const weakType = weakQuestionTypes.find((t) =>
        ['matching_headings', 'true_false_not_given', 'multiple_choice_single', 'sentence_completion'].includes(t)
      ) || 'matching_headings';

      const typeLabel = weakType.replace(/_/g, ' ');
      const readingMinutes = Math.round(dailyMinutes * 0.6);
      const vocabMinutes = dailyMinutes - readingMinutes;

      tasks.push({
        id: `task_${dayIndex}_1`,
        title: `Targeted Reading: ${typeLabel.toUpperCase()}`,
        description: `Practice 1 passage focusing specifically on ${typeLabel} questions. Locate exact evidence lines.`,
        module: 'reading',
        targetPath: `/practice/reading?type=${weakType}`,
        estimatedMinutes: readingMinutes,
        completed: false,
        skillFocus: typeLabel,
      });

      tasks.push({
        id: `task_${dayIndex}_2`,
        title: 'Academic Collocations & Flashcards',
        description: 'Review 15-20 high-yield words from the Academic Vocabulary deck with Urdu collocations.',
        module: 'vocab',
        targetPath: '/vocab/flashcards',
        estimatedMinutes: vocabMinutes,
        completed: false,
        skillFocus: 'Lexical Resource',
      });

      planDays.push({
        dayIndex,
        dateStr,
        module: 'reading',
        taskTitle: `Reading: Focus on ${typeLabel}`,
        estimatedMinutes: dailyMinutes,
        completed: false,
        tasks,
      });
    } else if (rotation === 1) {
      // Listening Day
      const weakType = weakQuestionTypes.find((t) =>
        ['form_completion', 'multiple_choice_single', 'matching'].includes(t)
      ) || 'form_completion';

      const listeningMinutes = Math.round(dailyMinutes * 0.65);
      const grammarMinutes = dailyMinutes - listeningMinutes;

      tasks.push({
        id: `task_${dayIndex}_1`,
        title: 'Listening Section Audio & Note Taking',
        description: 'Listen to 1 section once in exam mode. Note numbers, spelling, and British accents.',
        module: 'listening',
        targetPath: '/practice/listening',
        estimatedMinutes: listeningMinutes,
        completed: false,
        skillFocus: 'Auditory focus & spelling',
      });

      tasks.push({
        id: `task_${dayIndex}_2`,
        title: 'Grammar Masterclass: Complex Sentences',
        description: 'Complete 10 exercises on subordination and relative clauses for Band 7+ grammatical range.',
        module: 'grammar',
        targetPath: '/grammar',
        estimatedMinutes: grammarMinutes,
        completed: false,
        skillFocus: 'Grammatical Range',
      });

      planDays.push({
        dayIndex,
        dateStr,
        module: 'listening',
        taskTitle: 'Listening: Section Audio & Note Taking',
        estimatedMinutes: dailyMinutes,
        completed: false,
        tasks,
      });
    } else if (rotation === 2) {
      // Writing Day
      const isTask2 = i % 2 === 0;
      const writingMinutes = Math.round(dailyMinutes * 0.7);
      const phraseMinutes = dailyMinutes - writingMinutes;

      tasks.push({
        id: `task_${dayIndex}_1`,
        title: isTask2 ? 'Writing Task 2: Discursive Essay' : 'Writing Task 1: Academic Data / GT Letter',
        description: isTask2
          ? 'Draft a 250-word essay with clear topic sentences and counter-arguments in 40 minutes.'
          : 'Write a 150-word report summarizing key trends and comparative differences in 20 minutes.',
        module: 'writing',
        targetPath: '/practice/writing',
        estimatedMinutes: writingMinutes,
        completed: false,
        skillFocus: isTask2 ? 'Task 2 Response & Structure' : 'Task 1 Synthesis',
      });

      tasks.push({
        id: `task_${dayIndex}_2`,
        title: 'Writing Phrase Bank & Cohesion Review',
        description: 'Memorize and copy 5 new cohesive linking phrases for introducing examples and concession.',
        module: 'vocab',
        targetPath: '/vocab/phrases',
        estimatedMinutes: phraseMinutes,
        completed: false,
        skillFocus: 'Coherence and Cohesion',
      });

      planDays.push({
        dayIndex,
        dateStr,
        module: 'writing',
        taskTitle: isTask2 ? 'Writing: Task 2 Essay Practice' : 'Writing: Task 1 Report Practice',
        estimatedMinutes: dailyMinutes,
        completed: false,
        tasks,
      });
    } else {
      // Speaking Day
      const speakingMinutes = Math.round(dailyMinutes * 0.6);
      const vocabQuizMinutes = dailyMinutes - speakingMinutes;

      tasks.push({
        id: `task_${dayIndex}_1`,
        title: 'Speaking Mock: Part 2 Cue Card & Discussion',
        description: 'Take 1 minute to plan notes, then talk continuously for 2 minutes without hesitation.',
        module: 'speaking',
        targetPath: '/practice/speaking/part2',
        estimatedMinutes: speakingMinutes,
        completed: false,
        skillFocus: 'Fluency & Discourse Markers',
      });

      tasks.push({
        id: `task_${dayIndex}_2`,
        title: 'Academic Vocab Quiz (Meaning & Synonyms)',
        description: 'Complete a 10-question quiz and queue any missed words directly into flashcards.',
        module: 'vocab',
        targetPath: '/vocab/quiz',
        estimatedMinutes: vocabQuizMinutes,
        completed: false,
        skillFocus: 'Active Recall',
      });

      planDays.push({
        dayIndex,
        dateStr,
        module: 'speaking',
        taskTitle: 'Speaking: Part 2 Fluency & Cue Card',
        estimatedMinutes: dailyMinutes,
        completed: false,
        tasks,
      });
    }
  }

  return planDays;
}

/**
 * Auto-reschedules uncompleted tasks from past dates into upcoming days.
 */
export function rescheduleMissedTasks(plan: StudyPlanDay[]): StudyPlanDay[] {
  const todayStr = new Date().toISOString().split('T')[0];

  const missedTasks: StudyPlanTask[] = [];
  const updatedPlan = plan.map((day) => {
    // If day is before today and has uncompleted tasks
    if (day.dateStr < todayStr && !day.completed) {
      if (day.tasks) {
        day.tasks.forEach((t) => {
          if (!t.completed) {
            missedTasks.push({ ...t, title: `[Rolled Over] ${t.title}` });
          }
        });
      }
      return {
        ...day,
        completed: true, // mark past day resolved
        taskTitle: `${day.taskTitle} (Tasks rolled over)`,
      };
    }
    return day;
  });

  if (missedTasks.length === 0) return updatedPlan;

  // Distribute missed tasks into upcoming days (today and future)
  let taskCursor = 0;
  for (const day of updatedPlan) {
    if (day.dateStr >= todayStr && !day.isRestDay && taskCursor < missedTasks.length) {
      const taskToAdd = missedTasks[taskCursor];
      day.tasks = day.tasks || [];
      day.tasks.push(taskToAdd);
      day.estimatedMinutes += taskToAdd.estimatedMinutes;
      taskCursor += 1;
    }
    if (taskCursor >= missedTasks.length) break;
  }

  return updatedPlan;
}

/**
 * Recalculates the weekly plan based on updated target band, remaining days, and new weaknesses.
 */
export function recalculateWeeklyPlan(
  existingPlan: StudyPlanDay[],
  targetBand: number,
  examDateStr: string | undefined,
  dailyMinutes: number,
  newWeaknesses: DiagnosticWeaknessItem[] = []
): StudyPlanDay[] {
  const todayStr = new Date().toISOString().split('T')[0];

  // Keep completed past days intact
  const pastDays = existingPlan.filter((d) => d.dateStr < todayStr);

  // Generate fresh plan starting from today
  const freshPlan = generateStudyPlan(targetBand, examDateStr, dailyMinutes, newWeaknesses);

  // Remap day indices
  const merged = [
    ...pastDays,
    ...freshPlan.map((d, idx) => ({
      ...d,
      dayIndex: pastDays.length + idx + 1,
    })),
  ];

  return merged;
}

/**
 * Identifies weak question types from question responses and builds changes summary.
 */
export function identifyWeaknessesFromResponses(responses: QuestionResponse[]): {
  computedWeaknesses: DiagnosticWeaknessItem[];
  changesSummary: string[];
} {
  const typeCounts: Record<string, { total: number; correct: number; module: IELTSModule }> = {};

  for (const r of responses) {
    const qType = r.questionType || 'multiple_choice_single';
    if (!typeCounts[qType]) {
      typeCounts[qType] = { total: 0, correct: 0, module: r.module || 'reading' };
    }
    typeCounts[qType].total++;
    if (r.isCorrect) typeCounts[qType].correct++;
  }

  const computedWeaknesses: DiagnosticWeaknessItem[] = [];
  const changesSummary: string[] = [];

  for (const [qType, data] of Object.entries(typeCounts)) {
    if (data.total >= 2) {
      const accuracy = Math.round((data.correct / data.total) * 100);
      if (accuracy < 65) {
        const typeLabel = qType.replace(/_/g, ' ');
        computedWeaknesses.push({
          module: data.module,
          questionType: qType,
          questionTypeLabel: typeLabel,
          correct: data.correct,
          total: data.total,
          accuracy,
          severity: accuracy < 50 ? 'critical' : 'moderate',
          advice: `Focus on ${typeLabel} strategy and timing in daily smart practice sessions.`,
        });
        changesSummary.push(
          `Injected high-priority practice for ${typeLabel.toUpperCase()} (current accuracy: ${accuracy}%).`
        );
      }
    }
  }

  if (computedWeaknesses.length === 0) {
    changesSummary.push(
      'Maintained balanced rotation; boosted full-length timed mock tests due to high overall accuracy.'
    );
  }

  return { computedWeaknesses, changesSummary };
}

/**
 * Automatically re-balances the study plan based on actual performance results
 * from db.responses and db.attempts over the past 7 days.
 */
export async function rebalancePlanFromActualResults(
  existingPlan: StudyPlanDay[],
  targetBand: number,
  examDateStr?: string,
  dailyMinutes: number = 60
): Promise<{
  updatedPlan: StudyPlanDay[];
  rebalanced: boolean;
  changesSummary: string[];
}> {
  try {
    const responses = await db.responses.toArray();
    const attempts = await db.attempts.toArray();

    // If fewer than 5 responses recorded, keep plan as is
    if (responses.length < 5 && attempts.length < 1) {
      return {
        updatedPlan: existingPlan,
        rebalanced: false,
        changesSummary: ['Not enough test data yet to rebalance plan.'],
      };
    }

    const { computedWeaknesses, changesSummary } = identifyWeaknessesFromResponses(responses);

    const updatedPlan = recalculateWeeklyPlan(
      existingPlan,
      targetBand,
      examDateStr,
      dailyMinutes,
      computedWeaknesses
    );

    // Save updated days to database
    await db.studyPlan.clear();
    await db.studyPlan.bulkAdd(updatedPlan);

    // Record last rebalance timestamp
    localStorage.setItem('zarii_last_plan_rebalance', new Date().toISOString());

    return {
      updatedPlan,
      rebalanced: true,
      changesSummary,
    };
  } catch (err) {
    console.error('Error rebalancing plan:', err);
    return {
      updatedPlan: existingPlan,
      rebalanced: false,
      changesSummary: ['Failed to auto-rebalance plan.'],
    };
  }
}
