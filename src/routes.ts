import React from 'react';
import {
  Home,
  BookOpen,
  Headphones,
  PenTool,
  Mic,
  FileSpreadsheet,
  Layers,
  Sparkles,
  BarChart3,
  User,
  Settings,
  Compass,
  RotateCcw,
  Lightbulb,
  GraduationCap,
  Search,
  Zap,
  BookMarked,
  type LucideIcon,
} from 'lucide-react';
import type { LearningTrack } from './types';

export interface RouteConfig {
  path: string;
  name: string;
  category?: 'Learn' | 'Progress' | 'Account' | 'System' | 'Exam' | 'English';
  icon: LucideIcon;
  exact?: boolean;
  end?: boolean;
  inSidebar?: boolean;
  inBottomNav?: boolean;
  badge?: string;
  shortcut?: string;
  description?: string;
  track?: LearningTrack | 'shared';
}

export interface NavGroupConfig {
  label?: string;
  items: RouteConfig[];
}

/**
 * Master Registry of All Application Student Routes
 * Single Source of Truth for:
 * 1. Router definitions
 * 2. Sidebar grouped navigation
 * 3. Mobile bottom bar
 * 4. Command Palette search actions
 * 5. Breadcrumbs mapping
 */
export const APP_ROUTES: RouteConfig[] = [
  // Primary Navigation
  {
    path: '/',
    name: 'Home',
    category: 'Learn',
    icon: Home,
    exact: true,
    inSidebar: true,
    inBottomNav: true,
    description: 'Dashboard overview, daily streak, and next recommended study actions',
    track: 'shared',
  },
  {
    path: '/practice',
    name: 'Practice',
    category: 'Learn',
    icon: BookOpen,
    inSidebar: true,
    inBottomNav: true,
    description: 'All 4 IELTS modules: Reading, Listening, Writing, and Speaking',
    track: 'ielts',
  },
  {
    path: '/mock',
    name: 'Mock Tests',
    category: 'Learn',
    icon: FileSpreadsheet,
    inSidebar: true,
    inBottomNav: false,
    description: 'Full 3-hour computer-delivered IELTS exam simulation under timed test conditions',
    track: 'ielts',
  },
  {
    path: '/vocab',
    name: 'Vocabulary',
    category: 'Learn',
    icon: Layers,
    inSidebar: true,
    inBottomNav: true,
    description: 'Academic word list with SM-2 spaced repetition, flashcards, and quizzes',
    track: 'ielts',
  },
  {
    path: '/plan',
    name: 'Study Plan',
    category: 'Learn',
    icon: Sparkles,
    inSidebar: true,
    inBottomNav: false,
    description: 'Adaptive study timetable tailored to your official exam date and target band',
    track: 'ielts',
  },
  {
    path: '/dashboard',
    name: 'Progress',
    category: 'Progress',
    icon: BarChart3,
    inSidebar: true,
    inBottomNav: true,
    description: 'Estimated overall band score, skill breakdown radar, and attempt logs',
    track: 'shared',
  },
  {
    path: '/settings',
    name: 'Profile & Settings',
    category: 'Account',
    icon: User,
    inSidebar: true,
    inBottomNav: true,
    description: 'Candidate profile, reading typography, theme, timers, and data export',
    track: 'shared',
  },

  // English Track Routes
  {
    path: '/english',
    name: 'English Home',
    category: 'English',
    icon: Home,
    description: 'English Course overview, CEFR levels, and daily study goal',
    track: 'english',
  },
  {
    path: '/english/course',
    name: 'English Course',
    category: 'English',
    icon: GraduationCap,
    description: 'A1 to C1 structured curriculum, units, and interactive lessons',
    track: 'english',
  },
  {
    path: '/english/practice',
    name: 'English Practice',
    category: 'English',
    icon: Zap,
    description: 'Interactive exercises, multiple-choice, and sentence builder',
    track: 'english',
  },
  {
    path: '/english/grammar',
    name: 'Grammar Reference',
    category: 'English',
    icon: BookOpen,
    description: 'English grammar handbook with formulas, examples, and Urdu hints',
    track: 'english',
  },
  {
    path: '/english/skills',
    name: 'Reading & Listening',
    category: 'English',
    icon: Headphones,
    description: 'Graded short stories and dialogues with audio narration',
    track: 'english',
  },
  {
    path: '/english/speaking',
    name: 'Speaking & Pronunciation',
    category: 'English',
    icon: Mic,
    description: 'Minimal pairs, tongue twisters, and speech recording practice',
    track: 'english',
  },

  // Shared Tools
  {
    path: '/dictionary',
    name: 'Dictionary',
    category: 'Learn',
    icon: Search,
    description: 'Offline English-Urdu dictionary with phonetics, audio, and examples',
    track: 'shared',
  },
  {
    path: '/word-bank',
    name: 'Word Bank',
    category: 'Learn',
    icon: BookMarked,
    description: 'Your saved vocabulary and spaced-repetition study bank',
    track: 'shared',
  },

  // Deep Module Routes (IELTS)
  {
    path: '/practice/reading',
    name: 'Reading Practice',
    category: 'Learn',
    icon: BookOpen,
    description: 'Authentic 3-passage academic and general reading tests with text highlighting',
    track: 'ielts',
  },
  {
    path: '/practice/listening',
    name: 'Listening Practice',
    category: 'Learn',
    icon: Headphones,
    description: '4-section audio recordings with native accents and question type drills',
    track: 'ielts',
  },
  {
    path: '/practice/writing',
    name: 'Writing Practice',
    category: 'Learn',
    icon: PenTool,
    description: 'Task 1 visual graphs/letters and Task 2 academic essays with examiner rubrics',
    track: 'ielts',
  },
  {
    path: '/practice/speaking',
    name: 'Speaking Practice',
    category: 'Learn',
    icon: Mic,
    description: 'Part 1, 2, 3 voice recording simulator with speech recognition transcript',
    track: 'ielts',
  },
  {
    path: '/practice/smart',
    name: 'Smart Adaptive Practice',
    category: 'Learn',
    icon: Sparkles,
    description: 'Personalized drills targeting your weakest question types',
    track: 'ielts',
  },
  {
    path: '/diagnostic',
    name: 'Diagnostic Exam',
    category: 'Learn',
    icon: Compass,
    description: 'Baseline assessment estimating your current band score in 30 minutes',
    track: 'ielts',
  },
  {
    path: '/mistakes',
    name: 'Mistake Notebook',
    category: 'Progress',
    icon: RotateCcw,
    description: 'Review every question you got wrong with explanations and retry mode',
    track: 'shared',
  },
  {
    path: '/lessons',
    name: 'Strategy Lessons',
    category: 'Learn',
    icon: Lightbulb,
    description: 'Tactical mini-lessons covering examiner traps and timing benchmarks',
    track: 'ielts',
  },
];

