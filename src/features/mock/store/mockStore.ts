import { create } from 'zustand';

interface MockStoreState {
  activeExamId: string | null;
  sectionTimes: Record<string, number>; // sectionId -> elapsedSeconds
  setActiveExamId: (id: string | null) => void;
  recordSectionTime: (sectionId: string, elapsed: number) => void;
}

export const useMockStore = create<MockStoreState>((set) => ({
  activeExamId: null,
  sectionTimes: {},
  setActiveExamId: (id) => set({ activeExamId: id }),
  recordSectionTime: (sectionId, elapsed) =>
    set((s) => ({ sectionTimes: { ...s.sectionTimes, [sectionId]: elapsed } })),
}));
