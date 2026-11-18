import React from 'react';
import { Link } from 'react-router-dom';
import {
  TrendingUp,
  Award,
  Clock,
  Sparkles,
  ArrowRight,
  BookOpen,
  Calendar,
  CheckCircle2,
  FileText,
  AlertCircle,
  HelpCircle,
  Lightbulb,
} from 'lucide-react';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { Breadcrumbs } from '../ui/Breadcrumbs';
import { formatBand } from '../../lib/utils';
import { useAppStore } from '../../store/useAppStore';

export interface ModuleStrategyTip {
  title: string;
  category: string;
  duration: string;
  summary: string;
  lessonUrl?: string;
}

export interface ModuleHistoryAttempt {
  id: string | number;
  title: string;
  date: string;
  scoreText: string;
  band: number;
  durationText: string;
  reviewUrl: string;
}

export interface ModuleLandingStructureProps {
  moduleKey: 'reading' | 'listening' | 'writing' | 'speaking';
  title: string;
  description: string;
  icon: React.ReactNode;
  badgeText: string;
  accentColor: string; // e.g. '#124F40' or '#5BB78D'

  // Section A: Overview Stats
  currentBand: number | null;
  totalAttemptsCount: number;
  totalMinutesSpent: number;
  trendText?: string;
  trendPositive?: boolean;

  // Section B: Start a Test
  startTestSection: React.ReactNode;

  // Section C: Recommended for You
  recommendedItem: {
    title: string;
    tag: string;
    description: string;
    timeMinutes: number;
    actionUrl: string;
    actionLabel?: string;
  };

  // Section D: History
  recentAttempts: ModuleHistoryAttempt[];

  // Section E: Tips & Strategies
  strategyTips: ModuleStrategyTip[];
}

