import { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import {
  Headphones,
  BookOpen,
  PenTool,
  Mic,
  ArrowRight,
  CheckCircle2,
  Sparkles,
  RotateCcw,
  Lightbulb,
  FileSpreadsheet,
  Award,
  Zap,
} from 'lucide-react';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { Breadcrumbs } from '../../components/ui/Breadcrumbs';
import { useAppStore } from '../../store/useAppStore';
import { settingsStore } from '../../shared/settings/settingsStore';
import { SmartPracticePage } from '../adaptive/SmartPracticePage';
import { db } from '../../lib/db';
import { formatBand } from '../../lib/utils';

export function PracticePage() {
  const { profile } = useAppStore();
  const [searchParams, setSearchParams] = useSearchParams();
  const activeTab = searchParams.get('tab') === 'smart' ? 'smart' : 'skills';

  // Feature Flags from settings
  const [features, setFeatures] = useState(() => settingsStore.getFeatures());
  useEffect(() => {
    return settingsStore.subscribe(() => {
      setFeatures(settingsStore.getFeatures());
    });
  }, []);

  // Module scores overview
  const [moduleStats, setModuleStats] = useState({
    readingBand: null as number | null,
    listeningBand: null as number | null,
    writingBand: null as number | null,
    speakingBand: null as number | null,
  });

  useEffect(() => {
    async function loadStats() {
      try {
        const attempts = await db.attempts.where('status').equals('completed').toArray();
        const r = attempts.filter((a) => a.module === 'reading');
        const l = attempts.filter((a) => a.module === 'listening');
        const w = await db.writingSubmissions.toArray();
        const s = await db.speakingSessions.toArray();

        const avg = (arr: number[]) => (arr.length ? arr.reduce((a, b) => a + b, 0) / arr.length : null);

        setModuleStats({
          readingBand: avg(r.map((x) => x.bandEstimate)),
          listeningBand: avg(l.map((x) => x.bandEstimate)),
          writingBand: avg(w.map((x) => x.bandEstimate)),
          speakingBand: avg(s.map((x) => x.bandEstimate)),
        });
      } catch {
        // Fallback gracefully
      }
    }
    loadStats();
  }, []);

  if (activeTab === 'smart') {
    return (
      <div className="space-y-6">
        <Breadcrumbs items={[{ label: 'Practice', href: '/practice' }, { label: 'Smart Adaptive Practice' }]} />
        <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-3">
          <button
            onClick={() => setSearchParams({})}
            className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
          >
            All Skills Practice
          </button>
          <button
            onClick={() => setSearchParams({ tab: 'smart' })}
            className="px-4 py-2 rounded-xl text-xs font-bold bg-[#124F40] text-white dark:bg-[#5BB78D] dark:text-slate-950 shadow-xs transition-colors cursor-pointer"
          >
            Smart Adaptive Practice
          </button>
        </div>
        <SmartPracticePage />
      </div>
    );
  }

  // Four main skill modules
  const allSkills = [
    {
      id: 'listening',
      enabled: features.listening,
      name: 'Listening Practice',
      path: '/practice/listening',
      icon: Headphones,
      badge: '4 Sections • 40 Questions',
      badgeVariant: 'listening' as const,
      color: 'text-purple-600 dark:text-purple-400',
      iconBg: 'bg-purple-100 dark:bg-purple-950/60',
      desc: 'Interactive audio player with native speakers, multiple choice, matching, and form completion questions.',
      highlights: ['Authentic British, Aussie & North American accents', 'Full 40-minute timed exam mode', 'Instant transcript with highlighted answer evidence'],
      currentBand: moduleStats.listeningBand,
    },
    {
      id: 'reading',
      enabled: true,
      name: 'Reading Practice',
      path: '/practice/reading',
      icon: BookOpen,
      badge: '3 Passages • 60 Minutes',
      badgeVariant: 'reading' as const,
      color: 'text-[#124F40] dark:text-[#5BB78D]',
      iconBg: 'bg-[#124F40]/10 dark:bg-[#124F40]/30',
      desc: `Authentic ${profile?.testType === 'general' ? 'General Training' : 'Academic'} passages with True/False/Not Given, Headings & Gap Fills.`,
      highlights: ['Split-screen reading and question layout', 'In-passage text highlighter & note taking', 'Detailed line-by-line explanation for every answer'],
      currentBand: moduleStats.readingBand,
    },
    {
      id: 'writing',
      enabled: true,
      name: 'Writing Practice',
      path: '/practice/writing',
      icon: PenTool,
      badge: 'Task 1 & Task 2',
      badgeVariant: 'writing' as const,
      color: 'text-orange-600 dark:text-orange-400',
      iconBg: 'bg-orange-100 dark:bg-orange-950/60',
      desc: 'Authentic prompts with live word counter, timing alerts, band descriptors rubric, and optional AI feedback.',
      highlights: ['Academic graphs & General Training formal letters', 'Examiner sample essays from Band 6.0 to 9.0', 'Task Achievement & Cohesion verification checklists'],
      currentBand: moduleStats.writingBand,
    },
    {
      id: 'speaking',
      enabled: features.speaking,
      name: 'Speaking Practice',
      path: '/practice/speaking',
      icon: Mic,
      badge: 'Part 1, 2, 3 Simulator',
      badgeVariant: 'speaking' as const,
      color: 'text-rose-600 dark:text-rose-400',
      iconBg: 'bg-rose-100 dark:bg-rose-950/60',
      desc: 'Browser-based voice recorder and Web Speech API speech-to-text with cue card timer and follow-up prompts.',
      highlights: ['1-minute cue card preparation timer', 'Real-time speech-to-text transcription', 'Fluency, lexical resource and grammar feedback'],
      currentBand: moduleStats.speakingBand,
    },
  ];

  const visibleSkills = allSkills.filter((s) => s.enabled);

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Page Header (Consistent Zarii Header Pattern) */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-200/80 dark:border-[#24392F] pb-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            IELTS Practice Modules
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Master each IELTS component with authentic Cambridge-standard tests, instant band scoring, and targeted question drills.
          </p>
        </div>
        <div className="inline-flex p-1 rounded-xl bg-slate-100 dark:bg-[#112019] border border-slate-200/80 dark:border-[#24392F]">
          <button
            onClick={() => setSearchParams({})}
            className="px-3.5 py-1.5 rounded-lg text-xs font-bold bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-2xs transition-all cursor-pointer"
          >
            Skill Modules
          </button>
          <button
            onClick={() => setSearchParams({ tab: 'smart' })}
            className="px-3.5 py-1.5 rounded-lg text-xs font-medium text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#124F40] dark:text-[#5BB78D]" />
            <span>Smart Practice</span>
          </button>
        </div>
      </div>

      {/* Prominent Mock Tests Entry on Practice Page (Requirement 1 & 3) */}
      <Card className="p-6 border-[#124F40]/30 bg-gradient-to-br from-[#124F40]/10 via-white to-[#F7FAF8] dark:from-[#124F40]/30 dark:via-[#112019] dark:to-[#0B1612] rounded-2xl relative overflow-hidden shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Badge variant="teal" dot>FULL-LENGTH EXAM DAY</Badge>
              <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">Listening + Reading + Writing in One Sitting</span>
            </div>
            <h2 className="text-lg sm:text-xl font-extrabold text-slate-900 dark:text-white">
              Official 3-Hour Computer-Delivered Mock Exam
            </h2>
            <p className="text-xs text-slate-600 dark:text-slate-300 max-w-2xl leading-relaxed">
              Test your genuine exam stamina under strict official timed conditions with automated band conversion, sectional analysis, and candidate diagnostic reports.
            </p>
          </div>
          <Link to="/mock" className="shrink-0">
            <Button variant="primary" size="md" className="gap-2">
              <FileSpreadsheet className="w-4 h-4 text-[#5BB78D]" />
              <span>Launch Mock Exams</span>
            </Button>
          </Link>
        </div>
      </Card>

      {/* Adaptive Learning Tools Bar */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Smart Practice Card */}
        <Card className="p-5 border-teal-500/40 bg-gradient-to-br from-teal-50/70 via-white to-slate-50/50 dark:from-teal-950/30 dark:via-slate-900 dark:to-slate-900 rounded-2xl flex flex-col justify-between space-y-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="w-8 h-8 rounded-xl bg-teal-100 dark:bg-teal-950/80 text-teal-700 dark:text-teal-300 flex items-center justify-center">
                <Sparkles className="w-4 h-4" />
              </span>
              <Badge variant="teal" size="sm">Adaptive</Badge>
            </div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">Smart Practice</h3>
            <p className="text-2xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Target your weakest question types first with difficulty calibrated to your performance.
            </p>
          </div>
          <Link to="/practice/smart">
            <Button variant="primary" size="sm" className="w-full text-xs">Launch Smart Practice</Button>
          </Link>
        </Card>

        {/* Mistake Notebook Card */}
        <Card className="p-5 border-rose-500/30 bg-gradient-to-br from-rose-50/70 via-white to-slate-50/50 dark:from-rose-950/20 dark:via-slate-900 dark:to-slate-900 rounded-2xl flex flex-col justify-between space-y-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="w-8 h-8 rounded-xl bg-rose-100 dark:bg-rose-950/80 text-rose-700 dark:text-rose-300 flex items-center justify-center">
                <RotateCcw className="w-4 h-4" />
              </span>
              <Badge variant="rose" size="sm">Notebook</Badge>
            </div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">Mistake Notebook</h3>
            <p className="text-2xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Every incorrect answer saved with explanations. Take the retry quiz to achieve 100% mastery.
            </p>
          </div>
          <Link to="/mistakes">
            <Button variant="outline" size="sm" className="w-full text-xs text-rose-600 dark:text-rose-400 border-rose-200 dark:border-rose-900">
              Open Mistake Notebook
            </Button>
          </Link>
        </Card>

        {/* Question Mini-Lessons Card */}
        <Card className="p-5 border-sky-500/30 bg-gradient-to-br from-sky-50/70 via-white to-slate-50/50 dark:from-sky-950/20 dark:via-slate-900 dark:to-slate-900 rounded-2xl flex flex-col justify-between space-y-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="w-8 h-8 rounded-xl bg-sky-100 dark:bg-sky-950/80 text-sky-700 dark:text-sky-300 flex items-center justify-center">
                <Lightbulb className="w-4 h-4" />
              </span>
              <Badge variant="navy" size="sm">Strategies</Badge>
            </div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">Question-Type Strategies</h3>
            <p className="text-2xs text-slate-600 dark:text-slate-400 leading-relaxed">
              3-minute tactical lessons covering common examiner traps and interactive practice for all 10 types.
            </p>
          </div>
          <Link to="/lessons">
            <Button variant="outline" size="sm" className="w-full text-xs text-sky-600 dark:text-sky-400 border-sky-200 dark:border-sky-900">
              Browse Strategy Lessons
            </Button>
          </Link>
        </Card>
      </div>

      {/* Four Large Skill Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {visibleSkills.map((skill) => {
          const Icon = skill.icon;
          return (
            <Card key={skill.path} hoverEffect className="flex flex-col justify-between p-6">
              <div>
                <div className="flex items-start justify-between mb-4">
                  <div className={`p-3 rounded-2xl ${skill.iconBg} ${skill.color}`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <div className="flex items-center gap-2">
                    {skill.currentBand && (
                      <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                        Avg {formatBand(skill.currentBand)}
                      </span>
                    )}
                    <Badge variant={skill.badgeVariant} dot>{skill.badge}</Badge>
                  </div>
                </div>

                <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                  {skill.name}
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed mb-4">
                  {skill.desc}
                </p>

                <div className="space-y-1.5 mb-6">
                  {skill.highlights.map((h, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-300">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#124F40] dark:text-[#5BB78D] shrink-0" />
                      <span>{h}</span>
                    </div>
                  ))}
                </div>
              </div>

              <Link
                to={skill.path}
                className="inline-flex items-center justify-between w-full p-3.5 rounded-xl bg-slate-50 dark:bg-[#112019] hover:bg-[#124F40]/10 dark:hover:bg-[#5BB78D]/20 text-[#124F40] dark:text-[#5BB78D] transition-colors text-xs font-bold group border border-slate-200/80 dark:border-[#24392F]"
              >
                <span>Launch {skill.name.split(' ')[0]} Module</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
