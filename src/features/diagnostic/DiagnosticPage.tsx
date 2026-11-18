import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  Compass,
  Headphones,
  BookOpen,
  PenTool,
  Mic,
  MicOff,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Clock,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  Volume2,
  Calendar,
  Layers,
  ChevronRight,
  RotateCcw,
} from 'lucide-react';
import {
  DIAGNOSTIC_READING_PASSAGE,
  DIAGNOSTIC_LISTENING_SECTION,
  DIAGNOSTIC_WRITING_TASK,
  DIAGNOSTIC_SPEAKING_QUESTIONS,
  evaluateDiagnostic,
} from './diagnosticContent';
import { generateStudyPlan } from '../plan/planGenerator';
import { shuffleMcqOptions, cleanOptionText } from '../../lib/mcqShuffle';
import { db } from '../../lib/db';
import { useAppStore } from '../../store/useAppStore';
import { formatBand } from '../../lib/utils';
import type { DiagnosticResult } from '../../types';

type DiagnosticStep = 'intro' | 'reading' | 'listening' | 'writing' | 'speaking' | 'results';

export const DiagnosticPage: React.FC = () => {
  const navigate = useNavigate();
  const { profile, updateProfile, addToast } = useAppStore();

  const [step, setStep] = useState<DiagnosticStep>('intro');
  const [readingAnswers, setReadingAnswers] = useState<Record<string, string>>({});
  const [diagnosticSeed] = useState<string>(() => {
    const cached = localStorage.getItem('zarii_diagnostic_seed');
    if (cached) return cached;
    const s = `diagnostic_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`;
    localStorage.setItem('zarii_diagnostic_seed', s);
    return s;
  });
  const [listeningAnswers, setListeningAnswers] = useState<Record<string, string>>({});
  const [writingText, setWritingText] = useState('');
  const [speakingTranscripts, setSpeakingTranscripts] = useState<string[]>(['', '', '']);
  const [currentSpeakingIdx, setCurrentSpeakingIdx] = useState(0);

  // Audio / Speech State
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const recognitionRef = useRef<any>(null);

  // Results State
  const [diagnosticResult, setDiagnosticResult] = useState<DiagnosticResult | null>(null);
  const [isGeneratingPlan, setIsGeneratingPlan] = useState(false);

  // Initialize SpeechRecognition if supported
  useEffect(() => {
    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = 'en-US';

      recognition.onresult = (event: any) => {
        let transcript = '';
        for (let i = 0; i < event.results.length; i++) {
          transcript += event.results[i][0].transcript + ' ';
        }
        setSpeakingTranscripts((prev) => {
          const next = [...prev];
          next[currentSpeakingIdx] = transcript.trim();
          return next;
        });
      };

      recognition.onerror = () => {
        setIsRecording(false);
      };

      recognition.onend = () => {
        setIsRecording(false);
      };

      recognitionRef.current = recognition;
    }
  }, [currentSpeakingIdx]);

  // Audio synthesis player for listening script
  const playListeningAudio = () => {
    if (!('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();

    if (isPlayingAudio) {
      setIsPlayingAudio(false);
      return;
    }

    setIsPlayingAudio(true);
    const turns = DIAGNOSTIC_LISTENING_SECTION.script;
    let turnIdx = 0;

    const playNextTurn = () => {
      if (turnIdx >= turns.length) {
        setIsPlayingAudio(false);
        return;
      }
      const turn = turns[turnIdx];
      const utterance = new SpeechSynthesisUtterance(turn.text);
      utterance.lang = 'en-GB';
      utterance.rate = 0.95;
      utterance.onend = () => {
        turnIdx += 1;
        setTimeout(playNextTurn, 600);
      };
      utterance.onerror = () => setIsPlayingAudio(false);
      window.speechSynthesis.speak(utterance);
    };

    playNextTurn();
  };

  const toggleRecording = () => {
    if (!recognitionRef.current) {
      addToast({
        type: 'warning',
        title: 'Microphone Unavailable',
        message: 'Speech recognition is not supported in this browser. You can type your answer below.',
      });
      return;
    }

    if (isRecording) {
      recognitionRef.current.stop();
      setIsRecording(false);
    } else {
      try {
        recognitionRef.current.start();
        setIsRecording(true);
      } catch (err) {
        console.error('Speech start error:', err);
      }
    }
  };

  // Submit and calculate final diagnostic results
  const finishDiagnostic = async () => {
    window.speechSynthesis.cancel();
    if (isRecording && recognitionRef.current) {
      recognitionRef.current.stop();
    }

    const result = evaluateDiagnostic(
      readingAnswers,
      listeningAnswers,
      writingText,
      speakingTranscripts
    );

    setDiagnosticResult(result);
    setStep('results');
    localStorage.removeItem('zarii_diagnostic_seed');

    // Save into Dexie database
    try {
      // 1. Record Reading Attempt
      const readingAttId = await db.attempts.add({
        testId: 'diag_reading_01',
        testType: 'academic',
        module: 'reading',
        title: 'Diagnostic Test: Reading',
        score: result.skills.reading.rawScore,
        totalQuestions: 10,
        bandEstimate: result.skills.reading.estimatedBand,
        timeSpentSeconds: 600,
        startedAt: new Date(Date.now() - 600000).toISOString(),
        completedAt: new Date().toISOString(),
        status: 'completed',
        notes: 'Official diagnostic baseline',
      });

      // Save question responses for analytics
      for (const r of result.readingResponses) {
        await db.responses.add({
          attemptId: readingAttId,
          module: 'reading',
          questionId: r.questionId,
          userAnswer: r.userAnswer,
          correctAnswer: r.correctAnswer,
          isCorrect: r.isCorrect,
        });
      }

      // 2. Record Listening Attempt
      const listeningAttId = await db.attempts.add({
        testId: 'diag_listening_01',
        testType: 'academic',
        module: 'listening',
        title: 'Diagnostic Test: Listening',
        score: result.skills.listening.rawScore,
        totalQuestions: 10,
        bandEstimate: result.skills.listening.estimatedBand,
        timeSpentSeconds: 480,
        startedAt: new Date(Date.now() - 480000).toISOString(),
        completedAt: new Date().toISOString(),
        status: 'completed',
        notes: 'Official diagnostic baseline',
      });

      for (const r of result.listeningResponses) {
        await db.responses.add({
          attemptId: listeningAttId,
          module: 'listening',
          questionId: r.questionId,
          userAnswer: r.userAnswer,
          correctAnswer: r.correctAnswer,
          isCorrect: r.isCorrect,
        });
      }

      // 3. Update User Profile
      if (profile?.id) {
        await updateProfile({
          diagnosticCompleted: true,
          diagnosticBand: result.overallBand,
        });
      }

      // Automatically generate personalized study plan based on diagnostic findings
      const newPlan = generateStudyPlan(
        profile?.targetBand || 7.5,
        profile?.examDate || new Date(Date.now() + 30 * 86400000).toISOString().split('T')[0],
        profile?.dailyStudyMinutes || 60,
        result.weaknesses
      );

      // Save plan in db
      await db.studyPlan.clear();
      for (const day of newPlan) {
        await db.studyPlan.add(day);
      }

      addToast({
        type: 'success',
        title: 'Diagnostic Complete!',
        message: `Your baseline score is Band ${formatBand(result.overallBand)}. Study plan updated.`,
      });
    } catch (err) {
      console.error('Failed to save diagnostic records:', err);
    }
  };

  const handleApplyStudyPlan = async () => {
    setIsGeneratingPlan(true);
    setTimeout(() => {
      navigate('/plan');
    }, 400);
  };

  // Word count helper for writing
  const writingWordCount = writingText.trim().split(/\s+/).filter(Boolean).length;

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      {/* Step 1: Intro */}
      {step === 'intro' && (
        <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 sm:p-10 border border-slate-200 dark:border-slate-700 shadow-sm space-y-6 text-center max-w-2xl mx-auto">
          <div className="w-16 h-16 rounded-2xl bg-teal-100 dark:bg-teal-900/50 text-teal-600 dark:text-teal-400 flex items-center justify-center mx-auto">
            <Compass className="w-8 h-8 animate-spin-slow" />
          </div>

          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-teal-600 dark:text-teal-400">
              Diagnostic Benchmark
            </span>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white mt-1">
              IELTS Diagnostic Assessment
            </h1>
            <p className="text-sm text-slate-600 dark:text-slate-300 mt-2 leading-relaxed">
              Pinpoint your exact baseline across all 4 IELTS skills in under 25 minutes. We'll identify
              your specific question-type weaknesses and automatically configure your personalized study roadmap.
            </p>
          </div>

          {/* Section Overview Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-left">
            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-700">
              <div className="flex items-center gap-2 text-teal-600 dark:text-teal-400 font-bold text-xs uppercase mb-1">
                <BookOpen className="w-4 h-4" /> Reading
              </div>
              <div className="text-sm font-bold text-slate-900 dark:text-white">10 Questions</div>
              <p className="text-[11px] text-slate-500">True/False, MC, Headings</p>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-700">
              <div className="flex items-center gap-2 text-sky-600 dark:text-sky-400 font-bold text-xs uppercase mb-1">
                <Headphones className="w-4 h-4" /> Listening
              </div>
              <div className="text-sm font-bold text-slate-900 dark:text-white">10 Questions</div>
              <p className="text-[11px] text-slate-500">Forms & Multiple Choice</p>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-700">
              <div className="flex items-center gap-2 text-amber-600 dark:text-amber-400 font-bold text-xs uppercase mb-1">
                <PenTool className="w-4 h-4" /> Writing
              </div>
              <div className="text-sm font-bold text-slate-900 dark:text-white">1 Short Essay</div>
              <p className="text-[11px] text-slate-500">120+ words argument</p>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-700">
              <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-bold text-xs uppercase mb-1">
                <Mic className="w-4 h-4" /> Speaking
              </div>
              <div className="text-sm font-bold text-slate-900 dark:text-white">3 Prompts</div>
              <p className="text-[11px] text-slate-500">Fluency & Vocabulary</p>
            </div>
          </div>

          <div className="pt-4">
            <button
              onClick={() => setStep('reading')}
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl font-bold text-white bg-teal-600 hover:bg-teal-700 transition-all shadow-md inline-flex items-center justify-center gap-2 text-sm"
            >
              <span>Begin Section 1: Reading</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Step 2: Reading Section */}
      {step === 'reading' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-700">
            <div className="flex items-center gap-2">
              <span className="p-1.5 rounded-lg bg-teal-100 dark:bg-teal-900/50 text-teal-700 dark:text-teal-400 font-bold text-xs">
                Section 1 of 4
              </span>
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                Reading Diagnostic (10 Questions)
              </h2>
            </div>
            <span className="text-xs font-mono font-semibold text-slate-500">
              {Object.keys(readingAnswers).length} / 10 Answered
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Passage Panel */}
            <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-200 dark:border-slate-700 h-[600px] overflow-y-auto space-y-4">
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                {DIAGNOSTIC_READING_PASSAGE.title}
              </h3>
              <div className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed space-y-4 font-serif">
                {DIAGNOSTIC_READING_PASSAGE.text.split('\n\n').map((para, i) => (
                  <p key={i}>{para}</p>
                ))}
              </div>
            </div>

            {/* Questions Panel */}
            <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-200 dark:border-slate-700 h-[600px] overflow-y-auto space-y-6">
              {DIAGNOSTIC_READING_PASSAGE.questions.map((q) => (
                <div key={q.id} className="p-4 rounded-xl bg-slate-50 dark:bg-slate-700/40 border border-slate-200 dark:border-slate-700 space-y-3">
                  <div className="flex items-start gap-2">
                    <span className="w-6 h-6 rounded-md bg-teal-600 text-white font-mono text-xs font-bold flex items-center justify-center shrink-0">
                      {q.questionNumber}
                    </span>
                    <p className="text-sm font-semibold text-slate-900 dark:text-white">
                      {q.prompt}
                    </p>
                  </div>

                  {/* Question Options / Inputs */}
                  {q.type === 'true_false_not_given' && (
                    <div className="grid grid-cols-3 gap-2">
                      {['TRUE', 'FALSE', 'NOT GIVEN'].map((opt) => (
                        <button
                          key={opt}
                          type="button"
                          onClick={() => setReadingAnswers((prev) => ({ ...prev, [q.id]: opt }))}
                          className={`py-2 px-3 rounded-lg text-xs font-bold border transition-all ${
                            readingAnswers[q.id] === opt
                              ? 'bg-teal-600 text-white border-teal-600'
                              : 'bg-white dark:bg-slate-800 border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 hover:border-teal-500'
                          }`}
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                  )}

                  {q.options && (
                    <div className="space-y-1.5">
                      {(() => {
                        const isMatchInfo = q.type === 'matching_information';
                        const optionsToRender = isMatchInfo
                          ? q.options.map((opt, idx) => ({ id: opt, text: opt, originalIndex: idx }))
                          : shuffleMcqOptions(q.options, `${diagnosticSeed}_${q.id}`);

                        return optionsToRender.map((optItem: any, idx: number) => {
                          const displayLetter = String.fromCharCode(65 + idx);
                          const isSelected =
                            readingAnswers[q.id] === optItem.text ||
                            readingAnswers[q.id] === displayLetter;

                          return (
                            <button
                              key={optItem.id || idx}
                              type="button"
                              onClick={() =>
                                setReadingAnswers((prev) => ({
                                  ...prev,
                                  [q.id]: optItem.text,
                                }))
                              }
                              className={`w-full text-left p-2.5 rounded-lg text-xs font-medium border transition-all ${
                                isSelected
                                  ? 'bg-teal-50 dark:bg-teal-900/40 border-teal-500 text-teal-900 dark:text-teal-200 font-bold'
                                  : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-50'
                              }`}
                            >
                              {!isMatchInfo && (
                                <span className="font-mono font-bold text-slate-400 mr-2">
                                  {displayLetter}.
                                </span>
                              )}
                              <span>{optItem.text}</span>
                            </button>
                          );
                        });
                      })()}
                    </div>
                  )}

                  {q.type === 'sentence_completion' && (
                    <input
                      type="text"
                      placeholder="Type your answer (ONE WORD ONLY)..."
                      value={readingAnswers[q.id] || ''}
                      onChange={(e) =>
                        setReadingAnswers((prev) => ({ ...prev, [q.id]: e.target.value }))
                      }
                      className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-teal-500 focus:outline-none"
                    />
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-between items-center pt-4">
            <button
              onClick={() => setStep('intro')}
              className="px-4 py-2 text-xs font-semibold text-slate-500 hover:text-slate-800 dark:hover:text-white"
            >
              Back
            </button>
            <button
              onClick={() => setStep('listening')}
              className="px-6 py-2.5 rounded-xl font-bold text-white bg-teal-600 hover:bg-teal-700 transition-all text-sm inline-flex items-center gap-2 shadow-sm"
            >
              <span>Next: Section 2 (Listening)</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Step 3: Listening Section */}
      {step === 'listening' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-700">
            <div className="flex items-center gap-2">
              <span className="p-1.5 rounded-lg bg-sky-100 dark:bg-sky-900/50 text-sky-700 dark:text-sky-400 font-bold text-xs">
                Section 2 of 4
              </span>
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                Listening Diagnostic (10 Questions)
              </h2>
            </div>
            <span className="text-xs font-mono font-semibold text-slate-500">
              {Object.keys(listeningAnswers).length} / 10 Answered
            </span>
          </div>

          {/* Audio Player Control Bar */}
          <div className="bg-gradient-to-r from-brand-800 to-brand-600 text-white p-5 rounded-2xl shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="font-bold text-base flex items-center gap-2">
                <Headphones className="w-5 h-5" />
                {DIAGNOSTIC_LISTENING_SECTION.title}
              </h3>
              <p className="text-xs text-white/80 mt-1 max-w-xl">
                {DIAGNOSTIC_LISTENING_SECTION.context}
              </p>
            </div>

            <button
              type="button"
              onClick={playListeningAudio}
              className="px-5 py-2.5 rounded-xl font-bold bg-white text-sky-800 hover:bg-sky-50 transition-all text-xs inline-flex items-center gap-2 shrink-0 self-start sm:self-auto shadow-md"
            >
              <Volume2 className={`w-4 h-4 ${isPlayingAudio ? 'animate-pulse' : ''}`} />
              <span>{isPlayingAudio ? 'Stop Audio' : 'Play British Audio'}</span>
            </button>
          </div>

          {/* Questions Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {DIAGNOSTIC_LISTENING_SECTION.questions.map((q) => (
              <div key={q.id} className="p-4 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 space-y-3 shadow-xs">
                <div className="flex items-start gap-2">
                  <span className="w-6 h-6 rounded-md bg-sky-600 text-white font-mono text-xs font-bold flex items-center justify-center shrink-0">
                    {q.questionNumber}
                  </span>
                  <p className="text-xs sm:text-sm font-semibold text-slate-900 dark:text-white">
                    {q.prompt}
                  </p>
                </div>

                {q.options ? (
                  <div className="space-y-1">
                    {(() => {
                      const shuffled = shuffleMcqOptions(q.options, `${diagnosticSeed}_${q.id}`);
                      return shuffled.map((optItem, idx) => {
                        const displayLetter = String.fromCharCode(65 + idx);
                        const isSelected =
                          listeningAnswers[q.id] === optItem.text ||
                          listeningAnswers[q.id] === displayLetter;

                        return (
                          <button
                            key={optItem.id || idx}
                            type="button"
                            onClick={() =>
                              setListeningAnswers((p) => ({ ...p, [q.id]: optItem.text }))
                            }
                            className={`w-full text-left p-2 rounded-lg text-xs font-medium border transition-all ${
                              isSelected
                                ? 'bg-sky-50 dark:bg-sky-950/60 border-sky-500 text-sky-900 dark:text-sky-200 font-bold'
                                : 'border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-50'
                            }`}
                          >
                            <span className="font-mono font-bold text-slate-400 mr-2">
                              {displayLetter}.
                            </span>
                            <span>{optItem.text}</span>
                          </button>
                        );
                      });
                    })()}
                  </div>
                ) : (
                  <input
                    type="text"
                    placeholder="Type missing word / number..."
                    value={listeningAnswers[q.id] || ''}
                    onChange={(e) =>
                      setListeningAnswers((prev) => ({ ...prev, [q.id]: e.target.value }))
                    }
                    className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-sky-500 focus:outline-none"
                  />
                )}
              </div>
            ))}
          </div>

          <div className="flex justify-between items-center pt-4">
            <button
              onClick={() => {
                window.speechSynthesis.cancel();
                setStep('reading');
              }}
              className="px-4 py-2 text-xs font-semibold text-slate-500 hover:text-slate-800 dark:hover:text-white"
            >
              Back to Reading
            </button>
            <button
              onClick={() => {
                window.speechSynthesis.cancel();
                setStep('writing');
              }}
              className="px-6 py-2.5 rounded-xl font-bold text-white bg-sky-600 hover:bg-sky-700 transition-all text-sm inline-flex items-center gap-2 shadow-sm"
            >
              <span>Next: Section 3 (Writing)</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Step 4: Writing Section */}
      {step === 'writing' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-700">
            <div className="flex items-center gap-2">
              <span className="p-1.5 rounded-lg bg-amber-100 dark:bg-amber-900/50 text-amber-700 dark:text-amber-400 font-bold text-xs">
                Section 3 of 4
              </span>
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                Writing Diagnostic (Short Response)
              </h2>
            </div>
            <span
              className={`text-xs font-mono font-bold px-2.5 py-1 rounded-full ${
                writingWordCount >= 120
                  ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300'
                  : 'bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300'
              }`}
            >
              {writingWordCount} / 120 words
            </span>
          </div>

          <div className="p-5 rounded-2xl bg-amber-50/60 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 space-y-2">
            <h3 className="font-bold text-sm text-amber-900 dark:text-amber-200">
              {DIAGNOSTIC_WRITING_TASK.title}
            </h3>
            <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">
              "{DIAGNOSTIC_WRITING_TASK.prompt}"
            </p>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              {DIAGNOSTIC_WRITING_TASK.instructions}
            </p>
          </div>

          <div>
            <textarea
              rows={10}
              value={writingText}
              onChange={(e) => setWritingText(e.target.value)}
              placeholder="Write your diagnostic response here. State your thesis, provide supporting arguments, and write a concise conclusion..."
              className="w-full p-4 rounded-2xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-amber-500 focus:outline-none leading-relaxed"
            />
          </div>

          <div className="flex justify-between items-center pt-4">
            <button
              onClick={() => setStep('listening')}
              className="px-4 py-2 text-xs font-semibold text-slate-500 hover:text-slate-800 dark:hover:text-white"
            >
              Back to Listening
            </button>
            <button
              onClick={() => setStep('speaking')}
              className="px-6 py-2.5 rounded-xl font-bold text-white bg-amber-600 hover:bg-amber-700 transition-all text-sm inline-flex items-center gap-2 shadow-sm"
            >
              <span>Next: Section 4 (Speaking)</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Step 5: Speaking Section */}
      {step === 'speaking' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-700">
            <div className="flex items-center gap-2">
              <span className="p-1.5 rounded-lg bg-emerald-100 dark:bg-emerald-900/50 text-emerald-700 dark:text-emerald-400 font-bold text-xs">
                Section 4 of 4
              </span>
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                Speaking Diagnostic (Question {currentSpeakingIdx + 1} of 3)
              </h2>
            </div>
          </div>

          {/* Current Question Card */}
          <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-700 shadow-sm space-y-6 text-center max-w-2xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 text-xs font-bold">
              Part {DIAGNOSTIC_SPEAKING_QUESTIONS[currentSpeakingIdx].part} Speaking
            </div>

            <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white leading-relaxed">
              "{DIAGNOSTIC_SPEAKING_QUESTIONS[currentSpeakingIdx].prompt}"
            </h3>

            {/* Mic Record Toggle */}
            <div className="flex flex-col items-center gap-3">
              <button
                type="button"
                onClick={toggleRecording}
                className={`w-16 h-16 rounded-full flex items-center justify-center transition-all shadow-md ${
                  isRecording
                    ? 'bg-rose-600 text-white animate-pulse'
                    : 'bg-emerald-600 hover:bg-emerald-700 text-white'
                }`}
              >
                {isRecording ? <MicOff className="w-7 h-7" /> : <Mic className="w-7 h-7" />}
              </button>
              <span className="text-xs text-slate-500 font-medium">
                {isRecording ? 'Listening... click to pause' : 'Click to start speaking (or type below)'}
              </span>
            </div>

            {/* Live Transcript / Fallback text area */}
            <div className="text-left space-y-2">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
                Answer Transcript / Text:
              </label>
              <textarea
                rows={3}
                value={speakingTranscripts[currentSpeakingIdx] || ''}
                onChange={(e) => {
                  const val = e.target.value;
                  setSpeakingTranscripts((prev) => {
                    const next = [...prev];
                    next[currentSpeakingIdx] = val;
                    return next;
                  });
                }}
                placeholder="Spoken words will appear here live, or type your answer..."
                className="w-full p-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              />
            </div>

            {/* Speaking sub-navigation */}
            <div className="flex justify-between items-center pt-2">
              <button
                disabled={currentSpeakingIdx === 0}
                onClick={() => setCurrentSpeakingIdx((i) => i - 1)}
                className="px-4 py-2 text-xs font-semibold text-slate-500 hover:text-slate-800 disabled:opacity-30"
              >
                Previous Question
              </button>

              {currentSpeakingIdx < 2 ? (
                <button
                  onClick={() => setCurrentSpeakingIdx((i) => i + 1)}
                  className="px-5 py-2 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white transition-all shadow-xs"
                >
                  Next Question →
                </button>
              ) : (
                <button
                  onClick={finishDiagnostic}
                  className="px-6 py-2.5 rounded-xl text-xs font-bold bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-700 hover:to-emerald-700 text-white transition-all shadow-md inline-flex items-center gap-1.5"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Submit Diagnostic Test</span>
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Step 6: Final Results & Weakness Report */}
      {step === 'results' && diagnosticResult && (
        <div className="space-y-8 animate-fadeIn">
          {/* Header Banner */}
          <div className="bg-gradient-to-r from-teal-700 via-emerald-600 to-cyan-700 text-white p-6 sm:p-8 rounded-3xl shadow-lg relative overflow-hidden">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-sm text-xs font-semibold mb-2">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  Diagnostic Baseline Generated
                </div>
                <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                  Your IELTS Baseline Score
                </h1>
                <p className="text-white/90 text-sm mt-1 max-w-xl">
                  Benchmark completed across Reading, Listening, Writing, and Speaking. Your weakness profile
                  has been mapped to create your day-by-day study roadmap.
                </p>
              </div>

              {/* Overall Band Pill */}
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-5 text-center border border-white/20 shrink-0 self-start sm:self-auto">
                <span className="block text-xs uppercase tracking-wider text-white/80 font-bold mb-1">
                  Overall Estimated Band
                </span>
                <span className="text-4xl sm:text-5xl font-black font-mono">
                  {formatBand(diagnosticResult.overallBand)}
                </span>
                <span className="block text-xs text-white/80 mt-1">
                  Target: Band {formatBand(profile?.targetBand || 7.5)}
                </span>
              </div>
            </div>
          </div>

          {/* 4 Skill Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs">
              <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 font-bold uppercase mb-2">
                <span className="flex items-center gap-1.5 text-teal-600 dark:text-teal-400">
                  <BookOpen className="w-4 h-4" /> Reading
                </span>
                <span>{diagnosticResult.skills.reading.accuracy}%</span>
              </div>
              <div className="text-3xl font-black text-slate-900 dark:text-white font-mono">
                Band {formatBand(diagnosticResult.skills.reading.estimatedBand)}
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                {diagnosticResult.skills.reading.rawScore} / 10 raw score
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs">
              <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 font-bold uppercase mb-2">
                <span className="flex items-center gap-1.5 text-sky-600 dark:text-sky-400">
                  <Headphones className="w-4 h-4" /> Listening
                </span>
                <span>{diagnosticResult.skills.listening.accuracy}%</span>
              </div>
              <div className="text-3xl font-black text-slate-900 dark:text-white font-mono">
                Band {formatBand(diagnosticResult.skills.listening.estimatedBand)}
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                {diagnosticResult.skills.listening.rawScore} / 10 raw score
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs">
              <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 font-bold uppercase mb-2">
                <span className="flex items-center gap-1.5 text-amber-600 dark:text-amber-400">
                  <PenTool className="w-4 h-4" /> Writing
                </span>
                <span>Task 2</span>
              </div>
              <div className="text-3xl font-black text-slate-900 dark:text-white font-mono">
                Band {formatBand(diagnosticResult.skills.writing.estimatedBand)}
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                {diagnosticResult.writingSubmission?.wordCount || 0} words submitted
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs">
              <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 font-bold uppercase mb-2">
                <span className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400">
                  <Mic className="w-4 h-4" /> Speaking
                </span>
                <span>Part 1-3</span>
              </div>
              <div className="text-3xl font-black text-slate-900 dark:text-white font-mono">
                Band {formatBand(diagnosticResult.skills.speaking.estimatedBand)}
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Fluency & Vocabulary</p>
            </div>
          </div>

          {/* Question-Type Weakness Breakdown */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-amber-500" />
                  Weakness Report by Question Type
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  Prioritized by accuracy to guide targeted daily practice.
                </p>
              </div>
            </div>

            <div className="divide-y divide-slate-100 dark:divide-slate-700/60">
              {diagnosticResult.weaknesses.map((item, idx) => (
                <div key={idx} className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-sm text-slate-900 dark:text-white">
                        {item.questionTypeLabel}
                      </span>
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider ${
                          item.severity === 'critical'
                            ? 'bg-rose-100 text-rose-800 dark:bg-rose-950/70 dark:text-rose-300'
                            : item.severity === 'moderate'
                            ? 'bg-amber-100 text-amber-800 dark:bg-amber-950/70 dark:text-amber-300'
                            : 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/70 dark:text-emerald-300'
                        }`}
                      >
                        {item.severity === 'critical'
                          ? 'Critical Revision'
                          : item.severity === 'moderate'
                          ? 'Moderate Focus'
                          : 'Solid'}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      {item.advice}
                    </p>
                  </div>

                  <div className="flex items-center gap-3 shrink-0">
                    <span className="text-xs font-mono font-bold text-slate-600 dark:text-slate-300">
                      {item.correct} / {item.total} ({item.accuracy}%)
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Action CTA */}
          <div className="flex flex-col sm:flex-row items-center justify-end gap-3 pt-2">
            <Link
              to="/dashboard"
              className="px-5 py-2.5 rounded-xl text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
            >
              View Analytics Dashboard
            </Link>
            <button
              onClick={handleApplyStudyPlan}
              disabled={isGeneratingPlan}
              className="px-6 py-3 rounded-xl font-bold text-white bg-teal-600 hover:bg-teal-700 transition-all shadow-md text-sm inline-flex items-center gap-2"
            >
              <Calendar className="w-4 h-4" />
              <span>{isGeneratingPlan ? 'Opening Plan...' : 'View Personalized Study Plan →'}</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
