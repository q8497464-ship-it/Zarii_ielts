import React from 'react';
import { Award, CheckCircle2 } from 'lucide-react';

interface SummarySectionProps {
  title: string;
  content?: string;
  summaryPoints?: string[];
}

export const SummarySection: React.FC<SummarySectionProps> = ({
  title,
  content,
  summaryPoints = [],
}) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 text-[#124F40] dark:text-[#5BB78D]">
        <Award className="w-5 h-5" />
        <h2 className="text-xl md:text-2xl font-bold tracking-tight text-gray-900 dark:text-gray-100">
          {title}
        </h2>
      </div>

      {content && (
        <div className="text-base md:text-lg text-gray-800 dark:text-gray-200 leading-relaxed">
          {content}
        </div>
      )}

      {summaryPoints.length > 0 && (
        <div className="space-y-3 p-5 rounded-2xl border border-emerald-200 dark:border-emerald-800/80 bg-emerald-50/50 dark:bg-emerald-950/20 shadow-sm">
          <span className="text-xs font-bold uppercase tracking-wider text-[#124F40] dark:text-[#5BB78D]">
            Key Takeaways to Remember
          </span>
          <div className="space-y-2.5 pt-1">
            {summaryPoints.map((point, idx) => (
              <div key={idx} className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#5BB78D] shrink-0 mt-0.5" />
                <span className="text-sm md:text-base text-gray-800 dark:text-gray-200 font-medium leading-relaxed">
                  {point}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
