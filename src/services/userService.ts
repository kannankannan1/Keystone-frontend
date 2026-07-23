import api from './api';
import type { User, PaginatedResponse, PaginationParams } from '@/types';

export const userService = {
  async getAll(params?: Partial<PaginationParams>): Promise<PaginatedResponse<User>> {
    const { data } = await api.get('/users', { params });
    return data;
  },

  async getTechnicians(): Promise<User[]> {
    const { data } = await api.get('/users', { params: { role: 'technician' } });
    return data.data || data;
  },

  async getById(id: string): Promise<User> {
    const { data } = await api.get(`/users/${id}`);
    return data;
  },

  async create(user: Partial<User> & { password?: string }): Promise<User> {
    const { data } = await api.post('/users', user);
    return data;
  },

  async update(id: string, user: Partial<User>): Promise<User> {
    const { data } = await api.put(`/users/${id}`, user);
    return data;
  },

  async delete(id: string): Promise<void> {
    await api.delete(`/users/${id}`);
  },
};
