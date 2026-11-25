import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Check,
  CheckCircle2,
  ChevronDown,
  Menu,
  X,
  Sun,
  Moon,
  ArrowRight,
  ArrowUp,
  Headphones,
  BookOpen,
  PenTool,
  Mic,
  ShieldCheck,
  Zap,
  Layers,
  Calendar,
  Sparkles,
  BarChart3,
  RotateCcw,
  WifiOff,
  Lock,
  Globe,
  HelpCircle,
  Target,
  Clock,
  Award,
  Volume2,
  Languages,
  Compass,
} from 'lucide-react';
import { ZariiLogo } from '../components/ui/ZariiLogo';
import { useAppStore } from '../store/useAppStore';
import { LANDING_COPY } from './copy';
import {
  HeroDashboardMockup,
  SplitScreenReadingMockup,
  AiFeedbackCriteriaMockup,
  StudyPlanTimetableMockup,
  MistakeNotebookMockup,
} from './components/LandingMockups';
import { LandingFooter } from './components/LandingFooter';

type TargetBandKey = '6.5' | '7.0' | '7.5' | '8.0+';

interface BandRoadmapItem {
  band: string;
  tag: string;
  targetFor: string;
  listeningRaw: string;
  readingRaw: string;
  writingFocus: string;
  speakingFocus: string;
  weeklyHours: string;
  duration: string;
  keyStrategy: string;
}

const BAND_ROADMAPS: Record<TargetBandKey, BandRoadmapItem> = {
  '6.5': {
    band: 'Band 6.5',
    tag: 'Competent User',
    targetFor: 'Undergraduate admissions & Skilled Worker visas',
    listeningRaw: '26–29 / 40 correct',
    readingRaw: '27–29 / 40 (Academic) • 32–33 / 40 (General)',
    writingFocus: 'Clear position throughout. Uses a mix of simple and complex sentence forms with generally good paragraphing.',
    speakingFocus: 'Willing to speak at length with occasional pauses for language search. Pronunciation is generally clear.',
    weeklyHours: '4–6 hours / week',
    duration: '4–6 weeks',
    keyStrategy: 'Master basic IELTS question formats and avoid spelling traps in Listening Section 1 & 2.',
  },
  '7.0': {
    band: 'Band 7.0',
    tag: 'Good User',
    targetFor: 'Standard university requirement (UK, Canada, Australia) & professional registration',
    listeningRaw: '30–31 / 40 correct',
    readingRaw: '30–32 / 40 (Academic) • 34–35 / 40 (General)',
    writingFocus: 'Clear overview in Task 1, well-structured logical paragraphs in Task 2. Uses varied vocabulary and complex structures with infrequent errors.',
    speakingFocus: 'Speaks at length without noticeable effort. Uses a range of discourse markers and idiomatic phrases with good grammatical control.',
    weeklyHours: '6–8 hours / week',
    duration: '6–8 weeks',
    keyStrategy: 'Eliminate True/False/Not Given traps in Reading Passage 3 and practice 40-minute timed Task 2 essays.',
  },
  '7.5': {
    band: 'Band 7.5',
    tag: 'Advanced User',
    targetFor: 'Ivy League, Oxford, Cambridge, and medical/nursing council registrations',
    listeningRaw: '32–34 / 40 correct',
    readingRaw: '33–34 / 40 (Academic) • 36–37 / 40 (General)',
    writingFocus: 'Skillfully uses uncommon lexical items with sophisticated control of grammar and cohesion across both Task 1 & Task 2.',
    speakingFocus: 'Natural fluency with native-like idiom usage, flexible discourse markers, and clear intonation.',
    weeklyHours: '8–10 hours / week',
    duration: '8–10 weeks',
    keyStrategy: 'Refine academic collocation precision in Writing Task 2 and simulate full 14-minute speaking interviews with cue cards.',
  },
  '8.0+': {
    band: 'Band 8.0+',
    tag: 'Very Good / Expert',
    targetFor: 'Maximum immigration points (Canada Express Entry CLB 10) & academic careers',
    listeningRaw: '35–38 / 40 correct',
    readingRaw: '35–37 / 40 (Academic) • 38–39 / 40 (General)',
    writingFocus: 'Sophisticated style, precise tone, and near-flawless paragraphing. Complex sentences handled with full flexibility.',
    speakingFocus: 'Effortless fluency with rich vocabulary, natural nuance, and precise idiomatic expressiveness.',
    weeklyHours: '10–12 hours / week',
    duration: '10–12 weeks',
    keyStrategy: 'Focus on high-speed Reading Passage skimming and zero-hesitation cue card speech structuring.',
  },
};

