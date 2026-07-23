import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiPlus, FiEdit2, FiTrash2, FiMapPin } from 'react-icons/fi';
import { Card, Button, SearchBox, Pagination, Breadcrumb, Modal, ConfirmDialog } from '@/components/common';
import { formatDate } from '@/utils';

interface Site {
  id: string;
  name: string;
  customerName: string;
  address: string;
  city: string;
  contactName: string;
  contactPhone: string;
}

const mockSites: Site[] = [
  { id: '1', name: 'Headquarters', customerName: 'Acme Corp', address: '123 Main St', city: 'Springfield', contactName: 'Jane Doe', contactPhone: '555-0100' },
  { id: '2', name: 'Branch Office', customerName: 'TechStart Inc', address: '456 Oak Ave', city: 'Portland', contactName: 'Bob Lee', contactPhone: '555-0200' },
  { id: '3', name: 'Warehouse', customerName: 'GreenLife Co', address: '789 Pine Rd', city: 'Seattle', contactName: 'Amy Chen', contactPhone: '555-0300' },
  { id: '4', name: 'Data Center', customerName: 'SecureNet', address: '321 Tech Blvd', city: 'Austin', contactName: 'Tom Wilson', contactPhone: '555-0400' },
  { id: '5', name: 'Building B', customerName: 'Acme Corp', address: '125 Main St', city: 'Springfield', contactName: 'Jane Doe', contactPhone: '555-0100' },
];

export function SitesPage() {
  const [search, setSearch] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [page, setPage] = useState(1);
  const perPage = 8;

  const filtered = mockSites.filter((s) =>
    !search || s.name.toLowerCase().includes(search.toLowerCase()) || s.customerName.toLowerCase().includes(search.toLowerCase())
  );
  const totalPages = Math.ceil(filtered.length / perPage);
  const paginated = filtered.slice((page - 1) * perPage, page * perPage);

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        <Breadcrumb items={[{ label: 'Dashboard', href: '/dashboard' }, { label: 'Sites' }]} />
        <div className="mt-4 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Sites</h1>
          <Button leftIcon={<FiPlus />} onClick={() => setShowModal(true)}>New Site</Button>
        </div>
      </motion.div>

      <SearchBox value={search} onChange={setSearch} placeholder="Search sites..." className="max-w-md" />

      <Card padding={false}>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-slate-200 bg-slate-50 dark:border-slate-700 dark:bg-slate-800/50">
              <tr>
                <th className="px-6 py-3 text-xs font-semibold uppercase tracking-wider text-slate-500">Site</th>
                <th className="px-6 py-3 text-xs font-semibold uppercase tracking-wider text-slate-500">Customer</th>
                <th className="px-6 py-3 text-xs font-semibold uppercase tracking-wider text-slate-500 hidden md:table-cell">Address</th>
                <th className="px-6 py-3 text-xs font-semibold uppercase tracking-wider text-slate-500 hidden lg:table-cell">Contact</th>
                <th className="px-6 py-3 text-xs font-semibold uppercase tracking-wider text-slate-500">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-700/50">
              {paginated.map((s) => (
                <tr key={s.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400">
                        <FiMapPin size={16} />
                      </div>
                      <span className="font-medium text-slate-900 dark:text-white">{s.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400">{s.customerName}</td>
                  <td className="px-6 py-4 text-sm text-slate-500 dark:text-slate-400 hidden md:table-cell">{s.address}, {s.city}</td>
                  <td className="px-6 py-4 text-sm text-slate-500 dark:text-slate-400 hidden lg:table-cell">{s.contactName}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1">
                      <Button variant="ghost" size="sm" leftIcon={<FiEdit2 />}>Edit</Button>
                      <Button variant="ghost" size="sm" leftIcon={<FiTrash2 />} onClick={() => setShowDelete(true)}>Delete</Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />

      <Modal isOpen={showModal} onClose={() => setShowModal(false)} title="New Site" size="md">
        <div className="space-y-4">
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-300">Site Name</label>
            <input className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm dark:border-slate-600 dark:bg-slate-700 dark:text-white" />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-300">Customer</label>
            <select className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm dark:border-slate-600 dark:bg-slate-700 dark:text-white">
              <option>Select customer</option>
              <option>Acme Corp</option>
              <option>TechStart Inc</option>
              <option>GreenLife Co</option>
            </select>
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-300">Address</label>
            <input className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm dark:border-slate-600 dark:bg-slate-700 dark:text-white" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-300">City</label>
              <input className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm dark:border-slate-600 dark:bg-slate-700 dark:text-white" />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-300">ZIP</label>
              <input className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm dark:border-slate-600 dark:bg-slate-700 dark:text-white" />
            </div>
          </div>
          <div className="flex justify-end gap-3 pt-4">
            <Button variant="ghost" onClick={() => setShowModal(false)}>Cancel</Button>
            <Button onClick={() => setShowModal(false)}>Create Site</Button>
          </div>
        </div>
      </Modal>

      <ConfirmDialog
        isOpen={showDelete}
        onClose={() => setShowDelete(false)}
        onConfirm={() => setShowDelete(false)}
        title="Delete Site"
        message="Are you sure you want to delete this site?"
        type="danger"
        confirmText="Delete"
      />
    </div>
  );
}
