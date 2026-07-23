import { create } from 'zustand';
import type { FilterState, WorkOrderStatus, WorkOrderPriority } from '@/types';

interface UIState {
  sidebarOpen: boolean;
  sidebarCollapsed: boolean;
  theme: 'light' | 'dark';
  filter: FilterState;
  toggleSidebar: () => void;
  setSidebarOpen: (open: boolean) => void;
  setSidebarCollapsed: (collapsed: boolean) => void;
  setTheme: (theme: 'light' | 'dark') => void;
  setFilter: (filter: Partial<FilterState>) => void;
  resetFilter: () => void;
}

const defaultFilter: FilterState = {
  search: '',
  status: '',
  priority: '',
  technicianId: '',
  dateFrom: '',
  dateTo: '',
};

const savedTheme = (localStorage.getItem('ks_theme') as 'light' | 'dark') || 'light';

export const useUIStore = create<UIState>((set) => ({
  sidebarOpen: false,
  sidebarCollapsed: false,
  theme: savedTheme,
  filter: defaultFilter,

  toggleSidebar: () => set((s) => ({ sidebarOpen: !s.sidebarOpen })),
  setSidebarOpen: (sidebarOpen) => set({ sidebarOpen }),
  setSidebarCollapsed: (sidebarCollapsed) => set({ sidebarCollapsed }),

  setTheme: (theme) => {
    localStorage.setItem('ks_theme', theme);
    set({ theme });
  },

  setFilter: (updates) =>
    set((s) => ({ filter: { ...s.filter, ...updates } })),

  resetFilter: () => set({ filter: defaultFilter }),
}));
