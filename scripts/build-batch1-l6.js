import fs from 'fs';
import path from 'path';

const listeningTest06 = {
  id: "list-test-06",
  title: "Listening Practice Test 6",
  difficulty: "easy",
  timeLimitMinutes: 40,
  sections: [
    {
      sectionNumber: 1,
      title: "Community Tool Library Registration",
      contextDescription: "Vikram Mehta (Indian English speaker) enquiring with Receptionist Clare (British RP speaker) about joining the local tool lending cooperative.",
      audioScript: [
        { "speaker": "Clare (British)", "text": "Good morning! Highfield Community Tool Library. How may I help you today?" },
        { "speaker": "Vikram (Indian English)", "text": "Hello Clare! My name is Vikram Mehta. I recently purchased a fixer-upper house in Highfield, and I heard your cooperative lends domestic renovation and gardening tools to local residents." },
        { "speaker": "Clare (British)", "text": "Yes, absolutely! We operate just like a book library, but with over six hundred tools in our inventory. To sign you up, I just need to record a few basic details." },
        { "speaker": "Vikram (Indian English)", "text": "Wonderful. My full name is Vikram Mehta. That's M-E-H-T-A." },
        { "speaker": "Clare (British)", "text": "Thank you, Vikram. And what is your current residential address?" },
        { "speaker": "Vikram (Indian English)", "text": "It's forty-two Orchard Lane, right here in Highfield, postcode H-F-four, seven-P-R." },
        { "speaker": "Clare (British)", "text": "Got it. And a contact mobile number?" },
        { "speaker": "Vikram (Indian English)", "text": "Yes, it is zero seven seven zero zero, nine zero zero eight one four." },
        { "speaker": "Clare (British)", "text": "Splendid. Now regarding membership tiers, our Standard Membership costs thirty-five pounds per year, which entitles you to borrow up to five hand tools simultaneously. If you plan to borrow heavy power machinery, such as rotary tillers or concrete mixers, you will need our Premium tier, which is fifty-five pounds annually." },
        { "speaker": "Vikram (Indian English)", "text": "The Standard tier for thirty-five pounds will be ideal for now. What is the standard loan period for borrowed items?" },
        { "speaker": "Clare (British)", "text": "Most standard items can be kept for up to seven days. However, high-demand items, like cordless drill kits and pressure washers, have a maximum borrowing limit of three days so that other members can access them." },
        { "speaker": "Vikram (Indian English)", "text": "That makes total sense. Do you require any safety deposit?" },
        { "speaker": "Clare (British)", "text": "We do not charge deposits for standard tools, but we do require all new members to show two forms of identification: one photo ID like your passport or driving license, plus a recent utility bill dated within the last three months to verify your address." },
        { "speaker": "Vikram (Indian English)", "text": "I have my driving license and water bill ready in my car. What are your opening hours on weekends?" },
        { "speaker": "Clare (British)", "text": "On Saturdays we are open from nine in the morning until five in the afternoon. On Sundays we open slightly later, from ten in the morning until two in the afternoon." },
        { "speaker": "Vikram (Indian English)", "text": "And where should I return tools when the depot is closed?" },
        { "speaker": "Clare (British)", "text": "Hand tools can be returned via our secure drop box located beside the side gate, but any motorized equipment must be returned in person during staff hours." },
        { "speaker": "Vikram (Indian English)", "text": "Understood. Thank you very much, Clare. I will step outside to grab my documents!" }
      ],
      questionGroups: [
        {
          groupInstruction: "Complete the notes below. Write NO MORE THAN TWO WORDS AND/OR A NUMBER for each answer. Write your answers in boxes 1–10.",
          questionType: "sentence_completion",
          questions: [
            {
              id: "l6-q1",
              questionNumber: 1,
              type: "sentence_completion",
              topic: "community",
              estimatedBand: 5.5,
              prompt: "Applicant's surname: ____",
              correctAnswer: "Mehta",
              explanation: "Vikram spells his surname: M-E-H-T-A.",
              evidence: "My full name is Vikram Mehta. That's M-E-H-T-A."
            },
            {
              id: "l6-q2",
              questionNumber: 2,
              type: "sentence_completion",
              topic: "community",
              estimatedBand: 5.5,
              prompt: "Address: 42 Orchard Lane, Postcode: ____",
              correctAnswer: ["HF4 7PR", "HF47PR"],
              explanation: "Vikram gives postcode: H-F-four, seven-P-R.",
              evidence: "postcode H-F-four, seven-P-R."
            },
            {
              id: "l6-q3",
              questionNumber: 3,
              type: "sentence_completion",
              topic: "community",
              estimatedBand: 5.5,
              prompt: "Contact mobile number: 07700 ____",
              correctAnswer: "900814",
              explanation: "Vikram states: zero seven seven zero zero, nine zero zero eight one four.",
              evidence: "zero seven seven zero zero, nine zero zero eight one four."
            },
            {
              id: "l6-q4",
              questionNumber: 4,
              type: "sentence_completion",
              topic: "finance",
              estimatedBand: 6.0,
              prompt: "Annual cost of Standard Membership: £____",
              correctAnswer: "35",
              explanation: "Clare confirms Standard tier is thirty-five pounds.",
              evidence: "Standard Membership costs thirty-five pounds per year"
            },
            {
              id: "l6-q5",
              questionNumber: 5,
              type: "sentence_completion",
              topic: "community",
              estimatedBand: 6.0,
              prompt: "Maximum number of hand tools borrowed at one time: ____",
              correctAnswer: "five",
              explanation: "Clare explains: 'borrow up to five hand tools simultaneously.'",
              evidence: "borrow up to five hand tools simultaneously."
            },
            {
              id: "l6-q6",
              questionNumber: 6,
              type: "sentence_completion",
              topic: "community",
              estimatedBand: 6.0,
              prompt: "Borrowing limit for high-demand items (e.g. pressure washers): ____ days.",
              correctAnswer: ["3", "three"],
              explanation: "Clare states high-demand items have a limit of three days.",
              evidence: "maximum borrowing limit of three days so that other members can access them."
            },
            {
              id: "l6-q7",
              questionNumber: 7,
              type: "sentence_completion",
              topic: "community",
              estimatedBand: 6.5,
              prompt: "Required identification: photo ID and a recent ____ bill.",
              correctAnswer: "utility",
              explanation: "Clare specifies: 'plus a recent utility bill dated within the last three months'.",
              evidence: "plus a recent utility bill dated within the last three months to verify your address."
            },
            {
              id: "l6-q8",
              questionNumber: 8,
              type: "sentence_completion",
              topic: "community",
              estimatedBand: 6.0,
              prompt: "Sunday closing time: ____ PM.",
              correctAnswer: ["2", "two", "2:00"],
              explanation: "Clare states Sunday hours: ten in the morning until two in the afternoon.",
              evidence: "On Sundays we open slightly later, from ten in the morning until two in the afternoon."
            },
            {
              id: "l6-q9",
              questionNumber: 9,
              type: "sentence_completion",
              topic: "community",
              estimatedBand: 6.5,
              prompt: "After-hours returns for hand tools: use the ____ box near the side gate.",
              correctAnswer: "drop",
              explanation: "Clare states hand tools can be returned via our secure drop box.",
              evidence: "returned via our secure drop box located beside the side gate"
            },
            {
              id: "l6-q10",
              questionNumber: 10,
              type: "sentence_completion",
              topic: "community",
              estimatedBand: 6.5,
              prompt: "Motorized equipment must be returned to ____ during opening hours.",
              correctAnswer: "staff",
              explanation: "Clare notes motorized equipment must be returned in person during staff hours.",
              evidence: "returned in person during staff hours."
            }
          ]
        }
      ]
    },
    {
      sectionNumber: 2,
      title: "Guided Tour of Port Philip Wildlife Sanctuary",
      contextDescription: "Ranger Chloe (Australian English speaker) giving an introductory orientation talk to a group of visitors at the Port Philip Wildlife Sanctuary.",
      audioScript: [
        { "speaker": "Ranger Chloe (Australian)", "text": "G'day everyone, and welcome to Port Philip Wildlife Sanctuary! My name is Chloe, and I am the head conservation ranger here. Before we head out along the boardwalks into the coastal wetlands, I want to give you a quick briefing on our sanctuary's history, current conservation programs, and safety guidelines." },
        { "speaker": "Ranger Chloe (Australian)", "text": "Port Philip Sanctuary was established in 1984 on an old industrial salt pan. Through three decades of tidal rehabilitation, we have successfully restored ninety hectares of native mangrove forest and saltmarsh. This habitat now serves as an essential feeding ground for over one hundred and twenty species of migratory shorebirds, many flying all the way from Siberia and Alaska along the East Asian-Australasian Flyway." },
        { "speaker": "Ranger Chloe (Australian)", "text": "Our flagship success story is the southern brown bandicoot. In 2012, feral foxes had brought this small marsupial to the brink of localized extinction. Thanks to our predator-proof electric perimeter fence and rigorous feral animal trapping, our founder colony of twenty bandicoots has expanded to an estimated four hundred and fifty individuals today." },
        { "speaker": "Ranger Chloe (Australian)", "text": "Now, let me orient you to our sanctuary map. Right now, we are gathered at the Visitor Welcome Pavilion at the southern entrance. Directly ahead of you to the north, you will see the Central Wetland Lagoon. If you follow the main timber boardwalk heading northwest, you will arrive at the Pelican Viewing Hide at location A. It is best to visit the hide at two PM during the daily pelican feeding talk." },
        { "speaker": "Ranger Chloe (Australian)", "text": "If you instead turn northeast from the Welcome Pavilion, location B on your map marks our Native Wildlife Rehabilitation Clinic. You can look through the observation windows to watch our veterinary nurses treating injured flying foxes and echidnas." },
        { "speaker": "Ranger Chloe (Australian)", "text": "Continuing past the clinic along the outer eastern fence line brings you to location C, the Nocturnal Marsupial Enclosure. This enclosure is specially inverted with red ambient lighting, allowing visitors to view sugar gliders and potoroos active during daylight hours." },
        { "speaker": "Ranger Chloe (Australian)", "text": "Finally, at the far northern tip of the lagoon, marked as location D, is our Bush Tucker Botanical Garden. Here, our indigenous rangers lead daily thirty-minute edible plant workshops at eleven in the morning and three in the afternoon." },
        { "speaker": "Ranger Chloe (Australian)", "text": "Just two final rules before you head out: please stay strictly on the raised timber boardwalks to avoid trampling ground-nesting dotterel eggs, and remember that no external food is permitted beyond the picnic lawns. Have a wonderful day exploring!" }
      ],
      questionGroups: [
        {
          groupInstruction: "Choose the correct letter, A, B, or C. Write your answers in boxes 11–16.",
          questionType: "multiple_choice_single",
          questions: [
            {
              id: "l6-q11",
              questionNumber: 11,
              type: "multiple_choice_single",
              topic: "conservation",
              estimatedBand: 6.0,
              prompt: "The Port Philip Wildlife Sanctuary was originally built on",
              options: [
                "A) an abandoned coal mine.",
                "B) a commercial salt pan.",
                "C) a municipal rubbish dump."
              ],
              correctAnswer: "B",
              explanation: "Ranger Chloe explains the sanctuary was established in 1984 on an old industrial salt pan.",
              evidence: "Port Philip Sanctuary was established in 1984 on an old industrial salt pan."
            },
            {
              id: "l6-q12",
              questionNumber: 12,
              type: "multiple_choice_single",
              topic: "wildlife",
              estimatedBand: 6.5,
              prompt: "Many migratory birds that visit the wetlands fly from as far away as",
              options: [
                "A) southern Africa and Madagascar.",
                "B) Siberia and Alaska.",
                "C) Scandinavia and Iceland."
              ],
              correctAnswer: "B",
              explanation: "Ranger Chloe mentions birds 'flying all the way from Siberia and Alaska'.",
              evidence: "migratory shorebirds, many flying all the way from Siberia and Alaska along the East Asian-Australasian Flyway."
            },
            {
              id: "l6-q13",
              questionNumber: 13,
              type: "multiple_choice_single",
              topic: "ecology",
              estimatedBand: 6.5,
              prompt: "The primary threat to the southern brown bandicoot prior to 2012 was",
              options: [
                "A) introduced feral foxes.",
                "B) brushfire damage.",
                "C) parasitic disease."
              ],
              correctAnswer: "A",
              explanation: "Ranger Chloe states feral foxes had brought the marsupial to the brink of extinction.",
              evidence: "In 2012, feral foxes had brought this small marsupial to the brink of localized extinction."
            },
            {
              id: "l6-q14",
              questionNumber: 14,
              type: "multiple_choice_single",
              topic: "conservation",
              estimatedBand: 6.0,
              prompt: "The current population of bandicoots in the sanctuary is approximately",
              options: [
                "A) 20.",
                "B) 120.",
                "C) 450."
              ],
              correctAnswer: "C",
              explanation: "Chloe states the colony has expanded to an estimated four hundred and fifty individuals.",
              evidence: "founder colony of twenty bandicoots has expanded to an estimated four hundred and fifty individuals today."
            },
            {
              id: "l6-q15",
              questionNumber: 15,
              type: "multiple_choice_single",
              topic: "visitor guidelines",
              estimatedBand: 6.0,
              prompt: "Visitors must remain on boardwalks to avoid damaging",
              options: [
                "A) delicate mangrove root systems.",
                "B) ground-nesting bird eggs.",
                "C) underground electrical cables."
              ],
              correctAnswer: "B",
              explanation: "Chloe says: 'stay strictly on the raised timber boardwalks to avoid trampling ground-nesting dotterel eggs'.",
              evidence: "stay strictly on the raised timber boardwalks to avoid trampling ground-nesting dotterel eggs"
            },
            {
              id: "l6-q16",
              questionNumber: 16,
              type: "multiple_choice_single",
              topic: "visitor guidelines",
              estimatedBand: 5.5,
              prompt: "External food is only permitted in the",
              options: [
                "A) picnic lawns.",
                "B) welcome pavilion cafe.",
                "C) pelican hide."
              ],
              correctAnswer: "A",
              explanation: "Chloe says 'no external food is permitted beyond the picnic lawns.'",
              evidence: "no external food is permitted beyond the picnic lawns."
            }
          ]
        },
        {
          groupInstruction: "Label the map below. Write the correct letter, A–D, next to Questions 17–20.",
          questionType: "diagram_label_completion",
          questions: [
            {
              id: "l6-q17",
              questionNumber: 17,
              type: "diagram_label_completion",
              topic: "map",
              estimatedBand: 6.5,
              prompt: "Pelican Viewing Hide: Location ____",
              correctAnswer: "A",
              explanation: "Ranger Chloe describes following the main boardwalk northwest to arrive at the Pelican Viewing Hide at location A.",
              evidence: "timber boardwalk heading northwest, you will arrive at the Pelican Viewing Hide at location A."
            },
            {
              id: "l6-q18",
              questionNumber: 18,
              type: "diagram_label_completion",
              topic: "map",
              estimatedBand: 6.5,
              prompt: "Native Wildlife Rehabilitation Clinic: Location ____",
              correctAnswer: "B",
              explanation: "Chloe states: 'turn northeast from the Welcome Pavilion, location B on your map marks our Native Wildlife Rehabilitation Clinic.'",
              evidence: "turn northeast from the Welcome Pavilion, location B on your map marks our Native Wildlife Rehabilitation Clinic."
            },
            {
              id: "l6-q19",
              questionNumber: 19,
              type: "diagram_label_completion",
              topic: "map",
              estimatedBand: 7.0,
              prompt: "Nocturnal Marsupial Enclosure: Location ____",
              correctAnswer: "C",
              explanation: "Chloe states: 'Continuing past the clinic along the outer eastern fence line brings you to location C, the Nocturnal Marsupial Enclosure.'",
              evidence: "Continuing past the clinic along the outer eastern fence line brings you to location C, the Nocturnal Marsupial Enclosure."
            },
            {
              id: "l6-q20",
              questionNumber: 20,
              type: "diagram_label_completion",
              topic: "map",
              estimatedBand: 6.5,
              prompt: "Bush Tucker Botanical Garden: Location ____",
              correctAnswer: "D",
              explanation: "Chloe states: 'Finally, at the far northern tip of the lagoon, marked as location D, is our Bush Tucker Botanical Garden.'",
              evidence: "far northern tip of the lagoon, marked as location D, is our Bush Tucker Botanical Garden."
            }
          ]
        }
      ]
    },
    {
      sectionNumber: 3,
      title: "Undergraduate Seminar on Vertical Farming Feasibility",
      contextDescription: "Professor Davis (British English), Elena (North American English), and Arjun (Indian English) discussing their environmental engineering research presentation on commercial vertical farming.",
      audioScript: [
        { "speaker": "Professor Davis (British)", "text": "Good morning Elena, Arjun. I have reviewed your draft slides comparing vertical indoor farming with conventional open-field agriculture. Overall, your agronomic data is robust, but I want to ensure your economic and energy analysis is equally critical." },
        { "speaker": "Elena (North American)", "text": "Thanks, Professor Davis. In our initial slides, we highlight the tremendous resource efficiency. For example, closed-loop aeroponic systems use up to ninety-five percent less water than traditional flood irrigation, because excess nutrient mist is condensed and recycled indefinitely." },
        { "speaker": "Arjun (Indian English)", "text": "Yes, and because growing conditions inside a sealed vertical warehouse are completely isolated from external weather, crops are immune to catastrophic droughts or unseasonal hailstorms. Furthermore, indoor farming eliminates the need for chemical insecticides and synthetic herbicides entirely." },
        { "speaker": "Professor Davis (British)", "text": "Those environmental points are well documented. But what about the capital expenditure and power consumption? That is where several high-profile vertical farming startups have gone bankrupt in recent years." },
        { "speaker": "Elena (North American)", "text": "Right. We found that artificial LED grow lighting and industrial HVAC climate control account for nearly fifty-five percent of ongoing operational costs. Unless a facility is directly powered by dedicated onsite solar or geothermal energy, the carbon footprint of grid electricity can actually exceed that of long-haul refrigerated trucking." },
        { "speaker": "Arjun (Indian English)", "text": "Exactly. That is why our case study concludes that vertical farming is currently only commercially viable for high-value perishable crops like microgreens, baby spinach, culinary herbs, and strawberries. Staple calorie crops like wheat, rice, and potatoes require far too much light energy per calorie to be financially viable." },
        { "speaker": "Professor Davis (British)", "text": "Excellent insight. Now, how are you dividing the presentation roles for Tuesday?" },
        { "speaker": "Elena (North American)", "text": "I will deliver the introduction and explain the biological systems: aeroponics versus nutrient film technique hydroponics." },
        { "speaker": "Arjun (Indian English)", "text": "And I will present the financial model, comparing commercial warehouse rental costs in downtown Tokyo and Singapore with rural logistics hubs." },
        { "speaker": "Professor Davis (British)", "text": "Very well. Make sure you leave at least ten minutes at the end for questions from your classmates." }
      ],
      questionGroups: [
        {
          groupInstruction: "Choose the correct letter, A, B, or C. Write your answers in boxes 21–26.",
          questionType: "multiple_choice_single",
          questions: [
            {
              id: "l6-q21",
              questionNumber: 21,
              type: "multiple_choice_single",
              topic: "agriculture",
              estimatedBand: 7.0,
              prompt: "Closed-loop aeroponics uses ninety-five percent less water because",
              options: [
                "A) plants absorb moisture directly from rainfall.",
                "B) nutrient mist is captured, condensed, and reused.",
                "C) plants are genetically engineered to require zero water."
              ],
              correctAnswer: "B",
              explanation: "Elena states excess nutrient mist is condensed and recycled indefinitely.",
              evidence: "aeroponic systems use up to ninety-five percent less water than traditional flood irrigation, because excess nutrient mist is condensed and recycled indefinitely."
            },
            {
              id: "l6-q22",
              questionNumber: 22,
              type: "multiple_choice_single",
              topic: "agriculture",
              estimatedBand: 6.5,
              prompt: "One major ecological benefit mentioned by Arjun is that indoor farming",
              options: [
                "A) enriches surrounding soil with worms.",
                "B) requires no chemical insecticides or herbicides.",
                "C) creates habitats for wild birds."
              ],
              correctAnswer: "B",
              explanation: "Arjun notes indoor farming eliminates the need for chemical insecticides and synthetic herbicides entirely.",
              evidence: "indoor farming eliminates the need for chemical insecticides and synthetic herbicides entirely."
            },
            {
              id: "l6-q23",
              questionNumber: 23,
              type: "multiple_choice_single",
              topic: "energy",
              estimatedBand: 7.5,
              prompt: "What percentage of ongoing operational costs is typically consumed by lighting and HVAC?",
              options: [
                "A) Approximately 30%.",
                "B) Nearly 55%.",
                "C) Over 80%."
              ],
              correctAnswer: "B",
              explanation: "Elena states artificial LED grow lighting and HVAC account for nearly fifty-five percent of operational costs.",
              evidence: "artificial LED grow lighting and industrial HVAC climate control account for nearly fifty-five percent of ongoing operational costs."
            },
            {
              id: "l6-q24",
              questionNumber: 24,
              type: "multiple_choice_single",
              topic: "economics",
              estimatedBand: 7.0,
              prompt: "Vertical farming can produce a higher carbon footprint than traditional farming if it",
              options: [
                "A) uses heavy diesel tractors.",
                "B) relies on standard electrical grid power.",
                "C) exports products by air freight."
              ],
              correctAnswer: "B",
              explanation: "Elena explains that unless powered by onsite renewables, grid electricity footprint can exceed refrigerated trucking.",
              evidence: "Unless a facility is directly powered by dedicated onsite solar or geothermal energy, the carbon footprint of grid electricity can actually exceed that of long-haul refrigerated trucking."
            },
            {
              id: "l6-q25",
              questionNumber: 25,
              type: "multiple_choice_single",
              topic: "agronomy",
              estimatedBand: 7.0,
              prompt: "Why are staple crops like wheat and potatoes unsuitable for vertical farming?",
              options: [
                "A) They cannot grow without natural soil bacteria.",
                "B) They require too much electrical lighting energy per calorie.",
                "C) They attract too many rodent pests into warehouses."
              ],
              correctAnswer: "B",
              explanation: "Arjun explains staple calorie crops require far too much light energy per calorie to be financially viable.",
              evidence: "Staple calorie crops like wheat, rice, and potatoes require far too much light energy per calorie to be financially viable."
            },
            {
              id: "l6-q26",
              questionNumber: 26,
              type: "multiple_choice_single",
              topic: "education",
              estimatedBand: 6.5,
              prompt: "How much time should the students reserve for audience questions?",
              options: [
                "A) Five minutes.",
                "B) At least ten minutes.",
                "C) Fifteen minutes."
              ],
              correctAnswer: "B",
              explanation: "Professor Davis advises: 'leave at least ten minutes at the end for questions from your classmates.'",
              evidence: "Make sure you leave at least ten minutes at the end for questions from your classmates."
            }
          ]
        },
        {
          groupInstruction: "Which student or speaker is responsible for presenting each topic below? Write the correct letter, A, B, or C, in boxes 27–30.\nA: Elena\nB: Arjun\nC: Professor Davis",
          questionType: "matching",
          questions: [
            {
              id: "l6-q27",
              questionNumber: 27,
              type: "matching",
              topic: "presentation",
              estimatedBand: 6.5,
              prompt: "Delivering the introductory overview and biological growing systems.",
              correctAnswer: "A",
              explanation: "Elena states she will deliver the introduction and explain the biological systems.",
              evidence: "Elena: I will deliver the introduction and explain the biological systems"
            },
            {
              id: "l6-q28",
              questionNumber: 28,
              type: "matching",
              topic: "presentation",
              estimatedBand: 7.0,
              prompt: "Comparing urban warehouse rental costs in Tokyo and Singapore.",
              correctAnswer: "B",
              explanation: "Arjun states he will present warehouse rental costs in Tokyo and Singapore.",
              evidence: "Arjun: And I will present the financial model, comparing commercial warehouse rental costs in downtown Tokyo and Singapore"
            },
            {
              id: "l6-q29",
              questionNumber: 29,
              type: "matching",
              topic: "presentation",
              estimatedBand: 6.5,
              prompt: "Explaining nutrient film technique hydroponics.",
              correctAnswer: "A",
              explanation: "Elena states she will explain aeroponics versus nutrient film technique hydroponics.",
              evidence: "Elena: aeroponics versus nutrient film technique hydroponics."
            },
            {
              id: "l6-q30",
              questionNumber: 30,
              type: "matching",
              topic: "presentation",
              estimatedBand: 7.0,
              prompt: "Analyzing logistics hub transport costs.",
              correctAnswer: "B",
              explanation: "Arjun states he will compare urban costs with rural logistics hubs.",
              evidence: "Arjun: with rural logistics hubs."
            }
          ]
        }
      ]
    },
    {
      sectionNumber: 4,
      title: "Academic Lecture on Soundscape Ecology and Marine Noise Pollution",
      contextDescription: "Dr. Alistair Finch (British English speaker) delivering a university biology lecture on anthropogenic ocean noise and acoustic masking in marine mammals.",
      audioScript: [
        { "speaker": "Dr. Finch (British)", "text": "Good afternoon, students. Today we explore soundscape ecology within marine environments. For terrestrial organisms, vision is the dominant perceptual modality. However, because seawater rapidly absorbs and scatters optical wavelengths, light penetrates only into the upper epipelagic zone. In contrast, acoustic pressure waves travel nearly four point five times faster through seawater than through atmospheric air, attenuating remarkably slowly over thousands of kilometers. Consequently, marine organisms have evolved to rely on sound for navigating, foraging, communicating, and evading predators." },
        { "speaker": "Dr. Finch (British)", "text": "Over the past seventy years, however, the acoustic environment of the global ocean has been radically altered by human industrial activity. The most pervasive chronic contributor is commercial container shipping. Low-frequency propeller cavitation—the rapid collapse of microscopic vapor bubbles generated by churning propeller blades—produces a persistent acoustic drone centered between twenty and two hundred Hertz. Because this frequency band overlaps precisely with the vocalizations of baleen whales, shipping noise creates severe acoustic masking, reducing the effective communication range of blue and fin whales by up to ninety percent." },
        { "speaker": "Dr. Finch (British)", "text": "An even more violent, acute threat comes from marine seismic exploration conducted by offshore hydrocarbon corporations. Survey vessels tow arrays of high-pressure seismic airguns that discharge explosive acoustic blasts into the seabed every ten to twelve seconds for months on end. These acoustic impulses exceed two hundred and fifty decibels at the source. Marine biologists have documented that seismic blasts trigger catastrophic acoustic trauma in odontocetes—such as sperm whales and beaked whales—causing internal auditory hemorrhaging and panic-induced rapid ascents that lead to fatal decompression sickness." },
        { "speaker": "Dr. Finch (British)", "text": "Fortunately, innovative engineering solutions exist. Marine architects are developing silent propeller designs with refined hydrofoil curvature and air-injection bubble curtains that dampen propeller cavitation noise by fifteen decibels. Furthermore, several international maritime authorities have instituted seasonal vessel speed reductions in critical migratory corridors. Decreasing ship speed by just ten percent has been shown to reduce vessel acoustic emissions by approximately fifty percent, providing an immediate, low-cost reprieve for vulnerable marine ecosystems." }
      ],
      questionGroups: [
        {
          groupInstruction: "Complete the notes below. Write NO MORE THAN TWO WORDS AND/OR A NUMBER for each answer. Write your answers in boxes 31–40.",
          questionType: "sentence_completion",
          questions: [
            {
              id: "l6-q31",
              questionNumber: 31,
              type: "sentence_completion",
              topic: "physics",
              estimatedBand: 7.0,
              prompt: "Sound travels approximately ____ times faster in seawater than in air.",
              correctAnswer: ["4.5", "four point five"],
              explanation: "Dr. Finch states sound travels nearly four point five times faster through seawater.",
              evidence: "acoustic pressure waves travel nearly four point five times faster through seawater than through atmospheric air"
            },
            {
              id: "l6-q32",
              questionNumber: 32,
              type: "sentence_completion",
              topic: "marine biology",
              estimatedBand: 6.5,
              prompt: "The most persistent source of chronic ocean noise is commercial ____ shipping.",
              correctAnswer: "container",
              explanation: "Dr. Finch identifies commercial container shipping as the most pervasive contributor.",
              evidence: "The most pervasive chronic contributor is commercial container shipping."
            },
            {
              id: "l6-q33",
              questionNumber: 33,
              type: "sentence_completion",
              topic: "engineering",
              estimatedBand: 7.5,
              prompt: "Propeller noise is primarily generated by a process called ____ cavitation.",
              correctAnswer: "propeller",
              explanation: "Dr. Finch refers to low-frequency propeller cavitation.",
              evidence: "Low-frequency propeller cavitation—the rapid collapse of microscopic vapor bubbles"
            },
            {
              id: "l6-q34",
              questionNumber: 34,
              type: "sentence_completion",
              topic: "physics",
              estimatedBand: 7.0,
              prompt: "Propeller noise frequencies center between 20 and ____ Hertz.",
              correctAnswer: ["200", "two hundred"],
              explanation: "Dr. Finch states the drone is centered between twenty and two hundred Hertz.",
              evidence: "persistent acoustic drone centered between twenty and two hundred Hertz."
            },
            {
              id: "l6-q35",
              questionNumber: 35,
              type: "sentence_completion",
              topic: "marine biology",
              estimatedBand: 7.0,
              prompt: "Vessel noise causes severe acoustic ____, disrupting whale communication.",
              correctAnswer: "masking",
              explanation: "Dr. Finch states shipping noise creates severe acoustic masking.",
              evidence: "shipping noise creates severe acoustic masking, reducing the effective communication range"
            },
            {
              id: "l6-q36",
              questionNumber: 36,
              type: "sentence_completion",
              topic: "geology",
              estimatedBand: 7.5,
              prompt: "Seismic exploration uses high-pressure airguns fired every 10 to ____ seconds.",
              correctAnswer: ["12", "twelve"],
              explanation: "Dr. Finch notes airguns discharge blasts every ten to twelve seconds.",
              evidence: "high-pressure seismic airguns that discharge explosive acoustic blasts into the seabed every ten to twelve seconds"
            },
            {
              id: "l6-q37",
              questionNumber: 37,
              type: "sentence_completion",
              topic: "physics",
              estimatedBand: 7.5,
              prompt: "Seismic airgun sound impulses can exceed ____ decibels at the source.",
              correctAnswer: ["250", "two hundred and fifty"],
              explanation: "Dr. Finch states impulses exceed two hundred and fifty decibels at the source.",
              evidence: "These acoustic impulses exceed two hundred and fifty decibels at the source."
            },
            {
              id: "l6-q38",
              questionNumber: 38,
              type: "sentence_completion",
              topic: "marine biology",
              estimatedBand: 8.0,
              prompt: "Rapid panic ascents in deep-diving whales can trigger fatal decompression ____.",
              correctAnswer: "sickness",
              explanation: "Dr. Finch mentions rapid ascents that lead to fatal decompression sickness.",
              evidence: "rapid ascents that lead to fatal decompression sickness."
            },
            {
              id: "l6-q39",
              questionNumber: 39,
              type: "sentence_completion",
              topic: "engineering",
              estimatedBand: 7.5,
              prompt: "Engineers are dampening cavitation sounds using air-injection ____ curtains.",
              correctAnswer: "bubble",
              explanation: "Dr. Finch highlights air-injection bubble curtains.",
              evidence: "air-injection bubble curtains that dampen propeller cavitation noise by fifteen decibels."
            },
            {
              id: "l6-q40",
              questionNumber: 40,
              type: "sentence_completion",
              topic: "conservation",
              estimatedBand: 7.0,
              prompt: "A 10 percent reduction in vessel speed cuts acoustic emissions by around ____ percent.",
              correctAnswer: ["50", "fifty"],
              explanation: "Dr. Finch notes reducing speed by ten percent cuts emissions by approximately fifty percent.",
              evidence: "Decreasing ship speed by just ten percent has been shown to reduce vessel acoustic emissions by approximately fifty percent"
            }
          ]
        }
      ]
    }
  ]
};

fs.writeFileSync(
  path.resolve('./content/listening/listening-test-06.json'),
  JSON.stringify(listeningTest06, null, 2),
  'utf8'
);
console.log('✓ Created listening-test-06.json');
