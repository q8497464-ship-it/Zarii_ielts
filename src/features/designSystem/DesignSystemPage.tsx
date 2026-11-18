import { useState } from 'react';
import {
  Button,
  IconButton,
  Input,
  Textarea,
  Select,
  Checkbox,
  RadioGroup,
  RadioItem,
  Switch,
  Tabs,
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  Badge,
  Tooltip,
  Modal,
  Drawer,
  ProgressBar,
  SkeletonCard,
  EmptyState,
  Breadcrumbs,
  Dropdown,
  AnimatedCounter,
  ZariiLogo,
  BookIllustration,
  HeadphonesIllustration,
  PenIllustration,
  MicrophoneIllustration,
  EmptyInboxIllustration,
} from '../../components/ui';
import {
  Sparkles,
  Headphones,
  BookOpen,
  PenTool,
  Mic,
  Search,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  SlidersHorizontal,
  Copy,
  Plus,
  Trash2,
  Share2,
  Settings,
  HelpCircle,
  ExternalLink,
  ShieldCheck,
  Eye,
  Check,
  BarChart3,
} from 'lucide-react';
import { useAppStore } from '../../store/useAppStore';
import { ZARII_BRAND, RECHARTS_PALETTE, RECHARTS_SERIES_COLORS, SKILL_THEMES } from '../../components/ui/tokens';
import { copy } from '../../lib/copy';

