import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Mic,
  Square,
  ArrowLeft,
  ArrowRight,
  Clock,
  Sparkles,
  BookOpen,
  FileEdit,
  Volume2,
  Filter,
  RotateCcw,
} from 'lucide-react';
import { ALL_PART2_CUE_CARDS } from './speakingContent';
import {
  speakExaminerText,
  stopExaminerSpeech,
  createSpeechRecognizer,
  startAudioRecording,
} from './speechUtils';
import { evaluateSpeakingSubmission } from './speakingAiEvaluator';
import { db } from '../../lib/db';
import { cn } from '../../lib/utils';
import type { SpeakingPart2CueCard, SpeakingSession } from '../../types';

export function SpeakingPart2Practice() {
  const navigate = useNavigate();

  const [selectedCardId, setSelectedCardId] = useState(ALL_PART2_CUE_CARDS[0].id);
  const [phase, setPhase] = useState<'idle' | 'prep' | 'speaking' | 'done'>('idle');

  const [prepTime, setPrepTime] = useState(60);
  const [speakTime, setSpeakTime] = useState(120);
  const [prepNotes, setPrepNotes] = useState('');

  const [transcript, setTranscript] = useState('');
  const [interim, setInterim] = useState('');
  const [showModelAnswer, setShowModelAnswer] = useState(false);
  const [isEvaluating, setIsEvaluating] = useState(false);

  const activeCard = ALL_PART2_CUE_CARDS.find((c) => c.id === selectedCardId) || ALL_PART2_CUE_CARDS[0];

  const recognizerRef = useRef<any>(null);
  const audioRecorderRef = useRef<any>(null);
  const audioBlobRef = useRef<Blob | null>(null);

  useEffect(() => {
    return () => {
      stopExaminerSpeech();
      if (recognizerRef.current) recognizerRef.current.stop();
      if (audioRecorderRef.current) audioRecorderRef.current.stop().catch(() => {});
    };
  }, []);

  // Prep timer countdown
  useEffect(() => {
    if (phase !== 'prep') return;
    if (prepTime <= 0) {
      handleStartSpeaking();
      return;
    }
    const timer = setInterval(() => setPrepTime((t) => t - 1), 1000);
    return () => clearInterval(timer);
  }, [phase, prepTime]);

  // Speaking timer countdown
  useEffect(() => {
    if (phase !== 'speaking') return;
    if (speakTime <= 0) {
      handleStopSpeaking();
      return;
    }
    const timer = setInterval(() => setSpeakTime((t) => t - 1), 1000);
    return () => clearInterval(timer);
  }, [phase, speakTime]);

  const handleStartPrep = () => {
    setPhase('prep');
    setPrepTime(60);
    speakExaminerText(
      `You will have one minute to prepare your talk on: ${activeCard.cueCard.topic}. You may make notes if you wish.`
    );
  };

  const handleStartSpeaking = async () => {
    setPhase('speaking');
    setSpeakTime(120);
    speakExaminerText('Your preparation time is up. Please begin speaking now.');

    try {
      const recorder = await startAudioRecording();
      audioRecorderRef.current = recorder;

      const recognizer = createSpeechRecognizer({
        onInterim: (text) => setInterim(text),
        onFinal: (text) => {
          setTranscript(text);
          setInterim('');
        },
        onError: (err) => console.warn('Recognition notice:', err),
        onEnd: () => {},
      });

      if (recognizer) {
        recognizerRef.current = recognizer;
        recognizer.start();
      }
    } catch (err) {
      console.warn('Media/Recognition setup error:', err);
    }
  };

  const handleStopSpeaking = async () => {
    setPhase('done');
    if (recognizerRef.current) recognizerRef.current.stop();
    if (audioRecorderRef.current) {
      try {
        const { blob } = await audioRecorderRef.current.stop();
        audioBlobRef.current = blob;
      } catch (err) {
        // ignore
      }
    }
  };

  const handleReset = () => {
    setPhase('idle');
    setPrepTime(60);
    setSpeakTime(120);
    setTranscript('');
    setInterim('');
    setPrepNotes('');
    setShowModelAnswer(false);
  };

  const handleEvaluateLongTurn = async () => {
    const finalSpoken = transcript + (interim ? ' ' + interim : '');
    if (!finalSpoken.trim()) return;

    setIsEvaluating(true);
    const spokenSeconds = 120 - speakTime;

    try {
      const feedback = await evaluateSpeakingSubmission(
        finalSpoken,
        Math.max(15, spokenSeconds),
        activeCard.topic,
        2
      );

      const session: SpeakingSession = {
        mode: 'part2',
        cardId: activeCard.id,
        part: 2,
        topicTitle: activeCard.topic,
        cueCardPoints: activeCard.cueCard.bulletPoints,
        durationSeconds: Math.max(15, spokenSeconds),
        transcript: finalSpoken,
        bandEstimate: feedback.overallBand,
        recordedAt: new Date().toISOString(),
        hasAudioRecording: !!audioBlobRef.current,
        feedback,
      };

      const newId = await db.speakingSessions.add(session);
      navigate(`/practice/speaking/results/${newId}`);
    } catch (err) {
      console.error('Part 2 evaluation error:', err);
      setIsEvaluating(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-6">
      <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-4">
        <div className="flex items-center gap-3">
          <Link
            to="/practice/speaking"
            className="p-2 rounded-lg text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-teal-600 dark:text-teal-400">
              Targeted Practice
            </span>
            <h1 className="text-xl font-bold text-slate-800 dark:text-slate-100">
              Part 2: Long Turn (Cue Card Simulator)
            </h1>
          </div>
        </div>
      </div>

      {/* Cue Card Selector */}
      <div className="flex items-center gap-3 bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200/80 dark:border-slate-800 shadow-xs">
        <Filter className="w-4 h-4 text-teal-600 dark:text-teal-400" />
        <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">Cue Card:</span>
        <select
          value={selectedCardId}
          disabled={phase !== 'idle' && phase !== 'done'}
          onChange={(e) => {
            setSelectedCardId(e.target.value);
            handleReset();
          }}
          className="flex-1 bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/80 rounded-lg text-xs p-2 text-slate-800 dark:text-slate-200 focus:ring-2 focus:ring-teal-500"
        >
          {ALL_PART2_CUE_CARDS.map((c) => (
            <option key={c.id} value={c.id}>
              {c.topic}
            </option>
          ))}
        </select>
      </div>

      {/* The Cue Card Box */}
      <div className="bg-amber-50/70 dark:bg-amber-950/30 border-2 border-amber-200 dark:border-amber-800/70 rounded-2xl p-6 sm:p-8 space-y-4 shadow-xs">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold uppercase tracking-wider text-amber-800 dark:text-amber-400">
            Candidate Task Card
          </span>
          <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
            1 min prep • 2 min talk
          </span>
        </div>

        <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-slate-100">
          {activeCard.cueCard.topic}
        </h2>

        <div className="space-y-1.5 pt-1">
          <p className="text-xs font-semibold text-slate-700 dark:text-slate-300">
            You should say:
          </p>
          <ul className="list-disc list-inside space-y-1 text-xs text-slate-600 dark:text-slate-300 pl-1">
            {activeCard.cueCard.bulletPoints.map((bp, i) => (
              <li key={i}>{bp}</li>
            ))}
          </ul>
        </div>
      </div>

      {/* Phase 1: Idle - Ready to Start Prep */}
      {phase === 'idle' && (
        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-xs text-slate-600 dark:text-slate-300 space-y-1">
            <span className="font-semibold block text-slate-800 dark:text-slate-100 text-sm">
              Ready for your 1-minute preparation phase?
            </span>
            A 60-second timer will count down with a scratchpad to jot down keywords before the 2-minute talk starts.
          </div>
          <button
            onClick={handleStartPrep}
            className="w-full sm:w-auto px-6 py-2.5 bg-teal-600 hover:bg-teal-700 text-white rounded-xl text-sm font-semibold shadow-xs transition-all whitespace-nowrap"
          >
            Start 1-Min Prep
          </button>
        </div>
      )}

      {/* Phase 2: Prep Phase */}
      {phase === 'prep' && (
        <div className="bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-xs space-y-5">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80">
            <div className="flex items-center gap-3">
              <div
                className={cn(
                  'w-12 h-12 rounded-xl flex items-center justify-center font-mono font-black text-xl border shadow-xs transition-colors',
                  prepTime <= 15
                    ? 'bg-rose-100 text-rose-700 border-rose-300 dark:bg-rose-950/80 dark:text-rose-200 dark:border-rose-800 animate-pulse'
                    : 'bg-teal-100 text-teal-800 border-teal-300 dark:bg-teal-950/80 dark:text-teal-200 dark:border-teal-800'
                )}
              >
                {prepTime}s
              </div>
              <div>
                <span className="font-bold text-slate-900 dark:text-white text-sm block">
                  Preparation Window Active
                </span>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  {prepTime <= 15
                    ? 'Wrap up your notes! Your 2-minute talk starts in a few seconds.'
                    : 'Structure your talk: Introduction, 2-3 key details, personal reflection.'}
                </p>
              </div>
            </div>

            <button
              onClick={handleStartSpeaking}
              className="px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-xl text-xs sm:text-sm font-semibold transition-colors shrink-0 shadow-2xs"
            >
              Skip timer & begin speaking
            </button>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
              <FileEdit className="w-4 h-4 text-teal-600 dark:text-teal-400" />
              Preparation Scratchpad (Key ideas & vocabulary):
            </label>
            <textarea
              value={prepNotes}
              onChange={(e) => setPrepNotes(e.target.value)}
              placeholder="• Topic & background...&#10;• Key narrative points...&#10;• Advanced vocab & idioms to include..."
              className="w-full h-32 p-3 text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-transparent focus:ring-2 focus:ring-teal-500 font-mono leading-relaxed"
            />
          </div>
        </div>
      )}

      {/* Phase 3: Speaking Phase */}
      {phase === 'speaking' && (
        <div className="bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-xs space-y-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-rose-600 animate-pulse font-semibold text-sm">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-600" />
              <span>Recording 2-Minute Talk</span>
            </div>
            <div className="text-xl font-black font-mono text-slate-800 dark:text-slate-100">
              {Math.floor(speakTime / 60)}:
              {(speakTime % 60).toString().padStart(2, '0')}
            </div>
          </div>

          {prepNotes && (
            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/80 text-xs font-mono">
              <span className="font-semibold text-slate-500 dark:text-slate-400 block mb-1">Your Prep Notes:</span>
              <p className="text-slate-700 dark:text-slate-300 whitespace-pre-line">{prepNotes}</p>
            </div>
          )}

          <div className="min-h-36 p-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-900/50 font-serif text-sm leading-relaxed text-slate-800 dark:text-slate-200">
            {transcript || interim ? (
              <>
                <span>{transcript}</span>
                <span className="text-slate-400 italic ml-1">{interim}</span>
              </>
            ) : (
              <span className="text-slate-400 italic">
                Speak continuously for up to 2 minutes covering all points on the task card.
              </span>
            )}
          </div>

          <div className="flex justify-end">
            <button
              onClick={handleStopSpeaking}
              className="px-5 py-2.5 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs sm:text-sm font-semibold flex items-center gap-2"
            >
              <Square className="w-4 h-4" />
              <span>Finish Speaking</span>
            </button>
          </div>
        </div>
      )}

      {/* Phase 4: Done / Review & Evaluate */}
      {phase === 'done' && (
        <div className="bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-xs space-y-5">
          <div className="flex items-center justify-between">
            <span className="font-bold text-slate-800 dark:text-slate-100 text-sm">
              Your Spoken Transcript ({transcript.trim().split(/\s+/).filter(Boolean).length} words, {120 - speakTime}s)
            </span>
            <button
              onClick={handleReset}
              className="text-xs text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 flex items-center gap-1"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Retry</span>
            </button>
          </div>

          <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-900/50 font-serif text-sm leading-relaxed text-slate-800 dark:text-slate-200">
            {transcript || 'No transcript generated.'}
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
            <button
              onClick={() => setShowModelAnswer(!showModelAnswer)}
              className="text-xs text-teal-600 hover:underline flex items-center gap-1 font-semibold"
            >
              <BookOpen className="w-4 h-4" />
              <span>{showModelAnswer ? 'Hide Band 8+ Model Answer' : 'View Band 8+ Model Answer'}</span>
            </button>

            <button
              onClick={handleEvaluateLongTurn}
              disabled={isEvaluating}
              className="px-6 py-2.5 bg-teal-600 hover:bg-teal-700 text-white rounded-xl text-xs sm:text-sm font-semibold shadow-sm transition-all flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4 text-teal-200" />
              <span>{isEvaluating ? 'Evaluating Talk...' : 'Evaluate Performance'}</span>
            </button>
          </div>

          {/* Model Answer Drawer */}
          {showModelAnswer && (
            <div className="mt-4 p-5 rounded-xl bg-teal-50/40 dark:bg-teal-950/20 border border-teal-200 dark:border-teal-800/60 space-y-3 text-xs">
              <span className="font-bold uppercase tracking-wider text-teal-800 dark:text-teal-300 block">
                Band 8.5 Model Long Turn
              </span>
              <p className="font-serif text-sm leading-relaxed text-slate-800 dark:text-slate-200 whitespace-pre-line">
                {activeCard.sampleAnswer}
              </p>
              <div>
                <span className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                  Key Idiomatic Collocations Used:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {activeCard.keyCollocations.map((col, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-0.5 rounded bg-white dark:bg-slate-800 border border-teal-200 dark:border-teal-800 text-[11px] text-teal-700 dark:text-teal-300 font-mono"
                    >
                      {col}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
