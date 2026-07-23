import api from './api';
import type { Part, PaginatedResponse, PaginationParams } from '@/types';

export const partsService = {
  async getAll(params?: Partial<PaginationParams>): Promise<PaginatedResponse<Part>> {
    const { data } = await api.get('/parts', { params });
    return data;
  },

  async getById(id: string): Promise<Part> {
    const { data } = await api.get(`/parts/${id}`);
    return data;
  },

  async create(part: Partial<Part>): Promise<Part> {
    const { data } = await api.post('/parts', part);
    return data;
  },

  async update(id: string, part: Partial<Part>): Promise<Part> {
    const { data } = await api.put(`/parts/${id}`, part);
    return data;
  },

  async delete(id: string): Promise<void> {
    await api.delete(`/parts/${id}`);
  },
};
