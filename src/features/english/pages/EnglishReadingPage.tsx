import React, { useState, useEffect, useRef } from 'react';
import { 
  BookOpen, 
  Flame, 
  Bookmark, 
  Volume2, 
  VolumeX, 
  Play, 
  Pause, 
  RotateCcw, 
  CheckCircle2, 
  AlertCircle, 
  ChevronRight, 
  ArrowLeft, 
  Search, 
  Sparkles,
  HelpCircle,
  ExternalLink
} from 'lucide-react';
import { skillsService, type ReadingStreakData } from '../services/skillsService';
import type { GradedReader, GradedReaderQuestion, VocabularyHighlight } from '../data/readingLibrary';
import type { EnglishCEFRLevel } from '../../../types';
import { cn } from '../../../lib/utils';
import { playPronunciation } from '../../dictionary/dictionaryService';

export const EnglishReadingPage: React.FC = () => {
  const [selectedLevel, setSelectedLevel] = useState<EnglishCEFRLevel | 'ALL'>('ALL');
  const [selectedGenre, setSelectedGenre] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [streakData, setStreakData] = useState<ReadingStreakData>(() => skillsService.getReadingStreak());
  const [activeReader, setActiveReader] = useState<GradedReader | null>(null);

  // Reader detail state
  const [fontSize, setFontSize] = useState<'normal' | 'large' | 'xlarge'>('normal');
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [activeSentenceIndex, setActiveSentenceIndex] = useState<number | null>(null);
  const [selectedVocab, setSelectedVocab] = useState<VocabularyHighlight | null>(null);
  const [vocabSaved, setVocabSaved] = useState(false);
  const [showUrdu, setShowUrdu] = useState(false);

  // Comprehension questions state
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, number>>({});
  const [showResults, setShowResults] = useState(false);
  const [readerCompleted, setReaderCompleted] = useState(false);

  const sentencesRef = useRef<string[]>([]);

  useEffect(() => {
    setStreakData(skillsService.getReadingStreak());
  }, []);

  const readers = skillsService.getReadingLibrary(
    selectedLevel === 'ALL' ? undefined : selectedLevel,
    selectedGenre === 'ALL' ? undefined : selectedGenre
  ).filter(r => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return r.title.toLowerCase().includes(q) || r.topic.toLowerCase().includes(q) || r.summary.toLowerCase().includes(q);
  });

  const handleOpenReader = (reader: GradedReader) => {
    setActiveReader(reader);
    setSelectedAnswers({});
    setShowResults(false);
    setReaderCompleted(false);
    setIsPlayingAudio(false);
    setActiveSentenceIndex(null);
    setSelectedVocab(null);
    setVocabSaved(false);
    setShowUrdu(false);

    // Split paragraphs into sentences for TTS highlighting
    const allSentences: string[] = [];
    reader.paragraphs.forEach(p => {
      const s = p.match(/[^.!?]+[.!?]+/g) || [p];
      s.forEach(sent => allSentences.push(sent.trim()));
    });
    sentencesRef.current = allSentences;
  };

  const handleCloseReader = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    setIsPlayingAudio(false);
    setActiveSentenceIndex(null);
    setActiveReader(null);
  };

  const handleToggleAudio = () => {
    if (!('speechSynthesis' in window)) {
      alert('Speech synthesis is not supported on this browser.');
      return;
    }

    if (isPlayingAudio) {
      window.speechSynthesis.cancel();
      setIsPlayingAudio(false);
      setActiveSentenceIndex(null);
      return;
    }

    window.speechSynthesis.cancel();
    const sentences = sentencesRef.current;
    if (sentences.length === 0) return;

    setIsPlayingAudio(true);
    let currentIndex = 0;

    const speakNextSentence = () => {
      if (currentIndex >= sentences.length) {
        setIsPlayingAudio(false);
        setActiveSentenceIndex(null);
        return;
      }

      setActiveSentenceIndex(currentIndex);
      const utterance = new SpeechSynthesisUtterance(sentences[currentIndex]);
      utterance.rate = selectedLevel === 'A1' || selectedLevel === 'A2' ? 0.85 : 0.95;
      utterance.lang = 'en-US';

      utterance.onend = () => {
        currentIndex++;
        speakNextSentence();
      };

      utterance.onerror = () => {
        setIsPlayingAudio(false);
        setActiveSentenceIndex(null);
      };

      window.speechSynthesis.speak(utterance);
    };

    speakNextSentence();
  };

  const handleAnswerSelect = (questionId: string, optionIndex: number) => {
    if (showResults) return;
    setSelectedAnswers(prev => ({ ...prev, [questionId]: optionIndex }));
  };

  const handleSubmitQuiz = async () => {
    if (!activeReader) return;
    setShowResults(true);

    let correctCount = 0;
    for (const q of activeReader.questions) {
      const userChoice = selectedAnswers[q.id];
      if (userChoice === q.correctIndex) {
        correctCount++;
      } else {
        // Log mistake
        await skillsService.logSkillMistake(
          q.id,
          'reading',
          q.question,
          userChoice !== undefined ? q.options[userChoice] : 'Unanswered',
          q.options[q.correctIndex],
          q.explanation
        );
      }
    }

    if (correctCount >= Math.ceil(activeReader.questions.length * 0.6)) {
      const updatedStreak = skillsService.recordReadingCompleted(activeReader.id);
      setStreakData(updatedStreak);
      setReaderCompleted(true);
    }
  };

  const handleSaveVocab = async (vocab: VocabularyHighlight) => {
    await skillsService.saveWordToBank(vocab.word, vocab.pos as any, vocab.definition, vocab.urdu);
    setVocabSaved(true);
    setStreakData(skillsService.getReadingStreak());
  };

  return (
    <div className="min-h-screen bg-[#F7FAF8] dark:bg-[#0B1510] text-slate-800 dark:text-slate-100 p-4 md:p-8">
      {/* 1. Header with Stats */}
      <div className="max-w-6xl mx-auto mb-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-emerald-900/10 dark:border-emerald-500/20">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-100 dark:bg-emerald-950/60 text-[#124F40] dark:text-[#5BB78D]">
                General English
              </span>
              <span className="text-xs text-slate-500 dark:text-slate-400">CEFR Graded Readers</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-extrabold text-[#124F40] dark:text-[#5BB78D] tracking-tight">
              Reading Library
            </h1>
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
              Original graded stories, dialogues, news reports, and articles from A1 to C1 with audio narration and vocabulary highlights.
            </p>
          </div>

          {/* Stats Bar */}
          <div className="flex items-center gap-3 bg-white dark:bg-[#112019] border border-emerald-900/10 dark:border-[#24392F] p-3 rounded-2xl shadow-xs">
            <div className="flex items-center gap-2 px-3 py-1.5 bg-amber-50 dark:bg-amber-950/40 border border-amber-200/60 dark:border-amber-800/40 rounded-xl text-amber-700 dark:text-amber-300">
              <Flame className="w-5 h-5 text-amber-500 animate-pulse" />
              <div>
                <div className="text-[10px] uppercase font-bold tracking-wider leading-none">Streak</div>
                <div className="text-base font-black">{streakData.currentStreak} Days</div>
              </div>
            </div>

            <div className="flex items-center gap-2 px-3 py-1.5 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200/60 dark:border-emerald-800/40 rounded-xl text-emerald-700 dark:text-emerald-300">
              <BookOpen className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
              <div>
                <div className="text-[10px] uppercase font-bold tracking-wider leading-none">Completed</div>
                <div className="text-base font-black">{streakData.totalCompleted}</div>
              </div>
            </div>

            <div className="flex items-center gap-2 px-3 py-1.5 bg-sky-50 dark:bg-sky-950/40 border border-sky-200/60 dark:border-sky-800/40 rounded-xl text-sky-700 dark:text-sky-300">
              <Bookmark className="w-5 h-5 text-sky-600 dark:text-sky-400" />
              <div>
                <div className="text-[10px] uppercase font-bold tracking-wider leading-none">Words Saved</div>
                <div className="text-base font-black">{streakData.wordsSavedCount}</div>
              </div>
            </div>
          </div>
        </div>

        {/* 2. Filters & Search */}
        {!activeReader && (
          <div className="space-y-4 mt-6">
            <div className="flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
              {/* Level Segmented Filter */}
              <div className="flex items-center gap-1 overflow-x-auto pb-1 p-1 bg-slate-200/60 dark:bg-[#112019] rounded-xl border border-slate-300/40 dark:border-[#24392F]">
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
                    {lvl === 'ALL' ? 'All Levels' : lvl}
                  </button>
                ))}
              </div>

              {/* Search Bar */}
              <div className="relative min-w-[260px]">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search readers by topic or title..."
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 bg-white dark:bg-[#112019] border border-slate-200 dark:border-[#24392F] rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-[#5BB78D]"
                />
              </div>
            </div>

            {/* Genre Filter Chips */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
              <span className="text-slate-400 font-medium">Format:</span>
              {['ALL', 'story', 'dialogue', 'news', 'email', 'article'].map(g => (
                <button
                  key={g}
                  onClick={() => setSelectedGenre(g)}
                  className={cn(
                    'px-2.5 py-1 rounded-lg border capitalize font-medium transition-colors',
                    selectedGenre === g
                      ? 'bg-emerald-50 dark:bg-emerald-950/60 border-emerald-500 text-[#124F40] dark:text-[#5BB78D] font-bold'
                      : 'border-slate-200 dark:border-[#24392F] text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                  )}
                >
                  {g === 'ALL' ? 'All Formats' : g}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* 3. Main Content: Catalog OR Active Reader View */}
      <div className="max-w-6xl mx-auto">
        {!activeReader ? (
          /* Catalog Grid */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {readers.map(reader => (
              <div
                key={reader.id}
                onClick={() => handleOpenReader(reader)}
                className="group cursor-pointer bg-white dark:bg-[#112019] border border-slate-200/80 dark:border-[#24392F] hover:border-[#5BB78D] dark:hover:border-[#5BB78D] rounded-2xl p-5 shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className={cn(
                      'px-2 py-0.5 rounded-md text-[11px] font-extrabold',
                      reader.level === 'A1' ? 'bg-sky-100 text-sky-800 dark:bg-sky-950/60 dark:text-sky-300' :
                      reader.level === 'A2' ? 'bg-teal-100 text-teal-800 dark:bg-teal-950/60 dark:text-teal-300' :
                      reader.level === 'B1' ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300' :
                      reader.level === 'B2' ? 'bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300' :
                      'bg-purple-100 text-purple-800 dark:bg-purple-950/60 dark:text-purple-300'
                    )}>
                      Level {reader.level}
                    </span>

                    <span className="text-[11px] font-medium text-slate-400 capitalize">
                      {reader.genre} • {reader.durationMinutes} min
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 group-hover:text-[#124F40] dark:group-hover:text-[#5BB78D] transition-colors line-clamp-1 mb-1.5">
                    {reader.title}
                  </h3>

                  <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed mb-4">
                    {reader.summary}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-100 dark:border-[#24392F] flex items-center justify-between text-xs text-slate-400">
                  <span>{reader.wordCount} words</span>
                  <span className="flex items-center gap-1 font-semibold text-[#124F40] dark:text-[#5BB78D] group-hover:translate-x-0.5 transition-transform">
                    Read & Listen <ChevronRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            ))}

            {readers.length === 0 && (
              <div className="col-span-full py-16 text-center text-slate-400">
                <BookOpen className="w-12 h-12 mx-auto mb-3 opacity-40" />
                <p className="text-sm font-semibold">No graded readers match your current filters.</p>
                <button
                  onClick={() => { setSelectedLevel('ALL'); setSelectedGenre('ALL'); setSearchQuery(''); }}
                  className="mt-3 text-xs text-[#124F40] dark:text-[#5BB78D] font-bold hover:underline"
                >
                  Reset all filters
                </button>
              </div>
            )}
          </div>
        ) : (
          /* Dedicated Reader Workspace */
          <div className="bg-white dark:bg-[#112019] border border-slate-200 dark:border-[#24392F] rounded-3xl p-6 md:p-10 shadow-sm">
            {/* Top Bar inside reader */}
            <div className="flex flex-wrap items-center justify-between gap-4 pb-6 mb-6 border-b border-slate-200 dark:border-[#24392F]">
              <button
                onClick={handleCloseReader}
                className="flex items-center gap-2 text-xs font-bold text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 bg-slate-100 dark:bg-slate-800/60 px-3 py-1.5 rounded-xl transition-colors"
              >
                <ArrowLeft className="w-4 h-4" /> Back to Library
              </button>

              <div className="flex items-center gap-3">
                {/* Font Size Selector */}
                <div className="flex items-center bg-slate-100 dark:bg-[#0B1510] rounded-xl p-1 text-xs">
                  <button
                    onClick={() => setFontSize('normal')}
                    className={cn('px-2.5 py-1 rounded-lg font-bold', fontSize === 'normal' && 'bg-white dark:bg-[#24392F] shadow-xs')}
                    title="Normal text size"
                  >
                    A
                  </button>
                  <button
                    onClick={() => setFontSize('large')}
                    className={cn('px-2.5 py-1 rounded-lg font-bold text-sm', fontSize === 'large' && 'bg-white dark:bg-[#24392F] shadow-xs')}
                    title="Large text size"
                  >
                    A+
                  </button>
                  <button
                    onClick={() => setFontSize('xlarge')}
                    className={cn('px-2.5 py-1 rounded-lg font-bold text-base', fontSize === 'xlarge' && 'bg-white dark:bg-[#24392F] shadow-xs')}
                    title="Extra large text size"
                  >
                    A++
                  </button>
                </div>

                {/* Audio Listen Mode Toggle */}
                <button
                  onClick={handleToggleAudio}
                  className={cn(
                    'flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-bold transition-all',
                    isPlayingAudio
                      ? 'bg-rose-100 text-rose-800 dark:bg-rose-950/60 dark:text-rose-300 border border-rose-300'
                      : 'bg-emerald-50 text-[#124F40] dark:bg-emerald-950/60 dark:text-[#5BB78D] border border-emerald-300/60 hover:bg-emerald-100'
                  )}
                >
                  {isPlayingAudio ? (
                    <>
                      <Pause className="w-4 h-4" /> Pause Audio
                    </>
                  ) : (
                    <>
                      <Volume2 className="w-4 h-4" /> Listen Mode
                    </>
                  )}
                </button>

                {/* Urdu summary toggle */}
                <button
                  onClick={() => setShowUrdu(!showUrdu)}
                  className={cn(
                    'px-3 py-1.5 rounded-xl text-xs font-bold transition-colors border',
                    showUrdu
                      ? 'bg-amber-100 text-amber-900 border-amber-300 dark:bg-amber-950/60 dark:text-amber-200'
                      : 'border-slate-200 dark:border-[#24392F] text-slate-600 dark:text-slate-400 hover:bg-slate-50'
                  )}
                >
                  اردو میں دیکھیں
                </button>
              </div>
            </div>

            {/* Title & Metadata */}
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-2">
                <span className="px-2.5 py-0.5 rounded-md text-xs font-extrabold bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                  Level {activeReader.level}
                </span>
                <span className="text-xs text-slate-400 capitalize font-medium">
                  {activeReader.genre} • {activeReader.wordCount} words
                </span>
              </div>
              <h2 className="text-2xl md:text-3xl font-extrabold text-[#124F40] dark:text-[#5BB78D] tracking-tight">
                {activeReader.title}
              </h2>

              {showUrdu && (
                <div className="mt-3 p-3.5 bg-amber-50/70 dark:bg-amber-950/30 border border-amber-200/60 dark:border-amber-800/40 rounded-2xl text-xs font-medium text-amber-950 dark:text-amber-200 text-right leading-relaxed font-urdu">
                  {activeReader.urduSummary}
                </div>
              )}
            </div>

            {/* Story Paragraphs with Text Size and Sentence Highlighting */}
            <div className={cn(
              'space-y-4 text-slate-800 dark:text-slate-200 leading-relaxed font-serif transition-all',
              fontSize === 'normal' ? 'text-base md:text-lg' :
              fontSize === 'large' ? 'text-lg md:text-xl leading-loose' :
              'text-xl md:text-2xl leading-loose'
            )}>
              {activeReader.paragraphs.map((p, pIdx) => (
                <p key={pIdx} className="tracking-wide">
                  {p}
                </p>
              ))}
            </div>

            {/* Vocabulary Highlights Row */}
            <div className="mt-8 pt-6 border-t border-slate-200 dark:border-[#24392F]">
              <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-500" /> Key Vocabulary in this Reader
              </div>
              <div className="flex flex-wrap gap-2">
                {activeReader.vocabularyHighlights.map(v => (
                  <button
                    key={v.word}
                    onClick={() => { setSelectedVocab(v); setVocabSaved(false); }}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 dark:bg-slate-800/80 hover:bg-emerald-50 dark:hover:bg-emerald-950/40 rounded-xl text-xs font-semibold text-slate-800 dark:text-slate-200 border border-slate-200/70 dark:border-[#24392F] transition-colors"
                  >
                    <span>{v.word}</span>
                    <span className="text-[10px] text-slate-400 italic">({v.pos})</span>
                  </button>
                ))}
              </div>

              {/* Vocab popup drawer */}
              {selectedVocab && (
                <div className="mt-4 p-4 bg-emerald-50/70 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800/60 rounded-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-extrabold text-[#124F40] dark:text-[#5BB78D]">{selectedVocab.word}</span>
                      <span className="text-xs text-slate-500 italic">({selectedVocab.pos})</span>
                      <button
                        onClick={() => playPronunciation(selectedVocab.word, { lang: 'en-US', speed: 1.0 })}
                        className="p-1 text-slate-500 hover:text-[#124F40] transition-colors"
                        title="Listen to pronunciation"
                      >
                        <Volume2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    <div className="text-xs text-slate-700 dark:text-slate-300 mt-1">{selectedVocab.definition}</div>
                    <div className="text-xs text-emerald-800 dark:text-emerald-300 font-urdu mt-0.5">{selectedVocab.urdu}</div>
                  </div>

                  <button
                    onClick={() => handleSaveVocab(selectedVocab)}
                    disabled={vocabSaved}
                    className={cn(
                      'px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 shrink-0',
                      vocabSaved
                        ? 'bg-emerald-600 text-white'
                        : 'bg-[#124F40] hover:bg-[#1a6e59] text-white dark:bg-[#5BB78D] dark:text-[#0B1510]'
                    )}
                  >
                    {vocabSaved ? (
                      <>
                        <CheckCircle2 className="w-3.5 h-3.5" /> Saved to Word Bank!
                      </>
                    ) : (
                      <>
                        <Bookmark className="w-3.5 h-3.5" /> Save to Word Bank
                      </>
                    )}
                  </button>
                </div>
              )}
            </div>

            {/* 4. Comprehension Questions Section */}
            <div className="mt-10 pt-8 border-t border-slate-200 dark:border-[#24392F]">
              <div className="flex items-center justify-between gap-4 mb-6">
                <div>
                  <h3 className="text-lg font-bold text-[#124F40] dark:text-[#5BB78D]">
                    Comprehension Questions ({activeReader.questions.length})
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Test your understanding to earn streak credit and log insights.
                  </p>
                </div>
              </div>

              <div className="space-y-6">
                {activeReader.questions.map((q, qIdx) => {
                  const isSelected = selectedAnswers[q.id] !== undefined;
                  const chosenOpt = selectedAnswers[q.id];
                  const isCorrect = chosenOpt === q.correctIndex;

                  return (
                    <div
                      key={q.id}
                      className={cn(
                        'p-5 rounded-2xl border transition-all',
                        showResults
                          ? isCorrect
                            ? 'bg-emerald-50/50 dark:bg-emerald-950/20 border-emerald-300 dark:border-emerald-800'
                            : 'bg-rose-50/50 dark:bg-rose-950/20 border-rose-300 dark:border-rose-800'
                          : 'bg-slate-50 dark:bg-[#0B1510] border-slate-200 dark:border-[#24392F]'
                      )}
                    >
                      <div className="flex items-start gap-2.5 mb-3">
                        <span className="w-6 h-6 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                          {qIdx + 1}
                        </span>
                        <div className="font-semibold text-sm text-slate-800 dark:text-slate-100 leading-snug">
                          {q.question}
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5 ml-8">
                        {q.options.map((opt, optIdx) => {
                          const isOptionChosen = chosenOpt === optIdx;
                          const isOptionCorrect = q.correctIndex === optIdx;

                          return (
                            <button
                              key={optIdx}
                              onClick={() => handleAnswerSelect(q.id, optIdx)}
                              disabled={showResults}
                              className={cn(
                                'text-left p-3 rounded-xl text-xs font-medium border transition-all flex items-start gap-2',
                                isOptionChosen && !showResults && 'bg-[#124F40]/10 border-[#124F40] dark:bg-[#5BB78D]/20 dark:border-[#5BB78D] font-bold',
                                showResults && isOptionCorrect && 'bg-emerald-100 dark:bg-emerald-900/60 border-emerald-500 font-bold text-emerald-900 dark:text-emerald-100',
                                showResults && isOptionChosen && !isOptionCorrect && 'bg-rose-100 dark:bg-rose-900/60 border-rose-500 font-bold text-rose-900 dark:text-rose-100',
                                !isOptionChosen && !showResults && 'bg-white dark:bg-[#112019] border-slate-200 dark:border-[#24392F] hover:bg-slate-100 dark:hover:bg-slate-800'
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
                          <div className={cn('font-bold mb-1', isCorrect ? 'text-emerald-700 dark:text-emerald-300' : 'text-rose-700 dark:text-rose-300')}>
                            {isCorrect ? '✓ Correct Answer' : '✕ Not Quite'}
                          </div>
                          <div className="text-slate-600 dark:text-slate-400">{q.explanation}</div>
                          {q.urduExplanation && (
                            <div className="mt-1 text-slate-500 font-urdu text-[11px]">{q.urduExplanation}</div>
                          )}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Submit Quiz or Completion banner */}
              <div className="mt-8 pt-6 border-t border-slate-200 dark:border-[#24392F] flex items-center justify-between">
                {!showResults ? (
                  <button
                    onClick={handleSubmitQuiz}
                    disabled={Object.keys(selectedAnswers).length < activeReader.questions.length}
                    className="px-6 py-2.5 rounded-xl bg-[#124F40] hover:bg-[#1a6e59] text-white dark:bg-[#5BB78D] dark:text-[#0B1510] text-xs font-bold transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-xs"
                  >
                    Check Answers ({Object.keys(selectedAnswers).length}/{activeReader.questions.length})
                  </button>
                ) : (
                  <div className="w-full flex items-center justify-between">
                    <div className="flex items-center gap-2 text-xs font-bold text-emerald-700 dark:text-emerald-400">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                      Quiz Complete! Reading streak updated.
                    </div>

                    <button
                      onClick={handleCloseReader}
                      className="px-5 py-2 rounded-xl bg-[#124F40] text-white dark:bg-[#5BB78D] dark:text-[#0B1510] text-xs font-bold transition-colors"
                    >
                      Continue Reading
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