/**
 * Desktop Sidebar Navigation Groups for IELTS Track (Must remain exactly 4 groups)
 */
export const IELTS_NAVIGATION: NavGroupConfig[] = [
  {
    items: [
      { name: 'Home', path: '/app', icon: Home, exact: true },
    ],
  },
  {
    label: 'LEARN',
    items: [
      { name: 'Practice', path: '/app/practice', icon: BookOpen },
      { name: 'Mock Tests', path: '/app/mock', icon: FileSpreadsheet },
      { name: 'Vocabulary', path: '/app/vocab', icon: Layers },
      { name: 'Study Plan', path: '/app/plan', icon: Sparkles },
    ],
  },
  {
    label: 'PROGRESS',
    items: [
      { name: 'Progress', path: '/app/dashboard', icon: BarChart3 },
    ],
  },
  {
    label: 'ACCOUNT',
    items: [
      { name: 'Profile & Settings', path: '/app/settings', icon: User },
    ],
  },
];

/**
 * Desktop Sidebar Navigation Groups for English Course Track
 */
export const ENGLISH_NAVIGATION: NavGroupConfig[] = [
  {
    items: [
      { name: 'Home', path: '/app/english', icon: Home, exact: true },
    ],
  },
  {
    label: 'COURSE',
    items: [
      { name: 'Course', path: '/app/english/course', icon: GraduationCap },
      { name: 'Practice', path: '/app/english/practice', icon: Zap },
      { name: 'Grammar Reference', path: '/app/english/grammar', icon: BookOpen },
      { name: 'Reading & Listening', path: '/app/english/skills', icon: Headphones },
      { name: 'Speaking & Pronunciation', path: '/app/english/speaking', icon: Mic },
    ],
  },
  {
    label: 'TOOLS',
    items: [
      { name: 'Dictionary', path: '/app/dictionary', icon: Search },
      { name: 'Word Bank', path: '/app/word-bank', icon: BookMarked },
    ],
  },
  {
    label: 'PROGRESS',
    items: [
      { name: 'Progress', path: '/app/progress', icon: BarChart3 },
    ],
  },
  {
    label: 'ACCOUNT',
    items: [
      { name: 'Profile & Settings', path: '/app/settings', icon: User },
    ],
  },
];

/**
 * Backward compatibility: default MAIN_NAVIGATION is IELTS navigation
 */
export const MAIN_NAVIGATION: NavGroupConfig[] = IELTS_NAVIGATION;

/**
 * Returns dynamic sidebar navigation based on active track
 */
