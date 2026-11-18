import React, { useState, useEffect, useMemo } from 'react';
import {
  Save,
  CheckCircle2,
  AlertTriangle,
  Clock,
  Eye,
  Plus,
  Trash2,
  History,
  RotateCcw,
  BookOpen,
  HelpCircle,
  FileText,
  Layers,
  ChevronRight,
  ChevronLeft,
  X,
  Volume2,
} from 'lucide-react';
import type {
  TestEntity,
  PassageEntity,
  SectionEntity,
  QuestionEntity,
  DifficultyLevel,
} from '../../../../shared/types/database';
import {
  contentStore,
  type TestValidationResult,
  type VersionSnapshot,
} from '../../../../shared/content/contentStore';
import { MarkdownEditor } from '../MarkdownEditor';
import { useAdminToast } from '../AdminToast';

interface TestEditorProps {
  testId?: string | null;
  initialSkill?: 'reading' | 'listening';
  onClose: () => void;
  onSaved: () => void;
}

const QUESTION_TYPES = [
  { value: 'true-false-not-given', label: 'True / False / Not Given' },
  { value: 'yes-no-not-given', label: 'Yes / No / Not Given' },
  { value: 'matching-headings', label: 'Matching Headings' },
  { value: 'matching-information', label: 'Matching Information' },
  { value: 'multiple-choice', label: 'Multiple Choice' },
  { value: 'completion', label: 'Summary / Sentence / Table Completion' },
  { value: 'short-answer', label: 'Short Answer Questions' },
  { value: 'map-labelling', label: 'Diagram / Map / Plan Labelling' },
];

