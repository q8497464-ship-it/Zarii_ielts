import Dexie, { type Table } from 'dexie';
import type {
  UserProfile,
  AppSettings,
  TestAttempt,
  QuestionResponse,
  WritingSubmission,
  SpeakingSession,
  VocabProgress,
  StudyPlanDay,
  MistakeItem,
} from '../types';

export class ZariiDatabase extends Dexie {
  profile!: Table<UserProfile, number>;
  attempts!: Table<TestAttempt, number>;
  responses!: Table<QuestionResponse, number>;
  writingSubmissions!: Table<WritingSubmission, number>;
  speakingSessions!: Table<SpeakingSession, number>;
  vocabProgress!: Table<VocabProgress, number>;
  studyPlan!: Table<StudyPlanDay, number>;
  settings!: Table<AppSettings, number>;
  mistakes!: Table<MistakeItem, number>;

  constructor() {
    super('ZariiIELTS_DB');

    this.version(1).stores({
      profile: '++id, testType, targetBand, onboardingCompleted, createdAt',
      attempts: '++id, testId, testType, module, completedAt, status, startedAt',
      responses: '++id, attemptId, questionId, module, isCorrect',
      writingSubmissions: '++id, promptId, taskType, submittedAt',
      speakingSessions: '++id, cardId, part, recordedAt',
      vocabProgress: '++id, wordId, box, nextReviewAt, mastered',
      studyPlan: '++id, dayIndex, dateStr, module, completed',
      settings: '++id, theme, updatedAt',
    });

    this.version(2).stores({
      mistakes: '++id, questionId, module, questionType, isMastered, createdAt, lastReviewedAt',
    });

    this.version(3).stores({
      profile: '++id, testType, targetBand, onboardingCompleted, createdAt, updatedAt',
      attempts: '++id, testId, testType, module, completedAt, status, startedAt',
      responses: '++id, attemptId, questionId, module, isCorrect',
      writingSubmissions: '++id, promptId, taskType, submittedAt',
      speakingSessions: '++id, cardId, part, recordedAt',
      vocabProgress: '++id, wordId, box, nextReviewAt, mastered',
      studyPlan: '++id, dayIndex, dateStr, module, completed',
      settings: '++id, theme, updatedAt',
      mistakes: '++id, questionId, module, questionType, isMastered, createdAt, lastReviewedAt',
    }).upgrade(() => {
      console.log('✓ Upgraded Zarii database schema to v3');
    });
  }
}

export const db = new ZariiDatabase();

// Default settings
export const DEFAULT_SETTINGS: AppSettings = {
  theme: 'light',
  textSize: 'normal',
  soundEnabled: true,
  hapticEnabled: true,
  preferredAiProvider: 'none',
  updatedAt: new Date().toISOString(),
};

// Database helper utilities
export async function getActiveProfile(): Promise<UserProfile | undefined> {
  const profiles = await db.profile.toArray();
  return profiles.length > 0 ? profiles[0] : undefined;
}

export async function saveProfile(profileData: Omit<UserProfile, 'id' | 'createdAt' | 'updatedAt'> & { id?: number }): Promise<number> {
  const now = new Date().toISOString();
  if (profileData.id) {
    await db.profile.update(profileData.id, {
      ...profileData,
      updatedAt: now,
    });
    return profileData.id;
  }
  
  const existing = await getActiveProfile();
  if (existing && existing.id) {
    await db.profile.update(existing.id, {
      ...profileData,
      updatedAt: now,
    });
    return existing.id;
  }

  const id = await db.profile.add({
    ...profileData,
    createdAt: now,
    updatedAt: now,
  });
  return id;
}

export async function getAppSettings(): Promise<AppSettings> {
  const records = await db.settings.toArray();
  if (records.length === 0) {
    const id = await db.settings.add(DEFAULT_SETTINGS);
    return { ...DEFAULT_SETTINGS, id };
  }
  return records[0];
}

export async function updateAppSettings(updates: Partial<AppSettings>): Promise<void> {
  const current = await getAppSettings();
  if (current.id) {
    await db.settings.update(current.id, {
      ...updates,
      updatedAt: new Date().toISOString(),
    });
  }
}

// Full export of Dexie database to a JSON object
export async function exportDatabaseBackup(): Promise<string> {
  const [profile, attempts, responses, writingSubmissions, speakingSessions, vocabProgress, studyPlan, settings, mistakes] =
    await Promise.all([
      db.profile.toArray(),
      db.attempts.toArray(),
      db.responses.toArray(),
      db.writingSubmissions.toArray(),
      db.speakingSessions.toArray(),
      db.vocabProgress.toArray(),
      db.studyPlan.toArray(),
      db.settings.toArray(),
      db.mistakes.toArray(),
    ]);

  const backup = {
    appName: 'Zarii IELTS',
    version: '1.0',
    exportedAt: new Date().toISOString(),
    data: {
      profile,
      attempts,
      responses,
      writingSubmissions,
      speakingSessions,
      vocabProgress,
      studyPlan,
      settings,
      mistakes,
    },
  };

  return JSON.stringify(backup, null, 2);
}

