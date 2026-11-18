-- ====================================================================
-- Migration: 20261118000003_seed_data.sql
-- Description: Default Settings, Feature Flags & Seed Records
-- ====================================================================

-- 1. DEFAULT PLATFORM SETTINGS
INSERT INTO public.settings (key, value, description)
VALUES
  ('exam_durations', '{"reading_minutes": 60, "listening_minutes": 32, "writing_minutes": 60, "speaking_minutes": 15}'::jsonb, 'Default standard test timing limits'),
  ('scoring_thresholds', '{"reading_academic": {"40": 9.0, "39": 9.0, "37": 8.5, "35": 8.0, "33": 7.5, "30": 7.0, "27": 6.5, "23": 6.0, "19": 5.5, "15": 5.0}}'::jsonb, 'Standard IELTS official band calculation lookup tables'),
  ('maintenance_window', '{"enabled": false, "message": "Zarii is operating normally."}'::jsonb, 'Emergency maintenance control banner'),
  ('brand_info', '{"name": "Zarii", "tagline": "IELTS preparation, made clear.", "support_email": "support@zarii.app"}'::jsonb, 'Global application branding and contacts')
ON CONFLICT (key) DO UPDATE
SET value = EXCLUDED.value,
    updated_at = now();

-- 2. FEATURE FLAGS
INSERT INTO public.feature_flags (key, name, description, enabled, rollout_percentage, client_visible)
VALUES
  ('ai_writing_feedback', 'AI Writing Evaluation', 'Enable real-time Band 9 examiner feedback for Task 1 and Task 2 essays', true, 100, true),
  ('ai_speaking_coach', 'AI Speaking Mock Examiner', 'Speech-to-text pronunciation and fluency scoring via Whisper and LLM', true, 100, true),
  ('cloud_sync', 'Cloud Progress Synchronization', 'Allows logged-in students to backup and sync exam attempts to Supabase', true, 100, true),
  ('offline_pwa', 'Offline PWA Support', 'Full computer-delivered exam simulation without active internet connection', true, 100, true),
  ('gamification', 'Streaks & Achievements', 'Daily streak counters, XP level milestones, and study badges', true, 100, true)
ON CONFLICT (key) DO UPDATE
SET enabled = EXCLUDED.enabled,
    updated_at = now();

-- 3. INITIAL PLATFORM ANNOUNCEMENTS
INSERT INTO public.announcements (title, message, type, is_active, starts_at)
VALUES
  ('Welcome to Zarii IELTS', 'Full academic and general practice materials are completely free for all students.', 'info', true, now())
ON CONFLICT DO NOTHING;
