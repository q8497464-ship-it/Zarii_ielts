import part1Data from '../../../content/speaking/part1-topics.json';
import part2Data from '../../../content/speaking/part2-cue-cards.json';
import type {
  SpeakingPart1Topic,
  SpeakingPart2CueCard,
} from '../../types';

export const ALL_PART1_TOPICS: SpeakingPart1Topic[] = part1Data as SpeakingPart1Topic[];
export const ALL_PART2_CUE_CARDS: SpeakingPart2CueCard[] = part2Data as SpeakingPart2CueCard[];

export function getPart1TopicById(id: string): SpeakingPart1Topic | undefined {
  return ALL_PART1_TOPICS.find((t) => t.id === id);
}

export function getPart2CueCardById(id: string): SpeakingPart2CueCard | undefined {
  return ALL_PART2_CUE_CARDS.find((c) => c.id === id);
}

export function getRandomPart1Topic(): SpeakingPart1Topic {
  const index = Math.floor(Math.random() * ALL_PART1_TOPICS.length);
  return ALL_PART1_TOPICS[index];
}

export function getRandomPart2CueCard(): SpeakingPart2CueCard {
  const index = Math.floor(Math.random() * ALL_PART2_CUE_CARDS.length);
  return ALL_PART2_CUE_CARDS[index];
}
