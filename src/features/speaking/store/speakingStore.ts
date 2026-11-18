import { create } from 'zustand';

interface SpeakingStoreState {
  currentPart: 1 | 2 | 3;
  transcript: string;
  isMicPermissionGranted: boolean;
  setCurrentPart: (part: 1 | 2 | 3) => void;
  setTranscript: (text: string) => void;
  appendTranscript: (text: string) => void;
  setMicPermission: (granted: boolean) => void;
  resetTranscript: () => void;
}

export const useSpeakingStore = create<SpeakingStoreState>((set) => ({
  currentPart: 1,
  transcript: '',
  isMicPermissionGranted: false,
  setCurrentPart: (currentPart) => set({ currentPart }),
  setTranscript: (transcript) => set({ transcript }),
  appendTranscript: (text) => set((s) => ({ transcript: `${s.transcript} ${text}`.trim() })),
  setMicPermission: (isMicPermissionGranted) => set({ isMicPermissionGranted }),
  resetTranscript: () => set({ transcript: '' }),
}));
