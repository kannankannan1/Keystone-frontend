import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiArrowLeft, FiEdit2, FiTrash2, FiUserPlus, FiMessageSquare, FiClock, FiTool, FiPaperclip } from 'react-icons/fi';
import { Card, Button, Badge, Breadcrumb, ConfirmDialog } from '@/components/common';
import { STATUS_LABELS, STATUS_COLORS, PRIORITY_LABELS, PRIORITY_COLORS, PRIORITY_DOTS } from '@/constants';
import { formatDate, formatDuration, timeAgo } from '@/utils';
import type { WorkOrderStatus } from '@/types';

const mockWO = {
  id: 'WO-1001',
  title: 'HVAC System Maintenance',
  description: 'Perform quarterly HVAC maintenance including filter replacement, coil cleaning, refrigerant level check, and overall system performance evaluation. Ensure all units are operating at peak efficiency before the summer season.',
  status: 'in_progress' as WorkOrderStatus,
  priority: 'high',
  customer: { companyName: 'Acme Corp', contactName: 'Jane Doe', email: 'jane@acme.com', phone: '555-0100' },
  site: { name: 'Headquarters', address: '123 Main St, Suite 100', city: 'Springfield' },
  technician: { firstName: 'John', lastName: 'Smith' },
  scheduledDate: '2026-07-23T09:00:00Z',
  estimatedHours: 4,
  tags: ['hvac', 'maintenance', 'quarterly'],
  comments: [
    { id: '1', user: { firstName: 'John', lastName: 'Smith' }, content: 'Arrived on site. Starting filter inspection.', createdAt: '2026-07-23T09:15:00Z' },
    { id: '2', user: { firstName: 'John', lastName: 'Smith' }, content: 'Filters replaced. Moving to coil cleaning.', createdAt: '2026-07-23T09:45:00Z' },
  ],
  activities: [
    { id: '1', user: { firstName: 'Sarah', lastName: 'Johnson' }, action: 'Work order created', createdAt: '2026-07-20T10:00:00Z' },
    { id: '2', user: { firstName: 'Sarah', lastName: 'Johnson' }, action: 'Assigned to John Smith', createdAt: '2026-07-20T10:30:00Z' },
    { id: '3', user: { firstName: 'John', lastName: 'Smith' }, action: 'Status changed to In Progress', createdAt: '2026-07-23T09:00:00Z' },
  ],
  timeLogs: [
    { id: '1', duration: 45, description: 'Filter inspection and replacement', createdAt: '2026-07-23T09:15:00Z' },
    { id: '2', duration: 30, description: 'Coil cleaning', createdAt: '2026-07-23T09:45:00Z' },
  ],
  parts: [
    { id: '1', part: { name: 'HVAC Filter 20x25x1' }, quantity: 4, unitCost: 15.99 },
    { id: '2', part: { name: 'Coil Cleaner Solution' }, quantity: 1, unitCost: 24.50 },
  ],
};

const statusActions: { status: WorkOrderStatus; label: string; variant: 'primary' | 'success' | 'danger' | 'outline' }[] = [
  { status: 'assigned', label: 'Assign', variant: 'primary' },
  { status: 'in_progress', label: 'Start', variant: 'success' },
  { status: 'on_hold', label: 'Hold', variant: 'outline' },
  { status: 'completed', label: 'Complete', variant: 'success' },
  { status: 'cancelled', label: 'Cancel', variant: 'danger' },
];

