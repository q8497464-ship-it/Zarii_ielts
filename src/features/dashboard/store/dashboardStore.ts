import { create } from 'zustand';

interface DashboardUiState {
  activeTab: 'overview' | 'skills' | 'history' | 'recommendations';
  setActiveTab: (tab: 'overview' | 'skills' | 'history' | 'recommendations') => void;
}

export const useDashboardStore = create<DashboardUiState>((set) => ({
  activeTab: 'overview',
  setActiveTab: (activeTab) => set({ activeTab }),
}));
