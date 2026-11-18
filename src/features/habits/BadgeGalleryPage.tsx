import React, { useState, useEffect } from 'react';
import {
  Award,
  Sparkles,
  Flame,
  CalendarCheck,
  Zap,
  Crown,
  Shield,
  Snowflake,
  BookOpen,
  Headphones,
  PenTool,
  Mic,
  FileText,
  Library,
  Radio,
  Volume2,
  Feather,
  FileCheck2,
  BookMarked,
  MessageSquare,
  Users,
  GraduationCap,
  Layers,
  Bookmark,
  Compass,
  CheckCircle,
  Code,
  Clock,
  Trophy,
  Footprints,
  Lock,
  Filter,
} from 'lucide-react';
import { Breadcrumbs } from '../../components/ui/Breadcrumbs';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { ProgressBar } from '../../components/ui/ProgressBar';
import { ZariiLogo } from '../../components/ui/ZariiLogo';
import {
  auditAndUnlockAchievements,
  getUserXp,
  getLevelInfo,
  getStreakData,
} from './habitEngine';
import type { AchievementBadge, LevelInfo, StreakData } from '../../types';

// Map iconName strings to Lucide components
const ICON_MAP: Record<string, React.ElementType> = {
  Footprints,
  BookOpen,
  Headphones,
  PenTool,
  Mic,
  Award,
  Sparkles,
  Flame,
  CalendarCheck,
  Zap,
  Crown,
  Shield,
  Snowflake,
  FileText,
  Library,
  Radio,
  Volume2,
  Feather,
  FileCheck2,
  BookMarked,
  MessageSquare,
  Users,
  GraduationCap,
  Layers,
  Bookmark,
  Compass,
  CheckCircle,
  Code,
  Clock,
  Trophy,
};