export function getSidebarNavigation(track: LearningTrack): NavGroupConfig[] {
  if (track === 'english') {
    return ENGLISH_NAVIGATION;
  }
  return IELTS_NAVIGATION;
}

/**
 * Mobile Bottom Bar Items
 */
export const MOBILE_NAV_ITEMS = [
  { name: 'Home', path: '/app', icon: Home },
  { name: 'Practice', path: '/app/practice', icon: BookOpen },
  { name: 'Vocabulary', path: '/app/vocab', icon: Layers },
  { name: 'Progress', path: '/app/dashboard', icon: BarChart3 },
  { name: 'Profile', path: '/app/settings', icon: User },
];

/**
 * Returns dynamic mobile bottom navigation items based on active track
 */
export function getMobileNavItems(track: LearningTrack) {
  if (track === 'english') {
    return [
      { name: 'Home', path: '/app/english', icon: Home },
      { name: 'Course', path: '/app/english/course', icon: GraduationCap },
      { name: 'Practice', path: '/app/english/practice', icon: Zap },
      { name: 'Dictionary', path: '/app/dictionary', icon: Search },
      { name: 'Profile', path: '/app/settings', icon: User },
    ];
  }
  return MOBILE_NAV_ITEMS;
}

/**
 * Empty bottom navigation for desktop sidebar (so user profile card sits alone at bottom)
 */
export const BOTTOM_NAVIGATION: RouteConfig[] = [];

/**
 * Resolves human-readable page titles and breadcrumbs for any URL path
 */
export function getPageTitle(pathname: string): { title: string; category?: string } {
  if (pathname === '/app' || pathname === '/') return { title: 'Home' };
  
  // English Course track
  if (pathname.includes('/english/placement')) return { title: 'Placement Assessment', category: 'English Course' };
  if (pathname.includes('/english/course/lesson')) return { title: 'Lesson Runner', category: 'English Course' };
  if (pathname.includes('/english/course')) return { title: 'Curriculum & Units', category: 'English Course' };
  if (pathname.includes('/english/practice')) return { title: 'Practice Arena', category: 'English Course' };
  if (pathname.includes('/english/grammar')) return { title: 'Grammar Reference', category: 'English Course' };
  if (pathname.includes('/english/skills')) return { title: 'Reading & Listening', category: 'English Course' };
  if (pathname.includes('/english/speaking')) return { title: 'Speaking & Pronunciation', category: 'English Course' };
  if (pathname.includes('/english')) return { title: 'English Course Home', category: 'English' };

  // Shared tools
  if (pathname.includes('/dictionary')) return { title: 'English-Urdu Dictionary', category: 'Tools' };
  if (pathname.includes('/word-bank')) return { title: 'Personal Word Bank', category: 'Tools' };

  // IELTS track
  if (pathname.includes('/practice/smart')) return { title: 'Smart Practice', category: 'Practice' };
  if (pathname.includes('/practice/reading')) return { title: 'Reading Practice', category: 'Practice' };
  if (pathname.includes('/practice/listening')) return { title: 'Listening Practice', category: 'Practice' };
  if (pathname.includes('/practice/writing')) return { title: 'Writing Practice', category: 'Practice' };
  if (pathname.includes('/practice/speaking')) return { title: 'Speaking Practice', category: 'Practice' };
  if (pathname.includes('/practice')) return { title: 'Practice Modules', category: 'Learn' };
  if (pathname.includes('/mock')) return { title: 'Mock Exams', category: 'Learn' };
  if (pathname.includes('/vocab')) return { title: 'Vocabulary & Grammar', category: 'Learn' };
  if (pathname.includes('/grammar')) return { title: 'Grammar Modules', category: 'Learn' };
  if (pathname.includes('/plan')) return { title: 'Study Plan', category: 'Learn' };
  if (pathname.includes('/dashboard') || pathname.includes('/progress')) return { title: 'Performance Dashboard', category: 'Progress' };
  if (pathname.includes('/mistakes')) return { title: 'Mistake Notebook', category: 'Progress' };
  if (pathname.includes('/weekly-review')) return { title: 'Weekly Review', category: 'Progress' };
  if (pathname.includes('/achievements') || pathname.includes('/badges')) return { title: 'Achievements', category: 'Progress' };
  if (pathname.includes('/settings') || pathname.includes('/profile')) return { title: 'Settings' };
  if (pathname.includes('/about')) return { title: 'About Zarii' };
  if (pathname.includes('/privacy')) return { title: 'Privacy Policy' };
  if (pathname.includes('/terms')) return { title: 'Terms of Service' };
  if (pathname.includes('/faq')) return { title: 'FAQ & Help' };
  if (pathname.includes('/contact')) return { title: 'Contact' };
  return { title: 'Zarii' };
}
