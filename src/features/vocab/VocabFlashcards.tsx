import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  RotateCw,
  Volume2,
  Flame,
  CheckCircle2,
  Clock,
  Sparkles,
  BookOpen,
  HelpCircle,
  Layers,
  ChevronRight,
  Filter,
} from 'lucide-react';
import {
  ALL_ACADEMIC_WORDS,
  VOCAB_TOPICS,
  getWordsByTopic,
} from './vocabContent';
import {
  calculateSM2,
  createInitialVocabProgress,
  getDailyStudyStreak,
  recordStudySessionForStreak,
  type SM2Rating,
} from './sm2';
import { db } from '../../lib/db';
import { speakExaminerText } from '../speaking/speechUtils';
import { recordDailyActivity, awardXp, recordWeeklyChallengeProgress } from '../habits/habitEngine';
import type { VocabProgress, VocabWordContent } from '../../types';

export function VocabFlashcards() {
  const navigate = useNavigate();

  const [selectedTrack, setSelectedTrack] = useState<'all' | 'ielts' | 'english'>('all');
  const [selectedTopic, setSelectedTopic] = useState<string>('all');
  const [deck, setDeck] = useState<VocabProgress[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [sessionCompleted, setSessionCompleted] = useState(false);
  const [streak, setStreak] = useState(0);
  const [reviewedInSession, setReviewedInSession] = useState(0);

  // Load streak on mount
  useEffect(() => {
    const { streak } = getDailyStudyStreak();
    setStreak(streak);
  }, []);

  // Load deck for the selected topic and track
  useEffect(() => {
    async function loadDeck() {
      setIsFlipped(false);
      setSessionCompleted(false);
      setCurrentIndex(0);
      setReviewedInSession(0);

      try {
        const stored = await db.vocabProgress.toArray();
        const storedMap = new Map<string, VocabProgress>();
        stored.forEach((item) => storedMap.set(item.wordId, item));

        const deckItems: VocabProgress[] = [];

        // If 'all' or 'ielts', include academic word list
        if (selectedTrack === 'all' || selectedTrack === 'ielts') {
          const words = getWordsByTopic(selectedTopic);
          for (const w of words) {
            if (storedMap.has(w.id)) {
              const item = storedMap.get(w.id)!;
              if (selectedTrack === 'all' || (item.track || 'ielts') === selectedTrack) {
                deckItems.push(item);
              }
            } else {
              deckItems.push(createInitialVocabProgress(w));
            }
          }
        }

        // If 'all' or 'english', also include English track words from stored db.vocabProgress
        if (selectedTrack === 'all' || selectedTrack === 'english') {
          const englishWords = stored.filter((w) => w.track === 'english');
          for (const w of englishWords) {
            if (!deckItems.some((d) => d.wordId === w.wordId)) {
              deckItems.push(w);
            }
          }
        }

        // Sort queue: items due for review first, then unreviewed
        const nowMs = Date.now();
        deckItems.sort((a, b) => {
          const aDue = new Date(a.nextReviewAt).getTime() <= nowMs;
          const bDue = new Date(b.nextReviewAt).getTime() <= nowMs;
          if (aDue && !bDue) return -1;
          if (!aDue && bDue) return 1;
          return a.repetitions - b.repetitions;
        });

        // Take up to 20 cards per study session for optimal cognitive retention
        setDeck(deckItems.slice(0, 20));
      } catch (err) {
        console.error('Failed to load flashcard deck:', err);
      }
    }
    loadDeck();
  }, [selectedTopic, selectedTrack]);

  const currentCard = deck[currentIndex];

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const handleRate = async (rating: SM2Rating) => {
    if (!currentCard) return;

    const sm2Result = calculateSM2(
      {
        repetitions: currentCard.repetitions || 0,
        interval: currentCard.interval || 1,
        easeFactor: currentCard.easeFactor || 2.5,
        timesCorrect: currentCard.timesCorrect || 0,
        timesIncorrect: currentCard.timesIncorrect || 0,
        mastered: currentCard.mastered || false,
      },
      rating
    );

    const updatedCard: VocabProgress = {
      ...currentCard,
      ...sm2Result,
      lastReviewedAt: new Date().toISOString(),
    };

    // Save into Dexie IndexedDB
    const savedId = await db.vocabProgress.put(updatedCard);
    updatedCard.id = savedId;

    // Update streak counter
    const newStreak = recordStudySessionForStreak();
    setStreak(newStreak);
    setReviewedInSession((r) => r + 1);

    // Habits & XP
    recordDailyActivity(1);
    awardXp(5);
    recordWeeklyChallengeProgress('vocab', 1);

    // Advance to next card or complete session
    if (currentIndex + 1 < deck.length) {
      setCurrentIndex((i) => i + 1);
      setIsFlipped(false);
    } else {
      setSessionCompleted(true);
    }
  };

  const handlePronounce = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (currentCard) {
      speakExaminerText(currentCard.word, undefined, 0.9);
    }
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (sessionCompleted || !currentCard) return;

      if (e.code === 'Space' || e.code === 'Enter') {
        e.preventDefault();
        handleFlip();
      } else if (isFlipped) {
        if (e.key === '1') handleRate('again');
        if (e.key === '2') handleRate('hard');
        if (e.key === '3') handleRate('good');
        if (e.key === '4') handleRate('easy');
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isFlipped, currentIndex, sessionCompleted, currentCard]);

  return (
    <div className="max-w-3xl mx-auto px-4 py-8 space-y-6">
      {/* Top Header */}
      <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-4">
        <div className="flex items-center gap-3">
          <Link
            to="/vocab"
            className="p-2 rounded-lg text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-teal-600 dark:text-teal-400">
                Spaced Repetition (SM-2)
              </span>
            </div>
            <h1 className="text-xl font-bold text-slate-800 dark:text-slate-100">
              Interactive Vocabulary Flashcards
            </h1>
          </div>
        </div>

        {/* Daily Streak Indicator */}
        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 text-amber-700 dark:text-amber-300 font-bold text-xs">
          <Flame className="w-4 h-4 fill-amber-500 text-amber-500 animate-pulse" />
          <span>{streak} Day Streak</span>
        </div>
      </div>

      {/* Topic Filter & Progress Header */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-white dark:bg-slate-800 p-4 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm text-xs">
        <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-slate-700 dark:text-slate-300">Track:</span>
            <select
              aria-label="Filter by track"
              value={selectedTrack}
              onChange={(e) => setSelectedTrack(e.target.value as 'all' | 'ielts' | 'english')}
              className="bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg p-1.5 text-slate-800 dark:text-slate-200 font-medium"
            >
              <option value="all">All Tracks</option>
              <option value="ielts">IELTS Track</option>
              <option value="english">English Course</option>
            </select>
          </div>

          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-teal-600" />
            <span className="font-semibold text-slate-700 dark:text-slate-300">Topic:</span>
            <select
              value={selectedTopic}
              onChange={(e) => setSelectedTopic(e.target.value)}
              className="bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg p-1.5 text-slate-800 dark:text-slate-200 font-medium capitalize"
            >
              <option value="all">All Topics (200 Words)</option>
              {VOCAB_TOPICS.map((top) => (
                <option key={top} value={top}>
                  {top.charAt(0).toUpperCase() + top.slice(1)}
                </option>
              ))}
            </select>
          </div>
        </div>

        {!sessionCompleted && deck.length > 0 && (
          <div className="flex items-center gap-2 font-mono text-slate-500">
            <span>Progress:</span>
            <span className="font-bold text-slate-800 dark:text-slate-200">
              {currentIndex + 1} / {deck.length}
            </span>
          </div>
        )}
      </div>

      {/* Session Completed View */}
      {sessionCompleted ? (
        <div className="bg-white dark:bg-slate-800 rounded-2xl p-8 sm:p-12 text-center border border-slate-200 dark:border-slate-700 shadow-sm space-y-5">
          <div className="w-14 h-14 rounded-full bg-emerald-100 dark:bg-emerald-950 flex items-center justify-center mx-auto text-emerald-600 dark:text-emerald-400">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <div className="space-y-1">
            <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100">
              Daily Flashcard Session Complete!
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm mx-auto">
              You reviewed {reviewedInSession} words today using the SM-2 algorithm. Your next reviews have been calculated and queued.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <button
              onClick={() => {
                setSessionCompleted(false);
                setCurrentIndex(0);
                setIsFlipped(false);
              }}
              className="px-5 py-2.5 bg-teal-600 hover:bg-teal-700 text-white rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-2"
            >
              <RotateCw className="w-4 h-4" />
              <span>Review Another Batch</span>
            </button>
            <button
              onClick={() => navigate('/vocab/quiz')}
              className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 dark:bg-slate-100 dark:hover:bg-white text-white dark:text-slate-900 rounded-xl text-xs sm:text-sm font-semibold transition-all"
            >
              Test Knowledge with Quiz
            </button>
          </div>
        </div>
      ) : currentCard ? (
        <div className="space-y-4">
          {/* Main Flashcard Container */}
          <div
            onClick={handleFlip}
            className={`min-h-[380px] rounded-2xl p-6 sm:p-8 border cursor-pointer transition-all duration-300 flex flex-col justify-between shadow-sm select-none relative group ${
              isFlipped
                ? 'bg-white dark:bg-slate-800 border-teal-300 dark:border-teal-700 ring-2 ring-teal-500/10'
                : 'bg-gradient-to-br from-white via-slate-50/50 to-slate-100/30 dark:from-slate-800 dark:via-slate-800 dark:to-slate-850 border-slate-200 dark:border-slate-700 hover:border-teal-400 dark:hover:border-teal-500'
            }`}
          >
            {/* Card Top Pill Bar */}
            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <span className="font-semibold px-2.5 py-0.5 rounded-full bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 capitalize">
                  {currentCard.topic}
                </span>
                <span className="italic text-slate-400 font-serif">
                  ({currentCard.partOfSpeech})
                </span>
              </div>

              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-slate-400 group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors">
                  <RotateCw className="w-3 h-3" />
                  <span className="hidden sm:inline">{isFlipped ? 'Flip to word' : 'Tap to reveal'}</span>
                </span>
                {currentCard.mastered && (
                  <span className="flex items-center gap-1 text-emerald-600 text-[11px] font-bold">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    Mastered
                  </span>
                )}
                <button
                  onClick={handlePronounce}
                  className="p-1.5 rounded-lg text-slate-500 hover:text-teal-600 hover:bg-teal-50 dark:hover:bg-slate-700 transition-colors"
                  title="Pronounce word"
                >
                  <Volume2 className="w-4 h-4" />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(`/app/dictionary/${encodeURIComponent(currentCard.word.toLowerCase())}`);
                  }}
                  className="p-1.5 rounded-lg text-slate-500 hover:text-[#124F40] dark:hover:text-[#5BB78D] hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
                  title="Lookup in English Dictionary"
                >
                  <BookOpen className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Front / Back Content */}
            {!isFlipped ? (
              <div className="text-center py-12 space-y-4">
                <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                  {currentCard.word}
                </h2>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-750 text-xs text-slate-500 dark:text-slate-400">
                  <span>Tap card or press</span>
                  <kbd className="px-1.5 py-0.5 rounded bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 font-mono text-2xs font-bold text-slate-700 dark:text-slate-200">Space</kbd>
                  <span>to reveal meaning</span>
                </div>
              </div>
            ) : (
              <div className="py-4 space-y-4 animate-in fade-in duration-200">
                <div className="space-y-1">
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
                    {currentCard.word}
                  </h2>
                  <p className="text-sm font-medium text-slate-700 dark:text-slate-200 leading-relaxed">
                    {currentCard.definition}
                  </p>
                </div>

                {/* Urdu Meaning */}
                {currentCard.urduMeaning && (
                  <div className="p-2.5 rounded-lg bg-teal-50/50 dark:bg-teal-950/30 border border-teal-100 dark:border-teal-900 text-xs font-semibold text-teal-800 dark:text-teal-300 flex items-center justify-between">
                    <span>Urdu Meaning:</span>
                    <span className="font-serif text-sm">{currentCard.urduMeaning}</span>
                  </div>
                )}

                {/* Example Sentence */}
                {currentCard.exampleSentence && (
                  <div className="text-xs text-slate-600 dark:text-slate-300 italic border-l-2 border-teal-500 pl-3 py-0.5">
                    "{currentCard.exampleSentence}"
                  </div>
                )}

                {/* Collocations */}
                {currentCard.collocations && currentCard.collocations.length > 0 && (
                  <div className="text-xs space-y-1">
                    <span className="font-bold text-slate-500 uppercase tracking-wider text-[10px]">
                      High-Yield IELTS Collocations:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {currentCard.collocations.map((col, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200 font-mono text-[11px]"
                        >
                          {col}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Bottom Hint */}
            <div className="border-t border-slate-100 dark:border-slate-700/60 pt-3 flex items-center justify-between text-[11px] text-slate-400">
              <span>Reviews: {currentCard.repetitions || 0}</span>
              <span>SM-2 Ease: {currentCard.easeFactor?.toFixed(1) || '2.5'}</span>
            </div>
          </div>

          {/* SM-2 Rating Controls (visible when flipped) */}
          {isFlipped ? (
            <div className="space-y-2">
              <span className="text-xs text-slate-500 block text-center font-medium">
                How easily did you recall this word? (Press 1–4)
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                <button
                  onClick={() => handleRate('again')}
                  className="p-3 rounded-xl bg-rose-50 hover:bg-rose-100/90 text-rose-800 border border-rose-200 dark:bg-rose-950/40 dark:text-rose-200 dark:border-rose-900 text-xs font-semibold text-center transition-all shadow-2xs hover:shadow-xs"
                >
                  <span className="block font-bold text-sm">Again</span>
                  <div className="flex items-center justify-center gap-1 mt-1 text-[11px] opacity-80">
                    <span className="font-mono font-medium">1 day</span>
                    <span className="px-1 py-0.2 rounded bg-rose-200/60 dark:bg-rose-900 font-mono text-2xs">[1]</span>
                  </div>
                </button>

                <button
                  onClick={() => handleRate('hard')}
                  className="p-3 rounded-xl bg-amber-50 hover:bg-amber-100/90 text-amber-900 border border-amber-200 dark:bg-amber-950/40 dark:text-amber-200 dark:border-amber-900 text-xs font-semibold text-center transition-all shadow-2xs hover:shadow-xs"
                >
                  <span className="block font-bold text-sm">Hard</span>
                  <div className="flex items-center justify-center gap-1 mt-1 text-[11px] opacity-80">
                    <span className="font-mono font-medium">1–2 days</span>
                    <span className="px-1 py-0.2 rounded bg-amber-200/60 dark:bg-amber-900 font-mono text-2xs">[2]</span>
                  </div>
                </button>

                <button
                  onClick={() => handleRate('good')}
                  className="p-3 rounded-xl bg-teal-50 hover:bg-teal-100/90 text-teal-900 border border-teal-200 dark:bg-teal-950/40 dark:text-teal-200 dark:border-teal-900 text-xs font-semibold text-center transition-all shadow-2xs hover:shadow-xs"
                >
                  <span className="block font-bold text-sm">Good</span>
                  <div className="flex items-center justify-center gap-1 mt-1 text-[11px] opacity-80">
                    <span className="font-mono font-medium">3–6 days</span>
                    <span className="px-1 py-0.2 rounded bg-teal-200/60 dark:bg-teal-900 font-mono text-2xs">[3]</span>
                  </div>
                </button>

                <button
                  onClick={() => handleRate('easy')}
                  className="p-3 rounded-xl bg-emerald-50 hover:bg-emerald-100/90 text-emerald-900 border border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-200 dark:border-emerald-900 text-xs font-semibold text-center transition-all shadow-2xs hover:shadow-xs"
                >
                  <span className="block font-bold text-sm">Easy</span>
                  <div className="flex items-center justify-center gap-1 mt-1 text-[11px] opacity-80">
                    <span className="font-mono font-medium">4–8 days</span>
                    <span className="px-1 py-0.2 rounded bg-emerald-200/60 dark:bg-emerald-900 font-mono text-2xs">[4]</span>
                  </div>
                </button>
              </div>
            </div>
          ) : (
            <button
              onClick={handleFlip}
              className="w-full py-3 bg-slate-900 hover:bg-slate-800 dark:bg-slate-100 dark:hover:bg-white text-white dark:text-slate-900 rounded-xl text-xs sm:text-sm font-semibold shadow-sm transition-all"
            >
              Show Answer (Space)
            </button>
          )}
        </div>
      ) : null}
    </div>
  );
}
