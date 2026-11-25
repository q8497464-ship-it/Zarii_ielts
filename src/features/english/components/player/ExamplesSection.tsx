import React, { useState } from 'react';
import { Volume2, Sparkles, MessageSquare } from 'lucide-react';
import { playPronunciation } from '../../../dictionary/dictionaryService';

interface ExampleItem {
  english: string;
  urdu?: string;
  audioText?: string;
  phonetic?: string;
  context?: string;
}

interface ExamplesSectionProps {
  title: string;
  examples: ExampleItem[];
  showUrdu?: boolean;
}

export const ExamplesSection: React.FC<ExamplesSectionProps> = ({
  title,
  examples = [],
  showUrdu = true,
}) => {
  const [activeAudioIdx, setActiveAudioIdx] = useState<number | null>(null);

  const handlePlayAudio = (text: string, idx: number, speed: 1.0 | 0.75 = 1.0) => {
    setActiveAudioIdx(idx);
    playPronunciation(text, { speed, lang: 'en-US' });
    setTimeout(() => {
      setActiveAudioIdx(null);
    }, 2500);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 text-[#124F40] dark:text-[#5BB78D]">
        <Sparkles className="w-5 h-5" />
        <h2 className="text-xl md:text-2xl font-bold tracking-tight text-gray-900 dark:text-gray-100">
          {title}
        </h2>
      </div>

      <div className="text-sm text-gray-600 dark:text-gray-400">
        Listen to how native speakers pronounce these authentic phrases:
      </div>

      <div className="space-y-3.5">
        {examples.map((item, idx) => {
          const isPlaying = activeAudioIdx === idx;
          const textToPlay = item.audioText || item.english;

          return (
            <div
              key={idx}
              className={`p-4 rounded-xl border transition-all shadow-sm ${
                isPlaying
                  ? 'border-[#124F40] bg-emerald-50/40 dark:bg-emerald-950/20 ring-2 ring-[#124F40]/20'
                  : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:border-gray-300'
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="space-y-1.5 flex-1">
                  <div className="text-base md:text-lg font-semibold text-gray-900 dark:text-gray-100 leading-snug">
                    {item.english}
                  </div>

                  {item.phonetic && (
                    <div className="text-xs font-mono text-gray-500 dark:text-gray-400">
                      /{item.phonetic}/
                    </div>
                  )}

                  {showUrdu && item.urdu && (
                    <div
                      dir="rtl"
                      className="font-urdu text-sm text-gray-700 dark:text-gray-300 pt-1 leading-relaxed"
                    >
                      {item.urdu}
                    </div>
                  )}

                  {item.context && (
                    <div className="text-xs text-emerald-700 dark:text-emerald-400 font-medium">
                      Context: {item.context}
                    </div>
                  )}
                </div>

                {/* Audio controls */}
                <div className="flex items-center gap-2 shrink-0">
                  <button
                    type="button"
                    onClick={() => handlePlayAudio(textToPlay, idx, 1.0)}
                    className="w-10 h-10 rounded-full bg-[#124F40] text-white flex items-center justify-center hover:bg-[#0e3f33] active:scale-95 transition-all shadow-sm"
                    aria-label={`Listen to: "${item.english}"`}
                  >
                    <Volume2 className="w-5 h-5" />
                  </button>

                  <button
                    type="button"
                    onClick={() => handlePlayAudio(textToPlay, idx, 0.75)}
                    className="px-2 py-1 rounded text-xs border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 text-gray-700 dark:text-gray-200 active:scale-95 transition-all"
                    aria-label="Slow audio"
                  >
                    🐢 0.75x
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
