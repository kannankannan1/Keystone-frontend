import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { FiMail, FiArrowLeft } from 'react-icons/fi';
import toast from 'react-hot-toast';
import { authService } from '@/services';
import { Button } from '@/components/common';

interface ForgotForm {
  email: string;
}

export function ForgotPasswordPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotForm>();

  const onSubmit = async (data: ForgotForm) => {
    setIsLoading(true);
    try {
      await authService.forgotPassword(data.email);
      setIsSubmitted(true);
    } catch {
      toast.error('Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="text-center">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-100 dark:bg-emerald-900/30">
          <FiMail size={28} className="text-emerald-600 dark:text-emerald-400" />
        </div>
        <h2 className="mb-2 text-xl font-bold text-slate-900 dark:text-white">Check your email</h2>
        <p className="mb-6 text-sm text-slate-500 dark:text-slate-400">
          We've sent a password reset link to your email address.
        </p>
        <Link
          to="/login"
          className="inline-flex items-center gap-2 text-sm font-medium text-blue-600 hover:text-blue-700"
        >
          <FiArrowLeft size={16} /> Back to login
        </Link>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8 text-center lg:text-left">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Forgot password?</h2>
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
          Enter your email and we'll send you a reset link
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
              {...register('email', { required: 'Email is required' })}
              className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-11 pr-4 text-sm text-slate-900 placeholder-slate-400 transition-all focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-slate-600 dark:bg-slate-800 dark:text-white"
              placeholder="you@example.com"
            />
          </div>
          {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email.message}</p>}
        </div>

        <Button type="submit" isLoading={isLoading} className="w-full">
          Send reset link
        </Button>

        <div className="text-center">
          <Link
            to="/login"
            className="inline-flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-slate-900 dark:text-slate-400"
          >
            <FiArrowLeft size={16} /> Back to login
          </Link>
        </div>
      </form>
    </div>
  );
}
