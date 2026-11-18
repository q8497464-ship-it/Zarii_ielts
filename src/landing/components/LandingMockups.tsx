import React from 'react';
import {
  TrendingUp,
  Flame,
  CheckCircle2,
  Sparkles,
  BookOpen,
  Headphones,
  PenTool,
  Mic,
  ArrowRight,
  Clock,
  RotateCcw,
  AlertCircle,
} from 'lucide-react';

/**
 * Hero Interactive Dashboard Window Mockup
 */
export function HeroDashboardMockup() {
  return (
    <div className="relative w-full max-w-[500px] mx-auto select-none">
      {/* Background soft mint radial glow */}
      <div
        className="absolute -inset-4 bg-gradient-to-tr from-[#5BB78D]/20 via-[#124F40]/10 to-transparent rounded-3xl blur-2xl -z-10 pointer-events-none"
        aria-hidden="true"
      />

      {/* Main floating app window card */}
      <div className="bg-white dark:bg-[#112019] rounded-2xl shadow-2xl border border-slate-200/90 dark:border-white/10 overflow-hidden text-slate-800 dark:text-slate-100 transition-transform duration-500 hover:scale-[1.01]">
        {/* Window Top Bar */}
        <div className="flex items-center justify-between px-4 py-2.5 bg-slate-50 dark:bg-slate-900/90 border-b border-slate-200/80 dark:border-white/5 text-2xs font-mono text-slate-400">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-400/80 inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-amber-400/80 inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400/80 inline-block" />
          </div>
          <span className="text-slate-400 dark:text-slate-500 font-sans font-medium text-3xs">
            zarii.app/dashboard
          </span>
          <span className="text-3xs uppercase tracking-wider font-semibold px-1.5 py-0.5 rounded bg-[#5BB78D]/15 text-[#124F40] dark:text-[#5BB78D]">
            Sample preview
          </span>
        </div>

        {/* Dashboard Content */}
        <div className="p-5 space-y-4">
          {/* Target & Current Band Row */}
          <div className="flex items-center justify-between p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-white/5">
            <div className="flex items-center gap-3">
              <div className="relative w-12 h-12 flex items-center justify-center">
                <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                  <path
                    className="text-slate-200 dark:text-slate-800"
                    strokeWidth="3.5"
                    stroke="currentColor"
                    fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                  <path
                    className="text-[#5BB78D]"
                    strokeDasharray="78, 100"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                    stroke="currentColor"
                    fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                </svg>
                <span className="absolute font-bold text-sm text-slate-900 dark:text-white">
                  7.0
                </span>
              </div>
              <div>
                <div className="text-xs font-bold text-slate-900 dark:text-white">
                  Estimated Band
                </div>
                <div className="text-2xs text-slate-500 dark:text-slate-400">
                  Target: <strong className="text-[#124F40] dark:text-[#5BB78D]">7.5</strong> • 24 days to exam
                </div>
              </div>
            </div>
            <span className="inline-flex items-center gap-1 text-2xs font-semibold px-2 py-1 rounded-lg bg-emerald-500/10 text-emerald-700 dark:text-emerald-400">
              <TrendingUp className="w-3 h-3" />
              +0.5 Band
            </span>
          </div>

          {/* 4 Skill Progress Bars */}
          <div className="space-y-2.5">
            <div className="flex justify-between items-center text-2xs font-semibold text-slate-500 dark:text-slate-400">
              <span>Skill breakdown</span>
              <span>Current</span>
            </div>

            {/* Listening */}
            <div className="space-y-1">
              <div className="flex justify-between text-2xs font-medium">
                <span className="flex items-center gap-1.5 text-slate-700 dark:text-slate-300">
                  <span className="w-2 h-2 rounded-full bg-[#0F8B8D]" />
                  Listening
                </span>
                <span className="font-bold text-slate-900 dark:text-white">7.5</span>
              </div>
              <div className="h-2 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                <div className="h-full bg-[#0F8B8D] rounded-full w-[83%]" />
              </div>
            </div>

            {/* Reading */}
            <div className="space-y-1">
              <div className="flex justify-between text-2xs font-medium">
                <span className="flex items-center gap-1.5 text-slate-700 dark:text-slate-300">
                  <span className="w-2 h-2 rounded-full bg-[#124F40]" />
                  Reading
                </span>
                <span className="font-bold text-slate-900 dark:text-white">7.0</span>
              </div>
              <div className="h-2 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                <div className="h-full bg-[#124F40] dark:bg-[#5BB78D] rounded-full w-[77%]" />
              </div>
            </div>

            {/* Writing */}
            <div className="space-y-1">
              <div className="flex justify-between text-2xs font-medium">
                <span className="flex items-center gap-1.5 text-slate-700 dark:text-slate-300">
                  <span className="w-2 h-2 rounded-full bg-[#D97706]" />
                  Writing
                </span>
                <span className="font-bold text-slate-900 dark:text-white">6.5</span>
              </div>
              <div className="h-2 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                <div className="h-full bg-[#D97706] rounded-full w-[72%]" />
              </div>
            </div>

            {/* Speaking */}
            <div className="space-y-1">
              <div className="flex justify-between text-2xs font-medium">
                <span className="flex items-center gap-1.5 text-slate-700 dark:text-slate-300">
                  <span className="w-2 h-2 rounded-full bg-[#E05A47]" />
                  Speaking
                </span>
                <span className="font-bold text-slate-900 dark:text-white">7.0</span>
              </div>
              <div className="h-2 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                <div className="h-full bg-[#E05A47] rounded-full w-[77%]" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Card 1 (Top Right): Writing Feedback Ready */}
      <div className="absolute -top-4 -right-3 sm:-right-6 bg-white dark:bg-[#1A2E24] p-2.5 sm:p-3 rounded-xl shadow-xl border border-slate-200/80 dark:border-white/10 flex items-center gap-2.5 transition-transform hover:-translate-y-0.5">
        <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
          <Sparkles className="w-4 h-4" />
        </div>
        <div className="text-left pr-1">
          <div className="text-2xs font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            Writing feedback ready
          </div>
          <div className="text-3xs text-slate-500 dark:text-slate-400">
            Task 2 Essay • <strong className="text-emerald-600 dark:text-emerald-400">Band 7.0</strong>
          </div>
        </div>
      </div>

      {/* Floating Card 2 (Bottom Left): 7-Day Streak */}
      <div className="absolute -bottom-4 -left-3 sm:-left-6 bg-white dark:bg-[#1A2E24] p-2.5 sm:p-3 rounded-xl shadow-xl border border-slate-200/80 dark:border-white/10 flex items-center gap-2.5 transition-transform hover:-translate-y-0.5">
        <div className="w-8 h-8 rounded-lg bg-amber-500/15 text-amber-500 flex items-center justify-center shrink-0">
          <Flame className="w-4 h-4 fill-amber-500" />
        </div>
        <div className="text-left pr-1">
          <div className="text-2xs font-bold text-slate-900 dark:text-white">
            7-day study streak
          </div>
          <div className="text-3xs text-slate-500 dark:text-slate-400">
            Top 10% daily consistency
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * Feature 1: Split-Screen Reading Mockup
 */
export function SplitScreenReadingMockup() {
  return (
    <div className="w-full rounded-2xl bg-white dark:bg-[#112019] border border-slate-200 dark:border-white/10 shadow-xl overflow-hidden text-slate-800 dark:text-slate-200 select-none">
      {/* Test Runner Top Bar */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-slate-50 dark:bg-slate-900 border-b border-slate-200 dark:border-white/10 text-xs">
        <div className="flex items-center gap-2 font-bold text-slate-900 dark:text-white">
          <BookOpen className="w-4 h-4 text-[#124F40] dark:text-[#5BB78D]" />
          <span>Passage 1: The Evolution of Renewable Energy</span>
        </div>
        <div className="flex items-center gap-1.5 font-mono text-2xs font-semibold px-2 py-0.5 rounded bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
          <Clock className="w-3 h-3 text-[#5BB78D]" />
          54:20 left
        </div>
      </div>

      {/* Split Columns */}
      <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-slate-200 dark:divide-white/10 h-64 sm:h-72 text-2xs">
        {/* Left Column: Passage Text with Highlighting */}
        <div className="p-4 overflow-y-auto space-y-3 leading-relaxed text-slate-600 dark:text-slate-300 font-serif">
          <p>
            <span className="font-sans font-bold text-slate-900 dark:text-white mr-1">[Paragraph A]</span>
            During the late nineteenth century, industrial engineers first recognized the potential of harnessing wind energy on an unprecedented utility scale. Early wind turbines were cumbersome...
          </p>
          <p>
            <span className="font-sans font-bold text-slate-900 dark:text-white mr-1">[Paragraph B]</span>
            <mark className="bg-[#5BB78D]/30 dark:bg-[#5BB78D]/40 text-slate-900 dark:text-white px-0.5 rounded">
              A decisive technological breakthrough occurred in 1941
            </mark>{' '}
            with the deployment of the 1.25-megawatt turbine on Grandpa’s Knob in Vermont, supplying power directly into the local grid during wartime resource constraints.
          </p>
          <p className="text-3xs text-slate-400 italic">
            ...continues for 850 words with verified vocabulary highlights
          </p>
        </div>

        {/* Right Column: Questions */}
        <div className="p-4 overflow-y-auto space-y-3.5 bg-slate-50/60 dark:bg-slate-900/40">
          <div className="font-sans font-bold text-slate-900 dark:text-white text-xs">
            Questions 1–3: True / False / Not Given
          </div>

          <div className="p-2.5 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-white/5 space-y-2">
            <p className="font-medium text-slate-800 dark:text-slate-200">
              1. The Grandpa’s Knob turbine was erected to alleviate military resource shortages.
            </p>
            <div className="flex gap-1.5">
              <span className="px-2 py-0.5 rounded text-3xs font-bold bg-[#124F40] text-white">
                TRUE
              </span>
              <span className="px-2 py-0.5 rounded text-3xs font-semibold bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300">
                FALSE
              </span>
              <span className="px-2 py-0.5 rounded text-3xs font-semibold bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300">
                NOT GIVEN
              </span>
            </div>
          </div>

          <div className="p-2.5 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-white/5 space-y-2">
            <p className="font-medium text-slate-800 dark:text-slate-200">
              2. Industrial engineers prioritized cost over mechanical longevity in 1890.
            </p>
            <div className="flex gap-1.5">
              <span className="px-2 py-0.5 rounded text-3xs font-semibold bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300">
                TRUE
              </span>
              <span className="px-2 py-0.5 rounded text-3xs font-bold bg-[#124F40] text-white">
                FALSE
              </span>
              <span className="px-2 py-0.5 rounded text-3xs font-semibold bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300">
                NOT GIVEN
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * Feature 2: Writing & Speaking AI Feedback Mockup
 */
export function AiFeedbackCriteriaMockup() {
  return (
    <div className="w-full rounded-2xl bg-white dark:bg-[#112019] border border-slate-200 dark:border-white/10 shadow-xl p-4 sm:p-5 space-y-4 select-none">
      <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-white/10">
        <div>
          <span className="text-3xs uppercase font-bold tracking-wider text-[#5BB78D]">
            Official IELTS Public Descriptors
          </span>
          <h4 className="text-xs font-bold text-slate-900 dark:text-white">
            Writing Task 2: Academic Essay Evaluation
          </h4>
        </div>
        <div className="text-right">
          <div className="text-base font-extrabold text-[#124F40] dark:text-[#5BB78D]">
            Band 7.5
          </div>
          <span className="text-3xs text-slate-500">Good User</span>
        </div>
      </div>

      {/* 4 Criteria Grid */}
      <div className="grid grid-cols-2 gap-2 text-2xs">
        <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200/80 dark:border-white/5">
          <div className="flex justify-between font-bold mb-1">
            <span className="text-slate-700 dark:text-slate-300">Task Achievement</span>
            <span className="text-[#124F40] dark:text-[#5BB78D]">7.5</span>
          </div>
          <p className="text-3xs text-slate-500 dark:text-slate-400">
            Addresses all parts of the prompt with well-developed supporting arguments.
          </p>
        </div>

        <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200/80 dark:border-white/5">
          <div className="flex justify-between font-bold mb-1">
            <span className="text-slate-700 dark:text-slate-300">Coherence & Cohesion</span>
            <span className="text-[#124F40] dark:text-[#5BB78D]">7.0</span>
          </div>
          <p className="text-3xs text-slate-500 dark:text-slate-400">
            Clear progression with flexible cohesive devices. Varied topic sentences.
          </p>
        </div>

        <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200/80 dark:border-white/5">
          <div className="flex justify-between font-bold mb-1">
            <span className="text-slate-700 dark:text-slate-300">Lexical Resource</span>
            <span className="text-[#124F40] dark:text-[#5BB78D]">7.5</span>
          </div>
          <p className="text-3xs text-slate-500 dark:text-slate-400">
            Strong academic collocations: &quot;mitigating environmental degradation&quot;.
          </p>
        </div>

        <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200/80 dark:border-white/5">
          <div className="flex justify-between font-bold mb-1">
            <span className="text-slate-700 dark:text-slate-300">Grammatical Range</span>
            <span className="text-[#124F40] dark:text-[#5BB78D]">7.0</span>
          </div>
          <p className="text-3xs text-slate-500 dark:text-slate-400">
            Frequent error-free complex structures with balanced subordination.
          </p>
        </div>
      </div>

      {/* Quote Citation */}
      <div className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-2xs text-emerald-900 dark:text-emerald-300 flex items-start gap-2">
        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
        <div>
          <span className="font-bold">Strength verified:</span> Effective use of academic conditional clause in conclusion.
        </div>
      </div>
    </div>
  );
}

/**
 * Feature 3: Adaptive Study Plan Timetable Mockup
 */
export function StudyPlanTimetableMockup() {
  return (
    <div className="w-full rounded-2xl bg-white dark:bg-[#112019] border border-slate-200 dark:border-white/10 shadow-xl p-4 sm:p-5 space-y-3.5 select-none">
      <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-white/10">
        <div>
          <span className="text-3xs uppercase font-bold tracking-wider text-[#5BB78D]">
            Daily Focus
          </span>
          <h4 className="text-xs font-bold text-slate-900 dark:text-white">
            Today&apos;s 45-Minute Plan
          </h4>
        </div>
        <span className="px-2 py-0.5 rounded-full text-3xs font-semibold bg-[#124F40] text-white">
          2 / 3 Tasks Complete
        </span>
      </div>

      {/* Task List */}
      <div className="space-y-2 text-2xs">
        <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200/80 dark:border-white/5">
          <div className="flex items-center gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-[#5BB78D]" />
            <div>
              <div className="font-bold text-slate-900 dark:text-white line-through opacity-70">
                Reading: Practice Matching Headings
              </div>
              <div className="text-3xs text-slate-400">15 mins • Accuracy: 88%</div>
            </div>
          </div>
          <span className="text-3xs font-mono font-bold text-[#5BB78D]">+15 XP</span>
        </div>

        <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200/80 dark:border-white/5">
          <div className="flex items-center gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-[#5BB78D]" />
            <div>
              <div className="font-bold text-slate-900 dark:text-white line-through opacity-70">
                Vocab: 15 Academic Word List Cards
              </div>
              <div className="text-3xs text-slate-400">10 mins • SM-2 Review</div>
            </div>
          </div>
          <span className="text-3xs font-mono font-bold text-[#5BB78D]">+10 XP</span>
        </div>

        <div className="flex items-center justify-between p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/20">
          <div className="flex items-center gap-2.5">
            <div className="w-4 h-4 rounded-full border-2 border-amber-500 flex items-center justify-center shrink-0" />
            <div>
              <div className="font-bold text-slate-900 dark:text-white">
                Writing: Task 1 Bar Chart Overview
              </div>
              <div className="text-3xs text-amber-700 dark:text-amber-300">
                20 mins remaining today
              </div>
            </div>
          </div>
          <button className="px-2.5 py-1 rounded-lg bg-[#124F40] text-white text-3xs font-bold">
            Start
          </button>
        </div>
      </div>
    </div>
  );
}

/**
 * Feature 4: Mistake Notebook & Progress Intelligence Mockup
 */
export function MistakeNotebookMockup() {
  return (
    <div className="w-full rounded-2xl bg-white dark:bg-[#112019] border border-slate-200 dark:border-white/10 shadow-xl p-4 sm:p-5 space-y-3.5 select-none">
      <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-white/10">
        <div>
          <span className="text-3xs uppercase font-bold tracking-wider text-[#5BB78D]">
            Active Revision Queue
          </span>
          <h4 className="text-xs font-bold text-slate-900 dark:text-white">
            Mistake Notebook (3 Pending Reviews)
          </h4>
        </div>
        <span className="inline-flex items-center gap-1 text-3xs font-semibold text-slate-500 dark:text-slate-400">
          <RotateCcw className="w-3 h-3 text-[#5BB78D]" />
          Weekly review ready
        </span>
      </div>

      <div className="space-y-2 text-2xs">
        <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-rose-500/20 space-y-1">
          <div className="flex justify-between items-center">
            <span className="text-3xs font-bold uppercase tracking-wider text-rose-500">
              Synonym Trap • Reading
            </span>
            <span className="text-3xs text-slate-400">Missed Yesterday</span>
          </div>
          <p className="font-medium text-slate-800 dark:text-slate-200">
            Selected: <span className="text-rose-500 underline">&quot;constant decline&quot;</span> instead of <span className="text-[#5BB78D] font-bold">&quot;fluctuating trend&quot;</span>.
          </p>
          <p className="text-3xs text-slate-500 dark:text-slate-400">
            Trap: Overlooked the mid-decade temporary surge mentioned in line 42.
          </p>
        </div>

        <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-amber-500/20 space-y-1">
          <div className="flex justify-between items-center">
            <span className="text-3xs font-bold uppercase tracking-wider text-amber-600">
              Missing Plural &quot;s&quot; • Listening
            </span>
            <span className="text-3xs text-slate-400">Missed 3 days ago</span>
          </div>
          <p className="font-medium text-slate-800 dark:text-slate-200">
            Wrote: <span className="text-amber-600 line-through">&quot;laboratory&quot;</span> • Correct: <span className="text-[#5BB78D] font-bold">&quot;laboratories&quot;</span>.
          </p>
          <p className="text-3xs text-slate-500 dark:text-slate-400">
            Grammar check: Speaker said &quot;multiple state-of-the-art facilities&quot;.
          </p>
        </div>
      </div>
    </div>
  );
}
