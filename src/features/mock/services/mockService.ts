export * from '../mockData';

export function calculateMockOverallBand(
  listeningBand: number,
  readingBand: number,
  writingBand: number,
  speakingBand: number
): number {
  const avg = (listeningBand + readingBand + writingBand + speakingBand) / 4;
  // IELTS official rounding: to nearest 0.5
  return Math.round(avg * 2) / 2;
}
