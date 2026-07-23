import { Outlet } from 'react-router-dom';
import { motion } from 'framer-motion';

export function AuthLayout() {
  return (
    <div className="flex min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/50 to-indigo-50 dark:from-slate-900 dark:via-slate-900 dark:to-slate-800">
      <div className="hidden w-1/2 items-center justify-center p-12 lg:flex">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-lg"
        >
          <div className="mb-8 flex items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600 text-2xl font-bold text-white shadow-xl shadow-blue-600/30">
              K
            </div>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                KEYSTONE
              </h1>
              <p className="text-sm text-slate-500 dark:text-slate-400">Field Service Management</p>
            </div>
          </div>
          <h2 className="mb-4 text-4xl font-bold text-slate-900 dark:text-white">
            Manage your field operations with confidence
          </h2>
          <p className="text-lg text-slate-500 dark:text-slate-400">
            Streamline work orders, dispatch technicians, track SLA compliance, and deliver exceptional service — all from one platform.
          </p>
          <div className="mt-12 grid grid-cols-3 gap-6">
            {[
              { label: 'Work Orders', value: '1,200+' },
              { label: 'Technicians', value: '85+' },
              { label: 'SLA Rate', value: '98%' },
            ].map((stat) => (
              <div key={stat.label} className="rounded-xl border border-slate-200 bg-white/50 p-4 backdrop-blur-sm dark:border-slate-700 dark:bg-slate-800/50">
                <p className="text-2xl font-bold text-blue-600">{stat.value}</p>
                <p className="text-sm text-slate-500 dark:text-slate-400">{stat.label}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
      <div className="flex w-full items-center justify-center p-6 lg:w-1/2">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="w-full max-w-md"
        >
          <Outlet />
        </motion.div>
      </div>
    </div>
  );
}
