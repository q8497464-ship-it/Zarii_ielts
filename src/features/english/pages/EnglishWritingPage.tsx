import React, { useState } from 'react';
import { 
  PenTool, 
  CheckCircle2, 
  XCircle, 
  AlertCircle, 
  ChevronRight, 
  ArrowLeft, 
  Sparkles, 
  Copy, 
  Check, 
  BookOpen, 
  RotateCcw,
  FileCheck2,
  Clock,
  Layers
} from 'lucide-react';
import { skillsService } from '../services/skillsService';
import { WRITING_TASKS, type WritingTask, type FormFieldConfig } from '../data/writingLibrary';
import { evaluateStudentWriting, type WritingEvaluationResult } from '../utils/writingEvaluator';
import type { EnglishCEFRLevel } from '../../../types';
import { cn } from '../../../lib/utils';

export const EnglishWritingPage: React.FC = () => {
  const [selectedLevel, setSelectedLevel] = useState<EnglishCEFRLevel | 'ALL'>('ALL');
  const [activeTask, setActiveTask] = useState<WritingTask | null>(null);

  // Form values state (for A1 form tasks)
  const [formValues, setFormValues] = useState<Record<string, string>>({});

  // Writing text state
  const [text, setText] = useState('');
  const [evaluation, setEvaluation] = useState<WritingEvaluationResult | null>(null);
  const [isSaved, setIsSaved] = useState(false);
  const [copiedPhrase, setCopiedPhrase] = useState<string | null>(null);
  const [showUrdu, setShowUrdu] = useState(false);

  const tasks = skillsService.getWritingTasks(selectedLevel === 'ALL' ? undefined : selectedLevel);

  const handleOpenTask = (task: WritingTask) => {
    setActiveTask(task);
    setText('');
    setFormValues({});
    setEvaluation(null);
    setIsSaved(false);
    setShowUrdu(false);
  };

  const handleCloseTask = () => {
    setActiveTask(null);
  };

  const handleInsertPhrase = (phrase: string) => {
    setText(prev => (prev ? `${prev.trim()} ${phrase} ` : `${phrase} `));
    setCopiedPhrase(phrase);
    setTimeout(() => setCopiedPhrase(null), 1500);
  };

  const handleEvaluate = async () => {
    if (!activeTask) return;
    const result = evaluateStudentWriting(text, activeTask, formValues);
    setEvaluation(result);

    if (result.isValid) {
      await skillsService.saveWritingSubmission(activeTask.id, text, formValues, result);
      setIsSaved(true);
    }
  };

  const wordCount = text.trim().split(/\s+/).filter(Boolean).length;
  const isUnderMin = activeTask && wordCount < activeTask.minWords;
  const isOverMax = activeTask && wordCount > activeTask.maxWords;

  return (
    <div className="min-h-screen bg-[#F7FAF8] dark:bg-[#0B1510] text-slate-800 dark:text-slate-100 p-4 md:p-8">
      {/* 1. Header */}
      <div className="max-w-5xl mx-auto mb-8">
        <div className="pb-6 border-b border-emerald-900/10 dark:border-emerald-500/20 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-100 dark:bg-emerald-950/60 text-[#124F40] dark:text-[#5BB78D]">
                General English
              </span>
              <span className="text-xs text-slate-500 dark:text-slate-400">Guided Writing by Level</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-extrabold text-[#124F40] dark:text-[#5BB78D] tracking-tight">
              Writing Studio
            </h1>
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
              Guided tasks from A1 to C1: form filling, postcards, workplace emails, balanced opinion essays, and formal reports.
            </p>
          </div>

          {/* Level Filter */}
          {!activeTask && (
            <div className="flex items-center gap-1 overflow-x-auto p-1 bg-slate-200/60 dark:bg-[#112019] rounded-xl border border-slate-300/40 dark:border-[#24392F]">
              {(['ALL', 'A1', 'A2', 'B1', 'B2', 'C1'] as const).map(lvl => (
                <button
                  key={lvl}
                  onClick={() => setSelectedLevel(lvl)}
                  className={cn(
                    'px-3 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap',
                    selectedLevel === lvl
                      ? 'bg-[#124F40] text-white dark:bg-[#5BB78D] dark:text-[#0B1510] shadow-xs'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
                  )}
                >
                  {lvl === 'ALL' ? 'All' : lvl}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* 2. Content */}
      <div className="max-w-5xl mx-auto">
        {!activeTask ? (
          /* Tasks Catalog */
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {tasks.map(task => (
              <div
                key={task.id}
                onClick={() => handleOpenTask(task)}
                className="group cursor-pointer bg-white dark:bg-[#112019] border border-slate-200/80 dark:border-[#24392F] hover:border-[#5BB78D] rounded-2xl p-5 shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="px-2 py-0.5 rounded text-[11px] font-extrabold bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                      Level {task.level}
                    </span>
                    <span className="text-[11px] text-slate-400 font-medium">
                      Target: {task.minWords}–{task.maxWords} words
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 group-hover:text-[#124F40] dark:group-hover:text-[#5BB78D] transition-colors mb-1.5">
                    {task.title}
                  </h3>

                  <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed mb-4">
                    {task.scenario}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-100 dark:border-[#24392F] flex items-center justify-between text-xs text-slate-400">
                  <span className="capitalize">{task.taskType.replace('-', ' & ')}</span>
                  <span className="flex items-center gap-1 font-semibold text-[#124F40] dark:text-[#5BB78D] group-hover:translate-x-0.5 transition-transform">
                    Start Task <ChevronRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Writing Studio Editor View */
          <div className="bg-white dark:bg-[#112019] border border-slate-200 dark:border-[#24392F] rounded-3xl p-6 md:p-8 shadow-sm">
            {/* Top Bar */}
            <div className="flex flex-wrap items-center justify-between gap-4 pb-6 mb-6 border-b border-slate-200 dark:border-[#24392F]">
              <button
                onClick={handleCloseTask}
                className="flex items-center gap-2 text-xs font-bold text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 bg-slate-100 dark:bg-slate-800/60 px-3 py-1.5 rounded-xl transition-colors"
              >
                <ArrowLeft className="w-4 h-4" /> Back to Tasks
              </button>

              <button
                onClick={() => setShowUrdu(!showUrdu)}
                className={cn(
                  'px-3 py-1.5 rounded-xl text-xs font-bold transition-colors border',
                  showUrdu
                    ? 'bg-amber-100 text-amber-900 border-amber-300 dark:bg-amber-950/60 dark:text-amber-200'
                    : 'border-slate-200 dark:border-[#24392F] text-slate-600 dark:text-slate-400 hover:bg-slate-50'
                )}
              >
                اردو رہنمائی
              </button>
            </div>

            {/* Task Scenario */}
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-1.5">
                <span className="px-2 py-0.5 rounded text-xs font-bold bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                  Level {activeTask.level}
                </span>
                <span className="text-xs text-slate-400 font-medium">
                  Goal: {activeTask.minWords}–{activeTask.maxWords} words
                </span>
              </div>
              <h2 className="text-2xl font-extrabold text-[#124F40] dark:text-[#5BB78D] tracking-tight">
                {activeTask.title}
              </h2>
              <p className="text-xs text-slate-600 dark:text-slate-300 mt-2 leading-relaxed">
                {activeTask.scenario}
              </p>

              {showUrdu && (
                <div className="mt-3 p-3 bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/40 rounded-xl text-xs font-urdu text-right text-amber-950 dark:text-amber-200">
                  {activeTask.urduGuidance}
                </div>
              )}
            </div>

            {/* If Form Fields exist (A1) */}
            {activeTask.formFields && activeTask.formFields.length > 0 && (
              <div className="p-5 bg-slate-50 dark:bg-[#0B1510] border border-slate-200 dark:border-[#24392F] rounded-2xl mb-6">
                <div className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">
                  Step 1: Fill out the Registration Form
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {activeTask.formFields.map(field => (
                    <div key={field.id}>
                      <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                        {field.label} {field.required && <span className="text-rose-500">*</span>}
                      </label>
                      {field.type === 'select' ? (
                        <select
                          value={formValues[field.id] || ''}
                          onChange={e => setFormValues(prev => ({ ...prev, [field.id]: e.target.value }))}
                          className="w-full px-3 py-2 bg-white dark:bg-[#112019] border border-slate-200 dark:border-[#24392F] rounded-xl text-xs focus:ring-2 focus:ring-[#5BB78D]"
                        >
                          <option value="">{field.placeholder}</option>
                          {field.options?.map(opt => (
                            <option key={opt} value={opt}>{opt}</option>
                          ))}
                        </select>
                      ) : (
                        <input
                          type={field.type}
                          placeholder={field.placeholder}
                          value={formValues[field.id] || ''}
                          onChange={e => setFormValues(prev => ({ ...prev, [field.id]: e.target.value }))}
                          className="w-full px-3 py-2 bg-white dark:bg-[#112019] border border-slate-200 dark:border-[#24392F] rounded-xl text-xs focus:ring-2 focus:ring-[#5BB78D]"
                        />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Useful Phrases Bank Drawer */}
            <div className="mb-6 p-4 bg-emerald-50/60 dark:bg-emerald-950/20 border border-emerald-200/70 dark:border-emerald-800/40 rounded-2xl">
              <div className="text-xs font-bold uppercase tracking-wider text-emerald-800 dark:text-emerald-400 mb-2 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-500" /> Useful Phrases Bank (Click to insert)
              </div>
              <div className="space-y-2">
                {activeTask.usefulPhrases.map((cat, idx) => (
                  <div key={idx}>
                    <div className="text-[11px] font-bold text-slate-500 dark:text-slate-400 mb-1">{cat.category}</div>
                    <div className="flex flex-wrap gap-1.5">
                      {cat.phrases.map((phrase, pIdx) => (
                        <button
                          key={pIdx}
                          onClick={() => handleInsertPhrase(phrase)}
                          className="flex items-center gap-1 px-2.5 py-1 bg-white dark:bg-[#112019] hover:bg-emerald-100 dark:hover:bg-emerald-900 border border-slate-200 dark:border-[#24392F] rounded-lg text-xs text-slate-700 dark:text-slate-200 transition-colors shadow-2xs"
                        >
                          <span>{phrase}</span>
                          <Copy className="w-3 h-3 text-slate-400" />
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Writing Textarea */}
            <div className="mb-4">
              <div className="flex items-center justify-between mb-2 text-xs">
                <span className="font-bold text-slate-700 dark:text-slate-300">
                  {activeTask.formFields ? 'Step 2: Write your notes/response' : 'Your Response:'}
                </span>

                {/* Word Counter */}
                <div className="flex items-center gap-2">
                  <span className={cn(
                    'font-mono font-bold px-2 py-0.5 rounded-md',
                    wordCount < activeTask.minWords ? 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300' :
                    wordCount > activeTask.maxWords ? 'bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300' :
                    'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                  )}>
                    {wordCount} words
                  </span>
                  <span className="text-slate-400">({activeTask.minWords}–{activeTask.maxWords} target)</span>
                </div>
              </div>

              <textarea
                rows={8}
                value={text}
                onChange={e => setText(e.target.value)}
                placeholder="Type your response here..."
                className="w-full p-4 bg-slate-50 dark:bg-[#0B1510] border border-slate-200 dark:border-[#24392F] rounded-2xl text-xs md:text-sm leading-relaxed focus:outline-none focus:ring-2 focus:ring-[#5BB78D] font-mono resize-y"
              />
            </div>

            {/* Checklist */}
            <div className="mb-6 p-4 bg-slate-50 dark:bg-[#0B1510] border border-slate-200 dark:border-[#24392F] rounded-2xl">
              <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                Self-Check Quality Checklist
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-xs">
                {activeTask.checklist.map(item => (
                  <div key={item.id} className="flex items-center gap-2 text-slate-600 dark:text-slate-300">
                    <FileCheck2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>{item.label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Evaluation Action Button */}
            <div className="flex items-center justify-between pt-4 border-t border-slate-200 dark:border-[#24392F]">
              <button
                onClick={handleEvaluate}
                disabled={wordCount < 5}
                className="px-6 py-2.5 rounded-xl bg-[#124F40] hover:bg-[#1a6e59] text-white dark:bg-[#5BB78D] dark:text-[#0B1510] text-xs font-bold transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-xs flex items-center gap-2"
              >
                <Sparkles className="w-4 h-4" /> Check & Evaluate Draft
              </button>

              {wordCount < 5 && (
                <span className="text-xs text-slate-400 italic">
                  Write at least 5 words to evaluate.
                </span>
              )}
            </div>

            {/* Evaluation Results Drawer */}
            {evaluation && (
              <div className="mt-8 pt-6 border-t border-slate-200 dark:border-[#24392F] space-y-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className={cn(
                      'px-3 py-1 rounded-xl text-xs font-extrabold',
                      evaluation.overallAssessment === 'Excellent' ? 'bg-emerald-100 text-emerald-800' :
                      evaluation.overallAssessment === 'Good Progress' ? 'bg-sky-100 text-sky-800' :
                      'bg-amber-100 text-amber-800'
                    )}>
                      {evaluation.overallAssessment}
                    </span>
                    <span className="text-xs text-slate-500 font-medium">{evaluation.praiseComment}</span>
                  </div>

                  <span className="text-xs font-bold text-slate-400">
                    Vocabulary Variety: {evaluation.vocabularyVarietyScore}%
                  </span>
                </div>

                {/* Issues List */}
                {evaluation.issues.length > 0 ? (
                  <div className="space-y-2">
                    <div className="text-xs font-bold uppercase tracking-wider text-slate-400">
                      Suggestions & Grammar Observations ({evaluation.issues.length})
                    </div>
                    {evaluation.issues.map((issue, idx) => (
                      <div
                        key={idx}
                        className={cn(
                          'p-3.5 rounded-xl text-xs flex items-start gap-2.5 border',
                          issue.severity === 'error' ? 'bg-rose-50/70 border-rose-200 text-rose-900 dark:bg-rose-950/30 dark:border-rose-800 dark:text-rose-200' :
                          issue.severity === 'warning' ? 'bg-amber-50/70 border-amber-200 text-amber-900 dark:bg-amber-950/30 dark:border-amber-800 dark:text-amber-200' :
                          'bg-sky-50/70 border-sky-200 text-sky-900 dark:bg-sky-950/30 dark:border-sky-800 dark:text-sky-200'
                        )}
                      >
                        <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                        <div>
                          <div className="font-semibold">{issue.message}</div>
                          {issue.urduMessage && (
                            <div className="font-urdu text-[11px] mt-0.5 opacity-90">{issue.urduMessage}</div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="p-4 bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200 rounded-2xl text-xs font-semibold text-emerald-800 dark:text-emerald-300 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                    No major grammar, capitalization, or spelling errors detected! Excellent execution.
                  </div>
                )}

                {/* Model Answer Drawer */}
                <div className="p-5 bg-slate-50 dark:bg-[#0B1510] border border-slate-200 dark:border-[#24392F] rounded-2xl">
                  <div className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                    Polished Model Solution (For Study & Comparison)
                  </div>
                  <pre className="font-sans text-xs md:text-sm text-slate-800 dark:text-slate-200 leading-relaxed whitespace-pre-wrap">
                    {activeTask.modelAnswer}
                  </pre>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
