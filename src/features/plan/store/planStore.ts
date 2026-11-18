import { create } from 'zustand';

interface PlanUiState {
  viewMode: 'timeline' | 'calendar' | 'weekly';
  setViewMode: (mode: 'timeline' | 'calendar' | 'weekly') => void;
}

export const usePlanStore = create<PlanUiState>((set) => ({
  viewMode: 'timeline',
  setViewMode: (viewMode) => set({ viewMode }),
}));