export function TestEditor({ testId, initialSkill = 'reading', onClose, onSaved }: TestEditorProps) {
  const { addToast } = useAdminToast();
  const [activeStep, setActiveStep] = useState<1 | 2 | 3 | 4>(1); // 1: Details, 2: Passages/Sections, 3: Questions, 4: Preview

  // Test Details State
  const [test, setTest] = useState<TestEntity>(() => {
    if (testId) {
      const existing = contentStore.getTestById(testId);
      if (existing) return { ...existing };
    }
    return {
      id: testId || `${initialSkill === 'reading' ? 'read' : 'list'}-${Date.now().toString().slice(-4)}`,
      title: '',
      type: 'academic',
      skill: initialSkill,
      status: 'draft',
      difficulty: 'exam_standard',
      topic: 'Academic Research & Technology',
      band_level: 7.5,
      version: 1,
      duration_minutes: initialSkill === 'reading' ? 60 : 35,
      total_questions: 40,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
  });

  // Passages (Reading) or Sections (Listening)
  const [passages, setPassages] = useState<PassageEntity[]>(() => {
    if (testId && test.skill === 'reading') {
      const existing = contentStore.getPassagesForTest(testId);
      if (existing.length > 0) return existing;
    }
    if (test.skill === 'reading') {
      return [
        {
          id: `${test.id}-p1`,
          test_id: test.id,
          passage_number: 1,
          title: 'Reading Passage 1',
          subheading: 'Stimulus Title and Background Information',
          content: 'The development of sustainable agriculture across temperate climatic zones has yielded significant advancements...\n\nParagraph A: Historical perspectives on crop rotation...',
          status: 'draft',
          difficulty: 'exam_standard',
          version: 1,
          created_at: new Date().toISOString(),
        },
      ];
    }
    return [];
  });

  const [sections, setSections] = useState<SectionEntity[]>(() => {
    if (testId && test.skill === 'listening') {
      const existing = contentStore.getSectionsForTest(testId);
      if (existing.length > 0) return existing;
    }
    if (test.skill === 'listening') {
      return [
        {
          id: `${test.id}-s1`,
          test_id: test.id,
          section_number: 1,
          title: 'Section 1: General Conversation',
          instructions: 'A phone conversation between a librarian and an enrolled student.',
          audio_url: '/audio/listening/sample.mp3',
          duration_seconds: 400,
          status: 'draft',
          version: 1,
          created_at: new Date().toISOString(),
        },
      ];
    }
    return [];
  });

  // Questions
  const [questions, setQuestions] = useState<QuestionEntity[]>(() => {
    if (testId) {
      const existing = contentStore.getQuestionsForTest(testId);
      if (existing.length > 0) return existing;
    }
    return [
      {
        id: `${test.id}-q1`,
        test_id: test.id,
        passage_id: passages[0]?.id || null,
        section_id: sections[0]?.id || null,
        question_number: 1,
        type: 'true-false-not-given',
        prompt: 'The initial research in temperate climates began prior to the nineteenth century.',
        options: [],
        correct_answer: 'TRUE',
        explanation: 'The passage explicitly states historical research began in the eighteenth century.',
        difficulty: 'exam_standard',
        status: 'draft',
        version: 1,
        created_at: new Date().toISOString(),
      },
    ];
  });

  const [activePassageTab, setActivePassageTab] = useState(0);
  const [lastAutoSaved, setLastAutoSaved] = useState<string | null>(null);
  const [versionHistory, setVersionHistory] = useState<VersionSnapshot[]>([]);
  const [isVersionDrawerOpen, setIsVersionDrawerOpen] = useState(false);

  // Load version history
  useEffect(() => {
    if (testId) {
      setVersionHistory(contentStore.getVersionSnapshots(testId));
    }
  }, [testId]);

  // Validation calculation
  const validation: TestValidationResult = useMemo(() => {
    return contentStore.validateTest(test, passages, sections, questions);
  }, [test, passages, sections, questions]);

  // Auto-save draft every 30 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      contentStore.saveDraft(test.id, { test, passages, sections, questions });
      setLastAutoSaved(new Date().toLocaleTimeString());
    }, 25000);
    return () => clearInterval(timer);
  }, [test, passages, sections, questions]);

  // Handle Save or Publish
  const handleSave = (publish = false) => {
    if (publish && !validation.isValid) {
      addToast({
        type: 'error',
        title: 'Validation Errors Block Publishing',
        message: 'Resolve all blocking validation issues before publishing.',
      });
      return;
    }

    const updatedTest: TestEntity = {
      ...test,
      status: publish ? 'published' : 'draft',
      total_questions: questions.length,
    };

    contentStore.saveTest(updatedTest, passages, sections, questions);
    contentStore.clearDraft(test.id);

    addToast({
      type: 'success',
      title: publish ? 'Test Published Live' : 'Draft Test Saved',
      message: `"${updatedTest.title}" (${questions.length} questions) stored successfully.`,
    });

    onSaved();
    onClose();
  };

  // Add Passage
  const handleAddPassage = () => {
    const num = passages.length + 1;
    const newP: PassageEntity = {
      id: `${test.id}-p${num}`,
      test_id: test.id,
      passage_number: num,
      title: `Reading Passage ${num}`,
      subheading: 'Stimulus Title and Academic Overview',
      content: `Passage ${num} academic text content...`,
      status: 'draft',
      difficulty: 'exam_standard',
      version: 1,
      created_at: new Date().toISOString(),
    };
    setPassages([...passages, newP]);
    setActivePassageTab(passages.length);
  };

  // Add Section (Listening)
  const handleAddSection = () => {
    const num = sections.length + 1;
    const newS: SectionEntity = {
      id: `${test.id}-s${num}`,
      test_id: test.id,
      section_number: num,
      title: `Listening Section ${num}`,
      instructions: `Context description for Part ${num}...`,
      audio_url: '',
      duration_seconds: 400,
      status: 'draft',
      version: 1,
      created_at: new Date().toISOString(),
    };
    setSections([...sections, newS]);
    setActivePassageTab(sections.length);
  };

  // Add Question
  const handleAddQuestion = () => {
    const nextNum = questions.length > 0 ? Math.max(...questions.map((q) => q.question_number)) + 1 : 1;
    const newQ: QuestionEntity = {
      id: `${test.id}-q${nextNum}`,
      test_id: test.id,
      passage_id: test.skill === 'reading' && passages[activePassageTab] ? passages[activePassageTab].id : null,
      section_id: test.skill === 'listening' && sections[activePassageTab] ? sections[activePassageTab].id : null,
      question_number: nextNum,
      type: 'multiple-choice',
      prompt: `New Question #${nextNum} prompt...`,
      options: [
        { id: 'A', text: 'Option A statement' },
        { id: 'B', text: 'Option B statement' },
        { id: 'C', text: 'Option C statement' },
        { id: 'D', text: 'Option D statement' },
      ],
      correct_answer: 'A',
      explanation: 'Explanation citing the passage evidence.',
      difficulty: 'exam_standard',
      status: 'draft',
      version: 1,
      created_at: new Date().toISOString(),
    };
    setQuestions([...questions, newQ]);
  };

  // Remove Question
  const handleRemoveQuestion = (id: string) => {
    setQuestions(questions.filter((q) => q.id !== id));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-950/80 backdrop-blur-xs">
      <div className="bg-white dark:bg-[#112019] border border-slate-200 dark:border-[#24392F] rounded-2xl w-full max-w-7xl h-[95vh] flex flex-col shadow-2xl overflow-hidden">
        {/* 1. Header Toolbar */}
        <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-4 bg-slate-50/50 dark:bg-slate-900/50 shrink-0">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-[#124F40] text-white">
              <BookOpen className="w-5 h-5 text-[#5BB78D]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-base font-bold text-slate-900 dark:text-white">
                  {test.title || 'Untitled Test Specification'}
                </h1>
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                  {test.skill.toUpperCase()}
                </span>
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-[#124F40]/15 text-[#124F40] dark:text-[#5BB78D]">
                  v{test.version}
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {questions.length} questions • {passages.length || sections.length} {test.skill === 'reading' ? 'passages' : 'sections'}
                {lastAutoSaved && ` • Auto-saved at ${lastAutoSaved}`}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Version History Button */}
            <button
              onClick={() => setIsVersionDrawerOpen(true)}
              className="px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-200 flex items-center gap-1.5 transition-colors"
            >
              <History className="w-3.5 h-3.5 text-slate-500" />
              <span>Versions ({versionHistory.length})</span>
            </button>

            {/* Save Draft */}
            <button
              onClick={() => handleSave(false)}
              className="px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 hover:bg-slate-50 text-xs font-bold transition-all shadow-xs"
            >
              Save Draft
            </button>

            {/* Publish Live */}
            <button
              onClick={() => handleSave(true)}
              disabled={!validation.isValid}
              className={`px-5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 shadow-sm ${
                validation.isValid
                  ? 'bg-[#124F40] hover:bg-[#0E3D32] text-white cursor-pointer'
                  : 'bg-slate-200 dark:bg-slate-800 text-slate-400 cursor-not-allowed'
              }`}
            >
              <CheckCircle2 className="w-4 h-4 text-[#5BB78D]" />
              Publish Live
            </button>

            {/* Close */}
            <button
              onClick={onClose}
              className="p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-slate-600 dark:hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* 2. Step Navigator Tabs */}
        <div className="flex items-center justify-between px-6 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-[#112019] shrink-0">
          <div className="flex items-center gap-2">
            {[
              { step: 1, label: '1. Test Metadata' },
              { step: 2, label: test.skill === 'reading' ? '2. Passages Stimulus' : '2. Audio Sections' },
              { step: 3, label: `3. Question Builder (${questions.length})` },
              { step: 4, label: '4. Student Mock Preview' },
            ].map((tab) => (
              <button
                key={tab.step}
                onClick={() => setActiveStep(tab.step as any)}
                className={`px-4 py-3 text-xs font-bold border-b-2 transition-all flex items-center gap-1.5 ${
                  activeStep === tab.step
                    ? 'border-[#5BB78D] text-[#124F40] dark:text-[#5BB78D]'
                    : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Validation Warning Indicator */}
          {!validation.isValid ? (
            <div className="flex items-center gap-1 text-[11px] font-semibold text-rose-600 dark:text-rose-400">
              <AlertTriangle className="w-3.5 h-3.5" />
              <span>{validation.errors.length} errors blocking publish</span>
            </div>
          ) : (
            <div className="flex items-center gap-1 text-[11px] font-semibold text-emerald-600 dark:text-emerald-400">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Valid &amp; ready to publish</span>
            </div>
          )}
        </div>

        {/* 3. Main Workspace Area */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* STEP 1: TEST DETAILS */}
          {activeStep === 1 && (
            <div className="max-w-4xl mx-auto space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                    Official Test Title
                  </label>
                  <input
                    type="text"
                    required
                    value={test.title}
                    onChange={(e) => setTest({ ...test, title: e.target.value })}
                    placeholder="e.g. Cambridge Academic 19 — Reading Practice Test 2"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs font-medium text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#5BB78D]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                    Skill Module
                  </label>
                  <select
                    value={test.skill}
                    onChange={(e) => setTest({ ...test, skill: e.target.value as 'reading' | 'listening' })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs font-medium text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#5BB78D]"
                  >
                    <option value="reading">Reading</option>
                    <option value="listening">Listening</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                    Test Type
                  </label>
                  <select
                    value={test.type}
                    onChange={(e) => setTest({ ...test, type: e.target.value as any })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs font-medium text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#5BB78D]"
                  >
                    <option value="academic">Academic IELTS</option>
                    <option value="general">General Training IELTS</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                    Difficulty Level
                  </label>
                  <select
                    value={test.difficulty}
                    onChange={(e) => setTest({ ...test, difficulty: e.target.value as DifficultyLevel })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs font-medium text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#5BB78D]"
                  >
                    <option value="beginner">Beginner (Band 5.0 - 5.5)</option>
                    <option value="intermediate">Intermediate (Band 6.0 - 6.5)</option>
                    <option value="advanced">Advanced (Band 7.0 - 7.5)</option>
                    <option value="exam_standard">Exam Standard (Band 8.0 - 9.0)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                    Duration (Minutes)
                  </label>
                  <input
                    type="number"
                    value={test.duration_minutes}
                    onChange={(e) => setTest({ ...test, duration_minutes: Number(e.target.value) })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs font-medium text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#5BB78D]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                    Primary Topic / Domain
                  </label>
                  <input
                    type="text"
                    value={test.topic || ''}
                    onChange={(e) => setTest({ ...test, topic: e.target.value })}
                    placeholder="e.g. Environmental Science & Architecture"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs font-medium text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#5BB78D]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                    Target Question Count
                  </label>
                  <input
                    type="number"
                    value={test.total_questions}
                    onChange={(e) => setTest({ ...test, total_questions: Number(e.target.value) })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs font-medium text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#5BB78D]"
                  />
                </div>
              </div>

              <div className="flex justify-end pt-4">
                <button
                  type="button"
                  onClick={() => setActiveStep(2)}
                  className="px-5 py-2.5 rounded-xl bg-[#124F40] hover:bg-[#0E3D32] text-white text-xs font-bold flex items-center gap-1.5 shadow-xs"
                >
                  <span>Continue to {test.skill === 'reading' ? 'Passages' : 'Sections'}</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 2: PASSAGES / SECTIONS */}
          {activeStep === 2 && (
            <div className="space-y-6">
              {test.skill === 'reading' ? (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 overflow-x-auto">
                      {passages.map((p, idx) => (
                        <button
                          key={p.id}
                          onClick={() => setActivePassageTab(idx)}
                          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                            activePassageTab === idx
                              ? 'bg-[#124F40] text-white shadow-xs'
                              : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
                          }`}
                        >
                          Passage {p.passage_number} ({p.content.split(/\s+/).length} words)
                        </button>
                      ))}
                      <button
                        onClick={handleAddPassage}
                        className="px-3 py-2 rounded-xl border border-dashed border-slate-300 dark:border-slate-700 text-xs font-semibold text-slate-600 dark:text-slate-400 hover:bg-slate-50 flex items-center gap-1"
                      >
                        <Plus className="w-3.5 h-3.5" /> Add Passage
                      </button>
                    </div>
                  </div>

                  {passages[activePassageTab] && (
                    <div className="p-6 rounded-2xl bg-white dark:bg-[#112019] border border-slate-200 dark:border-[#24392F] space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                            Passage {passages[activePassageTab].passage_number} Headline
                          </label>
                          <input
                            type="text"
                            value={passages[activePassageTab].title}
                            onChange={(e) => {
                              const updated = [...passages];
                              updated[activePassageTab].title = e.target.value;
                              setPassages(updated);
                            }}
                            className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs font-medium text-slate-900 dark:text-white"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                            Subheading / Context Summary
                          </label>
                          <input
                            type="text"
                            value={passages[activePassageTab].subheading || ''}
                            onChange={(e) => {
                              const updated = [...passages];
                              updated[activePassageTab].subheading = e.target.value;
                              setPassages(updated);
                            }}
                            className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs font-medium text-slate-900 dark:text-white"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                          Reading Stimulus Text (Markdown)
                        </label>
                        <MarkdownEditor
                          value={passages[activePassageTab].content}
                          onChange={(val) => {
                            const updated = [...passages];
                            updated[activePassageTab].content = val;
                            setPassages(updated);
                          }}
                          placeholder="Paste the reading passage text with paragraph letters (Paragraph A, B, C...)..."
                        />
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                /* Listening Sections */
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 overflow-x-auto">
                      {sections.map((s, idx) => (
                        <button
                          key={s.id}
                          onClick={() => setActivePassageTab(idx)}
                          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                            activePassageTab === idx
                              ? 'bg-[#124F40] text-white shadow-xs'
                              : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
                          }`}
                        >
                          Section {s.section_number}
                        </button>
                      ))}
                      <button
                        onClick={handleAddSection}
                        className="px-3 py-2 rounded-xl border border-dashed border-slate-300 dark:border-slate-700 text-xs font-semibold text-slate-600 dark:text-slate-400 hover:bg-slate-50 flex items-center gap-1"
                      >
                        <Plus className="w-3.5 h-3.5" /> Add Section
                      </button>
                    </div>
                  </div>

                  {sections[activePassageTab] && (
                    <div className="p-6 rounded-2xl bg-white dark:bg-[#112019] border border-slate-200 dark:border-[#24392F] space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                            Section {sections[activePassageTab].section_number} Title
                          </label>
                          <input
                            type="text"
                            value={sections[activePassageTab].title || ''}
                            onChange={(e) => {
                              const updated = [...sections];
                              updated[activePassageTab].title = e.target.value;
                              setSections(updated);
                            }}
                            className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs font-medium text-slate-900 dark:text-white"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                            Audio Storage URL or Path
                          </label>
                          <input
                            type="text"
                            value={sections[activePassageTab].audio_url || ''}
                            onChange={(e) => {
                              const updated = [...sections];
                              updated[activePassageTab].audio_url = e.target.value;
                              setSections(updated);
                            }}
                            placeholder="/audio/listening/test-01-s1.mp3"
                            className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs font-medium text-slate-900 dark:text-white"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                          Context Audio Script &amp; Instructions
                        </label>
                        <MarkdownEditor
                          value={sections[activePassageTab].instructions || ''}
                          onChange={(val) => {
                            const updated = [...sections];
                            updated[activePassageTab].instructions = val;
                            setSections(updated);
                          }}
                          placeholder="Section instructions and spoken dialog audio script..."
                        />
                      </div>
                    </div>
                  )}
                </div>
              )}

              <div className="flex justify-between pt-4">
                <button
                  type="button"
                  onClick={() => setActiveStep(1)}
                  className="px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-semibold flex items-center gap-1.5"
                >
                  <ChevronLeft className="w-4 h-4" /> Back to Metadata
                </button>
                <button
                  type="button"
                  onClick={() => setActiveStep(3)}
                  className="px-5 py-2.5 rounded-xl bg-[#124F40] hover:bg-[#0E3D32] text-white text-xs font-bold flex items-center gap-1.5 shadow-xs"
                >
                  <span>Build Questions ({questions.length})</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: QUESTION BUILDER */}
          {activeStep === 3 && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-sm font-bold text-slate-900 dark:text-white">
                    Question Inventory ({questions.length} Items)
                  </h2>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Supports True/False/Not Given, Matching Headings, Multiple Choice, and Completion with alternative keys.
                  </p>
                </div>
                <button
                  onClick={handleAddQuestion}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#124F40] hover:bg-[#0E3D32] text-white text-xs font-bold shadow-xs cursor-pointer"
                >
                  <Plus className="w-4 h-4 text-[#5BB78D]" />
                  Add New Question
                </button>
              </div>

              <div className="space-y-4">
                {questions.map((q, idx) => (
                  <div
                    key={q.id}
                    className="p-5 rounded-2xl bg-white dark:bg-[#112019] border border-slate-200 dark:border-[#24392F] shadow-xs space-y-4"
                  >
                    <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
                      <div className="flex items-center gap-3">
                        <span className="w-7 h-7 rounded-lg bg-[#124F40]/10 text-[#124F40] dark:text-[#5BB78D] font-mono font-bold text-xs flex items-center justify-center">
                          #{q.question_number}
                        </span>
                        <div className="flex items-center gap-2">
                          <label className="text-xs font-semibold text-slate-500">Type:</label>
                          <select
                            value={q.type}
                            onChange={(e) => {
                              const updated = [...questions];
                              updated[idx].type = e.target.value;
                              setQuestions(updated);
                            }}
                            className="px-2.5 py-1 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs font-semibold"
                          >
                            {QUESTION_TYPES.map((t) => (
                              <option key={t.value} value={t.value}>
                                {t.label}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleRemoveQuestion(q.id)}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors"
                          title="Delete Question"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    {/* Question Prompt */}
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                        Question Prompt
                      </label>
                      <input
                        type="text"
                        value={q.prompt}
                        onChange={(e) => {
                          const updated = [...questions];
                          updated[idx].prompt = e.target.value;
                          setQuestions(updated);
                        }}
                        placeholder="State the assertion or question sentence..."
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs font-medium text-slate-900 dark:text-white"
                      />
                    </div>

                    {/* MCQ Options (if Multiple Choice or Matching) */}
                    {(q.type === 'multiple-choice' || q.type === 'matching-headings' || q.type === 'matching-information') && (
                      <div className="space-y-2 p-3 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800">
                        <div className="flex items-center justify-between">
                          <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                            Available Options
                          </label>
                          <button
                            type="button"
                            onClick={() => {
                              const updated = [...questions];
                              const nextId = String.fromCharCode(65 + (updated[idx].options?.length || 0));
                              updated[idx].options = [
                                ...(updated[idx].options || []),
                                { id: nextId, text: `Option ${nextId}` },
                              ];
                              setQuestions(updated);
                            }}
                            className="text-[11px] font-bold text-[#124F40] dark:text-[#5BB78D] hover:underline"
                          >
                            + Add Option
                          </button>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                          {(q.options || []).map((opt, oIdx) => (
                            <div key={opt.id} className="flex items-center gap-2">
                              <span className="w-6 h-6 rounded bg-slate-200 dark:bg-slate-800 text-[11px] font-mono font-bold flex items-center justify-center shrink-0">
                                {opt.id}
                              </span>
                              <input
                                type="text"
                                value={opt.text}
                                onChange={(e) => {
                                  const updated = [...questions];
                                  updated[idx].options[oIdx].text = e.target.value;
                                  setQuestions(updated);
                                }}
                                className="flex-1 px-2.5 py-1.5 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs"
                              />
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Answer Key & Accepted Alternatives */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                          Official Correct Answer Key
                        </label>
                        <input
                          type="text"
                          required
                          value={q.correct_answer}
                          onChange={(e) => {
                            const updated = [...questions];
                            updated[idx].correct_answer = e.target.value;
                            setQuestions(updated);
                          }}
                          placeholder="e.g. TRUE or A or 7:30"
                          className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs font-mono font-bold text-emerald-600 dark:text-emerald-400"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                          Explanation &amp; Rationale
                        </label>
                        <input
                          type="text"
                          value={q.explanation || ''}
                          onChange={(e) => {
                            const updated = [...questions];
                            updated[idx].explanation = e.target.value;
                            setQuestions(updated);
                          }}
                          placeholder="Why this answer is correct based on the text..."
                          className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs text-slate-700 dark:text-slate-300"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex justify-between pt-4">
                <button
                  type="button"
                  onClick={() => setActiveStep(2)}
                  className="px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-semibold flex items-center gap-1.5"
                >
                  <ChevronLeft className="w-4 h-4" /> Back to Passages
                </button>
                <button
                  type="button"
                  onClick={() => setActiveStep(4)}
                  className="px-5 py-2.5 rounded-xl bg-[#124F40] hover:bg-[#0E3D32] text-white text-xs font-bold flex items-center gap-1.5 shadow-xs"
                >
                  <Eye className="w-4 h-4" />
                  <span>Preview Exam Screen</span>
                </button>
              </div>
            </div>
          )}

          {/* STEP 4: LIVE STUDENT MOCK PREVIEW */}
          {activeStep === 4 && (
            <div className="space-y-4">
              {/* Mock Exam Top Bar */}
              <div className="p-4 rounded-xl bg-[#124F40] text-white flex items-center justify-between shadow-md">
                <div className="flex items-center gap-3">
                  <span className="font-bold text-sm">{test.title || 'Official IELTS Mock Exam'}</span>
                  <span className="text-xs px-2 py-0.5 rounded bg-white/20 font-mono">
                    {test.skill.toUpperCase()}
                  </span>
                </div>
                <div className="flex items-center gap-2 font-mono text-sm font-bold bg-black/30 px-3 py-1.5 rounded-lg border border-white/10">
                  <Clock className="w-4 h-4 text-[#5BB78D]" />
                  <span>59:45 remaining</span>
                </div>
              </div>

              {/* Split Screen Mock Experience */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 min-h-[500px]">
                {/* Left: Reading Passage / Audio Player */}
                <div className="p-6 rounded-2xl bg-white dark:bg-[#112019] border border-slate-200 dark:border-[#24392F] shadow-xs overflow-y-auto max-h-[600px] space-y-4">
                  {test.skill === 'reading' ? (
                    <div>
                      <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-1">
                        {passages[0]?.title || 'Passage 1'}
                      </h2>
                      {passages[0]?.subheading && (
                        <p className="text-xs text-slate-500 italic mb-4">{passages[0].subheading}</p>
                      )}
                      <div className="text-xs leading-relaxed text-slate-700 dark:text-slate-300 whitespace-pre-wrap font-serif">
                        {passages[0]?.content || 'Passage stimulus content will appear here.'}
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-4 text-center py-12">
                      <div className="w-16 h-16 rounded-full bg-[#124F40]/10 text-[#124F40] dark:text-[#5BB78D] flex items-center justify-center mx-auto">
                        <Volume2 className="w-8 h-8" />
                      </div>
                      <h3 className="font-bold text-slate-900 dark:text-white">
                        {sections[0]?.title || 'Listening Section 1'}
                      </h3>
                      <p className="text-xs text-slate-500 max-w-sm mx-auto">
                        {sections[0]?.instructions || 'Audio will begin playing immediately when exam starts.'}
                      </p>
                    </div>
                  )}
                </div>

                {/* Right: Question Answer Sheet */}
                <div className="p-6 rounded-2xl bg-white dark:bg-[#112019] border border-slate-200 dark:border-[#24392F] shadow-xs overflow-y-auto max-h-[600px] space-y-6">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    Questions 1–{questions.length}
                  </h3>

                  <div className="space-y-5">
                    {questions.map((q) => (
                      <div key={q.id} className="space-y-2 pb-4 border-b border-slate-100 dark:border-slate-800">
                        <div className="flex items-start gap-2 text-xs">
                          <span className="font-mono font-bold text-[#124F40] dark:text-[#5BB78D]">
                            {q.question_number}.
                          </span>
                          <span className="font-semibold text-slate-800 dark:text-slate-200">{q.prompt}</span>
                        </div>

                        {q.options && q.options.length > 0 ? (
                          <div className="space-y-1.5 pl-5">
                            {q.options.map((opt) => (
                              <label key={opt.id} className="flex items-center gap-2 text-xs cursor-pointer">
                                <input
                                  type="radio"
                                  name={`mock_${q.id}`}
                                  value={opt.id}
                                  className="text-[#124F40] focus:ring-[#5BB78D]"
                                />
                                <span className="font-mono font-semibold text-slate-500">{opt.id}.</span>
                                <span className="text-slate-700 dark:text-slate-300">{opt.text}</span>
                              </label>
                            ))}
                          </div>
                        ) : (
                          <div className="pl-5">
                            <input
                              type="text"
                              placeholder="Type candidate answer..."
                              className="w-full max-w-xs px-3 py-1.5 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs"
                            />
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Real-time Validation Errors Panel */}
          {validation.errors.length > 0 && (
            <div className="p-4 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800/80 space-y-2">
              <div className="flex items-center gap-2 text-rose-800 dark:text-rose-200 font-bold text-xs">
                <AlertTriangle className="w-4 h-4 text-rose-600 dark:text-rose-400" />
                <span>Validation Panel ({validation.errors.length} Blocking Errors)</span>
              </div>
              <ul className="list-disc list-inside space-y-1 text-[11px] text-rose-700 dark:text-rose-300">
                {validation.errors.map((err, idx) => (
                  <li key={idx}>
                    {err.questionNumber ? `Question #${err.questionNumber}: ` : ''}
                    {err.message}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* 4. Version History Restore Drawer */}
        {isVersionDrawerOpen && (
          <div className="fixed inset-0 z-60 flex items-center justify-end bg-slate-950/50">
            <div className="w-full max-w-md h-full bg-white dark:bg-[#112019] border-l border-slate-200 dark:border-[#24392F] p-6 space-y-4 shadow-2xl overflow-y-auto">
              <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
                <h3 className="font-bold text-slate-900 dark:text-white text-sm">Version History &amp; Restore</h3>
                <button onClick={() => setIsVersionDrawerOpen(false)} className="text-slate-400 hover:text-white">
                  ✕
                </button>
              </div>

              {versionHistory.length === 0 ? (
                <p className="text-xs text-slate-500 py-6 text-center">No previous version snapshots saved yet.</p>
              ) : (
                <div className="space-y-3">
                  {versionHistory.map((snap) => (
                    <div
                      key={snap.version}
                      className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/60 flex items-center justify-between gap-3"
                    >
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-xs text-slate-900 dark:text-white">
                            Version {snap.version}
                          </span>
                          <span className="text-[10px] text-slate-400 font-mono">{snap.author}</span>
                        </div>
                        <span className="text-[11px] text-slate-500 block">
                          {new Date(snap.timestamp).toLocaleString()}
                        </span>
                        <span className="text-[10px] text-slate-400">
                          {snap.questions.length} questions • {snap.passages.length} passages
                        </span>
                      </div>

                      <button
                        onClick={() => {
                          if (contentStore.restoreVersion(test.id, snap.version)) {
                            addToast({
                              type: 'success',
                              title: 'Version Restored',
                              message: `Restored back to snapshot v${snap.version}.`,
                            });
                            setIsVersionDrawerOpen(false);
                            onSaved();
                          }
                        }}
                        className="px-2.5 py-1.5 rounded-lg bg-[#124F40] hover:bg-[#0E3D32] text-white text-xs font-semibold transition-all flex items-center gap-1 shadow-xs"
                      >
                        <RotateCcw className="w-3 h-3 text-[#5BB78D]" />
                        Restore
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
