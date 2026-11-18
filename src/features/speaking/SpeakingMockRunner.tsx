import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  Mic,
  MicOff,
  Volume2,
  Square,
  Play,
  RotateCcw,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  Clock,
  FileEdit,
  Loader2,
  HelpCircle,
  Maximize2,
  Minimize2,
  Sliders,
  Check,
} from 'lucide-react';
import {
  getRandomPart1Topic,
  getRandomPart2CueCard,
} from './speakingContent';
import {
  speakExaminerText,
  stopExaminerSpeech,
  createSpeechRecognizer,
  startAudioRecording,
  isSpeechRecognitionSupported,
  isSpeechSynthesisSupported,
} from './speechUtils';
import { evaluateSpeakingSubmission } from './speakingAiEvaluator';
import { db } from '../../lib/db';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { recordDailyActivity, awardXp, recordWeeklyChallengeProgress } from '../habits/habitEngine';
import { cn } from '../../lib/utils';
import type {
  SpeakingPart1Topic,
  SpeakingPart2CueCard,
  SpeakingSession,
} from '../../types';
import { ExamTestSetupModal } from '../../components/exam';
import { useAppStore } from '../../store/useAppStore';

export function SpeakingMockRunner() {
  const navigate = useNavigate();
  const { addToast } = useAppStore();

  // Test content setup
  const [part1Topic] = useState<SpeakingPart1Topic>(() => getRandomPart1Topic());
  const [part2Card] = useState<SpeakingPart2CueCard>(() => getRandomPart2CueCard());

  // Stages: 'intro' | 'part1' | 'part2_prep' | 'part2_speak' | 'part3' | 'evaluating'
  const [stage, setStage] = useState<'intro' | 'part1' | 'part2_prep' | 'part2_speak' | 'part3' | 'evaluating'>('intro');

  // Question navigation within parts
  const [part1QIdx, setPart1QIdx] = useState(0);
  const [part3QIdx, setPart3QIdx] = useState(0);

  // Speech Recognition & Recording states
  const [isRecording, setIsRecording] = useState(false);
  const [interimText, setInterimText] = useState('');
  const [currentAnswerText, setCurrentAnswerText] = useState('');
  const [allAnswersTranscript, setAllAnswersTranscript] = useState<string[]>([]);
  const [isExaminerSpeaking, setIsExaminerSpeaking] = useState(false);
  const [prepNotes, setPrepNotes] = useState('');
  const [isTypingFallback, setIsTypingFallback] = useState(!isSpeechRecognitionSupported());
  const [isSetupModalOpen, setIsSetupModalOpen] = useState(false);

  // Timers
  const [prepTimeRemaining, setPrepTimeRemaining] = useState(60);
  const [speakTimeRemaining, setSpeakTimeRemaining] = useState(120);
  const [totalSecondsElapsed, setTotalSecondsElapsed] = useState(0);

  const recognizerRef = useRef<any>(null);
  const audioRecorderRef = useRef<any>(null);
  const audioBlobRef = useRef<Blob | null>(null);

  // Global elapsed timer
  useEffect(() => {
    if (stage === 'intro' || stage === 'evaluating') return;
    const interval = setInterval(() => {
      setTotalSecondsElapsed((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [stage]);

  // Clean up speech on unmount
  useEffect(() => {
    return () => {
      stopExaminerSpeech();
      if (recognizerRef.current) recognizerRef.current.stop();
      if (audioRecorderRef.current) audioRecorderRef.current.stop().catch(() => {});
    };
  }, []);

  // Part 2 Prep Countdown (60s)
  useEffect(() => {
    if (stage !== 'part2_prep') return;
    if (prepTimeRemaining <= 0) {
      handleStartPart2Speaking();
      return;
    }
    const timer = setInterval(() => {
      setPrepTimeRemaining((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [stage, prepTimeRemaining]);

  // Part 2 Speaking Countdown (120s)
  useEffect(() => {
    if (stage !== 'part2_speak') return;
    if (speakTimeRemaining <= 0) {
      handleCompletePart2Speaking();
      return;
    }
    const timer = setInterval(() => {
      setSpeakTimeRemaining((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [stage, speakTimeRemaining]);

  const speakQuestion = (text: string) => {
    setIsExaminerSpeaking(true);
    speakExaminerText(text, () => {
      setIsExaminerSpeaking(false);
      // Auto-start recording after examiner finishes speaking
      startListeningAndRecording();
    });
  };

  const startListeningAndRecording = async () => {
    if (isTypingFallback) {
      setIsRecording(true);
      return;
    }

    try {
      const recorder = await startAudioRecording();
      audioRecorderRef.current = recorder;

      const recognizer = createSpeechRecognizer({
        onInterim: (text) => setInterimText(text),
        onFinal: (text) => {
          setCurrentAnswerText((prev) => (prev ? `${prev} ${text}` : text));
          setInterimText('');
        },
        onError: (err) => {
          console.warn('Recognition error:', err);
          if (err === 'not-allowed') {
            setIsTypingFallback(true);
          }
        },
        onEnd: () => {
          setIsRecording(false);
        },
      });

      if (recognizer) {
        recognizerRef.current = recognizer;
        recognizer.start();
        setIsRecording(true);
      }
    } catch (err) {
      console.warn('Microphone permission error:', err);
      setIsTypingFallback(true);
      setIsRecording(true);
    }
  };

  const stopListeningAndRecording = async () => {
    if (recognizerRef.current) {
      try {
        recognizerRef.current.stop();
      } catch (e) {}
    }
    if (audioRecorderRef.current) {
      try {
        const { blob } = await audioRecorderRef.current.stop();
        audioBlobRef.current = blob;
      } catch (err) {}
    }
    setIsRecording(false);
  };

  // Start the Full Mock
  const handleStartExam = () => {
    setStage('part1');
    const firstQ = part1Topic.questions[0].text;
    speakQuestion(`Welcome to the IELTS Speaking Test. In Part 1, I am going to ask you some questions about yourself. Let's talk about ${part1Topic.topic}. ${firstQ}`);
  };

  // Next Part 1 Question
  const handleNextPart1 = async () => {
    await stopListeningAndRecording();
    const finalAnswer = currentAnswerText + (interimText ? ' ' + interimText : '');
    if (finalAnswer.trim()) {
      setAllAnswersTranscript((prev) => [...prev, finalAnswer.trim()]);
    }
    setCurrentAnswerText('');
    setInterimText('');

    if (part1QIdx + 1 < Math.min(4, part1Topic.questions.length)) {
      const nextIdx = part1QIdx + 1;
      setPart1QIdx(nextIdx);
      speakQuestion(part1Topic.questions[nextIdx].text);
    } else {
      // Transition to Part 2
      setStage('part2_prep');
      speakQuestion(
        `That is the end of Part 1. Now for Part 2, I will give you a cue card with a topic. You will have one minute to prepare and make notes, after which you will speak for two minutes.`
      );
    }
  };

  const handleStartPart2Speaking = async () => {
    setStage('part2_speak');
    speakQuestion(`Your one minute preparation time is up. Please begin speaking now.`);
  };

  const handleCompletePart2Speaking = async () => {
    await stopListeningAndRecording();
    const finalAnswer = currentAnswerText + (interimText ? ' ' + interimText : '');
    if (finalAnswer.trim()) {
      setAllAnswersTranscript((prev) => [...prev, finalAnswer.trim()]);
    }
    setCurrentAnswerText('');
    setInterimText('');

    // Transition to Part 3
    setStage('part3');
    const firstPart3Q = part2Card.part3Questions[0].question;
    speakQuestion(`Thank you. We have been discussing ${part2Card.topic}. Now in Part 3, I would like to ask you some more general questions related to this. ${firstPart3Q}`);
  };

  // Next Part 3 Question
  const handleNextPart3 = async () => {
    await stopListeningAndRecording();
    const finalAnswer = currentAnswerText + (interimText ? ' ' + interimText : '');
    if (finalAnswer.trim()) {
      setAllAnswersTranscript((prev) => [...prev, finalAnswer.trim()]);
    }
    setCurrentAnswerText('');
    setInterimText('');

    if (part3QIdx + 1 < part2Card.part3Questions.length) {
      const nextIdx = part3QIdx + 1;
      setPart3QIdx(nextIdx);
      speakQuestion(part2Card.part3Questions[nextIdx].question);
    } else {
      handleFinishAndEvaluate();
    }
  };

  const handleFinishAndEvaluate = async () => {
    await stopListeningAndRecording();
    setStage('evaluating');
    speakExaminerText('That concludes your IELTS Speaking test. Please wait while your performance is evaluated.');

    const fullTranscript = allAnswersTranscript.join('\n\n');

    try {
      const feedback = await evaluateSpeakingSubmission(
        fullTranscript,
        totalSecondsElapsed,
        `${part1Topic.topic} & ${part2Card.topic}`,
        'full'
      );

      const session: SpeakingSession = {
        mode: 'mock',
        part: 'full',
        topicTitle: `Full Mock: ${part1Topic.topic} / ${part2Card.topic}`,
        durationSeconds: totalSecondsElapsed,
        transcript: fullTranscript,
        bandEstimate: feedback.overallBand,
        recordedAt: new Date().toISOString(),
        hasAudioRecording: !!audioBlobRef.current,
        feedback,
      };

      const newId = await db.speakingSessions.add(session);

      // Record daily activity, XP, and weekly sprint progress
      const minsSpent = Math.max(1, Math.round(totalSecondsElapsed / 60));
      recordDailyActivity(minsSpent);
      const earnedXp = Math.round(75 + (feedback.overallBand || 6) * 10);
      awardXp(earnedXp);
      recordWeeklyChallengeProgress('speaking', 1);

      addToast({
        type: 'success',
        title: 'Speaking Mock Complete!',
        message: `Your interview achieved Band ${feedback.overallBand?.toFixed(1) || '6.5'}. Fluency and pronunciation breakdown ready.`,
      });

      navigate(`/practice/speaking/results/${newId}`);
    } catch (err) {
      console.error('Speaking evaluation failed:', err);
      addToast({
        type: 'error',
        title: 'Evaluation Note',
        message: 'Could not finalize audio transcript. Please check your microphone permissions and try recording again.',
      });
      navigate('/practice/speaking');
    }
  };

  // Current question text helper
  const getCurrentQuestionText = () => {
    if (stage === 'part1') return part1Topic.questions[part1QIdx]?.text || '';
    if (stage === 'part2_prep' || stage === 'part2_speak') return part2Card.topic;
    if (stage === 'part3') return part2Card.part3Questions[part3QIdx]?.question || '';
    return '';
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-6 space-y-6 min-h-[calc(100vh-5rem)] flex flex-col justify-between">
      {/* 1. Header with Clear Part Stepper Indicators */}
      <div className="space-y-4">
        <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
          <div className="flex items-center gap-3">
            <Link
              to="/practice/speaking"
              className="p-1.5 rounded-lg text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <div>
              <span className="text-2xs font-bold uppercase tracking-wider text-teal-600 dark:text-teal-400">
                Official Computer-Delivered IELTS
              </span>
              <h1 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
                Speaking Mock Test Simulator
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsSetupModalOpen(true)}
              className="p-1.5 px-2.5 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-xs font-medium text-slate-700 dark:text-slate-300 inline-flex items-center gap-1.5"
            >
              <Sliders className="w-3.5 h-3.5" />
              <span>Mic Setup</span>
            </button>

            {stage !== 'intro' && stage !== 'evaluating' && (
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#124F40] text-white font-mono text-xs font-bold border border-[#17634F]">
                <Clock className="w-3.5 h-3.5 text-brand-300" />
                <span>
                  {Math.floor(totalSecondsElapsed / 60)}:
                  {(totalSecondsElapsed % 60).toString().padStart(2, '0')}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Part Stepper Progress Bar */}
        {stage !== 'intro' && stage !== 'evaluating' && (
          <div className="grid grid-cols-3 gap-2">
            <div
              className={cn(
                'p-2.5 rounded-xl border text-center transition-all',
                stage === 'part1'
                  ? 'bg-brand-50 dark:bg-brand-950/60 border-brand-800 text-brand-950 dark:text-brand-100 font-bold'
                  : 'bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-400'
              )}
            >
              <span className="text-2xs uppercase block">Part 1</span>
              <span className="text-xs truncate">Interview (Q{part1QIdx + 1}/4)</span>
            </div>

            <div
              className={cn(
                'p-2.5 rounded-xl border text-center transition-all',
                stage === 'part2_prep' || stage === 'part2_speak'
                  ? 'bg-brand-50 dark:bg-brand-950/60 border-brand-800 text-brand-950 dark:text-brand-100 font-bold'
                  : 'bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-400'
              )}
            >
              <span className="text-2xs uppercase block">Part 2</span>
              <span className="text-xs truncate">
                {stage === 'part2_prep' ? '1m Prep Notes' : '2m Long Turn'}
              </span>
            </div>

            <div
              className={cn(
                'p-2.5 rounded-xl border text-center transition-all',
                stage === 'part3'
                  ? 'bg-brand-50 dark:bg-brand-950/60 border-brand-800 text-brand-950 dark:text-brand-100 font-bold'
                  : 'bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-400'
              )}
            >
              <span className="text-2xs uppercase block">Part 3</span>
              <span className="text-xs truncate">Discussion (Q{part3QIdx + 1}/3)</span>
            </div>
          </div>
        )}
      </div>

      {/* Stage 0: Intro & Equipment Setup */}
      {stage === 'intro' && (
        <Card className="p-6 sm:p-8 space-y-6">
          <div className="space-y-2">
            <h2 className="text-xl font-black text-slate-900 dark:text-white">
              Authentic Computer-Delivered IELTS Speaking Test
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              In this full simulation, an examiner voice reads the authentic prompts aloud via speech synthesis, and your responses are captured via microphone with real-time speech-to-text recognition and local audio recording.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-1">
              <span className="font-bold text-teal-600 dark:text-teal-400">Part 1 (4–5 mins)</span>
              <p className="text-slate-600 dark:text-slate-300">
                Familiar topics like hometown, work, hobbies, and daily routines.
              </p>
            </div>
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-1">
              <span className="font-bold text-teal-600 dark:text-teal-400">Part 2 (3–4 mins)</span>
              <p className="text-slate-600 dark:text-slate-300">
                1 minute prep with digital notepad, followed by a 2-minute talk.
              </p>
            </div>
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-1">
              <span className="font-bold text-teal-600 dark:text-teal-400">Part 3 (4–5 mins)</span>
              <p className="text-slate-600 dark:text-slate-300">
                Abstract analysis and broader questions linked to your Part 2 topic.
              </p>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsSetupModalOpen(true)}
              leftIcon={<Sliders className="w-4 h-4" />}
            >
              Test Microphone & Headphones
            </Button>

            <Button
              variant="primary"
              onClick={handleStartExam}
              rightIcon={<ArrowRight className="w-4 h-4" />}
              className="bg-brand-800 hover:bg-brand-700 text-white font-semibold shadow-md px-6"
            >
              Start Speaking Interview
            </Button>
          </div>
        </Card>
      )}

      {/* Stage: Part 1 & Part 3 Interview View */}
      {(stage === 'part1' || stage === 'part3') && (
        <div className="space-y-6 flex-1 flex flex-col justify-center">
          {/* Examiner Question Box */}
          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3 text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-2xs font-semibold text-slate-600 dark:text-slate-300">
              <Volume2 className={cn('w-3.5 h-3.5', isExaminerSpeaking ? 'text-teal-500 animate-pulse' : 'text-slate-400')} />
              <span>{isExaminerSpeaking ? 'Examiner is speaking...' : 'Examiner Question'}</span>
            </div>

            <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white max-w-2xl mx-auto leading-relaxed">
              "{getCurrentQuestionText()}"
            </h2>
          </div>

          {/* Large Uncluttered Mic UI with Multi-Ring Pulse Animation */}
          <div className="flex flex-col items-center justify-center py-6 space-y-4">
            <div className="relative flex items-center justify-center">
              {/* Outer Animated Audio-Level Rings */}
              {isRecording && (
                <>
                  <div className="absolute w-36 h-36 rounded-full bg-teal-500/20 animate-ping pointer-events-none" />
                  <div className="absolute w-44 h-44 rounded-full bg-teal-500/10 animate-pulse pointer-events-none" />
                </>
              )}

              {/* Main Microphone Button */}
              <button
                type="button"
                onClick={isRecording ? (stage === 'part1' ? handleNextPart1 : handleNextPart3) : startListeningAndRecording}
                disabled={isExaminerSpeaking}
                className={cn(
                  'w-28 h-28 rounded-full flex flex-col items-center justify-center transition-all shadow-2xl relative z-10 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed',
                  isRecording
                    ? 'bg-rose-600 text-white hover:bg-rose-700 shadow-rose-600/30 ring-4 ring-rose-300 dark:ring-rose-800'
                    : 'bg-brand-800 text-white hover:bg-brand-700 shadow-brand-800/30 hover:scale-105'
                )}
                title={isRecording ? 'Click to finish speaking' : 'Click to answer'}
              >
                {isRecording ? (
                  <>
                    <Square className="w-8 h-8 fill-current mb-1" />
                    <span className="text-[10px] font-bold tracking-wider uppercase">Done</span>
                  </>
                ) : (
                  <>
                    <Mic className="w-9 h-9 mb-1" />
                    <span className="text-[10px] font-bold tracking-wider uppercase">Speak</span>
                  </>
                )}
              </button>
            </div>

            <p className="text-xs font-medium text-slate-500 dark:text-slate-400">
              {isRecording
                ? 'Recording your answer... Tap Done when finished speaking.'
                : isExaminerSpeaking
                ? 'Please listen to the examiner question.'
                : 'Tap microphone to answer question.'}
            </p>
          </div>

          {/* Live Transcript Card Fading In */}
          <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 min-h-[90px] flex flex-col justify-between">
            <div className="flex items-center justify-between pb-1 mb-2 border-b border-slate-100 dark:border-slate-800 text-2xs font-semibold text-slate-400">
              <span>Live Candidate Transcript</span>
              {isRecording && (
                <span className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-mono">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                  Recording
                </span>
              )}
            </div>

            <div className="text-xs sm:text-sm text-slate-800 dark:text-slate-200 leading-relaxed font-sans min-h-[40px]">
              {currentAnswerText ? (
                <span className="animate-in fade-in duration-300">{currentAnswerText}</span>
              ) : null}
              {interimText ? (
                <span className="text-slate-400 dark:text-slate-500 italic ml-1 animate-in fade-in">
                  {interimText}
                </span>
              ) : null}
              {!currentAnswerText && !interimText && (
                <span className="text-slate-400 italic">
                  Your spoken answer will appear here in real time...
                </span>
              )}
            </div>
          </div>

          {/* Bottom Action */}
          <div className="flex justify-end pt-2">
            <Button
              variant="primary"
              onClick={stage === 'part1' ? handleNextPart1 : handleNextPart3}
              rightIcon={<ArrowRight className="w-4 h-4" />}
              className="bg-brand-800 hover:bg-brand-700 text-white font-semibold text-xs h-9 px-5"
            >
              {stage === 'part1' && part1QIdx + 1 === Math.min(4, part1Topic.questions.length)
                ? 'Proceed to Part 2 Cue Card'
                : stage === 'part3' && part3QIdx + 1 === part2Card.part3Questions.length
                ? 'Finish Speaking Test'
                : 'Next Question'}
            </Button>
          </div>
        </div>
      )}

      {/* Stage: Part 2 Preparation (1 Minute Countdown & Scratchpad) */}
      {stage === 'part2_prep' && (
        <div className="space-y-6 flex-1 flex flex-col justify-center">
          {/* Giant Countdown Display */}
          <div className="text-center space-y-1">
            <span className="text-xs font-bold uppercase tracking-wider text-teal-600 dark:text-teal-400">
              Part 2 Preparation Time
            </span>
            <div className="font-mono text-5xl sm:text-6xl font-black text-slate-900 dark:text-white tracking-tight">
              00:{prepTimeRemaining.toString().padStart(2, '0')}
            </div>
            <p className="text-xs text-slate-500">
              You have 1 minute to read the cue card and write notes on the scratchpad below.
            </p>
          </div>

          {/* Cue Card Prompt & Scratchpad Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Cue Card */}
            <Card className="p-5 border-teal-200 dark:border-teal-800 bg-teal-50/40 dark:bg-teal-950/20 space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-teal-700 dark:text-teal-300">
                Candidate Cue Card
              </span>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Describe {part2Card.topic.toLowerCase()}
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-300 font-medium">
                You should say:
              </p>
              <ul className="list-disc pl-5 space-y-1.5 text-xs text-slate-700 dark:text-slate-300">
                {(part2Card.cueCard?.bulletPoints || []).map((cue: string, idx: number) => (
                  <li key={idx}>{cue}</li>
                ))}
              </ul>
            </Card>

            {/* Preparation Scratchpad */}
            <div className="flex flex-col bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-4 space-y-2">
              <div className="flex items-center justify-between text-2xs font-semibold text-slate-400">
                <span>Digital Scratchpad (Jot bullet notes)</span>
                <FileEdit className="w-3.5 h-3.5 text-teal-500" />
              </div>
              <textarea
                value={prepNotes}
                onChange={(e) => setPrepNotes(e.target.value)}
                placeholder="Bullet points: key vocabulary, dates, adjectives, reasons..."
                className="w-full flex-1 min-h-[140px] p-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/50 text-xs text-slate-800 dark:text-slate-200 resize-none focus:outline-none focus:ring-1 focus:ring-teal-500 font-mono"
              />
            </div>
          </div>

          <div className="flex justify-end">
            <Button
              variant="primary"
              onClick={handleStartPart2Speaking}
              rightIcon={<ArrowRight className="w-4 h-4" />}
              className="bg-brand-800 hover:bg-brand-700 text-white font-semibold text-xs h-9 px-5"
            >
              I am Ready — Begin 2-Minute Talk
            </Button>
          </div>
        </div>
      )}

      {/* Stage: Part 2 Speaking (2 Minutes Countdown & Live Speech) */}
      {stage === 'part2_speak' && (
        <div className="space-y-6 flex-1 flex flex-col justify-center">
          {/* Countdown & Instruction */}
          <div className="text-center space-y-1">
            <span className="text-xs font-bold uppercase tracking-wider text-rose-600 dark:text-rose-400">
              Part 2 Long Turn (2 Minutes)
            </span>
            <div className="font-mono text-4xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
              {Math.floor(speakTimeRemaining / 60)}:
              {(speakTimeRemaining % 60).toString().padStart(2, '0')}
            </div>
            <p className="text-xs text-slate-500">
              Speak continuously on the cue card points below for up to 2 minutes.
            </p>
          </div>

          {/* Cue Card + Notes Side-by-Side */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="p-4 bg-teal-50/30 dark:bg-teal-950/20 border-teal-200 dark:border-teal-800">
              <span className="text-2xs font-bold uppercase text-teal-600 dark:text-teal-400 block mb-1">
                Cue Card Topic
              </span>
              <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-2">
                Describe {part2Card.topic.toLowerCase()}
              </h4>
              <ul className="list-disc pl-4 space-y-1 text-2xs text-slate-600 dark:text-slate-300">
                {(part2Card.cueCard?.bulletPoints || []).map((c: string, i: number) => (
                  <li key={i}>{c}</li>
                ))}
              </ul>
            </Card>

            <Card className="p-4 bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-800">
              <span className="text-2xs font-bold uppercase text-slate-400 block mb-1">
                Your Prepared Notes
              </span>
              <div className="text-2xs font-mono text-slate-700 dark:text-slate-300 whitespace-pre-line max-h-28 overflow-y-auto">
                {prepNotes || 'No notes written.'}
              </div>
            </Card>
          </div>

          {/* Pulsing Mic UI */}
          <div className="flex flex-col items-center justify-center py-2 space-y-3">
            <div className="relative flex items-center justify-center">
              {isRecording && (
                <>
                  <div className="absolute w-32 h-32 rounded-full bg-rose-500/20 animate-ping pointer-events-none" />
                  <div className="absolute w-40 h-40 rounded-full bg-rose-500/10 animate-pulse pointer-events-none" />
                </>
              )}

              <button
                type="button"
                onClick={handleCompletePart2Speaking}
                className="w-24 h-24 rounded-full bg-rose-600 text-white hover:bg-rose-700 flex flex-col items-center justify-center shadow-xl ring-4 ring-rose-300 dark:ring-rose-800 relative z-10 cursor-pointer"
                title="Finish Part 2 Speech"
              >
                <Square className="w-7 h-7 fill-current mb-0.5" />
                <span className="text-[10px] font-bold uppercase">Finish Talk</span>
              </button>
            </div>
            <span className="text-2xs text-slate-400">
              Recording in progress... Tap Finish Talk when done.
            </span>
          </div>

          {/* Live Transcript */}
          <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
            <span className="text-2xs font-semibold text-slate-400 block mb-1">
              Live Speech Transcript
            </span>
            <p className="text-xs text-slate-800 dark:text-slate-200 leading-relaxed font-sans">
              {currentAnswerText}
              <span className="italic text-slate-400 ml-1">{interimText}</span>
            </p>
          </div>
        </div>
      )}

      {/* Stage: Evaluating */}
      {stage === 'evaluating' && (
        <Card className="p-12 text-center space-y-4">
          <Loader2 className="w-10 h-10 animate-spin text-teal-600 dark:text-teal-400 mx-auto" />
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">
            Examiner is Evaluating Your Speaking Test...
          </h2>
          <p className="text-xs text-slate-500 max-w-md mx-auto leading-relaxed">
            Analyzing speech fluency, filler word density, grammatical range and accuracy, lexical resource, and coherence using certified IELTS grading criteria.
          </p>
        </Card>
      )}

      {/* Setup modal */}
      <ExamTestSetupModal
        isOpen={isSetupModalOpen}
        onClose={() => setIsSetupModalOpen(false)}
        requiredChecks={['audio', 'mic']}
        title="IELTS Speaking Audio & Mic Setup"
      />
    </div>
  );
}
