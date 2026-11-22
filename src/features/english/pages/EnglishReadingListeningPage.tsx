import React, { useState } from 'react';
import { 
  Headphones, 
  BookOpen, 
  Play, 
  Pause, 
  RotateCcw, 
  Volume2, 
  CheckCircle2, 
  XCircle, 
  ChevronRight,
  Sparkles
} from 'lucide-react';
import type { EnglishCEFRLevel } from '../../../types';

interface Story {
  id: string;
  title: string;
  level: EnglishCEFRLevel;
  type: 'Dialogue' | 'Short Story' | 'News Article';
  durationMin: number;
  text: string;
  paragraphs: string[];
  urduSummary?: string;
  questions: Array<{
    id: string;
    question: string;
    options: string[];
    correctIndex: number;
    explanation: string;
  }>;
}

const STORIES: Story[] = [
  {
    id: 'story-a1-coffee',
    title: 'Ordering at a Coffee Shop',
    level: 'A1',
    type: 'Dialogue',
    durationMin: 3,
    text: "Barista: Hello! Welcome to Green Cafe. What can I get for you today?\nCustomer: Hi! Could I please have a medium cappuccino?\nBarista: Sure thing. Would you like oat milk or regular dairy milk?\nCustomer: Oat milk, please. And could I also get one blueberry muffin?\nBarista: Of course. That comes to four dollars and fifty cents.\nCustomer: Here is five dollars. Keep the change.\nBarista: Thank you very much! Have a wonderful day.",
    paragraphs: [
      "Barista: Hello! Welcome to Green Cafe. What can I get for you today?",
      "Customer: Hi! Could I please have a medium cappuccino?",
      "Barista: Sure thing. Would you like oat milk or regular dairy milk?",
      "Customer: Oat milk, please. And could I also get one blueberry muffin?",
      "Barista: Of course. That comes to four dollars and fifty cents.",
      "Customer: Here is five dollars. Keep the change.",
      "Barista: Thank you very much! Have a wonderful day."
    ],
    urduSummary: "یہ مکالمہ ایک کیفے میں کافی اور مفن آرڈر کرنے کے بارے میں ہے۔",
    questions: [
      {
        id: 'q1',
        question: 'What beverage did the customer order?',
        options: ['Black Tea', 'Medium Cappuccino', 'Iced Latte', 'Hot Chocolate'],
        correctIndex: 1,
        explanation: 'The customer explicitly asked: "Could I please have a medium cappuccino?"'
      },
      {
        id: 'q2',
        question: 'What kind of milk did the customer choose?',
        options: ['Almond milk', 'Soy milk', 'Oat milk', 'Regular dairy milk'],
        correctIndex: 2,
        explanation: 'The customer replied: "Oat milk, please."'
      },
      {
        id: 'q3',
        question: 'How much was the total order?',
        options: ['$3.50', '$4.50', '$5.00', '$6.00'],
        correctIndex: 1,
        explanation: 'The barista stated: "That comes to four dollars and fifty cents."'
      }
    ]
  },
  {
    id: 'story-b1-travel',
    title: 'The Lost Luggage Adventure',
    level: 'B1',
    type: 'Short Story',
    durationMin: 5,
    text: "When Sarah landed at Heathrow Airport after a ten-hour transatlantic flight, she expected to collect her blue suitcase and head straight to her hotel. However, as the conveyor belt slowly came to a halt, her luggage was nowhere to be seen.\n\nFeeling slightly anxious, she approached the lost baggage desk. The attendant, a courteous young man named David, assured her that bags rarely go missing permanently. He took down her bag tag number, description, and hotel address.\n\nTo Sarah's surprise, David explained that the suitcase had mistakenly been loaded onto a connecting flight to Edinburgh, but would be delivered directly to her hotel door before evening. Relieved, she took a deep breath and decided to start exploring London without letting the small delay ruin her trip.",
    paragraphs: [
      "When Sarah landed at Heathrow Airport after a ten-hour transatlantic flight, she expected to collect her blue suitcase and head straight to her hotel. However, as the conveyor belt slowly came to a halt, her luggage was nowhere to be seen.",
      "Feeling slightly anxious, she approached the lost baggage desk. The attendant, a courteous young man named David, assured her that bags rarely go missing permanently. He took down her bag tag number, description, and hotel address.",
      "To Sarah's surprise, David explained that the suitcase had mistakenly been loaded onto a connecting flight to Edinburgh, but would be delivered directly to her hotel door before evening. Relieved, she took a deep breath and decided to start exploring London without letting the small delay ruin her trip."
    ],
    urduSummary: "سارہ کا سامان ائیرپورٹ پر غلطی سے دوسری پرواز پر چلا گیا، لیکن کسٹمر سروس نے شام تک اس کے ہوٹل پہنچانے کا وعدہ کیا۔",
    questions: [
      {
        id: 'q1',
        question: 'Where did Sarah arrive?',
        options: ['JFK Airport', 'Heathrow Airport', 'Edinburgh Airport', 'Dubai Airport'],
        correctIndex: 1,
        explanation: 'Sarah landed at Heathrow Airport after her transatlantic flight.'
      },
      {
        id: 'q2',
        question: 'Where had Sarah\'s luggage mistakenly been sent?',
        options: ['Paris', 'New York', 'Edinburgh', 'Manchester'],
        correctIndex: 2,
        explanation: 'David explained that the suitcase had been mistakenly loaded onto a flight to Edinburgh.'
      }
    ]
  }
];

