import api from './api';
import type { Customer, PaginatedResponse, PaginationParams } from '@/types';

export const customerService = {
  async getAll(params?: Partial<PaginationParams>): Promise<PaginatedResponse<Customer>> {
    const { data } = await api.get('/customers', { params });
    return data;
  },

  async getById(id: string): Promise<Customer> {
    const { data } = await api.get(`/customers/${id}`);
    return data;
  },

  async create(customer: Partial<Customer>): Promise<Customer> {
    const { data } = await api.post('/customers', customer);
    return data;
  },

  async update(id: string, customer: Partial<Customer>): Promise<Customer> {
    const { data } = await api.put(`/customers/${id}`, customer);
    return data;
  },

  async delete(id: string): Promise<void> {
    await api.delete(`/customers/${id}`);
  },
};
