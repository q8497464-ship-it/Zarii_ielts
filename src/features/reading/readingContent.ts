import type { ReadingTestContent, BaseQuestion, QuestionType, TestType } from '../../types';
import acadTest1 from '../../../content/reading/academic-test-01.json';
import acadTest2 from '../../../content/reading/academic-test-02.json';
import acadTest3 from '../../../content/reading/academic-test-03.json';
import acadTest4 from '../../../content/reading/academic-test-04.json';
import acadTest5 from '../../../content/reading/academic-test-05.json';
import acadTest6 from '../../../content/reading/academic-test-06.json';
import acadTest7 from '../../../content/reading/academic-test-07.json';
import acadTest8 from '../../../content/reading/academic-test-08.json';
import genTest1 from '../../../content/reading/general-test-01.json';
import genTest2 from '../../../content/reading/general-test-02.json';
import genTest3 from '../../../content/reading/general-test-03.json';
import genTest4 from '../../../content/reading/general-test-04.json';
import genTest5 from '../../../content/reading/general-test-05.json';
import genTest6 from '../../../content/reading/general-test-06.json';

export const ALL_READING_TESTS: ReadingTestContent[] = [
  acadTest1 as unknown as ReadingTestContent,
  acadTest2 as unknown as ReadingTestContent,
  acadTest3 as unknown as ReadingTestContent,
  acadTest4 as unknown as ReadingTestContent,
  acadTest5 as unknown as ReadingTestContent,
  acadTest6 as unknown as ReadingTestContent,
  acadTest7 as unknown as ReadingTestContent,
  acadTest8 as unknown as ReadingTestContent,
  genTest1 as unknown as ReadingTestContent,
  genTest2 as unknown as ReadingTestContent,
  genTest3 as unknown as ReadingTestContent,
  genTest4 as unknown as ReadingTestContent,
  genTest5 as unknown as ReadingTestContent,
  genTest6 as unknown as ReadingTestContent,
];

export function getReadingTests(testType?: TestType): ReadingTestContent[] {
  if (!testType) return ALL_READING_TESTS;
  return ALL_READING_TESTS.filter((t) => t.testType === testType);
}

export function getReadingTestById(id: string): ReadingTestContent | undefined {
  return ALL_READING_TESTS.find((t) => t.id === id);
}

export interface FlattenedQuestion extends BaseQuestion {
  testId: string;
  testTitle: string;
  testType: TestType;
  passageNumber: number;
  passageTitle: string;
  passageText: string;
  groupInstruction: string;
}

/**
 * Extracts all questions across tests into a flat list, allowing targeted practice by question type!
 */
export function getAllFlattenedQuestions(): FlattenedQuestion[] {
  const result: FlattenedQuestion[] = [];

  for (const test of ALL_READING_TESTS) {
    for (const passage of test.passages) {
      for (const group of passage.questionGroups) {
        for (const q of group.questions) {
          result.push({
            ...q,
            testId: test.id,
            testTitle: test.title,
            testType: test.testType,
            passageNumber: passage.passageNumber,
            passageTitle: passage.title,
            passageText: passage.text,
            groupInstruction: group.groupInstruction,
          });
        }
      }
    }
  }

  return result;
}

export const QUESTION_TYPE_LABELS: Record<QuestionType, string> = {
  true_false_not_given: 'True / False / Not Given',
  yes_no_not_given: 'Yes / No / Not Given',
  matching_headings: 'Matching Headings',
  matching_information: 'Matching Information',
  matching_features: 'Matching Features',
  multiple_choice_single: 'Multiple Choice (Single)',
  multiple_choice_multi: 'Multiple Choice (Multi)',
  sentence_completion: 'Sentence Completion',
  summary_completion: 'Summary Completion',
  diagram_label_completion: 'Diagram Labeling',
  matching: 'Matching',
  short_answer: 'Short Answer',
};