export function BadgeGalleryPage() {
  const [badges, setBadges] = useState<AchievementBadge[]>([]);
  const [xp, setXp] = useState(0);
  const [levelInfo, setLevelInfo] = useState<LevelInfo | null>(null);
  const [streak, setStreak] = useState<StreakData | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const { allBadges } = await auditAndUnlockAchievements();
        setBadges(allBadges);
        const currentXp = getUserXp();
        setXp(currentXp);
        setLevelInfo(getLevelInfo(currentXp));
        setStreak(getStreakData());
      } catch (err) {
        console.error('Failed to audit badges:', err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const unlockedCount = badges.filter((b) => b.unlocked).length;
  const totalCount = badges.length;
  const progressPercent = totalCount > 0 ? Math.round((unlockedCount / totalCount) * 100) : 0;

  const filteredBadges = badges.filter((b) => {
    if (selectedCategory === 'all') return true;
    return b.category === selectedCategory;
  });

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-fadeIn">
      {/* Breadcrumbs */}
      <Breadcrumbs
        items={[
          { label: 'Home', href: '/' },
          { label: 'Habits & Goals', href: '/dashboard' },
          { label: 'Achievements Gallery' },
        ]}
      />

      {/* Header & Level Progress Banner */}
      <div className="relative overflow-hidden bg-gradient-to-r from-[#124F40] to-[#0E3D32] border border-[#17634F] text-white rounded-3xl p-6 sm:p-8 shadow-card">
        <div className="absolute -right-6 -bottom-10 pointer-events-none opacity-[0.07] select-none text-white">
          <ZariiLogo variant="mark" size="xl" theme="dark" className="w-56 h-56 text-white" />
        </div>
        <div className="relative z-10 grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          {/* Level Info Pill */}
          <div className="md:col-span-4 flex flex-col items-center justify-center text-center p-6 bg-brand-950/60 rounded-2xl border border-brand-700/60 backdrop-blur-xs">
            <span className="text-2xs font-extrabold uppercase tracking-widest text-brand-300 mb-1">
              Current Mastery Level
            </span>
            <div className="text-3xl sm:text-4xl font-black text-white tracking-tight my-1">
              {levelInfo?.name || 'Beginner'}
            </div>
            <span className="text-xs text-brand-200 mt-0.5">
              Level {levelInfo?.level || 1} • {xp.toLocaleString()} Total XP
            </span>
            {streak && (
              <div className="flex items-center gap-1.5 mt-3 text-xs font-bold text-amber-300 bg-amber-500/20 px-3 py-1 rounded-full border border-amber-500/30">
                <Flame className="w-3.5 h-3.5 fill-amber-300" />
                <span>{streak.currentStreak} Day Streak</span>
              </div>
            )}
          </div>

          {/* Level Progress & Stats */}
          <div className="md:col-span-8 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight">
                  Academic Achievement Gallery
                </h1>
                <p className="text-xs text-brand-100/90 mt-0.5">
                  Unlock all 30 milestone badges through dedicated practice, score milestones, and consistency.
                </p>
              </div>
              <div className="text-right shrink-0">
                <span className="text-lg font-black text-brand-300 font-mono">
                  {unlockedCount} / {totalCount}
                </span>
                <span className="text-2xs text-brand-200/80 block uppercase font-bold">Badges Earned</span>
              </div>
            </div>

            {/* Level XP Progress Bar with mint-to-green gradient */}
            {levelInfo && (
              <div className="space-y-1.5 pt-2">
                <div className="flex items-center justify-between text-2xs text-brand-100 font-medium">
                  <span>
                    Level {levelInfo.level} ({levelInfo.name})
                  </span>
                  <span>
                    {levelInfo.xpToNextLevel > 0
                      ? `${levelInfo.xpToNextLevel.toLocaleString()} XP to Level ${levelInfo.level + 1}`
                      : 'Max Level Master'}
                  </span>
                </div>
                <div className="w-full h-2.5 rounded-full bg-brand-950/80 overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-[#5BB78D] to-[#1E7A62] rounded-full transition-all duration-700"
                    style={{ width: `${levelInfo.progressPercent}%` }}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Category Filter Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-slate-200 dark:border-[#24392F] text-xs font-semibold">
        <button
          onClick={() => setSelectedCategory('all')}
          className={`px-3.5 py-1.5 rounded-xl transition-colors whitespace-nowrap ${
            selectedCategory === 'all'
              ? 'bg-[#124F40] text-white shadow-xs'
              : 'bg-white dark:bg-[#112019] text-slate-600 dark:text-[#9DB3A7] hover:text-slate-900 dark:hover:text-white border border-[#E1EBE5] dark:border-[#24392F]'
          }`}
        >
          All Badges (30)
        </button>
        <button
          onClick={() => setSelectedCategory('bands')}
          className={`px-3.5 py-1.5 rounded-xl transition-colors whitespace-nowrap ${
            selectedCategory === 'bands'
              ? 'bg-[#124F40] text-white shadow-xs'
              : 'bg-white dark:bg-[#112019] text-slate-600 dark:text-[#9DB3A7] hover:text-slate-900 dark:hover:text-white border border-[#E1EBE5] dark:border-[#24392F]'
          }`}
        >
          Band Milestones (6)
        </button>
        <button
          onClick={() => setSelectedCategory('habits')}
          className={`px-3.5 py-1.5 rounded-xl transition-colors whitespace-nowrap ${
            selectedCategory === 'habits'
              ? 'bg-[#124F40] text-white shadow-xs'
              : 'bg-white dark:bg-[#112019] text-slate-600 dark:text-[#9DB3A7] hover:text-slate-900 dark:hover:text-white border border-[#E1EBE5] dark:border-[#24392F]'
          }`}
        >
          Consistency & Streaks (6)
        </button>
        <button
          onClick={() => setSelectedCategory('volume')}
          className={`px-3.5 py-1.5 rounded-xl transition-colors whitespace-nowrap ${
            selectedCategory === 'volume'
              ? 'bg-[#124F40] text-white shadow-xs'
              : 'bg-white dark:bg-[#112019] text-slate-600 dark:text-[#9DB3A7] hover:text-slate-900 dark:hover:text-white border border-[#E1EBE5] dark:border-[#24392F]'
          }`}
        >
          Practice Volume (10)
        </button>
        <button
          onClick={() => setSelectedCategory('vocab')}
          className={`px-3.5 py-1.5 rounded-xl transition-colors whitespace-nowrap ${
            selectedCategory === 'vocab'
              ? 'bg-[#124F40] text-white shadow-xs'
              : 'bg-white dark:bg-[#112019] text-slate-600 dark:text-[#9DB3A7] hover:text-slate-900 dark:hover:text-white border border-[#E1EBE5] dark:border-[#24392F]'
          }`}
        >
          Vocabulary Mastery (4)
        </button>
        <button
          onClick={() => setSelectedCategory('milestones')}
          className={`px-3.5 py-1.5 rounded-xl transition-colors whitespace-nowrap ${
            selectedCategory === 'milestones'
              ? 'bg-[#124F40] text-white shadow-xs'
              : 'bg-white dark:bg-[#112019] text-slate-600 dark:text-[#9DB3A7] hover:text-slate-900 dark:hover:text-white border border-[#E1EBE5] dark:border-[#24392F]'
          }`}
        >
          Milestones & Exams (4)
        </button>
      </div>

      {/* 30 Badges Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredBadges.map((badge) => {
          const IconComponent = ICON_MAP[badge.iconName] || Award;
          const isUnlocked = badge.unlocked;

          return (
            <Card
              key={badge.id}
              className={`p-5 rounded-2xl flex flex-col justify-between transition-all duration-200 border ${
                isUnlocked
                  ? 'bg-white dark:bg-[#112019] border-[#E1EBE5] dark:border-[#24392F] shadow-xs hover:border-brand-500/40'
                  : 'bg-slate-50/70 dark:bg-slate-900/40 border-slate-200 dark:border-slate-800/80 opacity-70'
              }`}
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  {/* Badge Icon */}
                  <div
                    className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 ${
                      isUnlocked
                        ? 'bg-gradient-to-br from-[#17634F] to-[#124F40] text-brand-200 border border-brand-500/30 shadow-sm'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-400'
                    }`}
                  >
                    <IconComponent className="w-5 h-5" />
                  </div>

                  {/* Status / Lock */}
                  {isUnlocked ? (
                    <Badge variant="success" size="sm">
                      +{badge.xpReward} XP
                    </Badge>
                  ) : (
                    <div className="flex items-center gap-1 text-2xs text-slate-400 font-medium">
                      <Lock className="w-3 h-3" /> Locked
                    </div>
                  )}
                </div>

                <div>
                  <h3
                    className={`text-sm font-bold ${
                      isUnlocked
                        ? 'text-slate-900 dark:text-white'
                        : 'text-slate-600 dark:text-slate-400'
                    }`}
                  >
                    {badge.title}
                  </h3>
                  <p className="text-2xs text-slate-500 dark:text-[#9DB3A7] leading-relaxed mt-1">
                    {badge.description}
                  </p>
                </div>
              </div>

              {/* Bottom tag */}
              <div className="pt-3 mt-3 border-t border-slate-100 dark:border-[#24392F] text-2xs text-slate-400 flex items-center justify-between">
                <span className="capitalize">{badge.category}</span>
                {isUnlocked && <span className="font-semibold text-[#1E9E63]">Unlocked</span>}
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
