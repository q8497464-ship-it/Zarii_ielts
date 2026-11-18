-- ====================================================================
-- Migration: 20261118000002_row_level_security.sql
-- Description: Complete Row Level Security (RLS) Policies
-- Enforces:
--  1. Students read published content and their own attempts only
--  2. Editors & Admins can create and update content
--  3. Admins manage users, settings, feature flags and audit logs
--  4. AI Secrets are strictly protected from all browser clients
-- ====================================================================

-- 1. SECURITY DEFINER HELPER FUNCTIONS
-- Using SECURITY DEFINER avoids infinite recursion loops when querying profiles from RLS policies

CREATE OR REPLACE FUNCTION public.get_auth_role()
RETURNS TEXT AS $$
DECLARE
  v_role TEXT;
BEGIN
  IF auth.uid() IS NULL THEN
    RETURN 'anon';
  END IF;

  SELECT role::TEXT INTO v_role
  FROM public.profiles
  WHERE id = auth.uid();

  RETURN COALESCE(v_role, 'student');
END;
$$ LANGUAGE plpgsql STABLE SECURITY DEFINER;

CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN AS $$
BEGIN
  RETURN (public.get_auth_role() = 'admin');
END;
$$ LANGUAGE plpgsql STABLE SECURITY DEFINER;

CREATE OR REPLACE FUNCTION public.is_admin_or_editor()
RETURNS BOOLEAN AS $$
BEGIN
  RETURN (public.get_auth_role() IN ('admin', 'editor'));
END;
$$ LANGUAGE plpgsql STABLE SECURITY DEFINER;

-- ====================================================================
-- 2. ENABLE RLS ON ALL TABLES
-- ====================================================================
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.sections ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.passages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.writing_prompts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.speaking_cards ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.vocab_words ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.grammar_lessons ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.media_assets ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.attempts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.writing_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.speaking_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.announcements ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.feedback ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.feature_flags ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ai_providers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ai_usage_log ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.audit_log ENABLE ROW LEVEL SECURITY;

-- ====================================================================
-- 3. PROFILES POLICIES
-- ====================================================================
-- Users can view their own profile; admins & editors can view all profiles
CREATE POLICY "profiles_select_policy"
  ON public.profiles FOR SELECT
  USING (
    auth.uid() = id
    OR public.is_admin_or_editor()
  );

-- Users can update their own personal info (name, target_band); admins can update any profile (including roles)
CREATE POLICY "profiles_update_self"
  ON public.profiles FOR UPDATE
  USING (
    auth.uid() = id
    OR public.is_admin()
  )
  WITH CHECK (
    -- Only admins can change a profile's role or status
    CASE
      WHEN public.is_admin() THEN true
      ELSE (
        role = (SELECT p.role FROM public.profiles p WHERE p.id = auth.uid())
        AND status = (SELECT p.status FROM public.profiles p WHERE p.id = auth.uid())
      )
    END
  );

-- Only admins can delete profiles
CREATE POLICY "profiles_delete_admin"
  ON public.profiles FOR DELETE
  USING (public.is_admin());

-- ====================================================================
-- 4. CONTENT POLICIES (Tests, Sections, Passages, Questions)
-- ====================================================================

-- Tests
CREATE POLICY "tests_select_published"
  ON public.tests FOR SELECT
  USING (
    status = 'published'
    OR public.is_admin_or_editor()
  );

CREATE POLICY "tests_write_admin_editor"
  ON public.tests FOR INSERT
  WITH CHECK (public.is_admin_or_editor());

CREATE POLICY "tests_update_admin_editor"
  ON public.tests FOR UPDATE
  USING (public.is_admin_or_editor())
  WITH CHECK (public.is_admin_or_editor());

CREATE POLICY "tests_delete_admin"
  ON public.tests FOR DELETE
  USING (public.is_admin());

-- Sections
CREATE POLICY "sections_select_published"
  ON public.sections FOR SELECT
  USING (
    status = 'published'
    OR public.is_admin_or_editor()
  );

CREATE POLICY "sections_write_admin_editor"
  ON public.sections FOR INSERT
  WITH CHECK (public.is_admin_or_editor());

CREATE POLICY "sections_update_admin_editor"
  ON public.sections FOR UPDATE
  USING (public.is_admin_or_editor())
  WITH CHECK (public.is_admin_or_editor());

CREATE POLICY "sections_delete_admin_editor"
  ON public.sections FOR DELETE
  USING (public.is_admin_or_editor());

-- Passages
CREATE POLICY "passages_select_published"
  ON public.passages FOR SELECT
  USING (
    status = 'published'
    OR public.is_admin_or_editor()
  );

