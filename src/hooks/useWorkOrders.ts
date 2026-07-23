import { useCallback, useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { workOrderService } from '@/services';
import type { PaginationParams, WorkOrder, WorkOrderStatus } from '@/types';
import toast from 'react-hot-toast';

export function useWorkOrders(params?: Partial<PaginationParams>) {
  return useQuery({
    queryKey: ['work-orders', params],
    queryFn: () => workOrderService.getAll(params),
  });
}

export function useWorkOrder(id: string) {
  return useQuery({
    queryKey: ['work-order', id],
    queryFn: () => workOrderService.getById(id),
    enabled: !!id,
  });
}

export function useTechnicianWorkOrders(technicianId: string) {
  return useQuery({
    queryKey: ['work-orders', 'technician', technicianId],
    queryFn: () => workOrderService.getByTechnician(technicianId),
    enabled: !!technicianId,
  });
}

export function useCustomerWorkOrders(customerId: string) {
  return useQuery({
    queryKey: ['work-orders', 'customer', customerId],
    queryFn: () => workOrderService.getByCustomer(customerId),
    enabled: !!customerId,
  });
}

export function useCreateWorkOrder() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (wo: Partial<WorkOrder>) => workOrderService.create(wo),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['work-orders'] });
      toast.success('Work order created successfully');
    },
    onError: () => toast.error('Failed to create work order'),
  });
}

export function useUpdateWorkOrder() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<WorkOrder> }) =>
      workOrderService.update(id, data),
    onSuccess: (_, { id }) => {
      qc.invalidateQueries({ queryKey: ['work-orders'] });
      qc.invalidateQueries({ queryKey: ['work-order', id] });
      toast.success('Work order updated successfully');
    },
    onError: () => toast.error('Failed to update work order'),
  });
}

export function useUpdateWorkOrderStatus() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, status }: { id: string; status: WorkOrderStatus }) =>
      workOrderService.updateStatus(id, status),
    onSuccess: (_, { id }) => {
      qc.invalidateQueries({ queryKey: ['work-orders'] });
      qc.invalidateQueries({ queryKey: ['work-order', id] });
      qc.invalidateQueries({ queryKey: ['kanban'] });
      toast.success('Status updated successfully');
    },
    onError: () => toast.error('Failed to update status'),
  });
}

export function useAssignWorkOrder() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, technicianId }: { id: string; technicianId: string }) =>
      workOrderService.assign(id, technicianId),
    onSuccess: (_, { id }) => {
      qc.invalidateQueries({ queryKey: ['work-orders'] });
      qc.invalidateQueries({ queryKey: ['work-order', id] });
      toast.success('Technician assigned successfully');
    },
    onError: () => toast.error('Failed to assign technician'),
  });
}

export function useDeleteWorkOrder() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => workOrderService.delete(id),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['work-orders'] });
      toast.success('Work order deleted');
    },
    onError: () => toast.error('Failed to delete work order'),
  });
}

export function useAddComment() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, content }: { id: string; content: string }) =>
      workOrderService.addComment(id, content),
    onSuccess: (_, { id }) => {
      qc.invalidateQueries({ queryKey: ['work-order', id] });
      toast.success('Comment added');
    },
  });
}

export function useKanban() {
  return useQuery({
    queryKey: ['kanban'],
    queryFn: () => workOrderService.getKanban(),
  });
}

export function useReorderKanban() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: Record<string, string[]>) => workOrderService.reorder(data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['kanban'] });
    },
  });
}

export function useWorkOrderPagination() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState<WorkOrderStatus | ''>('');
  const limit = 10;

  const params: Partial<PaginationParams> = {
    page,
    limit,
    ...(search && { search }),
    ...(status && { status }),
  };

  const { data, isLoading, isError } = useWorkOrders(params);

  const goToPage = useCallback((p: number) => setPage(p), []);

  return {
    data,
    isLoading,
    isError,
    page,
    search,
    status,
    setSearch,
    setStatus,
    goToPage,
    setPage,
  };
}
