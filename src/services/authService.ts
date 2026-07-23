import api from './api';
import type { AuthResponse, User } from '@/types';

export const authService = {
  async login(email: string, password: string): Promise<AuthResponse> {
    const { data } = await api.post<AuthResponse>('/auth/login', {
      email,
      password,
    });
    return data;
  },

  async forgotPassword(email: string): Promise<{ message: string }> {
    const { data } = await api.post('/auth/forgot-password', { email });
    return data;
  },

  async resetPassword(token: string, password: string): Promise<{ message: string }> {
    const { data } = await api.post('/auth/reset-password', { token, password });
    return data;
  },

  async getProfile(): Promise<User> {
    const { data } = await api.get<User>('/auth/me');
    return data;
  },

  async updateProfile(updates: Partial<User>): Promise<User> {
    const { data } = await api.put<User>('/auth/profile', updates);
    return data;
  },

  async changePassword(currentPassword: string, newPassword: string): Promise<{ message: string }> {
    const { data } = await api.post('/auth/change-password', {
      currentPassword,
      newPassword,
    });
    return data;
  },

  logout(): void {
    localStorage.removeItem('ks_access_token');
    localStorage.removeItem('ks_refresh_token');
    localStorage.removeItem('ks_user');
  },
};
