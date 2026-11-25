// Listening Library for General English
// Dialogues and short talks across CEFR levels A1 to C1
// Generated with multi-speaker transcripts, comprehension questions, and dictation blanks

import type { EnglishCEFRLevel } from '../../../types';

export interface ListeningSpeaker {
  name: string;
  role: string;
  voiceGender: 'female' | 'male';
}

export interface ScriptLine {
  speaker: string;
  text: string;
}

export interface ListeningQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface DictationItem {
  id: string;
  prompt: string;
  targetText: string;
  audioClipText: string;
  hints: string[];
}

export interface ListeningTrackItem {
  id: string;
  title: string;
  level: EnglishCEFRLevel;
  type: 'Dialogue' | 'Short Talk';
  topic: string;
  durationMinutes: number;
  speakers: ListeningSpeaker[];
  script: ScriptLine[];
  audioUrl?: string; // Optional real royalty-free audio file
  comprehensionQuestions: ListeningQuestion[];
  dictationExercises: DictationItem[];
  urduSummary: string;
}

export const LISTENING_LIBRARY: ListeningTrackItem[] = [
  // --- LEVEL A1 ---
  {
    id: 'listen-a1-01',
    title: 'Ordering at a Cozy Coffee Shop',
    level: 'A1',
    type: 'Dialogue',
    topic: 'Food & Drink',
    durationMinutes: 2,
    speakers: [
      { name: 'Barista', role: 'Coffee shop staff', voiceGender: 'female' },
      { name: 'Customer', role: 'Visitor', voiceGender: 'male' }
    ],
    script: [
      { speaker: 'Barista', text: 'Good morning! Welcome to Central Brew. What can I get started for you?' },
      { speaker: 'Customer', text: 'Hello! I would like a warm cappuccino and a chocolate croissant, please.' },
      { speaker: 'Barista', text: 'Sure thing. Would you prefer regular milk, soy milk, or oat milk?' },
      { speaker: 'Customer', text: 'Oat milk, please. How much is that altogether?' },
      { speaker: 'Barista', text: 'That comes to five dollars and twenty cents. Cash or card?' },
      { speaker: 'Customer', text: 'Card, please. Here you go.' },
      { speaker: 'Barista', text: 'Thank you! Your order will be ready at the pick-up counter in two minutes.' }
    ],
    comprehensionQuestions: [
      {
        id: 'lq-a1-01-1',
        question: 'What beverage does the customer order?',
        options: ['An iced green tea', 'A warm cappuccino', 'A glass of fresh orange juice', 'A hot chocolate'],
        correctIndex: 1,
        explanation: 'The customer specifically requests "a warm cappuccino and a chocolate croissant".'
      },
      {
        id: 'lq-a1-01-2',
        question: 'Which kind of milk did the customer choose?',
        options: ['Oat milk', 'Soy milk', 'Regular dairy milk', 'Almond milk'],
        correctIndex: 0,
        explanation: 'When asked for their milk preference, the customer replied: "Oat milk, please."'
      },
      {
        id: 'lq-a1-01-3',
        question: 'How does the customer pay for the order?',
        options: ['With cash', 'With an online coupon', 'With a credit/debit card', 'With gift tokens'],
        correctIndex: 2,
        explanation: 'When asked "Cash or card?", the customer responds: "Card, please."'
      }
    ],
    dictationExercises: [
      {
        id: 'dict-a1-01-1',
        prompt: 'Type the missing word from the barista’s greeting: "Welcome to Central Brew. What can I ___ started for you?"',
        targetText: 'get',
        audioClipText: 'What can I get started for you?',
        hints: ['3 letters', 'starts with g']
      },
      {
        id: 'dict-a1-01-2',
        prompt: 'Type the total price mentioned: "That comes to five dollars and ___ cents."',
        targetText: 'twenty',
        audioClipText: 'That comes to five dollars and twenty cents.',
        hints: ['Number between 19 and 21']
      }
    ],
    urduSummary: 'یہ مکالمہ ایک کیفے میں کیپوچینو اور پیسٹری آرڈر کرنے اور کارڈ سے ادائیگی کرنے کے بارے میں ہے۔'
  },
  {
    id: 'listen-a1-02',
    title: 'Asking for Directions to the City Train Station',
    level: 'A1',
    type: 'Dialogue',
    topic: 'Travel & Navigation',
    durationMinutes: 2,
    speakers: [
      { name: 'Tourist', role: 'Lost traveler', voiceGender: 'female' },
      { name: 'Local Resident', role: 'Helpful passerby', voiceGender: 'male' }
    ],
    script: [
      { speaker: 'Tourist', text: 'Excuse me, could you please help me? I am looking for the main train station.' },
      { speaker: 'Local Resident', text: 'Of course! Walk straight down this street for two blocks.' },
      { speaker: 'Tourist', text: 'Okay, two blocks straight ahead.' },
      { speaker: 'Local Resident', text: 'Yes, then turn left at the supermarket. You will see a large clock tower. That is the station entrance.' },
      { speaker: 'Tourist', text: 'Is it far to walk, or should I take a taxi?' },
      { speaker: 'Local Resident', text: 'It is very close, only a five-minute walk from here.' },
      { speaker: 'Tourist', text: 'Thank you so much for your kindness!' },
      { speaker: 'Local Resident', text: 'You are welcome. Have a safe journey!' }
    ],
    comprehensionQuestions: [
      {
        id: 'lq-a1-02-1',
        question: 'Where is the tourist trying to go?',
        options: ['The city art museum', 'The public library', 'The main train station', 'The airport shuttle terminal'],
        correctIndex: 2,
        explanation: 'The tourist states: "I am looking for the main train station."'
      },
      {
        id: 'lq-a1-02-2',
        question: 'What landmark marks the station entrance?',
        options: ['A large clock tower', 'A red stone fountain', 'A tall pine tree', 'A pedestrian bridge'],
        correctIndex: 0,
        explanation: 'The resident notes: "You will see a large clock tower. That is the station entrance."'
      },
      {
        id: 'lq-a1-02-3',
        question: 'How long does the walk take?',
        options: ['Twenty minutes', 'About five minutes', 'More than an hour', 'Half an hour'],
        correctIndex: 1,
        explanation: 'The local resident explains: "It is very close, only a five-minute walk from here."'
      }
    ],
    dictationExercises: [
      {
        id: 'dict-a1-02-1',
        prompt: 'Type the direction word: "Walk ___ down this street for two blocks."',
        targetText: 'straight',
        audioClipText: 'Walk straight down this street for two blocks.',
        hints: ['opposite of crooked/curved', 'starts with s']
      }
    ],
    urduSummary: 'ایک مسافر مقامی شہری سے ریلوے اسٹیشن کا راستہ پوچھ رہا ہے جو کہ پانچ منٹ کی دوری پر ہے۔'
  },

  // --- LEVEL A2 ---
  {
    id: 'listen-a2-01',
    title: 'Checking into a Boutique Hotel',
    level: 'A2',
    type: 'Dialogue',
    topic: 'Hospitality',
    durationMinutes: 3,
    speakers: [
      { name: 'Receptionist', role: 'Front desk clerk', voiceGender: 'female' },
      { name: 'Guest', role: 'Business traveler', voiceGender: 'male' }
    ],
    script: [
      { speaker: 'Receptionist', text: 'Good afternoon, sir. Welcome to the Rosewood Inn. Are you checking in today?' },
      { speaker: 'Guest', text: 'Yes, I have a reservation under the name Tariq Mansoor for three nights.' },
      { speaker: 'Receptionist', text: 'Let me look that up on our system... Yes, here it is: a deluxe room with a king-sized bed and city view.' },
      { speaker: 'Guest', text: 'That sounds perfect. Does the reservation include complimentary breakfast?' },
      { speaker: 'Receptionist', text: 'Yes, breakfast is served daily in the terrace dining hall from seven to ten in the morning.' },
      { speaker: 'Guest', text: 'Wonderful. What is the wireless internet password?' },
      { speaker: 'Receptionist', text: 'The network is RosewoodGuest and the password is printed on your room key card wallet.' },
      { speaker: 'Guest', text: 'Excellent, thank you for the information.' },
      { speaker: 'Receptionist', text: 'Here are your room keys for room 408 on the fourth floor. Enjoy your stay!' }
    ],
    comprehensionQuestions: [
      {
        id: 'lq-a2-01-1',
        question: 'How long will the guest be staying at the inn?',
        options: ['One night only', 'Three nights', 'An entire fortnight', 'Five nights'],
        correctIndex: 1,
        explanation: 'The guest mentions: "I have a reservation under the name Tariq Mansoor for three nights."'
      },
      {
        id: 'lq-a2-01-2',
        question: 'Where is breakfast served each morning?',
        options: ['In room 408', 'In the terrace dining hall', 'At the lobby coffee counter', 'At a partner restaurant nearby'],
        correctIndex: 1,
        explanation: 'The receptionist says breakfast is served "in the terrace dining hall from seven to ten in the morning."'
      },
      {
        id: 'lq-a2-01-3',
        question: 'Where can the guest find the Wi-Fi password?',
        options: ['Printed on the room key card wallet', 'Sent by email confirmation', 'On a notice board in the elevator', 'Under the television screen'],
        correctIndex: 0,
        explanation: 'The receptionist clarifies: "the password is printed on your room key card wallet."'
      }
    ],
    dictationExercises: [
      {
        id: 'dict-a2-01-1',
        prompt: 'Type the missing adjective: "Yes, I have a ___ under the name Tariq Mansoor."',
        targetText: 'reservation',
        audioClipText: 'Yes, I have a reservation under the name Tariq Mansoor.',
        hints: ['Booking synonym', '11 letters']
      }
    ],
    urduSummary: 'ہوٹل میں کمرہ حاصل کرنے کا مکالمہ، جس میں ناشتے کے اوقات اور وائی فائی پاس ورڈ کی معلومات شامل ہیں۔'
  },

  // --- LEVEL B1 ---
  {
    id: 'listen-b1-01',
    title: 'Resolving a Workplace Project Scheduling Conflict',
    level: 'B1',
    type: 'Dialogue',
    topic: 'Business Collaboration',
    durationMinutes: 4,
    speakers: [
      { name: 'Sarah', role: 'Project Coordinator', voiceGender: 'female' },
      { name: 'Marcus', role: 'Lead Graphic Designer', voiceGender: 'male' }
    ],
    script: [
      { speaker: 'Sarah', text: 'Marcus, thanks for meeting with me on short notice. I reviewed the revised marketing timeline, and I noticed the landing page visual assets are scheduled for Friday.' },
      { speaker: 'Marcus', text: 'Hi Sarah. Yes, our team is currently finalizing the illustration library. Given the scope change approved yesterday, Friday was the earliest realistic completion date.' },
      { speaker: 'Sarah', text: 'I understand the design demands, but the engineering team needs at least two working days to integrate those assets before our Monday client demonstration.' },
      { speaker: 'Marcus', text: 'If that is a strict dependency, we could prioritize the desktop wireframes and deliver them by Wednesday afternoon, leaving mobile responsive variations for Thursday.' },
      { speaker: 'Sarah', text: 'That compromise would work tremendously well. The front-end developers can start building the desktop structure immediately.' },
      { speaker: 'Marcus', text: 'Great. I will reassign the task priorities in our project tracking board this morning and send you an updated milestone summary.' },
      { speaker: 'Sarah', text: 'Appreciate your flexibility, Marcus. Let us touch base again tomorrow morning.' }
    ],
    comprehensionQuestions: [
      {
        id: 'lq-b1-01-1',
        question: 'Why was the design delivery date pushed back initially?',
        options: ['Hardware failures in the studio', 'The scope change approved the previous day', 'Staff absences due to sickness', 'Delays from an external contractor'],
        correctIndex: 1,
        explanation: 'Marcus notes: "Given the scope change approved yesterday, Friday was the earliest realistic completion date."'
      },
      {
        id: 'lq-b1-01-2',
        question: 'What compromise did Marcus propose to keep the project on track?',
        options: ['Canceling the client demonstration', 'Hiring freelance animators immediately', 'Delivering desktop assets by Wednesday afternoon and mobile on Thursday', 'Working all weekend without overtime pay'],
        correctIndex: 2,
        explanation: 'Marcus suggests: "we could prioritize the desktop wireframes and deliver them by Wednesday afternoon, leaving mobile responsive variations for Thursday."'
      },
      {
        id: 'lq-b1-01-3',
        question: 'When will Sarah and Marcus check in again?',
        options: ['Tomorrow morning', 'Next Monday after the demo', 'Late Friday afternoon', 'In two weeks'],
        correctIndex: 0,
        explanation: 'Sarah states: "Let us touch base again tomorrow morning."'
      }
    ],
    dictationExercises: [
      {
        id: 'dict-b1-01-1',
        prompt: 'Type the missing noun: "That ___ would work tremendously well."',
        targetText: 'compromise',
        audioClipText: 'That compromise would work tremendously well.',
        hints: ['An agreement where both sides give up something', 'starts with c']
      }
    ],
    urduSummary: 'دفتر میں پروجیکٹ کے شیڈول پر بات چیت اور ڈیڈلائن کے حل کے لیے ایک باہمی مفاہمت کا معاہدہ۔'
  },

  // --- LEVEL B2 ---
  {
    id: 'listen-b2-01',
    title: 'Short Talk: The Transition Toward Circular Economic Models',
    level: 'B2',
    type: 'Short Talk',
    topic: 'Sustainability & Economics',
    durationMinutes: 4,
    speakers: [
      { name: 'Dr. Evelyn Reed', role: 'Environmental Economist', voiceGender: 'female' }
    ],
    script: [
      { speaker: 'Dr. Evelyn Reed', text: 'Good evening, colleagues. For over a century, global industrial development has operated predominantly within a linear economic framework—what analysts succinctly describe as the "take-make-waste" paradigm.' },
      { speaker: 'Dr. Evelyn Reed', text: 'In this traditional model, finite natural raw materials are extracted, processed into consumer commodities, and discarded into landfills when their operational lifespan expires. While this system drove unprecedented post-war economic expansion, its ecological externalities are no longer sustainable.' },
      { speaker: 'Dr. Evelyn Reed', text: 'In response, contemporary policy makers and forward-thinking corporate enterprises are championing the transition toward circular economics. Unlike linear throughput, a circular system is intentionally regenerative by design.' },
      { speaker: 'Dr. Evelyn Reed', text: 'It emphasizes modular product engineering, durable material recycling, and restorative supply chains that retain material value indefinitely. By decoupling economic prosperity from finite resource consumption, circular strategies promise not only substantial carbon reductions, but also robust new manufacturing sectors.' }
    ],
    comprehensionQuestions: [
      {
        id: 'lq-b2-01-1',
        question: 'How does the speaker characterize the traditional linear economy?',
        options: ['As an infinitely renewable ecological ecosystem', 'As a "take-make-waste" paradigm relying on finite resource extraction', 'As a decentralized digital barter market', 'As an automated peer-to-peer sharing economy'],
        correctIndex: 1,
        explanation: 'The speaker explicitly describes the linear economy as the "take-make-waste" paradigm.'
      },
      {
        id: 'lq-b2-01-2',
        question: 'What is a defining attribute of the circular economy according to Dr. Reed?',
        options: ['It is intentionally regenerative and retains material value indefinitely', 'It completely bans all international shipping routes', 'It eliminates all forms of industrial engineering', 'It relies solely on government subsidies'],
        correctIndex: 0,
        explanation: 'Dr. Reed notes that "a circular system is intentionally regenerative by design" and retains material value indefinitely.'
      },
      {
        id: 'lq-b2-01-3',
        question: 'What dual benefit does decoupling growth from resource consumption offer?',
        options: ['Higher consumer taxes and slower transport', 'Substantial carbon reductions along with robust new manufacturing sectors', 'The immediate closure of regional factories', 'A shift back to agrarian lifestyles'],
        correctIndex: 1,
        explanation: 'The conclusion states that decoupling promises "not only substantial carbon reductions, but also robust new manufacturing sectors."'
      }
    ],
    dictationExercises: [
      {
        id: 'dict-b2-01-1',
        prompt: 'Type the missing academic adjective: "a circular system is intentionally ___ by design."',
        targetText: 'regenerative',
        audioClipText: 'a circular system is intentionally regenerative by design.',
        hints: ['Renewal adjective', 'starts with r']
      }
    ],
    urduSummary: 'ماحولیاتی معیشت پر مختصر لیکچر جس میں لکیری نظام کے مقابلے میں سرکلر اکانومی کے فوائد بیان کیے گئے ہیں۔'
  },

  // --- LEVEL C1 ---
  {
    id: 'listen-c1-01',
    title: 'Academic Discussion: Neuroplasticity and Cognitive Reserve in Aging',
    level: 'C1',
    type: 'Dialogue',
    topic: 'Neuroscience & Longevity',
    durationMinutes: 5,
    speakers: [
      { name: 'Prof. Julian Vance', role: 'Cognitive Neuroscientist', voiceGender: 'male' },
      { name: 'Dr. Clara Morales', role: 'Geriatric Specialist', voiceGender: 'female' }
    ],
    script: [
      { speaker: 'Prof. Julian Vance', text: 'Clara, historical dogmas in neurology long held that the adult cerebral cortex was fundamentally immutable following early developmental maturation. Yet neuroimaging over the past two decades has thoroughly dismantled that rigid presumption.' },
      { speaker: 'Dr. Clara Morales', text: 'Precisely, Julian. What we now observe clinically is that synaptic arborization and functional reorganizations persist well into senescence. The concept of cognitive reserve demonstrates that individuals who continually engage in complex bilingualism or demanding intellectual endeavors display remarkable resilience against neuropathological degradation.' },
      { speaker: 'Prof. Julian Vance', text: 'Indeed. Longitudinal cohort studies demonstrate that even in the presence of marked amyloid pathology, individuals possessing high cognitive reserve can maintain intact executive functioning through compensatory recruitment of contralateral prefrontal networks.' },
      { speaker: 'Dr. Clara Morales', text: 'This underscores a pivotal therapeutic implication: cognitive decline is not an invariable deterministic trajectory of biological senescence. Active cognitive enrichment serves as a physiological buffer that recalibrates neural efficiency.' }
    ],
    comprehensionQuestions: [
      {
        id: 'lq-c1-01-1',
        question: 'What historical neurological doctrine has been refuted by modern neuroimaging?',
        options: ['The belief that the brain was composed of interconnected neurons', 'The dogma that the adult cerebral cortex is static and incapable of structural reorganization', 'The idea that sleep is necessary for memory consolidation', 'The premise that language is localized within specific hemispheres'],
        correctIndex: 1,
        explanation: 'Prof. Vance remarks that long-held dogmas believed the adult cortex was immutable, a presumption now thoroughly dismantled.'
      },
      {
        id: 'lq-c1-01-2',
        question: 'How do individuals with high cognitive reserve sustain executive functioning despite neuropathology?',
        options: ['Through compensatory recruitment of contralateral prefrontal networks', 'By taking high dosages of synthetic stimulants daily', 'By avoiding all physical exertion and social interaction', 'By undergoing frequent invasive surgical interventions'],
        correctIndex: 0,
        explanation: 'Prof. Vance points out that they maintain functioning "through compensatory recruitment of contralateral prefrontal networks."'
      },
      {
        id: 'lq-c1-01-3',
        question: 'What pivotal conclusion does Dr. Morales articulate regarding cognitive decline?',
        options: ['It is an unavoidable biological fate for all human beings', 'It can be reversed solely through genetic therapy', 'It is not an invariable deterministic trajectory, as enrichment acts as a physiological buffer', 'It occurs regardless of educational background or lifelong habits'],
        correctIndex: 2,
        explanation: 'Dr. Morales emphasizes: "cognitive decline is not an invariable deterministic trajectory of biological senescence. Active cognitive enrichment serves as a physiological buffer."'
      }
    ],
    dictationExercises: [
      {
        id: 'dict-c1-01-1',
        prompt: 'Type the missing noun phrase: "adult cerebral cortex was fundamentally ___ following early maturation."',
        targetText: 'immutable',
        audioClipText: 'adult cerebral cortex was fundamentally immutable following early developmental maturation.',
        hints: ['Unchanging / unalterable', 'starts with i']
      }
    ],
    urduSummary: 'نیوروپلاسٹی اور دماغی صلاحیت کے تحفظ پر ایک اعلیٰ درجے کا علمی مکالمہ جو دماغ کی لچکداری کو واضح کرتا ہے۔'
  }
];
