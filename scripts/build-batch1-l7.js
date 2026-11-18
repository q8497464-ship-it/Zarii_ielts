import fs from 'fs';
import path from 'path';

const listeningTest07 = {
  id: "list-test-07",
  title: "Listening Practice Test 7",
  difficulty: "medium",
  timeLimitMinutes: 40,
  sections: [
    {
      sectionNumber: 1,
      title: "Heritage Railway Weekend Volunteering Enquiry",
      contextDescription: "Maya Patel (Indian English) speaking with Volunteer Coordinator George (British English) about joining the Severn Valley Steam Railway restoration project.",
      audioScript: [
        { "speaker": "George (British)", "text": "Good morning! Severn Valley Heritage Railway volunteer office. George speaking." },
        { "speaker": "Maya (Indian English)", "text": "Good morning, George! My name is Maya Patel. I saw your advertisement looking for weekend volunteers to assist with locomotive maintenance and passenger services." },
        { "speaker": "George (British)", "text": "Wonderful, Maya! We are always delighted to welcome new volunteers. Let me capture some preliminary details to register you for our upcoming induction day." },
        { "speaker": "Maya (Indian English)", "text": "Certainly. My first name is Maya, M-A-Y-A, and surname Patel, P-A-T-E-L." },
        { "speaker": "George (British)", "text": "Thank you, Maya. And what is your current address?" },
        { "speaker": "Maya (Indian English)", "text": "I live at seventy-four Victoria Crescent, Bridgnorth, postcode W-V-sixteen, four-B-T." },
        { "speaker": "George (British)", "text": "W-V-sixteen, four-B-T. And an emergency contact telephone number?" },
        { "speaker": "Maya (Indian English)", "text": "Yes, my mobile number is zero seven eight nine zero, six five four three two one." },
        { "speaker": "George (British)", "text": "Excellent. Now, which volunteer role interests you most? We have openings in the station ticket booking office, locomotive engineering workshops, or onboard catering." },
        { "speaker": "Maya (Indian English)", "text": "I have an undergraduate background in mechanical engineering, so I would love to work in the locomotive engineering workshops." },
        { "speaker": "George (British)", "text": "Brilliant! We definitely need help restoring our 1934 LMS Stanier engine. Because the workshops involve active industrial machinery, you will need personal protective equipment. We supply high-visibility vests and safety goggles, but volunteers must provide their own steel-capped safety boots." },
        { "speaker": "Maya (Indian English)", "text": "I already own safety boots from university workshops. What day is the mandatory safety induction held?" },
        { "speaker": "George (British)", "text": "Our next comprehensive safety induction takes place on Saturday, October the twelfth. It starts at nine thirty in the morning and finishes at one in the afternoon." },
        { "speaker": "Maya (Indian English)", "text": "October the twelfth. And where is the induction held?" },
        { "speaker": "George (British)", "text": "In the Carriage Works Training Room, adjacent to Platform Three. If you arrive by car, you can park in the East Yard gravel car park. We will give you a temporary parking permit so you do not have to pay." },
        { "speaker": "Maya (Indian English)", "text": "That is so kind. Thank you George, I look forward to Saturday the twelfth!" }
      ],
      questionGroups: [
        {
          groupInstruction: "Complete the form below. Write NO MORE THAN TWO WORDS AND/OR A NUMBER for each answer. Write your answers in boxes 1–10.",
          questionType: "sentence_completion",
          questions: [
            {
              id: "l7-q1",
              questionNumber: 1,
              type: "sentence_completion",
              topic: "volunteering",
              estimatedBand: 5.5,
              prompt: "Applicant full name: Maya ____",
              correctAnswer: "Patel",
              explanation: "Maya spells her surname: P-A-T-E-L.",
              evidence: "surname Patel, P-A-T-E-L."
            },
            {
              id: "l7-q2",
              questionNumber: 2,
              type: "sentence_completion",
              topic: "volunteering",
              estimatedBand: 5.5,
              prompt: "Address: 74 Victoria ____, Bridgnorth.",
              correctAnswer: "Crescent",
              explanation: "Maya states: seventy-four Victoria Crescent.",
              evidence: "seventy-four Victoria Crescent, Bridgnorth"
            },
            {
              id: "l7-q3",
              questionNumber: 3,
              type: "sentence_completion",
              topic: "volunteering",
              estimatedBand: 6.0,
              prompt: "Postcode: ____",
              correctAnswer: ["WV16 4BT", "WV164BT"],
              explanation: "Maya gives postcode: W-V-sixteen, four-B-T.",
              evidence: "postcode W-V-sixteen, four-B-T."
            },
            {
              id: "l7-q4",
              questionNumber: 4,
              type: "sentence_completion",
              topic: "volunteering",
              estimatedBand: 5.5,
              prompt: "Mobile telephone: 07890 ____",
              correctAnswer: "654321",
              explanation: "Maya gives number: zero seven eight nine zero, six five four three two one.",
              evidence: "zero seven eight nine zero, six five four three two one."
            },
            {
              id: "l7-q5",
              questionNumber: 5,
              type: "sentence_completion",
              topic: "volunteering",
              estimatedBand: 6.5,
              prompt: "Desired volunteer section: locomotive ____ workshops.",
              correctAnswer: "engineering",
              explanation: "Maya chooses the locomotive engineering workshops.",
              evidence: "locomotive engineering workshops."
            },
            {
              id: "l7-q6",
              questionNumber: 6,
              type: "sentence_completion",
              topic: "safety",
              estimatedBand: 6.5,
              prompt: "Volunteers must bring their own steel-capped safety ____.",
              correctAnswer: "boots",
              explanation: "George states volunteers must provide their own steel-capped safety boots.",
              evidence: "volunteers must provide their own steel-capped safety boots."
            },
            {
              id: "l7-q7",
              questionNumber: 7,
              type: "sentence_completion",
              topic: "dates",
              estimatedBand: 6.0,
              prompt: "Induction date: Saturday, October ____",
              correctAnswer: ["12th", "12", "twelfth"],
              explanation: "George states: Saturday, October the twelfth.",
              evidence: "Saturday, October the twelfth."
            },
            {
              id: "l7-q8",
              questionNumber: 8,
              type: "sentence_completion",
              topic: "time",
              estimatedBand: 6.0,
              prompt: "Induction starting time: ____ AM.",
              correctAnswer: ["9:30", "9.30", "nine thirty"],
              explanation: "George states it starts at nine thirty in the morning.",
              evidence: "starts at nine thirty in the morning"
            },
            {
              id: "l7-q9",
              questionNumber: 9,
              type: "sentence_completion",
              topic: "location",
              estimatedBand: 6.5,
              prompt: "Meeting venue: Carriage Works Training Room, next to Platform ____.",
              correctAnswer: ["Three", "3"],
              explanation: "George specifies: adjacent to Platform Three.",
              evidence: "Carriage Works Training Room, adjacent to Platform Three."
            },
            {
              id: "l7-q10",
              questionNumber: 10,
              type: "sentence_completion",
              topic: "parking",
              estimatedBand: 6.5,
              prompt: "Free volunteer parking located in the ____ Yard.",
              correctAnswer: "East",
              explanation: "George indicates: park in the East Yard gravel car park.",
              evidence: "park in the East Yard gravel car park."
            }
          ]
        }
      ]
    },
    {
      sectionNumber: 2,
      title: "Orientation for New Residents at Mountain View Eco-Village",
      contextDescription: "Dan (Australian English speaker), the residential manager, orienting newly arrived residents to the community facilities and sustainability protocols.",
      audioScript: [
        { "speaker": "Dan (Australian)", "text": "Welcome to Mountain View Eco-Village, everyone! My name is Dan, and as the village operations coordinator, I am thrilled to welcome our twelve newest household families. Our community was designed from the ground up to achieve net-zero carbon emissions and foster collaborative neighborliness." },
        { "speaker": "Dan (Australian)", "text": "First, let's talk about water management. Every home here is equipped with an independent five-thousand-liter underground rainwater cistern. This water is filtered and pressurized for laundry appliances and toilet flushing. For garden irrigation, please use the greywater tap marked with purple handles on your exterior wall. Never connect garden hoses to the green drinking water taps during the summer months from December to February." },
        { "speaker": "Dan (Australian)", "text": "Regarding household waste, we operate a five-stream recycling hub located behind the Village Hall. Organic food scraps must be placed inside the aerated worm compost bins. Cardboard and paper go in the blue bins, while glass containers go in the yellow bins. Please note that soft plastic wrappers are not processed in municipal bins; you should deposit them in the designated red collection bin inside the pantry room." },
        { "speaker": "Dan (Australian)", "text": "Our community transport system is another major feature. We have six shared electric cars available for all residents to book via our village mobile app. The fast charging bays are located in Car Park North. The rental rate is just four dollars per hour, which includes full insurance and recharge electricity. Private vehicles must be parked in perimeter car parks, as all internal village pathways are strictly pedestrian and bicycle only." },
        { "speaker": "Dan (Australian)", "text": "Finally, our shared communal dinner takes place every Wednesday evening at six thirty in the Community Kitchen. It is a fantastic tradition where different households take turns cooking using vegetables harvested fresh from our communal organic garden. We hope to see you all this Wednesday!" }
      ],
      questionGroups: [
        {
          groupInstruction: "Choose the correct letter, A, B, or C. Write your answers in boxes 11–15.",
          questionType: "multiple_choice_single",
          questions: [
            {
              id: "l7-q11",
              questionNumber: 11,
              type: "multiple_choice_single",
              topic: "sustainability",
              estimatedBand: 6.0,
              prompt: "Underground rainwater tanks in each home supply water for",
              options: [
                "A) cooking and drinking.",
                "B) laundry appliances and toilets.",
                "C) swimming pools and fountains."
              ],
              correctAnswer: "B",
              explanation: "Dan states cistern water is pressurized for laundry appliances and toilet flushing.",
              evidence: "pressurized for laundry appliances and toilet flushing."
            },
            {
              id: "l7-q12",
              questionNumber: 12,
              type: "multiple_choice_single",
              topic: "regulations",
              estimatedBand: 6.5,
              prompt: "Connecting garden hoses to drinking water taps is prohibited between",
              options: [
                "A) March and May.",
                "B) June and August.",
                "C) December and February."
              ],
              correctAnswer: "C",
              explanation: "Dan specifies during summer months from December to February.",
              evidence: "during the summer months from December to February."
            },
            {
              id: "l7-q13",
              questionNumber: 13,
              type: "multiple_choice_single",
              topic: "waste",
              estimatedBand: 6.5,
              prompt: "Where should residents take soft plastic wrappers?",
              options: [
                "A) Yellow recycling bins behind the hall.",
                "B) The blue paper bins.",
                "C) The red bin inside the pantry room."
              ],
              correctAnswer: "C",
              explanation: "Dan notes soft plastics go in the designated red collection bin inside the pantry room.",
              evidence: "deposit them in the designated red collection bin inside the pantry room."
            },
            {
              id: "l7-q14",
              questionNumber: 14,
              type: "multiple_choice_single",
              topic: "transport",
              estimatedBand: 6.0,
              prompt: "The hourly rental rate for shared electric cars is",
              options: [
                "A) $4.",
                "B) $8.",
                "C) $12."
              ],
              correctAnswer: "A",
              explanation: "Dan states the rental rate is just four dollars per hour.",
              evidence: "rental rate is just four dollars per hour, which includes full insurance and recharge electricity."
            },
            {
              id: "l7-q15",
              questionNumber: 15,
              type: "multiple_choice_single",
              topic: "community",
              estimatedBand: 5.5,
              prompt: "The weekly communal dinner is held every",
              options: [
                "A) Monday evening.",
                "B) Wednesday evening.",
                "C) Friday evening."
              ],
              correctAnswer: "B",
              explanation: "Dan says communal dinner takes place every Wednesday evening.",
              evidence: "communal dinner takes place every Wednesday evening at six thirty"
            }
          ]
        },
        {
          groupInstruction: "Complete the sentences below. Write NO MORE THAN TWO WORDS for each answer. Write your answers in boxes 16–20.",
          questionType: "sentence_completion",
          questions: [
            {
              id: "l7-q16",
              questionNumber: 16,
              type: "sentence_completion",
              topic: "water",
              estimatedBand: 6.5,
              prompt: "Garden irrigation taps on exterior walls feature ____ handles.",
              correctAnswer: "purple",
              explanation: "Dan states: 'marked with purple handles on your exterior wall.'",
              evidence: "marked with purple handles on your exterior wall."
            },
            {
              id: "l7-q17",
              questionNumber: 17,
              type: "sentence_completion",
              topic: "recycling",
              estimatedBand: 6.0,
              prompt: "Food scraps must be deposited into aerated ____ compost bins.",
              correctAnswer: "worm",
              explanation: "Dan mentions aerated worm compost bins.",
              evidence: "aerated worm compost bins."
            },
            {
              id: "l7-q18",
              questionNumber: 18,
              type: "sentence_completion",
              topic: "recycling",
              estimatedBand: 6.0,
              prompt: "Glass bottles and containers are sorted into ____ bins.",
              correctAnswer: "yellow",
              explanation: "Dan explains glass containers go in the yellow bins.",
              evidence: "glass containers go in the yellow bins."
            },
            {
              id: "l7-q19",
              questionNumber: 19,
              type: "sentence_completion",
              topic: "transport",
              estimatedBand: 6.5,
              prompt: "Internal eco-village lanes are restricted strictly to pedestrians and ____.",
              correctAnswer: "bicycle",
              explanation: "Dan indicates internal pathways are strictly pedestrian and bicycle only.",
              evidence: "internal village pathways are strictly pedestrian and bicycle only."
            },
            {
              id: "l7-q20",
              questionNumber: 20,
              type: "sentence_completion",
              topic: "community",
              estimatedBand: 6.0,
              prompt: "Dinner ingredients are gathered fresh from the village ____ garden.",
              correctAnswer: "organic",
              explanation: "Dan notes ingredients come from the communal organic garden.",
              evidence: "harvested fresh from our communal organic garden."
            }
          ]
        }
      ]
    },
    {
      sectionNumber: 3,
      title: "Research Proposal Review: Microplastics in Freshwater Estuaries",
      contextDescription: "Academic supervisor Dr. Karen Vance (North American English) reviewing a postgraduate dissertation methodology with students Oliver (British English) and Meera (Indian English).",
      audioScript: [
        { "speaker": "Dr. Vance (North American)", "text": "Come in, Oliver, Meera. Let's examine your research proposal investigating microplastic pollution across the Mersey Estuary. Your literature review is quite thorough, but I want to scrutinize your sampling methodology and contamination controls." },
        { "speaker": "Oliver (British)", "text": "Thanks, Dr. Vance. We have designed a stratified sampling protocol across five distinct geographic zones: upstream freshwater, industrial shipping docks, urban stormwater discharge points, agricultural runoff zones, and the outer marine estuary mouth." },
        { "speaker": "Meera (Indian English)", "text": "At each sampling station, we plan to collect twenty-liter surface water samples using a custom stainless steel bucket. We will immediately filter the water through three successive stainless steel mesh sieves: five millimeters, one millimeter, and sixty-three micrometers." },
        { "speaker": "Dr. Vance (North American)", "text": "Using stainless steel is crucial to avoid airborne plastic contamination. But what about procedural blanks? If your field researchers wear synthetic fleece jackets, polyester fibers will contaminate your samples and invalidate your data." },
        { "speaker": "Oliver (British)", "text": "Yes, we took that into consideration! All team members in the field will wear one hundred percent cotton laboratory coats and natural nitrile gloves. Furthermore, we will place open control petri dishes containing damp cellulose filter paper beside the sampling apparatus to quantify background atmospheric fallout." },
        { "speaker": "Dr. Vance (North American)", "text": "Excellent. And how will you identify polymer types once the particles are isolated?" },
        { "speaker": "Meera (Indian English)", "text": "We will utilize micro-FTIR spectroscopy—Fourier-transform infrared spectroscopy. That will allow us to accurately distinguish polyethylene and polypropylene fragments from natural organic cellulose or chitin fibers." },
        { "speaker": "Dr. Vance (North American)", "text": "Very good. Now regarding your budget, have you requested the instrument time on the spectroscopy unit?" },
        { "speaker": "Oliver (British)", "text": "We have booked thirty hours of instrument beam time through the department technician, which will cost approximately six hundred pounds from our research grant." }
      ],
      questionGroups: [
        {
          groupInstruction: "Choose the correct letter, A, B, or C. Write your answers in boxes 21–26.",
          questionType: "multiple_choice_single",
          questions: [
            {
              id: "l7-q21",
              questionNumber: 21,
              type: "multiple_choice_single",
              topic: "methodology",
              estimatedBand: 7.0,
              prompt: "The students' research protocol covers how many distinct sampling zones?",
              options: [
                "A) Three zones.",
                "B) Five zones.",
                "C) Seven zones."
              ],
              correctAnswer: "B",
              explanation: "Oliver states they have designed a protocol across five distinct geographic zones.",
              evidence: "stratified sampling protocol across five distinct geographic zones"
            },
            {
              id: "l7-q22",
              questionNumber: 22,
              type: "multiple_choice_single",
              topic: "sampling",
              estimatedBand: 6.5,
              prompt: "What volume of surface water will be collected at each station?",
              options: [
                "A) 5 liters.",
                "B) 10 liters.",
                "C) 20 liters."
              ],
              correctAnswer: "C",
              explanation: "Meera states: 'collect twenty-liter surface water samples'.",
              evidence: "collect twenty-liter surface water samples using a custom stainless steel bucket."
            },
            {
              id: "l7-q23",
              questionNumber: 23,
              type: "multiple_choice_single",
              topic: "laboratory",
              estimatedBand: 7.0,
              prompt: "The finest mesh sieve size used in their filtration is",
              options: [
                "A) 63 micrometers.",
                "B) 1 millimeter.",
                "C) 5 millimeters."
              ],
              correctAnswer: "A",
              explanation: "Meera lists: five millimeters, one millimeter, and sixty-three micrometers.",
              evidence: "five millimeters, one millimeter, and sixty-three micrometers."
            },
            {
              id: "l7-q24",
              questionNumber: 24,
              type: "multiple_choice_single",
              topic: "contamination",
              estimatedBand: 7.0,
              prompt: "Field researchers will prevent synthetic fiber contamination by wearing",
              options: [
                "A) polyester raincoats.",
                "B) 100% cotton lab coats.",
                "C) disposable nylon jumpsuits."
              ],
              correctAnswer: "B",
              explanation: "Oliver explains all team members will wear one hundred percent cotton laboratory coats.",
              evidence: "All team members in the field will wear one hundred percent cotton laboratory coats"
            },
            {
              id: "l7-q25",
              questionNumber: 25,
              type: "multiple_choice_single",
              topic: "analysis",
              estimatedBand: 7.5,
              prompt: "The primary analytical technique used to verify polymer types will be",
              options: [
                "A) gas chromatography mass spectrometry.",
                "B) Fourier-transform infrared spectroscopy.",
                "C) simple optical stereomicroscopy."
              ],
              correctAnswer: "B",
              explanation: "Meera specifies micro-FTIR spectroscopy—Fourier-transform infrared spectroscopy.",
              evidence: "We will utilize micro-FTIR spectroscopy—Fourier-transform infrared spectroscopy."
            },
            {
              id: "l7-q26",
              questionNumber: 26,
              type: "multiple_choice_single",
              topic: "finance",
              estimatedBand: 6.5,
              prompt: "How much grant funding is allocated for spectroscopy instrument time?",
              options: [
                "A) £300.",
                "B) £600.",
                "C) £1,200."
              ],
              correctAnswer: "B",
              explanation: "Oliver states: 'cost approximately six hundred pounds from our research grant.'",
              evidence: "cost approximately six hundred pounds from our research grant."
            }
          ]
        },
        {
          groupInstruction: "Match each task with the person who proposed or took responsibility for it. Write the correct letter, A, B, or C, in boxes 27–30.\nA: Dr. Karen Vance\nB: Oliver\nC: Meera",
          questionType: "matching",
          questions: [
            {
              id: "l7-q27",
              questionNumber: 27,
              type: "matching",
              topic: "research",
              estimatedBand: 7.0,
              prompt: "Formulating the five-zone stratified geographic sampling scheme.",
              correctAnswer: "B",
              explanation: "Oliver presents the stratified sampling protocol across five zones.",
              evidence: "Oliver: We have designed a stratified sampling protocol across five distinct geographic zones"
            },
            {
              id: "l7-q28",
              questionNumber: 28,
              type: "matching",
              topic: "research",
              estimatedBand: 7.0,
              prompt: "Describing the multi-mesh stainless steel sieve filtration procedure.",
              correctAnswer: "C",
              explanation: "Meera explains the twenty-liter collection and three successive mesh sieves.",
              evidence: "Meera: At each sampling station, we plan to collect twenty-liter surface water samples... filter the water through three successive stainless steel mesh sieves"
            },
            {
              id: "l7-q29",
              questionNumber: 29,
              type: "matching",
              topic: "research",
              estimatedBand: 7.5,
              prompt: "Emphasizing the danger of synthetic clothing contaminating samples.",
              correctAnswer: "A",
              explanation: "Dr. Vance warns about synthetic fleece jackets and procedural blanks.",
              evidence: "Dr. Vance: If your field researchers wear synthetic fleece jackets, polyester fibers will contaminate your samples"
            },
            {
              id: "l7-q30",
              questionNumber: 30,
              type: "matching",
              topic: "research",
              estimatedBand: 7.0,
              prompt: "Booking thirty hours of beam time with the department technician.",
              correctAnswer: "B",
              explanation: "Oliver confirms booking thirty hours of instrument beam time.",
              evidence: "Oliver: We have booked thirty hours of instrument beam time through the department technician"
            }
          ]
        }
      ]
    },
    {
      sectionNumber: 4,
      title: "University Lecture: The History and Linguistics of Pidgins and Creoles",
      contextDescription: "Dr. Ronald Campbell (Scottish / Australian English speaker) delivering an academic linguistics lecture on the formation, grammar, and creolization of contact languages.",
      audioScript: [
        { "speaker": "Dr. Campbell (Scottish/Australian)", "text": "Good afternoon, everyone. In today's sociolinguistics lecture, we examine language contact phenomena, specifically the genesis and structural evolution of pidgins and creoles. When two or more human linguistic communities come into prolonged contact through trade, maritime exploration, or plantation colonization without sharing a common tongue, an urgent communicative imperative arises." },
        { "speaker": "Dr. Campbell (Scottish/Australian)", "text": "Initially, speakers develop a contact language termed a pidgin. Crucially, a pidgin has no native speakers. It is a simplified vehicular tongue featuring an impoverished grammatical system, minimal inflectional morphology, reduced phonemic inventories, and a lexicon drawn predominantly from the dominant social or economic group—termed the lexifier language. For example, maritime pidgins relied heavily on nautical terminology and simple subject-verb-object declarative syntax." },
        { "speaker": "Dr. Campbell (Scottish/Australian)", "text": "However, a radical transformation occurs when children are born into a multilingual community where a pidgin is the primary household language. Children do not merely inherit the fragmented, rudimentary pidgin of their parents. Instead, through innate cognitive language acquisition mechanisms, the first generation of children systematically regularizes grammar, invents complex tense and aspect markers, introduces subordinate clauses, and expands the vocabulary. This process is called creolization. When a pidgin becomes the acquired native mother tongue of a speech community, it becomes a creole." },
        { "speaker": "Dr. Campbell (Scottish/Australian)", "text": "A famous theoretical explanation for this rapid grammatical flowering was proposed in 1981 by linguist Derek Bickerton: the Language Bioprogram Hypothesis. Bickerton argued that children possess biologically pre-wired universal syntactic templates. When exposed to an impoverished linguistic input like a pidgin, children subconsciously draw upon this innate bioprogram to construct a fully formed natural language with complex tense, mood, and voice categories." },
        { "speaker": "Dr. Campbell (Scottish/Australian)", "text": "A prime real-world exemplar is Tok Pisin, spoken in Papua New Guinea. Originating in the nineteenth century as an English-lexified Pacific plantation jargon, Tok Pisin evolved into a vibrant national creole with over four million speakers, possessing its own television broadcasts, parliamentary debates, and translated literature." }
      ],
      questionGroups: [
        {
          groupInstruction: "Complete the notes below. Write NO MORE THAN TWO WORDS AND/OR A NUMBER for each answer. Write your answers in boxes 31–40.",
          questionType: "sentence_completion",
          questions: [
            {
              id: "l7-q31",
              questionNumber: 31,
              type: "sentence_completion",
              topic: "linguistics",
              estimatedBand: 7.0,
              prompt: "A pidgin language is unique in having no ____ speakers.",
              correctAnswer: "native",
              explanation: "Dr. Campbell states: 'Crucially, a pidgin has no native speakers.'",
              evidence: "Crucially, a pidgin has no native speakers."
            },
            {
              id: "l7-q32",
              questionNumber: 32,
              type: "sentence_completion",
              topic: "linguistics",
              estimatedBand: 7.5,
              prompt: "The dominant language that supplies vocabulary to a pidgin is called the ____ language.",
              correctAnswer: "lexifier",
              explanation: "Dr. Campbell identifies the dominant source as the 'lexifier language'.",
              evidence: "lexicon drawn predominantly from the dominant social or economic group—termed the lexifier language."
            },
            {
              id: "l7-q33",
              questionNumber: 33,
              type: "sentence_completion",
              topic: "linguistics",
              estimatedBand: 7.0,
              prompt: "Early trade pidgins relied on simple subject-verb-object ____ word order.",
              correctAnswer: "declarative",
              explanation: "Dr. Campbell refers to 'simple subject-verb-object declarative syntax.'",
              evidence: "simple subject-verb-object declarative syntax."
            },
            {
              id: "l7-q34",
              questionNumber: 34,
              type: "sentence_completion",
              topic: "linguistics",
              estimatedBand: 7.5,
              prompt: "When children acquire a pidgin as their first language, the process is termed ____.",
              correctAnswer: "creolization",
              explanation: "Dr. Campbell explains: 'This process is called creolization.'",
              evidence: "This process is called creolization. When a pidgin becomes the acquired native mother tongue"
            },
            {
              id: "l7-q35",
              questionNumber: 35,
              type: "sentence_completion",
              topic: "linguistics",
              estimatedBand: 7.5,
              prompt: "During creolization, children invent complex markers for tense and ____.",
              correctAnswer: "aspect",
              explanation: "Dr. Campbell notes children 'invents complex tense and aspect markers'.",
              evidence: "invents complex tense and aspect markers, introduces subordinate clauses"
            },
            {
              id: "l7-q36",
              questionNumber: 36,
              type: "sentence_completion",
              topic: "linguistics",
              estimatedBand: 7.0,
              prompt: "Linguist Derek Bickerton proposed his famous hypothesis in the year ____.",
              correctAnswer: "1981",
              explanation: "Dr. Campbell cites: 'proposed in 1981 by linguist Derek Bickerton'.",
              evidence: "proposed in 1981 by linguist Derek Bickerton: the Language Bioprogram Hypothesis."
            },
            {
              id: "l7-q37",
              questionNumber: 37,
              type: "sentence_completion",
              topic: "linguistics",
              estimatedBand: 8.0,
              prompt: "Bickerton named his theory the Language ____ Hypothesis.",
              correctAnswer: "Bioprogram",
              explanation: "Dr. Campbell names it the Language Bioprogram Hypothesis.",
              evidence: "Derek Bickerton: the Language Bioprogram Hypothesis."
            },
            {
              id: "l7-q38",
              questionNumber: 38,
              type: "sentence_completion",
              topic: "linguistics",
              estimatedBand: 8.0,
              prompt: "The theory posits that children possess innate biological ____ templates.",
              correctAnswer: "syntactic",
              explanation: "Dr. Campbell explains children have 'biologically pre-wired universal syntactic templates.'",
              evidence: "biologically pre-wired universal syntactic templates."
            },
            {
              id: "l7-q39",
              questionNumber: 39,
              type: "sentence_completion",
              topic: "geography",
              estimatedBand: 7.0,
              prompt: "Tok Pisin is widely spoken across the nation of Papua ____.",
              correctAnswer: "New Guinea",
              explanation: "Dr. Campbell mentions Tok Pisin spoken in Papua New Guinea.",
              evidence: "Tok Pisin, spoken in Papua New Guinea."
            },
            {
              id: "l7-q40",
              questionNumber: 40,
              type: "sentence_completion",
              topic: "sociolinguistics",
              estimatedBand: 7.0,
              prompt: "Tok Pisin currently has over ____ million speakers.",
              correctAnswer: ["4", "four"],
              explanation: "Dr. Campbell notes over four million speakers.",
              evidence: "over four million speakers, possessing its own television broadcasts"
            }
          ]
        }
      ]
    }
  ]
};

fs.writeFileSync(
  path.resolve('./content/listening/listening-test-07.json'),
  JSON.stringify(listeningTest07, null, 2),
  'utf8'
);
console.log('✓ Created listening-test-07.json');
