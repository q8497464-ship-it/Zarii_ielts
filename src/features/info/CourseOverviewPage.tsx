import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  BookOpen,
  Award,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  Layers,
  Compass,
  FileCheck,
  Languages,
} from 'lucide-react';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';

export function CourseOverviewPage() {
  useEffect(() => {
    document.title = 'English Course Curriculum (A1 to C1) | Zarii';
  }, []);

  const courseSchema = {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: 'Zarii General English Course (CEFR A1 to C1)',
    description:
      'A structured, 100% free English course covering beginner to advanced fluency with interactive grammar rules, pronunciation, reading, and quizzes.',
    provider: {
      '@type': 'Organization',
      name: 'Zarii',
      sameAs: 'https://zarii.app',
    },
    educationalLevel: ['Beginner', 'Elementary', 'Intermediate', 'Upper-Intermediate', 'Advanced'],
    isAccessibleForFree: true,
  };

  const levels = [
    {
      level: 'A1',
      title: 'Beginner Foundations',
      description: 'Master core sentence structure, basic present tense, daily nouns, and essential questions.',
      color: 'bg-emerald-500/15 text-emerald-700 dark:text-emerald-400 border-emerald-500/30',
      units: '8–10 Units • 40+ Lessons',
      skills: ['To be & Present Simple', 'Subject & Object Pronouns', 'Everyday Vocabulary', 'Basic Questions'],
    },
    {
      level: 'A2',
      title: 'Elementary Communication',
      description: 'Build confidence with past and future tenses, daily routines, directions, and functional travel dialogues.',
      color: 'bg-teal-500/15 text-teal-700 dark:text-teal-400 border-teal-500/30',
      units: '10 Units • 50+ Lessons',
      skills: ['Past Simple & Continuous', 'Going to & Will', 'Comparatives & Superlatives', 'Daily Routines'],
    },
    {
      level: 'B1',
      title: 'Intermediate Fluency',
      description: 'Express opinions, narrate experiences, and handle unexpected situations with natural modal verbs.',
      color: 'bg-cyan-500/15 text-cyan-700 dark:text-cyan-400 border-cyan-500/30',
      units: '10 Units • 60+ Lessons',
      skills: ['Present Perfect vs Past Simple', 'Conditionals (Zero, 1st, 2nd)', 'Modal Verbs of Obligation', 'Relative Clauses'],
    },
    {
      level: 'B2',
      title: 'Upper-Intermediate Command',
      description: 'Engage in detailed discussions, understand complex texts, and master academic grammar and cohesive linking.',
      color: 'bg-blue-500/15 text-blue-700 dark:text-blue-400 border-blue-500/30',
      units: '12 Units • 60+ Lessons',
      skills: ['3rd & Mixed Conditionals', 'Passive Voice in Context', 'Reported Speech', 'Idiomatic Expressions'],
    },
    {
      level: 'C1',
      title: 'Advanced Mastery',
      description: 'Attain nuanced expression, flexible discourse markers, sophisticated collocations, and executive presentation skills.',
      color: 'bg-purple-500/15 text-purple-700 dark:text-purple-400 border-purple-500/30',
      units: '10 Units • 50+ Lessons',
      skills: ['Inversion & Cleft Sentences', 'Subtle Nuance & Tone', 'Advanced Collocations', 'Professional Discourse'],
    },
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-10 py-6 text-slate-800 dark:text-slate-200">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(courseSchema) }}
      />

      {/* Top Navigation */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800">
        <Link
          to="/"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-500 hover:text-slate-900 dark:hover:text-white"
        >
          <ArrowLeft className="w-4 h-4" />
          Home
        </Link>
        <Badge variant="outline" className="text-emerald-700 dark:text-emerald-300 border-emerald-500/30">
          100% Free • Open Access
        </Badge>
      </div>

      {/* Header */}
      <div className="space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-[#5BB78D]/15 text-[#124F40] dark:text-[#5BB78D] border border-[#5BB78D]/25">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Curriculum Overview</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white">
          Complete General English Course
        </h1>
        <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400 leading-relaxed max-w-2xl">
          From basic fundamentals to advanced professional fluency. A complete, structured pathway aligned to the Common European Framework of Reference (CEFR A1 to C1).
        </p>
      </div>

      {/* Key Guarantees Strip */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-4 rounded-xl bg-white dark:bg-[#112019] border border-slate-200/90 dark:border-white/10 space-y-1">
          <div className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
            <Compass className="w-4 h-4 text-emerald-500" />
            <span>Placement &amp; Skip Out</span>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Take a 20-question placement diagnostic or test out of known units with an 85%+ score.
          </p>
        </div>

        <div className="p-4 rounded-xl bg-white dark:bg-[#112019] border border-slate-200/90 dark:border-white/10 space-y-1">
          <div className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
            <Languages className="w-4 h-4 text-emerald-500" />
            <span>Urdu Notes Built-In</span>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Compare English SVO patterns with Urdu SOV structures to prevent native interference mistakes.
          </p>
        </div>

        <div className="p-4 rounded-xl bg-white dark:bg-[#112019] border border-slate-200/90 dark:border-white/10 space-y-1">
          <div className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
            <Award className="w-4 h-4 text-emerald-500" />
            <span>Unit Mastery Tests</span>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Every unit concludes with a comprehensive review and test requiring a 70% pass mark.
          </p>
        </div>
      </div>

      {/* Level Breakdown Cards */}
      <div className="space-y-5">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <Layers className="w-5 h-5 text-emerald-500" />
          The Five Learning Levels
        </h2>

        <div className="space-y-4">
          {levels.map((lvl) => (
            <Card
              key={lvl.level}
              className="p-6 bg-white dark:bg-[#112019] border border-slate-200 dark:border-white/10 shadow-xs space-y-3"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="flex items-center gap-3">
                  <span className={`px-3 py-1 rounded-lg text-xs font-mono font-bold border ${lvl.color}`}>
                    {lvl.level}
                  </span>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white">{lvl.title}</h3>
                </div>
                <span className="text-xs font-semibold text-slate-400 dark:text-slate-500">{lvl.units}</span>
              </div>

              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                {lvl.description}
              </p>

              <div className="pt-2">
                <span className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-2">Key Skills:</span>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {lvl.skills.map((skill, idx) => (
                    <div
                      key={idx}
                      className="p-2 rounded-lg bg-slate-50 dark:bg-slate-900/60 border border-slate-100 dark:border-white/5 text-2xs font-medium text-slate-700 dark:text-slate-300 flex items-center gap-1.5"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                      <span>{skill}</span>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* CTA Box */}
      <div className="p-8 rounded-2xl bg-gradient-to-r from-[#124F40] to-[#1a6e59] text-white flex flex-col sm:flex-row items-center justify-between gap-6 shadow-md">
        <div className="space-y-1 text-center sm:text-left">
          <h3 className="text-xl font-bold">Ready to start learning English?</h3>
          <p className="text-xs text-emerald-100 max-w-md">
            Start from Level A1 or take the placement test to unlock intermediate modules immediately.
          </p>
        </div>
        <Link
          to="/signup"
          className="px-6 py-3 bg-[#5BB78D] hover:bg-[#4ea77e] text-[#0A2E25] font-bold text-xs rounded-xl flex items-center gap-2 shrink-0 transition-colors shadow-xs"
        >
          <span>Start English Course Free</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      {/* Disclaimer */}
      <p className="text-xs text-slate-400 text-center leading-relaxed">
        IELTS is a registered trademark of its owners. Zarii is independent and not affiliated with or endorsed by IELTS partners. Course levels and certificates are for self-study purposes and are not official qualifications.
      </p>
    </div>
  );
}
