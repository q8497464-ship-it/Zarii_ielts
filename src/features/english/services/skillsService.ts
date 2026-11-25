// Skills Service for General English (Reading, Listening, Speaking, Writing, Daily 15)
// Persistent offline storage via Dexie IndexedDB and localStorage ($0 Paid APIs)

import { db } from '../../../lib/db';
import { createInitialVocabProgress } from '../../vocab/sm2';
import { READING_LIBRARY, type GradedReader } from '../data/readingLibrary';
import { LISTENING_LIBRARY, type ListeningTrackItem } from '../data/listeningLibrary';
import {
  MINIMAL_PAIRS,
  STRESS_DRILLS,
  TONGUE_TWISTERS,
  SHADOWING_SENTENCES,
  ROLE_PLAY_SCENARIOS,
  type RolePlayScenario
} from '../data/speakingLibrary';
import { WRITING_TASKS, type WritingTask } from '../data/writingLibrary';
import type { EnglishCEFRLevel } from '../../../types';

export interface ReadingStreakData {
  currentStreak: number;
  lastReadDate: string | null;
  totalCompleted: number;
  wordsSavedCount: number;
}

export interface Daily15Plan {
  id: string;
  dateStr: string;
  completed: boolean;
  steps: {
    grammar: { title: string; ruleSummary: string; exercisePrompt: string; options: string[]; correctIndex: number; explanation: string };
    vocabWords: Array<{ word: string; pos: string; definition: string; urdu: string }>;
    listening: ListeningTrackItem;
    reading: GradedReader;
    speaking: { targetSentence: string; focusPhoneme: string; targetWpm: number; urduTip: string };
  };
}

