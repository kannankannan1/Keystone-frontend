import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { customerService } from '@/services';
import type { PaginationParams, Customer } from '@/types';
import toast from 'react-hot-toast';

export function useCustomers(params?: Partial<PaginationParams>) {
  return useQuery({
    queryKey: ['customers', params],
    queryFn: () => customerService.getAll(params),
  });
}

export function useCustomer(id: string) {
  return useQuery({
    queryKey: ['customer', id],
    queryFn: () => customerService.getById(id),
    enabled: !!id,
  });
}

export function useCreateCustomer() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (customer: Partial<Customer>) => customerService.create(customer),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['customers'] });
      toast.success('Customer created successfully');
    },
    onError: () => toast.error('Failed to create customer'),
  });
}

export function useUpdateCustomer() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<Customer> }) =>
      customerService.update(id, data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['customers'] });
      toast.success('Customer updated successfully');
    },
    onError: () => toast.error('Failed to update customer'),
  });
}

export function useDeleteCustomer() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => customerService.delete(id),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['customers'] });
      toast.success('Customer deleted');
    },
    onError: () => toast.error('Failed to delete customer'),
  });
}
