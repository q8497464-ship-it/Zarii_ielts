import { apiSupabase } from './supabaseClient';
import type {
  Profile,
  AuditLogEntity,
  FeedbackEntity,
  SettingEntity,
  FeatureFlagEntity,
  UserRole,
} from '../types/database';

export const adminApi = {
  /**
   * Profiles list for user cohort management
   */
  async getProfiles(role?: UserRole): Promise<Profile[]> {
    try {
      const { data, error } = await apiSupabase.from<Profile>('profiles').select('*');
      if (error || !data) return [];
      return role ? data.filter((p) => p.role === role) : data;
    } catch {
      return [];
    }
  },

  /**
   * Promotes or changes user role (admin only)
   */
  async updateUserRole(userId: string, newRole: UserRole): Promise<boolean> {
    try {
      const { error } = await apiSupabase.from('profiles').update({ role: newRole, updated_at: new Date().toISOString() }, 'id', userId);
      return !error;
    } catch {
      return false;
    }
  },

  /**
   * Audit log history
   */
  async getAuditLogs(): Promise<AuditLogEntity[]> {
    try {
      const { data, error } = await apiSupabase.from<AuditLogEntity>('audit_log').select('*');
      return data || [];
    } catch {
      return [];
    }
  },

  /**
   * Log an administrative action
   */
  async logAdminAction(action: string, targetType: string, targetId: string, details?: any): Promise<void> {
    try {
      const { data: userRes } = await apiSupabase.auth.getUser();
      await apiSupabase.from('audit_log').insert({
        actor_id: userRes.user?.id || null,
        action,
        target_type: targetType,
        target_id: targetId,
        new_state: details || {},
        created_at: new Date().toISOString(),
      });
    } catch (err) {
      console.warn('Failed to record audit log:', err);
    }
  },

  /**
   * Candidate Feedback List
   */
  async getFeedback(): Promise<FeedbackEntity[]> {
    try {
      const { data, error } = await apiSupabase.from<FeedbackEntity>('feedback').select('*');
      return data || [];
    } catch {
      return [];
    }
  },

  /**
   * Settings (key-value configuration)
   */
  async getSettings(): Promise<SettingEntity[]> {
    try {
      const { data, error } = await apiSupabase.from<SettingEntity>('settings').select('*');
      return data || [];
    } catch {
      return [];
    }
  },

  async updateSetting(key: string, value: Record<string, any>): Promise<boolean> {
    try {
      const { error } = await apiSupabase.from('settings').update({ value, updated_at: new Date().toISOString() }, 'key', key);
      return !error;
    } catch {
      return false;
    }
  },

  /**
   * Feature Flags
   */
  async getFeatureFlags(): Promise<FeatureFlagEntity[]> {
    try {
      const { data, error } = await apiSupabase.from<FeatureFlagEntity>('feature_flags').select('*');
      return data || [];
    } catch {
      return [];
    }
  },

  async toggleFeatureFlag(key: string, enabled: boolean): Promise<boolean> {
    try {
      const { error } = await apiSupabase.from('feature_flags').update({ enabled, updated_at: new Date().toISOString() }, 'key', key);
      return !error;
    } catch {
      return false;
    }
  },
};
