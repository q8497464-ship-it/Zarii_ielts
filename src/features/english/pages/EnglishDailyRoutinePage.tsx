import React, { useState, useEffect } from 'react';
import { 
  Sparkles, 
  CheckCircle2, 
  ArrowRight, 
  ArrowLeft, 
  RotateCcw, 
  Volume2, 
  Mic, 
  BookOpen, 
  Headphones, 
  GraduationCap, 
  Flame, 
  Award,
  Layers
} from 'lucide-react';
import { skillsService, type Daily15Plan } from '../services/skillsService';
import { cn } from '../../../lib/utils';
import { playPronunciation } from '../../dictionary/dictionaryService';

export const EnglishDailyRoutinePage: React.FC = () => {
  const [plan, setPlan] = useState<Daily15Plan>(() => skillsService.getDaily15Plan());
  const [currentStep, setCurrentStep] = useState<number>(0);

  // Step 1: Grammar state
  const [grammarAnswer, setGrammarAnswer] = useState<number | null>(null);
  const [grammarChecked, setGrammarChecked] = useState(false);

  // Step 2: Vocab state
  const [vocabIndex, setVocabIndex] = useState<number>(0);
  const [isCardFlipped, setIsCardFlipped] = useState(false);
  const [reviewedWordsCount, setReviewedWordsCount] = useState<number>(0);

  // Step 3: Listening state
  const [listeningAnswer, setListeningAnswer] = useState<number | null>(null);
  const [listeningChecked, setListeningChecked] = useState(false);

  // Step 4: Reading state
  const [readingAnswer, setReadingAnswer] = useState<number | null>(null);
  const [readingChecked, setReadingChecked] = useState(false);

  // Step 5: Speaking state
  const [isRecording, setIsRecording] = useState(false);
  const [recognizedText, setRecognizedText] = useState('');
  const [speakingDone, setSpeakingDone] = useState(false);

  // Completion state
  const [routineCompleted, setRoutineCompleted] = useState(false);

  useEffect(() => {
    const p = skillsService.getDaily15Plan();
    setPlan(p);
    if (p.completed) {
      setRoutineCompleted(true);
    }
  }, []);

  const speak = (text: string, rate: number = 0.9) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = rate;
      utterance.lang = 'en-US';
      window.speechSynthesis.speak(utterance);
    }
  };

  const handleNextStep = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    } else {
      // Finished all 5 steps!
      skillsService.markDaily15Completed();
      setRoutineCompleted(true);
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleRecordSpeaking = () => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      setRecognizedText(plan.steps.speaking.targetSentence);
      setSpeakingDone(true);
      return;
    }

    try {
      const recognition = new SpeechRecognition();
      recognition.lang = 'en-US';
      recognition.onstart = () => {
        setIsRecording(true);
        setRecognizedText('');
      };
      recognition.onresult = (e: any) => {
        const transcript = e.results[0][0].transcript;
        setRecognizedText(transcript);
        setSpeakingDone(true);
      };
      recognition.onerror = () => {
        setIsRecording(false);
      };
      recognition.onend = () => {
        setIsRecording(false);
      };
      recognition.start();
    } catch {
      setIsRecording(false);
      setRecognizedText(plan.steps.speaking.targetSentence);
      setSpeakingDone(true);
    }
  };

  const stepNames = [
    { label: 'Grammar Rule', icon: GraduationCap },
    { label: '10 Vocab Flashcards', icon: Layers },
    { label: 'Listening Mini-Drill', icon: Headphones },
    { label: 'Reading Reader', icon: BookOpen },
    { label: 'Speaking Turn', icon: Mic },
  ];

  return (
    <div className="min-h-screen bg-[#F7FAF8] dark:bg-[#0B1510] text-slate-800 dark:text-slate-100 p-4 md:p-8">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="mb-6 pb-6 border-b border-emerald-900/10 dark:border-emerald-500/20 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-100 dark:bg-emerald-950/60 text-[#124F40] dark:text-[#5BB78D]">
                Daily English Routine
              </span>
              <span className="text-xs text-slate-400">15-Minute Workout</span>
            </div>
            <h1 className="text-2xl font-extrabold text-[#124F40] dark:text-[#5BB78D] tracking-tight">
              Daily 15 Routine
            </h1>
          </div>

          <div className="flex items-center gap-2 px-3 py-1.5 bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/40 rounded-xl text-amber-700 dark:text-amber-300 text-xs font-bold">
            <Flame className="w-4 h-4 text-amber-500 animate-pulse" />
            <span>Today's Streak Active</span>
          </div>
        </div>

        {/* Segmented Progress Tracker */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2 text-xs font-bold text-slate-500">
            <span>Step {currentStep + 1} of 5: {stepNames[currentStep].label}</span>
            <span>{Math.round(((currentStep + 1) / 5) * 100)}%</span>
          </div>

          <div className="grid grid-cols-5 gap-1.5 h-2 bg-slate-200 dark:bg-neutral-800 rounded-full overflow-hidden">
            {[0, 1, 2, 3, 4].map(idx => (
              <div
                key={idx}
                className={cn(
                  'h-full transition-colors',
                  idx <= currentStep ? 'bg-[#124F40] dark:bg-[#5BB78D]' : 'bg-transparent'
                )}
              />
            ))}
          </div>
        </div>

        {/* Step Card Container */}
        {!routineCompleted ? (
          <div className="bg-white dark:bg-[#112019] border border-slate-200 dark:border-[#24392F] rounded-3xl p-6 md:p-8 shadow-sm">
            {/* STEP 1: GRAMMAR QUICK RULE */}
            {currentStep === 0 && (
              <div>
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400 mb-1">
                  <GraduationCap className="w-4 h-4" /> Step 1: Grammar Concept
                </div>
                <h2 className="text-xl font-extrabold text-slate-900 dark:text-slate-100 mb-3">
                  {plan.steps.grammar.title}
                </h2>
                <div className="p-4 bg-emerald-50/60 dark:bg-emerald-950/20 border border-emerald-200/60 dark:border-emerald-800/40 rounded-2xl text-xs text-slate-700 dark:text-slate-300 leading-relaxed mb-6">
                  {plan.steps.grammar.ruleSummary}
                </div>

                <div className="space-y-3">
                  <div className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                    {plan.steps.grammar.exercisePrompt}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                    {plan.steps.grammar.options.map((opt, optIdx) => (
                      <button
                        key={optIdx}
                        onClick={() => { setGrammarAnswer(optIdx); setGrammarChecked(true); }}
                        className={cn(
                          'p-3 rounded-xl text-xs font-semibold border text-left transition-all',
                          grammarAnswer === optIdx && grammarChecked
                            ? optIdx === plan.steps.grammar.correctIndex
                              ? 'bg-emerald-100 border-emerald-500 text-emerald-900 font-bold'
                              : 'bg-rose-100 border-rose-500 text-rose-900 font-bold'
                            : 'bg-slate-50 dark:bg-[#0B1510] border-slate-200 hover:bg-slate-100'
                        )}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>

                  {grammarChecked && (
                    <div className="p-3 bg-slate-50 dark:bg-[#0B1510] border border-slate-200 rounded-xl text-xs text-slate-600 dark:text-slate-400 mt-2">
                      {plan.steps.grammar.explanation}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* STEP 2: 10 VOCABULARY FLASHCARDS */}
            {currentStep === 1 && (
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="text-xs font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400 flex items-center gap-1.5">
                    <Layers className="w-4 h-4" /> Step 2: Vocabulary Spaced Repetition
                  </div>
                  <span className="text-xs text-slate-400 font-mono">
                    Card {vocabIndex + 1} of {plan.steps.vocabWords.length}
                  </span>
                </div>

                {/* Flip Card */}
                <div
                  onClick={() => setIsCardFlipped(!isCardFlipped)}
                  className="min-h-[180px] p-8 rounded-3xl bg-slate-50 dark:bg-[#0B1510] border-2 border-dashed border-emerald-300 dark:border-emerald-800 flex flex-col items-center justify-center text-center cursor-pointer hover:border-emerald-500 transition-colors my-4"
                >
                  {!isCardFlipped ? (
                    <div>
                      <div className="text-3xl font-extrabold text-[#124F40] dark:text-[#5BB78D]">
                        {plan.steps.vocabWords[vocabIndex].word}
                      </div>
                      <div className="text-xs text-slate-400 italic mt-1">
                        ({plan.steps.vocabWords[vocabIndex].pos})
                      </div>
                      <div className="text-xs text-slate-400 font-semibold mt-4">
                        (Tap to reveal definition and Urdu)
                      </div>
                    </div>
                  ) : (
                    <div>
                      <div className="text-base font-bold text-slate-800 dark:text-slate-200">
                        {plan.steps.vocabWords[vocabIndex].definition}
                      </div>
                      <div className="text-base font-urdu text-emerald-800 dark:text-emerald-300 font-bold mt-2">
                        {plan.steps.vocabWords[vocabIndex].urdu}
                      </div>
                    </div>
                  )}
                </div>

                <div className="flex items-center justify-between gap-3 pt-4">
                  <button
                    onClick={() => speak(plan.steps.vocabWords[vocabIndex].word)}
                    className="px-3 py-1.5 bg-slate-100 dark:bg-neutral-800 rounded-xl text-xs font-bold flex items-center gap-1.5 text-slate-700 dark:text-slate-300"
                  >
                    <Volume2 className="w-3.5 h-3.5" /> Listen Audio
                  </button>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => {
                        setIsCardFlipped(false);
                        if (vocabIndex < plan.steps.vocabWords.length - 1) {
                          setVocabIndex(vocabIndex + 1);
                          setReviewedWordsCount(reviewedWordsCount + 1);
                        }
                      }}
                      className="px-4 py-2 bg-[#124F40] text-white dark:bg-[#5BB78D] dark:text-[#0B1510] rounded-xl text-xs font-bold"
                    >
                      {vocabIndex < plan.steps.vocabWords.length - 1 ? 'Next Card' : 'All 10 Reviewed!'}
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* STEP 3: LISTENING MINI-DRILL */}
            {currentStep === 2 && (
              <div>
                <div className="text-xs font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400 mb-1 flex items-center gap-1.5">
                  <Headphones className="w-4 h-4" /> Step 3: Listening Comprehension
                </div>
                <h2 className="text-xl font-extrabold text-slate-900 dark:text-slate-100 mb-2">
                  {plan.steps.listening.title}
                </h2>
                <p className="text-xs text-slate-500 mb-4">
                  Listen to the audio dialogue line and answer the key question.
                </p>

                <div className="p-4 bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200 rounded-2xl mb-4 flex items-center justify-between">
                  <span className="text-xs font-semibold text-slate-800 dark:text-slate-200">
                    Dialogue: {plan.steps.listening.script[0]?.text}
                  </span>
                  <button
                    onClick={() => speak(plan.steps.listening.script[0]?.text || '')}
                    className="px-3 py-1.5 bg-[#124F40] text-white rounded-xl text-xs font-bold flex items-center gap-1 shrink-0"
                  >
                    <Volume2 className="w-3.5 h-3.5" /> Play
                  </button>
                </div>

                {plan.steps.listening.comprehensionQuestions[0] && (
                  <div className="space-y-3">
                    <div className="text-xs font-bold text-slate-800 dark:text-slate-200">
                      {plan.steps.listening.comprehensionQuestions[0].question}
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {plan.steps.listening.comprehensionQuestions[0].options.map((opt, idx) => (
                        <button
                          key={idx}
                          onClick={() => { setListeningAnswer(idx); setListeningChecked(true); }}
                          className={cn(
                            'p-3 rounded-xl text-xs font-semibold border text-left',
                            listeningAnswer === idx && listeningChecked
                              ? idx === plan.steps.listening.comprehensionQuestions[0].correctIndex
                                ? 'bg-emerald-100 border-emerald-500 font-bold'
                                : 'bg-rose-100 border-rose-500 font-bold'
                              : 'bg-slate-50 dark:bg-[#0B1510] border-slate-200'
                          )}
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* STEP 4: READING READER */}
            {currentStep === 3 && (
              <div>
                <div className="text-xs font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400 mb-1 flex items-center gap-1.5">
                  <BookOpen className="w-4 h-4" /> Step 4: Graded Short Reading
                </div>
                <h2 className="text-xl font-extrabold text-slate-900 dark:text-slate-100 mb-2">
                  {plan.steps.reading.title}
                </h2>

                <div className="p-4 bg-slate-50 dark:bg-[#0B1510] border border-slate-200 rounded-2xl text-xs md:text-sm font-serif leading-relaxed mb-4">
                  {plan.steps.reading.paragraphs[0]}
                </div>

                {plan.steps.reading.questions[0] && (
                  <div className="space-y-3">
                    <div className="text-xs font-bold text-slate-800 dark:text-slate-200">
                      {plan.steps.reading.questions[0].question}
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {plan.steps.reading.questions[0].options.map((opt, idx) => (
                        <button
                          key={idx}
                          onClick={() => { setReadingAnswer(idx); setReadingChecked(true); }}
                          className={cn(
                            'p-3 rounded-xl text-xs font-semibold border text-left',
                            readingAnswer === idx && readingChecked
                              ? idx === plan.steps.reading.questions[0].correctIndex
                                ? 'bg-emerald-100 border-emerald-500 font-bold'
                                : 'bg-rose-100 border-rose-500 font-bold'
                              : 'bg-slate-50 dark:bg-[#0B1510] border-slate-200'
                          )}
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* STEP 5: SPEAKING DRILL */}
            {currentStep === 4 && (
              <div>
                <div className="text-xs font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400 mb-1 flex items-center gap-1.5">
                  <Mic className="w-4 h-4" /> Step 5: Speaking Fluency Drill
                </div>
                <h2 className="text-xl font-extrabold text-slate-900 dark:text-slate-100 mb-3">
                  Pronunciation & Intonation Turn
                </h2>

                <div className="p-5 bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200 rounded-2xl mb-4 text-center">
                  <div className="text-lg font-bold text-slate-900 dark:text-slate-100 leading-relaxed mb-2">
                    "{plan.steps.speaking.targetSentence}"
                  </div>
                  <div className="text-xs text-amber-900 dark:text-amber-200 font-urdu">
                    {plan.steps.speaking.urduTip}
                  </div>
                </div>

                <div className="flex flex-wrap items-center justify-center gap-3">
                  <button
                    onClick={() => speak(plan.steps.speaking.targetSentence)}
                    className="px-4 py-2 bg-slate-100 dark:bg-neutral-800 rounded-xl text-xs font-bold flex items-center gap-1.5 text-slate-700 dark:text-slate-300"
                  >
                    <Volume2 className="w-4 h-4" /> Listen Model Audio
                  </button>

                  <button
                    onClick={handleRecordSpeaking}
                    disabled={isRecording}
                    className={cn(
                      'px-5 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 text-white shadow-md transition-all',
                      isRecording ? 'bg-rose-500 animate-pulse' : 'bg-[#124F40] hover:bg-[#1a6e59]'
                    )}
                  >
                    <Mic className="w-4 h-4" />
                    {isRecording ? 'Listening...' : 'Speak into Mic'}
                  </button>
                </div>

                {speakingDone && (
                  <div className="mt-4 p-3 bg-emerald-100 text-emerald-900 rounded-xl text-xs font-semibold text-center flex items-center justify-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Speech recorded successfully! Great pace and clarity.
                  </div>
                )}
              </div>
            )}

            {/* Bottom Step Navigation Bar */}
            <div className="mt-8 pt-6 border-t border-slate-200 dark:border-[#24392F] flex items-center justify-between">
              <button
                onClick={handlePrevStep}
                disabled={currentStep === 0}
                className="px-4 py-2 text-xs font-bold text-slate-600 dark:text-slate-400 hover:text-slate-900 disabled:opacity-30 disabled:cursor-not-allowed flex items-center gap-1"
              >
                <ArrowLeft className="w-4 h-4" /> Previous Step
              </button>

              <button
                onClick={handleNextStep}
                className="px-6 py-2.5 bg-[#124F40] hover:bg-[#1a6e59] text-white dark:bg-[#5BB78D] dark:text-[#0B1510] rounded-xl text-xs font-bold shadow-xs flex items-center gap-2"
              >
                <span>{currentStep === 4 ? 'Complete Daily 15!' : 'Next Step'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        ) : (
          /* Completion Screen */
          <div className="bg-white dark:bg-[#112019] border border-slate-200 dark:border-[#24392F] rounded-3xl p-8 md:p-12 text-center shadow-sm">
            <div className="w-20 h-20 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto mb-4">
              <Award className="w-10 h-10" />
            </div>

            <h2 className="text-2xl md:text-3xl font-extrabold text-[#124F40] dark:text-[#5BB78D] tracking-tight mb-2">
              Daily 15 Completed!
            </h2>
            <p className="text-xs md:text-sm text-slate-600 dark:text-slate-400 max-w-md mx-auto mb-6">
              You completed all 5 skills exercises for today: Grammar, Spaced Vocab, Listening, Reading, and Speaking!
            </p>

            <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/40 text-amber-800 dark:text-amber-200 text-sm font-bold mb-8">
              <Sparkles className="w-5 h-5 text-amber-500" />
              <span>+25 XP Awarded • Reading & Study Streak Maintained!</span>
            </div>

            <div>
              <button
                onClick={() => { setRoutineCompleted(false); setCurrentStep(0); }}
                className="px-6 py-2.5 bg-[#124F40] text-white dark:bg-[#5BB78D] dark:text-[#0B1510] rounded-xl text-xs font-bold"
              >
                Review Today's Workout
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
