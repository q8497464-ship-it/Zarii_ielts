import React, { useState, useEffect, useRef } from 'react';
import { MessageSquare, Volume2, Play, Square, User } from 'lucide-react';
import { playPronunciation } from '../../../dictionary/dictionaryService';
import { Button } from '../../../../components/ui/Button';

interface DialogueTurn {
  speaker: string;
  avatar?: string;
  english: string;
  urdu?: string;
  audioText?: string;
}

interface DialogueSectionProps {
  title: string;
  dialogue: DialogueTurn[];
  showUrdu?: boolean;
}

export const DialogueSection: React.FC<DialogueSectionProps> = ({
  title,
  dialogue = [],
  showUrdu = true,
}) => {
  const [activeTurnIdx, setActiveTurnIdx] = useState<number | null>(null);
  const [isPlayingAll, setIsPlayingAll] = useState(false);
  const playAllTimerRef = useRef<NodeJS.Timeout | null>(null);

  const distinctSpeakers = Array.from(new Set(dialogue.map((d) => d.speaker)));

  const handlePlayLine = (turn: DialogueTurn, idx: number) => {
    setActiveTurnIdx(idx);
    const text = turn.audioText || turn.english;
    playPronunciation(text, { speed: 1.0, lang: 'en-US' });
  };

  const handlePlayAll = () => {
    if (isPlayingAll) {
      // Stop
      setIsPlayingAll(false);
      setActiveTurnIdx(null);
      if (playAllTimerRef.current) clearTimeout(playAllTimerRef.current);
      if ('speechSynthesis' in window) window.speechSynthesis.cancel();
      return;
    }

    setIsPlayingAll(true);
    let currentIdx = 0;

    const playNext = () => {
      if (currentIdx >= dialogue.length) {
        setIsPlayingAll(false);
        setActiveTurnIdx(null);
        return;
      }

      setActiveTurnIdx(currentIdx);
      const turn = dialogue[currentIdx];
      const text = turn.audioText || turn.english;

      playPronunciation(text, { speed: 1.0, lang: 'en-US' });

      // Approximate duration based on word count: ~300ms per word + 800ms pause
      const wordCount = text.split(/\s+/).length;
      const delay = Math.max(1800, wordCount * 380 + 800);

      currentIdx++;
      playAllTimerRef.current = setTimeout(playNext, delay);
    };

    playNext();
  };

  useEffect(() => {
    return () => {
      if (playAllTimerRef.current) clearTimeout(playAllTimerRef.current);
      if ('speechSynthesis' in window) window.speechSynthesis.cancel();
    };
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-2 text-[#124F40] dark:text-[#5BB78D]">
          <MessageSquare className="w-5 h-5" />
          <h2 className="text-xl md:text-2xl font-bold tracking-tight text-gray-900 dark:text-gray-100">
            {title}
          </h2>
        </div>

        {/* Play All Toggle Button */}
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={handlePlayAll}
          className={`gap-1.5 font-medium ${
            isPlayingAll
              ? 'bg-rose-50 text-rose-700 border-rose-300 dark:bg-rose-950/40 dark:text-rose-300'
              : 'border-[#124F40]/30 text-[#124F40] dark:text-[#5BB78D]'
          }`}
        >
          {isPlayingAll ? (
            <>
              <Square className="w-4 h-4 fill-current" />
              <span>Stop Audio</span>
            </>
          ) : (
            <>
              <Play className="w-4 h-4 fill-current" />
              <span>Play All</span>
            </>
          )}
        </Button>
      </div>

      <div className="space-y-4 pt-1">
        {dialogue.map((turn, idx) => {
          const isFirstSpeaker = turn.speaker === distinctSpeakers[0];
          const isActive = activeTurnIdx === idx;

          return (
            <div
              key={idx}
              className={`flex gap-3 items-end ${
                isFirstSpeaker ? 'justify-start' : 'justify-end flex-row-reverse'
              }`}
            >
              {/* Speaker Avatar */}
              <div
                className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-xs shrink-0 shadow-sm ${
                  isFirstSpeaker
                    ? 'bg-[#124F40] text-white'
                    : 'bg-emerald-600 text-white'
                }`}
              >
                {turn.speaker.slice(0, 2).toUpperCase()}
              </div>

              {/* Chat Bubble */}
              <div
                className={`max-w-[80%] rounded-2xl p-4 shadow-sm transition-all border ${
                  isActive
                    ? 'ring-2 ring-[#124F40] dark:ring-[#5BB78D]'
                    : ''
                } ${
                  isFirstSpeaker
                    ? 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 rounded-bl-sm'
                    : 'bg-emerald-50/70 dark:bg-emerald-950/30 border-emerald-200 dark:border-emerald-800/60 rounded-br-sm'
                }`}
              >
                <div className="flex items-center justify-between gap-3 mb-1">
                  <span className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    {turn.speaker}
                  </span>
                  <button
                    type="button"
                    onClick={() => handlePlayLine(turn, idx)}
                    className="p-1 rounded-full text-gray-400 hover:text-[#124F40] dark:hover:text-[#5BB78D] transition-colors"
                    aria-label={`Listen to ${turn.speaker}: ${turn.english}`}
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>
                </div>

                <div className="text-base text-gray-900 dark:text-gray-100 font-medium leading-relaxed">
                  {turn.english}
                </div>

                {showUrdu && turn.urdu && (
                  <div
                    dir="rtl"
                    className="font-urdu text-sm text-gray-600 dark:text-gray-300 pt-1.5 border-t border-black/5 dark:border-white/5 mt-2 leading-relaxed"
                  >
                    {turn.urdu}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
