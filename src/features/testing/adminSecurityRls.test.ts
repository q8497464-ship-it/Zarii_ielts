import { describe, it, expect, beforeEach } from 'vitest';
import type { UserRole, Profile, TestEntity, FeatureFlagEntity, AIProviderEntity } from '../../shared/types/database';

/**
 * RLS Simulator
 * Evaluates access rules mirroring PostgreSQL RLS policies in 20261118000002_row_level_security.sql
 */
class MockRLSEngine {
  private profiles: Profile[] = [];
  private tests: TestEntity[] = [];
  private attempts: Array<{ id: string; user_id: string; test_id: string; score: number }> = [];
  private feedback: Array<{ id: string; user_id?: string; message: string; status: string }> = [];
  private featureFlags: FeatureFlagEntity[] = [];
  private aiProviders: AIProviderEntity[] = [];

  constructor() {
    this.reset();
  }

  public reset() {
    this.profiles = [
      { id: 'usr-admin-1', name: 'Super Admin', role: 'admin', status: 'active', target_band: 8.5, created_at: '2026-01-01', updated_at: '2026-01-01' },
      { id: 'usr-editor-1', name: 'Content Editor', role: 'editor', status: 'active', target_band: 8.0, created_at: '2026-01-01', updated_at: '2026-01-01' },
      { id: 'usr-student-1', name: 'Alice Student', role: 'student', status: 'active', target_band: 7.5, created_at: '2026-01-01', updated_at: '2026-01-01' },
      { id: 'usr-student-2', name: 'Bob Student', role: 'student', status: 'active', target_band: 6.5, created_at: '2026-01-01', updated_at: '2026-01-01' },
    ];

    this.tests = [
      {
        id: 't-pub-1',
        title: 'Academic Reading 1',
        skill: 'reading',
        type: 'academic',
        status: 'published',
        difficulty: 'exam_standard',
        duration_minutes: 60,
        total_questions: 40,
        version: 1,
        created_at: '2026-01-01',
        updated_at: '2026-01-01',
      },
      {
        id: 't-draft-1',
        title: 'Listening Draft 2',
        skill: 'listening',
        type: 'academic',
        status: 'draft',
        difficulty: 'exam_standard',
        duration_minutes: 30,
        total_questions: 40,
        version: 1,
        created_at: '2026-01-01',
        updated_at: '2026-01-01',
      },
      {
        id: 't-arch-1',
        title: 'Old GT Reading',
        skill: 'reading',
        type: 'general',
        status: 'archived',
        difficulty: 'intermediate',
        duration_minutes: 60,
        total_questions: 40,
        version: 1,
        created_at: '2026-01-01',
        updated_at: '2026-01-01',
      },
    ];

    this.attempts = [
      { id: 'att-1', user_id: 'usr-student-1', test_id: 't-pub-1', score: 32 },
      { id: 'att-2', user_id: 'usr-student-2', test_id: 't-pub-1', score: 28 },
    ];

    this.feedback = [
      { id: 'fb-1', user_id: 'usr-student-1', message: 'Typo in Question 4', status: 'new' },
    ];

    this.featureFlags = [
      {
        key: 'speaking_ai_eval',
        name: 'AI Evaluation for Speaking',
        description: 'AI Evaluation for Speaking',
        enabled: true,
        rollout_percentage: 100,
        client_visible: true,
        updated_at: '2026-01-01',
      },
      {
        key: 'admin_beta_analytics',
        name: 'Internal Beta Analytics',
        description: 'Internal Beta Analytics',
        enabled: false,
        rollout_percentage: 0,
        client_visible: false,
        updated_at: '2026-01-01',
      },
    ];

    this.aiProviders = [
      {
        id: 'gemini-1',
        provider_name: 'gemini',
        api_key_encrypted: 'vault://gemini_key_enc',
        default_model: 'gemini-1.5-flash',
        is_active: true,
        is_fallback: false,
        monthly_token_budget: 1000000,
        created_at: '2026-01-01',
        updated_at: '2026-01-01',
      },
    ];
  }

  // --- Profiles RLS ---
  public selectProfiles(actorId: string | null): Profile[] {
    const actor = this.profiles.find((p) => p.id === actorId);
    const role = actor?.role || 'anon';

    if (role === 'admin' || role === 'editor') {
      return [...this.profiles];
    }
    return this.profiles.filter((p) => p.id === actorId);
  }

