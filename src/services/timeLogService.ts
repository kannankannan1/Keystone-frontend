import api from './api';
import type { TimeLog } from '@/types';

export const timeLogService = {
  async getByWorkOrder(workOrderId: string): Promise<TimeLog[]> {
    const { data } = await api.get(`/work-orders/${workOrderId}/time-logs`);
    return data;
  },

  async start(workOrderId: string, description: string): Promise<TimeLog> {
    const { data } = await api.post(`/work-orders/${workOrderId}/time-logs`, {
      description,
    });
    return data;
  },

  async stop(timeLogId: string): Promise<TimeLog> {
    const { data } = await api.patch(`/time-logs/${timeLogId}/stop`);
    return data;
  },

  async delete(timeLogId: string): Promise<void> {
    await api.delete(`/time-logs/${timeLogId}`);
  },
};
