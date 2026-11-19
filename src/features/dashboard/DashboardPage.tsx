import React, { useState, useEffect, useMemo } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import {
  TrendingUp,
  Award,
  Clock,
  Calendar,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  Flame,
  Bell,
  BellOff,
  Sparkles,
  BookOpen,
  Headphones,
  PenTool,
  Mic,
  BarChart3,
  Layers,
  ChevronRight,
  Share2,
  Target,
  Radar as RadarIcon,
  HelpCircle,
  RotateCcw,
} from 'lucide-react';
import { MistakeNotebookPage } from '../adaptive/MistakeNotebookPage';
import { WeeklyReviewPage } from '../adaptive/WeeklyReviewPage';
import { BadgeGalleryPage } from '../habits/BadgeGalleryPage';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  ReferenceLine,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
} from 'recharts';
import { db } from '../../lib/db';
import { useAppStore } from '../../store/useAppStore';
import { formatBand, formatSecondsToTime } from '../../lib/utils';
import { computeSmartRecommendations } from './recommendations';
import {
  isNotificationSupported,
  getNotificationPermission,
  requestNotificationPermission,
  sendTestNotification,
} from '../../lib/notifications';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { Card } from '../../components/ui/Card';
import { Skeleton } from '../../components/ui/Skeleton';
import { EmptyState } from '../../components/ui/EmptyState';
import { ShareableProgressCard } from '../../components/results/ShareableProgressCard';
import { ZariiLogo } from '../../components/ui/ZariiLogo';
import { copy } from '../../lib/copy';
import type {
  TestAttempt,
  QuestionResponse,
  WritingSubmission,
  SpeakingSession,
  SmartRecommendation,
} from '../../types';

