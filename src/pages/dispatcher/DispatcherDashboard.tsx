import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  FiPlus,
  FiUsers,
  FiMapPin,
  FiClipboard,
  FiFilter,
} from 'react-icons/fi';
import { Card, SearchBox, Button, Badge, Pagination, StatCard, FilterPanel, FilterSelect } from '@/components/common';
import { useWorkOrders, useWorkOrderPagination, useCustomers, useTechnicians } from '@/hooks';
import { STATUS_LABELS, STATUS_COLORS, PRIORITY_LABELS, PRIORITY_COLORS, PRIORITY_DOTS } from '@/constants';
import type { WorkOrder, WorkOrderStatus, WorkOrderPriority } from '@/types';
import { formatDate } from '@/utils';

const mockWorkOrders: WorkOrder[] = [
  { id: 'WO-1001', title: 'HVAC System Maintenance', description: 'Quarterly maintenance check', status: 'in_progress', priority: 'high', customerId: '1', siteId: '1', technicianId: '1', tags: ['hvac', 'maintenance'], comments: [], activities: [], timeLogs: [], parts: [], attachments: [], createdAt: '2026-07-20T10:00:00Z', updatedAt: '2026-07-20T10:00:00Z' },
  { id: 'WO-1002', title: 'Electrical Panel Upgrade', description: 'Upgrade main electrical panel', status: 'new', priority: 'critical', customerId: '2', siteId: '2', tags: ['electrical'], comments: [], activities: [], timeLogs: [], parts: [], attachments: [], createdAt: '2026-07-21T09:00:00Z', updatedAt: '2026-07-21T09:00:00Z' },
  { id: 'WO-1003', title: 'Plumbing Inspection', description: 'Annual plumbing inspection', status: 'assigned', priority: 'medium', customerId: '3', siteId: '3', technicianId: '2', tags: ['plumbing'], comments: [], activities: [], timeLogs: [], parts: [], attachments: [], createdAt: '2026-07-19T14:00:00Z', updatedAt: '2026-07-19T14:00:00Z' },
  { id: 'WO-1004', title: 'Fire Alarm Testing', description: 'Annual fire alarm system test', status: 'completed', priority: 'high', customerId: '4', siteId: '4', technicianId: '3', tags: ['safety', 'fire'], comments: [], activities: [], timeLogs: [], parts: [], attachments: [], createdAt: '2026-07-18T08:00:00Z', updatedAt: '2026-07-22T16:00:00Z' },
  { id: 'WO-1005', title: 'Elevator Inspection', description: 'Monthly elevator safety check', status: 'on_hold', priority: 'medium', customerId: '5', siteId: '5', technicianId: '4', tags: ['elevator', 'safety'], comments: [], activities: [], timeLogs: [], parts: [], attachments: [], createdAt: '2026-07-17T11:00:00Z', updatedAt: '2026-07-17T11:00:00Z' },
  { id: 'WO-1006', title: 'Roof Leak Repair', description: 'Fix roof leak in Building B', status: 'new', priority: 'high', customerId: '1', siteId: '1', tags: ['repair'], comments: [], activities: [], timeLogs: [], parts: [], attachments: [], createdAt: '2026-07-22T07:00:00Z', updatedAt: '2026-07-22T07:00:00Z' },
  { id: 'WO-1007', title: 'Generator Servicing', description: 'Bi-annual generator service', status: 'assigned', priority: 'low', customerId: '6', siteId: '6', technicianId: '1', tags: ['generator'], comments: [], activities: [], timeLogs: [], parts: [], attachments: [], createdAt: '2026-07-20T13:00:00Z', updatedAt: '2026-07-20T13:00:00Z' },
  { id: 'WO-1008', title: 'CCTV Installation', description: 'Install new CCTV cameras', status: 'in_progress', priority: 'medium', customerId: '2', siteId: '2', technicianId: '3', tags: ['security', 'installation'], comments: [], activities: [], timeLogs: [], parts: [], attachments: [], createdAt: '2026-07-21T15:00:00Z', updatedAt: '2026-07-21T15:00:00Z' },
];

export function DispatcherDashboard() {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [priorityFilter, setPriorityFilter] = useState('');
  const [page, setPage] = useState(1);
  const perPage = 6;

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
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Dispatcher Dashboard</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400">Manage work orders and dispatch technicians</p>
        </div>
        <Button leftIcon={<FiPlus />} onClick={() => navigate('/work-orders/create')}>
          New Work Order
        </Button>
      </motion.div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <StatCard label="Active Work Orders" value={filtered.filter(w => ['new', 'assigned', 'in_progress'].includes(w.status)).length} icon={<FiClipboard size={22} />} color="from-blue-500 to-blue-600" index={0} />
        <StatCard label="Customers" value="348" icon={<FiUsers size={22} />} color="from-indigo-500 to-violet-500" index={1} />
        <StatCard label="Available Technicians" value="12" icon={<FiMapPin size={22} />} color="from-emerald-500 to-green-500" index={2} />
      </div>

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
                <th className="px-6 py-3 text-xs font-semibold uppercase tracking-wider text-slate-500">Work Order</th>
                <th className="px-6 py-3 text-xs font-semibold uppercase tracking-wider text-slate-500">Status</th>
                <th className="px-6 py-3 text-xs font-semibold uppercase tracking-wider text-slate-500">Priority</th>
                <th className="px-6 py-3 text-xs font-semibold uppercase tracking-wider text-slate-500 hidden md:table-cell">Technician</th>
                <th className="px-6 py-3 text-xs font-semibold uppercase tracking-wider text-slate-500 hidden lg:table-cell">Created</th>
                <th className="px-6 py-3 text-xs font-semibold uppercase tracking-wider text-slate-500">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-700/50">
              {paginated.map((wo, i) => (
                <motion.tr
                  key={wo.id}
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.03 }}
                  className="hover:bg-slate-50 dark:hover:bg-slate-800/50 cursor-pointer"
                  onClick={() => navigate(`/work-orders/${wo.id}`)}
                >
                  <td className="px-6 py-4">
                    <p className="font-medium text-slate-900 dark:text-white">{wo.id}</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">{wo.title}</p>
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
                  <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400 hidden md:table-cell">
                    {wo.technicianId ? 'Assigned' : <span className="text-slate-400">Unassigned</span>}
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400 hidden lg:table-cell">
                    {formatDate(wo.createdAt)}
                  </td>
                  <td className="px-6 py-4">
                    <Button variant="ghost" size="sm" onClick={(e) => { e.stopPropagation(); navigate(`/work-orders/${wo.id}`); }}>
                      View
                    </Button>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
        {paginated.length === 0 && (
          <div className="py-12 text-center text-sm text-slate-500 dark:text-slate-400">
            No work orders match your filters
          </div>
        )}
      </Card>

      <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />
    </div>
  );
}
