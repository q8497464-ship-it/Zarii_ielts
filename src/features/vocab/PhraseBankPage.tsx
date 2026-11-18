import React, { useState, useMemo } from 'react';
import {
  BookOpen,
  Search,
  Copy,
  Check,
  Volume2,
  Filter,
  Sparkles,
  ArrowRight,
  GraduationCap,
  Layers,
} from 'lucide-react';
import { ALL_PHRASE_CATEGORIES } from './vocabContent';
import type { WritingPhraseCategory, WritingPhraseItem } from '../../types';

type SectionFilter = 'all' | 'task1_academic' | 'task1_general' | 'task2_essay';

export const PhraseBankPage: React.FC = () => {
  const [selectedSection, setSelectedSection] = useState<SectionFilter>('all');
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [copiedPhrase, setCopiedPhrase] = useState<string | null>(null);

  const speakPhrase = (text: string) => {
    if (!('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-GB';
    utterance.rate = 0.95;
    window.speechSynthesis.speak(utterance);
  };

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedPhrase(text);
      setTimeout(() => setCopiedPhrase(null), 2000);
    } catch {
      // Fallback
      const textArea = document.createElement('textarea');
      textArea.value = text;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setCopiedPhrase(text);
      setTimeout(() => setCopiedPhrase(null), 2000);
    }
  };

  // Grouped Categories
  const filteredCategories = useMemo(() => {
    return ALL_PHRASE_CATEGORIES.filter((cat) => {
      if (selectedSection === 'task1_academic') {
        return cat.category.startsWith('task1_academic');
      }
      if (selectedSection === 'task1_general') {
        return cat.category.startsWith('task1_general');
      }
      if (selectedSection === 'task2_essay') {
        return cat.category.startsWith('task2');
      }
      return true;
    });
  }, [selectedSection]);

  // Filtered phrase items
  const displayCategories = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();

    return filteredCategories
      .filter((cat) => activeCategory === 'all' || cat.category === activeCategory)
      .map((cat) => {
        if (!q) return cat;

        const matchingPhrases = cat.phrases.filter(
          (p) =>
            p.phrase.toLowerCase().includes(q) ||
            p.function.toLowerCase().includes(q) ||
            p.example.toLowerCase().includes(q)
        );

        return {
          ...cat,
          phrases: matchingPhrases,
        };
      })
      .filter((cat) => cat.phrases.length > 0);
  }, [filteredCategories, activeCategory, searchQuery]);

  const totalPhrasesCount = useMemo(() => {
    return displayCategories.reduce((acc, cat) => acc + cat.phrases.length, 0);
  }, [displayCategories]);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-700 text-white p-6 sm:p-8 rounded-2xl shadow-lg mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-sm text-xs font-semibold mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              Band 7.5 - 9.0 Lexical Resource & Cohesion
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              IELTS Writing Phrase Bank
            </h1>
            <p className="mt-2 text-white/90 text-sm sm:text-base max-w-2xl">
              Certified academic sentence starters, linking devices, and examiner-approved structures
              for Academic Task 1, General Training letters, and Task 2 essays.
            </p>
          </div>
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 text-center sm:text-right border border-white/20 self-start sm:self-auto">
            <span className="text-2xl font-black">{totalPhrasesCount}</span>
            <span className="block text-xs uppercase tracking-wider text-white/80">Available Phrases</span>
          </div>
        </div>
      </div>

      {/* Controls & Search */}
      <div className="space-y-4 mb-8">
        {/* Main Section Filter Tabs */}
        <div className="flex flex-wrap gap-2 p-1.5 bg-slate-100 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
          <button
            onClick={() => {
              setSelectedSection('all');
              setActiveCategory('all');
            }}
            className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
              selectedSection === 'all'
                ? 'bg-white dark:bg-slate-700 text-teal-700 dark:text-teal-400 shadow-sm'
                : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            All Sections
          </button>
          <button
            onClick={() => {
              setSelectedSection('task1_academic');
              setActiveCategory('all');
            }}
            className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
              selectedSection === 'task1_academic'
                ? 'bg-white dark:bg-slate-700 text-teal-700 dark:text-teal-400 shadow-sm'
                : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Academic Task 1 (Charts/Maps)
          </button>
          <button
            onClick={() => {
              setSelectedSection('task1_general');
              setActiveCategory('all');
            }}
            className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
              selectedSection === 'task1_general'
                ? 'bg-white dark:bg-slate-700 text-teal-700 dark:text-teal-400 shadow-sm'
                : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            General Training Task 1 (Letters)
          </button>
          <button
            onClick={() => {
              setSelectedSection('task2_essay');
              setActiveCategory('all');
            }}
            className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
              selectedSection === 'task2_essay'
                ? 'bg-white dark:bg-slate-700 text-teal-700 dark:text-teal-400 shadow-sm'
                : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Task 2 Essays (Academic & GT)
          </button>
        </div>

        {/* Subcategory Pills & Search Bar */}
        <div className="flex flex-col md:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search phrases by function, keywords, or examples..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-teal-500 focus:outline-none"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              >
                Clear
              </button>
            )}
          </div>

          {filteredCategories.length > 1 && (
            <select
              value={activeCategory}
              onChange={(e) => setActiveCategory(e.target.value)}
              className="px-3 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-teal-500 focus:outline-none"
            >
              <option value="all">All Subcategories ({filteredCategories.length})</option>
              {filteredCategories.map((c) => (
                <option key={c.category} value={c.category}>
                  {c.categoryTitle}
                </option>
              ))}
            </select>
          )}
        </div>
      </div>

      {/* Phrases Display */}
      {displayCategories.length === 0 ? (
        <div className="text-center py-16 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-8">
          <BookOpen className="w-12 h-12 mx-auto text-slate-400 mb-4" />
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">No matching phrases found</h3>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 max-w-sm mx-auto">
            Try adjusting your search terms or selecting another category above.
          </p>
        </div>
      ) : (
        <div className="space-y-8">
          {displayCategories.map((category) => (
            <div
              key={category.category}
              className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 overflow-hidden shadow-sm"
            >
              {/* Category Header */}
              <div className="px-6 py-4 bg-slate-50 dark:bg-slate-800/80 border-b border-slate-200 dark:border-slate-700">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <span className="p-1.5 rounded-lg bg-teal-100 dark:bg-teal-900/40 text-teal-700 dark:text-teal-400">
                      <Layers className="w-4 h-4" />
                    </span>
                    <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                      {category.categoryTitle}
                    </h2>
                  </div>
                  <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300">
                    {category.phrases.length} phrases
                  </span>
                </div>
                {category.description && (
                  <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
                    {category.description}
                  </p>
                )}
              </div>

              {/* Phrase Items Grid */}
              <div className="divide-y divide-slate-100 dark:divide-slate-700/60">
                {category.phrases.map((item, idx) => {
                  const isCopied = copiedPhrase === item.phrase;

                  return (
                    <div
                      key={idx}
                      className="p-5 sm:p-6 hover:bg-slate-50/70 dark:hover:bg-slate-700/30 transition-colors flex flex-col md:flex-row md:items-start justify-between gap-4"
                    >
                      <div className="space-y-2 flex-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="inline-block px-2 py-0.5 rounded text-xs font-semibold bg-teal-50 dark:bg-teal-900/40 text-teal-700 dark:text-teal-300 border border-teal-200/60 dark:border-teal-700/60">
                            {item.function}
                          </span>
                        </div>

                        {/* Phrase */}
                        <div className="text-base sm:text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                          <span>{item.phrase}</span>
                        </div>

                        {/* Example */}
                        <div className="text-sm text-slate-600 dark:text-slate-300 bg-slate-50 dark:bg-slate-900/50 p-3 rounded-lg border border-slate-200/70 dark:border-slate-800">
                          <span className="font-semibold text-xs text-slate-500 dark:text-slate-400 block mb-1">
                            In context:
                          </span>
                          <span className="italic">"{item.example}"</span>
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex items-center gap-2 shrink-0 self-end md:self-start">
                        <button
                          onClick={() => speakPhrase(item.phrase)}
                          title="Listen to pronunciation"
                          className="p-2 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 transition-colors"
                        >
                          <Volume2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => copyToClipboard(item.phrase)}
                          className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold border transition-all ${
                            isCopied
                              ? 'bg-teal-600 border-teal-600 text-white'
                              : 'border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200'
                          }`}
                        >
                          {isCopied ? (
                            <>
                              <Check className="w-3.5 h-3.5" />
                              Copied!
                            </>
                          ) : (
                            <>
                              <Copy className="w-3.5 h-3.5" />
                              Copy
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
