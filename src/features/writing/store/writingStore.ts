import { create } from 'zustand';

interface WritingDraftState {
  drafts: Record<string, string>; // promptId -> essayText
  saveDraft: (promptId: string, text: string) => void;
  getDraft: (promptId: string) => string;
  clearDraft: (promptId: string) => void;
}

export const useWritingStore = create<WritingDraftState>((set, get) => ({
  drafts: {},
  saveDraft: (promptId, text) =>
    set((state) => ({ drafts: { ...state.drafts, [promptId]: text } })),
  getDraft: (promptId) => get().drafts[promptId] || '',
  clearDraft: (promptId) =>
    set((state) => {
      const next = { ...state.drafts };
      delete next[promptId];
      return { drafts: next };
    }),
}));
