import React, { useState } from 'react';
import {
  PenTool,
  Save,
  CheckCircle,
  Eye,
  BarChart3,
  PieChart as PieIcon,
  Table as TableIcon,
  X,
  FileText,
} from 'lucide-react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  LineChart,
  Line,
} from 'recharts';
import type { WritingPromptEntity, TaskType } from '../../../../shared/types/database';
import { contentStore } from '../../../../shared/content/contentStore';
import { MarkdownEditor } from '../MarkdownEditor';
import { useAdminToast } from '../AdminToast';

interface WritingEditorProps {
  promptId?: string | null;
  onClose: () => void;
  onSaved: () => void;
}

interface ChartDataRow {
  category: string;
  value1: number;
  value2: number;
}

export function WritingEditor({ promptId, onClose, onSaved }: WritingEditorProps) {
  const { addToast } = useAdminToast();

  const [prompt, setPrompt] = useState<WritingPromptEntity>(() => {
    if (promptId) {
      const existing = contentStore.getWritingPrompts().find((p) => p.id === promptId);
      if (existing) return { ...existing };
    }
    return {
      id: promptId || `write-${Date.now().toString().slice(-4)}`,
      task_type: 'task1_academic',
      title: '',
      prompt_text: '',
      image_url: null,
      min_words: 150,
      recommended_minutes: 20,
      sample_essay_band9: '',
      status: 'published',
      difficulty: 'exam_standard',
      topic: 'Global Economics & Environment',
      band_level: 8.5,
      version: 1,
      created_at: new Date().toISOString(),
    };
  });

  // Task 1 Chart Configuration State
  const [chartType, setChartType] = useState<'bar' | 'line' | 'table'>('bar');
  const [chartRows, setChartRows] = useState<ChartDataRow[]>([
    { category: '2010', value1: 45, value2: 30 },
    { category: '2015', value1: 62, value2: 48 },
    { category: '2020', value1: 78, value2: 65 },
    { category: '2025 (est)', value1: 95, value2: 82 },
  ]);

  // Planning Guide breakdown
  const [introPlan, setIntroPlan] = useState('Paraphrase prompt: state chart subject, timeframe, and units.');
  const [overviewPlan, setOverviewPlan] = useState('Overview: identify two overarching trends (e.g. upward trajectory of renewable energy).');
  const [bodyPlan, setBodyPlan] = useState('Body Paragraphs: group by data trends with comparative figures.');

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.title || !prompt.prompt_text) {
      addToast({
        type: 'error',
        title: 'Missing Fields',
        message: 'Title and prompt text are mandatory.',
      });
      return;
    }

    const payload: WritingPromptEntity = {
      ...prompt,
      image_url: prompt.task_type === 'task1_academic' ? JSON.stringify({ chartType, data: chartRows }) : null,
    };

    contentStore.saveWritingPrompt(payload);
    addToast({
      type: 'success',
      title: 'Writing Prompt Saved',
      message: `Prompt "${prompt.title}" saved.`,
    });
    onSaved();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-950/80 backdrop-blur-xs">
      <div className="bg-white dark:bg-[#112019] border border-slate-200 dark:border-[#24392F] rounded-2xl w-full max-w-5xl h-[92vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50/50 dark:bg-slate-900/50 shrink-0">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-[#124F40] text-white">
              <PenTool className="w-5 h-5 text-[#5BB78D]" />
            </div>
            <div>
              <h1 className="text-base font-bold text-slate-900 dark:text-white">
                {promptId ? 'Edit Writing Prompt' : 'Create New Writing Prompt'}
              </h1>
              <p className="text-xs text-slate-500">
                Task 1 (Academic Chart/General Letter) &amp; Task 2 Essay with Band 9 Model Answers
              </p>
            </div>
          </div>

          <button onClick={onClose} className="p-2 text-slate-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Form */}
        <form onSubmit={handleSave} className="flex-1 overflow-y-auto p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-2">
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                Prompt Title
              </label>
              <input
                type="text"
                required
                value={prompt.title}
                onChange={(e) => setPrompt({ ...prompt, title: e.target.value })}
                placeholder="e.g. Energy Consumption Trends (Task 1) or AI in Higher Education (Task 2)"
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs font-medium text-slate-900 dark:text-white"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                Task Classification
              </label>
              <select
                value={prompt.task_type}
                onChange={(e) => {
                  const t = e.target.value as TaskType;
                  setPrompt({
                    ...prompt,
                    task_type: t,
                    min_words: t === 'task2' ? 250 : 150,
                    recommended_minutes: t === 'task2' ? 40 : 20,
                  });
                }}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs font-medium text-slate-900 dark:text-white"
              >
                <option value="task1_academic">Task 1 (Academic Chart / Diagram)</option>
                <option value="task1_general">Task 1 (General Letter)</option>
                <option value="task2">Task 2 (Essay / Both Views / Opinion)</option>
              </select>
            </div>
          </div>

          {/* Prompt Text stimulus */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
              Official Prompt Stimulus Instructions
            </label>
            <textarea
              rows={4}
              required
              value={prompt.prompt_text}
              onChange={(e) => setPrompt({ ...prompt, prompt_text: e.target.value })}
              placeholder="The chart below shows... Summarise the information by selecting and reporting the main features..."
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs text-slate-900 dark:text-white leading-relaxed"
            />
          </div>

          {/* Interactive Chart Editor (for Task 1 Academic) */}
          {prompt.task_type === 'task1_academic' && (
            <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                    Task 1 Chart Data &amp; Interactive Live Preview
                  </h3>
                  <p className="text-[11px] text-slate-500">
                    Input category values to render an examiner-calibrated chart.
                  </p>
                </div>
                <div className="flex items-center gap-1.5 bg-white dark:bg-slate-800 p-1 rounded-lg border border-slate-200 dark:border-slate-700">
                  <button
                    type="button"
                    onClick={() => setChartType('bar')}
                    className={`px-2.5 py-1 rounded text-xs font-bold ${chartType === 'bar' ? 'bg-[#124F40] text-white' : 'text-slate-500'}`}
                  >
                    Bar Chart
                  </button>
                  <button
                    type="button"
                    onClick={() => setChartType('line')}
                    className={`px-2.5 py-1 rounded text-xs font-bold ${chartType === 'line' ? 'bg-[#124F40] text-white' : 'text-slate-500'}`}
                  >
                    Line Graph
                  </button>
                </div>
              </div>

              {/* Chart Renderer */}
              <div className="h-64 w-full bg-white dark:bg-[#112019] p-4 rounded-xl border border-slate-200 dark:border-[#24392F]">
                <ResponsiveContainer width="100%" height="100%">
                  {chartType === 'bar' ? (
                    <BarChart data={chartRows}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.3} />
                      <XAxis dataKey="category" tick={{ fontSize: 11 }} />
                      <YAxis tick={{ fontSize: 11 }} />
                      <Tooltip />
                      <Bar dataKey="value1" name="Series A (Urban)" fill="#124F40" radius={[4, 4, 0, 0]} />
                      <Bar dataKey="value2" name="Series B (Rural)" fill="#5BB78D" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  ) : (
                    <LineChart data={chartRows}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.3} />
                      <XAxis dataKey="category" tick={{ fontSize: 11 }} />
                      <YAxis tick={{ fontSize: 11 }} />
                      <Tooltip />
                      <Line type="monotone" dataKey="value1" stroke="#124F40" strokeWidth={2} />
                      <Line type="monotone" dataKey="value2" stroke="#5BB78D" strokeWidth={2} />
                    </LineChart>
                  )}
                </ResponsiveContainer>
              </div>
            </div>
          )}

          {/* Planning Guides Editor */}
          <div className="p-5 rounded-2xl bg-white dark:bg-[#112019] border border-slate-200 dark:border-[#24392F] space-y-4">
            <h3 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
              Planning Guides &amp; Structural Outline
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div>
                <label className="block text-[11px] font-semibold text-slate-600 dark:text-slate-400 mb-1">
                  Introduction &amp; Overview
                </label>
                <textarea
                  rows={3}
                  value={introPlan}
                  onChange={(e) => setIntroPlan(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs"
                />
              </div>
              <div>
                <label className="block text-[11px] font-semibold text-slate-600 dark:text-slate-400 mb-1">
                  Key Features / Body 1
                </label>
                <textarea
                  rows={3}
                  value={overviewPlan}
                  onChange={(e) => setOverviewPlan(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs"
                />
              </div>
              <div>
                <label className="block text-[11px] font-semibold text-slate-600 dark:text-slate-400 mb-1">
                  Body 2 &amp; Conclusion
                </label>
                <textarea
                  rows={3}
                  value={bodyPlan}
                  onChange={(e) => setBodyPlan(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs"
                />
              </div>
            </div>
          </div>

          {/* Model Answer Band 9 */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
              Band 9 Model Answer &amp; Examiner Rationale
            </label>
            <MarkdownEditor
              value={prompt.sample_essay_band9 || ''}
              onChange={(val) => setPrompt({ ...prompt, sample_essay_band9: val })}
              placeholder="Paste the Band 9 examiner response showing grammatical complexity, cohesive devices, and high-level lexical resource..."
            />
          </div>

          <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-200 dark:border-slate-800">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-white"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl bg-[#124F40] hover:bg-[#0E3D32] text-white text-xs font-bold transition-all shadow-xs"
            >
              Save Writing Prompt
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
