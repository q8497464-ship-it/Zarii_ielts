import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Compass,
  BookOpen,
  Play,
  ArrowRight,
  Sparkles,
  Award,
  Layers,
  GraduationCap,
  Flame,
  CheckCircle2,
  Lock,
  Volume2,
} from 'lucide-react';
import { useAppStore } from '../../../store/useAppStore';
import { Card, CardHeader, CardTitle, CardContent } from '../../../components/ui/Card';
import { Button } from '../../../components/ui/Button';
import { Badge } from '../../../components/ui/Badge';
import { ProgressBar } from '../../../components/ui/ProgressBar';
import { ALL_ENGLISH_LEVELS } from '../data/courseContent';
import { db } from '../../../lib/db';
import { cn } from '../../../lib/utils';
import { getStreakData } from '../../habits/habitEngine';
import { playPronunciation } from '../../dictionary/dictionaryService';

export function EnglishHomePage() {
  const navigate = useNavigate();
  const { profile, updateProfile } = useAppStore();
  const [completedLessonIds, setCompletedLessonIds] = useState<string[]>([]);
  const streak = getStreakData();

  const userLevel = profile?.englishLevel || 'A1';

  useEffect(() => {
    // Load completed lessons from Dexie
    db.courseProgress.toArray().then((records) => {
      const allDone = new Set<string>();
      for (const rec of records) {
        if (rec.completedLessons) {
          rec.completedLessons.forEach((id) => allDone.add(id));
        }
      }
      setCompletedLessonIds(Array.from(allDone));
    }).catch(() => {});
  }, []);

  const totalLessons = ALL_ENGLISH_LEVELS.reduce(
    (acc, lvl) => acc + lvl.units.reduce((uAcc, u) => uAcc + u.lessons.length, 0),
    0
  );

  const progressPercent = totalLessons > 0 ? Math.round((completedLessonIds.length / totalLessons) * 100) : 0;

  // Next lesson calculation
  const nextLesson = ALL_ENGLISH_LEVELS[0].units[0].lessons[0];

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-8 animate-fade-in">
      {/* 1. Hero Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-[#124F40] via-[#0E3D32] to-[#1B2B26] text-white shadow-xl relative overflow-hidden">
        <div className="absolute -right-12 -bottom-12 w-64 h-64 rounded-full bg-[#5BB78D]/10 blur-3xl pointer-events-none" />
        <div className="relative z-10 max-w-2xl space-y-4">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-[#5BB78D]/20 text-[#5BB78D] border border-[#5BB78D]/30 text-xs font-bold uppercase tracking-wider">
              CEFR Level {userLevel} Track
            </span>
            <span className="flex items-center gap-1 text-xs font-bold text-amber-300">
              <Flame className="w-4 h-4 fill-amber-400 text-amber-400" />
              {streak.currentStreak}-Day Streak
            </span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight leading-tight">
            Master English from the Ground Up.
          </h1>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            Step-by-step interactive lessons covering essential grammar, everyday dialogues, vocabulary, and confident pronunciation.
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <Button
              onClick={() => navigate(`/app/english/course/lesson/${nextLesson.id}`)}
              className="bg-[#5BB78D] hover:bg-[#4ea27c] text-[#0E3D32] font-bold text-sm px-6 py-2.5 rounded-xl shadow-md transition-all flex items-center gap-2"
            >
              <Play className="w-4 h-4 fill-current" />
              Continue: {nextLesson.title}
            </Button>
            <Button
              variant="outline"
              onClick={() => navigate('/app/english/course')}
              className="border-white/30 text-white hover:bg-white/10 text-sm font-semibold rounded-xl"
            >
              View Full Syllabus
            </Button>
          </div>
        </div>
      </div>

      {/* 2. Course Progress & Stats Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="p-5 bg-white dark:bg-[#112019] border border-slate-200/80 dark:border-[#24392F] shadow-xs rounded-2xl space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 font-bold uppercase">
            <span>Overall Course Progress</span>
            <span className="text-[#124F40] dark:text-[#5BB78D] font-mono">{progressPercent}%</span>
          </div>
          <ProgressBar value={progressPercent} className="h-2 rounded-full" />
          <p className="text-2xs text-slate-400">
            {completedLessonIds.length} of {totalLessons} interactive lessons completed
          </p>
        </Card>

        <Card className="p-5 bg-white dark:bg-[#112019] border border-slate-200/80 dark:border-[#24392F] shadow-xs rounded-2xl flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-teal-50 dark:bg-teal-950/60 text-teal-600 dark:text-teal-400 flex items-center justify-center shrink-0">
            <Compass className="w-6 h-6" />
          </div>
          <div>
            <span className="text-2xs font-bold uppercase text-slate-400">Current Level</span>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white capitalize">
              {userLevel} • {userLevel === 'A1' ? 'Beginner' : userLevel === 'A2' ? 'Elementary' : userLevel === 'B1' ? 'Intermediate' : 'Advanced'}
            </h3>
          </div>
        </Card>

        <Card className="p-5 bg-white dark:bg-[#112019] border border-slate-200/80 dark:border-[#24392F] shadow-xs rounded-2xl flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0">
            <Award className="w-6 h-6" />
          </div>
          <div>
            <span className="text-2xs font-bold uppercase text-slate-400">Earned XP Reward</span>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white font-mono">
              {completedLessonIds.length * 50} XP
            </h3>
          </div>
        </Card>
      </div>

      {/* 3. Level Syllabus Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight">
              Curriculum Levels (A1 to C1)
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Progress through progressive CEFR language levels aligned with international standards.
            </p>
          </div>
          <Link
            to="/app/english/course"
            className="text-xs font-bold text-teal-600 dark:text-teal-400 hover:underline flex items-center gap-1"
          >
            Explore All Units
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {ALL_ENGLISH_LEVELS.map((levelInfo) => (
            <Card
              key={levelInfo.level}
              className="p-5 bg-white dark:bg-[#112019] border border-slate-200/80 dark:border-[#24392F] hover:shadow-md transition-all rounded-2xl flex flex-col justify-between space-y-4 group"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className={cn('text-xs font-bold px-2.5 py-1 rounded-md uppercase tracking-wider', levelInfo.badgeColor)}>
                    Level {levelInfo.level}
                  </span>
                  <span className="text-xs text-slate-400 font-medium">
                    {levelInfo.units.reduce((acc, u) => acc + u.lessons.length, 0)} Lessons
                  </span>
                </div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-teal-600 transition-colors">
                  {levelInfo.title}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed line-clamp-2">
                  {levelInfo.description}
                </p>
              </div>

              <Button
                variant="outline"
                size="sm"
                onClick={() => navigate('/app/english/course')}
                className="w-full text-xs font-bold rounded-xl border-slate-200 dark:border-slate-800 group-hover:border-teal-500 group-hover:text-teal-600 dark:group-hover:text-teal-400"
              >
                Open Level {levelInfo.level}
              </Button>
            </Card>
          ))}
        </div>
      </div>

      {/* 4. Quick Practice Arenas */}
      <div className="space-y-4 pt-2">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight">
          Specialized Skill Arenas
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Link
            to="/app/english/practice"
            className="p-5 rounded-2xl bg-white dark:bg-[#112019] border border-slate-200/80 dark:border-[#24392F] hover:shadow-md transition-all space-y-2 group"
          >
            <div className="w-10 h-10 rounded-xl bg-teal-50 dark:bg-teal-950 text-teal-600 dark:text-teal-400 flex items-center justify-center">
              <Layers className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-teal-600 transition-colors">
              Grammar & Vocab Practice
            </h3>
            <p className="text-2xs text-slate-500 dark:text-slate-400">
              Interactive multiple-choice quizzes and sentence builders.
            </p>
          </Link>

          <Link
            to="/app/english/grammar"
            className="p-5 rounded-2xl bg-white dark:bg-[#112019] border border-slate-200/80 dark:border-[#24392F] hover:shadow-md transition-all space-y-2 group"
          >
            <div className="w-10 h-10 rounded-xl bg-cyan-50 dark:bg-cyan-950 text-cyan-600 dark:text-cyan-400 flex items-center justify-center">
              <BookOpen className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-cyan-600 transition-colors">
              Grammar Reference
            </h3>
            <p className="text-2xs text-slate-500 dark:text-slate-400">
              Rule breakdowns, tenses, modals, and Urdu explanations.
            </p>
          </Link>

          <Link
            to="/app/english/skills"
            className="p-5 rounded-2xl bg-white dark:bg-[#112019] border border-slate-200/80 dark:border-[#24392F] hover:shadow-md transition-all space-y-2 group"
          >
            <div className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
              <Volume2 className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 transition-colors">
              Reading & Listening
            </h3>
            <p className="text-2xs text-slate-500 dark:text-slate-400">
              Short audio dialogues and everyday comprehension passages.
            </p>
          </Link>

          <Link
            to="/app/english/speaking"
            className="p-5 rounded-2xl bg-white dark:bg-[#112019] border border-slate-200/80 dark:border-[#24392F] hover:shadow-md transition-all space-y-2 group"
          >
            <div className="w-10 h-10 rounded-xl bg-amber-50 dark:bg-amber-950 text-amber-600 dark:text-amber-400 flex items-center justify-center">
              <Sparkles className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-amber-600 transition-colors">
              Speaking & Pronunciation
            </h3>
            <p className="text-2xs text-slate-500 dark:text-slate-400">
              IPA phonetic charts, minimal pairs, and shadowing drills.
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
}
