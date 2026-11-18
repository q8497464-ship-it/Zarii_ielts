import type { WritingPromptContent } from '../../types';
import acadTask1 from '../../../content/writing/academic-task1.json';
import genTask1 from '../../../content/writing/general-task1.json';
import task2 from '../../../content/writing/task2.json';

export const ALL_WRITING_PROMPTS: WritingPromptContent[] = [
  ...(acadTask1 as unknown as WritingPromptContent[]),
  ...(genTask1 as unknown as WritingPromptContent[]),
  ...(task2 as unknown as WritingPromptContent[]),
];

export function getAllWritingPrompts(): WritingPromptContent[] {
  return ALL_WRITING_PROMPTS;
}

export function getWritingPromptsByType(
  type: 'task1_academic' | 'task1_general' | 'task2'
): WritingPromptContent[] {
  return ALL_WRITING_PROMPTS.filter((p) => p.taskType === type);
}

export function getWritingPromptById(id: string): WritingPromptContent | undefined {
  return ALL_WRITING_PROMPTS.find((p) => p.id === id);
}

export function getAcademicTask1Prompts(): WritingPromptContent[] {
  return ALL_WRITING_PROMPTS.filter((p) => p.taskType === 'task1_academic');
}

export function getGeneralTask1Prompts(): WritingPromptContent[] {
  return ALL_WRITING_PROMPTS.filter((p) => p.taskType === 'task1_general');
}

export function getTask2Prompts(): WritingPromptContent[] {
  return ALL_WRITING_PROMPTS.filter((p) => p.taskType === 'task2');
}