  public updateProfileRole(actorId: string, targetId: string, newRole: UserRole): { success: boolean; error?: string } {
    const actor = this.profiles.find((p) => p.id === actorId);
    if (!actor || actor.role !== 'admin') {
      return { success: false, error: 'RLS check failed: Only admins can change user roles.' };
    }
    const target = this.profiles.find((p) => p.id === targetId);
    if (target) {
      target.role = newRole;
      return { success: true };
    }
    return { success: false, error: 'Target profile not found.' };
  }

  // --- Tests RLS ---
  public selectTests(actorId: string | null): TestEntity[] {
    const actor = this.profiles.find((p) => p.id === actorId);
    const role = actor?.role || 'anon';

    if (role === 'admin' || role === 'editor') {
      return [...this.tests];
    }
    return this.tests.filter((t) => t.status === 'published');
  }

  public insertTest(actorId: string, test: TestEntity): { success: boolean; error?: string } {
    const actor = this.profiles.find((p) => p.id === actorId);
    if (!actor || (actor.role !== 'admin' && actor.role !== 'editor')) {
      return { success: false, error: 'RLS check failed: Insufficient permissions to create tests.' };
    }
    this.tests.push(test);
    return { success: true };
  }

  public deleteTest(actorId: string, testId: string): { success: boolean; error?: string } {
    const actor = this.profiles.find((p) => p.id === actorId);
    if (!actor || actor.role !== 'admin') {
      return { success: false, error: 'RLS check failed: Only admins can delete tests (editors cannot delete).' };
    }
    this.tests = this.tests.filter((t) => t.id !== testId);
    return { success: true };
  }

  // --- Attempts RLS (Personal Isolation) ---
  public selectAttempts(actorId: string): typeof this.attempts {
    const actor = this.profiles.find((p) => p.id === actorId);
    if (actor?.role === 'admin') {
      return [...this.attempts];
    }
    return this.attempts.filter((a) => a.user_id === actorId);
  }

  // --- AI Secrets RLS (No browser access) ---
  public selectAIProviders(isBrowserClient: boolean): { data: AIProviderEntity[] | null; error?: string } {
    if (isBrowserClient) {
      return { data: [], error: 'Permission denied: Browser clients cannot query ai_providers table.' };
    }
    return { data: this.aiProviders };
  }

  // --- Feature Flags RLS ---
  public selectFeatureFlags(actorId: string | null): FeatureFlagEntity[] {
    const actor = this.profiles.find((p) => p.id === actorId);
    if (actor?.role === 'admin') {
      return [...this.featureFlags];
    }
    return this.featureFlags.filter((f) => f.client_visible);
  }

  // --- Feedback RLS ---
  public selectFeedback(actorId: string): typeof this.feedback {
    const actor = this.profiles.find((p) => p.id === actorId);
    if (actor?.role === 'admin') {
      return [...this.feedback];
    }
    return [];
  }
}

