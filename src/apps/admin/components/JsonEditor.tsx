import React, { useState, useEffect } from 'react';
import { Check, Copy, Code, AlertCircle, Sparkles } from 'lucide-react';

interface JsonEditorProps {
  initialValue?: any;
  value?: any;
  onChange?: (parsedValue: any, rawString?: string) => void;
  readOnly?: boolean;
  minHeight?: string;
  height?: string;
  className?: string;
}

export function JsonEditor({
  initialValue,
  value,
  onChange,
  readOnly = false,
  minHeight,
  height,
  className = '',
}: JsonEditorProps) {
  const effectiveMinHeight = height || minHeight || '240px';
  const effectiveInitial = value !== undefined ? value : initialValue;

  const [text, setText] = useState(() => {
    try {
      return typeof effectiveInitial === 'string'
        ? effectiveInitial
        : JSON.stringify(effectiveInitial, null, 2);
    } catch {
      return '{}';
    }
  });

  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    try {
      const parsed = JSON.parse(text);
      setError(null);
      if (onChange) onChange(parsed, text);
    } catch (err: any) {
      setError(err?.message || 'Invalid JSON syntax');
    }
  }, [text, onChange]);

  const handleBeautify = () => {
    try {
      const parsed = JSON.parse(text);
      setText(JSON.stringify(parsed, null, 2));
      setError(null);
    } catch (err: any) {
      setError(err?.message || 'Cannot format: Invalid JSON');
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={`rounded-xl border border-slate-200 dark:border-[#24392F] bg-slate-900 text-slate-100 overflow-hidden flex flex-col font-mono text-xs ${className}`}>
      {/* Editor Toolbar */}
      <div className="flex items-center justify-between px-3 py-2 bg-slate-950 border-b border-slate-800 text-slate-400">
        <div className="flex items-center gap-2">
          <Code className="w-3.5 h-3.5 text-amber-400" />
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-300">
            JSON Document Editor
          </span>
          {error ? (
            <span className="inline-flex items-center gap-1 text-[10px] text-rose-400 font-bold bg-rose-950/60 px-2 py-0.5 rounded border border-rose-800/60">
              <AlertCircle className="w-3 h-3" /> Syntax Error
            </span>
          ) : (
            <span className="inline-flex items-center gap-1 text-[10px] text-emerald-400 font-bold bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800/60">
              Valid JSON
            </span>
          )}
        </div>

        <div className="flex items-center gap-1.5">
          {!readOnly && (
            <button
              type="button"
              onClick={handleBeautify}
              className="px-2 py-1 rounded-md text-[11px] text-slate-300 hover:text-white hover:bg-slate-800 flex items-center gap-1 transition-colors"
              title="Beautify / Indent JSON"
            >
              <Sparkles className="w-3 h-3 text-amber-400" />
              <span>Format</span>
            </button>
          )}

          <button
            type="button"
            onClick={handleCopy}
            className="px-2 py-1 rounded-md text-[11px] text-slate-300 hover:text-white hover:bg-slate-800 flex items-center gap-1 transition-colors"
            title="Copy to clipboard"
          >
            {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
            <span>{copied ? 'Copied' : 'Copy'}</span>
          </button>
        </div>
      </div>

      {/* Editor Textarea */}
      <div className="p-3 bg-slate-900 flex-1">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          readOnly={readOnly}
          style={{ minHeight: effectiveMinHeight }}
          spellCheck={false}
          className="w-full h-full bg-transparent text-slate-200 focus:outline-none resize-y font-mono text-xs leading-relaxed"
        />
      </div>

      {/* Error Message Footer */}
      {error && (
        <div className="px-3 py-1.5 bg-rose-950/90 border-t border-rose-900/60 text-rose-300 text-[11px] flex items-center gap-2">
          <AlertCircle className="w-3.5 h-3.5 shrink-0 text-rose-400" />
          <span className="truncate">{error}</span>
        </div>
      )}
    </div>
  );
}
