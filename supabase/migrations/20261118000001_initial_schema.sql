-- ====================================================================
-- Migration: 20261118000001_initial_schema.sql
-- Description: Core Schema for Zarii IELTS Platform
-- Applications: Student Workspace & Admin Portal
-- Architecture: Supabase Postgres (Free Tier Compatible)
-- ====================================================================

-- 1. EXTENSIONS
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- 2. ENUMS & DOMAINS
DO $$ BEGIN
  CREATE TYPE public.user_role AS ENUM ('student', 'admin', 'editor');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
  CREATE TYPE public.content_status AS ENUM ('draft', 'published', 'archived');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
  CREATE TYPE public.difficulty_level AS ENUM ('beginner', 'intermediate', 'advanced', 'exam_standard');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
  CREATE TYPE public.test_type AS ENUM ('academic', 'general', 'diagnostic', 'sectional');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
  CREATE TYPE public.skill_type AS ENUM ('reading', 'listening', 'writing', 'speaking', 'full');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
  CREATE TYPE public.task_type AS ENUM ('task1_academic', 'task1_general', 'task2');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
  CREATE TYPE public.announcement_type AS ENUM ('info', 'update', 'maintenance', 'tip');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
  CREATE TYPE public.feedback_status AS ENUM ('new', 'reviewed', 'resolved', 'ignored');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

-- ====================================================================
-- 3. PROFILES TABLE (Linked to auth.users)
-- ====================================================================
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT,
  role public.user_role NOT NULL DEFAULT 'student',
  status TEXT NOT NULL DEFAULT 'active',
  target_band NUMERIC(2,1) DEFAULT 7.5,
  avatar_url TEXT,
  metadata JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_profiles_role ON public.profiles(role);
CREATE INDEX IF NOT EXISTS idx_profiles_status ON public.profiles(status);

-- ====================================================================
-- 4. CONTENT TABLES (Tests, Sections, Passages, Questions)
-- ====================================================================

