# Dictionary Data Pipeline Sources & Licenses

This document records the exact sources, version information, license terms, and attribution requirements for all datasets utilized in the Zarii Dictionary data pipeline.

---

## 1. Open English WordNet (OEWN 2024 Edition)
- **Source**: Global WordNet Association
- **Repository**: [https://github.com/globalwordnet/english-wordnet](https://github.com/globalwordnet/english-wordnet)
- **Website**: [https://en-word.net/](https://en-word.net/)
- **Release**: 2024 Edition (Released 2024)
- **License**: Creative Commons Attribution 4.0 International ([CC BY 4.0](https://creativecommons.org/licenses/by/4.0/))
- **Based on**: Princeton University WordNet 3.0 / 3.1
- **Usage**: Primary source for headwords, parts of speech, senses, semantic definitions, example sentences, synonym sets, antonyms, hypernyms/hyponyms, semantic domains, and morphological exception tables (`noun.exc`, `verb.exc`, `adj.exc`, `adv.exc`).
- **Required Attribution**:
  > "Open English WordNet 2024, developed by the Global WordNet Association, based on WordNet 3.0 by Princeton University. Licensed under Creative Commons Attribution 4.0 International."

---

## 2. CMU Pronouncing Dictionary (cmudict)
- **Source**: Carnegie Mellon University Speech Group
- **Repository**: [https://github.com/cmusphinx/cmudict](https://github.com/cmusphinx/cmudict)
- **Version**: cmudict-0.7b / master (135,000+ words)
- **License**: CMU Pronouncing Dictionary License (BSD-style / Public Domain)
- **Usage**: Pronunciation representations in ARPAbet format, deterministically mapped to standard International Phonetic Alphabet (IPA) and clear English phonetic respelling.
- **Required Attribution**:
  > "The CMU Pronouncing Dictionary, Copyright (C) 1993-2015 Carnegie Mellon University. All rights reserved. Free for commercial and non-commercial use with attribution."

---

## 3. Google Web Trillion Word Corpus & OpenSubtitles Frequency Lists
- **Sources**:
  1. Google Inc. / Peter Norvig (`count_1w.txt`): [https://norvig.com/ngrams/count_1w.txt](https://norvig.com/ngrams/count_1w.txt)
  2. Hermit Dave Frequency Words (OpenSubtitles 2018 extract): [https://github.com/hermitdave/FrequencyWords](https://github.com/hermitdave/FrequencyWords)
- **Licenses**:
  - Google Web N-Grams: Public Domain / Open Database
  - OpenSubtitles Frequency extract: Creative Commons Attribution-ShareAlike 4.0 ([CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/))
- **Usage**: Used strictly for ranking word usage frequencies (1 to N) to assign CEFR level estimates (A1 to C1 / rare) and sort dictionary senses by communicative utility.
- **Required Attribution**:
  > "Word frequency rankings derived from Google Web N-Grams (Peter Norvig) and OpenSubtitles Frequency datasets (Hermit Dave)."

---

## 4. DWYL English Words (`words_alpha.txt`)
- **Source**: Infochimps / dwyl
- **Repository**: [https://github.com/dwyl/english-words](https://github.com/dwyl/english-words)
- **License**: The Unlicense / Public Domain ([https://unlicense.org/](https://unlicense.org/))
- **Usage**: Auxiliary spelling / headword validity check only. Contains no definitions, meanings, or examples.
- **Required Attribution**:
  > "Spelling and lexical verification cross-referenced against the dwyl english-words collection (Public Domain / The Unlicense)."

---

## 5. Kaikki.org / Wiktionary (Optional Flag `--with-wiktionary`)
- **Source**: Kaikki.org Wiktionary data extracts
- **Website**: [https://kaikki.org/dictionary/English/](https://kaikki.org/dictionary/English/)
- **License**: Creative Commons Attribution-ShareAlike 4.0 International ([CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/))
- **Status**: **OPTIONAL & OFF BY DEFAULT**.
- **Obligations**: If compiled with the `--with-wiktionary` flag, downstream dictionary builds must provide share-alike notices and credit Wiktionary contributors under CC BY-SA 4.0.

---

## 6. Commercial Dictionary Exclusion Confirmation
In strict adherence to intellectual property laws:
- **NO content** from Oxford University Press, Cambridge University Press, Longman / Pearson, Merriam-Webster, HarperCollins, or Macmillan is used, scraped, or embedded in Zarii.
- All definitions, phonetics, and forms are derived exclusively from the verified open-source and open-access corpora listed above.
