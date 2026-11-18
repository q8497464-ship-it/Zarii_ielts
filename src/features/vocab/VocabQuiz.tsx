import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  RotateCcw,
  CheckCircle2,
  XCircle,
  HelpCircle,
  Sparkles,
  BookOpen,
  PlusCircle,
  Filter,
} from 'lucide-react';
import {
  ALL_ACADEMIC_WORDS,
  VOCAB_TOPICS,
  getWordsByTopic,
} from './vocabContent';
import { db } from '../../lib/db';
import { createInitialVocabProgress } from './sm2';
import { recordDailyActivity, awardXp, recordWeeklyChallengeProgress } from '../habits/habitEngine';
import type { VocabWordContent } from '../../types';
import { shuffleMcqOptions } from '../../lib/mcqShuffle';

interface QuizQuestion {
  id: string;
  type: 'meaning' | 'blank' | 'synonym';
  targetWord: VocabWordContent;
  questionText: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
}

export function VocabQuiz() {
  const navigate = useNavigate();

  const [selectedTopic, setSelectedTopic] = useState<string>('all');
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [missedWords, setMissedWords] = useState<VocabWordContent[]>([]);
  const [addedMissed, setAddedMissed] = useState(false);
  const quizAttemptSeedRef = React.useRef(`vocab_${Date.now()}`);

  // Generate 10 randomized quiz questions
  const generateQuiz = (topic: string) => {
    setSelectedOption(null);
    setIsAnswered(false);
    setScore(0);
    setCurrentIndex(0);
    setQuizCompleted(false);
    setMissedWords([]);
    setAddedMissed(false);

    const seedBase = `vocab_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`;
    quizAttemptSeedRef.current = seedBase;

    const sourceWords = getWordsByTopic(topic);
    const shuffledTargets = shuffleMcqOptions(sourceWords.map((w) => w.id), `${seedBase}_targets`);
    const targetIds = new Set(shuffledTargets.slice(0, 10).map((o) => o.raw));
    const chosenTargets = sourceWords.filter((w) => targetIds.has(w.id));

    const generated: QuizQuestion[] = chosenTargets.map((word, idx) => {
      // Rotate through the 3 quiz types
      const types: Array<'meaning' | 'blank' | 'synonym'> = ['meaning', 'blank', 'synonym'];
      const qType = types[idx % 3];

      // Pick 3 random distractors from sourceWords
      const pool = sourceWords.filter((w) => w.id !== word.id);
      const shuffledPool = shuffleMcqOptions(pool.map((p) => p.id), `${seedBase}_pool_${idx}`);
      const distractorIds = new Set(shuffledPool.slice(0, 3).map((o) => o.raw));
      const distractors = pool.filter((w) => distractorIds.has(w.id));

      if (qType === 'meaning') {
        const rawOptions = [word.meaning, ...distractors.map((d) => d.meaning)];
        const options = shuffleMcqOptions(rawOptions, `${seedBase}_meaning_${idx}`).map((o) => o.text);
        return {
          id: `quiz-q-${idx}`,
          type: 'meaning',
          targetWord: word,
          questionText: `What is the correct academic definition of "${word.word}" (${word.partOfSpeech})?`,
          options,
          correctAnswer: word.meaning,
          explanation: `"${word.word}" means: ${word.meaning}. Example: "${word.exampleSentence}"`,
        };
      } else if (qType === 'blank') {
        // Replace target word in its example sentence with ______
        const blankRegex = new RegExp(`\\b${word.word}\\b`, 'gi');
        const sentenceWithBlank = word.exampleSentence.replace(blankRegex, '________');
        const rawOptions = [word.word, ...distractors.map((d) => d.word)];
        const options = shuffleMcqOptions(rawOptions, `${seedBase}_blank_${idx}`).map((o) => o.text);
        return {
          id: `quiz-q-${idx}`,
          type: 'blank',
          targetWord: word,
          questionText: `Fill in the blank with the most appropriate academic word:\n\n"${sentenceWithBlank}"`,
          options,
          correctAnswer: word.word,
          explanation: `The correct word is "${word.word}". Definition: ${word.meaning}.`,
        };
      } else {
        // Synonym question
        const targetSynonym = word.synonyms[0] || word.meaning;
        const rawOptions = [targetSynonym, ...distractors.map((d) => d.synonyms[0] || d.word)];
        const options = shuffleMcqOptions(rawOptions, `${seedBase}_syn_${idx}`).map((o) => o.text);
        return {
          id: `quiz-q-${idx}`,
          type: 'synonym',
          targetWord: word,
          questionText: `Which of the following is the closest academic synonym for "${word.word}"?`,
          options,
          correctAnswer: targetSynonym,
          explanation: `"${targetSynonym}" is a direct synonym for "${word.word}". High-yield synonyms include: ${word.synonyms.join(', ')}.`,
        };
      }
    });

    setQuestions(generated);
  };

  useEffect(() => {
    generateQuiz(selectedTopic);
  }, [selectedTopic]);

  const currentQ = questions[currentIndex];

  const handleSelectOption = (option: string) => {
    if (isAnswered) return;
    setSelectedOption(option);
    setIsAnswered(true);

    if (option === currentQ.correctAnswer) {
      setScore((s) => s + 1);
    } else {
      setMissedWords((prev) => [...prev, currentQ.targetWord]);
    }
  };

  const handleNext = () => {
    if (currentIndex + 1 < questions.length) {
      setCurrentIndex((i) => i + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      setQuizCompleted(true);
      recordDailyActivity(5);
      awardXp(Math.round(25 + score * 5));
      recordWeeklyChallengeProgress('vocab', Math.max(1, score));
    }
  };

  const handleAddMissedToReview = async () => {
    if (missedWords.length === 0) return;
    try {
      const stored = await db.vocabProgress.toArray();
      const storedWordIds = new Set(stored.map((s) => s.wordId));

      for (const missed of missedWords) {
        if (!storedWordIds.has(missed.id)) {
          await db.vocabProgress.add(createInitialVocabProgress(missed));
        } else {
          // Reset interval to 1 day for urgent review
          const record = stored.find((s) => s.wordId === missed.id);
          if (record && record.id) {
            await db.vocabProgress.update(record.id, {
              nextReviewAt: new Date().toISOString(),
              interval: 1,
              repetitions: 0,
            });
          }
        }
      }
      setAddedMissed(true);
    } catch (err) {
      console.error('Failed to add missed words to review deck:', err);
    }
  };

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
            <span className="text-xs font-bold uppercase tracking-wider text-teal-600 dark:text-teal-400">
              Knowledge Verification
            </span>
            <h1 className="text-xl font-bold text-slate-800 dark:text-slate-100">
              Academic Vocabulary Quiz
            </h1>
          </div>
        </div>
      </div>

      {/* Filter Header */}
      <div className="flex items-center justify-between bg-white dark:bg-slate-800 p-4 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm text-xs">
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-teal-600" />
          <span className="font-semibold text-slate-700 dark:text-slate-300">Topic:</span>
          <select
            value={selectedTopic}
            onChange={(e) => setSelectedTopic(e.target.value)}
            className="bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg p-1.5 text-slate-800 dark:text-slate-200 capitalize"
          >
            <option value="all">All Topics (Mixed)</option>
            {VOCAB_TOPICS.map((top) => (
              <option key={top} value={top}>
                {top.charAt(0).toUpperCase() + top.slice(1)}
              </option>
            ))}
          </select>
        </div>

        {!quizCompleted && (
          <div className="flex items-center gap-2 font-mono text-slate-500">
            <span>Score:</span>
            <span className="font-bold text-teal-600 dark:text-teal-400">
              {score} / {currentIndex + (isAnswered ? 1 : 0)}
            </span>
          </div>
        )}
      </div>

      {/* Quiz Completion View */}
      {quizCompleted ? (
        <div className="bg-white dark:bg-slate-800 rounded-2xl p-8 sm:p-12 text-center border border-slate-200 dark:border-slate-700 shadow-sm space-y-6">
          <div className="w-16 h-16 rounded-full bg-teal-100 dark:bg-teal-950 flex items-center justify-center mx-auto text-teal-600 dark:text-teal-400">
            <Sparkles className="w-8 h-8" />
          </div>

          <div className="space-y-1">
            <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100">
              Quiz Completed!
            </h2>
            <p className="text-sm text-slate-500">
              You scored <strong className="text-teal-600">{score}</strong> out of{' '}
              <strong>{questions.length}</strong> ({Math.round((score / questions.length) * 100)}%)
            </p>
          </div>

          {missedWords.length > 0 && (
            <div className="p-4 bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 rounded-xl text-xs text-amber-900 dark:text-amber-200 space-y-2 text-left">
              <span className="font-bold block">
                Words for Review ({missedWords.length}):
              </span>
              <div className="flex flex-wrap gap-1.5">
                {missedWords.map((mw) => (
                  <span
                    key={mw.id}
                    className="px-2 py-0.5 rounded bg-white dark:bg-slate-800 border border-amber-200 dark:border-amber-800 text-[11px] font-mono"
                  >
                    {mw.word}
                  </span>
                ))}
              </div>

              {!addedMissed ? (
                <button
                  onClick={handleAddMissedToReview}
                  className="mt-2 inline-flex items-center gap-1.5 px-3 py-1.5 bg-amber-600 hover:bg-amber-700 text-white rounded-lg text-xs font-semibold shadow-sm transition-all"
                >
                  <PlusCircle className="w-3.5 h-3.5" />
                  <span>Queue Missed Words in Flashcard Deck</span>
                </button>
              ) : (
                <span className="mt-2 inline-flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-semibold text-xs">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  Added to today's review deck!
                </span>
              )}
            </div>
          )}

          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <button
              onClick={() => generateQuiz(selectedTopic)}
              className="px-5 py-2.5 bg-teal-600 hover:bg-teal-700 text-white rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-2"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Take Another Quiz</span>
            </button>
            <button
              onClick={() => navigate('/vocab/flashcards')}
              className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 dark:bg-slate-100 dark:hover:bg-white text-white dark:text-slate-900 rounded-xl text-xs sm:text-sm font-semibold transition-all"
            >
              Study Flashcards
            </button>
          </div>
        </div>
      ) : currentQ ? (
        <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 sm:p-8 border border-slate-200 dark:border-slate-700 shadow-sm space-y-6">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-teal-600 dark:text-teal-400">
              Question {currentIndex + 1} of {questions.length} • {currentQ.type.toUpperCase()}
            </span>
            <span className="text-xs px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-700 text-slate-500 capitalize">
              {currentQ.targetWord.topic}
            </span>
          </div>

          <p className="text-base sm:text-lg font-medium text-slate-800 dark:text-slate-100 leading-relaxed whitespace-pre-line">
            {currentQ.questionText}
          </p>

          {/* Options Grid */}
          <div className="space-y-2.5">
            {currentQ.options.map((option, idx) => {
              let btnClass =
                'border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-750 text-slate-800 dark:text-slate-200';

              if (isAnswered) {
                if (option === currentQ.correctAnswer) {
                  btnClass =
                    'border-emerald-500 bg-emerald-50 text-emerald-800 dark:bg-emerald-950/50 dark:text-emerald-200 font-semibold';
                } else if (option === selectedOption) {
                  btnClass =
                    'border-rose-500 bg-rose-50 text-rose-800 dark:bg-rose-950/50 dark:text-rose-200 line-through';
                }
              }

              return (
                <button
                  key={idx}
                  onClick={() => handleSelectOption(option)}
                  disabled={isAnswered}
                  className={`w-full p-4 rounded-xl border text-left text-xs sm:text-sm transition-all flex items-start gap-3 ${btnClass}`}
                >
                  <span className="font-bold text-slate-400">
                    {String.fromCharCode(65 + idx)}.
                  </span>
                  <span className="flex-1 leading-relaxed">{option}</span>
                  {isAnswered && option === currentQ.correctAnswer && (
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                  )}
                  {isAnswered && option === selectedOption && option !== currentQ.correctAnswer && (
                    <XCircle className="w-4 h-4 text-rose-600 flex-shrink-0 mt-0.5" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Instant Explanation Box */}
          {isAnswered && (
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs text-slate-600 dark:text-slate-300 space-y-1 animate-in fade-in">
              <span className="font-bold text-slate-800 dark:text-slate-200 block">
                Explanation:
              </span>
              <p className="leading-relaxed">{currentQ.explanation}</p>
            </div>
          )}

          {/* Action Footer */}
          {isAnswered && (
            <div className="flex justify-end pt-2">
              <button
                onClick={handleNext}
                className="px-6 py-2.5 bg-slate-900 hover:bg-slate-800 dark:bg-slate-100 dark:hover:bg-white text-white dark:text-slate-900 rounded-xl text-xs sm:text-sm font-semibold transition-all"
              >
                {currentIndex + 1 < questions.length ? 'Next Question' : 'View Final Results'}
              </button>
            </div>
          )}
        </div>
      ) : null}
    </div>
  );
}
