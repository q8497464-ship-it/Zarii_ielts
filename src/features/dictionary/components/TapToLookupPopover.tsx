import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import {
  Volume2,
  Bookmark,
  BookmarkCheck,
  ExternalLink,
  X,
  Loader2,
  BookOpen,
} from 'lucide-react';
import {
  dictionaryStore,
  playPronunciation,
  saveToWordBank,
  type DictionaryEntry,
} from '../dictionaryService';
import { useAppStore } from '../../../store/useAppStore';
import { Badge } from '../../../components/ui/Badge';

export interface TapToLookupPosition {
  x: number;
  y: number;
  word: string;
}

interface TapToLookupPopoverProps {
  position: TapToLookupPosition | null;
  onClose: () => void;
}

export function TapToLookupPopover({ position, onClose }: TapToLookupPopoverProps) {
  const { addToast, currentTrack } = useAppStore();
  const [entry, setEntry] = useState<DictionaryEntry | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const popoverRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!position?.word) return;

    let isMounted = true;
    setIsLoading(true);
    setIsSaved(false);

    dictionaryStore
      .getEntry(position.word)
      .then(({ entry: foundEntry }) => {
        if (!isMounted) return;
        setEntry(foundEntry);
        setIsLoading(false);
      })
      .catch(() => {
        if (!isMounted) return;
        setIsLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [position?.word]);

  // Click outside to close
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent | TouchEvent) => {
      if (popoverRef.current && !popoverRef.current.contains(e.target as Node)) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);
    document.addEventListener('touchstart', handleOutsideClick);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
      document.removeEventListener('touchstart', handleOutsideClick);
    };
  }, [onClose]);

  if (!position) return null;

  const handleSave = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!entry) return;
    await saveToWordBank(entry, currentTrack);
    setIsSaved(true);
    addToast({
      type: 'success',
      title: 'Saved to Word Bank',
      message: `"${entry.word}" added for spaced-repetition review.`,
    });
  };

  const handlePlayAudio = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!position.word) return;
    playPronunciation(entry?.word || position.word, { lang: 'en-US' });
  };

  // Adjust positioning to stay within viewport
  const left = Math.min(Math.max(16, position.x - 140), window.innerWidth - 300);
  const top = position.y + 12;

  return (
    <div
      ref={popoverRef}
      style={{ left: `${left}px`, top: `${top}px` }}
      className="fixed z-50 w-72 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl p-4 text-left animate-in fade-in zoom-in-95 duration-150"
    >
      <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
        <div className="flex items-center gap-2">
          <span className="font-bold text-slate-900 dark:text-slate-100 text-base capitalize">
            {entry?.word || position.word}
          </span>
          {entry?.partOfSpeech && (
            <Badge variant="secondary" className="text-3xs font-mono py-0 px-1.5 h-4">
              {entry.partOfSpeech}
            </Badge>
          )}
        </div>
        <div className="flex items-center gap-1">
          <button
            onClick={handlePlayAudio}
            className="p-1 rounded-md text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-950/40"
            title="Listen pronunciation"
          >
            <Volume2 className="w-4 h-4" />
          </button>
          <button
            onClick={onClose}
            className="p-1 rounded-md text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      <div className="py-2.5 min-h-[48px]">
        {isLoading ? (
          <div className="flex items-center justify-center py-2 text-slate-400 gap-2 text-xs">
            <Loader2 className="w-4 h-4 animate-spin text-emerald-600" />
            <span>Looking up word...</span>
          </div>
        ) : entry ? (
          <div className="space-y-1.5">
            <p className="text-xs text-slate-700 dark:text-slate-300 line-clamp-3 leading-relaxed">
              {entry.definition}
            </p>
            {entry.urduMeaning && (
              <p className="text-xs font-serif text-emerald-700 dark:text-emerald-400 text-right dir-rtl">
                {entry.urduMeaning}
              </p>
            )}
          </div>
        ) : (
          <div className="text-xs text-slate-400 py-1 italic">
            Definition not found in quick cache. Open full dictionary to search.
          </div>
        )}
      </div>

      <div className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-800 text-xs">
        <button
          onClick={handleSave}
          disabled={!entry || isSaved}
          className="flex items-center gap-1 font-medium text-slate-600 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 disabled:opacity-50"
        >
          {isSaved ? (
            <>
              <BookmarkCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span className="text-emerald-600 font-semibold">Saved</span>
            </>
          ) : (
            <>
              <Bookmark className="w-3.5 h-3.5" />
              <span>Save</span>
            </>
          )}
        </button>

        <Link
          to={`/app/dictionary/${encodeURIComponent(entry?.word || position.word)}`}
          onClick={onClose}
          className="flex items-center gap-1 font-semibold text-emerald-600 dark:text-emerald-400 hover:underline"
        >
          <span>Open Full Entry</span>
          <ExternalLink className="w-3 h-3" />
        </Link>
      </div>
    </div>
  );
}
