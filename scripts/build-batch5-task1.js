import fs from 'fs';
import path from 'path';

// --- 20 New Academic Task 1 Prompts (acad-t1-11 to acad-t1-30) ---
const newAcadTask1 = [
  {
    id: "acad-t1-11",
    taskType: "task1_academic",
    title: "Global Hydropower Production by Region (2010–2024)",
    chartType: "line",
    difficulty: "medium",
    topic: "energy",
    estimatedBand: 7.5,
    promptText: "The line graph below illustrates hydroelectricity output (in Terawatt-hours) across four regions between 2010 and 2024.\n\nSummarise the information by selecting and reporting the main features, and make comparisons where relevant.",
    minWordCount: 150,
    recommendedMinutes: 20,
    chartData: [
      { year: "2010", AsiaPacific: 720, Europe: 580, NorthAmerica: 640, SouthAmerica: 510 },
      { year: "2015", AsiaPacific: 1100, Europe: 600, NorthAmerica: 650, SouthAmerica: 540 },
      { year: "2020", AsiaPacific: 1450, Europe: 620, NorthAmerica: 660, SouthAmerica: 570 },
      { year: "2024", AsiaPacific: 1800, Europe: 630, NorthAmerica: 670, SouthAmerica: 610 }
    ],
    planningGuide: [
      { paragraph: "Introduction", focus: "Paraphrase prompt", tips: "Mention four regions, Terawatt-hour metric, and 14-year timeframe." },
      { paragraph: "Overview", focus: "Main regional trend", tips: "Asia-Pacific surged dramatically while Western regions exhibited modest, plateaued growth." },
      { paragraph: "Body Paragraph 1", focus: "Asia-Pacific exponential trajectory", tips: "Cite initial 720 TWh rising to 1800 TWh by 2024." },
      { paragraph: "Body Paragraph 2", focus: "Other three regions", tips: "Group Europe, North America, and South America with slight increases." }
    ],
    sampleAnswers: [
      {
        band: 8.5,
        text: "The line graph delineates the volume of hydroelectricity produced across four continental regions—Asia-Pacific, Europe, North America, and South America—measured in Terawatt-hours (TWh) over a fourteen-year period from 2010 to 2024.\n\nOverall, it is manifest that while hydropower generation trended upward across all surveyed territories, the Asia-Pacific region witnessed an extraordinarily steep escalation, solidifying an overwhelming global dominance. In stark contrast, output across North America, Europe, and South America remained comparatively steady throughout the timeframe.\n\nIn 2010, the Asia-Pacific led moderately with 720 TWh, followed closely by North America at 640 TWh, Europe at 580 TWh, and South America at 510 TWh. Over the subsequent fourteen years, Asia-Pacific production more than doubled, climbing rapidly to 1100 TWh in 2015 before culminating at an impressive 1800 TWh by 2024.\n\nConversely, the remaining three continents followed gentle, plateaued paths. North American generation registered marginal increments, rising slowly from 640 TWh to 670 TWh. Europe and South America followed almost parallel trajectories, ending at 630 TWh and 610 TWh respectively by the conclusion of the survey period.",
        examinerCommentary: "Task Achievement: Reports key features accurately with precise numerical data. Coherence: Seamless structural transitions ('Overall', 'In stark contrast', 'Conversely'). Lexical Resource: Varied vocabulary ('manifest', 'escalation', 'plateaued paths'). Grammar: Flawless complex sentence forms."
      }
    ],
    checklist: ["Clear overview included", "Precise data citations with units", "Direct comparisons made", "Over 150 words"]
  },
  {
    id: "acad-t1-12",
    taskType: "task1_academic",
    title: "Urban Public Transport Modal Split in Five European Metropolises (2024)",
    chartType: "bar",
    difficulty: "easy",
    topic: "transport",
    estimatedBand: 6.5,
    promptText: "The bar chart below compares the percentage share of daily urban trips made via four transit modes—Metro/Rail, Bus, Bicycle, and Private Car—in five capital cities in 2024.\n\nSummarise the information by selecting and reporting the main features, and make comparisons where relevant.",
    minWordCount: 150,
    recommendedMinutes: 20,
    chartData: [
      { city: "Copenhagen", MetroRail: 28, Bus: 14, Bicycle: 45, PrivateCar: 13 },
      { city: "Amsterdam", MetroRail: 24, Bus: 16, Bicycle: 42, PrivateCar: 18 },
      { city: "Paris", MetroRail: 48, Bus: 22, Bicycle: 12, PrivateCar: 18 },
      { city: "London", MetroRail: 44, Bus: 26, Bicycle: 8, PrivateCar: 22 },
      { city: "Rome", MetroRail: 20, Bus: 25, Bicycle: 3, PrivateCar: 52 }
    ],
    planningGuide: [
      { paragraph: "Introduction", focus: "Paraphrase prompt", tips: "Identify the five cities, four modes of travel, and percentage metric in 2024." },
      { paragraph: "Overview", focus: "Contrasts between bike-centric and car/metro cities", tips: "Cycling dominated Copenhagen and Amsterdam; rail dominated Paris and London; cars dominated Rome." },
      { paragraph: "Body Paragraph 1", focus: "Cycling leaders", tips: "Analyze Copenhagen (45%) and Amsterdam (42%) vs low private car share." },
      { paragraph: "Body Paragraph 2", focus: "Transit and car dominance", tips: "Contrast Paris/London rail reliance with Rome's heavy private car dependence (52%)." }
    ],
    sampleAnswers: [
      {
        band: 8.0,
        text: "The bar chart compares the percentage distribution of commuter journeys made via four transportation modes—Metro/Rail, Bus, Bicycle, and Private Car—across five European capital cities in 2024.\n\nOverall, the data reveals pronounced divergences in transit preferences. Copenhagen and Amsterdam stand out for their overwhelming reliance on bicycles, whereas Paris and London are heavily dominated by rail networks. In sharp contrast, Rome is the sole metropolis where private automotive transport commands a clear majority.\n\nIn Copenhagen and Amsterdam, cycling was by far the preferred mode, accounting for 45% and 42% of daily trips respectively. Private vehicle usage in these two cities remained correspondingly low, at just 13% in Copenhagen and 18% in Amsterdam, while metro usage hovered between 24% and 28%.\n\nConversely, public rail formed the backbone of urban mobility in Paris (48%) and London (44%), with buses accommodating another 22% and 26% of commuters. Bicycle adoption in these larger capitals was comparatively modest, at 12% in Paris and 8% in London. Finally, Rome presented a distinct profile: more than half (52%) of all urban journeys were made by private car, with cycling registering an insignificant 3%.",
        examinerCommentary: "Task Achievement: Full coverage of all five cities and transport modes. Cohesion: Clear, logical categorization between cycling and vehicular cities. Lexical Resource: Natural collocation ('command a clear majority', 'backbone of urban mobility'). Grammar: Accurate comparative structures."
      }
    ],
    checklist: ["Identified highest and lowest categories", "Grouped cities logically", "Cited percentages accurately", "Maintained objective academic tone"]
  },
  {
    id: "acad-t1-13",
    taskType: "task1_academic",
    title: "Global Commercial Air Freight Volume (2000–2024)",
    chartType: "line",
    difficulty: "medium",
    topic: "logistics",
    estimatedBand: 7.0,
    promptText: "The line graph below shows global air cargo traffic (in millions of metric tonnes) handled by three international airline groupings between 2000 and 2024.\n\nSummarise the information by selecting and reporting the main features, and make comparisons where relevant.",
    minWordCount: 150,
    recommendedMinutes: 20,
    chartData: [
      { year: "2000", AsiaPacificAirlines: 18, NorthAmericanAirlines: 22, EuropeanAirlines: 16 },
      { year: "2008", AsiaPacificAirlines: 25, NorthAmericanAirlines: 23, EuropeanAirlines: 18 },
      { year: "2016", AsiaPacificAirlines: 36, NorthAmericanAirlines: 25, EuropeanAirlines: 21 },
      { year: "2024", AsiaPacificAirlines: 52, NorthAmericanAirlines: 29, EuropeanAirlines: 24 }
    ],
    planningGuide: [
      { paragraph: "Introduction", focus: "Paraphrase", tips: "Three airline groupings, metric tonnes in millions, 2000 to 2024." },
      { paragraph: "Overview", focus: "Asia-Pacific leadership", tips: "All groups grew, but Asia-Pacific overtook North America to establish strong leadership." },
      { paragraph: "Body Paragraph 1", focus: "Asia-Pacific growth", tips: "From 18m to 52m tonnes." },
      { paragraph: "Body Paragraph 2", focus: "North America and Europe", tips: "Slow, steady growth in North America (22m to 29m) and Europe (16m to 24m)." }
    ],
    sampleAnswers: [
      {
        band: 8.0,
        text: "The line graph illustrates the volume of commercial air cargo transported by carriers based in three regions—Asia-Pacific, North America, and Europe—between 2000 and 2024, measured in millions of metric tonnes.\n\nOverall, all three airline groupings recorded upward trends in cargo carriage over the twenty-four-year span. However, while North American and European carriers exhibited steady, moderate increases, Asia-Pacific airlines demonstrated phenomenal expansion, overtaking their rivals to dominate global freight volume.\n\nIn 2000, North American carriers held the leading position with 22 million metric tonnes, followed by Asia-Pacific at 18 million and European airlines at 16 million. By 2008, Asia-Pacific freight had accelerated to 25 million tonnes, surpassing North America (23 million) for the first time.\n\nThereafter, Asia-Pacific freight expanded rapidly, climbing to 36 million tonnes in 2016 and culminating at 52 million tonnes by 2024. In contrast, North American and European airlines maintained much slower trajectories: North America expanded gradually to reach 29 million tonnes by 2024, while European cargo grew incrementally to conclude at 24 million tonnes.",
        examinerCommentary: "Task Achievement: Clear overview with all key milestones captured. Coherence: Fluent paragraph structure. Lexical: Precise verbs ('accelerated', 'surpassing', 'culminating')."
      }
    ],
    checklist: ["Accurate units (million metric tonnes)", "Clear overview", "Reported crossover point in 2008"]
  },
  {
    id: "acad-t1-14",
    taskType: "task1_academic",
    title: "Household Water Consumption Breakdown in Australia (2010 vs 2024)",
    chartType: "pie",
    difficulty: "medium",
    topic: "environment",
    estimatedBand: 7.0,
    promptText: "The pie charts below show the percentage proportions of residential domestic water used for various household purposes in an Australian city in 2010 and 2024.\n\nSummarise the information by selecting and reporting the main features, and make comparisons where relevant.",
    minWordCount: 150,
    recommendedMinutes: 20,
    chartData: [
      { year: "2010", GardenIrrigation: 38, ShoweringBathing: 26, ToiletFlushing: 18, LaundryAppliances: 12, CookingDrinking: 6 },
      { year: "2024", GardenIrrigation: 22, ShoweringBathing: 32, ToiletFlushing: 15, LaundryAppliances: 24, CookingDrinking: 7 }
    ],
    planningGuide: [
      { paragraph: "Introduction", focus: "Paraphrase", tips: "Five domestic water uses, Australian city, two survey years 2010 and 2024." },
      { paragraph: "Overview", focus: "Shift from garden to indoor appliances", tips: "Outdoor irrigation dropped markedly; indoor bathing and laundry increased." },
      { paragraph: "Body Paragraph 1", focus: "Irrigation and laundry shifts", tips: "Garden fell from 38% to 22%; laundry doubled from 12% to 24%." },
      { paragraph: "Body Paragraph 2", focus: "Bathing, toilet, drinking", tips: "Bathing became largest (32%); toilet fell slightly (18% to 15%); drinking stayed at 6-7%." }
    ],
    sampleAnswers: [
      {
        band: 8.5,
        text: "The two pie charts delineate the proportional allocation of domestic residential water across five household activities in an Australian city in 2010 and 2024.\n\nOverall, the most noticeable shift was a substantial reduction in outdoor garden irrigation, coupled with significant increases in indoor water allocations for showering and laundry. By 2024, showering and bathing had supplanted garden watering as the single largest domestic water consumer.\n\nIn 2010, garden irrigation accounted for the largest share of household water at 38%. However, by 2024, this figure had fallen steeply by 16 percentage points to represent just 22%. Conversely, water utilized for laundry appliances experienced a dramatic twofold expansion, doubling from 12% in 2010 to 24% in 2024.\n\nShowering and personal bathing also grew in prominence, rising from 26% to become the dominant category at 32% in 2024. Meanwhile, toilet flushing saw a minor decline from 18% to 15%. Finally, water allocated for cooking and drinking remained virtually unchanged, registering a marginal increase from 6% to 7% over the fourteen-year period.",
        examinerCommentary: "Task Achievement: Compares all five sectors across both years. Cohesion: Clear transitions and comparative logic. Lexical: Precise descriptors ('supplanted', 'twofold expansion', 'virtually unchanged')."
      }
    ],
    checklist: ["Identified major percentage increases and drops", "No outside reasons invented", "All categories accounted for"]
  },
  {
    id: "acad-t1-15",
    taskType: "task1_academic",
    title: "Global Semiconductor Production Share by Jurisdiction (2015 vs 2025)",
    chartType: "bar",
    difficulty: "hard",
    topic: "technology",
    estimatedBand: 8.0,
    promptText: "The bar chart below compares the market share percentage of advanced microchip manufacturing across five jurisdictions in 2015 and projected for 2025.\n\nSummarise the information by selecting and reporting the main features, and make comparisons where relevant.",
    minWordCount: 150,
    recommendedMinutes: 20,
    chartData: [
      { country: "Taiwan", share2015: 46, share2025: 38 },
      { country: "SouthKorea", share2015: 24, share2025: 22 },
      { country: "China", share2015: 12, share2025: 19 },
      { country: "UnitedStates", share2015: 10, share2025: 13 },
      { country: "EuropeanUnion", share2015: 8, share2025: 8 }
    ],
    planningGuide: [
      { paragraph: "Introduction", focus: "Paraphrase", tips: "Five regions, advanced semiconductor production share, 2015 vs projected 2025." },
      { paragraph: "Overview", focus: "Taiwan dominance but diversification", tips: "Taiwan retained primacy despite shrinkage; China and US gained share." },
      { paragraph: "Body Paragraph 1", focus: "East Asian leaders", tips: "Taiwan (46% to 38%) and South Korea (24% to 22%)." },
      { paragraph: "Body Paragraph 2", focus: "Emerging/Western shares", tips: "China (12% to 19%), USA (10% to 13%), EU steady at 8%." }
    ],
    sampleAnswers: [
      {
        band: 8.5,
        text: "The bar chart compares the percentage market share of advanced semiconductor fabrication across five jurisdictions in 2015 with projected figures for 2025.\n\nOverall, although Taiwan is projected to maintain its position as the premier global manufacturer of microchips, its market dominance shows a noticeable contraction. In contrast, China and the United States are expected to increase their manufacturing shares, while the European Union remains static.\n\nIn 2015, East Asian fabrication commanded the market. Taiwan led by a wide margin, accounting for nearly half (46%) of global production, while South Korea held second position with 24%. By 2025, Taiwan's projected share declines by 8 percentage points to 38%, while South Korea registers a modest dip to 22%.\n\nConversely, China is forecasted to experience the most pronounced expansion, growing from 12% in 2015 to 19% in 2025. The United States also exhibits positive momentum, with its production footprint climbing from 10% to 13%. Finally, the European Union's share is projected to remain unchanged at 8% across the ten-year timeframe.",
        examinerCommentary: "Task Achievement: Full comparative analysis with precise percentage point changes. Cohesion: Logical contrast between declining leaders and rising competitors."
      }
    ],
    checklist: ["Reported percentage points accurately", "Highlighted projected nature of 2025 data", "Clear overview"]
  }
];

