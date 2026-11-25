/**
 * Zarii IELTS - Public Landing Page Copy & Content Registry
 * Central source of truth for all public marketing copy.
 * Structured to allow optional runtime overrides from site settings.
 */

export interface LandingCopyConfig {
  navbar: {
    links: Array<{ name: string; href: string }>;
    loginLabel: string;
    signupLabel: string;
  };
  hero: {
    badge: string;
    headlinePrefix: string;
    headlineHighlight: string;
    subtext: string;
    primaryCta: string;
    secondaryCta: string;
    trustLine: string;
    samplePreviewLabel: string;
  };
  trustStrip: Array<{
    id: string;
    title: string;
    description: string;
  }>;
  modules: {
    title: string;
    subtitle: string;
    cards: Array<{
      id: 'listening' | 'reading' | 'writing' | 'speaking';
      name: string;
      title: string;
      color: string;
      bgTint: string;
      borderTint: string;
      bullets: string[];
      learnMoreAnchor: string;
    }>;
  };
  howItWorks: {
    title: string;
    subtitle: string;
    steps: Array<{
      stepNumber: number;
      title: string;
      description: string;
    }>;
  };
  features: {
    title: string;
    subtitle: string;
    rows: Array<{
      id: string;
      badge: string;
      title: string;
      description: string;
      checklist: string[];
      ctaLabel: string;
      ctaHref: string;
    }>;
  };
  whyZarii: {
    title: string;
    subtitle: string;
    items: Array<{
      id: string;
      title: string;
      description: string;
    }>;
  };
  scoreEstimateNote: {
    badge: string;
    title: string;
    statement: string;
    explanation: string;
  };
  twoWaysToLearn: {
    title: string;
    subtitle: string;
    courseCard: {
      badge: string;
      title: string;
      levelRange: string;
      description: string;
      bullets: string[];
      ctaLabel: string;
      ctaHref: string;
    };
    ieltsCard: {
      badge: string;
      title: string;
      levelRange: string;
      description: string;
      bullets: string[];
      ctaLabel: string;
      ctaHref: string;
    };
  };
  completeCourse: {
    title: string;
    subtitle: string;
    levels: Array<{
      level: string;
      name: string;
      summary: string;
      units: string;
      milestone: string;
    }>;
  };
  builtinDictionary: {
    title: string;
    subtitle: string;
    features: Array<{
      title: string;
      description: string;
    }>;
  };
  grammarSimple: {
    title: string;
    subtitle: string;
    tenses: Array<{
      name: string;
      timeline: string;
      formula: string;
      example: string;
    }>;
  };
  urduSpeakers: {
    title: string;
    subtitle: string;
    comparisons: Array<{
      topic: string;
      englishRule: string;
      urduDifference: string;
      commonTrap: string;
    }>;
  };
  faq: {
    title: string;
    subtitle: string;
    items: Array<{
      question: string;
      answer: string;
    }>;
  };
  finalCta: {
    headline: string;
    subtext: string;
    primaryBtn: string;
    secondaryBtn: string;
  };
  footer: {
    tagline: string;
    columns: Array<{
      title: string;
      links: Array<{ name: string; href: string; isExternal?: boolean }>;
    }>;
    disclaimer: string;
    copyright: string;
  };
}

