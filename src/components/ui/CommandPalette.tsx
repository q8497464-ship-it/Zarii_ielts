import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppStore } from '../../store/useAppStore';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  BookOpen,
  Headphones,
  PenTool,
  Mic,
  Layers,
  GraduationCap,
  FileSpreadsheet,
  BarChart3,
  Settings,
  Sparkles,
  Compass,
  ArrowRight,
  Sun,
  Moon,
  Home,
  CheckCircle2,
  Calendar,
  Award,
  LifeBuoy,
} from 'lucide-react';
import { Badge } from './Badge';
import { ReportProblemModal } from './ReportProblemModal';

interface CommandItem {
  id: string;
  title: string;
  subtitle?: string;
  category: 'Pages' | 'Reading Tests' | 'Listening Tests' | 'Writing & Speaking' | 'Actions & Tools';
  path?: string;
  icon: React.ReactNode;
  action?: () => void;
  keywords?: string[];
}

export function CommandPalette() {
  const navigate = useNavigate();
  const {
    isCommandPaletteOpen,
    setCommandPaletteOpen,
    theme,
    setTheme,
    addToast,
  } = useAppStore();

  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // Keyboard shortcut listener for Cmd+K / Ctrl+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setCommandPaletteOpen(!isCommandPaletteOpen);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isCommandPaletteOpen, setCommandPaletteOpen]);

  // Focus input when opened
  useEffect(() => {
    if (isCommandPaletteOpen) {
      setQuery('');
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isCommandPaletteOpen]);

  const allItems: CommandItem[] = [
    // Actions & Quick Tools
    {
      id: 'act-diagnostic',
      title: 'Start 25-Min Diagnostic Test',
      subtitle: 'Benchmark all 4 skills to generate adaptive study plan',
      category: 'Actions & Tools',
      path: '/diagnostic',
      icon: <Compass className="w-4 h-4 text-teal-500" />,
      keywords: ['benchmark', 'level', 'placement', 'test', 'diagnostic'],
    },
    {
      id: 'act-mock',
      title: 'Launch Full Timed Mock Exam',
      subtitle: 'Listening, Reading, Writing & Speaking with official timer',
      category: 'Actions & Tools',
      path: '/mock',
      icon: <FileSpreadsheet className="w-4 h-4 text-brand-600" />,
      keywords: ['mock', 'exam', 'full', 'cambridge', 'timed', 'test'],
    },
    {
      id: 'act-theme',
      title: `Switch Theme (Currently ${theme})`,
      subtitle: 'Toggle light, dark, or system appearance mode',
      category: 'Actions & Tools',
      action: () => {
        const next = theme === 'light' ? 'dark' : 'light';
        setTheme(next);
        addToast({
          type: 'info',
          title: 'Theme Updated',
          message: `Switched to ${next} mode.`,
        });
      },
      icon: theme === 'dark' ? <Sun className="w-4 h-4 text-amber-500" /> : <Moon className="w-4 h-4 text-brand-400" />,
      keywords: ['theme', 'dark', 'light', 'mode', 'color'],
    },
    {
      id: 'act-report-problem',
      title: 'Report a Problem or Bug',
      subtitle: 'Generate system diagnostics and open GitHub issue or email support',
      category: 'Actions & Tools',
      action: () => setIsReportModalOpen(true),
      icon: <LifeBuoy className="w-4 h-4 text-teal-600" />,
      keywords: ['bug', 'error', 'report', 'problem', 'support', 'issue', 'help', 'feedback'],
    },

    // Main Pages
    {
      id: 'page-home',
      title: 'Home Dashboard',
      subtitle: 'Today’s schedule, countdown, and core skill practice',
      category: 'Pages',
      path: '/',
      icon: <Home className="w-4 h-4 text-teal-600" />,
      keywords: ['home', 'dashboard', 'overview'],
    },
    {
      id: 'page-smart-practice',
      title: 'Smart Practice (Adaptive Weakness Targeting)',
      subtitle: 'Automatically targets your weakest question types and adapts difficulty',
      category: 'Pages',
      path: '/practice/smart',
      icon: <Sparkles className="w-4 h-4 text-teal-600" />,
      keywords: ['smart', 'adaptive', 'weakness', 'practice', 'target', 'difficulty'],
    },
    {
      id: 'page-mistakes',
      title: 'Mistake Notebook (Error Review & Retries)',
      subtitle: 'Review wrong answers with examiner explanations and retry errors',
      category: 'Pages',
      path: '/mistakes',
      icon: <CheckCircle2 className="w-4 h-4 text-rose-600" />,
      keywords: ['mistakes', 'errors', 'wrong', 'retry', 'notebook', 'review'],
    },
    {
      id: 'page-lessons',
      title: 'Question-Type Strategy Mini-Lessons',
      subtitle: '3-minute strategy lessons with common traps and 3-question practice',
      category: 'Pages',
      path: '/lessons',
      icon: <BookOpen className="w-4 h-4 text-teal-600" />,
      keywords: ['lessons', 'strategies', 'traps', 'true false', 'headings', 'mini-lessons'],
    },
    {
      id: 'page-weekly-review',
      title: 'Weekly Performance & Adaptive Review',
      subtitle: 'Past 7 days progress, quantifiable improvements and next week goals',
      category: 'Pages',
      path: '/weekly-review',
      icon: <Calendar className="w-4 h-4 text-sky-600" />,
      keywords: ['weekly', 'review', 'report', 'progress', 'goals', 'summary'],
    },
    {
      id: 'page-achievements',
      title: 'Achievements & Badge Gallery (30 Badges)',
      subtitle: 'Track your streaks, XP, level ranks, and weekly study challenges',
      category: 'Pages',
      path: '/achievements',
      icon: <Award className="w-4 h-4 text-amber-500" />,
      keywords: ['achievements', 'badges', 'xp', 'streak', 'levels', 'gamification', 'trophy'],
    },
    {
      id: 'page-practice',
      title: 'All Skill Practice Modules',
      subtitle: 'Targeted sub-test practice hub',
      category: 'Pages',
      path: '/practice',
      icon: <BookOpen className="w-4 h-4 text-teal-600" />,
      keywords: ['practice', 'skills', 'modules'],
    },
    {
      id: 'page-vocab',
      title: 'Academic Vocabulary (300 Words)',
      subtitle: 'SM-2 spaced repetition flashcards, quizzes & word bank',
      category: 'Pages',
      path: '/vocab',
      icon: <Layers className="w-4 h-4 text-brand-700" />,
      keywords: ['vocab', 'flashcards', 'words', 'urdu', 'quiz', 'sm2'],
    },
    {
      id: 'page-grammar',
      title: 'Grammar Masterclass (15 Lessons)',
      subtitle: '150 interactive grammar exercises with instant feedback',
      category: 'Pages',
      path: '/grammar',
      icon: <GraduationCap className="w-4 h-4 text-emerald-600" />,
      keywords: ['grammar', 'lessons', 'tenses', 'passive', 'conditionals', 'exercises'],
    },
    {
      id: 'page-plan',
      title: 'Personalized Adaptive Study Plan',
      subtitle: 'Day-by-day task breakdown calibrated to your target date',
      category: 'Pages',
      path: '/plan',
      icon: <Calendar className="w-4 h-4 text-orange-600" />,
      keywords: ['plan', 'schedule', 'tasks', 'calendar'],
    },
    {
      id: 'page-dashboard',
      title: 'Performance & Analytics Dashboard',
      subtitle: 'Band score trends, weakness reports & skill radar',
      category: 'Pages',
      path: '/dashboard',
      icon: <BarChart3 className="w-4 h-4 text-purple-600" />,
      keywords: ['stats', 'analytics', 'charts', 'trends', 'score'],
    },
    {
      id: 'page-settings',
      title: 'Settings & Free AI Configuration',
      subtitle: 'Target band, exam date, BYO Gemini/Groq key & offline backup',
      category: 'Pages',
      path: '/settings',
      icon: <Settings className="w-4 h-4 text-slate-600" />,
      keywords: ['settings', 'profile', 'api', 'gemini', 'groq', 'backup'],
    },
    {
      id: 'page-design',
      title: 'Design System & Component Catalog',
      subtitle: 'Explore color swatches, buttons, form inputs & tokens',
      category: 'Pages',
      path: '/design-system',
      icon: <Sparkles className="w-4 h-4 text-teal-500" />,
      keywords: ['design', 'system', 'components', 'tokens', 'colors'],
    },
    {
      id: 'page-landing',
      title: 'Welcome & Landing Page',
      subtitle: 'Product overview, methodology, benefits & FAQ',
      category: 'Pages',
      path: '/welcome',
      icon: <GraduationCap className="w-4 h-4 text-brand-700" />,
      keywords: ['landing', 'welcome', 'about', 'features', 'benefits', 'faq', 'overview'],
    },

    // Reading Tests
    {
      id: 'read-acad-01',
      title: 'Academic Reading Test 1',
      subtitle: 'Bilingual Brain • Vertical Farming • Biomimicry (40 Questions)',
      category: 'Reading Tests',
      path: '/practice/reading/test/acad-reading-01',
      icon: <BookOpen className="w-4 h-4 text-teal-600" />,
      keywords: ['reading', 'academic', 'test 1', 'passages'],
    },
    {
      id: 'read-acad-02',
      title: 'Academic Reading Test 2',
      subtitle: 'Cognitive Plasticity • Microplastics • Space Physiology (40 Questions)',
      category: 'Reading Tests',
      path: '/practice/reading/test/acad-reading-02',
      icon: <BookOpen className="w-4 h-4 text-teal-600" />,
      keywords: ['reading', 'academic', 'test 2'],
    },
    {
      id: 'read-acad-03',
      title: 'Academic Reading Test 3',
      subtitle: 'Underwater Archaeology • Sleep Neuroscience • Ancient Qanats (40 Questions)',
      category: 'Reading Tests',
      path: '/practice/reading/test/acad-reading-03',
      icon: <BookOpen className="w-4 h-4 text-teal-600" />,
      keywords: ['reading', 'academic', 'test 3', 'archaeology'],
    },
    {
      id: 'read-acad-04',
      title: 'Academic Reading Test 4',
      subtitle: 'Agricultural Robotics • Language Evolution • Glaciology & Ice Cores (40 Questions)',
      category: 'Reading Tests',
      path: '/practice/reading/test/acad-reading-04',
      icon: <BookOpen className="w-4 h-4 text-teal-600" />,
      keywords: ['reading', 'academic', 'test 4', 'robotics'],
    },
    {
      id: 'read-gen-01',
      title: 'General Training Reading Test 1',
      subtitle: 'Workplace Ergonomics • Public Library Services • History of Postal Service (20 Qs)',
      category: 'Reading Tests',
      path: '/practice/reading/test/gen-reading-01',
      icon: <BookOpen className="w-4 h-4 text-teal-600" />,
      keywords: ['reading', 'general', 'gt', 'test 1'],
    },
    {
      id: 'read-gen-02',
      title: 'General Training Reading Test 2',
      subtitle: 'Leisure Pavilion & Recycling • Digital Lending • Modern Postal Courier Logistics',
      category: 'Reading Tests',
      path: '/practice/reading/test/gen-reading-02',
      icon: <BookOpen className="w-4 h-4 text-teal-600" />,
      keywords: ['reading', 'general', 'gt', 'test 2'],
    },

    // Listening Tests
    {
      id: 'list-01',
      title: 'Listening Practice Test 1',
      subtitle: 'Student Flat Rental • Botanic Garden Tour • Micro-Grid • Bioluminescence',
      category: 'Listening Tests',
      path: '/practice/listening/test/list-test-01',
      icon: <Headphones className="w-4 h-4 text-purple-600" />,
      keywords: ['listening', 'test 1', 'audio', 'flat rental'],
    },
    {
      id: 'list-02',
      title: 'Listening Practice Test 2',
      subtitle: 'Bike Co-op Repair • Arts Festival Volunteer • Marine Biology • Geothermal Energy',
      category: 'Listening Tests',
      path: '/practice/listening/test/list-test-02',
      icon: <Headphones className="w-4 h-4 text-purple-600" />,
      keywords: ['listening', 'test 2', 'bicycle'],
    },
    {
      id: 'list-03',
      title: 'Listening Practice Test 3',
      subtitle: 'Campervan Hire • Glasshouse Tour • Micro-Hydro Turbine • Marine Cold Light',
      category: 'Listening Tests',
      path: '/practice/listening/test/list-test-03',
      icon: <Headphones className="w-4 h-4 text-purple-600" />,
      keywords: ['listening', 'test 3', 'campervan'],
    },
    {
      id: 'list-04',
      title: 'Listening Practice Test 4',
      subtitle: 'Cycling Club Membership • Watermill Museum • Spaced Repetition • Bronze Age Tin',
      category: 'Listening Tests',
      path: '/practice/listening/test/list-test-04',
      icon: <Headphones className="w-4 h-4 text-purple-600" />,
      keywords: ['listening', 'test 4', 'cycling'],
    },
    {
      id: 'list-05',
      title: 'Listening Practice Test 5',
      subtitle: 'Academic Conference Booking • Glencree Trail • Microfinance • Avian Migration',
      category: 'Listening Tests',
      path: '/practice/listening/test/list-test-05',
      icon: <Headphones className="w-4 h-4 text-purple-600" />,
      keywords: ['listening', 'test 5', 'conference'],
    },

    // Writing & Speaking
    {
      id: 'ws-writing',
      title: 'Writing Task 1 & Task 2 Practice',
      subtitle: '50 original prompts with Band 8+ models and 4-criterion evaluator',
      category: 'Writing & Speaking',
      path: '/practice/writing',
      icon: <PenTool className="w-4 h-4 text-orange-600" />,
      keywords: ['writing', 'task 1', 'task 2', 'essay', 'prompts'],
    },
    {
      id: 'ws-speaking-mock',
      title: 'Speaking Mock Exam Simulator',
      subtitle: 'Part 1, Part 2 (60s prep + 2 min talk), and Part 3 with speech synthesis',
      category: 'Writing & Speaking',
      path: '/practice/speaking/mock',
      icon: <Mic className="w-4 h-4 text-rose-600" />,
      keywords: ['speaking', 'mock', 'part 1', 'part 2', 'part 3', 'cue card'],
    },
    {
      id: 'ws-speaking-part1',
      title: 'Speaking Part 1 Drill',
      subtitle: '20 topics with 6 questions each (Home, Study, Work, Travel, Food, etc.)',
      category: 'Writing & Speaking',
      path: '/practice/speaking/part1',
      icon: <Mic className="w-4 h-4 text-rose-600" />,
      keywords: ['speaking', 'part 1'],
    },
    {
      id: 'ws-speaking-part2',
      title: 'Speaking Part 2 Cue Cards',
      subtitle: '30 cue cards with countdown notes and 2-minute speaking timer',
      category: 'Writing & Speaking',
      path: '/practice/speaking/part2',
      icon: <Mic className="w-4 h-4 text-rose-600" />,
      keywords: ['speaking', 'part 2', 'cue card'],
    },
    {
      id: 'ws-speaking-shadow',
      title: 'Pronunciation Shadowing Studio',
      subtitle: 'Improve intonation, rhythm, and stress by shadowing native speakers',
      category: 'Writing & Speaking',
      path: '/practice/speaking/shadowing',
      icon: <Mic className="w-4 h-4 text-rose-600" />,
      keywords: ['shadowing', 'pronunciation', 'accent'],
    },
  ];

  const filteredItems = allItems.filter((item) => {
    if (!query.trim()) return true;
    const q = query.toLowerCase().trim();
    const titleMatch = item.title.toLowerCase().includes(q);
    const subMatch = item.subtitle?.toLowerCase().includes(q);
    const catMatch = item.category.toLowerCase().includes(q);
    const keywordMatch = item.keywords?.some((k) => k.toLowerCase().includes(q));
    return titleMatch || subMatch || catMatch || keywordMatch;
  });

  const handleSelect = (item: CommandItem) => {
    setCommandPaletteOpen(false);
    if (item.action) {
      item.action();
    } else if (item.path) {
      navigate(item.path);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % (filteredItems.length || 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + filteredItems.length) % (filteredItems.length || 1));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (filteredItems[selectedIndex]) {
        handleSelect(filteredItems[selectedIndex]);
      }
    } else if (e.key === 'Escape') {
      e.preventDefault();
      setCommandPaletteOpen(false);
    }
  };

  return (
    <>
      <AnimatePresence>
      {isCommandPaletteOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center p-4 sm:p-6 sm:pt-20">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm"
            onClick={() => setCommandPaletteOpen(false)}
          />

          {/* Dialog Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: -8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -8 }}
            transition={{ duration: 0.18, ease: 'easeOut' }}
            className="relative z-10 w-full max-w-2xl rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-modal overflow-hidden flex flex-col max-h-[80vh]"
          >
            {/* Search Input Bar */}
            <div className="flex items-center gap-3 px-4 py-3.5 border-b border-slate-100 dark:border-slate-800">
              <Search className="w-5 h-5 text-slate-400 shrink-0" />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setSelectedIndex(0);
                }}
                onKeyDown={handleKeyDown}
                placeholder="Type a command, test name, topic, or search (e.g. 'reading 3', 'vocab', 'theme')..."
                className="flex-1 bg-transparent text-sm text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none"
              />
              <span className="text-2xs font-mono font-bold px-1.5 py-0.5 rounded border border-slate-200 dark:border-slate-700 text-slate-400">
                ESC
              </span>
            </div>

            {/* Results List */}
            <div className="flex-1 overflow-y-auto p-2 divide-y divide-slate-100 dark:divide-slate-800/40">
              {filteredItems.length === 0 ? (
                <div className="py-12 text-center text-sm text-slate-400">
                  No matching tests or commands found for &ldquo;{query}&rdquo;
                </div>
              ) : (
                filteredItems.map((item, idx) => {
                  const isSelected = idx === selectedIndex;
                  return (
                    <div
                      key={item.id}
                      onClick={() => handleSelect(item)}
                      onMouseEnter={() => setSelectedIndex(idx)}
                      className={`flex items-center justify-between gap-3 p-3 rounded-xl cursor-pointer transition-colors ${
                        isSelected
                          ? 'bg-teal-50 dark:bg-teal-950/40 text-teal-900 dark:text-teal-100'
                          : 'hover:bg-slate-50 dark:hover:bg-slate-800/60 text-slate-800 dark:text-slate-200'
                      }`}
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <div
                          className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                            isSelected
                              ? 'bg-teal-600 text-white'
                              : 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400'
                          }`}
                        >
                          {item.icon}
                        </div>
                        <div className="min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="font-semibold text-sm truncate">{item.title}</span>
                            <Badge variant="outline" size="xs">
                              {item.category}
                            </Badge>
                          </div>
                          {item.subtitle && (
                            <p className="text-xs text-slate-500 dark:text-slate-400 truncate mt-0.5">
                              {item.subtitle}
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="shrink-0 flex items-center gap-1.5 text-xs text-slate-400">
                        {isSelected && <ArrowRight className="w-4 h-4 text-teal-600 dark:text-teal-400" />}
                      </div>
                    </div>
                  );
                })
              )}
            </div>

            {/* Footer Navigation Hints */}
            <div className="px-4 py-2.5 bg-slate-50 dark:bg-slate-900/60 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-2xs text-slate-400">
              <div className="flex items-center gap-3">
                <span>
                  <kbd className="font-mono font-bold px-1 py-0.5 rounded border border-slate-200 dark:border-slate-700 mr-1">↑</kbd>
                  <kbd className="font-mono font-bold px-1 py-0.5 rounded border border-slate-200 dark:border-slate-700 mr-1">↓</kbd>
                  to navigate
                </span>
                <span>
                  <kbd className="font-mono font-bold px-1.5 py-0.5 rounded border border-slate-200 dark:border-slate-700 mr-1">↵</kbd>
                  to select
                </span>
              </div>
              <span className="hidden sm:inline">Press <strong>Ctrl/Cmd + K</strong> anytime</span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>

    <ReportProblemModal
      isOpen={isReportModalOpen}
      onClose={() => setIsReportModalOpen(false)}
    />
  </>
  );
}
