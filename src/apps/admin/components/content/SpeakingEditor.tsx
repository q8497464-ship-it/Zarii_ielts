import React, { useState } from 'react';
import { Mic, Save, X, Plus, Trash2 } from 'lucide-react';
import type { SpeakingCardEntity } from '../../../../shared/types/database';
import { contentStore } from '../../../../shared/content/contentStore';
import { MarkdownEditor } from '../MarkdownEditor';
import { useAdminToast } from '../AdminToast';

interface SpeakingEditorProps {
  cardId?: string | null;
  onClose: () => void;
  onSaved: () => void;
}

export function SpeakingEditor({ cardId, onClose, onSaved }: SpeakingEditorProps) {
  const { addToast } = useAdminToast();

  const [card, setCard] = useState<SpeakingCardEntity>(() => {
    if (cardId) {
      const existing = contentStore.getSpeakingCards().find((c) => c.id === cardId);
      if (existing) return { ...existing };
    }
    return {
      id: cardId || `speak-${Date.now().toString().slice(-4)}`,
      part: 2,
      topic: '',
      cue_card_title: '',
      prompts: [
        'What the activity or object was',
        'When and where it took place',
        'Who was involved with you',
        'And explain why it made such a memorable impression on you.',
      ],
      preparation_time_seconds: 60,
      speaking_time_seconds: 120,
      model_answer: '',
      status: 'published',
      difficulty: 'exam_standard',
      band_level: 8.0,
      version: 1,
      created_at: new Date().toISOString(),
    };
  });

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!card.topic.trim()) {
      addToast({
        type: 'error',
        title: 'Topic Required',
        message: 'Speaking card must have a topic name.',
      });
      return;
    }

    contentStore.saveSpeakingCard(card);
    addToast({
      type: 'success',
      title: 'Speaking Card Stored',
      message: `Part ${card.part} card "${card.topic}" saved.`,
    });
    onSaved();
    onClose();
  };

  const handlePromptChange = (idx: number, val: string) => {
    const updated = [...card.prompts];
    updated[idx] = val;
    setCard({ ...card, prompts: updated });
  };

  const handleAddPromptBullet = () => {
    setCard({ ...card, prompts: [...card.prompts, 'New prompt bullet point...'] });
  };

  const handleRemoveBullet = (idx: number) => {
    setCard({ ...card, prompts: card.prompts.filter((_, i) => i !== idx) });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-950/80 backdrop-blur-xs">
      <div className="bg-white dark:bg-[#112019] border border-slate-200 dark:border-[#24392F] rounded-2xl w-full max-w-4xl h-[90vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50/50 dark:bg-slate-900/50 shrink-0">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-[#124F40] text-white">
              <Mic className="w-5 h-5 text-[#5BB78D]" />
            </div>
            <div>
              <h1 className="text-base font-bold text-slate-900 dark:text-white">
                {cardId ? 'Edit Speaking Card' : 'Create Speaking Assessment Card'}
              </h1>
              <p className="text-xs text-slate-500">
                Part 1 Interview Questions, Part 2 Cue Cards &amp; Part 3 Thematic Discussions
              </p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 text-slate-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSave} className="flex-1 overflow-y-auto p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                Speaking Exam Part
              </label>
              <select
                value={card.part}
                onChange={(e) => setCard({ ...card, part: Number(e.target.value) as 1 | 2 | 3 })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs font-medium text-slate-900 dark:text-white"
              >
                <option value={1}>Part 1: Introduction &amp; Interview</option>
                <option value={2}>Part 2: Long Turn Cue Card (2 Minutes)</option>
                <option value={3}>Part 3: Two-way Discussion</option>
              </select>
            </div>

            <div className="md:col-span-2">
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                Topic Subject
              </label>
              <input
                type="text"
                required
                value={card.topic}
                onChange={(e) => setCard({ ...card, topic: e.target.value })}
                placeholder="e.g. Describe an environmental project you know about"
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs font-medium text-slate-900 dark:text-white"
              />
            </div>
          </div>

          {/* Cue Points / Sub-prompts */}
          <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                {card.part === 2 ? 'Cue Card Prompts ("You should say:")' : 'Discussion Questions'}
              </label>
              <button
                type="button"
                onClick={handleAddPromptBullet}
                className="text-xs font-bold text-[#124F40] dark:text-[#5BB78D] hover:underline"
              >
                + Add Prompt
              </button>
            </div>

            <div className="space-y-2">
              {card.prompts.map((p, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <span className="w-5 text-xs font-mono text-slate-400 font-bold">{idx + 1}.</span>
                  <input
                    type="text"
                    value={p}
                    onChange={(e) => handlePromptChange(idx, e.target.value)}
                    className="flex-1 px-3 py-2 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-900 dark:text-white"
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveBullet(idx)}
                    className="p-2 text-slate-400 hover:text-rose-500"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Model Answer */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
              Band 8.5 Model Answer Speech Transcript
            </label>
            <MarkdownEditor
              value={card.model_answer || ''}
              onChange={(val) => setCard({ ...card, model_answer: val })}
              placeholder="Model answer spoken response with phonetic natural pauses and linking expressions..."
            />
          </div>

          <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-200 dark:border-slate-800">
            <button type="button" onClick={onClose} className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-white">
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl bg-[#124F40] hover:bg-[#0E3D32] text-white text-xs font-bold transition-all shadow-xs"
            >
              Save Speaking Card
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
