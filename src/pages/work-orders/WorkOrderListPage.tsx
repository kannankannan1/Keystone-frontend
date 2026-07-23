import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiPlus, FiFilter } from 'react-icons/fi';
import { Card, SearchBox, Button, Badge, Pagination, FilterPanel, FilterSelect, Breadcrumb } from '@/components/common';
import { STATUS_LABELS, STATUS_COLORS, PRIORITY_LABELS, PRIORITY_COLORS, PRIORITY_DOTS } from '@/constants';
import { formatDate } from '@/utils';
import type { WorkOrder, WorkOrderStatus, WorkOrderPriority } from '@/types';

const mockWorkOrders: WorkOrder[] = [
  { id: 'WO-1001', title: 'HVAC System Maintenance', description: 'Quarterly maintenance check', status: 'in_progress', priority: 'high', customerId: '1', siteId: '1', technicianId: '1', tags: ['hvac'], comments: [], activities: [], timeLogs: [], parts: [], attachments: [], createdAt: '2026-07-20T10:00:00Z', updatedAt: '2026-07-20T10:00:00Z' },
  { id: 'WO-1002', title: 'Electrical Panel Upgrade', description: 'Upgrade main electrical panel', status: 'new', priority: 'critical', customerId: '2', siteId: '2', tags: ['electrical'], comments: [], activities: [], timeLogs: [], parts: [], attachments: [], createdAt: '2026-07-21T09:00:00Z', updatedAt: '2026-07-21T09:00:00Z' },
  { id: 'WO-1003', title: 'Plumbing Inspection', description: 'Annual plumbing inspection', status: 'assigned', priority: 'medium', customerId: '3', siteId: '3', technicianId: '2', tags: ['plumbing'], comments: [], activities: [], timeLogs: [], parts: [], attachments: [], createdAt: '2026-07-19T14:00:00Z', updatedAt: '2026-07-19T14:00:00Z' },
  { id: 'WO-1004', title: 'Fire Alarm Testing', description: 'Annual fire alarm system test', status: 'completed', priority: 'high', customerId: '4', siteId: '4', technicianId: '3', tags: ['safety'], comments: [], activities: [], timeLogs: [], parts: [], attachments: [], createdAt: '2026-07-18T08:00:00Z', updatedAt: '2026-07-22T16:00:00Z' },
  { id: 'WO-1005', title: 'Elevator Inspection', description: 'Monthly elevator safety check', status: 'on_hold', priority: 'medium', customerId: '5', siteId: '5', technicianId: '4', tags: ['elevator'], comments: [], activities: [], timeLogs: [], parts: [], attachments: [], createdAt: '2026-07-17T11:00:00Z', updatedAt: '2026-07-17T11:00:00Z' },
  { id: 'WO-1006', title: 'Roof Leak Repair', description: 'Fix roof leak in Building B', status: 'new', priority: 'high', customerId: '1', siteId: '1', tags: ['repair'], comments: [], activities: [], timeLogs: [], parts: [], attachments: [], createdAt: '2026-07-22T07:00:00Z', updatedAt: '2026-07-22T07:00:00Z' },
  { id: 'WO-1007', title: 'Generator Servicing', description: 'Bi-annual generator service', status: 'assigned', priority: 'low', customerId: '6', siteId: '6', technicianId: '1', tags: ['generator'], comments: [], activities: [], timeLogs: [], parts: [], attachments: [], createdAt: '2026-07-20T13:00:00Z', updatedAt: '2026-07-20T13:00:00Z' },
  { id: 'WO-1008', title: 'CCTV Installation', description: 'Install new CCTV cameras', status: 'in_progress', priority: 'medium', customerId: '2', siteId: '2', technicianId: '3', tags: ['security'], comments: [], activities: [], timeLogs: [], parts: [], attachments: [], createdAt: '2026-07-21T15:00:00Z', updatedAt: '2026-07-21T15:00:00Z' },
  { id: 'WO-1009', title: 'Water Heater Install', description: 'Replace old water heater', status: 'closed', priority: 'medium', customerId: '3', siteId: '3', technicianId: '2', tags: ['installation'], comments: [], activities: [], timeLogs: [], parts: [], attachments: [], createdAt: '2026-07-15T10:00:00Z', updatedAt: '2026-07-18T14:00:00Z' },
  { id: 'WO-1010', title: 'Window Replacement', description: 'Replace broken window pane', status: 'cancelled', priority: 'low', customerId: '4', siteId: '4', tags: ['repair'], comments: [], activities: [], timeLogs: [], parts: [], attachments: [], createdAt: '2026-07-10T09:00:00Z', updatedAt: '2026-07-12T11:00:00Z' },
];

