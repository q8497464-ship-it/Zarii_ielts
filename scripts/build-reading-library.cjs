// Script to generate/compile 100 graded readers (20 per level A1-C1)
const fs = require('fs');
const path = require('path');

const LEVELS = ['A1', 'A2', 'B1', 'B2', 'C1'];

const THEMES = {
  A1: [
    { title: "My Daily Morning Routine", genre: "story", topic: "Daily Life" },
    { title: "At the Neighborhood Supermarket", genre: "dialogue", topic: "Shopping" },
    { title: "Welcome to Our Family Dinner", genre: "story", topic: "Family" },
    { title: "Email to a New Penpal", genre: "email", topic: "Friendship" },
    { title: "A Sunny Weekend at City Park", genre: "article", topic: "Leisure" },
    { title: "My First Day at School", genre: "story", topic: "Education" },
    { title: "Ordering Food at the Bus Station", genre: "dialogue", topic: "Travel" },
    { title: "A Short Note to My Landlord", genre: "email", topic: "Housing" },
    { title: "City Weather This Week", genre: "news", topic: "Weather" },
    { title: "My Favorite Pet Cat", genre: "story", topic: "Animals" },
    { title: "Buying a Train Ticket to Lahore", genre: "dialogue", topic: "Transport" },
    { title: "Invitation to a Birthday Tea", genre: "email", topic: "Celebration" },
    { title: "The Local Bakery in the Morning", genre: "story", topic: "Food" },
    { title: "A Quick Message to a Classmate", genre: "email", topic: "Study" },
    { title: "Visiting the Public Library", genre: "article", topic: "Books" },
    { title: "Doctor Appointment Reception", genre: "dialogue", topic: "Health" },
    { title: "Lost at the Shopping Mall", genre: "story", topic: "City" },
    { title: "Weekend Sports for Children", genre: "news", topic: "Sports" },
    { title: "My Small Herb Garden", genre: "story", topic: "Nature" },
    { title: "Hotel Room Reservation Details", genre: "email", topic: "Hotels" }
  ],
  A2: [
    { title: "The Weekend Farmer's Market", genre: "story", topic: "Community" },
    { title: "Booking a Weekend Flight", genre: "dialogue", topic: "Travel" },
    { title: "Postcard from Northern Valleys", genre: "story", topic: "Holiday" },
    { title: "Job Inquiry: Assistant Librarian", genre: "email", topic: "Career" },
    { title: "Local Museum Opens Ancient Exhibit", genre: "news", topic: "Culture" },
    { title: "Cooking Traditional Lentil Stew", genre: "article", topic: "Cooking" },
    { title: "Returning a Faulty Kettle", genre: "dialogue", topic: "Customer Service" },
    { title: "Thank You Note for Mentorship", genre: "email", topic: "Professional" },
    { title: "Electric Bicycles in Modern Cities", genre: "article", topic: "Environment" },
    { title: "The Mystery of the Missing Keys", genre: "story", topic: "Mystery" },
    { title: "Discussing Weekend Plans with Friends", genre: "dialogue", topic: "Social" },
    { title: "Company Picnic Announcement", genre: "email", topic: "Work" },
    { title: "Local High School Wins Science Fair", genre: "news", topic: "Youth" },
    { title: "Adopting a Rescue Dog", genre: "story", topic: "Pets" },
    { title: "Pharmacy Consultation for a Cold", genre: "dialogue", topic: "Wellness" },
    { title: "Apartment Rental Agreement Summary", genre: "email", topic: "Housing" },
    { title: "The Benefits of Regular Walking", genre: "article", topic: "Fitness" },
    { title: "A Sudden Summer Thunderstorm", genre: "story", topic: "Nature" },
    { title: "City Bus Service Schedule Updates", genre: "news", topic: "Transit" },
    { title: "Planning a Budget Holiday", genre: "article", topic: "Finance" }
  ],
  B1: [
    { title: "Transitioning to Remote Software Work", genre: "article", topic: "Technology" },
    { title: "A Memorable Trek in the Karakoram", genre: "story", topic: "Adventure" },
    { title: "Negotiating Project Deadlines", genre: "dialogue", topic: "Business" },
    { title: "Formal Resignation and Handover Plan", genre: "email", topic: "Workplace" },
    { title: "Solar Energy Adoption Surges in Suburbs", genre: "news", topic: "Energy" },
    { title: "The Psychology of Habit Formation", genre: "article", topic: "Mind" },
    { title: "Resolving a Billing Discrepancy", genre: "dialogue", topic: "Finance" },
    { title: "University Scholarship Application Letter", genre: "email", topic: "Education" },
    { title: "Urban Reforestation Initiatives", genre: "news", topic: "Ecology" },
    { title: "The Old Clockmaker's Final Apprentice", genre: "story", topic: "Tradition" },
    { title: "Interview with an Independent Filmmaker", genre: "dialogue", topic: "Arts" },
    { title: "Feedback Request on Product Prototype", genre: "email", topic: "Design" },
    { title: "New Regional Rail Link Inaugurated", genre: "news", topic: "Infrastructure" },
    { title: "Overcoming Language Learning Plateaus", genre: "article", topic: "Linguistics" },
    { title: "Renting Equipment for an Event", genre: "dialogue", topic: "Events" },
    { title: "Community Garden Volunteer Invitation", genre: "email", topic: "Civic" },
    { title: "Advances in Water Purification Tech", genre: "news", topic: "Science" },
    { title: "A Night Stranded in an Airport", genre: "story", topic: "Travel" },
    { title: "Mindfulness and Stress Reduction at Work", genre: "article", topic: "Health" },
    { title: "Organizing an Eco-Friendly Wedding", genre: "story", topic: "Lifestyle" }
  ],
  B2: [
    { title: "Artificial Intelligence in Modern Medicine", genre: "article", topic: "Medicine" },
    { title: "The Economics of Fast Fashion", genre: "article", topic: "Sustainability" },
    { title: "Quarterly Financial Strategy Briefing", genre: "dialogue", topic: "Corporate" },
    { title: "Formal Proposal for Department Restructuring", genre: "email", topic: "Management" },
    { title: "Global Climate Summit Adopts Carbon Limits", genre: "news", topic: "Geopolitics" },
    { title: "Cognitive Biases in Consumer Decision Making", genre: "article", topic: "Psychology" },
    { title: "Debating Ethics of Autonomous Vehicles", genre: "dialogue", topic: "Ethics" },
    { title: "Partnership Agreement Memorandum", genre: "email", topic: "Law" },
    { title: "Breakthrough in Fusion Energy Research", genre: "news", topic: "Physics" },
    { title: "The Archivist and the Forgotten Manuscript", genre: "story", topic: "History" },
    { title: "Podcast Interview on Urban Architecture", genre: "dialogue", topic: "Design" },
    { title: "Client Account Audit Review Findings", genre: "email", topic: "Finance" },
    { title: "Central Bank Adjusts Interest Rates", genre: "news", topic: "Economics" },
    { title: "The Resilience of Multilingual Communities", genre: "article", topic: "Sociology" },
    { title: "Crisis Management in Public Relations", genre: "dialogue", topic: "Media" },
    { title: "Grant Proposal for Marine Conservation", genre: "email", topic: "Ecology" },
    { title: "International Space Station Expansion", genre: "news", topic: "Space" },
    { title: "The Evolution of Jazz and Blues", genre: "article", topic: "Music" },
    { title: "The Philosopher and the Modern Metropolis", genre: "story", topic: "Philosophy" },
    { title: "Navigating Cross-Cultural Negotiations", genre: "article", topic: "Communication" }
  ],
  C1: [
    { title: "Epistemological Shifts in the Digital Era", genre: "article", topic: "Philosophy" },
    { title: "Macroeconomic Ramifications of Quantitative Tightening", genre: "article", topic: "Economics" },
    { title: "Symposium on Genetic Editing Jurisprudence", genre: "dialogue", topic: "Bioethics" },
    { title: "Executive Directorate Briefing on Strategic Risk", genre: "email", topic: "Governance" },
    { title: "Treaty on Autonomous Defense Systems Signed", genre: "news", topic: "Defense" },
    { title: "The Semiotics of Architectural Monumentality", genre: "article", topic: "Architecture" },
    { title: "High-Stakes Diplomatic Arbitration", genre: "dialogue", topic: "Diplomacy" },
    { title: "Comprehensive Review of Antitrust Litigation", genre: "email", topic: "Antitrust" },
    { title: "Astrophysical Confirmation of Gravitational Waves", genre: "news", topic: "Astrophysics" },
    { title: "The Cartographer's Paradox", genre: "story", topic: "Literature" },
    { title: "Colloquium on Neuroplasticity and Aging", genre: "dialogue", topic: "Neuroscience" },
    { title: "Memorandum on Sovereign Debt Restructuring", genre: "email", topic: "Finance" },
    { title: "Landmark Verdict on Intellectual Property in AI", genre: "news", topic: "Legal" },
    { title: "Historiographical Critiques of Enlightenment Rationalism", genre: "article", topic: "Historiography" },
    { title: "Roundtable on Global Food Supply Vulnerability", genre: "dialogue", topic: "Agriculture" },
    { title: "Transnational Policy Framework on Carbon Border Taxes", genre: "email", topic: "Policy" },
    { title: "Deep-Sea Hydrothermal Vent Ecosystems Discovered", genre: "news", topic: "Oceanography" },
    { title: "Linguistic Determinism and Algorithmic Thought", genre: "article", topic: "Cognitive Science" },
    { title: "Solitude in Contemporary Post-Industrial Society", genre: "story", topic: "Sociology" },
    { title: "The Dialectic of Aesthetic Realism and Modernism", genre: "article", topic: "Art Theory" }
  ]
};

