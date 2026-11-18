import { describe, it, expect, beforeEach } from 'vitest';
import { userStore } from '../../shared/users/userStore';
import {
  getAnalyticsDataset,
  exportAnalyticsCsv,
  type DateRange,
} from '../../shared/analytics/analyticsData';

describe('Admin 4: Users Management Store', () => {
  beforeEach(() => {
    // Reset or ensure baseline store state
    userStore.resetToDefault();
  });

  it('provides a list of detailed users with mock data', () => {
    const users = userStore.getUsers();
    expect(users.length).toBeGreaterThanOrEqual(4);

    const qamar = users.find((u) => u.email === 'q8497464@gmail.com');
    expect(qamar).toBeDefined();
    expect(qamar?.role).toBe('admin');
    expect(qamar?.status).toBe('active');
  });

  it('filters users by search query and role', () => {
    const searchResult = userStore.searchUsers('Elena');
    expect(searchResult.length).toBe(1);
    expect(searchResult[0].name).toContain('Elena');

    const admins = userStore.filterUsers({ role: 'admin' });
    expect(admins.every((u) => u.role === 'admin')).toBe(true);

    const students = userStore.filterUsers({ role: 'student' });
    expect(students.every((u) => u.role === 'student')).toBe(true);
  });

  it('allows promoting a student to editor or admin', () => {
    const students = userStore.filterUsers({ role: 'student' });
    const targetStudent = students[0];

    const result = userStore.changeUserRole(targetStudent.id, 'editor');
    expect(result.success).toBe(true);

    const updated = userStore.getUserById(targetStudent.id);
    expect(updated?.role).toBe('editor');
  });

  it('strictly blocks demoting or removing the last remaining admin', () => {
    // There is initially 1 admin (Qamar)
    const adminCount = userStore.getAdminsCount();
    expect(adminCount).toBe(1);

    const admin = userStore.filterUsers({ role: 'admin' })[0];

    // Attempt to demote last admin
    const demoteResult = userStore.changeUserRole(admin.id, 'student');
    expect(demoteResult.success).toBe(false);
    expect(demoteResult.error).toMatch(/last administrator/i);

    // Attempt to suspend last admin
    const suspendResult = userStore.toggleSuspendUser(admin.id);
    expect(suspendResult.success).toBe(false);
    expect(suspendResult.error).toMatch(/cannot suspend the last.*administrator/i);

    // Attempt to delete last admin
    const deleteResult = userStore.deleteUserData(admin.id);
    expect(deleteResult.success).toBe(false);
    expect(deleteResult.error).toMatch(/cannot delete the last.*administrator/i);
  });

  it('allows demoting an admin if another admin exists', () => {
    // Promote a student to admin first
    const student = userStore.filterUsers({ role: 'student' })[0];
    userStore.changeUserRole(student.id, 'admin');

    expect(userStore.getAdminsCount()).toBe(2);

    // Now demoting the original admin should succeed
    const qamar = userStore.getUsers().find((u) => u.email === 'q8497464@gmail.com')!;
    const demoteResult = userStore.changeUserRole(qamar.id, 'editor');
    expect(demoteResult.success).toBe(true);
    expect(userStore.getAdminsCount()).toBe(1);
  });

  it('toggles user suspension and reactivation for non-admin accounts', () => {
    const student = userStore.filterUsers({ role: 'student' })[0];
    expect(student.status).toBe('active');

    // Suspend
    const suspendRes = userStore.toggleSuspendUser(student.id);
    expect(suspendRes.success).toBe(true);
    expect(userStore.getUserById(student.id)?.status).toBe('suspended');

    // Reactivate
    const reactivateRes = userStore.toggleSuspendUser(student.id);
    expect(reactivateRes.success).toBe(true);
    expect(userStore.getUserById(student.id)?.status).toBe('active');
  });

  it('sends direct administrative notifications to a candidate', () => {
    const student = userStore.filterUsers({ role: 'student' })[0];
    const initialNotificationCount = student.notifications.length;

    const res = userStore.sendUserNotification(
      student.id,
      'Practice Reminder',
      'Your exam is in 10 days, complete a mock test!'
    );
    expect(res.success).toBe(true);

    const updated = userStore.getUserById(student.id);
    expect(updated?.notifications.length).toBe(initialNotificationCount + 1);
    expect(updated?.notifications[0].title).toBe('Practice Reminder');
    expect(updated?.notifications[0].message).toContain('complete a mock test');
  });

  it('exports user data cleanly without any passwords or secrets', () => {
    const student = userStore.filterUsers({ role: 'student' })[0];
    const jsonExport = userStore.exportUserDataJson(student.id);
    expect(jsonExport).toBeDefined();

    const parsed = JSON.parse(jsonExport);
    expect(parsed.userProfile.email).toBe(student.email);
    expect(parsed.userProfile.password).toBeUndefined();
    expect(parsed.secret).toBeUndefined();
    expect(parsed.token).toBeUndefined();
    expect(parsed.attemptHistory).toBeDefined();

    const csvExport = userStore.exportUserDataCsv(student.id);
    expect(csvExport).toContain(student.email);
    expect(csvExport).not.toContain('password');
  });

  it('deletes user data completely for non-admin candidates', () => {
    const student = userStore.filterUsers({ role: 'student' })[0];
    const res = userStore.deleteUserData(student.id);
    expect(res.success).toBe(true);

    const deleted = userStore.getUserById(student.id);
    expect(deleted).toBeUndefined();
  });
});

