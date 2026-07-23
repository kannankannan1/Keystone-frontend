import { motion } from 'framer-motion';
import { FiArrowLeft } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/common/Button';

export function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 200, delay: 0.1 }}
          className="mb-8 text-[120px] font-bold leading-none text-blue-600/20 dark:text-blue-400/20"
        >
          404
        </motion.div>
        <h1 className="mb-2 text-2xl font-bold text-slate-900 dark:text-white">
          Page Not Found
        </h1>
        <p className="mb-8 text-slate-500 dark:text-slate-400">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Button leftIcon={<FiArrowLeft />} onClick={() => navigate('/')}>
          Back to Dashboard
        </Button>
      </motion.div>
    </div>
  );
}
