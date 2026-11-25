import { useState, useEffect } from 'react';
import {
  BookOpen,
  Search,
  CheckCircle2,
  XCircle,
  RotateCcw,
  Sparkles,
  HelpCircle,
  Filter,
  FileText,
  Edit3,
  Save,
  ChevronDown,
  ChevronUp,
  Award,
  ArrowRight,
  Trash2,
} from 'lucide-react';
import type { MistakeItem, IELTSModule } from '../../types';
import {
  getMistakes,
  markMistakeMastered,
  updateMistakeNotes,
  recordMistakeRetry,
  QUESTION_TYPE_LABELS,
} from './adaptiveTracker';
import { Breadcrumbs } from '../../components/ui/Breadcrumbs';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { EmptyState } from '../../components/ui/EmptyState';
import { copy } from '../../lib/copy';
import { cn } from '../../lib/utils';
import { useAppStore } from '../../store/useAppStore';
import { isAnswerCorrect } from '../reading/marking';
import { shuffleMcqOptions } from '../../lib/mcqShuffle';

export function MistakeNotebookPage() {
  const { addToast } = useAppStore();
  const [mistakes, setMistakes] = useState<MistakeItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Filters
  const [selectedTrack, setSelectedTrack] = useState<'all' | 'ielts' | 'english'>('all');
  const [selectedModule, setSelectedModule] = useState<IELTSModule | 'all'>('all');
  const [selectedStatus, setSelectedStatus] = useState<'all' | 'unmastered' | 'mastered'>('unmastered');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Expandable notes state
  const [expandedNotesId, setExpandedNotesId] = useState<number | null>(null);
  const [noteDraft, setNoteDraft] = useState('');

  // Quiz Mode State
  const [isQuizMode, setIsQuizMode] = useState(false);
  const [quizItems, setQuizItems] = useState<MistakeItem[]>([]);
  const [currentQuizIndex, setCurrentQuizIndex] = useState(0);
  const [quizAnswer, setQuizAnswer] = useState('');
  const [quizFeedback, setQuizFeedback] = useState<{
    submitted: boolean;
    isCorrect: boolean;
    explanation: string;
  } | null>(null);
  const [quizScore, setQuizScore] = useState(0);

  const loadMistakes = async () => {
    setIsLoading(true);
    try {
      const data = await getMistakes();
      setMistakes(data);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadMistakes();
  }, []);

  const handleToggleMastered = async (m: MistakeItem) => {
    if (!m.id) return;
    const newStatus = !m.isMastered;
    await markMistakeMastered(m.id, newStatus);
    setMistakes((prev) =>
      prev.map((item) => (item.id === m.id ? { ...item, isMastered: newStatus } : item))
    );
    addToast({
      type: newStatus ? 'success' : 'info',
      title: newStatus ? 'Marked as Mastered!' : 'Moved back to active mistakes',
      message: newStatus ? 'Great job reviewing your error.' : 'Ready for further review.',
    });
  };

  const handleSaveNote = async (id: number) => {
    await updateMistakeNotes(id, noteDraft);
    setMistakes((prev) =>
      prev.map((item) => (item.id === id ? { ...item, notes: noteDraft } : item))
    );
    setExpandedNotesId(null);
    addToast({
      type: 'success',
      title: 'Reflection saved',
      message: 'Your notes will help you remember this pattern.',
    });
  };

  // Filtered Mistakes
  const filteredMistakes = mistakes.filter((m) => {
    if (selectedTrack !== 'all' && (m.track || 'ielts') !== selectedTrack) return false;
    if (selectedModule !== 'all' && m.module !== selectedModule) return false;
    if (selectedStatus === 'unmastered' && m.isMastered) return false;
    if (selectedStatus === 'mastered' && !m.isMastered) return false;
    if (selectedType !== 'all' && m.questionType !== selectedType) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        m.questionPrompt.toLowerCase().includes(q) ||
        m.passageOrContextTitle.toLowerCase().includes(q) ||
        m.explanation.toLowerCase().includes(q) ||
        (m.notes && m.notes.toLowerCase().includes(q))
      );
    }
    return true;
  });

  const unmasteredCount = mistakes.filter((m) => !m.isMastered).length;
  const masteredCount = mistakes.filter((m) => m.isMastered).length;

  // Start Quiz Mode
  const handleStartQuiz = () => {
    const unmastered = mistakes.filter((m) => !m.isMastered);
    if (unmastered.length === 0) {
      addToast({
        type: 'info',
        title: 'No unmastered mistakes!',
        message: 'You have cleared all items in your notebook. Excellent work!',
      });
      return;
    }
    setQuizItems(unmastered.slice(0, 10)); // quiz in batches of up to 10
    setCurrentQuizIndex(0);
    setQuizAnswer('');
    setQuizFeedback(null);
    setQuizScore(0);
    setIsQuizMode(true);
  };

  // Submit Quiz Item
  const handleSubmitQuizItem = async () => {
    const current = quizItems[currentQuizIndex];
    if (!current || !current.id) return;

    const isCorrect = isAnswerCorrect(
      quizAnswer,
      current.correctAnswer,
      current.questionType as any,
      current.options
    );

    await recordMistakeRetry(current.id, isCorrect);

    setQuizFeedback({
      submitted: true,
      isCorrect,
      explanation: current.explanation,
    });

    if (isCorrect) {
      setQuizScore((prev) => prev + 1);
    }
  };

  const handleNextQuizItem = () => {
    if (currentQuizIndex + 1 < quizItems.length) {
      setCurrentQuizIndex((prev) => prev + 1);
      setQuizAnswer('');
      setQuizFeedback(null);
    } else {
      // Quiz complete
      loadMistakes();
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-fadeIn">
      {/* Breadcrumbs */}
      <Breadcrumbs
        items={[
          { label: 'Home', href: '/' },
          { label: 'Practice', href: '/practice' },
          { label: 'Mistake Notebook' },
        ]}
      />

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-2xs font-bold uppercase tracking-wider text-rose-600 dark:text-rose-400">
              Error Analysis & Mastery
            </span>
            <Badge variant="rose" size="sm">
              {unmasteredCount} Unmastered
            </Badge>
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100 mt-1">
            Personal Mistake Notebook
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 max-w-2xl mt-1">
            Every incorrect response from full tests and practice is automatically archived here with the examiner explanation and evidence. Review rationale and retry mistakes to eliminate recurring errors.
          </p>
        </div>

        {/* Retry Quiz Action Button */}
        {!isQuizMode && (
          <div className="flex items-center gap-3">
            <Button
              variant="primary"
              size="md"
              disabled={unmasteredCount === 0}
              onClick={handleStartQuiz}
              leftIcon={<RotateCcw className="w-4 h-4" />}
              className="bg-rose-600 hover:bg-rose-700 text-white shadow-sm"
            >
              Retry Only My Mistakes ({unmasteredCount})
            </Button>
          </div>
        )}
      </div>

      {/* QUIZ MODE RUNNER */}
      {isQuizMode && quizItems.length > 0 ? (
        <Card className="p-6 border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 rounded-2xl shadow-md space-y-6 animate-fadeIn">
          {/* Quiz Header */}
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4">
            <div className="flex items-center gap-3">
              <span className="w-8 h-8 rounded-lg bg-rose-100 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400 flex items-center justify-center font-bold text-xs">
                {currentQuizIndex + 1}/{quizItems.length}
              </span>
              <div>
                <span className="text-2xs font-bold uppercase tracking-wider text-slate-400">
                  Mistake Retry Session
                </span>
                <div className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                  {quizItems[currentQuizIndex].passageOrContextTitle}
                </div>
              </div>
            </div>

            <Button variant="ghost" size="sm" onClick={() => setIsQuizMode(false)}>
              Exit Quiz
            </Button>
          </div>

          {currentQuizIndex < quizItems.length ? (
            <div className="space-y-6">
              {/* Question Context Excerpt if available */}
              {quizItems[currentQuizIndex].passageOrAudioExcerpt && (
                <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 text-xs text-slate-700 dark:text-slate-300 font-serif leading-relaxed">
                  {quizItems[currentQuizIndex].passageOrAudioExcerpt}
                </div>
              )}

              {/* Question Prompt */}
              <div className="space-y-2">
                <span className="text-2xs font-bold uppercase tracking-wider text-teal-600 dark:text-teal-400">
                  {QUESTION_TYPE_LABELS[quizItems[currentQuizIndex].questionType] ||
                    quizItems[currentQuizIndex].questionType}
                </span>
                <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">
                  {quizItems[currentQuizIndex].questionPrompt}
                </h3>
              </div>

              {/* Answer Input / Options */}
              {quizItems[currentQuizIndex].options && quizItems[currentQuizIndex].options!.length > 0 ? (
                <div className="space-y-2">
                  {(() => {
                    const currentItem = quizItems[currentQuizIndex];
                    const shuffled = shuffleMcqOptions(currentItem.options!, `mistake_${currentItem.id}`);
                    return shuffled.map((optItem, idx) => {
                      const displayLetter = String.fromCharCode(65 + idx);
                      const opt = optItem.text;
                      return (
                        <button
                          key={optItem.id || idx}
                          onClick={() => !quizFeedback?.submitted && setQuizAnswer(opt)}
                          disabled={quizFeedback?.submitted}
                          className={cn(
                            'w-full text-left p-3 rounded-xl border text-xs font-medium transition-all flex items-center justify-between',
                            quizAnswer === opt
                              ? 'border-teal-500 bg-teal-50 dark:bg-teal-950/60 text-teal-900 dark:text-teal-100 font-bold'
                              : 'border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300'
                          )}
                        >
                          <span className="flex items-center gap-2">
                            <span className="font-mono font-bold text-slate-400">
                              {displayLetter}.
                            </span>
                            <span>{opt}</span>
                          </span>
                        </button>
                      );
                    });
                  })()}
                </div>
              ) : (
                <input
                  type="text"
                  value={quizAnswer}
                  onChange={(e) => !quizFeedback?.submitted && setQuizAnswer(e.target.value)}
                  disabled={quizFeedback?.submitted}
                  placeholder="Enter your revised answer..."
                  className="w-full px-4 py-2.5 text-xs rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              )}

              {/* Feedback Block */}
              {quizFeedback && (
                <div
                  className={cn(
                    'p-4 rounded-xl border text-xs leading-relaxed space-y-1.5 animate-fadeIn',
                    quizFeedback.isCorrect
                      ? 'bg-teal-50 dark:bg-teal-950/60 border-teal-200 dark:border-teal-900 text-teal-900 dark:text-teal-200'
                      : 'bg-rose-50 dark:bg-rose-950/60 border-rose-200 dark:border-rose-900 text-rose-900 dark:text-rose-200'
                  )}
                >
                  <div className="flex items-center gap-2 font-bold text-sm">
                    {quizFeedback.isCorrect ? (
                      <>
                        <CheckCircle2 className="w-4 h-4 text-teal-600" />
                        Excellent! Marked as Mastered
                      </>
                    ) : (
                      <>
                        <XCircle className="w-4 h-4 text-rose-600" />
                        Still Incorrect
                      </>
                    )}
                  </div>
                  <p>{quizFeedback.explanation}</p>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-800">
                <Button variant="ghost" size="sm" onClick={() => setIsQuizMode(false)}>
                  Cancel
                </Button>

                {!quizFeedback?.submitted ? (
                  <Button
                    variant="primary"
                    size="sm"
                    disabled={!quizAnswer.trim()}
                    onClick={handleSubmitQuizItem}
                  >
                    Check Answer
                  </Button>
                ) : (
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={handleNextQuizItem}
                    rightIcon={<ArrowRight className="w-4 h-4" />}
                  >
                    {currentQuizIndex + 1 < quizItems.length ? 'Next Question' : 'Complete Review Session'}
                  </Button>
                )}
              </div>
            </div>
          ) : (
            <div className="py-8 text-center space-y-4">
              <Award className="w-12 h-12 text-teal-600 mx-auto" />
              <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">
                Retry Session Complete!
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                You correctly resolved {quizScore} out of {quizItems.length} mistakes ({Math.round((quizScore / quizItems.length) * 100)}%).
              </p>
              <Button variant="primary" size="sm" onClick={() => setIsQuizMode(false)}>
                Back to Notebook
              </Button>
            </div>
          )}
        </Card>
      ) : (
        /* STANDARD REVIEW MODE */
        <div className="space-y-6">
          {/* Stat Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card className="p-4 border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 rounded-xl">
              <span className="text-2xs font-bold uppercase tracking-wider text-slate-400">
                Total Mistakes
              </span>
              <div className="text-xl font-bold text-slate-900 dark:text-slate-100 mt-0.5">
                {mistakes.length}
              </div>
            </Card>

            <Card className="p-4 border border-rose-200/60 dark:border-rose-900/40 bg-rose-50/30 dark:bg-rose-950/20 rounded-xl">
              <span className="text-2xs font-bold uppercase tracking-wider text-rose-600 dark:text-rose-400">
                Unmastered
              </span>
              <div className="text-xl font-bold text-rose-600 dark:text-rose-400 mt-0.5">
                {unmasteredCount}
              </div>
            </Card>

            <Card className="p-4 border border-teal-200/60 dark:border-teal-900/40 bg-teal-50/30 dark:bg-teal-950/20 rounded-xl">
              <span className="text-2xs font-bold uppercase tracking-wider text-teal-600 dark:text-teal-400">
                Mastered
              </span>
              <div className="text-xl font-bold text-teal-600 dark:text-teal-400 mt-0.5">
                {masteredCount}
              </div>
            </Card>

            <Card className="p-4 border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 rounded-xl">
              <span className="text-2xs font-bold uppercase tracking-wider text-slate-400">
                Mastery Rate
              </span>
              <div className="text-xl font-bold text-slate-900 dark:text-slate-100 mt-0.5">
                {mistakes.length > 0 ? Math.round((masteredCount / mistakes.length) * 100) : 100}%
              </div>
            </Card>
          </div>

          {/* Filter Bar */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-white dark:bg-slate-900 p-3 rounded-2xl border border-slate-200/80 dark:border-slate-800">
            {/* Status Tabs */}
            <div className="flex items-center gap-1">
              <button
                onClick={() => setSelectedStatus('unmastered')}
                className={cn(
                  'px-3 py-1.5 rounded-lg text-xs font-semibold transition-all',
                  selectedStatus === 'unmastered'
                    ? 'bg-rose-100 dark:bg-rose-950/80 text-rose-700 dark:text-rose-300'
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                )}
              >
                Unmastered ({unmasteredCount})
              </button>
              <button
                onClick={() => setSelectedStatus('mastered')}
                className={cn(
                  'px-3 py-1.5 rounded-lg text-xs font-semibold transition-all',
                  selectedStatus === 'mastered'
                    ? 'bg-teal-100 dark:bg-teal-950/80 text-teal-700 dark:text-teal-300'
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                )}
              >
                Mastered ({masteredCount})
              </button>
              <button
                onClick={() => setSelectedStatus('all')}
                className={cn(
                  'px-3 py-1.5 rounded-lg text-xs font-semibold transition-all',
                  selectedStatus === 'all'
                    ? 'bg-slate-200 dark:bg-slate-800 text-slate-900 dark:text-slate-100'
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                )}
              >
                All ({mistakes.length})
              </button>
            </div>

            {/* Module Filter & Search */}
            <div className="flex items-center gap-2">
              <select
                aria-label="Filter by learning track"
                value={selectedTrack}
                onChange={(e) => setSelectedTrack(e.target.value as 'all' | 'ielts' | 'english')}
                className="text-xs px-2.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 focus:outline-none font-semibold"
              >
                <option value="all">All Tracks</option>
                <option value="ielts">IELTS Track</option>
                <option value="english">English Course</option>
              </select>

              <select
                value={selectedModule}
                onChange={(e) => setSelectedModule(e.target.value as IELTSModule | 'all')}
                className="text-xs px-2.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 focus:outline-none"
              >
                <option value="all">All Modules</option>
                <option value="reading">Reading</option>
                <option value="listening">Listening</option>
              </select>

              <div className="relative">
                <Search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search questions..."
                  className="pl-8 pr-3 py-1.5 text-xs rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* Mistakes List */}
          {filteredMistakes.length === 0 ? (
            <EmptyState
              illustration="book"
              title={
                selectedStatus === 'unmastered'
                  ? copy.emptyStates.mistakes.title
                  : copy.emptyStates.mistakesFiltered.title
              }
              description={
                selectedStatus === 'unmastered'
                  ? copy.emptyStates.mistakes.description
                  : copy.emptyStates.mistakesFiltered.description
              }
            />
          ) : (
            <div className="space-y-4">
              {filteredMistakes.map((m) => (
                <Card
                  key={m.id}
                  className="p-5 border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 rounded-2xl shadow-xs space-y-4"
                >
                  {/* Top Bar */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 dark:border-slate-800/80 pb-3">
                    <div className="flex items-center gap-2 flex-wrap">
                      <Badge variant={m.module === 'reading' ? 'teal' : 'primary'} size="sm">
                        {m.module.toUpperCase()}
                      </Badge>
                      <Badge variant="outline" size="sm">
                        {QUESTION_TYPE_LABELS[m.questionType] || m.questionType}
                      </Badge>
                      <span className="text-2xs text-slate-400">
                        {m.passageOrContextTitle}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleToggleMastered(m)}
                        className={cn(
                          'inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold transition-all border',
                          m.isMastered
                            ? 'bg-teal-50 dark:bg-teal-950/60 border-teal-200 text-teal-700 dark:text-teal-300 hover:bg-teal-100'
                            : 'border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'
                        )}
                      >
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        {m.isMastered ? 'Mastered' : 'Mark as Mastered'}
                      </button>
                    </div>
                  </div>

                  {/* Question Prompt */}
                  <div className="text-sm font-bold text-slate-900 dark:text-slate-100">
                    {m.questionPrompt}
                  </div>

                  {/* Answers Comparison */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div className="p-3 rounded-xl border border-rose-200 dark:border-rose-900/60 bg-rose-50/40 dark:bg-rose-950/20 text-xs">
                      <span className="text-2xs font-bold uppercase tracking-wider text-rose-600 dark:text-rose-400 block mb-1">
                        Your Incorrect Answer
                      </span>
                      <div className="font-semibold text-rose-900 dark:text-rose-200 flex items-center gap-1.5">
                        <XCircle className="w-4 h-4 text-rose-500 shrink-0" />
                        <span>{m.userAnswer || '(blank)'}</span>
                      </div>
                    </div>

                    <div className="p-3 rounded-xl border border-teal-200 dark:border-teal-900/60 bg-teal-50/40 dark:bg-teal-950/20 text-xs">
                      <span className="text-2xs font-bold uppercase tracking-wider text-teal-600 dark:text-teal-400 block mb-1">
                        Correct Answer
                      </span>
                      <div className="font-semibold text-teal-900 dark:text-teal-200 flex items-center gap-1.5">
                        <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0" />
                        <span>{Array.isArray(m.correctAnswer) ? m.correctAnswer.join(' / ') : m.correctAnswer}</span>
                      </div>
                    </div>
                  </div>

                  {/* Examiner Explanation */}
                  <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800 text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                    <span className="font-bold text-slate-900 dark:text-slate-100 block mb-1">
                      Examiner Explanation:
                    </span>
                    {m.explanation}
                  </div>

                  {/* Personal Reflection Note */}
                  <div className="pt-2">
                    {expandedNotesId === m.id ? (
                      <div className="space-y-2">
                        <textarea
                          value={noteDraft}
                          onChange={(e) => setNoteDraft(e.target.value)}
                          placeholder="Why did I make this mistake? (e.g. Missed negative qualifier, assumed Not Given was False...)"
                          rows={2}
                          className="w-full p-2.5 text-xs rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500"
                        />
                        <div className="flex items-center gap-2">
                          <Button
                            variant="primary"
                            size="sm"
                            onClick={() => handleSaveNote(m.id!)}
                            leftIcon={<Save className="w-3.5 h-3.5" />}
                          >
                            Save Note
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setExpandedNotesId(null)}
                          >
                            Cancel
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <div className="flex items-center justify-between text-2xs text-slate-500 dark:text-slate-400">
                        {m.notes ? (
                          <div className="italic text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800/80 px-2.5 py-1.5 rounded-lg flex-1 mr-4">
                            Note: {m.notes}
                          </div>
                        ) : (
                          <span className="text-slate-400">No personal reflection note added yet.</span>
                        )}
                        <button
                          onClick={() => {
                            setExpandedNotesId(m.id!);
                            setNoteDraft(m.notes || '');
                          }}
                          className="inline-flex items-center gap-1 font-semibold text-teal-600 dark:text-teal-400 hover:underline"
                        >
                          <Edit3 className="w-3 h-3" />
                          {m.notes ? 'Edit Note' : 'Add Note'}
                        </button>
                      </div>
                    )}
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
