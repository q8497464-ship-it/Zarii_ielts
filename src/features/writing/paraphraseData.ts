import type { ParaphrasePromptItem } from '../../types';

export const PARAPHRASE_PROMPTS: ParaphrasePromptItem[] = [
  {
    id: 'para-01',
    originalSentence: 'The line graph shows the proportion of men and women who exercised regularly between 2000 and 2020.',
    context: 'Task 1 Academic Introduction',
    taskType: 'task1',
    keyTermsToParaphrase: ['shows', 'proportion of men and women', 'exercised regularly', 'between 2000 and 2020'],
    modelAnswers: {
      band7: 'The line chart illustrates the percentage of male and female individuals engaging in routine physical activity from 2000 to 2020.',
      band8: 'The provided line graph delineates the share of adult males and females participating in habitual exercise over a twenty-year timeframe commencing in 2000.',
      band9: 'The graphic representation details the demographic breakdown of regular exercise participation rates among men and women over the two-decade span from 2000 to 2020.',
    },
    examinerTip: 'Change word class (e.g. verb "exercised regularly" to noun phrase "routine physical activity") and replace time phrases ("between 2000 and 2020" with "over a twenty-year timeframe commencing in 2000").',
  },
  {
    id: 'para-02',
    originalSentence: 'Some people believe that university education should be free for all students, while others think students should pay.',
    context: 'Task 2 Discuss Both Views Introduction',
    taskType: 'task2',
    keyTermsToParaphrase: ['university education', 'free for all students', 'students should pay'],
    modelAnswers: {
      band7: 'While it is argued by some that tertiary education ought to be entirely state-funded, others contend that undergraduates should bear their own tuition costs.',
      band8: 'Opinions diverge on whether higher education should be universally subsidised by the government or funded directly through student tuition fees.',
      band9: 'Whereas a faction of society advocates for universally gratuitous tertiary schooling, opposing voices assert that personal financial contribution is indispensable.',
    },
    examinerTip: 'Use contrasting subordinate clauses ("Whereas...", "While it is argued that...") and precise academic synonyms like "tertiary schooling" and "state-subsidised".',
  },
  {
    id: 'para-03',
    originalSentence: 'The bar chart compares the amount of electricity produced from renewable sources in four European countries in 2022.',
    context: 'Task 1 Academic Introduction',
    taskType: 'task1',
    keyTermsToParaphrase: ['compares', 'amount of electricity produced', 'renewable sources', 'four European countries'],
    modelAnswers: {
      band7: 'The bar chart depicts the volume of clean energy generated across four nations in Europe during the year 2022.',
      band8: 'The comparative bar chart demonstrates electrical output derived from sustainable power resources within four distinct European states in 2022.',
      band9: 'The chart provides a comparative breakdown of renewable power generation metrics across four separate European jurisdictions over the course of 2022.',
    },
    examinerTip: 'Swap "compares the amount of" with "provides a comparative breakdown of" and "renewable sources" with "sustainable power resources".',
  },
  {
    id: 'para-04',
    originalSentence: 'Governments should invest more money in public transport rather than building new roads.',
    context: 'Task 2 Opinion Essay',
    taskType: 'task2',
    keyTermsToParaphrase: ['invest more money', 'public transport', 'building new roads'],
    modelAnswers: {
      band7: 'Authorities ought to allocate greater fiscal resources toward mass transit systems instead of constructing additional highways.',
      band8: 'It is contended that state funding would be more effectively channelled into public transit infrastructure rather than the expansion of vehicular roadways.',
      band9: 'Fiscal prioritisation should arguably favour the modernisation of civic transit networks over the relentless proliferation of asphalt thoroughfares.',
    },
    examinerTip: 'Use passive constructions like "state funding would be more effectively channelled into..." and replace "invest money" with "allocate fiscal resources".',
  },
  {
    id: 'para-05',
    originalSentence: 'The table below gives information about household spending on five categories in the UK in 2010 and 2020.',
    context: 'Task 1 Academic Table',
    taskType: 'task1',
    keyTermsToParaphrase: ['gives information about', 'household spending', 'five categories', 'in 2010 and 2020'],
    modelAnswers: {
      band7: 'The table reveals domestic expenditure patterns across five distinct sectors within the United Kingdom for 2010 and 2020.',
      band8: 'The tabular data outlines how British households distributed their expenditure across five commodity areas between 2010 and 2020.',
      band9: 'The table delineates budgetary allocations across five consumer sectors amongst UK families across two benchmark years, namely 2010 and 2020.',
    },
    examinerTip: 'Convert "household spending" into "domestic expenditure patterns" or "budgetary allocations", and use "benchmark years".',
  },
  {
    id: 'para-06',
    originalSentence: 'In many countries, traditional festivals and cultural events are disappearing. What are the causes, and what can be done?',
    context: 'Task 2 Problems and Solutions',
    taskType: 'task2',
    keyTermsToParaphrase: ['traditional festivals', 'cultural events', 'disappearing', 'causes', 'what can be done'],
    modelAnswers: {
      band7: 'Across numerous nations, historical celebrations and folklore festivities are gradually fading away, prompting inquiries into their underlying drivers and potential remedies.',
      band8: 'The erosion of heritage festivals and indigenous cultural customs represents an escalating global phenomenon whose root etiologies demand targeted mitigating strategies.',
      band9: 'A concerning decline in traditional ceremonies and heritage observances is currently witnessed globally, necessitating a rigorous inquiry into causal factors alongside actionable countermeasures.',
    },
    examinerTip: 'Replace "disappearing" with "gradual erosion" or "fading away", and replace "what can be done" with "mitigating strategies" or "actionable countermeasures".',
  },
];
