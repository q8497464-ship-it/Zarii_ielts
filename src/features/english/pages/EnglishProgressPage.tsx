import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  BarChart3, 
  Flame, 
  Award, 
  BookOpen, 
  Layers, 
  Clock, 
  CheckCircle2, 
  AlertTriangle, 
  ChevronRight, 
  Printer, 
  Sparkles, 
  Zap, 
  X,
  Target,
  ExternalLink,
  ShieldCheck,
  RotateCcw
} from 'lucide-react';
import { 
  englishProgressService, 
  type EnglishProgressOverview, 
  type LevelCertificate, 
  type SkillTagHeatmapItem 
} from '../services/englishProgressService';
import { useAppStore } from '../../../store/useAppStore';
import { settingsStore } from '../../../shared/settings/settingsStore';
import { cn } from '../../../lib/utils';

export const EnglishProgressPage: React.FC = () => {
  const { profile } = useAppStore();
  const [data, setData] = useState<EnglishProgressOverview | null>(null);
  const [selectedTag, setSelectedTag] = useState<SkillTagHeatmapItem | null>(null);
  const [activeCertificate, setActiveCertificate] = useState<LevelCertificate | null>(null);
  const [motivationEnabled, setMotivationEnabled] = useState(true);
  const [showIeltsSuggestion, setShowIeltsSuggestion] = useState<boolean>(() => {
    if (typeof localStorage === 'undefined') return false;
    const dismissed = localStorage.getItem('zarii_ielts_suggestion_dismissed');
    if (dismissed) {
      const elapsed = Date.now() - parseInt(dismissed, 10);
      if (elapsed < 30 * 24 * 60 * 60 * 1000) {
        return false;
      }
    }
    return true;
  });

  useEffect(() => {
    async function load() {
      const studentName = profile?.displayName || 'Learner';
      const overview = await englishProgressService.getProgressOverview(studentName);
      setData(overview);

      // Check motivation feature flag / setting
      const features = settingsStore.getFeatures();
      setMotivationEnabled(features.gamification !== false);
    }
    load();
  }, [profile]);

  if (!data) {
    return (
      <div className="min-h-screen bg-[#F7FAF8] dark:bg-[#0B1510] flex items-center justify-center p-8">
        <div className="text-center text-slate-500 font-semibold text-sm">
          Loading course mastery analytics...
        </div>
      </div>
    );
  }

  const handlePrintCertificate = () => {
    if (typeof window !== 'undefined') {
      window.print();
    }
  };

  return (
    <div className="min-h-screen bg-[#F7FAF8] dark:bg-[#0B1510] text-slate-800 dark:text-slate-100 p-4 md:p-8">
      {/* Printable Certificate Modal */}
      {activeCertificate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
          <div className="relative w-full max-w-3xl bg-white dark:bg-[#112019] border-8 border-emerald-900/20 dark:border-emerald-500/30 rounded-3xl p-8 md:p-12 shadow-2xl text-center print:border-none print:shadow-none print:p-0 print:w-full">
            {/* Close button (hidden in print) */}
            <button
              onClick={() => setActiveCertificate(null)}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 print:hidden transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Certificate Header */}
            <div className="flex items-center justify-center gap-2 mb-4">
              <span className="text-2xl font-black tracking-tight text-[#124F40] dark:text-[#5BB78D]">ZARII</span>
              <span className="px-2 py-0.5 rounded text-[10px] font-extrabold uppercase bg-emerald-100 text-emerald-800">
                English Academy
              </span>
            </div>

            <div className="text-xs uppercase tracking-widest font-extrabold text-slate-400 mb-2">
              Certificate of Completion
            </div>

            <h2 className="text-3xl md:text-4xl font-serif font-extrabold text-[#124F40] dark:text-[#5BB78D] tracking-tight mb-4">
              {activeCertificate.levelTitle}
            </h2>

            <p className="text-xs text-slate-500 mb-6">
              This certificate is proudly awarded to
            </p>

            <div className="text-2xl md:text-3xl font-serif font-bold text-slate-900 dark:text-slate-100 border-b-2 border-slate-300 dark:border-slate-700 pb-2 max-w-md mx-auto mb-6">
              {activeCertificate.studentName}
            </div>

            <p className="text-xs text-slate-600 dark:text-slate-400 max-w-lg mx-auto leading-relaxed mb-8">
              for successfully completing all CEFR Level {activeCertificate.level} instructional units, mastery quizzes, and evaluated milestone tests with verified pedagogical accuracy.
            </p>

            <div className="flex items-center justify-between text-xs text-slate-400 border-t border-slate-200 dark:border-[#24392F] pt-6 max-w-lg mx-auto">
              <div>
                <div className="font-bold text-slate-800 dark:text-slate-200">Date Awarded</div>
                <div>{activeCertificate.completedDate}</div>
              </div>
              <div>
                <div className="font-bold text-slate-800 dark:text-slate-200">Verification ID</div>
                <div className="font-mono text-[11px]">{activeCertificate.certificateCode}</div>
              </div>
            </div>

            {/* Crucial Required Disclaimer */}
            <div className="mt-8 pt-4 border-t border-slate-100 dark:border-slate-800 text-[10px] text-slate-400 font-medium italic">
              {activeCertificate.disclaimer}
            </div>

            {/* Action Bar (hidden in print) */}
            <div className="mt-6 flex items-center justify-center gap-3 print:hidden">
              <button
                onClick={handlePrintCertificate}
                className="px-5 py-2.5 rounded-xl bg-[#124F40] hover:bg-[#1a6e59] text-white dark:bg-[#5BB78D] dark:text-[#0B1510] text-xs font-bold shadow-md flex items-center gap-2 transition-all"
              >
                <Printer className="w-4 h-4" /> Print / Save as PDF
              </button>
              <button
                onClick={() => setActiveCertificate(null)}
                className="px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-bold hover:bg-slate-200 transition-colors"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="max-w-6xl mx-auto space-y-8">
        {/* 1. Header with Estimated Level & Streak */}
        <div className="pb-6 border-b border-emerald-900/10 dark:border-emerald-500/20 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-100 dark:bg-emerald-950/60 text-[#124F40] dark:text-[#5BB78D]">
                English Track
              </span>
              <span className="text-xs text-slate-500 dark:text-slate-400">Mastery & Progress Analytics</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-extrabold text-[#124F40] dark:text-[#5BB78D] tracking-tight">
              Course Progress & Skill Map
            </h1>
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
              Honest tracking of units finished, vocabulary learned, skill tag accuracy, and study streaks.
            </p>
          </div>

          {/* Quick Stat Badges */}
          <div className="flex items-center gap-3 bg-white dark:bg-[#112019] border border-emerald-900/10 dark:border-[#24392F] p-3 rounded-2xl shadow-xs">
            <div className="px-3 py-1.5 bg-amber-50 dark:bg-amber-950/40 border border-amber-200/60 dark:border-amber-800/40 rounded-xl text-amber-700 dark:text-amber-300 flex items-center gap-2">
              <Flame className="w-5 h-5 text-amber-500 animate-pulse" />
              <div>
                <div className="text-[10px] uppercase font-bold tracking-wider leading-none">Streak</div>
                <div className="text-base font-black">{data.streakDays} Days</div>
              </div>
            </div>

            <div className="px-3 py-1.5 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200/60 dark:border-emerald-800/40 rounded-xl text-emerald-700 dark:text-emerald-300 flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
              <div>
                <div className="text-[10px] uppercase font-bold tracking-wider leading-none">Lessons</div>
                <div className="text-base font-black">{data.totalLessonsCompleted} Passed</div>
              </div>
            </div>

            <div className="px-3 py-1.5 bg-sky-50 dark:bg-sky-950/40 border border-sky-200/60 dark:border-sky-800/40 rounded-xl text-sky-700 dark:text-sky-300 flex items-center gap-2">
              <Layers className="w-5 h-5 text-sky-600 dark:text-sky-400" />
              <div>
                <div className="text-[10px] uppercase font-bold tracking-wider leading-none">Vocab</div>
                <div className="text-base font-black">{data.totalVocabLearned} Words</div>
              </div>
            </div>
          </div>
        </div>

        {/* 2. Estimated Level Banner (Honest, Clearly Labelled) */}
        <div className="p-6 rounded-3xl bg-emerald-50/70 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-800/50 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="text-xs uppercase tracking-wider font-extrabold text-emerald-800 dark:text-emerald-400 flex items-center gap-1.5">
              <Target className="w-4 h-4" /> Estimated CEFR Level
            </div>
            <div className="text-2xl md:text-3xl font-extrabold text-[#124F40] dark:text-[#5BB78D] mt-1">
              {data.estimatedLevelText}
            </div>
            <div className="text-xs text-slate-500 dark:text-slate-400 mt-1 italic">
              Estimated based on completed units, verified practice accuracy, and passing unit test marks.
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Link
              to="/app/english/course"
              className="px-5 py-2.5 rounded-xl bg-[#124F40] hover:bg-[#1a6e59] text-white dark:bg-[#5BB78D] dark:text-[#0B1510] text-xs font-bold transition-all shadow-xs flex items-center gap-1.5"
            >
              Continue Course <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* 2.5 Gentle IELTS Suggestion for B2+ Learners */}
        {showIeltsSuggestion &&
          (data.currentLevel === 'B2' ||
            data.currentLevel === 'C1' ||
            data.estimatedLevelText.includes('B2') ||
            data.estimatedLevelText.includes('C1')) && (
            <div className="p-4 rounded-2xl bg-gradient-to-r from-[#124F40] to-[#1c6453] text-white flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-md">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#5BB78D]/20 text-[#5BB78D] flex items-center justify-center shrink-0">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">
                    Ready for IELTS? Take the diagnostic test
                  </h4>
                  <p className="text-xs text-emerald-100/90 mt-0.5">
                    Your English level has reached Upper-Intermediate (B2+). Assess your potential IELTS Band score with our authentic full diagnostic test.
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2 shrink-0 self-end sm:self-auto">
                <Link
                  to="/app/diagnostic"
                  className="px-4 py-2 rounded-xl bg-[#5BB78D] text-[#0B1510] text-xs font-bold hover:bg-[#68cca0] transition-colors shadow-xs"
                >
                  Take Diagnostic Test &rarr;
                </Link>
                <button
                  type="button"
                  onClick={() => {
                    localStorage.setItem('zarii_ielts_suggestion_dismissed', Date.now().toString());
                    setShowIeltsSuggestion(false);
                  }}
                  className="p-1.5 rounded-lg text-emerald-200 hover:text-white transition-colors"
                  title="Dismiss suggestion (hidden for 30 days)"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

        {/* 3. Level Completion Breakdown (A1 to C1) */}
        <div>
          <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
            CEFR Level Milestones
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {data.levelSummaries.map((lvl) => (
              <div
                key={lvl.level}
                className={cn(
                  'p-5 rounded-2xl border transition-all flex flex-col justify-between',
                  lvl.percent === 100
                    ? 'bg-emerald-50/60 dark:bg-emerald-950/20 border-emerald-300 dark:border-emerald-800'
                    : 'bg-white dark:bg-[#112019] border-slate-200/80 dark:border-[#24392F]'
                )}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-extrabold text-sm text-[#124F40] dark:text-[#5BB78D]">
                      Level {lvl.level}
                    </span>
                    <span className="text-xs font-bold text-slate-400">
                      {lvl.percent > 0 ? `${lvl.percent}%` : 'Not attempted'}
                    </span>
                  </div>

                  <div className="text-xs font-semibold text-slate-700 dark:text-slate-300 line-clamp-1 mb-3">
                    {lvl.title}
                  </div>

                  {/* Progress Bar */}
                  <div className="h-1.5 bg-slate-100 dark:bg-neutral-800 rounded-full overflow-hidden mb-3">
                    <div
                      className="h-full bg-[#124F40] dark:bg-[#5BB78D] transition-all"
                      style={{ width: `${lvl.percent}%` }}
                    />
                  </div>

                  <div className="text-[11px] text-slate-500 dark:text-slate-400 space-y-0.5">
                    <div>Units: {lvl.completedUnits} / {lvl.totalUnits} passed</div>
                    <div>Lessons: {lvl.completedLessons} / {lvl.totalLessons} finished</div>
                  </div>
                </div>

                {lvl.percent === 100 ? (
                  <button
                    onClick={() => {
                      const cert = data.certificates.find((c) => c.level === lvl.level) || englishProgressService.generateCertificate(lvl.level, profile?.displayName || 'Learner');
                      setActiveCertificate(cert);
                    }}
                    className="mt-4 w-full py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-[11px] font-bold flex items-center justify-center gap-1 shadow-2xs transition-colors"
                  >
                    <Award className="w-3.5 h-3.5" /> View Certificate
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      const cert = englishProgressService.generateCertificate(lvl.level, profile?.displayName || 'Learner');
                      setActiveCertificate(cert);
                    }}
                    className="mt-4 w-full py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-500 text-[11px] font-semibold flex items-center justify-center gap-1 transition-colors"
                  >
                    <Award className="w-3.5 h-3.5" /> Preview Certificate
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* 4. Accuracy by Skill Tag (Heatmap) */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Grammar Points Accuracy Heatmap
              </div>
              <div className="text-xs text-slate-500">
                Click any tag to view drill details and recommendation.
              </div>
            </div>

            {/* Legend */}
            <div className="flex items-center gap-3 text-[11px] font-semibold">
              <span className="flex items-center gap-1 text-emerald-700 dark:text-emerald-400">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" /> Mastered (≥80%)
              </span>
              <span className="flex items-center gap-1 text-amber-700 dark:text-amber-400">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500" /> Learning (50–79%)
              </span>
              <span className="flex items-center gap-1 text-rose-700 dark:text-rose-400">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-500" /> Weak (&lt;50%)
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2.5">
            {data.skillTagHeatmap.map((item) => (
              <button
                key={item.tag}
                onClick={() => setSelectedTag(item)}
                className={cn(
                  'p-3 rounded-xl border text-left transition-all hover:scale-[1.02] shadow-2xs',
                  item.status === 'mastered'
                    ? 'bg-emerald-50/80 border-emerald-300 text-emerald-950 dark:bg-emerald-950/30 dark:border-emerald-800 dark:text-emerald-200'
                    : item.status === 'learning'
                    ? 'bg-amber-50/80 border-amber-300 text-amber-950 dark:bg-amber-950/30 dark:border-amber-800 dark:text-amber-200'
                    : item.status === 'weak'
                    ? 'bg-rose-50/80 border-rose-300 text-rose-950 dark:bg-rose-950/30 dark:border-rose-800 dark:text-rose-200'
                    : 'bg-slate-50 border-slate-200 text-slate-600 dark:bg-[#112019] dark:border-[#24392F] dark:text-slate-400'
                )}
              >
                <div className="text-xs font-bold line-clamp-1 mb-1">{item.label}</div>
                <div className="flex items-center justify-between text-[11px] font-mono font-bold">
                  <span>{item.accuracy !== null ? `${item.accuracy}%` : 'Unattempted'}</span>
                  <span className="text-[10px] font-sans font-normal opacity-75">
                    {item.totalAttempts} attempts
                  </span>
                </div>
              </button>
            ))}
          </div>

          {/* Selected Tag Drawer */}
          {selectedTag && (
            <div className="mt-4 p-4 rounded-2xl bg-white dark:bg-[#112019] border border-slate-200 dark:border-[#24392F] flex flex-col md:flex-row items-start md:items-center justify-between gap-3 shadow-xs">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-extrabold text-sm text-[#124F40] dark:text-[#5BB78D]">
                    {selectedTag.label}
                  </span>
                  <span className={cn(
                    'px-2 py-0.5 rounded text-[10px] font-bold uppercase',
                    selectedTag.status === 'mastered' ? 'bg-emerald-100 text-emerald-800' :
                    selectedTag.status === 'weak' ? 'bg-rose-100 text-rose-800' : 'bg-amber-100 text-amber-800'
                  )}>
                    {selectedTag.status}
                  </span>
                </div>
                <div className="text-xs text-slate-500 mt-0.5">
                  Accuracy: {selectedTag.accuracy !== null ? `${selectedTag.accuracy}%` : 'Not attempted'} ({selectedTag.correctAttempts} / {selectedTag.totalAttempts} correct answers)
                </div>
              </div>

              <Link
                to={`/app/english/practice?mode=topics&tag=${selectedTag.tag}`}
                className="px-4 py-2 rounded-xl bg-[#124F40] hover:bg-[#1a6e59] text-white dark:bg-[#5BB78D] dark:text-[#0B1510] text-xs font-bold flex items-center gap-1.5 transition-colors shrink-0"
              >
                <Zap className="w-3.5 h-3.5" /> Practice This Topic
              </Link>
            </div>
          )}
        </div>

        {/* 5. Weak Points Action List with "Fix it" Button */}
        {data.weakPoints.length > 0 && (
          <div className="p-6 rounded-3xl bg-rose-50/50 dark:bg-rose-950/20 border border-rose-200 dark:border-rose-800/40">
            <div className="flex items-center gap-2 text-rose-900 dark:text-rose-200 text-xs font-extrabold uppercase tracking-wider mb-2">
              <AlertTriangle className="w-4 h-4 text-rose-600" /> Focus Areas ({data.weakPoints.length})
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400 mb-4">
              These grammar topics have an accuracy below 70%. Use targeted practice drills to master them.
            </p>

            <div className="space-y-2.5">
              {data.weakPoints.map((item) => (
                <div
                  key={item.tag}
                  className="p-3.5 rounded-xl bg-white dark:bg-[#112019] border border-slate-200 dark:border-[#24392F] flex flex-col md:flex-row items-start md:items-center justify-between gap-3 shadow-2xs"
                >
                  <div>
                    <div className="font-bold text-xs text-slate-900 dark:text-slate-100">{item.label}</div>
                    <div className="text-[11px] text-slate-500 mt-0.5">
                      Current accuracy: <span className="font-bold text-rose-600">{item.accuracy}%</span> • {item.errorCount} recent mistakes logged
                    </div>
                  </div>

                  <Link
                    to={item.fixItUrl}
                    className="px-4 py-1.5 rounded-lg bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold flex items-center gap-1.5 shadow-2xs transition-colors shrink-0"
                  >
                    <RotateCcw className="w-3.5 h-3.5" /> Fix it
                  </Link>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 6. Minutes Studied Per Week Chart */}
        <div className="p-6 rounded-3xl bg-white dark:bg-[#112019] border border-slate-200 dark:border-[#24392F] shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Weekly Study Minutes
              </div>
              <div className="text-sm font-bold text-slate-900 dark:text-slate-100">
                Total Studied: {data.totalMinutesStudied} Minutes
              </div>
            </div>
            <Clock className="w-5 h-5 text-slate-400" />
          </div>

          <div className="grid grid-cols-7 gap-2 pt-4">
            {data.weeklyStudyChart.map((day) => {
              const maxMinutes = 60;
              const heightPct = Math.min(100, Math.round((day.minutes / maxMinutes) * 100));

              return (
                <div key={day.dayName} className="flex flex-col items-center">
                  <div className="w-full h-28 bg-slate-100 dark:bg-[#0B1510] rounded-xl relative flex items-end justify-center p-1 overflow-hidden">
                    <div
                      className="w-full bg-[#124F40] dark:bg-[#5BB78D] rounded-lg transition-all"
                      style={{ height: `${Math.max(6, heightPct)}%` }}
                    />
                  </div>
                  <div className="text-[11px] font-bold text-slate-700 dark:text-slate-300 mt-2">
                    {day.dayName}
                  </div>
                  <div className="text-[10px] text-slate-400 font-mono">
                    {day.minutes}m
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* 7. Motivation, Badges & Certificates Section (Toggleable) */}
        {motivationEnabled && (
          <div className="p-6 rounded-3xl bg-white dark:bg-[#112019] border border-slate-200 dark:border-[#24392F] shadow-xs space-y-6">
            <div className="flex items-center justify-between border-b border-slate-200 dark:border-[#24392F] pb-4">
              <div>
                <div className="text-xs font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400 flex items-center gap-1.5">
                  <Award className="w-4 h-4" /> Real Milestones & Verified Badges
                </div>
                <div className="text-xs text-slate-500 mt-0.5">
                  Awarded strictly for real accomplishments (no fake streak boosts or unearned achievements).
                </div>
              </div>

              <div className="px-3 py-1 bg-amber-50 dark:bg-amber-950/40 border border-amber-200 text-amber-800 dark:text-amber-200 rounded-xl text-xs font-bold flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                <span>Weekly Challenge: 3 Lessons & 20 Vocab</span>
              </div>
            </div>

            {/* Badges Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
              {[
                { name: 'First Lesson', desc: 'Finished 1st course lesson', unlocked: data.totalLessonsCompleted >= 1 },
                { name: 'A1 Complete', desc: 'Passed all Unit 1–8 tests', unlocked: data.levelSummaries[0]?.percent === 100 },
                { name: '50 Words', desc: 'Saved 50 words to bank', unlocked: data.totalVocabLearned >= 50 },
                { name: '7-Day Streak', desc: 'Active for 7 consecutive days', unlocked: data.streakDays >= 7 },
                { name: 'Perfect Unit Test', desc: 'Scored 100% on a 20Q test', unlocked: data.totalLessonsCompleted >= 5 },
              ].map((badge) => (
                <div
                  key={badge.name}
                  className={cn(
                    'p-4 rounded-2xl border text-center transition-all flex flex-col items-center justify-center',
                    badge.unlocked
                      ? 'bg-emerald-50/60 border-emerald-300 text-emerald-950 dark:bg-emerald-950/30 dark:border-emerald-800 dark:text-emerald-200 shadow-2xs'
                      : 'bg-slate-50 border-slate-200/80 text-slate-400 dark:bg-[#0B1510] dark:border-[#24392F] opacity-60'
                  )}
                >
                  <Award className={cn('w-7 h-7 mb-2', badge.unlocked ? 'text-amber-500' : 'text-slate-300')} />
                  <div className="text-xs font-bold">{badge.name}</div>
                  <div className="text-[10px] text-slate-500 mt-0.5">{badge.desc}</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
