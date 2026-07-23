import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import { FiUser, FiLock, FiSun, FiMoon, FiLogOut } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import { Card, Button, Breadcrumb } from '@/components/common';
import { useAuthStore, useUIStore } from '@/store';
import { useTheme } from '@/hooks';
import { getInitials } from '@/utils';
import { ROLE_LABELS } from '@/constants';

export function SettingsPage() {
  const { user, logout, updateUser } = useAuthStore();
  const { isDark, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'profile' | 'password' | 'appearance'>('profile');

  const { register: registerProfile, handleSubmit: handleProfileSubmit } = useForm({
    defaultValues: {
      firstName: user?.firstName || '',
      lastName: user?.lastName || '',
      email: user?.email || '',
      phone: user?.phone || '',
    },
  });

  const { register: registerPassword, handleSubmit: handlePasswordSubmit, formState: { errors: pwdErrors } } = useForm();

  const onProfileSubmit = (data: { firstName: string; lastName: string; email: string; phone: string }) => {
    updateUser(data);
  };

  const onPasswordSubmit = (data: Record<string, string>) => {
    // Handle password change
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const tabs = [
    { key: 'profile', label: 'Profile', icon: <FiUser size={16} /> },
    { key: 'password', label: 'Password', icon: <FiLock size={16} /> },
    { key: 'appearance', label: 'Appearance', icon: isDark ? <FiMoon size={16} /> : <FiSun size={16} /> },
  ] as const;

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        <Breadcrumb items={[{ label: 'Dashboard', href: '/dashboard' }, { label: 'Settings' }]} />
        <h1 className="mt-4 text-2xl font-bold text-slate-900 dark:text-white">Settings</h1>
      </motion.div>

      <div className="flex gap-1 border-b border-slate-200 dark:border-slate-700">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`flex items-center gap-2 border-b-2 px-4 py-3 text-sm font-medium transition-colors ${
              activeTab === tab.key
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-slate-500 hover:text-slate-700 dark:text-slate-400'
            }`}
          >
            {tab.icon} {tab.label}
          </button>
        ))}
      </div>

      {activeTab === 'profile' && (
        <Card>
          <div className="mb-6 flex items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-500 text-xl font-bold text-white">
              {user ? getInitials(user.firstName, user.lastName) : '?'}
            </div>
            <div>
              <p className="text-lg font-semibold text-slate-900 dark:text-white">
                {user ? `${user.firstName} ${user.lastName}` : ''}
              </p>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                {user?.role ? ROLE_LABELS[user.role] : ''}
              </p>
            </div>
          </div>
          <form onSubmit={handleProfileSubmit(onProfileSubmit)} className="space-y-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300">First Name</label>
                <input {...registerProfile('firstName')} className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm dark:border-slate-600 dark:bg-slate-700 dark:text-white" />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300">Last Name</label>
                <input {...registerProfile('lastName')} className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm dark:border-slate-600 dark:bg-slate-700 dark:text-white" />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300">Email</label>
                <input {...registerProfile('email')} type="email" className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm dark:border-slate-600 dark:bg-slate-700 dark:text-white" />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300">Phone</label>
                <input {...registerProfile('phone')} className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm dark:border-slate-600 dark:bg-slate-700 dark:text-white" />
              </div>
            </div>
            <Button type="submit">Save Changes</Button>
          </form>
        </Card>
      )}

      {activeTab === 'password' && (
        <Card>
          <h3 className="mb-4 text-base font-semibold text-slate-900 dark:text-white">Change Password</h3>
          <form onSubmit={handlePasswordSubmit(onPasswordSubmit)} className="space-y-4">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300">Current Password</label>
              <input type="password" {...registerPassword('currentPassword', { required: true })} className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm dark:border-slate-600 dark:bg-slate-700 dark:text-white" />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300">New Password</label>
              <input type="password" {...registerPassword('newPassword', { required: true, minLength: 8 })} className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm dark:border-slate-600 dark:bg-slate-700 dark:text-white" />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300">Confirm Password</label>
              <input type="password" {...registerPassword('confirmPassword', { required: true })} className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm dark:border-slate-600 dark:bg-slate-700 dark:text-white" />
            </div>
            <Button type="submit">Update Password</Button>
          </form>
        </Card>
      )}

      {activeTab === 'appearance' && (
        <Card>
          <h3 className="mb-4 text-base font-semibold text-slate-900 dark:text-white">Appearance</h3>
          <div className="flex items-center justify-between rounded-xl border border-slate-200 p-4 dark:border-slate-700">
            <div className="flex items-center gap-3">
              {isDark ? <FiMoon size={20} className="text-blue-500" /> : <FiSun size={20} className="text-amber-500" />}
              <div>
                <p className="text-sm font-medium text-slate-900 dark:text-white">Dark Mode</p>
                <p className="text-xs text-slate-500 dark:text-slate-400">Toggle between light and dark theme</p>
              </div>
            </div>
            <button
              onClick={toggleTheme}
              className={`relative h-6 w-11 rounded-full transition-colors ${isDark ? 'bg-blue-600' : 'bg-slate-300'}`}
            >
              <span className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow-sm transition-transform ${isDark ? 'left-[22px]' : 'left-0.5'}`} />
            </button>
          </div>

          <div className="mt-6 border-t border-slate-200 pt-6 dark:border-slate-700">
            <Button variant="danger" leftIcon={<FiLogOut />} onClick={handleLogout}>
              Logout
            </Button>
          </div>
        </Card>
      )}
    </div>
  );
}
