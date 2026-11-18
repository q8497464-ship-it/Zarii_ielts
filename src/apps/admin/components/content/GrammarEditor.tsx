import React, { useState } from 'react';
import { Sparkles, Plus, Trash2, Save, X, BookOpen } from 'lucide-react';
import type { GrammarLessonEntity } from '../../../../shared/types/database';
import { contentStore } from '../../../../shared/content/contentStore';
import { MarkdownEditor } from '../MarkdownEditor';
import { useAdminToast } from '../AdminToast';

interface GrammarEditorProps {
  lessonId?: string | null;
  onClose: () => void;
  onSaved: () => void;
}

export function GrammarEditor({ lessonId, onClose, onSaved }: GrammarEditorProps) {
  const { addToast } = useAdminToast();

  const [lesson, setLesson] = useState<GrammarLessonEntity>(() => {
    if (lessonId) {
      const existing = contentStore.getGrammarLessons().find((g) => g.id === lessonId);
      if (existing) return { ...existing };
    }
    return {
      id: lessonId || `gram-${Date.now().toString().slice(-4)}`,
      title: '',
      slug: `lesson-${Date.now().toString().slice(-4)}`,
      category: 'Tenses & Modals',
      summary: '',
      content_markdown: '### Grammatical Rule Overview\n\nExplanation of grammar structure, timelines, and common candidate mistakes...',
      quiz_questions: [
        {
          id: 'ex-1',
          prompt: 'Select the correct verb tense for reporting historical trends in Task 1:',
          options: ['increased', 'increases', 'has increased', 'is increasing'],
          correctAnswer: 'increased',
          explanation: 'Past simple is required because the timeline is fixed in past historical years.',
        },
      ],
      status: 'published',
      difficulty: 'intermediate',
      band_level: 7.0,
      version: 1,
      created_at: new Date().toISOString(),
    };
  });

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!lesson.title.trim() || !lesson.content_markdown.trim()) {
      addToast({
        type: 'error',
        title: 'Missing Required Fields',
        message: 'Lesson must have a title and markdown content.',
      });
      return;
    }

    contentStore.saveGrammarLesson(lesson);
    addToast({
      type: 'success',
      title: 'Grammar Lesson Saved',
      message: `"${lesson.title}" updated with ${lesson.quiz_questions?.length || 0} exercises.`,
    });
    onSaved();
    onClose();
  };

  const handleAddExercise = () => {
    const nextNum = (lesson.quiz_questions?.length || 0) + 1;
    const newEx = {
      id: `ex-${Date.now().toString().slice(-4)}`,
      prompt: `Exercise ${nextNum} prompt sentence with ________ blank.`,
      options: ['Option A', 'Option B', 'Option C', 'Option D'],
      correctAnswer: 'Option A',
      explanation: 'Explanation citing the grammatical rule.',
    };
    setLesson({
      ...lesson,
      quiz_questions: [...(lesson.quiz_questions || []), newEx],
    });
  };

  const handleRemoveExercise = (idx: number) => {
    const updated = [...(lesson.quiz_questions || [])];
    updated.splice(idx, 1);
    setLesson({ ...lesson, quiz_questions: updated });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-950/80 backdrop-blur-xs">
      <div className="bg-white dark:bg-[#112019] border border-slate-200 dark:border-[#24392F] rounded-2xl w-full max-w-4xl h-[92vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50/50 dark:bg-slate-900/50 shrink-0">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-[#124F40] text-white">
              <BookOpen className="w-5 h-5 text-[#5BB78D]" />
            </div>
            <div>
              <h1 className="text-base font-bold text-slate-900 dark:text-white">
                {lessonId ? 'Edit Grammar Lesson' : 'Draft New Grammar Lesson'}
              </h1>
              <p className="text-xs text-slate-500">
                Markdown Rule Lessons &amp; Interactive Fill-in / MCQ Exercise Builder
              </p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 text-slate-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSave} className="flex-1 overflow-y-auto p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-2">
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Lesson Title
              </label>
              <input
                type="text"
                required
                value={lesson.title}
                onChange={(e) => setLesson({ ...lesson, title: e.target.value })}
                placeholder="e.g. Inversion & Cleft Sentences for Band 8+ Cohesion"
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs font-medium text-slate-900 dark:text-white"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Category
              </label>
              <select
                value={lesson.category}
                onChange={(e) => setLesson({ ...lesson, category: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs font-medium text-slate-900 dark:text-white"
              >
                <option value="Tenses & Modals">Tenses &amp; Modals</option>
                <option value="Complex Sentences">Complex Sentences &amp; Subordination</option>
                <option value="Conditionals">Conditionals (Hypothetical &amp; Real)</option>
                <option value="Passive Voice">Passive Voice &amp; Impersonal Structures</option>
                <option value="Nominalisation">Nominalisation &amp; Academic Style</option>
              </select>
            </div>
          </div>

          {/* Markdown Content */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
              Lesson Explanation &amp; Rules (Markdown)
            </label>
            <MarkdownEditor
              value={lesson.content_markdown}
              onChange={(val) => setLesson({ ...lesson, content_markdown: val })}
              placeholder="Draft grammar rules, examples, and examiner tips..."
            />
          </div>

          {/* Exercise Builder */}
          <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                  Interactive Exercise Builder ({lesson.quiz_questions?.length || 0} Exercises)
                </h3>
                <p className="text-[11px] text-slate-500">
                  Add interactive fill-in-the-blank or multiple-choice questions for students.
                </p>
              </div>
              <button
                type="button"
                onClick={handleAddExercise}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#124F40] hover:bg-[#0E3D32] text-white text-xs font-bold shadow-xs cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5 text-[#5BB78D]" /> Add Exercise
              </button>
            </div>

            <div className="space-y-3">
              {(lesson.quiz_questions || []).map((ex, idx) => (
                <div
                  key={ex.id || idx}
                  className="p-4 rounded-xl bg-white dark:bg-[#112019] border border-slate-200 dark:border-slate-800 space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-[#124F40] dark:text-[#5BB78D]">
                      Exercise #{idx + 1}
                    </span>
                    <button
                      type="button"
                      onClick={() => handleRemoveExercise(idx)}
                      className="text-slate-400 hover:text-rose-500"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  <input
                    type="text"
                    value={ex.prompt}
                    onChange={(e) => {
                      const updated = [...lesson.quiz_questions];
                      updated[idx].prompt = e.target.value;
                      setLesson({ ...lesson, quiz_questions: updated });
                    }}
                    placeholder="Exercise sentence with blank..."
                    className="w-full px-3 py-2 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs"
                  />

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[10px] font-bold text-slate-500 uppercase">Correct Answer</label>
                      <input
                        type="text"
                        value={ex.correctAnswer}
                        onChange={(e) => {
                          const updated = [...lesson.quiz_questions];
                          updated[idx].correctAnswer = e.target.value;
                          setLesson({ ...lesson, quiz_questions: updated });
                        }}
                        className="w-full px-3 py-1.5 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs font-mono font-bold text-emerald-600"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-slate-500 uppercase">Explanation</label>
                      <input
                        type="text"
                        value={ex.explanation || ''}
                        onChange={(e) => {
                          const updated = [...lesson.quiz_questions];
                          updated[idx].explanation = e.target.value;
                          setLesson({ ...lesson, quiz_questions: updated });
                        }}
                        placeholder="Rule rationale..."
                        className="w-full px-3 py-1.5 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-200 dark:border-slate-800">
            <button type="button" onClick={onClose} className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-white">
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl bg-[#124F40] hover:bg-[#0E3D32] text-white text-xs font-bold transition-all shadow-xs"
            >
              Save Grammar Lesson
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
