import api from './api';
import type {
  WorkOrder,
  WorkOrderStatus,
  PaginatedResponse,
  PaginationParams,
} from '@/types';

export const workOrderService = {
  async getAll(params?: Partial<PaginationParams>): Promise<PaginatedResponse<WorkOrder>> {
    const { data } = await api.get('/work-orders', { params });
    return data;
  },

  async getById(id: string): Promise<WorkOrder> {
    const { data } = await api.get(`/work-orders/${id}`);
    return data;
  },

  async getByTechnician(technicianId: string): Promise<WorkOrder[]> {
    const { data } = await api.get(`/technicians/${technicianId}/work-orders`);
    return data;
  },

  async getByCustomer(customerId: string): Promise<WorkOrder[]> {
    const { data } = await api.get(`/customers/${customerId}/work-orders`);
    return data;
  },

  async create(workOrder: Partial<WorkOrder>): Promise<WorkOrder> {
    const { data } = await api.post('/work-orders', workOrder);
    return data;
  },

  async update(id: string, workOrder: Partial<WorkOrder>): Promise<WorkOrder> {
    const { data } = await api.put(`/work-orders/${id}`, workOrder);
    return data;
  },

  async updateStatus(id: string, status: WorkOrderStatus): Promise<WorkOrder> {
    const { data } = await api.patch(`/work-orders/${id}/status`, { status });
    return data;
  },

  async assign(id: string, technicianId: string): Promise<WorkOrder> {
    const { data } = await api.post(`/work-orders/${id}/assign`, { technicianId });
    return data;
  },

  async delete(id: string): Promise<void> {
    await api.delete(`/work-orders/${id}`);
  },

  async addComment(id: string, content: string): Promise<WorkOrder> {
    const { data } = await api.post(`/work-orders/${id}/comments`, { content });
    return data;
  },

  async uploadAttachment(id: string, file: File): Promise<WorkOrder> {
    const formData = new FormData();
    formData.append('file', file);
    const { data } = await api.post(`/work-orders/${id}/attachments`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return data;
  },

  async getKanban(): Promise<Record<string, WorkOrder[]>> {
    const { data } = await api.get('/work-orders/kanban');
    return data;
  },

  async reorder(kanbanData: Record<string, string[]>): Promise<void> {
    await api.put('/work-orders/kanban', { columns: kanbanData });
  },
};
