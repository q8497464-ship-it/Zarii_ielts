import { db } from '../../lib/db';
import type { SmartRecommendation, TestAttempt, QuestionResponse } from '../../types';

export async function computeSmartRecommendations(): Promise<SmartRecommendation[]> {
  const recommendations: SmartRecommendation[] = [];

  const [attempts, responses, writingSubs, speakingSessions, vocabEntries] = await Promise.all([
    db.attempts.toArray(),
    db.responses.toArray(),
    db.writingSubmissions.toArray(),
    db.speakingSessions.toArray(),
    db.vocabProgress.toArray(),
  ]);

  // If no attempts exist yet
  if (attempts.length === 0 && writingSubs.length === 0 && speakingSessions.length === 0) {
    return [
      {
        id: 'rec_diagnostic_needed',
        category: 'milestone',
        title: 'Complete Baseline Diagnostic Test',
        description: 'Take the 20-minute diagnostic test to benchmark your current band across all 4 skills and uncover specific question weaknesses.',
        actionText: 'Start Diagnostic Test',
        targetPath: '/diagnostic',
        priority: 'high',
        metric: 'Baseline required',
      },
      {
        id: 'rec_vocab_starter',
        category: 'routine',
        title: 'Master Environment & Tech Vocabulary',
        description: 'Explore 40 high-frequency Band 7.5+ academic words with collocations and Urdu meanings.',
        actionText: 'Study Flashcards',
        targetPath: '/vocab/flashcards',
        priority: 'medium',
        module: 'vocab',
      },
    ];
  }

  // 1. Analyze Question Type Accuracies
  const typeMap = new Map<string, { module: string; correct: number; total: number }>();
  for (const resp of responses) {
    // deduce or read question type
    const qType = (resp as any).questionType || 'general_comprehension';
    const key = `${resp.module}_${qType}`;
    const curr = typeMap.get(key) || { module: resp.module, correct: 0, total: 0 };
    if (resp.isCorrect) curr.correct += 1;
    curr.total += 1;
    typeMap.set(key, curr);
  }

  // Find question type with lowest accuracy having at least 3 questions
  let lowestAccuracy = 100;
  let weakestTypeKey: string | null = null;
  let weakestTypeData: { module: string; correct: number; total: number } | null = null;

  typeMap.forEach((data, key) => {
    if (data.total >= 2) {
      const acc = Math.round((data.correct / data.total) * 100);
      if (acc < lowestAccuracy) {
        lowestAccuracy = acc;
        weakestTypeKey = key;
        weakestTypeData = data;
      }
    }
  });

  if (weakestTypeKey && weakestTypeData && lowestAccuracy < 75) {
    const rawType = (weakestTypeKey as string).replace(/^(reading|listening)_/, '');
    const readableType = rawType
      .split('_')
      .map((w: string) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(' ');

    const targetModule = (weakestTypeData as any).module;
    recommendations.push({
      id: `rec_weakest_type_${weakestTypeKey}`,
      category: 'weakness',
      title: `Your weakest area is ${readableType} (${lowestAccuracy}% accuracy)`,
      description: `Targeted practice in ${readableType} is recommended to eliminate distractors and improve ${targetModule} band by up to 0.5.`,
      actionText: `Practice ${readableType}`,
      targetPath: targetModule === 'reading' ? `/practice/reading?type=${rawType}` : '/practice/listening',
      priority: 'high',
      module: targetModule,
      metric: `${lowestAccuracy}% accuracy`,
    });
  }

  // 2. Analyze Writing Band vs Target
  if (writingSubs.length > 0) {
    const avgWritingBand =
      writingSubs.reduce((acc, sub) => acc + sub.bandEstimate, 0) / writingSubs.length;

    if (avgWritingBand < 7.0) {
      recommendations.push({
        id: 'rec_writing_cohesion',
        category: 'weakness',
        title: `Writing average is Band ${avgWritingBand.toFixed(1)}: Elevate Cohesion`,
        description: 'Examiners reward advanced cohesive devices and varied sentence openers. Practice phrases from the Academic Phrase Bank.',
        actionText: 'Explore Phrase Bank',
        targetPath: '/vocab/phrases',
        priority: 'high',
        module: 'writing',
        metric: `Band ${avgWritingBand.toFixed(1)} avg`,
      });
    }
  }

  // 3. Spaced Repetition Due Queue
  const now = new Date();
  const dueVocabCount = vocabEntries.filter((v) => new Date(v.nextReviewAt) <= now).length;
  if (dueVocabCount > 0) {
    recommendations.push({
      id: 'rec_vocab_due',
      category: 'routine',
      title: `${dueVocabCount} Academic Word${dueVocabCount === 1 ? '' : 's'} Due Today`,
      description: 'Your SM-2 memory retention intervals are ready for review. Review cards to keep your streak intact.',
      actionText: 'Review Flashcards',
      targetPath: '/vocab/flashcards',
      priority: 'medium',
      module: 'vocab',
      metric: `${dueVocabCount} cards due`,
    });
  }

  // Fallback general recommendation
  if (recommendations.length === 0) {
    recommendations.push({
      id: 'rec_full_mock',
      category: 'milestone',
      title: 'Take a Full Timed Practice Test',
      description: 'Test your stamina under strict exam conditions: 60 minutes Reading or 40 minutes Writing.',
      actionText: 'Start Timed Test',
      targetPath: '/practice/reading',
      priority: 'medium',
    });
  }

  return recommendations;
}
