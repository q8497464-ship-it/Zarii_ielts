import { apiSupabase } from './supabaseClient';
import { contentStore } from '../content/contentStore';
import type {
  TestEntity,
  SectionEntity,
  PassageEntity,
  QuestionEntity,
  WritingPromptEntity,
  SpeakingCardEntity,
  VocabWordEntity,
  GrammarLessonEntity,
} from '../types/database';

export const contentApi = {
  /**
   * Tests (Reading, Listening, Mock Exams)
   * Fetches published tests from backend with cached offline copies
   */
  async getTests(skill?: string): Promise<TestEntity[]> {
    try {
      if (apiSupabase.isLive) {
        const { data, error } = await apiSupabase.from<TestEntity>('tests').select('*');
        if (!error && data && data.length > 0) {
          const published = data.filter((t) => t.status === 'published' && (!skill || t.skill === skill));
          return published;
        }
      }
    } catch (err) {
      console.warn('Backend fetch failed, falling back to cached offline repository:', err);
    }

    // Local / Offline Fallback from Content Store
    return contentStore
      .getTests()
      .filter((t) => t.status === 'published' && (!skill || t.skill === skill));
  },

  /**
   * Full Test with Passages, Sections & Questions for Student Exam Runner
   */
  async getTestWithStimulus(testId: string): Promise<{
    test: TestEntity | undefined;
    passages: PassageEntity[];
    sections: SectionEntity[];
    questions: QuestionEntity[];
  }> {
    const test = contentStore.getTestById(testId);
    const passages = contentStore.getPassagesForTest(testId);
    const sections = contentStore.getSectionsForTest(testId);
    const questions = contentStore.getQuestionsForTest(testId);

    return {
      test,
      passages,
      sections,
      questions,
    };
  },

  /**
   * Vocabulary Words (Academic Word List)
   * Offline-first with backend sync
   */
  async getVocabWords(): Promise<VocabWordEntity[]> {
    try {
      if (apiSupabase.isLive) {
        const { data, error } = await apiSupabase.from<VocabWordEntity>('vocab_words').select('*');
        if (!error && data && data.length > 0) {
          return data.filter((w) => w.status === 'published');
        }
      }
    } catch (err) {
      console.warn('Backend fetch failed, loading local vocab cache:', err);
    }

    return contentStore.getVocabWords().filter((w) => w.status === 'published');
  },

  /**
   * Grammar Lessons
   */
  async getGrammarLessons(): Promise<GrammarLessonEntity[]> {
    try {
      if (apiSupabase.isLive) {
        const { data, error } = await apiSupabase.from<GrammarLessonEntity>('grammar_lessons').select('*');
        if (!error && data && data.length > 0) {
          return data.filter((l) => l.status === 'published');
        }
      }
    } catch (err) {
      console.warn('Backend fetch failed, loading local grammar cache:', err);
    }

    return contentStore.getGrammarLessons().filter((l) => l.status === 'published');
  },

  /**
   * Writing Prompts (Task 1 & Task 2)
   */
  async getWritingPrompts(taskType?: string): Promise<WritingPromptEntity[]> {
    try {
      if (apiSupabase.isLive) {
        const { data, error } = await apiSupabase.from<WritingPromptEntity>('writing_prompts').select('*');
        if (!error && data && data.length > 0) {
          return data.filter((p) => p.status === 'published' && (!taskType || p.task_type === taskType));
        }
      }
    } catch (err) {
      console.warn('Backend fetch failed, loading local writing cache:', err);
    }

    return contentStore
      .getWritingPrompts()
      .filter((p) => p.status === 'published' && (!taskType || p.task_type === taskType));
  },

  /**
   * Speaking Cards
   */
  async getSpeakingCards(part?: number): Promise<SpeakingCardEntity[]> {
    try {
      if (apiSupabase.isLive) {
        const { data, error } = await apiSupabase.from<SpeakingCardEntity>('speaking_cards').select('*');
        if (!error && data && data.length > 0) {
          return data.filter((c) => c.status === 'published' && (!part || c.part === part));
        }
      }
    } catch (err) {
      console.warn('Backend fetch failed, loading local speaking cache:', err);
    }

    return contentStore
      .getSpeakingCards()
      .filter((c) => c.status === 'published' && (!part || c.part === part));
  },
};
