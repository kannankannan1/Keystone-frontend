import { FiInbox } from 'react-icons/fi';
import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

interface EmptyStateProps {
  title?: string;
  description?: string;
  icon?: ReactNode;
  action?: ReactNode;
}

export function EmptyState({
  title = 'No data found',
  description = 'There are no items to display right now.',
  icon,
  action,
}: EmptyStateProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center py-16 text-center"
    >
      <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-100 dark:bg-slate-800">
        {icon || <FiInbox size={28} className="text-slate-400" />}
      </div>
      <h3 className="mb-1 text-lg font-semibold text-slate-900 dark:text-white">{title}</h3>
      <p className="mb-6 max-w-sm text-sm text-slate-500 dark:text-slate-400">{description}</p>
      {action}
    </motion.div>
  );
}
