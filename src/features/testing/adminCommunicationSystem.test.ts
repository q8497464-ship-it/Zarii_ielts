import { describe, it, expect, beforeEach } from 'vitest';
import {
  communicationStore,
  CANNED_FEEDBACK_REPLIES,
  type AnnouncementItem,
} from '../../shared/communication/communicationStore';
import {
  adminNotificationStore,
  type AdminInAppNotification,
} from '../../shared/admin/adminNotificationStore';
import { systemStore } from '../../shared/system/systemStore';
import { contentStore } from '../../shared/content/contentStore';
import { errorLogger } from '../../lib/errorLogger';

describe('Admin 6: Communication Store (Announcements, Feedback & Templates)', () => {
  beforeEach(() => {
    communicationStore.resetToDefault();
    adminNotificationStore.resetToDefault();
  });

  it('creates, schedules, and manages student announcements', () => {
    const initialCount = communicationStore.getAnnouncements().length;

    const ann = communicationStore.saveAnnouncement({
      title: 'Cambridge 19 General Training Released',
      message: 'New General Training reading passages are now available.',
      type: 'success',
      format: 'modal',
      audience: 'all',
      starts_at: '2026-11-18',
      expires_at: '2026-12-31',
      is_active: true,
    });

    expect(ann.id).toBeDefined();
    expect(communicationStore.getAnnouncements().length).toBe(initialCount + 1);

    // Toggle active
    communicationStore.toggleAnnouncementActive(ann.id);
    const toggled = communicationStore.getAnnouncements().find((a) => a.id === ann.id);
    expect(toggled?.is_active).toBe(false);

    // Delete
    communicationStore.deleteAnnouncement(ann.id);
    expect(communicationStore.getAnnouncements().find((a) => a.id === ann.id)).toBeUndefined();
  });

  it('filters active announcements for students and remembers dismissals', () => {
    const activeBefore = communicationStore.getActiveAnnouncementsForStudent();
    expect(activeBefore.length).toBeGreaterThan(0);

    const targetAnn = activeBefore[0];
    communicationStore.dismissAnnouncementForStudent(targetAnn.id);

    const activeAfter = communicationStore.getActiveAnnouncementsForStudent();
    expect(activeAfter.some((a) => a.id === targetAnn.id)).toBe(false);

    const dismissedSet = communicationStore.getDismissedAnnouncementIds();
    expect(dismissedSet.has(targetAnn.id)).toBe(true);
  });

  it('handles student feedback submission, status workflows, and tags', () => {
    const initialFeedback = communicationStore.getFeedback().length;

    const ticket = communicationStore.submitStudentFeedback({
      user_name: 'Farhan Ali',
      user_email: 'farhan@example.com',
      category: 'Content Issue',
      rating: 4,
      message: 'Typo in Cambridge 19 Listening Section 2 transcript.',
      page: '/practice/listening',
      testId: 'list-test-01',
      questionNumber: 12,
    });

    expect(ticket.id).toBeDefined();
    expect(ticket.status).toBe('new');
    expect(communicationStore.getFeedback().length).toBe(initialFeedback + 1);

    // Update status to in_review
    communicationStore.updateFeedbackStatus(ticket.id, 'in_review');
    expect(communicationStore.getFeedbackById(ticket.id)?.status).toBe('in_review');

    // Update internal notes and assignee
    communicationStore.updateFeedbackTicket(ticket.id, {
      assignee: 'Qamar Raza',
      internal_notes: 'Checking audio transcript file.',
      tags: ['Listening', 'Transcript', 'Typo'],
    });

    const updated = communicationStore.getFeedbackById(ticket.id);
    expect(updated?.assignee).toBe('Qamar Raza');
    expect(updated?.tags).toContain('Typo');

    // Resolve ticket
    communicationStore.updateFeedbackStatus(ticket.id, 'resolved');
    expect(communicationStore.getFeedbackById(ticket.id)?.status).toBe('resolved');
    expect(communicationStore.getFeedbackById(ticket.id)?.resolvedAt).toBeDefined();
  });

  it('provides canned reply templates for quick candidate responses', () => {
    expect(CANNED_FEEDBACK_REPLIES.length).toBeGreaterThanOrEqual(4);
    const answerKeyReply = CANNED_FEEDBACK_REPLIES.find((r) => r.title.includes('Answer Key'));
    expect(answerKeyReply).toBeDefined();
    expect(answerKeyReply?.text).toContain('updated the official answer key');
  });

  it('interpolates dynamic placeholders in message templates', () => {
    const templates = communicationStore.getTemplates();
    expect(templates.length).toBeGreaterThanOrEqual(4);

    const reminderTpl = templates.find((t) => t.key === 'daily_study_reminder')!;
    expect(reminderTpl).toBeDefined();

    const rendered = communicationStore.renderTemplatePreview(reminderTpl, {
      student_name: 'Zahra',
      streak_days: '21',
      target_band: '7.5',
    });

    expect(rendered.renderedSubject).toContain('Zahra');
    expect(rendered.renderedBody).toContain('21-day practice streak');
    expect(rendered.renderedBody).toContain('Band 7.5');
    expect(rendered.renderedBody).not.toContain('{{student_name}}');
  });
});

