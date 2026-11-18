import React, { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import {
  Flame,
  Brain,
  Sparkles,
  HelpCircle,
  BookmarkCheck,
  BookOpen,
  ArrowRight,
  GraduationCap,
  Layers,
  FileSpreadsheet,
  CheckCircle2,
  Calendar,
} from 'lucide-react';
import { db } from '../../lib/db';
import { calculateStreak } from './sm2';
import { ALL_ACADEMIC_WORDS, VOCAB_TOPICS } from './vocabContent';
import type { VocabProgress } from '../../types';
import { GrammarPage } from './GrammarPage';

export function VocabPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeTab = searchParams.get('tab') === 'grammar' ? 'grammar' : 'vocab';
  const [vocabEntries, setVocabEntries] = useState<VocabProgress[]>([]);
  const [streak, setStreak] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  if (activeTab === 'grammar') {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-3">
          <button
            onClick={() => setSearchParams({})}
            className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            Academic Vocabulary
          </button>
          <button
            onClick={() => setSearchParams({ tab: 'grammar' })}
            className="px-4 py-2 rounded-xl text-xs font-bold bg-[#124F40] text-white dark:bg-[#5BB78D] dark:text-slate-950 shadow-xs transition-colors"
          >
            Grammar Lessons &amp; Quizzes
          </button>
        </div>
        <GrammarPage />
      </div>
    );
  }

  useEffect(() => {
    async function loadStats() {
      try {
        const all = await db.vocabProgress.toArray();
        setVocabEntries(all);
        setStreak(calculateStreak(all));
      } catch (err) {
        console.error('Error loading vocab stats:', err);
      } finally {
        setIsLoading(false);
      }
    }
    loadStats();
  }, []);

  const now = new Date();
  const dueCount = vocabEntries.filter((v) => new Date(v.nextReviewAt) <= now).length;
  const masteredCount = vocabEntries.filter((v) => v.repetitions >= 4).length;
  const customCount = vocabEntries.filter((v) => v.isCustom).length;

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-6">
      {/* Top Tab Bar: Vocabulary vs Grammar */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-3">
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            Vocabulary &amp; Grammar
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Master the Academic Word List and high-band IELTS grammatical structures.
          </p>
        </div>
        <div className="inline-flex p-1 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
          <button
            onClick={() => setSearchParams({})}
            className="px-3.5 py-1.5 rounded-lg text-xs font-bold bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-2xs transition-all"
          >
            Academic Vocab
          </button>
          <button
            onClick={() => setSearchParams({ tab: 'grammar' })}
            className="px-3.5 py-1.5 rounded-lg text-xs font-medium text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-all flex items-center gap-1.5"
          >
            <GraduationCap className="w-3.5 h-3.5 text-[#124F40] dark:text-[#5BB78D]" />
            <span>Grammar Lessons</span>
          </button>
        </div>
      </div>

      {/* Header Banner */}
      <div className="bg-gradient-to-r from-teal-700 via-emerald-600 to-cyan-700 text-white p-6 sm:p-8 rounded-3xl shadow-lg relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-sm text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5" />
              SuperMemo-2 (SM-2) Spaced Repetition Engine
            </div>
            <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
              Academic Vocabulary & Grammar
            </h1>
            <p className="text-white/90 text-sm sm:text-base leading-relaxed">
              Master 200 high-yield IELTS academic words, 150 grammar exercises, and 100+ band 7.5–9.0
              writing phrases with intelligent daily retention algorithms.
            </p>
          </div>

          {/* Quick Streak Card */}
          <div className="flex items-center gap-4 bg-white/10 backdrop-blur-md px-5 py-4 rounded-2xl border border-white/20 shrink-0 self-start md:self-auto">
            <div className="p-3 bg-amber-500/20 text-amber-300 rounded-xl">
              <Flame className="w-8 h-8 fill-amber-400 stroke-amber-500 animate-pulse" />
            </div>
            <div>
              <div className="text-2xl font-black">{streak} Day{streak === 1 ? '' : 's'}</div>
              <div className="text-xs uppercase tracking-wider text-white/80 font-medium">
                Study Streak
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Summary Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-slate-800 p-5 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-xs">
          <div className="flex items-center gap-2 text-slate-500 text-xs font-bold uppercase mb-1">
            <Calendar className="w-4 h-4 text-teal-600" />
            Due Today
          </div>
          <div className="text-2xl font-black text-slate-900 dark:text-white">
            {dueCount}
          </div>
          <p className="text-xs text-slate-400 mt-1">Cards ready for review</p>
        </div>

        <div className="bg-white dark:bg-slate-800 p-5 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-xs">
          <div className="flex items-center gap-2 text-slate-500 text-xs font-bold uppercase mb-1">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            Mastered Words
          </div>
          <div className="text-2xl font-black text-emerald-600 dark:text-emerald-400">
            {masteredCount}
          </div>
          <p className="text-xs text-slate-400 mt-1">Repetition level 4+</p>
        </div>

        <div className="bg-white dark:bg-slate-800 p-5 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-xs">
          <div className="flex items-center gap-2 text-slate-500 text-xs font-bold uppercase mb-1">
            <BookmarkCheck className="w-4 h-4 text-brand-700" />
            Word Bank
          </div>
          <div className="text-2xl font-black text-brand-800 dark:text-brand-300">
            {vocabEntries.length}
          </div>
          <p className="text-xs text-slate-400 mt-1">
            {customCount} custom / reading words
          </p>
        </div>

        <div className="bg-white dark:bg-slate-800 p-5 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-xs">
          <div className="flex items-center gap-2 text-slate-500 text-xs font-bold uppercase mb-1">
            <GraduationCap className="w-4 h-4 text-purple-600" />
            Academic Catalog
          </div>
          <div className="text-2xl font-black text-purple-600 dark:text-purple-400">
            {ALL_ACADEMIC_WORDS.length}
          </div>
          <p className="text-xs text-slate-400 mt-1">10 IELTS academic topics</p>
        </div>
      </div>

      {/* Main Core Modules Grid */}
      <div className="space-y-4">
        <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <Brain className="w-5 h-5 text-teal-600" />
          Interactive Study Modules
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {/* Flashcards */}
          <Link
            to="/vocab/flashcards"
            className="group p-6 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-teal-500 hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded-xl bg-teal-100 dark:bg-teal-900/50 text-teal-700 dark:text-teal-300 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                <Brain className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-teal-600 transition-colors">
                SM-2 Flashcards
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">
                Flip cards with Urdu translations, collocations, audio pronunciation, and Again/Hard/Good/Easy spaced interval grading.
              </p>
            </div>
            <div className="mt-6 flex items-center justify-between text-xs font-semibold text-teal-600 dark:text-teal-400">
              <span>{dueCount > 0 ? `${dueCount} cards due` : 'Start review session'}</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

          {/* Academic Quiz */}
          <Link
            to="/vocab/quiz"
            className="group p-6 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-brand-500 hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded-xl bg-brand-100 dark:bg-brand-900/50 text-brand-800 dark:text-brand-300 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                <HelpCircle className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-brand-700 transition-colors">
                Academic Vocab Quiz
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">
                3 dynamic game modes: Meaning Match, Fill in the Blank, and Synonym Match with instant scoring and 1-click mistake queueing.
              </p>
            </div>
            <div className="mt-6 flex items-center justify-between text-xs font-semibold text-brand-700 dark:text-brand-300">
              <span>Take 10-Question Quiz</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

          {/* Personal Word Bank */}
          <Link
            to="/vocab/bank"
            className="group p-6 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-emerald-500 hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded-xl bg-emerald-100 dark:bg-emerald-900/50 text-emerald-700 dark:text-emerald-300 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                <BookmarkCheck className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-emerald-600 transition-colors">
                Personal Word Bank
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">
                Manage your custom vocabulary, words saved from Reading test evidence, search definitions, and track mastery.
              </p>
            </div>
            <div className="mt-6 flex items-center justify-between text-xs font-semibold text-emerald-600 dark:text-emerald-400">
              <span>Manage saved words</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

          {/* Grammar Masterclass */}
          <Link
            to="/grammar"
            className="group p-6 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-purple-500 hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded-xl bg-purple-100 dark:bg-purple-900/50 text-purple-700 dark:text-purple-300 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                <GraduationCap className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-purple-600 transition-colors">
                Grammar Masterclass
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">
                15 Band 7+ grammar lessons (conditionals, passives, inversion, nominalisation) with 150 interactive exercises & instant feedback.
              </p>
            </div>
            <div className="mt-6 flex items-center justify-between text-xs font-semibold text-purple-600 dark:text-purple-400">
              <span>15 Lessons • 150 Exercises</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

          {/* Writing Phrase Bank */}
          <Link
            to="/vocab/phrases"
            className="group p-6 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-cyan-500 hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded-xl bg-cyan-100 dark:bg-cyan-900/50 text-cyan-700 dark:text-cyan-300 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                <BookOpen className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-cyan-600 transition-colors">
                Writing Phrase Bank
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">
                Certified cohesive phrases for Task 1 Academic charts, GT letters, and Task 2 essays with 1-click clipboard copy.
              </p>
            </div>
            <div className="mt-6 flex items-center justify-between text-xs font-semibold text-cyan-600 dark:text-cyan-400">
              <span>Explore Phrase Bank</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>
        </div>
      </div>

      {/* IELTS Topic Decks */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Layers className="w-5 h-5 text-teal-600" />
            IELTS Academic Topic Decks (200 Words)
          </h2>
          <span className="text-xs text-slate-500 dark:text-slate-400">20 words per topic</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          {VOCAB_TOPICS.map((topic) => {
            const count = ALL_ACADEMIC_WORDS.filter(
              (w) => w.topic.toLowerCase() === topic.toLowerCase()
            ).length;

            return (
              <Link
                key={topic}
                to={`/vocab/flashcards?topic=${topic}`}
                className="p-4 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-teal-500 hover:shadow-sm transition-all group"
              >
                <div className="capitalize font-bold text-sm text-slate-900 dark:text-white group-hover:text-teal-600 transition-colors">
                  {topic}
                </div>
                <div className="mt-1 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
                  <span>{count} words</span>
                  <span className="text-[11px] font-semibold text-teal-600 dark:text-teal-400 group-hover:underline">
                    Study →
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
