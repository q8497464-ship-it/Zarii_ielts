import { create } from 'zustand';

interface ReadingState {
  currentTestId: string | null;
  selectedPassage: number;
  highlightedText: string[];
  setCurrentTestId: (id: string | null) => void;
  setSelectedPassage: (passage: number) => void;
  addHighlight: (text: string) => void;
  clearHighlights: () => void;
}

export const useReadingStore = create<ReadingState>((set) => ({
  currentTestId: null,
  selectedPassage: 0,
  highlightedText: [],
  setCurrentTestId: (id) => set({ currentTestId: id }),
  setSelectedPassage: (passage) => set({ selectedPassage: passage }),
  addHighlight: (text) => set((s) => ({ highlightedText: [...s.highlightedText, text] })),
  clearHighlights: () => set({ highlightedText: [] }),
}));
