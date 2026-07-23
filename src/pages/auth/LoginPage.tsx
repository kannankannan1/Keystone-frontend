import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { FiMail, FiLock, FiEye, FiEyeOff } from 'react-icons/fi';
import toast from 'react-hot-toast';
import { useAuthStore } from '@/store';
import { Button } from '@/components/common';
import type { Role } from '@/types';

interface LoginForm {
  email: string;
  password: string;
}

const MOCK_USERS: Record<string, { password: string; user: { id: string; email: string; firstName: string; lastName: string; role: Role; phone: string; createdAt: string; updatedAt: string } }> = {
  'manager@keystone.io': {
    password: 'password',
    user: { id: '1', email: 'manager@keystone.io', firstName: 'Sarah', lastName: 'Johnson', role: 'manager', phone: '555-0100', createdAt: '2026-01-01T00:00:00Z', updatedAt: '2026-01-01T00:00:00Z' },
  },
  'dispatcher@keystone.io': {
    password: 'password',
    user: { id: '2', email: 'dispatcher@keystone.io', firstName: 'Alex', lastName: 'Kumar', role: 'dispatcher', phone: '555-0200', createdAt: '2026-01-01T00:00:00Z', updatedAt: '2026-01-01T00:00:00Z' },
  },
  'technician@keystone.io': {
    password: 'password',
    user: { id: '3', email: 'technician@keystone.io', firstName: 'John', lastName: 'Smith', role: 'technician', phone: '555-0300', createdAt: '2026-01-01T00:00:00Z', updatedAt: '2026-01-01T00:00:00Z' },
  },
  'customer@keystone.io': {
    password: 'password',
    user: { id: '4', email: 'customer@keystone.io', firstName: 'Jane', lastName: 'Doe', role: 'customer', phone: '555-0400', createdAt: '2026-01-01T00:00:00Z', updatedAt: '2026-01-01T00:00:00Z' },
  },
};

export function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { setAuth } = useAuthStore();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>();

  const onSubmit = async (data: LoginForm) => {
    setIsLoading(true);
    await new Promise((r) => setTimeout(r, 600));
    const entry = MOCK_USERS[data.email.toLowerCase()];
    if (entry && data.password === entry.password) {
      setAuth(entry.user, 'demo-jwt-token');
      toast.success(`Welcome back, ${entry.user.firstName}!`);
      navigate('/dashboard');
    } else {
      toast.error('Invalid email or password');
    }
    setIsLoading(false);
  };

  return (
    <div>
      <div className="mb-8 text-center lg:text-left">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Welcome back</h2>
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
          Sign in to your account to continue
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <div>
          <label className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300">
            Email address
          </label>
          <div className="relative">
            <FiMail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input
              type="email"
              {...register('email', { required: 'Email is required', pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Invalid email' } })}
              className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-11 pr-4 text-sm text-slate-900 placeholder-slate-400 transition-all focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-slate-600 dark:bg-slate-800 dark:text-white dark:placeholder-slate-500"
              placeholder="you@example.com"
            />
          </div>
          {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email.message}</p>}
        </div>

        <div>
          <label className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300">
            Password
          </label>
          <div className="relative">
            <FiLock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input
              type={showPassword ? 'text' : 'password'}
              {...register('password', { required: 'Password is required' })}
              className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-11 pr-11 text-sm text-slate-900 placeholder-slate-400 transition-all focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-slate-600 dark:bg-slate-800 dark:text-white dark:placeholder-slate-500"
              placeholder="Enter your password"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
            >
              {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
            </button>
          </div>
          {errors.password && <p className="mt-1 text-xs text-red-500">{errors.password.message}</p>}
        </div>

        <div className="flex items-center justify-between">
          <label className="flex items-center gap-2">
            <input type="checkbox" className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500" />
            <span className="text-sm text-slate-600 dark:text-slate-400">Remember me</span>
          </label>
          <Link to="/forgot-password" className="text-sm font-medium text-blue-600 hover:text-blue-700">
            Forgot password?
          </Link>
        </div>

        <Button type="submit" isLoading={isLoading} className="w-full">
          Sign in
        </Button>

        <div className="mt-6 rounded-xl border border-blue-200 bg-blue-50 p-4 dark:border-blue-800 dark:bg-blue-900/20">
          <p className="mb-2 text-xs font-semibold text-blue-700 dark:text-blue-300">Demo Accounts (password: password)</p>
          <div className="space-y-1 text-xs text-blue-600 dark:text-blue-400">
            <p><strong>Manager:</strong> manager@keystone.io</p>
            <p><strong>Dispatcher:</strong> dispatcher@keystone.io</p>
            <p><strong>Technician:</strong> technician@keystone.io</p>
            <p><strong>Customer:</strong> customer@keystone.io</p>
          </div>
        </div>
      </form>
    </div>
  );
}