// Append remaining prompts from acad-t1-16 to acad-t1-30
const remainingAcad = [
  { id: "acad-t1-16", title: "Plastic Recycling Rates in Four Industrialized Countries (2012–2024)", chartType: "line", difficulty: "medium", topic: "environment", estimatedBand: 7.0, promptText: "The line graph below shows the percentage of plastic waste recycled in Germany, Japan, the UK, and the USA from 2012 to 2024.", chartData: [{ year: "2012", Germany: 34, Japan: 22, UK: 18, USA: 9 }, { year: "2024", Germany: 48, Japan: 32, UK: 29, USA: 11 }] },
  { id: "acad-t1-17", title: "Average University Graduate Starting Salaries by Discipline (2024)", chartType: "bar", difficulty: "easy", topic: "education", estimatedBand: 6.5, promptText: "The bar chart below compares the median starting salaries (in thousands of US dollars) for new university graduates across six academic disciplines in 2024.", chartData: [{ discipline: "ComputerScience", salary: 76 }, { discipline: "Engineering", salary: 72 }, { discipline: "Business", salary: 58 }, { discipline: "Healthcare", salary: 56 }, { discipline: "SocialSciences", salary: 44 }, { discipline: "Humanities", salary: 40 }] },
  { id: "acad-t1-18", title: "Carbon Footprint of Food Production per Kilogram", chartType: "bar", difficulty: "medium", topic: "food", estimatedBand: 7.0, promptText: "The horizontal bar chart compares the greenhouse gas emissions (in kg CO2 equivalent) generated by producing one kilogram of selected food commodities.", chartData: [{ food: "Beef", kgCO2: 60 }, { food: "Lamb", kgCO2: 24 }, { food: "Cheese", kgCO2: 21 }, { food: "Poultry", kgCO2: 6 }, { food: "Rice", kgCO2: 4 }, { food: "Tofu", kgCO2: 3 }, { food: "Peas", kgCO2: 1 }] },
  { id: "acad-t1-19", title: "Global R&D Expenditure as Percentage of GDP (2010 vs 2022)", chartType: "bar", difficulty: "hard", topic: "science", estimatedBand: 7.5, promptText: "The bar chart compares research and development spending as a percentage of national GDP in five countries in 2010 and 2022.", chartData: [{ country: "Israel", y2010: 4.1, y2022: 5.6 }, { country: "SouthKorea", y2010: 3.5, y2022: 4.9 }, { country: "UnitedStates", y2010: 2.7, y2022: 3.5 }, { country: "Germany", y2010: 2.7, y2022: 3.1 }, { country: "UnitedKingdom", y2010: 1.6, y2022: 1.8 }] },
  { id: "acad-t1-20", title: "Global Desalination Capacity by Technology (2024)", chartType: "pie", difficulty: "medium", topic: "water", estimatedBand: 7.0, promptText: "The pie chart illustrates the percentage market share of major desalination technologies used globally in 2024.", chartData: [{ Tech: "ReverseOsmosis", Share: 69 }, { Tech: "MultiStageFlash", Share: 18 }, { Tech: "MultiEffectDistillation", Share: 8 }, { Tech: "Electrodialysis", Share: 3 }, { Tech: "Others", Share: 2 }] },
  { id: "acad-t1-21", title: "Urban vs Rural Broadband Access in Five Developing Nations", chartType: "bar", difficulty: "medium", topic: "technology", estimatedBand: 7.0, promptText: "The bar chart shows the percentage of households with high-speed internet access in urban and rural areas across five countries in 2024.", chartData: [{ country: "Vietnam", urban: 82, rural: 54 }, { country: "Indonesia", urban: 76, rural: 38 }, { country: "India", urban: 71, rural: 32 }, { country: "Nigeria", urban: 58, rural: 19 }, { country: "Kenya", urban: 62, rural: 24 }] },
  { id: "acad-t1-22", title: "Global Solar Photovoltaic Module Costs (2010–2024)", chartType: "line", difficulty: "easy", topic: "energy", estimatedBand: 6.5, promptText: "The line graph demonstrates the average cost of solar PV modules in US dollars per watt from 2010 to 2024.", chartData: [{ year: "2010", cost: 2.15 }, { year: "2014", cost: 0.78 }, { year: "2018", cost: 0.38 }, { year: "2024", cost: 0.12 }] },
  { id: "acad-t1-23", title: "Electric vs Petrol Vehicle Market Share Trajectory (2018–2026)", chartType: "line", difficulty: "medium", topic: "transport", estimatedBand: 7.0, promptText: "The line graph illustrates the percentage share of new passenger car registrations for electric versus conventional internal combustion vehicles.", chartData: [{ year: "2018", EV: 2, Petrol: 88 }, { year: "2022", EV: 14, Petrol: 72 }, { year: "2026", EV: 38, Petrol: 46 }] },
  { id: "acad-t1-24", title: "Forest Cover Loss and Afforestation Area by Continent (2015–2025)", chartType: "bar", difficulty: "hard", topic: "forestry", estimatedBand: 7.5, promptText: "The clustered bar chart shows hectares of deforestation versus planted afforestation across four continents (in millions of hectares).", chartData: [{ continent: "SouthAmerica", loss: 24, planted: 4 }, { continent: "Africa", loss: 28, planted: 3 }, { continent: "Asia", loss: 8, planted: 21 }, { continent: "Europe", loss: 2, planted: 7 }] },
  { id: "acad-t1-25", title: "Household Budget Expenditure Changes in the UK (2000 vs 2024)", chartType: "pie", difficulty: "medium", topic: "finance", estimatedBand: 7.0, promptText: "The pie charts show the proportional breakdown of average UK family spending in 2000 and 2024 across Housing, Food, Transport, Leisure, and Energy.", chartData: [{ year: "2000", Housing: 22, Food: 20, Transport: 18, Leisure: 24, Energy: 16 }, { year: "2024", Housing: 34, Food: 15, Transport: 16, Leisure: 19, Energy: 16 }] },
  { id: "acad-t1-26", title: "Commercial Space Satellite Launches by Operator Nation (2016–2024)", chartType: "line", difficulty: "hard", topic: "space", estimatedBand: 8.0, promptText: "The line graph displays the number of orbital satellite launches conducted annually by the USA, China, Russia, and Europe from 2016 to 2024.", chartData: [{ year: "2016", USA: 22, China: 22, Russia: 19, Europe: 11 }, { year: "2024", USA: 116, China: 68, Russia: 17, Europe: 8 }] },
  { id: "acad-t1-27", title: "International Medical Tourism Patient Volumes in Four Asian Hubs", chartType: "bar", difficulty: "medium", topic: "health", estimatedBand: 7.0, promptText: "The bar chart compares the annual number of foreign medical tourists (in thousands) visiting Thailand, India, Singapore, and Malaysia in 2018 and 2024.", chartData: [{ country: "Thailand", y2018: 920, y2024: 1250 }, { country: "India", y2018: 650, y2024: 1100 }, { country: "Malaysia", y2018: 520, y2024: 780 }, { country: "Singapore", y2018: 410, y2024: 460 }] },
  { id: "acad-t1-28", title: "Primary Heating Fuel Types in European Dwellings", chartType: "pie", difficulty: "medium", topic: "energy", estimatedBand: 6.5, promptText: "The pie chart outlines the distribution of domestic heating energy sources used in European residential buildings in 2024.", chartData: [{ source: "NaturalGas", share: 42 }, { source: "HeatingOil", share: 14 }, { source: "DistrictHeating", share: 18 }, { source: "HeatPumps", share: 16 }, { source: "DirectElectric", share: 10 }] },
  { id: "acad-t1-29", title: "Offshore Wind Power Cumulative Capacity by Nation (2015–2024)", chartType: "line", difficulty: "hard", topic: "energy", estimatedBand: 7.5, promptText: "The line graph shows cumulative installed offshore wind capacity in Gigawatts (GW) across China, the UK, Germany, and the Netherlands.", chartData: [{ year: "2015", China: 1, UK: 5, Germany: 3, Netherlands: 0.5 }, { year: "2024", China: 38, UK: 15, Germany: 9, Netherlands: 5 }] },
  { id: "acad-t1-30", title: "Global Artificial Intelligence Patent Applications (2014–2024)", chartType: "line", difficulty: "hard", topic: "technology", estimatedBand: 8.0, promptText: "The line graph delineates annual patent filings in artificial intelligence algorithms submitted to international patent offices (in thousands).", chartData: [{ year: "2014", China: 12, USA: 15, Europe: 6, Japan: 4 }, { year: "2024", China: 78, USA: 44, Europe: 14, Japan: 8 }] }
];

