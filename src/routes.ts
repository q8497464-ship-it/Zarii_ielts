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
  type LucideIcon,
} from 'lucide-react';

export interface RouteConfig {
  path: string;
  name: string;
  category?: 'Learn' | 'Progress' | 'Account' | 'System' | 'Exam';
  icon: LucideIcon;
  exact?: boolean;
  end?: boolean;
  inSidebar?: boolean;
  inBottomNav?: boolean;
  badge?: string;
  shortcut?: string;
  description?: string;
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
  },
  {
    path: '/practice',
    name: 'Practice',
    category: 'Learn',
    icon: BookOpen,
    inSidebar: true,
    inBottomNav: true,
    description: 'All 4 IELTS modules: Reading, Listening, Writing, and Speaking',
  },
  {
    path: '/mock',
    name: 'Mock Tests',
    category: 'Learn',
    icon: FileSpreadsheet,
    inSidebar: true,
    inBottomNav: false,
    description: 'Full 3-hour computer-delivered IELTS exam simulation under timed test conditions',
  },
  {
    path: '/vocab',
    name: 'Vocabulary',
    category: 'Learn',
    icon: Layers,
    inSidebar: true,
    inBottomNav: true,
    description: 'Academic word list with SM-2 spaced repetition, flashcards, and quizzes',
  },
  {
    path: '/plan',
    name: 'Study Plan',
    category: 'Learn',
    icon: Sparkles,
    inSidebar: true,
    inBottomNav: false,
    description: 'Adaptive study timetable tailored to your official exam date and target band',
  },
  {
    path: '/dashboard',
    name: 'Progress',
    category: 'Progress',
    icon: BarChart3,
    inSidebar: true,
    inBottomNav: true,
    description: 'Estimated overall band score, skill breakdown radar, and attempt logs',
  },
  {
    path: '/settings',
    name: 'Profile & Settings',
    category: 'Account',
    icon: User,
    inSidebar: true,
    inBottomNav: true,
    description: 'Candidate profile, reading typography, theme, timers, and data export',
  },

  // Deep Module Routes
  {
    path: '/practice/reading',
    name: 'Reading Practice',
    category: 'Learn',
    icon: BookOpen,
    description: 'Authentic 3-passage academic and general reading tests with text highlighting',
  },
  {
    path: '/practice/listening',
    name: 'Listening Practice',
    category: 'Learn',
    icon: Headphones,
    description: '4-section audio recordings with native accents and question type drills',
  },
  {
    path: '/practice/writing',
    name: 'Writing Practice',
    category: 'Learn',
    icon: PenTool,
    description: 'Task 1 visual graphs/letters and Task 2 academic essays with examiner rubrics',
  },
  {
    path: '/practice/speaking',
    name: 'Speaking Practice',
    category: 'Learn',
    icon: Mic,
    description: 'Part 1, 2, 3 voice recording simulator with speech recognition transcript',
  },
  {
    path: '/practice/smart',
    name: 'Smart Adaptive Practice',
    category: 'Learn',
    icon: Sparkles,
    description: 'Personalized drills targeting your weakest question types',
  },
  {
    path: '/diagnostic',
    name: 'Diagnostic Exam',
    category: 'Learn',
    icon: Compass,
    description: 'Baseline assessment estimating your current band score in 30 minutes',
  },
  {
    path: '/mistakes',
    name: 'Mistake Notebook',
    category: 'Progress',
    icon: RotateCcw,
    description: 'Review every question you got wrong with explanations and retry mode',
  },
  {
    path: '/lessons',
    name: 'Strategy Lessons',
    category: 'Learn',
    icon: Lightbulb,
    description: 'Tactical mini-lessons covering examiner traps and timing benchmarks',
  },
];

/**
 * Desktop Sidebar Navigation Groups
 * Strict hierarchical order adhering to Zarii design standards
 */
export const MAIN_NAVIGATION: NavGroupConfig[] = [
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
 * Mobile Bottom Bar Items
 * Exactly 5 essential items for touch ergonomics
 */
export const MOBILE_NAV_ITEMS = [
  { name: 'Home', path: '/app', icon: Home },
  { name: 'Practice', path: '/app/practice', icon: BookOpen },
  { name: 'Vocabulary', path: '/app/vocab', icon: Layers },
  { name: 'Progress', path: '/app/dashboard', icon: BarChart3 },
  { name: 'Profile', path: '/app/settings', icon: User },
];

/**
 * Empty bottom navigation for desktop sidebar (so user profile card sits alone at bottom)
 */
export const BOTTOM_NAVIGATION: RouteConfig[] = [];

/**
 * Resolves human-readable page titles and breadcrumbs for any URL path
 */
export function getPageTitle(pathname: string): { title: string; category?: string } {
  if (pathname === '/app' || pathname === '/') return { title: 'Home' };
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
  return { title: 'Zarii IELTS' };
}
