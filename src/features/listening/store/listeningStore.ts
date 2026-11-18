import { create } from 'zustand';

interface ListeningState {
  currentTestId: string | null;
  volume: number;
  playbackRate: number;
  setCurrentTestId: (id: string | null) => void;
  setVolume: (v: number) => void;
  setPlaybackRate: (r: number) => void;
}

export const useListeningStore = create<ListeningState>((set) => ({
  currentTestId: null,
  volume: 1,
  playbackRate: 1,
  setCurrentTestId: (id) => set({ currentTestId: id }),
  setVolume: (volume) => set({ volume }),
  setPlaybackRate: (playbackRate) => set({ playbackRate }),
}));
