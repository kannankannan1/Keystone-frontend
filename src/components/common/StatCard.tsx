import { motion } from 'framer-motion';
import { cn } from '@/utils';

interface StatCardProps {
  label: string;
  value: string | number;
  icon: React.ReactNode;
  trend?: { value: number; isPositive: boolean };
  color?: string;
  index?: number;
}

export function StatCard({ label, value, icon, trend, color = 'from-blue-500 to-blue-600', index = 0 }: StatCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all hover:shadow-lg dark:border-slate-700 dark:bg-slate-800"
    >
      <div className={cn('absolute right-0 top-0 h-24 w-24 rounded-bl-[60px] bg-gradient-to-br opacity-10 transition-opacity group-hover:opacity-20', color)} />
      <div className="relative flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-slate-500 dark:text-slate-400">{label}</p>
          <p className="mt-1 text-3xl font-bold text-slate-900 dark:text-white">{value}</p>
          {trend && (
            <p className={cn('mt-1 text-xs font-medium', trend.isPositive ? 'text-emerald-600' : 'text-red-500')}>
              {trend.isPositive ? '+' : ''}{trend.value}% from last month
            </p>
          )}
        </div>
        <div className={cn('flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br text-white shadow-lg', color)}>
          {icon}
        </div>
      </div>
    </motion.div>
  );
}
