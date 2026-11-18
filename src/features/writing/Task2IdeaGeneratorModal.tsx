import React, { useState } from 'react';
import {
  X,
  Lightbulb,
  Search,
  CheckCircle2,
  Copy,
  Check,
  BookOpen,
  ArrowRight,
  Sparkles,
  Layers,
} from 'lucide-react';
import { TASK2_IDEA_BANK } from './task2IdeaData';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { Card } from '../../components/ui/Card';

interface Task2IdeaGeneratorModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTopic?: string;
}

export function Task2IdeaGeneratorModal({
  isOpen,
  onClose,
  initialTopic,
}: Task2IdeaGeneratorModalProps) {
  const [selectedIdeaId, setSelectedIdeaId] = useState(TASK2_IDEA_BANK[0].id);
  const [searchQuery, setSearchQuery] = useState(initialTopic || '');
  const [copiedOutline, setCopiedOutline] = useState(false);

  if (!isOpen) return null;

  const filteredIdeas = TASK2_IDEA_BANK.filter((item) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      item.topic.toLowerCase().includes(q) ||
      item.theme.toLowerCase().includes(q) ||
      item.topicVocabulary.some((v) => v.phrase.toLowerCase().includes(q))
    );
  });

  const activeIdea =
    TASK2_IDEA_BANK.find((item) => item.id === selectedIdeaId) ||
    filteredIdeas[0] ||
    TASK2_IDEA_BANK[0];

  const handleCopyOutline = () => {
    const outline = `### IELTS Task 2 Essay Outline: ${activeIdea.topic}

1. INTRODUCTION
- Hook / Paraphrase: Introduce the contemporary debate on ${activeIdea.theme.toLowerCase()}.
- Thesis Statement: ${activeIdea.sampleThesis}

2. BODY PARAGRAPH 1 (Point of View A)
- Topic Sentence: Foremost among the supporting considerations is that ${activeIdea.argumentsFor[0].point.toLowerCase()}.
- Elaboration: ${activeIdea.argumentsFor[0].explanation}
- Concrete Exemplification: For instance, ${activeIdea.argumentsFor[0].example}
${
  activeIdea.argumentsFor[1]
    ? `- Supplementary Point: Furthermore, ${activeIdea.argumentsFor[1].point.toLowerCase()} (${activeIdea.argumentsFor[1].explanation})`
    : ''
}

3. BODY PARAGRAPH 2 (Point of View B / Counter-perspective)
- Topic Sentence: Conversely, compelling reservations emerge regarding ${activeIdea.argumentsAgainst[0].point.toLowerCase()}.
- Elaboration: ${activeIdea.argumentsAgainst[0].explanation}
- Concrete Exemplification: A salient case in point is ${activeIdea.argumentsAgainst[0].example}

4. CONCLUSION
- Restatement of Thesis: In summary, while both arguments carry merit, the decisive factor remains the balance between progress and safeguards.
- Future Outlook / Recommendation: Moving forward, coordinated stakeholder engagement is vital.`;

    navigator.clipboard.writeText(outline);
    setCopiedOutline(true);
    setTimeout(() => setCopiedOutline(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs animate-fadeIn">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] flex flex-col overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-900/80">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-teal-100 dark:bg-teal-900/50 text-teal-700 dark:text-teal-300 flex items-center justify-center">
              <Lightbulb className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900 dark:text-slate-100">
                Task 2 Idea & Argument Generator
              </h2>
              <p className="text-xs text-slate-500">
                Brainstorm high-scoring arguments, real-world examples, and academic lexis
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search & Topic Selector Bar */}
        <div className="px-6 py-3 bg-slate-100/60 dark:bg-slate-800/40 border-b border-slate-200/80 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search topic (e.g. AI, Climate, Education)..."
              className="w-full pl-9 pr-3 py-1.5 text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 focus:ring-1 focus:ring-teal-500"
            />
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
            {TASK2_IDEA_BANK.slice(0, 5).map((item) => (
              <button
                key={item.id}
                onClick={() => setSelectedIdeaId(item.id)}
                className={`px-2.5 py-1 rounded-md text-2xs font-semibold whitespace-nowrap transition-colors ${
                  activeIdea.id === item.id
                    ? 'bg-teal-600 text-white shadow-xs'
                    : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:border-teal-500'
                }`}
              >
                {item.theme}
              </button>
            ))}
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-6 overflow-y-auto">
          {/* Active Topic Banner */}
          <div className="p-4 rounded-xl bg-gradient-to-r from-teal-500/10 via-slate-500/5 to-transparent border border-teal-500/20 space-y-1.5">
            <div className="flex items-center gap-2">
              <Badge variant="teal" size="sm">
                {activeIdea.theme}
              </Badge>
              <span className="text-2xs font-bold uppercase tracking-wider text-teal-600 dark:text-teal-400">
                Essay Prompt Focus
              </span>
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">
              {activeIdea.topic}
            </h3>
          </div>

          {/* Side-by-Side Arguments FOR vs AGAINST */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Arguments In Favor */}
            <div className="p-4 rounded-xl bg-teal-50/40 dark:bg-teal-950/20 border border-teal-200/80 dark:border-teal-800/80 space-y-3">
              <div className="flex items-center gap-2 pb-1 border-b border-teal-200 dark:border-teal-800">
                <CheckCircle2 className="w-4 h-4 text-teal-600 dark:text-teal-400" />
                <h4 className="text-xs font-bold uppercase tracking-wider text-teal-800 dark:text-teal-300">
                  Supporting Arguments (In Favor)
                </h4>
              </div>

              <div className="space-y-3">
                {activeIdea.argumentsFor.map((arg, idx) => (
                  <div key={idx} className="space-y-1 text-xs">
                    <span className="font-bold text-slate-900 dark:text-slate-100 block">
                      {idx + 1}. {arg.point}
                    </span>
                    <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                      {arg.explanation}
                    </p>
                    <div className="text-2xs text-teal-700 dark:text-teal-300 bg-white/70 dark:bg-slate-900/60 p-2 rounded border border-teal-100 dark:border-teal-900">
                      <span className="font-semibold">Example: </span>
                      {arg.example}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Arguments Against */}
            <div className="p-4 rounded-xl bg-rose-50/40 dark:bg-rose-950/20 border border-rose-200/80 dark:border-rose-800/80 space-y-3">
              <div className="flex items-center gap-2 pb-1 border-b border-rose-200 dark:border-rose-800">
                <Sparkles className="w-4 h-4 text-rose-600 dark:text-rose-400" />
                <h4 className="text-xs font-bold uppercase tracking-wider text-rose-800 dark:text-rose-300">
                  Counter-Arguments (Opposing View)
                </h4>
              </div>

              <div className="space-y-3">
                {activeIdea.argumentsAgainst.map((arg, idx) => (
                  <div key={idx} className="space-y-1 text-xs">
                    <span className="font-bold text-slate-900 dark:text-slate-100 block">
                      {idx + 1}. {arg.point}
                    </span>
                    <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                      {arg.explanation}
                    </p>
                    <div className="text-2xs text-rose-700 dark:text-rose-300 bg-white/70 dark:bg-slate-900/60 p-2 rounded border border-rose-100 dark:border-rose-900">
                      <span className="font-semibold">Example: </span>
                      {arg.example}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Model Thesis Statement */}
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="text-2xs font-bold uppercase tracking-wider text-brand-700 dark:text-brand-300">
                Sample Band 8.5 Thesis Statement
              </span>
              <Badge variant="outline" size="sm">
                Clear Position Throughout
              </Badge>
            </div>
            <p className="text-xs font-serif text-slate-800 dark:text-slate-200 italic leading-relaxed">
              "{activeIdea.sampleThesis}"
            </p>
          </div>

          {/* Topic-Specific Lexicon */}
          <div className="space-y-2.5">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 block">
              High-Scoring Topic Collocations (Band 7.5 - 9.0)
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {activeIdea.topicVocabulary.map((voc, i) => (
                <div
                  key={i}
                  className="p-3 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-xs space-y-1"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-teal-700 dark:text-teal-400 font-mono">
                      {voc.phrase}
                    </span>
                  </div>
                  <p className="text-slate-500 text-2xs">{voc.meaning}</p>
                  <div className="text-2xs text-slate-700 dark:text-slate-300 italic pt-0.5">
                    Collocation: <span className="font-medium text-slate-900 dark:text-slate-100">"{voc.collocation}"</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer with Copy Outline CTA */}
        <div className="px-6 py-3 border-t border-slate-200 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-900/80 flex items-center justify-between">
          <span className="text-xs text-slate-500">
            Use this structure to organize your 250-word Task 2 essay.
          </span>
          <Button
            variant="primary"
            size="sm"
            onClick={handleCopyOutline}
          >
            {copiedOutline ? (
              <>
                <Check className="w-3.5 h-3.5 mr-1.5 text-white" /> Outline Copied!
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 mr-1.5" /> Copy 4-Paragraph Outline
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
