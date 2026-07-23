import { create } from 'zustand';
import type { User } from '@/types';

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  setAuth: (user: User, token: string) => void;
  logout: () => void;
  setLoading: (loading: boolean) => void;
  updateUser: (user: Partial<User>) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: JSON.parse(localStorage.getItem('ks_user') || 'null'),
  token: localStorage.getItem('ks_access_token'),
  isAuthenticated: !!localStorage.getItem('ks_access_token'),
  isLoading: false,

  setAuth: (user, token) => {
    localStorage.setItem('ks_access_token', token);
    localStorage.setItem('ks_user', JSON.stringify(user));
    set({ user, token, isAuthenticated: true });
  },

  logout: () => {
    localStorage.removeItem('ks_access_token');
    localStorage.removeItem('ks_refresh_token');
    localStorage.removeItem('ks_user');
    set({ user: null, token: null, isAuthenticated: false });
  },

  setLoading: (isLoading) => set({ isLoading }),

  updateUser: (updates) =>
    set((state) => {
      if (!state.user) return state;
      const updated = { ...state.user, ...updates };
      localStorage.setItem('ks_user', JSON.stringify(updated));
      return { user: updated };
    }),
}));
