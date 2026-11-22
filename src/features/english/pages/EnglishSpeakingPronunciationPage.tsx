import React, { useState } from 'react';
import { 
  Mic, 
  MicOff, 
  Volume2, 
  Sparkles, 
  CheckCircle, 
  AlertCircle, 
  RotateCcw,
  BookOpen
} from 'lucide-react';

interface MinimalPair {
  id: string;
  word1: string;
  ipa1: string;
  word2: string;
  ipa2: string;
  focusSound: string;
  urduTip: string;
}

const MINIMAL_PAIRS: MinimalPair[] = [
  {
    id: 'mp-1',
    word1: 'Ship',
    ipa1: '/ʃɪp/',
    word2: 'Sheep',
    ipa2: '/ʃiːp/',
    focusSound: 'Short /ɪ/ vs Long /iː/',
    urduTip: 'چھوٹی "اِ" (جیسے دِل) اور لمبی "ای" (جیسے چیل) کا فرق۔ Ship میں آواز چھوٹی اور sheep میں لمبی ہوتی ہے۔'
  },
  {
    id: 'mp-2',
    word1: 'Fan',
    ipa1: '/fæn/',
    word2: 'Van',
    ipa2: '/væn/',
    focusSound: 'Voiceless /f/ vs Voiced /v/',
    urduTip: 'دونوں میں اوپر والے دانت نیچے والے ہونٹ کو چھوتے ہیں۔ /v/ میں گلے میں ارتعاش (vibration) ہوتا ہے۔'
  },
  {
    id: 'mp-3',
    word1: 'Think',
    ipa1: '/θɪŋk/',
    word2: 'Sink',
    ipa2: '/sɪŋk/',
    focusSound: 'Dental /θ/ vs Alveolar /s/',
    urduTip: 'انگریزی "th" کے لیے زبان کی نوک اوپر اور نیچے کے دانتوں کے درمیان رکھیں۔'
  },
  {
    id: 'mp-4',
    word1: 'Wet',
    ipa1: '/wɛt/',
    word2: 'Vet',
    ipa2: '/vɛt/',
    focusSound: '/w/ vs /v/',
    urduTip: '/w/ کہتے وقت ہونٹوں کو گول بنائیں (جیسے سیٹی بجاتے ہوئے)، جبکہ /v/ میں اوپر کے دانت نیچے کے ہونٹ کو چھوتے ہیں۔'
  }
];

const TONGUE_TWISTERS = [
  {
    id: 'tt-1',
    level: 'Easy',
    text: 'She sells seashells by the seashore.',
    focus: '/ʃ/ and /s/ distinction',
    urduNote: 'ش اور س کا واضح اور تیز تفاوت'
  },
  {
    id: 'tt-2',
    level: 'Medium',
    text: 'A proper copper coffee pot.',
    focus: '/p/ and /k/ plosives',
    urduNote: 'پھ اور ک کی واضح ادائیگی'
  },
  {
    id: 'tt-3',
    level: 'Advanced',
    text: 'Peter Piper picked a peck of pickled peppers.',
    focus: 'Aspirated /p/ consonants',
    urduNote: 'انگریزی پی میں ہلکی سی ہوا کا اخراج ہوتا ہے'
  }
];

export const EnglishSpeakingPronunciationPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'pairs' | 'twisters' | 'record'>('pairs');
  const [isRecording, setIsRecording] = useState(false);
  const [recognizedText, setRecognizedText] = useState('');
  const [targetSentence, setTargetSentence] = useState('I want to improve my English speaking fluency.');
  const [matchScore, setMatchScore] = useState<number | null>(null);

  const speak = (text: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.85;
      utterance.lang = 'en-US';
      window.speechSynthesis.speak(utterance);
    }
  };

  const handleStartRecording = () => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert('Speech recognition is not supported in this browser. You can still listen and practice aloud!');
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
        setMatchScore(null);
      };

      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setRecognizedText(transcript);

        // Simple fuzzy match comparison
        const cleanTarget = targetSentence.toLowerCase().replace(/[^a-z0-9 ]/g, '').split(' ');
        const cleanActual = transcript.toLowerCase().replace(/[^a-z0-9 ]/g, '').split(' ');
        let matches = 0;
        cleanActual.forEach((word: string) => {
          if (cleanTarget.includes(word)) matches++;
        });
        const score = Math.min(100, Math.round((matches / cleanTarget.length) * 100));
        setMatchScore(score);
      };

      recognition.onerror = () => {
        setIsRecording(false);
      };

      recognition.onend = () => {
        setIsRecording(false);
      };

      recognition.start();
    } catch (err) {
      console.warn('SpeechRecognition error:', err);
      setIsRecording(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-6">
      {/* Header */}
      <div className="border-b border-gray-200 dark:border-neutral-800 pb-5">
        <div className="flex items-center gap-2 mb-1">
          <span className="p-1.5 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 text-[#124F40] dark:text-emerald-400">
            <Mic className="w-5 h-5" />
          </span>
          <span className="text-xs font-semibold uppercase tracking-wider text-[#124F40] dark:text-emerald-400">
            Pronunciation Lab
          </span>
        </div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Speaking & Accent Clarity
        </h1>
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
          Train your ear and speech organs with minimal pairs, tongue twisters, and speech practice.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b border-gray-200 dark:border-neutral-800 pb-3">
        {[
          { id: 'pairs', label: 'Minimal Pairs' },
          { id: 'twisters', label: 'Tongue Twisters' },
          { id: 'record', label: 'Speaking Practice' }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`px-4 py-2 rounded-xl text-xs font-medium transition-all ${
              activeTab === tab.id
                ? 'bg-[#124F40] text-white shadow-sm'
                : 'bg-gray-100 dark:bg-neutral-800 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab 1: Minimal Pairs */}
      {activeTab === 'pairs' && (
        <div className="space-y-4">
          <div className="text-xs text-gray-500 dark:text-gray-400">
            Click the sound icon to hear the subtle differences between similar English vowel and consonant sounds.
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {MINIMAL_PAIRS.map(pair => (
              <div
                key={pair.id}
                className="bg-white dark:bg-neutral-900 rounded-2xl border border-gray-200 dark:border-neutral-800 p-5 space-y-4 shadow-sm"
              >
                <div className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">
                  {pair.focusSound}
                </div>

                <div className="grid grid-cols-2 gap-3">
                  {/* Word 1 */}
                  <div className="p-3 rounded-xl bg-gray-50 dark:bg-neutral-800/60 border border-gray-100 dark:border-neutral-800 text-center space-y-1">
                    <div className="text-lg font-bold text-gray-900 dark:text-white">
                      {pair.word1}
                    </div>
                    <div className="text-xs text-gray-500 font-mono">
                      {pair.ipa1}
                    </div>
                    <button
                      onClick={() => speak(pair.word1)}
                      className="mt-1 p-1.5 rounded-lg hover:bg-emerald-100 dark:hover:bg-neutral-700 text-emerald-700 dark:text-emerald-400 transition-colors inline-flex"
                      title="Listen"
                    >
                      <Volume2 className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Word 2 */}
                  <div className="p-3 rounded-xl bg-gray-50 dark:bg-neutral-800/60 border border-gray-100 dark:border-neutral-800 text-center space-y-1">
                    <div className="text-lg font-bold text-gray-900 dark:text-white">
                      {pair.word2}
                    </div>
                    <div className="text-xs text-gray-500 font-mono">
                      {pair.ipa2}
                    </div>
                    <button
                      onClick={() => speak(pair.word2)}
                      className="mt-1 p-1.5 rounded-lg hover:bg-emerald-100 dark:hover:bg-neutral-700 text-emerald-700 dark:text-emerald-400 transition-colors inline-flex"
                      title="Listen"
                    >
                      <Volume2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Urdu explanation tip */}
                <div className="p-3 rounded-xl bg-emerald-50/50 dark:bg-emerald-950/30 border border-emerald-100 dark:border-emerald-900/40 text-xs text-gray-700 dark:text-gray-300 font-serif text-right" dir="rtl">
                  💡 {pair.urduTip}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 2: Tongue Twisters */}
      {activeTab === 'twisters' && (
        <div className="space-y-4">
          <div className="text-xs text-gray-500 dark:text-gray-400">
            Practice saying these sentences slowly first, then speed up to build articulation muscles.
          </div>

          <div className="space-y-3">
            {TONGUE_TWISTERS.map(tt => (
              <div
                key={tt.id}
                className="bg-white dark:bg-neutral-900 rounded-2xl border border-gray-200 dark:border-neutral-800 p-5 space-y-3 shadow-sm"
              >
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 dark:bg-emerald-950 text-[#124F40] dark:text-emerald-400 border border-emerald-200/50 dark:border-emerald-800/40">
                    {tt.level}
                  </span>
                  <span className="text-xs text-gray-500">
                    Focus: {tt.focus}
                  </span>
                </div>

                <div className="flex items-center justify-between gap-4">
                  <p className="text-base md:text-lg font-semibold text-gray-900 dark:text-white">
                    "{tt.text}"
                  </p>
                  <button
                    onClick={() => speak(tt.text)}
                    className="p-2 rounded-xl bg-emerald-50 dark:bg-neutral-800 text-[#124F40] dark:text-emerald-400 hover:bg-emerald-100 transition-colors flex-shrink-0"
                    title="Listen at normal speed"
                  >
                    <Volume2 className="w-5 h-5" />
                  </button>
                </div>

                <div className="text-xs text-gray-600 dark:text-gray-400 font-serif text-right" dir="rtl">
                  {tt.urduNote}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 3: Speech Practice */}
      {activeTab === 'record' && (
        <div className="bg-white dark:bg-neutral-900 rounded-2xl border border-gray-200 dark:border-neutral-800 p-6 md:p-8 space-y-6 shadow-sm">
          <div>
            <h2 className="text-lg font-bold text-gray-900 dark:text-white">
              Read Aloud & Check Accuracy
            </h2>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
              Listen to the model voice, click the mic, speak the sentence, and see how closely your speech is recognized.
            </p>
          </div>

          {/* Target Sentence Box */}
          <div className="p-5 rounded-2xl bg-emerald-50/50 dark:bg-emerald-950/30 border border-emerald-200/60 dark:border-emerald-800/40 space-y-3">
            <span className="text-xs font-semibold uppercase tracking-wider text-emerald-800 dark:text-emerald-400">
              Target Sentence
            </span>
            <div className="flex items-center justify-between gap-4">
              <p className="text-lg md:text-xl font-medium text-gray-900 dark:text-white">
                "{targetSentence}"
              </p>
              <button
                onClick={() => speak(targetSentence)}
                className="p-2 rounded-xl bg-white dark:bg-neutral-800 text-[#124F40] dark:text-emerald-400 hover:shadow-sm transition-all"
                title="Listen"
              >
                <Volume2 className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Quick Sentence Picker */}
          <div className="flex flex-wrap gap-2 text-xs">
            <span className="text-gray-500 self-center">Presets:</span>
            {[
              'I want to improve my English speaking fluency.',
              'Could you please recommend a good restaurant near here?',
              'Yesterday the weather was surprisingly sunny and warm.',
              'Hard work and consistent practice lead to rapid success.'
            ].map((s, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setTargetSentence(s);
                  setRecognizedText('');
                  setMatchScore(null);
                }}
                className={`px-3 py-1 rounded-lg border transition-colors ${
                  targetSentence === s
                    ? 'border-[#124F40] bg-emerald-50 text-[#124F40] font-semibold dark:bg-emerald-950/60 dark:text-emerald-300'
                    : 'border-gray-200 dark:border-neutral-800 text-gray-600 dark:text-gray-400 hover:bg-gray-50'
                }`}
              >
                Sentence {idx + 1}
              </button>
            ))}
          </div>

          {/* Recording Area */}
          <div className="pt-4 flex flex-col items-center justify-center space-y-4">
            <button
              onClick={handleStartRecording}
              disabled={isRecording}
              className={`p-6 rounded-full transition-all shadow-md ${
                isRecording
                  ? 'bg-rose-500 text-white animate-pulse'
                  : 'bg-[#124F40] hover:bg-[#0d3b30] text-white hover:scale-105'
              }`}
              title="Click to Record"
            >
              <Mic className="w-8 h-8" />
            </button>
            <p className="text-xs text-gray-500">
              {isRecording ? 'Listening... Speak clearly into your microphone' : 'Tap the microphone to speak'}
            </p>
          </div>

          {/* Result Card */}
          {recognizedText && (
            <div className="p-5 rounded-2xl bg-gray-50 dark:bg-neutral-800/60 border border-gray-200 dark:border-neutral-700 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-gray-500">
                  What we heard
                </span>
                {matchScore !== null && (
                  <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                    matchScore >= 80 
                      ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300' 
                      : 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300'
                  }`}>
                    {matchScore}% Match
                  </span>
                )}
              </div>
              <p className="text-base text-gray-900 dark:text-white font-medium">
                "{recognizedText}"
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
export default EnglishSpeakingPronunciationPage;
