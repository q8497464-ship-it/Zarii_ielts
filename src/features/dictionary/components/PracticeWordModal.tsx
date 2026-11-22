import React, { useState } from 'react';
import {
  X,
  Volume2,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  ArrowRight,
  RotateCcw,
  Trophy,
} from 'lucide-react';
import { Button } from '../../../components/ui/Button';
import { Badge } from '../../../components/ui/Badge';
import { playPronunciation, type DictionaryEntry } from '../dictionaryService';
import { useAppStore } from '../../../store/useAppStore';

interface PracticeWordModalProps {
  isOpen: boolean;
  onClose: () => void;
  entry: DictionaryEntry;
}

export function PracticeWordModal({ isOpen, onClose, entry }: PracticeWordModalProps) {
  const { addToast } = useAppStore();
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [textInput, setTextInput] = useState('');
  const [isAnswerChecked, setIsAnswerChecked] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [score, setScore] = useState(0);

  if (!isOpen) return null;

  const targetWord = entry.word.toLowerCase();
  const definition = entry.definition;
  const exampleSentence =
    entry.senses?.[0]?.examples?.[0] || entry.exampleSentence || `She used the word "${entry.word}" effectively in her essay.`;

  // Cloze sentence replacing target word
  const clozeSentence = exampleSentence.replace(
    new RegExp(`\\b${targetWord}\\b`, 'gi'),
    '_______'
  );

  // Distractors for Question 1
  const distractorsQ1 = [
    'To make a sudden or violent physical attack upon someone.',
    'A state of complete disorder and confusion with lack of direction.',
    'A gradual accumulation of wealth or financial assets over time.',
  ];
  const q1Options = [definition, ...distractorsQ1].sort(() => 0.5 - Math.sin(targetWord.length));

  // Options for Question 2
  const q2Options = [
    targetWord,
    targetWord.length > 4 ? targetWord.slice(0, -2) + 'ed' : 'alternative',
    'factor',
    'concept',
  ].sort(() => 0.5 - Math.cos(targetWord.length));

  const handleCheckAnswer = () => {
    setIsAnswerChecked(true);
    let correct = false;

    if (currentStep === 1) {
      correct = selectedAnswer === definition;
    } else if (currentStep === 2) {
      correct = selectedAnswer?.toLowerCase() === targetWord;
    } else if (currentStep === 3) {
      correct = textInput.trim().toLowerCase() === targetWord;
    }

    setIsCorrect(correct);
    if (correct) {
      setScore(s => s + 1);
    }
  };

  const handleNextStep = () => {
    if (currentStep < 3) {
      setCurrentStep(s => s + 1);
      setSelectedAnswer(null);
      setTextInput('');
      setIsAnswerChecked(false);
      setIsCorrect(false);
    } else {
      // Completed all 3 questions
      setCurrentStep(4);
      addToast({
        type: 'success',
        title: 'Practice Completed!',
        message: `Great job practicing "${entry.word}".`,
      });
    }
  };

  const handleReset = () => {
    setCurrentStep(1);
    setSelectedAnswer(null);
    setTextInput('');
    setIsAnswerChecked(false);
    setIsCorrect(false);
    setScore(0);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-2xl max-w-lg w-full overflow-hidden border border-slate-200 dark:border-slate-800">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 dark:text-slate-100 text-sm">
                Practise: <span className="capitalize">{entry.word}</span>
              </h3>
              <p className="text-2xs text-slate-500">3-Step Quick Mastery</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-6">
          {currentStep <= 3 && (
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">
                Question {currentStep} of 3
              </span>
              <div className="flex gap-1.5">
                {[1, 2, 3].map(i => (
                  <div
                    key={i}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      i === currentStep
                        ? 'w-8 bg-emerald-500'
                        : i < currentStep
                        ? 'w-4 bg-emerald-300 dark:bg-emerald-700'
                        : 'w-4 bg-slate-200 dark:bg-slate-700'
                    }`}
                  />
                ))}
              </div>
            </div>
          )}

          {/* STEP 1: Meaning Match */}
          {currentStep === 1 && (
            <div className="space-y-4">
              <div className="space-y-1">
                <span className="text-2xs font-bold text-slate-400 uppercase">Meaning Identification</span>
                <h4 className="text-base font-semibold text-slate-900 dark:text-slate-100">
                  What is the correct definition of <span className="text-emerald-600 dark:text-emerald-400 font-bold">"{entry.word}"</span>?
                </h4>
              </div>

              <div className="space-y-2">
                {q1Options.map((opt, idx) => (
                  <button
                    key={idx}
                    disabled={isAnswerChecked}
                    onClick={() => setSelectedAnswer(opt)}
                    className={`w-full text-left p-3.5 rounded-xl border text-sm transition-all ${
                      selectedAnswer === opt
                        ? isAnswerChecked
                          ? opt === definition
                            ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-500 text-emerald-900 dark:text-emerald-200'
                            : 'bg-rose-50 dark:bg-rose-950/40 border-rose-500 text-rose-900 dark:text-rose-200'
                          : 'border-emerald-500 bg-emerald-50/50 dark:bg-emerald-950/20 text-slate-900 dark:text-slate-100'
                        : isAnswerChecked && opt === definition
                        ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-500 text-emerald-900 dark:text-emerald-200'
                        : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 text-slate-700 dark:text-slate-300'
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* STEP 2: Fill in the Blank */}
          {currentStep === 2 && (
            <div className="space-y-4">
              <div className="space-y-1">
                <span className="text-2xs font-bold text-slate-400 uppercase">Sentence Context Cloze</span>
                <h4 className="text-base font-semibold text-slate-900 dark:text-slate-100">
                  Select the best word to complete the sentence:
                </h4>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 text-sm leading-relaxed text-slate-800 dark:text-slate-200 italic">
                "{clozeSentence}"
              </div>

              <div className="grid grid-cols-2 gap-2">
                {q2Options.map((opt, idx) => (
                  <button
                    key={idx}
                    disabled={isAnswerChecked}
                    onClick={() => setSelectedAnswer(opt)}
                    className={`p-3 text-center rounded-xl border text-sm font-medium transition-all ${
                      selectedAnswer === opt
                        ? isAnswerChecked
                          ? opt.toLowerCase() === targetWord
                            ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-500 text-emerald-900 dark:text-emerald-200'
                            : 'bg-rose-50 dark:bg-rose-950/40 border-rose-500 text-rose-900 dark:text-rose-200'
                          : 'border-emerald-500 bg-emerald-50/50 dark:bg-emerald-950/20 text-slate-900 dark:text-slate-100'
                        : isAnswerChecked && opt.toLowerCase() === targetWord
                        ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-500 text-emerald-900 dark:text-emerald-200'
                        : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 text-slate-700 dark:text-slate-300'
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* STEP 3: Audio & Spelling Recall */}
          {currentStep === 3 && (
            <div className="space-y-4">
              <div className="space-y-1">
                <span className="text-2xs font-bold text-slate-400 uppercase">Listening & Spelling Recall</span>
                <h4 className="text-base font-semibold text-slate-900 dark:text-slate-100">
                  Listen to the audio pronunciation and type the word:
                </h4>
              </div>

              <div className="flex flex-col items-center justify-center p-6 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 gap-3">
                <button
                  onClick={() => playPronunciation(entry.word, { lang: 'en-US' })}
                  className="w-14 h-14 rounded-full bg-emerald-600 text-white flex items-center justify-center shadow-lg hover:scale-105 active:scale-95 transition-transform"
                  title="Play pronunciation"
                >
                  <Volume2 className="w-6 h-6" />
                </button>
                <span className="text-xs text-slate-500">Tap to listen (US Pronunciation)</span>
              </div>

              <div className="space-y-2">
                <input
                  type="text"
                  value={textInput}
                  disabled={isAnswerChecked}
                  onChange={e => setTextInput(e.target.value)}
                  onKeyDown={e => {
                    if (e.key === 'Enter' && textInput.trim() && !isAnswerChecked) {
                      handleCheckAnswer();
                    }
                  }}
                  placeholder="Type the word here..."
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 text-center text-lg font-semibold tracking-wide focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
            </div>
          )}

          {/* STEP 4: Results & Score */}
          {currentStep === 4 && (
            <div className="text-center py-6 space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 mx-auto flex items-center justify-center">
                <Trophy className="w-8 h-8" />
              </div>
              <div className="space-y-1">
                <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100">
                  Practice Finished!
                </h3>
                <p className="text-sm text-slate-500">
                  You scored <span className="font-bold text-emerald-600">{score}</span> out of 3.
                </p>
              </div>
              <div className="flex justify-center gap-3 pt-2">
                <Button variant="outline" onClick={handleReset} className="gap-2">
                  <RotateCcw className="w-4 h-4" />
                  Try Again
                </Button>
                <Button onClick={onClose} className="bg-emerald-600 hover:bg-emerald-700 text-white">
                  Done
                </Button>
              </div>
            </div>
          )}

          {/* Answer Feedback Banner */}
          {isAnswerChecked && currentStep <= 3 && (
            <div
              className={`p-3.5 rounded-xl flex items-center gap-3 text-sm font-medium ${
                isCorrect
                  ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-200 border border-emerald-200 dark:border-emerald-800'
                  : 'bg-rose-50 dark:bg-rose-950/40 text-rose-800 dark:text-rose-200 border border-rose-200 dark:border-rose-800'
              }`}
            >
              {isCorrect ? (
                <>
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                  <span>Correct! Excellent recall.</span>
                </>
              ) : (
                <>
                  <AlertCircle className="w-5 h-5 text-rose-600 shrink-0" />
                  <span>
                    Incorrect. The target answer was: <strong className="capitalize">{entry.word}</strong>.
                  </span>
                </>
              )}
            </div>
          )}
        </div>

        {/* Footer Actions */}
        {currentStep <= 3 && (
          <div className="flex items-center justify-between px-6 py-4 bg-slate-50/50 dark:bg-slate-800/40 border-t border-slate-100 dark:border-slate-800">
            <Button variant="ghost" size="sm" onClick={onClose} className="text-slate-400">
              Cancel
            </Button>

            {!isAnswerChecked ? (
              <Button
                disabled={currentStep === 3 ? !textInput.trim() : !selectedAnswer}
                onClick={handleCheckAnswer}
                className="bg-emerald-600 hover:bg-emerald-700 text-white"
              >
                Check Answer
              </Button>
            ) : (
              <Button
                onClick={handleNextStep}
                className="bg-emerald-600 hover:bg-emerald-700 text-white gap-2"
              >
                <span>{currentStep === 3 ? 'View Score' : 'Next Question'}</span>
                <ArrowRight className="w-4 h-4" />
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
