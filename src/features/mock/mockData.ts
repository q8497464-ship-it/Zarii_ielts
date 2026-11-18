import academicReading1 from '../../../content/reading/academic-test-01.json';
import academicReading2 from '../../../content/reading/academic-test-02.json';
import generalReading1 from '../../../content/reading/general-test-01.json';
import listening1 from '../../../content/listening/listening-test-01.json';
import listening2 from '../../../content/listening/listening-test-02.json';
import academicWritingTask1 from '../../../content/writing/academic-task1.json';
import generalWritingTask1 from '../../../content/writing/general-task1.json';
import writingTask2 from '../../../content/writing/task2.json';

export interface FullMockTestConfig {
  id: string;
  title: string;
  testType: 'academic' | 'general';
  difficulty: 'standard' | 'challenging';
  timeEstimate: string;
  readingTest: any;
  listeningTest: any;
  writingTask1: any;
  writingTask2: any;
  speakingTopics: Array<{ part: number; prompt: string; prepTime: number; speakTime: number }>;
}

export const FULL_MOCK_TESTS: FullMockTestConfig[] = [
  {
    id: 'mock-acad-01',
    title: 'Academic Full Mock Test 1 (Standard Diagnostic)',
    testType: 'academic',
    difficulty: 'standard',
    timeEstimate: '2 hours 45 mins',
    readingTest: academicReading1,
    listeningTest: listening1,
    writingTask1: academicWritingTask1[0],
    writingTask2: writingTask2[0],
    speakingTopics: [
      { part: 1, prompt: 'Tell me about your hometown and what makes it special.', prepTime: 5, speakTime: 60 },
      { part: 2, prompt: 'Describe an important piece of technology you use every day. Say what it is, how often you use it, and explain why it is important to you.', prepTime: 60, speakTime: 120 },
      { part: 3, prompt: 'How do you think artificial intelligence and automation will transform employment in your country?', prepTime: 10, speakTime: 90 },
    ],
  },
  {
    id: 'mock-acad-02',
    title: 'Academic Full Mock Test 2 (High Academic Rigor)',
    testType: 'academic',
    difficulty: 'challenging',
    timeEstimate: '2 hours 45 mins',
    readingTest: academicReading2,
    listeningTest: listening2,
    writingTask1: academicWritingTask1[1],
    writingTask2: writingTask2[1],
    speakingTopics: [
      { part: 1, prompt: 'Do you prefer studying or working in the morning or evening, and why?', prepTime: 5, speakTime: 60 },
      { part: 2, prompt: 'Describe an environmental project or initiative that you find inspiring. Say what it involves and why it is significant.', prepTime: 60, speakTime: 120 },
      { part: 3, prompt: 'Whose responsibility is it to combat climate change: individual citizens or international governments?', prepTime: 10, speakTime: 90 },
    ],
  },
  {
    id: 'mock-gt-01',
    title: 'General Training Full Mock Test 1 (Workplace & Social)',
    testType: 'general',
    difficulty: 'standard',
    timeEstimate: '2 hours 45 mins',
    readingTest: generalReading1,
    listeningTest: listening1,
    writingTask1: generalWritingTask1[0],
    writingTask2: writingTask2[2],
    speakingTopics: [
      { part: 1, prompt: 'What kind of sports or physical activities are popular in your country?', prepTime: 5, speakTime: 60 },
      { part: 2, prompt: 'Describe a memorable celebration or holiday trip with family or friends.', prepTime: 60, speakTime: 120 },
      { part: 3, prompt: 'How has social media altered the way families and communities communicate?', prepTime: 10, speakTime: 90 },
    ],
  },
];

export function getFullMockById(id: string): FullMockTestConfig | undefined {
  return FULL_MOCK_TESTS.find((m) => m.id === id);
}
