import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  RotateCcw,
  Sparkles,
  Volume2,
  Trash2,
  Clock,
  TrendingUp,
  AlertTriangle,
  CheckCircle2,
  HelpCircle,
  ShieldCheck,
  Zap,
  MessageSquare,
  BookOpen,
  ArrowRight,
  Settings,
  Mic,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import { db } from '../../lib/db';
import type { SpeakingSession } from '../../types';

export function SpeakingResultsPage() {
  const { sessionId } = useParams<{ sessionId: string }>();
  const navigate = useNavigate();

  const [session, setSession] = useState<SpeakingSession | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<
    'metrics' | 'comparison' | 'followup' | 'vocab' | 'upgrades' | 'pronunciation'
  >('metrics');
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [checklistState, setChecklistState] = useState<Record<number, boolean>>({});
  const [showSampleFollowup, setShowSampleFollowup] = useState(false);
  const [followupResponse, setFollowupResponse] = useState('');
  const [isRecordingFollowup, setIsRecordingFollowup] = useState(false);

  useEffect(() => {
    async function loadSession() {
      if (!sessionId) return;
      try {
        const item = await db.speakingSessions.get(Number(sessionId));
        if (item) {
          setSession(item);
          if (item.audioBlobUrl) {
            setAudioUrl(item.audioBlobUrl);
          }
        }
      } catch (err) {
        console.error('Failed to load speaking session:', err);
      } finally {
        setLoading(false);
      }
    }
    loadSession();
  }, [sessionId]);

  const handleDeleteSession = async () => {
    if (window.confirm('Are you sure you want to delete this recorded session and its data?')) {
      if (sessionId) {
        await db.speakingSessions.delete(Number(sessionId));
        navigate('/practice/speaking');
      }
    }
  };

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="flex flex-col items-center gap-2">
          <div className="w-8 h-8 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin" />
          <span className="text-sm text-slate-500 dark:text-slate-400">Loading speaking diagnostic report...</span>
        </div>
      </div>
    );
  }

  if (!session) {
    return (
      <div className="max-w-3xl mx-auto py-12 px-4 text-center">
        <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-2">Session Not Found</h2>
        <p className="text-slate-600 dark:text-slate-400 mb-6">
          The requested speaking session could not be located in your local storage.
        </p>
        <Link
          to="/practice/speaking"
          className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-sm font-medium"
        >
          <ArrowLeft className="w-4 h-4" /> Return to Speaking Hub
        </Link>
      </div>
    );
  }

  const { feedback } = session;
  const { metrics, criteria, pronunciationGuide } = feedback;
  const followUp = feedback.followUpQuestion;
  const topicVocab = feedback.topicVocabulary || [];
  const modelAnswer = feedback.modelBand7Answer;

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
          label: 'Evaluated by Offline Rule-Based Acoustic Engine',
          classes: 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-300 dark:border-emerald-800',
        };
    }
  };

  const modeBadge = getEvaluationModeBadge(feedback.evaluationMode);

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 space-y-6">
      {/* Top Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Link
            to="/practice/speaking"
            className="p-2 rounded-lg text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                {session.mode === 'mock' ? 'Full Mock Interview' : `Part ${session.part} Practice`}
              </span>
              <span className="text-xs text-slate-500 dark:text-slate-400">
                {new Date(session.recordedAt).toLocaleDateString(undefined, {
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </span>
            </div>
            <h1 className="text-xl sm:text-2xl font-bold text-slate-800 dark:text-slate-100 mt-0.5">
              {session.topicTitle}
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleDeleteSession}
            className="p-2 text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/50 rounded-lg text-xs transition-colors"
            title="Delete this session record"
          >
            <Trash2 className="w-4 h-4" />
          </button>
          <button
            onClick={() => navigate('/practice/speaking')}
            className="flex items-center gap-1.5 px-4 py-2 bg-brand-800 hover:bg-brand-700 text-white rounded-lg text-xs sm:text-sm font-semibold transition-all"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Practice Another</span>
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
                Offline Heuristic Speech Mode
              </h4>
              <p className="text-xs text-amber-800/90 dark:text-amber-300/90 mt-0.5">
                This evaluation was produced by Zarii's local rule-based speech engine. For full conversational examiner evaluation with direct verbatim evidence quotation, connect a free Google Gemini or Groq API key in Settings.
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

      {/* Main Score & Metrics Hero Card */}
      <div className="bg-gradient-to-r from-[#124F40] to-[#0E3D32] border border-[#17634F] text-white rounded-2xl p-6 sm:p-8 shadow-card">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          {/* Overall Band */}
          <div className="md:col-span-4 flex flex-col items-center justify-center text-center p-6 bg-brand-950/60 rounded-xl border border-brand-700/60 backdrop-blur-xs">
            <span className="text-xs font-semibold uppercase tracking-widest text-brand-300 mb-1">
              Estimated Speaking Band
            </span>
            <div className="text-6xl sm:text-7xl font-black text-white tracking-tight my-1">
              {feedback.overallBand.toFixed(1)}
            </div>
            <span className="text-xs text-brand-200 mt-1">Official 0–9.0 IELTS Scale</span>
          </div>

          {/* Quick Metrics */}
          <div className="md:col-span-8 space-y-4">
            <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border ${modeBadge.classes}`}>
              <ShieldCheck className="w-3.5 h-3.5" />
              {modeBadge.label}
            </span>

            <div className="grid grid-cols-3 gap-3">
              <div className="bg-white/5 p-3 rounded-lg border border-white/10">
                <span className="text-[11px] text-slate-400 block">Speaking Pace</span>
                <span className="text-lg font-bold text-white">
                  {metrics.wordsPerMinute} <span className="text-xs text-slate-400 font-normal">WPM</span>
                </span>
              </div>
              <div className="bg-white/5 p-3 rounded-lg border border-white/10">
                <span className="text-[11px] text-slate-400 block">Verbal Hesitations</span>
                <span className="text-lg font-bold text-white">
                  {metrics.fillerWordsCount} <span className="text-xs text-slate-400 font-normal">fillers</span>
                </span>
              </div>
              <div className="bg-white/5 p-3 rounded-lg border border-white/10">
                <span className="text-[11px] text-slate-400 block">Total Duration</span>
                <span className="text-lg font-bold text-white">
                  {Math.floor(session.durationSeconds / 60)}:
                  {(session.durationSeconds % 60).toString().padStart(2, '0')}
                </span>
              </div>
            </div>

            <p className="text-xs text-slate-300 italic">
              Estimated based on public IELTS Speaking descriptors. Pronunciation evaluated via self-assessment checklist.
            </p>
          </div>
        </div>
      </div>

      {/* 3 Criteria Cards with Evidence Citation */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Fluency & Coherence */}
        <div className="bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
              Fluency & Coherence
            </span>
            <span className="text-lg font-bold text-slate-800 dark:text-slate-100 px-2 py-0.5 bg-slate-100 dark:bg-slate-800 rounded">
              {criteria.fluencyAndCoherence.band.toFixed(1)}
            </span>
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
            {criteria.fluencyAndCoherence.comments}
          </p>
        </div>

        {/* Lexical Resource */}
        <div className="bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
              Lexical Resource
            </span>
            <span className="text-lg font-bold text-slate-800 dark:text-slate-100 px-2 py-0.5 bg-slate-100 dark:bg-slate-800 rounded">
              {criteria.lexicalResource.band.toFixed(1)}
            </span>
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
            {criteria.lexicalResource.comments}
          </p>
        </div>

        {/* Grammatical Range & Accuracy */}
        <div className="bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
              Grammar Range & Acc.
            </span>
            <span className="text-lg font-bold text-slate-800 dark:text-slate-100 px-2 py-0.5 bg-slate-100 dark:bg-slate-800 rounded">
              {criteria.grammaticalRangeAndAccuracy.band.toFixed(1)}
            </span>
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
            {criteria.grammaticalRangeAndAccuracy.comments}
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-slate-200 dark:border-slate-700">
        <nav className="flex space-x-4 sm:space-x-6 overflow-x-auto py-2 text-xs sm:text-sm font-semibold">
          <button
            onClick={() => setActiveTab('metrics')}
            className={`pb-3 border-b-2 whitespace-nowrap transition-colors ${
              activeTab === 'metrics'
                ? 'border-emerald-600 text-emerald-600 dark:text-emerald-400'
                : 'border-transparent text-slate-600 dark:text-slate-400'
            }`}
          >
            Spoken Transcript & Fillers
          </button>

          {modelAnswer && (
            <button
              onClick={() => setActiveTab('comparison')}
              className={`pb-3 border-b-2 whitespace-nowrap transition-colors flex items-center gap-1.5 ${
                activeTab === 'comparison'
                  ? 'border-emerald-600 text-emerald-600 dark:text-emerald-400'
                  : 'border-transparent text-slate-600 dark:text-slate-400'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              Model Band 7+ Comparison
            </button>
          )}

          {followUp && (
            <button
              onClick={() => setActiveTab('followup')}
              className={`pb-3 border-b-2 whitespace-nowrap transition-colors flex items-center gap-1.5 ${
                activeTab === 'followup'
                  ? 'border-emerald-600 text-emerald-600 dark:text-emerald-400'
                  : 'border-transparent text-slate-600 dark:text-slate-400'
              }`}
            >
              <MessageSquare className="w-3.5 h-3.5 text-brand-700 dark:text-brand-400" />
              Examiner Follow-Up Question
            </button>
          )}

          {topicVocab.length > 0 && (
            <button
              onClick={() => setActiveTab('vocab')}
              className={`pb-3 border-b-2 whitespace-nowrap transition-colors flex items-center gap-1.5 ${
                activeTab === 'vocab'
                  ? 'border-emerald-600 text-emerald-600 dark:text-emerald-400'
                  : 'border-transparent text-slate-600 dark:text-slate-400'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5 text-teal-500" />
              Topic Lexicon ({topicVocab.length})
            </button>
          )}

          <button
            onClick={() => setActiveTab('upgrades')}
            className={`pb-3 border-b-2 whitespace-nowrap transition-colors ${
              activeTab === 'upgrades'
                ? 'border-emerald-600 text-emerald-600 dark:text-emerald-400'
                : 'border-transparent text-slate-600 dark:text-slate-400'
            }`}
          >
            Upgraded Phrases ({feedback.upgradedPhrases.length})
          </button>

          <button
            onClick={() => setActiveTab('pronunciation')}
            className={`pb-3 border-b-2 whitespace-nowrap transition-colors ${
              activeTab === 'pronunciation'
                ? 'border-emerald-600 text-emerald-600 dark:text-emerald-400'
                : 'border-transparent text-slate-600 dark:text-slate-400'
            }`}
          >
            Pronunciation Checklist
          </button>
        </nav>
      </div>

      {/* Tab 1: Spoken Transcript & Metrics */}
      {activeTab === 'metrics' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-7 bg-white dark:bg-slate-900 rounded-xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
            <h3 className="text-sm font-bold text-slate-800 dark:text-slate-100 flex items-center justify-between">
              <span>Full Spoken Transcript</span>
              <span className="text-xs font-normal text-slate-500 dark:text-slate-400 font-mono">
                {metrics.totalWords} words
              </span>
            </h3>

            <div className="font-serif text-base leading-relaxed text-slate-800 dark:text-slate-200 whitespace-pre-line p-4 bg-slate-50 dark:bg-slate-800/80 rounded-xl border border-slate-200 dark:border-slate-700/80">
              {session.transcript || 'No speech transcript available.'}
            </div>

            {audioUrl && (
              <div className="p-3 bg-slate-50 dark:bg-slate-800/80 rounded-lg flex items-center gap-3 border border-slate-200 dark:border-slate-700/80">
                <Volume2 className="w-4 h-4 text-emerald-600" />
                <audio controls src={audioUrl} className="w-full h-8" />
              </div>
            )}
          </div>

          <div className="lg:col-span-5 space-y-4">
            {/* Hesitation fillers breakdown */}
            <div className="bg-white dark:bg-slate-900 rounded-xl p-5 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                Hesitation Fillers Detected ({metrics.fillerWordsCount})
              </h4>

              {metrics.fillerWordsList.length === 0 ? (
                <p className="text-xs text-emerald-600 dark:text-emerald-400">
                  Zero significant verbal filler words detected. Smooth fluency!
                </p>
              ) : (
                <div className="space-y-1.5">
                  {metrics.fillerWordsList.map((f, i) => (
                    <div key={i} className="flex items-center justify-between text-xs">
                      <span className="font-mono text-slate-700 dark:text-slate-300">
                        "{f.word}"
                      </span>
                      <span className="font-bold text-rose-600 dark:text-rose-400">
                        {f.count}x
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Strengths & Tips */}
            <div className="bg-white dark:bg-slate-900 rounded-xl p-5 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
                Performance Strengths
              </h4>
              <ul className="space-y-1.5 text-xs text-slate-600 dark:text-slate-300">
                {feedback.strengths.map((str, i) => (
                  <li key={i} className="flex items-start gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{str}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* Tab: Model Band 7+ Comparison */}
      {activeTab === 'comparison' && modelAnswer && (
        <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
          <div>
            <h3 className="text-base font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-amber-500" />
              <span>Side-by-Side Model Band 7.5+ Comparison</span>
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Compare your spoken response directly against an examiner model response for the same topic.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            {/* Student Transcript */}
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/80 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider text-2xs">
                  Your Spoken Transcript
                </span>
                <span className="font-mono text-slate-500 dark:text-slate-400">{metrics.totalWords} words • {metrics.wordsPerMinute} WPM</span>
              </div>
              <p className="font-serif text-slate-700 dark:text-slate-300 leading-relaxed italic">
                "{session.transcript}"
              </p>
            </div>

            {/* Model Response */}
            <div className="p-4 rounded-xl bg-emerald-50/50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-bold text-emerald-800 dark:text-emerald-300 uppercase tracking-wider text-2xs">
                  Model Band 7.5 - 8.0 Response
                </span>
                <span className="font-semibold text-emerald-700 dark:text-emerald-400">Natural IELTS Standard</span>
              </div>
              <p className="font-serif text-slate-800 dark:text-slate-100 leading-relaxed">
                "{modelAnswer.transcript}"
              </p>
            </div>
          </div>

          {/* Key Differences */}
          <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-700/80 bg-slate-50/50 dark:bg-slate-800/80 space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-800 dark:text-slate-200 block">
              Key Linguistic Distinctions:
            </span>
            <ul className="space-y-1.5 text-xs text-slate-700 dark:text-slate-300">
              {modelAnswer.keyDifferences.map((diff, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <ArrowRight className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                  <span>{diff}</span>
                </li>
              ))}
            </ul>
          </div>

          <p className="text-xs text-slate-500 dark:text-slate-400 italic">
            <strong>Examiner Breakdown: </strong>
            {modelAnswer.examinerBreakdown}
          </p>
        </div>
      )}

      {/* Tab: Follow-Up Question */}
      {activeTab === 'followup' && followUp && (
        <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
          <div>
            <h3 className="text-base font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-brand-600 dark:text-brand-400" />
              <span>Examiner Follow-Up Question</span>
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              In Part 1 and Part 3, examiners routinely ask contextual follow-up questions to probe your linguistic depth.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-brand-50/60 dark:bg-brand-950/30 border border-brand-200 dark:border-brand-800 space-y-3">
            <span className="text-2xs font-bold uppercase tracking-wider text-brand-700 dark:text-brand-300 block">
              The Examiner Asks:
            </span>
            <p className="text-base font-medium text-slate-900 dark:text-slate-100 font-serif leading-relaxed">
              "{followUp.question}"
            </p>
            <div className="text-xs text-slate-600 dark:text-slate-400 pt-2 border-t border-brand-200/60 dark:border-brand-900">
              <strong className="text-slate-800 dark:text-slate-200">Why this was asked: </strong>
              {followUp.rationale}
            </div>
          </div>

          {/* Interactive Answer Input */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block">
              Practice Your Answer (Type or record your response):
            </label>
            <textarea
              value={followupResponse}
              onChange={(e) => setFollowupResponse(e.target.value)}
              placeholder="Start speaking: 'Well, to be honest, looking at how things are developing...'"
              rows={3}
              className="w-full p-3 text-xs rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          {/* Reveal Sample Response */}
          {followUp.sampleAnswer && (
            <div className="pt-2">
              <button
                onClick={() => setShowSampleFollowup(!showSampleFollowup)}
                className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 flex items-center gap-1"
              >
                {showSampleFollowup ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                {showSampleFollowup ? 'Hide Sample Band 8 Response' : 'Reveal Sample Band 8 Response'}
              </button>

              {showSampleFollowup && (
                <div className="mt-3 p-4 rounded-xl bg-emerald-50/50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 text-xs space-y-1 animate-fadeIn">
                  <span className="font-bold text-emerald-800 dark:text-emerald-300 block text-2xs uppercase">
                    Sample Band 8+ Follow-Up Response:
                  </span>
                  <p className="font-serif italic text-slate-800 dark:text-slate-100 leading-relaxed">
                    "{followUp.sampleAnswer}"
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* Tab: Topic Lexicon */}
      {activeTab === 'vocab' && (
        <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
          <div>
            <h3 className="text-base font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-teal-600" />
              <span>Topic-Specific Collocations & Lexicon</span>
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Elevate your Lexical Resource score to Band 7.5+ by incorporating these idiomatic collocations relevant to "{session.topicTitle}".
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            {topicVocab.map((item, idx) => (
              <div
                key={idx}
                className="p-4 rounded-xl border border-slate-200 dark:border-slate-700/80 bg-slate-50 dark:bg-slate-800/80 space-y-2"
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-teal-700 dark:text-teal-400 font-mono text-sm">
                    {item.wordOrPhrase}
                  </span>
                  <span className="text-2xs font-semibold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 dark:bg-emerald-900/60 dark:text-emerald-300">
                    {item.bandLevel}
                  </span>
                </div>
                <p className="text-slate-600 dark:text-slate-400 text-2xs">{item.definition}</p>
                <div className="p-2 rounded bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-2xs italic text-slate-700 dark:text-slate-300">
                  <span className="font-semibold text-slate-900 dark:text-slate-100 not-italic">Example: </span>
                  "{item.collocationSnippet}"
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab: Upgraded Phrases */}
      {activeTab === 'upgrades' && (
        <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <h3 className="text-sm font-bold text-slate-800 dark:text-slate-100">
            Recommended Conversational Phrasal Upgrades
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
            {feedback.upgradedPhrases.map((u, i) => (
              <div
                key={i}
                className="p-4 rounded-xl border border-slate-200 dark:border-slate-700/80 bg-slate-50 dark:bg-slate-800/80 space-y-2"
              >
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-500 dark:text-slate-400 line-through">"{u.original}"</span>
                  <ArrowRight className="w-3.5 h-3.5 text-emerald-600" />
                  <span className="font-bold text-emerald-700 dark:text-emerald-400">
                    "{u.upgraded}"
                  </span>
                </div>
                <p className="text-slate-600 dark:text-slate-400 text-2xs pt-1 border-t border-slate-200 dark:border-slate-800">
                  {u.explanation}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab: Pronunciation Checklist */}
      {activeTab === 'pronunciation' && (
        <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
          <div className="p-4 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 text-xs text-amber-900 dark:text-amber-200">
            <span className="font-bold block mb-1">Official Pronunciation Assessment Note:</span>
            <p>{pronunciationGuide.disclaimer}</p>
          </div>

          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
              Interactive Pronunciation Self-Audit Checklist
            </h4>
            <div className="space-y-2">
              {pronunciationGuide.selfAssessmentChecklist.map((item, idx) => (
                <label
                  key={idx}
                  className="flex items-start gap-3 p-3 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-900 cursor-pointer text-xs"
                >
                  <input
                    type="checkbox"
                    checked={!!checklistState[idx]}
                    onChange={(e) =>
                      setChecklistState({ ...checklistState, [idx]: e.target.checked })
                    }
                    className="mt-0.5 rounded text-emerald-600 focus:ring-emerald-500"
                  />
                  <div>
                    <span className="font-bold text-slate-800 dark:text-slate-100 block">
                      {item.criterion}
                    </span>
                    <p className="text-slate-600 dark:text-slate-400 text-2xs mt-0.5">
                      {item.description}
                    </p>
                  </div>
                </label>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
