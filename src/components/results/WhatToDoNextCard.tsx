import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Compass,
  ArrowRight,
  Sparkles,
  BookOpen,
  RotateCcw,
  Layers,
  AlertTriangle,
  CheckCircle2,
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { cn } from '../../lib/utils';

export interface NextActionItem {
  id: string;
  title: string;
  description: string;
  buttonText: string;
  badge?: string;
  badgeVariant?: 'primary' | 'warning' | 'secondary' | 'success';
  onClick: () => void;
  icon?: React.ReactNode;
}

export interface WhatToDoNextCardProps {
  module: 'reading' | 'listening' | 'writing' | 'speaking';
  incorrectCount: number;
  weakestType?: string;
  targetBand: number;
  currentBand: number;
  onFilterIncorrect?: () => void;
  onRetake?: () => void;
  className?: string;
}

export const WhatToDoNextCard: React.FC<WhatToDoNextCardProps> = ({
  module,
  incorrectCount,
  weakestType,
  targetBand,
  currentBand,
  onFilterIncorrect,
  onRetake,
  className,
}) => {
  const navigate = useNavigate();

  const isTargetMet = currentBand >= targetBand;

  const defaultActions: NextActionItem[] = [
    {
      id: 'action-review-errors',
      title: incorrectCount > 0 ? `Review Your ${incorrectCount} Incorrect Answers` : 'Review High-Yield Explanations',
      description:
        incorrectCount > 0
          ? 'Analyze where the question distractors mislead you and review highlighted text evidence.'
          : 'Check the line-by-line evidence justification to reinforce your pattern recognition.',
      buttonText: 'Review Missed Questions',
      badge: incorrectCount > 0 ? `${incorrectCount} Errors` : 'Mastery',
      badgeVariant: incorrectCount > 0 ? 'warning' : 'success',
      icon: <AlertTriangle className="w-4 h-4 text-amber-500" />,
      onClick: () => {
        if (onFilterIncorrect) {
          onFilterIncorrect();
        } else {
          window.scrollTo({ top: 600, behavior: 'smooth' });
        }
      },
    },
    {
      id: 'action-targeted-drill',
      title: weakestType ? `Drill ${weakestType} Questions` : `Practice More ${module.toUpperCase()} Passages`,
      description: weakestType
        ? `Your accuracy was lowest on ${weakestType}. Targeted practice on this specific question style yields fastest score gains.`
        : `Continue testing your comprehension with additional authentic Cambridge-standard ${module} tests.`,
      buttonText: `Start ${module.toUpperCase()} Practice`,
      badge: 'Targeted Practice',
      badgeVariant: 'primary',
      icon: <Compass className="w-4 h-4 text-teal-500" />,
      onClick: () => {
        navigate(`/practice/${module}`);
      },
    },
    ...(currentBand < 6.5 || incorrectCount > 2 || module === 'writing'
      ? [
          {
            id: 'action-cross-track-course-grammar',
            title: 'Targeted Grammar in English Course',
            description:
              'Weak grammar range limits Band scores. Strengthen conditionals, complex sentence structures, and tenses.',
            buttonText: 'Practise Conditionals: B1 Unit 6',
            badge: 'English Course Track',
            badgeVariant: 'secondary' as const,
            icon: <Sparkles className="w-4 h-4 text-emerald-500" />,
            onClick: () => {
              navigate('/app/english/lesson/eng-b1-u6-l1');
            },
          },
        ]
      : [
          {
            id: 'action-vocab-or-retake',
            title: isTargetMet ? 'Solidify Strategy with Spaced Repetition' : 'Expand Academic Vocabulary & Collocations',
            description: isTargetMet
              ? 'Review academic vocabulary flashcards (SM-2 spaced repetition) to ensure retention until your exam date.'
              : 'Save unfamiliar words from this test into your personal word bank and practice flashcards.',
            buttonText: 'Open Word Bank & Flashcards',
            badge: 'Academic Vocab',
            badgeVariant: 'primary' as const,
            icon: <Layers className="w-4 h-4 text-brand-600 dark:text-brand-400" />,
            onClick: () => {
              navigate('/vocab/flashcards');
            },
          },
        ]),
  ];

  return (
    <Card className={cn('p-6 bg-gradient-to-br from-white to-slate-50/50 dark:from-slate-900 dark:to-slate-900/50 border-slate-200 dark:border-slate-800 shadow-sm', className)}>
      <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-100 dark:border-slate-800">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-teal-100 dark:bg-teal-950/80 text-teal-600 dark:text-teal-400 flex items-center justify-center">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              What To Do Next (Personalized Strategy)
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Follow these 3 specific steps to turn your errors into guaranteed band score gains.
            </p>
          </div>
        </div>

        <Badge variant={isTargetMet ? 'success' : 'primary'} size="sm">
          {isTargetMet ? 'Target Achieved' : `Gap: ${(targetBand - currentBand).toFixed(1)} to Band ${targetBand}`}
        </Badge>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {defaultActions.map((action, idx) => (
          <div
            key={action.id}
            className="p-4 rounded-2xl bg-white dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700/80 flex flex-col justify-between hover:border-teal-500/50 transition-all hover:shadow-xs group"
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="w-6 h-6 rounded-full bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 font-mono text-xs font-bold flex items-center justify-center">
                  {idx + 1}
                </span>
                {action.badge && (
                  <Badge variant={action.badgeVariant || 'primary'} size="xs">
                    {action.badge}
                  </Badge>
                )}
              </div>

              <h4 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors">
                {action.title}
              </h4>
              <p className="text-2xs text-slate-600 dark:text-slate-400 leading-relaxed">
                {action.description}
              </p>
            </div>

            <div className="pt-3 mt-3 border-t border-slate-100 dark:border-slate-700/50">
              <Button
                variant="outline"
                size="sm"
                onClick={action.onClick}
                rightIcon={<ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />}
                className="w-full text-xs font-semibold justify-between h-8"
              >
                <span>{action.buttonText}</span>
              </Button>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};
