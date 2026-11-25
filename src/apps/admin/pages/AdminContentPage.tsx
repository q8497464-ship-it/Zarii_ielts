import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  FileText,
  Plus,
  Trash2,
  Archive,
  CheckCircle,
  Eye,
  Edit,
  BookOpen,
  Mic,
  PenTool,
  Sparkles,
  HardDrive,
  FileCode,
  Download,
  Upload,
  RefreshCw,
  Layers,
  Filter,
} from 'lucide-react';
import type {
  TestEntity,
  WritingPromptEntity,
  SpeakingCardEntity,
  GrammarLessonEntity,
  ContentStatus,
  DifficultyLevel,
  TestType,
} from '../../../shared/types/database';
import { contentStore } from '../../../shared/content/contentStore';
import { DataTable, type ColumnDef } from '../components/DataTable';
import { FilterBar, type FilterGroup } from '../components/FilterBar';
import { StatusBadge } from '../components/StatusBadge';
import { ConfirmDialog } from '../components/ConfirmDialog';
import { useAdminToast } from '../components/AdminToast';

// Sub-components
import { TestEditor } from '../components/content/TestEditor';
import { WritingEditor } from '../components/content/WritingEditor';
import { SpeakingEditor } from '../components/content/SpeakingEditor';
import { VocabManager } from '../components/content/VocabManager';
import { GrammarEditor } from '../components/content/GrammarEditor';
import { MediaLibrary } from '../components/content/MediaLibrary';
import { ImportExportModal } from '../components/content/ImportExportModal';
import { CourseManager } from '../components/content/CourseManager';
import { DictionaryManager } from '../components/content/DictionaryManager';

