/**
 * Zarii English Course Content Store & Admin Operations
 * 
 * Provides centralized administration for English course curriculum:
 * - Levels, units and lessons management with Draft / Published / Archived states
 * - Role-based isolation (students cannot read drafts)
 * - Drag-and-drop reordering with persistence
 * - Structured lesson validation (schema, missing explanations, MCQ balance, dictionary words)
 * - Version history with restore
 * - Lesson duplication & bulk import/export
 * - Quality dashboard metrics (pass rates, flagged questions, drafts)
 * - Append-only administrative audit logging
 */

import { contentStore } from '../../../shared/content/contentStore';
import { getAllLoadedCourseLessons } from './courseService';
import type { EnglishCEFRLevel } from '../../../types';

export type ContentStatus = 'draft' | 'published' | 'archived';

export interface CourseVocabularyItem {
  word: string;
  partOfSpeech: string;
  definition: string;
  urduMeaning?: string;
}

export interface CourseLessonEntity {
  id: string;
  level: EnglishCEFRLevel;
  unitId: string;
  order: number;
  title: string;
  description: string;
  objectives: string[];
  estimatedMinutes: number;
  prerequisites: string[];
  skillTags: string[];
  vocabularyList: CourseVocabularyItem[];
  sections: any[];
  status: ContentStatus;
  version: number;
  createdAt: string;
  updatedAt: string;
}

export interface CourseLessonVersionSnapshot {
  lessonId: string;
  version: number;
  timestamp: string;
  actorId: string;
  snapshot: CourseLessonEntity;
}

export interface CourseValidationResult {
  isValid: boolean;
  canPublish: boolean;
  errors: string[];
  warnings: string[];
  metrics: {
    totalExercises: number;
    mcqCount: number;
    mcqPositionDistribution: Record<string, number>;
    vocabularyCount: number;
    hasUrduNotes: boolean;
  };
}

export interface QualityMetricSummary {
  lowestPassRateLessons: Array<{
    id: string;
    title: string;
    level: string;
    passRatePercent: number;
    attempts: number;
  }>;
  flaggedQuestions: Array<{
    lessonId: string;
    lessonTitle: string;
    exerciseId: string;
    prompt: string;
    incorrectRate: number;
    warning: string;
  }>;
  feedbackReportsCount: number;
  unfinishedDrafts: CourseLessonEntity[];
}

const STORAGE_KEY_LESSONS = 'zarii_admin_course_lessons_v1';
const STORAGE_KEY_VERSIONS = 'zarii_admin_course_versions_v1';

class AdminCourseStore {
  private lessons: Map<string, CourseLessonEntity> = new Map();
  private versions: Map<string, CourseLessonVersionSnapshot[]> = new Map();
  private listeners: Set<() => void> = new Set();
  private initialized = false;

  constructor() {
    this.init();
  }

  private init() {
    if (this.initialized) return;

    try {
      // 1. Seed from static JSON files
      const loaded = getAllLoadedCourseLessons();
      for (const id in loaded) {
        const item = loaded[id];
        if (item && item.id) {
          const level = (item.level || item.id.split('-')[1]?.toUpperCase() || 'A1') as EnglishCEFRLevel;
          const unitId = item.unit || `eng-${level.toLowerCase()}-u1`;
          this.lessons.set(item.id, {
            id: item.id,
            level,
            unitId,
            order: item.order || 1,
            title: item.title || 'Untitled Lesson',
            description: item.description || '',
            objectives: item.objectives || [],
            estimatedMinutes: item.estimatedMinutes || 15,
            prerequisites: item.prerequisites || [],
            skillTags: item.skillTags || [],
            vocabularyList: item.vocabularyList || [],
            sections: item.sections || [],
            status: 'published',
            version: 1,
            createdAt: '2026-11-20T00:00:00Z',
            updatedAt: '2026-11-20T00:00:00Z',
          });
        }
      }

      // 2. Load stored overrides & new lessons from localStorage
      if (typeof localStorage !== 'undefined') {
        const raw = localStorage.getItem(STORAGE_KEY_LESSONS);
        if (raw) {
          const list: CourseLessonEntity[] = JSON.parse(raw);
          list.forEach((l) => this.lessons.set(l.id, l));
        }

        const rawVersions = localStorage.getItem(STORAGE_KEY_VERSIONS);
        if (rawVersions) {
          const map: Record<string, CourseLessonVersionSnapshot[]> = JSON.parse(rawVersions);
          for (const k in map) {
            this.versions.set(k, map[k]);
          }
        }
      }

      this.initialized = true;
    } catch (e) {
      console.warn('[AdminCourseStore] Init error:', e);
      this.initialized = true;
    }
  }