-- Tests (Reading, Listening, Writing, Speaking, Mock Exams)
CREATE TABLE IF NOT EXISTS public.tests (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  type public.test_type NOT NULL DEFAULT 'academic',
  skill public.skill_type NOT NULL,
  status public.content_status NOT NULL DEFAULT 'draft',
  difficulty public.difficulty_level NOT NULL DEFAULT 'exam_standard',
  topic TEXT,
  band_level NUMERIC(2,1),
  version INT NOT NULL DEFAULT 1,
  duration_minutes INT DEFAULT 60,
  total_questions INT DEFAULT 40,
  metadata JSONB DEFAULT '{}'::jsonb,
  created_by UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_tests_skill_status ON public.tests(skill, status);
CREATE INDEX IF NOT EXISTS idx_tests_type ON public.tests(type);

-- Sections (e.g. Listening Part 1-4, Reading Passage 1-3)
CREATE TABLE IF NOT EXISTS public.sections (
  id TEXT PRIMARY KEY,
  test_id TEXT NOT NULL REFERENCES public.tests(id) ON DELETE CASCADE,
  section_number INT NOT NULL,
  title TEXT,
  instructions TEXT,
  audio_url TEXT,
  duration_seconds INT,
  status public.content_status NOT NULL DEFAULT 'draft',
  version INT NOT NULL DEFAULT 1,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_sections_test ON public.sections(test_id, section_number);

-- Passages (Reading passages with title, subheadings, text)
CREATE TABLE IF NOT EXISTS public.passages (
  id TEXT PRIMARY KEY,
  test_id TEXT NOT NULL REFERENCES public.tests(id) ON DELETE CASCADE,
  section_id TEXT REFERENCES public.sections(id) ON DELETE CASCADE,
  passage_number INT NOT NULL,
  title TEXT NOT NULL,
  subheading TEXT,
  content TEXT NOT NULL,
  status public.content_status NOT NULL DEFAULT 'draft',
  difficulty public.difficulty_level NOT NULL DEFAULT 'exam_standard',
  topic TEXT,
  band_level NUMERIC(2,1),
  version INT NOT NULL DEFAULT 1,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_passages_test ON public.passages(test_id, passage_number);

-- Questions (Reading & Listening Questions, Seeded Shuffling Support)
CREATE TABLE IF NOT EXISTS public.questions (
  id TEXT PRIMARY KEY,
  test_id TEXT NOT NULL REFERENCES public.tests(id) ON DELETE CASCADE,
  section_id TEXT REFERENCES public.sections(id) ON DELETE SET NULL,
  passage_id TEXT REFERENCES public.passages(id) ON DELETE SET NULL,
  question_number INT NOT NULL,
  type TEXT NOT NULL,
  prompt TEXT NOT NULL,
  options JSONB DEFAULT '[]'::jsonb,
  correct_answer TEXT NOT NULL,
  explanation TEXT,
  difficulty public.difficulty_level NOT NULL DEFAULT 'exam_standard',
  topic TEXT,
  band_level NUMERIC(2,1),
  status public.content_status NOT NULL DEFAULT 'draft',
  version INT NOT NULL DEFAULT 1,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_questions_test ON public.questions(test_id, question_number);
CREATE INDEX IF NOT EXISTS idx_questions_passage ON public.questions(passage_id);

-- ====================================================================
-- 5. SKILL SPECIFIC CONTENT (Writing, Speaking, Vocab, Grammar)
-- ====================================================================

-- Writing Prompts (Task 1 & Task 2)
CREATE TABLE IF NOT EXISTS public.writing_prompts (
  id TEXT PRIMARY KEY,
  task_type public.task_type NOT NULL,
  title TEXT NOT NULL,
  prompt_text TEXT NOT NULL,
  image_url TEXT,
  min_words INT DEFAULT 150,
  recommended_minutes INT DEFAULT 20,
  sample_essay_band9 TEXT,
  status public.content_status NOT NULL DEFAULT 'draft',
  difficulty public.difficulty_level NOT NULL DEFAULT 'exam_standard',
  topic TEXT,
  band_level NUMERIC(2,1),
  version INT NOT NULL DEFAULT 1,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_writing_prompts_type ON public.writing_prompts(task_type, status);

-- Speaking Cards (Part 1, 2, 3 Cue Cards & Follow-ups)
CREATE TABLE IF NOT EXISTS public.speaking_cards (
  id TEXT PRIMARY KEY,
  part INT NOT NULL CHECK (part IN (1, 2, 3)),
  topic TEXT NOT NULL,
  cue_card_title TEXT,
  prompts JSONB NOT NULL DEFAULT '[]'::jsonb,
  preparation_time_seconds INT DEFAULT 60,
  speaking_time_seconds INT DEFAULT 120,
  model_answer TEXT,
  status public.content_status NOT NULL DEFAULT 'draft',
  difficulty public.difficulty_level NOT NULL DEFAULT 'exam_standard',
  band_level NUMERIC(2,1),
  version INT NOT NULL DEFAULT 1,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_speaking_cards_part ON public.speaking_cards(part, status);

-- Vocabulary Words (Academic Word List with Urdu translations & collocations)
CREATE TABLE IF NOT EXISTS public.vocab_words (
  id TEXT PRIMARY KEY,
  word TEXT NOT NULL UNIQUE,
  phonetic TEXT,
  part_of_speech TEXT,
  definition TEXT NOT NULL,
  urdu_meaning TEXT,
  collocations JSONB DEFAULT '[]'::jsonb,
  synonyms JSONB DEFAULT '[]'::jsonb,
  antonyms JSONB DEFAULT '[]'::jsonb,
  example_sentence TEXT,
  academic_band NUMERIC(2,1) DEFAULT 7.0,
  topic TEXT,
  status public.content_status NOT NULL DEFAULT 'published',
  version INT NOT NULL DEFAULT 1,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_vocab_words_word ON public.vocab_words(word);
CREATE INDEX IF NOT EXISTS idx_vocab_words_band ON public.vocab_words(academic_band);

-- Grammar Lessons (Interactive lessons with Markdown & mini-quizzes)
CREATE TABLE IF NOT EXISTS public.grammar_lessons (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  category TEXT NOT NULL,
  summary TEXT,
  content_markdown TEXT NOT NULL,
  quiz_questions JSONB DEFAULT '[]'::jsonb,
  status public.content_status NOT NULL DEFAULT 'published',
  difficulty public.difficulty_level NOT NULL DEFAULT 'intermediate',
  band_level NUMERIC(2,1),
  version INT NOT NULL DEFAULT 1,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_grammar_lessons_slug ON public.grammar_lessons(slug);

-- ====================================================================
-- 6. MEDIA ASSETS
-- ====================================================================
CREATE TABLE IF NOT EXISTS public.media_assets (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  file_name TEXT NOT NULL,
  file_type TEXT NOT NULL,
  file_size_bytes BIGINT,
  storage_path TEXT NOT NULL,
  public_url TEXT,
  uploaded_by UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_media_assets_path ON public.media_assets(storage_path);

-- ====================================================================
-- 7. STUDENT CLOUD SYNC TABLES (Attempts, Writing, Speaking)
-- ====================================================================

-- Exam Attempts (Reading, Listening, Diagnostic, Mocks)
CREATE TABLE IF NOT EXISTS public.attempts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  test_id TEXT NOT NULL,
  skill TEXT NOT NULL,
  mode TEXT DEFAULT 'exam',
  score NUMERIC(3,1),
  band NUMERIC(2,1),
  raw_score INT,
  total_questions INT,
  duration_seconds INT,
  shuffled_seed TEXT,
  answers JSONB DEFAULT '{}'::jsonb,
  marked_results JSONB DEFAULT '{}'::jsonb,
  completed_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  synced_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_attempts_user ON public.attempts(user_id, completed_at DESC);
CREATE INDEX IF NOT EXISTS idx_attempts_test ON public.attempts(test_id);

-- Writing Submissions & AI Evaluations
CREATE TABLE IF NOT EXISTS public.writing_submissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  prompt_id TEXT NOT NULL,
  essay_text TEXT NOT NULL,
  word_count INT NOT NULL,
  task_type TEXT NOT NULL,
  estimated_band NUMERIC(2,1),
  criteria_scores JSONB DEFAULT '{}'::jsonb,
  ai_feedback JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_writing_submissions_user ON public.writing_submissions(user_id, created_at DESC);

-- Speaking Sessions & Audio Records
CREATE TABLE IF NOT EXISTS public.speaking_sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  part INT NOT NULL,
  topic TEXT,
  audio_storage_path TEXT,
  transcription TEXT,
  estimated_band NUMERIC(2,1),
  criteria_scores JSONB DEFAULT '{}'::jsonb,
  ai_feedback JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_speaking_sessions_user ON public.speaking_sessions(user_id, created_at DESC);

-- ====================================================================
-- 8. PLATFORM MANAGEMENT (Announcements, Feedback, Settings, Feature Flags)
-- ====================================================================

-- Announcements & Global Banners
CREATE TABLE IF NOT EXISTS public.announcements (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  type public.announcement_type NOT NULL DEFAULT 'info',
  is_active BOOLEAN NOT NULL DEFAULT true,
  starts_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  expires_at TIMESTAMPTZ,
  created_by UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_announcements_active ON public.announcements(is_active, starts_at);

-- Student Feedback & Bug Reports
CREATE TABLE IF NOT EXISTS public.feedback (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  category TEXT NOT NULL,
  message TEXT NOT NULL,
  rating INT,
  user_email TEXT,
  status public.feedback_status NOT NULL DEFAULT 'new',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_feedback_status ON public.feedback(status);

-- Global Settings (Key/Value JSON Configuration)
CREATE TABLE IF NOT EXISTS public.settings (
  key TEXT PRIMARY KEY,
  value JSONB NOT NULL,
  description TEXT,
  updated_by UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Feature Flags & Controlled Rollouts
CREATE TABLE IF NOT EXISTS public.feature_flags (
  key TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  enabled BOOLEAN NOT NULL DEFAULT false,
  rollout_percentage INT DEFAULT 0,
  client_visible BOOLEAN NOT NULL DEFAULT true,
  updated_by UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ====================================================================
-- 9. AI PROVIDERS & USAGE TELEMETRY (Protected API Keys)
-- ====================================================================

-- AI Provider Configurations & API Keys (Encrypted / Secret)
CREATE TABLE IF NOT EXISTS public.ai_providers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  provider_name TEXT NOT NULL,
  api_key_encrypted TEXT NOT NULL,
  base_url TEXT,
  default_model TEXT NOT NULL,
  is_active BOOLEAN NOT NULL DEFAULT true,
  is_fallback BOOLEAN NOT NULL DEFAULT false,
  monthly_token_budget BIGINT DEFAULT 1000000,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- AI Usage Logs (Token tracking and cost metrics)
CREATE TABLE IF NOT EXISTS public.ai_usage_log (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  provider TEXT NOT NULL,
  model TEXT NOT NULL,
  task_type TEXT NOT NULL,
  tokens_input INT DEFAULT 0,
  tokens_output INT DEFAULT 0,
  cost_estimated_usd NUMERIC(8,6) DEFAULT 0,
  duration_ms INT,
  status TEXT DEFAULT 'success',
  error_message TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_ai_usage_provider ON public.ai_usage_log(provider, created_at DESC);

-- ====================================================================
-- 10. AUDIT LOG (Administrative Security Log)
-- ====================================================================
CREATE TABLE IF NOT EXISTS public.audit_log (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  actor_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  action TEXT NOT NULL,
  target_type TEXT NOT NULL,
  target_id TEXT,
  previous_state JSONB,
  new_state JSONB,
  ip_address TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_audit_log_actor ON public.audit_log(actor_id, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_audit_log_action ON public.audit_log(action);

-- ====================================================================
-- 11. AUTOMATIC PROFILE CREATION TRIGGER
-- ====================================================================
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, name, role, status, target_band)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.raw_user_meta_data->>'name', split_part(NEW.email, '@', 1)),
    'student',
    'active',
    7.5
  )
  ON CONFLICT (id) DO UPDATE
  SET name = EXCLUDED.name,
      updated_at = now();

  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
