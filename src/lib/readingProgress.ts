export interface ActiveTestProgress {
  testId: string;
  answers: Record<string, string>; // questionId -> answer
  flagged: string[]; // array of questionIds
  secondsLeft: number;
  notes: string;
  highlights: Record<number, string[]>; // passageNumber -> array of highlighted text snippets
  updatedAt: string;
  attemptSeed?: string; // Seed for deterministic MCQ option shuffling across refreshes
}

const STORAGE_KEY_PREFIX = 'zarii_active_reading_';

export function saveActiveTestProgress(progress: ActiveTestProgress): void {
  try {
    localStorage.setItem(
      `${STORAGE_KEY_PREFIX}${progress.testId}`,
      JSON.stringify({ ...progress, updatedAt: new Date().toISOString() })
    );
  } catch (e) {
    console.warn('Failed to save reading progress to localStorage', e);
  }
}

export function loadActiveTestProgress(testId: string): ActiveTestProgress | null {
  try {
    const raw = localStorage.getItem(`${STORAGE_KEY_PREFIX}${testId}`);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch (e) {
    console.warn('Failed to load reading progress from localStorage', e);
    return null;
  }
}

export function clearActiveTestProgress(testId: string): void {
  try {
    localStorage.removeItem(`${STORAGE_KEY_PREFIX}${testId}`);
  } catch (e) {
    console.warn('Failed to clear reading progress', e);
  }
}
