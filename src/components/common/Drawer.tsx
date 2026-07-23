import { type ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX } from 'react-icons/fi';
import { cn } from '@/utils';

interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  side?: 'left' | 'right';
  size?: 'sm' | 'md' | 'lg';
}

const sizeClasses = {
  sm: 'w-80',
  md: 'w-[28rem]',
  lg: 'w-[36rem]',
};

export function Drawer({ isOpen, onClose, title, children, side = 'right', size = 'md' }: DrawerProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.div
            initial={side === 'right' ? { x: '100%' } : { x: '-100%' }}
            animate={{ x: 0 }}
            exit={side === 'right' ? { x: '100%' } : { x: '-100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className={cn(
              'fixed top-0 z-50 h-full bg-white shadow-2xl dark:bg-slate-800',
              sizeClasses[size],
              side === 'right' ? 'right-0' : 'left-0'
            )}
          >
            <div className="flex items-center justify-between border-b border-slate-200 px-6 py-4 dark:border-slate-700">
              <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
                {title}
              </h2>
              <button
                onClick={onClose}
                className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-600 dark:hover:bg-slate-700"
              >
                <FiX size={18} />
              </button>
            </div>
            <div className="h-[calc(100%-4rem)] overflow-y-auto p-6">{children}</div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
