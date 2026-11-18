import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  RotateCcw,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  BookOpen,
  TrendingUp,
  FileText,
  Clock,
  Layers,
  HelpCircle,
  ExternalLink,
  Info,
  ShieldCheck,
  ChevronDown,
  ChevronUp,
  Lightbulb,
  ArrowRight,
  Settings,
} from 'lucide-react';
import { db } from '../../lib/db';
import { copy } from '../../lib/copy';
import { getWritingPromptById } from './writingContent';
import type { WritingSubmission, WritingPromptContent } from '../../types';
import { ParaphrasePracticeModal } from './ParaphrasePracticeModal';
import { Task2IdeaGeneratorModal } from './Task2IdeaGeneratorModal';

export function WritingFeedbackPage() {
  const { submissionId } = useParams<{ submissionId: string }>();
  const navigate = useNavigate();

  const [submission, setSubmission] = useState<WritingSubmission | null>(null);
  const [prompt, setPrompt] = useState<WritingPromptContent | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<
    'essay' | 'upgrades' | 'task1' | 'strengths' | 'upgrade' | 'vocab' | 'model' | 'rubric'
  >('essay');
  const [highlightFilter, setHighlightFilter] = useState<'all' | 'grammar' | 'vocabulary' | 'cohesion' | 'plain'>('all');
  const [selectedSentenceIdx, setSelectedSentenceIdx] = useState<number | null>(null);
  const [isParaphraseOpen, setIsParaphraseOpen] = useState(false);
  const [isIdeaGenOpen, setIsIdeaGenOpen] = useState(false);

  useEffect(() => {
    async function loadData() {
      if (!submissionId) return;
      try {
        const sub = await db.writingSubmissions.get(Number(submissionId));
        if (sub) {
          setSubmission(sub);
          const p = getWritingPromptById(sub.promptId);
          if (p) setPrompt(p);
        }
      } catch (err) {
        console.error('Failed to load submission:', err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, [submissionId]);

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="flex flex-col items-center gap-2">
          <div className="w-8 h-8 border-4 border-teal-600 border-t-transparent rounded-full animate-spin" />
          <span className="text-sm text-slate-500 dark:text-slate-400">Loading evaluation report...</span>
        </div>
      </div>
    );
  }

  if (!submission) {
    return (
      <div className="max-w-3xl mx-auto py-12 px-4 text-center">
        <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-2">Submission Not Found</h2>
        <p className="text-slate-600 dark:text-slate-400 mb-6">
          The requested writing submission could not be retrieved from your local storage.
        </p>
        <Link
          to="/practice/writing"
          className="inline-flex items-center gap-2 px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-lg text-sm font-medium"
        >
          <ArrowLeft className="w-4 h-4" /> Return to Writing Hub
        </Link>
      </div>
    );
  }

  const { feedback } = submission;
  const overallBand = feedback.overallBand.toFixed(1);

  // Band descriptor label
  const getBandLabel = (b: number) => {
    if (b >= 8.5) return 'Expert User (Band 8.5 - 9.0)';
    if (b >= 7.5) return 'Very Good User (Band 7.5 - 8.0)';
    if (b >= 6.5) return 'Competent / Good User (Band 6.5 - 7.0)';
    if (b >= 5.5) return 'Modest User (Band 5.5 - 6.0)';
    return 'Limited User (Band ≤ 5.0)';
  };

  const getEvaluationModeBadge = (mode: string) => {
    switch (mode) {
      case 'gemini':
        return {
          label: 'Evaluated by Google Gemini (Free Tier)',
          classes: 'bg-brand-50 text-brand-800 border-brand-200 dark:bg-brand-950/40 dark:text-brand-300 dark:border-brand-800',
        };
      case 'groq':
        return {
          label: 'Evaluated by Groq Llama-3 (Free Tier)',
          classes: 'bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-950/40 dark:text-purple-300 dark:border-purple-800',
        };
      default:
        return {
          label: 'Evaluated by Offline Rule-Based Engine (Fallback)',
          classes: 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-300 dark:border-emerald-800',
        };
    }
  };

  const modeBadge = getEvaluationModeBadge(feedback.evaluationMode);
  const sentenceHighlights = feedback.sentenceHighlights || [];
  const bandUpgrades = feedback.bandUpgradeSuggestions || [];
  const task1Helper = feedback.task1OverviewHelper;

  return (
    <div className="max-w-6xl mx-auto px-4 py-6 sm:py-8 space-y-6">
      {/* Top Breadcrumb & Actions */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Link
            to="/practice/writing"
            className="p-2 rounded-lg text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-teal-100 text-teal-800 dark:bg-teal-900/50 dark:text-teal-300">
                {submission.taskType === 'task2' ? 'Task 2 Essay' : 'Task 1 Report'}
              </span>
              <span className="text-xs text-slate-500 dark:text-slate-400">
                {new Date(submission.submittedAt).toLocaleDateString(undefined, {
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </span>
            </div>
            <h1 className="text-xl sm:text-2xl font-bold text-slate-800 dark:text-slate-100 mt-0.5">
              {submission.promptTitle}
            </h1>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => setIsParaphraseOpen(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-teal-200 dark:border-teal-800 bg-teal-50/80 dark:bg-teal-950/40 text-teal-700 dark:text-teal-300 text-xs font-semibold hover:bg-teal-100 dark:hover:bg-teal-900/60 transition-colors"
          >
            <Sparkles className="w-3.5 h-3.5" /> Paraphrase Practice
          </button>
          {submission.taskType === 'task2' && (
            <button
              onClick={() => setIsIdeaGenOpen(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-brand-200 dark:border-brand-800 bg-brand-50/80 dark:bg-brand-950/40 text-brand-800 dark:text-brand-300 text-xs font-semibold hover:bg-brand-100 dark:hover:bg-brand-900/60 transition-colors"
            >
              <Lightbulb className="w-3.5 h-3.5" /> Task 2 Ideas
            </button>
          )}
          <button
            onClick={() => navigate(`/practice/writing/prompt/${submission.promptId}`)}
            className="flex items-center gap-1.5 px-3.5 py-1.5 bg-brand-800 hover:bg-brand-700 text-white rounded-lg text-xs font-semibold shadow-xs transition-all"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Rewrite & Resubmit</span>
          </button>
        </div>
      </div>

      {/* Prominent Fallback Banner when Rule-Based */}
      {feedback.evaluationMode === 'rule_based' && (
        <div className="p-4 rounded-xl border border-amber-300 dark:border-amber-800 bg-amber-50/90 dark:bg-amber-950/40 text-amber-900 dark:text-amber-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-xs animate-fadeIn">
          <div className="flex items-start gap-3">
            <div className="p-2 rounded-lg bg-amber-200/80 dark:bg-amber-900/60 text-amber-800 dark:text-amber-200 shrink-0">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-amber-800 dark:text-amber-300">
                {copy.aiFallback.banner}
              </h4>
              <p className="text-xs text-amber-800/90 dark:text-amber-300/90 mt-0.5">
                {copy.aiFallback.ruleBasedNotice}
              </p>
            </div>
          </div>
          <Link
            to="/settings"
            className="shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-600 hover:bg-amber-700 text-white text-xs font-semibold shadow-xs transition-colors"
          >
            <Settings className="w-3.5 h-3.5" /> Configure Free AI Key
          </Link>
        </div>
      )}

      {/* Main Score & Evaluator Hero Card */}
      <div className="bg-gradient-to-r from-[#124F40] to-[#0E3D32] border border-[#17634F] text-white rounded-2xl p-6 sm:p-8 shadow-card">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          {/* Big Band Score Display */}
          <div className="md:col-span-4 flex flex-col items-center justify-center text-center p-6 bg-brand-950/60 rounded-xl border border-brand-700/60 backdrop-blur-xs">
            <span className="text-xs font-semibold uppercase tracking-widest text-brand-300 mb-1">
              Estimated Overall Band
            </span>
            <div className="text-6xl sm:text-7xl font-black text-white tracking-tight my-1">
              {overallBand}
            </div>
            <span className="text-sm font-medium text-brand-200 mt-1">
              {getBandLabel(feedback.overallBand)}
            </span>
            <span className="text-[11px] text-brand-300/80 mt-2">Official 0 - 9.0 IELTS Scale</span>
          </div>

          {/* Quick Metrics & Mode */}
          <div className="md:col-span-8 space-y-4">
            <div className="flex flex-wrap items-center gap-2">
              <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border ${modeBadge.classes}`}>
                <ShieldCheck className="w-3.5 h-3.5" />
                {modeBadge.label}
              </span>

              {feedback.wordCountAnalysis.penaltyApplied && (
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold bg-rose-500/20 text-rose-300 border border-rose-500/30">
                  <AlertTriangle className="w-3.5 h-3.5" />
                  Word Count Penalty Applied
                </span>
              )}
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div className="bg-white/5 p-3 rounded-lg border border-white/10">
                <span className="text-[11px] text-slate-400 block">Words Written</span>
                <span className="text-lg font-bold text-white">
                  {submission.wordCount}
                  <span className="text-xs text-slate-400 font-normal ml-1">
                    (min {feedback.wordCountAnalysis.minRequired})
                  </span>
                </span>
              </div>
              <div className="bg-white/5 p-3 rounded-lg border border-white/10">
                <span className="text-[11px] text-slate-400 block">Time Spent</span>
                <span className="text-lg font-bold text-white">
                  {Math.round(submission.timeSpentSeconds / 60)} mins
                </span>
              </div>
              <div className="bg-white/5 p-3 rounded-lg border border-white/10">
                <span className="text-[11px] text-slate-400 block">Identified Slips</span>
                <span className="text-lg font-bold text-white">{feedback.errors.length}</span>
              </div>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed italic">
              Note: Band scores are rigorous diagnostic estimates based on public IELTS assessment criteria. They are intended for self-study and preparation.
            </p>
          </div>
        </div>
      </div>

      {/* 4 Official Criteria Cards with Evidence Citation */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Task Achievement */}
        <div className="bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-teal-600 dark:text-teal-400">
                {submission.taskType === 'task2' ? 'Task Response' : 'Task Achievement'}
              </span>
              <span className="text-lg font-bold text-slate-800 dark:text-slate-100 px-2 py-0.5 bg-slate-100 dark:bg-slate-800 rounded">
                {feedback.criteria.taskAchievement.band.toFixed(1)}
              </span>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mt-2">
              {feedback.criteria.taskAchievement.comments}
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 text-[11px] text-slate-500 dark:text-slate-400">
            {feedback.wordCountAnalysis.details}
          </div>
        </div>

        {/* Coherence & Cohesion */}
        <div className="bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-teal-600 dark:text-teal-400">
                Coherence & Cohesion
              </span>
              <span className="text-lg font-bold text-slate-800 dark:text-slate-100 px-2 py-0.5 bg-slate-100 dark:bg-slate-800 rounded">
                {feedback.criteria.coherenceAndCohesion.band.toFixed(1)}
              </span>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mt-2">
              {feedback.criteria.coherenceAndCohesion.comments}
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 text-[11px] text-slate-500 dark:text-slate-400">
            Paragraph progression & logical linking
          </div>
        </div>

        {/* Lexical Resource */}
        <div className="bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-teal-600 dark:text-teal-400">
                Lexical Resource
              </span>
              <span className="text-lg font-bold text-slate-800 dark:text-slate-100 px-2 py-0.5 bg-slate-100 dark:bg-slate-800 rounded">
                {feedback.criteria.lexicalResource.band.toFixed(1)}
              </span>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mt-2">
              {feedback.criteria.lexicalResource.comments}
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 text-[11px] text-slate-500 dark:text-slate-400">
            Collocations, range & spelling precision
          </div>
        </div>

        {/* Grammatical Range & Accuracy */}
        <div className="bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-teal-600 dark:text-teal-400">
                Grammar Range & Acc.
              </span>
              <span className="text-lg font-bold text-slate-800 dark:text-slate-100 px-2 py-0.5 bg-slate-100 dark:bg-slate-800 rounded">
                {feedback.criteria.grammaticalRangeAndAccuracy.band.toFixed(1)}
              </span>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mt-2">
              {feedback.criteria.grammaticalRangeAndAccuracy.comments}
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 text-[11px] text-slate-500 dark:text-slate-400">
            Complex sentences, tenses & punctuation
          </div>
        </div>
      </div>

      {/* Tabs Section */}
      <div className="border-b border-slate-200 dark:border-slate-700">
        <nav className="flex space-x-2 sm:space-x-6 overflow-x-auto py-2 text-xs sm:text-sm font-semibold">
          <button
            onClick={() => setActiveTab('essay')}
            className={`pb-3 border-b-2 whitespace-nowrap transition-colors ${
              activeTab === 'essay'
                ? 'border-teal-600 text-teal-600 dark:text-teal-400'
                : 'border-transparent text-slate-600 dark:text-slate-400 hover:text-slate-900'
            }`}
          >
            Essay & Highlighting ({sentenceHighlights.length || feedback.errors.length})
          </button>

          <button
            onClick={() => setActiveTab('upgrades')}
            className={`pb-3 border-b-2 whitespace-nowrap transition-colors flex items-center gap-1.5 ${
              activeTab === 'upgrades'
                ? 'border-teal-600 text-teal-600 dark:text-teal-400'
                : 'border-transparent text-slate-600 dark:text-slate-400 hover:text-slate-900'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            Band 6 to 7 Upgrades ({bandUpgrades.length})
          </button>

          {task1Helper && (
            <button
              onClick={() => setActiveTab('task1')}
              className={`pb-3 border-b-2 whitespace-nowrap transition-colors flex items-center gap-1.5 ${
                activeTab === 'task1'
                  ? 'border-teal-600 text-teal-600 dark:text-teal-400'
                  : 'border-transparent text-slate-600 dark:text-slate-400 hover:text-slate-900'
              }`}
            >
              <TrendingUp className="w-3.5 h-3.5 text-teal-500" />
              Task 1 Overview Helper
            </button>
          )}

          <button
            onClick={() => setActiveTab('strengths')}
            className={`pb-3 border-b-2 whitespace-nowrap transition-colors ${
              activeTab === 'strengths'
                ? 'border-teal-600 text-teal-600 dark:text-teal-400'
                : 'border-transparent text-slate-600 dark:text-slate-400 hover:text-slate-900'
            }`}
          >
            Strengths & Weaknesses
          </button>

          <button
            onClick={() => setActiveTab('upgrade')}
            className={`pb-3 border-b-2 whitespace-nowrap transition-colors ${
              activeTab === 'upgrade'
                ? 'border-teal-600 text-teal-600 dark:text-teal-400'
                : 'border-transparent text-slate-600 dark:text-slate-400 hover:text-slate-900'
            }`}
          >
            Paragraph Upgrade
          </button>

          <button
            onClick={() => setActiveTab('vocab')}
            className={`pb-3 border-b-2 whitespace-nowrap transition-colors ${
              activeTab === 'vocab'
                ? 'border-teal-600 text-teal-600 dark:text-teal-400'
                : 'border-transparent text-slate-600 dark:text-slate-400 hover:text-slate-900'
            }`}
          >
            Vocabulary Upgrades ({feedback.vocabUpgrades.length})
          </button>

          {prompt && (
            <button
              onClick={() => setActiveTab('model')}
              className={`pb-3 border-b-2 whitespace-nowrap transition-colors ${
                activeTab === 'model'
                  ? 'border-teal-600 text-teal-600 dark:text-teal-400'
                  : 'border-transparent text-slate-600 dark:text-slate-400 hover:text-slate-900'
              }`}
            >
              Band 8+ Model Answer
            </button>
          )}

          <button
            onClick={() => setActiveTab('rubric')}
            className={`pb-3 border-b-2 whitespace-nowrap transition-colors ${
              activeTab === 'rubric'
                ? 'border-teal-600 text-teal-600 dark:text-teal-400'
                : 'border-transparent text-slate-600 dark:text-slate-400 hover:text-slate-900'
            }`}
          >
            Official Descriptors
          </button>
        </nav>
      </div>

      {/* Tab 1: Essay & Sentence Highlighting */}
      {activeTab === 'essay' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Essay Highlighting View */}
          <div className="lg:col-span-7 bg-white dark:bg-slate-900 rounded-xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 dark:border-slate-800 pb-3">
              <h3 className="text-sm font-bold text-slate-800 dark:text-slate-100">
                Interactive Sentence Analysis
              </h3>

              {/* Filter Pills */}
              <div className="flex items-center gap-1 overflow-x-auto text-2xs">
                <button
                  onClick={() => setHighlightFilter('all')}
                  className={`px-2 py-0.5 rounded font-medium ${
                    highlightFilter === 'all'
                      ? 'bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900'
                      : 'text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                >
                  All
                </button>
                <button
                  onClick={() => setHighlightFilter('grammar')}
                  className={`px-2 py-0.5 rounded font-medium ${
                    highlightFilter === 'grammar'
                      ? 'bg-rose-600 text-white'
                      : 'text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40'
                  }`}
                >
                  Grammar ({sentenceHighlights.filter((h) => h.type === 'grammar').length})
                </button>
                <button
                  onClick={() => setHighlightFilter('vocabulary')}
                  className={`px-2 py-0.5 rounded font-medium ${
                    highlightFilter === 'vocabulary'
                      ? 'bg-emerald-600 text-white'
                      : 'text-emerald-600 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-950/40'
                  }`}
                >
                  Lexis ({sentenceHighlights.filter((h) => h.type === 'vocabulary').length})
                </button>
                <button
                  onClick={() => setHighlightFilter('cohesion')}
                  className={`px-2 py-0.5 rounded font-medium ${
                    highlightFilter === 'cohesion'
                      ? 'bg-brand-700 text-white'
                      : 'text-brand-700 dark:text-brand-300 hover:bg-brand-50 dark:hover:bg-brand-950/40'
                  }`}
                >
                  Cohesion ({sentenceHighlights.filter((h) => h.type === 'cohesion').length})
                </button>
                <button
                  onClick={() => setHighlightFilter('plain')}
                  className={`px-2 py-0.5 rounded font-medium ${
                    highlightFilter === 'plain'
                      ? 'bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-slate-100'
                      : 'text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                >
                  Plain
                </button>
              </div>
            </div>

            {/* Essay Text with Highlights */}
            <div className="font-serif text-base leading-relaxed text-slate-800 dark:text-slate-200 p-4 bg-slate-50 dark:bg-slate-800/80 rounded-xl border border-slate-200 dark:border-slate-700/80 space-y-2">
              {sentenceHighlights.length === 0 ? (
                <div className="whitespace-pre-line">{submission.essayText}</div>
              ) : (
                <p>
                  {sentenceHighlights.map((h, i) => {
                    const isSelected = selectedSentenceIdx === i;
                    let styleClass = '';

                    if (highlightFilter !== 'plain') {
                      const isMatch = highlightFilter === 'all' ? h.type !== 'standard' : h.type === highlightFilter;
                      if (isMatch) {
                        if (h.type === 'grammar') {
                          styleClass = 'bg-rose-100/90 dark:bg-rose-950/60 text-rose-900 dark:text-rose-100 border-b-2 border-rose-500';
                        } else if (h.type === 'vocabulary') {
                          styleClass = 'bg-emerald-100/90 dark:bg-emerald-950/60 text-emerald-900 dark:text-emerald-100 border-b-2 border-emerald-500';
                        } else if (h.type === 'cohesion') {
                          styleClass = 'bg-brand-100/90 dark:bg-brand-950/60 text-brand-900 dark:text-brand-100 border-b-2 border-brand-500';
                        }
                      }
                    }

                    return (
                      <span
                        key={i}
                        onClick={() => setSelectedSentenceIdx(i)}
                        className={`inline transition-all cursor-pointer rounded px-1 py-0.5 mx-0.5 ${styleClass} ${
                          isSelected ? 'ring-2 ring-teal-500 shadow-xs' : ''
                        }`}
                        title={h.message}
                      >
                        {h.sentence}{' '}
                      </span>
                    );
                  })}
                </p>
              )}
            </div>

            {/* Selected Sentence Inspector Card */}
            {selectedSentenceIdx !== null && sentenceHighlights[selectedSentenceIdx] && (
              <div className="p-4 rounded-xl border border-teal-200 dark:border-teal-800 bg-teal-50/50 dark:bg-teal-950/30 text-xs space-y-2 animate-fadeIn">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-800 dark:text-slate-100 uppercase tracking-wider text-2xs">
                    Sentence #{selectedSentenceIdx + 1} Assessment
                  </span>
                  <span
                    className={`px-2 py-0.5 rounded text-2xs font-bold uppercase tracking-wider ${
                      sentenceHighlights[selectedSentenceIdx].type === 'grammar'
                        ? 'bg-rose-100 text-rose-800 dark:bg-rose-900 dark:text-rose-200'
                        : sentenceHighlights[selectedSentenceIdx].type === 'vocabulary'
                        ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200'
                        : sentenceHighlights[selectedSentenceIdx].type === 'cohesion'
                        ? 'bg-brand-100 text-brand-800 dark:bg-brand-900 dark:text-brand-200'
                        : 'bg-slate-200 text-slate-700 dark:bg-slate-700 dark:text-slate-300'
                    }`}
                  >
                    {sentenceHighlights[selectedSentenceIdx].type}
                  </span>
                </div>
                <p className="font-serif italic text-slate-700 dark:text-slate-300">
                  "{sentenceHighlights[selectedSentenceIdx].sentence}"
                </p>
                <p className="text-slate-600 dark:text-slate-400">
                  {sentenceHighlights[selectedSentenceIdx].message}
                </p>
                {sentenceHighlights[selectedSentenceIdx].suggestion && (
                  <div className="p-2 rounded bg-white dark:bg-slate-900 border border-teal-100 dark:border-teal-900 text-teal-800 dark:text-teal-300 font-medium">
                    Recommended Fix: {sentenceHighlights[selectedSentenceIdx].suggestion}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Errors List */}
          <div className="lg:col-span-5 space-y-3">
            <h3 className="text-sm font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-500" />
              <span>Identified Corrections ({feedback.errors.length})</span>
            </h3>

            {feedback.errors.length === 0 ? (
              <div className="p-5 bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 rounded-xl text-center">
                <CheckCircle2 className="w-6 h-6 text-emerald-600 dark:text-emerald-400 mx-auto mb-1.5" />
                <p className="text-xs font-semibold text-emerald-800 dark:text-emerald-300">
                  No major mechanical or spelling errors detected!
                </p>
                <p className="text-[11px] text-emerald-700 dark:text-emerald-400 mt-1">
                  Your essay demonstrates strong foundational grammatical control.
                </p>
              </div>
            ) : (
              <div className="space-y-2.5 max-h-[600px] overflow-y-auto pr-1">
                {feedback.errors.map((err, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-2 text-xs"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-semibold px-2 py-0.5 rounded text-[10px] uppercase tracking-wider bg-rose-100 text-rose-800 dark:bg-rose-950/50 dark:text-rose-300">
                        {err.type}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div className="p-2 rounded bg-rose-50 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-900/40">
                        <span className="text-[10px] text-rose-700 dark:text-rose-400 font-semibold block">Original:</span>
                        <span className="text-rose-900 dark:text-rose-200 line-through">{err.originalText}</span>
                      </div>
                      <div className="p-2 rounded bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-900/40">
                        <span className="text-[10px] text-emerald-700 dark:text-emerald-400 font-semibold block">Correction:</span>
                        <span className="text-emerald-900 dark:text-emerald-200 font-medium">{err.correction}</span>
                      </div>
                    </div>

                    <p className="text-slate-600 dark:text-slate-300 leading-relaxed pt-1">
                      <strong className="text-slate-700 dark:text-slate-200">Rule: </strong>
                      {err.rule}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Tab: Band 6 to Band 7 Upgrades */}
      {activeTab === 'upgrades' && (
        <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
          <div>
            <h3 className="text-base font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-amber-500" />
              <span>Band 6 to Band 7+ Concrete Sentence Upgrades</span>
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Examiner demonstrations showing how typical Band 6 sentence structures from your essay can be elevated into Band 7.5+ academic prose.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {bandUpgrades.map((item, idx) => (
              <div
                key={idx}
                className="p-5 rounded-xl border border-slate-200 dark:border-slate-700/80 bg-slate-50/50 dark:bg-slate-800/80 space-y-3"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-teal-100 text-teal-800 dark:bg-teal-900/50 dark:text-teal-300">
                    {item.criterion} Upgrade
                  </span>
                  <div className="flex items-center gap-2 text-xs font-semibold">
                    <span className="text-slate-500 dark:text-slate-400">Band {item.bandFrom}</span>
                    <ArrowRight className="w-3.5 h-3.5 text-teal-600" />
                    <span className="text-emerald-600 dark:text-emerald-400">Band {item.bandTo}</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                  <div className="p-3 rounded-lg bg-rose-50/60 dark:bg-rose-950/20 border border-rose-200 dark:border-rose-900/40 space-y-1">
                    <span className="text-2xs font-bold uppercase text-rose-700 dark:text-rose-400 block">
                      Typical / Original (Band 6.0):
                    </span>
                    <p className="font-serif text-rose-900 dark:text-rose-200 leading-relaxed italic">
                      "{item.original}"
                    </p>
                  </div>

                  <div className="p-3 rounded-lg bg-emerald-50/60 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-900/40 space-y-1">
                    <span className="text-2xs font-bold uppercase text-emerald-700 dark:text-emerald-400 block">
                      Elevated Rewrite (Band 7.5+):
                    </span>
                    <p className="font-serif text-emerald-900 dark:text-emerald-200 leading-relaxed font-medium">
                      "{item.upgraded}"
                    </p>
                  </div>
                </div>

                <div className="p-3 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs flex items-start gap-2">
                  <Lightbulb className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                  <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                    <strong className="text-slate-800 dark:text-slate-100">Examiner Analysis: </strong>
                    {item.explanation}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab: Task 1 Overview Helper */}
      {activeTab === 'task1' && task1Helper && (
        <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
          <div>
            <h3 className="text-base font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-teal-600" />
              <span>Task 1 Helper: What a Strong Overview Includes</span>
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Extracted trends and examiner patterns from this prompt's chart data to help you achieve Band 7+ on Task Achievement.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Extracted Key Trends */}
            <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/50 space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-teal-700 dark:text-teal-400 block">
                Extracted Macro Trends
              </span>
              <ul className="space-y-2 text-xs text-slate-700 dark:text-slate-300">
                {task1Helper.overallTrends.map((t, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                    <span>{t}</span>
                  </li>
                ))}
              </ul>

              <div className="pt-2 border-t border-slate-200 dark:border-slate-700 space-y-1.5 text-xs">
                <div>
                  <span className="font-semibold text-slate-800 dark:text-slate-200">Dominant Feature: </span>
                  <span className="text-slate-600 dark:text-slate-400">{task1Helper.dominantFeature}</span>
                </div>
                <div>
                  <span className="font-semibold text-slate-800 dark:text-slate-200">Lowest / Exception: </span>
                  <span className="text-slate-600 dark:text-slate-400">{task1Helper.lowestOrAnomalous}</span>
                </div>
              </div>
            </div>

            {/* Overview Checklist */}
            <div className="p-4 rounded-xl border border-teal-200 dark:border-teal-800 bg-teal-50/40 dark:bg-teal-950/20 space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-teal-800 dark:text-teal-300 block">
                Examiner's Overview Formula Checklist
              </span>
              <ul className="space-y-2 text-xs text-teal-900 dark:text-teal-200">
                {task1Helper.checklist.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <div className="w-4 h-4 rounded bg-teal-200 dark:bg-teal-800 flex items-center justify-center shrink-0 mt-0.5 text-2xs font-bold">
                      ✓
                    </div>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Model Overview Paragraph */}
          <div className="p-4 rounded-xl border border-brand-200 dark:border-brand-800 bg-brand-50/40 dark:bg-brand-950/20 space-y-2">
            <span className="text-2xs font-bold uppercase tracking-wider text-brand-800 dark:text-brand-300 block">
              Sample Band 8.5 Overview Paragraph
            </span>
            <p className="font-serif text-sm text-brand-950 dark:text-brand-100 leading-relaxed italic">
              "{task1Helper.strongOverviewSample}"
            </p>
          </div>
        </div>
      )}

      {/* Tab: Strengths & Weaknesses */}
      {activeTab === 'strengths' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
            <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400">
              <CheckCircle2 className="w-5 h-5" />
              <h3 className="text-sm font-bold uppercase tracking-wider">Key Strengths Identified</h3>
            </div>
            <ul className="space-y-2 text-xs text-slate-700 dark:text-slate-300">
              {feedback.strengths.map((str, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-emerald-500 font-bold">•</span>
                  <span>{str}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
            <div className="flex items-center gap-2 text-rose-600 dark:text-rose-400">
              <AlertTriangle className="w-5 h-5" />
              <h3 className="text-sm font-bold uppercase tracking-wider">Primary Areas to Improve</h3>
            </div>
            <ul className="space-y-2 text-xs text-slate-700 dark:text-slate-300">
              {feedback.weaknesses.map((w, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-rose-500 font-bold">•</span>
                  <span>{w}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {/* Tab: Paragraph Upgrade */}
      {activeTab === 'upgrade' && (
        <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <h3 className="text-sm font-bold text-slate-800 dark:text-slate-100">
            Targeted Paragraph Upgrade (Band 8.5 Standard)
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Compare your original paragraph against an elevated rewrite demonstrating Band 8+ cohesion, lexical precision, and syntactic complexity.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-700 space-y-2">
              <span className="font-bold text-slate-700 dark:text-slate-300 block">Original Paragraph:</span>
              <p className="font-serif text-slate-600 dark:text-slate-400 leading-relaxed italic">
                "{feedback.improvedParagraph.originalParagraph}"
              </p>
            </div>

            <div className="p-4 rounded-xl bg-teal-50/50 dark:bg-teal-950/30 border border-teal-200 dark:border-teal-800 space-y-2">
              <span className="font-bold text-teal-800 dark:text-teal-300 block">Band 8.5+ Elevated Version:</span>
              <p className="font-serif text-slate-800 dark:text-slate-100 leading-relaxed">
                "{feedback.improvedParagraph.rewrittenParagraph}"
              </p>
            </div>
          </div>

          <div className="p-3 bg-slate-100 dark:bg-slate-900 rounded-lg text-xs text-slate-600 dark:text-slate-300 flex items-start gap-2">
            <Info className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
            <div>
              <strong className="text-slate-800 dark:text-slate-200">Examiner Rationale: </strong>
              {feedback.improvedParagraph.examinerNote}
            </div>
          </div>
        </div>
      )}

      {/* Tab: Vocabulary Upgrades */}
      {activeTab === 'vocab' && (
        <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <h3 className="text-sm font-bold text-slate-800 dark:text-slate-100">
            Recommended Academic Vocabulary Upgrades
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            {feedback.vocabUpgrades.map((v, i) => (
              <div
                key={i}
                className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-700/80 bg-slate-50 dark:bg-slate-800/80 space-y-1.5"
              >
                <div className="flex items-center justify-between">
                  <span className="text-slate-500 dark:text-slate-400 line-through">{v.original}</span>
                  <ArrowRight className="w-3.5 h-3.5 text-teal-600" />
                  <span className="font-bold text-teal-700 dark:text-teal-400 font-mono">
                    {v.advancedAlternative}
                  </span>
                </div>
                <p className="text-slate-600 dark:text-slate-400 text-2xs pt-1 border-t border-slate-200 dark:border-slate-800">
                  {v.reason}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab: Model Answer */}
      {activeTab === 'model' && prompt && prompt.sampleAnswers && prompt.sampleAnswers.length > 0 && (
        <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-800 dark:text-slate-100">
              Official Band {prompt.sampleAnswers[0].band}+ Benchmark Model Answer
            </h3>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-teal-100 text-teal-800 dark:bg-teal-900 dark:text-teal-200 font-semibold">
              Certified IELTS Standard
            </span>
          </div>

          <div className="font-serif text-base leading-relaxed text-slate-800 dark:text-slate-200 whitespace-pre-line p-5 bg-slate-50 dark:bg-slate-800/80 rounded-xl border border-slate-200 dark:border-slate-700/80">
            {prompt.sampleAnswers[0].text}
          </div>
          {prompt.sampleAnswers[0].examinerCommentary && (
            <div className="p-3 rounded-lg bg-teal-50 dark:bg-teal-950/30 border border-teal-200 dark:border-teal-800 text-xs text-teal-900 dark:text-teal-200">
              <strong className="block mb-0.5">Examiner Commentary:</strong>
              {prompt.sampleAnswers[0].examinerCommentary}
            </div>
          )}
        </div>
      )}

      {/* Tab: Official Descriptors */}
      {activeTab === 'rubric' && (
        <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <h3 className="text-sm font-bold text-slate-800 dark:text-slate-100">
            Official IELTS Writing Assessment Band Standards
          </h3>

          <div className="space-y-3 text-xs">
            <div className="p-4 rounded-xl border border-emerald-200 dark:border-emerald-800 bg-emerald-50/40 dark:bg-emerald-950/20 space-y-1">
              <span className="font-bold text-emerald-800 dark:text-emerald-300 text-sm">Band 8 (Very Good)</span>
              <p className="text-slate-700 dark:text-slate-300">
                Addresses all parts with well-developed ideas. Cohesive devices used flexibly. Wide lexical range with uncommon items. Majority of sentences error-free.
              </p>
            </div>

            <div className="p-4 rounded-xl border border-brand-200 dark:border-brand-800 bg-brand-50/40 dark:bg-brand-950/20 space-y-1">
              <span className="font-bold text-brand-800 dark:text-brand-300 text-sm">Band 7 (Good)</span>
              <p className="text-slate-700 dark:text-slate-300">
                Presents clear position throughout. Logical progression with paragraph central topics. Uses less common lexis with awareness of style. Variety of complex structures.
              </p>
            </div>

            <div className="p-4 rounded-xl border border-amber-200 dark:border-amber-800 bg-amber-50/40 dark:bg-amber-950/20 space-y-1">
              <span className="font-bold text-amber-800 dark:text-amber-300 text-sm">Band 6 (Competent)</span>
              <p className="text-slate-700 dark:text-slate-300">
                Addresses all parts with relevant position. Cohesion may be mechanical in places. Adequate vocabulary with some slips. Mix of simple and complex structures.
              </p>
            </div>

            <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 space-y-1">
              <span className="font-bold text-slate-800 dark:text-slate-200 text-sm">Band 5 (Modest)</span>
              <p className="text-slate-600 dark:text-slate-400">
                Partially addresses task. Limited progression; mechanical or inadequate cohesive devices. Basic vocabulary. Complex structures tend to be inaccurate.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Paraphrase Practice Modal */}
      <ParaphrasePracticeModal
        isOpen={isParaphraseOpen}
        onClose={() => setIsParaphraseOpen(false)}
        defaultTaskType={submission.taskType === 'task2' ? 'task2' : 'task1'}
      />

      {/* Task 2 Idea Generator Modal */}
      <Task2IdeaGeneratorModal
        isOpen={isIdeaGenOpen}
        onClose={() => setIsIdeaGenOpen(false)}
        initialTopic={submission.promptTitle}
      />
    </div>
  );
}
