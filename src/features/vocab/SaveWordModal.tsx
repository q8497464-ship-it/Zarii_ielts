import React, { useState, useEffect } from 'react';
import { BookmarkPlus, X, Check, BookOpen, Sparkles } from 'lucide-react';
import { db } from '../../lib/db';
import { createInitialVocabProgress } from './sm2';
import type { PartOfSpeech } from '../../types';

interface SaveWordModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialWord?: string;
  initialContext?: string;
  onSaved?: (word: string) => void;
}

export const SaveWordModal: React.FC<SaveWordModalProps> = ({
  isOpen,
  onClose,
  initialWord = '',
  initialContext = '',
  onSaved,
}) => {
  const [word, setWord] = useState(initialWord);
  const [partOfSpeech, setPartOfSpeech] = useState<PartOfSpeech>('noun');
  const [meaning, setMeaning] = useState('');
  const [urduMeaning, setUrduMeaning] = useState('');
  const [example, setExample] = useState(initialContext);
  const [isSaving, setIsSaving] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setWord(initialWord);
      setExample(initialContext);
      setMeaning('');
      setUrduMeaning('');
      setSavedSuccess(false);
    }
  }, [isOpen, initialWord, initialContext]);

  if (!isOpen) return null;

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    const cleanWord = word.trim().toLowerCase();
    if (!cleanWord || !meaning.trim()) return;

    setIsSaving(true);
    try {
      const customId = `custom_${Date.now()}_${cleanWord.replace(/\s+/g, '_')}`;
      const entry = createInitialVocabProgress(customId, true, {
        word: cleanWord,
        partOfSpeech,
        meaning: meaning.trim(),
        urduMeaning: urduMeaning.trim() || undefined,
        example: example.trim() || undefined,
      });

      await db.vocabProgress.put(entry);
      setSavedSuccess(true);
      if (onSaved) onSaved(cleanWord);

      setTimeout(() => {
        setIsSaving(false);
        onClose();
      }, 1000);
    } catch (err) {
      console.error('Failed to save word to Personal Word Bank:', err);
      setIsSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white dark:bg-slate-800 rounded-2xl max-w-md w-full shadow-2xl border border-slate-200 dark:border-slate-700 overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-700 flex items-center justify-between bg-slate-50 dark:bg-slate-800/80">
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-teal-100 dark:bg-teal-900/50 text-teal-700 dark:text-teal-400">
              <BookmarkPlus className="w-5 h-5" />
            </span>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Save Word to Bank
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSave} className="p-6 space-y-4">
          {savedSuccess ? (
            <div className="py-6 text-center space-y-2">
              <div className="w-12 h-12 rounded-full bg-emerald-100 dark:bg-emerald-900/50 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto">
                <Check className="w-6 h-6" />
              </div>
              <h4 className="font-bold text-slate-900 dark:text-white">Word Saved!</h4>
              <p className="text-xs text-slate-500">Added to your Personal Word Bank and SM-2 review queue.</p>
            </div>
          ) : (
            <>
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
                  Vocabulary Word *
                </label>
                <input
                  type="text"
                  required
                  value={word}
                  onChange={(e) => setWord(e.target.value)}
                  placeholder="e.g. ubiquitous"
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-teal-500 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
                    Part of Speech
                  </label>
                  <select
                    value={partOfSpeech}
                    onChange={(e) => setPartOfSpeech(e.target.value as PartOfSpeech)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-teal-500 focus:outline-none"
                  >
                    <option value="noun">Noun</option>
                    <option value="verb">Verb</option>
                    <option value="adjective">Adjective</option>
                    <option value="adverb">Adverb</option>
                    <option value="phrase">Phrase / Idiom</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
                    Urdu Meaning (اردو)
                  </label>
                  <input
                    type="text"
                    value={urduMeaning}
                    onChange={(e) => setUrduMeaning(e.target.value)}
                    placeholder="e.g. ہر جگہ موجود"
                    dir="rtl"
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-teal-500 focus:outline-none text-right font-serif"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
                  Definition / Meaning *
                </label>
                <textarea
                  required
                  rows={2}
                  value={meaning}
                  onChange={(e) => setMeaning(e.target.value)}
                  placeholder="Present, appearing, or found everywhere..."
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-teal-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
                  Reading Context / Example Sentence
                </label>
                <textarea
                  rows={2}
                  value={example}
                  onChange={(e) => setExample(e.target.value)}
                  placeholder="Context where you found this word..."
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-teal-500 focus:outline-none"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 text-sm text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSaving || !word.trim() || !meaning.trim()}
                  className="px-5 py-2 rounded-xl text-sm font-semibold bg-teal-600 hover:bg-teal-700 disabled:opacity-50 text-white transition-all shadow-md"
                >
                  {isSaving ? 'Saving...' : 'Save to Bank'}
                </button>
              </div>
            </>
          )}
        </form>
      </div>
    </div>
  );
};
