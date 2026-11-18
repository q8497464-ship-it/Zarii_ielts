import { create } from 'zustand';

interface VocabFilterState {
  selectedTopic: string;
  selectedBand: string;
  searchQuery: string;
  setSelectedTopic: (topic: string) => void;
  setSelectedBand: (band: string) => void;
  setSearchQuery: (query: string) => void;
}

export const useVocabStore = create<VocabFilterState>((set) => ({
  selectedTopic: 'all',
  selectedBand: 'all',
  searchQuery: '',
  setSelectedTopic: (selectedTopic) => set({ selectedTopic }),
  setSelectedBand: (selectedBand) => set({ selectedBand }),
  setSearchQuery: (searchQuery) => set({ searchQuery }),
}));
