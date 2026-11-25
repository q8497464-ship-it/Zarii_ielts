import { describe, it, expect, beforeEach } from 'vitest';
import { skillsService } from './skillsService';
import { READING_LIBRARY } from '../data/readingLibrary';
import { LISTENING_LIBRARY } from '../data/listeningLibrary';
import { MINIMAL_PAIRS, STRESS_DRILLS, TONGUE_TWISTERS, ROLE_PLAY_SCENARIOS } from '../data/speakingLibrary';
import { WRITING_TASKS } from '../data/writingLibrary';
import { evaluateStudentWriting } from '../utils/writingEvaluator';

if (typeof localStorage === 'undefined') {
  const store: Record<string, string> = {};
  (globalThis as any).localStorage = {
    getItem: (k: string) => store[k] || null,
    setItem: (k: string, v: string) => { store[k] = String(v); },
    removeItem: (k: string) => { delete store[k]; },
    clear: () => { Object.keys(store).forEach(k => delete store[k]); }
  };
}

describe('General English Skills Engine & Free Learning Suite', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  describe('1. Reading Library (Graded Readers A1-C1)', () => {
    it('contains exactly 100 graded readers (20 per level for A1, A2, B1, B2, C1)', () => {
      expect(READING_LIBRARY.length).toBe(100);
      const levels = ['A1', 'A2', 'B1', 'B2', 'C1'] as const;
      levels.forEach(lvl => {
        const count = READING_LIBRARY.filter(r => r.level === lvl).length;
        expect(count).toBe(20);
      });
    });

    it('each reader contains exactly 5 comprehension questions with valid options and explanations', () => {
      READING_LIBRARY.forEach(reader => {
        expect(reader.questions.length).toBe(5);
        reader.questions.forEach(q => {
          expect(q.options.length).toBeGreaterThanOrEqual(4);
          expect(q.correctIndex).toBeGreaterThanOrEqual(0);
          expect(q.correctIndex).toBeLessThan(q.options.length);
          expect(q.explanation.length).toBeGreaterThan(10);
        });
      });
    });

    it('each reader includes vocabulary highlights with definitions, POS, and Urdu', () => {
      READING_LIBRARY.forEach(reader => {
        expect(reader.vocabularyHighlights.length).toBeGreaterThanOrEqual(3);
        reader.vocabularyHighlights.forEach(v => {
          expect(v.word.length).toBeGreaterThan(0);
          expect(v.definition.length).toBeGreaterThan(0);
          expect(v.pos.length).toBeGreaterThan(0);
          expect(v.urdu.length).toBeGreaterThan(0);
        });
      });
    });

    it('tracks and increments reading streak correctly across days', () => {
      const initial = skillsService.getReadingStreak();
      expect(initial.currentStreak).toBe(1);

      const afterOne = skillsService.recordReadingCompleted('reader-a1-01');
      expect(afterOne.totalCompleted).toBe(1);
      expect(afterOne.currentStreak).toBe(1);
    });
  });

  describe('2. Listening Studio & Multi-Voice Transcripts', () => {
    it('contains listening tracks with dialogue scripts, questions, and dictation blanks', () => {
      expect(LISTENING_LIBRARY.length).toBeGreaterThanOrEqual(5);
      LISTENING_LIBRARY.forEach(track => {
        expect(track.script.length).toBeGreaterThanOrEqual(3);
        expect(track.comprehensionQuestions.length).toBeGreaterThanOrEqual(2);
        expect(track.dictationExercises.length).toBeGreaterThanOrEqual(1);
        track.dictationExercises.forEach(d => {
          expect(d.targetText.length).toBeGreaterThan(0);
          expect(d.audioClipText.length).toBeGreaterThan(0);
        });
      });
    });

    it('filters listening tracks by CEFR level', () => {
      const a1Tracks = skillsService.getListeningLibrary('A1');
      expect(a1Tracks.every(t => t.level === 'A1')).toBe(true);
      expect(a1Tracks.length).toBeGreaterThan(0);
    });
  });

  describe('3. Speaking & Pronunciation Drills', () => {
    it('contains core minimal pairs with phonetic contrast guides and sentences', () => {
      expect(MINIMAL_PAIRS.length).toBeGreaterThanOrEqual(5);
      const shipSheep = MINIMAL_PAIRS.find(p => p.id === 'mp-short-long-i');
      expect(shipSheep).toBeDefined();
      expect(shipSheep?.practiceSentences.length).toBe(4);
      expect(shipSheep?.urduTip.length).toBeGreaterThan(10);
    });

    it('provides syllable stress shift drills for nouns vs verbs and word families', () => {
      expect(STRESS_DRILLS.length).toBeGreaterThanOrEqual(3);
      const nounVerb = STRESS_DRILLS.find(d => d.type === 'word-noun-verb');
      expect(nounVerb).toBeDefined();
      expect(nounVerb?.examples.length).toBeGreaterThanOrEqual(4);
    });

    it('includes graded tongue twisters across levels with target WPM', () => {
      expect(TONGUE_TWISTERS.length).toBeGreaterThanOrEqual(5);
      TONGUE_TWISTERS.forEach(tt => {
        expect(tt.targetWpm).toBeGreaterThanOrEqual(80);
        expect(tt.text.length).toBeGreaterThan(15);
      });
    });

    it('provides multi-turn interactive roleplay scenarios', () => {
      expect(ROLE_PLAY_SCENARIOS.length).toBeGreaterThanOrEqual(3);
      ROLE_PLAY_SCENARIOS.forEach(sc => {
        expect(sc.turns.length).toBeGreaterThanOrEqual(4);
        const appTurns = sc.turns.filter(t => t.speaker === 'app');
        const userTurns = sc.turns.filter(t => t.speaker === 'user');
        expect(appTurns.length).toBeGreaterThan(0);
        expect(userTurns.length).toBeGreaterThan(0);
      });
    });
  });

  describe('4. Writing Studio & Rule-Based Evaluator', () => {
    it('contains tasks for all 5 levels (A1 to C1)', () => {
      expect(WRITING_TASKS.length).toBeGreaterThanOrEqual(5);
      const a1 = WRITING_TASKS.find(t => t.level === 'A1');
      expect(a1?.formFields).toBeDefined();
      expect(a1?.formFields?.length).toBeGreaterThan(2);

      const b2 = WRITING_TASKS.find(t => t.level === 'B2');
      expect(b2?.taskType).toBe('essay-review');
    });

    it('enforces anti-gaming guard: rejects text with fewer than 5 words', () => {
      const task = WRITING_TASKS[0];
      const res = evaluateStudentWriting('hello there', task);
      expect(res.isValid).toBe(false);
      expect(res.error).toMatch(/at least 5/i);
    });

    it('detects uncapitalized sentence starts, standalone lowercase "i", and repeated words', () => {
      const task = WRITING_TASKS[1]; // A2
      const text = 'last week i went to the the park. it was very sunny.';
      const res = evaluateStudentWriting(text, task);

      expect(res.isValid).toBe(true);
      const issueTypes = res.issues.map(i => i.type);
      expect(issueTypes).toContain('grammar'); // standalone 'i'
      expect(issueTypes).toContain('punctuation'); // sentence start 'last'
    });

    it('recognizes transition words and awards good progress evaluation', () => {
      const task = WRITING_TASKS.find(t => t.level === 'B2')!;
      const text = `On the one hand, remote work allows extraordinary personal freedom and eliminates the daily traffic commute. Furthermore, employees can spend more time with their families. Conversely, professional isolation remains a significant hurdle. In conclusion, a balanced hybrid working model provides the ideal equilibrium for modern enterprises.`;
      const res = evaluateStudentWriting(text, task);

      expect(res.isValid).toBe(true);
      expect(res.transitionWordsFound.length).toBeGreaterThanOrEqual(2);
      expect(res.vocabularyVarietyScore).toBeGreaterThan(40);
    });
  });

  describe('5. Daily 15 Routine Architecture', () => {
    it('generates a complete 5-step daily routine', () => {
      const plan = skillsService.getDaily15Plan();
      expect(plan.steps.grammar).toBeDefined();
      expect(plan.steps.vocabWords.length).toBe(10);
      expect(plan.steps.listening).toBeDefined();
      expect(plan.steps.reading).toBeDefined();
      expect(plan.steps.speaking).toBeDefined();
      expect(plan.completed).toBe(false);
    });

    it('marks daily routine as completed', () => {
      skillsService.markDaily15Completed();
      const plan = skillsService.getDaily15Plan();
      expect(plan.completed).toBe(true);
    });
  });
});
