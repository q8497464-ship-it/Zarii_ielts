import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Sparkles,
  ArrowRight,
  CheckCircle2,
  BookOpen,
  Headphones,
  PenTool,
  Mic,
  Calendar,
  Layers,
  ShieldCheck,
  Wifi,
  ChevronDown,
  Compass,
  FileSpreadsheet,
  Moon,
  Sun,
  Award,
  Zap,
  BarChart3,
  Timer,
  Check,
} from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { Card } from '../../components/ui/Card';
import { ZariiLogo } from '../../components/ui/ZariiLogo';
import { copy } from '../../lib/copy';
import {
  BookIllustration,
  HeadphonesIllustration,
  PenIllustration,
  MicrophoneIllustration,
} from '../../components/ui/BrandIllustrations';
import { useAppStore } from '../../store/useAppStore';

export function LandingPage() {
  const navigate = useNavigate();
  const { theme, setTheme } = useAppStore();
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  // 4 Skill Modules with specific skill colors and dedicated illustrations
  const skillCards = [
    {
      skill: 'listening',
      name: 'Listening',
      icon: Headphones,
      illustration: HeadphonesIllustration,
      color: '#0F8B8D',
      bgTint: 'bg-[#EDF8F8] dark:bg-[#0A2424]',
      borderColor: 'border-[#BCE3E4] dark:border-[#0F8B8D]/40',
      badgeVar: 'listening' as const,
      route: '/practice/listening',
      description: '4-section audio tracks with multiple native accents, transcripts, and Cambridge-standard question types.',
      features: ['Section-by-section audio playback', 'Speech synthesis voice options', '10-minute transfer time countdown'],
    },
    {
      skill: 'reading',
      name: 'Reading',
      icon: BookOpen,
      illustration: BookIllustration,
      color: '#1E7A62',
      bgTint: 'bg-[#F1FAF5] dark:bg-[#0E3D32]',
      borderColor: 'border-[#B6E3CD] dark:border-[#1E7A62]/40',
      badgeVar: 'reading' as const,
      route: '/practice/reading',
      description: 'Academic & General split-screen passages with high-legibility serif type and live word highlighting.',
      features: ['Authentic split-screen layout', 'True / False / Not Given & Headings', 'Instant raw-to-band conversion'],
    },
    {
      skill: 'writing',
      name: 'Writing',
      icon: PenTool,
      illustration: PenIllustration,
      color: '#C98A0A',
      bgTint: 'bg-[#FEF8EC] dark:bg-[#291C04]',
      borderColor: 'border-[#F3DCB1] dark:border-[#C98A0A]/40',
      badgeVar: 'writing' as const,
      route: '/practice/writing',
      description: 'Focused writing studio for Task 1 & Task 2 with live word counters, timing coach, and criteria grading.',
      features: ['Task 1 data graphs & Task 2 prompts', 'Band 8.0+ official model essays', 'Rule-based & AI examiner feedback'],
    },
    {
      skill: 'speaking',
      name: 'Speaking',
      icon: Mic,
      illustration: MicrophoneIllustration,
      color: '#CF5C45',
      bgTint: 'bg-[#FCF1EE] dark:bg-[#2D140F]',
      borderColor: 'border-[#F6CBC3] dark:border-[#CF5C45]/40',
      badgeVar: 'speaking' as const,
      route: '/practice/speaking',
      description: 'Simulated examiner with 60-second cue card preparation timer, speech recognition, and filler word diagnostics.',
      features: ['Examiner audio prompt playback', '60-second Part 2 prep countdown', 'Fluency & lexical resource analysis'],
    },
  ];

  // 4 Steps: How it works
  const steps = [
    {
      step: '01',
      title: 'Benchmark Diagnostic',
      desc: 'Take a fast 25-minute diagnostic assessment across all four skills to pinpoint your baseline band score and question-type weaknesses.',
      icon: Compass,
    },
    {
      step: '02',
      title: 'Adaptive Daily Plan',
      desc: 'Generate a personalized day-by-day practice schedule tuned to your target band and test date, prioritizing your highest-leverage areas.',
      icon: Calendar,
    },
    {
      step: '03',
      title: 'Targeted Skill Drills',
      desc: 'Practice with split-screen passage highlighting, multi-speaker audio, and 700 academic vocabulary flashcards powered by SM-2 spaced repetition.',
      icon: Layers,
    },
    {
      step: '04',
      title: 'Full Mock Exams & TRF',
      desc: 'Complete full 3-hour exam simulations under strict Cambridge timing and export printable official Test Report Forms (PDF) for review.',
      icon: FileSpreadsheet,
    },
  ];

  // 6 Feature Highlights
  const featureGrid = [
    {
      title: 'Official Cambridge Bands',
      desc: 'Accurate raw-to-band score conversion tables for both Academic and General Training specifications.',
      icon: Award,
    },
    {
      title: 'Free AI Examiner Feedback',
      desc: 'Detailed criterion evaluation across Task Achievement, Coherence, Lexical Resource, and Grammar without subscriptions.',
      icon: Sparkles,
    },
    {
      title: '100% Offline & Private',
      desc: 'PWA service worker caching with browser Dexie IndexedDB. Your responses, recordings, and essays stay on your machine.',
      icon: ShieldCheck,
    },
    {
      title: 'SM-2 Spaced Vocabulary',
      desc: '700 essential IELTS Academic words with definitions, Urdu translations, and algorithmic review intervals.',
      icon: Zap,
    },
    {
      title: 'Timing Coach & Warnings',
      desc: 'Gentle screen-reader-friendly audio-visual checkpoints at 20 min, 10 min, and 5 min to build exam pacing.',
      icon: Timer,
    },
    {
      title: 'Mistake Notebook',
      desc: 'Every wrong answer is automatically cataloged with explanations so you can review and eliminate recurring traps.',
      icon: BarChart3,
    },
  ];

  // FAQs
  const faqs = [
    {
      q: 'Is Zarii really 100% free with no hidden charges?',
      a: 'Yes, 100% free forever. There are no paid tiers, no monthly subscriptions, and no credit card required. All reading passages, listening audio scripts, vocabulary flashcards, and grammar lessons are openly available to every candidate.',
    },
    {
      q: 'Does Zarii require an internet connection to practice?',
      a: 'No. Zarii is built as an offline-first Progressive Web App (PWA) with service worker caching and local IndexedDB database storage. Once loaded, test content, quizzes, and local scoring run entirely offline.',
    },
    {
      q: 'How does Zarii score my Writing and Speaking practice?',
      a: 'Reading and Listening are marked automatically with official raw-to-band conversion tables. For Writing and Speaking, Zarii provides instant rule-based metric evaluation (word count, sentence complexity, lexical variety) plus free AI examiner feedback through the Gemini or Groq free tier, or your own custom API key.',
    },
    {
      q: 'Is Zarii suitable for both Academic and General Training candidates?',
      a: 'Yes! Zarii includes full practice suites for both IELTS Academic (university applications and professional registration) and IELTS General Training (visas and workplace migration).',
    },
    {
      q: 'Where is my personal data and study history stored?',
      a: 'All test responses, audio recordings, writing drafts, and flashcard progress are stored locally on your device inside browser IndexedDB. We do not track, sell, or transmit your private data.',
    },
  ];

  return (
    <div className="min-h-screen bg-brand-neutral-bg dark:bg-brand-dark-bg text-brand-neutral-main dark:text-brand-dark-text flex flex-col font-sans selection:bg-brand-400 selection:text-brand-950">
      {/* Top Navigation */}
      <header className="sticky top-0 z-40 w-full border-b border-brand-neutral-border dark:border-brand-dark-border bg-white/95 dark:bg-brand-dark-surface/95 backdrop-blur-md transition-colors">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 group" aria-label="Zarii Home">
            <ZariiLogo variant="mark-wordmark" size="sm" className="group-hover:scale-105 transition-transform" />
            <span className="text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded bg-brand-100 text-brand-800 dark:bg-brand-900/80 dark:text-brand-300">
              Free
            </span>
          </Link>

          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="p-2 rounded-xl text-brand-neutral-muted hover:text-brand-neutral-main dark:hover:text-brand-dark-text hover:bg-brand-50 dark:hover:bg-brand-dark-elevated transition-colors"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? (
                <Moon className="w-4 h-4 text-brand-400" />
              ) : (
                <Sun className="w-4 h-4 text-brand-700" />
              )}
            </button>

            <Link
              to="/login"
              className="text-xs font-semibold text-brand-neutral-muted hover:text-brand-neutral-main dark:hover:text-brand-dark-text px-3 py-1.5 transition-colors"
            >
              Log in
            </Link>

            <Button
              variant="primary"
              size="sm"
              onClick={() => navigate('/signup')}
              rightIcon={<ArrowRight className="w-3.5 h-3.5" />}
            >
              Start Free
            </Button>
          </div>
        </div>
      </header>

      {/* Main Landmark */}
      <main id="main-content" className="flex-1">
        {/* 1. Deep-Green Hero Section with Logo, Book-Curve Decorative Pattern & Dual CTA */}
        <section className="relative overflow-hidden py-16 sm:py-24 px-4 sm:px-6 bg-gradient-to-b from-[#124F40] to-[#0E3D32] text-white">
          {/* Subtle open-book line pattern decorative background */}
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none opacity-[0.08]"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <defs>
              <pattern id="book-curve-pattern" width="140" height="140" patternUnits="userSpaceOnUse">
                {/* Book curve contours derived from Zarii logo */}
                <path
                  d="M10 80C30 60 50 60 70 70C90 60 110 60 130 80"
                  fill="none"
                  stroke="#5BB78D"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />
                <path
                  d="M10 100C30 80 50 80 70 90C90 80 110 80 130 100"
                  fill="none"
                  stroke="#FFFFFF"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
                <circle cx="70" cy="40" r="3" fill="#5BB78D" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#book-curve-pattern)" />
          </svg>

          {/* Soft ambient mint glow */}
          <div
            className="absolute -top-32 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[#5BB78D] opacity-[0.12] blur-[100px] pointer-events-none rounded-full"
            aria-hidden="true"
          />

          <div className="relative max-w-4xl mx-auto text-center space-y-7 z-10">
            {/* White Logo */}
            <div className="flex flex-col items-center justify-center gap-2 mb-1">
              <ZariiLogo variant="full" size="xl" theme="dark" className="drop-shadow-md" />
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-white/10 text-[#DDF2E7] border border-white/20 tracking-wide backdrop-blur-xs">
                {copy.brand.tagline}
              </span>
            </div>

            {/* Official Headline */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.12]">
              Prepare for IELTS. Confidently. Free.
            </h1>

            {/* Subtext */}
            <p className="text-base sm:text-lg text-[#DDF2E7] max-w-2xl mx-auto leading-relaxed font-normal">
              Authentic computer-delivered practice tests, instant band scoring, AI examiner evaluation, and personalized study plans. 100% free and private on your device.
            </p>

            {/* Two Primary Action Buttons */}
            <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
              {/* Start Free Button: Mint background with deep-green text (AA contrast: 6.2:1) */}
              <button
                onClick={() => navigate('/')}
                className="px-8 py-3.5 rounded-xl bg-[#5BB78D] hover:bg-[#4EA57E] text-[#0A2E25] font-bold text-sm sm:text-base shadow-lg shadow-[#0A2E25]/30 transition-all hover:scale-[1.02] active:scale-[0.98] flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-[#8ACFAE] focus:ring-offset-2 focus:ring-offset-[#124F40]"
              >
                <span>Start free</span>
                <ArrowRight className="w-4 h-4 stroke-[2.5]" />
              </button>

              {/* Take a diagnostic test: Outline white */}
              <button
                onClick={() => navigate('/diagnostic')}
                className="px-7 py-3.5 rounded-xl border-2 border-white/80 hover:border-white text-white hover:bg-white/10 font-bold text-sm sm:text-base transition-all hover:scale-[1.02] active:scale-[0.98] flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-[#8ACFAE] focus:ring-offset-2 focus:ring-offset-[#124F40]"
              >
                <Compass className="w-4 h-4" />
                <span>Take a diagnostic test</span>
              </button>
            </div>

            {/* Trust Badges */}
            <div className="pt-4 flex flex-wrap items-center justify-center gap-6 text-xs text-[#B6E3CD] font-medium">
              <span className="flex items-center gap-1.5">
                <Check className="w-4 h-4 text-[#5BB78D]" /> Zero Paywalls or Cards
              </span>
              <span className="flex items-center gap-1.5">
                <Check className="w-4 h-4 text-[#5BB78D]" /> Official Cambridge Bands
              </span>
              <span className="flex items-center gap-1.5">
                <Check className="w-4 h-4 text-[#5BB78D]" /> Works Fully Offline
              </span>
            </div>
          </div>
        </section>

        {/* 2. Four Skill Cards in Their Dedicated Skill Colors */}
        <section className="py-16 px-4 sm:px-6 max-w-6xl mx-auto space-y-10">
          <div className="text-center space-y-2">
            <Badge variant="primary" dot>
              Comprehensive 4-Skill Suite
            </Badge>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-brand-neutral-main dark:text-brand-dark-text">
              Master All Four IELTS Components
            </h2>
            <p className="text-xs sm:text-sm text-brand-neutral-muted dark:text-brand-dark-muted max-w-xl mx-auto">
              Each module is custom-crafted to replicate genuine test center software, timing constraints, and scoring rubrics.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {skillCards.map((sc) => {
              const Illustration = sc.illustration;
              return (
                <div
                  key={sc.skill}
                  onClick={() => navigate(sc.route)}
                  className={`rounded-2xl border ${sc.borderColor} ${sc.bgTint} p-6 flex flex-col justify-between cursor-pointer transition-all hover:shadow-md hover:scale-[1.02] group`}
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <Illustration size={60} />
                      <Badge variant={sc.badgeVar} dot>
                        {sc.name}
                      </Badge>
                    </div>

                    <div>
                      <h3 className="font-bold text-base text-brand-neutral-main dark:text-brand-dark-text group-hover:text-brand-800 dark:group-hover:text-brand-400 transition-colors">
                        {sc.name} Module
                      </h3>
                      <p className="text-xs text-brand-neutral-muted dark:text-brand-dark-muted mt-1 leading-relaxed">
                        {sc.description}
                      </p>
                    </div>

                    <ul className="space-y-1.5 pt-2 text-2xs text-brand-neutral-muted dark:text-brand-dark-muted border-t border-brand-neutral-border/60 dark:border-brand-dark-border/60">
                      {sc.features.map((f, idx) => (
                        <li key={idx} className="flex items-center gap-1.5">
                          <Check className="w-3 h-3 text-brand-700 dark:text-[#5BB78D] shrink-0" />
                          <span>{f}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="pt-4 mt-4 flex items-center justify-between text-xs font-bold text-brand-800 dark:text-brand-400 group-hover:translate-x-0.5 transition-transform">
                    <span>Practice {sc.name}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* 3. "How It Works" Section in 4 Steps */}
        <section className="py-16 px-4 sm:px-6 bg-brand-50/60 dark:bg-brand-dark-surface/40 border-y border-brand-neutral-border dark:border-brand-dark-border">
          <div className="max-w-5xl mx-auto space-y-12">
            <div className="text-center space-y-2">
              <Badge variant="outline">Proven 4-Step Methodology</Badge>
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-brand-neutral-main dark:text-brand-dark-text">
                How Zarii Prepares You for Band 8+
              </h2>
              <p className="text-xs sm:text-sm text-brand-neutral-muted dark:text-brand-dark-muted max-w-lg mx-auto">
                A structured roadmap that transforms unstructured cramming into disciplined daily progress.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {steps.map((s) => {
                const Icon = s.icon;
                return (
                  <Card key={s.step} className="p-6 flex flex-col justify-between border-brand-neutral-border dark:border-brand-dark-border">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-2xl font-extrabold text-brand-800 dark:text-brand-400">
                          {s.step}
                        </span>
                        <div className="w-9 h-9 rounded-xl bg-brand-100 dark:bg-brand-900/60 text-brand-800 dark:text-brand-300 flex items-center justify-center">
                          <Icon className="w-4 h-4" />
                        </div>
                      </div>
                      <h3 className="font-bold text-sm sm:text-base text-brand-neutral-main dark:text-brand-dark-text">
                        {s.title}
                      </h3>
                      <p className="text-xs text-brand-neutral-muted dark:text-brand-dark-muted leading-relaxed">
                        {s.desc}
                      </p>
                    </div>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        {/* 4. Feature Grid */}
        <section className="py-16 px-4 sm:px-6 max-w-6xl mx-auto space-y-12">
          <div className="text-center space-y-2">
            <Badge variant="primary" dot>
              Engineered For Reliability
            </Badge>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-brand-neutral-main dark:text-brand-dark-text">
              Zero Distractions. 100% Focused Preparation.
            </h2>
            <p className="text-xs sm:text-sm text-brand-neutral-muted dark:text-brand-dark-muted max-w-lg mx-auto">
              Everything you need to practice under genuine test conditions without subscription paywalls.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featureGrid.map((f) => {
              const Icon = f.icon;
              return (
                <Card key={f.title} className="p-6 border-brand-neutral-border dark:border-brand-dark-border space-y-3">
                  <div className="w-10 h-10 rounded-xl bg-brand-100 dark:bg-brand-900/60 text-brand-800 dark:text-brand-400 flex items-center justify-center">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold text-sm sm:text-base text-brand-neutral-main dark:text-brand-dark-text">
                    {f.title}
                  </h3>
                  <p className="text-xs text-brand-neutral-muted dark:text-brand-dark-muted leading-relaxed">
                    {f.desc}
                  </p>
                </Card>
              );
            })}
          </div>
        </section>

        {/* 5. Frequently Asked Questions (FAQ) */}
        <section className="py-16 px-4 sm:px-6 bg-brand-50/50 dark:bg-brand-dark-surface/30 border-t border-brand-neutral-border dark:border-brand-dark-border">
          <div className="max-w-3xl mx-auto space-y-8">
            <div className="text-center space-y-2">
              <Badge variant="outline">Candidate Inquiries</Badge>
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-brand-neutral-main dark:text-brand-dark-text">
                Frequently Asked Questions
              </h2>
              <p className="text-xs sm:text-sm text-brand-neutral-muted dark:text-brand-dark-muted">
                Transparent answers about our $0-cost, privacy-first IELTS platform.
              </p>
            </div>

            <div className="space-y-3">
              {faqs.map((faq, idx) => {
                const isOpen = openFaqIndex === idx;
                return (
                  <div
                    key={idx}
                    className="rounded-xl border border-brand-neutral-border dark:border-brand-dark-border bg-white dark:bg-brand-dark-surface overflow-hidden transition-colors"
                  >
                    <button
                      onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                      className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 font-bold text-xs sm:text-sm text-brand-neutral-main dark:text-brand-dark-text focus:outline-none"
                    >
                      <span>{faq.q}</span>
                      <ChevronDown
                        className={`w-4 h-4 text-brand-neutral-muted transition-transform shrink-0 ${
                          isOpen ? 'rotate-180 text-brand-800 dark:text-brand-400' : ''
                        }`}
                      />
                    </button>
                    {isOpen && (
                      <div className="px-4 pb-4 sm:px-5 sm:pb-5 pt-0 text-xs sm:text-sm text-brand-neutral-muted dark:text-brand-dark-muted leading-relaxed border-t border-brand-neutral-border/40 dark:border-brand-dark-border/40">
                        {faq.a}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Final CTA Banner */}
        <section className="py-16 px-4 sm:px-6 bg-gradient-to-b from-[#124F40] to-[#0A2E25] text-white text-center">
          <div className="max-w-2xl mx-auto space-y-6">
            <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white leading-tight">
              Ready to Begin Your IELTS Journey?
            </h2>
            <p className="text-xs sm:text-sm text-[#DDF2E7] leading-relaxed">
              Take the free 25-minute diagnostic test now, uncover your question weaknesses, and get an adaptive day-by-day study plan.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
              <button
                onClick={() => navigate('/')}
                className="px-8 py-3.5 rounded-xl bg-[#5BB78D] hover:bg-[#4EA57E] text-[#0A2E25] font-bold text-sm sm:text-base shadow-lg transition-all hover:scale-[1.02] flex items-center gap-2"
              >
                <span>Start Free Practice Now</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </section>
      </main>

      {/* 6. Clean Footer with the Logo */}
      <footer className="py-12 px-4 sm:px-6 border-t border-brand-neutral-border dark:border-brand-dark-border bg-white dark:bg-brand-dark-surface text-xs text-brand-neutral-muted dark:text-brand-dark-muted">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-3">
              <ZariiLogo variant="full" size="md" />
              <span className="text-2xs bg-brand-100 text-brand-800 dark:bg-brand-900/80 dark:text-brand-300 font-bold px-1.5 py-0.5 rounded">
                100% Free
              </span>
            </div>
            <p className="text-2xs text-brand-neutral-muted dark:text-brand-dark-muted max-w-md">
              Scores are diagnostic estimates. 100% original content. All candidate data stays locally on your device.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6 font-medium text-brand-neutral-muted dark:text-brand-dark-muted">
            <Link to="/about" className="hover:text-brand-700 dark:hover:text-brand-400 transition-colors">
              About
            </Link>
            <Link to="/privacy" className="hover:text-brand-700 dark:hover:text-brand-400 transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms" className="hover:text-brand-700 dark:hover:text-brand-400 transition-colors">
              Terms of Service
            </Link>
            <Link to="/faq" className="hover:text-brand-700 dark:hover:text-brand-400 transition-colors">
              FAQ
            </Link>
            <Link to="/contact" className="hover:text-brand-700 dark:hover:text-brand-400 transition-colors">
              Contact
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
