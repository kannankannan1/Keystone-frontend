import { motion } from 'framer-motion';

export function LoadingScreen() {
  return (
    <div className="flex h-screen w-full items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col items-center"
      >
        <div className="relative mb-6">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
            className="h-12 w-12 rounded-xl border-4 border-slate-200 border-t-blue-600 dark:border-slate-700 dark:border-t-blue-400"
          />
        </div>
        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-2xl font-bold text-slate-900 dark:text-white"
        >
          KEYSTONE
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-sm text-slate-500 dark:text-slate-400"
        >
          Loading...
        </motion.p>
      </motion.div>
    </div>
  );
}