export function AdminContentPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentTab = searchParams.get('tab') || 'tests';
  const { addToast } = useAdminToast();

  // Reactive store state
  const [tests, setTests] = useState<TestEntity[]>(() => contentStore.getTests());
  const [writingPrompts, setWritingPrompts] = useState<WritingPromptEntity[]>(() => contentStore.getWritingPrompts());
  const [speakingCards, setSpeakingCards] = useState<SpeakingCardEntity[]>(() => contentStore.getSpeakingCards());
  const [grammarLessons, setGrammarLessons] = useState<GrammarLessonEntity[]>(() => contentStore.getGrammarLessons());

  // Filters State for Tests
  const [testSearch, setTestSearch] = useState('');
  const [moduleFilter, setModuleFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  const [difficultyFilter, setDifficultyFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');

  // Modal Controls
  const [activeTestEditorId, setActiveTestEditorId] = useState<string | null>(null);
  const [isTestEditorOpen, setIsTestEditorOpen] = useState(false);

  const [activeWritingId, setActiveWritingId] = useState<string | null>(null);
  const [isWritingEditorOpen, setIsWritingEditorOpen] = useState(false);

  const [activeSpeakingId, setActiveSpeakingId] = useState<string | null>(null);
  const [isSpeakingEditorOpen, setIsSpeakingEditorOpen] = useState(false);

  const [activeGrammarId, setActiveGrammarId] = useState<string | null>(null);
  const [isGrammarEditorOpen, setIsGrammarEditorOpen] = useState(false);

  const [isImportExportOpen, setIsImportExportOpen] = useState(false);
  const [isMigrating, setIsMigrating] = useState(false);

  // Soft delete confirm dialog
  const [deleteTargetTest, setDeleteTargetTest] = useState<TestEntity | null>(null);

  useEffect(() => {
    return contentStore.subscribe(() => {
      setTests(contentStore.getTests());
      setWritingPrompts(contentStore.getWritingPrompts());
      setSpeakingCards(contentStore.getSpeakingCards());
      setGrammarLessons(contentStore.getGrammarLessons());
    });
  }, []);

  // Direct test opener via query param (e.g. from analytics review button)
  useEffect(() => {
    const testId = searchParams.get('testId');
    if (testId) {
      setActiveTestEditorId(testId);
      setIsTestEditorOpen(true);
    }
  }, [searchParams]);

  const setTab = (tab: string) => setSearchParams({ tab });

  // One-time content migration trigger
  const handleRunMigration = () => {
    setIsMigrating(true);
    setTimeout(() => {
      const counts = contentStore.migrateDefaultContent();
      setIsMigrating(false);
      addToast({
        type: 'success',
        title: 'Migration Completed',
        message: `Migrated ${counts.testsCount} tests, ${counts.questionsCount} questions, ${counts.vocabCount} vocabulary words into database.`,
      });
    }, 400);
  };

  // Tests Filters
  const testFilterGroups: FilterGroup[] = [
    {
      id: 'module',
      label: 'Skill Module',
      selectedValue: moduleFilter,
      options: [
        { label: 'All Modules', value: 'all' },
        { label: 'Reading', value: 'reading' },
        { label: 'Listening', value: 'listening' },
      ],
    },
    {
      id: 'type',
      label: 'Academic / General',
      selectedValue: typeFilter,
      options: [
        { label: 'All Types', value: 'all' },
        { label: 'Academic IELTS', value: 'academic' },
        { label: 'General Training', value: 'general' },
      ],
    },
    {
      id: 'difficulty',
      label: 'Difficulty',
      selectedValue: difficultyFilter,
      options: [
        { label: 'All Difficulties', value: 'all' },
        { label: 'Exam Standard', value: 'exam_standard' },
        { label: 'Advanced', value: 'advanced' },
        { label: 'Intermediate', value: 'intermediate' },
        { label: 'Beginner', value: 'beginner' },
      ],
    },
    {
      id: 'status',
      label: 'Status',
      selectedValue: statusFilter,
      options: [
        { label: 'All Statuses', value: 'all' },
        { label: 'Published', value: 'published' },
        { label: 'Draft', value: 'draft' },
        { label: 'Archived', value: 'archived' },
      ],
    },
  ];

  const filteredTests = useMemo(() => {
    return tests.filter((t) => {
      if (moduleFilter !== 'all' && t.skill !== moduleFilter) return false;
      if (typeFilter !== 'all' && t.type !== typeFilter) return false;
      if (difficultyFilter !== 'all' && t.difficulty !== difficultyFilter) return false;
      if (statusFilter !== 'all' && t.status !== statusFilter) return false;
      if (testSearch.trim()) {
        const q = testSearch.toLowerCase();
        return (
          t.title.toLowerCase().includes(q) ||
          t.id.toLowerCase().includes(q) ||
          (t.topic && t.topic.toLowerCase().includes(q))
        );
      }
      return true;
    });
  }, [tests, moduleFilter, typeFilter, difficultyFilter, statusFilter, testSearch]);

  // Bulk Actions
  const handleBulkPublish = (selected: TestEntity[]) => {
    contentStore.bulkUpdateTestStatus(selected.map((s) => s.id), 'published');
    addToast({
      type: 'success',
      title: 'Tests Published',
      message: `${selected.length} tests published to student workspace.`,
    });
  };

  const handleBulkUnpublish = (selected: TestEntity[]) => {
    contentStore.bulkUpdateTestStatus(selected.map((s) => s.id), 'draft');
    addToast({
      type: 'info',
      title: 'Moved to Drafts',
      message: `${selected.length} tests reverted to draft.`,
    });
  };

  const handleBulkArchive = (selected: TestEntity[]) => {
    contentStore.bulkUpdateTestStatus(selected.map((s) => s.id), 'archived');
    addToast({
      type: 'info',
      title: 'Tests Archived',
      message: `${selected.length} tests archived.`,
    });
  };

  const handleConfirmSoftDelete = () => {
    if (!deleteTargetTest) return;
    contentStore.deleteTest(deleteTargetTest.id, true);
    addToast({
      type: 'warning',
      title: 'Test Soft-Deleted',
      message: `"${deleteTargetTest.title}" moved to archived trash.`,
    });
    setDeleteTargetTest(null);
  };

  // Test Columns
  const testColumns: ColumnDef<TestEntity>[] = [
    {
      id: 'title',
      header: 'Test Title & ID',
      accessorKey: 'title',
      sortable: true,
      cell: (t) => (
        <div>
          <span className="font-bold text-slate-900 dark:text-white block line-clamp-1">{t.title}</span>
          <span className="text-[11px] font-mono text-slate-400">ID: {t.id} • v{t.version}</span>
        </div>
      ),
    },
    {
      id: 'skill',
      header: 'Skill',
      accessorKey: 'skill',
      sortable: true,
      cell: (t) => (
        <span className="inline-flex items-center gap-1 text-[11px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
          {t.skill}
        </span>
      ),
    },
    {
      id: 'type',
      header: 'Type',
      accessorKey: 'type',
      sortable: true,
      cell: (t) => (
        <span className="text-xs font-semibold capitalize text-slate-600 dark:text-slate-400">
          {t.type}
        </span>
      ),
    },
    {
      id: 'difficulty',
      header: 'Difficulty',
      accessorKey: 'difficulty',
      sortable: true,
      cell: (t) => (
        <span className="text-[11px] text-slate-500 capitalize">
          {t.difficulty.replace('_', ' ')}
        </span>
      ),
    },
    {
      id: 'status',
      header: 'Status',
      accessorKey: 'status',
      sortable: true,
      cell: (t) => <StatusBadge status={t.status} />,
    },
    {
      id: 'total_questions',
      header: 'Questions',
      accessorKey: 'total_questions',
      sortable: true,
      cell: (t) => <span className="text-xs font-mono font-bold">{t.total_questions} Qs</span>,
    },
    {
      id: 'actions',
      header: 'Actions',
      cell: (t) => (
        <div className="flex items-center gap-1.5" onClick={(e) => e.stopPropagation()}>
          <button
            onClick={() => {
              setActiveTestEditorId(t.id);
              setIsTestEditorOpen(true);
            }}
            title="Edit Test in Question Builder"
            className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors"
          >
            <Edit className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => setDeleteTargetTest(t)}
            title="Soft Delete Test"
            className="p-1.5 rounded-lg hover:bg-rose-50 dark:hover:bg-rose-950/40 text-slate-400 hover:text-rose-600 transition-colors"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        </div>
      ),
    },
  ];

  // Writing Columns
  const writingColumns: ColumnDef<WritingPromptEntity>[] = [
    {
      id: 'title',
      header: 'Writing Prompt Title',
      accessorKey: 'title',
      sortable: true,
      cell: (w) => (
        <div>
          <span className="font-bold text-slate-900 dark:text-white block">{w.title}</span>
          <span className="text-[11px] font-mono text-slate-400">ID: {w.id}</span>
        </div>
      ),
    },
    {
      id: 'task_type',
      header: 'Task Type',
      accessorKey: 'task_type',
      sortable: true,
      cell: (w) => (
        <span className="text-xs font-mono font-semibold px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800">
          {w.task_type}
        </span>
      ),
    },
    {
      id: 'min_words',
      header: 'Min Words',
      accessorKey: 'min_words',
      cell: (w) => <span className="text-xs font-mono">{w.min_words} words</span>,
    },
    {
      id: 'status',
      header: 'Status',
      accessorKey: 'status',
      cell: (w) => <StatusBadge status={w.status} />,
    },
    {
      id: 'actions',
      header: 'Actions',
      cell: (w) => (
        <div className="flex items-center gap-1.5" onClick={(e) => e.stopPropagation()}>
          <button
            onClick={() => {
              setActiveWritingId(w.id);
              setIsWritingEditorOpen(true);
            }}
            className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 hover:text-white"
          >
            <Edit className="w-3.5 h-3.5" />
          </button>
        </div>
      ),
    },
  ];

  // Speaking Columns
  const speakingColumns: ColumnDef<SpeakingCardEntity>[] = [
    {
      id: 'topic',
      header: 'Speaking Topic & Cue Card',
      accessorKey: 'topic',
      sortable: true,
      cell: (s) => (
        <div>
          <span className="font-bold text-slate-900 dark:text-white block">{s.topic}</span>
          <span className="text-[11px] font-mono text-slate-400">{s.cue_card_title || `Part ${s.part}`}</span>
        </div>
      ),
    },
    {
      id: 'part',
      header: 'Exam Part',
      accessorKey: 'part',
      sortable: true,
      cell: (s) => (
        <span className="text-xs font-bold text-[#124F40] dark:text-[#5BB78D]">
          Part {s.part}
        </span>
      ),
    },
    {
      id: 'prompts',
      header: 'Cue Bullets',
      cell: (s) => <span className="text-xs font-mono">{s.prompts?.length || 0} bullets</span>,
    },
    {
      id: 'actions',
      header: 'Actions',
      cell: (s) => (
        <div className="flex items-center gap-1.5" onClick={(e) => e.stopPropagation()}>
          <button
            onClick={() => {
              setActiveSpeakingId(s.id);
              setIsSpeakingEditorOpen(true);
            }}
            className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 hover:text-white"
          >
            <Edit className="w-3.5 h-3.5" />
          </button>
        </div>
      ),
    },
  ];

  // Grammar Columns
  const grammarColumns: ColumnDef<GrammarLessonEntity>[] = [
    {
      id: 'title',
      header: 'Lesson Title',
      accessorKey: 'title',
      sortable: true,
      cell: (g) => (
        <div>
          <span className="font-bold text-slate-900 dark:text-white block">{g.title}</span>
          <span className="text-[11px] text-slate-400 font-mono">Slug: {g.slug}</span>
        </div>
      ),
    },
    {
      id: 'category',
      header: 'Category',
      accessorKey: 'category',
      sortable: true,
      cell: (g) => <span className="text-xs font-medium">{g.category}</span>,
    },
    {
      id: 'quiz_questions',
      header: 'Exercises',
      cell: (g) => <span className="text-xs font-mono font-bold">{g.quiz_questions?.length || 0} items</span>,
    },
    {
      id: 'actions',
      header: 'Actions',
      cell: (g) => (
        <div className="flex items-center gap-1.5" onClick={(e) => e.stopPropagation()}>
          <button
            onClick={() => {
              setActiveGrammarId(g.id);
              setIsGrammarEditorOpen(true);
            }}
            className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 hover:text-white"
          >
            <Edit className="w-3.5 h-3.5" />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      {/* 1. Header Toolbar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-2xl bg-white dark:bg-[#112019] border border-slate-200/90 dark:border-[#24392F] shadow-xs">
        <div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Curriculum &amp; Content Management (CMS)
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Author and validate Reading, Listening, Writing, Speaking, Vocabulary, and Grammar assets.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {/* One-Time Content Migration Trigger */}
          <button
            onClick={handleRunMigration}
            disabled={isMigrating}
            className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-50 text-xs font-semibold transition-all shadow-xs"
            title="Import/sync all JSON files into database preserving original IDs"
          >
            <RefreshCw className={`w-3.5 h-3.5 text-[#5BB78D] ${isMigrating ? 'animate-spin' : ''}`} />
            <span>Sync JSON Migration</span>
          </button>

          {/* Import / Export */}
          <button
            onClick={() => setIsImportExportOpen(true)}
            className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-50 text-xs font-semibold transition-all shadow-xs"
          >
            <FileCode className="w-3.5 h-3.5 text-slate-500" />
            <span>Import / Export</span>
          </button>

          {/* Primary Create Button */}
          {currentTab === 'tests' && (
            <button
              onClick={() => {
                setActiveTestEditorId(null);
                setIsTestEditorOpen(true);
              }}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#124F40] hover:bg-[#0E3D32] text-white text-xs font-bold transition-all shadow-sm shrink-0 cursor-pointer"
            >
              <Plus className="w-4 h-4 text-[#5BB78D]" />
              New Test Specification
            </button>
          )}

          {currentTab === 'writing' && (
            <button
              onClick={() => {
                setActiveWritingId(null);
                setIsWritingEditorOpen(true);
              }}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#124F40] hover:bg-[#0E3D32] text-white text-xs font-bold transition-all shadow-sm shrink-0 cursor-pointer"
            >
              <Plus className="w-4 h-4 text-[#5BB78D]" />
              New Writing Prompt
            </button>
          )}

          {currentTab === 'speaking' && (
            <button
              onClick={() => {
                setActiveSpeakingId(null);
                setIsSpeakingEditorOpen(true);
              }}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#124F40] hover:bg-[#0E3D32] text-white text-xs font-bold transition-all shadow-sm shrink-0 cursor-pointer"
            >
              <Plus className="w-4 h-4 text-[#5BB78D]" />
              New Speaking Card
            </button>
          )}

          {currentTab === 'grammar' && (
            <button
              onClick={() => {
                setActiveGrammarId(null);
                setIsGrammarEditorOpen(true);
              }}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#124F40] hover:bg-[#0E3D32] text-white text-xs font-bold transition-all shadow-sm shrink-0 cursor-pointer"
            >
              <Plus className="w-4 h-4 text-[#5BB78D]" />
              New Grammar Lesson
            </button>
          )}
        </div>
      </div>

      {/* 2. Navigation Tabs */}
      <div className="flex items-center gap-1 border-b border-slate-200 dark:border-slate-800 overflow-x-auto">
        {[
          { id: 'course', label: 'English Course & Lessons', icon: BookOpen },
          { id: 'dictionary', label: 'Dictionary & Patches', icon: Sparkles },
          { id: 'tests', label: `IELTS Tests & Mocks (${tests.length})`, icon: FileText },
          { id: 'writing', label: `Writing Prompts (${writingPrompts.length})`, icon: PenTool },
          { id: 'speaking', label: `Speaking Cards (${speakingCards.length})`, icon: Mic },
          { id: 'vocab', label: 'Vocabulary & AWL', icon: Sparkles },
          { id: 'grammar', label: `Grammar Lessons (${grammarLessons.length})`, icon: Layers },
          { id: 'media', label: 'Media Library & Audio', icon: HardDrive },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = currentTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setTab(tab.id)}
              className={`inline-flex items-center gap-2 px-4 py-2.5 text-xs font-semibold border-b-2 transition-all whitespace-nowrap cursor-pointer ${
                isActive
                  ? 'border-[#5BB78D] text-[#124F40] dark:text-[#5BB78D] font-bold'
                  : 'border-transparent text-slate-500 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* 3. Tab Views */}
      {currentTab === 'course' && (
        <CourseManager
          onOpenTestEditor={(testId) => {
            setActiveTestEditorId(testId);
            setIsTestEditorOpen(true);
          }}
        />
      )}

      {currentTab === 'dictionary' && <DictionaryManager />}

      {currentTab === 'tests' && (
        <div className="space-y-6">
          <FilterBar
            searchValue={testSearch}
            onSearchChange={setTestSearch}
            searchPlaceholder="Search tests by title, test ID, or topic domain..."
            filters={testFilterGroups}
            onFilterChange={(filterId, val) => {
              if (filterId === 'module') setModuleFilter(val);
              if (filterId === 'type') setTypeFilter(val);
              if (filterId === 'difficulty') setDifficultyFilter(val);
              if (filterId === 'status') setStatusFilter(val);
            }}
            onResetFilters={() => {
              setTestSearch('');
              setModuleFilter('all');
              setTypeFilter('all');
              setDifficultyFilter('all');
              setStatusFilter('all');
            }}
          />

          <DataTable
            data={filteredTests}
            columns={testColumns}
            keyExtractor={(item) => item.id}
            title="TEST INVENTORY"
            bulkActions={[
              {
                label: 'Bulk Publish',
                icon: CheckCircle,
                onClick: handleBulkPublish,
              },
              {
                label: 'Revert to Draft',
                onClick: handleBulkUnpublish,
              },
              {
                label: 'Archive Selected',
                icon: Archive,
                onClick: handleBulkArchive,
                isDestructive: true,
              },
            ]}
          />
        </div>
      )}

      {currentTab === 'writing' && (
        <DataTable
          data={writingPrompts}
          columns={writingColumns}
          keyExtractor={(item) => item.id}
          title="WRITING ASSESSMENT PROMPTS"
        />
      )}

      {currentTab === 'speaking' && (
        <DataTable
          data={speakingCards}
          columns={speakingColumns}
          keyExtractor={(item) => item.id}
          title="SPEAKING CUE CARDS"
        />
      )}

      {currentTab === 'vocab' && <VocabManager />}

      {currentTab === 'grammar' && (
        <DataTable
          data={grammarLessons}
          columns={grammarColumns}
          keyExtractor={(item) => item.id}
          title="ACADEMIC GRAMMAR LESSONS"
        />
      )}

      {currentTab === 'media' && <MediaLibrary />}

      {/* 4. Step-by-Step Test Editor Modal */}
      {isTestEditorOpen && (
        <TestEditor
          testId={activeTestEditorId}
          onClose={() => {
            setIsTestEditorOpen(false);
            setActiveTestEditorId(null);
          }}
          onSaved={() => {
            setTests(contentStore.getTests());
          }}
        />
      )}

      {/* 5. Writing Prompt Editor Modal */}
      {isWritingEditorOpen && (
        <WritingEditor
          promptId={activeWritingId}
          onClose={() => {
            setIsWritingEditorOpen(false);
            setActiveWritingId(null);
          }}
          onSaved={() => {
            setWritingPrompts(contentStore.getWritingPrompts());
          }}
        />
      )}

      {/* 6. Speaking Card Editor Modal */}
      {isSpeakingEditorOpen && (
        <SpeakingEditor
          cardId={activeSpeakingId}
          onClose={() => {
            setIsSpeakingEditorOpen(false);
            setActiveSpeakingId(null);
          }}
          onSaved={() => {
            setSpeakingCards(contentStore.getSpeakingCards());
          }}
        />
      )}

      {/* 7. Grammar Lesson Editor Modal */}
      {isGrammarEditorOpen && (
        <GrammarEditor
          lessonId={activeGrammarId}
          onClose={() => {
            setIsGrammarEditorOpen(false);
            setActiveGrammarId(null);
          }}
          onSaved={() => {
            setGrammarLessons(contentStore.getGrammarLessons());
          }}
        />
      )}

      {/* 8. Full Import / Export Modal */}
      <ImportExportModal
        isOpen={isImportExportOpen}
        onClose={() => setIsImportExportOpen(false)}
        onSuccess={() => {
          setTests(contentStore.getTests());
          setWritingPrompts(contentStore.getWritingPrompts());
          setSpeakingCards(contentStore.getSpeakingCards());
          setGrammarLessons(contentStore.getGrammarLessons());
        }}
      />

      {/* 9. Soft Delete Confirmation Dialog */}
      <ConfirmDialog
        isOpen={Boolean(deleteTargetTest)}
        onClose={() => setDeleteTargetTest(null)}
        onConfirm={handleConfirmSoftDelete}
        title="Soft Delete Test Material?"
        message={`This will move "${deleteTargetTest?.title}" to archived status. Students will no longer see it in practice listings.`}
        confirmMatchText="DELETE"
        confirmLabel="Confirm Soft Delete"
      />
    </div>
  );
}
