import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMenu, FiBell, FiSun, FiMoon, FiLogOut, FiUser, FiSettings, FiChevronDown } from 'react-icons/fi';
import { useAuthStore, useUIStore, useNotificationStore } from '@/store';
import { useTheme } from '@/hooks';
import { getInitials } from '@/utils';
import { ROLE_LABELS, ROLE_COLORS } from '@/constants';

export function Navbar() {
  const { user, logout } = useAuthStore();
  const { toggleSidebar } = useUIStore();
  const { unreadCount, notifications, markAllRead } = useNotificationStore();
  const { isDark, toggleTheme } = useTheme();
  const navigate = useNavigate();

  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const userMenuRef = useRef<HTMLDivElement>(null);
  const notifRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target as Node)) setShowUserMenu(false);
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) setShowNotifications(false);
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-slate-200 bg-white/80 px-4 backdrop-blur-xl dark:border-slate-700 dark:bg-slate-900/80 lg:px-6">
      <div className="flex items-center gap-3">
        <button
          onClick={toggleSidebar}
          className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800 lg:hidden"
        >
          <FiMenu size={20} />
        </button>
        <h2 className="hidden text-lg font-semibold text-slate-900 dark:text-white lg:block">
          {user?.role ? ROLE_LABELS[user.role] : 'Dashboard'}
        </h2>
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={toggleTheme}
          className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800"
        >
          {isDark ? <FiSun size={18} /> : <FiMoon size={18} />}
        </button>

        <div ref={notifRef} className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative rounded-lg p-2 text-slate-500 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800"
          >
            <FiBell size={18} />
            {unreadCount > 0 && (
              <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white">
                {unreadCount}
              </span>
            )}
          </button>
          <AnimatePresence>
            {showNotifications && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                className="absolute right-0 top-full mt-2 w-80 rounded-xl border border-slate-200 bg-white shadow-xl dark:border-slate-700 dark:bg-slate-800"
              >
                <div className="flex items-center justify-between border-b border-slate-200 px-4 py-3 dark:border-slate-700">
                  <h3 className="font-semibold text-slate-900 dark:text-white">Notifications</h3>
                  {unreadCount > 0 && (
                    <button onClick={markAllRead} className="text-xs text-blue-600 hover:text-blue-700">
                      Mark all read
                    </button>
                  )}
                </div>
                <div className="max-h-64 overflow-y-auto">
                  {notifications.length === 0 ? (
                    <p className="px-4 py-8 text-center text-sm text-slate-500">No notifications</p>
                  ) : (
                    notifications.slice(0, 5).map((n) => (
                      <div key={n.id} className="border-b border-slate-100 px-4 py-3 last:border-0 dark:border-slate-700/50">
                        <p className="text-sm font-medium text-slate-900 dark:text-white">{n.title}</p>
                        <p className="text-xs text-slate-500 dark:text-slate-400">{n.message}</p>
                      </div>
                    ))
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div ref={userMenuRef} className="relative">
          <button
            onClick={() => setShowUserMenu(!showUserMenu)}
            className="flex items-center gap-2 rounded-xl px-2 py-1.5 hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-indigo-500 text-xs font-bold text-white">
              {user ? getInitials(user.firstName, user.lastName) : '?'}
            </div>
            <div className="hidden text-left md:block">
              <p className="text-sm font-medium text-slate-900 dark:text-white">
                {user ? `${user.firstName} ${user.lastName}` : 'User'}
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {user?.role ? ROLE_LABELS[user.role] : ''}
              </p>
            </div>
            <FiChevronDown size={14} className="hidden text-slate-400 md:block" />
          </button>
          <AnimatePresence>
            {showUserMenu && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                className="absolute right-0 top-full mt-2 w-56 rounded-xl border border-slate-200 bg-white py-1 shadow-xl dark:border-slate-700 dark:bg-slate-800"
              >
                <div className="border-b border-slate-200 px-4 py-3 dark:border-slate-700">
                  <p className="text-sm font-medium text-slate-900 dark:text-white">
                    {user ? `${user.firstName} ${user.lastName}` : ''}
                  </p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">{user?.email}</p>
                </div>
                <button
                  onClick={() => { navigate('/settings'); setShowUserMenu(false); }}
                  className="flex w-full items-center gap-2 px-4 py-2.5 text-sm text-slate-700 hover:bg-slate-50 dark:text-slate-300 dark:hover:bg-slate-700"
                >
                  <FiUser size={16} /> Profile
                </button>
                <button
                  onClick={() => { navigate('/settings'); setShowUserMenu(false); }}
                  className="flex w-full items-center gap-2 px-4 py-2.5 text-sm text-slate-700 hover:bg-slate-50 dark:text-slate-300 dark:hover:bg-slate-700"
                >
                  <FiSettings size={16} /> Settings
                </button>
                <div className="my-1 border-t border-slate-200 dark:border-slate-700" />
                <button
                  onClick={handleLogout}
                  className="flex w-full items-center gap-2 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/20"
                >
                  <FiLogOut size={16} /> Logout
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </header>
  );
}
