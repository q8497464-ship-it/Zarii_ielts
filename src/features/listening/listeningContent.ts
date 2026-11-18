import type { ListeningTestContent, BaseQuestion, QuestionType } from '../../types';
import listTest1 from '../../../content/listening/listening-test-01.json';
import listTest2 from '../../../content/listening/listening-test-02.json';
import listTest3 from '../../../content/listening/listening-test-03.json';
import listTest4 from '../../../content/listening/listening-test-04.json';
import listTest5 from '../../../content/listening/listening-test-05.json';
import listTest6 from '../../../content/listening/listening-test-06.json';
import listTest7 from '../../../content/listening/listening-test-07.json';
import listTest8 from '../../../content/listening/listening-test-08.json';
import listTest9 from '../../../content/listening/listening-test-09.json';
import listTest10 from '../../../content/listening/listening-test-10.json';
import listTest11 from '../../../content/listening/listening-test-11.json';
import listTest12 from '../../../content/listening/listening-test-12.json';
import listTest13 from '../../../content/listening/listening-test-13.json';

export const ALL_LISTENING_TESTS: ListeningTestContent[] = [
  listTest1 as unknown as ListeningTestContent,
  listTest2 as unknown as ListeningTestContent,
  listTest3 as unknown as ListeningTestContent,
  listTest4 as unknown as ListeningTestContent,
  listTest5 as unknown as ListeningTestContent,
  listTest6 as unknown as ListeningTestContent,
  listTest7 as unknown as ListeningTestContent,
  listTest8 as unknown as ListeningTestContent,
  listTest9 as unknown as ListeningTestContent,
  listTest10 as unknown as ListeningTestContent,
  listTest11 as unknown as ListeningTestContent,
  listTest12 as unknown as ListeningTestContent,
  listTest13 as unknown as ListeningTestContent,
];

export function getListeningTests(): ListeningTestContent[] {
  return ALL_LISTENING_TESTS;
}

export function getListeningTestById(id: string): ListeningTestContent | undefined {
  return ALL_LISTENING_TESTS.find((t) => t.id === id);
}

export interface FlattenedListeningQuestion extends BaseQuestion {
  testId: string;
  testTitle: string;
  sectionNumber: number;
  sectionTitle: string;
  groupInstruction: string;
}

export function getAllFlattenedListeningQuestions(): FlattenedListeningQuestion[] {
  const result: FlattenedListeningQuestion[] = [];

  for (const test of ALL_LISTENING_TESTS) {
    for (const sec of test.sections) {
      for (const group of sec.questionGroups) {
        for (const q of group.questions) {
          result.push({
            ...q,
            testId: test.id,
            testTitle: test.title,
            sectionNumber: sec.sectionNumber,
            sectionTitle: sec.title,
            groupInstruction: group.groupInstruction,
          });
        }
      }
    }
  }

  return result;
}

export const LISTENING_QUESTION_TYPE_LABELS: Record<string, string> = {
  sentence_completion: 'Form / Note Completion',
  diagram_label_completion: 'Map / Diagram Labelling',
  multiple_choice_single: 'Multiple Choice (Single)',
  multiple_choice_multi: 'Multiple Choice (Multi)',
  matching: 'Matching Information',
  summary_completion: 'Summary Completion',
};
