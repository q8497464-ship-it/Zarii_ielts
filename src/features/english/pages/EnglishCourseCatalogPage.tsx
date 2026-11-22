import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Compass,
  BookOpen,
  Play,
  CheckCircle2,
  Lock,
  ArrowRight,
  Clock,
  Sparkles,
  Award,
} from 'lucide-react';
import { ALL_ENGLISH_LEVELS } from '../data/courseContent';
import { Card } from '../../../components/ui/Card';
import { Button } from '../../../components/ui/Button';
import { Badge } from '../../../components/ui/Badge';
import { cn } from '../../../lib/utils';
import type { EnglishCEFRLevel } from '../../../types';

export function EnglishCourseCatalogPage() {
  const navigate = useNavigate();
  const [selectedLevel, setSelectedLevel] = useState<EnglishCEFRLevel>('A1');

  const currentLevelInfo = ALL_ENGLISH_LEVELS.find((l) => l.level === selectedLevel) || ALL_ENGLISH_LEVELS[0];

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-8 animate-fade-in">
      {/* 1. Header */}
      <div>
        <div className="flex items-center gap-2 mb-1">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            English Course Syllabus
          </h1>
          <Badge variant="teal" className="text-2xs font-bold uppercase">
            CEFR A1–C1
          </Badge>
        </div>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
          Select your target level to explore units, grammar rules, audio dialogues, and interactive exercises.
        </p>
      </div>

      {/* 2. Level Selector Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {ALL_ENGLISH_LEVELS.map((lvl) => {
          const active = selectedLevel === lvl.level;
          return (
            <button
              key={lvl.level}
              onClick={() => setSelectedLevel(lvl.level)}
              className={cn(
                'px-4 py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer flex items-center gap-2',
                active
                  ? 'bg-[#124F40] text-white shadow-xs'
                  : 'bg-white dark:bg-[#112019] text-slate-600 dark:text-slate-300 border border-slate-200/80 dark:border-[#24392F] hover:border-[#5BB78D]'
              )}
            >
              <span>{lvl.level}</span>
              <span className="opacity-70 font-normal">
                {lvl.level === 'A1' ? 'Beginner' : lvl.level === 'A2' ? 'Elementary' : lvl.level === 'B1' ? 'Intermediate' : lvl.level === 'B2' ? 'Upper-Int' : 'Advanced'}
              </span>
            </button>
          );
        })}
      </div>

      {/* 3. Level Summary Banner */}
      <div className="p-6 rounded-3xl bg-slate-50 dark:bg-[#112019] border border-slate-200/80 dark:border-[#24392F] space-y-2">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white">
            {currentLevelInfo.title}
          </h2>
          <span className="text-xs font-bold text-teal-600 dark:text-teal-400">
            {currentLevelInfo.units.reduce((acc, u) => acc + u.lessons.length, 0)} Total Lessons
          </span>
        </div>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
          {currentLevelInfo.description}
        </p>
      </div>

      {/* 4. Units & Lessons Breakdown */}
      <div className="space-y-6">
        {currentLevelInfo.units.map((unit, unitIdx) => (
          <div key={unit.id} className="space-y-3">
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold text-teal-600 dark:text-teal-400">
                UNIT {unitIdx + 1}
              </span>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                {unit.title}
              </h3>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400">{unit.description}</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
              {unit.lessons.map((lesson) => (
                <Card
                  key={lesson.id}
                  className="p-5 bg-white dark:bg-[#112019] border border-slate-200/90 dark:border-[#24392F] hover:shadow-md transition-all rounded-2xl flex flex-col justify-between space-y-4 group"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-2xs font-bold uppercase tracking-wider text-teal-600 dark:text-teal-400">
                        {lesson.grammarFocus}
                      </span>
                      <div className="flex items-center gap-1 text-2xs text-slate-400 font-mono">
                        <Clock className="w-3 h-3" />
                        {lesson.durationMinutes}m
                      </div>
                    </div>

                    <h4 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-teal-600 transition-colors">
                      {lesson.title}
                    </h4>

                    <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed">
                      {lesson.description}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-slate-100 dark:border-[#24392F] flex items-center justify-between">
                    <div className="flex items-center gap-1.5 text-xs font-semibold text-amber-600 dark:text-amber-400">
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>+{lesson.xpReward} XP</span>
                    </div>

                    <Button
                      size="sm"
                      onClick={() => navigate(`/app/english/course/lesson/${lesson.id}`)}
                      className="bg-[#124F40] hover:bg-[#0E3D32] text-white font-bold text-xs rounded-xl shadow-2xs"
                    >
                      <Play className="w-3.5 h-3.5 mr-1 fill-current" />
                      Start Lesson
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
