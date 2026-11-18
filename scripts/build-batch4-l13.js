import fs from 'fs';
import path from 'path';

const listeningTest13 = {
  id: "list-test-13",
  title: "Listening Practice Test 13",
  difficulty: "hard",
  timeLimitMinutes: 40,
  sections: [
    {
      sectionNumber: 1,
      title: "Heritage Orchard Apple Tree Adoption Scheme",
      contextDescription: "Rohan (Indian English speaker) enquiring with Orchard Coordinator Sarah (British English speaker) about adopting an endangered heritage cider apple tree at the Kent Community Orchard Trust.",
      audioScript: [
        { "speaker": "Sarah (British)", "text": "Good morning! Kent Heritage Orchard Trust. Sarah speaking." },
        { "speaker": "Rohan (Indian English)", "text": "Good morning, Sarah! My name is Rohan Kapoor. I read an article about your community orchard conservation scheme where local residents can adopt and sponsor a rare heritage fruit tree." },
        { "speaker": "Sarah (British)", "text": "Delighted you called, Rohan! Yes, we safeguard over two hundred endangered Victorian and Georgian apple, pear, and plum varieties. Let me take down your sponsorship registration details." },
        { "speaker": "Rohan (Indian English)", "text": "Wonderful. My first name is Rohan, spelled R-O-H-A-N, and surname Kapoor, K-A-P-O-O-R." },
        { "speaker": "Sarah (British)", "text": "Thank you, Rohan. And what is your postal address?" },
        { "speaker": "Rohan (Indian English)", "text": "It is fifteen Millfield Crescent, Canterbury, postcode C-T-two, eight-J-P." },
        { "speaker": "Sarah (British)", "text": "C-T-two, eight-J-P. And your contact mobile number?" },
        { "speaker": "Rohan (Indian English)", "text": "Yes, it is zero seven seven zero zero, nine zero zero six four one." },
        { "speaker": "Sarah (British)", "text": "Perfect. Now regarding adoption tiers, our standard Tree Guardian sponsorship costs sixty pounds annually. That includes a customized engraved wooden tree plaque, an adoption certificate, and invitations to our seasonal blossom and harvest festivals." },
        { "speaker": "Rohan (Indian English)", "text": "Sixty pounds sounds lovely. Do sponsors also receive a portion of the harvest?" },
        { "speaker": "Sarah (British)", "text": "Yes! Every autumn in October, you are invited to our Harvest Day to personally pick up to twenty kilograms of fresh organic fruit from your adopted tree, plus you receive two bottles of artisanal pressed apple juice." },
        { "speaker": "Rohan (Indian English)", "text": "That is fantastic! What tree variety would you recommend for me?" },
        { "speaker": "Sarah (British)", "text": "I highly recommend the Ashmead's Kernel. It is an extraordinary 1700 Gloucestershire russet variety with intense aromatic pear-drop and hazelnut flavors, and it keeps crisp in cold storage for up to four months." },
        { "speaker": "Rohan (Indian English)", "text": "The Ashmead's Kernel sounds marvelous. When is your next volunteer winter pruning workshop?" },
        { "speaker": "Sarah (British)", "text": "Our master pruner leads a winter restoration session on Saturday, February the eighth, starting at nine thirty AM in the Cider Barn." },
        { "speaker": "Rohan (Indian English)", "text": "Saturday, February the eighth. Thank you so much, Sarah! I will complete the online payment today." }
      ],
      questionGroups: [
        {
          groupInstruction: "Complete the form below. Write NO MORE THAN TWO WORDS AND/OR A NUMBER for each answer. Write your answers in boxes 1–10.",
          questionType: "sentence_completion",
          questions: [
            {
              id: "l13-q1",
              questionNumber: 1,
              type: "sentence_completion",
              topic: "customer enquiry",
              estimatedBand: 5.5,
              prompt: "Sponsor surname: ____",
              correctAnswer: "Kapoor",
              explanation: "Rohan spells his surname: K-A-P-O-O-R.",
              evidence: "surname Kapoor, K-A-P-O-O-R."
            },
            {
              id: "l13-q2",
              questionNumber: 2,
              type: "sentence_completion",
              topic: "address",
              estimatedBand: 5.5,
              prompt: "Address: 15 ____ Crescent, Canterbury.",
              correctAnswer: "Millfield",
              explanation: "Rohan states: fifteen Millfield Crescent.",
              evidence: "fifteen Millfield Crescent, Canterbury"
            },
            {
              id: "l13-q3",
              questionNumber: 3,
              type: "sentence_completion",
              topic: "postcode",
              estimatedBand: 6.0,
              prompt: "Postcode: ____",
              correctAnswer: ["CT2 8JP", "CT28JP"],
              explanation: "Rohan gives postcode: C-T-two, eight-J-P.",
              evidence: "postcode C-T-two, eight-J-P."
            },
            {
              id: "l13-q4",
              questionNumber: 4,
              type: "sentence_completion",
              topic: "telephone",
              estimatedBand: 5.5,
              prompt: "Mobile telephone: 07700 ____",
              correctAnswer: "900641",
              explanation: "Rohan gives number: zero seven seven zero zero, nine zero zero six four one.",
              evidence: "zero seven seven zero zero, nine zero zero six four one."
            },
            {
              id: "l13-q5",
              questionNumber: 5,
              type: "sentence_completion",
              topic: "finance",
              estimatedBand: 6.0,
              prompt: "Annual Tree Guardian sponsorship: £____",
              correctAnswer: ["60", "sixty"],
              explanation: "Sarah states sponsorship costs sixty pounds annually.",
              evidence: "sponsorship costs sixty pounds annually."
            },
            {
              id: "l13-q6",
              questionNumber: 6,
              type: "sentence_completion",
              topic: "harvest",
              estimatedBand: 6.0,
              prompt: "Sponsors can pick up to ____ kilograms of fruit each autumn.",
              correctAnswer: ["20", "twenty"],
              explanation: "Sarah confirms picking up to twenty kilograms of fresh fruit.",
              evidence: "pick up to twenty kilograms of fresh organic fruit"
            },
            {
              id: "l13-q7",
              questionNumber: 7,
              type: "sentence_completion",
              topic: "botany",
              estimatedBand: 7.0,
              prompt: "Recommended apple variety: Ashmead's ____.",
              correctAnswer: "Kernel",
              explanation: "Sarah recommends the Ashmead's Kernel.",
              evidence: "recommend the Ashmead's Kernel. It is an extraordinary 1700 Gloucestershire russet variety"
            },
            {
              id: "l13-q8",
              questionNumber: 8,
              type: "sentence_completion",
              topic: "storage",
              estimatedBand: 6.5,
              prompt: "This apple can be preserved in cold storage for up to ____ months.",
              correctAnswer: ["4", "four"],
              explanation: "Sarah states it keeps crisp in cold storage for up to four months.",
              evidence: "keeps crisp in cold storage for up to four months."
            },
            {
              id: "l13-q9",
              questionNumber: 9,
              type: "sentence_completion",
              topic: "dates",
              estimatedBand: 6.0,
              prompt: "Winter pruning workshop date: Saturday, February the ____.",
              correctAnswer: ["8th", "8", "eighth"],
              explanation: "Sarah states Saturday, February the eighth.",
              evidence: "Saturday, February the eighth, starting at nine thirty AM"
            },
            {
              id: "l13-q10",
              questionNumber: 10,
              type: "sentence_completion",
              topic: "venue",
              estimatedBand: 6.5,
              prompt: "Workshop venue: the ____ Barn.",
              correctAnswer: "Cider",
              explanation: "Sarah specifies starting at nine thirty AM in the Cider Barn.",
              evidence: "starting at nine thirty AM in the Cider Barn."
            }
          ]
        }
      ]
    },
    {
      sectionNumber: 2,
      title: "Orientation for Volunteers at the Coastal Seabird Rehabilitation Sanctuary",
      contextDescription: "Senior Wildlife Ranger Megan (Australian English speaker) briefing newly inducted volunteer wildlife rescuers at the Penguin and Seabird Marine Hospital.",
      audioScript: [
        { "speaker": "Megan (Australian)", "text": "G'day team, and welcome to Phillip Island Coastal Seabird Rescue Sanctuary! My name is Megan. Our wildlife hospital treats over one thousand sick, oiled, or injured marine birds every single year—including little penguins, short-tailed shearwaters, and Australasian gannets." },
        { "speaker": "Megan (Australian)", "text": "The greatest acute threat our hospital faces is petroleum contamination from offshore shipping collisions and marine bilge dumping. When a seabird's feathers become coated in toxic heavy fuel oil, the microscopic interlocking barbules of their plumage are destroyed. The feathers lose their natural waterproofing and buoyancy, meaning birds succumb to hypothermia in cold ocean currents within hours or ingest lethal hydrocarbons while desperately trying to preen themselves clean." },
        { "speaker": "Megan (Australian)", "text": "Let's review our sanctuary rehabilitation facility layout. Refer to the site plan on your clipboards. We are currently gathered at the Reception & Triage Gate. If you follow the covered breezeway to location A on the southern wing, you will find our Intensive Washroom & Decontamination Bay. Here, stabilized birds undergo gentle four-stage washing using thirty-eight-degree warm water and specialized mild degreasing detergents." },
        { "speaker": "Megan (Australian)", "text": "Directly north of the washroom at location B is the Infrared Warmth & Drying Cleanroom. Freshly washed birds rest under ceramic infrared heat lamps for six hours to thoroughly dry their down plumage without causing thermal stress." },
        { "speaker": "Megan (Australian)", "text": "Location C on the eastern perimeter marks our Saltwater Conditioning Pools. These deep, filtered seawater exercise flumes allow recovering penguins to swim continuously, preening their feathers to re-establish their natural waterproofing oil layer before release." },
        { "speaker": "Megan (Australian)", "text": "Finally, at location D beside the coastal dunes is our Pre-Release Acclimatization Aviary. Here, birds are evaluated for dive endurance and live fish foraging agility." },
        { "speaker": "Megan (Australian)", "text": "Safety note for all volunteers: seabirds possess razor-sharp beaks. Thick neoprene forearm gauntlets and protective eye goggles must be worn whenever handling gannets or cormorants. Let's get started!" }
      ],
      questionGroups: [
        {
          groupInstruction: "Choose the correct letter, A, B, or C. Write your answers in boxes 11–16.",
          questionType: "multiple_choice_single",
          questions: [
            {
              id: "l13-q11",
              questionNumber: 11,
              type: "multiple_choice_single",
              topic: "wildlife",
              estimatedBand: 6.0,
              prompt: "The seabird hospital treats approximately how many marine birds each year?",
              options: [
                "A) 250.",
                "B) 500.",
                "C) Over 1,000."
              ],
              correctAnswer: "C",
              explanation: "Megan states the hospital treats over one thousand sick or injured marine birds every year.",
              evidence: "treats over one thousand sick, oiled, or injured marine birds every single year"
            },
            {
              id: "l13-q12",
              questionNumber: 12,
              type: "multiple_choice_single",
              topic: "biology",
              estimatedBand: 7.0,
              prompt: "Fuel oil is deadly to seabirds primarily because it destroys their plumage's",
              options: [
                "A) color pigments.",
                "B) waterproofing and buoyancy.",
                "C) flight muscle bone structure."
              ],
              correctAnswer: "B",
              explanation: "Megan explains feathers lose their natural waterproofing and buoyancy, causing hypothermia.",
              evidence: "The feathers lose their natural waterproofing and buoyancy, meaning birds succumb to hypothermia"
            },
            {
              id: "l13-q13",
              questionNumber: 13,
              type: "multiple_choice_single",
              topic: "veterinary",
              estimatedBand: 7.0,
              prompt: "Oiled birds are washed in warm water maintained at what temperature?",
              options: [
                "A) 25°C.",
                "B) 38°C.",
                "C) 45°C."
              ],
              correctAnswer: "B",
              explanation: "Megan specifies washing using thirty-eight-degree warm water.",
              evidence: "washing using thirty-eight-degree warm water and specialized mild degreasing detergents."
            },
            {
              id: "l13-q14",
              questionNumber: 14,
              type: "multiple_choice_single",
              topic: "treatment",
              estimatedBand: 6.5,
              prompt: "How long do washed birds remain in the infrared drying cleanroom?",
              options: [
                "A) 2 hours.",
                "B) 6 hours.",
                "C) 24 hours."
              ],
              correctAnswer: "B",
              explanation: "Megan states birds rest under heat lamps for six hours.",
              evidence: "rest under ceramic infrared heat lamps for six hours to thoroughly dry their down plumage"
            },
            {
              id: "l13-q15",
              questionNumber: 15,
              type: "multiple_choice_single",
              topic: "rehabilitation",
              estimatedBand: 7.0,
              prompt: "Penguins swim in saltwater conditioning pools to",
              options: [
                "A) socialize with tourist visitors.",
                "B) re-establish their natural waterproofing oil layer through preening.",
                "C) lay eggs."
              ],
              correctAnswer: "B",
              explanation: "Megan explains swimming allows penguins to preen and re-establish their natural oil layer.",
              evidence: "preening their feathers to re-establish their natural waterproofing oil layer before release."
            },
            {
              id: "l13-q16",
              questionNumber: 16,
              type: "multiple_choice_single",
              topic: "safety",
              estimatedBand: 6.0,
              prompt: "What protective equipment must volunteers wear when handling gannets?",
              options: [
                "A) Leather aprons and steel boots.",
                "B) Neoprene forearm gauntlets and eye goggles.",
                "C) Full-face diving masks."
              ],
              correctAnswer: "B",
              explanation: "Megan states neoprene forearm gauntlets and protective eye goggles must be worn.",
              evidence: "Thick neoprene forearm gauntlets and protective eye goggles must be worn whenever handling gannets"
            }
          ]
        },
        {
          groupInstruction: "Label the map below. Write the correct letter, A–D, next to Questions 17–20.",
          questionType: "diagram_label_completion",
          questions: [
            {
              id: "l13-q17",
              questionNumber: 17,
              type: "diagram_label_completion",
              topic: "map",
              estimatedBand: 6.5,
              prompt: "Intensive Washroom & Decontamination Bay: Location ____",
              correctAnswer: "A",
              explanation: "Megan indicates location A on the southern wing as the Intensive Washroom.",
              evidence: "location A on the southern wing, you will find our Intensive Washroom & Decontamination Bay."
            },
            {
              id: "l13-q18",
              questionNumber: 18,
              type: "diagram_label_completion",
              topic: "map",
              estimatedBand: 6.5,
              prompt: "Infrared Warmth & Drying Cleanroom: Location ____",
              correctAnswer: "B",
              explanation: "Megan indicates location B directly north of the washroom.",
              evidence: "Directly north of the washroom at location B is the Infrared Warmth & Drying Cleanroom."
            },
            {
              id: "l13-q19",
              questionNumber: 19,
              type: "diagram_label_completion",
              topic: "map",
              estimatedBand: 7.0,
              prompt: "Saltwater Conditioning Pools: Location ____",
              correctAnswer: "C",
              explanation: "Megan indicates location C on the eastern perimeter as the Saltwater Conditioning Pools.",
              evidence: "Location C on the eastern perimeter marks our Saltwater Conditioning Pools."
            },
            {
              id: "l13-q20",
              questionNumber: 20,
              type: "diagram_label_completion",
              topic: "map",
              estimatedBand: 6.5,
              prompt: "Pre-Release Acclimatization Aviary: Location ____",
              correctAnswer: "D",
              explanation: "Megan indicates location D beside the coastal dunes.",
              evidence: "Finally, at location D beside the coastal dunes is our Pre-Release Acclimatization Aviary."
            }
          ]
        }
      ]
    },
    {
      sectionNumber: 3,
      title: "Research Methodology Review: Quantifying Soil Carbon Sequestration Using Satellite Remote Sensing",
      contextDescription: "Remote sensing professor Dr. Linda Chen (North American English) reviewing satellite data calibration with graduate researchers Alistair (British English) and Kavita (Indian English).",
      audioScript: [
        { "speaker": "Dr. Chen (North American)", "text": "Good afternoon Alistair, Kavita. Let us review your proposed dissertation methodology on using multi-spectral satellite imagery to quantify soil organic carbon stock across agricultural grasslands." },
        { "speaker": "Alistair (British)", "text": "Thanks, Dr. Chen. Our goal is to replace labor-intensive, destructive manual soil coring with predictive machine learning models driven by European Space Agency Sentinel-2 satellite data and Landsat-9 imagery." },
        { "speaker": "Kavita (Indian English)", "text": "To train our algorithm, we collected three hundred ground-truth soil core samples across forty farms in the Yorkshire Dales. We divided each one-meter core into three depth strata: zero to ten centimeters, ten to thirty centimeters, and thirty to one hundred centimeters. Total organic carbon was measured via dry combustion elemental analysis." },
        { "speaker": "Dr. Chen (North American)", "text": "The ground-truth sampling is robust. But how will you overcome the fundamental limitation of optical satellite remote sensing—namely, that multi-spectral sensors can only measure surface reflectance from bare topsoil, completely blind to carbon beneath vegetative canopies or deeper in the soil column?" },
        { "speaker": "Alistair (British)", "text": "That is where our hybrid feature-fusion model comes in. We combine shortwave infrared surface reflectance with synthetic aperture radar—SAR—from the Sentinel-1 satellite. C-band radar backscatter penetrates vegetation canopies and correlates with soil moisture and surface roughness." },
        { "speaker": "Kavita (Indian English)", "text": "Additionally, we incorporate time-series Normalized Difference Vegetation Index—NDVI—curves over five growing seasons. Peak biomass productivity operates as a mathematical proxy for root exudate carbon inputs into the subterranean profile." },
        { "speaker": "Dr. Chen (North American)", "text": "Very clever. And how will you validate your model's predictive precision?" },
        { "speaker": "Alistair (British)", "text": "We will utilize spatial k-fold cross-validation, reserving twenty percent of our geographic clusters strictly for blind test evaluation. We target an R-squared coefficient of determination above zero point eight." },
        { "speaker": "Dr. Chen (North American)", "text": "Impressive. Ensure your final presentation highlights the international carbon credit verification implications." }
      ],
      questionGroups: [
        {
          groupInstruction: "Choose the correct letter, A, B, or C. Write your answers in boxes 21–26.",
          questionType: "multiple_choice_single",
          questions: [
            {
              id: "l13-q21",
              questionNumber: 21,
              type: "multiple_choice_single",
              topic: "remote sensing",
              estimatedBand: 7.5,
              prompt: "The primary purpose of the students' research is to",
              options: [
                "A) measure volcanic ash plumes in the atmosphere.",
                "B) estimate soil carbon using satellite data to reduce physical core sampling.",
                "C) count the number of cows grazing on farms."
              ],
              correctAnswer: "B",
              explanation: "Alistair states the goal is to replace manual soil coring with predictive satellite models.",
              evidence: "replace labor-intensive, destructive manual soil coring with predictive machine learning models driven by European Space Agency Sentinel-2"
            },
            {
              id: "l13-q22",
              questionNumber: 22,
              type: "multiple_choice_single",
              topic: "soil science",
              estimatedBand: 7.0,
              prompt: "How many ground-truth soil core samples were collected across Yorkshire farms?",
              options: [
                "A) 100.",
                "B) 300.",
                "C) 600."
              ],
              correctAnswer: "B",
              explanation: "Kavita states they collected three hundred ground-truth soil core samples.",
              evidence: "we collected three hundred ground-truth soil core samples across forty farms"
            },
            {
              id: "l13-q23",
              questionNumber: 23,
              type: "multiple_choice_single",
              topic: "remote sensing",
              estimatedBand: 8.0,
              prompt: "What major limitation of optical satellite sensors was identified by Dr. Chen?",
              options: [
                "A) They cannot operate in freezing temperatures.",
                "B) They only capture surface reflectance and cannot see beneath vegetation.",
                "C) Their batteries run out during night orbits."
              ],
              correctAnswer: "B",
              explanation: "Dr. Chen explains sensors only measure surface reflectance from bare topsoil, blind beneath canopies.",
              evidence: "multi-spectral sensors can only measure surface reflectance from bare topsoil, completely blind to carbon beneath vegetative canopies"
            },
            {
              id: "l13-q24",
              questionNumber: 24,
              type: "multiple_choice_single",
              topic: "radar",
              estimatedBand: 7.5,
              prompt: "Synthetic Aperture Radar (SAR) is added to the model because radar waves can",
              options: [
                "A) measure wind speed over oceans.",
                "B) penetrate vegetation canopies and evaluate soil moisture.",
                "C) detect underground gold mines."
              ],
              correctAnswer: "B",
              explanation: "Alistair notes C-band radar penetrates vegetation canopies and correlates with soil moisture.",
              evidence: "C-band radar backscatter penetrates vegetation canopies and correlates with soil moisture and surface roughness."
            },
            {
              id: "l13-q25",
              questionNumber: 25,
              type: "multiple_choice_single",
              topic: "machine learning",
              estimatedBand: 8.0,
              prompt: "What percentage of geographic clusters is withheld for blind model validation?",
              options: [
                "A) 10%.",
                "B) 20%.",
                "C) 50%."
              ],
              correctAnswer: "B",
              explanation: "Alistair states reserving twenty percent of geographic clusters strictly for blind test evaluation.",
              evidence: "reserving twenty percent of our geographic clusters strictly for blind test evaluation."
            },
            {
              id: "l13-q26",
              questionNumber: 26,
              type: "multiple_choice_single",
              topic: "statistics",
              estimatedBand: 7.5,
              prompt: "The researchers target a coefficient of determination (R-squared) above",
              options: [
                "A) 0.5.",
                "B) 0.8.",
                "C) 0.95."
              ],
              correctAnswer: "B",
              explanation: "Alistair states: 'target an R-squared coefficient of determination above zero point eight.'",
              evidence: "target an R-squared coefficient of determination above zero point eight."
            }
          ]
        },
        {
          groupInstruction: "Which student proposed or explained each methodology component? Write the correct letter, A or B, in boxes 27–30.\nA: Alistair\nB: Kavita",
          questionType: "matching",
          questions: [
            {
              id: "l13-q27",
              questionNumber: 27,
              type: "matching",
              topic: "methodology",
              estimatedBand: 7.0,
              prompt: "Proposing Sentinel-2 and Landsat-9 satellite imagery as the primary optical data source.",
              correctAnswer: "A",
              explanation: "Alistair presents using Sentinel-2 and Landsat-9 imagery.",
              evidence: "Alistair: driven by European Space Agency Sentinel-2 satellite data and Landsat-9 imagery."
            },
            {
              id: "l13-q28",
              questionNumber: 28,
              type: "matching",
              topic: "methodology",
              estimatedBand: 7.5,
              prompt: "Describing the three-layer soil coring depths and dry combustion carbon analysis.",
              correctAnswer: "B",
              explanation: "Kavita explains the three depth strata and dry combustion analysis.",
              evidence: "Kavita: divided each one-meter core into three depth strata... measured via dry combustion elemental analysis."
            },
            {
              id: "l13-q29",
              questionNumber: 29,
              type: "matching",
              topic: "methodology",
              estimatedBand: 8.0,
              prompt: "Integrating Sentinel-1 radar backscatter to overcome canopy obstruction.",
              correctAnswer: "A",
              explanation: "Alistair explains combining optical data with Sentinel-1 SAR.",
              evidence: "Alistair: We combine shortwave infrared surface reflectance with synthetic aperture radar—SAR—from the Sentinel-1 satellite."
            },
            {
              id: "l13-q30",
              questionNumber: 30,
              type: "matching",
              topic: "methodology",
              estimatedBand: 7.5,
              prompt: "Explaining multi-year NDVI curves as a proxy for root exudate carbon.",
              correctAnswer: "B",
              explanation: "Kavita explains using 5-year NDVI curves to estimate root exudate carbon.",
              evidence: "Kavita: incorporate time-series Normalized Difference Vegetation Index—NDVI—curves... proxy for root exudate carbon inputs"
            }
          ]
        }
      ]
    },
    {
      sectionNumber: 4,
      title: "Academic Lecture: The Evolution of Human Sleep Architecture and Circadian Photobiology",
      contextDescription: "Professor Alan Drummond (Scottish / British English speaker) delivering a university evolutionary physiology lecture on sleep architecture, REM cycles, and blue-light circadian disruption.",
      audioScript: [
        { "speaker": "Professor Drummond (Scottish/British)", "text": "Good afternoon, class. Today we examine human sleep architecture through the dual lenses of evolutionary anthropology and circadian photobiology. Among terrestrial mammals, human sleep represents a profound evolutionary enigma. Non-human primates, such as chimpanzees, baboons, and orangutans, sleep between ten and fifteen hours every day. In stark contrast, anatomically modern humans sleep for a consolidated average of only seven hours per night. Yet, despite sleeping significantly fewer hours, humans exhibit vastly superior cognitive flexibility, working memory capacity, and executive problem-solving skills." },
        { "speaker": "Professor Drummond (Scottish/British)", "text": "The solution to this paradox lies not in sleep quantity, but in sleep intensity and architectural composition. Human sleep is remarkably enriched in rapid eye movement—or REM—sleep. In typical adult humans, REM sleep comprises nearly twenty-five percent of total sleep duration, compared to a meager five to nine percent in our closest great ape relatives. Evolutionary anthropologists hypothesize that when human ancestors descended from arboreal canopies to sleep on the ground around terrestrial campfires, the threat of nocturnal mammalian predators created intense evolutionary selection for highly condensed, ultra-efficient sleep cycles." },
        { "speaker": "Professor Drummond (Scottish/British)", "text": "At the molecular level, circadian rhythms are orchestrated by the suprachiasmatic nucleus—the SCN—a pair of pinhead-sized structures containing twenty thousand neurons situated in the anterior hypothalamus. The primary environmental zeitgeber—or time-giver—synchronizing the SCN is daylight. In the early 2000s, neurobiologists discovered intrinsically photosensitive retinal ganglion cells—ipRGCs—in the human eye. These specialized photoreceptors do not contribute to conscious image vision; instead, they contain the photopigment melanopsin, which is maximally sensitive to high-frequency blue light at wavelengths between four hundred and sixty and four hundred and eighty nanometers." },
        { "speaker": "Professor Drummond (Scottish/British)", "text": "When morning sunlight hits ipRGCs, electrical signals travel along the retinohypothalamic tract to the SCN, which suppresses melatonin synthesis in the pineal gland, promoting alertness and metabolic vigor. In modern societies, however, pervasive nocturnal exposure to blue-enriched light emitted by smartphones, laptop screens, and solid-state LED bulbs severely disrupts this photobiological clock. Evening blue light tricks the SCN into perceiving daylight, delaying nocturnal melatonin surge by upwards of two hours, fragmenting slow-wave delta sleep, and exacerbating systemic chronic metabolic disorders." }
      ],
      questionGroups: [
        {
          groupInstruction: "Complete the notes below. Write NO MORE THAN TWO WORDS AND/OR A NUMBER for each answer. Write your answers in boxes 31–40.",
          questionType: "sentence_completion",
          questions: [
            {
              id: "l13-q31",
              questionNumber: 31,
              type: "sentence_completion",
              topic: "biology",
              estimatedBand: 6.5,
              prompt: "Non-human primates sleep between 10 and ____ hours daily.",
              correctAnswer: ["15", "fifteen"],
              explanation: "Professor Drummond states primates sleep between ten and fifteen hours every day.",
              evidence: "sleep between ten and fifteen hours every day."
            },
            {
              id: "l13-q32",
              questionNumber: 32,
              type: "sentence_completion",
              topic: "physiology",
              estimatedBand: 6.5,
              prompt: "Modern humans sleep for a consolidated average of ____ hours each night.",
              correctAnswer: ["7", "seven"],
              explanation: "Professor Drummond notes humans sleep an average of only seven hours per night.",
              evidence: "consolidated average of only seven hours per night."
            },
            {
              id: "l13-q33",
              questionNumber: 33,
              type: "sentence_completion",
              topic: "sleep",
              estimatedBand: 7.0,
              prompt: "In adult humans, REM sleep makes up approximately ____ percent of total sleep.",
              correctAnswer: ["25", "twenty-five"],
              explanation: "Professor Drummond states REM sleep comprises nearly twenty-five percent.",
              evidence: "REM sleep comprises nearly twenty-five percent of total sleep duration"
            },
            {
              id: "l13-q34",
              questionNumber: 34,
              type: "sentence_completion",
              topic: "evolution",
              estimatedBand: 7.5,
              prompt: "Condensed sleep evolved when human ancestors began sleeping around terrestrial ____.",
              correctAnswer: "campfires",
              explanation: "Professor Drummond mentions sleeping on the ground around terrestrial campfires.",
              evidence: "descended from arboreal canopies to sleep on the ground around terrestrial campfires"
            },
            {
              id: "l13-q35",
              questionNumber: 35,
              type: "sentence_completion",
              topic: "neuroanatomy",
              estimatedBand: 7.5,
              prompt: "The master circadian clock is located in the ____ nucleus of the hypothalamus.",
              correctAnswer: "suprachiasmatic",
              explanation: "Professor Drummond refers to the suprachiasmatic nucleus (SCN).",
              evidence: "orchestrated by the suprachiasmatic nucleus—the SCN"
            },
            {
              id: "l13-q36",
              questionNumber: 36,
              type: "sentence_completion",
              topic: "photobiology",
              estimatedBand: 8.0,
              prompt: "Specialized eye ganglion cells contain the blue-sensitive photopigment ____.",
              correctAnswer: "melanopsin",
              explanation: "Professor Drummond states cells contain the photopigment melanopsin.",
              evidence: "they contain the photopigment melanopsin, which is maximally sensitive to high-frequency blue light"
            },
            {
              id: "l13-q37",
              questionNumber: 37,
              type: "sentence_completion",
              topic: "physics",
              estimatedBand: 7.5,
              prompt: "Melanopsin is most responsive to light wavelengths between 460 and ____ nanometers.",
              correctAnswer: ["480", "four hundred and eighty"],
              explanation: "Professor Drummond cites wavelengths between 460 and 480 nanometers.",
              evidence: "between four hundred and sixty and four hundred and eighty nanometers."
            },
            {
              id: "l13-q38",
              questionNumber: 38,
              type: "sentence_completion",
              topic: "endocrinology",
              estimatedBand: 7.5,
              prompt: "Morning light signals suppress the production of ____ in the pineal gland.",
              correctAnswer: "melatonin",
              explanation: "Professor Drummond notes suppression of melatonin synthesis in the pineal gland.",
              evidence: "suppresses melatonin synthesis in the pineal gland, promoting alertness"
            },
            {
              id: "l13-q39",
              questionNumber: 39,
              type: "sentence_completion",
              topic: "health",
              estimatedBand: 7.0,
              prompt: "Evening smartphone light can delay the melatonin surge by more than ____ hours.",
              correctAnswer: ["2", "two"],
              explanation: "Professor Drummond states delaying nocturnal melatonin surge by upwards of two hours.",
              evidence: "delaying nocturnal melatonin surge by upwards of two hours"
            },
            {
              id: "l13-q40",
              questionNumber: 40,
              type: "sentence_completion",
              topic: "sleep",
              estimatedBand: 8.0,
              prompt: "Night light exposure damages deep slow-wave ____ sleep.",
              correctAnswer: "delta",
              explanation: "Professor Drummond notes fragmenting slow-wave delta sleep.",
              evidence: "fragmenting slow-wave delta sleep, and exacerbating systemic chronic metabolic disorders."
            }
          ]
        }
      ]
    }
  ]
};

fs.writeFileSync(
  path.resolve('./content/listening/listening-test-13.json'),
  JSON.stringify(listeningTest13, null, 2),
  'utf8'
);
console.log('✓ Created listening-test-13.json');
