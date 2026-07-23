import { NavLink, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FiHome,
  FiClipboard,
  FiColumns,
  FiBarChart2,
  FiSettings,
  FiUsers,
  FiMapPin,
  FiUserCheck,
  FiChevronLeft,
  FiChevronRight,
  FiX,
} from 'react-icons/fi';
import { useAuthStore, useUIStore } from '@/store';
import { cn } from '@/utils';
import type { Role } from '@/types';

interface NavItem {
  label: string;
  path: string;
  icon: React.ReactNode;
  roles: Role[];
}

const navItems: NavItem[] = [
  { label: 'Dashboard', path: '/dashboard', icon: <FiHome size={20} />, roles: ['manager', 'dispatcher', 'technician', 'customer'] },
  { label: 'Work Orders', path: '/work-orders', icon: <FiClipboard size={20} />, roles: ['manager', 'dispatcher'] },
  { label: 'Kanban Board', path: '/kanban', icon: <FiColumns size={20} />, roles: ['manager', 'dispatcher'] },
  { label: 'Customers', path: '/customers', icon: <FiUsers size={20} />, roles: ['manager', 'dispatcher'] },
  { label: 'Sites', path: '/sites', icon: <FiMapPin size={20} />, roles: ['manager', 'dispatcher'] },
  { label: 'Technicians', path: '/technicians', icon: <FiUserCheck size={20} />, roles: ['manager', 'dispatcher'] },
  { label: 'Reports', path: '/reports', icon: <FiBarChart2 size={20} />, roles: ['manager', 'dispatcher'] },
  { label: 'Settings', path: '/settings', icon: <FiSettings size={20} />, roles: ['manager', 'dispatcher', 'technician', 'customer'] },
];

export function Sidebar() {
  const { user } = useAuthStore();
  const { sidebarOpen, sidebarCollapsed, setSidebarOpen, setSidebarCollapsed } = useUIStore();
  const location = useLocation();

  const filteredItems = navItems.filter((item) => user && item.roles.includes(user.role));

  const sidebarContent = (
    <div className="flex h-full flex-col">
      <div className={cn('flex h-16 items-center border-b border-slate-200 dark:border-slate-700', sidebarCollapsed ? 'justify-center px-2' : 'px-5')}>
        {!sidebarCollapsed && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 text-white font-bold text-sm shadow-lg shadow-blue-600/30">
              K
            </div>
            <span className="text-lg font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              KEYSTONE
            </span>
          </motion.div>
        )}
        {sidebarCollapsed && (
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 text-white font-bold text-sm shadow-lg shadow-blue-600/30">
            K
          </div>
        )}
      </div>

      <nav className="flex-1 space-y-1 px-3 py-4">
        {filteredItems.map((item) => {
          const isActive = location.pathname === item.path || location.pathname.startsWith(item.path + '/');
          return (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={() => setSidebarOpen(false)}
              className={cn(
                'flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200',
                isActive
                  ? 'bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400'
                  : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-white',
                sidebarCollapsed && 'justify-center px-2'
              )}
            >
              <span className={cn(isActive ? 'text-blue-600 dark:text-blue-400' : 'text-slate-400 dark:text-slate-500')}>
                {item.icon}
              </span>
              {!sidebarCollapsed && (
                <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                  {item.label}
                </motion.span>
              )}
            </NavLink>
          );
        })}
      </nav>

      <div className="border-t border-slate-200 p-3 dark:border-slate-700">
        <button
          onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
          className="hidden lg:flex w-full items-center justify-center gap-2 rounded-xl px-3 py-2 text-sm text-slate-500 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800"
        >
          {sidebarCollapsed ? <FiChevronRight size={18} /> : <FiChevronLeft size={18} />}
          {!sidebarCollapsed && <span>Collapse</span>}
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop sidebar */}
      <motion.aside
        animate={{ width: sidebarCollapsed ? 72 : 256 }}
        transition={{ duration: 0.2 }}
        className="fixed left-0 top-0 z-40 hidden h-full border-r border-slate-200 bg-white dark:border-slate-700 dark:bg-slate-900 lg:block"
      >
        {sidebarContent}
      </motion.aside>

      {/* Mobile sidebar */}
      <AnimatePresence>
        {sidebarOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm lg:hidden"
              onClick={() => setSidebarOpen(false)}
            />
            <motion.aside
              initial={{ x: -280 }}
              animate={{ x: 0 }}
              exit={{ x: -280 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="fixed left-0 top-0 z-50 h-full w-[256px] border-r border-slate-200 bg-white dark:border-slate-700 dark:bg-slate-900 lg:hidden"
            >
              <button
                onClick={() => setSidebarOpen(false)}
                className="absolute right-3 top-3 rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                <FiX size={18} />
              </button>
              {sidebarContent}
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
