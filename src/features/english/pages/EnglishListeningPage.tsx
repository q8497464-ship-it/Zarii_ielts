import React, { useState, useEffect } from 'react';
import { 
  Headphones, 
  Play, 
  Pause, 
  RotateCcw, 
  Volume2, 
  CheckCircle2, 
  XCircle, 
  ChevronRight, 
  ArrowLeft,
  Sparkles,
  FileText,
  HelpCircle,
  Clock,
  UserCheck
} from 'lucide-react';
import { skillsService } from '../services/skillsService';
import type { ListeningTrackItem, ListeningQuestion, DictationItem } from '../data/listeningLibrary';
import type { EnglishCEFRLevel } from '../../../types';
import { cn } from '../../../lib/utils';
import { evaluateTextAnswer } from '../utils/answerEvaluation';

export const EnglishListeningPage: React.FC = () => {
  const [selectedLevel, setSelectedLevel] = useState<EnglishCEFRLevel | 'ALL'>('ALL');
  const [activeTrack, setActiveTrack] = useState<ListeningTrackItem | null>(null);

  // Audio player state
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState<0.75 | 1.0 | 1.25>(1.0);
  const [activeLineIndex, setActiveLineIndex] = useState<number | null>(null);

  // Quiz & Dictation state
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, number>>({});
  const [dictationAnswers, setDictationAnswers] = useState<Record<string, string>>({});
  const [dictationEvaluations, setDictationEvaluations] = useState<Record<string, boolean>>({});
  const [showResults, setShowResults] = useState(false);
  const [showScript, setShowScript] = useState(false);
  const [showUrdu, setShowUrdu] = useState(false);

  const tracks = skillsService.getListeningLibrary(selectedLevel === 'ALL' ? undefined : selectedLevel);

  useEffect(() => {
    return () => {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  const handleOpenTrack = (track: ListeningTrackItem) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    setActiveTrack(track);
    setIsPlaying(false);
    setActiveLineIndex(null);
    setSelectedAnswers({});
    setDictationAnswers({});
    setDictationEvaluations({});
    setShowResults(false);
    setShowScript(false);
    setShowUrdu(false);
  };

  const handleCloseTrack = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    setIsPlaying(false);
    setActiveLineIndex(null);
    setActiveTrack(null);
  };

  const handleTogglePlay = () => {
    if (!activeTrack) return;
    if (!('speechSynthesis' in window)) {
      alert('Speech synthesis is not supported on this browser.');
      return;
    }

    if (isPlaying) {
      window.speechSynthesis.cancel();
      setIsPlaying(false);
      setActiveLineIndex(null);
      return;
    }

    window.speechSynthesis.cancel();
    setIsPlaying(true);
    let lineIdx = 0;

    const playNextLine = () => {
      if (!activeTrack || lineIdx >= activeTrack.script.length) {
        setIsPlaying(false);
        setActiveLineIndex(null);
        return;
      }

      const line = activeTrack.script[lineIdx];
      setActiveLineIndex(lineIdx);

      const utterance = new SpeechSynthesisUtterance(line.text);
      utterance.rate = playbackSpeed;
      utterance.lang = 'en-US';

      // Assign subtle pitch variation for different speakers
      if (line.speaker === activeTrack.speakers[0]?.name) {
        utterance.pitch = 1.1; // slightly higher pitch
      } else {
        utterance.pitch = 0.9; // slightly lower pitch
      }

      utterance.onend = () => {
        lineIdx++;
        playNextLine();
      };

      utterance.onerror = () => {
        setIsPlaying(false);
        setActiveLineIndex(null);
      };

      window.speechSynthesis.speak(utterance);
    };

    playNextLine();
  };

  const playSingleLineAudio = (text: string) => {
    if (!('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = playbackSpeed;
    utterance.lang = 'en-US';
    window.speechSynthesis.speak(utterance);
  };

  const handleAnswerSelect = (qId: string, optionIdx: number) => {
    if (showResults) return;
    setSelectedAnswers(prev => ({ ...prev, [qId]: optionIdx }));
  };

  const handleDictationChange = (dId: string, val: string) => {
    setDictationAnswers(prev => ({ ...prev, [dId]: val }));
  };

  const handleCheckQuiz = async () => {
    if (!activeTrack) return;
    setShowResults(true);

    // Evaluate Dictation items
    const dictEvals: Record<string, boolean> = {};
    activeTrack.dictationExercises.forEach(d => {
      const userTyped = dictationAnswers[d.id] || '';
      const evalRes = evaluateTextAnswer(userTyped, d.targetText);
      dictEvals[d.id] = evalRes.isCorrect;
    });
    setDictationEvaluations(dictEvals);

    // Log MCQ mistakes to db.mistakes
    for (const q of activeTrack.comprehensionQuestions) {
      const userChoice = selectedAnswers[q.id];
      if (userChoice !== q.correctIndex) {
        await skillsService.logSkillMistake(
          q.id,
          'listening',
          q.question,
          userChoice !== undefined ? q.options[userChoice] : 'Unanswered',
          q.options[q.correctIndex],
          q.explanation
        );
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#F7FAF8] dark:bg-[#0B1510] text-slate-800 dark:text-slate-100 p-4 md:p-8">
      <div className="max-w-5xl mx-auto mb-8">
        {/* Header */}
        <div className="pb-6 border-b border-emerald-900/10 dark:border-emerald-500/20 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-100 dark:bg-emerald-950/60 text-[#124F40] dark:text-[#5BB78D]">
                General English
              </span>
              <span className="text-xs text-slate-500 dark:text-slate-400">Audio Comprehension & Dictation</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-extrabold text-[#124F40] dark:text-[#5BB78D] tracking-tight">
              Listening Studio
            </h1>
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
              Listen to authentic dialogues and short talks with native speech synthesis, speed controls, and dictation exercises.
            </p>
          </div>

          {/* Level Filter */}
          {!activeTrack && (
            <div className="flex items-center gap-1 overflow-x-auto p-1 bg-slate-200/60 dark:bg-[#112019] rounded-xl border border-slate-300/40 dark:border-[#24392F]">
              {(['ALL', 'A1', 'A2', 'B1', 'B2', 'C1'] as const).map(lvl => (
                <button
                  key={lvl}
                  onClick={() => setSelectedLevel(lvl)}
                  className={cn(
                    'px-3 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap',
                    selectedLevel === lvl
                      ? 'bg-[#124F40] text-white dark:bg-[#5BB78D] dark:text-[#0B1510] shadow-xs'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
                  )}
                >
                  {lvl === 'ALL' ? 'All' : lvl}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="max-w-5xl mx-auto">
        {!activeTrack ? (
          /* Tracks Catalog */
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {tracks.map(track => (
              <div
                key={track.id}
                onClick={() => handleOpenTrack(track)}
                className="group cursor-pointer bg-white dark:bg-[#112019] border border-slate-200/80 dark:border-[#24392F] hover:border-[#5BB78D] rounded-2xl p-5 shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="px-2 py-0.5 rounded-md text-[11px] font-extrabold bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                      Level {track.level}
                    </span>
                    <span className="text-[11px] text-slate-400 font-medium">
                      {track.type} • {track.durationMinutes} min
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 group-hover:text-[#124F40] dark:group-hover:text-[#5BB78D] transition-colors mb-1">
                    {track.title}
                  </h3>
                  <div className="text-xs text-slate-500 dark:text-slate-400 mb-3">
                    Topic: {track.topic} • {track.speakers.map(s => s.name).join(' & ')}
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-100 dark:border-[#24392F] flex items-center justify-between text-xs text-slate-400">
                  <span>{track.comprehensionQuestions.length} Questions + Dictation</span>
                  <span className="flex items-center gap-1 font-semibold text-[#124F40] dark:text-[#5BB78D] group-hover:translate-x-0.5 transition-transform">
                    Listen Now <ChevronRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Active Listening Player View */
          <div className="bg-white dark:bg-[#112019] border border-slate-200 dark:border-[#24392F] rounded-3xl p-6 md:p-8 shadow-sm">
            {/* Top Bar */}
            <div className="flex flex-wrap items-center justify-between gap-4 pb-6 mb-6 border-b border-slate-200 dark:border-[#24392F]">
              <button
                onClick={handleCloseTrack}
                className="flex items-center gap-2 text-xs font-bold text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 bg-slate-100 dark:bg-slate-800/60 px-3 py-1.5 rounded-xl transition-colors"
              >
                <ArrowLeft className="w-4 h-4" /> Back to Tracks
              </button>

              <button
                onClick={() => setShowUrdu(!showUrdu)}
                className={cn(
                  'px-3 py-1.5 rounded-xl text-xs font-bold transition-colors border',
                  showUrdu
                    ? 'bg-amber-100 text-amber-900 border-amber-300 dark:bg-amber-950/60 dark:text-amber-200'
                    : 'border-slate-200 dark:border-[#24392F] text-slate-600 dark:text-slate-400 hover:bg-slate-50'
                )}
              >
                اردو خلاصہ
              </button>
            </div>

            {/* Track Info */}
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-1.5">
                <span className="px-2 py-0.5 rounded text-xs font-bold bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                  Level {activeTrack.level}
                </span>
                <span className="text-xs text-slate-400 font-medium">
                  {activeTrack.type} • {activeTrack.topic}
                </span>
              </div>
              <h2 className="text-2xl font-extrabold text-[#124F40] dark:text-[#5BB78D] tracking-tight">
                {activeTrack.title}
              </h2>

              {showUrdu && (
                <div className="mt-3 p-3 bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/40 rounded-xl text-xs font-urdu text-right text-amber-950 dark:text-amber-200">
                  {activeTrack.urduSummary}
                </div>
              )}
            </div>

            {/* Audio Controller Card */}
            <div className="p-6 bg-emerald-50/60 dark:bg-emerald-950/20 border border-emerald-200/70 dark:border-emerald-800/40 rounded-2xl mb-8 flex flex-col md:flex-row items-center justify-between gap-5">
              <div className="flex items-center gap-4">
                <button
                  onClick={handleTogglePlay}
                  className="w-14 h-14 rounded-full bg-[#124F40] hover:bg-[#1a6e59] text-white dark:bg-[#5BB78D] dark:text-[#0B1510] flex items-center justify-center shadow-md transition-transform hover:scale-105 active:scale-95"
                >
                  {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6 ml-0.5" />}
                </button>

                <div>
                  <div className="text-xs font-bold uppercase tracking-wider text-emerald-800 dark:text-emerald-400">
                    {isPlaying ? 'Playing Audio...' : 'Ready to Play'}
                  </div>
                  <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                    Speakers: {activeTrack.speakers.map(s => `${s.name} (${s.role})`).join(' • ')}
                  </div>
                </div>
              </div>

              {/* Speed Buttons */}
              <div className="flex items-center gap-1.5 bg-white dark:bg-[#112019] border border-slate-200 dark:border-[#24392F] p-1 rounded-xl text-xs font-bold">
                {[0.75, 1.0, 1.25].map(spd => (
                  <button
                    key={spd}
                    onClick={() => setPlaybackSpeed(spd as any)}
                    className={cn(
                      'px-2.5 py-1 rounded-lg transition-colors',
                      playbackSpeed === spd
                        ? 'bg-[#124F40] text-white dark:bg-[#5BB78D] dark:text-[#0B1510]'
                        : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
                    )}
                  >
                    {spd}x
                  </button>
                ))}
              </div>
            </div>

            {/* Optional Show Script Toggle */}
            <div className="mb-8">
              <button
                onClick={() => setShowScript(!showScript)}
                className="flex items-center gap-2 text-xs font-bold text-[#124F40] dark:text-[#5BB78D] hover:underline"
              >
                <FileText className="w-4 h-4" /> {showScript ? 'Hide Full Script' : 'Reveal Full Audio Script'}
              </button>

              {showScript && (
                <div className="mt-4 p-5 bg-slate-50 dark:bg-[#0B1510] border border-slate-200 dark:border-[#24392F] rounded-2xl space-y-3">
                  {activeTrack.script.map((line, idx) => (
                    <div
                      key={idx}
                      className={cn(
                        'p-3 rounded-xl transition-all flex items-start justify-between gap-3',
                        activeLineIndex === idx ? 'bg-emerald-100/70 dark:bg-emerald-950/60 font-semibold border border-emerald-300' : 'bg-white dark:bg-[#112019]'
                      )}
                    >
                      <div>
                        <span className="text-xs font-extrabold text-[#124F40] dark:text-[#5BB78D] mr-2">
                          {line.speaker}:
                        </span>
                        <span className="text-xs text-slate-800 dark:text-slate-200 leading-relaxed">
                          {line.text}
                        </span>
                      </div>

                      <button
                        onClick={() => playSingleLineAudio(line.text)}
                        className="p-1 text-slate-400 hover:text-[#124F40] transition-colors shrink-0"
                        title="Replay this line"
                      >
                        <Volume2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Dictation Exercise Challenge */}
            {activeTrack.dictationExercises.length > 0 && (
              <div className="mb-8 p-5 bg-sky-50/50 dark:bg-sky-950/20 border border-sky-200/60 dark:border-sky-800/40 rounded-2xl">
                <div className="flex items-center gap-2 mb-3">
                  <Sparkles className="w-4 h-4 text-sky-600 dark:text-sky-400" />
                  <h3 className="text-sm font-bold text-sky-950 dark:text-sky-200">
                    Dictation Challenge: Listen and Type the Missing Word
                  </h3>
                </div>

                <div className="space-y-4">
                  {activeTrack.dictationExercises.map((d, dIdx) => (
                    <div key={d.id} className="space-y-2">
                      <div className="flex items-center gap-2 text-xs font-medium text-slate-700 dark:text-slate-300">
                        <span>{d.prompt}</span>
                        <button
                          onClick={() => playSingleLineAudio(d.audioClipText)}
                          className="px-2 py-0.5 bg-sky-100 hover:bg-sky-200 dark:bg-sky-900 rounded-md text-[11px] font-bold text-sky-800 dark:text-sky-200 flex items-center gap-1"
                        >
                          <Volume2 className="w-3 h-3" /> Replay Clip
                        </button>
                      </div>

                      <div className="flex items-center gap-3">
                        <input
                          type="text"
                          placeholder="Type word here..."
                          value={dictationAnswers[d.id] || ''}
                          onChange={e => handleDictationChange(d.id, e.target.value)}
                          disabled={showResults}
                          className="max-w-xs px-3 py-1.5 bg-white dark:bg-[#112019] border border-slate-300 dark:border-[#24392F] rounded-xl text-xs font-mono focus:outline-none focus:ring-2 focus:ring-[#5BB78D]"
                        />

                        {showResults && (
                          <div className="text-xs font-bold">
                            {dictationEvaluations[d.id] ? (
                              <span className="text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                                <CheckCircle2 className="w-3.5 h-3.5" /> Correct! ({d.targetText})
                              </span>
                            ) : (
                              <span className="text-rose-600 dark:text-rose-400 flex items-center gap-1">
                                <XCircle className="w-3.5 h-3.5" /> Expected: "{d.targetText}"
                              </span>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Comprehension Questions */}
            <div className="space-y-6 pt-6 border-t border-slate-200 dark:border-[#24392F]">
              <h3 className="text-base font-bold text-[#124F40] dark:text-[#5BB78D]">
                Comprehension Questions ({activeTrack.comprehensionQuestions.length})
              </h3>

              {activeTrack.comprehensionQuestions.map((q, qIdx) => {
                const chosenOpt = selectedAnswers[q.id];
                const isCorrect = chosenOpt === q.correctIndex;

                return (
                  <div
                    key={q.id}
                    className={cn(
                      'p-5 rounded-2xl border transition-all',
                      showResults
                        ? isCorrect
                          ? 'bg-emerald-50/50 dark:bg-emerald-950/20 border-emerald-300'
                          : 'bg-rose-50/50 dark:bg-rose-950/20 border-rose-300'
                        : 'bg-slate-50 dark:bg-[#0B1510] border-slate-200 dark:border-[#24392F]'
                    )}
                  >
                    <div className="flex items-start gap-2.5 mb-3">
                      <span className="w-6 h-6 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 font-bold text-xs flex items-center justify-center shrink-0">
                        {qIdx + 1}
                      </span>
                      <div className="font-semibold text-sm text-slate-800 dark:text-slate-100">
                        {q.question}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5 ml-8">
                      {q.options.map((opt, optIdx) => {
                        const isChosen = chosenOpt === optIdx;
                        const isAnswerCorrect = q.correctIndex === optIdx;

                        return (
                          <button
                            key={optIdx}
                            onClick={() => handleAnswerSelect(q.id, optIdx)}
                            disabled={showResults}
                            className={cn(
                              'text-left p-3 rounded-xl text-xs font-medium border transition-all flex items-start gap-2',
                              isChosen && !showResults && 'bg-[#124F40]/10 border-[#124F40] dark:bg-[#5BB78D]/20 dark:border-[#5BB78D] font-bold',
                              showResults && isAnswerCorrect && 'bg-emerald-100 dark:bg-emerald-900/60 border-emerald-500 font-bold text-emerald-900 dark:text-emerald-100',
                              showResults && isChosen && !isAnswerCorrect && 'bg-rose-100 dark:bg-rose-900/60 border-rose-500 font-bold text-rose-900 dark:text-rose-100',
                              !isChosen && !showResults && 'bg-white dark:bg-[#112019] border-slate-200 dark:border-[#24392F] hover:bg-slate-100 dark:hover:bg-slate-800'
                            )}
                          >
                            <span className="font-bold text-[11px] text-slate-400 mt-0.5">
                              {String.fromCharCode(65 + optIdx)}.
                            </span>
                            <span>{opt}</span>
                          </button>
                        );
                      })}
                    </div>

                    {showResults && (
                      <div className="mt-3 ml-8 text-xs p-3 rounded-xl bg-white/80 dark:bg-[#112019]/80 border border-slate-200 dark:border-slate-800">
                        <div className={cn('font-bold mb-1', isCorrect ? 'text-emerald-700' : 'text-rose-700')}>
                          {isCorrect ? '✓ Correct' : '✕ Explanation'}
                        </div>
                        <div className="text-slate-600 dark:text-slate-400">{q.explanation}</div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Check Answers Button */}
            <div className="mt-8 pt-6 border-t border-slate-200 dark:border-[#24392F] flex items-center justify-between">
              {!showResults ? (
                <button
                  onClick={handleCheckQuiz}
                  disabled={Object.keys(selectedAnswers).length < activeTrack.comprehensionQuestions.length}
                  className="px-6 py-2.5 rounded-xl bg-[#124F40] hover:bg-[#1a6e59] text-white dark:bg-[#5BB78D] dark:text-[#0B1510] text-xs font-bold transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-xs"
                >
                  Check Answers ({Object.keys(selectedAnswers).length}/{activeTrack.comprehensionQuestions.length})
                </button>
              ) : (
                <div className="w-full flex items-center justify-between">
                  <div className="text-xs font-bold text-emerald-700 dark:text-emerald-400 flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" /> Listening task verified!
                  </div>
                  <button
                    onClick={handleCloseTrack}
                    className="px-5 py-2 rounded-xl bg-[#124F40] text-white dark:bg-[#5BB78D] dark:text-[#0B1510] text-xs font-bold transition-colors"
                  >
                    Choose Another Track
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
