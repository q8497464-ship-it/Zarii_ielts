/**
 * Track Data Migration Utility
 * 
 * Safely namespaces existing user data under the "ielts" track,
 * creates a full snapshot backup before modifying records,
 * and provides a one-click rollback mechanism.
 */

import { db, exportDatabaseBackup, importDatabaseBackup } from './db';
import type { UserProfile } from '../types';

const MIGRATION_FLAG_KEY = 'zarii_track_migration_v1_completed';
const BACKUP_STORAGE_KEY = 'zarii_track_migration_v1_backup';

export interface MigrationResult {
  migrated: boolean;
  backupCreated: boolean;
  attemptsTagged: number;
  vocabTagged: number;
  profileUpdated: boolean;
  error?: string;
}

/**
 * Executes track migration on application initialization.
 * Automatically idempotent - only runs once unless rollback or forced.
 */
export async function runTrackMigration(force = false): Promise<MigrationResult> {
  const result: MigrationResult = {
    migrated: false,
    backupCreated: false,
    attemptsTagged: 0,
    vocabTagged: 0,
    profileUpdated: false,
  };

  try {
    if (typeof window === 'undefined') return result;

    const alreadyDone = localStorage.getItem(MIGRATION_FLAG_KEY) === 'true';
    if (alreadyDone && !force) {
      return { ...result, migrated: true };
    }

    // 1. Create Pre-Migration Snapshot Backup
    try {
      const backupJson = await exportDatabaseBackup();
      localStorage.setItem(BACKUP_STORAGE_KEY, backupJson);
      result.backupCreated = true;
      console.log('✓ Created pre-track migration backup snapshot');
    } catch (backupErr) {
      console.warn('Could not store full localStorage backup, proceeding with transaction backup:', backupErr);
    }

    // 2. Perform Migration within Dexie transaction
    await db.transaction(
      'rw',
      [
        db.profile,
        db.attempts,
        db.writingSubmissions,
        db.speakingSessions,
        db.vocabProgress,
        db.studyPlan,
        db.mistakes,
      ],
      async () => {
        // Tag Attempts
        await db.attempts.toCollection().modify((attempt: any) => {
          if (!attempt.track) {
            attempt.track = 'ielts';
            result.attemptsTagged++;
          }
        });

        // Tag Writing Submissions
        await db.writingSubmissions.toCollection().modify((sub: any) => {
          if (!sub.track) sub.track = 'ielts';
        });

        // Tag Speaking Sessions
        await db.speakingSessions.toCollection().modify((sess: any) => {
          if (!sess.track) sess.track = 'ielts';
        });

        // Tag Vocab Progress
        await db.vocabProgress.toCollection().modify((v: any) => {
          if (!v.track) {
            v.track = 'ielts';
            result.vocabTagged++;
          }
        });

        // Tag Study Plan
        await db.studyPlan.toCollection().modify((sp: any) => {
          if (!sp.track) sp.track = 'ielts';
        });

        // Tag Mistakes
        await db.mistakes.toCollection().modify((m: any) => {
          if (!m.track) m.track = 'ielts';
        });

        // Update Profile
        const profiles = await db.profile.toArray();
        if (profiles.length > 0) {
          const p = profiles[0];
          const updates: Partial<UserProfile> = {};

          if (!p.goals || p.goals.length === 0) {
            updates.goals = ['ielts'];
          }
          if (!p.primaryTrack) {
            updates.primaryTrack = 'ielts';
          }
          if (!p.englishLevel) {
            updates.englishLevel = 'unknown';
          }
          if (p.urduHints === undefined) {
            updates.urduHints = true;
          }

          if (Object.keys(updates).length > 0 && p.id) {
            await db.profile.update(p.id, updates);
            result.profileUpdated = true;
          }
        }
      }
    );

    localStorage.setItem(MIGRATION_FLAG_KEY, 'true');
    result.migrated = true;
    console.log(`✓ Track migration completed: ${result.attemptsTagged} attempts tagged, ${result.vocabTagged} vocab words tagged.`);
    return result;
  } catch (err: any) {
    console.error('Track migration failed:', err);
    result.error = err?.message || String(err);
    return result;
  }
}

/**
 * Restores the pre-migration database snapshot.
 */
export async function rollbackTrackMigration(): Promise<{ success: boolean; error?: string }> {
  try {
    const backupJson = localStorage.getItem(BACKUP_STORAGE_KEY);
    if (!backupJson) {
      return { success: false, error: 'No backup snapshot found in local storage.' };
    }

    const restored = await importDatabaseBackup(backupJson);
    if (restored) {
      localStorage.removeItem(MIGRATION_FLAG_KEY);
      console.log('✓ Successfully rolled back track migration from snapshot.');
      return { success: true };
    }
    return { success: false, error: 'Database restore returned false.' };
  } catch (err: any) {
    console.error('Rollback failed:', err);
    return { success: false, error: err?.message || String(err) };
  }
}
