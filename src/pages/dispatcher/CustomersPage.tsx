import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiPlus, FiEdit2, FiTrash2 } from 'react-icons/fi';
import { Card, Button, SearchBox, Pagination, Breadcrumb, Modal, ConfirmDialog } from '@/components/common';
import { formatDate } from '@/utils';

interface Customer {
  id: string;
  companyName: string;
  contactName: string;
  email: string;
  phone: string;
  siteCount: number;
  createdAt: string;
}

const mockCustomers: Customer[] = [
  { id: '1', companyName: 'Acme Corp', contactName: 'Jane Doe', email: 'jane@acme.com', phone: '555-0100', siteCount: 3, createdAt: '2025-01-15T00:00:00Z' },
  { id: '2', companyName: 'TechStart Inc', contactName: 'Bob Lee', email: 'bob@techstart.com', phone: '555-0200', siteCount: 2, createdAt: '2025-03-20T00:00:00Z' },
  { id: '3', companyName: 'GreenLife Co', contactName: 'Amy Chen', email: 'amy@greenlife.com', phone: '555-0300', siteCount: 1, createdAt: '2025-06-10T00:00:00Z' },
  { id: '4', companyName: 'SecureNet', contactName: 'Tom Wilson', email: 'tom@securenet.com', phone: '555-0400', siteCount: 4, createdAt: '2025-02-28T00:00:00Z' },
  { id: '5', companyName: 'Metro Buildings', contactName: 'Lisa Park', email: 'lisa@metro.com', phone: '555-0500', siteCount: 2, createdAt: '2025-04-15T00:00:00Z' },
];

export function CustomersPage() {
  const [search, setSearch] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [selectedId, setSelectedId] = useState('');
  const [page, setPage] = useState(1);
  const perPage = 8;

  const filtered = mockCustomers.filter((c) =>
    !search || c.companyName.toLowerCase().includes(search.toLowerCase()) || c.contactName.toLowerCase().includes(search.toLowerCase())
  );
  const totalPages = Math.ceil(filtered.length / perPage);
  const paginated = filtered.slice((page - 1) * perPage, page * perPage);

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        <Breadcrumb items={[{ label: 'Dashboard', href: '/dashboard' }, { label: 'Customers' }]} />
        <div className="mt-4 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Customers</h1>
          <Button leftIcon={<FiPlus />} onClick={() => setShowModal(true)}>New Customer</Button>
        </div>
      </motion.div>

      <SearchBox value={search} onChange={setSearch} placeholder="Search customers..." className="max-w-md" />

      <Card padding={false}>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-slate-200 bg-slate-50 dark:border-slate-700 dark:bg-slate-800/50">
              <tr>
                <th className="px-6 py-3 text-xs font-semibold uppercase tracking-wider text-slate-500">Company</th>
                <th className="px-6 py-3 text-xs font-semibold uppercase tracking-wider text-slate-500">Contact</th>
                <th className="px-6 py-3 text-xs font-semibold uppercase tracking-wider text-slate-500 hidden md:table-cell">Email</th>
                <th className="px-6 py-3 text-xs font-semibold uppercase tracking-wider text-slate-500 hidden lg:table-cell">Sites</th>
                <th className="px-6 py-3 text-xs font-semibold uppercase tracking-wider text-slate-500">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-700/50">
              {paginated.map((c) => (
                <tr key={c.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-indigo-500 text-xs font-bold text-white">
                        {c.companyName.substring(0, 2).toUpperCase()}
                      </div>
                      <span className="font-medium text-slate-900 dark:text-white">{c.companyName}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400">{c.contactName}</td>
                  <td className="px-6 py-4 text-sm text-slate-500 dark:text-slate-400 hidden md:table-cell">{c.email}</td>
                  <td className="px-6 py-4 text-sm font-medium text-slate-900 dark:text-white hidden lg:table-cell">{c.siteCount}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1">
                      <Button variant="ghost" size="sm" leftIcon={<FiEdit2 />}>Edit</Button>
                      <Button variant="ghost" size="sm" leftIcon={<FiTrash2 />} onClick={() => { setSelectedId(c.id); setShowDelete(true); }}>Delete</Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />

      <Modal isOpen={showModal} onClose={() => setShowModal(false)} title="New Customer" size="md">
        <div className="space-y-4">
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-300">Company Name</label>
            <input className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm dark:border-slate-600 dark:bg-slate-700 dark:text-white" />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-300">Contact Name</label>
            <input className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm dark:border-slate-600 dark:bg-slate-700 dark:text-white" />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-300">Email</label>
            <input type="email" className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm dark:border-slate-600 dark:bg-slate-700 dark:text-white" />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-300">Phone</label>
            <input className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm dark:border-slate-600 dark:bg-slate-700 dark:text-white" />
          </div>
          <div className="flex justify-end gap-3 pt-4">
            <Button variant="ghost" onClick={() => setShowModal(false)}>Cancel</Button>
            <Button onClick={() => setShowModal(false)}>Create Customer</Button>
          </div>
        </div>
      </Modal>

      <ConfirmDialog
        isOpen={showDelete}
        onClose={() => setShowDelete(false)}
        onConfirm={() => setShowDelete(false)}
        title="Delete Customer"
        message="Are you sure you want to delete this customer? This will also delete all associated sites and work orders."
        type="danger"
        confirmText="Delete"
      />
    </div>
  );
}
