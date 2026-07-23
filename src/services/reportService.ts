import api from './api';

export interface ReportParams {
  dateFrom: string;
  dateTo: string;
  groupBy?: string;
}

export const reportService = {
  async getDashboardStats() {
    const { data } = await api.get('/reports/dashboard');
    return data;
  },

  async getStatusBreakdown(params?: ReportParams) {
    const { data } = await api.get('/reports/status-breakdown', { params });
    return data;
  },

  async getTechnicianPerformance(params?: ReportParams) {
    const { data } = await api.get('/reports/technician-performance', { params });
    return data;
  },

  async getSLACompliance(params?: ReportParams) {
    const { data } = await api.get('/reports/sla-compliance', { params });
    return data;
  },

  async getMonthlyTrends(params?: ReportParams) {
    const { data } = await api.get('/reports/monthly-trends', { params });
    return data;
  },

  async exportReport(type: string, params?: ReportParams): Promise<Blob> {
    const { data } = await api.get(`/reports/export/${type}`, {
      params,
      responseType: 'blob',
    });
    return data;
  },
};
