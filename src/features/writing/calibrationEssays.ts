import type { WritingPromptContent } from '../../types';

export interface CalibrationEssayItem {
  id: string;
  title: string;
  taskType: 'task1_academic' | 'task1_general' | 'task2';
  targetBand: number;
  expectedCriteria: {
    taskAchievement: number;
    coherenceAndCohesion: number;
    lexicalResource: number;
    grammaticalRangeAndAccuracy: number;
  };
  prompt: WritingPromptContent;
  essayText: string;
  examinerNotes: string;
}

export const CALIBRATION_ESSAYS: CalibrationEssayItem[] = [
  {
    id: 'calib-01',
    title: 'Replacing Teachers with Computers (Band 5.0 Benchmark)',
    taskType: 'task2',
    targetBand: 5.0,
    expectedCriteria: {
      taskAchievement: 5.0,
      coherenceAndCohesion: 5.0,
      lexicalResource: 5.0,
      grammaticalRangeAndAccuracy: 5.0,
    },
    prompt: {
      id: 'calib-p-01',
      taskType: 'task2',
      title: 'Computers vs Human Teachers',
      promptText:
        'Some people believe that schools should replace human teachers with computers. To what extent do you agree or disagree?',
      minWordCount: 250,
      recommendedMinutes: 40,
    },
    essayText: `Nowadays technology is very popular in the world and many school use computer for study. Some people think computer should replace teacher in school. In my opinion I disagree with this idea because teacher is very important for student life.

Firstly, computer can give information to student very fast. You can search internet and find answer for homework. But computer cannot talk like human and cannot understand student feeling. When student is sad or have problem, computer cannot help them. Teacher can encourage student and give advice. So teacher is better than machine.

Secondly, student can become lazy if only use computer. Many student will play game or watch video instead of study. Teacher can control the classroom and make rule for student. Also teacher teach good manners and how to behave in society. If we have no teacher, student will not learn discipline.

Finally, computer is expensive to buy and maintain. Poor school does not have money to buy computer for all student. But teacher can teach many student in one class without problem.

In conclusion, I think computer is good tool for education but cannot replace real teacher. Government should keep teacher in school and use computer only for helping.`,
    examinerNotes:
      'Band 5.0: Limited vocabulary range with frequent repetition ("student", "teacher", "good"). Basic syntax with recurring agreement/tense slips ("have problem", "Poor school does not have"). Clear but repetitive progression with mechanical linkers ("Firstly", "Secondly"). Expresses a simple position.',
  },
  {
    id: 'calib-02',
    title: 'Global Water Usage (Band 5.5 Benchmark)',
    taskType: 'task1_academic',
    targetBand: 5.5,
    expectedCriteria: {
      taskAchievement: 5.5,
      coherenceAndCohesion: 5.5,
      lexicalResource: 5.5,
      grammaticalRangeAndAccuracy: 5.5,
    },
    prompt: {
      id: 'calib-p-02',
      taskType: 'task1_academic',
      title: 'Global Water Usage by Sector (1900-2000)',
      chartType: 'line',
      promptText:
        'The line graph below shows global water consumption across three sectors between 1900 and 2000. Summarise the information by selecting and reporting the main features, and make comparisons where relevant.',
      minWordCount: 150,
      recommendedMinutes: 20,
    },
    essayText: `The line graph gives information about how much water was used in the world from 1900 to 2000 in agriculture, industrial and domestic sectors.

Looking at the details, in 1900 agriculture used about 500 km3 of water. After that it was increasing slowly until 1950. Then it went up very fast and reached about 3000 km3 in the year 2000. It was the highest water user in the whole period.

For industrial use, in 1900 it was very small, only around 50 km3. It remained low until 1950, but after 1950 it increased rapidly to nearly 1000 km3 by 2000. This was the second biggest sector.

Finally, domestic water consumption was the lowest. It started at almost zero in 1900. It grew slowly to about 100 km3 in 1950 and finished at approximately 400 km3 in 2000.

Overall, water consumption increased in all three sectors over the 100 years, with agriculture consuming the most water throughout the time.`,
    examinerNotes:
      'Band 5.5: Contains an overview at the end but it is minimal. High reliance on repetitive phrases ("was increasing slowly", "went up very fast", "started at"). Paragraphs are divided mechanically by sector without integration or comparisons.',
  },
  {
    id: 'calib-03',
    title: 'Individual vs Government Environmental Responsibility (Band 6.0 Benchmark)',
    taskType: 'task2',
    targetBand: 6.0,
    expectedCriteria: {
      taskAchievement: 6.0,
      coherenceAndCohesion: 6.0,
      lexicalResource: 6.0,
      grammaticalRangeAndAccuracy: 6.0,
    },
    prompt: {
      id: 'calib-p-03',
      taskType: 'task2',
      title: 'Environmental Responsibility',
      promptText:
        'Some people believe that environmental problems should be solved by governments rather than individuals. To what extent do you agree or disagree?',
      minWordCount: 250,
      recommendedMinutes: 40,
    },
    essayText: `Environmental degradation is one of the most serious challenges facing the modern world today. While some individuals argue that only governments have the power to solve these issues, I partially agree because both state authorities and regular citizens must work together to achieve real change.

On the one hand, governments have great authority and financial resources that individuals lack. They can pass strict environmental laws to control factories and penalize companies that cause high pollutions. For instance, many European countries have introduced carbon taxes, which force big corporations to reduce their greenhouse gases. Furthermore, governments can invest money in renewable energy like solar panels and wind turbines, which ordinary people cannot build on their own. Therefore, state action is essential for large-scale solutions.

On the other hand, individual actions are also very important in daily life. If people do not change their habits, government policies will not succeed. For example, individuals can reduce waste by recycling plastic bottles, saving water at home, and choosing public transport instead of driving private cars. If millions of people make small changes in their daily lifestyle, the overall demand for fossil fuels will decrease significantly. Consumer choices can also pressure supermarkets to stop using unnecessary plastic packaging.

In conclusion, although governments hold the primary responsibility for passing regulations and funding green projects, the crisis cannot be resolved without the active participation of individual citizens. Both sides must cooperate to protect our planet.`,
    examinerNotes:
      'Band 6.0: Addresses all parts of the prompt with a clear position. Mix of simple and complex sentences. Cohesion is functional though some mechanical transitions persist ("On the one hand", "On the other hand", "In conclusion"). Lexical resource is adequate with occasional non-academic phrasing ("great authority", "high pollutions").',
  },
  {
    id: 'calib-04',
    title: 'Renewable Electricity Generation in Europe (Band 6.5 Benchmark)',
    taskType: 'task1_academic',
    targetBand: 6.5,
    expectedCriteria: {
      taskAchievement: 7.0,
      coherenceAndCohesion: 6.5,
      lexicalResource: 6.5,
      grammaticalRangeAndAccuracy: 6.0,
    },
    prompt: {
      id: 'calib-p-04',
      taskType: 'task1_academic',
      title: 'Renewable Electricity in Four Nations',
      chartType: 'bar',
      promptText:
        'The bar chart compares the percentage of electricity generated from clean renewable resources in four European nations in 2010 and 2020. Summarise the information by selecting and reporting the main features, and make comparisons where relevant.',
      minWordCount: 150,
      recommendedMinutes: 20,
    },
    essayText: `The bar chart illustrates the proportion of electricity produced from renewable energy sources across four different European countries in 2010 and 2020.

Overall, it is immediately apparent that all four nations experienced an upward trend in their share of renewable power over the decade. Germany and Sweden consistently generated higher percentages compared to France and the United Kingdom, with Sweden recording the highest figures in both years.

In 2010, Sweden led the group with approximately 48% of its electricity originating from renewable sources, followed closely by Germany at around 32%. By contrast, the United Kingdom and France generated significantly smaller proportions, at roughly 12% and 15% respectively.

Over the subsequent ten years, all countries expanded their clean energy capacity. Sweden increased its share further to 62%, maintaining its position as the top producer. Germany also showed substantial growth, reaching 45% in 2020. Meanwhile, the UK witnessed the most rapid proportional increase, more than doubling its share to 30%, whereas France grew more moderately to reach 22%.`,
    examinerNotes:
      'Band 6.5: Clear overview with appropriate comparison. Good logical organisation with distinct comparative groupings. Good vocabulary with some flexibility ("proportional increase", "clean energy capacity"). Minor grammatical and punctuation slips prevent a higher GRA band.',
  },
  {
    id: 'calib-05',
    title: 'Telecommuting and Remote Work (Band 7.0 Benchmark)',
    taskType: 'task2',
    targetBand: 7.0,
    expectedCriteria: {
      taskAchievement: 7.0,
      coherenceAndCohesion: 7.0,
      lexicalResource: 7.0,
      grammaticalRangeAndAccuracy: 7.0,
    },
    prompt: {
      id: 'calib-p-05',
      taskType: 'task2',
      title: 'Remote Working and Telecommuting',
      promptText:
        'In many countries, an increasing number of people are choosing to work from home rather than in a traditional office. Do the advantages of this trend outweigh the disadvantages?',
      minWordCount: 250,
      recommendedMinutes: 40,
    },
    essayText: `In recent years, advancements in digital telecommunications have enabled an unprecedented number of employees to perform their professional duties from home. While this shift presents certain challenges regarding social isolation and team cohesion, I firmly believe that the benefits—particularly in terms of work-life equilibrium and environmental sustainability—far outweigh the drawbacks.

The primary disadvantage of remote working lies in the potential erosion of interpersonal collaboration and workplace morale. In traditional office environments, informal discussions and impromptu problem-solving occur naturally, fostering team solidarity and creative synergy. By contrast, remote employees frequently communicate through scheduled video calls and messaging platforms, which can feel transactional and lead to professional alienation. Furthermore, blurring the physical boundaries between home and office often results in employees working overtime, which may precipitate chronic fatigue and burnout.

Nevertheless, the advantages of telecommuting are both substantial and transformative. Foremost among these is the dramatic reduction in daily commuting time. Eliminating hours spent in traffic congestion allows professionals to allocate more time to family obligations, physical exercise, and continuous learning, thereby significantly improving overall mental well-being and productivity. Moreover, from an environmental standpoint, fewer vehicular commutes directly decrease urban greenhouse gas emissions and ease strain on public transport infrastructure. From an organizational perspective, companies can downsize expensive commercial real estate holdings while tapping into a geographically diverse talent pool.

In conclusion, although remote work necessitates proactive strategies to mitigate isolation and maintain collaborative synergy, its profound contributions to individual well-being, operational cost-efficiency, and environmental preservation make it a predominantly advantageous modern practice.`,
    examinerNotes:
      'Band 7.0: Presents a clear position throughout with well-developed ideas. Cohesive devices are used flexibly without mechanical over-reliance. Lexical resource demonstrates style and academic precision ("work-life equilibrium", "professional alienation", "impromptu problem-solving"). Varied complex sentence structures with frequent error-free sentences.',
  },
  {
    id: 'calib-06',
    title: 'Globalization and Cultural Identity (Band 8.0 Benchmark)',
    taskType: 'task2',
    targetBand: 8.0,
    expectedCriteria: {
      taskAchievement: 8.0,
      coherenceAndCohesion: 8.0,
      lexicalResource: 8.0,
      grammaticalRangeAndAccuracy: 8.0,
    },
    prompt: {
      id: 'calib-p-06',
      taskType: 'task2',
      title: 'Globalization vs Cultural Heritage',
      promptText:
        'Some people argue that globalization inevitably erodes national identity and cultural heritage. Discuss both views and give your opinion.',
      minWordCount: 250,
      recommendedMinutes: 40,
    },
    essayText: `The relentless pace of globalization in the twenty-first century has sparked intense debate regarding its ramifications for national culture. While some observers lament that global integration inexorably dissolves indigenous customs and homogenizes cultural identity, others maintain that it fosters cross-cultural dynamism and mutual tolerance. In my view, while globalization does threaten vulnerable traditional customs, it simultaneously provides unprecedented platforms for cultural revitalization and global appreciation.

Critics of globalization legitimately emphasize the perils of cultural homogenization. The ubiquitous spread of transnational entertainment conglomerates, consumerist brand hegemony, and the English language has unquestionably displaced local linguistic nuances and traditional pastimes, particularly among younger demographics. In urban centers across the globe, standardized retail franchises and fast-food establishments have supplanted heritage architecture and regional gastronomy. Consequently, historical rituals and indigenous folklore risk becoming obsolete relics unless deliberate institutional safeguards are enforced.

Conversely, globalization facilitates an enriching cultural cross-pollination rather than merely an imperialistic erasure. Digital interconnectedness enables minority artists, writers, and musicians to broadcast indigenous traditions to international audiences, thereby securing both global recognition and financial viability for heritage crafts that might otherwise perish locally. Furthermore, exposure to foreign worldviews broadens civic empathy, dispels parochial prejudices, and encourages cultural hybridization—where communities organically synthesize imported modern concepts with domestic values.

In conclusion, while the threat of cultural dilution under global commercial pressures is genuine, globalization should not be viewed as an unmitigated catastrophe for national identity. Provided that sovereign governments actively protect their linguistic and historical heritage, global integration can serve to enrich and sustain diverse cultural traditions rather than extinguish them.`,
    examinerNotes:
      'Band 8.0: Fully addresses all parts with an insightful, balanced response. Coherence is managed smoothly with seamless discourse progression. Skilfully uses uncommon lexical items ("inexorably dissolves", "brand hegemony", "parochial prejudices", "cultural cross-pollination") with precise nuance. Wide range of complex sentence structures executed with virtually error-free accuracy.',
  },
];
