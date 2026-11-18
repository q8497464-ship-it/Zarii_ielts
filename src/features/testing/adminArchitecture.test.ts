import { describe, it, expect, beforeEach } from 'vitest';
import fs from 'fs';
import path from 'path';
import { authApi, contentApi, attemptsApi, adminApi } from '../../shared/api';
import { BRAND_TOKENS } from '../../shared/tokens';

describe('Admin Architecture, Backend & Roles Specification', () => {
  describe('File & Directory Structure Separation', () => {
    it('verifies existence of src/apps/student and src/apps/admin', () => {
      const studentDir = path.resolve(process.cwd(), 'src/apps/student');
      const adminDir = path.resolve(process.cwd(), 'src/apps/admin');
      const sharedDir = path.resolve(process.cwd(), 'src/shared');

      expect(fs.existsSync(studentDir)).toBe(true);
      expect(fs.existsSync(adminDir)).toBe(true);
      expect(fs.existsSync(sharedDir)).toBe(true);
    });

    it('verifies existence of SQL migration files with complete RLS', () => {
      const migration1 = path.resolve(process.cwd(), 'supabase/migrations/20261118000001_initial_schema.sql');
      const migration2 = path.resolve(process.cwd(), 'supabase/migrations/20261118000002_row_level_security.sql');
      const migration3 = path.resolve(process.cwd(), 'supabase/migrations/20261118000003_seed_data.sql');

      expect(fs.existsSync(migration1)).toBe(true);
      expect(fs.existsSync(migration2)).toBe(true);
      expect(fs.existsSync(migration3)).toBe(true);
    });

    it('verifies the 19 core tables in the schema migration', () => {
      const schemaSql = fs.readFileSync(
        path.resolve(process.cwd(), 'supabase/migrations/20261118000001_initial_schema.sql'),
        'utf8'
      );

      const expectedTables = [
        'profiles',
        'tests',
        'sections',
        'passages',
        'questions',
        'writing_prompts',
        'speaking_cards',
        'vocab_words',
        'grammar_lessons',
        'media_assets',
        'attempts',
        'writing_submissions',
        'speaking_sessions',
        'announcements',
        'feedback',
        'settings',
        'feature_flags',
        'ai_providers',
        'ai_usage_log',
        'audit_log',
      ];

      for (const table of expectedTables) {
        expect(schemaSql).toContain(`CREATE TABLE IF NOT EXISTS public.${table}`);
      }
    });

    it('verifies Row Level Security is enabled on every table in the RLS migration', () => {
      const rlsSql = fs.readFileSync(
        path.resolve(process.cwd(), 'supabase/migrations/20261118000002_row_level_security.sql'),
        'utf8'
      );

      const expectedTables = [
        'profiles',
        'tests',
        'sections',
        'passages',
        'questions',
        'writing_prompts',
        'speaking_cards',
        'vocab_words',
        'grammar_lessons',
        'media_assets',
        'attempts',
        'writing_submissions',
        'speaking_sessions',
        'announcements',
        'feedback',
        'settings',
        'feature_flags',
        'ai_providers',
        'ai_usage_log',
        'audit_log',
      ];

      for (const table of expectedTables) {
        expect(rlsSql).toContain(`ALTER TABLE public.${table} ENABLE ROW LEVEL SECURITY;`);
      }
    });

    it('verifies strict isolation policy protecting AI secrets from browser clients', () => {
      const rlsSql = fs.readFileSync(
        path.resolve(process.cwd(), 'supabase/migrations/20261118000002_row_level_security.sql'),
        'utf8'
      );

      expect(rlsSql).toContain('ai_providers_no_browser_access');
      expect(rlsSql).toContain('USING (false)');
    });

    it('verifies seed script and .env.example template', () => {
      const seedScript = path.resolve(process.cwd(), 'scripts/seed-first-admin.js');
      const envExample = path.resolve(process.cwd(), '.env.example');

      expect(fs.existsSync(seedScript)).toBe(true);
      expect(fs.existsSync(envExample)).toBe(true);

      const envContent = fs.readFileSync(envExample, 'utf8');
      expect(envContent).toContain('VITE_SUPABASE_URL');
      expect(envContent).toContain('VITE_SUPABASE_ANON_KEY');
      expect(envContent).toContain('ADMIN_EMAIL');
    });
  });

  describe('Typed API Layer', () => {
    it('provides unified authApi operations', () => {
      expect(typeof authApi.signIn).toBe('function');
      expect(typeof authApi.signUp).toBe('function');
      expect(typeof authApi.signOut).toBe('function');
      expect(typeof authApi.authenticateAdmin).toBe('function');
      expect(typeof authApi.getProfile).toBe('function');
      expect(typeof authApi.isAdminOrEditor).toBe('function');
    });

    it('provides contentApi operations with offline resilience', () => {
      expect(typeof contentApi.getTests).toBe('function');
      expect(typeof contentApi.getVocabWords).toBe('function');
      expect(typeof contentApi.getGrammarLessons).toBe('function');
      expect(typeof contentApi.getWritingPrompts).toBe('function');
      expect(typeof contentApi.getSpeakingCards).toBe('function');
    });

    it('provides attemptsApi operations for persistence', () => {
      expect(typeof attemptsApi.saveAttempt).toBe('function');
      expect(typeof attemptsApi.saveWritingSubmission).toBe('function');
      expect(typeof attemptsApi.saveSpeakingSession).toBe('function');
    });

    it('provides adminApi operations', () => {
      expect(typeof adminApi.getProfiles).toBe('function');
      expect(typeof adminApi.updateUserRole).toBe('function');
      expect(typeof adminApi.getAuditLogs).toBe('function');
      expect(typeof adminApi.getSettings).toBe('function');
      expect(typeof adminApi.getFeatureFlags).toBe('function');
    });
  });

  describe('Brand Tokens', () => {
    it('defines primary brand colors matching specifications', () => {
      expect(BRAND_TOKENS.colors.primary).toBe('#124F40');
      expect(BRAND_TOKENS.colors.accent).toBe('#5BB78D');
      expect(BRAND_TOKENS.colors.bgPageLight).toBe('#F7FAF8');
      expect(BRAND_TOKENS.colors.bgPageDark).toBe('#0B1612');
      expect(BRAND_TOKENS.colors.surfaceCardDark).toBe('#112019');
    });
  });
});
