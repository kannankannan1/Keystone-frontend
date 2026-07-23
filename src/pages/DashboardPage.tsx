import { useAuthStore } from '@/store';
import { ManagerDashboard } from '@/pages/manager/ManagerDashboard';
import { DispatcherDashboard } from '@/pages/dispatcher/DispatcherDashboard';
import { TechnicianDashboard } from '@/pages/technician/TechnicianDashboard';
import { CustomerDashboard } from '@/pages/customer/CustomerDashboard';

export function DashboardPage() {
  const { user } = useAuthStore();

  switch (user?.role) {
    case 'manager':
      return <ManagerDashboard />;
    case 'dispatcher':
      return <DispatcherDashboard />;
    case 'technician':
      return <TechnicianDashboard />;
    case 'customer':
      return <CustomerDashboard />;
    default:
      return <ManagerDashboard />;
  }
}
