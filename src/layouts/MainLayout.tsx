import { Outlet } from 'react-router-dom';
import { Sidebar } from '@/components/common/Sidebar';
import { Navbar } from '@/components/common/Navbar';
import { useUIStore } from '@/store';
import { cn } from '@/utils';

export function MainLayout() {
  const { sidebarCollapsed } = useUIStore();

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      <Sidebar />
      <div
        className={cn(
          'transition-all duration-200',
          sidebarCollapsed ? 'lg:ml-[72px]' : 'lg:ml-[256px]'
        )}
      >
        <Navbar />
        <main className="p-4 lg:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