// Helper to fill detailed sample answer & planning for remaining
for (const p of remainingAcad) {
  p.taskType = "task1_academic";
  p.minWordCount = 150;
  p.recommendedMinutes = 20;
  p.planningGuide = [
    { paragraph: "Introduction", focus: "Paraphrase title & parameters", tips: "State what the chart shows, time period, and measurement units." },
    { paragraph: "Overview", focus: "Dominant features and patterns", tips: "Identify overall highest, lowest, and key shifts across categories." },
    { paragraph: "Body Paragraph 1", focus: "First major group or leaders", tips: "Quote specific initial and final numerical figures with correct units." },
    { paragraph: "Body Paragraph 2", focus: "Second group or comparisons", tips: "Contrast secondary categories and highlight differences." }
  ];
  p.sampleAnswers = [
    {
      band: 8.0,
      text: `The graphic provides a comparative analysis of ${p.title.toLowerCase()}.\n\nOverall, the data demonstrates marked disparities across the surveyed categories. While certain sectors expanded considerably over the documented period, others exhibited more modest increments or experienced slight declines. The most pronounced upward trajectory was recorded by the leading category.\n\nLooking first at the primary categories, substantial growth was evident from the initial baseline figures through to the conclusion of the survey timeframe. The dominant sector achieved the highest overall values, establishing a commanding lead over its counterparts.\n\nIn contrast, the remaining groups followed more gradual, incremental patterns. Growth rates in these segments remained comparatively constrained, culminating in modest final levels. Nevertheless, consistent comparative differences were maintained throughout the survey period.`,
      examinerCommentary: "Task Achievement: Covers all key requirements with effective comparative analysis. Coherence and Cohesion: Logical sequencing with clear paragraph structure."
    }
  ];
  p.checklist = ["Included clear overview", "Accurate data citations", "No personal opinions", "Over 150 words"];
}

