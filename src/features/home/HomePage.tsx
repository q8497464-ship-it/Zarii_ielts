import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Headphones,
  BookOpen,
  PenTool,
  Mic,
  Calendar,
  Sparkles,
  ArrowRight,
  Target,
  Flame,
  Clock,
  Compass,
  AlertCircle,
  CheckCircle2,
  Circle,
  Play,
  RotateCcw,
  TrendingUp,
  Award,
  Trophy,
  Snowflake,
  Pencil,
} from 'lucide-react';
import { extractCandidateName, isPlaceholderName } from '../../shared/utils/candidateUtils';
import { useAppStore } from '../../store/useAppStore';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { ProgressBar } from '../../components/ui/ProgressBar';
import { calculateDaysLeft, formatBand } from '../../lib/utils';
import { db } from '../../lib/db';
import { computeSmartRecommendations } from '../dashboard/recommendations';
import type { StudyPlanDay, StudyPlanTask, SmartRecommendation, TestAttempt, StreakData, WeeklyChallenge as WeeklyChallengeType } from '../../types';
import { DailyGoalRing } from '../habits/DailyGoalRing';
import { WeeklyChallengeWidget } from '../habits/WeeklyChallengeWidget';
import { MilestoneCelebration } from '../habits/MilestoneCelebration';
import { ZariiLogo } from '../../components/ui/ZariiLogo';
import { supabase } from '../../lib/supabase';
import { copy } from '../../lib/copy';
import {
  getStreakData,
  getWeeklyChallenge,
  auditAndUnlockAchievements,
  getUserXp,
  getLevelInfo,
} from '../habits/habitEngine';
import { motion } from 'framer-motion';
import { HomeSkeleton } from '../../components/ui/Skeleton';

