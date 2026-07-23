import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import { FiPlus, FiClock, FiCheckCircle, FiAlertCircle, FiUser, FiBell } from 'react-icons/fi';
import { Card, Button, Badge, Modal, EmptyState } from '@/components/common';
import { formatDate, timeAgo } from '@/utils';

interface ServiceRequest {
  id: string;
  title: string;
  description: string;
  status: string;
  priority: string;
  createdAt: string;
  timeline: { date: string; event: string; icon: React.ReactNode }[];
}

const mockRequests: ServiceRequest[] = [
  {
    id: 'WO-1001',
    title: 'Air Conditioning Repair',
    description: 'AC unit not cooling properly in the main office area.',
    status: 'in_progress',
    priority: 'high',
    createdAt: '2026-07-20T10:00:00Z',
    timeline: [
      { date: '2026-07-20T10:00:00Z', event: 'Service request submitted', icon: <FiPlus size={14} /> },
      { date: '2026-07-20T11:30:00Z', event: 'Request acknowledged by dispatch', icon: <FiCheckCircle size={14} /> },
      { date: '2026-07-21T09:00:00Z', event: 'Technician assigned - John Smith', icon: <FiUser size={14} /> },
      { date: '2026-07-22T08:00:00Z', event: 'Job in progress', icon: <FiClock size={14} /> },
    ],
  },
  {
    id: 'WO-1003',
    title: 'Plumbing Leak',
    description: 'Water leak from bathroom sink in suite 200.',
    status: 'completed',
    priority: 'medium',
    createdAt: '2026-07-15T14:00:00Z',
    timeline: [
      { date: '2026-07-15T14:00:00Z', event: 'Service request submitted', icon: <FiPlus size={14} /> },
      { date: '2026-07-15T15:00:00Z', event: 'Request acknowledged', icon: <FiCheckCircle size={14} /> },
      { date: '2026-07-16T08:00:00Z', event: 'Technician assigned - Mike Chen', icon: <FiUser size={14} /> },
      { date: '2026-07-16T10:00:00Z', event: 'Job completed', icon: <FiCheckCircle size={14} /> },
    ],
  },
  {
    id: 'WO-1005',
    title: 'Elevator Maintenance',
    description: 'Elevator making unusual noise during operation.',
    status: 'new',
    priority: 'low',
    createdAt: '2026-07-22T11:00:00Z',
    timeline: [
      { date: '2026-07-22T11:00:00Z', event: 'Service request submitted', icon: <FiPlus size={14} /> },
    ],
  },
];

const statusConfig: Record<string, { color: string; label: string }> = {
  new: { color: 'bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300', label: 'New' },
  in_progress: { color: 'bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300', label: 'In Progress' },
  completed: { color: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300', label: 'Completed' },
};

export function CustomerDashboard() {
  const [showNewRequest, setShowNewRequest] = useState(false);
  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  const onSubmit = (data: unknown) => {
    setShowNewRequest(false);
    reset();
  };

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">My Service Requests</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400">Track and manage your service requests</p>
        </div>
        <Button leftIcon={<FiPlus />} onClick={() => setShowNewRequest(true)}>
          New Service Request
        </Button>
      </motion.div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {[
          { label: 'Active Requests', value: mockRequests.filter(r => r.status !== 'completed').length, color: 'from-blue-500 to-blue-600' },
          { label: 'Completed', value: mockRequests.filter(r => r.status === 'completed').length, color: 'from-emerald-500 to-green-500' },
          { label: 'Notifications', value: 3, color: 'from-amber-500 to-orange-500' },
        ].map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-700 dark:bg-slate-800"
          >
            <p className="text-3xl font-bold text-slate-900 dark:text-white">{s.value}</p>
            <p className="text-sm text-slate-500 dark:text-slate-400">{s.label}</p>
          </motion.div>
        ))}
      </div>

      {/* Requests List */}
      <div className="space-y-4">
        {mockRequests.map((req, i) => (
          <motion.div
            key={req.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
          >
            <Card>
              <div className="mb-4 flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-lg font-semibold text-slate-900 dark:text-white">{req.title}</h3>
                    <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${statusConfig[req.status].color}`}>
                      {statusConfig[req.status].label}
                    </span>
                  </div>
                  <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{req.id} · {req.description}</p>
                </div>
              </div>

              {/* Timeline */}
              <div className="ml-2 border-l-2 border-slate-200 pl-6 dark:border-slate-700">
                {req.timeline.map((event, j) => (
                  <div key={j} className="relative mb-4 last:mb-0">
                    <div className="absolute -left-[31px] flex h-6 w-6 items-center justify-center rounded-full bg-blue-100 text-blue-600 dark:bg-blue-900/40 dark:text-blue-400">
                      {event.icon}
                    </div>
                    <p className="text-sm font-medium text-slate-900 dark:text-white">{event.event}</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">{timeAgo(event.date)}</p>
                  </div>
                ))}
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* New Request Modal */}
      <Modal isOpen={showNewRequest} onClose={() => setShowNewRequest(false)} title="New Service Request" size="md">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-300">Title</label>
            <input
              {...register('title', { required: true })}
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm dark:border-slate-600 dark:bg-slate-700 dark:text-white"
              placeholder="Describe your issue"
            />
            {errors.title && <p className="mt-1 text-xs text-red-500">Required</p>}
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-300">Description</label>
            <textarea
              {...register('description', { required: true })}
              rows={4}
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm dark:border-slate-600 dark:bg-slate-700 dark:text-white"
              placeholder="Provide more details..."
            />
          </div>
          <div className="flex justify-end gap-3">
            <Button variant="ghost" type="button" onClick={() => setShowNewRequest(false)}>Cancel</Button>
            <Button type="submit">Submit Request</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
