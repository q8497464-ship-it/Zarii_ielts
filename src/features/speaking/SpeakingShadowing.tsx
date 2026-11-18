import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowLeft,
  Volume2,
  Mic,
  Square,
  Play,
  RotateCcw,
  CheckCircle2,
  ChevronRight,
  ChevronLeft,
  Sparkles,
  Info,
  Layers,
} from 'lucide-react';
import { ALL_PART2_CUE_CARDS } from './speakingContent';
import {
  speakExaminerText,
  stopExaminerSpeech,
  createSpeechRecognizer,
} from './speechUtils';

export function SpeakingShadowing() {
  const [selectedCardId, setSelectedCardId] = useState(ALL_PART2_CUE_CARDS[0].id);
  const activeCard = ALL_PART2_CUE_CARDS.find((c) => c.id === selectedCardId) || ALL_PART2_CUE_CARDS[0];

  // Split sample answer into natural sentences
  const sentences = activeCard.sampleAnswer
    .split(/(?<=[.!?])\s+/)
    .map((s) => s.trim())
    .filter((s) => s.length > 5);

  const [currentSentenceIdx, setCurrentSentenceIdx] = useState(0);
  const [speechRate, setSpeechRate] = useState<number>(0.9);
  const [isPlaying, setIsPlaying] = useState(false);

  // Recording candidate's shadow attempt
  const [isRecording, setIsRecording] = useState(false);
  const [shadowTranscript, setShadowTranscript] = useState('');
  const [interimTranscript, setInterimTranscript] = useState('');

  const recognizerRef = useRef<any>(null);

  useEffect(() => {
    return () => {
      stopExaminerSpeech();
      if (recognizerRef.current) recognizerRef.current.stop();
    };
  }, []);

  const activeSentence = sentences[currentSentenceIdx] || sentences[0];

  const handlePlaySentence = () => {
    setIsPlaying(true);
    speakExaminerText(
      activeSentence,
      () => {
        setIsPlaying(false);
      },
      speechRate
    );
  };

  const handleStartShadowRecording = () => {
    setShadowTranscript('');
    setInterimTranscript('');

    const recognizer = createSpeechRecognizer({
      onInterim: (text) => setInterimTranscript(text),
      onFinal: (text) => {
        setShadowTranscript(text);
        setInterimTranscript('');
      },
      onError: (err) => console.warn('Recognition notice:', err),
      onEnd: () => setIsRecording(false),
    });

    if (recognizer) {
      recognizerRef.current = recognizer;
      recognizer.start();
      setIsRecording(true);
    }
  };

  const handleStopShadowRecording = () => {
    if (recognizerRef.current) recognizerRef.current.stop();
    setIsRecording(false);
  };

  // Simple word-level overlap comparison
  const calculateMatchPercentage = () => {
    if (!shadowTranscript) return 0;
    const targetWords = activeSentence.toLowerCase().replace(/[^a-z0-9\s]/g, '').split(/\s+/).filter(Boolean);
    const spokenWords = shadowTranscript.toLowerCase().replace(/[^a-z0-9\s]/g, '').split(/\s+/).filter(Boolean);
    if (targetWords.length === 0) return 0;

    let matches = 0;
    for (const w of spokenWords) {
      if (targetWords.includes(w)) matches++;
    }
    return Math.min(100, Math.round((matches / targetWords.length) * 100));
  };

  const matchPercent = calculateMatchPercentage();

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-4">
        <div className="flex items-center gap-3">
          <Link
            to="/practice/speaking"
            className="p-2 rounded-lg text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-purple-600 dark:text-purple-400">
              Pronunciation Lab
            </span>
            <h1 className="text-xl font-bold text-slate-800 dark:text-slate-100">
              Shadowing & Intonation Practice
            </h1>
          </div>
        </div>
      </div>

      {/* Model Selection */}
      <div className="bg-white dark:bg-slate-800 p-4 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2">
          <Layers className="w-4 h-4 text-purple-600" />
          <span className="font-semibold text-slate-700 dark:text-slate-300">Model Response:</span>
        </div>
        <select
          value={selectedCardId}
          onChange={(e) => {
            setSelectedCardId(e.target.value);
            setCurrentSentenceIdx(0);
            setShadowTranscript('');
          }}
          className="w-full sm:w-auto flex-1 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg p-2 text-slate-800 dark:text-slate-200"
        >
          {ALL_PART2_CUE_CARDS.map((c) => (
            <option key={c.id} value={c.id}>
              {c.topic}
            </option>
          ))}
        </select>
      </div>

      {/* Main Shadowing Workspace Card */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 sm:p-8 border border-slate-200 dark:border-slate-700 shadow-sm space-y-6">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-slate-500">
            Sentence {currentSentenceIdx + 1} of {sentences.length}
          </span>
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-500">Speed:</span>
            {[0.8, 0.95, 1.1].map((rate) => (
              <button
                key={rate}
                onClick={() => setSpeechRate(rate)}
                className={`px-2 py-0.5 rounded text-xs font-mono transition-colors ${
                  speechRate === rate
                    ? 'bg-purple-100 text-purple-800 dark:bg-purple-900/60 dark:text-purple-300 font-bold'
                    : 'text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-700'
                }`}
              >
                {rate}x
              </button>
            ))}
          </div>
        </div>

        {/* Target Sentence Display */}
        <div className="p-6 rounded-2xl bg-purple-50/50 dark:bg-purple-950/20 border-2 border-purple-200 dark:border-purple-800/60 text-center space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-purple-600 dark:text-purple-400">
            Listen & Shadow This Model Sentence
          </span>
          <p className="font-serif text-lg sm:text-xl font-medium text-slate-900 dark:text-slate-100 leading-relaxed max-w-2xl mx-auto">
            "{activeSentence}"
          </p>
          <button
            onClick={handlePlaySentence}
            disabled={isPlaying}
            className="inline-flex items-center gap-2 px-5 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-xl text-xs sm:text-sm font-semibold shadow-sm transition-all"
          >
            <Volume2 className="w-4 h-4" />
            <span>{isPlaying ? 'Playing Audio...' : 'Listen to Native Model'}</span>
          </button>
        </div>

        {/* Candidate Shadow Recording */}
        <div className="space-y-3 p-5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-900/50">
          <div className="flex items-center justify-between text-xs text-slate-500">
            <span>Your Shadowing Attempt (Speech Recognition)</span>
            {isRecording && (
              <span className="text-rose-600 font-semibold animate-pulse flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-rose-600" />
                Listening now...
              </span>
            )}
          </div>

          <div className="min-h-16 p-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm font-serif text-slate-800 dark:text-slate-200">
            {shadowTranscript || interimTranscript ? (
              <>
                <span>{shadowTranscript}</span>
                <span className="text-slate-400 italic ml-1">{interimTranscript}</span>
              </>
            ) : (
              <span className="text-slate-400 italic text-xs">
                Click "Shadow Record", immediately repeat the sentence mimicking the rhythm, and stop when done.
              </span>
            )}
          </div>

          <div className="flex items-center justify-between pt-1">
            <button
              onClick={isRecording ? handleStopShadowRecording : handleStartShadowRecording}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold shadow-sm transition-all ${
                isRecording
                  ? 'bg-rose-600 hover:bg-rose-700 text-white animate-pulse'
                  : 'bg-emerald-600 hover:bg-emerald-700 text-white'
              }`}
            >
              {isRecording ? <Square className="w-3.5 h-3.5" /> : <Mic className="w-3.5 h-3.5" />}
              <span>{isRecording ? 'Stop Shadowing' : 'Shadow Record'}</span>
            </button>

            {shadowTranscript && (
              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-500">Word Match:</span>
                <span
                  className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                    matchPercent >= 80
                      ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                      : matchPercent >= 50
                      ? 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300'
                      : 'bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300'
                  }`}
                >
                  {matchPercent}%
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className="flex items-center justify-between pt-2">
          <button
            onClick={() => {
              if (currentSentenceIdx > 0) {
                setCurrentSentenceIdx((i) => i - 1);
                setShadowTranscript('');
              }
            }}
            disabled={currentSentenceIdx === 0}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 disabled:opacity-40"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Previous Sentence</span>
          </button>

          <button
            onClick={() => {
              if (currentSentenceIdx + 1 < sentences.length) {
                setCurrentSentenceIdx((i) => i + 1);
                setShadowTranscript('');
              }
            }}
            disabled={currentSentenceIdx + 1 >= sentences.length}
            className="flex items-center gap-1.5 px-4 py-2 bg-slate-900 hover:bg-slate-800 dark:bg-slate-100 dark:hover:bg-white text-white dark:text-slate-900 rounded-xl text-xs font-semibold disabled:opacity-40"
          >
            <span>Next Sentence</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Shadowing Pedagogical Tips */}
      <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-xs space-y-2 text-slate-600 dark:text-slate-300">
        <span className="font-bold text-slate-800 dark:text-slate-100 flex items-center gap-1.5">
          <Info className="w-4 h-4 text-purple-600" />
          How Shadowing Boosts Your IELTS Speaking Band:
        </span>
        <ul className="list-disc list-inside space-y-1 pl-1">
          <li><strong>Connected Speech:</strong> Notice how consonants link seamlessly into neighboring vowels rather than making abrupt stops.</li>
          <li><strong>Thought Chunking:</strong> Breathe and pause only at logical grammatical phrase boundaries (clauses, prepositions).</li>
          <li><strong>Pitch Curves:</strong> Emphasize the stressed content words by raising vocal pitch slightly.</li>
        </ul>
      </div>
    </div>
  );
}
