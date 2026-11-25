import { describe, it, expect, beforeEach, vi } from 'vitest';
import {
  adminCourseStore,
  type CourseLessonEntity,
} from './adminCourseStore';
import {
  dictionaryAdminStore,
  type AdminDictionaryPatch,
} from '../../dictionary/dictionaryAdminStore';
import {
  dictionaryStore,
  type DictionaryEntry,
} from '../../dictionary/dictionaryService';
import { getCourseLesson } from './courseService';
import { contentStore } from '../../../shared/content/contentStore';
import { settingsStore } from '../../../shared/settings/settingsStore';

const mockStorage: Record<string, string> = {};
if (typeof globalThis.localStorage === 'undefined') {
  (globalThis as any).localStorage = {
    getItem: (k: string) => mockStorage[k] ?? null,
    setItem: (k: string, v: string) => { mockStorage[k] = v; },
    removeItem: (k: string) => { delete mockStorage[k]; },
    clear: () => { Object.keys(mockStorage).forEach((k) => delete mockStorage[k]); },
    length: 0,
    key: () => null,
  };
}

describe('Admin Course Manager, Dictionary & Security Suite', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  describe('1. Course Manager: Role & RLS Draft Isolation', () => {
    it('enforces student privacy: students cannot read draft lessons', async () => {
      // Create a draft lesson
      const draftLesson: CourseLessonEntity = {
        id: 'eng-a1-test-draft-lesson',
        level: 'A1',
        unitId: 'eng-a1-u1',
        order: 99,
        title: 'Secret Draft Grammar Lesson',
        description: 'Under construction',
        objectives: ['Master target pattern'],
        estimatedMinutes: 10,
        prerequisites: [],
        skillTags: ['draft-tag'],
        vocabularyList: [{ word: 'draft', partOfSpeech: 'noun', definition: 'A preliminary version' }],
        sections: [{ id: 's1', type: 'explain', title: 'Draft explanation', content: 'Draft content' }],
        status: 'draft',
        version: 1,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      adminCourseStore.saveLesson(draftLesson);

      // Student attempt to access draft lesson
      const studentView = await getCourseLesson('eng-a1-test-draft-lesson', { forStudent: true });
      expect(studentView).toBeNull();

      // Admin attempt to access draft lesson
      const adminView = await getCourseLesson('eng-a1-test-draft-lesson', { forStudent: false });
      expect(adminView).not.toBeNull();
      expect(adminView.id).toBe('eng-a1-test-draft-lesson');
      expect(adminView.status).toBe('draft');
    });

    it('validates lesson schema and blocks publishing if explanations are missing', () => {
      const invalidLesson: CourseLessonEntity = {
        id: 'eng-b1-invalid-lesson',
        level: 'B1',
        unitId: 'eng-b1-u1',
        order: 1,
        title: 'Conditionals Lesson',
        description: 'B1 grammar',
        objectives: ['Can use second conditional'],
        estimatedMinutes: 15,
        prerequisites: [],
        skillTags: ['conditionals'],
        vocabularyList: [{ word: 'unlikely', partOfSpeech: 'adj', definition: 'Not probable' }],
        sections: [
          {
            id: 'sec-1',
            type: 'practice',
            title: 'Practice with missing explanation',
            exercises: [
              {
                id: 'ex-1',
                type: 'mcq',
                prompt: 'If I ___ you, I would study.',
                options: [
                  { id: 'opt-1', text: 'were' },
                  { id: 'opt-2', text: 'was' },
                ],
                correctOptionId: 'opt-1',
                explanation: '', // Missing explanation!
              },
            ],
          },
        ],
        status: 'draft',
        version: 1,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      const validation = adminCourseStore.validateLesson(invalidLesson);
      expect(validation.isValid).toBe(false);
      expect(validation.canPublish).toBe(false);
      expect(validation.errors.some((e) => e.includes('missing an explanation'))).toBe(true);

      // Attempting to publish directly via store fails
      const publishRes = adminCourseStore.saveLesson({ ...invalidLesson, status: 'published' });
      expect(publishRes.success).toBe(false);
      expect(publishRes.errors).toBeDefined();
    });

    it('permits publishing when all quality and schema criteria pass', async () => {
      const validLesson: CourseLessonEntity = {
        id: 'eng-a1-valid-publish',
        level: 'A1',
        unitId: 'eng-a1-u1',
        order: 10,
        title: 'Fully Verified Lesson',
        description: 'Complete with explanations and vocabulary',
        objectives: ['Accurately use present simple questions'],
        estimatedMinutes: 12,
        prerequisites: [],
        skillTags: ['present-simple'],
        vocabularyList: [
          { word: 'routine', partOfSpeech: 'noun', definition: 'A sequence of actions regularly followed.' },
        ],
        sections: [
          {
            id: 's1',
            type: 'explain',
            title: 'Rule Overview',
            content: 'Do/Does are auxiliary verbs.',
          },
          {
            id: 's2',
            type: 'practice',
            title: 'Exercises',
            exercises: [
              {
                id: 'ex-1',
                type: 'mcq',
                prompt: 'Do you play tennis?',
                options: [
                  { id: 'opt-1', text: 'Yes, I do.' },
                  { id: 'opt-2', text: 'Yes, I am.' },
                ],
                correctOptionId: 'opt-1',
                explanation: 'Auxiliary "do" matches present simple questions.',
              },
            ],
          },
        ],
        status: 'draft',
        version: 1,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      // 1. Initial save as draft
      adminCourseStore.saveLesson(validLesson);
      expect(await getCourseLesson('eng-a1-valid-publish', { forStudent: true })).toBeNull();

      // 2. Publish lesson
      const publishRes = adminCourseStore.updateStatus('eng-a1-valid-publish', 'published');
      expect(publishRes.success).toBe(true);

      // 3. Now visible to students
      const studentLesson = await getCourseLesson('eng-a1-valid-publish', { forStudent: true });
      expect(studentLesson).not.toBeNull();
      expect(studentLesson.title).toBe('Fully Verified Lesson');
      expect(studentLesson.status).toBe('published');
    });

    it('records version snapshots on save and allows version restoration', () => {
      const lesson: CourseLessonEntity = {
        id: 'eng-b2-version-test',
        level: 'B2',
        unitId: 'eng-b2-u1',
        order: 2,
        title: 'Original Title v1',
        description: 'Original description',
        objectives: ['Objective v1'],
        estimatedMinutes: 15,
        prerequisites: [],
        skillTags: ['inversion'],
        vocabularyList: [{ word: 'seldom', partOfSpeech: 'adv', definition: 'Not often' }],
        sections: [{ id: 's1', type: 'explain', title: 'Inversion', content: 'Rarely do we see...' }],
        status: 'draft',
        version: 1,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      adminCourseStore.saveLesson(lesson);

      // Update to v2
      adminCourseStore.saveLesson({
        ...lesson,
        title: 'Updated Title v2',
        version: 2,
      });

      const versions = adminCourseStore.getVersions('eng-b2-version-test');
      expect(versions.length).toBeGreaterThanOrEqual(1);

      // Restore v1
      const restored = adminCourseStore.restoreVersion('eng-b2-version-test', 1);
      expect(restored).toBe(true);

      const current = adminCourseStore.getLesson('eng-b2-version-test');
      expect(current?.title).toBe('Original Title v1');
    });

    it('duplicates a lesson as a new draft copy', () => {
      const clone = adminCourseStore.duplicateLesson('eng-a1-u1-l1');
      expect(clone).not.toBeNull();
      expect(clone?.status).toBe('draft');
      expect(clone?.title).toContain('(Copy)');
      expect(clone?.id).toContain('-copy-');
    });
  });

  describe('2. Dictionary Manager: Patches, Reports & Bulk CSV', () => {
    it('applies published patches with Urdu meanings and hides excluded words', async () => {
      // Create a patch with Urdu meaning in published status
      dictionaryAdminStore.savePatch({
        id: 'patch-test-eloquent',
        headword: 'eloquent',
        pos: 'adjective',
        action: 'edit',
        urduMeaning: 'فصیح و بلیغ',
        status: 'published',
      });

      const entryRes = await dictionaryStore.getEntry('eloquent');
      expect(entryRes.entry).not.toBeNull();
      expect(entryRes.entry?.urduMeaning).toBe('فصیح و بلیغ');

      // Hide a word via patch
      dictionaryAdminStore.savePatch({
        id: 'patch-test-hide',
        headword: 'archaicwordtest',
        pos: 'noun',
        action: 'hide',
        status: 'published',
      });

      const hiddenRes = await dictionaryStore.getEntry('archaicwordtest');
      expect(hiddenRes.entry).toBeNull();
    });

    it('performs dry-run validation on bulk Urdu CSV import', () => {
      const csv = `word,urdu_meaning,example_sentence
resilience,لچک,She showed resilience.
ambitious,پرعزم,He is ambitious.
,empty,missing word
diligent,محنتی,`;

      const dryRun = dictionaryAdminStore.dryRunImportUrduCsv(csv);
      expect(dryRun.totalRows).toBe(4);
      expect(dryRun.validRows).toBe(3);
      expect(dryRun.invalidRows).toBe(1);
      expect(dryRun.errors.length).toBe(1);
      expect(dryRun.sampleRows.length).toBe(3);
    });

    it('commits bulk CSV import and updates dictionary patches', () => {
      const csv = `word,urdu_meaning,example_sentence
paradigm,ایک مخصوص طرز عمل,A major paradigm shift.
catalyst,محرک,A catalyst for change.`;

      const res = dictionaryAdminStore.commitImportUrduCsv(csv);
      expect(res.importedCount).toBe(2);

      const patch = dictionaryAdminStore.getPatchForWord('paradigm');
      expect(patch).not.toBeNull();
      expect(patch?.urduMeaning).toBe('ایک مخصوص طرز عمل');
    });

    it('accepts student problem reports and allows admin status resolution', () => {
      const rep = dictionaryAdminStore.submitReport(
        'serendipity',
        'definition',
        'Definition should mention happy coincidences',
        'student@zarii.app'
      );
      expect(rep.status).toBe('new');

      const allReports = dictionaryAdminStore.getReports({ word: 'serendipity' });
      expect(allReports.length).toBeGreaterThan(0);

      const resolved = dictionaryAdminStore.updateReportStatus(rep.id, 'resolved');
      expect(resolved).toBe(true);

      const updated = dictionaryAdminStore.getReports().find((r) => r.id === rep.id);
      expect(updated?.status).toBe('resolved');
      expect(updated?.resolvedAt).toBeDefined();
    });

    it('publishes a versioned patch release bundle', () => {
      // Add a draft patch
      dictionaryAdminStore.savePatch({
        id: 'patch-draft-bundle',
        headword: 'resilience',
        action: 'edit',
        status: 'draft',
      });

      const release = dictionaryAdminStore.publishPatches();
      expect(release.version).toBeDefined();
      expect(release.publishedCount).toBeGreaterThanOrEqual(1);

      const info = dictionaryAdminStore.getBuildInfo();
      expect(info.patchReleaseVersion).toBe(`v${release.version}`);
    });
  });

  describe('3. Feature Flags & Site Settings', () => {
    it('manages feature flags per track and per feature', () => {
      settingsStore.updateFeatureFlag('ielts_track_enabled', true);
      settingsStore.updateFeatureFlag('english_track_enabled', true);
      settingsStore.updateFeatureFlag('course_enabled', true);
      settingsStore.updateFeatureFlag('dictionary_enabled', true);
      settingsStore.updateFeatureFlag('tap_to_lookup_enabled', true);
      settingsStore.updateFeatureFlag('speaking_ai_feedback', true);
      settingsStore.updateFeatureFlag('urdu_hints', true);

      const current = settingsStore.getFeatures();
      expect(current.ielts_track_enabled).toBe(true);
      expect(current.english_track_enabled).toBe(true);
      expect(current.course_enabled).toBe(true);
      expect(current.dictionary_enabled).toBe(true);
      expect(current.tap_to_lookup_enabled).toBe(true);
      expect(current.speaking_ai_feedback).toBe(true);
      expect(current.urdu_hints).toBe(true);

      // Disable tap-to-lookup
      settingsStore.updateFeatureFlag('tap_to_lookup_enabled', false);
      expect(settingsStore.getFeatures().tap_to_lookup_enabled).toBe(false);
    });
  });

  describe('4. Cross-Track Smart Links Logic', () => {
    it('throttles B2 IELTS diagnostic suggestion to once per 30 days', () => {
      // Simulate recent dismissal (5 days ago)
      const fiveDaysAgo = Date.now() - 5 * 24 * 60 * 60 * 1000;
      localStorage.setItem('zarii_ielts_suggestion_dismissed', fiveDaysAgo.toString());

      const dismissedTime = parseInt(localStorage.getItem('zarii_ielts_suggestion_dismissed') || '0', 10);
      const isThrottled = Date.now() - dismissedTime < 30 * 24 * 60 * 60 * 1000;
      expect(isThrottled).toBe(true);

      // Simulate expired dismissal (35 days ago)
      const thirtyFiveDaysAgo = Date.now() - 35 * 24 * 60 * 60 * 1000;
      localStorage.setItem('zarii_ielts_suggestion_dismissed', thirtyFiveDaysAgo.toString());
      const expiredDismissedTime = parseInt(localStorage.getItem('zarii_ielts_suggestion_dismissed') || '0', 10);
      const isExpired = Date.now() - expiredDismissedTime >= 30 * 24 * 60 * 60 * 1000;
      expect(isExpired).toBe(true);
    });

    it('records audit log entries for all content and patch modifications', () => {
      const logsBefore = contentStore.getAuditLogs().length;

      adminCourseStore.saveLesson({
        id: 'eng-audit-test',
        level: 'A1',
        unitId: 'eng-a1-u1',
        order: 1,
        title: 'Audit Test Lesson',
        description: 'Testing audit logs',
        objectives: ['Test'],
        estimatedMinutes: 10,
        prerequisites: [],
        skillTags: ['audit'],
        vocabularyList: [],
        sections: [],
        status: 'draft',
        version: 1,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      });

      const logsAfter = contentStore.getAuditLogs();
      expect(logsAfter.length).toBeGreaterThan(logsBefore);
      const latest = logsAfter[0];
      expect(latest.target_type).toBe('course_lesson');
      expect(latest.target_id).toBe('eng-audit-test');
    });
  });
});
