import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  BookOpen,
  Volume2,
  WifiOff,
  Zap,
  ShieldCheck,
  Search,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  ExternalLink,
} from 'lucide-react';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';

export function DictionaryOverviewPage() {
  useEffect(() => {
    document.title = 'Offline English Dictionary & Pronunciation Guide | Zarii';
  }, []);

  const dictionarySchema = {
    '@context': 'https://schema.org',
    '@type': 'DefinedTermSet',
    name: 'Zarii Built-In English Dictionary',
    description:
      'A fast, 100% free, offline-capable English dictionary with over 150,000 headwords, US/UK audio pronunciation, CEFR level estimates, and Urdu translations.',
    provider: {
      '@type': 'Organization',
      name: 'Zarii',
      sameAs: 'https://zarii.app',
    },
    isAccessibleForFree: true,
  };

  return (
    <div className="max-w-4xl mx-auto space-y-10 py-6 text-slate-800 dark:text-slate-200">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(dictionarySchema) }}
      />

      {/* Top Navigation */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800">
        <Link
          to="/"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-500 hover:text-slate-900 dark:hover:text-white"
        >
          <ArrowLeft className="w-4 h-4" />
          Home
        </Link>
        <div className="flex items-center gap-3">
          <Link
            to="/credits"
            className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 hover:underline"
          >
            Data Sources &amp; Licenses &rarr;
          </Link>
          <Badge variant="outline" className="text-emerald-700 dark:text-emerald-300 border-emerald-500/30">
            Offline Capable
          </Badge>
        </div>
      </div>

      {/* Header */}
      <div className="space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-[#5BB78D]/15 text-[#124F40] dark:text-[#5BB78D] border border-[#5BB78D]/25">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Lexical Engine</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white">
          Built-in Offline English Dictionary
        </h1>
        <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400 leading-relaxed max-w-2xl">
          150,000+ headwords with natural pronunciation, phonetic spellings, CEFR difficulty indicators, and instant Urdu meanings. No ads, no popups, and no giant multi-gigabyte downloads.
        </p>
      </div>

      {/* Feature Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <Card className="p-6 bg-white dark:bg-[#112019] border border-slate-200 dark:border-white/10 shadow-xs space-y-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
            <Zap className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-slate-900 dark:text-white">
            Instant Prefix Autocomplete
          </h3>
          <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
            Search with sub-10ms latency using intelligent letter-sharded indexes. Handles inflected forms like "running" &rarr; "run" and typo suggestions seamlessly.
          </p>
        </Card>

        <Card className="p-6 bg-white dark:bg-[#112019] border border-slate-200 dark:border-white/10 shadow-xs space-y-3">
          <div className="w-10 h-10 rounded-xl bg-teal-500/15 text-teal-600 dark:text-teal-400 flex items-center justify-center">
            <Volume2 className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-slate-900 dark:text-white">
            Audio Pronunciation &amp; IPA
          </h3>
          <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
            Dual US and UK pronunciation powered by browser speech synthesis with normal and slow speeds, alongside CMU ARPAbet-to-IPA transcriptions and phonetic respelling.
          </p>
        </Card>

        <Card className="p-6 bg-white dark:bg-[#112019] border border-slate-200 dark:border-white/10 shadow-xs space-y-3">
          <div className="w-10 h-10 rounded-xl bg-cyan-500/15 text-cyan-600 dark:text-cyan-400 flex items-center justify-center">
            <WifiOff className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-slate-900 dark:text-white">
            100% Offline Architecture
          </h3>
          <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
            Individual letter shards are cached on demand via CacheStorage. Once opened, words remain available completely offline during flights, commutes, or internet outages.
          </p>
        </Card>

        <Card className="p-6 bg-white dark:bg-[#112019] border border-slate-200 dark:border-white/10 shadow-xs space-y-3">
          <div className="w-10 h-10 rounded-xl bg-purple-500/15 text-purple-600 dark:text-purple-400 flex items-center justify-center">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-slate-900 dark:text-white">
            CEFR Levels &amp; Word of the Day
          </h3>
          <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
            Every sense displays an estimated CEFR level (A1 to C1) and frequency indicator, helping you prioritize vocabulary that genuinely appears on exams and in daily conversation.
          </p>
        </Card>
      </div>

      {/* Interactive Mockup Example Box */}
      <div className="p-6 rounded-2xl bg-white dark:bg-[#112019] border border-slate-200/90 dark:border-white/10 space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-white/5">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Dictionary Entry Preview</span>
          <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-full">
            B2 Estimated Level
          </span>
        </div>

        <div className="space-y-2">
          <div className="flex items-baseline gap-3">
            <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white">eloquent</h2>
            <span className="text-xs font-mono text-slate-400">/ˈɛl.ə.kwənt/</span>
            <span className="text-2xs font-bold uppercase px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
              adjective
            </span>
          </div>

          <div className="text-sm font-arabic text-emerald-700 dark:text-emerald-400 font-semibold" dir="rtl">
            خوش بیان، فصیح، پر اثر
          </div>

          <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
            Fluent or persuasive in speaking or writing; clearly expressing feelings or meaning.
          </p>

          <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-100 dark:border-white/5 text-xs italic text-slate-600 dark:text-slate-400">
            "The candidate gave an eloquent speech that addressed every examiner question with precision."
          </div>
        </div>
      </div>

      {/* Open Source Notice */}
      <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <h4 className="text-sm font-bold text-slate-900 dark:text-white">
            Built on Open English WordNet &amp; CMUdict
          </h4>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Strictly built upon permissively licensed, open-access academic corpora. No proprietary textbook content.
          </p>
        </div>
        <Link
          to="/credits"
          className="text-xs font-bold text-emerald-600 dark:text-emerald-400 hover:underline shrink-0"
        >
          View Full Attributions &rarr;
        </Link>
      </div>

      {/* CTA Box */}
      <div className="p-8 rounded-2xl bg-gradient-to-r from-[#124F40] to-[#1a6e59] text-white flex flex-col sm:flex-row items-center justify-between gap-6 shadow-md">
        <div className="space-y-1 text-center sm:text-left">
          <h3 className="text-xl font-bold">Try the dictionary free</h3>
          <p className="text-xs text-emerald-100 max-w-md">
            Look up any word, practice US/UK pronunciation, and save entries to your personal word bank.
          </p>
        </div>
        <Link
          to="/signup"
          className="px-6 py-3 bg-[#5BB78D] hover:bg-[#4ea77e] text-[#0A2E25] font-bold text-xs rounded-xl flex items-center gap-2 shrink-0 transition-colors shadow-xs"
        >
          <span>Open Dictionary Free</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
