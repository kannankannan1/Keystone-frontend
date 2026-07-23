import { motion } from 'framer-motion';
import {
  FiClipboard,
  FiClock,
  FiCheckCircle,
  FiAlertTriangle,
  FiUsers,
  FiUserCheck,
} from 'react-icons/fi';
import { Card, StatCard } from '@/components/common';
import { StatusPieChart } from '@/components/charts';
import { TechnicianBarChart } from '@/components/charts';
import { SLAAreaChart } from '@/components/charts';
import { MonthlyLineChart } from '@/components/charts';
import {
  SAMPLE_MONTHLY_DATA,
  SAMPLE_STATUS_DATA,
  SAMPLE_TECHNICIAN_DATA,
  SAMPLE_SLA_DATA,
} from '@/constants';

const stats = [
  { label: 'Total Work Orders', value: '1,284', icon: <FiClipboard size={22} />, color: 'from-blue-500 to-blue-600', trend: { value: 12, isPositive: true } },
  { label: 'Open Jobs', value: '62', icon: <FiClock size={22} />, color: 'from-amber-500 to-orange-500', trend: { value: 5, isPositive: false } },
  { label: 'Closed Jobs', value: '1,142', icon: <FiCheckCircle size={22} />, color: 'from-emerald-500 to-green-500', trend: { value: 8, isPositive: true } },
  { label: 'SLA Breached', value: '18', icon: <FiAlertTriangle size={22} />, color: 'from-red-500 to-rose-500', trend: { value: 3, isPositive: false } },
  { label: 'Total Customers', value: '348', icon: <FiUsers size={22} />, color: 'from-indigo-500 to-violet-500', trend: { value: 15, isPositive: true } },
  { label: 'Total Technicians', value: '85', icon: <FiUserCheck size={22} />, color: 'from-cyan-500 to-teal-500', trend: { value: 4, isPositive: true } },
];

const recentWorkOrders = [
  { id: 'WO-1001', title: 'HVAC Maintenance', status: 'in_progress', priority: 'high', customer: 'Acme Corp', technician: 'John Smith' },
  { id: 'WO-1002', title: 'Electrical Repair', status: 'new', priority: 'critical', customer: 'TechStart Inc', technician: '-' },
  { id: 'WO-1003', title: 'Plumbing Inspection', status: 'assigned', priority: 'medium', customer: 'GreenLife Co', technician: 'Mike Chen' },
  { id: 'WO-1004', title: 'Security System Install', status: 'completed', priority: 'low', customer: 'SecureNet', technician: 'Sarah Johnson' },
  { id: 'WO-1005', title: 'Elevator Maintenance', status: 'on_hold', priority: 'high', customer: 'Metro Buildings', technician: 'Emily Davis' },
];

const recentTechnicians = [
  { name: 'John Smith', role: 'Senior Tech', jobs: 34, rating: 4.8, status: 'available' },
  { name: 'Sarah Johnson', role: 'Field Tech', jobs: 28, rating: 4.6, status: 'on_job' },
  { name: 'Mike Chen', role: 'Lead Tech', jobs: 41, rating: 4.9, status: 'available' },
  { name: 'Emily Davis', role: 'Field Tech', jobs: 22, rating: 4.5, status: 'off_duty' },
];

const statusDot: Record<string, string> = {
  new: 'bg-blue-500',
  assigned: 'bg-indigo-500',
  in_progress: 'bg-amber-500',
  completed: 'bg-emerald-500',
  on_hold: 'bg-orange-500',
  cancelled: 'bg-red-500',
};

const statusText: Record<string, string> = {
  new: 'New',
  assigned: 'Assigned',
  in_progress: 'In Progress',
  completed: 'Completed',
  on_hold: 'On Hold',
  cancelled: 'Cancelled',
};

const priorityBadge: Record<string, string> = {
  low: 'bg-slate-100 text-slate-600 dark:bg-slate-700 dark:text-slate-300',
  medium: 'bg-blue-100 text-blue-600 dark:bg-blue-900/40 dark:text-blue-300',
  high: 'bg-orange-100 text-orange-600 dark:bg-orange-900/40 dark:text-orange-300',
  critical: 'bg-red-100 text-red-600 dark:bg-red-900/40 dark:text-red-300',
};

const techStatus: Record<string, string> = {
  available: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300',
  on_job: 'bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300',
  off_duty: 'bg-slate-100 text-slate-600 dark:bg-slate-700 dark:text-slate-300',
};

