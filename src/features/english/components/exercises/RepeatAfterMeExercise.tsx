import React, { useState, useEffect } from 'react';
import { Volume2, Mic, MicOff, Check, CheckCircle2, RotateCcw } from 'lucide-react';
import { playPronunciation } from '../../../dictionary/dictionaryService';
import { ExerciseFeedbackBanner } from './ExerciseFeedbackBanner';
import { Button } from '../../../../components/ui/Button';

interface RepeatAfterMeExerciseProps {
  id: string;
  prompt: string;
  targetSentence?: string;
  modelAnswer?: string;
  explanation: string;
  urduExplanation?: string;
  showUrdu?: boolean;
  onAnswer: (isCorrect: boolean, response: string) => void;
  onNext: () => void;
  canRetry?: boolean;
}

export const RepeatAfterMeExercise: React.FC<RepeatAfterMeExerciseProps> = ({
  id,
  prompt,
  targetSentence,
  modelAnswer,
  explanation,
  urduExplanation,
  showUrdu = true,
  onAnswer,
  onNext,
  canRetry = true,
}) => {
  const sentenceToSpeak = targetSentence || modelAnswer || prompt;

  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [matchScore, setMatchScore] = useState<number | null>(null);
  const [isApiSupported, setIsApiSupported] = useState(true);

  useEffect(() => {
    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      setIsApiSupported(false);
    }
  }, []);

  const handlePlayModel = () => {
    playPronunciation(sentenceToSpeak, { speed: 1.0, lang: 'en-US' });
  };

  const handleStartListening = () => {
    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      setIsApiSupported(false);
      return;
    }

    try {
      const recognition = new SpeechRecognition();
      recognition.lang = 'en-US';
      recognition.interimResults = false;
      recognition.maxAlternatives = 1;

      setIsListening(true);
      setTranscript('');

      recognition.onresult = (event: any) => {
        const spoken = event.results[0][0].transcript || '';
        setTranscript(spoken);
        evaluateSpokenText(spoken);
      };

      recognition.onerror = () => {
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognition.start();
    } catch (err) {
      console.warn('Speech recognition start failed:', err);
      setIsListening(false);
      setIsApiSupported(false);
    }
  };

  const evaluateSpokenText = (spoken: string) => {
    const clean = (t: string) =>
      t
        .toLowerCase()
        .replace(/[.,/#!$%^&*;:{}=\-_`~()?"']/g, '')
        .trim();

    const targetWords = clean(sentenceToSpeak).split(/\s+/);
    const spokenWords = clean(spoken).split(/\s+/);

    let matches = 0;
    targetWords.forEach((tw) => {
      if (spokenWords.includes(tw)) matches++;
    });

    const percent = Math.round((matches / targetWords.length) * 100);
    setMatchScore(percent);
    const passed = percent >= 60; // 60%+ pronunciation match
    setIsCorrect(passed);
    setIsSubmitted(true);
    onAnswer(passed, spoken);
  };

  // Self-check fallback ("I said it!")
  const handleSelfCheck = () => {
    setIsCorrect(true);
    setMatchScore(100);
    setTranscript('Self-checked: Verified speaking practice');
    setIsSubmitted(true);
    onAnswer(true, 'self-checked');
  };

  const handleRetry = () => {
    setIsSubmitted(false);
    setIsCorrect(false);
    setTranscript('');
    setMatchScore(null);
  };

  return (
    <div className="space-y-4">
      <div className="text-lg font-medium text-gray-900 dark:text-gray-100">
        {prompt || 'Listen to the model and repeat the sentence aloud:'}
      </div>

      {/* Target sentence display with listen button */}
      <div className="p-4 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-sm flex items-center justify-between gap-4">
        <div className="text-xl md:text-2xl font-bold text-gray-900 dark:text-gray-100 leading-snug">
          "{sentenceToSpeak}"
        </div>

        <button
          type="button"
          onClick={handlePlayModel}
          className="w-12 h-12 rounded-full bg-[#124F40] text-white flex items-center justify-center hover:bg-[#0e3f33] active:scale-95 transition-all shadow-md shrink-0"
          aria-label="Listen to target pronunciation"
        >
          <Volume2 className="w-6 h-6" />
        </button>
      </div>

      {/* Speaking interaction controls */}
      {!isSubmitted && (
        <div className="flex flex-wrap items-center gap-3 pt-2">
          {isApiSupported && (
            <button
              type="button"
              onClick={handleStartListening}
              disabled={isListening}
              className={`px-5 py-3 rounded-xl font-semibold text-white flex items-center gap-2 shadow-sm transition-all active:scale-95 ${
                isListening
                  ? 'bg-rose-600 animate-pulse ring-4 ring-rose-200'
                  : 'bg-[#124F40] hover:bg-[#0e3f33]'
              }`}
            >
              <Mic className="w-5 h-5" />
              <span>{isListening ? 'Listening... Speak now!' : 'Tap to Speak'}</span>
            </button>
          )}

          {/* Self-check button fallback */}
          <Button
            type="button"
            variant="outline"
            onClick={handleSelfCheck}
            className="gap-2 border-emerald-600 text-emerald-800 dark:text-emerald-300 hover:bg-emerald-50 dark:hover:bg-emerald-950/30"
          >
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>I said it! (Self-check)</span>
          </Button>
        </div>
      )}

      {/* Spoken result banner */}
      {transcript && (
        <div className="p-3 rounded-lg bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-sm">
          <span className="font-semibold text-gray-700 dark:text-gray-300">You said: </span>
          <span className="italic text-gray-900 dark:text-gray-100">"{transcript}"</span>
          {matchScore !== null && (
            <span className="ml-2 font-bold text-[#124F40] dark:text-[#5BB78D]">
              ({matchScore}% match)
            </span>
          )}
        </div>
      )}

      {isSubmitted && (
        <ExerciseFeedbackBanner
          isCorrect={isCorrect}
          explanation={`${explanation} (Target sentence: "${sentenceToSpeak}")`}
          urduExplanation={urduExplanation}
          showUrdu={showUrdu}
          onRetry={handleRetry}
          onContinue={onNext}
          canRetry={canRetry}
        />
      )}
    </div>
  );
};
