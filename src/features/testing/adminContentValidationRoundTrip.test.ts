import { describe, it, expect, beforeEach } from 'vitest';
import { contentStore } from '../../shared/content/contentStore';
import type { TestEntity, QuestionEntity, PassageEntity } from '../../shared/types/database';

describe('ADMIN QA: Content Validation & Full Import/Export Round-Trip', () => {
  beforeEach(() => {
    // Reset store data to default migration content
    contentStore.migrateDefaultContent();
  });

  describe('1. Content Validation Engine (Pre-publish Quality Gates)', () => {
    it('blocks publishing when questions are missing answer keys', () => {
      const draftTest: TestEntity = {
        id: 'val-test-1',
        title: 'Validation Reading Test',
        skill: 'reading',
        type: 'academic',
        difficulty: 'exam_standard',
        duration_minutes: 60,
        status: 'draft',
        total_questions: 2,
        version: 1,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };

      const brokenQuestions: QuestionEntity[] = [
        {
          id: 'q-1',
          test_id: 'val-test-1',
          question_number: 1,
          type: 'true_false_not_given',
          prompt: 'The author advocates for wind energy.',
          options: [],
          correct_answer: 'TRUE',
          difficulty: 'exam_standard',
          status: 'draft',
          version: 1,
          created_at: new Date().toISOString(),
        },
        {
          id: 'q-2',
          test_id: 'val-test-1',
          question_number: 2,
          type: 'completion',
          prompt: 'The primary mineral found was [blank].',
          options: [],
          correct_answer: '', // MISSING ANSWER KEY!
          difficulty: 'exam_standard',
          status: 'draft',
          version: 1,
          created_at: new Date().toISOString(),
        },
      ];

      const validation = contentStore.validateTest(draftTest, [], [], brokenQuestions);
      expect(validation.isValid).toBe(false);
      expect(validation.errors.some((e) => e.field === 'question_2_answer')).toBe(true);
      expect(validation.errors.some((e) => e.message.includes('has no correct answer key assigned'))).toBe(true);
    });

    it('blocks publishing on duplicate question numbers', () => {
      const draftTest: TestEntity = {
        id: 'val-test-2',
        title: 'Duplicate Q Number Test',
        skill: 'reading',
        type: 'academic',
        difficulty: 'exam_standard',
        duration_minutes: 60,
        status: 'draft',
        total_questions: 2,
        version: 1,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };

      const dupQuestions: QuestionEntity[] = [
        {
          id: 'q-a',
          test_id: 'val-test-2',
          question_number: 1,
          type: 'multiple_choice',
          prompt: 'What is X?',
          options: [{ id: 'A', text: 'Opt A' }],
          correct_answer: 'A',
          difficulty: 'exam_standard',
          status: 'draft',
          version: 1,
          created_at: new Date().toISOString(),
        },
        {
          id: 'q-b',
          test_id: 'val-test-2',
          question_number: 1, // DUPLICATE QUESTION 1!
          type: 'multiple_choice',
          prompt: 'What is Y?',
          options: [{ id: 'B', text: 'Opt B' }],
          correct_answer: 'B',
          difficulty: 'exam_standard',
          status: 'draft',
          version: 1,
          created_at: new Date().toISOString(),
        },
      ];

      const validation = contentStore.validateTest(draftTest, [], [], dupQuestions);
      expect(validation.isValid).toBe(false);
      expect(validation.errors.some((e) => e.message.includes('Duplicate question number #1'))).toBe(true);
    });

    it('flags warnings when question count deviates from official IELTS 40 questions', () => {
      const draftTest: TestEntity = {
        id: 'val-test-3',
        title: 'Short Mock',
        skill: 'reading',
        type: 'academic',
        difficulty: 'exam_standard',
        duration_minutes: 60,
        status: 'draft',
        total_questions: 40,
        version: 1,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };

      const questions: QuestionEntity[] = [
        {
          id: 'q-only',
          test_id: 'val-test-3',
          question_number: 1,
          type: 'multiple_choice',
          prompt: 'Sample Q',
          options: [{ id: 'A', text: 'Option A' }],
          correct_answer: 'A',
          difficulty: 'exam_standard',
          status: 'draft',
          version: 1,
          created_at: new Date().toISOString(),
        },
      ];

      const validation = contentStore.validateTest(draftTest, [], [], questions);
      expect(validation.warnings.some((w) => w.field === 'total_questions_count')).toBe(true);
    });
  });

  describe('2. Import / Export Full Round-Trip Data Integrity', () => {
    it('successfully serializes and deserializes the full content ecosystem without data loss', () => {
      // 1. Export current dataset
      const exportJsonString = contentStore.exportAllContent();
      expect(typeof exportJsonString).toBe('string');
      expect(exportJsonString.length).toBeGreaterThan(500);

      const parsedExport = JSON.parse(exportJsonString);
      expect(parsedExport.exportVersion).toBeDefined();
      expect(parsedExport.exportedAt).toBeDefined();
      expect(Array.isArray(parsedExport.tests)).toBe(true);
      expect(Array.isArray(parsedExport.vocab)).toBe(true);
      expect(Array.isArray(parsedExport.grammar)).toBe(true);
      expect(Array.isArray(parsedExport.writing)).toBe(true);

      const initialTestCount = parsedExport.tests.length;
      const initialVocabCount = parsedExport.vocab.length;
      expect(initialTestCount).toBeGreaterThan(0);
      expect(initialVocabCount).toBeGreaterThan(0);

      // 2. Dry run import check
      const dryRun = contentStore.dryRunImport(exportJsonString);
      expect(dryRun.isValid).toBe(true);
      expect(dryRun.testsCount).toBe(initialTestCount);
      expect(dryRun.vocabCount).toBe(initialVocabCount);

      // 3. Commit import
      const commitOk = contentStore.commitImport(exportJsonString);
      expect(commitOk).toBe(true);

      // 4. Verify state retention
      const currentTests = contentStore.getTests();
      expect(currentTests.length).toBe(initialTestCount);

      const currentVocab = contentStore.getVocabWords();
      expect(currentVocab.length).toBe(initialVocabCount);

      const sampleTest = currentTests[0];
      expect(sampleTest.id).toBeDefined();
      expect(sampleTest.title).toBeDefined();
      expect(sampleTest.status).toBeDefined();
    });

    it('rejects malformed or invalid JSON payloads gracefully during import', () => {
      const dryRun = contentStore.dryRunImport('invalid non-json text');
      expect(dryRun.isValid).toBe(false);
      expect(dryRun.errors.length).toBeGreaterThan(0);

      const commitResult = contentStore.commitImport('invalid non-json text');
      expect(commitResult).toBe(false);
    });

    it('validates CSV vocabulary import formats correctly', () => {
      const validCsv = `Word,Phonetic,Part of Speech,Definition,Urdu Meaning,Band,Topic
Resilient,/rɪˈzɪl.jənt/,adjective,Able to recover quickly,مضبوط,7.5,Psychology
Mitigate,/ˈmɪt.ɪ.ɡeɪt/,verb,Make less severe or serious,کم کرنا,8.0,Environment`;

      const validation = contentStore.validateVocabCsv(validCsv);
      expect(validation.errorRows.length).toBe(0);
      expect(validation.validRows.length).toBe(2);
      expect(validation.validRows[0].word).toBe('Resilient');
      expect(validation.validRows[1].word).toBe('Mitigate');
    });
  });
});
