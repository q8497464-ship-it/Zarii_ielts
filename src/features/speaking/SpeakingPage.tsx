import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  Mic,
  Volume2,
  Clock,
  Sparkles,
  ArrowRight,
  Award,
} from 'lucide-react';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { db } from '../../lib/db';
import type { SpeakingSession } from '../../types';
import { formatBand } from '../../lib/utils';
import {
  ModuleLandingStructure,
  type ModuleHistoryAttempt,
  type ModuleStrategyTip,
} from '../../components/practice/ModuleLandingStructure';

export function SpeakingPage() {
  const navigate = useNavigate();
  const [sessions, setSessions] = useState<SpeakingSession[]>([]);

  useEffect(() => {
    async function loadSessions() {
      try {
        const list = await db.speakingSessions.reverse().sortBy('recordedAt');
        setSessions(list);
      } catch (err) {
        console.error('Failed to load speaking sessions:', err);
      }
    }
    loadSessions();
  }, []);

  const practiceModes = [
    {
      id: 'mock',
      title: 'Full Mock Speaking Interview',
      duration: '11–14 mins',
      tag: 'Official Exam Flow',
      desc: 'Complete 3-part test with examiner voice prompts, 1-min prep notepad, 2-min uninterrupted talk, and abstract Part 3 discussion.',
      icon: Award,
      route: '/practice/speaking/mock',
      btnColor: 'bg-emerald-600 hover:bg-emerald-700 text-white',
    },
    {
      id: 'part1',
      title: 'Part 1: Everyday Questions',
      duration: '4–5 mins',
      tag: '20 Topics • 120 Questions',
      desc: 'Practice answering questions on hometown, work, food, travel, and routines with instant speech recognition & fluency diagnostics.',
      icon: Mic,
      route: '/practice/speaking/part1',
      btnColor: 'bg-teal-600 hover:bg-teal-700 text-white',
    },
    {
      id: 'part2',
      title: 'Part 2: Long Turn (Cue Cards)',
      duration: '3–4 mins',
      tag: '30 Authentic Cue Cards',
      desc: 'Master the 1-minute preparation phase with scratchpad notes, followed by a full 2-minute timed speech and Band 8+ model answers.',
      icon: Clock,
      route: '/practice/speaking/part2',
      btnColor: 'bg-[#CF5C45] hover:bg-[#B34B36] text-white',
    },
    {
      id: 'shadowing',
      title: 'Shadowing & Pronunciation Lab',
      duration: 'Flexible',
      tag: 'Native Rhythm & Intonation',
      desc: 'Listen to native sentence models, repeat immediately (shadowing), and track word-match accuracy to improve chunking and stress.',
      icon: Volume2,
      route: '/practice/speaking/shadowing',
      btnColor: 'bg-purple-600 hover:bg-purple-700 text-white',
    },
  ];

  // Calculated Stats for Section A
  const completedSessions = sessions.filter((s) => s.bandEstimate > 0);
  const avgBand = completedSessions.length
    ? completedSessions.reduce((acc, s) => acc + s.bandEstimate, 0) / completedSessions.length
    : null;
  const totalMinutes = Math.round(
    sessions.reduce((acc, s) => acc + (s.durationSeconds || 720), 0) / 60
  );

  // Recent History for Section D
  const formattedHistory: ModuleHistoryAttempt[] = sessions.slice(0, 5).map((s) => ({
    id: s.id || `${s.part}-${s.recordedAt}`,
    title: s.topicTitle || `Speaking Part ${s.part} Simulation`,
    date: s.recordedAt ? s.recordedAt.split('T')[0] : 'Recent',
    scoreText: `Part ${s.part}`,
    band: s.bandEstimate,
    durationText: `${Math.round((s.durationSeconds || 720) / 60)} mins`,
    reviewUrl: `/practice/speaking/results/${s.id}`,
  }));

  // Recommended Next Practice for Section C
  const recommendedItem = {
    title: 'Full Mock Speaking Interview (Parts 1–3)',
    tag: 'Official Flow',
    description: 'Complete 3-part test with live audio examiner prompts, 1-minute preparation scratchpad, and real-time speech-to-text transcription.',
    timeMinutes: 14,
    actionUrl: '/practice/speaking/mock',
    actionLabel: 'Launch Speaking Mock',
  };

  // Section E: Tips & Strategies
  const speakingStrategyTips: ModuleStrategyTip[] = [
    {
      title: 'Part 2: The PPF (Past, Present, Future) Formula',
      category: 'Fluency Tactic',
      duration: '4m read',
      summary: 'Never run out of things to say on the 2-minute cue card: describe how the topic began in your past, the current reality in the present, and future outlook.',
      lessonUrl: '/lessons',
    },
    {
      title: 'Natural Fillers vs Silent Hesitation',
      category: 'Examiner Rubric',
      duration: '3m read',
      summary: 'Examiners expect content hesitation ("That\'s an interesting perspective, let me think..."), but penalize language hesitation ("searching for basic words").',
      lessonUrl: '/lessons',
    },
    {
      title: 'Part 3: Generalizing Beyond Personal Anecdotes',
      category: 'Abstract Discussion',
      duration: '5m read',
      summary: 'Part 3 questions test abstract societal viewpoints. Replace "In my family..." with "Generally speaking in modern society, people tend to believe that..."',
      lessonUrl: '/lessons',
    },
  ];

  const startTestNode = (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
      {practiceModes.map((mode) => {
        const Icon = mode.icon;
        return (
          <Card key={mode.id} hoverEffect className="p-6 flex flex-col justify-between border-slate-200/80 dark:border-[#24392F]">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-base text-slate-900 dark:text-white">
                      {mode.title}
                    </h3>
                    <div className="text-2xs text-slate-500 flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {mode.duration}
                    </div>
                  </div>
                </div>
                <Badge variant="teal" size="sm">{mode.tag}</Badge>
              </div>

              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                {mode.desc}
              </p>
            </div>

            <div className="pt-4 border-t border-slate-100 dark:border-[#24392F] mt-4 flex justify-end">
              <Link to={mode.route}>
                <Button variant="primary" size="sm" className="gap-2">
                  <span>Start Session</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#5BB78D]" />
                </Button>
              </Link>
            </div>
          </Card>
        );
      })}
    </div>
  );

  return (
    <ModuleLandingStructure
      moduleKey="speaking"
      title="Speaking Practice & Simulator"
      description="Practice Cambridge-style speaking interviews with real-time audio voice prompts, speech-to-text transcript analysis, and fluency diagnostics."
      icon={<Mic className="w-6 h-6 text-rose-600 dark:text-rose-400" />}
      badgeText="PART 1, 2, 3 • 11–14 MINUTES"
      accentColor="#E11D48"
      currentBand={avgBand}
      totalAttemptsCount={sessions.length}
      totalMinutesSpent={totalMinutes}
      trendText={sessions.length >= 2 ? '+0.5 Band Growth' : undefined}
      trendPositive={true}
      startTestSection={startTestNode}
      recommendedItem={recommendedItem}
      recentAttempts={formattedHistory}
      strategyTips={speakingStrategyTips}
    />
  );
}
