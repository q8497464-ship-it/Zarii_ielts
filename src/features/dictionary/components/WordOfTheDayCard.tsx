import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Sparkles,
  Volume2,
  Bookmark,
  BookmarkCheck,
  Zap,
  ArrowRight,
} from 'lucide-react';
import { Card } from '../../../components/ui/Card';
import { Badge } from '../../../components/ui/Badge';
import { Button } from '../../../components/ui/Button';
import {
  playPronunciation,
  toggleFavoriteWord,
  type DictionaryEntry,
} from '../dictionaryService';
import { useAppStore } from '../../../store/useAppStore';

interface WordOfTheDayCardProps {
  entry: DictionaryEntry;
  onPractice: (entry: DictionaryEntry) => void;
}

export function WordOfTheDayCard({ entry, onPractice }: WordOfTheDayCardProps) {
  const { addToast } = useAppStore();
  const [isBookmarked, setIsBookmarked] = useState(false);

  const handleToggleBookmark = async () => {
    const added = await toggleFavoriteWord(entry);
    setIsBookmarked(added);
    addToast({
      type: 'info',
      title: added ? 'Word Bookmarked' : 'Bookmark Removed',
      message: `"${entry.word}" ${added ? 'added to' : 'removed from'} your dictionary favorites.`,
    });
  };

  const handlePlayAudio = () => {
    playPronunciation(entry.word, { lang: 'en-US' });
  };

  return (
    <Card className="relative overflow-hidden p-6 sm:p-7 border border-emerald-500/30 dark:border-emerald-500/20 bg-gradient-to-br from-emerald-50/60 via-white to-teal-50/40 dark:from-emerald-950/20 dark:via-slate-900 dark:to-teal-950/20 shadow-md">
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
        {/* Left column info */}
        <div className="space-y-3 max-w-xl">
          <div className="flex items-center gap-2">
            <span className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-600 text-white shadow-sm">
              <Sparkles className="w-3.5 h-3.5" />
              Word of the Day
            </span>
            <Badge variant="outline" className="text-2xs font-mono uppercase border-emerald-500/30 text-emerald-700 dark:text-emerald-300">
              {entry.partOfSpeech}
            </Badge>
            <Badge variant="secondary" className="text-2xs font-mono">
              Level {entry.levelEstimate || 'B2'}
            </Badge>
          </div>

          <div>
            <div className="flex items-center gap-3">
              <Link
                to={`/app/dictionary/${encodeURIComponent(entry.word.toLowerCase())}`}
                className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-slate-100 hover:text-emerald-600 dark:hover:text-emerald-400 capitalize transition-colors"
              >
                {entry.word}
              </Link>
              <button
                onClick={handlePlayAudio}
                className="w-9 h-9 rounded-full bg-emerald-100 dark:bg-emerald-900/50 hover:bg-emerald-200 dark:hover:bg-emerald-800/60 text-emerald-700 dark:text-emerald-300 flex items-center justify-center transition-all"
                title="Listen pronunciation"
              >
                <Volume2 className="w-4 h-4" />
              </button>
            </div>
            <p className="text-xs font-mono text-slate-400 mt-0.5">
              {entry.pronunciation?.ipa} • {entry.pronunciation?.respelling}
            </p>
          </div>

          <p className="text-sm sm:text-base text-slate-700 dark:text-slate-200 leading-relaxed">
            {entry.definition}
          </p>

          {entry.urduMeaning && (
            <p className="text-sm font-serif text-emerald-700 dark:text-emerald-400 font-medium">
              {entry.urduMeaning}
            </p>
          )}

          {entry.exampleSentence && (
            <div className="p-3 rounded-xl bg-white/70 dark:bg-slate-800/40 border border-emerald-100 dark:border-emerald-900/30 text-xs sm:text-sm text-slate-600 dark:text-slate-300 italic">
              "{entry.exampleSentence}"
            </div>
          )}
        </div>

        {/* Right column quick actions */}
        <div className="flex sm:flex-col gap-2 shrink-0 pt-2 sm:pt-0">
          <Button
            size="sm"
            onClick={() => onPractice(entry)}
            className="bg-emerald-600 hover:bg-emerald-700 text-white gap-1.5 shadow-sm text-xs h-9"
          >
            <Zap className="w-4 h-4" />
            <span>Practise</span>
          </Button>

          <Button
            size="sm"
            variant="outline"
            onClick={handleToggleBookmark}
            className={`gap-1.5 text-xs h-9 ${
              isBookmarked ? 'text-emerald-600 border-emerald-500' : 'text-slate-600 dark:text-slate-300'
            }`}
          >
            {isBookmarked ? (
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

          <Link
            to={`/app/dictionary/${encodeURIComponent(entry.word.toLowerCase())}`}
            className="hidden sm:inline-flex items-center justify-center gap-1 text-xs font-semibold text-emerald-600 dark:text-emerald-400 hover:underline pt-2"
          >
            <span>Full Entry</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </Card>
  );
}
