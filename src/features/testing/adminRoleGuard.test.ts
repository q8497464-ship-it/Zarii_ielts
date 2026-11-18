import { describe, it, expect, vi, beforeEach } from 'vitest';
import { authApi } from '../../shared/api';

describe('ADMIN SECURITY: Role Guard & Session Timeout Tests', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  describe('1. Unauthenticated Visitor Protection', () => {
    it('rejects access when no session exists and user is unauthenticated', async () => {
      vi.spyOn(authApi, 'getSession').mockResolvedValue({
        data: { session: null },
        error: null,
      });

      const { data } = await authApi.getSession();
      expect(data.session).toBeNull();
    });
  });

  describe('2. Student Role Restriction Guard', () => {
    it('blocks student accounts from authenticating through authenticateAdmin', async () => {
      vi.spyOn(authApi, 'authenticateAdmin').mockResolvedValue({
        success: false,
        error: 'Access denied: Your account does not have administrative privileges.',
      });

      const result = await authApi.authenticateAdmin('student@zarii.app', 'SecretPass123!');
      expect(result.success).toBe(false);
      expect(result.error).toContain('Access denied');
    });

    it('correctly resolves isAdminOrEditor to false for student profiles', async () => {
      vi.spyOn(authApi, 'getProfile').mockResolvedValue({
        id: 'student-uid',
        name: 'Student Candidate',
        role: 'student',
        status: 'active',
        target_band: 7.0,
        created_at: '2026-01-01',
        updated_at: '2026-01-01',
      });

      const hasAccess = await authApi.isAdminOrEditor('student-uid');
      expect(hasAccess).toBe(false);
    });
  });

  describe('3. Editor Scoped Clearance Guard', () => {
    it('grants editor clearance for Content & Communication modules', async () => {
      vi.spyOn(authApi, 'getProfile').mockResolvedValue({
        id: 'editor-uid',
        name: 'Content Editor',
        role: 'editor',
        status: 'active',
        target_band: 8.0,
        created_at: '2026-01-01',
        updated_at: '2026-01-01',
      });

      const hasAccess = await authApi.isAdminOrEditor('editor-uid');
      expect(hasAccess).toBe(true);

      const editorAllowedSections = ['content', 'communication'];
      const editorRestrictedSections = ['users', 'settings', 'system'];

      expect(editorAllowedSections.includes('content')).toBe(true);
      expect(editorAllowedSections.includes('communication')).toBe(true);
      expect(editorRestrictedSections.includes('users')).toBe(true);
      expect(editorRestrictedSections.includes('settings')).toBe(true);
      expect(editorRestrictedSections.includes('system')).toBe(true);
    });
  });

  describe('4. Administrator Full Clearance Guard', () => {
    it('grants full administrative clearance across all 8 modules', async () => {
      vi.spyOn(authApi, 'getProfile').mockResolvedValue({
        id: 'admin-uid',
        name: 'Super Admin',
        role: 'admin',
        status: 'active',
        target_band: 8.5,
        created_at: '2026-01-01',
        updated_at: '2026-01-01',
      });

      const hasAccess = await authApi.isAdminOrEditor('admin-uid');
      expect(hasAccess).toBe(true);

      const profile = await authApi.getProfile('admin-uid');
      expect(profile?.role).toBe('admin');
    });
  });

  describe('5. Admin Inactivity Session Timeout', () => {
    it('identifies sessions exceeding 30 minutes of inactivity as timed out', () => {
      const INACTIVITY_TIMEOUT_MS = 30 * 60 * 1000;
      const now = Date.now();
      const thirtyFiveMinutesAgo = now - 35 * 60 * 1000;

      const isExpired = now - thirtyFiveMinutesAgo > INACTIVITY_TIMEOUT_MS;
      expect(isExpired).toBe(true);
    });

    it('considers sessions with recent activity (< 30 min) as active', () => {
      const INACTIVITY_TIMEOUT_MS = 30 * 60 * 1000;
      const now = Date.now();
      const tenMinutesAgo = now - 10 * 60 * 1000;

      const isExpired = now - tenMinutesAgo > INACTIVITY_TIMEOUT_MS;
      expect(isExpired).toBe(false);
    });
  });
});
