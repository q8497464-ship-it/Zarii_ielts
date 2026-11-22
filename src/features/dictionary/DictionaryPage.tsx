import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Search,
  Bookmark,
  History,
  Sparkles,
  DownloadCloud,
  CheckCircle2,
  HardDrive,
  Layers,
  BookOpen,
  ArrowRight,
  Filter,
} from 'lucide-react';
import {
  dictionaryStore,
  getFavoriteWords,
  getDictionaryHistory,
  clearDictionaryHistory,
  type DictionaryEntry,
  type SearchOptions,
  type OfflineStorageStatus,
} from './dictionaryService';
import { DictionarySearchBox } from './components/DictionarySearchBox';
import { WordOfTheDayCard } from './components/WordOfTheDayCard';
import { BrowseLetterGrid } from './components/BrowseLetterGrid';
import { DictionaryFiltersBar } from './components/DictionaryFiltersBar';
import { OfflineDownloadModal } from './components/OfflineDownloadModal';
import { PracticeWordModal } from './components/PracticeWordModal';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import { useAppStore } from '../../store/useAppStore';
import type { DictionaryFavorite, DictionaryHistory as HistoryType } from '../../types';

export function DictionaryPage() {
  const navigate = useNavigate();
  const { settings, addToast } = useAppStore();

  const [activeTab, setActiveTab] = useState<'search' | 'favorites' | 'history'>('search');
  const [wordOfTheDay, setWordOfTheDay] = useState<DictionaryEntry | null>(null);
  const [favorites, setFavorites] = useState<DictionaryFavorite[]>([]);
  const [history, setHistory] = useState<HistoryType[]>([]);
  const [selectedLetter, setSelectedLetter] = useState<string | null>(null);
  const [letterWords, setLetterWords] = useState<Array<{ w: string; p: string; r: number }>>([]);
  const [isLetterLoading, setIsLetterLoading] = useState(false);

  // Offline Download modal state
  const [isOfflineModalOpen, setIsOfflineModalOpen] = useState(false);
  const [offlineStatus, setOfflineStatus] = useState<OfflineStorageStatus>(() =>
    dictionaryStore.getOfflineStatus()
  );

  // Practice modal state
  const [practiceEntry, setPracticeEntry] = useState<DictionaryEntry | null>(null);

  // Filter options
  const [searchOptions, setSearchOptions] = useState<SearchOptions>({
    limit: 20,
    partOfSpeech: 'all',
    level: 'all',
    commonOnly: false,
    safeMode: !(settings?.showAllWordsSafeMode ?? false),
  });

  // Load Word of the Day & offline status on mount
  useEffect(() => {
    dictionaryStore.getWordOfTheDay().then(setWordOfTheDay);
    loadFavorites();
    loadHistory();
  }, []);

  const loadFavorites = async () => {
    const favs = await getFavoriteWords();
    setFavorites(favs);
  };

  const loadHistory = async () => {
    const hist = await getDictionaryHistory(25);
    setHistory(hist);
  };

  // When a letter is clicked in A-Z grid, load top words for that letter from index
  useEffect(() => {
    if (!selectedLetter) {
      setLetterWords([]);
      return;
    }

    setIsLetterLoading(true);
    dictionaryStore
      .getIndexShard(selectedLetter)
      .then(items => {
        let filtered = items;
        if (searchOptions.commonOnly) {
          filtered = filtered.filter(i => i.r <= 12000);
        }
        if (searchOptions.partOfSpeech && searchOptions.partOfSpeech !== 'all') {
          const code = searchOptions.partOfSpeech.charAt(0);
          filtered = filtered.filter(i => i.p === code);
        }
        setLetterWords(filtered.slice(0, 48));
        setIsLetterLoading(false);
      })
      .catch(() => setIsLetterLoading(false));
  }, [selectedLetter, searchOptions]);

  return (
    <div className="max-w-5xl mx-auto py-8 px-4 sm:px-6 space-y-8 animate-in fade-in duration-150">
      {/* Top Header & Offline Download Pill */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-200 dark:border-slate-800">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight flex items-center gap-2.5">
            <BookOpen className="w-8 h-8 text-emerald-600" />
            <span>English Dictionary</span>
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Over 144,000 words with phonetics, audio, forms, and CEFR level estimations.
          </p>
        </div>

        {/* Offline Manager Button */}
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsOfflineModalOpen(true)}
            className="gap-2 text-xs border-emerald-500/30 text-emerald-700 dark:text-emerald-300 hover:bg-emerald-50 dark:hover:bg-emerald-950/30"
          >
            {offlineStatus.isDownloaded ? (
              <>
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Offline: Ready ({offlineStatus.type === 'essential' ? '20k' : 'Full'})</span>
              </>
            ) : (
              <>
                <DownloadCloud className="w-4 h-4 text-emerald-600" />
                <span>Download for Offline</span>
              </>
            )}
          </Button>
        </div>
      </div>

      {/* SEARCH SECTION */}
      <div className="space-y-4">
        <DictionarySearchBox
          searchOptions={searchOptions}
          onSelectWord={w => navigate(`/app/dictionary/${encodeURIComponent(w.toLowerCase())}`)}
        />

        {/* Filters Bar */}
        <DictionaryFiltersBar
          options={searchOptions}
          onChangeOptions={setSearchOptions}
          showAllWordsSafeMode={settings?.showAllWordsSafeMode ?? false}
        />
      </div>

      {/* NAVIGATION TABS */}
      <div className="flex border-b border-slate-200 dark:border-slate-800 gap-6 text-sm font-semibold">
        <button
          onClick={() => setActiveTab('search')}
          className={`pb-3 transition-colors relative ${
            activeTab === 'search'
              ? 'text-emerald-600 dark:text-emerald-400'
              : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
          }`}
        >
          <span>Discover & Browse</span>
          {activeTab === 'search' && (
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald-600 rounded-full" />
          )}
        </button>

        <button
          onClick={() => {
            setActiveTab('favorites');
            loadFavorites();
          }}
          className={`pb-3 transition-colors relative flex items-center gap-1.5 ${
            activeTab === 'favorites'
              ? 'text-emerald-600 dark:text-emerald-400'
              : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
          }`}
        >
          <Bookmark className="w-4 h-4" />
          <span>Favorites ({favorites.length})</span>
          {activeTab === 'favorites' && (
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald-600 rounded-full" />
          )}
        </button>

        <button
          onClick={() => {
            setActiveTab('history');
            loadHistory();
          }}
          className={`pb-3 transition-colors relative flex items-center gap-1.5 ${
            activeTab === 'history'
              ? 'text-emerald-600 dark:text-emerald-400'
              : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
          }`}
        >
          <History className="w-4 h-4" />
          <span>Recent Searches ({history.length})</span>
          {activeTab === 'history' && (
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald-600 rounded-full" />
          )}
        </button>
      </div>

      {/* TAB 1: DISCOVER & BROWSE */}
      {activeTab === 'search' && (
        <div className="space-y-8">
          {/* Word of the Day */}
          {wordOfTheDay && (
            <WordOfTheDayCard
              entry={wordOfTheDay}
              onPractice={entry => setPracticeEntry(entry)}
            />
          )}

          {/* Browse A to Z Grid */}
          <Card className="p-6 space-y-4 border border-slate-200 dark:border-slate-800">
            <BrowseLetterGrid
              selectedLetter={selectedLetter}
              onSelectLetter={setSelectedLetter}
            />

            {/* Letter Words Display */}
            {selectedLetter && (
              <div className="pt-4 border-t border-slate-100 dark:border-slate-800 space-y-3">
                <div className="flex items-center justify-between text-xs text-slate-500">
                  <span className="font-bold text-slate-900 dark:text-slate-100">
                    Common words starting with "{selectedLetter.toUpperCase()}":
                  </span>
                  <span>{letterWords.length} words listed</span>
                </div>

                {isLetterLoading ? (
                  <div className="py-8 text-center text-xs text-slate-400">
                    Loading words for {selectedLetter.toUpperCase()}...
                  </div>
                ) : (
                  <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-2">
                    {letterWords.map(item => (
                      <button
                        key={item.w}
                        onClick={() => navigate(`/app/dictionary/${encodeURIComponent(item.w.toLowerCase())}`)}
                        className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-emerald-500 hover:bg-emerald-50/50 dark:hover:bg-emerald-950/20 text-left transition-all"
                      >
                        <div className="font-bold text-sm text-slate-900 dark:text-slate-100 capitalize truncate">
                          {item.w}
                        </div>
                        <div className="text-3xs text-slate-400 uppercase font-mono mt-0.5">
                          {item.p === 'n' ? 'noun' : item.p === 'v' ? 'verb' : item.p === 'a' ? 'adj' : 'adv'}
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}
          </Card>
        </div>
      )}

      {/* TAB 2: FAVORITES */}
      {activeTab === 'favorites' && (
        <div className="space-y-4">
          {favorites.length === 0 ? (
            <div className="py-16 text-center space-y-3 text-slate-400">
              <Bookmark className="w-10 h-10 mx-auto stroke-1" />
              <p className="text-sm">No bookmarked words yet. Tap the bookmark icon on any entry to save it here.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              {favorites.map(fav => (
                <Card
                  key={fav.id}
                  onClick={() => navigate(`/app/dictionary/${encodeURIComponent(fav.word.toLowerCase())}`)}
                  className="p-4 space-y-2 cursor-pointer hover:border-emerald-500 transition-all border border-slate-200 dark:border-slate-800"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-base capitalize text-slate-900 dark:text-slate-100">
                      {fav.word}
                    </span>
                    <Badge variant="secondary" className="text-3xs font-mono uppercase">
                      {fav.partOfSpeech}
                    </Badge>
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2 leading-relaxed">
                    {fav.definition}
                  </p>
                  {fav.urduMeaning && (
                    <p className="text-xs font-serif text-emerald-700 dark:text-emerald-400 text-right dir-rtl">
                      {fav.urduMeaning}
                    </p>
                  )}
                </Card>
              ))}
            </div>
          )}
        </div>
      )}

      {/* TAB 3: RECENT SEARCHES */}
      {activeTab === 'history' && (
        <div className="space-y-4">
          {history.length === 0 ? (
            <div className="py-16 text-center space-y-3 text-slate-400">
              <History className="w-10 h-10 mx-auto stroke-1" />
              <p className="text-sm">No recent searches recorded yet.</p>
            </div>
          ) : (
            <div className="space-y-3">
              <div className="flex justify-end">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={async () => {
                    await clearDictionaryHistory();
                    setHistory([]);
                  }}
                  className="text-xs text-rose-600 border-rose-200"
                >
                  Clear History
                </Button>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-2">
                {history.map(h => (
                  <button
                    key={h.id}
                    onClick={() => navigate(`/app/dictionary/${encodeURIComponent(h.query.toLowerCase())}`)}
                    className="p-3 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-emerald-500 text-left capitalize text-sm font-semibold transition-all hover:bg-emerald-50/40 dark:hover:bg-slate-800"
                  >
                    {h.query}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Modals */}
      <OfflineDownloadModal
        isOpen={isOfflineModalOpen}
        onClose={() => setIsOfflineModalOpen(false)}
        status={offlineStatus}
        onStatusChange={setOfflineStatus}
      />

      {practiceEntry && (
        <PracticeWordModal
          isOpen={!!practiceEntry}
          onClose={() => setPracticeEntry(null)}
          entry={practiceEntry}
        />
      )}
    </div>
  );
}