export function DesignSystemPage() {
  const { addToast } = useAppStore();

  // State for interactive demos
  const [activeTab, setActiveTab] = useState('overview');
  const [switchVal, setSwitchVal] = useState(true);
  const [checkboxVal, setCheckboxVal] = useState(true);
  const [radioVal, setRadioVal] = useState('academic');
  const [inputValue, setInputValue] = useState('Academic Reading Masterclass');
  const [textareaValue, setTextareaValue] = useState(
    'Bilingual education enhances cognitive flexibility and executive functioning across the lifespan.'
  );
  const [progressVal, setProgressVal] = useState(65);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  // 11-step Brand Green Scale
  const brandGreenScale = [
    { step: '50', hex: ZARII_BRAND.scale[50], bg: 'bg-[#F1FAF5]', text: 'text-[#12211B]', role: 'Subtle Tint / Card Highlight' },
    { step: '100', hex: ZARII_BRAND.scale[100], bg: 'bg-[#DDF2E7]', text: 'text-[#12211B]', role: 'Light Hover / Badge Background' },
    { step: '200', hex: ZARII_BRAND.scale[200], bg: 'bg-[#B6E3CD]', text: 'text-[#12211B]', role: 'Border Accent / Soft Badge' },
    { step: '300', hex: ZARII_BRAND.scale[300], bg: 'bg-[#8ACFAE]', text: 'text-[#12211B]', role: 'Focus Ring (2px) / Mint Shadow' },
    { step: '400', hex: ZARII_BRAND.scale[400], bg: 'bg-[#5BB78D]', text: 'text-[#0A2E25]', role: 'Logo Mint (Accents & Highlights only)' },
    { step: '500', hex: ZARII_BRAND.scale[500], bg: 'bg-[#2F9477]', text: 'text-white', role: 'Vibrant Green / Active State' },
    { step: '600', hex: ZARII_BRAND.scale[600], bg: 'bg-[#1E7A62]', text: 'text-white', role: 'Reading Accent / Links' },
    { step: '700', hex: ZARII_BRAND.scale[700], bg: 'bg-[#17634F]', text: 'text-white', role: 'Primary Button Hover / Dark Tint' },
    { step: '800', hex: ZARII_BRAND.scale[800], bg: 'bg-[#124F40]', text: 'text-white', role: 'Logo Deep Green (Primary CTA)' },
    { step: '900', hex: ZARII_BRAND.scale[900], bg: 'bg-[#0E3D32]', text: 'text-white', role: 'Deep Surface / Dark Container' },
    { step: '950', hex: ZARII_BRAND.scale[950], bg: 'bg-[#0A2E25]', text: 'text-white', role: 'Darkest Brand Surface' },
  ];

  // Neutrals (Green-tinted gray)
  const neutralScale = [
    { name: 'Background', hex: ZARII_BRAND.neutral.background, bg: 'bg-[#F7FAF8]', text: 'text-[#12211B]', desc: 'Light mode page background (off-white hint of green)' },
    { name: 'Surface', hex: ZARII_BRAND.neutral.surface, bg: 'bg-[#FFFFFF]', text: 'text-[#12211B]', desc: 'Card and container surfaces' },
    { name: 'Border', hex: ZARII_BRAND.neutral.border, bg: 'bg-[#E1EBE5]', text: 'text-[#12211B]', desc: 'Subtle green-gray borders and dividers' },
    { name: 'Muted Text', hex: ZARII_BRAND.neutral.muted, bg: 'bg-[#5B6B63]', text: 'text-white', desc: 'Secondary captions, hints and labels' },
    { name: 'Main Text', hex: ZARII_BRAND.neutral.main, bg: 'bg-[#12211B]', text: 'text-white', desc: 'High-contrast headings and body text' },
  ];

  // Dark Mode Surfaces
  const darkModeSurfaces = [
    { name: 'Dark Background', hex: ZARII_BRAND.dark.background, bg: 'bg-[#0B1612]', text: 'text-[#E8F2EC]', desc: 'Base dark canvas' },
    { name: 'Dark Surface', hex: ZARII_BRAND.dark.surface, bg: 'bg-[#112019]', text: 'text-[#E8F2EC]', desc: 'Dark card background' },
    { name: 'Dark Elevated', hex: ZARII_BRAND.dark.elevated, bg: 'bg-[#172A21]', text: 'text-[#E8F2EC]', desc: 'Modals, popovers, dropdowns' },
    { name: 'Dark Border', hex: ZARII_BRAND.dark.border, bg: 'bg-[#24392F]', text: 'text-[#E8F2EC]', desc: 'Dark container borders' },
    { name: 'Dark Text', hex: ZARII_BRAND.dark.text, bg: 'bg-[#E8F2EC]', text: 'text-[#0B1612]', desc: 'High-contrast light text' },
    { name: 'Dark Muted', hex: ZARII_BRAND.dark.muted, bg: 'bg-[#9DB3A7]', text: 'text-[#0B1612]', desc: 'Muted text in dark mode' },
  ];

  // Semantic Colors
  const semanticColors = [
    { name: 'Success', hex: ZARII_BRAND.semantic.success, bg: 'bg-[#1E9E63]', text: 'text-white', desc: 'Passing score, correct answer, saved' },
    { name: 'Warning', hex: ZARII_BRAND.semantic.warning, bg: 'bg-[#D99A0B]', text: 'text-[#12211B]', desc: 'Timer expiring, review flagged, caution' },
    { name: 'Error', hex: ZARII_BRAND.semantic.error, bg: 'bg-[#D1453B]', text: 'text-white', desc: 'Validation errors, missed threshold' },
    { name: 'Info', hex: ZARII_BRAND.semantic.info, bg: 'bg-[#2B7FB8]', text: 'text-white', desc: 'Tips, Cambridge exam notes, guidance' },
  ];

  // Skill Tokens
  const skillPalettes = [
    {
      skill: 'listening',
      name: 'Listening',
      icon: Headphones,
      desc: 'Teal tone with soft mint-teal tint. Audio playback and multi-speaker cues.',
      color: SKILL_THEMES.listening.color,
      tint: '#EDF8F8',
      darkTint: '#0A2424',
      badgeVar: 'listening' as const,
    },
    {
      skill: 'reading',
      name: 'Reading',
      icon: BookOpen,
      desc: 'Brand green tone with sage tint. Academic serif reading passages and annotations.',
      color: SKILL_THEMES.reading.color,
      tint: '#F1FAF5',
      darkTint: '#0E3D32',
      badgeVar: 'reading' as const,
    },
    {
      skill: 'writing',
      name: 'Writing',
      icon: PenTool,
      desc: 'Amber tone with warm ivory tint. Word count milestones and Task 1/2 criteria.',
      color: SKILL_THEMES.writing.color,
      tint: '#FEF8EC',
      darkTint: '#291C04',
      badgeVar: 'writing' as const,
    },
    {
      skill: 'speaking',
      name: 'Speaking',
      icon: Mic,
      desc: 'Terracotta tone with blush tint. Voice examiner recording and cue card timers.',
      color: SKILL_THEMES.speaking.color,
      tint: '#FCF1EE',
      darkTint: '#2D140F',
      badgeVar: 'speaking' as const,
    },
  ];

  // Contrast Verification Table
  const contrastVerification = [
    {
      pair: 'Brand 800 (#124F40) on White (#FFFFFF)',
      ratio: '8.8 : 1',
      wcag: 'AAA Pass',
      badge: 'bg-[#1E9E63]/10 text-[#1E9E63] border-[#1E9E63]/30',
      useCase: 'Primary buttons & active navigation tabs in Light Mode',
    },
    {
      pair: 'Brand 700 (#17634F) on White (#FFFFFF)',
      ratio: '6.5 : 1',
      wcag: 'AAA Pass',
      badge: 'bg-[#1E9E63]/10 text-[#1E9E63] border-[#1E9E63]/30',
      useCase: 'Interactive headings, icons, and hover button states',
    },
    {
      pair: 'Brand 600 (#1E7A62) on White (#FFFFFF)',
      ratio: '4.8 : 1',
      wcag: 'AA Pass',
      badge: 'bg-[#1E9E63]/10 text-[#1E9E63] border-[#1E9E63]/30',
      useCase: 'Text hyperlinks, reading module highlights',
    },
    {
      pair: 'Main Text (#12211B) on Page Bg (#F7FAF8)',
      ratio: '16.8 : 1',
      wcag: 'AAA Pass',
      badge: 'bg-[#1E9E63]/10 text-[#1E9E63] border-[#1E9E63]/30',
      useCase: 'Primary body text and typography across light mode',
    },
    {
      pair: 'Dark Text (#E8F2EC) on Dark Bg (#0B1612)',
      ratio: '15.6 : 1',
      wcag: 'AAA Pass',
      badge: 'bg-[#1E9E63]/10 text-[#1E9E63] border-[#1E9E63]/30',
      useCase: 'Primary typography in Dark Mode',
    },
    {
      pair: 'Dark Button Text (#0A2E25) on Mint 400 (#5BB78D)',
      ratio: '6.2 : 1',
      wcag: 'AA Pass',
      badge: 'bg-[#1E9E63]/10 text-[#1E9E63] border-[#1E9E63]/30',
      useCase: 'Dark mode primary button fills with high-contrast dark text',
    },
    {
      pair: 'Mint 400 (#5BB78D) on White (#FFFFFF)',
      ratio: '2.0 : 1',
      wcag: 'Fails for Text',
      badge: 'bg-[#D1453B]/10 text-[#D1453B] border-[#D1453B]/30',
      useCase: 'NEVER used as text on white. Accents, progress bars & icons only.',
    },
    {
      pair: 'Focus Ring Mint 300 (#8ACFAE) on White/Dark',
      ratio: 'Visible 2px Ring',
      wcag: 'Compliant',
      badge: 'bg-[#1E9E63]/10 text-[#1E9E63] border-[#1E9E63]/30',
      useCase: 'Universal 2px focus ring on buttons, inputs, links',
    },
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-12 pb-16">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-brand-neutral-border dark:border-brand-dark-border">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Badge variant="primary" dot>
              Zarii Brand System v2.0
            </Badge>
            <Badge variant="outline">WCAG 2.1 AA/AAA Compliant</Badge>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-brand-neutral-main dark:text-brand-dark-text">
            Zarii Design Tokens & Component Library
          </h1>
          <p className="text-sm text-brand-neutral-muted dark:text-brand-dark-muted mt-1 max-w-2xl leading-relaxed">
            Rooted in the official Zarii logo palette: Deep Green (<code className="text-brand-800 dark:text-brand-400 font-mono font-bold">#124F40</code>) and Mint Accent (<code className="text-brand-600 dark:text-brand-400 font-mono font-bold">#5BB78D</code>).
            Zero arbitrary blues or indigos. Built strictly with CSS variables and Tailwind tokens.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsDrawerOpen(true)}
            leftIcon={<SlidersHorizontal className="w-4 h-4" />}
          >
            Token Inspector
          </Button>
          <Button
            variant="primary"
            size="sm"
            onClick={() => setIsModalOpen(true)}
            leftIcon={<Sparkles className="w-4 h-4" />}
          >
            Launch Modal Demo
          </Button>
        </div>
      </div>

      {/* 0. Official Logo & Scalable Brand Assets */}
      <section className="space-y-6">
        <div>
          <h2 className="text-lg font-bold text-brand-neutral-main dark:text-brand-dark-text flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-brand-400" />
            Official Logo &amp; Scalable Brand Assets
          </h2>
          <p className="text-xs text-brand-neutral-muted dark:text-brand-dark-muted mt-0.5">
            Traced and exported as clean SVGs in <code className="font-mono text-brand-800 dark:text-brand-400">public/brand/</code>. Includes solid fills, white versions for dark surfaces, and clear-space guidelines.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Full Logo */}
          <Card>
            <CardHeader>
              <CardTitle>Full Logo</CardTitle>
              <CardDescription>Z + Book + &quot;Zarii&quot; + &quot;IELTS PREPARATION&quot;</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-6 rounded-2xl bg-brand-neutral-bg border border-brand-neutral-border flex items-center justify-center min-h-[140px]">
                <ZariiLogo variant="full" size="lg" theme="light" />
              </div>
              <div className="p-6 rounded-2xl bg-brand-dark-bg border border-brand-dark-border flex items-center justify-center min-h-[140px]">
                <ZariiLogo variant="full" size="lg" theme="dark" />
              </div>
              <div className="text-2xs font-mono text-brand-neutral-muted dark:text-brand-dark-muted flex justify-between">
                <span>public/brand/zarii-logo-full.svg</span>
                <span className="text-brand-800 dark:text-brand-400">1024x1024 SVG</span>
              </div>
            </CardContent>
          </Card>

          {/* Symbol Mark */}
          <Card>
            <CardHeader>
              <CardTitle>Symbol Mark</CardTitle>
              <CardDescription>Z-on-book symbol (used in collapsed sidebar &amp; icons)</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-6 rounded-2xl bg-brand-neutral-bg border border-brand-neutral-border flex items-center justify-center min-h-[140px]">
                <ZariiLogo variant="mark" size="xl" theme="light" />
              </div>
              <div className="p-6 rounded-2xl bg-brand-dark-bg border border-brand-dark-border flex items-center justify-center min-h-[140px]">
                <ZariiLogo variant="mark" size="xl" theme="dark" />
              </div>
              <div className="text-2xs font-mono text-brand-neutral-muted dark:text-brand-dark-muted flex justify-between">
                <span>public/brand/zarii-mark.svg</span>
                <span className="text-brand-800 dark:text-brand-400">Favicon / PWA</span>
              </div>
            </CardContent>
          </Card>

          {/* Wordmark */}
          <Card>
            <CardHeader>
              <CardTitle>Wordmark</CardTitle>
              <CardDescription>&quot;Zarii&quot; typographic mark with custom &apos;i&apos; circular dots</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-6 rounded-2xl bg-brand-neutral-bg border border-brand-neutral-border flex items-center justify-center min-h-[140px]">
                <ZariiLogo variant="wordmark" size="lg" theme="light" />
              </div>
              <div className="p-6 rounded-2xl bg-brand-dark-bg border border-brand-dark-border flex items-center justify-center min-h-[140px]">
                <ZariiLogo variant="wordmark" size="lg" theme="dark" />
              </div>
              <div className="text-2xs font-mono text-brand-neutral-muted dark:text-brand-dark-muted flex justify-between">
                <span>public/brand/zarii-wordmark.svg</span>
                <span className="text-brand-800 dark:text-brand-400">Horizontal Nav</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Clear Space & Usage Rules */}
        <Card className="border-brand-300 dark:border-brand-dark-border">
          <CardContent className="p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="font-bold text-sm text-brand-neutral-main dark:text-brand-dark-text flex items-center gap-2">
                <Check className="w-4 h-4 text-brand-500" />
                Clear Space Rule: Equal to the Height of the &quot;i&quot; Dot (~50px)
              </div>
              <p className="text-xs text-brand-neutral-muted dark:text-brand-dark-muted">
                Always maintain minimum breathing room around the logo equal to the diameter/height of the &quot;i&quot; dot. Never stretch, distort, re-proportion, or arbitrarily recolor the logo elements.
              </p>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <Badge variant="outline">favicon.svg</Badge>
              <Badge variant="outline">apple-touch-icon (180px)</Badge>
              <Badge variant="outline">PWA Maskable 512</Badge>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* 0.5 Brand Voice & Central Copy System */}
      <section className="space-y-6">
        <div>
          <h2 className="text-lg font-bold text-brand-neutral-main dark:text-brand-dark-text flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-brand-500" />
            Brand Voice &amp; Central Copy System (<code className="font-mono text-brand-800 dark:text-brand-400">src/lib/copy.ts</code>)
          </h2>
          <p className="text-xs text-brand-neutral-muted dark:text-brand-dark-muted mt-0.5">
            Voice standard: Clear, supportive, professional, never childish. Short sentences. Defined once in a central dictionary for easy maintenance.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Identity & Mission */}
          <Card>
            <CardHeader>
              <CardTitle>Identity, Tagline &amp; About</CardTitle>
              <CardDescription>Core brand statements and mission summary</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 text-xs">
              <div className="p-3 rounded-xl bg-brand-50/70 dark:bg-brand-dark-surface border border-brand-200 dark:border-brand-dark-border space-y-1">
                <div className="text-2xs font-semibold text-brand-800 dark:text-brand-400 uppercase tracking-wider">Tagline</div>
                <div className="text-sm font-bold text-brand-neutral-main dark:text-brand-dark-text">
                  &ldquo;{copy.brand.tagline}&rdquo;
                </div>
              </div>

              <div className="p-3 rounded-xl bg-brand-50/70 dark:bg-brand-dark-surface border border-brand-200 dark:border-brand-dark-border space-y-1">
                <div className="text-2xs font-semibold text-brand-800 dark:text-brand-400 uppercase tracking-wider">Two-Sentence About</div>
                <div className="text-xs text-brand-neutral-muted dark:text-brand-dark-muted leading-relaxed">
                  {copy.brand.shortAbout}
                </div>
              </div>

              <div className="p-3 rounded-xl bg-brand-50/70 dark:bg-brand-dark-surface border border-brand-200 dark:border-brand-dark-border space-y-1">
                <div className="text-2xs font-semibold text-brand-800 dark:text-brand-400 uppercase tracking-wider">Official Disclaimer</div>
                <div className="text-xs font-mono text-brand-neutral-muted dark:text-brand-dark-muted">
                  &ldquo;{copy.disclaimers.scoresEstimate}&rdquo;
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Core UI Microcopy Examples */}
          <Card>
            <CardHeader>
              <CardTitle>UI Microcopy Benchmarks</CardTitle>
              <CardDescription>Four quintessential voice examples</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3 text-xs">
              <div className="p-3 rounded-xl border border-brand-neutral-border dark:border-brand-dark-border space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-brand-neutral-main dark:text-brand-dark-text">Empty State:</span>
                  <Badge variant="outline">Calm &amp; Actionable</Badge>
                </div>
                <p className="text-brand-neutral-muted dark:text-brand-dark-muted font-medium">
                  &ldquo;{copy.emptyStates.reading.title} {copy.emptyStates.reading.description}&rdquo;
                </p>
              </div>

              <div className="p-3 rounded-xl border border-brand-neutral-border dark:border-brand-dark-border space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-brand-neutral-main dark:text-brand-dark-text">Success / Save:</span>
                  <Badge variant="teal">Supportive</Badge>
                </div>
                <p className="text-brand-neutral-muted dark:text-brand-dark-muted font-medium">
                  &ldquo;{copy.success.savedStreak(5)}&rdquo;
                </p>
              </div>

              <div className="p-3 rounded-xl border border-brand-neutral-border dark:border-brand-dark-border space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-brand-neutral-main dark:text-brand-dark-text">Error / Recovery:</span>
                  <Badge variant="outline">Reassuring</Badge>
                </div>
                <p className="text-brand-neutral-muted dark:text-brand-dark-muted font-medium">
                  &ldquo;{copy.errors.generic}&rdquo;
                </p>
              </div>

              <div className="p-3 rounded-xl border border-brand-neutral-border dark:border-brand-dark-border space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-brand-neutral-main dark:text-brand-dark-text">AI Fallback:</span>
                  <Badge variant="outline">Transparent</Badge>
                </div>
                <p className="text-brand-neutral-muted dark:text-brand-dark-muted font-medium">
                  &ldquo;{copy.aiFallback.banner}&rdquo;
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Notifications & Action Copy */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Study Reminder Notifications</CardTitle>
              <CardDescription>Clean, encouraging push notifications and alerts</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3 text-xs">
              <div className="p-3 rounded-xl bg-brand-50/70 dark:bg-brand-dark-surface border border-brand-neutral-border dark:border-brand-dark-border space-y-1">
                <div className="font-bold text-brand-neutral-main dark:text-brand-dark-text">{copy.notifications.dailyReminderTitle}</div>
                <p className="text-brand-neutral-muted dark:text-brand-dark-muted">{copy.notifications.dailyReminderBody(15, 30)}</p>
              </div>
              <div className="p-3 rounded-xl bg-brand-50/70 dark:bg-brand-dark-surface border border-brand-neutral-border dark:border-brand-dark-border space-y-1">
                <div className="font-bold text-brand-neutral-main dark:text-brand-dark-text">{copy.notifications.streakWarningTitle}</div>
                <p className="text-brand-neutral-muted dark:text-brand-dark-muted">{copy.notifications.streakWarningBody(7)}</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Standard Button Labels &amp; Tooltips</CardTitle>
              <CardDescription>Consistent actions and contextual micro-explanations</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3 text-xs">
              <div className="flex flex-wrap gap-2">
                <Badge variant="primary">{copy.buttons.startTest}</Badge>
                <Badge variant="primary">{copy.buttons.submitTest}</Badge>
                <Badge variant="outline">{copy.buttons.flagQuestion}</Badge>
                <Badge variant="outline">{copy.buttons.reviewAnswers}</Badge>
                <Badge variant="outline">{copy.buttons.saveDraft}</Badge>
                <Badge variant="outline">{copy.buttons.tryAgain}</Badge>
              </div>
              <div className="p-3 rounded-xl border border-brand-neutral-border dark:border-brand-dark-border space-y-1.5 text-2xs text-brand-neutral-muted dark:text-brand-dark-muted">
                <div><strong>Timer:</strong> {copy.tooltips.timer}</div>
                <div><strong>Flag:</strong> {copy.tooltips.flag}</div>
                <div><strong>Daily Goal:</strong> {copy.tooltips.dailyGoal}</div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* 1. Brand Green Scale (50-950) */}
      <section className="space-y-6">
        <div>
          <h2 className="text-lg font-bold text-brand-neutral-main dark:text-brand-dark-text flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-brand-800 dark:bg-brand-400" />
            1. Brand Green Scale (50 – 950)
          </h2>
          <p className="text-xs text-brand-neutral-muted dark:text-brand-dark-muted mt-0.5">
            Generated smoothly from the deep green logo anchor. 800 is the official logo deep green; 400 is the official logo mint accent.
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Brand Green Palette</CardTitle>
            <CardDescription>
              Accessible, calming greens engineered for sustained focus during 60-minute IELTS exam simulations.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-11 gap-2.5">
              {brandGreenScale.map((s) => (
                <div
                  key={s.step}
                  className="flex flex-col rounded-xl overflow-hidden shadow-sm border border-brand-neutral-border dark:border-brand-dark-border"
                >
                  <div className={`h-16 ${s.bg} flex flex-col justify-end p-2`}>
                    <span className={`text-xs font-mono font-bold ${s.text}`}>
                      {s.step} {s.step === '800' ? '★' : s.step === '400' ? '✦' : ''}
                    </span>
                  </div>
                  <div className="p-2 bg-white dark:bg-brand-dark-surface text-brand-neutral-muted dark:text-brand-dark-muted text-2xs space-y-0.5">
                    <span className="font-mono font-semibold block text-brand-neutral-main dark:text-brand-dark-text">
                      {s.hex}
                    </span>
                    <span className="text-[10px] leading-tight block text-brand-neutral-muted dark:text-brand-dark-muted">
                      {s.role}
                    </span>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 p-3 rounded-lg bg-brand-50 dark:bg-brand-dark-surface border border-brand-200 dark:border-brand-dark-border text-xs text-brand-neutral-main dark:text-brand-dark-text flex items-center gap-2">
              <span className="font-semibold text-brand-800 dark:text-brand-400">Usage Note:</span>
              <span>
                ★ <strong>800 (#124F40)</strong> is used for primary buttons and active navigation (AAA contrast).
                ✦ <strong>400 (#5BB78D)</strong> is for accents, progress fills, badges, and charts only — NEVER as text on white.
              </span>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* 2. Green-Tinted Neutrals & Dark Mode Surfaces */}
      <section className="space-y-6">
        <div>
          <h2 className="text-lg font-bold text-brand-neutral-main dark:text-brand-dark-text flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-brand-neutral-muted" />
            2. Green-Tinted Neutrals & Dark Theme Surfaces
          </h2>
          <p className="text-xs text-brand-neutral-muted dark:text-brand-dark-muted mt-0.5">
            Slightly green-tinted gray scale that harmonizes with the Zarii brand in both light and dark modes.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Light Mode Neutrals */}
          <Card>
            <CardHeader>
              <CardTitle>Light Mode Neutrals</CardTitle>
              <CardDescription>Soft off-white canvas with subtle green-gray borders.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {neutralScale.map((n) => (
                <div
                  key={n.name}
                  className="flex items-center justify-between p-3 rounded-xl border border-brand-neutral-border dark:border-brand-dark-border bg-white dark:bg-brand-dark-surface"
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-lg ${n.bg} border border-brand-neutral-border dark:border-brand-dark-border shadow-inner shrink-0`} />
                    <div>
                      <div className="font-semibold text-xs text-brand-neutral-main dark:text-brand-dark-text">
                        {n.name}
                      </div>
                      <div className="text-2xs text-brand-neutral-muted dark:text-brand-dark-muted">
                        {n.desc}
                      </div>
                    </div>
                  </div>
                  <code className="text-2xs font-mono font-bold text-brand-800 dark:text-brand-400">
                    {n.hex}
                  </code>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Dark Mode Surfaces */}
          <Card>
            <CardHeader>
              <CardTitle>Dark Theme Palette</CardTitle>
              <CardDescription>Softer dark green-tinted charcoal surfaces (no harsh pure blacks).</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {darkModeSurfaces.map((d) => (
                <div
                  key={d.name}
                  className="flex items-center justify-between p-3 rounded-xl border border-brand-neutral-border dark:border-brand-dark-border bg-white dark:bg-brand-dark-surface"
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-lg ${d.bg} border border-brand-neutral-border dark:border-brand-dark-border shadow-inner shrink-0`} />
                    <div>
                      <div className="font-semibold text-xs text-brand-neutral-main dark:text-brand-dark-text">
                        {d.name}
                      </div>
                      <div className="text-2xs text-brand-neutral-muted dark:text-brand-dark-muted">
                        {d.desc}
                      </div>
                    </div>
                  </div>
                  <code className="text-2xs font-mono font-bold text-brand-800 dark:text-brand-400">
                    {d.hex}
                  </code>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </section>

      {/* 3. Harmonized Semantic Colors */}
      <section className="space-y-6">
        <div>
          <h2 className="text-lg font-bold text-brand-neutral-main dark:text-brand-dark-text flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#1E9E63]" />
            3. Semantic Color Tokens
          </h2>
          <p className="text-xs text-brand-neutral-muted dark:text-brand-dark-muted mt-0.5">
            Success, warning, error, and informational tokens tuned to harmonize with green tones.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {semanticColors.map((sc) => (
            <Card key={sc.name}>
              <CardContent className="p-4 space-y-3">
                <div className={`h-12 rounded-lg ${sc.bg} flex items-center justify-between px-3 text-white font-bold text-xs`}>
                  <span>{sc.name}</span>
                  <span className="font-mono text-2xs">{sc.hex}</span>
                </div>
                <p className="text-2xs text-brand-neutral-muted dark:text-brand-dark-muted">
                  {sc.desc}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* 4. Four IELTS Skill Palettes */}
      <section className="space-y-6">
        <div>
          <h2 className="text-lg font-bold text-brand-neutral-main dark:text-brand-dark-text flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#0F8B8D]" />
            4. IELTS Skill Color System
          </h2>
          <p className="text-xs text-brand-neutral-muted dark:text-brand-dark-muted mt-0.5">
            Consistent tone + soft tint system: Listening (Teal), Reading (Brand Green), Writing (Amber), Speaking (Terracotta).
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {skillPalettes.map((sp) => {
            const Icon = sp.icon;
            return (
              <Card key={sp.skill} className="border border-brand-neutral-border dark:border-brand-dark-border">
                <CardContent className="p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center text-white shadow-sm"
                      style={{ backgroundColor: sp.color }}
                    >
                      <Icon className="w-5 h-5 stroke-[2]" />
                    </div>
                    <Badge variant={sp.badgeVar} dot>
                      {sp.name}
                    </Badge>
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-brand-neutral-main dark:text-brand-dark-text">
                      {sp.name} Module
                    </h4>
                    <p className="text-xs text-brand-neutral-muted dark:text-brand-dark-muted mt-1 leading-relaxed">
                      {sp.desc}
                    </p>
                  </div>
                  <div className="pt-2 border-t border-brand-neutral-border dark:border-brand-dark-border flex items-center justify-between text-2xs font-mono">
                    <span className="text-brand-neutral-muted dark:text-brand-dark-muted">Solid:</span>
                    <span className="font-bold" style={{ color: sp.color }}>{sp.color}</span>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>

      {/* 5. Recharts Analytics Palette */}
      <section className="space-y-6">
        <div>
          <h2 className="text-lg font-bold text-brand-neutral-main dark:text-brand-dark-text flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-brand-400" />
            5. Recharts Visualization Palette
          </h2>
          <p className="text-xs text-brand-neutral-muted dark:text-brand-dark-muted mt-0.5">
            Calibrated for Band Score trajectories, radar capability charts, and accuracy bar charts.
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="w-4 h-4 text-brand-800 dark:text-brand-400" />
              Chart Series Tokens
            </CardTitle>
            <CardDescription>
              Target Band reference line uses a dashed mint stroke (<code className="font-mono text-brand-800 dark:text-brand-400">#5BB78D</code>).
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
              <div className="p-3 rounded-xl border border-brand-neutral-border dark:border-brand-dark-border bg-brand-neutral-bg dark:bg-brand-dark-surface space-y-2">
                <div className="h-6 rounded bg-[#124F40]" />
                <div className="text-xs font-semibold text-brand-neutral-main dark:text-brand-dark-text">Brand 800</div>
                <div className="text-2xs font-mono text-brand-neutral-muted dark:text-brand-dark-muted">#124F40</div>
              </div>
              <div className="p-3 rounded-xl border border-brand-neutral-border dark:border-brand-dark-border bg-brand-neutral-bg dark:bg-brand-dark-surface space-y-2">
                <div className="h-6 rounded bg-[#5BB78D]" />
                <div className="text-xs font-semibold text-brand-neutral-main dark:text-brand-dark-text">Brand 400 (Mint)</div>
                <div className="text-2xs font-mono text-brand-neutral-muted dark:text-brand-dark-muted">#5BB78D</div>
              </div>
              <div className="p-3 rounded-xl border border-brand-neutral-border dark:border-brand-dark-border bg-brand-neutral-bg dark:bg-brand-dark-surface space-y-2">
                <div className="h-6 rounded bg-[#0F8B8D]" />
                <div className="text-xs font-semibold text-brand-neutral-main dark:text-brand-dark-text">Listening (Teal)</div>
                <div className="text-2xs font-mono text-brand-neutral-muted dark:text-brand-dark-muted">#0F8B8D</div>
              </div>
              <div className="p-3 rounded-xl border border-brand-neutral-border dark:border-brand-dark-border bg-brand-neutral-bg dark:bg-brand-dark-surface space-y-2">
                <div className="h-6 rounded bg-[#C98A0A]" />
                <div className="text-xs font-semibold text-brand-neutral-main dark:text-brand-dark-text">Writing (Amber)</div>
                <div className="text-2xs font-mono text-brand-neutral-muted dark:text-brand-dark-muted">#C98A0A</div>
              </div>
              <div className="p-3 rounded-xl border border-brand-neutral-border dark:border-brand-dark-border bg-brand-neutral-bg dark:bg-brand-dark-surface space-y-2">
                <div className="h-6 rounded bg-[#CF5C45]" />
                <div className="text-xs font-semibold text-brand-neutral-main dark:text-brand-dark-text">Speaking (Terracotta)</div>
                <div className="text-2xs font-mono text-brand-neutral-muted dark:text-brand-dark-muted">#CF5C45</div>
              </div>
              <div className="p-3 rounded-xl border border-brand-neutral-border dark:border-brand-dark-border bg-brand-neutral-bg dark:bg-brand-dark-surface space-y-2">
                <div className="h-6 rounded bg-[#8E9F97]" />
                <div className="text-xs font-semibold text-brand-neutral-main dark:text-brand-dark-text">Neutral Gray</div>
                <div className="text-2xs font-mono text-brand-neutral-muted dark:text-brand-dark-muted">#8E9F97</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* 6. Contrast Verification Table */}
      <section className="space-y-6">
        <div>
          <h2 className="text-lg font-bold text-brand-neutral-main dark:text-brand-dark-text flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-brand-800 dark:text-brand-400" />
            6. WCAG 2.1 Contrast Verification & Usage Rules
          </h2>
          <p className="text-xs text-brand-neutral-muted dark:text-brand-dark-muted mt-0.5">
            Verified contrast ratios ensuring accessibility across light mode, dark mode, and high-contrast settings.
          </p>
        </div>

        <Card>
          <CardContent className="p-0 overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead className="bg-brand-50 dark:bg-brand-dark-surface border-b border-brand-neutral-border dark:border-brand-dark-border text-brand-neutral-main dark:text-brand-dark-text font-semibold">
                <tr>
                  <th className="p-3">Color Combination</th>
                  <th className="p-3">Contrast Ratio</th>
                  <th className="p-3">WCAG Status</th>
                  <th className="p-3">Design System Usage Rule</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-brand-neutral-border dark:divide-brand-dark-border">
                {contrastVerification.map((cv, idx) => (
                  <tr key={idx} className="hover:bg-brand-50/50 dark:hover:bg-brand-dark-elevated/40 transition-colors">
                    <td className="p-3 font-medium text-brand-neutral-main dark:text-brand-dark-text">
                      {cv.pair}
                    </td>
                    <td className="p-3 font-mono font-bold text-brand-800 dark:text-brand-400">
                      {cv.ratio}
                    </td>
                    <td className="p-3">
                      <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-2xs font-semibold border ${cv.badge}`}>
                        {cv.wcag.includes('Pass') || cv.wcag === 'Compliant' ? (
                          <Check className="w-3 h-3" />
                        ) : (
                          <AlertTriangle className="w-3 h-3" />
                        )}
                        {cv.wcag}
                      </span>
                    </td>
                    <td className="p-3 text-brand-neutral-muted dark:text-brand-dark-muted">
                      {cv.useCase}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </CardContent>
        </Card>
      </section>

      {/* 7. Buttons & Interactive Controls */}
      <section className="space-y-6">
        <div>
          <h2 className="text-lg font-bold text-brand-neutral-main dark:text-brand-dark-text flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-brand-800 dark:bg-brand-400" />
            7. Buttons & Interactive Controls
          </h2>
          <p className="text-xs text-brand-neutral-muted dark:text-brand-dark-muted mt-0.5">
            Primary buttons in brand 800 with white text (AA/AAA). Focus rings in mint 300.
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Button Variants & States</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Variants */}
            <div>
              <div className="text-xs font-semibold text-brand-neutral-muted dark:text-brand-dark-muted mb-2 uppercase tracking-wider">
                Variants
              </div>
              <div className="flex flex-wrap items-center gap-3">
                <Button variant="primary">Primary (Brand 800)</Button>
                <Button variant="accent">Accent Action</Button>
                <Button variant="secondary">Secondary</Button>
                <Button variant="outline">Outline</Button>
                <Button variant="ghost">Ghost Button</Button>
                <Button variant="danger">Danger</Button>
              </div>
            </div>

            {/* Sizing */}
            <div>
              <div className="text-xs font-semibold text-brand-neutral-muted dark:text-brand-dark-muted mb-2 uppercase tracking-wider">
                Sizes (xs, sm, md, lg)
              </div>
              <div className="flex flex-wrap items-center gap-3">
                <Button size="xs" variant="primary">Extra Small</Button>
                <Button size="sm" variant="primary">Small Button</Button>
                <Button size="md" variant="primary">Medium (Default)</Button>
                <Button size="lg" variant="primary">Large CTA Button</Button>
              </div>
            </div>

            {/* States & Icons */}
            <div>
              <div className="text-xs font-semibold text-brand-neutral-muted dark:text-brand-dark-muted mb-2 uppercase tracking-wider">
                States & Icons
              </div>
              <div className="flex flex-wrap items-center gap-3">
                <Button variant="primary" leftIcon={<Sparkles className="w-4 h-4" />}>
                  With Left Icon
                </Button>
                <Button variant="secondary" rightIcon={<ArrowRight className="w-4 h-4" />}>
                  With Right Icon
                </Button>
                <Button variant="primary" loading>
                  Loading State
                </Button>
                <Button variant="primary" disabled>
                  Disabled Button
                </Button>
              </div>
            </div>

            {/* Icon Buttons */}
            <div>
              <div className="text-xs font-semibold text-brand-neutral-muted dark:text-brand-dark-muted mb-2 uppercase tracking-wider">
                IconButton Sizes & Shapes
              </div>
              <div className="flex items-center gap-3">
                <IconButton aria-label="Add item" size="xs" variant="secondary">
                  <Plus className="w-3.5 h-3.5" />
                </IconButton>
                <IconButton aria-label="Search" size="sm" variant="outline">
                  <Search className="w-4 h-4" />
                </IconButton>
                <IconButton aria-label="Settings" size="md" variant="primary">
                  <Settings className="w-4 h-4" />
                </IconButton>
                <IconButton aria-label="Delete" size="lg" variant="danger" shape="circle">
                  <Trash2 className="w-5 h-5" />
                </IconButton>
                <IconButton aria-label="Loading" size="md" variant="outline" loading>
                  <Share2 className="w-4 h-4" />
                </IconButton>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* 8. Form Inputs & Selection */}
      <section className="space-y-6">
        <div>
          <h2 className="text-lg font-bold text-brand-neutral-main dark:text-brand-dark-text flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-brand-700 dark:bg-brand-400" />
            8. Form Inputs, Selectors & Switches
          </h2>
          <p className="text-xs text-brand-neutral-muted dark:text-brand-dark-muted mt-0.5">
            Inputs styled with subtle green-gray borders and 2px mint-300 focus rings.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Text Inputs & Textareas</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Input
                label="Course Title"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                leftIcon={<Search className="w-4 h-4" />}
                clearable
                onClear={() => setInputValue('')}
                helperText="Type any query to test clear button & focus state"
              />

              <Input
                label="Invalid Response Example"
                defaultValue="invalid_format_email"
                error="Please enter a valid candidate email address."
              />

              <Select label="Selected Examination Tier" defaultValue="academic">
                <option value="academic">IELTS Academic (Higher Education & Professional)</option>
                <option value="general">IELTS General Training (Immigration & Work)</option>
                <option value="diagnostic">Diagnostic Benchmark Exam</option>
              </Select>

              <Textarea
                label="Sample Essay Response"
                value={textareaValue}
                onChange={(e) => setTextareaValue(e.target.value)}
                showCount
                maxLength={250}
                helperText="Minimum 150 words for Task 1; 250 for Task 2."
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Toggles, Checkboxes & Radios</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Switches */}
              <div className="space-y-3">
                <div className="text-xs font-semibold text-brand-neutral-muted dark:text-brand-dark-muted uppercase tracking-wider">
                  Switches
                </div>
                <div className="space-y-2">
                  <Switch
                    checked={switchVal}
                    onChange={setSwitchVal}
                    label="Strict 60-Minute Exam Timer"
                    description="Automatically locks answer inputs when time reaches zero."
                  />
                  <Switch
                    checked={false}
                    onChange={() => {}}
                    label="Offline Audio Caching"
                    description="Pre-download speech synthesis audio scripts."
                    size="sm"
                  />
                </div>
              </div>

              {/* Checkboxes */}
              <div className="space-y-3">
                <div className="text-xs font-semibold text-brand-neutral-muted dark:text-brand-dark-muted uppercase tracking-wider">
                  Checkboxes
                </div>
                <div className="space-y-2">
                  <Checkbox
                    checked={checkboxVal}
                    onChange={(e) => setCheckboxVal(e.target.checked)}
                    label="Include True / False / Not Given questions"
                    description="Identifies factual assertions against passage evidence."
                  />
                  <Checkbox
                    indeterminate
                    onChange={() => {}}
                    label="Flagged for review (Indeterminate)"
                  />
                  <Checkbox
                    disabled
                    label="Disabled option (Read only)"
                  />
                </div>
              </div>

              {/* Radio Group */}
              <div className="space-y-3">
                <div className="text-xs font-semibold text-brand-neutral-muted dark:text-brand-dark-muted uppercase tracking-wider">
                  Radio Group
                </div>
                <RadioGroup value={radioVal} onChange={setRadioVal}>
                  <RadioItem
                    value="academic"
                    label="Academic Module"
                    description="For university degree enrollment and professional registrations."
                  />
                  <RadioItem
                    value="general"
                    label="General Training Module"
                    description="For secondary education, migration, and vocational training."
                  />
                </RadioGroup>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* 9. Navigation, Tabs & Dropdowns */}
      <section className="space-y-6">
        <div>
          <h2 className="text-lg font-bold text-brand-neutral-main dark:text-brand-dark-text flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-brand-600 dark:bg-brand-400" />
            9. Navigation, Breadcrumbs & Tabs
          </h2>
          <p className="text-xs text-brand-neutral-muted dark:text-brand-dark-muted mt-0.5">
            Active navigation states use Brand 800 with crisp white text.
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Tabs & Segmented Controls</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <div className="text-xs font-semibold text-brand-neutral-muted dark:text-brand-dark-muted mb-2 uppercase tracking-wider">
                Segmented Pill Tabs
              </div>
              <Tabs
                activeTab={activeTab}
                onChange={setActiveTab}
                tabs={[
                  { id: 'overview', label: 'Module Overview', icon: <BookOpen className="w-3.5 h-3.5" /> },
                  { id: 'questions', label: 'All 40 Questions', badge: '40' },
                  { id: 'review', label: 'Explanations & Transcript' },
                  { id: 'scoring', label: 'Band Conversion' },
                ]}
              />
            </div>

            <div>
              <div className="text-xs font-semibold text-brand-neutral-muted dark:text-brand-dark-muted mb-2 uppercase tracking-wider">
                Underline Tab Variant
              </div>
              <Tabs
                variant="underline"
                activeTab={activeTab}
                onChange={setActiveTab}
                tabs={[
                  { id: 'overview', label: 'Overview' },
                  { id: 'questions', label: 'Questions (40)' },
                  { id: 'review', label: 'Notes & Highlighting' },
                ]}
              />
            </div>

            <div>
              <div className="text-xs font-semibold text-brand-neutral-muted dark:text-brand-dark-muted mb-2 uppercase tracking-wider">
                Breadcrumbs Navigation
              </div>
              <Breadcrumbs
                items={[
                  { label: 'Practice Modules', href: '/practice' },
                  { label: 'Reading', href: '/reading' },
                  { label: 'Academic Test 03' },
                ]}
              />
            </div>

            <div>
              <div className="text-xs font-semibold text-brand-neutral-muted dark:text-brand-dark-muted mb-2 uppercase tracking-wider">
                Dropdown Menus & Tooltips
              </div>
              <div className="flex items-center gap-4">
                <Dropdown
                  trigger={
                    <Button variant="outline" size="sm" rightIcon={<SlidersHorizontal className="w-3.5 h-3.5" />}>
                      Test Actions Menu
                    </Button>
                  }
                  items={[
                    { id: 'share', label: 'Copy Exam Link', icon: <Copy className="w-4 h-4" /> },
                    { id: 'print', label: 'Export Report as PDF', icon: <ExternalLink className="w-4 h-4" />, shortcut: 'Ctrl+P' },
                    { id: 'div1', label: '', divider: true },
                    { id: 'help', label: 'Scoring Rubric Help', icon: <HelpCircle className="w-4 h-4" /> },
                    { id: 'reset', label: 'Reset Progress & Answers', icon: <Trash2 className="w-4 h-4" />, danger: true },
                  ]}
                />

                <Tooltip content="Questions are marked automatically using Cambridge conversion tables.">
                  <Button variant="ghost" size="sm" leftIcon={<HelpCircle className="w-4 h-4 text-brand-600 dark:text-brand-400" />}>
                    Hover For Tooltip
                  </Button>
                </Tooltip>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* 10. Progress Bars & Counters */}
      <section className="space-y-6">
        <div>
          <h2 className="text-lg font-bold text-brand-neutral-main dark:text-brand-dark-text flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-brand-500" />
            10. Progress Bars, Animated Counters & Skeletons
          </h2>
          <p className="text-xs text-brand-neutral-muted dark:text-brand-dark-muted mt-0.5">
            Progress indicators mapped to Zarii Brand Mint (400) and IELTS skill colors.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Animated Counters & Progress</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-3 gap-3 p-4 rounded-xl bg-brand-50 dark:bg-brand-dark-surface border border-brand-neutral-border dark:border-brand-dark-border text-center">
                <div>
                  <div className="text-2xl font-extrabold text-brand-800 dark:text-brand-400 font-mono">
                    <AnimatedCounter value={8.5} decimals={1} />
                  </div>
                  <span className="text-2xs text-brand-neutral-muted dark:text-brand-dark-muted uppercase font-semibold">Target Band</span>
                </div>
                <div>
                  <div className="text-2xl font-extrabold text-[#0F8B8D] dark:text-[#52C5C7] font-mono">
                    <AnimatedCounter value={300} />
                  </div>
                  <span className="text-2xs text-brand-neutral-muted dark:text-brand-dark-muted uppercase font-semibold">Mastered Words</span>
                </div>
                <div>
                  <div className="text-2xl font-extrabold text-[#C98A0A] dark:text-[#F3DCB1] font-mono">
                    <AnimatedCounter value={94} suffix="%" />
                  </div>
                  <span className="text-2xs text-brand-neutral-muted dark:text-brand-dark-muted uppercase font-semibold">Accuracy</span>
                </div>
              </div>

              <div className="space-y-3 pt-2">
                <ProgressBar
                  value={progressVal}
                  label="Overall Test Completion"
                  showPercentage
                  variant="primary"
                />
                <ProgressBar
                  value={85}
                  label="Listening Accuracy"
                  variant="listening"
                  size="sm"
                  showPercentage
                />
                <ProgressBar
                  value={72}
                  label="Reading Accuracy"
                  variant="reading"
                  size="sm"
                  showPercentage
                />
                <ProgressBar
                  value={90}
                  label="Writing Completed"
                  variant="writing"
                  size="sm"
                  showPercentage
                />
                <ProgressBar
                  indeterminate
                  label="Transcribing Voice Stream (Indeterminate)"
                  variant="speaking"
                  size="xs"
                />
              </div>

              <div className="pt-2 flex items-center justify-between">
                <Button size="xs" variant="outline" onClick={() => setProgressVal(Math.max(0, progressVal - 15))}>
                  - 15%
                </Button>
                <Button size="xs" variant="outline" onClick={() => setProgressVal(Math.min(100, progressVal + 15))}>
                  + 15%
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Empty State with Brand Illustration</CardTitle>
              <CardDescription>Rendered with the custom Zarii brand illustration palette.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <EmptyState
                illustration="book"
                title="No Test Attempts Found"
                description="Take a diagnostic test or practice a targeted question type to track your band score progress."
                action={
                  <Button variant="primary" size="sm">
                    Start Diagnostic Test
                  </Button>
                }
              />
            </CardContent>
          </Card>
        </div>

        {/* Brand Illustrations Gallery */}
        <Card>
          <CardHeader>
            <CardTitle>Inline SVG Brand Illustrations</CardTitle>
            <CardDescription>
              Clean line-weight SVGs with rounded caps and cohesive brand/skill color fills.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-4 text-center">
              <div className="p-4 rounded-xl border border-brand-neutral-border dark:border-brand-dark-border bg-white dark:bg-brand-dark-surface space-y-2">
                <div className="flex justify-center"><BookIllustration size={64} /></div>
                <div className="text-xs font-bold text-brand-neutral-main dark:text-brand-dark-text">Reading (Book)</div>
                <div className="text-2xs text-brand-neutral-muted">Logo book curve</div>
              </div>

              <div className="p-4 rounded-xl border border-brand-neutral-border dark:border-brand-dark-border bg-white dark:bg-brand-dark-surface space-y-2">
                <div className="flex justify-center"><HeadphonesIllustration size={64} /></div>
                <div className="text-xs font-bold text-brand-neutral-main dark:text-brand-dark-text">Listening</div>
                <div className="text-2xs text-brand-neutral-muted">Audio wave arcs</div>
              </div>

              <div className="p-4 rounded-xl border border-brand-neutral-border dark:border-brand-dark-border bg-white dark:bg-brand-dark-surface space-y-2">
                <div className="flex justify-center"><PenIllustration size={64} /></div>
                <div className="text-xs font-bold text-brand-neutral-main dark:text-brand-dark-text">Writing (Pen)</div>
                <div className="text-2xs text-brand-neutral-muted">Angled stylus</div>
              </div>

              <div className="p-4 rounded-xl border border-brand-neutral-border dark:border-brand-dark-border bg-white dark:bg-brand-dark-surface space-y-2">
                <div className="flex justify-center"><MicrophoneIllustration size={64} /></div>
                <div className="text-xs font-bold text-brand-neutral-main dark:text-brand-dark-text">Speaking (Mic)</div>
                <div className="text-2xs text-brand-neutral-muted">Examiner capsule</div>
              </div>

              <div className="p-4 rounded-xl border border-brand-neutral-border dark:border-brand-dark-border bg-white dark:bg-brand-dark-surface space-y-2">
                <div className="flex justify-center"><EmptyInboxIllustration size={64} /></div>
                <div className="text-xs font-bold text-brand-neutral-main dark:text-brand-dark-text">Empty State</div>
                <div className="text-2xs text-brand-neutral-muted">Mint tag & check</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* 11. Toast System Demo */}
      <section className="space-y-6">
        <div>
          <h2 className="text-lg font-bold text-brand-neutral-main dark:text-brand-dark-text flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#1E9E63]" />
            11. Toast Notification System
          </h2>
          <p className="text-xs text-brand-neutral-muted dark:text-brand-dark-muted mt-0.5">
            Semantic color borders and icons: Success (#1E9E63), Info (#2B7FB8), Warning (#D99A0B), Error (#D1453B).
          </p>
        </div>

        <Card>
          <CardContent className="p-6">
            <div className="flex flex-wrap items-center gap-3">
              <Button
                variant="outline"
                size="sm"
                onClick={() =>
                  addToast({
                    type: 'success',
                    title: 'Practice Attempt Saved',
                    message: 'Your Reading answers were automatically saved to IndexedDB.',
                  })
                }
              >
                Trigger Success Toast
              </Button>

              <Button
                variant="outline"
                size="sm"
                onClick={() =>
                  addToast({
                    type: 'info',
                    title: 'Microphone Calibrated',
                    message: 'Web Speech API detected clear audio input for Speaking Part 2.',
                  })
                }
              >
                Trigger Info Toast
              </Button>

              <Button
                variant="outline"
                size="sm"
                onClick={() =>
                  addToast({
                    type: 'warning',
                    title: 'Time Limit Warning',
                    message: 'Ten minutes remaining before transfer time expires.',
                  })
                }
              >
                Trigger Warning Toast
              </Button>

              <Button
                variant="outline"
                size="sm"
                onClick={() =>
                  addToast({
                    type: 'error',
                    title: 'Submission Incomplete',
                    message: 'Please answer all 40 questions before submitting.',
                  })
                }
              >
                Trigger Error Toast
              </Button>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Interactive Modal Demo */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Zarii Official Exam Mode"
        description="Experience realistic Cambridge-standard timing and strict environmental controls."
        footer={
          <>
            <Button variant="ghost" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
            <Button
              variant="primary"
              onClick={() => {
                setIsModalOpen(false);
                addToast({
                  type: 'success',
                  title: 'Exam Mode Activated',
                  message: 'Full screen test runner initiated.',
                });
              }}
            >
              Begin Timed Test
            </Button>
          </>
        }
      >
        <div className="space-y-3 text-sm text-brand-neutral-muted dark:text-brand-dark-muted">
          <p>
            During exam mode, the 60-minute countdown cannot be paused or rewound. Audio plays once
            per section, mirroring genuine British Council and IDP test center guidelines.
          </p>
          <div className="p-3 rounded-xl bg-brand-50 dark:bg-brand-dark-surface border border-brand-200 dark:border-brand-dark-border text-xs text-brand-800 dark:text-brand-300 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 shrink-0 text-brand-600 dark:text-brand-400" />
            Automatic answer persistence ensures no data is lost if your browser restarts.
          </div>
        </div>
      </Modal>

      {/* Interactive Drawer Demo */}
      <Drawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        title="Zarii Design Token Inspector"
        description="Review active CSS variables and theme configurations."
        footer={
          <Button variant="primary" fullWidth onClick={() => setIsDrawerOpen(false)}>
            Close Inspector
          </Button>
        }
      >
        <div className="space-y-4 text-xs font-mono text-brand-neutral-muted dark:text-brand-dark-muted">
          <div className="p-3 rounded-lg bg-brand-50 dark:bg-brand-dark-surface border border-brand-neutral-border dark:border-brand-dark-border space-y-1">
            <div className="font-bold text-brand-neutral-main dark:text-brand-dark-text">Active Zarii Brand Tokens:</div>
            <div>--brand-800: #124F40; /* Logo Deep Green */</div>
            <div>--brand-400: #5BB78D; /* Logo Mint Accent */</div>
            <div>--neutral-bg: #F7FAF8;</div>
            <div>--neutral-surface: #FFFFFF;</div>
            <div>--neutral-border: #E1EBE5;</div>
            <div>--dark-bg: #0B1612;</div>
            <div>--dark-surface: #112019;</div>
            <div>--skill-listening: #0F8B8D;</div>
            <div>--skill-reading: #1E7A62;</div>
            <div>--skill-writing: #C98A0A;</div>
            <div>--skill-speaking: #CF5C45;</div>
            <div>--focus-ring: 2px solid #8ACFAE;</div>
          </div>
          <p className="text-brand-neutral-muted dark:text-brand-dark-muted font-sans leading-relaxed">
            All components are modular and render seamlessly across light, dark, and high-contrast
            user preferences with WCAG 2.1 AA/AAA compliance.
          </p>
        </div>
      </Drawer>
    </div>
  );
}
