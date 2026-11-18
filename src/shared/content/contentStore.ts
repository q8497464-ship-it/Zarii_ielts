import {
  ALL_READING_TESTS,
} from '../../features/reading/readingContent';
import {
  ALL_LISTENING_TESTS,
} from '../../features/listening/listeningContent';
import {
  ALL_WRITING_PROMPTS,
} from '../../features/writing/writingContent';
import {
  ALL_PART1_TOPICS,
  ALL_PART2_CUE_CARDS,
} from '../../features/speaking/speakingContent';
import {
  ALL_ACADEMIC_WORDS,
  ALL_GRAMMAR_LESSONS,
} from '../../features/vocab/vocabContent';
import type {
  TestEntity,
  SectionEntity,
  PassageEntity,
  QuestionEntity,
  WritingPromptEntity,
  SpeakingCardEntity,
  VocabWordEntity,
  GrammarLessonEntity,
  MediaAssetEntity,
  AuditLogEntity,
  ContentStatus,
  DifficultyLevel,
  TestType,
  SkillType,
  TaskType,
} from '../types/database';
import { apiSupabase } from '../api/supabaseClient';

// Storage Keys for Browser Persistence & Offline Caching
const STORAGE_PREFIX = 'zarii_content_';
const KEY_TESTS = `${STORAGE_PREFIX}tests`;
const KEY_PASSAGES = `${STORAGE_PREFIX}passages`;
const KEY_SECTIONS = `${STORAGE_PREFIX}sections`;
const KEY_QUESTIONS = `${STORAGE_PREFIX}questions`;
const KEY_WRITING = `${STORAGE_PREFIX}writing`;
const KEY_SPEAKING = `${STORAGE_PREFIX}speaking`;
const KEY_VOCAB = `${STORAGE_PREFIX}vocab`;
const KEY_GRAMMAR = `${STORAGE_PREFIX}grammar`;
const KEY_MEDIA = `${STORAGE_PREFIX}media`;
const KEY_AUDIT = `${STORAGE_PREFIX}audit_log`;
const KEY_DRAFTS = `${STORAGE_PREFIX}drafts`;
const KEY_VERSIONS = `${STORAGE_PREFIX}versions`;
const KEY_MIGRATED = `${STORAGE_PREFIX}has_migrated_v1`;

const memStorage = new Map<string, string>();
const safeStorage = {
  getItem: (key: string): string | null => {
    try {
      if (typeof localStorage !== 'undefined') return localStorage.getItem(key);
    } catch {}
    return memStorage.get(key) || null;
  },
  setItem: (key: string, val: string): void => {
    try {
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem(key, val);
        return;
      }
    } catch {}
    memStorage.set(key, val);
  },
  removeItem: (key: string): void => {
    try {
      if (typeof localStorage !== 'undefined') {
        localStorage.removeItem(key);
        return;
      }
    } catch {}
    memStorage.delete(key);
  },
};

export interface TestValidationError {
  field: string;
  message: string;
  severity: 'error' | 'warning';
  questionNumber?: number;
  passageNumber?: number;
}

export interface TestValidationResult {
  isValid: boolean;
  errors: TestValidationError[];
  warnings: TestValidationError[];
}

export interface VersionSnapshot {
  version: number;
  timestamp: string;
  author: string;
  test: TestEntity;
  passages: PassageEntity[];
  sections: SectionEntity[];
  questions: QuestionEntity[];
}

export interface MediaUsageRecord {
  assetId: string;
  fileName: string;
  references: Array<{
    targetType: 'test' | 'passage' | 'section' | 'writing' | 'speaking';
    targetId: string;
    title: string;
  }>;
}

class ContentStore {
  private tests: Map<string, TestEntity> = new Map();
  private passages: Map<string, PassageEntity> = new Map();
  private sections: Map<string, SectionEntity> = new Map();
  private questions: Map<string, QuestionEntity> = new Map();
  private writingPrompts: Map<string, WritingPromptEntity> = new Map();
  private speakingCards: Map<string, SpeakingCardEntity> = new Map();
  private vocabWords: Map<string, VocabWordEntity> = new Map();
  private grammarLessons: Map<string, GrammarLessonEntity> = new Map();
  private mediaAssets: Map<string, MediaAssetEntity> = new Map();
  private auditLogs: AuditLogEntity[] = [];

  private listeners: Set<() => void> = new Set();
  private isInitialized = false;

  constructor() {
    this.loadFromStorage();
  }

