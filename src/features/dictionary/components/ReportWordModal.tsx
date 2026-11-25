import React, { useState } from 'react';
import { X, AlertTriangle, Send, Check } from 'lucide-react';
import { Button } from '../../../components/ui/Button';
import { useAppStore } from '../../../store/useAppStore';
import { dictionaryAdminStore } from '../dictionaryAdminStore';

interface ReportWordModalProps {
  isOpen: boolean;
  onClose: () => void;
  word: string;
}

export function ReportWordModal({ isOpen, onClose, word }: ReportWordModalProps) {
  const { addToast } = useAppStore();
  const [category, setCategory] = useState<'definition' | 'pronunciation' | 'offensive' | 'other'>('definition');
  const [details, setDetails] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      dictionaryAdminStore.submitReport(word, category, details);
    } catch (err) {
      console.warn('Failed to submit dictionary report:', err);
    }

    setTimeout(() => {
      setIsSubmitting(false);
      addToast({
        type: 'success',
        title: 'Report Submitted',
        message: `Thank you for helping improve the dictionary entry for "${word}".`,
      });
      onClose();
    }, 300);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-2xl max-w-md w-full overflow-hidden border border-slate-200 dark:border-slate-800">
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40">
          <div className="flex items-center gap-2 text-amber-600 dark:text-amber-400">
            <AlertTriangle className="w-5 h-5" />
            <h3 className="font-bold text-slate-900 dark:text-slate-100 text-sm">
              Report an Issue: <span className="capitalize">{word}</span>
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
              Problem Category
            </label>
            <div className="grid grid-cols-2 gap-2">
              {[
                { id: 'definition', label: 'Inaccurate Definition' },
                { id: 'pronunciation', label: 'Pronunciation / Audio' },
                { id: 'offensive', label: 'Inappropriate Content' },
                { id: 'other', label: 'Other Issue' },
              ].map(cat => (
                <button
                  type="button"
                  key={cat.id}
                  onClick={() => setCategory(cat.id as any)}
                  className={`p-2.5 rounded-lg border text-xs font-medium text-left transition-all ${
                    category === cat.id
                      ? 'bg-amber-50 dark:bg-amber-950/30 border-amber-500 text-amber-900 dark:text-amber-200'
                      : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 text-slate-600 dark:text-slate-400'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
              Additional Details (Optional)
            </label>
            <textarea
              rows={3}
              value={details}
              onChange={e => setDetails(e.target.value)}
              placeholder="Describe what looks incorrect or missing..."
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 text-xs focus:outline-none focus:ring-2 focus:ring-amber-500 resize-none"
            />
          </div>

          <div className="flex items-center justify-end gap-2 pt-2">
            <Button type="button" variant="ghost" size="sm" onClick={onClose}>
              Cancel
            </Button>
            <Button
              type="submit"
              size="sm"
              disabled={isSubmitting}
              className="bg-amber-600 hover:bg-amber-700 text-white gap-1.5"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Submit Report</span>
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
