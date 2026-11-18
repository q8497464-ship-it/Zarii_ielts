import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
  Clock,
  Maximize2,
  Minimize2,
  Headphones,
  BookOpen,
  PenTool,
  Mic,
  MicOff,
  AlertTriangle,
  ArrowRight,
  CheckCircle2,
  Volume2,
  FileText,
  RotateCcw,
  Sparkles,
  Sliders,
} from 'lucide-react';
import { getFullMockById, type FullMockTestConfig } from './mockData';
import { MockReportForm, type MockReportData } from './MockReportForm';
import { convertRawToBand as convertReadingBand, isAnswerCorrect as isReadingAnswerCorrect } from '../reading/marking';
import { convertListeningRawToBand, isListeningAnswerCorrect } from '../listening/marking';
import { db } from '../../lib/db';
import { useAppStore } from '../../store/useAppStore';
import { formatSecondsToTime, cn } from '../../lib/utils';
import { ExamTestSetupModal } from '../../components/exam';

type ExamPhase = 'briefing' | 'listening' | 'reading' | 'writing' | 'speaking' | 'report';

export const MockExamRunner: React.FC = () => {
  const { mockId } = useParams<{ mockId: string }>();
  const navigate = useNavigate();
  const { profile, addToast } = useAppStore();

  const mock = getFullMockById(mockId || 'mock-acad-01');

  const [phase, setPhase] = useState<ExamPhase>('briefing');
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Time remaining in current section (in seconds)
  const [secondsRemaining, setSecondsRemaining] = useState(0);

  // Answers state
  const [listeningAnswers, setListeningAnswers] = useState<Record<string, string>>({});
  const [readingAnswers, setReadingAnswers] = useState<Record<string, string>>({});
  const [writingTask1Text, setWritingTask1Text] = useState('');
  const [writingTask2Text, setWritingTask2Text] = useState('');
  const [speakingTranscripts, setSpeakingTranscripts] = useState<string[]>(['', '', '']);
  const [activeSpeakingIdx, setActiveSpeakingIdx] = useState(0);

  // Sub-navigation within modules
  const [currentPassageIdx, setCurrentPassageIdx] = useState(0);
  const [currentSectionIdx, setCurrentSectionIdx] = useState(0);
  const [writingActiveTab, setWritingActiveTab] = useState<'task1' | 'task2'>('task1');
  const [mobileReadingTab, setMobileReadingTab] = useState<'passage' | 'questions'>('questions');

  // Audio & Mic state
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const recognitionRef = useRef<any>(null);

  // Final Report Data
  const [finalReport, setFinalReport] = useState<MockReportData | null>(null);
  const [isSetupModalOpen, setIsSetupModalOpen] = useState(false);

  if (!mock) {
    return (
      <div className="max-w-2xl mx-auto py-16 text-center space-y-4">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white">Mock Test Not Found</h2>
        <Link to="/mock" className="text-teal-600 underline text-sm">
          Return to Mock Tests Catalog
        </Link>
      </div>
    );
  }

  // Fullscreen management
  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      document.exitFullscreen().catch(() => {});
      setIsFullscreen(false);
    }
  };

  // Section Countdown Timer (Strict exam mode: no pausing)
  useEffect(() => {
    if (phase === 'briefing' || phase === 'report') return;
    if (secondsRemaining <= 0) {
      // Auto-advance when time expires
      handleTimeExpired();
      return;
    }

    const timer = setInterval(() => {
      setSecondsRemaining((prev) => Math.max(0, prev - 1));
    }, 1000);

    return () => clearInterval(timer);
  }, [phase, secondsRemaining]);

  // Speech Recognition setup for speaking
  useEffect(() => {
    const SpeechRec = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (SpeechRec) {
      const rec = new SpeechRec();
      rec.continuous = true;
      rec.interimResults = true;
      rec.lang = 'en-US';

      rec.onresult = (event: any) => {
        let transcript = '';
        for (let i = 0; i < event.results.length; i++) {
          transcript += event.results[i][0].transcript + ' ';
        }
        setSpeakingTranscripts((prev) => {
          const next = [...prev];
          next[activeSpeakingIdx] = transcript.trim();
          return next;
        });
      };

      rec.onerror = () => setIsRecording(false);
      rec.onend = () => setIsRecording(false);
      recognitionRef.current = rec;
    }
  }, [activeSpeakingIdx]);

  // Start Phase Transitions
  const startListening = () => {
    window.speechSynthesis.cancel();
    setPhase('listening');
    setSecondsRemaining(40 * 60); // 40 minutes strict
    setCurrentSectionIdx(0);
  };

  const startReading = () => {
    window.speechSynthesis.cancel();
    setPhase('reading');
    setSecondsRemaining(60 * 60); // 60 minutes strict
    setCurrentPassageIdx(0);
  };

  const startWriting = () => {
    window.speechSynthesis.cancel();
    setPhase('writing');
    setSecondsRemaining(60 * 60); // 60 minutes strict
    setWritingActiveTab('task1');
  };

  const startSpeaking = () => {
    window.speechSynthesis.cancel();
    setPhase('speaking');
    setSecondsRemaining(14 * 60); // 14 minutes strict
    setActiveSpeakingIdx(0);
  };

  const handleTimeExpired = () => {
    if (phase === 'listening') {
      addToast({ type: 'warning', title: 'Listening Time Elapsed', message: 'Moving to Reading Section.' });
      startReading();
    } else if (phase === 'reading') {
      addToast({ type: 'warning', title: 'Reading Time Elapsed', message: 'Moving to Writing Section.' });
      startWriting();
    } else if (phase === 'writing') {
      addToast({ type: 'warning', title: 'Writing Time Elapsed', message: 'Moving to Speaking Simulator.' });
      startSpeaking();
    } else if (phase === 'speaking') {
      completeFullMock();
    }
  };

  // Audio player for listening section
  const playCurrentListeningAudio = () => {
    if (!('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();

    if (isPlayingAudio) {
      setIsPlayingAudio(false);
      return;
    }

    const currentSection = mock.listeningTest.sections[currentSectionIdx];
    const scriptLines = currentSection.audioScript || currentSection.script || [];
    if (scriptLines.length === 0) return;

    setIsPlayingAudio(true);
    let lineIdx = 0;

    const playNext = () => {
      if (lineIdx >= scriptLines.length) {
        setIsPlayingAudio(false);
        return;
      }
      const line = scriptLines[lineIdx];
      const utter = new SpeechSynthesisUtterance(line.text);
      utter.lang = 'en-GB';
      utter.rate = 0.95;
      utter.onend = () => {
        lineIdx += 1;
        setTimeout(playNext, 600);
      };
      utter.onerror = () => setIsPlayingAudio(false);
      window.speechSynthesis.speak(utter);
    };

    playNext();
  };

  // Toggle Mic for speaking
  const toggleRecording = () => {
    if (!recognitionRef.current) {
      addToast({ type: 'info', title: 'Type Answer', message: 'Speech recognition unavailable; type in the box below.' });
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
        console.error(err);
      }
    }
  };

  // Complete mock examination and compute final TRF scores
  const completeFullMock = async () => {
    window.speechSynthesis.cancel();
    if (isRecording && recognitionRef.current) {
      recognitionRef.current.stop();
    }

    // 1. Score Listening
    let listeningRaw = 0;
    let listeningTotal = 0;
    for (const sec of mock.listeningTest.sections) {
      const groups = sec.questionGroups || (sec.questions ? [{ questions: sec.questions }] : []);
      for (const g of groups) {
        for (const q of g.questions || []) {
          listeningTotal += 1;
          const userAns = listeningAnswers[q.id];
          if (isListeningAnswerCorrect(userAns, q.correctAnswer)) {
            listeningRaw += 1;
          }
        }
      }
    }
    const listeningBand = convertListeningRawToBand(listeningRaw, listeningTotal || 40);

    // 2. Score Reading
    let readingRaw = 0;
    let readingTotal = 0;
    for (const pas of mock.readingTest.passages) {
      for (const g of pas.questionGroups || []) {
        for (const q of g.questions || []) {
          readingTotal += 1;
          const userAns = readingAnswers[q.id];
          if (isReadingAnswerCorrect(userAns, q.correctAnswer)) {
            readingRaw += 1;
          }
        }
      }
    }
    const readingBand = convertReadingBand(readingRaw, mock.testType, readingTotal || 40);

    // 3. Score Writing
    const t1Words = writingTask1Text.trim().split(/\s+/).filter(Boolean).length;
    const t2Words = writingTask2Text.trim().split(/\s+/).filter(Boolean).length;
    let writingBand = 5.5;
    if (t1Words >= 150 && t2Words >= 250) {
      writingBand = 7.0;
    } else if (t1Words >= 130 && t2Words >= 220) {
      writingBand = 6.5;
    } else if (t1Words >= 100 || t2Words >= 180) {
      writingBand = 6.0;
    }

    // 4. Score Speaking
    const combinedSpeech = speakingTranscripts.join(' ');
    const spkWords = combinedSpeech.trim().split(/\s+/).filter(Boolean).length;
    let speakingBand = 6.0;
    if (spkWords >= 260) speakingBand = 7.5;
    else if (spkWords >= 180) speakingBand = 7.0;
    else if (spkWords >= 120) speakingBand = 6.5;

    // 5. Overall Band: Official IELTS Rounding Rules
    // Average of 4 skills rounded to nearest half band
    const avg = (listeningBand + readingBand + writingBand + speakingBand) / 4;
    const decimal = avg - Math.floor(avg);
    let overallBand: number;
    if (decimal < 0.25) {
      overallBand = Math.floor(avg);
    } else if (decimal < 0.75) {
      overallBand = Math.floor(avg) + 0.5;
    } else {
      overallBand = Math.ceil(avg);
    }

    // Strengths & Weaknesses calculation
    const strengths: string[] = [];
    const weaknesses: string[] = [];

    if (listeningBand >= 7.0) strengths.push('High auditory recognition and numerical accuracy in Listening.');
    else weaknesses.push('Listening distractor filtering and spelling retention under pressure.');

    if (readingBand >= 7.0) strengths.push('Strong skimming and scanning across long academic passages.');
    else weaknesses.push('True/False/Not Given and Heading synthesis in Reading Passage 3.');

    if (writingBand >= 7.0) strengths.push('Excellent word count compliance and structured paragraphing.');
    else weaknesses.push('Expanding formal lexical resource and counter-argument depth in Writing Task 2.');

    if (speakingBand >= 7.0) strengths.push('Sustained fluency and discourse markers in Part 2 long turn.');
    else weaknesses.push('Reducing pause length and enhancing idiomatic vocabulary in Speaking.');

    const nextSteps = [
      'Focus daily practice on your lowest component score in the next 7 days.',
      'Review missed listening and reading questions with transcript evidence.',
      'Study Band 8.0 model answers in the Writing Phrase Bank for advanced cohesion.',
    ];

    const reportData: MockReportData = {
      mockId: mock.id,
      mockTitle: mock.title,
      testType: mock.testType,
      completedAt: new Date().toISOString(),
      candidateName: profile?.displayName || 'IELTS Candidate',
      scores: {
        listening: { raw: listeningRaw, total: listeningTotal || 40, band: listeningBand },
        reading: { raw: readingRaw, total: readingTotal || 40, band: readingBand },
        writing: { band: writingBand, wordCountTask1: t1Words, wordCountTask2: t2Words },
        speaking: { band: speakingBand },
      },
      overallBand,
      strengths,
      weaknesses,
      nextSteps,
    };

    setFinalReport(reportData);
    setPhase('report');

    // Save into Dexie database
    try {
      await db.attempts.add({
        testId: mock.id,
        testType: mock.testType,
        module: 'reading',
        title: `${mock.title} (Full Mock)`,
        score: readingRaw,
        totalQuestions: readingTotal || 40,
        bandEstimate: overallBand,
        timeSpentSeconds: 165 * 60 - secondsRemaining,
        startedAt: new Date(Date.now() - 165 * 60000).toISOString(),
        completedAt: new Date().toISOString(),
        status: 'completed',
        notes: `Full Mock Examination: L:${listeningBand} R:${readingBand} W:${writingBand} S:${speakingBand} -> Overall Band ${overallBand}`,
      });

      addToast({
        type: 'success',
        title: 'Mock Examination Complete!',
        message: `Your Overall Result: Band ${overallBand}. Report Form generated.`,
      });
    } catch (err) {
      console.error('Failed to save full mock attempt:', err);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-900 text-slate-900 dark:text-white flex flex-col">
      {/* Exam Header Bar */}
      {phase !== 'briefing' && phase !== 'report' && (
        <header className="bg-slate-900 text-white px-3 sm:px-4 py-2.5 sm:py-3 sticky top-0 z-50 flex items-center justify-between border-b border-slate-800 shadow-md">
          <div className="flex items-center gap-2 sm:gap-3 min-w-0">
            <span className="font-black text-xs sm:text-sm text-teal-400 tracking-wider uppercase truncate max-w-[120px] xs:max-w-xs sm:max-w-md">
              {mock.title}
            </span>
            <span className="text-slate-600 hidden sm:inline">•</span>
            <span className="text-xs uppercase tracking-wider px-2 py-0.5 rounded bg-teal-950 text-teal-300 font-bold hidden sm:inline">
              {phase.toUpperCase()} SECTION
            </span>
          </div>

          <div className="flex items-center gap-2 sm:gap-4 shrink-0">
            {/* Section Strict Countdown Timer with CD-IELTS Urgency States */}
            <div
              className={cn(
                'flex items-center gap-1.5 px-2.5 sm:px-3 py-1 rounded-xl font-mono text-xs sm:text-sm font-bold transition-all',
                secondsRemaining <= 300
                  ? 'bg-rose-950 text-rose-300 border border-rose-600 animate-pulse'
                  : secondsRemaining <= 600
                  ? 'bg-amber-950 text-amber-300 border border-amber-600'
                  : 'bg-slate-800 border border-slate-700 text-slate-200'
              )}
              title={
                secondsRemaining <= 300
                  ? 'CRITICAL: Less than 5 minutes remaining!'
                  : secondsRemaining <= 600
                  ? 'NOTICE: Less than 10 minutes remaining!'
                  : 'Time remaining in section'
              }
            >
              <Clock
                className={cn(
                  'w-3.5 h-3.5 sm:w-4 sm:h-4',
                  secondsRemaining <= 300
                    ? 'text-rose-400 animate-bounce'
                    : secondsRemaining <= 600
                    ? 'text-amber-400'
                    : 'text-teal-400'
                )}
              />
              <span>{formatSecondsToTime(secondsRemaining)}</span>
            </div>

            {/* Fullscreen Toggle */}
            <button
              onClick={toggleFullscreen}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
              title="Toggle Fullscreen"
            >
              {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
            </button>
          </div>
        </header>
      )}

      {/* Main Container */}
      <main className="flex-1 p-4 sm:p-6 max-w-7xl mx-auto w-full">
        {/* Phase 0: Briefing */}
        {phase === 'briefing' && (
          <div className="max-w-2xl mx-auto py-8 space-y-6 text-center">
            <div className="w-16 h-16 rounded-3xl bg-teal-100 dark:bg-teal-900/50 text-teal-600 dark:text-teal-400 flex items-center justify-center mx-auto shadow-sm">
              <Clock className="w-8 h-8" />
            </div>

            <div className="space-y-2">
              <span className="text-xs font-bold uppercase tracking-widest text-teal-600 dark:text-teal-400">
                Official Examination Protocol
              </span>
              <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
                {mock.title}
              </h1>
              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed max-w-lg mx-auto">
                Simulate genuine IELTS test conditions back-to-back without pausing: Listening (40m),
                Reading (60m), Writing (60m), and Speaking (14m).
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-left">
              <div className="p-4 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 space-y-1">
                <span className="font-bold text-xs text-sky-600 uppercase flex items-center gap-1">
                  <Headphones className="w-3.5 h-3.5" /> 1. Listening
                </span>
                <div className="text-sm font-black">40 Mins</div>
                <p className="text-[11px] text-slate-400">4 audio sections</p>
              </div>

              <div className="p-4 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 space-y-1">
                <span className="font-bold text-xs text-teal-600 uppercase flex items-center gap-1">
                  <BookOpen className="w-3.5 h-3.5" /> 2. Reading
                </span>
                <div className="text-sm font-black">60 Mins</div>
                <p className="text-[11px] text-slate-400">3 passages (40 Qs)</p>
              </div>

              <div className="p-4 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 space-y-1">
                <span className="font-bold text-xs text-amber-600 uppercase flex items-center gap-1">
                  <PenTool className="w-3.5 h-3.5" /> 3. Writing
                </span>
                <div className="text-sm font-black">60 Mins</div>
                <p className="text-[11px] text-slate-400">Task 1 & Task 2</p>
              </div>

              <div className="p-4 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 space-y-1">
                <span className="font-bold text-xs text-emerald-600 uppercase flex items-center gap-1">
                  <Mic className="w-3.5 h-3.5" /> 4. Speaking
                </span>
                <div className="text-sm font-black">14 Mins</div>
                <p className="text-[11px] text-slate-400">Parts 1, 2, and 3</p>
              </div>
            </div>

            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                onClick={() => setIsSetupModalOpen(true)}
                className="px-5 py-3 rounded-xl text-xs font-semibold text-slate-700 dark:text-slate-300 bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 transition-colors inline-flex items-center gap-1.5"
              >
                <Sliders className="w-3.5 h-3.5 text-teal-500" />
                <span>Test Audio, Mic & Screen</span>
              </button>
              <button
                onClick={() => navigate('/mock')}
                className="px-5 py-3 rounded-xl text-xs font-semibold text-slate-500 hover:text-slate-800 dark:hover:text-white"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  toggleFullscreen();
                  startListening();
                }}
                className="px-8 py-3.5 rounded-xl font-bold text-white bg-teal-600 hover:bg-teal-700 transition-all shadow-md text-sm inline-flex items-center gap-2"
              >
                <span>Enter Fullscreen & Begin Mock Test</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Phase 1: Listening */}
        {phase === 'listening' && (
          <div className="space-y-6">
            {/* Listening Section Audio Controller */}
            <div className="bg-sky-700 text-white p-5 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-sm">
              <div>
                <span className="text-xs font-bold text-sky-200 uppercase tracking-wider block">
                  Section {currentSectionIdx + 1} of {mock.listeningTest.sections.length}
                </span>
                <h2 className="text-lg font-bold">
                  {mock.listeningTest.sections[currentSectionIdx].title}
                </h2>
              </div>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={playCurrentListeningAudio}
                  className="px-4 py-2 rounded-xl text-xs font-bold bg-white text-sky-900 hover:bg-sky-50 shadow-sm inline-flex items-center gap-1.5"
                >
                  <Volume2 className="w-4 h-4" />
                  <span>{isPlayingAudio ? 'Stop Audio' : 'Play Section Audio'}</span>
                </button>
              </div>
            </div>

            {/* Listening Questions Grid */}
            <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-200 dark:border-slate-700 space-y-6">
              {(mock.listeningTest.sections[currentSectionIdx].questionGroups || []).map((g: any, gIdx: number) => (
                <div key={gIdx} className="space-y-4">
                  <div className="p-3 bg-slate-50 dark:bg-slate-700/40 rounded-xl text-xs font-medium text-slate-700 dark:text-slate-300">
                    {g.groupInstruction}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {(g.questions || []).map((q: any) => (
                      <div key={q.id} className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-700 space-y-2">
                        <div className="flex items-start gap-2">
                          <span className="w-5 h-5 rounded bg-sky-600 text-white font-mono text-xs font-bold flex items-center justify-center shrink-0">
                            {q.questionNumber}
                          </span>
                          <span className="text-xs sm:text-sm font-semibold">{q.prompt}</span>
                        </div>
                        <input
                          type="text"
                          placeholder="Your answer..."
                          value={listeningAnswers[q.id] || ''}
                          onChange={(e) =>
                            setListeningAnswers((p) => ({ ...p, [q.id]: e.target.value }))
                          }
                          className="w-full px-3 py-1.5 text-xs rounded-lg border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-900 focus:ring-2 focus:ring-sky-500 focus:outline-none"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Listening Section Navigator */}
            <div className="flex justify-between items-center pt-2">
              <button
                disabled={currentSectionIdx === 0}
                onClick={() => setCurrentSectionIdx((i) => i - 1)}
                className="px-4 py-2 text-xs font-semibold text-slate-500 hover:text-slate-800 disabled:opacity-30"
              >
                Previous Section
              </button>

              {currentSectionIdx < mock.listeningTest.sections.length - 1 ? (
                <button
                  onClick={() => setCurrentSectionIdx((i) => i + 1)}
                  className="px-5 py-2.5 rounded-xl text-xs font-bold bg-sky-600 text-white hover:bg-sky-700 transition-all shadow-sm"
                >
                  Next Section →
                </button>
              ) : (
                <button
                  onClick={startReading}
                  className="px-6 py-2.5 rounded-xl text-xs font-bold bg-teal-600 text-white hover:bg-teal-700 transition-all shadow-md inline-flex items-center gap-1.5"
                >
                  <span>Finish Listening & Proceed to Reading</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        )}

        {/* Phase 2: Reading */}
        {phase === 'reading' && (
          <div className="space-y-4 sm:space-y-6">
            {/* Passage Selector Bar */}
            <div className="flex flex-wrap items-center justify-between gap-2 pb-2 border-b border-slate-200 dark:border-slate-700">
              <div className="flex items-center gap-1.5 sm:gap-2">
                {mock.readingTest.passages.map((p: any, idx: number) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentPassageIdx(idx)}
                    className={`px-2.5 sm:px-3 py-1.5 rounded-lg text-xs font-bold transition-all min-h-[36px] sm:min-h-0 ${
                      currentPassageIdx === idx
                        ? 'bg-teal-600 text-white shadow-xs'
                        : 'bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300'
                    }`}
                  >
                    Passage {p.passageNumber}
                  </button>
                ))}
              </div>
              <span className="text-2xs sm:text-xs text-slate-500 font-mono">
                {Object.keys(readingAnswers).length} Answers Recorded
              </span>
            </div>

            {/* Mobile View Toggle (< lg) */}
            <div className="lg:hidden flex items-center p-1 rounded-xl bg-slate-200 dark:bg-slate-800 border border-slate-300 dark:border-slate-700">
              <button
                type="button"
                onClick={() => setMobileReadingTab('passage')}
                className={cn(
                  'flex-1 py-2 text-xs font-bold rounded-lg flex items-center justify-center gap-1.5 transition-all min-h-[40px]',
                  mobileReadingTab === 'passage'
                    ? 'bg-white dark:bg-slate-900 text-teal-600 dark:text-teal-400 shadow-xs'
                    : 'text-slate-600 dark:text-slate-400'
                )}
              >
                <BookOpen className="w-3.5 h-3.5" />
                <span>Passage {mock.readingTest.passages[currentPassageIdx].passageNumber}</span>
              </button>
              <button
                type="button"
                onClick={() => setMobileReadingTab('questions')}
                className={cn(
                  'flex-1 py-2 text-xs font-bold rounded-lg flex items-center justify-center gap-1.5 transition-all min-h-[40px]',
                  mobileReadingTab === 'questions'
                    ? 'bg-white dark:bg-slate-900 text-teal-600 dark:text-teal-400 shadow-xs'
                    : 'text-slate-600 dark:text-slate-400'
                )}
              >
                <FileText className="w-3.5 h-3.5" />
                <span>Questions</span>
              </button>
            </div>

            {/* Split Screen Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 relative">
              {/* Left: Passage */}
              <div
                className={cn(
                  'bg-white dark:bg-slate-800 rounded-2xl p-4 sm:p-6 border border-slate-200 dark:border-slate-700 h-[calc(100vh-230px)] sm:h-[620px] overflow-y-auto space-y-4 font-serif',
                  mobileReadingTab === 'passage' ? 'block' : 'hidden lg:block'
                )}
              >
                <h3 className="text-base font-bold text-slate-900 dark:text-white font-sans">
                  {mock.readingTest.passages[currentPassageIdx].title}
                </h3>
                <div className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed space-y-4">
                  {mock.readingTest.passages[currentPassageIdx].text.split('\n\n').map((para: string, i: number) => (
                    <p key={i}>{para}</p>
                  ))}
                </div>
              </div>

              {/* Right: Questions */}
              <div
                className={cn(
                  'bg-white dark:bg-slate-800 rounded-2xl p-4 sm:p-6 border border-slate-200 dark:border-slate-700 h-[calc(100vh-230px)] sm:h-[620px] overflow-y-auto space-y-6 pb-20 sm:pb-6',
                  mobileReadingTab === 'questions' ? 'block' : 'hidden lg:block'
                )}
              >
                {(mock.readingTest.passages[currentPassageIdx].questionGroups || []).map((g: any, gIdx: number) => (
                  <div key={gIdx} className="space-y-4">
                    <div className="p-3 bg-slate-50 dark:bg-slate-700/40 rounded-xl text-xs font-medium text-slate-700 dark:text-slate-300">
                      {g.groupInstruction}
                    </div>

                    {(g.questions || []).map((q: any) => (
                      <div key={q.id} className="p-3.5 sm:p-4 rounded-xl border border-slate-200 dark:border-slate-700 space-y-2">
                        <div className="flex items-start gap-2">
                          <span className="w-5 h-5 rounded bg-teal-600 text-white font-mono text-xs font-bold flex items-center justify-center shrink-0">
                            {q.questionNumber}
                          </span>
                          <span className="text-xs sm:text-sm font-semibold">{q.prompt}</span>
                        </div>

                        {q.type === 'true_false_not_given' ? (
                          <div className="grid grid-cols-3 gap-2 pt-1">
                            {['TRUE', 'FALSE', 'NOT GIVEN'].map((opt) => (
                              <button
                                key={opt}
                                type="button"
                                onClick={() => setReadingAnswers((p) => ({ ...p, [q.id]: opt }))}
                                className={`py-2 px-1 rounded-lg text-xs font-bold border transition-all min-h-[44px] flex items-center justify-center text-center ${
                                  readingAnswers[q.id] === opt
                                    ? 'bg-teal-600 text-white border-teal-600'
                                    : 'border-slate-300 dark:border-slate-600 hover:border-teal-500'
                                }`}
                              >
                                {opt}
                              </button>
                            ))}
                          </div>
                        ) : (
                          <input
                            type="text"
                            placeholder="Your answer..."
                            value={readingAnswers[q.id] || ''}
                            onChange={(e) =>
                              setReadingAnswers((p) => ({ ...p, [q.id]: e.target.value }))
                            }
                            className="w-full px-3 py-2 text-base sm:text-xs rounded-lg border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-900 focus:ring-2 focus:ring-teal-500 focus:outline-none min-h-[44px]"
                          />
                        )}
                      </div>
                    ))}
                  </div>
                ))}
              </div>

              {/* Floating Thumb Switcher on Mobile (< lg) */}
              <div className="lg:hidden fixed bottom-6 right-4 z-40">
                {mobileReadingTab === 'passage' ? (
                  <button
                    type="button"
                    onClick={() => setMobileReadingTab('questions')}
                    className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs shadow-lg active:scale-95 transition-all min-h-[44px]"
                  >
                    <span>Questions</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => setMobileReadingTab('passage')}
                    className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-slate-900/95 hover:bg-slate-900 text-white font-bold text-xs shadow-lg active:scale-95 transition-all border border-slate-700 min-h-[44px]"
                  >
                    <BookOpen className="w-4 h-4 text-teal-400" />
                    <span>Passage</span>
                  </button>
                )}
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <button
                onClick={startWriting}
                className="px-6 py-2.5 rounded-xl text-xs font-bold bg-teal-600 text-white hover:bg-teal-700 transition-all shadow-md inline-flex items-center gap-1.5"
              >
                <span>Proceed to Section 3: Writing</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Phase 3: Writing */}
        {phase === 'writing' && (
          <div className="space-y-4 sm:space-y-6">
            {/* Writing Tab Switcher */}
            <div className="flex flex-col xs:flex-row items-stretch xs:items-center justify-between gap-2 pb-2 border-b border-slate-200 dark:border-slate-700">
              <div className="flex items-center gap-2 w-full xs:w-auto">
                <button
                  onClick={() => setWritingActiveTab('task1')}
                  className={`flex-1 xs:flex-none px-3 sm:px-4 py-2 rounded-xl text-xs font-bold transition-all min-h-[44px] ${
                    writingActiveTab === 'task1'
                      ? 'bg-amber-600 text-white shadow-xs'
                      : 'bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300'
                  }`}
                >
                  Task 1 ({writingTask1Text.trim().split(/\s+/).filter(Boolean).length}/150w)
                </button>
                <button
                  onClick={() => setWritingActiveTab('task2')}
                  className={`flex-1 xs:flex-none px-3 sm:px-4 py-2 rounded-xl text-xs font-bold transition-all min-h-[44px] ${
                    writingActiveTab === 'task2'
                      ? 'bg-amber-600 text-white shadow-xs'
                      : 'bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300'
                  }`}
                >
                  Task 2 ({writingTask2Text.trim().split(/\s+/).filter(Boolean).length}/250w)
                </button>
              </div>
            </div>

            {/* Prompt & Editor */}
            {writingActiveTab === 'task1' ? (
              <div className="space-y-4">
                <div className="p-4 rounded-xl bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 text-xs">
                  <h4 className="font-bold text-amber-900 dark:text-amber-200 text-sm mb-1">
                    {mock.writingTask1.title}
                  </h4>
                  <p className="text-slate-800 dark:text-slate-200 leading-relaxed font-semibold">
                    {mock.writingTask1.promptText || mock.writingTask1.prompt}
                  </p>
                </div>
                <textarea
                  rows={12}
                  value={writingTask1Text}
                  onChange={(e) => setWritingTask1Text(e.target.value)}
                  placeholder="Draft your 150-word Task 1 response here..."
                  className="w-full p-4 pb-24 sm:pb-4 rounded-2xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-base sm:text-sm focus:ring-2 focus:ring-amber-500 focus:outline-none leading-relaxed"
                />
              </div>
            ) : (
              <div className="space-y-4">
                <div className="p-4 rounded-xl bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 text-xs">
                  <h4 className="font-bold text-amber-900 dark:text-amber-200 text-sm mb-1">
                    {mock.writingTask2.title}
                  </h4>
                  <p className="text-slate-800 dark:text-slate-200 leading-relaxed font-semibold">
                    {mock.writingTask2.promptText || mock.writingTask2.prompt}
                  </p>
                </div>
                <textarea
                  rows={14}
                  value={writingTask2Text}
                  onChange={(e) => setWritingTask2Text(e.target.value)}
                  placeholder="Draft your 250-word Task 2 essay here..."
                  className="w-full p-4 pb-24 sm:pb-4 rounded-2xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-base sm:text-sm focus:ring-2 focus:ring-amber-500 focus:outline-none leading-relaxed"
                />
              </div>
            )}

            <div className="flex justify-end pt-2">
              <button
                onClick={startSpeaking}
                className="px-6 py-2.5 rounded-xl text-xs font-bold bg-amber-600 text-white hover:bg-amber-700 transition-all shadow-md inline-flex items-center gap-1.5"
              >
                <span>Proceed to Section 4: Speaking</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Phase 4: Speaking */}
        {phase === 'speaking' && (
          <div className="max-w-2xl mx-auto py-6 space-y-6 text-center">
            <span className="text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300">
              Part {mock.speakingTopics[activeSpeakingIdx].part} Speaking
            </span>

            <h3 className="text-xl font-bold leading-relaxed">
              "{mock.speakingTopics[activeSpeakingIdx].prompt}"
            </h3>

            {/* Mic Toggle */}
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
              <span className="text-xs text-slate-500">
                {isRecording ? 'Listening live... speak naturally' : 'Click to answer with voice (or type below)'}
              </span>
            </div>

            <textarea
              rows={3}
              value={speakingTranscripts[activeSpeakingIdx] || ''}
              onChange={(e) => {
                const val = e.target.value;
                setSpeakingTranscripts((prev) => {
                  const next = [...prev];
                  next[activeSpeakingIdx] = val;
                  return next;
                });
              }}
              placeholder="Your answer transcript will record here..."
              className="w-full p-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs text-left"
            />

            <div className="flex justify-between items-center pt-2">
              <button
                disabled={activeSpeakingIdx === 0}
                onClick={() => setActiveSpeakingIdx((i) => i - 1)}
                className="px-4 py-2 text-xs font-semibold text-slate-500 hover:text-slate-800 disabled:opacity-30"
              >
                Previous Part
              </button>

              {activeSpeakingIdx < mock.speakingTopics.length - 1 ? (
                <button
                  onClick={() => setActiveSpeakingIdx((i) => i + 1)}
                  className="px-5 py-2 rounded-xl text-xs font-bold bg-emerald-600 text-white hover:bg-emerald-700 transition-all shadow-sm"
                >
                  Next Part →
                </button>
              ) : (
                <button
                  onClick={completeFullMock}
                  className="px-6 py-2.5 rounded-xl text-xs font-bold bg-gradient-to-r from-teal-600 to-emerald-600 text-white transition-all shadow-md inline-flex items-center gap-1.5"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Submit & Generate TRF Report</span>
                </button>
              )}
            </div>
          </div>
        )}

        {/* Phase 5: Final Report Form */}
        {phase === 'report' && finalReport && (
          <MockReportForm
            report={finalReport}
            onRetake={() => {
              setPhase('briefing');
              setFinalReport(null);
            }}
          />
        )}
      </main>

      {/* Full Mock Test Setup Pre-Check Modal */}
      <ExamTestSetupModal
        isOpen={isSetupModalOpen}
        onClose={() => setIsSetupModalOpen(false)}
        requiredChecks={['audio', 'mic', 'fullscreen']}
        title="Full Mock Hardware & Environment Verification"
      />
    </div>
  );
};