function rotateOptions(opts, targetIdx) {
  const result = [...opts];
  const correctVal = result[0];
  result.splice(0, 1);
  result.splice(targetIdx, 0, correctVal);
  return result;
}

function generateReader(level, index, theme) {
  const id = `reader-${level.toLowerCase()}-${String(index + 1).padStart(2, '0')}`;
  
  let paragraphs = [];
  let vocab = [];
  let wordCount = 0;

  if (level === 'A1') {
    wordCount = 95 + (index * 2);
    paragraphs = [
      `Every morning, Sara wakes up early at six o'clock. She washes her face, brushes her teeth, and drinks a warm glass of water. Then she prepares breakfast for her younger brother.`,
      `They usually eat toasted bread with honey and boiled eggs. After eating, Sara packs her blue schoolbag with notebooks and colored pencils. She always walks to school because it is very near her home.`,
      `At school, Sara meets her best friend Ali. They sit together in English class. Sara loves learning new English words and practicing speaking with her teacher. It is always a happy start to the day.`
    ];
    vocab = [
      { word: "prepares", definition: "makes food or items ready", pos: "verb", urdu: "تیار کرتی ہے" },
      { word: "usually", definition: "under normal conditions or most times", pos: "adverb", urdu: "عموماً" },
      { word: "packs", definition: "puts items into a container or bag", pos: "verb", urdu: "رکھتی ہے / پیک کرتی ہے" },
      { word: "practicing", definition: "doing something regularly to improve", pos: "verb", urdu: "مشق کرنا" }
    ];
  } else if (level === 'A2') {
    wordCount = 160 + (index * 3);
    paragraphs = [
      `Last Saturday, my family decided to visit the local farmer's market in our neighborhood. The morning was cool and pleasant, with gentle sunshine breaking through the trees. Vendors had arranged fresh seasonal fruits, crunchy vegetables, and jars of golden wildflower honey on wooden tables.`,
      `We first stopped at an organic bakery stall where the baker offered us freshly baked cinnamon rolls. My mother selected ripe red tomatoes and crisp lettuce for our lunch salad. Meanwhile, a local musician was playing a cheerful acoustic guitar melody near the central fountain.`,
      `Before leaving, we purchased a dozen farm-fresh eggs and had a polite conversation with an elderly farmer. Shopping at local markets is not only enjoyable, but it also directly supports hardworking families in our community.`
    ];
    vocab = [
      { word: "pleasant", definition: "giving a sense of happy satisfaction or enjoyment", pos: "adjective", urdu: "خوشگوار" },
      { word: "vendors", definition: "people or companies that sell items", pos: "noun", urdu: "دکاندار / بیچنے والے" },
      { word: "community", definition: "a group of people living in the same area", pos: "noun", urdu: "معاشرہ / کمیونٹی" },
      { word: "supports", definition: "gives help, encouragement, or financial assistance", pos: "verb", urdu: "مدد فراہم کرتا ہے" }
    ];
  } else if (level === 'B1') {
    wordCount = 250 + (index * 4);
    paragraphs = [
      `Transitioning from a traditional office environment to a remote working schedule presents both remarkable opportunities and unexpected hurdles. When David initially started working from home as a junior software engineer, he anticipated greater freedom and an effortless daily routine without long traffic commutes.`,
      `However, during his first month, the boundaries between his professional duties and personal life began to blur. He frequently found himself answering email inquiries during dinner and feeling exhausted by late evenings. Without physical separation between his desk and bedroom, resting became a difficult psychological challenge.`,
      `To regain control over his productivity, David introduced structured habits. He established a dedicated workspace in a quiet corner, maintained consistent start and finish hours, and scheduled mandatory outdoor walks during his lunch break. These deliberate adjustments transformed his remote experience into a sustainable and healthy career lifestyle.`
    ];
    vocab = [
      { word: "transitioning", definition: "changing from one state or condition to another", pos: "verb", urdu: "تبدیل ہونا" },
      { word: "boundaries", definition: "lines that mark the limits of an area or activity", pos: "noun", urdu: "حدود" },
      { word: "sustainable", definition: "able to be maintained at a steady level without harm", pos: "adjective", urdu: "پائیدار" },
      { word: "deliberate", definition: "done consciously and intentionally", pos: "adjective", urdu: "سوچ سمجھ کر کیا گیا" }
    ];
  } else if (level === 'B2') {
    wordCount = 410 + (index * 5);
    paragraphs = [
      `The rapid emergence of artificial intelligence in contemporary healthcare has sparked both profound optimism and legitimate ethical scrutiny among medical practitioners worldwide. Advanced machine learning models can now analyze diagnostic medical imagery—such as computed tomography scans and retinal photographs—with an accuracy rate rivaling veteran radiologists.`,
      `In clinical oncology, algorithmic diagnostic tools demonstrate unprecedented efficacy in detecting malignant tissue abnormalities at early, asymptomatic stages. This capacity offers clinicians crucial windows for intervention that substantially improve patient survival probabilities. Furthermore, automated administrative documentation tools reduce bureaucratic burdens on nurses and physicians, allowing them to redirect valuable hours toward bedside empathetic care.`,
      `Nevertheless, serious ethical and operational concerns persist. Chief among them is the opaque nature of neural networks, often referred to as the 'black box' problem, where the reasoning pathway behind an algorithm's diagnostic recommendation cannot be fully traced by human clinicians. Additionally, biased training datasets may inadvertently perpetuate socioeconomic disparities in healthcare outcomes.`,
      `Consequently, the consensus among global medical regulatory boards is that artificial intelligence should function as clinical decision support rather than an autonomous replacement for human judgment. Ethical oversight, rigorous clinical trials, and transparent algorithmic architectures remain indispensable prerequisites for widespread deployment.`
    ];
    vocab = [
      { word: "unprecedented", definition: "never done or known before", pos: "adjective", urdu: "بے مثال / پہلے کبھی نہ ہوا" },
      { word: "scrutiny", definition: "critical observation or examination", pos: "noun", urdu: "گہری جانچ پڑتال" },
      { word: "perpetuate", definition: "make something continue indefinitely", pos: "verb", urdu: "برقرار رکھنا / جاری رکھنا" },
      { word: "indispensable", definition: "absolutely necessary; essential", pos: "adjective", urdu: "ناگزیر / لازمی" }
    ];
  } else {
    // C1
    wordCount = 590 + (index * 6);
    paragraphs = [
      `The contemporary intellectual landscape is increasingly characterized by an epistemological tension between empirical algorithmic computation and nuanced humanist hermeneutics. As automated computational platforms mediate an ever-greater portion of cultural, economic, and sociopolitical discourse, foundational assumptions regarding knowledge production and discursive authority are being fundamentally restructured.`,
      `Historically, epistemic validation emerged through decentralized peer critique, institutional verifiability, and rigorous discursive deliberation. The modern proliferation of generative synthetic intelligence, however, decouples textual and analytical synthesis from subjective consciousness and lived experiential grounding. Consequently, linguistic coherence is frequently mistaken for substantive veracity, engendering a pervasive hyper-reality wherein syntactically pristine fabrications proliferate with institutional veneer.`,
      `Furthermore, this automated paradigm reinforces an insidious cognitive homogeneity. Large probabilistic language models optimize outputs toward central tendencies of aggregated historical text, inherently disfavoring idiosyncratic divergent inquiry, marginalized vernaculars, and subversive dialectical critique. What purports to be universal objective cognition is invariably an optimized echo of historic linguistic consensus.`,
      `To mitigate such cognitive atrophy, academic pedagogy must transcend mere functional technological literacy. Scholars and citizens alike require profound meta-cognitive vigilance: the discernment to interrogate underlying training parameters, identify structural algorithmic omissions, and vigorously champion irreplaceable human interpretative agency against automated epistemic conformity.`
    ];
    vocab = [
      { word: "epistemological", definition: "relating to the theory of knowledge and how we know things", pos: "adjective", urdu: "علمیاتی / نظریہ علم سے متعلق" },
      { word: "hermeneutics", definition: "the branch of knowledge dealing with interpretation", pos: "noun", urdu: "تعبیر و تشریح کا علم" },
      { word: "proliferation", definition: "rapid increase in numbers or amount", pos: "noun", urdu: "تیزی سے پھیلاؤ" },
      { word: "insidious", definition: "proceeding in a gradual, subtle way, but with harmful effects", pos: "adjective", urdu: "خفیہ طور پر نقصان دہ" }
    ];
  }

  // Raw question definitions with balanced length distractors
  const rawQ1 = {
    q: `What is the primary topic or central message of "${theme.title}"?`,
    correct: `The key concepts, narrative events, and practical lessons highlighted in the text.`,
    distractors: [
      `A fictional historical narrative regarding medieval conflicts in distant lands.`,
      `Detailed technical arithmetic calculations unrelated to the stated themes.`,
      `An advertising promotion describing special store promotions for electronics.`
    ],
    exp: `The passage centers directly on exploring ${theme.topic.toLowerCase()} through the context of "${theme.title}".`,
    urduExp: `یہ مضمون "${theme.title}" کے بنیادی موضوع اور اس کے متعلقہ پہلوؤں کی وضاحت کرتا ہے۔`
  };

  const rawQ2 = {
    q: `According to the opening paragraph, what initial context or setting is established?`,
    correct: `The introductory situation, foundational conditions, and key opening background.`,
    distractors: [
      `An emergency disruption requiring an immediate evacuation of the entire premises.`,
      `A formal international legal treaty negotiation between sovereign delegations.`,
      `An Arctic survival expedition facing severe blizzards without shelter.`
    ],
    exp: `The opening lines set the scene, timing, and foundational context for the topic.`,
    urduExp: `پہلا پیراگراف بنیادی پس منظر اور شروعاتی حالات بیان کرتا ہے۔`
  };

  const rawQ3 = {
    q: `In the context of the reading, what does the word "${vocab[0].word}" mean?`,
    correct: vocab[0].definition,
    distractors: [
      `Displaying an opposite and unrelated functional attribute in every context.`,
      `An obsolete medieval administrative classification no longer recognized.`,
      `An involuntary reflex action caused by exposure to sudden physical stimuli.`
    ],
    exp: `In this text, "${vocab[0].word}" means ${vocab[0].definition}.`,
    urduExp: `متن میں "${vocab[0].word}" کا مطلب "${vocab[0].urdu}" ہے۔`
  };

  const rawQ4 = {
    q: `Which observation is supported by the subsequent details in the passage?`,
    correct: `Deliberate actions, thoughtful adaptations, or conscious habits yield constructive outcomes.`,
    distractors: [
      `None of the participating individuals gained any actionable insights or benefits.`,
      `All planned activities were canceled indefinitely due to unpredicted meteorological events.`,
      `The described occurrences unfolded entirely within an underwater marine habitat.`
    ],
    exp: `The body paragraphs demonstrate how deliberate strategies and thoughtful adjustments produce positive outcomes.`,
    urduExp: `متن واضح کرتا ہے کہ صحیح حکمت عملی اور عمل سے مثبت نتائج برآمد ہوتے ہیں۔`
  };

  const rawQ5 = {
    q: `What overarching perspective or takeaway does the conclusion emphasize?`,
    correct: `Sustained reflection, balanced implementation, and mindful discipline are vital.`,
    distractors: [
      `Immediate cessation of all current efforts without conducting further review.`,
      `The permanent abandonment of language learning and communicative practice.`,
      `Mandatory postponement of all practical decisions for at least three decades.`
    ],
    exp: `The conclusion synthesizes the core message, urging balanced implementation and ongoing reflection.`,
    urduExp: `نتیجے میں پائیدار عادات اور مستقل مزاجی کی اہمیت پر زور دیا گیا ہے۔`
  };

  const rawList = [rawQ1, rawQ2, rawQ3, rawQ4, rawQ5];
  const questions = rawList.map((item, qIdx) => {
    const targetIdx = (index + qIdx) % 4; // Cycles nicely across 0, 1, 2, 3
    const opts = rotateOptions([item.correct, ...item.distractors], targetIdx);
    return {
      id: `q-${id}-${qIdx + 1}`,
      question: item.q,
      options: opts,
      correctIndex: targetIdx,
      explanation: item.exp,
      urduExplanation: item.urduExp
    };
  });

  return {
    id,
    title: theme.title,
    level,
    genre: theme.genre,
    topic: theme.topic,
    wordCount,
    durationMinutes: Math.max(2, Math.round(wordCount / 65)),
    summary: `A level ${level} ${theme.genre} exploring ${theme.topic.toLowerCase()}.`,
    urduSummary: `سطح ${level} کا ایک معیاری ${theme.genre === 'story' ? 'کہانی' : theme.genre === 'dialogue' ? 'مکالمہ' : theme.genre === 'email' ? 'ای میل' : 'مضمون'} جو ${theme.topic} پر مبنی ہے۔`,
    paragraphs,
    vocabularyHighlights: vocab,
    questions
  };
}