export function WorkOrderListPage() {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [priorityFilter, setPriorityFilter] = useState('');
  const [page, setPage] = useState(1);
  const perPage = 8;

  const filtered = mockWorkOrders.filter((wo) => {
    const matchSearch = !search || wo.title.toLowerCase().includes(search.toLowerCase()) || wo.id.toLowerCase().includes(search.toLowerCase());
    const matchStatus = !statusFilter || wo.status === statusFilter;
    const matchPriority = !priorityFilter || wo.priority === priorityFilter;
    return matchSearch && matchStatus && matchPriority;
  });

  const totalPages = Math.ceil(filtered.length / perPage);
  const paginated = filtered.slice((page - 1) * perPage, page * perPage);

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        <Breadcrumb items={[{ label: 'Dashboard', href: '/dashboard' }, { label: 'Work Orders' }]} />
        <div className="mt-4 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Work Orders</h1>
          <Button leftIcon={<FiPlus />} onClick={() => navigate('/work-orders/create')}>New Work Order</Button>
        </div>
      </motion.div>

      <FilterPanel>
        <SearchBox value={search} onChange={setSearch} placeholder="Search work orders..." className="flex-1 min-w-[200px]" />
        <FilterSelect label="Status" value={statusFilter} onChange={setStatusFilter} options={[
          { label: 'All Status', value: '' },
          ...Object.entries(STATUS_LABELS).map(([v, l]) => ({ label: l, value: v })),
        ]} />
        <FilterSelect label="Priority" value={priorityFilter} onChange={setPriorityFilter} options={[
          { label: 'All Priority', value: '' },
          ...Object.entries(PRIORITY_LABELS).map(([v, l]) => ({ label: l, value: v })),
        ]} />
      </FilterPanel>

      <Card padding={false}>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-slate-200 bg-slate-50 dark:border-slate-700 dark:bg-slate-800/50">
              <tr>
                <th className="px-6 py-3 text-xs font-semibold uppercase tracking-wider text-slate-500">ID</th>
                <th className="px-6 py-3 text-xs font-semibold uppercase tracking-wider text-slate-500">Title</th>
                <th className="px-6 py-3 text-xs font-semibold uppercase tracking-wider text-slate-500">Status</th>
                <th className="px-6 py-3 text-xs font-semibold uppercase tracking-wider text-slate-500">Priority</th>
                <th className="px-6 py-3 text-xs font-semibold uppercase tracking-wider text-slate-500 hidden md:table-cell">Created</th>
                <th className="px-6 py-3 text-xs font-semibold uppercase tracking-wider text-slate-500">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-700/50">
              {paginated.map((wo, i) => (
                <motion.tr
                  key={wo.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: i * 0.02 }}
                  className="cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800/50"
                  onClick={() => navigate(`/work-orders/${wo.id}`)}
                >
                  <td className="px-6 py-4 font-medium text-blue-600 dark:text-blue-400">{wo.id}</td>
                  <td className="px-6 py-4">
                    <p className="font-medium text-slate-900 dark:text-white">{wo.title}</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-1">{wo.description}</p>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium ${STATUS_COLORS[wo.status]}`}>
                      {STATUS_LABELS[wo.status]}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium capitalize ${PRIORITY_COLORS[wo.priority]}`}>
                      <span className={`h-1.5 w-1.5 rounded-full ${PRIORITY_DOTS[wo.priority]}`} />
                      {PRIORITY_LABELS[wo.priority]}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-500 dark:text-slate-400 hidden md:table-cell">{formatDate(wo.createdAt)}</td>
                  <td className="px-6 py-4">
                    <Button variant="ghost" size="sm" onClick={(e) => { e.stopPropagation(); navigate(`/work-orders/${wo.id}`); }}>View</Button>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
        {paginated.length === 0 && (
          <div className="py-12 text-center text-sm text-slate-500 dark:text-slate-400">No work orders found</div>
        )}
      </Card>

      <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />
    </div>
  );
}
