import { cn } from '@/utils';
import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
  padding?: boolean;
  hover?: boolean;
  glass?: boolean;
  onClick?: () => void;
}

export function Card({ children, className, padding = true, hover = false, glass = false, onClick }: CardProps) {
  return (
    <motion.div
      whileHover={hover ? { y: -2, boxShadow: '0 20px 40px -12px rgba(0,0,0,0.1)' } : undefined}
      transition={{ duration: 0.2 }}
      onClick={onClick}
      className={cn(
        'rounded-2xl border transition-all duration-200',
        glass
          ? 'border-white/20 bg-white/60 shadow-xl shadow-black/5 backdrop-blur-xl dark:bg-slate-800/60 dark:border-slate-700/50'
          : 'border-slate-200 bg-white shadow-sm dark:border-slate-700 dark:bg-slate-800',
        padding && 'p-6',
        hover && 'cursor-pointer',
        className
      )}
    >
      {children}
    </motion.div>
  );
}
