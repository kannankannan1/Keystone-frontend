import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiDownload } from 'react-icons/fi';
import { Card, Button, Breadcrumb, FilterPanel, FilterSelect } from '@/components/common';
import { StatusPieChart, TechnicianBarChart, SLAAreaChart, MonthlyLineChart } from '@/components/charts';
import { SAMPLE_MONTHLY_DATA, SAMPLE_STATUS_DATA, SAMPLE_TECHNICIAN_DATA, SAMPLE_SLA_DATA } from '@/constants';

export function ReportsPage() {
  const [dateFrom, setDateFrom] = useState('2026-01-01');
  const [dateTo, setDateTo] = useState('2026-12-31');

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        <Breadcrumb items={[{ label: 'Dashboard', href: '/dashboard' }, { label: 'Reports' }]} />
        <div className="mt-4 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Reports</h1>
          <Button leftIcon={<FiDownload />} variant="outline">Export Report</Button>
        </div>
      </motion.div>

      <FilterPanel>
        <div>
          <label className="mb-1 block text-xs font-medium text-slate-500 dark:text-slate-400">From</label>
          <input type="date" value={dateFrom} onChange={(e) => setDateFrom(e.target.value)} className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm dark:border-slate-600 dark:bg-slate-700 dark:text-white" />
        </div>
        <div>
          <label className="mb-1 block text-xs font-medium text-slate-500 dark:text-slate-400">To</label>
          <input type="date" value={dateTo} onChange={(e) => setDateTo(e.target.value)} className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm dark:border-slate-600 dark:bg-slate-700 dark:text-white" />
        </div>
      </FilterPanel>

      {/* Summary Stats */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {[
          { label: 'Total Orders', value: '1,284', change: '+12%' },
          { label: 'Completion Rate', value: '89%', change: '+3%' },
          { label: 'Avg Response Time', value: '2.4h', change: '-8%' },
          { label: 'SLA Compliance', value: '93%', change: '+2%' },
        ].map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-700 dark:bg-slate-800"
          >
            <p className="text-sm text-slate-500 dark:text-slate-400">{stat.label}</p>
            <p className="mt-1 text-2xl font-bold text-slate-900 dark:text-white">{stat.value}</p>
            <p className="mt-1 text-xs font-medium text-emerald-600">{stat.change}</p>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        <Card>
          <h3 className="mb-1 text-base font-semibold text-slate-900 dark:text-white">Work Orders by Status</h3>
          <p className="mb-4 text-xs text-slate-500 dark:text-slate-400">Distribution overview</p>
          <StatusPieChart data={SAMPLE_STATUS_DATA} />
        </Card>
        <Card>
          <h3 className="mb-1 text-base font-semibold text-slate-900 dark:text-white">Technician Performance</h3>
          <p className="mb-4 text-xs text-slate-500 dark:text-slate-400">Jobs completed per technician</p>
          <TechnicianBarChart data={SAMPLE_TECHNICIAN_DATA} />
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        <Card>
          <h3 className="mb-1 text-base font-semibold text-slate-900 dark:text-white">SLA Compliance Trend</h3>
          <p className="mb-4 text-xs text-slate-500 dark:text-slate-400">Monthly compliance rate</p>
          <SLAAreaChart data={SAMPLE_SLA_DATA} />
        </Card>
        <Card>
          <h3 className="mb-1 text-base font-semibold text-slate-900 dark:text-white">Monthly Trends</h3>
          <p className="mb-4 text-xs text-slate-500 dark:text-slate-400">Created vs completed work orders</p>
          <MonthlyLineChart data={SAMPLE_MONTHLY_DATA} />
        </Card>
      </div>
    </div>
  );
}
