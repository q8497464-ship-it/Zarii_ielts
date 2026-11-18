import { apiSupabase } from './supabaseClient';
import { db } from '../../lib/db';
import type { AttemptEntity, WritingSubmissionEntity, SpeakingSessionEntity } from '../types/database';

export const attemptsApi = {
  /**
   * Save exam attempt (Reading / Listening / Mock)
   * Always persists locally to IndexedDB first, then syncs to cloud if online & logged in
   */
  async saveAttempt(attempt: Omit<AttemptEntity, 'id' | 'synced_at'>): Promise<string> {
    const localId = `att_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;

    // 1. Save locally in Dexie database
    try {
      await db.attempts.add({
        testId: attempt.test_id,
        testType: 'academic',
        module: (attempt.skill as any) || 'reading',
        title: attempt.test_id,
        score: attempt.raw_score || 0,
        totalQuestions: attempt.total_questions || 40,
        bandEstimate: attempt.band || 0,
        timeSpentSeconds: attempt.duration_seconds || 0,
        startedAt: attempt.completed_at || new Date().toISOString(),
        completedAt: attempt.completed_at || new Date().toISOString(),
        status: 'completed',
      });
    } catch (err) {
      console.warn('Failed to save attempt in Dexie local storage:', err);
    }

    // 2. Sync to cloud if live and user is authenticated
    if (apiSupabase.isLive && attempt.user_id) {
      try {
        await apiSupabase.from('attempts').insert({
          ...attempt,
          id: localId,
          synced_at: new Date().toISOString(),
        });
      } catch (err) {
        console.warn('Cloud attempt sync deferred (offline):', err);
      }
    }

    return localId;
  },

  /**
   * Save writing essay submission
   */
  async saveWritingSubmission(submission: Omit<WritingSubmissionEntity, 'id'>): Promise<string> {
    const localId = `wsub_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;

    try {
      await db.writingSubmissions.add({
        promptId: submission.prompt_id,
        taskType: submission.task_type as any,
        promptTitle: submission.prompt_id,
        promptBody: '',
        essayText: submission.essay_text,
        wordCount: submission.word_count,
        targetTimeSeconds: 2400,
        timeSpentSeconds: 1200,
        submittedAt: submission.created_at || new Date().toISOString(),
        bandEstimate: submission.estimated_band || 6.5,
        feedback: (submission.ai_feedback as any) || {
          evaluationMode: 'rule_based',
          overallBand: submission.estimated_band || 6.5,
          taskResponse: { band: 6.5, comments: 'Good response.' },
          coherenceAndCohesion: { band: 6.5, comments: 'Clear structure.' },
          lexicalResource: { band: 6.5, comments: 'Appropriate vocabulary.' },
          grammaticalRangeAndAccuracy: { band: 6.5, comments: 'Good grammar.' },
          strengths: [],
          priorityImprovements: [],
          examinerSummary: '',
        },
      });
    } catch (err) {
      console.warn('Failed to save writing submission locally:', err);
    }

    if (apiSupabase.isLive && submission.user_id) {
      try {
        await apiSupabase.from('writing_submissions').insert({
          ...submission,
          id: localId,
        });
      } catch (err) {
        console.warn('Cloud writing sync deferred (offline):', err);
      }
    }

    return localId;
  },

  /**
   * Save speaking audio session
   */
  async saveSpeakingSession(session: Omit<SpeakingSessionEntity, 'id'>): Promise<string> {
    const localId = `spk_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;

    try {
      const validPart = (session.part === 1 || session.part === 2 || session.part === 3) ? session.part : 1;
      await db.speakingSessions.add({
        cardId: session.topic || 'General',
        mode: 'mock',
        part: validPart,
        topicTitle: session.topic || 'General Practice',
        durationSeconds: 180,
        transcript: session.transcription || '',
        bandEstimate: session.estimated_band || 6.5,
        recordedAt: session.created_at || new Date().toISOString(),
        feedback: session.ai_feedback as any,
      });
    } catch (err) {
      console.warn('Failed to save speaking session locally:', err);
    }

    if (apiSupabase.isLive && session.user_id) {
      try {
        await apiSupabase.from('speaking_sessions').insert({
          ...session,
          id: localId,
        });
      } catch (err) {
        console.warn('Cloud speaking sync deferred (offline):', err);
      }
    }

    return localId;
  },
};
