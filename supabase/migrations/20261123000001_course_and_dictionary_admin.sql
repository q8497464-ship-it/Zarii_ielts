-- ====================================================================
-- Migration: 20261123000001_course_and_dictionary_admin.sql
-- Description: Course Manager, Dictionary Manager, Patches, Reports, and RLS
-- ====================================================================

-- 1. COURSE LESSONS TABLE
CREATE TABLE IF NOT EXISTS public.course_lessons (
  id TEXT PRIMARY KEY,
  level TEXT NOT NULL CHECK (level IN ('A1', 'A2', 'B1', 'B2', 'C1')),
  unit_id TEXT NOT NULL,
  order_index INTEGER NOT NULL DEFAULT 1,
  title TEXT NOT NULL,
  description TEXT,
  objectives JSONB NOT NULL DEFAULT '[]'::jsonb,
  estimated_minutes INTEGER NOT NULL DEFAULT 15,
  prerequisites JSONB NOT NULL DEFAULT '[]'::jsonb,
  skill_tags JSONB NOT NULL DEFAULT '[]'::jsonb,
  vocabulary_list JSONB NOT NULL DEFAULT '[]'::jsonb,
  sections JSONB NOT NULL DEFAULT '[]'::jsonb,
  status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'archived')),
  version INTEGER NOT NULL DEFAULT 1,
  created_by TEXT REFERENCES public.profiles(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- Indexing for fast lookups
CREATE INDEX IF NOT EXISTS idx_course_lessons_level_unit ON public.course_lessons(level, unit_id, order_index);
CREATE INDEX IF NOT EXISTS idx_course_lessons_status ON public.course_lessons(status);

-- 2. DICTIONARY PATCHES TABLE
CREATE TABLE IF NOT EXISTS public.dictionary_patches (
  id TEXT PRIMARY KEY,
  headword TEXT NOT NULL,
  pos TEXT,
  action TEXT NOT NULL CHECK (action IN ('add', 'edit', 'hide')),
  urdu_meaning TEXT,
  urdu_notes TEXT,
  senses JSONB DEFAULT '[]'::jsonb,
  pronunciation_override JSONB,
  level_override TEXT,
  needs_review BOOLEAN NOT NULL DEFAULT false,
  status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'archived')),
  version INTEGER NOT NULL DEFAULT 1,
  is_official BOOLEAN NOT NULL DEFAULT true,
  created_by TEXT REFERENCES public.profiles(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

CREATE INDEX IF NOT EXISTS idx_dictionary_patches_headword ON public.dictionary_patches(headword);
CREATE INDEX IF NOT EXISTS idx_dictionary_patches_status ON public.dictionary_patches(status);

-- 3. DICTIONARY REPORTS TABLE (Student feedback on words)
CREATE TABLE IF NOT EXISTS public.dictionary_reports (
  id TEXT PRIMARY KEY,
  word TEXT NOT NULL,
  category TEXT NOT NULL CHECK (category IN ('definition', 'pronunciation', 'offensive', 'other')),
  details TEXT,
  user_id TEXT REFERENCES public.profiles(id) ON DELETE SET NULL,
  user_email TEXT,
  status TEXT NOT NULL DEFAULT 'new' CHECK (status IN ('new', 'in_review', 'resolved', 'ignored')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
  resolved_at TIMESTAMPTZ
);

CREATE INDEX IF NOT EXISTS idx_dictionary_reports_status ON public.dictionary_reports(status);
CREATE INDEX IF NOT EXISTS idx_dictionary_reports_word ON public.dictionary_reports(word);

-- 4. ENABLE ROW LEVEL SECURITY
ALTER TABLE public.course_lessons ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.dictionary_patches ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.dictionary_reports ENABLE ROW LEVEL SECURITY;

-- 5. COURSE LESSONS POLICIES
-- Students can ONLY view published lessons
CREATE POLICY "course_lessons_select_published"
  ON public.course_lessons FOR SELECT
  USING (
    status = 'published'
    OR public.is_admin_or_editor()
  );

-- Only Admins and Editors can create, update, or delete lessons
CREATE POLICY "course_lessons_write_admin_editor"
  ON public.course_lessons FOR INSERT
  WITH CHECK (public.is_admin_or_editor());

CREATE POLICY "course_lessons_update_admin_editor"
  ON public.course_lessons FOR UPDATE
  USING (public.is_admin_or_editor());

CREATE POLICY "course_lessons_delete_admin_editor"
  ON public.course_lessons FOR DELETE
  USING (public.is_admin());

-- 6. DICTIONARY PATCHES POLICIES
-- Students can ONLY view published patches
CREATE POLICY "dictionary_patches_select_published"
  ON public.dictionary_patches FOR SELECT
  USING (
    status = 'published'
    OR public.is_admin_or_editor()
  );

CREATE POLICY "dictionary_patches_write_admin_editor"
  ON public.dictionary_patches FOR INSERT
  WITH CHECK (public.is_admin_or_editor());

CREATE POLICY "dictionary_patches_update_admin_editor"
  ON public.dictionary_patches FOR UPDATE
  USING (public.is_admin_or_editor());

CREATE POLICY "dictionary_patches_delete_admin"
  ON public.dictionary_patches FOR DELETE
  USING (public.is_admin());

-- 7. DICTIONARY REPORTS POLICIES
-- Any authenticated or anonymous candidate can submit a report
CREATE POLICY "dictionary_reports_insert_student"
  ON public.dictionary_reports FOR INSERT
  WITH CHECK (true);

-- Only Admins and Editors can read and manage reported problems
CREATE POLICY "dictionary_reports_select_admin_editor"
  ON public.dictionary_reports FOR SELECT
  USING (public.is_admin_or_editor());

CREATE POLICY "dictionary_reports_update_admin_editor"
  ON public.dictionary_reports FOR UPDATE
  USING (public.is_admin_or_editor());

CREATE POLICY "dictionary_reports_delete_admin"
  ON public.dictionary_reports FOR DELETE
  USING (public.is_admin());
