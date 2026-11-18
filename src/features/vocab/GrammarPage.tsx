import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  BookOpen,
  CheckCircle2,
  ChevronRight,
  Sparkles,
  HelpCircle,
  Award,
} from 'lucide-react';
import { ALL_GRAMMAR_LESSONS } from './vocabContent';

export function GrammarPage() {
  const navigate = useNavigate();

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-4">
        <div className="flex items-center gap-3">
          <Link
            to="/vocab"
            className="p-2 rounded-lg text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-teal-600 dark:text-teal-400">
              Grammatical Range & Accuracy
            </span>
            <h1 className="text-xl sm:text-2xl font-bold text-slate-800 dark:text-slate-100">
              IELTS Academic Grammar Masterclass
            </h1>
          </div>
        </div>
      </div>

      <div className="p-4 bg-teal-50/50 dark:bg-teal-950/20 border border-teal-200 dark:border-teal-800/60 rounded-xl text-xs text-teal-900 dark:text-teal-200 space-y-1">
        <span className="font-bold block">Why Grammar Matters in IELTS:</span>
        <p>
          Grammatical Range and Accuracy accounts for 25% of your Writing and Speaking scores. These 15 lessons cover high-impact structures (tenses, conditionals, passives, inversion, clefts, nominalisation) with 150 interactive exercises and instant feedback.
        </p>
      </div>

      {/* 15 Lessons Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {ALL_GRAMMAR_LESSONS.map((lesson, idx) => (
          <div
            key={lesson.id}
            onClick={() => navigate(`/grammar/lesson/${lesson.id}`)}
            className="p-5 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm hover:border-teal-500 hover:shadow-md cursor-pointer transition-all flex flex-col justify-between space-y-3"
          >
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <span className="font-mono text-teal-600 dark:text-teal-400 font-bold">
                  Lesson {idx + 1}
                </span>
                <span className="text-[11px] text-slate-400">10 Exercises</span>
              </div>
              <h3 className="font-bold text-slate-900 dark:text-white text-base">
                {lesson.title}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2">
                {lesson.focus}
              </p>
            </div>

            <div className="pt-2 border-t border-slate-100 dark:border-slate-700/60 flex items-center justify-between text-xs text-teal-600 dark:text-teal-400 font-semibold">
              <span>Start Interactive Lesson</span>
              <ChevronRight className="w-4 h-4" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