  public subscribe(listener: () => void): () => void {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  private notify() {
    this.saveToStorage();
    this.listeners.forEach((l) => l());
  }

  private saveToStorage() {
    try {
      safeStorage.setItem(KEY_TESTS, JSON.stringify(Array.from(this.tests.values())));
      safeStorage.setItem(KEY_PASSAGES, JSON.stringify(Array.from(this.passages.values())));
      safeStorage.setItem(KEY_SECTIONS, JSON.stringify(Array.from(this.sections.values())));
      safeStorage.setItem(KEY_QUESTIONS, JSON.stringify(Array.from(this.questions.values())));
      safeStorage.setItem(KEY_WRITING, JSON.stringify(Array.from(this.writingPrompts.values())));
      safeStorage.setItem(KEY_SPEAKING, JSON.stringify(Array.from(this.speakingCards.values())));
      safeStorage.setItem(KEY_VOCAB, JSON.stringify(Array.from(this.vocabWords.values())));
      safeStorage.setItem(KEY_GRAMMAR, JSON.stringify(Array.from(this.grammarLessons.values())));
      safeStorage.setItem(KEY_MEDIA, JSON.stringify(Array.from(this.mediaAssets.values())));
      safeStorage.setItem(KEY_AUDIT, JSON.stringify(this.auditLogs.slice(0, 100)));
    } catch (e) {
      console.warn('Storage save error:', e);
    }
  }

  private loadFromStorage() {
    try {
      const getArray = <T>(key: string): T[] => {
        const item = safeStorage.getItem(key);
        return item ? JSON.parse(item) : [];
      };

      const tests = getArray<TestEntity>(KEY_TESTS);
      const passages = getArray<PassageEntity>(KEY_PASSAGES);
      const sections = getArray<SectionEntity>(KEY_SECTIONS);
      const questions = getArray<QuestionEntity>(KEY_QUESTIONS);
      const writing = getArray<WritingPromptEntity>(KEY_WRITING);
      const speaking = getArray<SpeakingCardEntity>(KEY_SPEAKING);
      const vocab = getArray<VocabWordEntity>(KEY_VOCAB);
      const grammar = getArray<GrammarLessonEntity>(KEY_GRAMMAR);
      const media = getArray<MediaAssetEntity>(KEY_MEDIA);
      const audit = getArray<AuditLogEntity>(KEY_AUDIT);

      tests.forEach((t) => this.tests.set(t.id, t));
      passages.forEach((p) => this.passages.set(p.id, p));
      sections.forEach((s) => this.sections.set(s.id, s));
      questions.forEach((q) => this.questions.set(q.id, q));
      writing.forEach((w) => this.writingPrompts.set(w.id, w));
      speaking.forEach((s) => this.speakingCards.set(s.id, s));
      vocab.forEach((v) => this.vocabWords.set(v.id, v));
      grammar.forEach((g) => this.grammarLessons.set(g.id, g));
      media.forEach((m) => this.mediaAssets.set(m.id, m));
      this.auditLogs = audit;

      this.isInitialized = true;
    } catch (e) {
      console.warn('Storage load error:', e);
    }

    // Auto-migrate on initial start if empty
    if (this.tests.size === 0 && !safeStorage.getItem(KEY_MIGRATED)) {
      this.migrateDefaultContent();
    }
  }

  // ====================================================================
  // 1. CONTENT MIGRATION (Preserving IDs from original JSON sources)
  // ====================================================================
  public migrateDefaultContent(onProgress?: (step: string) => void): {
    testsCount: number;
    questionsCount: number;
    writingCount: number;
    speakingCount: number;
    vocabCount: number;
    grammarCount: number;
  } {
    onProgress?.('Migrating Reading tests and passages...');

    // 1. Reading Tests
    ALL_READING_TESTS.forEach((rTest, idx) => {
      const testId = rTest.id || `read-acad-${idx + 1}`;
      const isAcad = (rTest.testType || 'academic') === 'academic';

      const testEntity: TestEntity = {
        id: testId,
        title: rTest.title || `Academic Reading Practice Test ${idx + 1}`,
        type: isAcad ? 'academic' : 'general',
        skill: 'reading',
        status: 'published',
        difficulty: (rTest.difficulty as DifficultyLevel) || 'exam_standard',
        topic: 'Academic Research & History',
        band_level: 7.5,
        version: 1,
        duration_minutes: rTest.timeLimitMinutes || 60,
        total_questions: 40,
        metadata: { wordCount: 2600 },
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };
      this.tests.set(testId, testEntity);

      // Passages & Questions
      if (rTest.passages) {
        rTest.passages.forEach((p, pIdx) => {
          const passageId = `${testId}-p${p.passageNumber || pIdx + 1}`;
          const passageEntity: PassageEntity = {
            id: passageId,
            test_id: testId,
            passage_number: p.passageNumber || pIdx + 1,
            title: p.title || `Reading Passage ${pIdx + 1}`,
            subheading: p.subtitle || null,
            content: p.text || '',
            status: 'published',
            difficulty: 'exam_standard',
            topic: p.title,
            band_level: 7.5,
            version: 1,
            created_at: new Date().toISOString(),
          };
          this.passages.set(passageId, passageEntity);

          if (p.questionGroups) {
            p.questionGroups.forEach((group) => {
              if (group.questions) {
                group.questions.forEach((q) => {
                  const qId = q.id || `${passageId}-q${q.questionNumber}`;
                  const questionEntity: QuestionEntity = {
                    id: qId,
                    test_id: testId,
                    passage_id: passageId,
                    question_number: q.questionNumber,
                    type: (q as any).type || (group as any).questionType || 'multiple-choice',
                    prompt: q.prompt,
                    options: (q as any).options?.map((opt: any, optIdx: number) =>
                      typeof opt === 'string'
                        ? { id: String.fromCharCode(65 + optIdx), text: opt }
                        : opt
                    ) || [],
                    correct_answer: Array.isArray(q.correctAnswer) ? q.correctAnswer.join('/') : String(q.correctAnswer || ''),
                    explanation: q.explanation || null,
                    difficulty: 'exam_standard',
                    status: 'published',
                    version: 1,
                    created_at: new Date().toISOString(),
                  };
                  this.questions.set(qId, questionEntity);
                });
              }
            });
          }
        });
      }
    });

    onProgress?.('Migrating Listening tests and audio sections...');

    // 2. Listening Tests
    ALL_LISTENING_TESTS.forEach((lTest, idx) => {
      const testId = lTest.id || `list-${idx + 1}`;
      const testEntity: TestEntity = {
        id: testId,
        title: lTest.title || `Listening Practice Test ${idx + 1}`,
        type: 'academic',
        skill: 'listening',
        status: 'published',
        difficulty: (lTest.difficulty as DifficultyLevel) || 'exam_standard',
        topic: 'Campus Life & Public Lectures',
        band_level: 7.0,
        version: 1,
        duration_minutes: lTest.timeLimitMinutes || 35,
        total_questions: 40,
        metadata: { sectionsCount: 4 },
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };
      this.tests.set(testId, testEntity);

      if (lTest.sections) {
        lTest.sections.forEach((sec, sIdx) => {
          const sectionId = `${testId}-s${sec.sectionNumber || sIdx + 1}`;
          const sectionEntity: SectionEntity = {
            id: sectionId,
            test_id: testId,
            section_number: sec.sectionNumber || sIdx + 1,
            title: sec.title || `Listening Section ${sIdx + 1}`,
            instructions: (sec as any).contextDescription || null,
            audio_url: `/audio/listening/${testId}-s${sec.sectionNumber}.mp3`,
            duration_seconds: 450,
            status: 'published',
            version: 1,
            created_at: new Date().toISOString(),
          };
          this.sections.set(sectionId, sectionEntity);

          if (sec.questionGroups) {
            sec.questionGroups.forEach((group) => {
              if (group.questions) {
                group.questions.forEach((q) => {
                  const qId = q.id || `${sectionId}-q${q.questionNumber}`;
                  const questionEntity: QuestionEntity = {
                    id: qId,
                    test_id: testId,
                    section_id: sectionId,
                    question_number: q.questionNumber,
                    type: (q as any).type || (group as any).questionType || 'completion',
                    prompt: q.prompt,
                    options: (q as any).options?.map((opt: any, optIdx: number) =>
                      typeof opt === 'string'
                        ? { id: String.fromCharCode(65 + optIdx), text: opt }
                        : opt
                    ) || [],
                    correct_answer: Array.isArray(q.correctAnswer) ? q.correctAnswer.join('/') : String(q.correctAnswer || ''),
                    explanation: q.explanation || null,
                    difficulty: 'exam_standard',
                    status: 'published',
                    version: 1,
                    created_at: new Date().toISOString(),
                  };
                  this.questions.set(qId, questionEntity);
                });
              }
            });
          }
        });
      }
    });

    onProgress?.('Migrating Writing prompts and model essays...');

    // 3. Writing Prompts
    ALL_WRITING_PROMPTS.forEach((p, idx) => {
      const promptId = p.id || `write-p-${idx + 1}`;
      const taskType: TaskType =
        p.taskType === 'task1_academic' || p.taskType === 'task1_general' || p.taskType === 'task2'
          ? (p.taskType as TaskType)
          : 'task2';

      const promptEntity: WritingPromptEntity = {
        id: promptId,
        task_type: taskType,
        title: p.title || `Writing Prompt ${idx + 1}`,
        prompt_text: p.promptText,
        image_url: (p as any).chartData ? JSON.stringify((p as any).chartData) : null,
        min_words: p.minWordCount || 150,
        recommended_minutes: p.recommendedMinutes || 20,
        sample_essay_band9: p.sampleAnswers?.[0]?.text || null,
        status: 'published',
        difficulty: 'exam_standard',
        topic: 'Global Issues & Education',
        band_level: 8.5,
        version: 1,
        created_at: new Date().toISOString(),
      };
      this.writingPrompts.set(promptId, promptEntity);
    });

    onProgress?.('Migrating Speaking cue cards and discussion prompts...');

    // 4. Speaking Cards
    ALL_PART1_TOPICS.forEach((t, idx) => {
      const cardId = t.id || `speak-p1-${idx + 1}`;
      const card: SpeakingCardEntity = {
        id: cardId,
        part: 1,
        topic: t.topic,
        cue_card_title: `Part 1: ${t.topic}`,
        prompts: t.questions.map((q: any) => (typeof q === 'string' ? q : q.question || q.prompt || '')),
        preparation_time_seconds: 0,
        speaking_time_seconds: 60,
        model_answer: 'Sample spoken responses with fluent intonation and linking phrases.',
        status: 'published',
        difficulty: 'intermediate',
        band_level: 7.0,
        version: 1,
        created_at: new Date().toISOString(),
      };
      this.speakingCards.set(cardId, card);
    });

    ALL_PART2_CUE_CARDS.forEach((c: any, idx) => {
      const cardId = c.id || `speak-p2-${idx + 1}`;
      const card: SpeakingCardEntity = {
        id: cardId,
        part: 2,
        topic: c.topic,
        cue_card_title: c.title || c.topic || null,
        prompts: c.prompts || c.bulletPoints || [],
        preparation_time_seconds: c.prepTimeSeconds || 60,
        speaking_time_seconds: c.speakingTimeSeconds || 120,
        model_answer: c.modelAnswer || 'Detailed 2-minute response hitting all 4 cue points.',
        status: 'published',
        difficulty: 'exam_standard',
        band_level: 8.0,
        version: 1,
        created_at: new Date().toISOString(),
      };
      this.speakingCards.set(cardId, card);
    });

    onProgress?.('Migrating Academic Word List & Grammar Lessons...');

    // 5. Vocabulary Words
    ALL_ACADEMIC_WORDS.forEach((w: any) => {
      const wordId = w.id || w.word.toLowerCase();
      const wordEntity: VocabWordEntity = {
        id: wordId,
        word: w.word,
        phonetic: w.phonetic || null,
        part_of_speech: w.partOfSpeech || 'noun',
        definition: w.definition || w.meaning || '',
        urdu_meaning: (w as any).urdu || null,
        collocations: (w as any).collocations || [],
        synonyms: (w as any).synonyms || [],
        antonyms: (w as any).antonyms || [],
        example_sentence: (w as any).example || null,
        academic_band: (w as any).band || 7.5,
        topic: (w as any).topic || 'academic',
        status: 'published',
        version: 1,
        created_at: new Date().toISOString(),
      };
      this.vocabWords.set(wordId, wordEntity);
    });

    // 6. Grammar Lessons
    ALL_GRAMMAR_LESSONS.forEach((g) => {
      const lessonEntity: GrammarLessonEntity = {
        id: g.id,
        title: g.title,
        slug: g.id,
        category: (g as any).focus || 'Academic Grammar',
        summary: (g as any).explanation?.slice(0, 120) || 'IELTS Grammar lesson with interactive exercises',
        content_markdown: (g as any).explanation || 'Lesson content and usage rules...',
        quiz_questions: (g as any).exercises || [],
        status: 'published',
        difficulty: 'intermediate',
        band_level: 7.0,
        version: 1,
        created_at: new Date().toISOString(),
      };
      this.grammarLessons.set(g.id, lessonEntity);
    });

    // Seed Initial Media Assets
    const sampleMedia: MediaAssetEntity[] = [
      {
        id: 'media-audio-01',
        file_name: 'listening-test-01-s1.mp3',
        file_type: 'audio/mpeg',
        file_size_bytes: 4850000,
        storage_path: 'audio/listening-test-01-s1.mp3',
        public_url: '/audio/listening/listening-test-01-s1.mp3',
        created_at: new Date().toISOString(),
      },
      {
        id: 'media-img-01',
        file_name: 'roman-aqueduct-diagram.png',
        file_type: 'image/png',
        file_size_bytes: 1420000,
        storage_path: 'images/roman-aqueduct-diagram.png',
        public_url: '/images/roman-aqueduct-diagram.png',
        created_at: new Date().toISOString(),
      },
    ];
    sampleMedia.forEach((m) => this.mediaAssets.set(m.id, m));

    safeStorage.setItem(KEY_MIGRATED, 'true');
    this.recordAudit('MIGRATE_DEFAULT_CONTENT', 'system', 'all', null, {
      tests: this.tests.size,
      questions: this.questions.size,
      vocab: this.vocabWords.size,
    });

    this.notify();

    return {
      testsCount: this.tests.size,
      questionsCount: this.questions.size,
      writingCount: this.writingPrompts.size,
      speakingCount: this.speakingCards.size,
      vocabCount: this.vocabWords.size,
      grammarCount: this.grammarLessons.size,
    };
  }

  // ====================================================================
  // 2. TESTS & CURRICULUM MANAGEMENT
  // ====================================================================
  public getTests(): TestEntity[] {
    return Array.from(this.tests.values());
  }

  public getPassages(): PassageEntity[] {
    return Array.from(this.passages.values());
  }

  public getSections(): SectionEntity[] {
    return Array.from(this.sections.values());
  }

  public getQuestions(): QuestionEntity[] {
    return Array.from(this.questions.values());
  }

  public getTestById(id: string): TestEntity | undefined {
    return this.tests.get(id);
  }

  public getPassagesForTest(testId: string): PassageEntity[] {
    return Array.from(this.passages.values())
      .filter((p) => p.test_id === testId)
      .sort((a, b) => a.passage_number - b.passage_number);
  }

  public getSectionsForTest(testId: string): SectionEntity[] {
    return Array.from(this.sections.values())
      .filter((s) => s.test_id === testId)
      .sort((a, b) => a.section_number - b.section_number);
  }

  public getQuestionsForTest(testId: string): QuestionEntity[] {
    return Array.from(this.questions.values())
      .filter((q) => q.test_id === testId)
      .sort((a, b) => a.question_number - b.question_number);
  }

  public saveTest(
    test: TestEntity,
    passages: PassageEntity[] = [],
    sections: SectionEntity[] = [],
    questions: QuestionEntity[] = []
  ): void {
    const prev = this.tests.get(test.id);
    const isNew = !prev;

    // Snapshot version before overwriting if existing
    if (!isNew) {
      this.saveVersionSnapshot(test.id, 'admin');
      test.version = (prev.version || 1) + 1;
    }

    test.updated_at = new Date().toISOString();
    this.tests.set(test.id, test);

    // Update Passages
    passages.forEach((p) => {
      p.test_id = test.id;
      this.passages.set(p.id, p);
    });

    // Update Sections
    sections.forEach((s) => {
      s.test_id = test.id;
      this.sections.set(s.id, s);
    });

    // Update Questions
    questions.forEach((q) => {
      q.test_id = test.id;
      this.questions.set(q.id, q);
    });

    this.recordAudit(
      isNew ? 'CREATE_TEST' : 'UPDATE_TEST',
      'test',
      test.id,
      prev,
      { title: test.title, status: test.status, totalQuestions: questions.length }
    );

    this.notify();
  }

  public deleteTest(testId: string, softDelete = true): void {
    const prev = this.tests.get(testId);
    if (!prev) return;

    if (softDelete) {
      prev.status = 'archived';
      prev.updated_at = new Date().toISOString();
      this.tests.set(testId, prev);
      this.recordAudit('ARCHIVE_TEST', 'test', testId, { status: prev.status }, { status: 'archived' });
    } else {
      this.tests.delete(testId);
      // Clean up linked passages, sections, questions
      Array.from(this.passages.values()).forEach((p) => {
        if (p.test_id === testId) this.passages.delete(p.id);
      });
      Array.from(this.sections.values()).forEach((s) => {
        if (s.test_id === testId) this.sections.delete(s.id);
      });
      Array.from(this.questions.values()).forEach((q) => {
        if (q.test_id === testId) this.questions.delete(q.id);
      });
      this.recordAudit('DELETE_TEST_PERMANENT', 'test', testId, prev, null);
    }

    this.notify();
  }

  public bulkUpdateTestStatus(testIds: string[], status: ContentStatus): void {
    testIds.forEach((id) => {
      const t = this.tests.get(id);
      if (t) {
        const prevStatus = t.status;
        t.status = status;
        t.updated_at = new Date().toISOString();
        this.tests.set(id, t);
        this.recordAudit('UPDATE_TEST_STATUS', 'test', id, { status: prevStatus }, { status });
      }
    });
    this.notify();
  }

  // ====================================================================
  // 3. VALIDATION ENGINE (Blocks Publishing with Actionable Errors)
  // ====================================================================
  public validateTest(
    test: Partial<TestEntity>,
    passages: PassageEntity[] = [],
    sections: SectionEntity[] = [],
    questions: QuestionEntity[] = []
  ): TestValidationResult {
    const errors: TestValidationError[] = [];
    const warnings: TestValidationError[] = [];

    if (!test.title?.trim()) {
      errors.push({ field: 'title', message: 'Test title is required.', severity: 'error' });
    }

    // Reading passage validation
    if (test.skill === 'reading') {
      if (passages.length === 0) {
        errors.push({ field: 'passages', message: 'At least one reading passage is required.', severity: 'error' });
      }
      passages.forEach((p, idx) => {
        if (!p.title?.trim()) {
          errors.push({
            field: `passage_${idx + 1}_title`,
            message: `Passage ${idx + 1} has no title.`,
            severity: 'error',
            passageNumber: idx + 1,
          });
        }
        if (!p.content?.trim() || p.content.trim().length < 50) {
          errors.push({
            field: `passage_${idx + 1}_content`,
            message: `Passage ${idx + 1} stimulus text is missing or shorter than 50 characters.`,
            severity: 'error',
            passageNumber: idx + 1,
          });
        }
      });
    }

    // Listening section validation
    if (test.skill === 'listening') {
      if (sections.length === 0) {
        errors.push({ field: 'sections', message: 'At least one listening section is required.', severity: 'error' });
      }
      sections.forEach((s, idx) => {
        if (!s.audio_url && !s.instructions) {
          warnings.push({
            field: `section_${idx + 1}_audio`,
            message: `Section ${idx + 1} has no audio URL or transcript assigned.`,
            severity: 'warning',
          });
        }
      });
    }

    // Question validations
    if (questions.length === 0) {
      errors.push({ field: 'questions', message: 'Test must contain at least one question.', severity: 'error' });
    }

    const seenNumbers = new Set<number>();
    const fullTextContent = passages.map((p) => p.content.toLowerCase()).join(' ');

    questions.forEach((q, idx) => {
      // Duplicate question numbers
      if (seenNumbers.has(q.question_number)) {
        errors.push({
          field: `question_${q.question_number}_duplicate`,
          message: `Duplicate question number #${q.question_number}. Question numbers must be unique.`,
          severity: 'error',
          questionNumber: q.question_number,
        });
      } else {
        seenNumbers.add(q.question_number);
      }

      // Missing prompt
      if (!q.prompt?.trim()) {
        errors.push({
          field: `question_${q.question_number}_prompt`,
          message: `Question #${q.question_number} is missing a question prompt text.`,
          severity: 'error',
          questionNumber: q.question_number,
        });
      }

      // Missing correct answer
      if (!q.correct_answer || !String(q.correct_answer).trim()) {
        errors.push({
          field: `question_${q.question_number}_answer`,
          message: `Question #${q.question_number} has no correct answer key assigned.`,
          severity: 'error',
          questionNumber: q.question_number,
        });
      }

      // Answer not found in passage check (for completion / short-answer)
      if (
        test.skill === 'reading' &&
        fullTextContent &&
        (q.type === 'completion' || q.type === 'short-answer') &&
        q.correct_answer
      ) {
        const cleanAns = String(q.correct_answer).toLowerCase().trim();
        // Skip if answer is numeric or contains punctuation alternatives
        if (cleanAns.length > 2 && !cleanAns.includes('/') && !fullTextContent.includes(cleanAns)) {
          warnings.push({
            field: `question_${q.question_number}_verbatim`,
            message: `Answer "${q.correct_answer}" for Question #${q.question_number} was not found verbatim in any passage text. Verify exact spelling.`,
            severity: 'warning',
            questionNumber: q.question_number,
          });
        }
      }
    });

    // Check expected question count
    const targetCount = test.total_questions || 40;
    if (questions.length !== targetCount) {
      warnings.push({
        field: 'total_questions_count',
        message: `Current question count (${questions.length}) does not match target (${targetCount}). Standard IELTS mock exams contain 40 questions.`,
        severity: 'warning',
      });
    }

    return {
      isValid: errors.length === 0,
      errors,
      warnings,
    };
  }

  // ====================================================================
  // 4. DRAFT AUTO-SAVE & VERSION HISTORY WITH RESTORE
  // ====================================================================
  public saveDraft(testId: string, data: any): void {
    try {
      const draftsRaw = safeStorage.getItem(KEY_DRAFTS);
      const drafts = draftsRaw ? JSON.parse(draftsRaw) : {};
      drafts[testId] = {
        data,
        updatedAt: new Date().toISOString(),
      };
      safeStorage.setItem(KEY_DRAFTS, JSON.stringify(drafts));
    } catch (e) {
      console.warn('Draft save error:', e);
    }
  }

  public getDraft(testId: string): any | null {
    try {
      const draftsRaw = safeStorage.getItem(KEY_DRAFTS);
      if (!draftsRaw) return null;
      const drafts = JSON.parse(draftsRaw);
      return drafts[testId]?.data || null;
    } catch {
      return null;
    }
  }

  public clearDraft(testId: string): void {
    try {
      const draftsRaw = safeStorage.getItem(KEY_DRAFTS);
      if (!draftsRaw) return;
      const drafts = JSON.parse(draftsRaw);
      delete drafts[testId];
      safeStorage.setItem(KEY_DRAFTS, JSON.stringify(drafts));
    } catch {}
  }

  public saveVersionSnapshot(testId: string, author = 'admin'): void {
    const test = this.tests.get(testId);
    if (!test) return;

    const passages = this.getPassagesForTest(testId);
    const sections = this.getSectionsForTest(testId);
    const questions = this.getQuestionsForTest(testId);

    const snapshot: VersionSnapshot = {
      version: test.version || 1,
      timestamp: new Date().toISOString(),
      author,
      test: { ...test },
      passages: passages.map((p) => ({ ...p })),
      sections: sections.map((s) => ({ ...s })),
      questions: questions.map((q) => ({ ...q })),
    };

    try {
      const versionsRaw = safeStorage.getItem(KEY_VERSIONS);
      const versions = versionsRaw ? JSON.parse(versionsRaw) : {};
      if (!versions[testId]) versions[testId] = [];
      versions[testId].unshift(snapshot);
      // Keep last 10 versions
      if (versions[testId].length > 10) versions[testId] = versions[testId].slice(0, 10);
      safeStorage.setItem(KEY_VERSIONS, JSON.stringify(versions));
    } catch (e) {
      console.warn('Version snapshot save error:', e);
    }
  }

  public getVersionSnapshots(testId: string): VersionSnapshot[] {
    try {
      const versionsRaw = safeStorage.getItem(KEY_VERSIONS);
      if (!versionsRaw) return [];
      const versions = JSON.parse(versionsRaw);
      return versions[testId] || [];
    } catch {
      return [];
    }
  }

  public restoreVersion(testId: string, versionNumber: number): boolean {
    const snapshots = this.getVersionSnapshots(testId);
    const match = snapshots.find((s) => s.version === versionNumber);
    if (!match) return false;

    // Save current as a snapshot before restoring
    this.saveVersionSnapshot(testId, 'restore_backup');

    const restoredTest = {
      ...match.test,
      version: (match.test.version || 1) + 1,
      updated_at: new Date().toISOString(),
    };

    this.tests.set(testId, restoredTest);

    // Overwrite passages & questions
    match.passages.forEach((p) => this.passages.set(p.id, p));
    match.sections.forEach((s) => this.sections.set(s.id, s));
    match.questions.forEach((q) => this.questions.set(q.id, q));

    this.recordAudit('RESTORE_VERSION', 'test', testId, null, {
      restoredFromVersion: versionNumber,
      newVersion: restoredTest.version,
    });

    this.notify();
    return true;
  }

  // ====================================================================
  // 5. WRITING PROMPTS CRUD
  // ====================================================================
  public getWritingPrompts(): WritingPromptEntity[] {
    return Array.from(this.writingPrompts.values());
  }

  public saveWritingPrompt(prompt: WritingPromptEntity): void {
    const prev = this.writingPrompts.get(prompt.id);
    this.writingPrompts.set(prompt.id, prompt);
    this.recordAudit(prev ? 'UPDATE_WRITING' : 'CREATE_WRITING', 'writing_prompt', prompt.id, prev, prompt);
    this.notify();
  }

  public deleteWritingPrompt(id: string): void {
    const prev = this.writingPrompts.get(id);
    this.writingPrompts.delete(id);
    this.recordAudit('DELETE_WRITING', 'writing_prompt', id, prev, null);
    this.notify();
  }

  // ====================================================================
  // 6. SPEAKING CARDS CRUD
  // ====================================================================
  public getSpeakingCards(): SpeakingCardEntity[] {
    return Array.from(this.speakingCards.values());
  }

  public saveSpeakingCard(card: SpeakingCardEntity): void {
    const prev = this.speakingCards.get(card.id);
    this.speakingCards.set(card.id, card);
    this.recordAudit(prev ? 'UPDATE_SPEAKING' : 'CREATE_SPEAKING', 'speaking_card', card.id, prev, card);
    this.notify();
  }

  public deleteSpeakingCard(id: string): void {
    const prev = this.speakingCards.get(id);
    this.speakingCards.delete(id);
    this.recordAudit('DELETE_SPEAKING', 'speaking_card', id, prev, null);
    this.notify();
  }

  // ====================================================================
  // 7. VOCABULARY CRUD, CSV IMPORT WITH VALIDATION & EXPORT
  // ====================================================================
  public getVocabWords(): VocabWordEntity[] {
    return Array.from(this.vocabWords.values());
  }

  public saveVocabWord(word: VocabWordEntity): void {
    const prev = this.vocabWords.get(word.id);
    this.vocabWords.set(word.id, word);
    this.recordAudit(prev ? 'UPDATE_VOCAB' : 'CREATE_VOCAB', 'vocab_word', word.id, prev, word);
    this.notify();
  }

  public deleteVocabWord(id: string): void {
    const prev = this.vocabWords.get(id);
    this.vocabWords.delete(id);
    this.recordAudit('DELETE_VOCAB', 'vocab_word', id, prev, null);
    this.notify();
  }

  public validateVocabCsv(csvText: string): {
    validRows: VocabWordEntity[];
    errorRows: Array<{ line: number; error: string; raw: string }>;
  } {
    const lines = csvText.split(/\r?\n/).filter((l) => l.trim().length > 0);
    const validRows: VocabWordEntity[] = [];
    const errorRows: Array<{ line: number; error: string; raw: string }> = [];

    if (lines.length === 0) return { validRows, errorRows };

    // Check header
    const headerLine = lines[0].toLowerCase();
    const isHeader = headerLine.includes('word') && headerLine.includes('definition');
    const dataLines = isHeader ? lines.slice(1) : lines;

    const parseCsvLine = (line: string): string[] => {
      const result: string[] = [];
      let current = '';
      let inQuotes = false;
      for (let i = 0; i < line.length; i++) {
        const char = line[i];
        if (char === '"') {
          inQuotes = !inQuotes;
        } else if (char === ',' && !inQuotes) {
          result.push(current.trim().replace(/^"|"$/g, ''));
          current = '';
        } else {
          current += char;
        }
      }
      result.push(current.trim().replace(/^"|"$/g, ''));
      return result;
    };

    dataLines.forEach((line, idx) => {
      const lineNum = isHeader ? idx + 2 : idx + 1;
      const cleanParts = parseCsvLine(line);

      const [word, phonetic, pos, definition, urdu, band, topic] = cleanParts;

      if (!word || !word.trim()) {
        errorRows.push({ line: lineNum, error: 'Word column is empty.', raw: line });
        return;
      }
      if (!definition || !definition.trim()) {
        errorRows.push({ line: lineNum, error: 'Definition is required.', raw: line });
        return;
      }

      const wordEntity: VocabWordEntity = {
        id: `vw-${word.toLowerCase().replace(/[^a-z0-9]/g, '-')}`,
        word: word.trim(),
        phonetic: phonetic || null,
        part_of_speech: pos || 'noun',
        definition: definition.trim(),
        urdu_meaning: urdu || null,
        collocations: [],
        synonyms: [],
        antonyms: [],
        example_sentence: null,
        academic_band: Number(band) || 7.5,
        topic: topic || 'academic',
        status: 'published',
        version: 1,
        created_at: new Date().toISOString(),
      };

      validRows.push(wordEntity);
    });

    return { validRows, errorRows };
  }

  public importVocabRows(rows: VocabWordEntity[]): number {
    rows.forEach((w) => {
      this.vocabWords.set(w.id, w);
    });
    this.recordAudit('BULK_IMPORT_VOCAB_CSV', 'vocab', 'multiple', null, { importedCount: rows.length });
    this.notify();
    return rows.length;
  }

  public exportVocabCsv(): string {
    const headers = ['Word', 'Phonetic', 'Part of Speech', 'Definition', 'Urdu Meaning', 'Band', 'Topic'];
    const rows = Array.from(this.vocabWords.values()).map((w) => [
      w.word,
      w.phonetic || '',
      w.part_of_speech || '',
      `"${(w.definition || '').replace(/"/g, '""')}"`,
      `"${(w.urdu_meaning || '').replace(/"/g, '""')}"`,
      w.academic_band,
      w.topic || 'general',
    ]);

    return [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
  }

  // ====================================================================
  // 8. GRAMMAR LESSONS CRUD
  // ====================================================================
  public getGrammarLessons(): GrammarLessonEntity[] {
    return Array.from(this.grammarLessons.values());
  }

  public saveGrammarLesson(lesson: GrammarLessonEntity): void {
    const prev = this.grammarLessons.get(lesson.id);
    this.grammarLessons.set(lesson.id, lesson);
    this.recordAudit(prev ? 'UPDATE_GRAMMAR' : 'CREATE_GRAMMAR', 'grammar_lesson', lesson.id, prev, lesson);
    this.notify();
  }

  public deleteGrammarLesson(id: string): void {
    const prev = this.grammarLessons.get(id);
    this.grammarLessons.delete(id);
    this.recordAudit('DELETE_GRAMMAR', 'grammar_lesson', id, prev, null);
    this.notify();
  }

  // ====================================================================
  // 9. MEDIA LIBRARY WITH USAGE TRACKING & DELETE PROTECTION
  // ====================================================================
  public getMediaAssets(): MediaAssetEntity[] {
    return Array.from(this.mediaAssets.values());
  }

  public uploadMediaAsset(file: File): MediaAssetEntity {
    const assetId = `med-${Date.now().toString().slice(-6)}`;
    const storagePath = `${file.type.startsWith('audio') ? 'audio' : 'images'}/${file.name}`;
    const publicUrl = URL.createObjectURL(file);

    const asset: MediaAssetEntity = {
      id: assetId,
      file_name: file.name,
      file_type: file.type,
      file_size_bytes: file.size,
      storage_path: storagePath,
      public_url: publicUrl,
      created_at: new Date().toISOString(),
    };

    this.mediaAssets.set(assetId, asset);
    this.recordAudit('UPLOAD_MEDIA', 'media_asset', assetId, null, { fileName: file.name, size: file.size });
    this.notify();
    return asset;
  }

  public getMediaUsage(assetId: string): MediaUsageRecord {
    const asset = this.mediaAssets.get(assetId);
    const fileName = asset?.file_name || '';
    const references: MediaUsageRecord['references'] = [];

    if (!fileName) return { assetId, fileName, references };

    // Search Sections
    Array.from(this.sections.values()).forEach((s) => {
      if (s.audio_url && s.audio_url.includes(fileName)) {
        const test = this.tests.get(s.test_id);
        references.push({
          targetType: 'section',
          targetId: s.id,
          title: `${test?.title || 'Listening Test'} (Section ${s.section_number})`,
        });
      }
    });

    // Search Passages & Prompts for image references
    Array.from(this.passages.values()).forEach((p) => {
      if (p.content && p.content.includes(fileName)) {
        const test = this.tests.get(p.test_id);
        references.push({
          targetType: 'passage',
          targetId: p.id,
          title: `${test?.title || 'Reading Test'} (Passage ${p.passage_number})`,
        });
      }
    });

    Array.from(this.writingPrompts.values()).forEach((w) => {
      if (w.image_url && w.image_url.includes(fileName)) {
        references.push({
          targetType: 'writing',
          targetId: w.id,
          title: w.title,
        });
      }
    });

    return { assetId, fileName, references };
  }

  public deleteMediaAsset(assetId: string): { success: boolean; error?: string } {
    const usage = this.getMediaUsage(assetId);
    if (usage.references.length > 0) {
      const names = usage.references.map((r) => r.title).join(', ');
      return {
        success: false,
        error: `Cannot delete: This file is currently linked in ${usage.references.length} place(s): ${names}. Remove references before deleting.`,
      };
    }

    const prev = this.mediaAssets.get(assetId);
    this.mediaAssets.delete(assetId);
    this.recordAudit('DELETE_MEDIA', 'media_asset', assetId, prev, null);
    this.notify();
    return { success: true };
  }

  // ====================================================================
  // 10. DRY-RUN IMPORT & FULL CONTENT EXPORT
  // ====================================================================
  public dryRunImport(jsonString: string): {
    isValid: boolean;
    testsCount: number;
    writingCount: number;
    vocabCount: number;
    grammarCount: number;
    errors: string[];
  } {
    const errors: string[] = [];
    let testsCount = 0;
    let writingCount = 0;
    let vocabCount = 0;
    let grammarCount = 0;

    try {
      const parsed = JSON.parse(jsonString);

      if (parsed.tests && Array.isArray(parsed.tests)) {
        testsCount = parsed.tests.length;
        parsed.tests.forEach((t: any, idx: number) => {
          if (!t.id || !t.title) errors.push(`Test at index ${idx} is missing mandatory 'id' or 'title'.`);
        });
      }

      if (parsed.writing && Array.isArray(parsed.writing)) {
        writingCount = parsed.writing.length;
      }

      if (parsed.vocab && Array.isArray(parsed.vocab)) {
        vocabCount = parsed.vocab.length;
        parsed.vocab.forEach((v: any, idx: number) => {
          if (!v.word || !v.definition) errors.push(`Vocab entry at index ${idx} missing word/definition.`);
        });
      }

      if (parsed.grammar && Array.isArray(parsed.grammar)) {
        grammarCount = parsed.grammar.length;
      }

      if (!testsCount && !writingCount && !vocabCount && !grammarCount) {
        errors.push('No recognized content entity arrays found (tests, writing, vocab, grammar).');
      }
    } catch (e: any) {
      errors.push(`JSON Syntax Error: ${e.message}`);
    }

    return {
      isValid: errors.length === 0,
      testsCount,
      writingCount,
      vocabCount,
      grammarCount,
      errors,
    };
  }

  public commitImport(jsonString: string): boolean {
    const dryRun = this.dryRunImport(jsonString);
    if (!dryRun.isValid) return false;

    try {
      const parsed = JSON.parse(jsonString);

      if (parsed.tests) parsed.tests.forEach((t: TestEntity) => this.tests.set(t.id, t));
      if (parsed.passages) parsed.passages.forEach((p: PassageEntity) => this.passages.set(p.id, p));
      if (parsed.sections) parsed.sections.forEach((s: SectionEntity) => this.sections.set(s.id, s));
      if (parsed.questions) parsed.questions.forEach((q: QuestionEntity) => this.questions.set(q.id, q));
      if (parsed.writing) parsed.writing.forEach((w: WritingPromptEntity) => this.writingPrompts.set(w.id, w));
      if (parsed.speaking) parsed.speaking.forEach((s: SpeakingCardEntity) => this.speakingCards.set(s.id, s));
      if (parsed.vocab) parsed.vocab.forEach((v: VocabWordEntity) => this.vocabWords.set(v.id, v));
      if (parsed.grammar) parsed.grammar.forEach((g: GrammarLessonEntity) => this.grammarLessons.set(g.id, g));

      this.recordAudit('COMMIT_FULL_IMPORT', 'system', 'all', null, {
        tests: dryRun.testsCount,
        vocab: dryRun.vocabCount,
      });

      this.notify();
      return true;
    } catch {
      return false;
    }
  }

  public exportAllContent(): string {
    const bundle = {
      exportVersion: '1.0',
      exportedAt: new Date().toISOString(),
      tests: Array.from(this.tests.values()),
      passages: Array.from(this.passages.values()),
      sections: Array.from(this.sections.values()),
      questions: Array.from(this.questions.values()),
      writing: Array.from(this.writingPrompts.values()),
      speaking: Array.from(this.speakingCards.values()),
      vocab: Array.from(this.vocabWords.values()),
      grammar: Array.from(this.grammarLessons.values()),
      media: Array.from(this.mediaAssets.values()),
    };

    return JSON.stringify(bundle, null, 2);
  }

  // ====================================================================
  // 11. AUDIT LOGGING
  // ====================================================================
  public getAuditLogs(): AuditLogEntity[] {
    return [...this.auditLogs];
  }

  public recordAudit(
    action: string,
    targetType: string,
    targetId: string,
    previousState: any,
    newState: any
  ): void {
    let userEmail = 'admin@zarii.com';
    try {
      if (typeof sessionStorage !== 'undefined') {
        const raw = sessionStorage.getItem('zarii_admin_session');
        if (raw) userEmail = JSON.parse(raw).email || userEmail;
      }
    } catch {}

    const log: AuditLogEntity = {
      id: `aud-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      actor_id: userEmail,
      action,
      target_type: targetType,
      target_id: targetId,
      previous_state: previousState ? (typeof previousState === 'object' ? previousState : { value: previousState }) : null,
      new_state: newState ? (typeof newState === 'object' ? newState : { value: newState }) : null,
      created_at: new Date().toISOString(),
    };

    this.auditLogs.unshift(log);
    if (this.auditLogs.length > 200) this.auditLogs.pop();
  }
}

export const contentStore = new ContentStore();
