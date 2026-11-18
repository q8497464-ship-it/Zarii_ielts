import React, { useState } from 'react';
import { Bold, Italic, Heading1, Heading2, List, Quote, Code, Eye, Edit3 } from 'lucide-react';
import { sanitizeMarkdown } from '../../../shared/utils';

interface MarkdownEditorProps {
  value: string;
  onChange: (val: string) => void;
  minHeight?: string;
  placeholder?: string;
  className?: string;
}

export function MarkdownEditor({
  value,
  onChange,
  minHeight = '240px',
  placeholder = 'Write markdown content here...',
  className = '',
}: MarkdownEditorProps) {
  const [tab, setTab] = useState<'write' | 'preview'>('write');

  const insertSnippet = (prefix: string, suffix: string = '') => {
    onChange(`${value}${prefix}sample text${suffix}`);
  };

  return (
    <div className={`rounded-xl border border-slate-200 dark:border-[#24392F] bg-white dark:bg-[#112019] overflow-hidden flex flex-col ${className}`}>
      {/* Editor Toolbar */}
      <div className="flex items-center justify-between px-3 py-2 bg-slate-50 dark:bg-[#172A21]/50 border-b border-slate-200/80 dark:border-[#24392F] text-xs">
        {/* Mode Tabs */}
        <div className="flex items-center gap-1 bg-slate-200/70 dark:bg-slate-800 p-0.5 rounded-lg">
          <button
            type="button"
            onClick={() => setTab('write')}
            className={`px-2.5 py-1 rounded-md font-semibold text-xs transition-colors flex items-center gap-1.5 ${
              tab === 'write'
                ? 'bg-white dark:bg-[#112019] text-slate-900 dark:text-white shadow-2xs'
                : 'text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'
            }`}
          >
            <Edit3 className="w-3.5 h-3.5" />
            <span>Write</span>
          </button>
          <button
            type="button"
            onClick={() => setTab('preview')}
            className={`px-2.5 py-1 rounded-md font-semibold text-xs transition-colors flex items-center gap-1.5 ${
              tab === 'preview'
                ? 'bg-white dark:bg-[#112019] text-slate-900 dark:text-white shadow-2xs'
                : 'text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'
            }`}
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Preview</span>
          </button>
        </div>

        {/* Formatting Actions (Active in Write mode) */}
        {tab === 'write' && (
          <div className="flex items-center gap-1 text-slate-500 dark:text-slate-400">
            <button
              type="button"
              onClick={() => insertSnippet('**', '**')}
              className="p-1.5 rounded-md hover:bg-slate-200 dark:hover:bg-slate-800"
              title="Bold"
            >
              <Bold className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              onClick={() => insertSnippet('*', '*')}
              className="p-1.5 rounded-md hover:bg-slate-200 dark:hover:bg-slate-800"
              title="Italic"
            >
              <Italic className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              onClick={() => insertSnippet('# ')}
              className="p-1.5 rounded-md hover:bg-slate-200 dark:hover:bg-slate-800"
              title="Heading 1"
            >
              <Heading1 className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              onClick={() => insertSnippet('## ')}
              className="p-1.5 rounded-md hover:bg-slate-200 dark:hover:bg-slate-800"
              title="Heading 2"
            >
              <Heading2 className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              onClick={() => insertSnippet('- ')}
              className="p-1.5 rounded-md hover:bg-slate-200 dark:hover:bg-slate-800"
              title="Bullet List"
            >
              <List className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              onClick={() => insertSnippet('> ')}
              className="p-1.5 rounded-md hover:bg-slate-200 dark:hover:bg-slate-800"
              title="Quote"
            >
              <Quote className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              onClick={() => insertSnippet('`', '`')}
              className="p-1.5 rounded-md hover:bg-slate-200 dark:hover:bg-slate-800"
              title="Inline Code"
            >
              <Code className="w-3.5 h-3.5" />
            </button>
          </div>
        )}
      </div>

      {/* Editor Body */}
      <div className="p-3 flex-1">
        {tab === 'write' ? (
          <textarea
            value={value}
            onChange={(e) => onChange(e.target.value)}
            style={{ minHeight }}
            placeholder={placeholder}
            className="w-full h-full bg-transparent text-slate-800 dark:text-slate-100 placeholder-slate-400 focus:outline-none resize-y text-xs font-mono leading-relaxed"
          />
        ) : (
          <div
            style={{ minHeight }}
            className="prose dark:prose-invert max-w-none text-xs text-slate-800 dark:text-slate-200 p-2 overflow-y-auto"
          >
            {value.trim() ? (
              <div className="whitespace-pre-wrap font-sans leading-relaxed">{sanitizeMarkdown(value)}</div>
            ) : (
              <span className="text-slate-400 italic">No preview content yet.</span>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
