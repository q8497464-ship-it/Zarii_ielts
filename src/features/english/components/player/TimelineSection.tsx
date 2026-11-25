import React from 'react';
import { Clock } from 'lucide-react';

interface TimelineData {
  title?: string;
  past: string;
  present: string;
  future: string;
  activePoint: 'past' | 'present' | 'future' | 'continuous' | 'perfect';
  explanation?: string;
}

interface TimelineSectionProps {
  title: string;
  timeline: TimelineData;
}

export const TimelineSection: React.FC<TimelineSectionProps> = ({ title, timeline }) => {
  const getActiveCoordinates = () => {
    switch (timeline.activePoint) {
      case 'past':
        return { x: 120, label: 'Past Event' };
      case 'present':
        return { x: 300, label: 'Present / Routine' };
      case 'future':
        return { x: 480, label: 'Future Action' };
      case 'continuous':
        return { x: 300, isRange: true, label: 'Ongoing Action' };
      case 'perfect':
        return { x: 210, isArrow: true, label: 'Past into Present' };
      default:
        return { x: 300, label: 'Current Focus' };
    }
  };

  const active = getActiveCoordinates();

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 text-[#124F40] dark:text-[#5BB78D]">
        <Clock className="w-5 h-5" />
        <h2 className="text-xl md:text-2xl font-bold tracking-tight text-gray-900 dark:text-gray-100">
          {title}
        </h2>
      </div>

      <div className="text-sm text-gray-600 dark:text-gray-400">
        Visual timeline representation of the tense and time orientation:
      </div>

      {/* Accessible SVG Diagram */}
      <div
        className="p-6 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-sm"
        role="img"
        aria-label={`Grammar Timeline Diagram: ${timeline.title || title}. ${timeline.explanation || ''}`}
      >
        <svg
          viewBox="0 0 600 160"
          className="w-full h-auto max-h-[200px]"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Main Axis Line */}
          <line
            x1="40"
            y1="80"
            x2="560"
            y2="80"
            stroke="currentColor"
            strokeWidth="3"
            className="text-gray-300 dark:text-gray-600"
          />
          {/* Arrow Head */}
          <polygon
            points="560,74 576,80 560,86"
            fill="currentColor"
            className="text-gray-400 dark:text-gray-500"
          />

          {/* Past Marker */}
          <line x1="120" y1="65" x2="120" y2="95" stroke="currentColor" strokeWidth="2" className="text-gray-400 dark:text-gray-500" />
          <text x="120" y="115" textAnchor="middle" className="text-xs fill-gray-500 dark:fill-gray-400 font-semibold">
            PAST
          </text>
          <text x="120" y="132" textAnchor="middle" className="text-[11px] fill-gray-400 dark:fill-gray-500">
            {timeline.past}
          </text>

          {/* Present Marker */}
          <line x1="300" y1="60" x2="300" y2="100" stroke="currentColor" strokeWidth="3" className="text-[#124F40] dark:text-[#5BB78D]" />
          <text x="300" y="118" textAnchor="middle" className="text-xs fill-[#124F40] dark:fill-[#5BB78D] font-bold">
            NOW (PRESENT)
          </text>
          <text x="300" y="135" textAnchor="middle" className="text-[11px] fill-gray-600 dark:fill-gray-300 font-medium">
            {timeline.present}
          </text>

          {/* Future Marker */}
          <line x1="480" y1="65" x2="480" y2="95" stroke="currentColor" strokeWidth="2" className="text-gray-400 dark:text-gray-500" />
          <text x="480" y="115" textAnchor="middle" className="text-xs fill-gray-500 dark:fill-gray-400 font-semibold">
            FUTURE
          </text>
          <text x="480" y="132" textAnchor="middle" className="text-[11px] fill-gray-400 dark:fill-gray-500">
            {timeline.future}
          </text>

          {/* Active Highlight Marker */}
          {active.isRange ? (
            <rect
              x="240"
              y="68"
              width="120"
              height="24"
              rx="12"
              fill="rgba(91, 183, 141, 0.3)"
              stroke="#124F40"
              strokeWidth="2"
            />
          ) : (
            <circle
              cx={active.x}
              y="80"
              r="10"
              fill="#5BB78D"
              stroke="#124F40"
              strokeWidth="3"
              className="animate-pulse"
            />
          )}

          {/* Active Label Badge above line */}
          <rect
            x={active.x - 55}
            y="25"
            width="110"
            height="26"
            rx="6"
            fill="#124F40"
          />
          <text
            x={active.x}
            y="42"
            textAnchor="middle"
            fill="#FFFFFF"
            className="text-[11px] font-bold"
          >
            {active.label}
          </text>
        </svg>

        {timeline.explanation && (
          <div className="mt-4 p-3 bg-emerald-50/60 dark:bg-emerald-950/30 rounded-lg border border-emerald-200 dark:border-emerald-800 text-sm text-emerald-900 dark:text-emerald-100 leading-relaxed">
            {timeline.explanation}
          </div>
        )}
      </div>
    </div>
  );
};