export function WorkOrderDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'details' | 'comments' | 'activity' | 'timeline'>('details');
  const [showDelete, setShowDelete] = useState(false);
  const [newComment, setNewComment] = useState('');
  const wo = mockWO;

  const tabs = [
    { key: 'details', label: 'Details' },
    { key: 'comments', label: `Comments (${wo.comments.length})` },
    { key: 'activity', label: 'Activity' },
    { key: 'timeline', label: 'Timeline' },
  ] as const;

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        <Breadcrumb items={[{ label: 'Dashboard', href: '/dashboard' }, { label: 'Work Orders', href: '/work-orders' }, { label: wo.id }]} />
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <div className="flex items-center gap-3">
            <button onClick={() => navigate(-1)} className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800">
              <FiArrowLeft size={18} />
            </button>
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white">{wo.title}</h1>
          </div>
          <div className="mt-2 flex items-center gap-3">
            <span className="text-sm text-slate-500 dark:text-slate-400">{wo.id}</span>
            <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium ${STATUS_COLORS[wo.status]}`}>
              {STATUS_LABELS[wo.status]}
            </span>
            <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium capitalize ${PRIORITY_COLORS[wo.priority as keyof typeof PRIORITY_COLORS]}`}>
              <span className={`h-1.5 w-1.5 rounded-full ${PRIORITY_DOTS[wo.priority as keyof typeof PRIORITY_DOTS]}`} />
              {PRIORITY_LABELS[wo.priority as keyof typeof PRIORITY_LABELS]}
            </span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" leftIcon={<FiEdit2 />} onClick={() => navigate(`/work-orders/${id}/edit`)}>Edit</Button>
          <Button variant="danger" size="sm" leftIcon={<FiTrash2 />} onClick={() => setShowDelete(true)}>Delete</Button>
        </div>
      </motion.div>

      {/* Status Actions */}
      <Card>
        <div className="flex flex-wrap gap-2">
          {statusActions.map((action) => (
            <Button key={action.status} variant={action.variant} size="sm">{action.label}</Button>
          ))}
        </div>
      </Card>

      {/* Tabs */}
      <div className="border-b border-slate-200 dark:border-slate-700">
        <div className="flex gap-1">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`border-b-2 px-4 py-3 text-sm font-medium transition-colors ${
                activeTab === tab.key
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-slate-500 hover:text-slate-700 dark:text-slate-400'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      {activeTab === 'details' && (
        <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
          <div className="xl:col-span-2 space-y-6">
            <Card>
              <h3 className="mb-3 text-sm font-semibold text-slate-900 dark:text-white">Description</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{wo.description}</p>
            </Card>
            <Card>
              <h3 className="mb-3 text-sm font-semibold text-slate-900 dark:text-white">Parts Used</h3>
              <div className="space-y-2">
                {wo.parts.map((p) => (
                  <div key={p.id} className="flex items-center justify-between rounded-lg bg-slate-50 px-4 py-2 dark:bg-slate-800/50">
                    <span className="text-sm text-slate-700 dark:text-slate-300">{p.part.name}</span>
                    <span className="text-sm font-medium text-slate-900 dark:text-white">x{p.quantity} · ${(p.unitCost * p.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>
            </Card>
          </div>
          <div className="space-y-6">
            <Card>
              <h3 className="mb-4 text-sm font-semibold text-slate-900 dark:text-white">Information</h3>
              <div className="space-y-3">
                {[
                  { label: 'Customer', value: wo.customer.companyName },
                  { label: 'Contact', value: wo.customer.contactName },
                  { label: 'Site', value: wo.site.name },
                  { label: 'Address', value: wo.site.address },
                  { label: 'Technician', value: `${wo.technician.firstName} ${wo.technician.lastName}` },
                  { label: 'Scheduled', value: formatDate(wo.scheduledDate) },
                  { label: 'Est. Hours', value: `${wo.estimatedHours}h` },
                ].map((item) => (
                  <div key={item.label}>
                    <p className="text-xs font-medium text-slate-500 dark:text-slate-400">{item.label}</p>
                    <p className="text-sm text-slate-900 dark:text-white">{item.value}</p>
                  </div>
                ))}
              </div>
            </Card>
            <Card>
              <h3 className="mb-3 text-sm font-semibold text-slate-900 dark:text-white">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {wo.tags.map((tag) => (
                  <span key={tag} className="rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-600 dark:bg-blue-900/30 dark:text-blue-400">
                    {tag}
                  </span>
                ))}
              </div>
            </Card>
          </div>
        </div>
      )}

      {activeTab === 'comments' && (
        <Card>
          <div className="space-y-4">
            {wo.comments.map((c) => (
              <div key={c.id} className="flex gap-3">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-blue-100 text-xs font-bold text-blue-600 dark:bg-blue-900/40 dark:text-blue-400">
                  {c.user.firstName[0]}{c.user.lastName[0]}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-slate-900 dark:text-white">{c.user.firstName} {c.user.lastName}</span>
                    <span className="text-xs text-slate-500 dark:text-slate-400">{timeAgo(c.createdAt)}</span>
                  </div>
                  <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">{c.content}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6 flex gap-3">
            <input
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Add a comment..."
              className="flex-1 rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm dark:border-slate-600 dark:bg-slate-700 dark:text-white"
            />
            <Button size="sm" leftIcon={<FiMessageSquare />}>Post</Button>
          </div>
        </Card>
      )}

      {activeTab === 'activity' && (
        <Card>
          <div className="space-y-4">
            {wo.activities.map((a) => (
              <div key={a.id} className="flex items-start gap-3">
                <div className="mt-1 h-2 w-2 rounded-full bg-blue-500" />
                <div>
                  <p className="text-sm text-slate-900 dark:text-white">
                    <span className="font-medium">{a.user.firstName} {a.user.lastName}</span> — {a.action}
                  </p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">{timeAgo(a.createdAt)}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}

      {activeTab === 'timeline' && (
        <Card>
          <div className="ml-2 border-l-2 border-slate-200 pl-6 dark:border-slate-700">
            {wo.timeLogs.map((t) => (
              <div key={t.id} className="relative mb-6 last:mb-0">
                <div className="absolute -left-[31px] flex h-6 w-6 items-center justify-center rounded-full bg-blue-100 text-blue-600 dark:bg-blue-900/40 dark:text-blue-400">
                  <FiClock size={12} />
                </div>
                <p className="text-sm font-medium text-slate-900 dark:text-white">{t.description}</p>
                <p className="text-xs text-slate-500 dark:text-slate-400">{formatDuration(t.duration)} · {timeAgo(t.createdAt)}</p>
              </div>
            ))}
          </div>
        </Card>
      )}

      <ConfirmDialog
        isOpen={showDelete}
        onClose={() => setShowDelete(false)}
        onConfirm={() => { setShowDelete(false); navigate('/work-orders'); }}
        title="Delete Work Order"
        message="Are you sure you want to delete this work order? This action cannot be undone."
        type="danger"
        confirmText="Delete"
      />
    </div>
  );
}