export function ManagerDashboard() {
  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Dashboard</h1>
        <p className="text-sm text-slate-500 dark:text-slate-400">Overview of your field operations</p>
      </motion.div>

      {/* Stats */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
        {stats.map((s, i) => (
          <StatCard key={s.label} {...s} index={i} />
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        <Card>
          <h3 className="mb-1 text-base font-semibold text-slate-900 dark:text-white">Work Orders by Status</h3>
          <p className="mb-4 text-xs text-slate-500 dark:text-slate-400">Current distribution</p>
          <StatusPieChart data={SAMPLE_STATUS_DATA} />
        </Card>
        <Card>
          <h3 className="mb-1 text-base font-semibold text-slate-900 dark:text-white">Jobs per Technician</h3>
          <p className="mb-4 text-xs text-slate-500 dark:text-slate-400">This month's performance</p>
          <TechnicianBarChart data={SAMPLE_TECHNICIAN_DATA} />
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        <Card>
          <h3 className="mb-1 text-base font-semibold text-slate-900 dark:text-white">SLA Compliance</h3>
          <p className="mb-4 text-xs text-slate-500 dark:text-slate-400">Monthly compliance rate</p>
          <SLAAreaChart data={SAMPLE_SLA_DATA} />
        </Card>
        <Card>
          <h3 className="mb-1 text-base font-semibold text-slate-900 dark:text-white">Monthly Completed Jobs</h3>
          <p className="mb-4 text-xs text-slate-500 dark:text-slate-400">Created vs Completed</p>
          <MonthlyLineChart data={SAMPLE_MONTHLY_DATA} />
        </Card>
      </div>

      {/* Tables */}
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        <Card padding={false}>
          <div className="border-b border-slate-200 px-6 py-4 dark:border-slate-700">
            <h3 className="text-base font-semibold text-slate-900 dark:text-white">Recent Work Orders</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-slate-200 bg-slate-50 dark:border-slate-700 dark:bg-slate-800/50">
                <tr>
                  <th className="px-6 py-3 text-xs font-semibold uppercase tracking-wider text-slate-500">Order</th>
                  <th className="px-6 py-3 text-xs font-semibold uppercase tracking-wider text-slate-500">Status</th>
                  <th className="px-6 py-3 text-xs font-semibold uppercase tracking-wider text-slate-500">Priority</th>
                  <th className="px-6 py-3 text-xs font-semibold uppercase tracking-wider text-slate-500 hidden xl:table-cell">Technician</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-700/50">
                {recentWorkOrders.map((wo) => (
                  <tr key={wo.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                    <td className="px-6 py-3">
                      <p className="font-medium text-slate-900 dark:text-white">{wo.id}</p>
                      <p className="text-xs text-slate-500 dark:text-slate-400">{wo.title}</p>
                    </td>
                    <td className="px-6 py-3">
                      <span className="inline-flex items-center gap-1.5 text-xs font-medium">
                        <span className={`h-1.5 w-1.5 rounded-full ${statusDot[wo.status]}`} />
                        {statusText[wo.status]}
                      </span>
                    </td>
                    <td className="px-6 py-3">
                      <span className={`inline-block rounded-full px-2 py-0.5 text-xs font-medium capitalize ${priorityBadge[wo.priority]}`}>
                        {wo.priority}
                      </span>
                    </td>
                    <td className="px-6 py-3 text-sm text-slate-600 dark:text-slate-400 hidden xl:table-cell">
                      {wo.technician}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        <Card padding={false}>
          <div className="border-b border-slate-200 px-6 py-4 dark:border-slate-700">
            <h3 className="text-base font-semibold text-slate-900 dark:text-white">Recent Technicians</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-slate-200 bg-slate-50 dark:border-slate-700 dark:bg-slate-800/50">
                <tr>
                  <th className="px-6 py-3 text-xs font-semibold uppercase tracking-wider text-slate-500">Technician</th>
                  <th className="px-6 py-3 text-xs font-semibold uppercase tracking-wider text-slate-500">Jobs</th>
                  <th className="px-6 py-3 text-xs font-semibold uppercase tracking-wider text-slate-500">Rating</th>
                  <th className="px-6 py-3 text-xs font-semibold uppercase tracking-wider text-slate-500">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-700/50">
                {recentTechnicians.map((tech) => (
                  <tr key={tech.name} className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                    <td className="px-6 py-3">
                      <div className="flex items-center gap-3">
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-indigo-500 text-xs font-bold text-white">
                          {tech.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div>
                          <p className="font-medium text-slate-900 dark:text-white">{tech.name}</p>
                          <p className="text-xs text-slate-500 dark:text-slate-400">{tech.role}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-3 font-medium text-slate-900 dark:text-white">{tech.jobs}</td>
                    <td className="px-6 py-3">
                      <span className="text-amber-500">★</span> <span className="text-sm text-slate-700 dark:text-slate-300">{tech.rating}</span>
                    </td>
                    <td className="px-6 py-3">
                      <span className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-medium capitalize ${techStatus[tech.status]}`}>
                        {tech.status.replace('_', ' ')}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </div>
  );
}
