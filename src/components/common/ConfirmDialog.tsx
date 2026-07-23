import { type ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiAlertTriangle, FiCheckCircle, FiInfo, FiHelpCircle } from 'react-icons/fi';
import { cn } from '@/utils';

interface ConfirmDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  type?: 'danger' | 'warning' | 'info' | 'success';
  confirmText?: string;
  cancelText?: string;
  isLoading?: boolean;
}

const typeConfig = {
  danger: {
    icon: FiAlertTriangle,
    iconClass: 'text-red-500',
    bgClass: 'bg-red-50 dark:bg-red-900/20',
    btnClass: 'bg-red-600 hover:bg-red-700 text-white',
  },
  warning: {
    icon: FiHelpCircle,
    iconClass: 'text-amber-500',
    bgClass: 'bg-amber-50 dark:bg-amber-900/20',
    btnClass: 'bg-amber-600 hover:bg-amber-700 text-white',
  },
  info: {
    icon: FiInfo,
    iconClass: 'text-blue-500',
    bgClass: 'bg-blue-50 dark:bg-blue-900/20',
    btnClass: 'bg-blue-600 hover:bg-blue-700 text-white',
  },
  success: {
    icon: FiCheckCircle,
    iconClass: 'text-emerald-500',
    bgClass: 'bg-emerald-50 dark:bg-emerald-900/20',
    btnClass: 'bg-emerald-600 hover:bg-emerald-700 text-white',
  },
};

export function ConfirmDialog({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  type = 'danger',
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  isLoading = false,
}: ConfirmDialogProps) {
  const config = typeConfig[type];
  const Icon = config.icon;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="relative w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl dark:bg-slate-800"
          >
            <div className={cn('mb-4 flex h-12 w-12 items-center justify-center rounded-xl', config.bgClass)}>
              <Icon size={24} className={config.iconClass} />
            </div>
            <h3 className="mb-2 text-lg font-semibold text-slate-900 dark:text-white">{title}</h3>
            <p className="mb-6 text-sm text-slate-500 dark:text-slate-400">{message}</p>
            <div className="flex justify-end gap-3">
              <button
                onClick={onClose}
                disabled={isLoading}
                className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 dark:border-slate-600 dark:text-slate-300 dark:hover:bg-slate-700"
              >
                {cancelText}
              </button>
              <button
                onClick={onConfirm}
                disabled={isLoading}
                className={cn(
                  'rounded-lg px-4 py-2 text-sm font-medium transition-colors',
                  config.btnClass,
                  isLoading && 'opacity-50 cursor-not-allowed'
                )}
              >
                {isLoading ? 'Processing...' : confirmText}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