export function ModuleLandingStructure({
  moduleKey,
  title,
  description,
  icon,
  badgeText,
  accentColor,
  currentBand,
  totalAttemptsCount,
  totalMinutesSpent,
  trendText,
  trendPositive = true,
  startTestSection,
  recommendedItem,
  recentAttempts,
  strategyTips,
}: ModuleLandingStructureProps) {
  const { profile } = useAppStore();
  const targetBand = profile?.targetBand || 7.5;

  const currentDisplayBand = currentBand !== null ? formatBand(currentBand) : null;
  const progressPercent = currentBand !== null
    ? Math.min(100, Math.round((currentBand / targetBand) * 100))
    : 0;

  return (
    <div className="max-w-6xl mx-auto space-y-8 pb-12">
      {/* Breadcrumbs (Requirement 5) */}
      <Breadcrumbs
        items={[
          { label: 'Practice', href: '/practice' },
          { label: title },
        ]}
      />

      {/* Page Header (Consistent Zarii Header Pattern) */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-200/80 dark:border-[#24392F] pb-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Badge variant="teal" dot>{badgeText}</Badge>
            <span className="text-2xs text-slate-500 uppercase tracking-wider font-bold">
              Official IELTS Standard
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white flex items-center gap-2.5">
            {icon}
            <span>{title}</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-3xl leading-relaxed">
            {description}
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <Link to="/practice">
            <Button variant="outline" size="sm">
              All Skills
            </Button>
          </Link>
          <Link to="/practice/smart">
            <Button variant="primary" size="sm" className="gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#5BB78D]" />
              <span>Adaptive Drill</span>
            </Button>
          </Link>
        </div>
      </div>

      {/* ================================================================== */}
      {/* SECTION A: OVERVIEW WITH BAND AND TREND */}
      {/* ================================================================== */}
      <Card className="p-6 border-slate-200/80 dark:border-[#24392F] bg-gradient-to-br from-white via-[#F7FAF8] to-slate-50 dark:from-[#112019] dark:via-[#112019] dark:to-[#0B1612]">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
          {/* Current Band & Status */}
          <div className="space-y-2 border-b md:border-b-0 md:border-r border-slate-200/80 dark:border-[#24392F] pb-4 md:pb-0 md:pr-6">
            <div className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Your Current Standing
            </div>
            <div className="flex items-baseline gap-3">
              <div className="text-3xl sm:text-4xl font-extrabold font-mono text-[#124F40] dark:text-[#5BB78D]">
                {currentDisplayBand ? `Band ${currentDisplayBand}` : 'Not Tested'}
              </div>
              {trendText && (
                <span
                  className={`inline-flex items-center gap-1 text-xs font-bold px-2 py-0.5 rounded-full ${
                    trendPositive
                      ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                      : 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300'
                  }`}
                >
                  <TrendingUp className="w-3 h-3" />
                  {trendText}
                </span>
              )}
            </div>
            <p className="text-2xs text-slate-500 dark:text-slate-400">
              {currentDisplayBand
                ? `Calibrated from your last ${totalAttemptsCount} practice attempts.`
                : 'Take your first test below to calculate your estimated band.'}
            </p>
          </div>

          {/* Target Band Comparison & Progress Bar */}
          <div className="space-y-2 border-b md:border-b-0 md:border-r border-slate-200/80 dark:border-[#24392F] pb-4 md:pb-0 md:pr-6">
            <div className="flex items-center justify-between text-xs font-bold">
              <span className="text-slate-400 uppercase tracking-wider">Target Goal</span>
              <span className="text-slate-900 dark:text-white font-mono">Band {targetBand.toFixed(1)}</span>
            </div>
            <div className="w-full bg-slate-200 dark:bg-slate-800 h-2.5 rounded-full overflow-hidden">
              <div
                className="h-full bg-[#124F40] dark:bg-[#5BB78D] rounded-full transition-all duration-500"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
            <div className="flex items-center justify-between text-[11px] text-slate-500">
              <span>{progressPercent}% of target band</span>
              <span>{currentDisplayBand ? `${formatBand(Math.max(0, targetBand - (currentBand || 0)))} bands away` : 'Benchmark pending'}</span>
            </div>
          </div>

          {/* Quick Metrics */}
          <div className="grid grid-cols-2 gap-3 text-center sm:text-left">
            <div className="p-3 rounded-xl bg-white dark:bg-[#162920] border border-slate-200/80 dark:border-[#24392F]">
              <div className="text-[10px] uppercase font-bold text-slate-400">Total Attempts</div>
              <div className="text-xl font-mono font-extrabold text-slate-900 dark:text-white mt-0.5">
                {totalAttemptsCount}
              </div>
            </div>
            <div className="p-3 rounded-xl bg-white dark:bg-[#162920] border border-slate-200/80 dark:border-[#24392F]">
              <div className="text-[10px] uppercase font-bold text-slate-400">Practice Time</div>
              <div className="text-xl font-mono font-extrabold text-slate-900 dark:text-white mt-0.5">
                {totalMinutesSpent}m
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* ================================================================== */}
      {/* SECTION B: START A TEST (FULL / SECTION / BY QUESTION TYPE) */}
      {/* ================================================================== */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">
              Start a Practice Test
            </h2>
            <p className="text-xs text-slate-500">
              Choose between full exam simulation, sectional focus, or targeted question drills.
            </p>
          </div>
        </div>

        {startTestSection}
      </div>

      {/* ================================================================== */}
      {/* SECTION C: RECOMMENDED FOR YOU */}
      {/* ================================================================== */}
      <Card className="p-6 border-[#124F40]/30 bg-gradient-to-br from-[#124F40]/10 via-white to-slate-50 dark:from-[#124F40]/30 dark:via-[#112019] dark:to-[#0B1612] rounded-2xl relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-5">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-lg bg-[#124F40]/10 text-[#124F40] dark:text-[#5BB78D] flex items-center justify-center">
                <Sparkles className="w-3.5 h-3.5" />
              </span>
              <Badge variant="teal" size="sm">{recommendedItem.tag}</Badge>
              <span className="text-xs text-slate-500 flex items-center gap-1">
                <Clock className="w-3 h-3" />
                {recommendedItem.timeMinutes} Mins
              </span>
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              {recommendedItem.title}
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-300 max-w-2xl leading-relaxed">
              {recommendedItem.description}
            </p>
          </div>

          <Link to={recommendedItem.actionUrl} className="shrink-0">
            <Button variant="primary" size="md" className="gap-2">
              <span>{recommendedItem.actionLabel || 'Start Recommended Test'}</span>
              <ArrowRight className="w-4 h-4 text-[#5BB78D]" />
            </Button>
          </Link>
        </div>
      </Card>

      {/* ================================================================== */}
      {/* SECTION D: HISTORY */}
      {/* ================================================================== */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white">
            Recent Practice History
          </h2>
          <span className="text-xs text-slate-500 font-mono">
            {recentAttempts.length} Completed
          </span>
        </div>

        {recentAttempts.length > 0 ? (
          <div className="border border-slate-200/80 dark:border-[#24392F] rounded-2xl overflow-hidden bg-white dark:bg-[#112019] divide-y divide-slate-100 dark:divide-[#24392F]">
            {recentAttempts.map((att) => (
              <div
                key={att.id}
                className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-slate-50 dark:hover:bg-slate-900/60 transition-colors"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-slate-900 dark:text-white">
                      {att.title}
                    </span>
                    <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 font-bold">
                      Band {formatBand(att.band)}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 text-2xs text-slate-500 font-medium">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {att.date}
                    </span>
                    <span>&bull;</span>
                    <span>Score: {att.scoreText}</span>
                    <span>&bull;</span>
                    <span>Time: {att.durationText}</span>
                  </div>
                </div>

                <Link to={att.reviewUrl} className="shrink-0">
                  <Button variant="outline" size="sm" className="text-xs">
                    Review Results
                  </Button>
                </Link>
              </div>
            ))}
          </div>
        ) : (
          <Card className="p-8 text-center space-y-2 border-dashed">
            <Clock className="w-8 h-8 text-slate-300 dark:text-slate-600 mx-auto" />
            <h4 className="text-xs font-bold text-slate-700 dark:text-slate-300">
              No completed tests yet in this module
            </h4>
            <p className="text-2xs text-slate-500 max-w-sm mx-auto">
              Complete your first practice test or timed session above. Your answers, band score, and mistake breakdown will appear here.
            </p>
          </Card>
        )}
      </div>

      {/* ================================================================== */}
      {/* SECTION E: TIPS AND STRATEGY LESSONS */}
      {/* ================================================================== */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Lightbulb className="w-4 h-4 text-amber-500" />
            <span>Examiner Strategies &amp; Tactical Lessons</span>
          </h2>
          <Link to="/lessons" className="text-xs font-bold text-[#124F40] dark:text-[#5BB78D] hover:underline">
            View All Strategies &rarr;
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {strategyTips.map((tip, idx) => (
            <Card
              key={idx}
              className="p-4 border-slate-200/80 dark:border-[#24392F] hover:shadow-xs transition-shadow flex flex-col justify-between space-y-3"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    {tip.category}
                  </span>
                  <span className="text-[10px] text-slate-500 font-mono">
                    {tip.duration}
                  </span>
                </div>
                <h4 className="text-xs font-bold text-slate-900 dark:text-white leading-snug">
                  {tip.title}
                </h4>
                <p className="text-2xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  {tip.summary}
                </p>
              </div>

              {tip.lessonUrl ? (
                <Link to={tip.lessonUrl}>
                  <Button variant="ghost" size="sm" className="w-full text-xs text-[#124F40] dark:text-[#5BB78D] p-0 justify-start">
                    Read strategy lesson &rarr;
                  </Button>
                </Link>
              ) : (
                <Link to="/lessons">
                  <span className="text-2xs font-semibold text-[#124F40] dark:text-[#5BB78D] hover:underline">
                    Explore tactic &rarr;
                  </span>
                </Link>
              )}
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
