/**
 * Zarii IELTS - Typed Database Interfaces
 * Matches Supabase PostgreSQL Schema with RLS
 */

export type UserRole = 'student' | 'admin' | 'editor';
export type ContentStatus = 'draft' | 'published' | 'archived';
export type DifficultyLevel = 'beginner' | 'intermediate' | 'advanced' | 'exam_standard';
export type TestType = 'academic' | 'general' | 'diagnostic' | 'sectional';
export type SkillType = 'reading' | 'listening' | 'writing' | 'speaking' | 'full';
export type TaskType = 'task1_academic' | 'task1_general' | 'task2';
export type AnnouncementType = 'info' | 'warning' | 'success' | 'urgent' | 'update' | 'maintenance' | 'tip';
export type FeedbackStatus = 'new' | 'in_review' | 'reviewed' | 'resolved' | 'ignored';

export interface Profile {
  id: string; // references auth.users
  name: string | null;
  role: UserRole;
  status: string;
  target_band: number;
  avatar_url?: string | null;
  metadata?: Record<string, any>;
  created_at: string;
  updated_at: string;
}

export interface TestEntity {
  id: string;
  title: string;
  type: TestType;
  skill: SkillType;
  status: ContentStatus;
  difficulty: DifficultyLevel;
  topic?: string | null;
  band_level?: number | null;
  version: number;
  duration_minutes: number;
  total_questions: number;
  metadata?: Record<string, any>;
  created_by?: string | null;
  created_at: string;
  updated_at: string;
}

export interface SectionEntity {
  id: string;
  test_id: string;
  section_number: number;
  title?: string | null;
  instructions?: string | null;
  audio_url?: string | null;
  duration_seconds?: number | null;
  status: ContentStatus;
  version: number;
  created_at: string;
}

export interface PassageEntity {
  id: string;
  test_id: string;
  section_id?: string | null;
  passage_number: number;
  title: string;
  subheading?: string | null;
  content: string;
  status: ContentStatus;
  difficulty: DifficultyLevel;
  topic?: string | null;
  band_level?: number | null;
  version: number;
  created_at: string;
}

export interface QuestionEntity {
  id: string;
  test_id: string;
  section_id?: string | null;
  passage_id?: string | null;
  question_number: number;
  type: string;
  prompt: string;
  options: Array<{ id: string; text: string }>;
  correct_answer: string;
  explanation?: string | null;
  difficulty: DifficultyLevel;
  topic?: string | null;
  band_level?: number | null;
  status: ContentStatus;
  version: number;
  created_at: string;
}

export interface WritingPromptEntity {
  id: string;
  task_type: TaskType;
  title: string;
  prompt_text: string;
  image_url?: string | null;
  min_words: number;
  recommended_minutes: number;
  sample_essay_band9?: string | null;
  status: ContentStatus;
  difficulty: DifficultyLevel;
  topic?: string | null;
  band_level?: number | null;
  version: number;
  created_at: string;
}

export interface SpeakingCardEntity {
  id: string;
  part: 1 | 2 | 3;
  topic: string;
  cue_card_title?: string | null;
  prompts: string[];
  preparation_time_seconds: number;
  speaking_time_seconds: number;
  model_answer?: string | null;
  status: ContentStatus;
  difficulty: DifficultyLevel;
  band_level?: number | null;
  version: number;
  created_at: string;
}

export interface VocabWordEntity {
  id: string;
  word: string;
  phonetic?: string | null;
  part_of_speech?: string | null;
  definition: string;
  urdu_meaning?: string | null;
  collocations: string[];
  synonyms: string[];
  antonyms: string[];
  example_sentence?: string | null;
  academic_band: number;
  topic?: string | null;
  status: ContentStatus;
  version: number;
  created_at: string;
}

export interface GrammarLessonEntity {
  id: string;
  title: string;
  slug: string;
  category: string;
  summary?: string | null;
  content_markdown: string;
  quiz_questions: any[];
  status: ContentStatus;
  difficulty: DifficultyLevel;
  band_level?: number | null;
  version: number;
  created_at: string;
}

export interface MediaAssetEntity {
  id: string;
  file_name: string;
  file_type: string;
  file_size_bytes?: number | null;
  storage_path: string;
  public_url?: string | null;
  uploaded_by?: string | null;
  created_at: string;
}

export interface AttemptEntity {
  id: string;
  user_id?: string | null;
  test_id: string;
  skill: string;
  mode: string;
  score?: number | null;
  band?: number | null;
  raw_score?: number | null;
  total_questions?: number | null;
  duration_seconds?: number | null;
  shuffled_seed?: string | null;
  answers: Record<string, any>;
  marked_results: Record<string, any>;
  completed_at: string;
  synced_at: string;
}

export interface WritingSubmissionEntity {
  id: string;
  user_id?: string | null;
  prompt_id: string;
  essay_text: string;
  word_count: number;
  task_type: string;
  estimated_band?: number | null;
  criteria_scores?: Record<string, number>;
  ai_feedback?: Record<string, any>;
  created_at: string;
}

export interface SpeakingSessionEntity {
  id: string;
  user_id?: string | null;
  part: number;
  topic?: string | null;
  audio_storage_path?: string | null;
  transcription?: string | null;
  estimated_band?: number | null;
  criteria_scores?: Record<string, number>;
  ai_feedback?: Record<string, any>;
  created_at: string;
}

export interface AnnouncementEntity {
  id: string;
  title: string;
  message: string;
  type: AnnouncementType;
  is_active: boolean;
  starts_at: string;
  expires_at?: string | null;
  created_by?: string | null;
  created_at: string;
}

export interface FeedbackEntity {
  id: string;
  user_id?: string | null;
  category: string;
  message: string;
  rating?: number | null;
  user_email?: string | null;
  status: FeedbackStatus;
  created_at: string;
}

export interface SettingEntity {
  key: string;
  value: Record<string, any>;
  description?: string | null;
  updated_by?: string | null;
  updated_at: string;
}

export interface FeatureFlagEntity {
  key: string;
  name: string;
  description?: string | null;
  enabled: boolean;
  rollout_percentage: number;
  client_visible: boolean;
  updated_by?: string | null;
  updated_at: string;
}

export interface AIProviderEntity {
  id: string;
  provider_name: string;
  api_key_encrypted: string;
  base_url?: string | null;
  default_model: string;
  is_active: boolean;
  is_fallback: boolean;
  monthly_token_budget: number;
  created_at: string;
  updated_at: string;
}

export interface AIUsageLogEntity {
  id: string;
  user_id?: string | null;
  provider: string;
  model: string;
  task_type: string;
  tokens_input: number;
  tokens_output: number;
  cost_estimated_usd: number;
  duration_ms?: number | null;
  status: string;
  error_message?: string | null;
  created_at: string;
}

export interface AuditLogEntity {
  id: string;
  actor_id?: string | null;
  action: string;
  target_type: string;
  target_id?: string | null;
  previous_state?: Record<string, any> | null;
  new_state?: Record<string, any> | null;
  ip_address?: string | null;
  created_at: string;
}