export const EnglishReadingListeningPage: React.FC = () => {
  const [activeStoryIndex, setActiveStoryIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackRate, setPlaybackRate] = useState<number>(0.9);
  const [userAnswers, setUserAnswers] = useState<Record<string, number>>({});
  const [showResults, setShowResults] = useState(false);

  const activeStory = STORIES[activeStoryIndex];

  const handleToggleAudio = () => {
    if (!('speechSynthesis' in window)) return;

    if (isPlaying) {
      window.speechSynthesis.cancel();
      setIsPlaying(false);
    } else {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(activeStory.text);
      utterance.rate = playbackRate;
      utterance.lang = 'en-US';
      utterance.onend = () => setIsPlaying(false);
      utterance.onerror = () => setIsPlaying(false);
      window.speechSynthesis.speak(utterance);
      setIsPlaying(true);
    }
  };

  const handleSelectAnswer = (qId: string, optIndex: number) => {
    if (showResults) return;
    setUserAnswers(prev => ({ ...prev, [qId]: optIndex }));
  };

  const handleCheckAnswers = () => {
    setShowResults(true);
  };

  const handleResetAnswers = () => {
    setUserAnswers({});
    setShowResults(false);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-6">
      {/* Header */}
      <div className="border-b border-gray-200 dark:border-neutral-800 pb-5">
        <div className="flex items-center gap-2 mb-1">
          <span className="p-1.5 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 text-[#124F40] dark:text-emerald-400">
            <Headphones className="w-5 h-5" />
          </span>
          <span className="text-xs font-semibold uppercase tracking-wider text-[#124F40] dark:text-emerald-400">
            Skills Immersion
          </span>
        </div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Reading & Listening Stories
        </h1>
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
          Listen to natural English audio dialogues and stories, then test your comprehension.
        </p>
      </div>

      {/* Story Selector */}
      <div className="flex gap-2 overflow-x-auto pb-1">
        {STORIES.map((s, idx) => (
          <button
            key={s.id}
            onClick={() => {
              if (isPlaying && 'speechSynthesis' in window) {
                window.speechSynthesis.cancel();
                setIsPlaying(false);
              }
              setActiveStoryIndex(idx);
              handleResetAnswers();
            }}
            className={`px-4 py-2 rounded-xl text-xs font-medium whitespace-nowrap transition-all border ${
              activeStoryIndex === idx
                ? 'bg-[#124F40] border-[#124F40] text-white shadow-sm'
                : 'bg-white dark:bg-neutral-900 border-gray-200 dark:border-neutral-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-neutral-800'
            }`}
          >
            <span className="font-bold mr-1.5">[{s.level}]</span>
            {s.title}
          </button>
        ))}
      </div>

      {/* Main Story Container */}
      <div className="bg-white dark:bg-neutral-900 rounded-2xl border border-gray-200 dark:border-neutral-800 p-6 md:p-8 space-y-6 shadow-sm">
        {/* Story Metadata & Audio Controls */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-100 dark:border-neutral-800 pb-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-emerald-50 dark:bg-emerald-950 text-[#124F40] dark:text-emerald-400 border border-emerald-200/50 dark:border-emerald-800/40">
                Level {activeStory.level}
              </span>
              <span className="text-xs text-gray-500">
                {activeStory.type} • ~{activeStory.durationMin} min
              </span>
            </div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mt-1">
              {activeStory.title}
            </h2>
          </div>

          {/* Audio Controls */}
          <div className="flex items-center gap-2">
            <button
              onClick={handleToggleAudio}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#124F40] hover:bg-[#0d3b30] text-white text-xs font-semibold shadow-sm transition-all"
            >
              {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              <span>{isPlaying ? 'Pause Audio' : 'Play Narration'}</span>
            </button>

            <select
              value={playbackRate}
              onChange={e => setPlaybackRate(parseFloat(e.target.value))}
              className="px-2.5 py-2 rounded-xl border border-gray-200 dark:border-neutral-800 bg-white dark:bg-neutral-800 text-xs font-medium text-gray-700 dark:text-gray-300 focus:outline-none"
              title="Speech Speed"
            >
              <option value={0.8}>0.8x Slow</option>
              <option value={0.9}>0.9x Normal</option>
              <option value={1.1}>1.1x Fast</option>
            </select>
          </div>
        </div>

        {/* Text Body */}
        <div className="space-y-4 text-base md:text-lg leading-relaxed text-gray-800 dark:text-gray-200 font-serif">
          {activeStory.paragraphs.map((para, idx) => (
            <p key={idx} className="p-2 rounded-lg hover:bg-emerald-50/40 dark:hover:bg-emerald-950/20 transition-colors">
              {para}
            </p>
          ))}
        </div>

        {/* Urdu Summary */}
        {activeStory.urduSummary && (
          <div className="p-4 rounded-xl bg-gray-50 dark:bg-neutral-800/60 border border-gray-100 dark:border-neutral-800 text-xs text-gray-600 dark:text-gray-400 font-serif text-right" dir="rtl">
            <span className="font-semibold text-gray-900 dark:text-white ml-1">خلاصہ:</span>
            {activeStory.urduSummary}
          </div>
        )}

        {/* Comprehension Quiz */}
        <div className="pt-6 border-t border-gray-100 dark:border-neutral-800 space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-emerald-600" />
              Comprehension Check
            </h3>
            {showResults && (
              <button
                onClick={handleResetAnswers}
                className="text-xs text-emerald-700 dark:text-emerald-400 hover:underline flex items-center gap-1"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                Retry Quiz
              </button>
            )}
          </div>

          <div className="space-y-5">
            {activeStory.questions.map((q, qIndex) => {
              const selectedOpt = userAnswers[q.id];

              return (
                <div key={q.id} className="space-y-3 p-4 rounded-xl bg-gray-50 dark:bg-neutral-800/40 border border-gray-100 dark:border-neutral-800">
                  <p className="font-semibold text-sm text-gray-900 dark:text-white">
                    {qIndex + 1}. {q.question}
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {q.options.map((opt, optIdx) => {
                      const isSelected = selectedOpt === optIdx;
                      const isCorrect = showResults && optIdx === q.correctIndex;
                      const isWrong = showResults && isSelected && optIdx !== q.correctIndex;

                      let style = 'border-gray-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-gray-700 dark:text-gray-300';
                      if (isSelected && !showResults) {
                        style = 'border-[#124F40] bg-emerald-50 dark:bg-emerald-950/40 text-[#124F40] dark:text-emerald-300 font-medium';
                      } else if (isCorrect) {
                        style = 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/50 text-emerald-800 dark:text-emerald-300 font-semibold';
                      } else if (isWrong) {
                        style = 'border-rose-400 bg-rose-50 dark:bg-rose-950/30 text-rose-700 dark:text-rose-300';
                      }

                      return (
                        <button
                          key={optIdx}
                          onClick={() => handleSelectAnswer(q.id, optIdx)}
                          disabled={showResults}
                          className={`p-3 rounded-lg border text-left text-xs md:text-sm flex items-center justify-between transition-all ${style}`}
                        >
                          <span>{opt}</span>
                          {isCorrect && <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />}
                          {isWrong && <XCircle className="w-4 h-4 text-rose-600 flex-shrink-0" />}
                        </button>
                      );
                    })}
                  </div>

                  {showResults && (
                    <p className="text-xs text-gray-600 dark:text-gray-400 pt-1">
                      💡 {q.explanation}
                    </p>
                  )}
                </div>
              );
            })}
          </div>

          {!showResults && (
            <div className="flex justify-end pt-2">
              <button
                onClick={handleCheckAnswers}
                disabled={Object.keys(userAnswers).length < activeStory.questions.length}
                className="px-6 py-2.5 rounded-xl bg-[#124F40] hover:bg-[#0d3b30] text-white text-xs font-semibold disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-sm"
              >
                Check Comprehension Answers
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default EnglishReadingListeningPage;
