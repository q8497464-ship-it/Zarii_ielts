import React, { useState } from 'react';
import {
  MessageSquareHeart,
  Star,
  Send,
  Download,
  X,
  CheckCircle2,
  Heart,
  Sparkles,
  FileText,
} from 'lucide-react';
import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { useAppStore } from '../../store/useAppStore';
import { communicationStore, type FeedbackCategory } from '../../shared/communication/communicationStore';
import type { UserFeedbackItem } from '../../types';

const STORAGE_KEY = 'zarii_user_feedback';

export function getStoredFeedback(): UserFeedbackItem[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function saveFeedbackItem(item: Omit<UserFeedbackItem, 'id' | 'timestamp' | 'version' | 'pageUrl'>): UserFeedbackItem {
  const current = getStoredFeedback();
  const newItem: UserFeedbackItem = {
    ...item,
    id: `fb_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
    timestamp: new Date().toISOString(),
    pageUrl: typeof window !== 'undefined' ? window.location.pathname : '/',
    version: '0.1.0',
  };
  current.push(newItem);
  if (typeof window !== 'undefined') {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(current));
  }
  return newItem;
}

export function exportFeedbackJson(): string {
  const items = getStoredFeedback();
  const payload = {
    appName: 'Zarii IELTS Feedback Export',
    exportedAt: new Date().toISOString(),
    totalItems: items.length,
    items,
  };
  return JSON.stringify(payload, null, 2);
}

export function FeedbackWidget() {
  const { addToast } = useAppStore();
  const [isOpen, setIsOpen] = useState(false);
  const [rating, setRating] = useState<number>(5);
  const [hoverRating, setHoverRating] = useState<number | null>(null);
  const [category, setCategory] = useState<string>('Overall Experience');
  const [comment, setComment] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [submitted, setSubmitted] = useState<boolean>(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!comment.trim()) return;

    saveFeedbackItem({
      rating,
      category,
      comment: comment.trim(),
      email: email.trim() || undefined,
    });

    const mappedCategory: FeedbackCategory =
      category.includes('Audio') ? 'Audio Problem' :
      category.includes('Content') ? 'Content Issue' :
      category.includes('Feature') ? 'Feature Suggestion' :
      category.includes('Bug') ? 'Bug Report' : 'General';

    communicationStore.submitStudentFeedback({
      user_name: email.trim() ? email.split('@')[0] : 'Candidate',
      user_email: email.trim() || 'candidate@zarii.app',
      category: mappedCategory,
      rating,
      message: comment.trim(),
      page: typeof window !== 'undefined' ? window.location.pathname : '/',
    });

    setSubmitted(true);
    addToast({
      type: 'success',
      title: 'Thank You for Your Feedback!',
      message: 'Your feedback has been saved and shared with the academic team.',
    });
  };

  const handleDownloadExport = () => {
    const json = exportFeedbackJson();
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `zarii-feedback-export-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
    addToast({
      type: 'info',
      title: 'Feedback Exported',
      message: 'Downloaded feedback log file.',
    });
  };

  const storedCount = getStoredFeedback().length;

  return (
    <>
      {/* Discreet Floating Trigger in Bottom-Right */}
      <div className="fixed bottom-20 md:bottom-6 right-4 sm:right-6 z-40">
        <button
          onClick={() => {
            setSubmitted(false);
            setIsOpen(true);
          }}
          className="flex items-center gap-2 px-3 py-2 rounded-full shadow-lg bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs tracking-tight transition-all hover:scale-105 active:scale-95 group focus:outline-none focus:ring-2 focus:ring-teal-400 focus:ring-offset-2"
          aria-label="Give feedback on Zarii"
          title="Share your feedback or suggestions"
        >
          <MessageSquareHeart className="w-4 h-4 transition-transform group-hover:rotate-12" />
          <span className="hidden sm:inline">Feedback</span>
        </button>
      </div>

      {/* Feedback Modal */}
      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Share Your Feedback"
        size="md"
      >
        {submitted ? (
          <div className="text-center py-6 space-y-4 text-slate-800 dark:text-slate-200">
            <div className="w-12 h-12 rounded-full bg-teal-100 dark:bg-teal-950 text-teal-600 dark:text-teal-400 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-7 h-7" />
            </div>
            <div className="space-y-1">
              <h3 className="font-bold text-base text-slate-900 dark:text-white">
                Feedback Recorded Locally
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 max-w-xs mx-auto leading-relaxed">
                Thank you for helping us make Zarii better. Your entry is safely stored in local browser memory.
              </p>
            </div>

            <div className="pt-2 flex items-center justify-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handleDownloadExport}
                leftIcon={<Download className="w-3.5 h-3.5" />}
              >
                Export All Feedback ({storedCount})
              </Button>
              <Button variant="teal" size="sm" onClick={() => setIsOpen(false)}>
                Done
              </Button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 text-slate-800 dark:text-slate-200">
            {/* Rating Stars */}
            <div className="space-y-1.5 text-center">
              <label className="text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider block">
                How is your preparation experience?
              </label>
              <div className="flex items-center justify-center gap-1.5 pt-1">
                {[1, 2, 3, 4, 5].map((starVal) => {
                  const active = (hoverRating ?? rating) >= starVal;
                  return (
                    <button
                      key={starVal}
                      type="button"
                      onClick={() => setRating(starVal)}
                      onMouseEnter={() => setHoverRating(starVal)}
                      onMouseLeave={() => setHoverRating(null)}
                      className="p-1.5 rounded-lg hover:scale-110 transition-transform focus:outline-none"
                      aria-label={`${starVal} star rating`}
                    >
                      <Star
                        className={`w-6 h-6 transition-colors ${
                          active
                            ? 'text-amber-400 fill-amber-400'
                            : 'text-slate-300 dark:text-slate-600'
                        }`}
                      />
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Category Select */}
            <div className="space-y-1">
              <label className="text-2xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                Module / Topic
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-500"
              >
                <option>Overall Experience</option>
                <option>Reading Test Simulation</option>
                <option>Listening Audio &amp; Questions</option>
                <option>Writing Task 1 &amp; Task 2</option>
                <option>Speaking &amp; Speech Recognition</option>
                <option>Vocabulary &amp; Spaced Repetition</option>
                <option>Study Plan &amp; Daily Goals</option>
                <option>Bug Report / Answer Key Correction</option>
                <option>Feature Suggestion</option>
              </select>
            </div>

            {/* Comment */}
            <div className="space-y-1">
              <label className="text-2xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                What went well, or what could be improved?
              </label>
              <textarea
                required
                rows={3}
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Share your thoughts, suggested features, or bug details..."
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>

            {/* Optional Email */}
            <div className="space-y-1">
              <label className="text-2xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                Email Address (Optional — if you'd like a response)
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="candidate@example.com"
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>

            {/* Actions */}
            <div className="pt-2 flex items-center justify-between">
              {storedCount > 0 ? (
                <button
                  type="button"
                  onClick={handleDownloadExport}
                  className="text-2xs font-semibold text-slate-500 dark:text-slate-400 hover:text-teal-600 dark:hover:text-teal-400 flex items-center gap-1"
                  title="Export existing saved feedback entries as JSON"
                >
                  <Download className="w-3 h-3" />
                  Export History ({storedCount})
                </button>
              ) : (
                <span className="text-2xs text-slate-400 dark:text-slate-400">Stores 100% locally</span>
              )}

              <div className="flex items-center gap-2">
                <Button variant="ghost" size="sm" onClick={() => setIsOpen(false)}>
                  Cancel
                </Button>
                <Button variant="teal" size="sm" type="submit" rightIcon={<Send className="w-3 h-3" />}>
                  Submit
                </Button>
              </div>
            </div>
          </form>
        )}
      </Modal>
    </>
  );
}
