import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ExternalLink, ShieldCheck, BookOpen, Award, ArrowLeft, Heart, CheckCircle2 } from 'lucide-react';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';

interface CreditSource {
  id: string;
  name: string;
  organization: string;
  license: string;
  licenseUrl: string;
  sourceUrl: string;
  description: string;
  attributionText: string;
}

interface CreditsData {
  version: string;
  updatedAt: string;
  project: string;
  statement: string;
  sources: CreditSource[];
  exclusions: string;
}

export function CreditsPage() {
  const [credits, setCredits] = useState<CreditsData | null>(null);

  useEffect(() => {
    fetch('/credits.json')
      .then((res) => res.json())
      .then((data) => setCredits(data))
      .catch(() => {
        // Fallback static data
        setCredits({
          version: '1.0.0',
          updatedAt: '2026-11-22',
          project: 'Zarii IELTS & English',
          statement: 'Zarii is committed to 100% free, high-quality, open-access education. Our dictionary and lexical engines are built strictly upon open-source and permissively licensed linguistic corpora.',
          sources: [
            {
              id: 'open-english-wordnet',
              name: 'Open English WordNet (2024 Edition)',
              organization: 'Global WordNet Association & Princeton University',
              license: 'Creative Commons Attribution 4.0 International (CC BY 4.0)',
              licenseUrl: 'https://creativecommons.org/licenses/by/4.0/',
              sourceUrl: 'https://github.com/globalwordnet/english-wordnet',
              description: 'Comprehensive English lexical database providing synsets, definitions, semantic domains, relations, examples, and morphological exception indexes.',
              attributionText: 'Open English WordNet 2024 by the Global WordNet Association, based on Princeton University WordNet 3.0. Licensed under CC BY 4.0.',
            },
            {
              id: 'cmudict',
              name: 'CMU Pronouncing Dictionary',
              organization: 'Carnegie Mellon University Speech Group',
              license: 'CMUdict License (BSD-Style / Public Domain)',
              licenseUrl: 'https://github.com/cmusphinx/cmudict/blob/master/LICENSE',
              sourceUrl: 'https://github.com/cmusphinx/cmudict',
              description: 'North American English pronunciation dictionary with over 134,000 phonetic transcriptions, mapped to International Phonetic Alphabet (IPA) and readable respelling.',
              attributionText: 'The CMU Pronouncing Dictionary, Copyright (C) 1993-2015 Carnegie Mellon University. Free for commercial and educational use with attribution.',
            },
            {
              id: 'frequency-ngrams',
              name: 'Google Web Trillion Word N-Grams & OpenSubtitles Frequency',
              organization: 'Google Inc., Peter Norvig & Hermit Dave',
              license: 'Public Domain & CC BY-SA 4.0',
              licenseUrl: 'https://creativecommons.org/licenses/by-sa/4.0/',
              sourceUrl: 'https://norvig.com/ngrams/count_1w.txt',
              description: 'Statistical word frequency lists used to compute CEFR level estimates (A1 to C1) and sort definitions by real-world usage prevalence.',
              attributionText: 'Frequency rankings computed using datasets by Peter Norvig (Google Web Trillion Word Corpus) and Hermit Dave (OpenSubtitles).',
            },
            {
              id: 'dwyl-words',
              name: 'DWYL English Words',
              organization: 'Infochimps & dwyl',
              license: 'The Unlicense (Public Domain)',
              licenseUrl: 'https://unlicense.org/',
              sourceUrl: 'https://github.com/dwyl/english-words',
              description: 'Open English headword spell-checking list used solely for lexical validation (no definitions or proprietary texts).',
              attributionText: 'Spelling validation aided by dwyl english-words (Public Domain).',
            },
          ],
          exclusions: 'No copyrighted material from Oxford, Cambridge, Longman, Merriam-Webster, or other proprietary dictionaries is utilized.',
        });
      });
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Navigation & Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-3">
            <Link
              to="/"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-500 hover:text-slate-900 dark:hover:text-white"
            >
              <ArrowLeft className="w-4 h-4" />
              Home
            </Link>
            <span className="text-slate-300 dark:text-slate-700">|</span>
            <Link
              to="/app/dictionary"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-emerald-600 dark:text-emerald-400 hover:underline"
            >
              <BookOpen className="w-4 h-4" />
              Dictionary App
            </Link>
          </div>
          <Badge variant="outline" className="text-emerald-700 dark:text-emerald-300 border-emerald-500/30">
            Open Source & Free
          </Badge>
        </div>

        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-emerald-600/10 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
              <Award className="w-7 h-7" />
            </div>
            <div>
              <h1 className="text-3xl font-extrabold tracking-tight">Open Source Credits & Attribution</h1>
              <p className="text-slate-500 dark:text-slate-400 text-sm">
                Empowering learners worldwide through permissive, community-driven linguistic datasets.
              </p>
            </div>
          </div>

          <Card className="p-6 bg-emerald-50/50 dark:bg-emerald-950/20 border-emerald-200/60 dark:border-emerald-800/40">
            <div className="flex items-start gap-3">
              <ShieldCheck className="w-6 h-6 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
              <div className="space-y-2">
                <h3 className="font-semibold text-emerald-900 dark:text-emerald-200 text-base">
                  Non-Infringement & Intellectual Integrity Commitment
                </h3>
                <p className="text-sm text-emerald-800/90 dark:text-emerald-300/90 leading-relaxed">
                  {credits?.statement}
                </p>
                <div className="pt-2 flex items-center gap-2 text-xs font-medium text-emerald-700 dark:text-emerald-400">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  <span>{credits?.exclusions}</span>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Source Cards */}
        <div className="space-y-6">
          <h2 className="text-xl font-bold flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-emerald-500" />
            Linguistic Corpora & Pronunciation Databases
          </h2>

          <div className="grid grid-cols-1 gap-6">
            {credits?.sources.map((source) => (
              <Card key={source.id} className="p-6 space-y-4 shadow-sm border border-slate-200 dark:border-slate-800">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">{source.name}</h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400">{source.organization}</p>
                  </div>
                  <Badge variant="secondary" className="w-fit text-xs font-mono">
                    {source.license}
                  </Badge>
                </div>

                <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  {source.description}
                </p>

                <div className="p-3 bg-slate-100 dark:bg-slate-900/60 rounded-lg text-xs font-mono text-slate-600 dark:text-slate-400 border border-slate-200/50 dark:border-slate-800/50">
                  <span className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">Official Attribution:</span>
                  {source.attributionText}
                </div>

                <div className="flex flex-wrap items-center gap-4 pt-1">
                  <a
                    href={source.sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-medium text-emerald-600 dark:text-emerald-400 hover:underline"
                  >
                    View Project Repository
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                  <a
                    href={source.licenseUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 hover:underline"
                  >
                    License Details
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="text-center pt-8 border-t border-slate-200 dark:border-slate-800 text-xs text-slate-500 space-y-2">
          <p>
            Zarii is dedicated to democratizing English fluency and IELTS test preparation for students worldwide.
          </p>
          <div className="flex items-center justify-center gap-1">
            <span>Crafted with</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 inline" />
            <span>for genuine learners.</span>
          </div>
        </div>
      </div>
    </div>
  );
}
