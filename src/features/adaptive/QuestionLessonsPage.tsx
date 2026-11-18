import { useState } from 'react';
import { BookOpen, Search, ArrowRight, Lightbulb, CheckCircle2, AlertTriangle, Layers } from 'lucide-react';
import { Breadcrumbs } from '../../components/ui/Breadcrumbs';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { QUESTION_STRATEGY_LESSONS } from './questionLessonsData';
import type { QuestionStrategyLesson } from '../../types';
import { QuestionMiniLessonModal } from './QuestionMiniLessonModal';

export function QuestionLessonsPage() {
  const [selectedLesson, setSelectedLesson] = useState<QuestionStrategyLesson | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredLessons = QUESTION_STRATEGY_LESSONS.filter((l) => {
    const q = searchQuery.toLowerCase();
    return (
      l.title.toLowerCase().includes(q) ||
      l.overview.toLowerCase().includes(q) ||
      l.questionType.toLowerCase().includes(q)
    );
  });

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-fadeIn">
      {/* Breadcrumbs */}
      <Breadcrumbs
        items={[
          { label: 'Home', href: '/' },
          { label: 'Practice', href: '/practice' },
          { label: 'Strategy Lessons' },
        ]}
      />

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-2xs font-bold uppercase tracking-wider text-teal-600 dark:text-teal-400">
              Exam Strategies
            </span>
            <Badge variant="teal" size="sm">
              All 10 Question Types
            </Badge>
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100 mt-1">
            Question-Type Mini-Lessons & Traps
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 max-w-2xl mt-1">
            Short, tactical 3-minute lessons covering common examiner traps, step-by-step answering strategies, and interactive practice questions for every IELTS question type.
          </p>
        </div>

        {/* Search */}
        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search question types..."
            className="w-full pl-9 pr-4 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
        </div>
      </div>

      {/* Grid of Mini-Lessons */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredLessons.map((lesson) => (
          <Card
            key={lesson.id}
            hoverEffect
            className="flex flex-col justify-between p-5 border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 rounded-2xl"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-2xs font-bold uppercase tracking-wider text-teal-600 dark:text-teal-400">
                  {lesson.estimatedMinutes} min Strategy
                </span>
                <span className="text-2xs font-medium text-slate-400">
                  {lesson.practiceQuestions.length} practice Qs
                </span>
              </div>

              <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">
                {lesson.title}
              </h3>

              <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-3 leading-relaxed">
                {lesson.overview}
              </p>

              {/* Traps preview */}
              <div className="pt-2 border-t border-slate-100 dark:border-slate-800/80 space-y-1.5">
                <span className="text-2xs font-bold text-slate-400 uppercase tracking-wider block">
                  Examiner Traps Highlighted:
                </span>
                {lesson.commonTraps.slice(0, 2).map((t, idx) => (
                  <div key={idx} className="flex items-center gap-1.5 text-2xs text-rose-600 dark:text-rose-400 font-medium truncate">
                    <span className="w-1.5 h-1.5 rounded-full bg-rose-500 shrink-0" />
                    <span className="truncate">{t.trap}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4 mt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
              <span className="text-2xs text-slate-400">Interactive Quiz included</span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setSelectedLesson(lesson)}
                rightIcon={<ArrowRight className="w-3.5 h-3.5" />}
              >
                Start Lesson
              </Button>
            </div>
          </Card>
        ))}
      </div>

      {/* Active Modal */}
      {selectedLesson && (
        <QuestionMiniLessonModal
          lesson={selectedLesson}
          isOpen={true}
          onClose={() => setSelectedLesson(null)}
        />
      )}
    </div>
  );
}
