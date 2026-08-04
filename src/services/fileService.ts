import api from './api';
import type { Attachment } from '@/types';

export const fileService = {
  async uploadFile(file: File, workOrderId?: string): Promise<Attachment> {
    const formData = new FormData();
    formData.append('file', file);
    if (workOrderId) {
      formData.append('workOrderId', workOrderId);
    }
    const { data } = await api.post('/files/upload', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return data;
  },

  async getFilesByWorkOrder(workOrderId: string): Promise<Attachment[]> {
    const { data } = await api.get(`/files/work-order/${workOrderId}`);
    return data;
  },

  async downloadFile(fileName: string): Promise<void> {
    const { data } = await api.get(`/files/${fileName}`, {
      responseType: 'blob',
    });
    const url = window.URL.createObjectURL(new Blob([data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', fileName);
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.URL.revokeObjectURL(url);
  },

  async deleteFile(fileId: string): Promise<void> {
    await api.delete(`/files/${fileId}`);
  },
};

export default fileService;