describe('Admin 4: Analytics and Content Quality Insights', () => {
  it('computes aggregated privacy-safe metrics for 30d range', () => {
    const data30d = getAnalyticsDataset('30d');
    expect(data30d.kpis.dau).toBeGreaterThan(0);
    expect(data30d.kpis.wau).toBeGreaterThan(data30d.kpis.dau);
    expect(data30d.kpis.mau).toBeGreaterThan(data30d.kpis.wau);
    expect(data30d.kpis.totalSignups).toBeGreaterThan(0);

    expect(data30d.moduleMetrics.length).toBe(4);
    expect(data30d.activityTrend.length).toBeGreaterThan(0);
    expect(data30d.funnel.length).toBe(4);
  });

  it('scales dataset metrics appropriately across date ranges', () => {
    const data7d = getAnalyticsDataset('7d');
    const data30d = getAnalyticsDataset('30d');
    const data90d = getAnalyticsDataset('90d');
    const dataAll = getAnalyticsDataset('all');

    expect(data7d.kpis.dau).toBeLessThan(data30d.kpis.dau);
    expect(data30d.kpis.dau).toBeLessThan(data90d.kpis.dau);
    expect(data90d.kpis.dau).toBeLessThan(dataAll.kpis.dau);
  });

  it('detects and flags question types with low accuracy (< 35%)', () => {
    const data = getAnalyticsDataset('30d');
    const headings = data.questionTypeAccuracies.find((q) => q.type === 'matching-headings');
    expect(headings).toBeDefined();
    expect(headings?.flaggedPoor).toBe(true);
    expect(headings?.accuracyRate).toBeLessThan(35);

    const mcq = data.questionTypeAccuracies.find((q) => q.type === 'multiple-choice');
    expect(mcq?.flaggedPoor).toBe(false);
  });

  it('identifies tests with abnormal drop-off rates in leastUsedTests', () => {
    const data = getAnalyticsDataset('30d');
    const highDropOff = data.leastUsedTests.find((t) => t.dropOffRate > 40);
    expect(highDropOff).toBeDefined();
    expect(highDropOff?.testId).toBe('general-test-06');
  });

  it('provides actionable content quality insight flags with testId links', () => {
    const data = getAnalyticsDataset('30d');
    expect(data.qualityFlags.length).toBeGreaterThanOrEqual(3);

    const badKeyFlag = data.qualityFlags.find((f) => f.type === 'bad_answer_key');
    expect(badKeyFlag).toBeDefined();
    expect(badKeyFlag?.testId).toBe('acad-reading-01');
    expect(badKeyFlag?.severity).toBe('high');

    const feedbackFlag = data.qualityFlags.find((f) => f.type === 'feedback_complaint');
    expect(feedbackFlag).toBeDefined();
    expect(feedbackFlag?.testId).toBe('list-test-01');
  });

  it('reports reliable AI examiner telemetry with high success rate', () => {
    const data = getAnalyticsDataset('30d');
    expect(data.aiTelemetry.successRate).toBeGreaterThan(99.0);
    expect(data.aiTelemetry.avgGradingTimeSeconds).toBeLessThan(10);
    expect(data.aiTelemetry.totalCalls).toBeGreaterThan(0);
  });

  it('generates a well-formed CSV export of aggregated analytics', () => {
    const dataset = getAnalyticsDataset('30d');
    const csv = exportAnalyticsCsv(dataset);

    expect(csv).toContain('--- ZARII IELTS AGGREGATED ANALYTICS ---');
    expect(csv).toContain('DAU,');
    expect(csv).toContain('Module,Attempts,Avg Score,Avg Band,Completion Rate,Avg Time (min)');
    expect(csv).toContain('Reading,');
    expect(csv).toContain('Listening,');
    expect(csv).toContain('Matching Headings');
  });
});
