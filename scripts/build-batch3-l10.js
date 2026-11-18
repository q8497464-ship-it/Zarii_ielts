import fs from 'fs';
import path from 'path';

const listeningTest10 = {
  id: "list-test-10",
  title: "Listening Practice Test 10",
  difficulty: "easy",
  timeLimitMinutes: 40,
  sections: [
    {
      sectionNumber: 1,
      title: "Residential Solar Panel Installation Consultation",
      contextDescription: "Neha (Indian English speaker) enquiring with Solar Energy Advisor Brian (Australian English speaker) about installing photovoltaic panels on her suburban home.",
      audioScript: [
        { "speaker": "Brian (Australian)", "text": "G'day! Sunburst Renewable Energy Solutions. Brian speaking." },
        { "speaker": "Neha (Indian English)", "text": "Hello Brian! My name is Neha Verma. I am calling to schedule a site feasibility inspection for installing a rooftop solar and battery storage system on my house." },
        { "speaker": "Brian (Australian)", "text": "No worries at all, Neha! I can certainly assist with that. Let me grab your contact details and home specifications." },
        { "speaker": "Neha (Indian English)", "text": "Sure. My first name is Neha, N-E-H-A, and surname Verma, V-E-R-M-A." },
        { "speaker": "Brian (Australian)", "text": "Thanks, Neha. And what is your property street address?" },
        { "speaker": "Neha (Indian English)", "text": "It is fifty-eight Banksia Avenue, Brisbane, postcode four zero six seven." },
        { "speaker": "Brian (Australian)", "text": "Banksia Avenue, four zero six seven. And your mobile phone number?" },
        { "speaker": "Neha (Indian English)", "text": "It is zero four eight eight, one two three four five six." },
        { "speaker": "Brian (Australian)", "text": "Got it. Now, what type of roof cladding does your house have—terracotta tiles, corrugated Colorbond metal, or slate?" },
        { "speaker": "Neha (Indian English)", "text": "It is corrugated Colorbond steel, pitched at approximately twenty-five degrees." },
        { "speaker": "Brian (Australian)", "text": "Corrugated metal is the absolute easiest to mount panels on. Based on your household power usage, our standard six point six kilowatt system with twelve high-efficiency monocrystalline panels will generate about twenty-four kilowatt-hours of clean electricity daily." },
        { "speaker": "Neha (Indian English)", "text": "And what is the estimated cost after the federal government rebate?" },
        { "speaker": "Brian (Australian)", "text": "With the Small-scale Renewable Energy Scheme rebate deducted upfront, the net price for the complete package is four thousand eight hundred dollars, which includes an Austrian-made inverter." },
        { "speaker": "Neha (Indian English)", "text": "That is within our budget. What warranty is provided on the hardware?" },
        { "speaker": "Brian (Australian)", "text": "You get a twenty-five-year performance warranty on the solar panels, and a ten-year replacement warranty on the central inverter unit." },
        { "speaker": "Neha (Indian English)", "text": "That gives great peace of mind. When could an engineer inspect our roof structure?" },
        { "speaker": "Brian (Australian)", "text": "Our structural assessor can visit this Friday, November the twenty-second, at ten thirty in the morning." },
        { "speaker": "Neha (Indian English)", "text": "Friday the twenty-second at ten thirty AM suits me perfectly. Thank you, Brian!" }
      ],
      questionGroups: [
        {
          groupInstruction: "Complete the form below. Write NO MORE THAN TWO WORDS AND/OR A NUMBER for each answer. Write your answers in boxes 1–10.",
          questionType: "sentence_completion",
          questions: [
            {
              id: "l10-q1",
              questionNumber: 1,
              type: "sentence_completion",
              topic: "customer enquiry",
              estimatedBand: 5.5,
              prompt: "Customer surname: ____",
              correctAnswer: "Verma",
              explanation: "Neha spells her surname: V-E-R-M-A.",
              evidence: "surname Verma, V-E-R-M-A."
            },
            {
              id: "l10-q2",
              questionNumber: 2,
              type: "sentence_completion",
              topic: "address",
              estimatedBand: 5.5,
              prompt: "Street address: 58 ____ Avenue, Brisbane.",
              correctAnswer: "Banksia",
              explanation: "Neha states: fifty-eight Banksia Avenue.",
              evidence: "fifty-eight Banksia Avenue, Brisbane"
            },
            {
              id: "l10-q3",
              questionNumber: 3,
              type: "sentence_completion",
              topic: "postcode",
              estimatedBand: 6.0,
              prompt: "Postcode: ____",
              correctAnswer: ["4067", "four zero six seven"],
              explanation: "Neha gives postcode: four zero six seven.",
              evidence: "postcode four zero six seven."
            },
            {
              id: "l10-q4",
              questionNumber: 4,
              type: "sentence_completion",
              topic: "telephone",
              estimatedBand: 5.5,
              prompt: "Contact mobile: 0488 ____",
              correctAnswer: "123456",
              explanation: "Neha gives: zero four eight eight, one two three four five six.",
              evidence: "zero four eight eight, one two three four five six."
            },
            {
              id: "l10-q5",
              questionNumber: 5,
              type: "sentence_completion",
              topic: "construction",
              estimatedBand: 6.0,
              prompt: "Roof material: corrugated ____ steel.",
              correctAnswer: "Colorbond",
              explanation: "Neha states: corrugated Colorbond steel.",
              evidence: "corrugated Colorbond steel, pitched at approximately"
            },
            {
              id: "l10-q6",
              questionNumber: 6,
              type: "sentence_completion",
              topic: "energy",
              estimatedBand: 6.5,
              prompt: "Recommended system capacity: ____ kilowatts.",
              correctAnswer: ["6.6", "six point six"],
              explanation: "Brian recommends a standard six point six kilowatt system.",
              evidence: "our standard six point six kilowatt system with twelve high-efficiency"
            },
            {
              id: "l10-q7",
              questionNumber: 7,
              type: "sentence_completion",
              topic: "finance",
              estimatedBand: 6.0,
              prompt: "Total net price after rebate: $____",
              correctAnswer: ["4800", "4,800", "four thousand eight hundred"],
              explanation: "Brian quotes four thousand eight hundred dollars.",
              evidence: "net price for the complete package is four thousand eight hundred dollars"
            },
            {
              id: "l10-q8",
              questionNumber: 8,
              type: "sentence_completion",
              topic: "warranty",
              estimatedBand: 6.5,
              prompt: "Inverter replacement warranty duration: ____ years.",
              correctAnswer: ["10", "ten"],
              explanation: "Brian confirms a ten-year replacement warranty on the inverter.",
              evidence: "ten-year replacement warranty on the central inverter unit."
            },
            {
              id: "l10-q9",
              questionNumber: 9,
              type: "sentence_completion",
              topic: "dates",
              estimatedBand: 6.0,
              prompt: "Inspection appointment date: Friday, November ____",
              correctAnswer: ["22nd", "22", "twenty-second"],
              explanation: "Brian confirms Friday, November the twenty-second.",
              evidence: "Friday, November the twenty-second, at ten thirty in the morning."
            },
            {
              id: "l10-q10",
              questionNumber: 10,
              type: "sentence_completion",
              topic: "time",
              estimatedBand: 5.5,
              prompt: "Appointment time: ____ AM.",
              correctAnswer: ["10:30", "10.30", "ten thirty"],
              explanation: "Brian specifies ten thirty in the morning.",
              evidence: "at ten thirty in the morning."
            }
          ]
        }
      ]
    },
    {
      sectionNumber: 2,
      title: "Visitor Tour of the Regional Maritime Lighthouse Museum",
      contextDescription: "Senior Curator Edward (British English speaker) providing a historical orientation talk to a tour group at the South Foreland Victorian Lighthouse Museum.",
      audioScript: [
        { "speaker": "Edward (British)", "text": "Good morning ladies and gentlemen, and welcome to South Foreland Victorian Lighthouse! I am Edward, the senior heritage curator. Perched atop these white chalk cliffs overlooking the Strait of Dover, this lighthouse has safeguarded maritime navigation along one of the world's busiest shipping lanes since 1843." },
        { "speaker": "Edward (British)", "text": "South Foreland holds a celebrated place in global technological history. In 1858, it became the very first lighthouse on Earth to be illuminated by electric arc light, engineered by Michael Faraday. Later, in 1898, Guglielmo Marconi installed a wireless radio transmitter in our lantern room, broadcasting the world's first ship-to-shore wireless distress telegraph across the English Channel." },
        { "speaker": "Edward (British)", "text": "Let me direct your attention to the site map in your visitor brochures. We are currently standing in the Keeper's Parlour on the ground floor. If you exit the back door and follow the gravel path westward to location A, you will find the original 1870 Steam Foghorn Engine Shed. Inside, the massive coal-fired twin steam boilers that powered our acoustic sirens have been fully restored." },
        { "speaker": "Edward (British)", "text": "Location B to the north marks the Fresnel Lens Optical Vault. Here, you can examine a giant six-foot rotating biconvex glass lens crafted in Paris, which refracted light into a beam visible for twenty-six nautical miles." },
        { "speaker": "Edward (British)", "text": "Continuing eastward along the cliff path brings you to location C, the Victorian Kitchen & Pantry Garden. Volunteers have planted period-accurate heirloom root vegetables and medicinal herbs that keepers' families cultivated during winter isolations." },
        { "speaker": "Edward (British)", "text": "Finally, location D at the base of the tower is the Marconi Wireless Telegraphy Station. Our radio amateur volunteers conduct live Morse code demonstrations every hour on the half-hour." },
        { "speaker": "Edward (British)", "text": "A quick safety advisory: the iron spiral staircase to the lantern gallery consists of seventy-six narrow steps. Please hold the handrails firmly, and leave heavy backpacks in the cloakroom lockers. Enjoy your visit!" }
      ],
      questionGroups: [
        {
          groupInstruction: "Choose the correct letter, A, B, or C. Write your answers in boxes 11–16.",
          questionType: "multiple_choice_single",
          questions: [
            {
              id: "l10-q11",
              questionNumber: 11,
              type: "multiple_choice_single",
              topic: "history",
              estimatedBand: 6.0,
              prompt: "The South Foreland Lighthouse has guided maritime navigation since",
              options: [
                "A) 1843.",
                "B) 1858.",
                "C) 1898."
              ],
              correctAnswer: "A",
              explanation: "Edward notes the lighthouse has guided shipping lanes since 1843.",
              evidence: "safeguarded maritime navigation along one of the world's busiest shipping lanes since 1843."
            },
            {
              id: "l10-q12",
              questionNumber: 12,
              type: "multiple_choice_single",
              topic: "technology",
              estimatedBand: 6.5,
              prompt: "In 1858, South Foreland became the first lighthouse to use",
              options: [
                "A) whale oil lamps.",
                "B) electric arc light.",
                "C) solar-powered bulbs."
              ],
              correctAnswer: "B",
              explanation: "Edward states it became the very first lighthouse to be illuminated by electric arc light.",
              evidence: "very first lighthouse on Earth to be illuminated by electric arc light, engineered by Michael Faraday."
            },
            {
              id: "l10-q13",
              questionNumber: 13,
              type: "multiple_choice_single",
              topic: "history",
              estimatedBand: 6.5,
              prompt: "What historic milestone was achieved at the lighthouse by Marconi in 1898?",
              options: [
                "A) The first submarine radar detection.",
                "B) The first ship-to-shore wireless distress telegraph.",
                "C) The first television broadcast."
              ],
              correctAnswer: "B",
              explanation: "Edward highlights the world's first ship-to-shore wireless distress telegraph.",
              evidence: "broadcasting the world's first ship-to-shore wireless distress telegraph across the English Channel."
            },
            {
              id: "l10-q14",
              questionNumber: 14,
              type: "multiple_choice_single",
              topic: "optics",
              estimatedBand: 7.0,
              prompt: "The historic French-crafted Fresnel lens could project a light beam up to",
              options: [
                "A) 12 nautical miles.",
                "B) 26 nautical miles.",
                "C) 40 nautical miles."
              ],
              correctAnswer: "B",
              explanation: "Edward notes light was visible for twenty-six nautical miles.",
              evidence: "refracted light into a beam visible for twenty-six nautical miles."
            },
            {
              id: "l10-q15",
              questionNumber: 15,
              type: "multiple_choice_single",
              topic: "demonstration",
              estimatedBand: 6.0,
              prompt: "Live Morse code demonstrations take place",
              options: [
                "A) every hour on the half-hour.",
                "B) once daily at noon.",
                "C) on Sunday afternoons only."
              ],
              correctAnswer: "A",
              explanation: "Edward states demonstrations run every hour on the half-hour.",
              evidence: "conduct live Morse code demonstrations every hour on the half-hour."
            },
            {
              id: "l10-q16",
              questionNumber: 16,
              type: "multiple_choice_single",
              topic: "safety",
              estimatedBand: 5.5,
              prompt: "How many steps make up the iron spiral staircase?",
              options: [
                "A) 50.",
                "B) 76.",
                "C) 120."
              ],
              correctAnswer: "B",
              explanation: "Edward notes the staircase consists of seventy-six narrow steps.",
              evidence: "spiral staircase to the lantern gallery consists of seventy-six narrow steps."
            }
          ]
        },
        {
          groupInstruction: "Label the map below. Write the correct letter, A–D, next to Questions 17–20.",
          questionType: "diagram_label_completion",
          questions: [
            {
              id: "l10-q17",
              questionNumber: 17,
              type: "diagram_label_completion",
              topic: "map",
              estimatedBand: 6.5,
              prompt: "Steam Foghorn Engine Shed: Location ____",
              correctAnswer: "A",
              explanation: "Edward indicates location A westward along the gravel path as the Steam Foghorn Engine Shed.",
              evidence: "follow the gravel path westward to location A, you will find the original 1870 Steam Foghorn Engine Shed."
            },
            {
              id: "l10-q18",
              questionNumber: 18,
              type: "diagram_label_completion",
              topic: "map",
              estimatedBand: 6.5,
              prompt: "Fresnel Lens Optical Vault: Location ____",
              correctAnswer: "B",
              explanation: "Edward indicates location B to the north as the Fresnel Lens Optical Vault.",
              evidence: "Location B to the north marks the Fresnel Lens Optical Vault."
            },
            {
              id: "l10-q19",
              questionNumber: 19,
              type: "diagram_label_completion",
              topic: "map",
              estimatedBand: 6.5,
              prompt: "Victorian Kitchen & Pantry Garden: Location ____",
              correctAnswer: "C",
              explanation: "Edward indicates location C eastward along the cliff path as the Victorian Kitchen & Pantry Garden.",
              evidence: "Continuing eastward along the cliff path brings you to location C, the Victorian Kitchen & Pantry Garden."
            },
            {
              id: "l10-q20",
              questionNumber: 20,
              type: "diagram_label_completion",
              topic: "map",
              estimatedBand: 6.5,
              prompt: "Marconi Wireless Telegraphy Station: Location ____",
              correctAnswer: "D",
              explanation: "Edward indicates location D at the base of the tower as the Marconi Wireless Telegraphy Station.",
              evidence: "Finally, location D at the base of the tower is the Marconi Wireless Telegraphy Station."
            }
          ]
        }
      ]
    },
    {
      sectionNumber: 3,
      title: "Academic Tutorial: Comparative Analysis of Modular Prefabricated Construction",
      contextDescription: "Architecture Professor Wallace (British English) discussing industrial building technology with students Kyle (North American English) and Divya (Indian English).",
      audioScript: [
        { "speaker": "Professor Wallace (British)", "text": "Good morning Kyle, Divya. Let us examine your dissertation draft comparing offsite volumetric modular construction with conventional in-situ concrete methods. Your life-cycle carbon calculations are solid, but I want to make sure your logistical analysis is rigorous." },
        { "speaker": "Kyle (North American)", "text": "Thanks, Professor Wallace. In our data, the single greatest benefit of modular prefabrication is schedule compression. Because site excavation and underground foundation piling occur concurrently with three-dimensional module manufacturing inside a factory, overall project timelines are slashed by thirty to fifty percent." },
        { "speaker": "Divya (Indian English)", "text": "And from an environmental perspective, factory assembly minimizes construction material waste by up to eighty percent compared to traditional construction sites. Factory off-cuts of structural timber, plasterboard, and insulation are collected in centralized recycling hoppers rather than dumped in open skips exposed to rain." },
        { "speaker": "Professor Wallace (British)", "text": "Very true. But what about structural and transport constraints? That is where several high-profile modular contractors have stumbled." },
        { "speaker": "Kyle (North American)", "text": "Right. We highlighted that road transport regulations impose strict geometric boundaries. Highway overpasses limit maximum module widths to four point two meters and heights to three point six meters. If an architectural plan requires large, pillarless open spaces—like auditoriums or hotel ballrooms—modular design becomes structurally inefficient." },
        { "speaker": "Divya (Indian English)", "text": "Furthermore, modular construction requires full architectural design freeze before factory assembly commences. Conventional construction allows developers to alter interior partitions or electrical layouts late in the build, but with prefabrication, late engineering change orders are prohibitively expensive." },
        { "speaker": "Professor Wallace (British)", "text": "Precisely. Now, how are you allocating your final report chapters for next week?" },
        { "speaker": "Kyle (North American)", "text": "I will author the logistics and crane installation chapter, modeling the heavy mobile crane capacity needed for high-rise stacking." },
        { "speaker": "Divya (Indian English)", "text": "And I will finalize the embodied carbon comparison, evaluating cross-laminated timber modules against structural steel frames." }
      ],
      questionGroups: [
        {
          groupInstruction: "Choose the correct letter, A, B, or C. Write your answers in boxes 21–26.",
          questionType: "multiple_choice_single",
          questions: [
            {
              id: "l10-q21",
              questionNumber: 21,
              type: "multiple_choice_single",
              topic: "construction",
              estimatedBand: 7.0,
              prompt: "Modular construction reduces project schedules by 30 to 50 percent because",
              options: [
                "A) construction workers work twenty-four hours a day.",
                "B) foundation work and factory module fabrication occur simultaneously.",
                "C) building regulations are completely waived for modular homes."
              ],
              correctAnswer: "B",
              explanation: "Kyle explains site excavation occurs concurrently with module manufacturing inside a factory.",
              evidence: "Because site excavation and underground foundation piling occur concurrently with three-dimensional module manufacturing inside a factory"
            },
            {
              id: "l10-q22",
              questionNumber: 22,
              type: "multiple_choice_single",
              topic: "environment",
              estimatedBand: 6.5,
              prompt: "Factory manufacturing reduces construction site material waste by up to",
              options: [
                "A) 30%.",
                "B) 50%.",
                "C) 80%."
              ],
              correctAnswer: "C",
              explanation: "Divya states factory assembly minimizes material waste by up to eighty percent.",
              evidence: "factory assembly minimizes construction material waste by up to eighty percent"
            },
            {
              id: "l10-q23",
              questionNumber: 23,
              type: "multiple_choice_single",
              topic: "transport",
              estimatedBand: 7.0,
              prompt: "Highway overpass regulations restrict maximum module width to",
              options: [
                "A) 3.6 meters.",
                "B) 4.2 meters.",
                "C) 5.5 meters."
              ],
              correctAnswer: "B",
              explanation: "Kyle notes highway overpasses limit maximum module widths to four point two meters.",
              evidence: "limit maximum module widths to four point two meters and heights to three point six meters."
            },
            {
              id: "l10-q24",
              questionNumber: 24,
              type: "multiple_choice_single",
              topic: "architecture",
              estimatedBand: 7.0,
              prompt: "Modular construction is poorly suited for architectural spaces requiring",
              options: [
                "A) standard repetitive hotel rooms.",
                "B) large open spaces without supporting pillars.",
                "C) bathroom pods."
              ],
              correctAnswer: "B",
              explanation: "Kyle explains that large, pillarless open spaces like auditoriums make modular design inefficient.",
              evidence: "architectural plan requires large, pillarless open spaces—like auditoriums or hotel ballrooms—modular design becomes structurally inefficient."
            },
            {
              id: "l10-q25",
              questionNumber: 25,
              type: "multiple_choice_single",
              topic: "management",
              estimatedBand: 7.5,
              prompt: "Why are late design modifications especially costly in modular building?",
              options: [
                "A) Building materials cannot be cut by hand.",
                "B) Complete architectural designs must be locked in before factory assembly begins.",
                "C) Local governments fine contractors for changing plans."
              ],
              correctAnswer: "B",
              explanation: "Divya states modular construction requires full architectural design freeze before assembly commences.",
              evidence: "modular construction requires full architectural design freeze before factory assembly commences."
            },
            {
              id: "l10-q26",
              questionNumber: 26,
              type: "multiple_choice_single",
              topic: "engineering",
              estimatedBand: 7.0,
              prompt: "High-rise modular assembly requires specialized engineering calculations for",
              options: [
                "A) underground water pressure.",
                "B) heavy mobile crane stacking capacity.",
                "C) window cleaning ropes."
              ],
              correctAnswer: "B",
              explanation: "Kyle mentions modeling heavy mobile crane capacity needed for high-rise stacking.",
              evidence: "modeling the heavy mobile crane capacity needed for high-rise stacking."
            }
          ]
        },
        {
          groupInstruction: "Which student is responsible for each section of the final report? Write the correct letter, A or B, in boxes 27–30.\nA: Kyle\nB: Divya",
          questionType: "matching",
          questions: [
            {
              id: "l10-q27",
              questionNumber: 27,
              type: "matching",
              topic: "assignment",
              estimatedBand: 6.5,
              prompt: "Explaining simultaneous foundation piling and factory fabrication schedules.",
              correctAnswer: "A",
              explanation: "Kyle explains schedule compression and concurrent manufacturing.",
              evidence: "Kyle: In our data, the single greatest benefit of modular prefabrication is schedule compression."
            },
            {
              id: "l10-q28",
              questionNumber: 28,
              type: "matching",
              topic: "assignment",
              estimatedBand: 7.0,
              prompt: "Analyzing timber and plasterboard waste reduction in centralized factory hoppers.",
              correctAnswer: "B",
              explanation: "Divya details factory material waste reduction.",
              evidence: "Divya: Factory off-cuts of structural timber, plasterboard, and insulation are collected"
            },
            {
              id: "l10-q29",
              questionNumber: 29,
              type: "matching",
              topic: "assignment",
              estimatedBand: 7.5,
              prompt: "Modeling mobile crane lifting loads for high-rise volumetric stacking.",
              correctAnswer: "A",
              explanation: "Kyle confirms he will author the logistics and crane installation chapter.",
              evidence: "Kyle: I will author the logistics and crane installation chapter"
            },
            {
              id: "l10-q30",
              questionNumber: 30,
              type: "matching",
              topic: "assignment",
              estimatedBand: 7.5,
              prompt: "Comparing embodied carbon metrics between cross-laminated timber and steel frames.",
              correctAnswer: "B",
              explanation: "Divya confirms she will finalize the embodied carbon comparison.",
              evidence: "Divya: And I will finalize the embodied carbon comparison, evaluating cross-laminated timber modules"
            }
          ]
        }
      ]
    },
    {
      sectionNumber: 4,
      title: "Academic Lecture: The Evolution and Cognitive Ecology of Cephalopod Intelligence",
      contextDescription: "Dr. Miranda Price (Australian English speaker) delivering a university biology lecture on invertebrate neurobiology and octopus cognitive evolution.",
      audioScript: [
        { "speaker": "Dr. Price (Australian)", "text": "Good afternoon, students. In classical evolutionary biology, complex intelligence was long regarded as an exclusive evolutionary prerogative of vertebrates—specifically birds and mammals with large, centralized brains. However, the class Cephalopoda—predominantly octopuses, cuttlefish, and squid—represents a profound evolutionary anomaly: an invertebrate lineage that developed remarkable cognitive sophistication entirely independently from vertebrates." },
        { "speaker": "Dr. Price (Australian)", "text": "To understand cephalopod neuroanatomy, we must examine its radically decentralized architecture. An adult common octopus (Octopus vulgaris) possesses roughly five hundred million neurons—comparable to the neural count of a domestic dog. Crucially, however, less than one-third of these neurons reside within the central brain encircling the esophagus. The remaining two-thirds are distributed throughout the animal's eight flexible arms. Each arm possesses an independent subcortical neural ganglion that processes tactile, chemical, and proprioceptive sensory inputs locally, allowing individual arms to explore crevices, taste substrates, and manipulate objects semi-autonomously without continuous top-down commands from the brain." },
        { "speaker": "Dr. Price (Australian)", "text": "Why did cephalopods evolve such formidable intellect? Paleobiological fossil records indicate that during the Mesozoic Era, ancestral cephalopods lost their heavy external protective shells. While shedding their calcified armor bestowed unprecedented agility and camouflage prowess, it left them soft-bodied and exquisitely vulnerable to swift, jawed teleost fish predators. Natural selection favored individuals capable of dynamic tactical problem-solving, spatial memory mapping, and predatory deception." },
        { "speaker": "Dr. Price (Australian)", "text": "In laboratory cognitive paradigms, octopuses demonstrate advanced executive abilities, including tool use, maze navigation, associative learning, and flexible play behavior. For example, wild veined octopuses in Indonesia routinely harvest discarded coconut shell halves, carrying them across open sandy seafloors to assemble armored defensive shelters against sharks—an indisputable manifestation of foresight and multi-step tool utilization. The cephalopod mind proves that nature can construct sophisticated intelligence along a radically distinct neuroarchitectural blueprint." }
      ],
      questionGroups: [
        {
          groupInstruction: "Complete the notes below. Write NO MORE THAN TWO WORDS AND/OR A NUMBER for each answer. Write your answers in boxes 31–40.",
          questionType: "sentence_completion",
          questions: [
            {
              id: "l10-q31",
              questionNumber: 31,
              type: "sentence_completion",
              topic: "biology",
              estimatedBand: 7.0,
              prompt: "An adult common octopus has approximately ____ million neurons.",
              correctAnswer: ["500", "five hundred"],
              explanation: "Dr. Price states roughly five hundred million neurons.",
              evidence: "possesses roughly five hundred million neurons—comparable to the neural count of a domestic dog."
            },
            {
              id: "l10-q32",
              questionNumber: 32,
              type: "sentence_completion",
              topic: "anatomy",
              estimatedBand: 7.5,
              prompt: "The central brain is situated encircling the animal's ____.",
              correctAnswer: "esophagus",
              explanation: "Dr. Price states the central brain encircles the esophagus.",
              evidence: "central brain encircling the esophagus."
            },
            {
              id: "l10-q33",
              questionNumber: 33,
              type: "sentence_completion",
              topic: "neurobiology",
              estimatedBand: 7.0,
              prompt: "Over two-thirds of an octopus's neurons are distributed across its eight ____.",
              correctAnswer: "arms",
              explanation: "Dr. Price notes two-thirds are distributed throughout the eight arms.",
              evidence: "The remaining two-thirds are distributed throughout the animal's eight flexible arms."
            },
            {
              id: "l10-q34",
              questionNumber: 34,
              type: "sentence_completion",
              topic: "neurobiology",
              estimatedBand: 8.0,
              prompt: "Each arm contains a subcortical neural ____ to process information locally.",
              correctAnswer: "ganglion",
              explanation: "Dr. Price mentions each arm possesses an independent subcortical neural ganglion.",
              evidence: "Each arm possesses an independent subcortical neural ganglion"
            },
            {
              id: "l10-q35",
              questionNumber: 35,
              type: "sentence_completion",
              topic: "paleontology",
              estimatedBand: 7.5,
              prompt: "Ancestral cephalopods lost their heavy external ____ during the Mesozoic Era.",
              correctAnswer: "shells",
              explanation: "Dr. Price explains ancestral cephalopods lost their heavy external protective shells.",
              evidence: "ancestral cephalopods lost their heavy external protective shells."
            },
            {
              id: "l10-q36",
              questionNumber: 36,
              type: "sentence_completion",
              topic: "evolution",
              estimatedBand: 7.0,
              prompt: "Losing their armor made cephalopods vulnerable to jawed teleost ____.",
              correctAnswer: "fish",
              explanation: "Dr. Price refers to vulnerability to jawed teleost fish predators.",
              evidence: "exquisitely vulnerable to swift, jawed teleost fish predators."
            },
            {
              id: "l10-q37",
              questionNumber: 37,
              type: "sentence_completion",
              topic: "zoology",
              estimatedBand: 7.0,
              prompt: "Wild veined octopuses in Indonesia harvest discarded ____ shells.",
              correctAnswer: "coconut",
              explanation: "Dr. Price mentions harvesting discarded coconut shell halves.",
              evidence: "wild veined octopuses in Indonesia routinely harvest discarded coconut shell halves"
            },
            {
              id: "l10-q38",
              questionNumber: 38,
              type: "sentence_completion",
              topic: "behavior",
              estimatedBand: 7.5,
              prompt: "Octopuses assemble coconut shells to build defensive shelters against ____.",
              correctAnswer: "sharks",
              explanation: "Dr. Price notes assembling shelters against sharks.",
              evidence: "assemble armored defensive shelters against sharks"
            },
            {
              id: "l10-q39",
              questionNumber: 39,
              type: "sentence_completion",
              topic: "cognitive science",
              estimatedBand: 7.5,
              prompt: "Carrying shells across the seafloor represents evidence of planning and ____.",
              correctAnswer: "foresight",
              explanation: "Dr. Price states an indisputable manifestation of foresight and multi-step tool utilization.",
              evidence: "an indisputable manifestation of foresight and multi-step tool utilization."
            },
            {
              id: "l10-q40",
              questionNumber: 40,
              type: "sentence_completion",
              topic: "neurobiology",
              estimatedBand: 8.0,
              prompt: "Cephalopods prove intelligence can arise along a distinct evolutionary ____.",
              correctAnswer: "blueprint",
              explanation: "Dr. Price concludes nature can construct intelligence along a radically distinct neuroarchitectural blueprint.",
              evidence: "construct sophisticated intelligence along a radically distinct neuroarchitectural blueprint."
            }
          ]
        }
      ]
    }
  ]
};

fs.writeFileSync(
  path.resolve('./content/listening/listening-test-10.json'),
  JSON.stringify(listeningTest10, null, 2),
  'utf8'
);
console.log('✓ Created listening-test-10.json');
