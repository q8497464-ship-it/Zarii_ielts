import type { WritingPromptContent, Task1OverviewHelper } from '../../types';

/**
 * Automatically extracts key statistical patterns and trajectories from Task 1 chart data
 * to construct a comprehensive "What a Strong Overview Includes" diagnostic and model hint.
 */
export function extractTask1OverviewTrends(prompt: WritingPromptContent): Task1OverviewHelper | null {
  if (prompt.taskType !== 'task1_academic') {
    if (prompt.taskType === 'task1_general') {
      return {
        overallTrends: [
          'State clearly the primary purpose of the letter in the opening paragraph.',
          'Adopt a consistent and appropriate tone (formal, semi-formal, or informal) based on the recipient.',
          'Address all three bullet points from the prompt with balanced development.',
        ],
        dominantFeature: 'Clear communicative purpose established immediately after the salutation.',
        lowestOrAnomalous: 'Avoid colloquialisms or overly casual sign-offs in formal letters.',
        strongOverviewSample:
          'Dear Sir or Madam, I am writing to express my dissatisfaction with the service received during my recent stay, and to formally request a full investigation and reimbursement.',
        checklist: [
          'Opening states the explicit reason for writing',
          'Tone matches recipient relationship perfectly',
          'All bullet points addressed in distinct paragraphs',
          'Appropriate formal/informal sign-off formula used',
        ],
        keyComparisons: [
          'Tone distinction: "I am writing to inquire..." vs "Just wanted to let you know..."',
          'Closing formula: "Yours faithfully" (unknown name) vs "Yours sincerely" (known name)',
        ],
      };
    }
    return null;
  }

  const { chartData, chartType } = prompt;

  // 1. Line Chart Analysis (Time-Series)
  if (chartType === 'line' && Array.isArray(chartData) && chartData.length > 1) {
    const timeKey = chartData[0]?.year ? 'year' : chartData[0]?.month ? 'month' : Object.keys(chartData[0])[0];
    const seriesKeys = Object.keys(chartData[0]).filter((k) => k !== timeKey);

    const summaries: Array<{
      key: string;
      startVal: number;
      endVal: number;
      minVal: number;
      maxVal: number;
      trend: 'rose' | 'fell' | 'fluctuated' | 'remained steady';
      changePercent: number;
    }> = [];

    for (const key of seriesKeys) {
      const vals = chartData.map((d) => Number(d[key]) || 0);
      const startVal = vals[0];
      const endVal = vals[vals.length - 1];
      const minVal = Math.min(...vals);
      const maxVal = Math.max(...vals);
      const change = endVal - startVal;
      const changePercent = startVal !== 0 ? Math.round((change / startVal) * 100) : 0;

      let trend: 'rose' | 'fell' | 'fluctuated' | 'remained steady' = 'fluctuated';
      if (Math.abs(changePercent) < 5) {
        trend = 'remained steady';
      } else if (change > 0) {
        trend = 'rose';
      } else {
        trend = 'fell';
      }

      summaries.push({ key, startVal, endVal, minVal, maxVal, trend, changePercent });
    }

    // Sort to find dominant and lowest
    const sortedByEnd = [...summaries].sort((a, b) => b.endVal - a.endVal);
    const dominant = sortedByEnd[0];
    const lowest = sortedByEnd[sortedByEnd.length - 1];

    const allRose = summaries.every((s) => s.trend === 'rose');
    const allFell = summaries.every((s) => s.trend === 'fell');

    const overallTrends: string[] = [];
    if (allRose) {
      overallTrends.push('All observed categories demonstrated an upward trajectory over the entire timeframe.');
    } else if (allFell) {
      overallTrends.push('Every recorded category exhibited an overall downward trend throughout the surveyed period.');
    } else {
      const risingKeys = summaries.filter((s) => s.trend === 'rose').map((s) => s.key).join(' and ');
      const fallingKeys = summaries.filter((s) => s.trend === 'fell').map((s) => s.key).join(' and ');
      overallTrends.push(`While ${risingKeys || 'certain sectors'} increased, ${fallingKeys || 'others'} experienced a decline.`);
    }

    if (dominant) {
      overallTrends.push(`${dominant.key} emerged as the dominant leader, recording the steepest overall change.`);
    }

    const dominantFeature = dominant
      ? `${dominant.key} registered the highest figures throughout most or all of the timeline.`
      : 'A distinct market or category established clear superiority across the years.';

    const lowestOrAnomalous = lowest
      ? `${lowest.key} consistently lagged behind the other metrics, remaining the lowest contributor.`
      : 'Certain groups showed minimal expansion compared to the leaders.';

    const sampleOverview = `Overall, it is immediately apparent that ${
      allRose ? 'sales across all regional markets expanded significantly' : 'figures across the categories followed differing trajectories'
    } over the period shown. Furthermore, ${dominant?.key || 'the leading sector'} consistently commanded the greatest share and experienced the most dramatic growth, whereas ${lowest?.key || 'the minor category'} recorded the lowest figures throughout.`;

    return {
      overallTrends,
      dominantFeature,
      lowestOrAnomalous,
      strongOverviewSample: sampleOverview,
      checklist: [
        'States the general direction (upward/downward) across all variables without quoting raw statistics',
        'Singles out the dominant / highest performing category',
        'Highlights the lowest, slowest growing, or counter-trend category',
        'Keeps raw numerical figures strictly in the body paragraphs (no specific numbers in the overview)',
        'Uses an academic overview discourse marker ("Overall, it is immediately evident that...")',
      ],
      keyComparisons: [
        `${dominant?.key} vs ${lowest?.key}: distinct gap in total magnitude across the timeframe`,
        `Growth rate comparison: steepest expansion observed in ${dominant?.key}`,
      ],
    };
  }

  // 2. Bar Chart Analysis (Comparative or Multi-category)
  if (chartType === 'bar' && Array.isArray(chartData) && chartData.length > 0) {
    const firstRow = chartData[0];
    const keys = Object.keys(firstRow).filter((k) => k !== 'category' && k !== 'group' && k !== 'year');

    return {
      overallTrends: [
        'Noticeable disparity across the different surveyed groups or categories.',
        'Clear concentration of figures in the leading demographic or sector.',
      ],
      dominantFeature: 'The leading category accounts for significantly higher values than all counterparts.',
      lowestOrAnomalous: 'The bottom-ranked group accounts for only a minor fraction of the total.',
      strongOverviewSample:
        'Overall, it is manifest that significant differences existed between the examined categories. While the primary group accounted for the vast majority of activity, the secondary sectors remained substantially smaller throughout.',
      checklist: [
        'Highlights the highest and lowest categories across the comparison',
        'Notes any striking exceptions or equal distributions',
        'Avoids exact numerical percentages or quantities',
        'Employs varied comparison vocabulary (e.g. "by contrast", "substantially higher")',
      ],
      keyComparisons: [
        'Highest ranked entity compared to the lowest ranked entity',
        'Patterns of similarity between middle-tier categories',
      ],
    };
  }

  // 3. Pie Chart Analysis (Proportions)
  if (chartType === 'pie' && Array.isArray(chartData) && chartData.length > 0) {
    return {
      overallTrends: [
        'The distribution is heavily weighted toward one or two primary segments.',
        'Minor segments collectively comprise only a modest proportion of the whole.',
      ],
      dominantFeature: 'A single segment represents the clear majority or largest single plurality.',
      lowestOrAnomalous: 'Several minor segments register negligible proportions.',
      strongOverviewSample:
        'Overall, it is clearly evident that a single dominant segment accounted for the majority of the total distribution, whereas the remaining portions collectively represented only a modest fraction.',
      checklist: [
        'Identifies the single largest proportion slice',
        'Identifies the smallest proportion slice',
        'Mentions whether the total is dominated by one item or evenly dispersed',
        'Does not list raw percentages in the overview',
      ],
      keyComparisons: [
        'Majority slice vs all remaining slices combined',
        'Relative parity or disparity among smaller segments',
      ],
    };
  }

  // Generic Academic Task 1 Overview Fallback
  return {
    overallTrends: [
      'Identifies the major trajectories or primary patterns evident in the visual prompt.',
      'Contrasts the most significant category against the least significant.',
    ],
    dominantFeature: 'The principal pattern or highest recorded entity across the visual.',
    lowestOrAnomalous: 'The minimum value, outlier, or counter-trend pattern.',
    strongOverviewSample:
      'Overall, it is immediately apparent that substantial variations existed across the visual data. The principal category consistently maintained the highest standing, whereas the secondary metrics exhibited minimal movement.',
    checklist: [
      'Clear overview signpost at the beginning or end of the report',
      'Highlights 2 to 3 main visual features without data listing',
      'Reserves exact measurements for detailed body paragraphs',
    ],
    keyComparisons: ['Extreme high versus extreme low', 'General trajectory over time or across groups'],
  };
}
