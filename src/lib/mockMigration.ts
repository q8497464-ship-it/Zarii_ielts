/**
 * Database Migration & Cleanup for Mock Exam Attempts
 * 
 * Inspects previously saved mock attempts in Dexie and rectifies attempts where
 * the candidate skipped all sections but received default fake bands (e.g. W:5.5, S:6.0, Overall 3.0).
 * Sets status to 'not_attempted', clears fake band estimates, and updates notes honestly.
 */

import { db } from './db';

export interface MigrationResult {
  totalInspected: number;
  cleanedCount: number;
  cleanedIds: number[];
}

export async function runMockAttemptsMigration(): Promise<MigrationResult> {
  const result: MigrationResult = {
    totalInspected: 0,
    cleanedCount: 0,
    cleanedIds: [],
  };

  try {
    const attempts = await db.attempts.toArray();
    result.totalInspected = attempts.length;

    for (const attempt of attempts) {
      if (!attempt.id) continue;

      const isFullMock =
        attempt.title?.includes('(Full Mock)') ||
        attempt.notes?.includes('Full Mock Examination');

      if (!isFullMock) continue;

      // Detect fake bands on empty attempts:
      // Pattern: L:0 or L:0.0, R:0 or R:0.0, W:5.5, S:6.0 or score 0
      const notes = attempt.notes || '';
      const hasEmptyIndicators =
        (notes.includes('L:0') || notes.includes('L:0.0')) &&
        (notes.includes('R:0') || notes.includes('R:0.0')) &&
        notes.includes('W:5.5') &&
        notes.includes('S:6');

      const isZeroScore = attempt.score === 0;

      if (hasEmptyIndicators || (isZeroScore && attempt.bandEstimate === 3.0 && isFullMock)) {
        await db.attempts.update(attempt.id, {
          status: 'not_attempted',
          bandEstimate: 0,
          notes: 'Unattempted mock examination attempt (no sections submitted)',
        });
        result.cleanedCount += 1;
        result.cleanedIds.push(attempt.id);
      }
    }

    if (result.cleanedCount > 0) {
      console.log(`[MockMigration] Successfully cleaned up ${result.cleanedCount} empty mock attempts with fake bands.`);
    }

    return result;
  } catch (err) {
    console.error('[MockMigration] Failed to execute mock attempts migration:', err);
    return result;
  }
}