describe('Admin 6: System Store (Audit Logs, Backups, Health & Errors)', () => {
  it('filters append-only audit logs and generates CSV export', () => {
    // Generate an audit log entry
    contentStore.recordAudit(
      'UPDATE_TEST',
      'test',
      'acad-reading-01',
      { status: 'draft' },
      { status: 'published' }
    );

    const logs = systemStore.getAuditLogs();
    expect(logs.length).toBeGreaterThan(0);

    const filtered = systemStore.getAuditLogs({ targetType: 'test' });
    expect(filtered.every((l) => l.target_type === 'test')).toBe(true);

    const csv = systemStore.exportAuditLogsCsv(logs);
    expect(csv).toContain('Timestamp,Actor,Action,Target Type');
    expect(csv).toContain('UPDATE_TEST');
  });

  it('creates full system backup package and performs dry-run inspection before restore', () => {
    const backupJson = systemStore.createFullBackupPackage();
    expect(backupJson).toBeDefined();

    const dryRun = systemStore.inspectBackupDryRun(backupJson);
    expect(dryRun.isValid).toBe(true);
    expect(dryRun.testsCount).toBeGreaterThan(0);
    expect(dryRun.questionsCount).toBeGreaterThan(0);
    expect(dryRun.hasSettings).toBe(true);

    // Commit restore
    const restoreRes = systemStore.commitBackupRestore(backupJson);
    expect(restoreRes.success).toBe(true);
  });

  it('rejects invalid backup files during dry-run with descriptive error', () => {
    const invalidJson = JSON.stringify({ corrupted: true });
    const dryRun = systemStore.inspectBackupDryRun(invalidJson);

    expect(dryRun.isValid).toBe(false);
    expect(dryRun.error).toMatch(/missing zarii_backup_version/i);
  });

  it('runs automated content health validation across published mock exams', () => {
    const health = systemStore.runContentHealthCheck();
    expect(health.totalTestsChecked).toBeGreaterThan(0);
    expect(health.healthyTestsCount).toBeGreaterThanOrEqual(0);
    expect(Array.isArray(health.issues)).toBe(true);

    // If any issue exists, verify it contains an actionable editor URL
    if (health.issues.length > 0) {
      expect(health.issues[0].actionUrl).toContain('/admin/content?tab=tests&testId=');
    }
  });

  it('aggregates client-side runtime errors with occurrence counts', () => {
    errorLogger.clearLogs();
    errorLogger.log({
      message: 'Network offline during test timer',
      stack: 'NetworkError: Fetch failed',
      url: 'https://zarii.app/practice/reading',
      type: 'error',
    });
    errorLogger.log({
      message: 'Network offline during test timer',
      stack: 'NetworkError: Fetch failed',
      url: 'https://zarii.app/practice/reading',
      type: 'error',
    });

    const grouped = systemStore.getGroupedClientErrors();
    expect(grouped.length).toBe(1);
    expect(grouped[0].message).toBe('Network offline during test timer');
    expect(grouped[0].count).toBe(2);
  });

  it('reports infrastructure health and free-tier capacity limits', () => {
    const infra = systemStore.getInfrastructureHealth();
    expect(infra.databaseStatus).toBe('healthy');
    expect(infra.databaseSizeMb).toBeLessThan(infra.databaseLimitMb);
    expect(infra.storageSizeMb).toBeLessThan(infra.storageLimitMb);
    expect(infra.edgeFunctionsStatus).toBe('healthy');
  });
});

describe('Admin 6: Admin In-App Notifications (Bell Icon)', () => {
  beforeEach(() => {
    adminNotificationStore.resetToDefault();
  });

  it('tracks notifications, unread counts, and triggers new alerts', () => {
    const initialUnread = adminNotificationStore.getUnreadCount();
    expect(initialUnread).toBeGreaterThanOrEqual(1);

    // Add new notification for failed AI call
    adminNotificationStore.addNotification({
      type: 'ai_error',
      title: 'Groq API Rate Limited (429)',
      description: 'Automatically routed candidate evaluation to Google Gemini.',
      link: '/admin/ai?tab=usage',
    });

    expect(adminNotificationStore.getUnreadCount()).toBe(initialUnread + 1);

    // Mark all as read
    adminNotificationStore.markAllAsRead();
    expect(adminNotificationStore.getUnreadCount()).toBe(0);
  });
});
