import { describe, it, expect, beforeEach } from 'vitest';
import { contentStore } from '../../shared/content/contentStore';
import { settingsStore } from '../../shared/settings/settingsStore';
import { authApi } from '../../shared/api';
import type { TestEntity } from '../../shared/types/database';

describe('ADMIN QA: End-to-End Administrative Lifecycle Flows', () => {
  beforeEach(() => {
    contentStore.migrateDefaultContent();
    authApi.clearLoginAttempts('admin@zarii.app');
  });

  describe('Flow 1: Admin Test Publication Lifecycle & Student Visibility', () => {
    it('executes full flow: admin login -> create draft -> publish -> student query -> unpublish', async () => {
      // 1. Admin logs in
      const loginResult = await authApi.authenticateAdmin('admin@zarii.app', 'AdminSecret123!');
      expect(loginResult.success).toBe(true);
      expect(loginResult.role).toBe('admin');

      // 2. Admin creates a new Reading test in 'draft' status
      const newTestId = 'flow-test-reading-99';
      const draftTest: TestEntity = {
        id: newTestId,
        title: 'E2E Lifecycle Reading Exam',
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

      contentStore.saveTest(draftTest);
      expect(contentStore.getTestById(newTestId)).toBeDefined();
      expect(contentStore.getTestById(newTestId)?.status).toBe('draft');

      // 3. Student perspective: Draft test is NOT visible to student queries
      const studentVisibleTestsBefore = contentStore.getTests().filter((t) => t.status === 'published');
      const isVisibleToStudentInitial = studentVisibleTestsBefore.some((t) => t.id === newTestId);
      expect(isVisibleToStudentInitial).toBe(false);

      // 4. Admin publishes the test
      const publishedTest: TestEntity = {
        ...draftTest,
        status: 'published',
        updated_at: new Date().toISOString(),
      };
      contentStore.saveTest(publishedTest);
      expect(contentStore.getTestById(newTestId)?.status).toBe('published');

      // 5. Student perspective: Published test is now immediately visible to students
      const studentVisibleTestsAfter = contentStore.getTests().filter((t) => t.status === 'published');
      const isVisibleToStudentAfterPublish = studentVisibleTestsAfter.some((t) => t.id === newTestId);
      expect(isVisibleToStudentAfterPublish).toBe(true);

      const studentQueriedTest = studentVisibleTestsAfter.find((t) => t.id === newTestId);
      expect(studentQueriedTest?.title).toBe('E2E Lifecycle Reading Exam');

      // 6. Admin unpublishes (drafts or archives) the test
      const unpublishedTest: TestEntity = {
        ...publishedTest,
        status: 'archived',
        updated_at: new Date().toISOString(),
      };
      contentStore.saveTest(unpublishedTest);

      // 7. Student perspective: Test disappears from student view
      const studentVisibleTestsFinal = contentStore.getTests().filter((t) => t.status === 'published');
      const isVisibleToStudentAfterUnpublish = studentVisibleTestsFinal.some((t) => t.id === newTestId);
      expect(isVisibleToStudentAfterUnpublish).toBe(false);
    });
  });

  describe('Flow 2: Dynamic Feature Flag Propagation to Student UI', () => {
    it('propagates feature flag toggles from admin settings to client visibility', () => {
      // 1. Initial State: Speaking is enabled
      const initialFeatures = settingsStore.getFeatures();
      expect(initialFeatures.speaking).toBe(true);

      // 2. Student store checks feature flag
      let isSpeakingEnabled = settingsStore.isFeatureEnabled('speaking');
      expect(isSpeakingEnabled).toBe(true);

      // 3. Admin toggles feature flag off (e.g. during maintenance)
      settingsStore.updateFeatureFlag('speaking', false);

      // 4. Verify toggle in admin store
      const updatedFeatures = settingsStore.getFeatures();
      expect(updatedFeatures.speaking).toBe(false);

      // 5. Student application reacts: Feature is now disabled
      isSpeakingEnabled = settingsStore.isFeatureEnabled('speaking');
      expect(isSpeakingEnabled).toBe(false);

      // 6. Admin toggles feature flag back on
      settingsStore.updateFeatureFlag('speaking', true);
      expect(settingsStore.isFeatureEnabled('speaking')).toBe(true);
    });

    it('manages maintenance mode state propagation to student experience', () => {
      expect(settingsStore.getMaintenance().enabled).toBe(false);

      settingsStore.updateMaintenance({
        enabled: true,
        message: 'System upgrade in progress.',
      });

      expect(settingsStore.getMaintenance().enabled).toBe(true);
      expect(settingsStore.getMaintenance().message).toBe('System upgrade in progress.');

      // Restore maintenance mode
      settingsStore.updateMaintenance({ enabled: false, message: '' });
      expect(settingsStore.getMaintenance().enabled).toBe(false);
    });
  });
});
