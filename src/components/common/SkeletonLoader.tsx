import { motion } from 'framer-motion';

export function SkeletonLoader({ rows = 3, className }: { rows?: number; className?: string }) {
  return (
    <div className={className}>
      {Array.from({ length: rows }).map((_, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0.5 }}
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.1 }}
          className="mb-3 flex items-center gap-4"
        >
          <div className="h-4 w-4 rounded bg-slate-200 dark:bg-slate-700" />
          <div className="h-4 flex-1 rounded bg-slate-200 dark:bg-slate-700" />
          <div className="h-4 w-24 rounded bg-slate-200 dark:bg-slate-700" />
        </motion.div>
      ))}
    </div>
  );
}

export function SkeletonCard() {
  return (
    <motion.div
      initial={{ opacity: 0.5 }}
      animate={{ opacity: [0.5, 1, 0.5] }}
      transition={{ duration: 1.5, repeat: Infinity }}
      className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-700 dark:bg-slate-800"
    >
      <div className="mb-4 h-8 w-8 rounded-xl bg-slate-200 dark:bg-slate-700" />
      <div className="mb-2 h-4 w-32 rounded bg-slate-200 dark:bg-slate-700" />
      <div className="h-8 w-20 rounded bg-slate-200 dark:bg-slate-700" />
    </motion.div>
  );
}
