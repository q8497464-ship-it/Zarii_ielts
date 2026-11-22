import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  Volume2,
  Bookmark,
  BookmarkCheck,
  Zap,
  Share2,
  Copy,
  AlertTriangle,
  ArrowLeft,
  ChevronDown,
  ChevronUp,
  Sparkles,
  Layers,
  BookOpen,
  Check,
  ExternalLink,
  Shield,
  Loader2,
  HelpCircle,
} from 'lucide-react';
import {
  dictionaryStore,
  playPronunciation,
  toggleFavoriteWord,
  isWordFavorite,
  saveToWordBank,
  type DictionaryEntry,
  type DictionarySense,
} from './dictionaryService';
import { PracticeWordModal } from './components/PracticeWordModal';
import { ReportWordModal } from './components/ReportWordModal';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import { useAppStore } from '../../store/useAppStore';

export function DictionaryEntryPage() {
  const { word } = useParams<{ word: string }>();
  const navigate = useNavigate();
  const { addToast, currentTrack, settings } = useAppStore();

  const [entry, setEntry] = useState<DictionaryEntry | null>(null);
  const [matchedForm, setMatchedForm] = useState<string | undefined>();
  const [isLoading, setIsLoading] = useState(true);
  const [isFavorite, setIsFavorite] = useState(false);
  const [audioSpeed, setAudioSpeed] = useState<1.0 | 0.75>(1.0);
  const [isPracticeOpen, setIsPracticeOpen] = useState(false);
  const [isReportOpen, setIsReportOpen] = useState(false);
  const [expandedSenses, setExpandedSenses] = useState<Record<number, boolean>>({});
  const [isCopied, setIsCopied] = useState(false);

  const urduHintsEnabled = settings?.urduHintsEnabled ?? true;

  useEffect(() => {
    if (!word) return;

    let isMounted = true;
    setIsLoading(true);
    setExpandedSenses({});

    dictionaryStore
      .getEntry(word)
      .then(res => {
        if (!isMounted) return;
        setEntry(res.entry);
        setMatchedForm(res.matchedForm);
        setIsLoading(false);
        if (res.entry) {
          isWordFavorite(res.entry.word).then(fav => {
            if (isMounted) setIsFavorite(fav);
          });
        }
      })
      .catch(() => {
        if (!isMounted) return;
        setIsLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [word]);

  const handleToggleFavorite = async () => {
    if (!entry) return;
    const added = await toggleFavoriteWord(entry, currentTrack);
    setIsFavorite(added);
    addToast({
      type: 'info',
      title: added ? 'Word Bookmarked' : 'Bookmark Removed',
      message: `"${entry.word}" ${added ? 'added to' : 'removed from'} your dictionary favorites.`,
    });
  };

  const handleSaveToBank = async () => {
    if (!entry) return;
    await saveToWordBank(entry, currentTrack);
    addToast({
      type: 'success',
      title: 'Saved to Word Bank',
      message: `"${entry.word}" is now scheduled for spaced repetition practice.`,
    });
  };

  const handleCopy = () => {
    if (!entry) return;
    const textToCopy = `${entry.word} (${entry.partOfSpeech}) - ${entry.definition}\n${entry.exampleSentence ? `"${entry.exampleSentence}"` : ''}`;
    navigator.clipboard.writeText(textToCopy);
    setIsCopied(true);
    addToast({
      type: 'success',
      title: 'Copied to Clipboard',
      message: `Word and definition copied.`,
    });
    setTimeout(() => setIsCopied(false), 2000);
  };

  const handleShare = () => {
    if (typeof window === 'undefined') return;
    const url = window.location.href;
    if (navigator.share) {
      navigator.share({
        title: `Zarii Dictionary: ${entry?.word}`,
        text: `Check out the word "${entry?.word}" on Zarii: ${entry?.definition}`,
        url,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(url);
      addToast({
        type: 'info',
        title: 'Link Copied',
        message: 'Dictionary link copied to clipboard.',
      });
    }
  };

  const toggleSenseExpand = (idx: number) => {
    setExpandedSenses(prev => ({ ...prev, [idx]: !prev[idx] }));
  };

  // Helper to highlight headword in example sentences
  const renderHighlightedSentence = (sentence: string, targetWord: string) => {
    if (!sentence || !targetWord) return sentence;
    const regex = new RegExp(`\\b(${targetWord}[a-z]*)\\b`, 'gi');
    const parts = sentence.split(regex);

    return parts.map((part, idx) =>
      regex.test(part) ? (
        <mark
          key={idx}
          className="bg-emerald-100 dark:bg-emerald-900/50 text-emerald-900 dark:text-emerald-100 px-1 rounded font-semibold"
        >
          {part}
        </mark>
      ) : (
        part
      )
    );
  };

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto py-16 px-4 text-center space-y-4">
        <Loader2 className="w-8 h-8 animate-spin text-emerald-600 mx-auto" />
        <p className="text-sm text-slate-500">Retrieving dictionary entry for "{word}"...</p>
      </div>
    );
  }

  if (!entry) {
    return (
      <div className="max-w-4xl mx-auto py-16 px-4 text-center space-y-6">
        <div className="w-16 h-16 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center mx-auto text-slate-400">
          <HelpCircle className="w-8 h-8" />
        </div>
        <div className="space-y-2">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
            Entry not found for "{word}"
          </h2>
          <p className="text-sm text-slate-500 max-w-md mx-auto">
            We couldn't locate this word in the offline shards. It may be misspelled or a specialized proper noun.
          </p>
        </div>
        <div className="flex justify-center gap-3">
          <Button onClick={() => navigate('/app/dictionary')} className="gap-2 bg-emerald-600 text-white">
            <ArrowLeft className="w-4 h-4" />
            Back to Dictionary
          </Button>
        </div>
      </div>
    );
  }

  const frequencyLabel =
    entry.frequencyRank <= 3000
      ? 'High Frequency'
      : entry.frequencyRank <= 12000
      ? 'Medium Frequency'
      : 'Low / Advanced';

  return (
    <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 space-y-8 animate-in fade-in duration-150">
      {/* Top Breadcrumb & Navigation */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800">
        <Link
          to="/app/dictionary"
          className="inline-flex items-center gap-2 text-sm font-semibold text-emerald-600 dark:text-emerald-400 hover:underline"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Search</span>
        </Link>

        {matchedForm && (
          <Badge variant="outline" className="text-xs text-emerald-700 dark:text-emerald-300 border-emerald-500/30">
            Form: {matchedForm} → {entry.word}
          </Badge>
        )}
      </div>

      {/* HEADER SECTION */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-3">
              <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 dark:text-slate-100 capitalize tracking-tight">
                {entry.word}
              </h1>

              {/* Part of Speech Badges */}
              <div className="flex items-center gap-1.5">
                {entry.pos?.map(p => (
                  <Badge key={p} variant="secondary" className="text-xs font-mono uppercase px-2 py-0.5">
                    {p}
                  </Badge>
                ))}
              </div>

              {/* CEFR Level Badge */}
              <Badge
                variant="outline"
                className="text-xs font-mono font-bold border-emerald-500/40 text-emerald-700 dark:text-emerald-300 bg-emerald-50/50 dark:bg-emerald-950/20"
                title="Estimated Common European Framework of Reference Level"
              >
                Estimated: {entry.levelEstimate || entry.level || 'B2'}
              </Badge>

              {/* Frequency Tag */}
              <span className="text-2xs font-semibold px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                {frequencyLabel}
              </span>
            </div>

            {/* Pronunciation Line */}
            <div className="flex flex-wrap items-center gap-3 pt-1">
              <span className="font-mono text-base text-slate-700 dark:text-slate-300 font-medium">
                {entry.pronunciation?.ipa || entry.phonetic}
              </span>
              <span className="text-slate-400">•</span>
              <span className="font-mono text-sm text-slate-500">
                {entry.pronunciation?.respelling}
              </span>

              {/* Audio Controls */}
              <div className="flex items-center gap-2 pl-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => playPronunciation(entry.word, { lang: 'en-US', speed: audioSpeed })}
                  className="h-8 px-2.5 text-xs gap-1.5 border-slate-200 dark:border-slate-800 hover:border-emerald-500 text-slate-700 dark:text-slate-200"
                  title="Play US Pronunciation"
                >
                  <Volume2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>US</span>
                </Button>

                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => playPronunciation(entry.word, { lang: 'en-GB', speed: audioSpeed })}
                  className="h-8 px-2.5 text-xs gap-1.5 border-slate-200 dark:border-slate-800 hover:border-emerald-500 text-slate-700 dark:text-slate-200"
                  title="Play UK Pronunciation"
                >
                  <Volume2 className="w-3.5 h-3.5 text-teal-600" />
                  <span>UK</span>
                </Button>

                <button
                  onClick={() => setAudioSpeed(s => (s === 1.0 ? 0.75 : 1.0))}
                  className="px-2 py-1 rounded-md text-3xs font-mono font-bold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200"
                  title="Toggle normal / slow playback speed"
                >
                  {audioSpeed === 1.0 ? '1.0x' : '0.75x'}
                </button>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-2">
            <Button
              size="sm"
              onClick={() => setIsPracticeOpen(true)}
              className="bg-emerald-600 hover:bg-emerald-700 text-white gap-1.5 h-9"
            >
              <Zap className="w-4 h-4" />
              <span>Practise</span>
            </Button>

            <Button
              size="sm"
              variant="outline"
              onClick={handleToggleFavorite}
              className={`h-9 gap-1.5 ${isFavorite ? 'text-emerald-600 border-emerald-500' : ''}`}
            >
              {isFavorite ? (
                <>
                  <BookmarkCheck className="w-4 h-4 text-emerald-600" />
                  <span>Bookmarked</span>
                </>
              ) : (
                <>
                  <Bookmark className="w-4 h-4" />
                  <span>Bookmark</span>
                </>
              )}
            </Button>

            <Button size="sm" variant="outline" onClick={handleSaveToBank} className="h-9 gap-1.5">
              <BookOpen className="w-4 h-4" />
              <span>Word Bank</span>
            </Button>

            <Button size="sm" variant="ghost" onClick={handleCopy} className="h-9 p-2" title="Copy word & definition">
              {isCopied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4 text-slate-500" />}
            </Button>

            <Button size="sm" variant="ghost" onClick={handleShare} className="h-9 p-2" title="Share link">
              <Share2 className="w-4 h-4 text-slate-500" />
            </Button>

            <Button size="sm" variant="ghost" onClick={() => setIsReportOpen(true)} className="h-9 p-2" title="Report a problem">
              <AlertTriangle className="w-4 h-4 text-slate-400 hover:text-amber-500" />
            </Button>
          </div>
        </div>

        {/* Urdu Meaning Card (if enabled) */}
        {urduHintsEnabled && entry.urduMeaning && (
          <div className="p-4 rounded-2xl bg-emerald-50/60 dark:bg-emerald-950/20 border border-emerald-200/50 dark:border-emerald-800/40 flex items-center justify-between">
            <span className="text-xs font-semibold text-emerald-800 dark:text-emerald-300">
              Urdu Meaning / اردو ترجمہ:
            </span>
            <span className="text-xl font-serif text-emerald-900 dark:text-emerald-200 font-bold" dir="rtl">
              {entry.urduMeaning}
            </span>
          </div>
        )}
      </div>

      {/* SENSES & DEFINITIONS SECTION */}
      <div className="space-y-6">
        <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-emerald-600" />
          <span>Definitions & Examples</span>
        </h2>

        <div className="space-y-4">
          {entry.senses?.map((sense, idx) => {
            const hasFullDef = sense.def && sense.shortDef && sense.def !== sense.shortDef;
            const isExpanded = expandedSenses[idx];

            return (
              <Card key={idx} className="p-6 space-y-4 border border-slate-200 dark:border-slate-800 shadow-xs">
                <div className="space-y-2">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-2">
                      <span className="w-6 h-6 rounded-full bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300 text-xs font-bold flex items-center justify-center shrink-0">
                        {idx + 1}
                      </span>
                      {sense.domain && sense.domain !== 'general' && (
                        <Badge variant="secondary" className="text-3xs font-mono uppercase">
                          {sense.domain}
                        </Badge>
                      )}
                    </div>
                  </div>

                  {/* Primary simple definition */}
                  <div className="text-base sm:text-lg font-medium text-slate-900 dark:text-slate-100 leading-relaxed pl-8">
                    {sense.shortDef || sense.def}
                  </div>

                  {/* Full definition expander */}
                  {hasFullDef && (
                    <div className="pl-8 pt-1">
                      <button
                        onClick={() => toggleSenseExpand(idx)}
                        className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-600 dark:text-emerald-400 hover:underline"
                      >
                        <span>{isExpanded ? 'Hide full definition' : 'Show full definition'}</span>
                        {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                      </button>

                      {isExpanded && (
                        <p className="mt-2 text-sm text-slate-600 dark:text-slate-300 leading-relaxed p-3 bg-slate-50 dark:bg-slate-800/40 rounded-xl">
                          {sense.def}
                        </p>
                      )}
                    </div>
                  )}
                </div>

                {/* Example Sentences */}
                {sense.examples && sense.examples.length > 0 && (
                  <div className="pl-8 space-y-2 pt-1 border-t border-slate-100 dark:border-slate-800">
                    <span className="text-2xs font-bold text-slate-400 uppercase tracking-wider block">
                      Examples in Context
                    </span>
                    <div className="space-y-2">
                      {sense.examples.slice(0, 3).map((ex, exIdx) => (
                        <div
                          key={exIdx}
                          className="flex items-start gap-2 text-sm text-slate-700 dark:text-slate-300 italic p-2.5 rounded-xl bg-slate-50/60 dark:bg-slate-800/30"
                        >
                          <button
                            onClick={() => playPronunciation(ex, { lang: 'en-US' })}
                            className="p-1 rounded-md text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-950/40 shrink-0 mt-0.5"
                            title="Listen to full sentence"
                          >
                            <Volume2 className="w-3.5 h-3.5" />
                          </button>
                          <p className="leading-relaxed">
                            "{renderHighlightedSentence(ex, entry.word)}"
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Synonyms & Antonyms Chips */}
                {((sense.synonyms && sense.synonyms.length > 0) || (sense.antonyms && sense.antonyms.length > 0)) && (
                  <div className="pl-8 flex flex-wrap gap-4 pt-2 text-xs">
                    {sense.synonyms && sense.synonyms.length > 0 && (
                      <div className="flex flex-wrap items-center gap-1.5">
                        <span className="font-semibold text-slate-400">Synonyms:</span>
                        {sense.synonyms.map(syn => (
                          <Link
                            key={syn}
                            to={`/app/dictionary/${encodeURIComponent(syn.toLowerCase())}`}
                            className="px-2.5 py-0.5 rounded-lg bg-emerald-50 dark:bg-emerald-950/30 hover:bg-emerald-100 dark:hover:bg-emerald-900/60 text-emerald-800 dark:text-emerald-300 capitalize transition-colors font-medium text-xs"
                          >
                            {syn}
                          </Link>
                        ))}
                      </div>
                    )}

                    {sense.antonyms && sense.antonyms.length > 0 && (
                      <div className="flex flex-wrap items-center gap-1.5">
                        <span className="font-semibold text-slate-400">Antonyms:</span>
                        {sense.antonyms.map(ant => (
                          <Link
                            key={ant}
                            to={`/app/dictionary/${encodeURIComponent(ant.toLowerCase())}`}
                            className="px-2.5 py-0.5 rounded-lg bg-rose-50 dark:bg-rose-950/30 hover:bg-rose-100 dark:hover:bg-rose-900/60 text-rose-800 dark:text-rose-300 capitalize transition-colors font-medium text-xs"
                          >
                            {ant}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </Card>
            );
          })}
        </div>
      </div>

      {/* GRAMMATICAL FORMS TABLE */}
      {entry.forms && Object.keys(entry.forms).length > 0 && (
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
            <Layers className="w-5 h-5 text-emerald-600" />
            <span>Inflections & Word Forms</span>
          </h2>

          <div className="overflow-x-auto rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-50 dark:bg-slate-800/50 text-slate-500 text-xs uppercase font-semibold">
                <tr>
                  <th className="py-3 px-4">Grammatical Form</th>
                  <th className="py-3 px-4">Spelling</th>
                  <th className="py-3 px-4 text-right">Quick Listen</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-800 dark:text-slate-200">
                {Object.entries(entry.forms).map(([formType, formVal]) => (
                  <tr key={formType} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30">
                    <td className="py-3 px-4 font-medium text-slate-500 capitalize">
                      {formType.replace(/([A-Z])/g, ' $1')}
                    </td>
                    <td className="py-3 px-4 font-bold text-slate-900 dark:text-slate-100 capitalize">
                      {formVal}
                    </td>
                    <td className="py-3 px-4 text-right">
                      <button
                        onClick={() => playPronunciation(formVal, { lang: 'en-US' })}
                        className="p-1 rounded-md text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-950/40"
                        title={`Listen to ${formVal}`}
                      >
                        <Volume2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* FOOTER & CREDITS ATTRIBUTION */}
      <div className="p-6 rounded-2xl bg-slate-100/70 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 text-xs text-slate-500 space-y-2">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <p>
            Dictionary data provided by <strong>Open English WordNet</strong>,{' '}
            <strong>CMU Pronouncing Dictionary</strong>, and open corpus datasets.
          </p>
          <Link
            to="/credits"
            className="inline-flex items-center gap-1 font-semibold text-emerald-600 dark:text-emerald-400 hover:underline shrink-0"
          >
            <span>See Full Credits & Licenses</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      {/* Modals */}
      <PracticeWordModal
        isOpen={isPracticeOpen}
        onClose={() => setIsPracticeOpen(false)}
        entry={entry}
      />

      <ReportWordModal
        isOpen={isReportOpen}
        onClose={() => setIsReportOpen(false)}
        word={entry.word}
      />
    </div>
  );
}