CREATE POLICY "passages_write_admin_editor"
  ON public.passages FOR INSERT
  WITH CHECK (public.is_admin_or_editor());

CREATE POLICY "passages_update_admin_editor"
  ON public.passages FOR UPDATE
  USING (public.is_admin_or_editor())
  WITH CHECK (public.is_admin_or_editor());

CREATE POLICY "passages_delete_admin_editor"
  ON public.passages FOR DELETE
  USING (public.is_admin_or_editor());

-- Questions
CREATE POLICY "questions_select_published"
  ON public.questions FOR SELECT
  USING (
    status = 'published'
    OR public.is_admin_or_editor()
  );

CREATE POLICY "questions_write_admin_editor"
  ON public.questions FOR INSERT
  WITH CHECK (public.is_admin_or_editor());

CREATE POLICY "questions_update_admin_editor"
  ON public.questions FOR UPDATE
  USING (public.is_admin_or_editor())
  WITH CHECK (public.is_admin_or_editor());

CREATE POLICY "questions_delete_admin_editor"
  ON public.questions FOR DELETE
  USING (public.is_admin_or_editor());

-- Writing Prompts
CREATE POLICY "writing_prompts_select_published"
  ON public.writing_prompts FOR SELECT
  USING (
    status = 'published'
    OR public.is_admin_or_editor()
  );

CREATE POLICY "writing_prompts_write_admin_editor"
  ON public.writing_prompts FOR INSERT
  WITH CHECK (public.is_admin_or_editor());

CREATE POLICY "writing_prompts_update_admin_editor"
  ON public.writing_prompts FOR UPDATE
  USING (public.is_admin_or_editor())
  WITH CHECK (public.is_admin_or_editor());

CREATE POLICY "writing_prompts_delete_admin"
  ON public.writing_prompts FOR DELETE
  USING (public.is_admin());

-- Speaking Cards
CREATE POLICY "speaking_cards_select_published"
  ON public.speaking_cards FOR SELECT
  USING (
    status = 'published'
    OR public.is_admin_or_editor()
  );

CREATE POLICY "speaking_cards_write_admin_editor"
  ON public.speaking_cards FOR INSERT
  WITH CHECK (public.is_admin_or_editor());

CREATE POLICY "speaking_cards_update_admin_editor"
  ON public.speaking_cards FOR UPDATE
  USING (public.is_admin_or_editor())
  WITH CHECK (public.is_admin_or_editor());

CREATE POLICY "speaking_cards_delete_admin"
  ON public.speaking_cards FOR DELETE
  USING (public.is_admin());

-- Vocab Words
CREATE POLICY "vocab_words_select_published"
  ON public.vocab_words FOR SELECT
  USING (
    status = 'published'
    OR public.is_admin_or_editor()
  );

CREATE POLICY "vocab_words_write_admin_editor"
  ON public.vocab_words FOR INSERT
  WITH CHECK (public.is_admin_or_editor());

CREATE POLICY "vocab_words_update_admin_editor"
  ON public.vocab_words FOR UPDATE
  USING (public.is_admin_or_editor())
  WITH CHECK (public.is_admin_or_editor());

CREATE POLICY "vocab_words_delete_admin"
  ON public.vocab_words FOR DELETE
  USING (public.is_admin());

-- Grammar Lessons
CREATE POLICY "grammar_lessons_select_published"
  ON public.grammar_lessons FOR SELECT
  USING (
    status = 'published'
    OR public.is_admin_or_editor()
  );

CREATE POLICY "grammar_lessons_write_admin_editor"
  ON public.grammar_lessons FOR INSERT
  WITH CHECK (public.is_admin_or_editor());

CREATE POLICY "grammar_lessons_update_admin_editor"
  ON public.grammar_lessons FOR UPDATE
  USING (public.is_admin_or_editor())
  WITH CHECK (public.is_admin_or_editor());

CREATE POLICY "grammar_lessons_delete_admin"
  ON public.grammar_lessons FOR DELETE
  USING (public.is_admin());

-- ====================================================================
-- 5. MEDIA ASSETS POLICIES
-- ====================================================================
CREATE POLICY "media_assets_select_public"
  ON public.media_assets FOR SELECT
  USING (true);

CREATE POLICY "media_assets_write_admin_editor"
  ON public.media_assets FOR INSERT
  WITH CHECK (public.is_admin_or_editor());

CREATE POLICY "media_assets_delete_admin"
  ON public.media_assets FOR DELETE
  USING (public.is_admin());

-- ====================================================================
-- 6. STUDENT ATTEMPTS & SUBMISSIONS (Strict Personal Isolation)
-- ====================================================================

-- Attempts
CREATE POLICY "attempts_select_own"
  ON public.attempts FOR SELECT
  USING (
    auth.uid() = user_id
    OR public.is_admin()
  );