export function LandingPage() {
  const { theme, setTheme } = useAppStore();

  const [isScrolled, setIsScrolled] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const [selectedBand, setSelectedBand] = useState<TargetBandKey>('7.0');
  const currentRoadmap = BAND_ROADMAPS[selectedBand];

  // Monitor scroll for sticky navbar glassmorphism and Back to top button
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 16);
      setShowBackToTop(window.scrollY > 600);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Set document title and SEO meta
  useEffect(() => {
    document.title = 'Zarii | Learn English. Reach your IELTS goal.';
  }, []);

  // Close mobile drawer on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMobileMenuOpen(false);
    };
    if (mobileMenuOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  const toggleTheme = () => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
  };

  const scrollToAnchor = (anchor: string) => {
    setMobileMenuOpen(false);
    const element = document.querySelector(anchor);
    if (element) {
      const prefersReducedMotion =
        typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      element.scrollIntoView({
        behavior: prefersReducedMotion ? 'auto' : 'smooth',
        block: 'start',
      });
    }
  };

  // Structured Data (Schema.org Organization & FAQPage JSON-LD)
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: LANDING_COPY.faq.items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };

  const getModuleIcon = (id: string) => {
    switch (id) {
      case 'listening':
        return <Headphones className="w-5 h-5 text-[#0F8B8D]" />;
      case 'reading':
        return <BookOpen className="w-5 h-5 text-[#124F40] dark:text-[#5BB78D]" />;
      case 'writing':
        return <PenTool className="w-5 h-5 text-[#D97706]" />;
      case 'speaking':
        return <Mic className="w-5 h-5 text-[#E05A47]" />;
      default:
        return <Sparkles className="w-5 h-5 text-[#5BB78D]" />;
    }
  };

  const getWhyIcon = (id: string) => {
    switch (id) {
      case 'why-free':
        return <Zap className="w-5 h-5 text-[#124F40] dark:text-[#5BB78D]" />;
      case 'why-original':
        return <BookOpen className="w-5 h-5 text-[#124F40] dark:text-[#5BB78D]" />;
      case 'why-offline':
        return <WifiOff className="w-5 h-5 text-[#124F40] dark:text-[#5BB78D]" />;
      case 'why-vocab':
        return <Layers className="w-5 h-5 text-[#124F40] dark:text-[#5BB78D]" />;
      case 'why-notebook':
        return <RotateCcw className="w-5 h-5 text-[#124F40] dark:text-[#5BB78D]" />;
      case 'why-privacy':
        return <Lock className="w-5 h-5 text-[#124F40] dark:text-[#5BB78D]" />;
      default:
        return <ShieldCheck className="w-5 h-5 text-[#124F40] dark:text-[#5BB78D]" />;
    }
  };

  return (
    <div className="min-h-screen bg-[#F7FAF8] dark:bg-[#0B1612] text-slate-900 dark:text-slate-100 font-sans selection:bg-[#5BB78D]/30 selection:text-[#124F40] antialiased">
      {/* Schema.org JSON-LD Script */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* Skip to Main Content Link for Accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 z-50 px-4 py-2 bg-[#124F40] text-white font-bold rounded-lg shadow-xl outline-none ring-2 ring-[#5BB78D]"
      >
        Skip to main content
      </a>

      {/* =================================================================== */}
      {/* A. STICKY NAVBAR (72px)                                             */}
      {/* =================================================================== */}
      <header
        className={`fixed top-0 left-0 right-0 z-40 h-[72px] transition-all duration-200 select-none ${
          isScrolled
            ? 'bg-white/90 dark:bg-[#112019]/90 backdrop-blur-md shadow-xs border-b border-slate-200/60 dark:border-white/5'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-[1200px] h-full mx-auto px-4 sm:px-6 flex items-center justify-between">
          {/* Left: Brand Logo */}
          <Link
            to="/"
            className="flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-[#5BB78D] rounded-lg p-1"
            aria-label="Zarii Home"
          >
            <ZariiLogo variant="mark-wordmark" size="md" />
          </Link>

          {/* Center: Anchor Navigation Links (Desktop) */}
          <nav className="hidden md:flex items-center gap-8" aria-label="Main Navigation">
            {LANDING_COPY.navbar.links.map((link) => (
              <button
                key={link.name}
                type="button"
                onClick={() => scrollToAnchor(link.href)}
                className="text-sm font-semibold text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white transition-colors cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#5BB78D] rounded-md px-1"
              >
                {link.name}
              </button>
            ))}
          </nav>

          {/* Right: Actions & Theme Toggle */}
          <div className="hidden md:flex items-center gap-3">
            <button
              type="button"
              onClick={toggleTheme}
              aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
              className="p-2 rounded-xl text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors focus:outline-none focus:ring-2 focus:ring-[#5BB78D] cursor-pointer"
            >
              {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-300" /> : <Moon className="w-4 h-4" />}
            </button>

            <Link
              to="/login"
              className="h-10 px-4 text-xs font-bold text-slate-700 hover:text-slate-900 dark:text-slate-200 dark:hover:text-white border border-slate-300 dark:border-white/20 hover:border-slate-400 dark:hover:border-white/40 rounded-xl transition-all flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-[#5BB78D]"
            >
              Log in
            </Link>
            <Link
              to="/signup"
              className="h-10 px-5 bg-[#124F40] hover:bg-[#0E3D32] active:bg-[#0A2E25] text-white font-bold text-xs rounded-xl flex items-center justify-center transition-all shadow-sm focus:outline-none focus:ring-2 focus:ring-[#5BB78D]"
            >
              Sign up
            </Link>
          </div>

          {/* Mobile Hamburger Button */}
          <div className="flex md:hidden items-center gap-2">
            <button
              type="button"
              onClick={toggleTheme}
              aria-label="Toggle theme"
              className="p-2 text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
            >
              {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-300" /> : <Moon className="w-4 h-4" />}
            </button>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Open mobile navigation menu"
              className="p-2 rounded-xl text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors focus:outline-none focus:ring-2 focus:ring-[#5BB78D]"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Full-Height Drawer Overlay */}
      {mobileMenuOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Mobile Navigation Drawer"
          className="fixed inset-0 z-50 flex flex-col bg-white dark:bg-[#112019] p-6 animate-zarii-fade"
        >
          <div className="flex items-center justify-between pb-6 border-b border-slate-200 dark:border-white/10">
            <ZariiLogo variant="mark-wordmark" size="sm" />
            <button
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              aria-label="Close navigation drawer"
              className="p-2 rounded-xl text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <nav className="flex-1 flex flex-col justify-center space-y-6 text-center py-8">
            {LANDING_COPY.navbar.links.map((link) => (
              <button
                key={link.name}
                type="button"
                onClick={() => scrollToAnchor(link.href)}
                className="text-lg font-bold text-slate-800 dark:text-slate-100 hover:text-[#124F40] dark:hover:text-[#5BB78D] transition-colors py-2"
              >
                {link.name}
              </button>
            ))}
          </nav>

          <div className="space-y-3 pt-4 border-t border-slate-200 dark:border-white/10">
            <Link
              to="/login"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full h-11 border border-slate-300 dark:border-white/20 hover:border-slate-400 dark:hover:border-white/40 text-slate-800 dark:text-slate-100 font-bold text-sm rounded-xl flex items-center justify-center transition-colors"
            >
              Log in
            </Link>
            <Link
              to="/signup"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full h-12 bg-[#124F40] hover:bg-[#0E3D32] text-white font-bold text-sm rounded-xl flex items-center justify-center shadow-md transition-colors"
            >
              Sign up
            </Link>
          </div>
        </div>
      )}

      {/* =================================================================== */}
      {/* MAIN CONTENT                                                        */}
      {/* =================================================================== */}
      <main id="main-content" className="pt-[72px]">
        {/* =================================================================== */}
        {/* B. HERO SECTION                                                     */}
        {/* =================================================================== */}
        <section
          aria-labelledby="hero-heading"
          className="relative pt-12 pb-20 sm:pt-20 sm:pb-28 overflow-hidden bg-gradient-to-b from-[#F7FAF8] via-white to-[#F7FAF8] dark:from-[#0B1612] dark:via-[#112019] dark:to-[#0B1612]"
        >
          {/* Faint Dot Grid Background */}
          <div
            className="absolute inset-0 pointer-events-none opacity-[0.03] dark:opacity-[0.05]"
            style={{
              backgroundImage: 'radial-gradient(#124F40 1px, transparent 1px)',
              backgroundSize: '24px 24px',
            }}
            aria-hidden="true"
          />

          <div className="max-w-[1200px] mx-auto px-4 sm:px-6 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
              {/* Left Column (55% on desktop) */}
              <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
                {/* Mint Pill Badge */}
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-[#5BB78D]/15 text-[#124F40] dark:text-[#5BB78D] border border-[#5BB78D]/25">
                  <Sparkles className="w-3.5 h-3.5 text-[#5BB78D]" />
                  <span>{LANDING_COPY.hero.badge}</span>
                </div>

                {/* Headline: H1 56px desktop / 36px mobile */}
                <h1
                  id="hero-heading"
                  className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.12]"
                >
                  {LANDING_COPY.hero.headlinePrefix}
                  <span className="relative inline-block text-[#124F40] dark:text-[#5BB78D]">
                    {LANDING_COPY.hero.headlineHighlight}
                    <svg
                      className="absolute -bottom-1.5 left-0 w-full h-2.5 text-[#5BB78D]/40 pointer-events-none"
                      viewBox="0 0 100 12"
                      preserveAspectRatio="none"
                      aria-hidden="true"
                    >
                      <path
                        d="M0,8 Q50,2 100,6"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="4"
                        strokeLinecap="round"
                      />
                    </svg>
                  </span>
                </h1>

                {/* Subtext: 20px, line-height 1.6, max 65 chars */}
                <p className="text-lg sm:text-xl text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl mx-auto lg:mx-0">
                  {LANDING_COPY.hero.subtext}
                </p>

                {/* Action Buttons */}
                <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5">
                  <Link
                    to="/signup"
                    className="w-full sm:w-auto h-12 px-8 bg-[#124F40] hover:bg-[#0E3D32] active:bg-[#0A2E25] text-white font-bold text-sm rounded-xl flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all focus:outline-none focus:ring-2 focus:ring-[#5BB78D] focus:ring-offset-2"
                  >
                    <span>{LANDING_COPY.hero.primaryCta}</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>

                  <Link
                    to="/login"
                    className="w-full sm:w-auto h-12 px-7 bg-white dark:bg-[#1A2E24] border border-slate-300 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-100 font-bold text-sm rounded-xl flex items-center justify-center transition-colors focus:outline-none focus:ring-2 focus:ring-[#5BB78D]"
                  >
                    {LANDING_COPY.hero.secondaryCta}
                  </Link>
                </div>

                {/* Trust Line Under Buttons */}
                <div className="flex items-center justify-center lg:justify-start gap-2 pt-1 text-xs text-slate-500 dark:text-slate-400">
                  <CheckCircle2 className="w-4 h-4 text-[#5BB78D] shrink-0" />
                  <span>{LANDING_COPY.hero.trustLine}</span>
                </div>
              </div>

              {/* Right Column (45% on desktop): Code-Built UI Mockup */}
              <div className="lg:col-span-5 flex justify-center lg:justify-end">
                <HeroDashboardMockup />
              </div>
            </div>
          </div>
        </section>

        {/* =================================================================== */}
        {/* C. KEY STATS / TRUST STRIP                                         */}
        {/* =================================================================== */}
        <section
          aria-label="Core platform assurances"
          className="py-8 border-y border-slate-200/80 dark:border-white/5 bg-white dark:bg-[#0E2018]"
        >
          <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
              {LANDING_COPY.trustStrip.map((stat) => (
                <div key={stat.id} className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#5BB78D]/15 text-[#124F40] dark:text-[#5BB78D] flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-4 h-4 stroke-[2.5]" />
                  </div>
                  <div>
                    <div className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white">
                      {stat.title}
                    </div>
                    <div className="text-2xs text-slate-500 dark:text-slate-400 mt-0.5 leading-snug">
                      {stat.description}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* =================================================================== */}
        {/* 1. TWO WAYS TO LEARN                                                */}
        {/* =================================================================== */}
        <section
          id="two-ways"
          aria-labelledby="two-ways-heading"
          className="scroll-mt-[72px] py-16 sm:py-24 bg-[#F7FAF8] dark:bg-[#0B1612]"
        >
          <div className="max-w-[1200px] mx-auto px-4 sm:px-6 space-y-12">
            <div className="text-center max-w-2xl mx-auto space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-[#5BB78D]">
                Personalized Learning Pathways
              </span>
              <h2
                id="two-ways-heading"
                className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight"
              >
                {LANDING_COPY.twoWaysToLearn.title}
              </h2>
              <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed">
                {LANDING_COPY.twoWaysToLearn.subtitle}
              </p>
            </div>

            {/* Two Large Cards */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
              {/* Card 1: English Course */}
              <div className="rounded-3xl p-7 sm:p-9 bg-white dark:bg-[#112019] border-2 border-[#5BB78D]/30 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between space-y-6 relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-36 h-36 bg-[#5BB78D]/10 rounded-bl-full pointer-events-none transition-transform group-hover:scale-110" />

                <div className="space-y-4 relative z-10">
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-2xl bg-[#5BB78D]/20 text-[#124F40] dark:text-[#5BB78D] flex items-center justify-center">
                      <BookOpen className="w-6 h-6" />
                    </div>
                    <span className="text-2xs font-bold uppercase tracking-widest px-3 py-1 rounded-full bg-emerald-500/15 text-emerald-800 dark:text-emerald-300 border border-emerald-500/25">
                      {LANDING_COPY.twoWaysToLearn.courseCard.levelRange}
                    </span>
                  </div>

                  <div>
                    <span className="text-xs font-bold text-[#5BB78D] uppercase tracking-wider">
                      {LANDING_COPY.twoWaysToLearn.courseCard.badge}
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mt-1">
                      {LANDING_COPY.twoWaysToLearn.courseCard.title}
                    </h3>
                  </div>

                  <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                    {LANDING_COPY.twoWaysToLearn.courseCard.description}
                  </p>

                  <ul className="space-y-3 pt-2 text-xs sm:text-sm text-slate-700 dark:text-slate-200">
                    {LANDING_COPY.twoWaysToLearn.courseCard.bullets.map((b, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <CheckCircle2 className="w-4 h-4 text-[#5BB78D] shrink-0 mt-0.5" />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-6 border-t border-slate-100 dark:border-white/5 relative z-10">
                  <Link
                    to="/signup"
                    className="w-full h-12 px-6 bg-[#124F40] hover:bg-[#0E3D32] text-white font-bold text-sm rounded-xl flex items-center justify-center gap-2 shadow-sm hover:shadow-md transition-all focus:outline-none focus:ring-2 focus:ring-[#5BB78D]"
                  >
                    <span>{LANDING_COPY.twoWaysToLearn.courseCard.ctaLabel}</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>

              {/* Card 2: IELTS Preparation */}
              <div className="rounded-3xl p-7 sm:p-9 bg-white dark:bg-[#112019] border-2 border-[#124F40]/30 dark:border-[#5BB78D]/30 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between space-y-6 relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-36 h-36 bg-[#124F40]/10 dark:bg-[#5BB78D]/10 rounded-bl-full pointer-events-none transition-transform group-hover:scale-110" />

                <div className="space-y-4 relative z-10">
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-2xl bg-[#124F40]/15 dark:bg-[#5BB78D]/20 text-[#124F40] dark:text-[#5BB78D] flex items-center justify-center">
                      <Target className="w-6 h-6" />
                    </div>
                    <span className="text-2xs font-bold uppercase tracking-widest px-3 py-1 rounded-full bg-[#124F40]/15 dark:bg-[#5BB78D]/20 text-[#124F40] dark:text-[#5BB78D] border border-[#124F40]/25 dark:border-[#5BB78D]/30">
                      {LANDING_COPY.twoWaysToLearn.ieltsCard.levelRange}
                    </span>
                  </div>

                  <div>
                    <span className="text-xs font-bold text-[#124F40] dark:text-[#5BB78D] uppercase tracking-wider">
                      {LANDING_COPY.twoWaysToLearn.ieltsCard.badge}
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mt-1">
                      {LANDING_COPY.twoWaysToLearn.ieltsCard.title}
                    </h3>
                  </div>

                  <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                    {LANDING_COPY.twoWaysToLearn.ieltsCard.description}
                  </p>

                  <ul className="space-y-3 pt-2 text-xs sm:text-sm text-slate-700 dark:text-slate-200">
                    {LANDING_COPY.twoWaysToLearn.ieltsCard.bullets.map((b, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <CheckCircle2 className="w-4 h-4 text-[#5BB78D] shrink-0 mt-0.5" />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-6 border-t border-slate-100 dark:border-white/5 relative z-10">
                  <Link
                    to="/signup"
                    className="w-full h-12 px-6 bg-[#124F40] hover:bg-[#0E3D32] text-white font-bold text-sm rounded-xl flex items-center justify-center gap-2 shadow-sm hover:shadow-md transition-all focus:outline-none focus:ring-2 focus:ring-[#5BB78D]"
                  >
                    <span>{LANDING_COPY.twoWaysToLearn.ieltsCard.ctaLabel}</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =================================================================== */}
        {/* 2. COMPLETE ENGLISH COURSE                                          */}
        {/* =================================================================== */}
        <section
          id="english-course"
          aria-labelledby="course-heading"
          className="scroll-mt-[72px] py-16 sm:py-24 bg-white dark:bg-[#0E2018] border-y border-slate-200/80 dark:border-white/5"
        >
          <div className="max-w-[1200px] mx-auto px-4 sm:px-6 space-y-12">
            <div className="text-center max-w-2xl mx-auto space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-[#5BB78D]">
                Structured CEFR Progression
              </span>
              <h2
                id="course-heading"
                className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight"
              >
                {LANDING_COPY.completeCourse.title}
              </h2>
              <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed">
                {LANDING_COPY.completeCourse.subtitle}
              </p>
            </div>

            {/* 5 Levels Stepper Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 sm:gap-5">
              {LANDING_COPY.completeCourse.levels.map((lvl, idx) => (
                <div
                  key={lvl.level}
                  className="p-5 rounded-2xl bg-[#F7FAF8] dark:bg-[#112019] border border-slate-200/90 dark:border-white/5 space-y-3 flex flex-col justify-between hover:-translate-y-1 transition-transform"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="w-8 h-8 rounded-lg bg-[#124F40] text-[#5BB78D] font-mono font-bold text-xs flex items-center justify-center">
                        {lvl.level}
                      </span>
                      <span className="text-3xs font-semibold text-slate-400">Step {idx + 1}</span>
                    </div>

                    <h3 className="font-bold text-sm text-slate-900 dark:text-white">
                      {lvl.name}
                    </h3>

                    <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                      {lvl.summary}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-slate-200/60 dark:border-white/5 space-y-1">
                    <span className="text-3xs font-bold text-[#124F40] dark:text-[#5BB78D] block">
                      {lvl.units}
                    </span>
                    <span className="text-3xs text-slate-500 block italic leading-tight">
                      "{lvl.milestone}"
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Test Out Callout Box */}
            <div className="p-5 sm:p-6 rounded-2xl bg-[#5BB78D]/10 border border-[#5BB78D]/30 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#5BB78D]/20 text-[#124F40] dark:text-[#5BB78D] flex items-center justify-center shrink-0">
                  <Compass className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                    Placement Test &amp; Unit Skip-Out
                  </h4>
                  <p className="text-xs text-slate-600 dark:text-slate-300">
                    Take the 20-question placement test to start at your real level, or score 85%+ on any unit test to skip directly to the next milestone.
                  </p>
                </div>
              </div>
              <Link
                to="/course"
                className="text-xs font-bold text-[#124F40] dark:text-[#5BB78D] hover:underline whitespace-nowrap shrink-0"
              >
                View curriculum details &rarr;
              </Link>
            </div>
          </div>
        </section>

        {/* =================================================================== */}
        {/* 3. BUILT-IN DICTIONARY                                              */}
        {/* =================================================================== */}
        <section
          id="dictionary"
          aria-labelledby="dict-heading"
          className="scroll-mt-[72px] py-16 sm:py-24 bg-[#F7FAF8] dark:bg-[#0B1612]"
        >
          <div className="max-w-[1200px] mx-auto px-4 sm:px-6 space-y-12">
            <div className="text-center max-w-2xl mx-auto space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-[#5BB78D]">
                Integrated Lexical Engine
              </span>
              <h2
                id="dict-heading"
                className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight"
              >
                {LANDING_COPY.builtinDictionary.title}
              </h2>
              <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed">
                {LANDING_COPY.builtinDictionary.subtitle}
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              {/* Features List */}
              <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-5">
                {LANDING_COPY.builtinDictionary.features.map((feat, i) => (
                  <div
                    key={i}
                    className="p-5 rounded-2xl bg-white dark:bg-[#112019] border border-slate-200/90 dark:border-white/5 space-y-2 shadow-xs"
                  >
                    <div className="w-8 h-8 rounded-lg bg-[#5BB78D]/15 text-[#124F40] dark:text-[#5BB78D] flex items-center justify-center">
                      <Sparkles className="w-4 h-4" />
                    </div>
                    <h3 className="font-bold text-sm text-slate-900 dark:text-white">
                      {feat.title}
                    </h3>
                    <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                      {feat.description}
                    </p>
                  </div>
                ))}
              </div>

              {/* Dictionary Visual Card */}
              <div className="lg:col-span-5">
                <div className="p-6 rounded-2xl bg-white dark:bg-[#112019] border-2 border-[#5BB78D]/30 shadow-lg space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-white/5">
                    <span className="text-3xs font-mono text-slate-400">/app/dictionary/diligent</span>
                    <span className="text-3xs font-bold uppercase px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-800 dark:text-emerald-300">
                      B2 Vocabulary
                    </span>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-baseline justify-between">
                      <h4 className="text-2xl font-black text-slate-900 dark:text-white">diligent</h4>
                      <span className="text-xs font-mono text-slate-400">/ˈdɪl.ə.dʒənt/</span>
                    </div>

                    <div className="text-xs font-arabic text-emerald-700 dark:text-emerald-400 font-semibold" dir="rtl">
                      محنتی، سرگرم، مستعد
                    </div>

                    <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                      Having or showing care and conscientiousness in one's work or duties.
                    </p>

                    <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-white/5 text-2xs italic text-slate-600 dark:text-slate-400">
                      "Diligent students regularly review mistakes in their personal study notebook."
                    </div>

                    <div className="pt-2 flex items-center justify-between text-3xs text-slate-400">
                      <span>Source: Open English WordNet</span>
                      <Link to="/credits" className="text-[#5BB78D] font-bold hover:underline">
                        Attributions &rarr;
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =================================================================== */}
        {/* 4. GRAMMAR MADE SIMPLE                                              */}
        {/* =================================================================== */}
        <section
          id="grammar"
          aria-labelledby="grammar-heading"
          className="scroll-mt-[72px] py-16 sm:py-24 bg-white dark:bg-[#0E2018] border-y border-slate-200/80 dark:border-white/5"
        >
          <div className="max-w-[1200px] mx-auto px-4 sm:px-6 space-y-12">
            <div className="text-center max-w-2xl mx-auto space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-[#5BB78D]">
                Visual Linguistic Frameworks
              </span>
              <h2
                id="grammar-heading"
                className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight"
              >
                {LANDING_COPY.grammarSimple.title}
              </h2>
              <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed">
                {LANDING_COPY.grammarSimple.subtitle}
              </p>
            </div>

            {/* Tenses Showcase Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {LANDING_COPY.grammarSimple.tenses.map((tense, idx) => (
                <div
                  key={idx}
                  className="p-5 rounded-2xl bg-[#F7FAF8] dark:bg-[#112019] border border-slate-200/90 dark:border-white/5 space-y-3 flex flex-col justify-between shadow-xs"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <h3 className="font-bold text-sm text-slate-900 dark:text-white">
                        {tense.name}
                      </h3>
                      <span className="text-3xs font-mono text-[#5BB78D] font-semibold">Tense #{idx + 1}</span>
                    </div>

                    {/* Timeline representation */}
                    <div className="p-2.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-200/70 dark:border-white/5 font-mono text-3xs text-emerald-800 dark:text-emerald-400">
                      {tense.timeline}
                    </div>

                    <div className="space-y-1 pt-1">
                      <span className="text-3xs uppercase font-bold text-slate-400 tracking-wider">Formula</span>
                      <p className="text-2xs font-mono text-slate-700 dark:text-slate-300 font-semibold">
                        {tense.formula}
                      </p>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-slate-200/60 dark:border-white/5">
                    <span className="text-3xs uppercase font-bold text-slate-400 tracking-wider block mb-0.5">Example</span>
                    <p className="text-xs text-slate-600 dark:text-slate-300 italic">
                      "{tense.example}"
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* =================================================================== */}
        {/* 5. MADE FOR URDU SPEAKERS                                           */}
        {/* =================================================================== */}
        <section
          id="urdu-speakers"
          aria-labelledby="urdu-heading"
          className="scroll-mt-[72px] py-16 sm:py-24 bg-[#F7FAF8] dark:bg-[#0B1612]"
        >
          <div className="max-w-[1200px] mx-auto px-4 sm:px-6 space-y-12">
            <div className="text-center max-w-2xl mx-auto space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-[#5BB78D]">
                Bilingual Language Insights
              </span>
              <h2
                id="urdu-heading"
                className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight"
              >
                {LANDING_COPY.urduSpeakers.title}
              </h2>
              <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed">
                {LANDING_COPY.urduSpeakers.subtitle}
              </p>
            </div>

            {/* Urdu Comparison Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {LANDING_COPY.urduSpeakers.comparisons.map((item, idx) => (
                <div
                  key={idx}
                  className="p-6 rounded-2xl bg-white dark:bg-[#112019] border border-slate-200/90 dark:border-white/5 space-y-3 shadow-xs hover:border-[#5BB78D]/40 transition-colors"
                >
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-[#5BB78D]/20 text-[#124F40] dark:text-[#5BB78D] flex items-center justify-center font-bold text-xs">
                      {idx + 1}
                    </div>
                    <h3 className="font-bold text-base text-slate-900 dark:text-white">
                      {item.topic}
                    </h3>
                  </div>

                  <div className="space-y-2 pt-1 text-xs">
                    <div className="p-2.5 rounded-lg bg-emerald-50/60 dark:bg-emerald-950/20 border border-emerald-200/50 dark:border-emerald-800/30">
                      <span className="font-bold text-emerald-900 dark:text-emerald-300 block mb-0.5">English Rule:</span>
                      <p className="text-slate-700 dark:text-slate-300">{item.englishRule}</p>
                    </div>

                    <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200/60 dark:border-white/5">
                      <span className="font-bold text-slate-700 dark:text-slate-300 block mb-0.5">Urdu Difference:</span>
                      <p className="text-slate-600 dark:text-slate-400 font-arabic leading-relaxed" dir="auto">{item.urduDifference}</p>
                    </div>

                    <div className="p-2.5 rounded-lg bg-rose-50/50 dark:bg-rose-950/20 border border-rose-200/50 dark:border-rose-800/30 text-rose-900 dark:text-rose-300">
                      <span className="font-bold block mb-0.5">Common Trap to Avoid:</span>
                      <p className="text-2xs leading-relaxed">{item.commonTrap}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* =================================================================== */}
        {/* D. FOUR MODULES SECTION                                             */}
        {/* =================================================================== */}
        <section
          id="modules"
          aria-labelledby="modules-heading"
          className="scroll-mt-[72px] py-16 sm:py-24 bg-white dark:bg-[#0E2018] border-t border-slate-200/80 dark:border-white/5"
        >
          <div className="max-w-[1200px] mx-auto px-4 sm:px-6 space-y-12">
            <div className="text-center max-w-2xl mx-auto space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-[#5BB78D]">
                Complete Exam Coverage
              </span>
              <h2
                id="modules-heading"
                className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight"
              >
                {LANDING_COPY.modules.title}
              </h2>
              <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed">
                {LANDING_COPY.modules.subtitle}
              </p>
            </div>

            {/* 4 Cards (2x2 on desktop, 1 col on mobile) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
              {LANDING_COPY.modules.cards.map((mod) => (
                <div
                  key={mod.id}
                  className={`rounded-2xl p-6 sm:p-7 bg-[#F7FAF8] dark:bg-[#112019] border ${mod.borderTint} shadow-xs hover:shadow-md hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between`}
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className={`w-10 h-10 rounded-xl ${mod.bgTint} flex items-center justify-center`}>
                        {getModuleIcon(mod.id)}
                      </div>
                      <span className="text-3xs font-bold uppercase tracking-widest px-2.5 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                        {mod.name}
                      </span>
                    </div>

                    <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                      {mod.title}
                    </h3>

                    <ul className="space-y-2.5 text-xs text-slate-600 dark:text-slate-300">
                      {mod.bullets.map((b, i) => (
                        <li key={i} className="flex items-start gap-2.5">
                          <CheckCircle2 className="w-4 h-4 text-[#5BB78D] shrink-0 mt-0.5" />
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="pt-6 mt-6 border-t border-slate-100 dark:border-white/5">
                    <button
                      type="button"
                      onClick={() => scrollToAnchor(mod.learnMoreAnchor)}
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#124F40] dark:text-[#5BB78D] hover:underline cursor-pointer"
                    >
                      <span>Explore {mod.name} tools</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* =================================================================== */}
        {/* E. HOW IT WORKS                                                     */}
        {/* =================================================================== */}
        <section
          id="how-it-works"
          aria-labelledby="how-it-works-heading"
          className="scroll-mt-[72px] py-16 sm:py-24 bg-white dark:bg-[#0E2018] border-y border-slate-200/80 dark:border-white/5"
        >
          <div className="max-w-[1200px] mx-auto px-4 sm:px-6 space-y-12">
            <div className="text-center max-w-2xl mx-auto space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-[#5BB78D]">
                Step-by-Step Path
              </span>
              <h2
                id="how-it-works-heading"
                className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight"
              >
                {LANDING_COPY.howItWorks.title}
              </h2>
              <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed">
                {LANDING_COPY.howItWorks.subtitle}
              </p>
            </div>

            {/* 4 Steps: Horizontal Timeline on Desktop, Vertical on Mobile */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 sm:gap-8 relative">
              {LANDING_COPY.howItWorks.steps.map((step, idx) => (
                <div
                  key={step.stepNumber}
                  className="relative p-6 rounded-2xl bg-[#F7FAF8] dark:bg-[#112019] border border-slate-200/80 dark:border-white/5 flex flex-col justify-start space-y-3 text-left"
                >
                  <div className="w-10 h-10 rounded-xl bg-[#124F40] text-[#5BB78D] font-mono font-bold text-sm flex items-center justify-center shrink-0">
                    {step.stepNumber}
                  </div>

                  <h3 className="font-bold text-sm text-slate-900 dark:text-white leading-snug">
                    {step.title}
                  </h3>

                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* =================================================================== */}
        {/* F. FEATURE SHOWCASE (Alternating Rows with UI Mockups)             */}
        {/* =================================================================== */}
        <section
          id="features"
          aria-labelledby="features-heading"
          className="scroll-mt-[72px] py-16 sm:py-24 bg-[#F7FAF8] dark:bg-[#0B1612] space-y-20 sm:space-y-28"
        >
          <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
            <div className="text-center max-w-2xl mx-auto space-y-3 mb-16">
              <span className="text-xs font-bold uppercase tracking-wider text-[#5BB78D]">
                Platform Capabilities
              </span>
              <h2
                id="features-heading"
                className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight"
              >
                {LANDING_COPY.features.title}
              </h2>
              <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed">
                {LANDING_COPY.features.subtitle}
              </p>
            </div>

            {/* Row 1: Split-Screen Reading */}
            <div id="feature-reading" className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
              <div className="lg:col-span-5 space-y-5">
                <span className="px-2.5 py-0.5 rounded-full text-2xs font-bold bg-[#124F40]/10 dark:bg-[#5BB78D]/20 text-[#124F40] dark:text-[#5BB78D]">
                  {LANDING_COPY.features.rows[0].badge}
                </span>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight">
                  {LANDING_COPY.features.rows[0].title}
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  {LANDING_COPY.features.rows[0].description}
                </p>
                <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-300">
                  {LANDING_COPY.features.rows[0].checklist.map((c, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#5BB78D] shrink-0 mt-0.5" />
                      <span>{c}</span>
                    </li>
                  ))}
                </ul>
                <div className="pt-2">
                  <Link
                    to="/signup"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-[#124F40] dark:text-[#5BB78D] hover:underline"
                  >
                    <span>{LANDING_COPY.features.rows[0].ctaLabel}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
              <div className="lg:col-span-7">
                <SplitScreenReadingMockup />
              </div>
            </div>

            {/* Row 2: AI Writing & Speaking Feedback (Reversed on desktop) */}
            <div id="feature-writing" className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center pt-16 sm:pt-24">
              <div className="lg:col-span-7 order-2 lg:order-1">
                <AiFeedbackCriteriaMockup />
              </div>
              <div className="lg:col-span-5 space-y-5 order-1 lg:order-2">
                <span className="px-2.5 py-0.5 rounded-full text-2xs font-bold bg-[#D97706]/15 text-[#D97706]">
                  {LANDING_COPY.features.rows[1].badge}
                </span>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight">
                  {LANDING_COPY.features.rows[1].title}
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  {LANDING_COPY.features.rows[1].description}
                </p>
                <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-300">
                  {LANDING_COPY.features.rows[1].checklist.map((c, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#5BB78D] shrink-0 mt-0.5" />
                      <span>{c}</span>
                    </li>
                  ))}
                </ul>
                <div className="pt-2">
                  <Link
                    to="/signup"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-[#124F40] dark:text-[#5BB78D] hover:underline"
                  >
                    <span>{LANDING_COPY.features.rows[1].ctaLabel}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>

            {/* Row 3: Adaptive Study Plan */}
            <div id="feature-study-plan" className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center pt-16 sm:pt-24">
              <div className="lg:col-span-5 space-y-5">
                <span className="px-2.5 py-0.5 rounded-full text-2xs font-bold bg-[#124F40]/10 dark:bg-[#5BB78D]/20 text-[#124F40] dark:text-[#5BB78D]">
                  {LANDING_COPY.features.rows[2].badge}
                </span>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight">
                  {LANDING_COPY.features.rows[2].title}
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  {LANDING_COPY.features.rows[2].description}
                </p>
                <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-300">
                  {LANDING_COPY.features.rows[2].checklist.map((c, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#5BB78D] shrink-0 mt-0.5" />
                      <span>{c}</span>
                    </li>
                  ))}
                </ul>
                <div className="pt-2">
                  <Link
                    to="/signup"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-[#124F40] dark:text-[#5BB78D] hover:underline"
                  >
                    <span>{LANDING_COPY.features.rows[2].ctaLabel}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
              <div className="lg:col-span-7">
                <StudyPlanTimetableMockup />
              </div>
            </div>

            {/* Row 4: Mistake Notebook (Reversed on desktop) */}
            <div id="feature-tracking" className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center pt-16 sm:pt-24">
              <div className="lg:col-span-7 order-2 lg:order-1">
                <MistakeNotebookMockup />
              </div>
              <div className="lg:col-span-5 space-y-5 order-1 lg:order-2">
                <span className="px-2.5 py-0.5 rounded-full text-2xs font-bold bg-[#E05A47]/15 text-[#E05A47]">
                  {LANDING_COPY.features.rows[3].badge}
                </span>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight">
                  {LANDING_COPY.features.rows[3].title}
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  {LANDING_COPY.features.rows[3].description}
                </p>
                <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-300">
                  {LANDING_COPY.features.rows[3].checklist.map((c, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#5BB78D] shrink-0 mt-0.5" />
                      <span>{c}</span>
                    </li>
                  ))}
                </ul>
                <div className="pt-2">
                  <Link
                    to="/signup"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-[#124F40] dark:text-[#5BB78D] hover:underline"
                  >
                    <span>{LANDING_COPY.features.rows[3].ctaLabel}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =================================================================== */}
        {/* G. WHY ZARII (Feature Grid 3x2)                                     */}
        {/* =================================================================== */}
        <section
          aria-labelledby="why-zarii-heading"
          className="py-16 sm:py-24 bg-white dark:bg-[#0E2018] border-y border-slate-200/80 dark:border-white/5"
        >
          <div className="max-w-[1200px] mx-auto px-4 sm:px-6 space-y-12">
            <div className="text-center max-w-2xl mx-auto space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-[#5BB78D]">
                Platform Guarantees
              </span>
              <h2
                id="why-zarii-heading"
                className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight"
              >
                {LANDING_COPY.whyZarii.title}
              </h2>
              <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed">
                {LANDING_COPY.whyZarii.subtitle}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {LANDING_COPY.whyZarii.items.map((item) => (
                <div
                  key={item.id}
                  className="p-6 rounded-2xl bg-[#F7FAF8] dark:bg-[#112019] border border-slate-200/80 dark:border-white/5 space-y-3 hover:shadow-sm transition-shadow"
                >
                  <div className="w-10 h-10 rounded-xl bg-[#5BB78D]/15 flex items-center justify-center">
                    {getWhyIcon(item.id)}
                  </div>
                  <h3 className="font-bold text-base text-slate-900 dark:text-white">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* =================================================================== */}
        {/* H. SCORE ESTIMATE NOTE (Honest Section)                             */}
        {/* =================================================================== */}
        <section aria-labelledby="scoring-note-heading" className="py-12 bg-[#F7FAF8] dark:bg-[#0B1612]">
          <div className="max-w-[840px] mx-auto px-4 sm:px-6">
            <div className="p-6 sm:p-7 rounded-2xl bg-white dark:bg-[#112019] border border-amber-500/25 dark:border-amber-500/20 shadow-xs space-y-3 text-center sm:text-left">
              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-amber-500/15 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0">
                  <HelpCircle className="w-5 h-5" />
                </div>
                <div className="space-y-1.5">
                  <div className="text-2xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">
                    {LANDING_COPY.scoreEstimateNote.badge}
                  </div>
                  <h3 id="scoring-note-heading" className="text-sm sm:text-base font-bold text-slate-900 dark:text-white">
                    {LANDING_COPY.scoreEstimateNote.statement}
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                    {LANDING_COPY.scoreEstimateNote.explanation}
                  </p>
                  <p className="text-3xs text-slate-500 dark:text-slate-400 pt-1 border-t border-slate-100 dark:border-white/5">
                    IELTS is a registered trademark of its owners. Zarii is independent and not affiliated with or endorsed by IELTS partners. Course levels and certificates are for self-study purposes and are not official qualifications.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =================================================================== */}
        {/* I. FAQ ACCORDION                                                    */}
        {/* =================================================================== */}
        <section
          id="faq"
          aria-labelledby="faq-heading"
          className="scroll-mt-[72px] py-16 sm:py-24 bg-white dark:bg-[#0E2018] border-t border-slate-200/80 dark:border-white/5"
        >
          <div className="max-w-[840px] mx-auto px-4 sm:px-6 space-y-10">
            <div className="text-center space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-[#5BB78D]">
                Clear Answers
              </span>
              <h2
                id="faq-heading"
                className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight"
              >
                {LANDING_COPY.faq.title}
              </h2>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                {LANDING_COPY.faq.subtitle}
              </p>
            </div>

            {/* Accordion list */}
            <div className="space-y-3">
              {LANDING_COPY.faq.items.map((faqItem, idx) => {
                const isOpen = openFaqIndex === idx;
                return (
                  <div
                    key={idx}
                    className="rounded-2xl border border-slate-200 dark:border-white/10 overflow-hidden bg-[#F7FAF8] dark:bg-[#112019] transition-colors"
                  >
                    <button
                      type="button"
                      id={`faq-btn-${idx}`}
                      aria-expanded={isOpen}
                      aria-controls={`faq-panel-${idx}`}
                      onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                      className="w-full p-4 sm:p-5 text-left font-bold text-sm sm:text-base text-slate-900 dark:text-white flex items-center justify-between gap-4 focus:outline-none focus:ring-2 focus:ring-[#5BB78D] cursor-pointer"
                    >
                      <span>{faqItem.question}</span>
                      <ChevronDown
                        className={`w-4 h-4 text-slate-400 transition-transform duration-200 shrink-0 ${
                          isOpen ? 'rotate-180 text-[#124F40] dark:text-[#5BB78D]' : ''
                        }`}
                      />
                    </button>

                    {isOpen && (
                      <div
                        id={`faq-panel-${idx}`}
                        role="region"
                        aria-labelledby={`faq-btn-${idx}`}
                        className="px-4 pb-5 sm:px-5 sm:pb-6 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed border-t border-slate-200/60 dark:border-white/5 pt-3 animate-zarii-fade"
                      >
                        {faqItem.answer}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* =================================================================== */}
        {/* J. TARGET BAND ROADMAP & SCORE CALCULATOR                           */}
        {/* =================================================================== */}
        <section
          id="target-roadmap"
          aria-labelledby="roadmap-heading"
          className="py-16 sm:py-24 bg-gradient-to-b from-[#124F40] via-[#0E3D32] to-[#0A2E25] text-white relative overflow-hidden select-text"
        >
          {/* Subtle line background pattern */}
          <div
            className="absolute inset-0 pointer-events-none opacity-5 mix-blend-overlay"
            style={{
              backgroundImage: 'radial-gradient(#5BB78D 1px, transparent 1px)',
              backgroundSize: '24px 24px',
            }}
            aria-hidden="true"
          />

          <div className="max-w-[1200px] mx-auto px-4 sm:px-6 relative z-10 space-y-10">
            {/* Header */}
            <div className="text-center space-y-4 max-w-3xl mx-auto">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold bg-[#5BB78D]/20 text-[#5BB78D] border border-[#5BB78D]/30 backdrop-blur-xs">
                <Target className="w-3.5 h-3.5" />
                <span>Personalized Preparation Roadmap</span>
              </div>
              <h2 id="roadmap-heading" className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight">
                What band are you aiming for?
              </h2>
              <p className="text-sm sm:text-base text-white/80 leading-relaxed">
                Select your target score below to view exact raw score requirements, recommended weekly study time, and skill milestones calibrated to official Cambridge IELTS standards.
              </p>
            </div>

            {/* Band Selector Tabs */}
            <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3">
              {(Object.keys(BAND_ROADMAPS) as TargetBandKey[]).map((bandKey) => {
                const isSelected = selectedBand === bandKey;
                const item = BAND_ROADMAPS[bandKey];
                return (
                  <button
                    key={bandKey}
                    type="button"
                    onClick={() => setSelectedBand(bandKey)}
                    className={`px-5 py-3 rounded-2xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#5BB78D] ${
                      isSelected
                        ? 'bg-[#5BB78D] text-[#0A2E25] shadow-lg shadow-[#5BB78D]/25 scale-105'
                        : 'bg-white/10 hover:bg-white/15 text-white/90 border border-white/10 hover:border-white/20'
                    }`}
                  >
                    <span>{item.band}</span>
                    <span
                      className={`text-[11px] px-2 py-0.5 rounded-full font-medium hidden xs:inline ${
                        isSelected ? 'bg-[#0E3D32]/20 text-[#0E3D32]' : 'bg-white/10 text-white/70'
                      }`}
                    >
                      {item.tag}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Dynamic Roadmap Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {/* Card 1: Raw Scores Required */}
              <div className="rounded-2xl bg-white/[0.08] backdrop-blur-md border border-white/15 p-6 space-y-4 hover:border-white/25 transition-all">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#0F8B8D]/20 text-[#0F8B8D] flex items-center justify-center shrink-0 border border-[#0F8B8D]/30">
                    <BarChart3 className="w-5 h-5 text-[#5BB78D]" />
                  </div>
                  <div>
                    <h3 className="font-bold text-sm sm:text-base text-white">Target Raw Scores</h3>
                    <p className="text-2xl font-black text-[#5BB78D]">{currentRoadmap.band}</p>
                  </div>
                </div>

                <div className="space-y-3 pt-2 text-xs leading-relaxed border-t border-white/10">
                  <div className="flex items-start justify-between gap-2 p-2.5 rounded-xl bg-white/5 border border-white/5">
                    <span className="flex items-center gap-1.5 text-white/90 font-medium">
                      <Headphones className="w-4 h-4 text-[#0F8B8D]" /> Listening:
                    </span>
                    <span className="font-bold text-white text-right">{currentRoadmap.listeningRaw}</span>
                  </div>
                  <div className="flex items-start justify-between gap-2 p-2.5 rounded-xl bg-white/5 border border-white/5">
                    <span className="flex items-center gap-1.5 text-white/90 font-medium">
                      <BookOpen className="w-4 h-4 text-[#5BB78D]" /> Reading:
                    </span>
                    <span className="font-bold text-white text-right">{currentRoadmap.readingRaw}</span>
                  </div>
                  <p className="text-[11px] text-white/60 italic pt-1">
                    *Based on official 40-question Cambridge conversion tables.
                  </p>
                </div>
              </div>

              {/* Card 2: Writing & Speaking Examiner Criteria */}
              <div className="rounded-2xl bg-white/[0.08] backdrop-blur-md border border-white/15 p-6 space-y-4 hover:border-white/25 transition-all">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#D97706]/20 text-[#D97706] flex items-center justify-center shrink-0 border border-[#D97706]/30">
                    <Award className="w-5 h-5 text-amber-400" />
                  </div>
                  <div>
                    <h3 className="font-bold text-sm sm:text-base text-white">Examiner Rubric Focus</h3>
                    <p className="text-xs text-white/70 truncate max-w-[200px]">{currentRoadmap.targetFor}</p>
                  </div>
                </div>

                <div className="space-y-3 pt-2 text-xs leading-relaxed border-t border-white/10">
                  <div className="p-2.5 rounded-xl bg-white/5 border border-white/5 space-y-1">
                    <span className="flex items-center gap-1.5 font-bold text-amber-300">
                      <PenTool className="w-3.5 h-3.5" /> Writing Rubric:
                    </span>
                    <p className="text-white/80 text-[11.5px] leading-relaxed">{currentRoadmap.writingFocus}</p>
                  </div>
                  <div className="p-2.5 rounded-xl bg-white/5 border border-white/5 space-y-1">
                    <span className="flex items-center gap-1.5 font-bold text-rose-300">
                      <Mic className="w-3.5 h-3.5" /> Speaking Rubric:
                    </span>
                    <p className="text-white/80 text-[11.5px] leading-relaxed">{currentRoadmap.speakingFocus}</p>
                  </div>
                </div>
              </div>

              {/* Card 3: Study Schedule & Key Strategy */}
              <div className="rounded-2xl bg-white/[0.08] backdrop-blur-md border border-white/15 p-6 space-y-4 hover:border-white/25 transition-all">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 border border-emerald-500/30">
                    <Clock className="w-5 h-5 text-[#5BB78D]" />
                  </div>
                  <div>
                    <h3 className="font-bold text-sm sm:text-base text-white">Recommended Routine</h3>
                    <p className="text-xs text-white/70">Estimated completion: {currentRoadmap.duration}</p>
                  </div>
                </div>

                <div className="space-y-3 pt-2 text-xs leading-relaxed border-t border-white/10">
                  <div className="p-2.5 rounded-xl bg-white/5 border border-white/5 space-y-1">
                    <span className="text-white/70 text-[11px] font-semibold uppercase tracking-wider block">
                      Target Study Pace
                    </span>
                    <span className="text-base font-extrabold text-white">{currentRoadmap.weeklyHours}</span>
                    <span className="text-white/60 block text-[11px]">~45–60 mins daily structured practice</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-[#5BB78D]/10 border border-[#5BB78D]/20 space-y-1">
                    <span className="text-[#5BB78D] font-bold flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5" /> High-Impact Strategy:
                    </span>
                    <p className="text-white/90 text-[11.5px] leading-relaxed">{currentRoadmap.keyStrategy}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Jump Straight to Practice Module Shortcuts (REPLACES Create account & Log in buttons) */}
            <div className="p-5 sm:p-6 rounded-2xl bg-white/[0.06] border border-white/10 flex flex-col lg:flex-row items-center justify-between gap-4">
              <div className="text-center lg:text-left space-y-1">
                <h4 className="font-bold text-sm sm:text-base text-white flex items-center justify-center lg:justify-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#5BB78D]" />
                  <span>Explore practice modules for {currentRoadmap.band}:</span>
                </h4>
                <p className="text-xs text-white/70">
                  Jump straight to exam simulation and question analysis for any skill:
                </p>
              </div>

              {/* 4 Skill Chips */}
              <div className="flex flex-wrap items-center justify-center gap-2 shrink-0">
                <button
                  type="button"
                  onClick={() => scrollToAnchor('#modules')}
                  className="px-3.5 py-2 rounded-xl text-xs font-bold bg-[#0F8B8D]/20 hover:bg-[#0F8B8D]/30 text-teal-200 border border-[#0F8B8D]/40 transition-all flex items-center gap-1.5 cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#5BB78D]"
                >
                  <Headphones className="w-3.5 h-3.5" />
                  <span>Listening</span>
                </button>
                <button
                  type="button"
                  onClick={() => scrollToAnchor('#modules')}
                  className="px-3.5 py-2 rounded-xl text-xs font-bold bg-[#124F40]/40 hover:bg-[#124F40]/60 text-emerald-200 border border-[#5BB78D]/40 transition-all flex items-center gap-1.5 cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#5BB78D]"
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>Reading</span>
                </button>
                <button
                  type="button"
                  onClick={() => scrollToAnchor('#modules')}
                  className="px-3.5 py-2 rounded-xl text-xs font-bold bg-[#D97706]/20 hover:bg-[#D97706]/30 text-amber-200 border border-[#D97706]/40 transition-all flex items-center gap-1.5 cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#5BB78D]"
                >
                  <PenTool className="w-3.5 h-3.5" />
                  <span>Writing</span>
                </button>
                <button
                  type="button"
                  onClick={() => scrollToAnchor('#modules')}
                  className="px-3.5 py-2 rounded-xl text-xs font-bold bg-[#E05A47]/20 hover:bg-[#E05A47]/30 text-rose-200 border border-[#E05A47]/40 transition-all flex items-center gap-1.5 cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#5BB78D]"
                >
                  <Mic className="w-3.5 h-3.5" />
                  <span>Speaking</span>
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* =================================================================== */}
      {/* K. FOOTER                                                           */}
      {/* =================================================================== */}
      <LandingFooter onScrollToAnchor={scrollToAnchor} />

      {/* Back to top floating button (appears after scrolling 600px) */}
      {showBackToTop && (
        <button
          type="button"
          onClick={() => {
            const prefersReducedMotion =
              typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
            window.scrollTo({
              top: 0,
              behavior: prefersReducedMotion ? 'auto' : 'smooth',
            });
          }}
          aria-label="Back to top"
          className="fixed bottom-6 right-6 z-40 p-3 rounded-full bg-[#124F40] hover:bg-[#0E3D32] text-white shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#5BB78D] cursor-pointer"
        >
          <ArrowUp className="w-5 h-5" />
        </button>
      )}
    </div>
  );
}
export default LandingPage;