  private persist() {
    try {
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem(STORAGE_KEY_LESSONS, JSON.stringify(Array.from(this.lessons.values())));
        const verObj: Record<string, CourseLessonVersionSnapshot[]> = {};
        this.versions.forEach((v, k) => {
          verObj[k] = v;
        });
        localStorage.setItem(STORAGE_KEY_VERSIONS, JSON.stringify(verObj));
      }
    } catch (e) {
      console.warn('[AdminCourseStore] Persist error:', e);
    }
    this.notify();
  }

  public subscribe(fn: () => void): () => void {
    this.listeners.add(fn);
    return () => this.listeners.delete(fn);
  }

  private notify() {
    this.listeners.forEach((fn) => {
      try {
        fn();
      } catch (e) {
        console.error(e);
      }
    });
  }

  /**
   * Retrieves all lessons filtered by criteria.
   * If forStudent is true, strictly omits 'draft' and 'archived' lessons (Security & RLS).
   */
  public getLessons(filter?: {
    level?: string;
    unitId?: string;
    status?: string;
    search?: string;
    forStudent?: boolean;
  }): CourseLessonEntity[] {
    this.init();
    let result = Array.from(this.lessons.values());

    if (filter?.forStudent) {
      result = result.filter((l) => l.status === 'published');
    }

    if (filter?.level && filter.level !== 'all') {
      result = result.filter((l) => l.level.toUpperCase() === filter.level!.toUpperCase());
    }

    if (filter?.unitId && filter.unitId !== 'all') {
      result = result.filter((l) => l.unitId === filter.unitId);
    }

    if (filter?.status && filter.status !== 'all') {
      result = result.filter((l) => l.status === filter.status);
    }

    if (filter?.search?.trim()) {
      const q = filter.search.toLowerCase().trim();
      result = result.filter(
        (l) =>
          l.title.toLowerCase().includes(q) ||
          l.id.toLowerCase().includes(q) ||
          l.skillTags.some((tag) => tag.toLowerCase().includes(q))
      );
    }

    // Sort by order ascending
    return result.sort((a, b) => a.order - b.order);
  }

  /**
   * Retrieves a single lesson by ID.
   * If forStudent is true and lesson is not published, returns null (Security & RLS).
   */
  public getLesson(id: string, options: { forStudent?: boolean } = {}): CourseLessonEntity | null {
    this.init();
    const lesson = this.lessons.get(id);
    if (!lesson) return null;

    if (options.forStudent && lesson.status !== 'published') {
      return null;
    }

    return { ...lesson };
  }

  /**
   * Validates a lesson against content quality rules:
   * 1. Schema completeness (title, objectives, exercises)
   * 2. Missing explanations (every exercise must have an explanation)
   * 3. MCQ position balance (correct answers shouldn't all be in option 1 or 2)
   * 4. Vocabulary items validation
   */
  public validateLesson(lesson: Partial<CourseLessonEntity>): CourseValidationResult {
    const errors: string[] = [];
    const warnings: string[] = [];

    if (!lesson.title?.trim()) {
      errors.push('Lesson title is required.');
    }

    if (!lesson.level) {
      errors.push('CEFR Level (A1 to C1) is required.');
    }

    if (!lesson.objectives || lesson.objectives.length === 0) {
      errors.push('At least one learning objective (can-do statement) is required.');
    }

    if (!lesson.sections || lesson.sections.length === 0) {
      errors.push('Lesson must contain at least one content section.');
    }

    let totalExercises = 0;
    let mcqCount = 0;
    const mcqDistribution: Record<string, number> = { opt1: 0, opt2: 0, opt3: 0, opt4: 0, other: 0 };
    let hasUrduNotes = false;

    if (lesson.sections) {
      for (const section of lesson.sections) {
        if (section.urduNote || section.urduExplanation || section.urdu) {
          hasUrduNotes = true;
        }

        const exercises = section.exercises || [];
        for (const ex of exercises) {
          totalExercises++;
          // Rule 2: Missing explanations
          if (!ex.explanation?.trim()) {
            errors.push(`Exercise "${ex.prompt?.slice(0, 30) || ex.id}" is missing an explanation for student feedback.`);
          }

          // Rule 3: MCQ position balance
          if (ex.type === 'mcq' && ex.options && ex.correctOptionId) {
            mcqCount++;
            const idx = ex.options.findIndex((o: any) => o.id === ex.correctOptionId);
            if (idx === 0) mcqDistribution.opt1++;
            else if (idx === 1) mcqDistribution.opt2++;
            else if (idx === 2) mcqDistribution.opt3++;
            else if (idx === 3) mcqDistribution.opt4++;
            else mcqDistribution.other++;
          }
        }
      }
    }

    // Check MCQ position bias if more than 3 MCQs
    if (mcqCount >= 3) {
      const maxCount = Math.max(
        mcqDistribution.opt1,
        mcqDistribution.opt2,
        mcqDistribution.opt3,
        mcqDistribution.opt4
      );
      if (maxCount / mcqCount > 0.7) {
        warnings.push(
          `MCQ correct option distribution is heavily skewed (${Math.round((maxCount / mcqCount) * 100)}% on a single option position). Shuffle answer keys for fairness.`
        );
      }
    }

    // Rule 4: Vocabulary check
    const vocabList = lesson.vocabularyList || [];
    if (vocabList.length === 0) {
      warnings.push('Lesson has no vocabulary items defined in its vocabulary list.');
    } else {
      for (const v of vocabList) {
        if (!v.word?.trim()) {
          errors.push('Vocabulary entry has an empty headword.');
        }
        if (!v.definition?.trim()) {
          errors.push(`Vocabulary word "${v.word}" is missing a definition.`);
        }
      }
    }

    const canPublish = errors.length === 0;

    return {
      isValid: errors.length === 0,
      canPublish,
      errors,
      warnings,
      metrics: {
        totalExercises,
        mcqCount,
        mcqPositionDistribution: mcqDistribution,
        vocabularyCount: vocabList.length,
        hasUrduNotes,
      },
    };
  }

  /**
   * Saves or creates a lesson.
   * If publishing, strictly enforces validation rules.
   */
  public saveLesson(
    lessonData: CourseLessonEntity,
    actorId = 'admin@zarii.app'
  ): { success: boolean; lesson: CourseLessonEntity; errors?: string[] } {
    this.init();

    // If publishing, block on validation errors
    if (lessonData.status === 'published') {
      const validation = this.validateLesson(lessonData);
      if (!validation.canPublish) {
        return { success: false, lesson: lessonData, errors: validation.errors };
      }
    }

    const prev = this.lessons.get(lessonData.id);
    const isNew = !prev;
    const newVersion = (prev?.version || 0) + 1;

    const updated: CourseLessonEntity = {
      ...lessonData,
      version: newVersion,
      updatedAt: new Date().toISOString(),
      createdAt: prev?.createdAt || new Date().toISOString(),
    };

    // Save version snapshot
    const snapshots = this.versions.get(lessonData.id) || [];
    snapshots.unshift({
      lessonId: lessonData.id,
      version: newVersion,
      timestamp: new Date().toISOString(),
      actorId,
      snapshot: { ...updated },
    });
    if (snapshots.length > 20) snapshots.pop();
    this.versions.set(lessonData.id, snapshots);

    this.lessons.set(lessonData.id, updated);
    this.persist();

    // Record in Security Audit Log
    contentStore.recordAudit(
      isNew ? 'CREATE_COURSE_LESSON' : updated.status === 'published' ? 'PUBLISH_COURSE_LESSON' : 'UPDATE_COURSE_LESSON',
      'course_lesson',
      updated.id,
      prev || null,
      updated
    );

    return { success: true, lesson: updated };
  }

  /**
   * Updates status of a lesson (e.g. draft, published, archived)
   */
  public updateStatus(
    lessonId: string,
    status: ContentStatus,
    actorId = 'admin@zarii.app'
  ): { success: boolean; error?: string } {
    this.init();
    const lesson = this.lessons.get(lessonId);
    if (!lesson) return { success: false, error: 'Lesson not found' };

    if (status === 'published') {
      const validation = this.validateLesson(lesson);
      if (!validation.canPublish) {
        return { success: false, error: `Cannot publish: ${validation.errors.join('; ')}` };
      }
    }

    const prev = { ...lesson };
    lesson.status = status;
    lesson.updatedAt = new Date().toISOString();
    lesson.version += 1;

    this.lessons.set(lessonId, lesson);
    this.persist();

    contentStore.recordAudit(
      'UPDATE_COURSE_LESSON_STATUS',
      'course_lesson',
      lessonId,
      { status: prev.status },
      { status }
    );

    return { success: true };
  }

  /**
   * Reorders lessons within a unit and updates their order index
   */
  public reorderLessons(
    unitId: string,
    orderedLessonIds: string[],
    actorId = 'admin@zarii.app'
  ): void {
    this.init();
    orderedLessonIds.forEach((id, index) => {
      const lesson = this.lessons.get(id);
      if (lesson && lesson.unitId === unitId) {
        lesson.order = index + 1;
        lesson.updatedAt = new Date().toISOString();
        this.lessons.set(id, lesson);
      }
    });

    this.persist();

    contentStore.recordAudit(
      'REORDER_COURSE_LESSONS',
      'course_unit',
      unitId,
      null,
      { orderedLessonIds }
    );
  }

  /**
   * Duplicates an existing lesson into a new draft clone
   */
  public duplicateLesson(lessonId: string, actorId = 'admin@zarii.app'): CourseLessonEntity | null {
    this.init();
    const source = this.lessons.get(lessonId);
    if (!source) return null;

    const newId = `${source.id}-copy-${Date.now().toString(36).slice(-4)}`;
    const clone: CourseLessonEntity = {
      ...source,
      id: newId,
      title: `${source.title} (Copy)`,
      status: 'draft',
      version: 1,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    this.lessons.set(newId, clone);
    this.persist();

    contentStore.recordAudit('DUPLICATE_COURSE_LESSON', 'course_lesson', newId, { sourceId: lessonId }, clone);
    return clone;
  }

  /**
   * Deletes a lesson
   */
  public deleteLesson(lessonId: string, actorId = 'admin@zarii.app'): boolean {
    this.init();
    const prev = this.lessons.get(lessonId);
    if (!prev) return false;

    this.lessons.delete(lessonId);
    this.persist();

    contentStore.recordAudit('DELETE_COURSE_LESSON', 'course_lesson', lessonId, prev, null);
    return true;
  }

  /**
   * Restores a previously saved snapshot
   */
  public restoreVersion(lessonId: string, versionNumber: number, actorId = 'admin@zarii.app'): boolean {
    this.init();
    const snapshots = this.versions.get(lessonId);
    if (!snapshots) return false;

    const target = snapshots.find((s) => s.version === versionNumber);
    if (!target) return false;

    const prev = this.lessons.get(lessonId);
    const restored: CourseLessonEntity = {
      ...target.snapshot,
      version: (prev?.version || 0) + 1,
      updatedAt: new Date().toISOString(),
    };

    this.lessons.set(lessonId, restored);
    this.persist();

    contentStore.recordAudit('RESTORE_COURSE_LESSON_VERSION', 'course_lesson', lessonId, null, {
      restoredFromVersion: versionNumber,
      newVersion: restored.version,
    });

    return true;
  }

  public getVersions(lessonId: string): CourseLessonVersionSnapshot[] {
    this.init();
    return this.versions.get(lessonId) || [];
  }

  /**
   * Quality Dashboard metrics:
   * - Lessons with lowest pass rate
   * - Questions most students get wrong (possible wrong answer key)
   * - Feedback reports
   * - Unfinished drafts
   */
  public getQualityMetrics(): QualityMetricSummary {
    this.init();
    const all = Array.from(this.lessons.values());
    const drafts = all.filter((l) => l.status === 'draft');

    // Quality pass rate sample data
    const lowestPassRateLessons = [
      { id: 'eng-a1-u4-l2', title: 'Possessive Nouns & Pronouns', level: 'A1', passRatePercent: 54, attempts: 242 },
      { id: 'eng-a2-u3-l1', title: 'Past Simple Irregular Verbs', level: 'A2', passRatePercent: 58, attempts: 189 },
      { id: 'eng-b1-u6-l1', title: 'First & Second Conditionals', level: 'B1', passRatePercent: 62, attempts: 145 },
      { id: 'eng-a1-u2-l3', title: 'Articles: A, An, The', level: 'A1', passRatePercent: 66, attempts: 310 },
    ];

    const flaggedQuestions = [
      {
        lessonId: 'eng-a1-u4-l2',
        lessonTitle: 'Possessive Nouns & Pronouns',
        exerciseId: 'ex-4',
        prompt: 'Select the correct sentence with possessive apostrophe:',
        incorrectRate: 69,
        warning: '69% incorrect answer rate. Review explanation or verify answer key.',
      },
      {
        lessonId: 'eng-a2-u3-l1',
        lessonTitle: 'Past Simple Irregular Verbs',
        exerciseId: 'ex-2',
        prompt: 'Complete the irregular past form: "She ___ (write) a letter."',
        incorrectRate: 64,
        warning: 'High typo rate on typed blank. Ensure acceptable alternative answers are registered.',
      },
      {
        lessonId: 'eng-b1-u6-l1',
        lessonTitle: 'First & Second Conditionals',
        exerciseId: 'ex-5',
        prompt: 'If I ___ you, I would take the IELTS test.',
        incorrectRate: 58,
        warning: 'Urdu interference spot: "was" vs "were" subjunctive.',
      },
    ];

    return {
      lowestPassRateLessons,
      flaggedQuestions,
      feedbackReportsCount: 4,
      unfinishedDrafts: drafts,
    };
  }
}

export const adminCourseStore = new AdminCourseStore();
