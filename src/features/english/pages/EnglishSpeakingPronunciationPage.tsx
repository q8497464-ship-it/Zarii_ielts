import React, { useState, useEffect, useRef } from 'react';
import { 
  Mic, 
  MicOff, 
  Volume2, 
  Sparkles, 
  CheckCircle2, 
  AlertCircle, 
  RotateCcw,
  BookOpen,
  MessageSquare,
  Flame,
  ChevronRight,
  Play,
  Pause,
  Award
} from 'lucide-react';
import { skillsService } from '../services/skillsService';
import { 
  MINIMAL_PAIRS, 
  STRESS_DRILLS, 
  TONGUE_TWISTERS, 
  SHADOWING_SENTENCES, 
  ROLE_PLAY_SCENARIOS, 
  type RolePlayScenario, 
  type RolePlayTurn 
} from '../data/speakingLibrary';
import { cn } from '../../../lib/utils';
import { playPronunciation } from '../../dictionary/dictionaryService';

export const EnglishSpeakingPronunciationPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'pairs' | 'stress' | 'twisters' | 'repeat' | 'shadow' | 'roleplay'>('pairs');

  // Minimal pairs state
  const [selectedPairIndex, setSelectedPairIndex] = useState(0);

  // Tongue twisters state
  const [selectedTwisterIndex, setSelectedTwisterIndex] = useState(0);

  // Repeat After Me & Shadowing state
  const [activeSentenceIndex, setActiveSentenceIndex] = useState(0);

  // Speech Recognition state
  const [isRecording, setIsRecording] = useState(false);
  const [recognizedText, setRecognizedText] = useState('');
  const [comparisonWords, setComparisonWords] = useState<Array<{ word: string; status: 'matched' | 'missed' | 'extra' }>>([]);
  const [speakingWpm, setSpeakingWpm] = useState<number | null>(null);
  const startTimeRef = useRef<number | null>(null);

  // Role play state
  const [activeScenario, setActiveScenario] = useState<RolePlayScenario>(ROLE_PLAY_SCENARIOS[0]);
  const [currentTurnIndex, setCurrentTurnIndex] = useState(0);
  const [roleplayLogs, setRoleplayLogs] = useState<Array<{ speaker: string; text: string; isUser: boolean }>>([]);

  const currentPair = MINIMAL_PAIRS[selectedPairIndex];
  const currentTwister = TONGUE_TWISTERS[selectedTwisterIndex];
  const currentSentence = SHADOWING_SENTENCES[activeSentenceIndex];

  useEffect(() => {
    // Reset comparison on tab or item switch
    setRecognizedText('');
    setComparisonWords([]);
    setSpeakingWpm(null);
    setIsRecording(false);
  }, [activeTab, selectedPairIndex, selectedTwisterIndex, activeSentenceIndex]);

  const speak = (text: string, rate: number = 0.9) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = rate;
      utterance.lang = 'en-US';
      window.speechSynthesis.speak(utterance);
    }
  };

  const compareTranscriptToTarget = (actual: string, target: string, durationSeconds: number) => {
    const cleanTargetWords = target.toLowerCase().replace(/[^a-z0-9 ]/g, '').split(/\s+/).filter(Boolean);
    const cleanActualWords = actual.toLowerCase().replace(/[^a-z0-9 ]/g, '').split(/\s+/).filter(Boolean);

    // Calculate WPM
    if (durationSeconds > 0) {
      const wpm = Math.round((cleanActualWords.length / durationSeconds) * 60);
      setSpeakingWpm(wpm);
    }

    // Word-level diff
    const result: Array<{ word: string; status: 'matched' | 'missed' | 'extra' }> = [];
    cleanTargetWords.forEach((targetWord) => {
      if (cleanActualWords.includes(targetWord)) {
        result.push({ word: targetWord, status: 'matched' });
      } else {
        result.push({ word: targetWord, status: 'missed' });
      }
    });

    setComparisonWords(result);
  };

  const startMicrophoneRecording = (targetText: string, onComplete?: (transcript: string) => void) => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert('Speech recognition is not supported in this browser. Please use Chrome, Edge, or Safari, or practice aloud.');
      return;
    }

    try {
      const recognition = new SpeechRecognition();
      recognition.lang = 'en-US';
      recognition.interimResults = false;
      recognition.maxAlternatives = 1;

      recognition.onstart = () => {
        setIsRecording(true);
        setRecognizedText('');
        setComparisonWords([]);
        setSpeakingWpm(null);
        startTimeRef.current = Date.now();
      };

      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setRecognizedText(transcript);
        const durationSec = startTimeRef.current ? (Date.now() - startTimeRef.current) / 1000 : 2;
        compareTranscriptToTarget(transcript, targetText, durationSec);
        if (onComplete) {
          onComplete(transcript);
        }
      };

      recognition.onerror = () => {
        setIsRecording(false);
      };

      recognition.onend = () => {
        setIsRecording(false);
      };

      recognition.start();
    } catch (err) {
      console.warn('Speech recognition start failed:', err);
      setIsRecording(false);
    }
  };

  // Role play turn progression
  const handleRoleplayStart = () => {
    setCurrentTurnIndex(0);
    setRoleplayLogs([]);
    playRoleplayTurn(0);
  };

  const playRoleplayTurn = (turnIdx: number) => {
    const turn = activeScenario.turns[turnIdx];
    if (!turn) return;

    if (turn.speaker === 'app') {
      speak(turn.audioText || turn.expectedText);
      setRoleplayLogs(prev => [...prev, { speaker: turn.name, text: turn.expectedText, isUser: false }]);
      // Advance to user turn if available
      if (turnIdx + 1 < activeScenario.turns.length) {
        setCurrentTurnIndex(turnIdx + 1);
      }
    }
  };

  const handleUserRoleplaySpeak = () => {
    const turn = activeScenario.turns[currentTurnIndex];
    if (!turn || turn.speaker !== 'user') return;

    startMicrophoneRecording(turn.expectedText, (transcript) => {
      setRoleplayLogs(prev => [...prev, { speaker: 'You', text: transcript, isUser: true }]);
      // Next app turn
      if (currentTurnIndex + 1 < activeScenario.turns.length) {
        setCurrentTurnIndex(currentTurnIndex + 1);
        setTimeout(() => {
          playRoleplayTurn(currentTurnIndex + 1);
        }, 1200);
      }
    });
  };

  return (
    <div className="min-h-screen bg-[#F7FAF8] dark:bg-[#0B1510] text-slate-800 dark:text-slate-100 p-4 md:p-8">
      {/* 1. Header */}
      <div className="max-w-5xl mx-auto mb-8">
        <div className="pb-6 border-b border-emerald-900/10 dark:border-emerald-500/20">
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-100 dark:bg-emerald-950/60 text-[#124F40] dark:text-[#5BB78D]">
              General English
            </span>
            <span className="text-xs text-slate-500 dark:text-slate-400">Microphone & Speech Analysis</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-[#124F40] dark:text-[#5BB78D] tracking-tight">
            Speaking & Pronunciation Studio
          </h1>
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
            Master minimal pairs, word and sentence stress, tongue-twisters, shadowing, and interactive role-play conversations.
          </p>

          {/* Navigation Mode Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto mt-6 p-1 bg-slate-200/60 dark:bg-[#112019] rounded-2xl border border-slate-300/40 dark:border-[#24392F]">
            {[
              { id: 'pairs', label: 'Minimal Pairs' },
              { id: 'stress', label: 'Stress & Rhythm' },
              { id: 'twisters', label: 'Tongue-Twisters' },
              { id: 'repeat', label: 'Repeat After Me' },
              { id: 'shadow', label: 'Shadowing' },
              { id: 'roleplay', label: 'Interactive Role-Play' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={cn(
                  'px-3.5 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap',
                  activeTab === tab.id
                    ? 'bg-[#124F40] text-white dark:bg-[#5BB78D] dark:text-[#0B1510] shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
                )}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 2. Main Content Area */}
      <div className="max-w-5xl mx-auto">
        {/* TAB 1: MINIMAL PAIRS */}
        {activeTab === 'pairs' && (
          <div className="space-y-6">
            {/* Pair Selector Chips */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2">
              {MINIMAL_PAIRS.map((pair, idx) => (
                <button
                  key={pair.id}
                  onClick={() => setSelectedPairIndex(idx)}
                  className={cn(
                    'px-3 py-1.5 rounded-xl text-xs font-bold border transition-all whitespace-nowrap',
                    selectedPairIndex === idx
                      ? 'bg-emerald-50 text-[#124F40] border-[#124F40] dark:bg-emerald-950/60 dark:text-[#5BB78D] dark:border-[#5BB78D]'
                      : 'bg-white dark:bg-[#112019] border-slate-200 dark:border-[#24392F] text-slate-600 dark:text-slate-400 hover:bg-slate-50'
                  )}
                >
                  {pair.pair[0]} vs {pair.pair[1]}
                </button>
              ))}
            </div>

            {/* Current Pair Card */}
            <div className="bg-white dark:bg-[#112019] border border-slate-200 dark:border-[#24392F] rounded-3xl p-6 md:p-8 shadow-sm">
              <div className="text-xs font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400 mb-1">
                {currentPair.contrastTitle}
              </div>

              {/* Two Words Side by Side */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
                <div className="p-5 rounded-2xl bg-sky-50/70 dark:bg-sky-950/20 border border-sky-200/70 dark:border-sky-800/40 text-center">
                  <div className="text-3xl font-extrabold text-sky-900 dark:text-sky-200">{currentPair.pair[0]}</div>
                  <div className="text-sm font-mono text-slate-500 mt-1">{currentPair.ipa[0]}</div>
                  <button
                    onClick={() => speak(currentPair.pair[0])}
                    className="mt-3 inline-flex items-center gap-1.5 px-3 py-1.5 bg-white dark:bg-neutral-800 rounded-xl text-xs font-bold text-sky-700 shadow-xs hover:bg-sky-50 transition-colors"
                  >
                    <Volume2 className="w-4 h-4" /> Listen to {currentPair.pair[0]}
                  </button>
                </div>

                <div className="p-5 rounded-2xl bg-teal-50/70 dark:bg-teal-950/20 border border-teal-200/70 dark:border-teal-800/40 text-center">
                  <div className="text-3xl font-extrabold text-teal-900 dark:text-teal-200">{currentPair.pair[1]}</div>
                  <div className="text-sm font-mono text-slate-500 mt-1">{currentPair.ipa[1]}</div>
                  <button
                    onClick={() => speak(currentPair.pair[1])}
                    className="mt-3 inline-flex items-center gap-1.5 px-3 py-1.5 bg-white dark:bg-neutral-800 rounded-xl text-xs font-bold text-teal-700 shadow-xs hover:bg-teal-50 transition-colors"
                  >
                    <Volume2 className="w-4 h-4" /> Listen to {currentPair.pair[1]}
                  </button>
                </div>
              </div>

              {/* Mouth Guidance and Urdu Tip */}
              <div className="space-y-3 mb-6">
                <div className="p-4 bg-slate-50 dark:bg-[#0B1510] border border-slate-200 dark:border-[#24392F] rounded-2xl text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                  <span className="font-bold text-slate-900 dark:text-slate-100">Mouth & Tongue Position: </span>
                  {currentPair.mouthGuide}
                </div>

                <div className="p-4 bg-amber-50/60 dark:bg-amber-950/20 border border-amber-200/60 dark:border-amber-800/40 rounded-2xl text-xs text-amber-950 dark:text-amber-200 text-right leading-relaxed font-urdu">
                  {currentPair.urduTip}
                </div>
              </div>

              {/* Sentences Practice */}
              <div className="space-y-3 pt-6 border-t border-slate-200 dark:border-[#24392F]">
                <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                  Sentence Distinction Drills
                </div>
                {currentPair.practiceSentences.map((s, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 bg-slate-50 dark:bg-[#0B1510] border border-slate-200 dark:border-[#24392F] rounded-xl flex items-center justify-between gap-3 text-xs"
                  >
                    <div>
                      <span className="font-bold text-[#124F40] dark:text-[#5BB78D] mr-2">[{s.targetWord}]</span>
                      <span className="text-slate-800 dark:text-slate-200">{s.sentence}</span>
                    </div>

                    <button
                      onClick={() => speak(s.sentence)}
                      className="p-1.5 text-slate-400 hover:text-[#124F40] transition-colors shrink-0"
                      title="Listen to model sentence"
                    >
                      <Volume2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: STRESS & RHYTHM */}
        {activeTab === 'stress' && (
          <div className="space-y-6">
            {STRESS_DRILLS.map((drill) => (
              <div
                key={drill.id}
                className="bg-white dark:bg-[#112019] border border-slate-200 dark:border-[#24392F] rounded-3xl p-6 md:p-8 shadow-sm"
              >
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-purple-100 text-purple-800 dark:bg-purple-950 dark:text-purple-300">
                    Level {drill.level}
                  </span>
                  <h3 className="text-lg font-bold text-[#124F40] dark:text-[#5BB78D]">
                    {drill.title}
                  </h3>
                </div>

                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed mb-2">
                  {drill.explanation}
                </p>
                <p className="text-xs text-amber-900 dark:text-amber-200 font-urdu text-right mb-6">
                  {drill.urduExplanation}
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {drill.examples.map((ex, idx) => (
                    <div
                      key={idx}
                      className="p-4 rounded-2xl bg-slate-50 dark:bg-[#0B1510] border border-slate-200 dark:border-[#24392F] flex items-center justify-between gap-3"
                    >
                      <div>
                        <div className="text-sm font-bold text-slate-900 dark:text-slate-100 font-mono">
                          {ex.wordOrSentence}
                        </div>
                        {ex.ipa && <div className="text-xs text-slate-400 font-mono mt-0.5">{ex.ipa}</div>}
                        <div className="text-[11px] text-emerald-700 dark:text-emerald-400 font-semibold mt-1">
                          Emphasis on: <span className="underline">{ex.stressedPart}</span>
                        </div>
                      </div>

                      <button
                        onClick={() => speak(ex.audioText)}
                        className="w-9 h-9 rounded-xl bg-white dark:bg-neutral-800 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 flex items-center justify-center hover:bg-slate-100 transition-colors shadow-xs shrink-0"
                        title="Listen to native pronunciation"
                      >
                        <Volume2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* TAB 3: TONGUE TWISTERS */}
        {activeTab === 'twisters' && (
          <div className="space-y-6">
            <div className="flex items-center gap-2 overflow-x-auto pb-2">
              {TONGUE_TWISTERS.map((tt, idx) => (
                <button
                  key={tt.id}
                  onClick={() => setSelectedTwisterIndex(idx)}
                  className={cn(
                    'px-3.5 py-1.5 rounded-xl text-xs font-bold border transition-all whitespace-nowrap',
                    selectedTwisterIndex === idx
                      ? 'bg-[#124F40] text-white dark:bg-[#5BB78D] dark:text-[#0B1510]'
                      : 'bg-white dark:bg-[#112019] border-slate-200 dark:border-[#24392F] text-slate-600 dark:text-slate-400 hover:bg-slate-50'
                  )}
                >
                  {tt.level} ({tt.difficulty})
                </button>
              ))}
            </div>

            <div className="bg-white dark:bg-[#112019] border border-slate-200 dark:border-[#24392F] rounded-3xl p-6 md:p-8 shadow-sm text-center">
              <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300">
                Speed Target: {currentTwister.targetWpm} WPM • Focus: {currentTwister.focusSound}
              </span>

              <div className="my-6 text-xl md:text-2xl font-bold text-[#124F40] dark:text-[#5BB78D] leading-relaxed max-w-2xl mx-auto">
                "{currentTwister.text}"
              </div>

              <div className="text-xs text-amber-900 dark:text-amber-200 font-urdu mb-6">
                {currentTwister.urduNote}
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center justify-center gap-3">
                <button
                  onClick={() => speak(currentTwister.text, 0.85)}
                  className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-neutral-800 hover:bg-slate-200 text-slate-800 dark:text-slate-100 text-xs font-bold flex items-center gap-1.5 transition-colors"
                >
                  <Volume2 className="w-4 h-4" /> Listen to Model Audio
                </button>

                <button
                  onClick={() => startMicrophoneRecording(currentTwister.text)}
                  disabled={isRecording}
                  className={cn(
                    'px-5 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 shadow-md transition-all',
                    isRecording
                      ? 'bg-rose-500 text-white animate-pulse'
                      : 'bg-[#124F40] hover:bg-[#1a6e59] text-white dark:bg-[#5BB78D] dark:text-[#0B1510]'
                  )}
                >
                  <Mic className="w-4 h-4" />
                  {isRecording ? 'Listening to your speech...' : 'Record Your Speech'}
                </button>
              </div>

              {/* Live Transcript & Feedback */}
              {recognizedText && (
                <div className="mt-8 p-5 bg-slate-50 dark:bg-[#0B1510] border border-slate-200 dark:border-[#24392F] rounded-2xl text-left">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                      Transcript vs Target Comparison
                    </span>
                    {speakingWpm && (
                      <span className="text-xs font-bold text-emerald-700 dark:text-emerald-400">
                        Speed: {speakingWpm} Words/Min
                      </span>
                    )}
                  </div>

                  <div className="text-xs text-slate-500 mb-3">
                    Recognized: <span className="text-slate-800 dark:text-slate-200 italic">"{recognizedText}"</span>
                  </div>

                  {/* Word-level colored diff */}
                  <div className="flex flex-wrap gap-1.5">
                    {comparisonWords.map((cw, idx) => (
                      <span
                        key={idx}
                        className={cn(
                          'px-2 py-0.5 rounded text-xs font-bold font-mono',
                          cw.status === 'matched' ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300' : 'bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300'
                        )}
                      >
                        {cw.word}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* TAB 4 & 5: REPEAT AFTER ME / SHADOWING */}
        {(activeTab === 'repeat' || activeTab === 'shadow') && (
          <div className="space-y-6">
            <div className="flex items-center gap-2 overflow-x-auto pb-2">
              {SHADOWING_SENTENCES.map((sent, idx) => (
                <button
                  key={sent.id}
                  onClick={() => setActiveSentenceIndex(idx)}
                  className={cn(
                    'px-3.5 py-1.5 rounded-xl text-xs font-bold border transition-all whitespace-nowrap',
                    activeSentenceIndex === idx
                      ? 'bg-[#124F40] text-white dark:bg-[#5BB78D] dark:text-[#0B1510]'
                      : 'bg-white dark:bg-[#112019] border-slate-200 dark:border-[#24392F] text-slate-600 dark:text-slate-400'
                  )}
                >
                  {sent.level}: {sent.topic}
                </button>
              ))}
            </div>

            <div className="bg-white dark:bg-[#112019] border border-slate-200 dark:border-[#24392F] rounded-3xl p-6 md:p-8 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <span className="px-2.5 py-0.5 rounded-md text-xs font-bold bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                  Level {currentSentence.level} • {currentSentence.topic}
                </span>
                <span className="text-xs text-slate-400">Target Pace: {currentSentence.targetWpm} WPM</span>
              </div>

              <div className="text-xl md:text-2xl font-bold text-slate-900 dark:text-slate-100 leading-relaxed mb-3">
                "{currentSentence.sentence}"
              </div>

              <div className="text-xs text-amber-900 dark:text-amber-200 font-urdu mb-6 text-right">
                {currentSentence.urduTranslation}
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <button
                  onClick={() => speak(currentSentence.sentence, activeTab === 'shadow' ? 1.0 : 0.85)}
                  className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-neutral-800 hover:bg-slate-200 text-slate-800 dark:text-slate-100 text-xs font-bold flex items-center gap-1.5 transition-colors"
                >
                  <Volume2 className="w-4 h-4" /> Listen to Native Model
                </button>

                <button
                  onClick={() => startMicrophoneRecording(currentSentence.sentence)}
                  disabled={isRecording}
                  className={cn(
                    'px-5 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 shadow-md transition-all',
                    isRecording
                      ? 'bg-rose-500 text-white animate-pulse'
                      : 'bg-[#124F40] hover:bg-[#1a6e59] text-white dark:bg-[#5BB78D] dark:text-[#0B1510]'
                  )}
                >
                  <Mic className="w-4 h-4" />
                  {isRecording ? 'Listening...' : 'Speak & Compare Words'}
                </button>
              </div>

              {recognizedText && (
                <div className="mt-8 p-5 bg-slate-50 dark:bg-[#0B1510] border border-slate-200 dark:border-[#24392F] rounded-2xl">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                      Acoustic & Lexical Comparison
                    </span>
                    {speakingWpm && (
                      <span className="text-xs font-bold text-emerald-700 dark:text-emerald-400">
                        Speaking Pace: {speakingWpm} WPM
                      </span>
                    )}
                  </div>

                  <div className="text-xs text-slate-500 mb-3">
                    Recognized Speech: <span className="text-slate-800 dark:text-slate-200 italic">"{recognizedText}"</span>
                  </div>

                  <div className="flex flex-wrap gap-1.5">
                    {comparisonWords.map((cw, idx) => (
                      <span
                        key={idx}
                        className={cn(
                          'px-2 py-0.5 rounded text-xs font-bold font-mono',
                          cw.status === 'matched' ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300' : 'bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300'
                        )}
                      >
                        {cw.word}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* TAB 6: INTERACTIVE ROLE-PLAY CONVERSATIONS */}
        {activeTab === 'roleplay' && (
          <div className="space-y-6">
            {/* Scenario Selector */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2">
              {ROLE_PLAY_SCENARIOS.map((sc) => (
                <button
                  key={sc.id}
                  onClick={() => { setActiveScenario(sc); setCurrentTurnIndex(0); setRoleplayLogs([]); }}
                  className={cn(
                    'px-3.5 py-1.5 rounded-xl text-xs font-bold border transition-all whitespace-nowrap',
                    activeScenario.id === sc.id
                      ? 'bg-[#124F40] text-white dark:bg-[#5BB78D] dark:text-[#0B1510]'
                      : 'bg-white dark:bg-[#112019] border-slate-200 dark:border-[#24392F] text-slate-600 dark:text-slate-400'
                  )}
                >
                  {sc.title} ({sc.level})
                </button>
              ))}
            </div>

            <div className="bg-white dark:bg-[#112019] border border-slate-200 dark:border-[#24392F] rounded-3xl p-6 md:p-8 shadow-sm">
              <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-200 dark:border-[#24392F]">
                <div>
                  <div className="text-xs font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
                    Scenario: {activeScenario.title}
                  </div>
                  <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                    {activeScenario.scenarioContext} • Your Role: <span className="font-bold">{activeScenario.userRole}</span>
                  </div>
                </div>

                <button
                  onClick={handleRoleplayStart}
                  className="px-4 py-2 bg-emerald-50 text-[#124F40] dark:bg-emerald-950/60 dark:text-[#5BB78D] rounded-xl text-xs font-bold border border-emerald-300 hover:bg-emerald-100 transition-colors"
                >
                  Start Role-Play
                </button>
              </div>

              {/* Chat Dialogue History */}
              <div className="space-y-3 min-h-[200px] mb-6">
                {roleplayLogs.length === 0 && (
                  <div className="text-center py-10 text-slate-400 text-xs">
                    Click "Start Role-Play" above to have the app begin speaking its lines.
                  </div>
                )}

                {roleplayLogs.map((log, idx) => (
                  <div
                    key={idx}
                    className={cn(
                      'p-4 rounded-2xl max-w-lg text-xs leading-relaxed',
                      log.isUser
                        ? 'ml-auto bg-[#124F40] text-white rounded-br-none shadow-xs'
                        : 'bg-slate-100 dark:bg-[#0B1510] text-slate-800 dark:text-slate-200 rounded-bl-none border border-slate-200/80 dark:border-[#24392F]'
                    )}
                  >
                    <div className="font-bold text-[10px] uppercase tracking-wider opacity-75 mb-1">
                      {log.speaker}
                    </div>
                    <div>{log.text}</div>
                  </div>
                ))}
              </div>

              {/* Interactive Turn Prompt */}
              {activeScenario.turns[currentTurnIndex] && (
                <div className="p-4 bg-emerald-50/60 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-800/40 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-4">
                  <div>
                    <div className="text-[11px] font-bold uppercase tracking-wider text-emerald-800 dark:text-emerald-400">
                      {activeScenario.turns[currentTurnIndex].speaker === 'user' ? 'Your Turn to Speak:' : 'App Turn:'}
                    </div>
                    <div className="text-xs font-semibold text-slate-800 dark:text-slate-200 mt-1">
                      Target: "{activeScenario.turns[currentTurnIndex].expectedText}"
                    </div>
                    {activeScenario.turns[currentTurnIndex].feedbackTip && (
                      <div className="text-[11px] text-slate-500 italic mt-0.5">
                        Tip: {activeScenario.turns[currentTurnIndex].feedbackTip}
                      </div>
                    )}
                  </div>

                  {activeScenario.turns[currentTurnIndex].speaker === 'user' ? (
                    <button
                      onClick={handleUserRoleplaySpeak}
                      disabled={isRecording}
                      className={cn(
                        'px-5 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 shadow-md transition-all shrink-0',
                        isRecording ? 'bg-rose-500 text-white animate-pulse' : 'bg-[#124F40] text-white hover:bg-[#1a6e59]'
                      )}
                    >
                      <Mic className="w-4 h-4" />
                      {isRecording ? 'Listening...' : 'Speak Your Line'}
                    </button>
                  ) : (
                    <button
                      onClick={() => playRoleplayTurn(currentTurnIndex)}
                      className="px-4 py-2 bg-white dark:bg-neutral-800 text-slate-800 dark:text-slate-100 rounded-xl text-xs font-bold border flex items-center gap-1.5 shrink-0"
                    >
                      <Volume2 className="w-4 h-4" /> Replay App Audio
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
