import React from 'react';
import { Lightbulb, AlertTriangle, Info, BookOpen, Globe } from 'lucide-react';
import { getPosColorClasses } from '../../utils/posColors';

interface ExplainSectionProps {
  title: string;
  content: string;
  tables?: Array<{
    title?: string;
    headers: string[];
    rows: string[][];
  }>;
  callouts?: Array<{
    type: 'tip' | 'note' | 'warning' | 'cultural';
    title?: string;
    text: string;
  }>;
}

export const ExplainSection: React.FC<ExplainSectionProps> = ({
  title,
  content,
  tables = [],
  callouts = [],
}) => {
  const renderCalloutIcon = (type: string) => {
    switch (type) {
      case 'tip':
        return <Lightbulb className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0" />;
      case 'warning':
        return <AlertTriangle className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0" />;
      case 'cultural':
        return <Globe className="w-5 h-5 text-indigo-600 dark:text-indigo-400 shrink-0" />;
      default:
        return <Info className="w-5 h-5 text-blue-600 dark:text-blue-400 shrink-0" />;
    }
  };

  const getCalloutStyles = (type: string) => {
    switch (type) {
      case 'tip':
        return 'border-emerald-300 dark:border-emerald-800 bg-emerald-50/70 dark:bg-emerald-950/30 text-emerald-900 dark:text-emerald-100';
      case 'warning':
        return 'border-amber-300 dark:border-amber-800 bg-amber-50/70 dark:bg-amber-950/30 text-amber-900 dark:text-amber-100';
      case 'cultural':
        return 'border-indigo-300 dark:border-indigo-800 bg-indigo-50/70 dark:bg-indigo-950/30 text-indigo-900 dark:text-indigo-100';
      default:
        return 'border-blue-300 dark:border-blue-800 bg-blue-50/70 dark:bg-blue-950/30 text-blue-900 dark:text-blue-100';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 text-[#124F40] dark:text-[#5BB78D]">
        <BookOpen className="w-5 h-5" />
        <h2 className="text-xl md:text-2xl font-bold tracking-tight text-gray-900 dark:text-gray-100">
          {title}
        </h2>
      </div>

      {/* Main explanation text with readable typography */}
      <div className="prose prose-emerald dark:prose-invert max-w-none text-base md:text-lg leading-relaxed text-gray-800 dark:text-gray-200 whitespace-pre-line">
        {content}
      </div>

      {/* Tables with Part of Speech Accent Colors */}
      {tables.map((table, tIdx) => (
        <div
          key={tIdx}
          className="rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden shadow-sm bg-white dark:bg-gray-800"
        >
          {table.title && (
            <div className="bg-gray-50/80 dark:bg-gray-800/80 px-4 py-2.5 border-b border-gray-200 dark:border-gray-700 font-semibold text-sm text-gray-900 dark:text-gray-100">
              {table.title}
            </div>
          )}

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-gray-50 dark:bg-gray-800/60 text-xs uppercase tracking-wider font-semibold text-gray-600 dark:text-gray-300 border-b border-gray-200 dark:border-gray-700">
                <tr>
                  {table.headers.map((h, hIdx) => {
                    const posColor = getPosColorClasses(h);
                    return (
                      <th key={hIdx} className="px-4 py-3">
                        <span className={`inline-block px-2 py-0.5 rounded ${posColor.badge}`}>
                          {h}
                        </span>
                      </th>
                    );
                  })}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-700/60">
                {table.rows.map((row, rIdx) => (
                  <tr key={rIdx} className="hover:bg-gray-50/50 dark:hover:bg-gray-750 transition-colors">
                    {row.map((cell, cIdx) => (
                      <td key={cIdx} className="px-4 py-3 font-medium text-gray-800 dark:text-gray-200">
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ))}

      {/* Callouts (Rule, Tip, Careful/Warning, Cultural) */}
      {callouts.map((callout, cIdx) => (
        <div
          key={cIdx}
          className={`p-4 rounded-xl border flex items-start gap-3.5 transition-all shadow-sm ${getCalloutStyles(
            callout.type
          )}`}
        >
          {renderCalloutIcon(callout.type)}
          <div className="space-y-1">
            {callout.title && (
              <div className="font-semibold text-sm uppercase tracking-wide">
                {callout.title}
              </div>
            )}
            <div className="text-sm leading-relaxed">{callout.text}</div>
          </div>
        </div>
      ))}
    </div>
  );
};
