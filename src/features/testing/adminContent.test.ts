import { describe, it, expect, beforeEach } from 'vitest';
import { contentStore } from '../../shared/content/contentStore';
import type {
  TestEntity,
  PassageEntity,
  SectionEntity,
  QuestionEntity,
} from '../../shared/types/database';

describe('ADMIN 3: Content Management System & Migration Engine', () => {
  beforeEach(() => {
    // Reset / ensure initial state
    contentStore.migrateDefaultContent();
  });

  describe('1. Content Migration & ID Preservation', () => {
    it('migrates Reading and Listening tests while strictly preserving their IDs', () => {
      const tests = contentStore.getTests();
      expect(tests.length).toBeGreaterThan(0);

      // Verify IDs exist and match canonical conventions
      const readingTests = tests.filter((t) => t.skill === 'reading');
      expect(readingTests.length).toBeGreaterThanOrEqual(10);
      expect(readingTests.some((t) => t.id === 'acad-reading-01' || t.id.startsWith('acad-') || t.id.startsWith('read-'))).toBe(true);

      const listeningTests = tests.filter((t) => t.skill === 'listening');
      expect(listeningTests.length).toBeGreaterThanOrEqual(10);
      expect(listeningTests.some((t) => t.id === 'list-test-01' || t.id.startsWith('list-'))).toBe(true);
    });

    it('migrates Writing prompts, Speaking cards, Vocab words, and Grammar lessons', () => {
      const writing = contentStore.getWritingPrompts();
      expect(writing.length).toBeGreaterThan(0);
      expect(writing.some((w) => w.task_type === 'task2')).toBe(true);

      const speaking = contentStore.getSpeakingCards();
      expect(speaking.length).toBeGreaterThan(0);
      expect(speaking.some((s) => s.part === 2)).toBe(true);

      const vocab = contentStore.getVocabWords();
      expect(vocab.length).toBeGreaterThan(10);

      const grammar = contentStore.getGrammarLessons();
      expect(grammar.length).toBeGreaterThan(0);
    });
  });

  describe('2. Test Validation Engine & Publish Blocking', () => {
    it('flags missing titles, empty passages, and missing question answer keys', () => {
      const invalidTest: Partial<TestEntity> = {
        title: '',
        skill: 'reading',
      };
      const invalidPassages: PassageEntity[] = [
        {
          id: 'p1',
          test_id: 'test-1',
          passage_number: 1,
          title: '',
          content: 'Too short',
          status: 'draft',
          difficulty: 'exam_standard',
          version: 1,
          created_at: new Date().toISOString(),
        },
      ];
      const invalidQuestions: QuestionEntity[] = [
        {
          id: 'q1',
          test_id: 'test-1',
          question_number: 1,
          type: 'multiple-choice',
          prompt: '',
          options: [],
          correct_answer: '',
          difficulty: 'exam_standard',
          status: 'draft',
          version: 1,
          created_at: new Date().toISOString(),
        },
      ];

      const result = contentStore.validateTest(invalidTest, invalidPassages, [], invalidQuestions);
      expect(result.isValid).toBe(false);
      expect(result.errors.length).toBeGreaterThanOrEqual(3);

      const errorFields = result.errors.map((e) => e.field);
      expect(errorFields).toContain('title');
      expect(errorFields).toContain('passage_1_title');
      expect(errorFields).toContain('question_1_prompt');
      expect(errorFields).toContain('question_1_answer');
    });

    it('detects duplicate question numbers', () => {
      const test: Partial<TestEntity> = {
        title: 'Cambridge Academic 19 Reading Test 1',
        skill: 'reading',
        total_questions: 2,
      };
      const passages: PassageEntity[] = [
        {
          id: 'p1',
          test_id: 't-1',
          passage_number: 1,
          title: 'Passage Title 1',
          content: 'This is a sufficiently long passage text with more than fifty characters to pass minimal length checks.',
          status: 'draft',
          difficulty: 'exam_standard',
          version: 1,
          created_at: new Date().toISOString(),
        },
      ];
      const duplicateQuestions: QuestionEntity[] = [
        {
          id: 'q1',
          test_id: 't-1',
          question_number: 1,
          type: 'true-false-not-given',
          prompt: 'First statement',
          options: [],
          correct_answer: 'TRUE',
          difficulty: 'exam_standard',
          status: 'draft',
          version: 1,
          created_at: new Date().toISOString(),
        },
        {
          id: 'q2',
          test_id: 't-1',
          question_number: 1, // DUPLICATE #1
          type: 'true-false-not-given',
          prompt: 'Second statement with duplicate number',
          options: [],
          correct_answer: 'FALSE',
          difficulty: 'exam_standard',
          status: 'draft',
          version: 1,
          created_at: new Date().toISOString(),
        },
      ];

      const result = contentStore.validateTest(test, passages, [], duplicateQuestions);
      expect(result.isValid).toBe(false);
      expect(result.errors.some((e) => e.field.includes('duplicate'))).toBe(true);
    });

    it('passes validation when all fields, stimulus passages, and questions are valid', () => {
      const validTest: Partial<TestEntity> = {
        title: 'Cambridge Academic 19 Reading Test 1',
        skill: 'reading',
        total_questions: 1,
      };
      const validPassages: PassageEntity[] = [
        {
          id: 'p1',
          test_id: 't-1',
          passage_number: 1,
          title: 'The Roman Aqueduct System',
          content: 'Roman aqueducts relied entirely on gravity flow to transport freshwater across provinces.',
          status: 'draft',
          difficulty: 'exam_standard',
          version: 1,
          created_at: new Date().toISOString(),
        },
      ];
      const validQuestions: QuestionEntity[] = [
        {
          id: 'q1',
          test_id: 't-1',
          question_number: 1,
          type: 'completion',
          prompt: 'Aqueducts relied on gravity ____ to move water.',
          options: [],
          correct_answer: 'flow',
          difficulty: 'exam_standard',
          status: 'draft',
          version: 1,
          created_at: new Date().toISOString(),
        },
      ];

      const result = contentStore.validateTest(validTest, validPassages, [], validQuestions);
      expect(result.isValid).toBe(true);
      expect(result.errors.length).toBe(0);
    });
  });

  describe('3. Version History, Draft Auto-Save & Restore', () => {
    it('saves draft state and restores it accurately', () => {
      const draftPayload = { title: 'Auto-saved test draft', customNote: 'Candidate test' };
      contentStore.saveDraft('test-draft-01', draftPayload);

      const retrieved = contentStore.getDraft('test-draft-01');
      expect(retrieved).toEqual(draftPayload);

      contentStore.clearDraft('test-draft-01');
      expect(contentStore.getDraft('test-draft-01')).toBeNull();
    });

    it('stores version snapshots when a test is updated and allows restoring to a prior version', () => {
      const testId = 'version-test-01';
      const initialTest: TestEntity = {
        id: testId,
        title: 'Original Version 1 Title',
        type: 'academic',
        skill: 'reading',
        status: 'draft',
        difficulty: 'exam_standard',
        version: 1,
        duration_minutes: 60,
        total_questions: 1,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };
      contentStore.saveTest(initialTest);

      // Now update the test to create Version 2
      const updatedTest: TestEntity = {
        ...initialTest,
        title: 'Updated Version 2 Title',
      };
      contentStore.saveTest(updatedTest);

      // Check version snapshots
      const snapshots = contentStore.getVersionSnapshots(testId);
      expect(snapshots.length).toBeGreaterThan(0);
      expect(snapshots[0].test.title).toBe('Original Version 1 Title');

      // Restore to version 1
      const restored = contentStore.restoreVersion(testId, 1);
      expect(restored).toBe(true);

      const activeTest = contentStore.getTestById(testId);
      expect(activeTest?.title).toBe('Original Version 1 Title');
    });
  });

  describe('4. Vocabulary CSV Import Validation & Export', () => {
    it('validates CSV format, reports faulty rows, and parses valid lexical entries', () => {
      const csvData = `Word,Phonetic,PartOfSpeech,Definition,Urdu,Band,Topic
innovate,/ˈɪn.ə.veɪt/,verb,To introduce new methods or ideas,نئی چیز لانا,7.5,technology
,/bæd/,noun,Empty word missing error,,6.0,general
synthesize,/ˈsɪn.θə.saɪz/,verb,To combine different ideas into a coherent whole,ترکیب دینا,8.0,academic`;

      const validation = contentStore.validateVocabCsv(csvData);
      expect(validation.validRows.length).toBe(2);
      expect(validation.errorRows.length).toBe(1);
      expect(validation.errorRows[0].error).toContain('Word column is empty');

      expect(validation.validRows[0].word).toBe('innovate');
      expect(validation.validRows[1].word).toBe('synthesize');
    });

    it('exports all vocabulary items as a properly formatted CSV string', () => {
      const csv = contentStore.exportVocabCsv();
      expect(csv).toContain('Word,Phonetic,Part of Speech,Definition,Urdu Meaning,Band,Topic');
      expect(csv.split('\n').length).toBeGreaterThan(5);
    });
  });

  describe('5. Media Library & Delete Protection Policy', () => {
    it('tracks media references across tests and blocks deletion if an asset is in use', () => {
      const assets = contentStore.getMediaAssets();
      expect(assets.length).toBeGreaterThan(0);

      const audioAsset = assets.find((a) => a.file_name.includes('.mp3'));
      if (audioAsset) {
        // Link it to section 1 of first listening test
        const listeningTests = contentStore.getTests().filter((t) => t.skill === 'listening');
        const firstTestId = listeningTests[0]?.id || 'list-test-01';
        const sections = contentStore.getSectionsForTest(firstTestId);
        if (sections.length > 0) {
          sections[0].audio_url = `/audio/${audioAsset.file_name}`;
        }

        const usage = contentStore.getMediaUsage(audioAsset.id);
        expect(usage.references.length).toBeGreaterThanOrEqual(1);

        const deleteResult = contentStore.deleteMediaAsset(audioAsset.id);
        expect(deleteResult.success).toBe(false);
        expect(deleteResult.error).toContain('Cannot delete');
      }
    });

    it('allows deleting unreferenced media assets cleanly', () => {
      const unlinkedFile = new File(['fake data'], 'unused-test-file.png', { type: 'image/png' });
      const uploaded = contentStore.uploadMediaAsset(unlinkedFile);

      const deleteResult = contentStore.deleteMediaAsset(uploaded.id);
      expect(deleteResult.success).toBe(true);
    });
  });

  describe('6. Full Import / Export & Audit Log Tracking', () => {
    it('generates a full JSON export bundle of all curriculum entities', () => {
      const exportString = contentStore.exportAllContent();
      const bundle = JSON.parse(exportString);

      expect(bundle.exportVersion).toBe('1.0');
      expect(Array.isArray(bundle.tests)).toBe(true);
      expect(Array.isArray(bundle.vocab)).toBe(true);
      expect(Array.isArray(bundle.grammar)).toBe(true);
      expect(Array.isArray(bundle.writing)).toBe(true);
      expect(Array.isArray(bundle.speaking)).toBe(true);
    });

    it('records audit log entries for administrative mutations', () => {
      const initialLogsCount = contentStore.getAuditLogs().length;

      // Perform a mutation
      contentStore.saveWritingPrompt({
        id: 'test-audit-write-01',
        task_type: 'task2',
        title: 'Audit Verification Prompt',
        prompt_text: 'Prompt text for testing audit logging',
        min_words: 250,
        recommended_minutes: 40,
        status: 'draft',
        difficulty: 'exam_standard',
        version: 1,
        created_at: new Date().toISOString(),
      });

      const updatedLogs = contentStore.getAuditLogs();
      expect(updatedLogs.length).toBeGreaterThan(initialLogsCount);
      expect(updatedLogs[0].action).toContain('WRITING');
      expect(updatedLogs[0].target_id).toBe('test-audit-write-01');
    });
  });
});
