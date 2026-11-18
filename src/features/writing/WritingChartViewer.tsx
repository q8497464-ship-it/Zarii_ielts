import {
  ResponsiveContainer,
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
} from 'recharts';
import type { WritingPromptContent } from '../../types';

import { RECHARTS_SERIES_COLORS } from '../../components/ui/tokens';

interface WritingChartViewerProps {
  prompt: WritingPromptContent;
}

const PIE_COLORS = [...RECHARTS_SERIES_COLORS];

export function WritingChartViewer({ prompt }: WritingChartViewerProps) {
  const { chartType, chartData, chartSvg } = prompt;

  if (chartSvg) {
    return (
      <div
        className="w-full flex items-center justify-center p-2 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800"
        dangerouslySetInnerHTML={{ __html: chartSvg }}
      />
    );
  }

  if (chartType === 'line' && chartData) {
    const keys = Object.keys(chartData[0] || {}).filter((k) => k !== 'year' && k !== 'month');
    const xKey = chartData[0]?.year ? 'year' : 'month';

    return (
      <div className="w-full h-72 sm:h-80 p-3 bg-white dark:bg-[#112019] rounded-xl border border-[#E1EBE5] dark:border-[#24392F] shadow-xs">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData} margin={{ top: 10, right: 20, left: 0, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#64748b" strokeOpacity={0.15} />
            <XAxis dataKey={xKey} stroke="#64748b" tick={{ fill: '#94a3b8', fontSize: 11 }} />
            <YAxis stroke="#64748b" tick={{ fill: '#94a3b8', fontSize: 11 }} />
            <Tooltip contentStyle={{ backgroundColor: '#112019', borderRadius: '12px', border: '1px solid #24392F', color: '#E8F2EC', fontSize: '12px', boxShadow: '0 10px 25px -5px rgba(0,0,0,0.5)' }} />
            <Legend wrapperStyle={{ fontSize: '12px', color: '#cbd5e1' }} />
            {keys.map((key, i) => (
              <Line
                key={key}
                type="monotone"
                dataKey={key}
                stroke={PIE_COLORS[i % PIE_COLORS.length]}
                strokeWidth={2}
                dot={{ r: 4 }}
                activeDot={{ r: 6 }}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </div>
    );
  }

  if (chartType === 'bar' && chartData) {
    const keys = Object.keys(chartData[0] || {}).filter((k) => k !== 'country' && k !== 'faculty' && k !== 'year');
    const xKey = chartData[0]?.country ? 'country' : chartData[0]?.faculty ? 'faculty' : 'year';

    return (
      <div className="w-full h-72 sm:h-80 p-3 bg-white dark:bg-[#112019] rounded-xl border border-[#E1EBE5] dark:border-[#24392F] shadow-xs">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData} margin={{ top: 10, right: 20, left: 0, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#64748b" strokeOpacity={0.15} />
            <XAxis dataKey={xKey} stroke="#64748b" tick={{ fill: '#94a3b8', fontSize: 11 }} />
            <YAxis stroke="#64748b" tick={{ fill: '#94a3b8', fontSize: 11 }} />
            <Tooltip contentStyle={{ backgroundColor: '#112019', borderRadius: '12px', border: '1px solid #24392F', color: '#E8F2EC', fontSize: '12px', boxShadow: '0 10px 25px -5px rgba(0,0,0,0.5)' }} />
            <Legend wrapperStyle={{ fontSize: '12px', color: '#cbd5e1' }} />
            {keys.map((key, i) => (
              <Bar
                key={key}
                dataKey={key}
                fill={PIE_COLORS[i % PIE_COLORS.length]}
                radius={[4, 4, 0, 0]}
              />
            ))}
          </BarChart>
        </ResponsiveContainer>
      </div>
    );
  }

  if (chartType === 'pie' && chartData) {
    const pie2010 = chartData.map((d: any) => ({ name: d.category, value: d.y2010 }));
    const pie2020 = chartData.map((d: any) => ({ name: d.category, value: d.y2020 }));

    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-3 bg-white dark:bg-[#112019] rounded-xl border border-[#E1EBE5] dark:border-[#24392F] shadow-xs">
        <div className="text-center">
          <span className="text-xs font-bold text-slate-700 dark:text-slate-200">Year 2010</span>
          <div className="h-60">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={pie2010} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={70} label>
                  {pie2010.map((_: any, idx: number) => (
                    <Cell key={idx} fill={PIE_COLORS[idx % PIE_COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ backgroundColor: '#112019', borderRadius: '12px', border: '1px solid #24392F', color: '#E8F2EC', fontSize: '11px', boxShadow: '0 10px 25px -5px rgba(0,0,0,0.5)' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="text-center">
          <span className="text-xs font-bold text-slate-700 dark:text-slate-200">Year 2020</span>
          <div className="h-60">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={pie2020} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={70} label>
                  {pie2020.map((_: any, idx: number) => (
                    <Cell key={idx} fill={PIE_COLORS[idx % PIE_COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ backgroundColor: '#112019', borderRadius: '12px', border: '1px solid #24392F', color: '#E8F2EC', fontSize: '11px', boxShadow: '0 10px 25px -5px rgba(0,0,0,0.5)' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    );
  }

  if (chartType === 'table' && chartData) {
    const columns = Object.keys(chartData[0] || {});

    return (
      <div className="overflow-x-auto rounded-xl border border-[#E1EBE5] dark:border-[#24392F] bg-white dark:bg-[#112019]">
        <table className="w-full text-xs text-left">
          <thead className="bg-slate-100 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 font-bold uppercase tracking-wider">
            <tr>
              {columns.map((col) => (
                <th key={col} className="px-4 py-3">
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
            {chartData.map((row: any, rIdx: number) => (
              <tr key={rIdx} className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                {columns.map((col) => (
                  <td key={col} className="px-4 py-2.5 font-medium text-slate-800 dark:text-slate-200">
                    {row[col]} {typeof row[col] === 'number' && !col.toLowerCase().includes('year') ? '%' : ''}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  return null;
}
