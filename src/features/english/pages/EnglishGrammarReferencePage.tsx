import React, { useState, useMemo } from 'react';
import { 
  BookOpen, 
  Search, 
  Filter, 
  CheckCircle, 
  ChevronDown, 
  ChevronUp, 
  Volume2, 
  Sparkles,
  Layers
} from 'lucide-react';
import type { EnglishCEFRLevel } from '../../../types';

interface GrammarRule {
  id: string;
  category: 'Tenses' | 'Sentence Structure' | 'Conditionals' | 'Parts of Speech' | 'Voice & Speech';
  level: EnglishCEFRLevel;
  title: string;
  formula?: string;
  explanation: string;
  urduExplanation?: string;
  examples: Array<{
    en: string;
    ur?: string;
  }>;
  commonMistakes?: Array<{
    incorrect: string;
    correct: string;
    reason: string;
  }>;
}

const GRAMMAR_RULES: GrammarRule[] = [
  {
    id: 'present-simple',
    category: 'Tenses',
    level: 'A1',
    title: 'Present Simple Tense',
    formula: 'Subject + Verb (base / -s / -es) + Object',
    explanation: 'Used for habits, permanent situations, universal truths, and regular routines.',
    urduExplanation: 'یہ زمانہ روزمرہ کی عادات، معمولات اور دائمی سچائیوں کو بیان کرنے کے لیے استعمال ہوتا ہے۔',
    examples: [
      { en: 'She works at a hospital.', ur: 'وہ ایک ہسپتال میں کام کرتی ہے۔' },
      { en: 'The sun rises in the east.', ur: 'سورج مشرق سے نکلتا ہے۔' },
      { en: 'They do not drink coffee.', ur: 'وہ کافی نہیں پیتے۔' }
    ],
    commonMistakes: [
      {
        incorrect: 'He work every day.',
        correct: 'He works every day.',
        reason: 'Third-person singular (he/she/it) takes an -s or -es suffix in present simple.'
      }
    ]
  },
  {
    id: 'present-continuous',
    category: 'Tenses',
    level: 'A1',
    title: 'Present Continuous (Progressive)',
    formula: 'Subject + am / is / are + Verb-ing',
    explanation: 'Used for actions happening right now at the moment of speaking or temporary situations.',
    urduExplanation: 'یہ زمانہ ان کاموں کے لیے استعمال ہوتا ہے جو بات کرنے کے وقت جاری ہوں۔',
    examples: [
      { en: 'I am studying English now.', ur: 'میں اس وقت انگریزی پڑھ رہا ہوں۔' },
      { en: 'Listen! Someone is knocking.', ur: 'سنو! کوئی دروازہ کھٹکھٹا رہا ہے۔' }
    ],
    commonMistakes: [
      {
        incorrect: 'I am knowing the answer.',
        correct: 'I know the answer.',
        reason: 'Stative verbs like know, understand, love are usually not used in continuous forms.'
      }
    ]
  },
  {
    id: 'past-simple',
    category: 'Tenses',
    level: 'A2',
    title: 'Past Simple Tense',
    formula: 'Subject + Verb-2 (past form) + Object',
    explanation: 'Used for completed actions that happened at a specific time in the past.',
    urduExplanation: 'ماضی میں مکمل ہو جانے والے کاموں کے لیے، جن کا وقت معلوم ہو، فعل کی دوسری فارم استعمال ہوتی ہے۔',
    examples: [
      { en: 'I visited Lahore last week.', ur: 'میں نے پچھلے ہفتے لاہور کا دورہ کیا۔' },
      { en: 'They did not see the movie.', ur: 'انہوں نے فلم نہیں دیکھی۔' }
    ],
    commonMistakes: [
      {
        incorrect: 'She did not went there.',
        correct: 'She did not go there.',
        reason: 'After "did not", always use the base form of the verb (go, not went).'
      }
    ]
  },
  {
    id: 'present-perfect',
    category: 'Tenses',
    level: 'B1',
    title: 'Present Perfect Tense',
    formula: 'Subject + have / has + Past Participle (V3)',
    explanation: 'Connects past events with the present moment, focusing on experience, recent completion, or ongoing relevance.',
    urduExplanation: 'ایسے کام جو ماضی میں ہوئے ہوں لیکن ان کا اثر یا تعلق موجودہ وقت سے ابھی برقرار ہو۔',
    examples: [
      { en: 'I have lived here for five years.', ur: 'میں یہاں پانچ سال سے رہ رہا ہوں۔' },
      { en: 'Have you ever visited London?', ur: 'کیا آپ کبھی لندن گئے ہیں؟' }
    ]
  },
  {
    id: 'first-conditional',
    category: 'Conditionals',
    level: 'A2',
    title: 'First Conditional (Real Possibility)',
    formula: 'If + Present Simple, ... will + Base Verb',
    explanation: 'Talks about real possibilities and likely outcomes in the future.',
    urduExplanation: 'اگر کوئی شرط مستقبل میں ممکن ہو تو نتیجہ بھی مستقبل میں ظاہر ہوگا۔',
    examples: [
      { en: 'If it rains, we will stay at home.', ur: 'اگر بارش ہوئی، تو ہم گھر پر ہی رہیں گے۔' },
      { en: 'If you study hard, you will succeed.', ur: 'اگر تم محنت کرو گے، تو کامیاب ہو جاؤ گے۔' }
    ]
  },
  {
    id: 'second-conditional',
    category: 'Conditionals',
    level: 'B1',
    title: 'Second Conditional (Hypothetical / Unreal Present)',
    formula: 'If + Past Simple, ... would + Base Verb',
    explanation: 'Talks about imaginary or unlikely situations in the present or future.',
    urduExplanation: 'فرضی یا ناممکن حالات کے لیے جن کے سچ ہونے کا امکان کم یا نہ ہونے کے برابر ہو۔',
    examples: [
      { en: 'If I had more time, I would learn Arabic.', ur: 'اگر میرے پاس مزید وقت ہوتا، تو میں عربی سیکھتا۔' },
      { en: 'If she were here, she would help us.', ur: 'اگر وہ یہاں ہوتی تو ہماری مدد کرتی۔' }
    ]
  },
  {
    id: 'passive-voice',
    category: 'Voice & Speech',
    level: 'B2',
    title: 'Passive Voice',
    formula: 'Object + be (appropriate tense) + Past Participle (V3)',
    explanation: 'Used when the focus is on the action or receiver rather than who or what performed it.',
    urduExplanation: 'جب کام کرنے والے کی بجائے کام یا اس کے اثر پر زور دینا مقصود ہو۔',
    examples: [
      { en: 'The bridge was constructed in 1998.', ur: 'یہ پل 1998 میں تعمیر کیا گیا تھا۔' },
      { en: 'English is spoken all over the world.', ur: 'پوری دنیا میں انگریزی بولی جاتی ہے۔' }
    ]
  },
  {
    id: 'relative-clauses',
    category: 'Sentence Structure',
    level: 'B1',
    title: 'Relative Clauses (Who, Which, That)',
    formula: 'Noun + [who/which/that + clause]',
    explanation: 'Used to provide essential or extra information about a person (who), thing (which/that), or place (where).',
    urduExplanation: 'کسی شخص، چیز یا جگہ کے بارے میں اضافی وضاحت دینے والے ذیلی جملے۔',
    examples: [
      { en: 'The student who won the award is my friend.', ur: 'جس طالب علم نے انعام جیتا وہ میرا دوست ہے۔' },
      { en: 'This is the book that inspired me.', ur: 'یہ وہی کتاب ہے جس نے مجھے متاثر کیا۔' }
    ]
  }
];