export const skillsService = {
  // --- READING LIBRARY ---
  getReadingLibrary(level?: EnglishCEFRLevel, genre?: string): GradedReader[] {
    return READING_LIBRARY.filter((r) => {
      const matchLevel = !level || r.level === level;
      const matchGenre = !genre || r.genre === genre;
      return matchLevel && matchGenre;
    });
  },

  getReaderById(id: string): GradedReader | undefined {
    return READING_LIBRARY.find((r) => r.id === id);
  },

  getReadingStreak(): ReadingStreakData {
    try {
      const raw = localStorage.getItem('zarii_reading_streak_data');
      if (raw) {
        return JSON.parse(raw);
      }
    } catch {
      // fallback
    }
    return {
      currentStreak: 1,
      lastReadDate: null,
      totalCompleted: 0,
      wordsSavedCount: 0
    };
  },

  recordReadingCompleted(readerId: string): ReadingStreakData {
    const today = new Date().toISOString().split('T')[0];
    const data = this.getReadingStreak();

    if (data.lastReadDate !== today) {
      if (data.lastReadDate) {
        const last = new Date(data.lastReadDate);
        const curr = new Date(today);
        const diffDays = Math.round((curr.getTime() - last.getTime()) / (1000 * 3600 * 24));
        if (diffDays === 1) {
          data.currentStreak += 1;
        } else if (diffDays > 1) {
          data.currentStreak = 1;
        }
      } else {
        data.currentStreak = 1;
      }
      data.lastReadDate = today;
    }

    data.totalCompleted += 1;
    localStorage.setItem('zarii_reading_streak_data', JSON.stringify(data));

    // Also mark in history list
    try {
      const historyRaw = localStorage.getItem('zarii_reading_completed_ids') || '[]';
      const history: string[] = JSON.parse(historyRaw);
      if (!history.includes(readerId)) {
        history.push(readerId);
        localStorage.setItem('zarii_reading_completed_ids', JSON.stringify(history));
      }
    } catch {
      // fallback
    }

    return data;
  },

  // --- WORD BANK INTEGRATION ---
  async saveWordToBank(
    word: string,
    pos: 'noun' | 'verb' | 'adjective' | 'adverb' = 'noun',
    definition: string = '',
    urdu: string = ''
  ): Promise<boolean> {
    const cleanWord = word.trim().toLowerCase();
    if (!cleanWord) return false;

    try {
      const existing = await db.vocabProgress.where('wordId').equals(cleanWord).first();
      if (!existing) {
        const item = createInitialVocabProgress(cleanWord, true);
        (item as any).track = 'english';
        (item as any).customDefinition = definition;
        (item as any).customUrdu = urdu;
        (item as any).partOfSpeech = pos;
        await db.vocabProgress.add(item);
      }

      // Update count in streak
      const streak = this.getReadingStreak();
      streak.wordsSavedCount += 1;
      localStorage.setItem('zarii_reading_streak_data', JSON.stringify(streak));
      return true;
    } catch (err) {
      console.warn('Could not save word to Dexie word bank:', err);
      return false;
    }
  },

  // --- MISTAKE NOTEBOOK LOGGING ---
  async logSkillMistake(
    questionId: string,
    skillModule: 'reading' | 'listening' | 'speaking' | 'writing',
    questionText: string,
    userAnswer: string,
    correctAnswer: string,
    explanation: string
  ): Promise<void> {
    try {
      await db.mistakes.add({
        questionId,
        module: skillModule as any,
        questionType: 'multiple-choice',
        questionPrompt: questionText,
        passageOrContextTitle: `General English ${skillModule}`,
        userAnswer,
        correctAnswer,
        explanation,
        track: 'english',
        createdAt: new Date().toISOString(),
        lastReviewedAt: undefined,
        retryCount: 0,
        isMastered: false,
        notes: ''
      });
    } catch (err) {
      console.warn('Could not save skill mistake to Dexie mistakes table:', err);
    }
  },

  // --- LISTENING LIBRARY ---
  getListeningLibrary(level?: EnglishCEFRLevel): ListeningTrackItem[] {
    if (!level) return LISTENING_LIBRARY;
    return LISTENING_LIBRARY.filter((l) => l.level === level);
  },

  getListeningById(id: string): ListeningTrackItem | undefined {
    return LISTENING_LIBRARY.find((l) => l.id === id);
  },

  // --- SPEAKING & PRONUNCIATION ---
  getMinimalPairs() {
    return MINIMAL_PAIRS;
  },

  getStressDrills() {
    return STRESS_DRILLS;
  },

  getTongueTwisters(level?: EnglishCEFRLevel) {
    if (!level) return TONGUE_TWISTERS;
    return TONGUE_TWISTERS.filter((t) => t.level === level);
  },

  getShadowingSentences(level?: EnglishCEFRLevel) {
    if (!level) return SHADOWING_SENTENCES;
    return SHADOWING_SENTENCES.filter((s) => s.level === level);
  },

  getRolePlayScenarios(level?: EnglishCEFRLevel): RolePlayScenario[] {
    if (!level) return ROLE_PLAY_SCENARIOS;
    return ROLE_PLAY_SCENARIOS.filter((r) => r.level === level);
  },

  getRolePlayById(id: string): RolePlayScenario | undefined {
    return ROLE_PLAY_SCENARIOS.find((r) => r.id === id);
  },

  // --- WRITING ---
  getWritingTasks(level?: EnglishCEFRLevel): WritingTask[] {
    if (!level) return WRITING_TASKS;
    return WRITING_TASKS.filter((w) => w.level === level);
  },

  getWritingTaskById(id: string): WritingTask | undefined {
    return WRITING_TASKS.find((w) => w.id === id);
  },

  async saveWritingSubmission(
    taskId: string,
    content: string,
    formValues?: Record<string, string>,
    evaluation?: any
  ): Promise<number | null> {
    try {
      const id = await db.writingSubmissions.add({
        promptId: taskId,
        taskType: 'academic_task2', // mapped to existing Dexie enum
        content,
        wordCount: content.trim().split(/\s+/).filter(Boolean).length,
        submittedAt: new Date().toISOString(),
        timeSpentSeconds: 300,
        feedback: evaluation ? JSON.stringify(evaluation) : undefined,
        track: 'english',
        estimatedBand: 0 // No fake band scores for general English
      } as any);
      return id;
    } catch (err) {
      console.warn('Failed to save writing submission to IndexedDB:', err);
      return null;
    }
  },

  // --- DAILY 15 ROUTINE ---
  getDaily15Plan(): Daily15Plan {
    const today = new Date().toISOString().split('T')[0];
    const rawKey = `zarii_daily15_${today}`;

    try {
      const saved = localStorage.getItem(rawKey);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch {
      // fallback
    }

    // Pick 1 listening, 1 reading from available datasets
    const reading = READING_LIBRARY[0] || null;
    const listening = LISTENING_LIBRARY[0] || null;

    const plan: Daily15Plan = {
      id: `daily-15-${today}`,
      dateStr: today,
      completed: false,
      steps: {
        grammar: {
          title: 'Present Simple vs Present Continuous',
          ruleSummary: 'Use Present Simple for general habits and permanent truths (I drink tea every morning). Use Present Continuous for actions happening right now at this moment (I am drinking tea now).',
          exercisePrompt: 'Complete the sentence: "Listen! Somebody ___ at the front door."',
          options: ['knocks', 'is knocking', 'knocked', 'will knocking'],
          correctIndex: 1,
          explanation: '"Listen!" signals an action occurring right now in this exact moment, requiring Present Continuous ("is knocking").'
        },
        vocabWords: [
          { word: 'cappuccino', pos: 'noun', definition: 'espresso coffee topped with frothed milk', urdu: 'جھاگ دار کافی' },
          { word: 'straight', pos: 'adverb', definition: 'in a direct line without curve', urdu: 'سیدھا' },
          { word: 'reservation', pos: 'noun', definition: 'an arrangement to secure a room or table', urdu: 'پیشگی بکنگ' },
          { word: 'compromise', pos: 'noun', definition: 'an agreement reached by mutual concession', urdu: 'باہمی سمجھوتہ' },
          { word: 'regenerative', pos: 'adjective', definition: 'restoring or renewing vital energy', urdu: 'بحال کرنے والا' },
          { word: 'boundary', pos: 'noun', definition: 'a line marking the limits of an area', urdu: 'حد' },
          { word: 'pleasant', pos: 'adjective', definition: 'giving a sense of happy satisfaction', urdu: 'خوشگوار' },
          { word: 'sustainable', pos: 'adjective', definition: 'able to be maintained at a steady rate', urdu: 'پائیدار' },
          { word: 'deliberate', pos: 'adjective', definition: 'done consciously and intentionally', urdu: 'سوچ سمجھ کر' },
          { word: 'scrutiny', pos: 'noun', definition: 'critical observation or examination', urdu: 'گہری جانچ' }
        ],
        listening,
        reading,
        speaking: {
          targetSentence: 'Clear communication requires listening carefully and speaking with calm confidence.',
          focusPhoneme: '/kəmˌjuː.nɪˈkeɪ.ʃən/ and rhythmic pauses',
          targetWpm: 120,
          urduTip: 'ہر فقرے کے بعد ہلکا سا وقفہ لیں اور پراعتماد لہجے میں بولیں۔'
        }
      }
    };

    localStorage.setItem(rawKey, JSON.stringify(plan));
    return plan;
  },

  markDaily15Completed(): void {
    const today = new Date().toISOString().split('T')[0];
    const rawKey = `zarii_daily15_${today}`;
    try {
      const plan = this.getDaily15Plan();
      plan.completed = true;
      localStorage.setItem(rawKey, JSON.stringify(plan));
    } catch {
      // fallback
    }
  }
};