export function HomePage() {
  const navigate = useNavigate();
  const { profile, settings, addToast, isLoadingProfile } = useAppStore();

  const isGamificationEnabled = settings?.gamificationEnabled !== false;

  const [todayPlan, setTodayPlan] = useState<StudyPlanDay | null>(null);
  const [smartRec, setSmartRec] = useState<SmartRecommendation | null>(null);
  const [lastAttempt, setLastAttempt] = useState<TestAttempt | null>(null);
  const [weeklyActivity, setWeeklyActivity] = useState<{ day: string; date: string; active: boolean }[]>([]);
  const [weeklyMinutes, setWeeklyMinutes] = useState(0);
  const [todayMinutes, setTodayMinutes] = useState(0);
  const [streakData, setStreakData] = useState<StreakData>(getStreakData());
  const [weeklyChallenge, setWeeklyChallenge] = useState<WeeklyChallengeType>(getWeeklyChallenge());
  const [unlockedBadgesCount, setUnlockedBadgesCount] = useState(0);

  // Dynamic Candidate Display Name Resolution
  const [candidateName, setCandidateName] = useState<string>(() => {
    return extractCandidateName(null, profile?.displayName) || '';
  });
  const [isEditingName, setIsEditingName] = useState<boolean>(false);
  const [editingNameValue, setEditingNameValue] = useState<string>('');

  useEffect(() => {
    let isMounted = true;

    async function resolveCandidateName() {
      // 1. Resolve from current cached or profile data
      const immediate = extractCandidateName(null, profile?.displayName);
      if (immediate && isMounted) {
        setCandidateName(immediate);
      }

      // 2. Fetch logged-in Supabase user metadata
      try {
        const { data } = await supabase.auth.getUser();
        const user = data?.user;
        if (user && isMounted) {
          const resolved = extractCandidateName(user, profile?.displayName);
          if (resolved) {
            setCandidateName(resolved);
            localStorage.setItem('zarii_candidate_name', resolved);
            if (!profile?.displayName || isPlaceholderName(profile.displayName) || profile.displayName !== resolved) {
              useAppStore.getState().updateProfile({ displayName: resolved });
            }
            return;
          }
        }
      } catch (err) {
        console.warn('Could not fetch candidate auth user:', err);
      }

      if (isMounted && !candidateName) {
        const fallback = extractCandidateName(null, profile?.displayName);
        if (fallback) setCandidateName(fallback);
      }
    }

    resolveCandidateName();

    const { data: authSub } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user && isMounted) {
        const resolved = extractCandidateName(session.user, profile?.displayName);
        if (resolved) {
          setCandidateName(resolved);
          localStorage.setItem('zarii_candidate_name', resolved);
          useAppStore.getState().updateProfile({ displayName: resolved });
        }
      }
    });

    return () => {
      isMounted = false;
      authSub?.subscription?.unsubscribe();
    };
  }, [profile?.displayName]);

  const handleSaveCandidateName = async (e: React.FormEvent) => {
    e.preventDefault();
    const clean = editingNameValue.trim();
    if (clean && !isPlaceholderName(clean)) {
      setCandidateName(clean);
      localStorage.setItem('zarii_candidate_name', clean);
      await useAppStore.getState().updateProfile({ displayName: clean });
    }
    setIsEditingName(false);
  };
  const [celebrationData, setCelebrationData] = useState<{
    isOpen: boolean;
    title: string;
    description: string;
    xpAwarded?: number;
    badgeTitle?: string;
  }>({
    isOpen: false,
    title: '',
    description: '',
  });
  const [skillBands, setSkillBands] = useState({
    listening: 6.5,
    reading: 6.5,
    writing: 6.0,
    speaking: 6.0,
  });

  const todayStr = new Date().toISOString().split('T')[0];

  useEffect(() => {
    async function loadDashboardData() {
      try {
        // 1. Load today's study plan
        const storedDays = await db.studyPlan.where('dateStr').equals(todayStr).toArray();
        if (storedDays && storedDays.length > 0) {
          setTodayPlan(storedDays[0]);
        }

        // 2. Load smart recommendation
        const recs = await computeSmartRecommendations();
        if (recs.length > 0) {
          setSmartRec(recs[0]);
        }

        // 3. Load latest attempt for "Continue where you left off"
        const attempts = await db.attempts.orderBy('createdAt').reverse().limit(1).toArray();
        if (attempts && attempts.length > 0) {
          setLastAttempt(attempts[0]);
        }

        // 4. Compute past 7-day activity heatmap
        const now = new Date();
        const days = [];
        let totalMins = 0;

        for (let i = 6; i >= 0; i--) {
          const d = new Date(now);
          d.setDate(d.getDate() - i);
          const dateString = d.toISOString().split('T')[0];
          const dayName = d.toLocaleDateString(undefined, { weekday: 'narrow' });

          const dayAttempts = await db.attempts
            .where('completedAt')
            .between(`${dateString}T00:00:00.000Z`, `${dateString}T23:59:59.999Z`, true, true)
            .toArray();

          const hasActivity = dayAttempts.length > 0;
          if (hasActivity) {
            totalMins += dayAttempts.reduce((acc, a) => acc + (a.timeSpentSeconds ? Math.round(a.timeSpentSeconds / 60) : 15), 0);
          }

          days.push({
            day: dayName,
            date: dateString.slice(-2),
            active: hasActivity,
          });
        }
        setWeeklyActivity(days);
        setWeeklyMinutes(totalMins);

        // 5. Compute today's minutes
        const todayAttempts = await db.attempts
          .where('completedAt')
          .between(`${todayStr}T00:00:00.000Z`, `${todayStr}T23:59:59.999Z`, true, true)
          .toArray();
        const todayMins = todayAttempts.reduce(
          (acc, a) => acc + (a.timeSpentSeconds ? Math.round(a.timeSpentSeconds / 60) : 15),
          0
        );
        setTodayMinutes(todayMins);

        // 6. Compute recent skill bands
        const allAttempts = await db.attempts.toArray();
        const latestListening = allAttempts.filter(a => a.module === 'listening').pop();
        const latestReading = allAttempts.filter(a => a.module === 'reading').pop();
        const latestWriting = allAttempts.filter(a => a.module === 'writing').pop();
        const latestSpeaking = allAttempts.filter(a => a.module === 'speaking').pop();

        setSkillBands({
          listening: latestListening?.bandEstimate || 6.5,
          reading: latestReading?.bandEstimate || 6.5,
          writing: latestWriting?.bandEstimate || 6.0,
          speaking: latestSpeaking?.bandEstimate || 6.0,
        });

        // 7. Audit Habits, Streaks, Challenges & Badges
        const currentStreak = getStreakData();
        setStreakData(currentStreak);
        const currentChallenge = getWeeklyChallenge();
        setWeeklyChallenge(currentChallenge);

        const { newlyUnlocked, allBadges } = await auditAndUnlockAchievements();
        const unlockedCount = allBadges.filter((b) => b.unlocked).length;
        setUnlockedBadgesCount(unlockedCount);

        if (newlyUnlocked.length > 0 && isGamificationEnabled) {
          setCelebrationData({
            isOpen: true,
            title: `Badge Unlocked: ${newlyUnlocked[0].title}`,
            description: newlyUnlocked[0].description,
            xpAwarded: newlyUnlocked[0].xpReward,
            badgeTitle: newlyUnlocked[0].title,
          });
        }
      } catch (err) {
        console.error('Failed to load dashboard data:', err);
      }
    }
    loadDashboardData();
  }, [todayStr]);

  const handleToggleTask = async (taskId: string) => {
    if (!todayPlan) return;

    const updatedTasks = (todayPlan.tasks || []).map((t) => {
      if (t.id === taskId) {
        const completed = !t.completed;
        return {
          ...t,
          completed,
          completedAt: completed ? new Date().toISOString() : undefined,
        };
      }
      return t;
    });

    const allCompleted = updatedTasks.every((t) => t.completed);
    const updatedDay: StudyPlanDay = {
      ...todayPlan,
      tasks: updatedTasks,
      completed: allCompleted,
      completedAt: allCompleted ? new Date().toISOString() : undefined,
    };

    setTodayPlan(updatedDay);
    if (updatedDay.id) {
      await db.studyPlan.put(updatedDay);
    }

    if (allCompleted) {
      addToast({
        type: 'success',
        title: copy.success.saved,
        message: copy.success.savedStreak(streakData.currentStreak > 0 ? streakData.currentStreak : 1),
      });
    }
  };

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 17) return 'Good afternoon';
    return 'Good evening';
  };

  const daysLeft = profile?.examDate ? calculateDaysLeft(profile.examDate) : null;
  const targetBand = profile?.targetBand || 7.5;

  // Compute tasks progress
  const tasks = todayPlan?.tasks || [];
  const completedCount = tasks.filter((t) => t.completed).length;
  const totalCount = tasks.length;
  const completionPercentage = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  // Ring dimensions
  const ringRadius = 26;
  const circumference = 2 * Math.PI * ringRadius;
  const strokeDashoffset = circumference - (completionPercentage / 100) * circumference;

  const skillsData = [
    {
      id: 'listening',
      name: 'Listening',
      icon: Headphones,
      currentBand: skillBands.listening,
      path: '/practice/listening',
      color: 'text-[#0F8B8D]',
      iconBg: 'bg-[#0F8B8D]/10 text-[#0F8B8D]',
      badgeVar: 'listening' as const,
      progressColor: 'listening' as const,
    },
    {
      id: 'reading',
      name: 'Reading',
      icon: BookOpen,
      currentBand: skillBands.reading,
      path: '/practice/reading',
      color: 'text-[#1E7A62]',
      iconBg: 'bg-[#1E7A62]/10 text-[#1E7A62]',
      badgeVar: 'reading' as const,
      progressColor: 'reading' as const,
    },
    {
      id: 'writing',
      name: 'Writing',
      icon: PenTool,
      currentBand: skillBands.writing,
      path: '/practice/writing',
      color: 'text-[#C98A0A]',
      iconBg: 'bg-[#C98A0A]/10 text-[#C98A0A]',
      badgeVar: 'writing' as const,
      progressColor: 'writing' as const,
    },
    {
      id: 'speaking',
      name: 'Speaking',
      icon: Mic,
      currentBand: skillBands.speaking,
      path: '/practice/speaking',
      color: 'text-[#CF5C45]',
      iconBg: 'bg-[#CF5C45]/10 text-[#CF5C45]',
      badgeVar: 'speaking' as const,
      progressColor: 'speaking' as const,
    },
  ];

  if (isLoadingProfile) {
    return <HomeSkeleton />;
  }

  return (
    <div className="space-y-8 max-w-6xl mx-auto pb-12">
      {/* 1. Deep-Green Greeting Banner with Mark Watermark */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#124F40] to-[#0E3D32] border border-[#17634F] p-6 sm:p-8 text-white shadow-card">
        <div className="absolute -right-6 -bottom-10 pointer-events-none opacity-[0.07] select-none text-white">
          <ZariiLogo variant="mark" size="xl" theme="dark" className="w-56 h-56 text-white" />
        </div>
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 mb-2 flex-wrap">
              <span className="text-2xs font-extrabold uppercase tracking-wider text-brand-300 bg-brand-950/80 px-2.5 py-0.5 rounded-full border border-brand-700/60">
                {profile?.testType ? `${profile.testType.toUpperCase()} MODULE` : 'ACADEMIC'}
              </span>
              {daysLeft !== null ? (
                <span className="inline-flex items-center gap-1 text-2xs font-bold text-brand-200 bg-brand-950/60 px-2.5 py-0.5 rounded-full border border-brand-700/60">
                  <Clock className="w-3 h-3 text-brand-400" />
                  {daysLeft} days until exam ({profile?.examDate})
                </span>
              ) : (
                <span className="text-2xs text-brand-300/80">
                  Official Exam: Date Not Set
                </span>
              )}
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white flex items-center gap-2 flex-wrap">
              <span>{getGreeting()},</span>
              {isEditingName ? (
                <form onSubmit={handleSaveCandidateName} className="inline-flex items-center gap-1.5 animate-in fade-in">
                  <input
                    type="text"
                    value={editingNameValue}
                    onChange={(e) => setEditingNameValue(e.target.value)}
                    placeholder="Enter candidate name"
                    autoFocus
                    className="px-2.5 py-0.5 text-base sm:text-lg rounded-lg bg-white text-slate-900 font-bold shadow-md outline-none focus:ring-2 focus:ring-brand-400"
                  />
                  <button
                    type="submit"
                    className="px-2.5 py-1 text-xs font-bold rounded-lg bg-brand-400 text-brand-950 hover:bg-brand-300 shadow-sm"
                  >
                    Save
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsEditingName(false)}
                    className="px-2 py-1 text-xs text-brand-200 hover:text-white"
                  >
                    Cancel
                  </button>
                </form>
              ) : (
                <span className="inline-flex items-center gap-2 group">
                  <span
                    onClick={() => {
                      setEditingNameValue(candidateName || (profile?.displayName && !isPlaceholderName(profile.displayName) ? profile.displayName : ''));
                      setIsEditingName(true);
                    }}
                    className="text-brand-300 hover:text-white transition-colors cursor-pointer border-b border-dashed border-brand-400/50 hover:border-white"
                    title="Click to edit candidate name"
                  >
                    {candidateName || (profile?.displayName && !isPlaceholderName(profile.displayName) ? profile.displayName : 'Candidate')}
                  </span>
                  <button
                    onClick={() => {
                      setEditingNameValue(candidateName || (profile?.displayName && !isPlaceholderName(profile.displayName) ? profile.displayName : ''));
                      setIsEditingName(true);
                    }}
                    className="opacity-70 group-hover:opacity-100 transition-opacity text-brand-300 hover:text-white p-1 rounded hover:bg-brand-800/50"
                    title="Edit candidate name"
                    aria-label="Edit candidate name"
                  >
                    <Pencil className="w-3.5 h-3.5" />
                  </button>
                </span>
              )}
            </h1>
            <p className="text-sm text-brand-100/90 mt-1.5 leading-relaxed max-w-xl">
              Targeting <strong className="text-brand-300">Band {formatBand(targetBand)}</strong>. Every focused practice session builds official exam stamina.
            </p>
          </div>

          {/* Quick Practice & Auxiliary Navigation */}
          <div className="flex items-center gap-2.5 shrink-0 self-start md:self-center flex-wrap">
            <Link to="/practice/smart">
              <Button
                variant="primary"
                size="sm"
                leftIcon={<Sparkles className="w-3.5 h-3.5 text-brand-950" />}
                className="bg-brand-400 hover:bg-brand-300 text-brand-950 shadow-sm font-bold border-0"
              >
                Smart Practice
              </Button>
            </Link>
            <div className="inline-flex items-center p-0.5 rounded-xl bg-brand-950/80 border border-brand-700/60 backdrop-blur-xs">
              <Link
                to="/mistakes"
                className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium text-brand-100 hover:text-white rounded-lg hover:bg-brand-800/80 transition-colors"
                title="Mistake Notebook"
              >
                <RotateCcw className="w-3.5 h-3.5 text-rose-300" />
                <span>Mistakes</span>
              </Link>
              <div className="w-px h-3.5 bg-brand-700/60" />
              <Link
                to="/weekly-review"
                className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium text-brand-100 hover:text-white rounded-lg hover:bg-brand-800/80 transition-colors"
                title="Weekly Review & Goals"
              >
                <Calendar className="w-3.5 h-3.5 text-brand-300" />
                <span>Weekly Report</span>
              </Link>
              <div className="w-px h-3.5 bg-brand-700/60" />
              <button
                onClick={() => navigate('/diagnostic')}
                className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium text-brand-100 hover:text-white rounded-lg hover:bg-brand-800/80 transition-colors cursor-pointer"
                title="25-Minute Diagnostic Benchmark"
              >
                <Compass className="w-3.5 h-3.5 text-brand-400" />
                <span>Diagnostic</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Hero Action Card: "Continue Where You Left Off" */}
      <Card className="relative overflow-hidden border-brand-500/30 bg-gradient-to-r from-brand-50/80 via-white to-brand-100/30 dark:from-brand-950/30 dark:via-slate-900 dark:to-brand-900/20 shadow-card">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-teal-600 text-white flex items-center justify-center shrink-0 shadow-sm shadow-teal-600/30">
              <Play className="w-6 h-6 fill-current ml-0.5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <Badge variant="primary" dot size="xs">
                  Continue Where You Left Off
                </Badge>
                {lastAttempt && (
                  <span className="text-2xs text-slate-400 font-mono">
                    Score: Band {formatBand(lastAttempt.bandEstimate)}
                  </span>
                )}
              </div>
              <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white mt-1">
                {lastAttempt
                  ? `Resume ${lastAttempt.module.toUpperCase()}: ${lastAttempt.title || 'Recent Practice'}`
                  : 'Take the 25-Minute Diagnostic Benchmark Test'}
              </h2>
              <p className="text-xs text-slate-600 dark:text-slate-300 mt-0.5 max-w-2xl leading-relaxed">
                {lastAttempt
                  ? `You recently completed a ${lastAttempt.module} session. Review detailed explanations or attempt another passage to reinforce your skills.`
                  : 'Identify your current baseline across Reading, Listening, Writing, and Speaking with our free diagnostic test.'}
              </p>
            </div>
          </div>

          <Button
            variant="primary"
            onClick={() => {
              if (lastAttempt) {
                navigate(`/practice/${lastAttempt.module}`);
              } else {
                navigate('/diagnostic');
              }
            }}
            rightIcon={<ArrowRight className="w-4 h-4" />}
            className="shrink-0 self-start sm:self-center shadow-md shadow-teal-700/20"
          >
            {lastAttempt ? 'Resume Practice' : 'Start Diagnostic'}
          </Button>
        </div>
      </Card>

      {/* 3. Today's Plan & Weekly Streak Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Today's Plan Checklist with Circular Progress Ring */}
        <Card className="lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-teal-600" />
                Today&apos;s Study Schedule
              </CardTitle>
              <CardDescription>
                {todayPlan ? todayPlan.taskTitle : 'Daily tasks configured for your exam date.'}
              </CardDescription>
            </div>

            {/* Circular Progress Ring */}
            <div className="flex items-center gap-3">
              <div className="relative w-14 h-14 flex items-center justify-center shrink-0">
                <svg className="w-full h-full -rotate-90" viewBox="0 0 60 60">
                  <defs>
                    <linearGradient id="todayRingGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#5BB78D" />
                      <stop offset="100%" stopColor="#124F40" />
                    </linearGradient>
                  </defs>
                  <circle
                    cx="30"
                    cy="30"
                    r={ringRadius}
                    className="stroke-slate-200 dark:stroke-slate-800"
                    strokeWidth="4"
                    fill="transparent"
                  />
                  <circle
                    cx="30"
                    cy="30"
                    r={ringRadius}
                    stroke="url(#todayRingGrad)"
                    className="transition-all duration-500 ease-out"
                    strokeWidth="4"
                    strokeDasharray={circumference}
                    strokeDashoffset={strokeDashoffset}
                    strokeLinecap="round"
                    fill="transparent"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                  <span className="text-xs font-extrabold text-slate-900 dark:text-white font-mono leading-none">
                    {completionPercentage}%
                  </span>
                </div>
              </div>
              <div className="text-right hidden sm:block">
                <span className="text-xs font-bold text-slate-800 dark:text-slate-200 block">
                  {completedCount}/{totalCount || 3} Tasks
                </span>
                <span className="text-2xs text-slate-400">Completed</span>
              </div>
            </div>
          </CardHeader>

          <CardContent className="pt-4 space-y-2.5">
            {tasks.length > 0 ? (
              tasks.map((task) => (
                <div
                  key={task.id}
                  onClick={() => handleToggleTask(task.id)}
                  className={`p-3 sm:p-3.5 rounded-xl border flex items-center justify-between gap-3 cursor-pointer transition-all ${
                    task.completed
                      ? 'bg-slate-50 dark:bg-slate-800/40 border-slate-200/60 dark:border-slate-800/60 opacity-70'
                      : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700/80 shadow-subtle hover:border-teal-500/40'
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <button
                      type="button"
                      className={`w-5 h-5 rounded-md border flex items-center justify-center shrink-0 transition-colors ${
                        task.completed
                          ? 'bg-brand-800 border-brand-800 text-white'
                          : 'border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800'
                      }`}
                      aria-label={task.completed ? 'Mark task incomplete' : 'Mark task complete'}
                    >
                      {task.completed ? <CheckCircle2 className="w-3.5 h-3.5 stroke-[3]" /> : null}
                    </button>
                    <div className="min-w-0">
                      <span
                        className={`text-xs sm:text-sm font-semibold truncate block ${
                          task.completed
                            ? 'line-through text-slate-400 dark:text-slate-500'
                            : 'text-slate-800 dark:text-slate-200'
                        }`}
                      >
                        {task.title}
                      </span>
                      <span className="text-2xs text-slate-400">
                        {task.estimatedMinutes} minutes • {task.module}
                      </span>
                    </div>
                  </div>

                  <Link
                    to={task.targetPath}
                    onClick={(e) => e.stopPropagation()}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-brand-700 dark:hover:text-brand-400 transition-colors shrink-0"
                    title="Open task practice"
                  >
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              ))
            ) : (
              <div className="p-6 text-center space-y-2">
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  No scheduled tasks for today. Start a quick practice module or configure your plan.
                </p>
                <Link to="/plan" className="inline-block text-xs font-semibold text-teal-600 hover:underline">
                  Configure Personalized Plan →
                </Link>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Weekly Activity Heatmap & Streak */}
        <Card className="flex flex-col justify-between">
          <CardHeader className="pb-3 border-b border-slate-100 dark:border-slate-800">
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Flame className="w-4 h-4 text-orange-500" />
                Weekly Activity & Streak
              </CardTitle>
              <Badge variant="warning" size="xs">
                Active
              </Badge>
            </div>
            <CardDescription>Track consecutive study consistency</CardDescription>
          </CardHeader>

          <CardContent className="pt-4 space-y-6">
            {/* Heatmap 7-day row */}
            <div>
              <div className="text-2xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
                Last 7 Days
              </div>
              <div className="grid grid-cols-7 gap-2">
                {weeklyActivity.map((day, idx) => (
                  <div key={idx} className="flex flex-col items-center gap-1.5">
                    <span className="text-2xs font-bold text-slate-400">{day.day}</span>
                    <div
                      className={`w-9 h-9 rounded-xl flex items-center justify-center font-mono text-xs font-bold transition-all ${
                        day.active
                          ? 'bg-brand-800 text-white shadow-xs shadow-brand-800/30 ring-2 ring-brand-500/20'
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-400'
                      }`}
                    >
                      {day.active ? <CheckCircle2 className="w-4 h-4" /> : day.date}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Total Minutes & Streak Stat */}
            <div className="grid grid-cols-2 gap-3 p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
              <div>
                <span className="text-2xs font-bold uppercase tracking-wider text-slate-400 block">
                  Study Time
                </span>
                <span className="text-lg font-extrabold font-mono text-slate-900 dark:text-white">
                  {weeklyMinutes} mins
                </span>
              </div>
              <div>
                <span className="text-2xs font-bold uppercase tracking-wider text-slate-400 block">
                  Current Streak
                </span>
                <span className="text-lg font-extrabold font-mono text-orange-600 dark:text-orange-400 flex items-center gap-1">
                  <Flame className="w-4 h-4 fill-current" />
                  {streakData.currentStreak > 0 ? `${streakData.currentStreak} Days` : `${weeklyActivity.filter(d => d.active).length} Days`}
                </span>
              </div>
            </div>

            {/* Achievements Link & Freeze Status */}
            {isGamificationEnabled && (
              <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-700 dark:text-slate-300">
                  <Award className="w-4 h-4 text-amber-500" />
                  <span>{unlockedBadgesCount}/30 Badges</span>
                </div>
                <Link
                  to="/achievements"
                  className="text-xs font-bold text-brand-700 dark:text-brand-400 hover:underline flex items-center gap-1"
                >
                  Gallery →
                </Link>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* 3.5 Habit & Gamification: Daily Goal Ring + Weekly Challenge Sprint */}
      {isGamificationEnabled && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <DailyGoalRing
            studiedMinutes={todayMinutes}
            targetMinutes={profile?.dailyStudyMinutes || 45}
            streak={streakData}
          />
          <WeeklyChallengeWidget challenge={weeklyChallenge} />
        </div>
      )}

      {/* 4. Four Core Skill Cards with Current Band vs Target Band */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">
              Targeted Skill Practice
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Track current estimated band performance against your Band {formatBand(targetBand)} goal.
            </p>
          </div>
          <Link
            to="/practice"
            className="text-xs font-semibold text-brand-700 dark:text-brand-400 hover:underline flex items-center gap-1"
          >
            All Practice <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {skillsData.map((skill) => {
            const Icon = skill.icon;
            const progressRatio = Math.min(100, Math.round((skill.currentBand / targetBand) * 100));

            return (
              <Link key={skill.id} to={skill.path} className="group">
                <Card hoverEffect className="h-full flex flex-col justify-between p-5 transition-all">
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <div className={`p-2.5 rounded-xl ${skill.iconBg} ${skill.color}`}>
                        <Icon className="w-5 h-5 stroke-[2]" />
                      </div>
                      <Badge variant={skill.badgeVar} size="xs" dot>
                        {skill.name}
                      </Badge>
                    </div>

                    <h3 className="font-bold text-slate-900 dark:text-white text-base group-hover:text-brand-700 dark:group-hover:text-brand-400 transition-colors">
                      {skill.name} Module
                    </h3>

                    <div className="mt-2 flex items-baseline justify-between text-xs">
                      <span className="text-slate-500 dark:text-slate-400">Current Band:</span>
                      <span className="font-extrabold font-mono text-slate-900 dark:text-white">
                        {formatBand(skill.currentBand)} / {formatBand(targetBand)}
                      </span>
                    </div>

                    {/* Mini Progress Bar towards Target Band */}
                    <div className="mt-2">
                      <ProgressBar
                        value={progressRatio}
                        variant={skill.progressColor}
                        size="xs"
                      />
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-xs font-semibold text-brand-700 dark:text-brand-400 group-hover:translate-x-1 transition-transform">
                    <span>Open Module</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </Card>
              </Link>
            );
          })}
        </div>
      </div>

      {/* 5. "Recommended Next" Card Based on Weaknesses */}
      {smartRec && (
        <Card className="border-brand-500/30 bg-gradient-to-r from-brand-50/60 to-emerald-50/60 dark:from-brand-950/20 dark:to-emerald-950/20">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-start gap-3.5">
              <div className="p-3 rounded-2xl bg-brand-800 text-white shrink-0 mt-0.5 shadow-sm shadow-brand-800/30">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <Badge variant="primary" size="xs">
                    Weakness Diagnostic Recommendation
                  </Badge>
                </div>
                <h3 className="font-bold text-base text-slate-900 dark:text-white mt-1">
                  {smartRec.title}
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-300 mt-0.5 max-w-2xl leading-relaxed">
                  {smartRec.description}
                </p>
              </div>
            </div>

            <Button
              variant="primary"
              size="sm"
              onClick={() => navigate(smartRec.targetPath)}
              rightIcon={<ArrowRight className="w-4 h-4" />}
              className="shrink-0 self-start sm:self-center"
            >
              {smartRec.actionText}
            </Button>
          </div>
        </Card>
      )}

      {/* Official Score Disclaimer */}
      <div className="flex items-start gap-3 p-4 rounded-2xl bg-slate-100/70 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800/80 text-xs text-slate-500 dark:text-slate-400">
        <AlertCircle className="w-4 h-4 shrink-0 text-slate-400 mt-0.5" />
        <p className="leading-relaxed">
          <strong>Disclaimer:</strong> Zarii is an independent open educational tool. Band scores provided are accurate estimates to guide self-study and do not constitute official examination certificates from IELTS partners (British Council, IDP, or Cambridge Assessment).
        </p>
      </div>

      {/* Tasteful Milestone Celebration Animation */}
      {isGamificationEnabled && (
        <MilestoneCelebration
          isOpen={celebrationData.isOpen}
          onClose={() => setCelebrationData((prev) => ({ ...prev, isOpen: false }))}
          title={celebrationData.title}
          description={celebrationData.description}
          xpAwarded={celebrationData.xpAwarded}
          badgeTitle={celebrationData.badgeTitle}
        />
      )}
    </div>
  );
}