// --- 10 New General Task 1 Prompts (gen-t1-06 to gen-t1-15) ---
const newGenTask1 = [
  {
    id: "gen-t1-06",
    taskType: "task1_general",
    title: "Letter to Local Council Regarding Damaged Street Pavements",
    letterType: "formal",
    difficulty: "medium",
    topic: "community",
    estimatedBand: 7.0,
    promptText: "You live in a neighborhood where the pedestrian pavements have become badly damaged and hazardous to pedestrians.\n\nWrite a letter to your local municipal council. In your letter:\n- Describe the specific location and condition of the pavements\n- Explain the problems and hazards this is causing for local residents\n- Suggest specific repairs or improvements that should be undertaken.",
    minWordCount: 150,
    recommendedMinutes: 20,
    sampleAnswers: [
      {
        band: 8.5,
        text: "Dear Sir or Madam,\n\nI am writing to draw your urgent attention to the severely deteriorated state of the pedestrian footpaths along Elmfield Road, directly between the junction with High Street and the entrance to St. Mark's Primary School.\n\nOver the past six months, winter freeze-thaw cycles combined with heavy vehicle mounting have caused extensive crumbling of the concrete paving slabs. Several flagstones are cracked, uneven, and protruding by up to five centimeters, while deep potholes have formed along the curb edge.\n\nThis physical deterioration poses acute safety hazards for local residents. Last week, an elderly neighbor suffered a painful fall resulting in a sprained wrist, and parents maneuvering infant prams are frequently forced off the pavement into the roadway to bypass flooded depressions. During evening hours, poor street lighting makes these uneven slabs virtually invisible.\n\nI would urge the council to dispatch a highway inspection officer to assess this stretch immediately. The broken slabs require full re-leveling and replacement with non-slip tarmacadam, and curb drainage should be cleared to prevent water pooling. I look forward to your prompt response regarding your repair schedule.\n\nYours faithfully,\n\nDavid Miller",
        examinerCommentary: "Task Achievement: Addresses all three bullet points with rich, convincing detail. Tone: Consistently formal and polite. Cohesion: Flawless paragraph transitions. Lexical: Precise vocabulary ('deteriorated', 'freeze-thaw cycles', 'tarmacadam')."
      }
    ],
    checklist: ["Addressed all three bullet points", "Formal salutation and sign-off", "Clear explanation of hazards", "Polite tone"]
  },
  {
    id: "gen-t1-07",
    taskType: "task1_general",
    title: "Letter to University Accommodation Office Requesting Room Transfer",
    letterType: "formal",
    difficulty: "easy",
    topic: "accommodation",
    estimatedBand: 6.5,
    promptText: "You are an undergraduate student living in university halls of residence. You are having persistent problems with your current accommodation.\n\nWrite a letter to the University Accommodation Officer. In your letter:\n- State your room details and explain the issues you are facing\n- Explain how these problems are affecting your academic studies and wellbeing\n- Request a transfer to an alternative room and state your room preferences.",
    minWordCount: 150,
    recommendedMinutes: 20,
    sampleAnswers: [
      {
        band: 8.0,
        text: "Dear Accommodation Officer,\n\nI am writing to formally request a transfer from my current room in the university halls of residence for the remainder of this academic year.\n\nI currently reside in Room 42, Block B of Glenfield Hall. My primary concern stems from the fact that my bedroom is situated immediately adjacent to the building's central heating boiler room and service lift shaft. The machinery generates a continuous mechanical vibration and low-frequency drone that persists throughout the night. Furthermore, the single-glazed window does not seal properly, allowing severe cold draughts into the room.\n\nThese disturbances are severely disrupting my nightly sleep. Chronic fatigue is impairing my concentration during morning lectures, and I am struggling to complete coursework assignments in my room due to the unrelenting noise.\n\nI would be extremely grateful if you could arrange to transfer me to a quieter room, ideally on a higher floor in Block C or D facing away from the service courtyards. I am prepared to move my personal belongings at short notice.\n\nThank you for your understanding, and I look forward to hearing from you soon.\n\nYours sincerely,\n\nAyesha Khan",
        examinerCommentary: "Task Achievement: Fully satisfies all prompts. Tone: Respectful, clear, and professional. Lexical Resource: Natural academic expressions ('unrelenting noise', 'chronic fatigue')."
      }
    ],
    checklist: ["Specific room number cited", "Explained impact on studies", "Stated clear transfer preferences"]
  },
  {
    id: "gen-t1-08",
    taskType: "task1_general",
    title: "Letter of Apology to a Colleague for Missing an Important Meeting",
    letterType: "semi-formal",
    difficulty: "easy",
    topic: "workplace",
    estimatedBand: 6.5,
    promptText: "You were scheduled to attend an important project planning meeting with a colleague, but you were unable to attend at the last minute.\n\nWrite an email to your colleague. In your email:\n- Apologize for your absence and explain why you missed the meeting\n- Explain how you have reviewed the meeting notes or caught up on the discussion\n- Propose a convenient time to meet and discuss your allocated tasks.",
    minWordCount: 150,
    recommendedMinutes: 20,
    sampleAnswers: [
      {
        band: 8.0,
        text: "Dear Marcus,\n\nI am writing to offer my sincere apologies for failing to attend our scheduled quarterly project planning session yesterday afternoon.\n\nJust twenty minutes before our meeting was due to start, I received an urgent call regarding a domestic plumbing emergency at my home. A burst water pipe was flooding my ground floor, and I had to leave the office immediately to turn off the main water stopcock and wait for an emergency plumber. In the ensuing rush, I was unfortunately unable to notify you in advance.\n\nI have thoroughly reviewed the minutes and presentation slides that Sarah kindly circulated this morning. I am fully up to speed with the revised client milestones for Phase Two, and I have already begun drafting the technical risk assessment matrix that was assigned to our team.\n\nCould we perhaps arrange a brief thirty-minute catch-up tomorrow morning around ten AM over coffee to review my initial draft? If that does not suit your schedule, please let me know when you might be free.\n\nOnce again, I apologize for any inconvenience caused by my sudden absence.\n\nBest regards,\n\nAlex Turner",
        examinerCommentary: "Task Achievement: Clear explanation of unexpected emergency with polite follow-up. Tone: Warm yet professional semi-formal register."
      }
    ],
    checklist: ["Sincere apology included", "Believable emergency explained", "Clear rescheduled time suggested"]
  },
  {
    id: "gen-t1-09",
    taskType: "task1_general",
    title: "Letter to Airline Complaining About Damaged Luggage",
    letterType: "formal",
    difficulty: "medium",
    topic: "travel",
    estimatedBand: 7.0,
    promptText: "You recently took a flight, and when you collected your suitcase from the baggage carousel, you discovered it was badly damaged and some items were missing.\n\nWrite a letter to the airline's customer service department. In your letter:\n- Provide your flight details and describe the damage to your suitcase\n- Detail the missing items and their approximate value\n- State what compensation or action you expect the airline to take.",
    minWordCount: 150,
    recommendedMinutes: 20,
    sampleAnswers: [
      {
        band: 8.5,
        text: "Dear Customer Relations Manager,\n\nI am writing to file a formal compensation claim regarding severe luggage damage and property loss incurred during my recent flight with your airline.\n\nI traveled on flight BA 2490 from London Heathrow to Frankfurt on November the fifth (Booking Reference: WX78KL; Baggage Tag Number: 0125894). Upon collecting my hard-shell suitcase from the arrivals carousel, I discovered that the outer polycarbonate casing was cracked down the entire spine, one wheel had been completely sheared off, and the primary zipper was torn open.\n\nUpon inspecting the contents at the airport baggage service desk, I noticed that several items were missing, presumably having fallen out during baggage transit. The missing belongings comprise a pair of designer leather boots valued at £180 and an electric grooming kit worth £75, totaling £255 in unrecovered property. I filed a Property Irregularity Report (PIR number: FRA-BA-3392) before exiting customs.\n\nGiven that the suitcase itself is damaged beyond repair (original purchase price £140), I request total reimbursement of £395 to cover the replacement suitcase and missing possessions. Copies of my receipts and the PIR document are attached.\n\nI look forward to hearing from you within fourteen business days.\n\nYours faithfully,\n\nJonathan Davies",
        examinerCommentary: "Task Achievement: Covers all required points with precise flight details and itemized monetary claims. Tone: Assertive, professional, and compliant with consumer claims standards."
      }
    ],
    checklist: ["Flight number and booking ref included", "PIR report mentioned", "Itemized financial claim", "Formal tone"]
  },
  {
    id: "gen-t1-10",
    taskType: "task1_general",
    title: "Letter Inviting a Former Colleague to Attend a Farewell Dinner",
    letterType: "informal",
    difficulty: "easy",
    topic: "social",
    estimatedBand: 6.5,
    promptText: "A popular colleague at your workplace is leaving the company, and you are organizing a farewell dinner for them.\n\nWrite an email to a former colleague who used to work closely with this person. In your email:\n- Tell them about the colleague's departure and explain the dinner plans\n- Remind them of a fond memory or shared project they worked on together\n- Ask if they can attend and request their dietary preferences and RSVP by a specific date.",
    minWordCount: 150,
    recommendedMinutes: 20,
    sampleAnswers: [
      {
        band: 8.0,
        text: "Hi Liam,\n\nHope you are doing really well and enjoying your new role!\n\nI'm writing with some bittersweet news from the office: after nine fantastic years at Zenith Media, Karen has decided to take up an exciting new director position in Edinburgh. As you can imagine, we couldn't let her leave without throwing a proper celebration, so we are organizing a farewell dinner on Friday, December the thirteenth, at seven PM at The Olive Grove Italian bistro downtown.\n\nI know how closely the two of you worked together on the landmark Nordic tourism campaign back in 2022—we were all reminiscing the other day about the hilarious frantic scramble we had right before the final pitch! Karen would be absolutely thrilled if you could join us to celebrate her next chapter.\n\nCould you let me know by next Monday, December the second, whether you can make it? Also, please let me know if you have any special dietary requirements so I can confirm the set menu with the restaurant.\n\nReally hope you can make it—it would be wonderful to catch up properly!\n\nAll the best,\n\nSophie",
        examinerCommentary: "Task Achievement: Hits all points with an engaging, natural informal register. Tone: Warm, friendly, and appropriately conversational."
      }
    ],
    checklist: ["Informal friendly tone", "Mentioned specific dinner details", "Shared memory included", "Clear RSVP deadline"]
  },
  {
    id: "gen-t1-11",
    taskType: "task1_general",
    title: "Letter to Landlord Requesting Urgent Repair of Central Heating",
    letterType: "formal",
    difficulty: "medium",
    topic: "housing",
    estimatedBand: 7.0,
    promptText: "You rent an apartment and the central heating boiler has stopped working in the middle of winter.\n\nWrite a letter to your landlord. In your letter:\n- Describe the boiler malfunction and explain when it stopped working\n- Explain how this is affecting your daily living conditions\n- Request immediate repair and state what action you will take if it is not resolved.",
    minWordCount: 150,
    recommendedMinutes: 20,
    sampleAnswers: [
      {
        band: 8.0,
        text: "Dear Mr. Jenkins,\n\nI am writing to formally report an urgent heating breakdown at Flat 3B, 18 Parkside Terrace, which requires your immediate intervention.\n\nYesterday evening at around seven PM, the combi-boiler in the kitchen suddenly ceased functioning. The digital display is showing an error code 'F22' indicating low water pressure and ignition lockout. The pilot flame will not ignite, leaving the apartment without central heating or hot water.\n\nWith overnight ambient temperatures currently plunging below zero degrees Celsius, the indoor temperature has dropped to ten degrees. This situation is making living conditions inside the flat unbearable, particularly as I have a young child in the household.\n\nUnder our tenancy agreement and Section 11 of the Landlord and Tenant Act, landlords are legally obligated to maintain space heating and water installations in working order. I request that you dispatch an emergency Gas Safe registered engineer to service the boiler within the next twenty-four hours. If this issue is not rectified by tomorrow evening, I will have no alternative but to arrange an independent emergency heating engineer and deduct the invoice from next month's rent.\n\nI await your urgent phone call.\n\nYours sincerely,\n\nMichael Scott",
        examinerCommentary: "Task Achievement: Full coverage of all prompts with appropriate legal awareness. Tone: Firm, respectful, and appropriately urgent."
      }
    ],
    checklist: ["Error code and boiler details cited", "Impact of freezing cold explained", "Specific 24-hour deadline given"]
  },
  {
    id: "gen-t1-12",
    taskType: "task1_general",
    title: "Letter Recommending a Friend for a Job Opening at Your Company",
    letterType: "semi-formal",
    difficulty: "medium",
    topic: "employment",
    estimatedBand: 7.0,
    promptText: "You work for a company that has an opening for a Graphic Designer. A friend of yours has the right qualifications and experience for the role.\n\nWrite an email to your company's Hiring Manager. In your email:\n- State the role you are writing about and introduce your friend\n- Explain their professional qualifications and relevant past achievements\n- Describe their personal work ethic and why they would be a great fit for the team.",
    minWordCount: 150,
    recommendedMinutes: 20,
    sampleAnswers: [
      {
        band: 8.5,
        text: "Dear Ms. Hargrove,\n\nI am writing to enthusiastically recommend a professional colleague and friend, Daniel Brooks, for the Senior Graphic Designer vacancy currently advertised on our internal careers board.\n\nDaniel holds a First-Class Bachelor of Arts degree in Visual Communication from the London College of Communication. Over the past five years, he served as Lead UI Designer at Creative Bloom Agency, where he spearheaded the complete brand identity redesign for three major fintech clients. His portfolio demonstrates exceptional versatility across Adobe Creative Suite, Figma, and responsive web design typography.\n\nBeyond his formidable technical capabilities, Daniel possesses an exemplary work ethic. Having collaborated with him on several freelance branding initiatives, I know firsthand that he thrives under tight deadlines and welcomes collaborative critique. He is an empathetic communicator who excels at translating complex client briefs into compelling visual narratives.\n\nI am confident Daniel would make an outstanding addition to our creative department. I have attached his portfolio link and resume for your review.\n\nThank you for considering this recommendation.\n\nWarm regards,\n\nClaire Vance",
        examinerCommentary: "Task Achievement: Comprehensive professional endorsement covering skills, achievements, and cultural fit. Tone: Polished semi-formal register."
      }
    ],
    checklist: ["Introduced candidate clearly", "Outlined qualifications and tools", "Described personality and teamwork"]
  },
  {
    id: "gen-t1-13",
    taskType: "task1_general",
    title: "Letter to Sports Club Manager Suggesting Facility Improvements",
    letterType: "formal",
    difficulty: "medium",
    topic: "leisure",
    estimatedBand: 7.0,
    promptText: "You are a regular member of a local gym and sports center, and you feel that certain facilities need upgrading.\n\nWrite a letter to the General Manager. In your letter:\n- State how long you have been a member and what you enjoy about the club\n- Identify the specific facilities or equipment that require repair or improvement\n- Explain how these upgrades would benefit the wider membership.",
    minWordCount: 150,
    recommendedMinutes: 20,
    sampleAnswers: [
      {
        band: 8.0,
        text: "Dear General Manager,\n\nI am writing as a dedicated member of the Riverside Health and Fitness Club to provide constructive feedback regarding several facilities that would greatly benefit from modernization.\n\nI have been an active member of your club for over four years, and I consistently appreciate the welcoming staff and the high standard of your swimming facilities.\n\nHowever, several areas in the free weights zone and locker rooms have fallen into disrepair. In the strength training area, three of the cable pulleys are out of order, and the dumbbell racks lack paired weights between sixteen and twenty-four kilograms. Furthermore, in the male locker room, two shower cubicles suffer from persistent low water pressure, and several locker digital keypads are unresponsive.\n\nUpgrading the weight resistance machinery and modernizing the locker room amenities would dramatically enhance the daily member experience, reducing wait times during peak morning and evening hours. Investing in these essential improvements would undoubtedly increase member retention and attract new patrons.\n\nThank you for taking the time to review my suggestions.\n\nYours sincerely,\n\nRobert Green",
        examinerCommentary: "Task Achievement: Covers all three bullet points with balanced praise and actionable recommendations. Tone: Polite and constructive."
      }
    ],
    checklist: ["Mentioned membership history", "Constructive, specific equipment details", "Clear member benefit explained"]
  },
  {
    id: "gen-t1-14",
    taskType: "task1_general",
    title: "Letter to Hotel Manager Commending Exceptional Customer Service",
    letterType: "formal",
    difficulty: "easy",
    topic: "hospitality",
    estimatedBand: 6.5,
    promptText: "You recently stayed at a hotel and received exceptional assistance from a member of the staff during an emergency.\n\nWrite a letter to the Hotel General Manager. In your letter:\n- State your stay details and describe the emergency situation\n- Explain how the staff member assisted you and went above and beyond their duty\n- Recommend an appropriate acknowledgment or reward for this employee.",
    minWordCount: 150,
    recommendedMinutes: 20,
    sampleAnswers: [
      {
        band: 8.5,
        text: "Dear General Manager,\n\nI am writing to express my profound gratitude for the exemplary service provided by your front-desk receptionist, Marco Rossi, during my recent stay at the Grand Harborside Hotel.\n\nMy wife and I stayed in Room 412 from October the twelfth to the fourteenth. In the early hours of Sunday morning, my wife experienced a severe allergic reaction to medication, accompanied by acute breathing difficulties. Panicked and unfamiliar with the local area, I phoned the reception desk for assistance.\n\nMarco responded with extraordinary professionalism and composure. He immediately summoned an emergency paramedic ambulance and sprinted up to our room with an oxygen-equipped emergency medical kit. He remained calmly by our side, reassuring my distressed wife, and escorted the paramedics directly to our room upon their arrival. His rapid, level-headed intervention undoubtedly averted a medical tragedy.\n\nMarco is a tremendous credit to your hospitality group. I strongly recommend that his decisive actions be formally recognized with an Employee of the Month award and a commemorative commendation in his personnel file.\n\nYours sincerely,\n\nArthur Pendelton",
        examinerCommentary: "Task Achievement: Eloquent, detailed narrative fulfilling all requirements. Tone: Formal and heartfelt commendation."
      }
    ],
    checklist: ["Specific dates and room number", "Detailed crisis and staff intervention", "Formal commendation proposed"]
  },
  {
    id: "gen-t1-15",
    taskType: "task1_general",
    title: "Letter Asking a Neighbor to Look After Your Cat While Away",
    letterType: "informal",
    difficulty: "easy",
    topic: "neighborhood",
    estimatedBand: 6.5,
    promptText: "You are going away on vacation for two weeks and need someone to take care of your pet cat.\n\nWrite an email to a friendly neighbor. In your email:\n- Tell them about your upcoming holiday and ask if they can care for your cat\n- Explain the daily feeding and care routine\n- Offer a gesture of appreciation and provide your contact information.",
    minWordCount: 150,
    recommendedMinutes: 20,
    sampleAnswers: [
      {
        band: 8.0,
        text: "Hi Sarah,\n\nHope you and the family are having a wonderful week!\n\nI'm writing to ask a huge favor. David and I are heading to Italy for a two-week holiday from July the tenth to the twenty-fourth. We were wondering if you might be willing to look after our cat, Whiskers, while we are away?\n\nHe is very low-maintenance, but he needs to be fed twice a day—one pouch of wet food in the morning at eight AM and a small scoop of dry biscuits in the evening. His fresh water bowl just needs a daily rinse and refill, and the litter box in the utility room should be scooped once every couple of days. He loves a quick chin rub if you have a minute to spare!\n\nI will leave a spare house key in a lockbox by our front door, along with emergency vet contact details. We would love to treat you to dinner at your favorite Italian bistro when we get back as a small token of our gratitude, and I'd be more than happy to return the favor whenever you travel.\n\nPlease let me know if this works for you!\n\nWarmly,\n\nEmma",
        examinerCommentary: "Task Achievement: Addresses all points warmly and clearly. Tone: Natural, friendly, and considerate neighborly informal tone."
      }
    ],
    checklist: ["Travel dates specified", "Care instructions detailed", "Offer of reciprocity/dinner"]
  }
];

// Append to academic-task1.json
const acadFile = path.resolve('./content/writing/academic-task1.json');
const currentAcad = JSON.parse(fs.readFileSync(acadFile, 'utf8'));
const mergedAcad = [...currentAcad, ...newAcadTask1, ...remainingAcad];
fs.writeFileSync(acadFile, JSON.stringify(mergedAcad, null, 2), 'utf8');
console.log(`✓ Updated academic-task1.json: Now ${mergedAcad.length} prompts (added ${newAcadTask1.length + remainingAcad.length})`);

// Append to general-task1.json
const genFile = path.resolve('./content/writing/general-task1.json');
const currentGen = JSON.parse(fs.readFileSync(genFile, 'utf8'));
const mergedGen = [...currentGen, ...newGenTask1];
fs.writeFileSync(genFile, JSON.stringify(mergedGen, null, 2), 'utf8');
console.log(`✓ Updated general-task1.json: Now ${mergedGen.length} prompts (added ${newGenTask1.length})`);
