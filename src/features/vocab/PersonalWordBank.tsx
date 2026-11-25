import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  Plus,
  Search,
  Trash2,
  CheckCircle2,
  BookOpen,
  Volume2,
  Sparkles,
  Layers,
  X,
} from 'lucide-react';
import { db } from '../../lib/db';
import { createInitialVocabProgress } from './sm2';
import { speakExaminerText } from '../speaking/speechUtils';
import { copy } from '../../lib/copy';
import type { VocabProgress } from '../../types';

export function PersonalWordBank() {
  const navigate = useNavigate();

  const [words, setWords] = useState<VocabProgress[]>([]);
  const [selectedTrack, setSelectedTrack] = useState<'all' | 'ielts' | 'english'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);

  // New word form state
  const [newWord, setNewWord] = useState('');
  const [newPartOfSpeech, setNewPartOfSpeech] = useState<'noun' | 'verb' | 'adjective' | 'adverb'>('noun');
  const [newDefinition, setNewDefinition] = useState('');
  const [newUrdu, setNewUrdu] = useState('');
  const [newExample, setNewExample] = useState('');
  const [newTopic, setNewTopic] = useState('reading');

  const loadWords = async () => {
    try {
      const all = await db.vocabProgress.reverse().sortBy('lastReviewedAt');
      setWords(all);
    } catch (err) {
      console.error('Failed to load vocab word bank:', err);
    }
  };

  useEffect(() => {
    loadWords();
  }, []);

  const handleAddWord = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newWord.trim() || !newDefinition.trim()) return;

    const initial = createInitialVocabProgress({
      word: newWord.trim(),
      definition: newDefinition.trim(),
      urduMeaning: newUrdu.trim(),
      partOfSpeech: newPartOfSpeech,
      topic: newTopic.trim(),
      exampleSentence: newExample.trim(),
      isCustom: true,
    });

    await db.vocabProgress.add(initial);

    // Reset form
    setNewWord('');
    setNewDefinition('');
    setNewUrdu('');
    setNewExample('');
    setShowAddModal(false);
    loadWords();
  };

  const handleDeleteWord = async (id?: number) => {
    if (!id) return;
    if (window.confirm('Are you sure you want to delete this word from your bank?')) {
      await db.vocabProgress.delete(id);
      loadWords();
    }
  };

  const handleToggleMastered = async (item: VocabProgress) => {
    if (!item.id) return;
    await db.vocabProgress.update(item.id, {
      mastered: !item.mastered,
    });
    loadWords();
  };

  const filtered = words.filter((w) => {
    if (selectedTrack !== 'all' && (w.track || 'ielts') !== selectedTrack) return false;
    const q = searchQuery.trim().toLowerCase();
    if (!q) return true;
    return (
      w.word.toLowerCase().includes(q) ||
      w.definition.toLowerCase().includes(q) ||
      (w.urduMeaning && w.urduMeaning.includes(q)) ||
      (w.topic && w.topic.toLowerCase().includes(q))
    );
  });

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-4">
        <div className="flex items-center gap-3">
          <Link
            to="/vocab"
            className="p-2 rounded-lg text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-teal-600 dark:text-teal-400">
              Personalized Lexicon
            </span>
            <h1 className="text-xl font-bold text-slate-800 dark:text-slate-100">
              Personal Word Bank & Reading Lexicon
            </h1>
          </div>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-xl text-xs sm:text-sm font-semibold shadow-sm transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>Add Custom Word</span>
        </button>
      </div>

      {/* Search & Actions Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-white dark:bg-slate-800 p-4 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm">
        <select
          aria-label="Filter by track"
          value={selectedTrack}
          onChange={(e) => setSelectedTrack(e.target.value as 'all' | 'ielts' | 'english')}
          className="text-xs px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-200 font-semibold focus:outline-none"
        >
          <option value="all">All Tracks</option>
          <option value="ielts">IELTS Track</option>
          <option value="english">English Course</option>
        </select>

        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search saved words, definitions, or Urdu translations..."
            className="w-full pl-9 pr-4 py-2 text-xs rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-200 focus:ring-2 focus:ring-teal-500"
          />
        </div>

        <div className="flex items-center gap-2 text-xs">
          <button
            onClick={() => navigate('/vocab/flashcards')}
            className="px-4 py-2 bg-slate-900 hover:bg-slate-800 dark:bg-slate-100 dark:hover:bg-white text-white dark:text-slate-900 rounded-lg font-semibold flex items-center gap-1.5 whitespace-nowrap"
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Study in Flashcards</span>
          </button>
        </div>
      </div>

      {/* Words List */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 overflow-hidden shadow-sm">
        <div className="p-4 border-b border-slate-200 dark:border-slate-700 flex items-center justify-between text-xs text-slate-500">
          <span>{filtered.length} words in your lexicon</span>
          <span>Click speaker to pronounce</span>
        </div>

        {filtered.length === 0 ? (
          <div className="p-12 text-center text-xs text-slate-500 dark:text-slate-400 space-y-1.5">
            <BookOpen className="w-8 h-8 mx-auto text-brand-700/40 dark:text-brand-400/40" />
            <p className="font-semibold text-slate-800 dark:text-slate-200 text-sm">{copy.emptyStates.vocab.title}</p>
            <p>{copy.emptyStates.vocab.description}</p>
          </div>
        ) : (
          <div className="divide-y divide-slate-100 dark:divide-slate-700/60">
            {filtered.map((item) => (
              <div
                key={item.id || item.wordId}
                className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs hover:bg-slate-50/50 dark:hover:bg-slate-750 transition-colors"
              >
                <div className="space-y-1.5 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-900 dark:text-white text-base">
                      {item.word}
                    </span>
                    <button
                      onClick={() => speakExaminerText(item.word)}
                      className="p-1 rounded text-slate-400 hover:text-teal-600"
                      title="Pronounce"
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => navigate(`/app/dictionary/${encodeURIComponent(item.word.toLowerCase())}`)}
                      className="p-1 rounded text-slate-400 hover:text-[#124F40] dark:hover:text-[#5BB78D]"
                      title="Lookup in English Dictionary"
                    >
                      <BookOpen className="w-3.5 h-3.5" />
                    </button>
                    {item.partOfSpeech && (
                      <span className="text-[11px] text-slate-400 italic">
                        ({item.partOfSpeech})
                      </span>
                    )}
                    {item.topic && (
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 capitalize">
                        {item.topic}
                      </span>
                    )}
                    {item.isCustom && (
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-teal-100 text-teal-800 dark:bg-teal-950 dark:text-teal-300">
                        Custom
                      </span>
                    )}
                  </div>

                  <p className="text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
                    {item.definition}
                  </p>

                  {item.urduMeaning && (
                    <p className="text-teal-700 dark:text-teal-300 font-serif text-sm">
                      {item.urduMeaning}
                    </p>
                  )}

                  {item.exampleSentence && (
                    <p className="text-slate-500 italic">
                      "{item.exampleSentence}"
                    </p>
                  )}
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() => handleToggleMastered(item)}
                    className={`px-2.5 py-1 rounded-lg text-xs font-semibold flex items-center gap-1 transition-colors ${
                      item.mastered
                        ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                        : 'text-slate-400 hover:text-slate-600 border border-slate-200 dark:border-slate-700'
                    }`}
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>{item.mastered ? 'Mastered' : 'Learning'}</span>
                  </button>

                  <button
                    onClick={() => handleDeleteWord(item.id)}
                    className="p-1.5 text-slate-400 hover:text-rose-600 rounded"
                    title="Delete word"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Add Custom Word Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 max-w-md w-full shadow-xl border border-slate-200 dark:border-slate-700 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-700 pb-3">
              <h3 className="font-bold text-sm text-slate-800 dark:text-slate-100">
                Add New Word to Lexicon
              </h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="p-1 text-slate-400 hover:text-slate-600"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleAddWord} className="space-y-3 text-xs">
              <div>
                <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                  Word *
                </label>
                <input
                  type="text"
                  required
                  value={newWord}
                  onChange={(e) => setNewWord(e.target.value)}
                  placeholder="e.g. paradigm"
                  className="w-full p-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                    Part of Speech
                  </label>
                  <select
                    value={newPartOfSpeech}
                    onChange={(e: any) => setNewPartOfSpeech(e.target.value)}
                    className="w-full p-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900"
                  >
                    <option value="noun">Noun</option>
                    <option value="verb">Verb</option>
                    <option value="adjective">Adjective</option>
                    <option value="adverb">Adverb</option>
                  </select>
                </div>
                <div>
                  <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                    Topic
                  </label>
                  <input
                    type="text"
                    value={newTopic}
                    onChange={(e) => setNewTopic(e.target.value)}
                    placeholder="e.g. reading, science"
                    className="w-full p-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900"
                  />
                </div>
              </div>

              <div>
                <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                  English Definition *
                </label>
                <textarea
                  required
                  rows={2}
                  value={newDefinition}
                  onChange={(e) => setNewDefinition(e.target.value)}
                  placeholder="Meaning in English..."
                  className="w-full p-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900"
                />
              </div>

              <div>
                <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                  Urdu Meaning (Optional)
                </label>
                <input
                  type="text"
                  value={newUrdu}
                  onChange={(e) => setNewUrdu(e.target.value)}
                  placeholder="اردو معنی..."
                  className="w-full p-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 font-serif"
                />
              </div>

              <div>
                <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                  Example Sentence (Optional)
                </label>
                <textarea
                  rows={2}
                  value={newExample}
                  onChange={(e) => setNewExample(e.target.value)}
                  placeholder="Academic example sentence..."
                  className="w-full p-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 border rounded-lg text-slate-600 dark:text-slate-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-lg font-semibold"
                >
                  Save to Word Bank
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
