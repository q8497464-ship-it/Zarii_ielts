import React, { useState, useMemo, useEffect } from 'react';
import {
  BookOpen,
  Search,
  Filter,
  Plus,
  Edit,
  Trash2,
  Copy,
  CheckCircle,
  AlertTriangle,
  History,
  Eye,
  FileCode,
  Download,
  Upload,
  ArrowUp,
  ArrowDown,
  Sparkles,
  Layers,
  HelpCircle,
  ExternalLink,
  ChevronRight,
  X,
  RotateCcw,
  Volume2,
} from 'lucide-react';
import {
  adminCourseStore,
  type CourseLessonEntity,
  type CourseValidationResult,
  type ContentStatus,
} from '../../../../features/english/services/adminCourseStore';
import { useAdminToast } from '../AdminToast';
import { ConfirmDialog } from '../ConfirmDialog';
import { StatusBadge } from '../StatusBadge';
import type { EnglishCEFRLevel } from '../../../../types';

interface CourseManagerProps {
  onOpenTestEditor?: (testId: string) => void;
}

export function CourseManager({ onOpenTestEditor }: CourseManagerProps) {
  const { addToast } = useAdminToast();

  // Navigation sub-tab
  const [subTab, setSubTab] = useState<'lessons' | 'quality'>('lessons');

  // Lessons list state
  const [lessons, setLessons] = useState<CourseLessonEntity[]>(() =>
    adminCourseStore.getLessons()
  );
  const [levelFilter, setLevelFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Active Editor Modal State
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [activeLesson, setActiveLesson] = useState<CourseLessonEntity | null>(null);
  const [editorMode, setEditorMode] = useState<'edit' | 'preview'>('edit');
  const [showVersions, setShowVersions] = useState(false);

  // Quality metrics state
  const [qualityMetrics, setQualityMetrics] = useState(() =>
    adminCourseStore.getQualityMetrics()
  );

  // Delete confirm dialog
  const [deleteTarget, setDeleteTarget] = useState<CourseLessonEntity | null>(null);

  // Bulk Import Modal
  const [isImportModalOpen, setIsImportModalOpen] = useState(false);
  const [importJsonText, setImportJsonText] = useState('');
  const [importDryRun, setImportDryRun] = useState<{
    valid: boolean;
    count: number;
    errors: string[];
  } | null>(null);

  useEffect(() => {
    return adminCourseStore.subscribe(() => {
      setLessons(adminCourseStore.getLessons());
      setQualityMetrics(adminCourseStore.getQualityMetrics());
    });
  }, []);

  // Filtered Lessons
  const filteredLessons = useMemo(() => {
    return lessons.filter((l) => {
      if (levelFilter !== 'all' && l.level.toUpperCase() !== levelFilter.toUpperCase()) return false;
      if (statusFilter !== 'all' && l.status !== statusFilter) return false;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchesTitle = l.title.toLowerCase().includes(q);
        const matchesId = l.id.toLowerCase().includes(q);
        const matchesTag = l.skillTags.some((t) => t.toLowerCase().includes(q));
        if (!matchesTitle && !matchesId && !matchesTag) return false;
      }
      return true;
    });
  }, [lessons, levelFilter, statusFilter, searchQuery]);

  // Handle reorder move up / down
  const handleMove = (lesson: CourseLessonEntity, direction: 'up' | 'down') => {
    const unitLessons = lessons
      .filter((l) => l.unitId === lesson.unitId)
      .sort((a, b) => a.order - b.order);
    const currentIndex = unitLessons.findIndex((l) => l.id === lesson.id);
    if (currentIndex === -1) return;

    const targetIndex = direction === 'up' ? currentIndex - 1 : currentIndex + 1;
    if (targetIndex < 0 || targetIndex >= unitLessons.length) return;

    const reordered = [...unitLessons];
    const [moved] = reordered.splice(currentIndex, 1);
    reordered.splice(targetIndex, 0, moved);

    adminCourseStore.reorderLessons(
      lesson.unitId,
      reordered.map((l) => l.id)
    );
    addToast({
      type: 'success',
      title: 'Order Updated',
      message: `Lesson moved ${direction} within ${lesson.unitId}.`,
    });
  };

  // Create new lesson draft
  const handleCreateNewLesson = () => {
    const newLesson: CourseLessonEntity = {
      id: `eng-${(levelFilter !== 'all' ? levelFilter : 'a1').toLowerCase()}-u1-l${Date.now().toString().slice(-3)}`,
      level: (levelFilter !== 'all' ? levelFilter : 'A1') as EnglishCEFRLevel,
      unitId: `eng-${(levelFilter !== 'all' ? levelFilter : 'a1').toLowerCase()}-u1`,
      order: filteredLessons.length + 1,
      title: 'New English Lesson',
      description: 'Master core communicative rules and functional vocabulary.',
      objectives: ['Understand and apply the target grammar structure accurately in context.'],
      estimatedMinutes: 15,
      prerequisites: [],
      skillTags: ['grammar-practice'],
      vocabularyList: [
        {
          word: 'fluent',
          partOfSpeech: 'adjective',
          definition: 'Able to express oneself easily and articulately.',
          urduMeaning: 'روانی سے بولنے والا',
        },
      ],
      sections: [
        {
          id: 'sec-1',
          type: 'explain',
          title: 'Grammar Rule Explanation',
          content: 'Study the grammar rule below and note the word order pattern.',
        },
        {
          id: 'sec-2',
          type: 'practice',
          title: 'Interactive Practice',
          exercises: [
            {
              id: 'ex-1',
              type: 'mcq',
              prompt: 'Choose the grammatically correct sentence:',
              options: [
                { id: 'opt-1', text: 'Option A: Target correct form' },
                { id: 'opt-2', text: 'Option B: Common distractor error' },
                { id: 'opt-3', text: 'Option C: Unrelated error' },
                { id: 'opt-4', text: 'Option D: None of the above' },
              ],
              correctOptionId: 'opt-1',
              explanation: 'Option A demonstrates accurate subject-verb agreement.',
              urduExplanation: 'آپشن A فاعل اور فعل کی درست ترتیب کو ظاہر کرتا ہے۔',
            },
          ],
        },
      ],
      status: 'draft',
      version: 1,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    setActiveLesson(newLesson);
    setEditorMode('edit');
    setIsEditorOpen(true);
  };

  const handleDuplicate = (id: string) => {
    const clone = adminCourseStore.duplicateLesson(id);
    if (clone) {
      addToast({
        type: 'success',
        title: 'Lesson Duplicated',
        message: `Created draft copy: "${clone.title}"`,
      });
    }
  };

  const handleDelete = () => {
    if (!deleteTarget) return;
    adminCourseStore.deleteLesson(deleteTarget.id);
    addToast({
      type: 'info',
      title: 'Lesson Deleted',
      message: `Lesson "${deleteTarget.title}" was removed.`,
    });
    setDeleteTarget(null);
  };

  const handleExportJson = () => {
    const dataStr = JSON.stringify(filteredLessons, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `zarii-course-${levelFilter}-lessons.json`;
    a.click();
    URL.revokeObjectURL(url);
    addToast({
      type: 'success',
      title: 'Course Exported',
      message: `Exported ${filteredLessons.length} lessons to JSON.`,
    });
  };

  return (
    <div className="space-y-6">
      {/* 1. Header & Navigation Sub-tabs */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl bg-white dark:bg-[#112019] border border-slate-200/90 dark:border-[#24392F] shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
              General English Course &amp; Curriculum Manager
            </h2>
            <span className="px-2 py-0.5 text-[10px] font-bold rounded-full bg-[#5BB78D]/15 text-[#124F40] dark:text-[#5BB78D] border border-[#5BB78D]/30">
              CEFR A1–C1
            </span>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Manage course levels, units, structured lessons, live student preview, and validation gates.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {/* Sub-tab Switcher */}
          <div className="inline-flex items-center p-1 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
            <button
              onClick={() => setSubTab('lessons')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                subTab === 'lessons'
                  ? 'bg-white dark:bg-[#124F40] text-[#124F40] dark:text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-400'
              }`}
            >
              Curriculum &amp; Lessons ({lessons.length})
            </button>
            <button
              onClick={() => setSubTab('quality')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
                subTab === 'quality'
                  ? 'bg-white dark:bg-[#124F40] text-[#124F40] dark:text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-400'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>Quality Insights ({qualityMetrics.flaggedQuestions.length})</span>
            </button>
          </div>

          {/* Export JSON */}
          <button
            onClick={handleExportJson}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-50 text-xs font-semibold transition-all shadow-xs"
            title="Export filtered lessons as JSON"
          >
            <Download className="w-3.5 h-3.5 text-slate-500" />
            <span>Export JSON</span>
          </button>

          {/* New Lesson Button */}
          <button
            onClick={handleCreateNewLesson}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#124F40] hover:bg-[#0E3D32] text-white text-xs font-bold transition-all shadow-xs cursor-pointer"
          >
            <Plus className="w-4 h-4 text-[#5BB78D]" />
            <span>New Course Lesson</span>
          </button>
        </div>
      </div>

      {/* 2. SUB-TAB: QUALITY DASHBOARD */}
      {subTab === 'quality' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-xl bg-white dark:bg-[#112019] border border-slate-200 dark:border-[#24392F]">
              <span className="text-xs font-semibold text-slate-500">Unfinished Drafts</span>
              <div className="text-2xl font-black text-amber-600 dark:text-amber-400 mt-1">
                {qualityMetrics.unfinishedDrafts.length}
              </div>
              <p className="text-[11px] text-slate-400 mt-0.5">Lessons awaiting publishing approval</p>
            </div>
            <div className="p-4 rounded-xl bg-white dark:bg-[#112019] border border-slate-200 dark:border-[#24392F]">
              <span className="text-xs font-semibold text-slate-500">Flagged Questions</span>
              <div className="text-2xl font-black text-rose-600 dark:text-rose-400 mt-1">
                {qualityMetrics.flaggedQuestions.length}
              </div>
              <p className="text-[11px] text-slate-400 mt-0.5">Abnormally high student error rates</p>
            </div>
            <div className="p-4 rounded-xl bg-white dark:bg-[#112019] border border-slate-200 dark:border-[#24392F]">
              <span className="text-xs font-semibold text-slate-500">Student Issue Reports</span>
              <div className="text-2xl font-black text-[#5BB78D] mt-1">
                {qualityMetrics.feedbackReportsCount}
              </div>
              <p className="text-[11px] text-slate-400 mt-0.5">Candidate feedback tickets on lessons</p>
            </div>
          </div>

          {/* Flagged Questions Table */}
          <div className="p-5 rounded-2xl bg-white dark:bg-[#112019] border border-slate-200 dark:border-[#24392F] shadow-xs space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-amber-500" />
                  <span>Questions Most Students Get Wrong (Verify Answer Key)</span>
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Questions where candidate inaccuracy deviates significantly from CEFR benchmarks.
                </p>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-400 font-semibold">
                    <th className="py-2.5 px-3">Lesson</th>
                    <th className="py-2.5 px-3">Question Prompt</th>
                    <th className="py-2.5 px-3">Incorrect Rate</th>
                    <th className="py-2.5 px-3">Diagnostic Warning</th>
                    <th className="py-2.5 px-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800/80">
                  {qualityMetrics.flaggedQuestions.map((q, idx) => (
                    <tr key={idx} className="hover:bg-slate-50/60 dark:hover:bg-slate-800/40">
                      <td className="py-3 px-3 font-semibold text-slate-900 dark:text-white">
                        {q.lessonTitle}
                        <span className="text-[10px] text-slate-400 font-mono block">{q.lessonId}</span>
                      </td>
                      <td className="py-3 px-3 text-slate-600 dark:text-slate-300 max-w-xs truncate">
                        {q.prompt}
                      </td>
                      <td className="py-3 px-3">
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-rose-500/15 text-rose-600 dark:text-rose-400 border border-rose-500/30">
                          {q.incorrectRate}% Incorrect
                        </span>
                      </td>
                      <td className="py-3 px-3 text-slate-500 text-[11px]">{q.warning}</td>
                      <td className="py-3 px-3 text-right">
                        <button
                          onClick={() => {
                            const target = adminCourseStore.getLesson(q.lessonId, { forStudent: false });
                            if (target) {
                              setActiveLesson(target);
                              setIsEditorOpen(true);
                            }
                          }}
                          className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-200 text-xs font-semibold"
                        >
                          Open in Editor
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Lessons with Lowest Pass Rate */}
          <div className="p-5 rounded-2xl bg-white dark:bg-[#112019] border border-slate-200 dark:border-[#24392F] shadow-xs space-y-3">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <RotateCcw className="w-4 h-4 text-[#5BB78D]" />
              <span>Lessons with Lowest Practice Pass Rates</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {qualityMetrics.lowestPassRateLessons.map((l) => (
                <div
                  key={l.id}
                  className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold font-mono bg-slate-200 dark:bg-slate-700">
                      Level {l.level}
                    </span>
                    <span className="text-xs font-mono font-bold text-amber-600 dark:text-amber-400">
                      {l.passRatePercent}% Pass
                    </span>
                  </div>
                  <div className="font-bold text-xs text-slate-900 dark:text-white truncate">
                    {l.title}
                  </div>
                  <div className="text-[11px] text-slate-400 flex items-center justify-between">
                    <span>{l.attempts} student attempts</span>
                    <button
                      onClick={() => {
                        const target = adminCourseStore.getLesson(l.id, { forStudent: false });
                        if (target) {
                          setActiveLesson(target);
                          setIsEditorOpen(true);
                        }
                      }}
                      className="text-[#124F40] dark:text-[#5BB78D] font-bold hover:underline"
                    >
                      Edit &rarr;
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 3. SUB-TAB: CURRICULUM LESSONS LIST */}
      {subTab === 'lessons' && (
        <div className="space-y-4">
          {/* Filters Bar */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 p-4 rounded-xl bg-slate-50 dark:bg-[#112019] border border-slate-200 dark:border-[#24392F]">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search lessons by title, ID, or grammar tag..."
                className="w-full pl-9 pr-3 py-1.5 text-xs rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-[#5BB78D]"
              />
            </div>

            <div className="flex flex-wrap items-center gap-2">
              {/* Level Filter */}
              <select
                value={levelFilter}
                onChange={(e) => setLevelFilter(e.target.value)}
                className="px-3 py-1.5 text-xs rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200"
              >
                <option value="all">All CEFR Levels</option>
                <option value="A1">Level A1 (Beginner)</option>
                <option value="A2">Level A2 (Elementary)</option>
                <option value="B1">Level B1 (Intermediate)</option>
                <option value="B2">Level B2 (Upper-Intermediate)</option>
                <option value="C1">Level C1 (Advanced)</option>
              </select>

              {/* Status Filter */}
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-3 py-1.5 text-xs rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200"
              >
                <option value="all">All Statuses</option>
                <option value="published">Published</option>
                <option value="draft">Drafts</option>
                <option value="archived">Archived</option>
              </select>
            </div>
          </div>

          {/* Lessons Table */}
          <div className="overflow-hidden rounded-2xl bg-white dark:bg-[#112019] border border-slate-200/90 dark:border-[#24392F] shadow-xs">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-400 font-semibold bg-slate-50/50 dark:bg-slate-800/20">
                    <th className="py-3 px-3 w-16 text-center">Order</th>
                    <th className="py-3 px-3">Lesson Title</th>
                    <th className="py-3 px-3">Level / Unit</th>
                    <th className="py-3 px-3">Duration &amp; Content</th>
                    <th className="py-3 px-3">Status</th>
                    <th className="py-3 px-3">Version</th>
                    <th className="py-3 px-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800/80">
                  {filteredLessons.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="py-8 text-center text-slate-400">
                        No lessons match the selected filters.
                      </td>
                    </tr>
                  ) : (
                    filteredLessons.map((lesson) => (
                      <tr
                        key={lesson.id}
                        className="hover:bg-slate-50/60 dark:hover:bg-slate-800/40 transition-colors"
                      >
                        {/* Order & Reorder Arrows */}
                        <td className="py-3 px-2 text-center" onClick={(e) => e.stopPropagation()}>
                          <div className="inline-flex items-center gap-0.5">
                            <span className="font-mono font-bold text-slate-500 w-5">
                              #{lesson.order}
                            </span>
                            <div className="flex flex-col">
                              <button
                                onClick={() => handleMove(lesson, 'up')}
                                className="p-0.5 text-slate-400 hover:text-slate-800 dark:hover:text-white"
                                title="Move up"
                              >
                                <ArrowUp className="w-3 h-3" />
                              </button>
                              <button
                                onClick={() => handleMove(lesson, 'down')}
                                className="p-0.5 text-slate-400 hover:text-slate-800 dark:hover:text-white"
                                title="Move down"
                              >
                                <ArrowDown className="w-3 h-3" />
                              </button>
                            </div>
                          </div>
                        </td>

                        {/* Title & Slug */}
                        <td className="py-3 px-3">
                          <span className="font-bold text-slate-900 dark:text-white block">
                            {lesson.title}
                          </span>
                          <span className="text-[11px] text-slate-400 font-mono">
                            {lesson.id}
                          </span>
                        </td>

                        {/* Level & Unit */}
                        <td className="py-3 px-3">
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                            {lesson.level} &bull; {lesson.unitId}
                          </span>
                        </td>

                        {/* Duration & Content Items */}
                        <td className="py-3 px-3 text-slate-600 dark:text-slate-300 font-mono text-[11px]">
                          <span>{lesson.estimatedMinutes} mins</span>
                          <span className="text-slate-400 mx-1">&bull;</span>
                          <span>{lesson.sections?.length || 0} sections</span>
                          <span className="text-slate-400 mx-1">&bull;</span>
                          <span>{lesson.vocabularyList?.length || 0} words</span>
                        </td>

                        {/* Status Badge */}
                        <td className="py-3 px-3">
                          <StatusBadge status={lesson.status} />
                        </td>

                        {/* Version */}
                        <td className="py-3 px-3 font-mono text-slate-400 text-[11px]">
                          v{lesson.version}
                        </td>

                        {/* Actions */}
                        <td className="py-3 px-3 text-right">
                          <div className="inline-flex items-center gap-1.5" onClick={(e) => e.stopPropagation()}>
                            <button
                              onClick={() => {
                                setActiveLesson(lesson);
                                setEditorMode('edit');
                                setIsEditorOpen(true);
                              }}
                              title="Edit Lesson Specification"
                              className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 hover:text-slate-900 dark:hover:text-white"
                            >
                              <Edit className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => handleDuplicate(lesson.id)}
                              title="Duplicate Lesson as Draft"
                              className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 hover:text-slate-900 dark:hover:text-white"
                            >
                              <Copy className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => setDeleteTarget(lesson)}
                              title="Delete Lesson"
                              className="p-1.5 rounded-lg hover:bg-rose-50 dark:hover:bg-rose-950/40 text-slate-400 hover:text-rose-600"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* 4. STRUCTURED LESSON EDITOR & VALIDATION MODAL */}
      {isEditorOpen && activeLesson && (
        <LessonEditorModal
          lesson={activeLesson}
          mode={editorMode}
          onModeChange={setEditorMode}
          onClose={() => {
            setIsEditorOpen(false);
            setActiveLesson(null);
          }}
          onSave={(updated, isPublishing) => {
            const res = adminCourseStore.saveLesson(updated);
            if (!res.success && res.errors) {
              addToast({
                type: 'error',
                title: 'Publishing Blocked',
                message: res.errors[0] || 'Please resolve validation errors before publishing.',
              });
              return;
            }
            addToast({
              type: 'success',
              title: isPublishing ? 'Lesson Published' : 'Lesson Saved',
              message: `Lesson "${updated.title}" successfully saved.`,
            });
            setIsEditorOpen(false);
            setActiveLesson(null);
          }}
        />
      )}

      {/* Confirm Delete Dialog */}
      <ConfirmDialog
        isOpen={!!deleteTarget}
        title="Delete Course Lesson"
        message={`Are you sure you want to permanently delete "${deleteTarget?.title}" (${deleteTarget?.id})? This cannot be undone.`}
        confirmLabel="Delete Lesson"
        onConfirm={handleDelete}
        onClose={() => setDeleteTarget(null)}
      />
    </div>
  );
}

// ============================================================================
// LESSON EDITOR & LIVE PREVIEW MODAL
// ============================================================================

interface LessonEditorModalProps {
  lesson: CourseLessonEntity;
  mode: 'edit' | 'preview';
  onModeChange: (m: 'edit' | 'preview') => void;
  onClose: () => void;
  onSave: (lesson: CourseLessonEntity, isPublishing: boolean) => void;
}

function LessonEditorModal({
  lesson: initialLesson,
  mode,
  onModeChange,
  onClose,
  onSave,
}: LessonEditorModalProps) {
  const [form, setForm] = useState<CourseLessonEntity>({ ...initialLesson });
  const [activeSecIndex, setActiveSecIndex] = useState(0);
  const [showVersionHistory, setShowVersionHistory] = useState(false);
  const versions = useMemo(() => adminCourseStore.getVersions(form.id), [form.id]);

  // Run live validation
  const validation: CourseValidationResult = useMemo(
    () => adminCourseStore.validateLesson(form),
    [form]
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="bg-white dark:bg-[#112019] rounded-2xl shadow-2xl max-w-6xl w-full h-[90vh] flex flex-col overflow-hidden border border-slate-200 dark:border-[#24392F]">
        {/* Top Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-900/40 shrink-0">
          <div className="flex items-center gap-3">
            <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-[#124F40] text-[#5BB78D]">
              {form.level} &bull; {form.unitId}
            </span>
            <h3 className="font-bold text-sm sm:text-base text-slate-900 dark:text-white truncate max-w-md">
              {form.title}
            </h3>
            <StatusBadge status={form.status} />
          </div>

          <div className="flex items-center gap-2">
            {/* Live Preview Switcher */}
            <div className="inline-flex items-center p-0.5 rounded-lg bg-slate-200 dark:bg-slate-800 border border-slate-300 dark:border-slate-700">
              <button
                type="button"
                onClick={() => onModeChange('edit')}
                className={`px-3 py-1 rounded-md text-xs font-semibold ${
                  mode === 'edit'
                    ? 'bg-white dark:bg-[#124F40] text-slate-900 dark:text-white shadow-xs'
                    : 'text-slate-500'
                }`}
              >
                Structured Form
              </button>
              <button
                type="button"
                onClick={() => onModeChange('preview')}
                className={`px-3 py-1 rounded-md text-xs font-semibold flex items-center gap-1 ${
                  mode === 'preview'
                    ? 'bg-white dark:bg-[#124F40] text-slate-900 dark:text-white shadow-xs'
                    : 'text-slate-500'
                }`}
              >
                <Eye className="w-3 h-3 text-[#5BB78D]" />
                <span>Student Preview</span>
              </button>
            </div>

            {/* Version History Toggle */}
            <button
              type="button"
              onClick={() => setShowVersionHistory(!showVersionHistory)}
              className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-500 hover:text-slate-900 dark:hover:text-white"
              title="Version History & Restore"
            >
              <History className="w-4 h-4" />
            </button>

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Body Container */}
        <div className="flex-1 flex overflow-hidden">
          {/* Main Area: Edit or Preview */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {mode === 'edit' ? (
              <div className="space-y-6 max-w-4xl">
                {/* Meta Fields */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      Lesson Title
                    </label>
                    <input
                      type="text"
                      value={form.title}
                      onChange={(e) => setForm({ ...form, title: e.target.value })}
                      className="w-full px-3 py-1.5 text-xs rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white font-bold"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      CEFR Level
                    </label>
                    <select
                      value={form.level}
                      onChange={(e) => setForm({ ...form, level: e.target.value as any })}
                      className="w-full px-3 py-1.5 text-xs rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                    >
                      <option value="A1">A1 Beginner</option>
                      <option value="A2">A2 Elementary</option>
                      <option value="B1">B1 Intermediate</option>
                      <option value="B2">B2 Upper-Intermediate</option>
                      <option value="C1">C1 Advanced</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      Estimated Duration (Minutes)
                    </label>
                    <input
                      type="number"
                      value={form.estimatedMinutes}
                      onChange={(e) =>
                        setForm({ ...form, estimatedMinutes: parseInt(e.target.value) || 15 })
                      }
                      className="w-full px-3 py-1.5 text-xs rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white font-mono"
                    />
                  </div>
                </div>

                {/* Objectives */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
                    Can-Do Learning Objectives
                  </label>
                  {form.objectives.map((obj, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <input
                        type="text"
                        value={obj}
                        onChange={(e) => {
                          const updated = [...form.objectives];
                          updated[i] = e.target.value;
                          setForm({ ...form, objectives: updated });
                        }}
                        className="flex-1 px-3 py-1.5 text-xs rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          const updated = form.objectives.filter((_, idx) => idx !== i);
                          setForm({ ...form, objectives: updated });
                        }}
                        className="p-1.5 text-slate-400 hover:text-rose-500"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() =>
                      setForm({
                        ...form,
                        objectives: [...form.objectives, 'New can-do objective'],
                      })
                    }
                    className="text-xs text-[#124F40] dark:text-[#5BB78D] font-bold hover:underline"
                  >
                    + Add Objective
                  </button>
                </div>

                {/* Sections Editor */}
                <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/30 space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-900 dark:text-white">
                      Sections ({form.sections.length})
                    </span>
                    <button
                      type="button"
                      onClick={() => {
                        const newSec = {
                          id: `sec-${Date.now().toString().slice(-4)}`,
                          type: 'explain',
                          title: 'New Section',
                          content: 'Enter section explanation or instructions here.',
                        };
                        setForm({ ...form, sections: [...form.sections, newSec] });
                      }}
                      className="px-2.5 py-1 rounded-lg bg-[#124F40] text-white text-xs font-bold"
                    >
                      + Add Section
                    </button>
                  </div>

                  <div className="space-y-4">
                    {form.sections.map((sec, idx) => (
                      <div
                        key={sec.id || idx}
                        className="p-3.5 rounded-xl bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 space-y-3"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className="font-mono text-[10px] font-bold px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-700">
                              #{idx + 1}
                            </span>
                            <select
                              value={sec.type}
                              onChange={(e) => {
                                const updated = [...form.sections];
                                updated[idx] = { ...sec, type: e.target.value };
                                setForm({ ...form, sections: updated });
                              }}
                              className="px-2 py-1 text-xs rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 font-bold capitalize"
                            >
                              <option value="explain">Explain (Rule/Markdown)</option>
                              <option value="examples">Examples (Audio List)</option>
                              <option value="timeline">Timeline (Tense SVG)</option>
                              <option value="dialogue">Dialogue (Bubbles)</option>
                              <option value="practice">Practice (Interactive)</option>
                              <option value="quiz">5-Question Quiz</option>
                              <option value="summary">Summary Takeaways</option>
                            </select>
                            <input
                              type="text"
                              value={sec.title || ''}
                              onChange={(e) => {
                                const updated = [...form.sections];
                                updated[idx] = { ...sec, title: e.target.value };
                                setForm({ ...form, sections: updated });
                              }}
                              placeholder="Section title"
                              className="px-2 py-1 text-xs rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 w-48 font-semibold"
                            />
                          </div>

                          <button
                            type="button"
                            onClick={() => {
                              const updated = form.sections.filter((_, i) => i !== idx);
                              setForm({ ...form, sections: updated });
                            }}
                            className="text-slate-400 hover:text-rose-500 p-1"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        {/* Explain Type: Content text area */}
                        {sec.type === 'explain' && (
                          <textarea
                            rows={3}
                            value={sec.content || ''}
                            onChange={(e) => {
                              const updated = [...form.sections];
                              updated[idx] = { ...sec, content: e.target.value };
                              setForm({ ...form, sections: updated });
                            }}
                            placeholder="Enter rule text, markdown explanations, or tables..."
                            className="w-full px-3 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                          />
                        )}

                        {/* Practice / Quiz: Exercises list */}
                        {(sec.type === 'practice' || sec.type === 'quiz') && (
                          <div className="space-y-2 pt-1 border-t border-slate-100 dark:border-slate-700/60">
                            <span className="text-[11px] font-bold text-slate-700 dark:text-slate-300 block">
                              Exercises ({sec.exercises?.length || 0})
                            </span>
                            {(sec.exercises || []).map((ex: any, exIdx: number) => (
                              <div
                                key={ex.id || exIdx}
                                className="p-3 rounded-lg bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-700/60 space-y-2"
                              >
                                <div className="flex items-center justify-between gap-2">
                                  <input
                                    type="text"
                                    value={ex.prompt || ''}
                                    onChange={(e) => {
                                      const updatedSec = [...form.sections];
                                      const exercises = [...(sec.exercises || [])];
                                      exercises[exIdx] = { ...ex, prompt: e.target.value };
                                      updatedSec[idx] = { ...sec, exercises };
                                      setForm({ ...form, sections: updatedSec });
                                    }}
                                    placeholder="Exercise question prompt"
                                    className="flex-1 px-2.5 py-1 text-xs rounded-md bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-medium"
                                  />
                                  <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-200 dark:bg-slate-700">
                                    {ex.type || 'mcq'}
                                  </span>
                                </div>

                                {/* Explanation input */}
                                <input
                                  type="text"
                                  value={ex.explanation || ''}
                                  onChange={(e) => {
                                    const updatedSec = [...form.sections];
                                    const exercises = [...(sec.exercises || [])];
                                    exercises[exIdx] = { ...ex, explanation: e.target.value };
                                    updatedSec[idx] = { ...sec, exercises };
                                    setForm({ ...form, sections: updatedSec });
                                  }}
                                  placeholder="Explanation for correct answer (Required for student feedback)"
                                  className={`w-full px-2.5 py-1 text-xs rounded-md bg-white dark:bg-slate-800 border ${
                                    !ex.explanation?.trim()
                                      ? 'border-rose-400 dark:border-rose-600'
                                      : 'border-slate-200 dark:border-slate-700'
                                  }`}
                                />
                              </div>
                            ))}
                            <button
                              type="button"
                              onClick={() => {
                                const updatedSec = [...form.sections];
                                const exercises = [...(sec.exercises || [])];
                                exercises.push({
                                  id: `ex-${Date.now().toString().slice(-4)}`,
                                  type: 'mcq',
                                  prompt: 'Sample exercise prompt',
                                  options: [
                                    { id: 'opt-1', text: 'Option A' },
                                    { id: 'opt-2', text: 'Option B' },
                                    { id: 'opt-3', text: 'Option C' },
                                    { id: 'opt-4', text: 'Option D' },
                                  ],
                                  correctOptionId: 'opt-1',
                                  explanation: 'Explanation justifying the correct option.',
                                });
                                updatedSec[idx] = { ...sec, exercises };
                                setForm({ ...form, sections: updatedSec });
                              }}
                              className="text-[11px] font-bold text-[#124F40] dark:text-[#5BB78D] hover:underline"
                            >
                              + Add Exercise
                            </button>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              /* LIVE STUDENT PREVIEW EXACTLY AS CANDIDATES SEE IT */
              <div className="max-w-2xl mx-auto space-y-6">
                <div className="p-3 rounded-xl bg-teal-500/10 border border-teal-500/20 text-xs text-teal-800 dark:text-teal-200 flex items-center justify-between">
                  <span>Student View Mode: Interactive preview running live validation rules.</span>
                  <span className="font-mono font-bold">~{form.estimatedMinutes} Mins</span>
                </div>

                <div className="border border-slate-200 dark:border-slate-800 rounded-2xl p-6 bg-white dark:bg-slate-900 shadow-sm space-y-6">
                  <div>
                    <h1 className="text-xl font-bold text-slate-900 dark:text-white">
                      {form.title}
                    </h1>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                      {form.description}
                    </p>
                  </div>

                  {/* Sections flow */}
                  <div className="space-y-6">
                    {form.sections.map((sec, idx) => (
                      <div
                        key={idx}
                        className="p-5 rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30 space-y-3"
                      >
                        <h4 className="text-xs font-bold text-slate-900 dark:text-white">
                          {sec.title}
                        </h4>
                        {sec.content && (
                          <div className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed whitespace-pre-wrap">
                            {sec.content}
                          </div>
                        )}

                        {sec.exercises && (
                          <div className="space-y-4 pt-2">
                            {sec.exercises.map((ex: any, exIdx: number) => (
                              <div
                                key={exIdx}
                                className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 space-y-3"
                              >
                                <p className="text-xs font-semibold text-slate-900 dark:text-white">
                                  {ex.prompt}
                                </p>
                                <div className="space-y-1.5">
                                  {(ex.options || []).map((opt: any) => (
                                    <div
                                      key={opt.id}
                                      className="p-2.5 rounded-lg border border-slate-200 dark:border-slate-700 text-xs text-slate-700 dark:text-slate-200 flex items-center justify-between"
                                    >
                                      <span>{opt.text}</span>
                                      {opt.id === ex.correctOptionId && (
                                        <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400">
                                          ✓ Correct Key
                                        </span>
                                      )}
                                    </div>
                                  ))}
                                </div>
                                {ex.explanation && (
                                  <div className="p-2.5 rounded-lg bg-teal-50 dark:bg-teal-950/30 border border-teal-200 dark:border-teal-800 text-[11px] text-teal-800 dark:text-teal-200">
                                    💡 {ex.explanation}
                                  </div>
                                )}
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Right Sidebar: Live Validation Panel & Versions */}
          <div className="w-80 border-l border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/30 p-5 overflow-y-auto shrink-0 space-y-5">
            {showVersionHistory ? (
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                    <History className="w-4 h-4 text-slate-500" />
                    <span>Version History</span>
                  </h4>
                  <button
                    onClick={() => setShowVersionHistory(false)}
                    className="text-xs text-slate-400 hover:text-slate-600"
                  >
                    Close
                  </button>
                </div>

                {versions.length === 0 ? (
                  <p className="text-xs text-slate-400">No previous versions saved yet.</p>
                ) : (
                  <div className="space-y-2">
                    {versions.map((v) => (
                      <div
                        key={v.version}
                        className="p-3 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 space-y-1"
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-mono text-xs font-bold text-slate-800 dark:text-slate-200">
                            Version {v.version}
                          </span>
                          <button
                            onClick={() => {
                              adminCourseStore.restoreVersion(form.id, v.version);
                              setForm({ ...v.snapshot });
                              setShowVersionHistory(false);
                            }}
                            className="text-[11px] font-bold text-[#124F40] dark:text-[#5BB78D] hover:underline"
                          >
                            Restore
                          </button>
                        </div>
                        <span className="text-[10px] text-slate-400 block">{v.timestamp}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              /* LIVE VALIDATION PANEL */
              <div className="space-y-4">
                <div>
                  <h4 className="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                    {validation.canPublish ? (
                      <CheckCircle className="w-4 h-4 text-emerald-500" />
                    ) : (
                      <AlertTriangle className="w-4 h-4 text-rose-500" />
                    )}
                    <span>Pre-Publish Validation</span>
                  </h4>
                  <p className="text-[11px] text-slate-400 mt-0.5">
                    Publishing is blocked until all schema and quality checks pass.
                  </p>
                </div>

                {/* Validation Status Card */}
                <div
                  className={`p-3.5 rounded-xl border text-xs space-y-2 ${
                    validation.canPublish
                      ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-800 dark:text-emerald-300'
                      : 'bg-rose-500/10 border-rose-500/30 text-rose-800 dark:text-rose-300'
                  }`}
                >
                  <span className="font-bold block">
                    {validation.canPublish
                      ? '✓ Ready to Publish'
                      : `⚠ ${validation.errors.length} Blocking Error${validation.errors.length > 1 ? 's' : ''}`}
                  </span>
                  {validation.errors.length > 0 && (
                    <ul className="list-disc list-inside space-y-1 text-[11px]">
                      {validation.errors.map((err, i) => (
                        <li key={i}>{err}</li>
                      ))}
                    </ul>
                  )}
                </div>

                {/* Warnings */}
                {validation.warnings.length > 0 && (
                  <div className="p-3 rounded-xl border border-amber-500/30 bg-amber-500/10 text-amber-800 dark:text-amber-300 text-[11px] space-y-1">
                    <span className="font-bold block">Quality Warnings (Non-blocking):</span>
                    <ul className="list-disc list-inside space-y-0.5">
                      {validation.warnings.map((w, i) => (
                        <li key={i}>{w}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Metrics Breakdown */}
                <div className="p-3 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs space-y-2">
                  <span className="font-bold text-slate-800 dark:text-slate-200 block">
                    Content Metrics
                  </span>
                  <div className="space-y-1 text-[11px] text-slate-500">
                    <div className="flex justify-between">
                      <span>Total Exercises:</span>
                      <span className="font-mono font-bold">{validation.metrics.totalExercises}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>MCQ Items:</span>
                      <span className="font-mono font-bold">{validation.metrics.mcqCount}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Vocab Words:</span>
                      <span className="font-mono font-bold">{validation.metrics.vocabularyCount}</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-between px-6 py-3.5 border-t border-slate-200 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-900/40 shrink-0">
          <div className="text-xs text-slate-500">
            Current Status: <span className="font-bold capitalize">{form.status}</span> &bull; Version v{form.version}
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={() => {
                setForm({ ...form, status: 'draft' });
                onSave({ ...form, status: 'draft' }, false);
              }}
              className="px-4 py-2 rounded-xl bg-slate-200 dark:bg-slate-800 text-slate-800 dark:text-slate-200 text-xs font-bold hover:bg-slate-300"
            >
              Save as Draft
            </button>
            <button
              type="button"
              disabled={!validation.canPublish}
              onClick={() => {
                setForm({ ...form, status: 'published' });
                onSave({ ...form, status: 'published' }, true);
              }}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all shadow-xs ${
                validation.canPublish
                  ? 'bg-[#124F40] hover:bg-[#0E3D32] text-white cursor-pointer'
                  : 'bg-slate-300 dark:bg-slate-800 text-slate-400 cursor-not-allowed'
              }`}
              title={
                validation.canPublish
                  ? 'Publish lesson to student application'
                  : 'Blocked: Fix validation errors above to publish'
              }
            >
              Publish to Students
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
