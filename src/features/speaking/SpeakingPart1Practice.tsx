import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Mic,
  Square,
  Volume2,
  ArrowLeft,
  ArrowRight,
  Sparkles,
  BookOpen,
  Clock,
  RotateCcw,
  CheckCircle2,
  Filter,
} from 'lucide-react';
import { ALL_PART1_TOPICS } from './speakingContent';
import {
  speakExaminerText,
  stopExaminerSpeech,
  createSpeechRecognizer,
  startAudioRecording,
  isSpeechRecognitionSupported,
} from './speechUtils';
import { evaluateSpeakingSubmission } from './speakingAiEvaluator';
import { db } from '../../lib/db';
import type { SpeakingPart1Topic, SpeakingSession } from '../../types';

export function SpeakingPart1Practice() {
  const navigate = useNavigate();

  const [selectedTopicId, setSelectedTopicId] = useState(ALL_PART1_TOPICS[0].id);
  const [currentQIndex, setCurrentQIndex] = useState(0);

  const [isRecording, setIsRecording] = useState(false);
  const [currentAnswer, setCurrentAnswer] = useState('');
  const [interimText, setInterimText] = useState('');
  const [showOutline, setShowOutline] = useState(false);
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [durationSeconds, setDurationSeconds] = useState(0);

  const activeTopic = ALL_PART1_TOPICS.find((t) => t.id === selectedTopicId) || ALL_PART1_TOPICS[0];
  const activeQuestion = activeTopic.questions[currentQIndex] || activeTopic.questions[0];

  const recognizerRef = useRef<any>(null);
  const audioRecorderRef = useRef<any>(null);
  const timerIntervalRef = useRef<any>(null);

  useEffect(() => {
    return () => {
      stopExaminerSpeech();
      if (recognizerRef.current) recognizerRef.current.stop();
      if (audioRecorderRef.current) audioRecorderRef.current.stop().catch(() => {});
      if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    };
  }, []);

  const handleSpeakQuestion = () => {
    speakExaminerText(activeQuestion.text);
  };

  const handleStartRecording = async () => {
    setCurrentAnswer('');
    setInterimText('');
    setDurationSeconds(0);

    timerIntervalRef.current = setInterval(() => {
      setDurationSeconds((s) => s + 1);
    }, 1000);

    try {
      const recorder = await startAudioRecording();
      audioRecorderRef.current = recorder;

      const recognizer = createSpeechRecognizer({
        onInterim: (text) => setInterimText(text),
        onFinal: (text) => {
          setCurrentAnswer(text);
          setInterimText('');
        },
        onError: (err) => console.warn('Recognition error:', err),
        onEnd: () => setIsRecording(false),
      });

      if (recognizer) {
        recognizerRef.current = recognizer;
        recognizer.start();
        setIsRecording(true);
      }
    } catch (err) {
      console.warn('Microphone error:', err);
      setIsRecording(true);
    }
  };

  const handleStopRecording = async () => {
    if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    if (recognizerRef.current) recognizerRef.current.stop();
    if (audioRecorderRef.current) {
      try {
        await audioRecorderRef.current.stop();
      } catch (err) {
        // ignore
      }
    }
    setIsRecording(false);
  };

  const handleEvaluateAnswer = async () => {
    const fullText = currentAnswer + (interimText ? ' ' + interimText : '');
    if (!fullText.trim()) return;

    setIsEvaluating(true);
    try {
      const feedback = await evaluateSpeakingSubmission(
        fullText,
        Math.max(10, durationSeconds),
        `${activeTopic.topic}: ${activeQuestion.text}`,
        1
      );

      const session: SpeakingSession = {
        mode: 'part1',
        part: 1,
        topicTitle: `Part 1: ${activeTopic.topic}`,
        durationSeconds: Math.max(10, durationSeconds),
        transcript: fullText,
        bandEstimate: feedback.overallBand,
        recordedAt: new Date().toISOString(),
        feedback,
      };

      const newId = await db.speakingSessions.add(session);
      navigate(`/practice/speaking/results/${newId}`);
    } catch (err) {
      console.error('Part 1 evaluation error:', err);
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
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
              Targeted Practice
            </span>
            <h1 className="text-xl font-bold text-slate-800 dark:text-slate-100">
              Part 1: Everyday Question Drill
            </h1>
          </div>
        </div>
      </div>

      {/* Topic Selector */}
      <div className="flex items-center gap-3 bg-white dark:bg-slate-800 p-4 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm">
        <Filter className="w-4 h-4 text-emerald-600" />
        <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">Topic:</span>
        <select
          value={selectedTopicId}
          onChange={(e) => {
            setSelectedTopicId(e.target.value);
            setCurrentQIndex(0);
            setCurrentAnswer('');
            setShowOutline(false);
          }}
          className="flex-1 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-xs p-2 text-slate-800 dark:text-slate-200 focus:ring-2 focus:ring-emerald-500"
        >
          {ALL_PART1_TOPICS.map((t) => (
            <option key={t.id} value={t.id}>
              {t.topic} ({t.questions.length} questions)
            </option>
          ))}
        </select>
      </div>

      {/* Main Question Card */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 sm:p-8 border border-slate-200 dark:border-slate-700 shadow-sm space-y-6">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold uppercase text-emerald-600 dark:text-emerald-400">
            {activeTopic.topic}
          </span>
          <span className="text-xs text-slate-400 font-mono">
            Question {currentQIndex + 1} of {activeTopic.questions.length}
          </span>
        </div>

        {/* Examiner Question Box */}
        <div className="p-5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 flex items-center gap-1.5">
              <Volume2 className="w-4 h-4 text-emerald-600" />
              Examiner Question
            </span>
            <button
              onClick={handleSpeakQuestion}
              className="text-xs text-teal-600 hover:underline flex items-center gap-1"
            >
              <span>Listen</span>
            </button>
          </div>
          <p className="text-lg font-medium text-slate-800 dark:text-slate-100">
            {activeQuestion.text}
          </p>
        </div>

        {/* Sample Outline Accordion */}
        <div className="border border-slate-200 dark:border-slate-700 rounded-xl overflow-hidden">
          <button
            onClick={() => setShowOutline(!showOutline)}
            className="w-full flex items-center justify-between p-3.5 bg-slate-50/50 dark:bg-slate-900/50 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100"
          >
            <div className="flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-emerald-600" />
              <span>Band 7+ Response Strategy & Model Points</span>
            </div>
            <span className="text-slate-400">{showOutline ? 'Hide' : 'Show'}</span>
          </button>
          {showOutline && (
            <div className="p-4 bg-white dark:bg-slate-800 border-t border-slate-200 dark:border-slate-700 text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              {activeQuestion.sampleOutline}
            </div>
          )}
        </div>

        {/* Spoken Response Area */}
        <div className="space-y-3">
          <div className="flex items-center justify-between text-xs text-slate-500">
            <span>Your Spoken Answer</span>
            {isRecording && (
              <span className="flex items-center gap-1.5 text-rose-600 font-semibold animate-pulse">
                <span className="w-2 h-2 rounded-full bg-rose-600" />
                Recording ({durationSeconds}s)
              </span>
            )}
          </div>

          <textarea
            value={currentAnswer || interimText}
            onChange={(e) => setCurrentAnswer(e.target.value)}
            placeholder="Click 'Record Answer' and speak naturally into your microphone. You can also type directly here..."
            className="w-full h-32 p-4 text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-transparent focus:ring-2 focus:ring-emerald-500 font-serif leading-relaxed"
          />

          <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
            <button
              onClick={isRecording ? handleStopRecording : handleStartRecording}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold shadow-sm transition-all ${
                isRecording
                  ? 'bg-rose-600 hover:bg-rose-700 text-white animate-pulse'
                  : 'bg-emerald-600 hover:bg-emerald-700 text-white'
              }`}
            >
              {isRecording ? <Square className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
              <span>{isRecording ? 'Stop Recording' : 'Record Answer'}</span>
            </button>

            <div className="flex items-center gap-2 ml-auto">
              {currentAnswer && (
                <button
                  onClick={handleEvaluateAnswer}
                  disabled={isEvaluating}
                  className="px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-1.5"
                >
                  <Sparkles className="w-4 h-4 text-teal-200" />
                  <span>{isEvaluating ? 'Evaluating...' : 'Evaluate Answer'}</span>
                </button>
              )}

              {currentQIndex + 1 < activeTopic.questions.length && (
                <button
                  onClick={() => {
                    setCurrentQIndex((idx) => idx + 1);
                    setCurrentAnswer('');
                    setShowOutline(false);
                  }}
                  className="px-4 py-2 bg-slate-900 hover:bg-slate-800 dark:bg-slate-100 dark:hover:bg-white text-white dark:text-slate-900 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-1.5"
                >
                  <span>Next Question</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
