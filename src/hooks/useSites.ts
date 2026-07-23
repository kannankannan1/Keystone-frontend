import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { siteService } from '@/services';
import type { PaginationParams, Site } from '@/types';
import toast from 'react-hot-toast';

export function useSites(params?: Partial<PaginationParams>) {
  return useQuery({
    queryKey: ['sites', params],
    queryFn: () => siteService.getAll(params),
  });
}

export function useSite(id: string) {
  return useQuery({
    queryKey: ['site', id],
    queryFn: () => siteService.getById(id),
    enabled: !!id,
  });
}

export function useSitesByCustomer(customerId: string) {
  return useQuery({
    queryKey: ['sites', 'customer', customerId],
    queryFn: () => siteService.getByCustomer(customerId),
    enabled: !!customerId,
  });
}

export function useCreateSite() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (site: Partial<Site>) => siteService.create(site),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['sites'] });
      toast.success('Site created successfully');
    },
    onError: () => toast.error('Failed to create site'),
  });
}

export function useUpdateSite() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<Site> }) =>
      siteService.update(id, data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['sites'] });
      toast.success('Site updated successfully');
    },
    onError: () => toast.error('Failed to update site'),
  });
}

export function useDeleteSite() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => siteService.delete(id),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['sites'] });
      toast.success('Site deleted');
    },
    onError: () => toast.error('Failed to delete site'),
  });
}