describe('ADMIN SECURITY: Row Level Security (RLS) Policy Verification', () => {
  let rls: MockRLSEngine;

  beforeEach(() => {
    rls = new MockRLSEngine();
  });

  describe('1. Profiles Table Isolation', () => {
    it('allows students to query only their own profile', () => {
      const results = rls.selectProfiles('usr-student-1');
      expect(results.length).toBe(1);
      expect(results[0].id).toBe('usr-student-1');
      expect(results[0].name).toBe('Alice Student');
    });

    it('blocks students from seeing other students or admin profiles', () => {
      const results = rls.selectProfiles('usr-student-1');
      const hasOtherStudents = results.some((p) => p.id === 'usr-student-2');
      const hasAdmin = results.some((p) => p.id === 'usr-admin-1');
      expect(hasOtherStudents).toBe(false);
      expect(hasAdmin).toBe(false);
    });

    it('allows admins and editors to view all user profiles', () => {
      const adminResults = rls.selectProfiles('usr-admin-1');
      const editorResults = rls.selectProfiles('usr-editor-1');
      expect(adminResults.length).toBe(4);
      expect(editorResults.length).toBe(4);
    });

    it('prevents students from promoting themselves or changing roles', () => {
      const res = rls.updateProfileRole('usr-student-1', 'usr-student-1', 'admin');
      expect(res.success).toBe(false);
      expect(res.error).toContain('Only admins can change user roles');
    });

    it('allows admins to change user roles', () => {
      const res = rls.updateProfileRole('usr-admin-1', 'usr-student-1', 'editor');
      expect(res.success).toBe(true);
      const updated = rls.selectProfiles('usr-admin-1').find((p) => p.id === 'usr-student-1');
      expect(updated?.role).toBe('editor');
    });
  });

  describe('2. Tests Table & Content Visibility', () => {
    it('allows students to select ONLY published tests', () => {
      const tests = rls.selectTests('usr-student-1');
      expect(tests.length).toBe(1);
      expect(tests[0].id).toBe('t-pub-1');
      expect(tests[0].status).toBe('published');
    });

    it('hides draft and archived tests from student accounts', () => {
      const tests = rls.selectTests('usr-student-1');
      const hasDraft = tests.some((t) => t.status === 'draft');
      const hasArchived = tests.some((t) => t.status === 'archived');
      expect(hasDraft).toBe(false);
      expect(hasArchived).toBe(false);
    });

    it('allows editors and admins to view draft and archived tests', () => {
      const editorTests = rls.selectTests('usr-editor-1');
      const adminTests = rls.selectTests('usr-admin-1');
      expect(editorTests.length).toBe(3);
      expect(adminTests.length).toBe(3);
    });

    it('blocks students from inserting new tests', () => {
      const newTest: TestEntity = {
        id: 't-hacker-1',
        title: 'Hacked Test',
        skill: 'reading',
        type: 'academic',
        status: 'published',
        difficulty: 'exam_standard',
        duration_minutes: 60,
        total_questions: 40,
        version: 1,
        created_at: '2026-01-01',
        updated_at: '2026-01-01',
      };
      const res = rls.insertTest('usr-student-1', newTest);
      expect(res.success).toBe(false);
      expect(res.error).toContain('Insufficient permissions');
    });

    it('allows editors to create tests but blocks them from deleting tests', () => {
      const newTest: TestEntity = {
        id: 't-ed-1',
        title: 'Editor Test',
        skill: 'writing',
        type: 'academic',
        status: 'draft',
        difficulty: 'exam_standard',
        duration_minutes: 60,
        total_questions: 2,
        version: 1,
        created_at: '2026-01-01',
        updated_at: '2026-01-01',
      };
      const insertRes = rls.insertTest('usr-editor-1', newTest);
      expect(insertRes.success).toBe(true);

      const deleteRes = rls.deleteTest('usr-editor-1', 't-ed-1');
      expect(deleteRes.success).toBe(false);
      expect(deleteRes.error).toContain('Only admins can delete tests');
    });

    it('allows admins to delete tests', () => {
      const res = rls.deleteTest('usr-admin-1', 't-pub-1');
      expect(res.success).toBe(true);
      const remaining = rls.selectTests('usr-admin-1');
      expect(remaining.some((t) => t.id === 't-pub-1')).toBe(false);
    });
  });

  describe('3. Student Attempts Personal Data Isolation', () => {
    it('prevents Student A from viewing Student B attempts', () => {
      const student1Attempts = rls.selectAttempts('usr-student-1');
      expect(student1Attempts.length).toBe(1);
      expect(student1Attempts[0].id).toBe('att-1');
      expect(student1Attempts[0].user_id).toBe('usr-student-1');

      const student2Attempts = rls.selectAttempts('usr-student-2');
      expect(student2Attempts.length).toBe(1);
      expect(student2Attempts[0].id).toBe('att-2');
    });

    it('allows admins to view aggregated attempts across all students for analytics', () => {
      const adminAttempts = rls.selectAttempts('usr-admin-1');
      expect(adminAttempts.length).toBe(2);
    });
  });

  describe('4. AI Secrets & Provider Configuration Isolation', () => {
    it('blocks any browser client from directly reading the ai_providers table', () => {
      const res = rls.selectAIProviders(true);
      expect(res.data?.length).toBe(0);
      expect(res.error).toContain('Permission denied');
    });

    it('allows server-side service role execution to read provider credentials', () => {
      const res = rls.selectAIProviders(false);
      expect(res.data?.length).toBe(1);
      expect(res.data?.[0].provider_name).toBe('gemini');
    });
  });

  describe('5. Feature Flags & Communication RLS', () => {
    it('exposes only client_visible=true feature flags to students', () => {
      const studentFlags = rls.selectFeatureFlags('usr-student-1');
      expect(studentFlags.length).toBe(1);
      expect(studentFlags[0].key).toBe('speaking_ai_eval');
      expect(studentFlags.some((f) => f.key === 'admin_beta_analytics')).toBe(false);
    });

    it('exposes all feature flags to administrators', () => {
      const adminFlags = rls.selectFeatureFlags('usr-admin-1');
      expect(adminFlags.length).toBe(2);
    });

    it('denies students access to the administrative feedback inbox', () => {
      const studentFeedback = rls.selectFeedback('usr-student-1');
      expect(studentFeedback.length).toBe(0);

      const adminFeedback = rls.selectFeedback('usr-admin-1');
      expect(adminFeedback.length).toBe(1);
      expect(adminFeedback[0].message).toBe('Typo in Question 4');
    });
  });
});