export const LANDING_COPY: LandingCopyConfig = {
  navbar: {
    links: [
      { name: 'Features', href: '#features' },
      { name: 'Modules', href: '#modules' },
      { name: 'How it works', href: '#how-it-works' },
      { name: 'FAQ', href: '#faq' },
    ],
    loginLabel: 'Log in',
    signupLabel: 'Sign up',
  },
  hero: {
    badge: '100% Free • Two Learning Tracks',
    headlinePrefix: 'Learn English. ',
    headlineHighlight: 'Master IELTS.',
    subtext:
      'Free comprehensive English course from A1 to C1 and exam-style IELTS preparation for Listening, Reading, Writing and Speaking with an offline dictionary.',
    primaryCta: 'Start free',
    secondaryCta: 'Log in',
    trustLine: 'No credit card. No payments. Ever.',
    samplePreviewLabel: 'Sample preview',
  },
  trustStrip: [
    {
      id: 'stat-skills',
      title: '4 skills in one place',
      description: 'Listening, Reading, Writing, and Speaking with dedicated practice engines',
    },
    {
      id: 'stat-types',
      title: 'Academic and General Training',
      description: 'Targeted preparation tailored specifically to your chosen exam version',
    },
    {
      id: 'stat-free',
      title: 'Free forever',
      description: 'Zero paywalls, zero subscriptions, and no trial limits of any kind',
    },
    {
      id: 'stat-devices',
      title: 'Works on phone and laptop',
      description: 'Seamless responsive interface that saves your progress across study sessions',
    },
  ],
  modules: {
    title: 'Everything you need for all four skills',
    subtitle:
      'Master every official IELTS question type with authentic exam-length practice tests and interactive tools.',
    cards: [
      {
        id: 'listening',
        name: 'Listening',
        title: '4-Section Audio Simulator',
        color: '#0F8B8D',
        bgTint: 'bg-[#0F8B8D]/5 dark:bg-[#0F8B8D]/10',
        borderTint: 'border-[#0F8B8D]/20 dark:border-[#0F8B8D]/30',
        bullets: [
          'Multiple native accents (British, Australian, American)',
          'Complete audio controls with 10-minute answer transfer timer',
          'Immediate section-by-section breakdown with transcript audio replay',
        ],
        learnMoreAnchor: '#feature-listening',
      },
      {
        id: 'reading',
        name: 'Reading',
        title: 'Authentic 3-Passage Reader',
        color: '#124F40',
        bgTint: 'bg-[#124F40]/5 dark:bg-[#124F40]/10',
        borderTint: 'border-[#124F40]/20 dark:border-[#124F40]/30',
        bullets: [
          'All official question types including True/False/Not Given and Headings',
          'Interactive text highlighting and inline margin notes',
          'Timed 60-minute test environment matching Cambridge standards',
        ],
        learnMoreAnchor: '#feature-reading',
      },
      {
        id: 'writing',
        name: 'Writing',
        title: 'Task 1 & Task 2 Evaluator',
        color: '#D97706',
        bgTint: 'bg-[#D97706]/5 dark:bg-[#D97706]/10',
        borderTint: 'border-[#D97706]/20 dark:border-[#D97706]/30',
        bullets: [
          'Interactive graphs, bar charts, process diagrams, and essay prompts',
          'Live word count tracking and official timing benchmark coach',
          'Detailed criteria-by-criteria evaluation scoring your grammar and lexical range',
        ],
        learnMoreAnchor: '#feature-writing',
      },
      {
        id: 'speaking',
        name: 'Speaking',
        title: 'Part 1, 2 & 3 Voice Simulator',
        color: '#E05A47',
        bgTint: 'bg-[#E05A47]/5 dark:bg-[#E05A47]/10',
        borderTint: 'border-[#E05A47]/20 dark:border-[#E05A47]/30',
        bullets: [
          '1-minute preparation timer and 2-minute Part 2 cue card recorder',
          'Speech recognition audio transcription with fluency pacing metrics',
          'Native audio shadowing drills to improve pronunciation and intonation',
        ],
        learnMoreAnchor: '#feature-speaking',
      },
    ],
  },
  howItWorks: {
    title: 'How it works',
    subtitle: 'From baseline diagnosis to test-day readiness in 4 structured steps.',
    steps: [
      {
        stepNumber: 1,
        title: 'Set your target band and exam date',
        description:
          'Input your desired band score and target test date to calculate your required study hours and daily study pacing.',
      },
      {
        stepNumber: 2,
        title: 'Take a quick diagnostic test',
        description:
          'Complete a streamlined 30-minute initial assessment to pinpoint your current band baseline and isolate weak question types.',
      },
      {
        stepNumber: 3,
        title: 'Follow your personalised study plan',
        description:
          'Work through daily bite-sized recommendations including reading passages, audio drills, and vocabulary flashcards.',
      },
      {
        stepNumber: 4,
        title: 'Track progress and take full mock tests',
        description:
          'Monitor your score trajectory on the radar dashboard and sit timed, uninterrupted mock exams before your real test date.',
      },
    ],
  },
  features: {
    title: 'Engineered for genuine IELTS improvement',
    subtitle: 'Designed with the tools and realism serious test-takers need to advance by 0.5 to 1.5 bands.',
    rows: [
      {
        id: 'feature-reading',
        badge: 'Exam-style practice',
        title: 'Authentic split-screen computer-delivered testing',
        description:
          'Experience the exact layout of the computer-delivered IELTS exam. Read passages on the left while answering questions on the right, with zero jarring page reloads.',
        checklist: [
          'Full-passage text highlighting and sticky margin notes',
          'Sequential question navigation with answered/unanswered indicators',
          'Instant scoring with verified explanations and passage quote citations',
        ],
        ctaLabel: 'Try a sample passage',
        ctaHref: '/signup',
      },
      {
        id: 'feature-ai-feedback',
        badge: 'Instant AI feedback',
        title: 'Examiner-level assessment for Writing and Speaking',
        description:
          'Submit your essays and recorded speech to receive granular evaluations aligned with official public IELTS band descriptors, pointing out specific grammatical and lexical opportunities.',
        checklist: [
          'Four official criteria breakdown: TR/TA, CC, LR, and GRA',
          'Sentence-by-sentence grammatical corrections with improved alternatives',
          'Speech fluency pacing analysis and filler word detection',
        ],
        ctaLabel: 'Submit an essay free',
        ctaHref: '/signup',
      },
      {
        id: 'feature-study-plan',
        badge: 'Adaptive study timetable',
        title: 'A study plan that dynamically adapts to your schedule',
        description:
          'Never wonder what to study next. Zarii automatically generates a daily plan balancing all four skills, adjusting milestones based on your performance trends and exam countdown.',
      checklist: [
          'Daily 45 to 60 minute targeted study blocks',
          'Prioritizes question types where your historical accuracy is lowest',
          'Integrated Academic Word List (AWL) spaced repetition flashcards',
        ],
        ctaLabel: 'Build your plan',
        ctaHref: '/signup',
      },
      {
        id: 'feature-tracking',
        badge: 'Progress intelligence',
        title: 'Track every improvement with the mistake notebook',
        description:
          'Every missed question is automatically catalogued in your personal mistake notebook with diagnostic labels, enabling structured weekly reviews before exam day.',
        checklist: [
          'Historical score trendlines and skill breakdown radar graphs',
          'Automatic mistake categorization (e.g. synonym trap, missing plural)',
          'One-click retry mode to re-test previously missed questions',
        ],
        ctaLabel: 'Start tracking progress',
        ctaHref: '/signup',
      },
    ],
  },
  whyZarii: {
    title: 'Why prepare with Zarii',
    subtitle: 'Built from the ground up to provide world-class, accessible preparation for every candidate.',
    items: [
      {
        id: 'why-free',
        title: 'Free forever',
        description:
          'No credit card, no paywalls, and no subscription traps. High-quality IELTS preparation should be accessible to all students regardless of income.',
      },
      {
        id: 'why-original',
        title: 'Original practice content',
        description:
          'High-yield passages, multi-accent recordings, and rigorous prompts developed by experienced IELTS instructors to match Cambridge exam difficulty.',
      },
      {
        id: 'why-offline',
        title: 'Works offline as an installable app',
        description:
          'Install Zarii on your phone, tablet, or desktop as a Progressive Web App (PWA). Practise on the commute or in low-connectivity areas without losing data.',
      },
      {
        id: 'why-vocab',
        title: 'Vocabulary and grammar tools',
        description:
          '570 Academic Word List items powered by the SM-2 spaced repetition algorithm, complete with collocations, context sentences, and Urdu translations.',
      },
      {
        id: 'why-notebook',
        title: 'Mistake notebook and weekly review',
        description:
          'Learn from every error. Missed questions are saved to your revision queue so you never repeat the same trap on the real exam.',
      },
      {
        id: 'why-privacy',
        title: 'Privacy first (your data stays yours)',
        description:
          'Your attempts, notes, and study plans are stored locally in your browser. No ad trackers, no profile selling, and no unsolicited emails.',
      },
    ],
  },
  scoreEstimateNote: {
    badge: 'Transparency & Integrity',
    title: 'How scoring works on Zarii',
    statement: 'Zarii provides estimated band scores to guide your practice. They are not official IELTS results.',
    explanation:
      'Listening and Reading scores are derived directly from official Cambridge 40-question raw-to-band conversion tables. Writing and Speaking evaluations use calibrated rubrics aligned with public band descriptors. While these estimates reliably reflect your preparation level, only the official test partners (IDP, British Council, Cambridge) issue accredited IELTS Test Report Forms.',
  },
  twoWaysToLearn: {
    title: 'Two ways to learn',
    subtitle: 'Choose the path that matches your current goal, or study both simultaneously with a single account.',
    courseCard: {
      badge: 'Foundations & Fluency',
      title: 'English Course',
      levelRange: 'CEFR A1 to C1',
      description: 'Step-by-step general English curriculum taking you from basic beginner communication to advanced spontaneous fluency.',
      bullets: [
        'A1 to C1 structured progression with unit review tests (70% pass mark)',
        'Comprehensive grammar rules with SVG timelines and interactive exercises',
        'Built-in 150,000+ headword offline dictionary with audio pronunciation',
        'Dedicated skills practice: Graded Readers, Listening Dialogues & Speaking Drills',
      ],
      ctaLabel: 'Start free',
      ctaHref: '/signup',
    },
    ieltsCard: {
      badge: 'Exam Preparation',
      title: 'IELTS Preparation',
      levelRange: 'Academic & General Training',
      description: 'Authentic exam-calibrated simulation for candidates aiming for university admission, medical licensing, or migration visas.',
      bullets: [
        'All four skills: Listening, Reading, Writing, and Speaking exam simulators',
        'Authentic computer-delivered split-screen interface matching test day',
        'Instant band scoring calibrated to Cambridge raw-to-band conversion tables',
        'Examiner-aligned criteria breakdown and dynamic schedule planner',
      ],
      ctaLabel: 'Start free',
      ctaHref: '/signup',
    },
  },
  completeCourse: {
    title: 'Complete English course',
    subtitle: 'Structured CEFR level pathway from beginner basics to fluent mastery.',
    levels: [
      {
        level: 'A1',
        name: 'Beginner',
        summary: 'Sentence basics, to be, present simple, daily nouns, and basic questions.',
        units: '8 Units • 40+ Lessons',
        milestone: 'Introduce yourself and handle simple everyday interactions.',
      },
      {
        level: 'A2',
        name: 'Elementary',
        summary: 'Past and future tenses, routines, comparisons, and travel directions.',
        units: '10 Units • 50+ Lessons',
        milestone: 'Communicate in routine tasks and describe personal background.',
      },
      {
        level: 'B1',
        name: 'Intermediate',
        summary: 'Present perfect, conditionals, modal verbs, and opinion articulation.',
        units: '10 Units • 60+ Lessons',
        milestone: 'Maintain conversations and explain reasons, plans, and events.',
      },
      {
        level: 'B2',
        name: 'Upper-Intermediate',
        summary: 'Complex clauses, passive voice, academic debate, and idiomatic fluency.',
        units: '12 Units • 60+ Lessons',
        milestone: 'Interact with native speakers fluently without conscious strain.',
      },
      {
        level: 'C1',
        name: 'Advanced',
        summary: 'Inversion, nuance, professional presentation, and sophisticated discourse.',
        units: '10 Units • 50+ Lessons',
        milestone: 'Express ideas spontaneously, flexibly, and effectively for professional goals.',
      },
    ],
  },
  builtinDictionary: {
    title: 'Built-in offline dictionary',
    subtitle: 'Over 150,000 words right inside your study workspace. Instant, private, and always available.',
    features: [
      {
        title: 'Instant Prefix Autocomplete',
        description: 'Sub-10ms search over sharded letter indexes. Handles plurals, past tense inflections, and typos.',
      },
      {
        title: 'US & UK Pronunciation',
        description: 'Browser text-to-speech audio with normal and slow speeds, plus CMU ARPAbet-to-IPA transcriptions.',
      },
      {
        title: '100% Offline Caching',
        description: 'Letter shards cache seamlessly via browser CacheStorage so you can look up words without Wi-Fi.',
      },
      {
        title: 'Tap-to-Lookup Everywhere',
        description: 'Tap or select any word in any reading passage or lesson to inspect definitions and save to your word bank.',
      },
    ],
  },
  grammarSimple: {
    title: 'Grammar made simple',
    subtitle: 'Master parts of speech and every English tense through visual timelines and clear contrast tables.',
    tenses: [
      {
        name: 'Present Simple',
        timeline: 'Past ──●──●──●── Future (Habits & Facts)',
        formula: 'Subject + Verb(s) + Object',
        example: 'She reads academic papers every morning.',
      },
      {
        name: 'Present Continuous',
        timeline: 'Past ──[==●==]── Future (Happening Now)',
        formula: 'Subject + is/am/are + Verb-ing',
        example: 'The global climate is warming at an unprecedented rate.',
      },
      {
        name: 'Present Perfect',
        timeline: 'Past ──●──────► Present (Past Event with Present Result)',
        formula: 'Subject + have/has + Past Participle',
        example: 'Researchers have discovered a viable alternative energy source.',
      },
      {
        name: 'Past Simple',
        timeline: 'Past ──●───────── Future (Completed at a Specific Time)',
        formula: 'Subject + Verb-ed (or irregular)',
        example: 'The committee approved the new environmental policy in 2024.',
      },
      {
        name: 'Conditionals (1st & 2nd)',
        timeline: 'Condition [If...] ──► Expected Outcome [Will/Would...]',
        formula: 'If + Present, Will + Verb | If + Past, Would + Verb',
        example: 'If candidates practice consistently, they will achieve their target band.',
      },
    ],
  },
  urduSpeakers: {
    title: 'Made for Urdu speakers',
    subtitle: 'Targeting the exact word order and grammatical differences between Urdu and English.',
    comparisons: [
      {
        topic: 'Word Order (SVO vs SOV)',
        englishRule: 'Subject + Verb + Object ("I read books")',
        urduDifference: 'Urdu is Subject + Object + Verb ("میں کتابیں پڑھتا ہوں")',
        commonTrap: 'Placing the main verb at the end of the sentence or separating auxiliary verbs.',
      },
      {
        topic: 'Articles (A, An, The)',
        englishRule: 'Definite (the) and indefinite (a/an) articles determine noun specificity',
        urduDifference: 'Urdu has no direct equivalent for "the" or "a" (uses ایک for counting)',
        commonTrap: 'Omitting "the" before unique nouns ("sun", "internet") or countable nouns.',
      },
      {
        topic: 'Prepositions of Time & Place',
        englishRule: 'Distinct rules: "in June", "on Monday", "at 5 PM"',
        urduDifference: 'Urdu frequently uses "میں" (mein) or "پر" (par) for all three',
        commonTrap: 'Saying "in Monday" instead of "on Monday", or "in night" instead of "at night".',
      },
      {
        topic: 'Present Perfect vs Past Simple',
        englishRule: 'Never use specific finished time words ("yesterday") with present perfect',
        urduDifference: 'Urdu "میں نے کل دیکھا ہے" sounds natural but is grammatically incorrect in English',
        commonTrap: 'Saying "I have seen him yesterday" instead of "I saw him yesterday".',
      },
    ],
  },
  faq: {
    title: 'Frequently asked questions',
    subtitle: 'Everything you need to know about preparing with Zarii IELTS.',
    items: [
      {
        question: 'Is Zarii really 100% free?',
        answer:
          'Yes. Zarii is completely free to use. There are no paywalls, no premium tiers, no hidden charges, and no credit card is ever required. All four skill modules, diagnostic tests, vocabulary tools, and mock exams are unrestricted.',
      },
      {
        question: 'Do I need an account to practise?',
        answer:
          'You can start practising immediately as a guest directly from the login page without creating an account. Creating a free account lets you sync your progress, study plans, and mistake history across multiple devices.',
      },
      {
        question: 'Does Zarii support both Academic and General Training?',
        answer:
          'Yes. When setting up your profile, you can select Academic or General Training. Reading passages and Writing Task 1 prompts will automatically adapt to your chosen exam format.',
      },
      {
        question: 'How accurate are the estimated band scores?',
        answer:
          'Listening and Reading scores utilize the exact raw score conversion tables published for Cambridge exams. Writing and Speaking evaluations follow official public descriptors. While scores closely predict exam performance, they are intended for guidance and study benchmark purposes.',
      },
      {
        question: 'Does Zarii work on mobile phones and tablets?',
        answer:
          'Yes. The platform is fully responsive and optimized for touch devices. For writing and full-length reading mock tests, we recommend using a tablet or laptop to simulate the computer-delivered IELTS exam environment.',
      },
      {
        question: 'Can I use Zarii offline?',
        answer:
          'Yes. Zarii is built as a Progressive Web App (PWA). You can install it on your device and practise cached lessons, vocabulary flashcards, and grammar modules even without an active internet connection.',
      },
      {
        question: 'Is my personal data safe and private?',
        answer:
          'Absolutely. Zarii adopts a privacy-first architecture. Your exam responses and study history are stored locally in IndexedDB on your device. We do not sell user data, run third-party advertising cookies, or spam your inbox.',
      },
      {
        question: 'Who is Zarii for?',
        answer:
          'Zarii is built for anyone preparing for the IELTS exam: university applicants, healthcare workers, skilled migrants, and self-directed students aiming for Band 6.0 to 9.0.',
      },
      {
        question: 'What levels are covered in the English Course?',
        answer:
          'The course covers CEFR A1 Beginner, A2 Elementary, B1 Intermediate, B2 Upper-Intermediate, and C1 Advanced. Each level provides structured units, rule explanations, SVG grammar timelines, audio dialogues, exercises, and unit review tests with a 70% passing threshold.',
      },
      {
        question: 'How does the built-in dictionary work offline?',
        answer:
          'The dictionary is sharded into lightweight static letter files (under 100KB each) that cache locally in your browser CacheStorage and IndexedDB. You can search over 150,000 headwords, inspect IPA transcriptions, and listen to text-to-speech audio with zero active internet connection.',
      },
      {
        question: 'Can I study both the English Course and prepare for IELTS?',
        answer:
          'Yes. Both tracks share your unified profile, streak, and word bank. You can switch between tracks at any time via the sidebar track switcher, and reaching Level B2 in the English Course unlocks a gentle diagnostic recommendation for IELTS.',
      },
    ],
  },
  finalCta: {
    headline: 'Ready to learn English and reach your IELTS goal?',
    subtext: 'Start your journey today with our complete English course and authentic IELTS practice. 100% free forever.',
    primaryBtn: 'Create free account',
    secondaryBtn: 'Log in',
  },
  footer: {
    tagline: 'Learn English. Reach your IELTS goal.',
    columns: [
      {
        title: 'Product',
        links: [
          { name: 'Features', href: '#features' },
          { name: 'Two ways to learn', href: '#two-ways' },
          { name: 'English Course', href: '#english-course' },
          { name: 'Built-in Dictionary', href: '#dictionary' },
          { name: 'IELTS Modules', href: '#modules' },
          { name: 'How it works', href: '#how-it-works' },
        ],
      },
      {
        title: 'Support',
        links: [
          { name: 'FAQ & Help', href: '#faq' },
          { name: 'Contact', href: '/contact' },
        ],
      },
      {
        title: 'Legal',
        links: [
          { name: 'Privacy Policy', href: '/privacy' },
          { name: 'Terms of Service', href: '/terms' },
          { name: 'About Zarii', href: '/about' },
          { name: 'Open Source Credits', href: '/credits' },
        ],
      },
    ],
    disclaimer:
      'IELTS is a registered trademark of its owners. Zarii is independent and not affiliated with or endorsed by IELTS partners. Course levels and certificates are for self-study purposes and are not official qualifications.',
    copyright: `© ${new Date().getFullYear()} Zarii English Course and IELTS Preparation. All rights reserved.`,
  },
};