// Custom Unified Tooltip for Recharts with green-tinted surface
const CustomChartTooltip = ({ active, payload, label, unit = '' }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="p-3 rounded-xl bg-[#112019]/95 text-[#E8F2EC] border border-[#24392F] shadow-2xl text-xs space-y-1 backdrop-blur-sm">
        <div className="font-bold text-[#9DB3A7] border-b border-[#24392F] pb-1 mb-1 font-mono">
          {label}
        </div>
        {payload.map((entry: any, index: number) => (
          <div key={index} className="flex items-center justify-between gap-4 font-mono">
            <span className="flex items-center gap-1.5" style={{ color: entry.color }}>
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: entry.color }} />
              <span className="capitalize">{entry.name}:</span>
            </span>
            <span className="font-bold text-white">
              {entry.value}
              {unit}
            </span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

export const DashboardPage: React.FC = () => {
  const { profile, addToast } = useAppStore();
  const [searchParams, setSearchParams] = useSearchParams();
  const activeTab = searchParams.get('tab') || 'overview';

  const [attempts, setAttempts] = useState<TestAttempt[]>([]);
  const [responses, setResponses] = useState<QuestionResponse[]>([]);
  const [writingSubs, setWritingSubs] = useState<WritingSubmission[]>([]);
  const [speakingSessions, setSpeakingSessions] = useState<SpeakingSession[]>([]);
  const [recommendations, setRecommendations] = useState<SmartRecommendation[]>([]);
  const [notificationsActive, setNotificationsActive] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);

  // Load all user records from Dexie
  useEffect(() => {
    async function loadData() {
      try {
        const [atts, resps, writings, speakings, recs] = await Promise.all([
          db.attempts.toArray(),
          db.responses.toArray(),
          db.writingSubmissions.toArray(),
          db.speakingSessions.toArray(),
          computeSmartRecommendations(),
        ]);

        atts.sort((a, b) => new Date(b.completedAt).getTime() - new Date(a.completedAt).getTime());
        setAttempts(atts);
        setResponses(resps);
        setWritingSubs(writings);
        setSpeakingSessions(speakings);
        setRecommendations(recs);

        const perm = getNotificationPermission();
        setNotificationsActive(perm === 'granted');
      } catch (err) {
        console.error('Failed to load dashboard data:', err);
      } finally {
        setIsLoading(false);
      }
    }
    loadData();
  }, []);

  const handleToggleNotifications = async () => {
    if (!isNotificationSupported()) {
      addToast({
        type: 'warning',
        title: 'Not Supported',
        message: 'Browser notifications are not supported in this browser.',
      });
      return;
    }

    if (notificationsActive) {
      setNotificationsActive(false);
      addToast({
        type: 'info',
        title: 'Notifications Disabled',
        message: 'Daily study goal reminders have been muted.',
      });
    } else {
      const granted = await requestNotificationPermission();
      setNotificationsActive(granted);
      if (granted) {
        sendTestNotification();
        addToast({
          type: 'success',
          title: 'Notifications Enabled',
          message: 'You will receive reminders to keep your daily study streak alive.',
        });
      } else {
        addToast({
          type: 'warning',
          title: 'Permission Denied',
          message: 'Please allow notification permissions in your browser address bar.',
        });
      }
    }
  };

  const targetBand = profile?.targetBand || 7.5;

  // 1. Overall Estimated Band Calculation
  const latestBands = useMemo(() => {
    const readingAtts = attempts.filter((a) => a.module === 'reading' && a.status === 'completed' && a.bandEstimate > 0);
    const listeningAtts = attempts.filter((a) => a.module === 'listening' && a.status === 'completed' && a.bandEstimate > 0);

    const readingBand: number = readingAtts.length > 0 ? readingAtts[0].bandEstimate : 6.5;
    const listeningBand: number = listeningAtts.length > 0 ? listeningAtts[0].bandEstimate : 6.5;
    const writingBand: number = writingSubs.length > 0 ? writingSubs[writingSubs.length - 1].bandEstimate : 6.0;
    const speakingBand: number = speakingSessions.length > 0 ? speakingSessions[speakingSessions.length - 1].bandEstimate : 6.5;

    const rawAvg = (readingBand + listeningBand + writingBand + speakingBand) / 4;
    const overallBand = Math.round(rawAvg * 2) / 2;

    return {
      reading: readingBand,
      listening: listeningBand,
      writing: writingBand,
      speaking: speakingBand,
      overall: overallBand,
    };
  }, [attempts, writingSubs, speakingSessions]);

  // 2. Smooth Line Chart Data with Dashed Target Line
  const trendLineData = useMemo(() => {
    const events: Array<{ date: string; reading?: number; listening?: number; writing?: number; speaking?: number }> = [];

    attempts.forEach((att) => {
      if (att.status !== 'completed' || !att.bandEstimate || att.bandEstimate <= 0) {
        return;
      }
      const d = att.completedAt.split('T')[0];
      events.push({
        date: d,
        [att.module]: att.bandEstimate,
      });
    });

    writingSubs.forEach((sub) => {
      const d = sub.submittedAt.split('T')[0];
      events.push({
        date: d,
        writing: sub.bandEstimate,
      });
    });

    speakingSessions.forEach((spk) => {
      const d = spk.recordedAt.split('T')[0];
      events.push({
        date: d,
        speaking: spk.bandEstimate,
      });
    });

    events.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

    const dateMap = new Map<string, any>();
    events.forEach((ev) => {
      const existing = dateMap.get(ev.date) || { date: ev.date };
      if (ev.reading !== undefined) existing.reading = ev.reading;
      if (ev.listening !== undefined) existing.listening = ev.listening;
      if (ev.writing !== undefined) existing.writing = ev.writing;
      if (ev.speaking !== undefined) existing.speaking = ev.speaking;
      dateMap.set(ev.date, existing);
    });

    const result = Array.from(dateMap.values());
    if (result.length === 0) {
      return [
        { date: 'Initial Baseline', reading: 6.0, listening: 6.0, writing: 6.0, speaking: 6.0 },
        { date: 'Current Est.', reading: 6.5, listening: 6.5, writing: 6.0, speaking: 6.5 },
      ];
    }
    return result;
  }, [attempts, writingSubs, speakingSessions]);

  // 3. Radar Chart Data: 4 Skills vs Target Band
  const radarData = useMemo(() => {
    return [
      { skill: 'Listening', current: latestBands.listening, target: targetBand, fullMark: 9 },
      { skill: 'Reading', current: latestBands.reading, target: targetBand, fullMark: 9 },
      { skill: 'Writing', current: latestBands.writing, target: targetBand, fullMark: 9 },
      { skill: 'Speaking', current: latestBands.speaking, target: targetBand, fullMark: 9 },
    ];
  }, [latestBands, targetBand]);

  // 4. Horizontal Bars for Question-Type Accuracy
  const questionTypeData = useMemo(() => {
    const stats = new Map<string, { correct: number; total: number }>();

    responses.forEach((r) => {
      const rawType = (r as any).questionType || 'comprehension';
      const typeLabel = rawType
        .split('_')
        .map((w: string) => w.charAt(0).toUpperCase() + w.slice(1))
        .join(' ');

      const curr = stats.get(typeLabel) || { correct: 0, total: 0 };
      if (r.isCorrect) curr.correct += 1;
      curr.total += 1;
      stats.set(typeLabel, curr);
    });

    if (stats.size === 0) {
      return [
        { type: 'True / False / NG', accuracy: 75, total: 10 },
        { type: 'Multiple Choice', accuracy: 80, total: 10 },
        { type: 'Matching Headings', accuracy: 50, total: 6 },
        { type: 'Form Completion', accuracy: 85, total: 10 },
        { type: 'Sentence Completion', accuracy: 70, total: 8 },
      ];
    }

    return Array.from(stats.entries())
      .map(([type, s]) => ({
        type,
        accuracy: Math.round((s.correct / s.total) * 100),
        total: s.total,
      }))
      .sort((a, b) => b.accuracy - a.accuracy);
  }, [responses]);

  // 5. 8-Week Calendar Heatmap Data (56 Days)
  const heatmapDays = useMemo(() => {
    const days: Array<{ date: string; dayName: string; minutes: number; level: number }> = [];
    const now = new Date();

    for (let i = 55; i >= 0; i--) {
      const d = new Date(now);
      d.setDate(d.getDate() - i);
      const dateStr = d.toISOString().split('T')[0];
      const dayName = d.toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' });

      // Calculate minutes for this day
      let dailyMins = 0;
      attempts.forEach((a) => {
        if (a.completedAt.startsWith(dateStr)) {
          dailyMins += Math.round(a.timeSpentSeconds / 60);
        }
      });
      writingSubs.forEach((w) => {
        if (w.submittedAt.startsWith(dateStr)) {
          dailyMins += Math.round(w.timeSpentSeconds / 60);
        }
      });
      speakingSessions.forEach((s) => {
        if (s.recordedAt.startsWith(dateStr)) {
          dailyMins += Math.round(s.durationSeconds / 60);
        }
      });

      let level = 0;
      if (dailyMins > 45) level = 3;
      else if (dailyMins > 15) level = 2;
      else if (dailyMins > 0) level = 1;

      days.push({
        date: dateStr,
        dayName,
        minutes: dailyMins,
        level,
      });
    }

    return days;
  }, [attempts, writingSubs, speakingSessions]);

  // 6. Average Time per Question
  const avgTimePerQuestionSeconds = useMemo(() => {
    let totalTime = 0;
    let totalQuestions = 0;
    attempts.forEach((a) => {
      totalTime += a.timeSpentSeconds;
      totalQuestions += a.totalQuestions;
    });
    if (totalQuestions === 0) return 85;
    return Math.round(totalTime / totalQuestions);
  }, [attempts]);

  // 7. Practice Hours in the Past 7 Days
  const weeklyHours = useMemo(() => {
    const sevenDaysAgo = Date.now() - 7 * 86400000;
    let totalSeconds = 0;

    attempts.forEach((a) => {
      if (new Date(a.completedAt).getTime() >= sevenDaysAgo) {
        totalSeconds += a.timeSpentSeconds;
      }
    });

    writingSubs.forEach((w) => {
      if (new Date(w.submittedAt).getTime() >= sevenDaysAgo) {
        totalSeconds += w.timeSpentSeconds;
      }
    });

    speakingSessions.forEach((s) => {
      if (new Date(s.recordedAt).getTime() >= sevenDaysAgo) {
        totalSeconds += s.durationSeconds;
      }
    });

    return (totalSeconds / 3600).toFixed(1);
  }, [attempts, writingSubs, speakingSessions]);

  const activeDaysCount = heatmapDays.filter((d) => d.minutes > 0).length;
  const bandDiff = (latestBands.overall - targetBand).toFixed(1);

  const renderTabBar = () => (
    <div className="flex flex-wrap items-center gap-1.5 p-1 rounded-2xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 w-fit">
      <button
        onClick={() => setSearchParams({})}
        className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
          activeTab === 'overview'
            ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-2xs'
            : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
        }`}
      >
        Overview &amp; Analytics
      </button>
      <button
        onClick={() => setSearchParams({ tab: 'mistakes' })}
        className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
          activeTab === 'mistakes'
            ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-2xs'
            : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
        }`}
      >
        <RotateCcw className="w-3.5 h-3.5 text-rose-500" />
        <span>Mistake Notebook</span>
      </button>
      <button
        onClick={() => setSearchParams({ tab: 'weekly-review' })}
        className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
          activeTab === 'weekly-review'
            ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-2xs'
            : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
        }`}
      >
        <Calendar className="w-3.5 h-3.5 text-teal-500" />
        <span>Weekly Review</span>
      </button>
      <button
        onClick={() => setSearchParams({ tab: 'achievements' })}
        className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
          activeTab === 'achievements'
            ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-2xs'
            : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
        }`}
      >
        <Award className="w-3.5 h-3.5 text-amber-500" />
        <span>Achievements</span>
      </button>
    </div>
  );

  if (activeTab === 'mistakes') {
    return (
      <div className="max-w-6xl mx-auto px-4 py-8 space-y-6">
        {renderTabBar()}
        <MistakeNotebookPage />
      </div>
    );
  }

  if (activeTab === 'weekly-review') {
    return (
      <div className="max-w-6xl mx-auto px-4 py-8 space-y-6">
        {renderTabBar()}
        <WeeklyReviewPage />
      </div>
    );
  }

  if (activeTab === 'achievements') {
    return (
      <div className="max-w-6xl mx-auto px-4 py-8 space-y-6">
        {renderTabBar()}
        <BadgeGalleryPage />
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-8 animate-fadeIn">
      {renderTabBar()}
      {/* 1. Deep-Green Greeting Banner with Mark Watermark */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#124F40] to-[#0E3D32] border border-[#17634F] p-6 sm:p-8 text-white shadow-card">
        <div className="absolute -right-6 -bottom-10 pointer-events-none opacity-[0.07] select-none text-white">
          <ZariiLogo variant="mark" size="xl" theme="dark" className="w-56 h-56 text-white" />
        </div>
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 mb-2 flex-wrap">
              <span className="text-2xs font-extrabold uppercase tracking-wider text-brand-300 bg-brand-950/80 px-2.5 py-0.5 rounded-full border border-brand-700/60">
                Exam Readiness Analytics
              </span>
              <span className="text-brand-600">•</span>
              <span className="text-2xs font-semibold text-brand-200">
                Target: Band {formatBand(targetBand)}
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
              Performance Dashboard
            </h1>
            <p className="text-sm text-brand-100/90 mt-1.5 max-w-xl leading-relaxed">
              Comprehensive analytics and progression curves calculated directly from your practice records.
            </p>
          </div>

          {/* Action Controls */}
          <div className="flex items-center gap-2.5 shrink-0 self-start md:self-center flex-wrap">
            <Button
              variant="primary"
              size="sm"
              onClick={() => setIsShareModalOpen(true)}
              leftIcon={<Share2 className="w-3.5 h-3.5 text-brand-950" />}
              className="text-xs bg-brand-400 hover:bg-brand-300 text-brand-950 font-bold shadow-sm border-0"
            >
              Share Progress Badge
            </Button>

            {/* Browser Notifications Switch */}
            <button
              onClick={handleToggleNotifications}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all inline-flex items-center gap-1.5 ${
                notificationsActive
                  ? 'bg-brand-950/80 border-brand-600/80 text-brand-200'
                  : 'bg-brand-900/40 border-brand-700/60 text-brand-100 hover:bg-brand-800/60'
              }`}
            >
              {notificationsActive ? (
                <>
                  <Bell className="w-3.5 h-3.5 text-brand-300" />
                  <span className="hidden sm:inline">Daily Reminders Active</span>
                </>
              ) : (
                <>
                  <BellOff className="w-3.5 h-3.5 text-brand-300/70" />
                  <span className="hidden sm:inline">Enable Reminders</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* KPI Metrics Row */}
      {isLoading ? (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-28 rounded-2xl" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Estimated Overall Band */}
          <div className="p-5 rounded-2xl bg-white dark:bg-[#112019] border border-[#E1EBE5] dark:border-[#24392F] shadow-xs space-y-1">
            <div className="flex items-center justify-between text-xs text-slate-500 dark:text-[#9DB3A7] font-bold uppercase">
              <span>Overall Estimated Band</span>
              <Award className="w-4 h-4 text-brand-700 dark:text-brand-400" />
            </div>
            <div className="text-3xl font-black text-brand-800 dark:text-brand-400 font-mono">
              Band {formatBand(latestBands.overall)}
            </div>
            <p className="text-xs text-slate-400 dark:text-slate-500">
              {parseFloat(bandDiff) >= 0 ? (
                <span className="text-[#1E9E63] font-semibold">Target Met (+{bandDiff})</span>
              ) : (
                <span className="text-amber-600 font-semibold">{bandDiff} to Target Band</span>
              )}
            </p>
          </div>

          {/* Speed: Avg Time Per Question */}
          <div className="p-5 rounded-2xl bg-white dark:bg-[#112019] border border-[#E1EBE5] dark:border-[#24392F] shadow-xs space-y-1">
            <div className="flex items-center justify-between text-xs text-slate-500 dark:text-[#9DB3A7] font-bold uppercase">
              <span>Avg Time Per Question</span>
              <Clock className="w-4 h-4 text-[#0F8B8D]" />
            </div>
            <div className="text-3xl font-black text-slate-900 dark:text-white font-mono">
              {formatSecondsToTime(avgTimePerQuestionSeconds)}
            </div>
            <p className="text-xs text-slate-400 dark:text-slate-500">Target: ≤ 1m 30s per question</p>
          </div>

          {/* Practice Hours this week */}
          <div className="p-5 rounded-2xl bg-white dark:bg-[#112019] border border-[#E1EBE5] dark:border-[#24392F] shadow-xs space-y-1">
            <div className="flex items-center justify-between text-xs text-slate-500 dark:text-[#9DB3A7] font-bold uppercase">
              <span>Practice Hours (7d)</span>
              <Calendar className="w-4 h-4 text-[#C98A0A]" />
            </div>
            <div className="text-3xl font-black text-[#C98A0A] font-mono">
              {weeklyHours} hrs
            </div>
            <p className="text-xs text-slate-400 dark:text-slate-500">Reading, audio, writing & speaking</p>
          </div>

          {/* Daily Goal & Streak */}
          <div className="p-5 rounded-2xl bg-white dark:bg-[#112019] border border-[#E1EBE5] dark:border-[#24392F] shadow-xs space-y-1">
            <div className="flex items-center justify-between text-xs text-slate-500 dark:text-[#9DB3A7] font-bold uppercase">
              <span>Active Study Days</span>
              <Flame className="w-4 h-4 text-[#CF5C45]" />
            </div>
            <div className="text-3xl font-black text-[#CF5C45] font-mono">
              {activeDaysCount} Days
            </div>
            <p className="text-xs text-slate-400 dark:text-slate-500">Last 8 weeks consistency</p>
          </div>
        </div>
      )}

      {/* Smart Recommendations Section */}
      <div className="space-y-3">
        <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-teal-600" />
          Smart Recommendations (Derived from your test attempts)
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {recommendations.map((rec) => (
            <div
              key={rec.id}
              className="p-5 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-xs flex flex-col justify-between space-y-3 hover:border-teal-500 transition-all"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-1.5">
                  <span
                    className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider ${
                      rec.priority === 'high'
                        ? 'bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300'
                        : 'bg-teal-100 text-teal-800 dark:bg-teal-950 dark:text-teal-300'
                    }`}
                  >
                    {rec.metric || 'Priority Action'}
                  </span>
                </div>
                <h3 className="font-bold text-sm text-slate-900 dark:text-white">
                  {rec.title}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                  {rec.description}
                </p>
              </div>

              <div className="pt-2">
                <Link
                  to={rec.targetPath}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-teal-600 dark:text-teal-400 hover:underline"
                >
                  <span>{rec.actionText}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Primary Charts Grid: Line Chart & Radar Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* 1. Smooth Band Trend Line Chart with Dashed Target Line */}
        <div className="p-6 rounded-2xl bg-white dark:bg-[#112019] border border-[#E1EBE5] dark:border-[#24392F] shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-brand-700 dark:text-brand-400" />
              Band Score Trend vs. Target
            </h2>
            <div className="flex items-center gap-2 text-2xs font-mono text-brand-700 dark:text-brand-400">
              <span className="w-3 h-0.5 border-t-2 border-dashed border-brand-400" />
              <span>Target: Band {targetBand}</span>
            </div>
          </div>

          {isLoading ? (
            <Skeleton className="h-[280px] w-full rounded-xl" />
          ) : (
            <div className="h-[280px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={trendLineData} margin={{ top: 15, right: 15, left: -20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#64748b" opacity={0.15} />
                  <XAxis dataKey="date" tick={{ fontSize: 11, fill: '#94a3b8' }} stroke="#64748b" />
                  <YAxis domain={[4.0, 9.0]} ticks={[4, 5, 6, 7, 8, 9]} tick={{ fontSize: 11, fill: '#94a3b8' }} stroke="#64748b" />
                  <Tooltip content={<CustomChartTooltip unit=" Band" />} />
                  <Legend iconType="circle" wrapperStyle={{ fontSize: '12px' }} />

                  {/* Dashed Target Line */}
                  <ReferenceLine
                    y={targetBand}
                    stroke="#5BB78D"
                    strokeDasharray="4 4"
                    strokeWidth={2}
                    label={{
                      value: `Target: ${targetBand}`,
                      fill: '#5BB78D',
                      position: 'top',
                      fontSize: 10,
                      fontWeight: 'bold',
                    }}
                  />

                  <Line type="monotone" dataKey="reading" stroke="#1E7A62" strokeWidth={2.5} name="Reading" dot={{ r: 3 }} activeDot={{ r: 5 }} />
                  <Line type="monotone" dataKey="listening" stroke="#0F8B8D" strokeWidth={2.5} name="Listening" dot={{ r: 3 }} activeDot={{ r: 5 }} />
                  <Line type="monotone" dataKey="writing" stroke="#C98A0A" strokeWidth={2.5} name="Writing" dot={{ r: 3 }} activeDot={{ r: 5 }} />
                  <Line type="monotone" dataKey="speaking" stroke="#CF5C45" strokeWidth={2.5} name="Speaking" dot={{ r: 3 }} activeDot={{ r: 5 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          )}
        </div>

        {/* 2. Radar Chart: 4 Skills Balance vs Target Band */}
        <div className="p-6 rounded-2xl bg-white dark:bg-[#112019] border border-[#E1EBE5] dark:border-[#24392F] shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <RadarIcon className="w-4 h-4 text-brand-700 dark:text-brand-400" />
              Four Skills Balance (Radar)
            </h2>
            <span className="text-2xs text-slate-400 font-mono">0 – 9.0 Scale</span>
          </div>

          {isLoading ? (
            <Skeleton className="h-[280px] w-full rounded-xl" />
          ) : (
            <div className="h-[280px] w-full flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart data={radarData} outerRadius="75%">
                  <PolarGrid stroke="#64748b" opacity={0.2} />
                  <PolarAngleAxis dataKey="skill" tick={{ fontSize: 12, fill: '#cbd5e1', fontWeight: 600 }} />
                  <PolarRadiusAxis domain={[0, 9]} angle={45} stroke="#64748b" opacity={0.4} tick={{ fontSize: 10, fill: '#94a3b8' }} />
                  <Tooltip content={<CustomChartTooltip unit=" Band" />} />
                  <Legend iconType="circle" wrapperStyle={{ fontSize: '12px' }} />
                  <Radar name="Current Band" dataKey="current" stroke="#124F40" fill="#124F40" fillOpacity={0.45} />
                  <Radar name="Target Band" dataKey="target" stroke="#5BB78D" fill="#5BB78D" fillOpacity={0.15} strokeDasharray="3 3" />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          )}
        </div>
      </div>

      {/* Secondary Charts: Horizontal Bar Chart & 8-Week Calendar Heatmap */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* 3. Horizontal Bars for Question-Type Accuracy */}
        <div className="p-6 rounded-2xl bg-white dark:bg-[#112019] border border-[#E1EBE5] dark:border-[#24392F] shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <BarChart3 className="w-4 h-4 text-brand-700 dark:text-brand-400" />
              Accuracy by Question Type
            </h2>
            <span className="text-xs text-slate-400 font-mono">% Accuracy</span>
          </div>

          {isLoading ? (
            <Skeleton className="h-[280px] w-full rounded-xl" />
          ) : questionTypeData.length === 0 ? (
            <EmptyState
              title={copy.emptyStates.analytics.title}
              description={copy.emptyStates.analytics.description}
              action={
                <Link
                  to="/reading"
                  className="px-4 py-2 rounded-xl text-xs font-bold bg-brand-800 text-white hover:bg-brand-900 transition-colors inline-block"
                >
                  {copy.emptyStates.analytics.cta}
                </Link>
              }
            />
          ) : (
            <div className="h-[280px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={questionTypeData} layout="vertical" margin={{ left: 10, right: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#64748b" opacity={0.15} horizontal={false} />
                  <XAxis type="number" domain={[0, 100]} tick={{ fontSize: 11, fill: '#94a3b8' }} stroke="#64748b" unit="%" />
                  <YAxis dataKey="type" type="category" tick={{ fontSize: 11, fill: '#cbd5e1' }} stroke="#64748b" width={130} />
                  <Tooltip content={<CustomChartTooltip unit="%" />} />
                  <Bar dataKey="accuracy" fill="#124F40" radius={[0, 6, 6, 0]} name="Accuracy" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          )}
        </div>

        {/* 4. Calendar Heatmap for Practice Days (8 Weeks / 56 Days) */}
        <div className="p-6 rounded-2xl bg-white dark:bg-[#112019] border border-[#E1EBE5] dark:border-[#24392F] shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Calendar className="w-4 h-4 text-brand-700 dark:text-brand-400" />
              Study Activity Heatmap (Last 8 Weeks)
            </h2>
            <span className="text-xs text-slate-400 font-mono">
              {activeDaysCount}/56 Days Active
            </span>
          </div>

          {isLoading ? (
            <Skeleton className="h-[280px] w-full rounded-xl" />
          ) : (
            <div className="space-y-4 pt-2">
              <div className="grid grid-cols-8 gap-2">
                {heatmapDays.map((day) => (
                  <div
                    key={day.date}
                    className="group relative flex flex-col items-center"
                  >
                    <div
                      className={`w-full aspect-square rounded-md transition-transform group-hover:scale-110 cursor-pointer ${
                        day.level === 3
                          ? 'bg-brand-800 dark:bg-brand-400 shadow-xs shadow-brand-800/30'
                          : day.level === 2
                          ? 'bg-brand-500 dark:bg-brand-600'
                          : day.level === 1
                          ? 'bg-brand-200 dark:bg-brand-800/80'
                          : 'bg-slate-100 dark:bg-[#172A21]'
                      }`}
                      title={`${day.dayName}: ${day.minutes} minutes`}
                    />

                    {/* Tooltip on Hover */}
                    <div className="absolute bottom-full mb-1 hidden group-hover:block z-30 pointer-events-none">
                      <div className="px-2 py-1 bg-slate-900 dark:bg-[#112019] text-white rounded text-[10px] whitespace-nowrap shadow-lg border border-[#24392F]">
                        {day.dayName}: {day.minutes} min
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Heatmap Legend */}
              <div className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-[#24392F] text-2xs text-slate-400">
                <span>56 Days Ago</span>
                <div className="flex items-center gap-1.5">
                  <span>Less</span>
                  <div className="w-3 h-3 rounded-xs bg-slate-100 dark:bg-[#172A21]" />
                  <div className="w-3 h-3 rounded-xs bg-brand-200 dark:bg-brand-800/80" />
                  <div className="w-3 h-3 rounded-xs bg-brand-500 dark:bg-brand-600" />
                  <div className="w-3 h-3 rounded-xs bg-brand-800 dark:bg-brand-400" />
                  <span>More</span>
                </div>
                <span>Today</span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Recent Test Attempts List */}
      <div className="bg-white dark:bg-[#112019] rounded-2xl border border-[#E1EBE5] dark:border-[#24392F] shadow-xs overflow-hidden">
        <div className="px-6 py-4 border-b border-[#E1EBE5] dark:border-[#24392F] flex items-center justify-between">
          <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Clock className="w-4 h-4 text-brand-700 dark:text-brand-400" />
            Recent Test Attempts
          </h2>
          <span className="text-xs text-slate-500 dark:text-slate-400 font-semibold">{attempts.length} Total Attempts</span>
        </div>

        {attempts.length === 0 ? (
          <div className="p-8 text-center space-y-2">
            <p className="text-sm font-medium text-slate-700 dark:text-slate-300">{copy.emptyStates.recentActivity.title}</p>
            <p className="text-xs text-slate-500 dark:text-slate-400">{copy.emptyStates.recentActivity.description}</p>
            <Link
              to="/diagnostic"
              className="inline-block mt-2 px-4 py-2 rounded-xl text-xs font-bold bg-brand-800 text-white hover:bg-brand-700 transition-colors"
            >
              Start Diagnostic Test
            </Link>
          </div>
        ) : (
          <div className="divide-y divide-slate-100 dark:divide-slate-700/60">
            {attempts.slice(0, 5).map((att) => (
              <div
                key={att.id}
                className="p-4 sm:px-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-slate-50/60 dark:hover:bg-slate-700/30 transition-colors"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-sm text-slate-900 dark:text-white">
                      {att.title}
                    </span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300">
                      {att.module}
                    </span>
                  </div>
                  <div className="text-xs text-slate-400 flex items-center gap-3">
                    <span>
                      {new Date(att.completedAt).toLocaleDateString(undefined, {
                        month: 'short',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </span>
                    <span>•</span>
                    <span>Time: {formatSecondsToTime(att.timeSpentSeconds)}</span>
                  </div>
                </div>

                <div className="flex items-center gap-4 self-end sm:self-center">
                  <div className="text-right">
                    {att.status === 'completed' && att.bandEstimate > 0 ? (
                      <div className="text-base font-black font-mono text-teal-600 dark:text-teal-400">
                        Band {formatBand(att.bandEstimate)}
                      </div>
                    ) : (
                      <span className="inline-block px-2 py-0.5 rounded text-xs font-semibold bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300">
                        {att.status === 'not_attempted' ? 'Not Attempted' : 'Incomplete'}
                      </span>
                    )}
                    <span className="text-xs text-slate-400 font-mono block">
                      {att.score} / {att.totalQuestions}
                    </span>
                  </div>

                  {att.id && (
                    <Link
                      to={
                        att.module === 'reading'
                          ? `/practice/reading/results/${att.id}`
                          : `/practice/listening/results/${att.id}`
                      }
                      className="p-2 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </Link>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Shareable Progress Card Modal */}
      <ShareableProgressCard
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
        candidateName={profile?.displayName || 'IELTS Candidate'}
        overallBand={latestBands.overall}
        targetBand={targetBand}
        streakDays={activeDaysCount || 7}
        skills={latestBands}
        testsCompleted={attempts.length}
        accuracyPercentage={82}
      />
    </div>
  );
};
