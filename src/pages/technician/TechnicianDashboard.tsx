import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  FiPlay,
  FiPause,
  FiCheckCircle,
  FiClock,
  FiTool,
  FiCamera,
  FiCalendar,
} from 'react-icons/fi';
import { Card, Badge, Button } from '@/components/common';
import { formatDate, formatDuration } from '@/utils';

interface Job {
  id: string;
  title: string;
  status: 'scheduled' | 'in_progress' | 'paused' | 'completed';
  priority: string;
  customer: string;
  site: string;
  address: string;
  scheduledDate: string;
  description: string;
  timeSpent: number;
}

const mockJobs: Job[] = [
  { id: 'WO-1001', title: 'HVAC System Maintenance', status: 'in_progress', priority: 'high', customer: 'Acme Corp', site: 'Headquarters', address: '123 Main St', scheduledDate: '2026-07-23T09:00:00Z', description: 'Perform quarterly HVAC maintenance including filter replacement and system check.', timeSpent: 95 },
  { id: 'WO-1006', title: 'Roof Leak Repair', status: 'scheduled', priority: 'high', customer: 'Acme Corp', site: 'Building B', address: '125 Main St', scheduledDate: '2026-07-23T14:00:00Z', description: 'Investigate and repair roof leak in Building B.', timeSpent: 0 },
  { id: 'WO-1007', title: 'Generator Servicing', status: 'paused', priority: 'low', customer: 'Metro Buildings', site: 'Power Room', address: '456 Oak Ave', scheduledDate: '2026-07-23T07:30:00Z', description: 'Bi-annual generator service. Currently waiting for replacement parts.', timeSpent: 45 },
  { id: 'WO-1009', title: 'Water Heater Install', status: 'completed', priority: 'medium', customer: 'GreenLife Co', site: 'Office', address: '789 Pine Rd', scheduledDate: '2026-07-22T10:00:00Z', description: 'Replace old water heater with new 50-gallon unit.', timeSpent: 180 },
];

const statusConfig: Record<string, { color: string; label: string }> = {
  scheduled: { color: 'bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300', label: 'Scheduled' },
  in_progress: { color: 'bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300', label: 'In Progress' },
  paused: { color: 'bg-orange-100 text-orange-700 dark:bg-orange-900/40 dark:text-orange-300', label: 'Paused' },
  completed: { color: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300', label: 'Completed' },
};

export function TechnicianDashboard() {
  const [selectedJob, setSelectedJob] = useState<Job | null>(mockJobs[0]);

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">My Jobs</h1>
        <p className="text-sm text-slate-500 dark:text-slate-400">Today's assigned work orders</p>
      </motion.div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {[
          { label: 'Today\'s Jobs', value: mockJobs.length, icon: <FiTool size={20} />, color: 'from-blue-500 to-blue-600' },
          { label: 'Active', value: mockJobs.filter(j => j.status === 'in_progress').length, icon: <FiPlay size={20} />, color: 'from-amber-500 to-orange-500' },
          { label: 'Completed', value: mockJobs.filter(j => j.status === 'completed').length, icon: <FiCheckCircle size={20} />, color: 'from-emerald-500 to-green-500' },
          { label: 'Total Time', value: formatDuration(mockJobs.reduce((a, j) => a + j.timeSpent, 0)), icon: <FiClock size={20} />, color: 'from-indigo-500 to-violet-500' },
        ].map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="rounded-2xl border border-slate-200 bg-white p-4 dark:border-slate-700 dark:bg-slate-800"
          >
            <div className="flex items-center gap-3">
              <div className={`flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br text-white ${s.color}`}>
                {s.icon}
              </div>
              <div>
                <p className="text-2xl font-bold text-slate-900 dark:text-white">{s.value}</p>
                <p className="text-xs text-slate-500 dark:text-slate-400">{s.label}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        {/* Job List */}
        <div className="space-y-3 xl:col-span-1">
          <h3 className="text-sm font-semibold text-slate-900 dark:text-white">Assigned Jobs</h3>
          {mockJobs.map((job, i) => (
            <motion.div
              key={job.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05 }}
              onClick={() => setSelectedJob(job)}
              className={`cursor-pointer rounded-xl border p-4 transition-all ${
                selectedJob?.id === job.id
                  ? 'border-blue-500 bg-blue-50 shadow-md dark:border-blue-400 dark:bg-blue-900/20'
                  : 'border-slate-200 bg-white hover:border-slate-300 dark:border-slate-700 dark:bg-slate-800'
              }`}
            >
              <div className="mb-2 flex items-start justify-between">
                <div>
                  <p className="text-sm font-semibold text-slate-900 dark:text-white">{job.id}</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">{job.title}</p>
                </div>
                <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${statusConfig[job.status].color}`}>
                  {statusConfig[job.status].label}
                </span>
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                <FiCalendar size={12} />
                {formatDate(job.scheduledDate)}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Job Details */}
        <div className="xl:col-span-2">
          {selectedJob ? (
            <Card>
              <div className="mb-4 flex items-start justify-between">
                <div>
                  <h2 className="text-xl font-bold text-slate-900 dark:text-white">{selectedJob.title}</h2>
                  <p className="text-sm text-slate-500 dark:text-slate-400">{selectedJob.id} · {selectedJob.customer}</p>
                </div>
                <span className={`rounded-full px-3 py-1 text-xs font-medium ${statusConfig[selectedJob.status].color}`}>
                  {statusConfig[selectedJob.status].label}
                </span>
              </div>

              <div className="mb-6 grid grid-cols-2 gap-4">
                <div className="rounded-xl bg-slate-50 p-4 dark:bg-slate-800/50">
                  <p className="text-xs font-medium text-slate-500 dark:text-slate-400">Site</p>
                  <p className="text-sm font-medium text-slate-900 dark:text-white">{selectedJob.site}</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">{selectedJob.address}</p>
                </div>
                <div className="rounded-xl bg-slate-50 p-4 dark:bg-slate-800/50">
                  <p className="text-xs font-medium text-slate-500 dark:text-slate-400">Time Spent</p>
                  <p className="text-sm font-medium text-slate-900 dark:text-white">{formatDuration(selectedJob.timeSpent)}</p>
                </div>
              </div>

              <div className="mb-6">
                <h4 className="mb-2 text-sm font-semibold text-slate-900 dark:text-white">Description</h4>
                <p className="text-sm text-slate-600 dark:text-slate-400">{selectedJob.description}</p>
              </div>

              <div className="flex flex-wrap gap-3">
                {selectedJob.status === 'scheduled' && (
                  <Button leftIcon={<FiPlay />} onClick={() => {}} size="sm">Start Job</Button>
                )}
                {selectedJob.status === 'in_progress' && (
                  <>
                    <Button leftIcon={<FiPause />} variant="outline" onClick={() => {}} size="sm">Pause</Button>
                    <Button leftIcon={<FiCheckCircle />} variant="success" onClick={() => {}} size="sm">Complete</Button>
                  </>
                )}
                {selectedJob.status === 'paused' && (
                  <Button leftIcon={<FiPlay />} onClick={() => {}} size="sm">Resume</Button>
                )}
                <Button leftIcon={<FiClock />} variant="secondary" onClick={() => {}} size="sm">Log Time</Button>
                <Button leftIcon={<FiCamera />} variant="secondary" onClick={() => {}} size="sm">Upload Photo</Button>
              </div>
            </Card>
          ) : (
            <Card className="flex h-64 items-center justify-center">
              <p className="text-sm text-slate-500 dark:text-slate-400">Select a job to view details</p>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