export const EnglishGrammarReferencePage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [expandedId, setExpandedId] = useState<string | null>('present-simple');
  const [showUrdu, setShowUrdu] = useState(true);

  const categories = useMemo(() => {
    const cats = Array.from(new Set(GRAMMAR_RULES.map(r => r.category)));
    return ['ALL', ...cats];
  }, []);

  const filteredRules = useMemo(() => {
    return GRAMMAR_RULES.filter(rule => {
      const matchesCategory = selectedCategory === 'ALL' || rule.category === selectedCategory;
      const matchesSearch = 
        rule.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        rule.explanation.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (rule.formula && rule.formula.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesCategory && matchesSearch;
    });
  }, [searchQuery, selectedCategory]);

  const speak = (text: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.9;
      utterance.lang = 'en-US';
      window.speechSynthesis.speak(utterance);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-6">
      {/* Header */}
      <div className="border-b border-gray-200 dark:border-neutral-800 pb-5">
        <div className="flex items-center gap-2 mb-1">
          <span className="p-1.5 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 text-[#124F40] dark:text-emerald-400">
            <BookOpen className="w-5 h-5" />
          </span>
          <span className="text-xs font-semibold uppercase tracking-wider text-[#124F40] dark:text-emerald-400">
            Grammar Handbook
          </span>
        </div>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              English Grammar Reference
            </h1>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              Master English sentence structures, tenses, and rules with bilingual Urdu explanations.
            </p>
          </div>
          <button
            onClick={() => setShowUrdu(!showUrdu)}
            className="self-start md:self-auto px-3.5 py-1.5 rounded-xl border border-gray-200 dark:border-neutral-800 text-xs font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-neutral-800 transition-colors"
          >
            {showUrdu ? 'Urdu Hints: ON' : 'Urdu Hints: OFF'}
          </button>
        </div>
      </div>

      {/* Search & Categories */}
      <div className="space-y-3">
        <div className="relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Search grammar topic, rule, or formula..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#124F40] dark:focus:ring-emerald-500"
          />
        </div>

        <div className="flex flex-wrap gap-2">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
                selectedCategory === cat
                  ? 'bg-[#124F40] text-white shadow-sm'
                  : 'bg-gray-100 dark:bg-neutral-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-neutral-700'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Rules Accordion / Cards */}
      <div className="space-y-4">
        {filteredRules.map(rule => {
          const isExpanded = expandedId === rule.id;

          return (
            <div
              key={rule.id}
              className="bg-white dark:bg-neutral-900 rounded-2xl border border-gray-200 dark:border-neutral-800 overflow-hidden transition-all shadow-sm"
            >
              <button
                onClick={() => setExpandedId(isExpanded ? null : rule.id)}
                className="w-full p-5 flex items-center justify-between text-left hover:bg-gray-50/50 dark:hover:bg-neutral-800/40 transition-colors"
              >
                <div className="space-y-1 pr-4">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-emerald-50 dark:bg-emerald-950 text-[#124F40] dark:text-emerald-400 border border-emerald-200/50 dark:border-emerald-800/40">
                      {rule.level}
                    </span>
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      {rule.category}
                    </span>
                  </div>
                  <h3 className="text-base font-semibold text-gray-900 dark:text-white">
                    {rule.title}
                  </h3>
                </div>

                <div className="text-gray-400">
                  {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                </div>
              </button>

              {isExpanded && (
                <div className="p-5 pt-0 border-t border-gray-100 dark:border-neutral-800 space-y-4">
                  {/* Formula */}
                  {rule.formula && (
                    <div className="mt-4 p-3 rounded-xl bg-emerald-50/60 dark:bg-emerald-950/40 border border-emerald-200/60 dark:border-emerald-800/40">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-[#124F40] dark:text-emerald-400 block mb-0.5">
                        Structure Formula
                      </span>
                      <code className="text-sm font-semibold text-[#124F40] dark:text-emerald-300 font-mono">
                        {rule.formula}
                      </code>
                    </div>
                  )}

                  {/* Explanation */}
                  <div className="space-y-2 text-sm">
                    <p className="text-gray-700 dark:text-gray-300">
                      {rule.explanation}
                    </p>
                    {showUrdu && rule.urduExplanation && (
                      <p className="text-right text-gray-600 dark:text-gray-400 font-serif" dir="rtl">
                        {rule.urduExplanation}
                      </p>
                    )}
                  </div>

                  {/* Examples */}
                  <div className="space-y-2">
                    <span className="text-xs font-semibold text-gray-900 dark:text-white uppercase tracking-wider">
                      Examples
                    </span>
                    <div className="space-y-2">
                      {rule.examples.map((ex, idx) => (
                        <div
                          key={idx}
                          className="flex items-center justify-between p-3 rounded-xl bg-gray-50 dark:bg-neutral-800/60 border border-gray-100 dark:border-neutral-800 text-sm"
                        >
                          <div>
                            <div className="font-medium text-gray-900 dark:text-white">
                              {ex.en}
                            </div>
                            {showUrdu && ex.ur && (
                              <div className="text-xs text-gray-500 dark:text-gray-400 font-serif text-right mt-0.5" dir="rtl">
                                {ex.ur}
                              </div>
                            )}
                          </div>
                          <button
                            onClick={() => speak(ex.en)}
                            className="p-1.5 rounded-lg text-gray-400 hover:text-emerald-600 hover:bg-white dark:hover:bg-neutral-700 transition-colors flex-shrink-0 ml-2"
                            aria-label="Listen"
                          >
                            <Volume2 className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Common Mistakes */}
                  {rule.commonMistakes && rule.commonMistakes.length > 0 && (
                    <div className="space-y-2 pt-2">
                      <span className="text-xs font-semibold text-rose-600 dark:text-rose-400 uppercase tracking-wider">
                        Common Mistake to Avoid
                      </span>
                      {rule.commonMistakes.map((m, idx) => (
                        <div key={idx} className="p-3 rounded-xl bg-rose-50/50 dark:bg-rose-950/20 border border-rose-200/50 dark:border-rose-900/40 text-xs space-y-1">
                          <div className="line-through text-rose-700 dark:text-rose-300">
                            ✗ {m.incorrect}
                          </div>
                          <div className="font-semibold text-emerald-700 dark:text-emerald-400">
                            ✓ {m.correct}
                          </div>
                          <p className="text-gray-600 dark:text-gray-400 mt-1">
                            {m.reason}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default EnglishGrammarReferencePage;