CREATE POLICY "attempts_insert_own"
  ON public.attempts FOR INSERT
  WITH CHECK (
    auth.uid() = user_id
    OR user_id IS NULL
  );

CREATE POLICY "attempts_update_own"
  ON public.attempts FOR UPDATE
  USING (
    auth.uid() = user_id
    OR public.is_admin()
  );

CREATE POLICY "attempts_delete_own"
  ON public.attempts FOR DELETE
  USING (
    auth.uid() = user_id
    OR public.is_admin()
  );

-- Writing Submissions
CREATE POLICY "writing_submissions_select_own"
  ON public.writing_submissions FOR SELECT
  USING (
    auth.uid() = user_id
    OR public.is_admin()
  );

CREATE POLICY "writing_submissions_insert_own"
  ON public.writing_submissions FOR INSERT
  WITH CHECK (
    auth.uid() = user_id
    OR user_id IS NULL
  );

CREATE POLICY "writing_submissions_delete_own"
  ON public.writing_submissions FOR DELETE
  USING (
    auth.uid() = user_id
    OR public.is_admin()
  );

-- Speaking Sessions
CREATE POLICY "speaking_sessions_select_own"
  ON public.speaking_sessions FOR SELECT
  USING (
    auth.uid() = user_id
    OR public.is_admin()
  );

CREATE POLICY "speaking_sessions_insert_own"
  ON public.speaking_sessions FOR INSERT
  WITH CHECK (
    auth.uid() = user_id
    OR user_id IS NULL
  );

CREATE POLICY "speaking_sessions_delete_own"
  ON public.speaking_sessions FOR DELETE
  USING (
    auth.uid() = user_id
    OR public.is_admin()
  );

-- ====================================================================
-- 7. ANNOUNCEMENTS & FEEDBACK
-- ====================================================================

-- Announcements
CREATE POLICY "announcements_select_active"
  ON public.announcements FOR SELECT
  USING (
    is_active = true
    OR public.is_admin()
  );

CREATE POLICY "announcements_manage_admin"
  ON public.announcements FOR ALL
  USING (public.is_admin())
  WITH CHECK (public.is_admin());

-- Feedback: Anyone can submit; only admins can review/manage
CREATE POLICY "feedback_insert_anyone"
  ON public.feedback FOR INSERT
  WITH CHECK (true);

CREATE POLICY "feedback_select_admin"
  ON public.feedback FOR SELECT
  USING (public.is_admin());

CREATE POLICY "feedback_update_admin"
  ON public.feedback FOR UPDATE
  USING (public.is_admin());

CREATE POLICY "feedback_delete_admin"
  ON public.feedback FOR DELETE
  USING (public.is_admin());

-- ====================================================================
-- 8. SETTINGS & FEATURE FLAGS
-- ====================================================================

-- Settings: readable by authenticated users; managed only by admins
CREATE POLICY "settings_select_authenticated"
  ON public.settings FOR SELECT
  USING (true);

CREATE POLICY "settings_manage_admin"
  ON public.settings FOR ALL
  USING (public.is_admin())
  WITH CHECK (public.is_admin());

-- Feature Flags: client_visible flags readable by all; full list and updates by admin
CREATE POLICY "feature_flags_select"
  ON public.feature_flags FOR SELECT
  USING (
    client_visible = true
    OR public.is_admin()
  );

CREATE POLICY "feature_flags_manage_admin"
  ON public.feature_flags FOR ALL
  USING (public.is_admin())
  WITH CHECK (public.is_admin());

-- ====================================================================
-- 9. AI SECRETS & USAGE TELEMETRY (Protected from Browser)
-- ====================================================================

-- AI Providers: API Keys must NEVER be exposed to any client browser!
-- Accessible ONLY via Supabase service_role (Edge Functions)
CREATE POLICY "ai_providers_no_browser_access"
  ON public.ai_providers FOR ALL
  USING (false);

-- AI Usage Log: Readable only by admin
CREATE POLICY "ai_usage_log_select_admin"
  ON public.ai_usage_log FOR SELECT
  USING (public.is_admin());

CREATE POLICY "ai_usage_log_insert_admin_or_service"
  ON public.ai_usage_log FOR INSERT
  WITH CHECK (public.is_admin());

-- ====================================================================
-- 10. AUDIT LOG (Admin-only access)
-- ====================================================================
CREATE POLICY "audit_log_select_admin"
  ON public.audit_log FOR SELECT
  USING (public.is_admin());

CREATE POLICY "audit_log_insert_admin_or_editor"
  ON public.audit_log FOR INSERT
  WITH CHECK (public.is_admin_or_editor());
