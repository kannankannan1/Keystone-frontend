import { useQuery } from '@tanstack/react-query';
import { userService } from '@/services';

export function useTechnicians() {
  return useQuery({
    queryKey: ['technicians'],
    queryFn: () => userService.getTechnicians(),
  });
}
