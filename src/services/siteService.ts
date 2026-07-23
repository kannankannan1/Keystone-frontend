import api from './api';
import type { Site, PaginatedResponse, PaginationParams } from '@/types';

export const siteService = {
  async getAll(params?: Partial<PaginationParams>): Promise<PaginatedResponse<Site>> {
    const { data } = await api.get('/sites', { params });
    return data;
  },

  async getById(id: string): Promise<Site> {
    const { data } = await api.get(`/sites/${id}`);
    return data;
  },

  async getByCustomer(customerId: string): Promise<Site[]> {
    const { data } = await api.get(`/customers/${customerId}/sites`);
    return data;
  },

  async create(site: Partial<Site>): Promise<Site> {
    const { data } = await api.post('/sites', site);
    return data;
  },

  async update(id: string, site: Partial<Site>): Promise<Site> {
    const { data } = await api.put(`/sites/${id}`, site);
    return data;
  },

  async delete(id: string): Promise<void> {
    await api.delete(`/sites/${id}`);
  },
};
