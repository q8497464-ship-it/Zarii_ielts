// Writing Tasks Library for General English
// Graded prompts from A1 to C1: Forms, Postcards, Emails, Essays, and Reports

import type { EnglishCEFRLevel } from '../../../types';

export interface FormFieldConfig {
  id: string;
  label: string;
  placeholder: string;
  type: 'text' | 'email' | 'tel' | 'select' | 'date';
  options?: string[];
  required: boolean;
}

export interface UsefulPhraseCategory {
  category: string;
  phrases: string[];
}

export interface WritingChecklistItem {
  id: string;
  label: string;
  description: string;
}

export interface WritingTask {
  id: string;
  title: string;
  level: EnglishCEFRLevel;
  taskType: 'form-sentences' | 'postcard-message' | 'email-story' | 'essay-review' | 'report-letter';
  topic: string;
  scenario: string;
  promptInstructions: string;
  minWords: number;
  maxWords: number;
  formFields?: FormFieldConfig[];
  usefulPhrases: UsefulPhraseCategory[];
  checklist: WritingChecklistItem[];
  modelAnswer: string;
  urduGuidance: string;
}

export const WRITING_TASKS: WritingTask[] = [
  // --- LEVEL A1 ---
  {
    id: 'write-a1-01',
    title: 'Hotel Guest Registration & Welcome Notes',
    level: 'A1',
    taskType: 'form-sentences',
    topic: 'Travel Accommodation',
    scenario: 'You are checking into the Lakeside Hotel. First, fill out your basic registration form. Then, write three simple sentences in the note box explaining why you are visiting, who you are traveling with, and when you plan to check out.',
    promptInstructions: '1. Fill in your name, city, email, and arrival date.\n2. Write exactly 3 clear English sentences in the guest note box (for example: "I am visiting this city for a holiday. I am traveling with my brother. We will check out on Sunday morning.").',
    minWords: 20,
    maxWords: 55,
    formFields: [
      { id: 'fullName', label: 'Full Name', placeholder: 'e.g. Tariq Mansoor', type: 'text', required: true },
      { id: 'cityCountry', label: 'City & Country', placeholder: 'e.g. Lahore, Pakistan', type: 'text', required: true },
      { id: 'emailAddress', label: 'Email Address', placeholder: 'e.g. tariq@example.com', type: 'email', required: true },
      { id: 'roomPreference', label: 'Room Type', placeholder: 'Select room', type: 'select', options: ['Single Standard', 'Double Deluxe', 'Twin Room'], required: true }
    ],
    usefulPhrases: [
      {
        category: 'Introducing Your Stay',
        phrases: ['I am staying here for...', 'I am visiting this city for a holiday.', 'I am traveling with my family.']
      },
      {
        category: 'Stating Preferences',
        phrases: ['We need a quiet room.', 'I will check out on Sunday.', 'Thank you for your warm welcome.']
      }
    ],
    checklist: [
      { id: 'chk-1', label: 'Form fields filled', description: 'Provided full name, city, and email.' },
      { id: 'chk-2', label: 'Capital Letters', description: 'Started every sentence with a capital letter and capitalized names.' },
      { id: 'chk-3', label: 'Three Complete Sentences', description: 'Wrote 3 separate sentences ending with full stops (periods).' }
    ],
    modelAnswer: 'I am visiting this beautiful city for a short holiday. I am traveling with my younger brother. We plan to check out on Sunday morning after breakfast.',
    urduGuidance: 'پہلے فارم کے تمام خانے پر کریں، پھر گیسٹ نوٹ کے خانے میں تین آسان اور مکمل انگریزی جملے لکھیں۔'
  },

  // --- LEVEL A2 ---
  {
    id: 'write-a2-01',
    title: 'Postcard to a Friend from Northern Valleys',
    level: 'A2',
    taskType: 'postcard-message',
    topic: 'Travel & Friendship',
    scenario: 'You are on vacation in the scenic northern valleys. Write a friendly postcard to your close friend describing the weather, two activities you enjoyed, and asking about their week.',
    promptInstructions: 'Write a postcard of 50 to 90 words:\n- Greet your friend warmly.\n- Describe where you are staying and what the weather is like.\n- Mention 2 things you have done so far.\n- Conclude with a warm sign-off.',
    minWords: 45,
    maxWords: 95,
    usefulPhrases: [
      {
        category: 'Greetings & Openings',
        phrases: ['Dear Ali,', 'Greetings from Hunza!', 'I hope you are doing well.']
      },
      {
        category: 'Describing Weather & Places',
        phrases: ['The weather here is crisp and sunny.', 'The mountain views are breathtaking.', 'We are staying at a cozy cabin near the river.']
      },
      {
        category: 'Activities in the Past',
        phrases: ['Yesterday we hiked up the trail.', 'We tasted delicious local honey and walnuts.', 'I took lots of photographs.']
      },
      {
        category: 'Sign-offs',
        phrases: ['Wish you were here!', 'See you next week,', 'Best wishes,']
      }
    ],
    checklist: [
      { id: 'chk-a2-1', label: 'Friendly Greeting', description: 'Used a natural informal greeting like "Dear [Name]," or "Hi [Name],"' },
      { id: 'chk-a2-2', label: 'Past Tense Consistency', description: 'Used regular and irregular past verbs correctly (hiked, visited, saw).' },
      { id: 'chk-a2-3', label: 'Friendly Closing', description: 'Ended with a warm sign-off and your name.' }
    ],
    modelAnswer: 'Dear Bilal,\n\nGreetings from the northern mountains! We are having a wonderful holiday here. The weather is crisp, cool, and very sunny.\n\nYesterday, we hiked along a scenic river trail and visited an ancient fort. In the evening, we tasted delicious local tea near the fireplace. I took fantastic photos to show you.\n\nHow is your week going? Wish you were here!\n\nWarm regards,\nZain',
    urduGuidance: 'پوسٹ کارڈ میں موسم، سیر و تفریح کی دو سرگرمیاں اور اختتامی دعائیہ کلمات شامل کریں۔'
  },

  // --- LEVEL B1 ---
  {
    id: 'write-b1-01',
    title: 'Apology and Rescheduling Email to a Colleague',
    level: 'B1',
    taskType: 'email-story',
    topic: 'Professional Workplace Email',
    scenario: 'You had arranged an important project planning meeting with your senior colleague, Ms. Sarah, for tomorrow at 10:00 AM. However, due to an urgent client emergency, you cannot attend.',
    promptInstructions: 'Write an email of 90 to 140 words:\n- Apologize sincerely for the short notice.\n- Explain clearly why you are unable to attend.\n- Suggest two specific alternative dates/times next week.\n- Offer to share an advance summary document before the next meeting.',
    minWords: 80,
    maxWords: 150,
    usefulPhrases: [
      {
        category: 'Apologizing Politely',
        phrases: [
          'Please accept my sincere apologies for the short notice.',
          'I regret to inform you that I must reschedule our upcoming meeting.',
          'Unfortunately, an unforeseen client commitment has arisen.'
        ]
      },
      {
        category: 'Proposing Alternative Times',
        phrases: [
          'Would you be available on Tuesday afternoon instead?',
          'I am completely free on Wednesday at 11:00 AM or Thursday at 2:00 PM.',
          'Please let me know if either of these options suits your schedule.'
        ]
      },
      {
        category: 'Proactive Follow-up',
        phrases: [
          'In the meantime, I have attached the draft agenda for your review.',
          'I look forward to discussing our milestones soon.',
          'Thank you for your kind understanding.'
        ]
      }
    ],
    checklist: [
      { id: 'chk-b1-1', label: 'Clear Subject Line', description: 'Included a concise, professional email subject line.' },
      { id: 'chk-b1-2', label: 'Polite Formal Register', description: 'Maintained polite professional tone without overly casual slang.' },
      { id: 'chk-b1-3', label: 'Actionable Next Steps', description: 'Provided specific alternative meeting times.' }
    ],
    modelAnswer: 'Subject: Rescheduling our Project Planning Meeting\n\nDear Ms. Sarah,\n\nPlease accept my sincere apologies for the short notice, but I regret to inform you that I must reschedule our project planning session scheduled for tomorrow at 10:00 AM.\n\nAn urgent client issue has developed on site that requires my immediate personal attention throughout the morning. To ensure we have sufficient uninterrupted time to review the marketing timeline, would you be available to meet on Wednesday at 11:00 AM or Thursday at 2:30 PM instead?\n\nIn the meantime, I have attached our preliminary agenda and revised mockups so that you can examine them in advance. Thank you for your flexibility and understanding.\n\nBest regards,\nUsman Qureshi',
    urduGuidance: 'ایک باوقار اور پیشہ ورانہ ای میل لکھیں جس میں معذرت، مجبوری کی وضاحت اور متبادل اوقات پیش کیے گئے ہوں۔'
  },

  // --- LEVEL B2 ---
  {
    id: 'write-b2-01',
    title: 'Opinion Essay: The Merits and Drawbacks of Remote Work',
    level: 'B2',
    taskType: 'essay-review',
    topic: 'Modern Work Culture',
    scenario: 'Many contemporary enterprises have transitioned permanently from traditional corporate office spaces to flexible remote work arrangements. Consider both sides of this development.',
    promptInstructions: 'Write a balanced opinion essay of 160 to 240 words:\n- Introduction: Introduce the trend and present your clear thesis statement.\n- Body Paragraph 1: Discuss the advantages (e.g. flexibility, zero commute, wider talent pool).\n- Body Paragraph 2: Discuss the disadvantages (e.g. isolation, blurred personal boundaries, communication hurdles).\n- Conclusion: Reiterate your overall stance with a forward-looking summary.',
    minWords: 150,
    maxWords: 260,
    usefulPhrases: [
      {
        category: 'Introductory & Framing Phrases',
        phrases: [
          'In recent years, the paradigm of work has experienced a profound shift.',
          'While proponents highlight enhanced autonomy, skeptics emphasize potential drawbacks.',
          'This essay will examine both perspectives before arriving at a balanced conclusion.'
        ]
      },
      {
        category: 'Transition & Contrast Connectors',
        phrases: [
          'On the one hand, remote work eliminates demanding daily commutes.',
          'Conversely, the lack of physical interaction may lead to professional isolation.',
          'Furthermore, maintaining a distinct boundary between work and domestic life proves challenging.'
        ]
      },
      {
        category: 'Concluding Formulations',
        phrases: [
          'To conclude, although remote employment presents notable challenges, its merits are substantial.',
          'A hybrid model arguably offers the most sustainable equilibrium.',
          'Ultimately, success hinges on intentional communication and structured routines.'
        ]
      }
    ],
    checklist: [
      { id: 'chk-b2-1', label: 'Logical 4-Paragraph Structure', description: 'Clear introduction, 2 balanced body paragraphs, and conclusion.' },
      { id: 'chk-b2-2', label: 'Varied Cohesive Devices', description: 'Used connectors like "On the one hand", "Conversely", "Furthermore", "Ultimately".' },
      { id: 'chk-b2-3', label: 'Precise Vocabulary', description: 'Employed thematic terms such as "paradigm", "autonomy", "commute", "equilibrium".' }
    ],
    modelAnswer: 'In recent years, the widespread shift toward remote employment has fundamentally transformed modern corporate culture. While some observers mourn the decline of collaborative office environments, flexible telecommuting provides compelling advantages for both employers and personnel.\n\nOn the one hand, remote work substantially improves work-life balance and individual productivity. By eliminating arduous daily commutes, workers reclaim valuable hours each week that can be directed toward personal wellness, continuous learning, and family life. Furthermore, decentralized teams allow corporations to recruit exceptional international talent regardless of geographic limitations.\n\nOn the other hand, telecommuting is not devoid of complications. The erosion of physical boundaries frequently tempts employees into round-the-clock connectivity, exacerbating workplace burnout. Additionally, spontaneous creative brainstorming and informal mentorship can be severely impeded in purely virtual settings.\n\nIn conclusion, while telecommuting requires diligent personal discipline and conscious communication strategies, its lifestyle benefits are undeniable. Rather than adopting an all-or-nothing approach, progressive organizations will likely thrive by implementing hybrid models that harmonize autonomy with face-to-face synergy.',
    urduGuidance: 'ایک متوازن اور جامع مضمون تحریر کریں جس میں ریموٹ ورک کے فوائد اور نقصانات کا موازنہ کر کے حتمی نتیجہ اخذ کیا گیا ہو۔'
  },

  // --- LEVEL C1 ---
  {
    id: 'write-c1-01',
    title: 'Workplace Proposal Report: Improving Departmental Sustainability',
    level: 'C1',
    taskType: 'report-letter',
    topic: 'Corporate Environmental Governance',
    scenario: 'You have been tasked by your organization’s executive committee to submit a formal strategic proposal recommending concrete measures to reduce the company’s ecological footprint over the next 18 months.',
    promptInstructions: 'Write a structured executive report of 220 to 320 words:\n- Executive Summary & Purpose.\n- Diagnostic Findings (identifying current operational inefficiencies).\n- Strategic Recommendations (e.g. digital transition, renewable procurement, travel reduction).\n- Projected Impact & Implementation Milestones.',
    minWords: 200,
    maxWords: 340,
    usefulPhrases: [
      {
        category: 'Formal Report Headings & Framing',
        phrases: [
          '1. Executive Summary & Purpose',
          '2. Current Operational Diagnostic',
          '3. Strategic Recommendations',
          '4. Projected Milestones & Cost-Benefit Analysis'
        ]
      },
      {
        category: 'High-Level Analytical Expressions',
        phrases: [
          'This report articulates actionable interventions designed to optimize resource allocation.',
          'A preliminary internal audit reveals considerable redundancies in hardware procurement.',
          'Phasing in digital documentation protocols will yield quantifiable carbon reductions.',
          'Such proactive restructuring aligns directly with prevailing international ESG standards.'
        ]
      }
    ],
    checklist: [
      { id: 'chk-c1-1', label: 'Professional Report Format', description: 'Used numbered sections, bulleted recommendations, and an executive summary.' },
      { id: 'chk-c1-2', label: 'Sophisticated Lexical Register', description: 'Maintained advanced academic and corporate vocabulary (redundancies, ESG, procurement, mitigation).' },
      { id: 'chk-c1-3', label: 'Actionable Feasibility', description: 'Included measurable milestones and realistic implementation guidelines.' }
    ],
    modelAnswer: 'PROPOSAL REPORT: STRATEGIC SUSTAINABILITY ROADMAP\n\n1. Executive Summary\nThis report articulates actionable interventions designed to systematically minimize our organization’s carbon footprint over the upcoming 18-month fiscal cycle, while preserving operational agility.\n\n2. Current Operational Diagnostic\nA preliminary internal environmental audit identified three predominant sources of resource inefficiency:\n- Excessive paper documentation in routine legal and administrative compliance workflows.\n- Redundant hardware energy consumption during non-operational evening hours.\n- Unrestricted domestic air travel for inter-branch briefings that could be seamlessly conducted virtually.\n\n3. Strategic Recommendations\nTo resolve these operational externalities, the sustainability taskforce recommends the following immediate measures:\n- Comprehensive Digital Workflow Migration: Transition all routine contracting and filing to encrypted cloud infrastructure, eliminating paper dependency within six months.\n- Automated Smart Facility Scheduling: Implement automated IoT sensors across facilities to optimize HVAC and lighting utilization, yielding an estimated 22% reduction in kilowatt-hour consumption.\n- Sustainable Corporate Mobility Protocol: Mandate virtual conferencing as the primary medium for inter-office consultations, restricting air travel to essential client engagements.\n\n4. Implementation & Projected Impact\nBy instituting these protocols over phased quarterly tranches, the organization will not only achieve quantifiable emissions reductions but also realize substantial operational cost savings. Aligning internal practices with international ESG benchmarks safeguards institutional reputation and fosters employee engagement.',
    urduGuidance: 'ایک باضابطہ تجویزی رپورٹ تیار کریں جس میں ایگزیکٹو سمری، مسائل کا تجزیہ، سفارشات اور نفاذ کا لائحہ عمل دیا گیا ہو۔'
  }
];