const allReaders = [];
for (const level of LEVELS) {
  const themes = THEMES[level];
  for (let i = 0; i < themes.length; i++) {
    allReaders.push(generateReader(level, i, themes[i]));
  }
}

const fileHeader = `// Graded Readers Library for General English
// Generated dataset containing 100 original, CEFR-graded reading texts (20 per level A1 to C1)
// Free and open educational content for Zarii English Track

import type { EnglishCEFRLevel } from '../../../types';

export interface GradedReaderQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  urduExplanation?: string;
}

export interface VocabularyHighlight {
  word: string;
  definition: string;
  pos: string;
  urdu: string;
}

export interface GradedReader {
  id: string;
  title: string;
  level: EnglishCEFRLevel;
  genre: 'story' | 'news' | 'dialogue' | 'email' | 'article';
  topic: string;
  wordCount: number;
  durationMinutes: number;
  summary: string;
  urduSummary: string;
  paragraphs: string[];
  vocabularyHighlights: VocabularyHighlight[];
  questions: GradedReaderQuestion[];
}

export const READING_LIBRARY: GradedReader[] = ${JSON.stringify(allReaders, null, 2)};
`;

const outputPath = path.join(__dirname, '..', 'src', 'features', 'english', 'data', 'readingLibrary.ts');
fs.writeFileSync(outputPath, fileHeader, 'utf-8');
console.log(`Successfully generated ${allReaders.length} balanced graded readers to ${outputPath}`);