// Restore database from JSON backup string
export async function importDatabaseBackup(jsonString: string): Promise<boolean> {
  try {
    const parsed = JSON.parse(jsonString);
    if (!parsed.data) {
      throw new Error('Invalid backup format: missing data container');
    }

    await db.transaction('rw', [
      db.profile,
      db.attempts,
      db.responses,
      db.writingSubmissions,
      db.speakingSessions,
      db.vocabProgress,
      db.studyPlan,
      db.settings,
      db.mistakes,
    ], async () => {
      // Clear current data
      await Promise.all([
        db.profile.clear(),
        db.attempts.clear(),
        db.responses.clear(),
        db.writingSubmissions.clear(),
        db.speakingSessions.clear(),
        db.vocabProgress.clear(),
        db.studyPlan.clear(),
        db.settings.clear(),
        db.mistakes.clear(),
      ]);

      // Insert restored data
      if (parsed.data.profile?.length) await db.profile.bulkAdd(parsed.data.profile);
      if (parsed.data.attempts?.length) await db.attempts.bulkAdd(parsed.data.attempts);
      if (parsed.data.responses?.length) await db.responses.bulkAdd(parsed.data.responses);
      if (parsed.data.writingSubmissions?.length) await db.writingSubmissions.bulkAdd(parsed.data.writingSubmissions);
      if (parsed.data.speakingSessions?.length) await db.speakingSessions.bulkAdd(parsed.data.speakingSessions);
      if (parsed.data.vocabProgress?.length) await db.vocabProgress.bulkAdd(parsed.data.vocabProgress);
      if (parsed.data.studyPlan?.length) await db.studyPlan.bulkAdd(parsed.data.studyPlan);
      if (parsed.data.settings?.length) await db.settings.bulkAdd(parsed.data.settings);
      if (parsed.data.mistakes?.length) await db.mistakes.bulkAdd(parsed.data.mistakes);
    });

    return true;
  } catch (error) {
    console.error('Import failed:', error);
    throw error;
  }
}

// Debounced write coordinator to protect against rapid autosave contention
const activeDebounceTimers = new Map<string, ReturnType<typeof setTimeout>>();

export function debouncedSave<T>(
  key: string,
  saveFn: () => Promise<T>,
  delayMs: number = 600
): Promise<T> {
  return new Promise((resolve, reject) => {
    const existing = activeDebounceTimers.get(key);
    if (existing) {
      clearTimeout(existing);
    }

    const timer = setTimeout(async () => {
      activeDebounceTimers.delete(key);
      try {
        const result = await saveFn();
        resolve(result);
      } catch (err) {
        console.error(`[DB DebouncedSave] Error writing key "${key}":`, err);
        reject(err);
      }
    }, delayMs);

    activeDebounceTimers.set(key, timer);
  });
}

// Health check utility for verifying database integrity on startup
export async function checkDatabaseHealth(): Promise<{ healthy: boolean; error?: string }> {
  try {
    if (typeof indexedDB === 'undefined') {
      return { healthy: true };
    }
    if (!db.isOpen()) {
      await db.open();
    }
    // Verify core tables can execute count without transaction faults
    await Promise.all([
      db.profile.count(),
      db.attempts.count(),
      db.settings.count(),
    ]);
    return { healthy: true };
  } catch (err: any) {
    console.error('[DB Health] Database verification issue:', err);
    return { healthy: false, error: err?.message || String(err) };
  }
}

// Emergency salvage of any readable tables during corruption recovery
export async function emergencySalvageAndExport(): Promise<{ backupJson: string | null; error?: string }> {
  try {
    const tables = [
      'profile',
      'attempts',
      'responses',
      'writingSubmissions',
      'speakingSessions',
      'vocabProgress',
      'studyPlan',
      'settings',
      'mistakes',
    ] as const;

    const salvageData: Record<string, any[]> = {};

    for (const tableName of tables) {
      try {
        const rows = await (db as any)[tableName].toArray();
        salvageData[tableName] = rows;
      } catch (err) {
        console.warn(`[DB Salvage] Could not recover table ${tableName}:`, err);
        salvageData[tableName] = [];
      }
    }

    const backup = {
      appName: 'Zarii IELTS Emergency Salvage Backup',
      version: '1.0',
      salvagedAt: new Date().toISOString(),
      data: salvageData,
    };

    return { backupJson: JSON.stringify(backup, null, 2) };
  } catch (err: any) {
    return { backupJson: null, error: err?.message || String(err) };
  }
}

// Clear all user progress
export async function clearAllUserData(): Promise<void> {
  await db.transaction('rw', [
    db.profile,
    db.attempts,
    db.responses,
    db.writingSubmissions,
    db.speakingSessions,
    db.vocabProgress,
    db.studyPlan,
    db.mistakes,
  ], async () => {
    await Promise.all([
      db.profile.clear(),
      db.attempts.clear(),
      db.responses.clear(),
      db.writingSubmissions.clear(),
      db.speakingSessions.clear(),
      db.vocabProgress.clear(),
      db.studyPlan.clear(),
      db.mistakes.clear(),
    ]);
  });
}

// Full reset and re-initialization of schema in case of unrecoverable corruption
export async function resetAndRecoverDatabase(): Promise<boolean> {
  try {
    await db.delete();
    await db.open();
    return true;
  } catch (err) {
    console.error('Failed to reset and reopen database:', err);
    return false;
  }
}
