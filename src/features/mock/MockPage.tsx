import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  FileSpreadsheet,
  Clock,
  CheckCircle2,
  ShieldCheck,
  Award,
  ArrowRight,
  Headphones,
  BookOpen,
  PenTool,
  Mic,
  Calendar,
  Sparkles,
} from 'lucide-react';
import { FULL_MOCK_TESTS } from './mockData';
import { db } from '../../lib/db';
import { formatBand } from '../../lib/utils';
import type { TestAttempt } from '../../types';

export function MockPage() {
  const [pastMocks, setPastMocks] = useState<TestAttempt[]>([]);

  useEffect(() => {
    async function loadPastMocks() {
      try {
        const atts = await db.attempts
          .where('testId')
          .startsWith('mock-')
          .toArray();
        atts.sort((a, b) => new Date(b.completedAt).getTime() - new Date(a.completedAt).getTime());
        setPastMocks(atts);
      } catch (err) {
        console.error('Failed to load past mocks:', err);
      }
    }
    loadPastMocks();
  }, []);

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 space-y-8 animate-fadeIn">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-teal-700 via-emerald-600 to-cyan-700 text-white p-6 sm:p-8 rounded-3xl shadow-lg relative overflow-hidden">
        <div className="max-w-2xl space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-sm text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            2 Hours 45 Mins • Full Test-Day Simulator
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
            IELTS Mock Exam Center
          </h1>
          <p className="text-white/90 text-sm sm:text-base leading-relaxed">
            Simulate exact official exam conditions: back-to-back Listening, Reading, and Writing sections
            followed by Speaking. Generates an authentic printable Test Report Form (TRF) with skill-by-skill
            breakdowns.
          </p>
        </div>
      </div>

      {/* Available Full Mock Tests */}
      <div className="space-y-4">
        <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <FileSpreadsheet className="w-5 h-5 text-teal-600" />
          Available Full Mock Examinations
        </h2>

        <div className="grid grid-cols-1 gap-4">
          {FULL_MOCK_TESTS.map((m) => (
            <div
              key={m.id}
              className="p-6 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6 hover:border-teal-500 transition-all"
            >
              <div className="space-y-2 flex-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <span
                    className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider ${
                      m.difficulty === 'challenging'
                        ? 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300'
                        : 'bg-teal-100 text-teal-800 dark:bg-teal-950 dark:text-teal-300'
                    }`}
                  >
                    {m.difficulty} Rigor
                  </span>
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    {m.testType.toUpperCase()} MODULE
                  </span>
                  <span className="text-slate-300 dark:text-slate-600">•</span>
                  <span className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    {m.timeEstimate}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                  {m.title}
                </h3>

                <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 dark:text-slate-400 pt-1">
                  <span className="flex items-center gap-1.5">
                    <Headphones className="w-3.5 h-3.5 text-sky-600" /> 40 Audio Qs
                  </span>
                  <span className="flex items-center gap-1.5">
                    <BookOpen className="w-3.5 h-3.5 text-teal-600" /> 3 Passages (40 Qs)
                  </span>
                  <span className="flex items-center gap-1.5">
                    <PenTool className="w-3.5 h-3.5 text-amber-600" /> Tasks 1 & 2
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Mic className="w-3.5 h-3.5 text-emerald-600" /> Speaking 1–3
                  </span>
                </div>
              </div>

              <div className="shrink-0">
                <Link
                  to={`/mock/exam/${m.id}`}
                  className="w-full md:w-auto px-6 py-3 rounded-xl font-bold text-white bg-teal-600 hover:bg-teal-700 transition-all shadow-md text-sm inline-flex items-center justify-center gap-2"
                >
                  <span>Start Full Mock Test</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Past Mock Test Attempts History */}
      {pastMocks.length > 0 && (
        <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Award className="w-4 h-4 text-teal-600" />
              Completed Mock History
            </h3>
            <span className="text-xs text-slate-400 font-semibold">{pastMocks.length} Attempts</span>
          </div>

          <div className="divide-y divide-slate-100 dark:divide-slate-700/60">
            {pastMocks.map((att) => (
              <div key={att.id} className="py-3.5 flex items-center justify-between gap-4">
                <div>
                  <div className="font-bold text-sm text-slate-900 dark:text-white">{att.title}</div>
                  <div className="text-xs text-slate-400 mt-0.5">
                    {new Date(att.completedAt).toLocaleDateString(undefined, {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric',
                    })} • {att.notes || 'Full simulation completed'}
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-lg font-black font-mono text-teal-600 dark:text-teal-400">
                    Band {formatBand(att.bandEstimate)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
