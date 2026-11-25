import React, { useState, useMemo } from 'react';
import { RotateCcw, FolderPlus, Check } from 'lucide-react';
import { ExerciseFeedbackBanner } from './ExerciseFeedbackBanner';
import { Button } from '../../../../components/ui/Button';

interface CategoryDefinition {
  category: string;
  items: string[];
}

interface SortCategoriesExerciseProps {
  id: string;
  prompt: string;
  categories: CategoryDefinition[];
  explanation: string;
  urduExplanation?: string;
  showUrdu?: boolean;
  onAnswer: (isCorrect: boolean, result: Record<string, string[]>) => void;
  onNext: () => void;
  canRetry?: boolean;
}

export const SortCategoriesExercise: React.FC<SortCategoriesExerciseProps> = ({
  id,
  prompt,
  categories = [],
  explanation,
  urduExplanation,
  showUrdu = true,
  onAnswer,
  onNext,
  canRetry = true,
}) => {
  // Flatten all items and shuffle
  const allItems = useMemo(() => {
    const list: string[] = [];
    categories.forEach((c) => list.push(...c.items));
    return list.sort(() => 0.5 - Math.random());
  }, [categories]);

  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  const [placed, setPlaced] = useState<Record<string, string[]>>(() => {
    const init: Record<string, string[]> = {};
    categories.forEach((c) => (init[c.category] = []));
    return init;
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  // Remaining unplaced items
  const placedSet = useMemo(() => {
    const set = new Set<string>();
    Object.values(placed).forEach((arr) => arr.forEach((item) => set.add(item)));
    return set;
  }, [placed]);

  const unplacedItems = useMemo(() => {
    return allItems.filter((item) => !placedSet.has(item));
  }, [allItems, placedSet]);

  const handleSelectItem = (item: string) => {
    if (isSubmitted) return;
    setSelectedItem(item);
  };

  const handlePlaceInCategory = (catName: string) => {
    if (isSubmitted || !selectedItem) return;
    setPlaced((prev) => ({
      ...prev,
      [catName]: [...prev[catName], selectedItem],
    }));
    setSelectedItem(null);
  };

  const handleRemoveFromCategory = (catName: string, item: string) => {
    if (isSubmitted) return;
    setPlaced((prev) => ({
      ...prev,
      [catName]: prev[catName].filter((i) => i !== item),
    }));
  };

  const handleReset = () => {
    if (isSubmitted) return;
    const fresh: Record<string, string[]> = {};
    categories.forEach((c) => (fresh[c.category] = []));
    setPlaced(fresh);
    setSelectedItem(null);
  };

  const handleSubmit = () => {
    if (isSubmitted || unplacedItems.length > 0) return;

    let correct = true;
    for (const cat of categories) {
      const userPlaced = placed[cat.category] || [];
      const targetItems = cat.items;
      if (userPlaced.length !== targetItems.length) {
        correct = false;
        break;
      }
      for (const item of userPlaced) {
        if (!targetItems.includes(item)) {
          correct = false;
          break;
        }
      }
    }

    setIsCorrect(correct);
    setIsSubmitted(true);
    onAnswer(correct, placed);
  };

  const handleRetry = () => {
    setIsSubmitted(false);
    setIsCorrect(false);
    handleReset();
  };

  return (
    <div className="space-y-4">
      <div className="text-lg font-medium text-gray-900 dark:text-gray-100">
        {prompt}
      </div>

      <div className="text-xs text-gray-700 dark:text-gray-300">
        Tap an item below, then tap the category box where it belongs.
      </div>

      {/* Categories buckets */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
        {categories.map((cat) => (
          <div
            key={cat.category}
            onClick={() => handlePlaceInCategory(cat.category)}
            className={`p-3.5 rounded-xl border-2 transition-all cursor-pointer min-h-[100px] flex flex-col justify-between ${
              selectedItem
                ? 'border-[#124F40] dark:border-[#5BB78D] bg-emerald-50/20 dark:bg-emerald-950/20 hover:bg-emerald-50/40'
                : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800'
            }`}
          >
            <div className="flex items-center justify-between border-b border-gray-100 dark:border-gray-700/60 pb-2 mb-2">
              <span className="font-semibold text-sm text-gray-900 dark:text-gray-100">
                {cat.category}
              </span>
              <span className="text-xs text-gray-700 dark:text-gray-300 font-medium">
                {placed[cat.category]?.length || 0} items
              </span>
            </div>

            <div className="flex flex-wrap gap-1.5 min-h-[36px]">
              {placed[cat.category]?.map((item) => (
                <button
                  key={item}
                  type="button"
                  disabled={isSubmitted}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRemoveFromCategory(cat.category, item);
                  }}
                  className="px-2.5 py-1 rounded-md bg-[#124F40] text-white text-xs font-medium shadow-sm hover:bg-[#0e3f33] active:scale-95 transition-all"
                >
                  {item} ✕
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Unplaced Items Pool */}
      {unplacedItems.length > 0 && (
        <div className="space-y-1.5 pt-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-gray-700 dark:text-gray-300">
            Available Items ({unplacedItems.length})
          </span>
          <div className="flex flex-wrap gap-2">
            {unplacedItems.map((item) => (
              <button
                key={item}
                type="button"
                disabled={isSubmitted}
                onClick={() => handleSelectItem(item)}
                className={`px-3 py-1.5 rounded-lg border text-sm font-medium transition-all shadow-sm ${
                  selectedItem === item
                    ? 'border-[#124F40] dark:border-[#5BB78D] bg-emerald-50 text-[#124F40] dark:text-[#5BB78D] ring-2 ring-[#124F40]/30'
                    : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 hover:border-gray-400'
                }`}
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      )}

      {!isSubmitted && (
        <div className="flex items-center gap-2 pt-2">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={handleReset}
            disabled={unplacedItems.length === allItems.length}
            className="gap-1.5 text-gray-600 dark:text-gray-300"
          >
            <RotateCcw className="w-4 h-4" />
            Reset
          </Button>

          <Button
            type="button"
            onClick={handleSubmit}
            disabled={unplacedItems.length > 0}
            className="bg-[#124F40] hover:bg-[#0e3f33] text-white px-5 rounded-xl ml-auto"
          >
            Check Categories
          </Button>
        </div>
      )}

      {isSubmitted && (
        <ExerciseFeedbackBanner
          isCorrect={isCorrect}
          explanation={explanation}
          urduExplanation={urduExplanation}
          showUrdu={showUrdu}
          onRetry={handleRetry}
          onContinue={onNext}
          canRetry={canRetry}
        />
      )}
    </div>
  );
};
