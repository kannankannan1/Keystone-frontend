import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiUserCheck, FiPhone, FiMail } from 'react-icons/fi';
import { Card, SearchBox, Breadcrumb } from '@/components/common';

interface Tech {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  specialization: string;
  activeJobs: number;
  completedJobs: number;
  rating: number;
  status: 'available' | 'on_job' | 'off_duty';
}

const mockTechnicians: Tech[] = [
  { id: '1', firstName: 'John', lastName: 'Smith', email: 'john@keystone.io', phone: '555-0001', specialization: 'HVAC', activeJobs: 2, completedJobs: 34, rating: 4.8, status: 'available' },
  { id: '2', firstName: 'Sarah', lastName: 'Johnson', email: 'sarah@keystone.io', phone: '555-0002', specialization: 'Electrical', activeJobs: 1, completedJobs: 28, rating: 4.6, status: 'on_job' },
  { id: '3', firstName: 'Mike', lastName: 'Chen', email: 'mike@keystone.io', phone: '555-0003', specialization: 'Plumbing', activeJobs: 3, completedJobs: 41, rating: 4.9, status: 'on_job' },
  { id: '4', firstName: 'Emily', lastName: 'Davis', email: 'emily@keystone.io', phone: '555-0004', specialization: 'General', activeJobs: 0, completedJobs: 22, rating: 4.5, status: 'off_duty' },
  { id: '5', firstName: 'Alex', lastName: 'Kumar', email: 'alex@keystone.io', phone: '555-0005', specialization: 'Security Systems', activeJobs: 1, completedJobs: 37, rating: 4.7, status: 'available' },
];

const statusConfig: Record<string, { color: string; label: string }> = {
  available: { color: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300', label: 'Available' },
  on_job: { color: 'bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300', label: 'On Job' },
  off_duty: { color: 'bg-slate-100 text-slate-600 dark:bg-slate-700 dark:text-slate-300', label: 'Off Duty' },
};

export function TechniciansPage() {
  const [search, setSearch] = useState('');

  const filtered = mockTechnicians.filter((t) =>
    !search || `${t.firstName} ${t.lastName}`.toLowerCase().includes(search.toLowerCase()) || t.specialization.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        <Breadcrumb items={[{ label: 'Dashboard', href: '/dashboard' }, { label: 'Technicians' }]} />
        <h1 className="mt-4 text-2xl font-bold text-slate-900 dark:text-white">Technicians</h1>
      </motion.div>

      <SearchBox value={search} onChange={setSearch} placeholder="Search technicians..." className="max-w-md" />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((tech, i) => (
          <motion.div
            key={tech.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
          >
            <Card hover>
              <div className="mb-4 flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-indigo-500 text-sm font-bold text-white">
                    {tech.firstName[0]}{tech.lastName[0]}
                  </div>
                  <div>
                    <p className="font-semibold text-slate-900 dark:text-white">{tech.firstName} {tech.lastName}</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">{tech.specialization}</p>
                  </div>
                </div>
                <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${statusConfig[tech.status].color}`}>
                  {statusConfig[tech.status].label}
                </span>
              </div>
              <div className="grid grid-cols-3 gap-3 mb-4">
                <div className="text-center rounded-lg bg-slate-50 p-2 dark:bg-slate-800/50">
                  <p className="text-lg font-bold text-slate-900 dark:text-white">{tech.activeJobs}</p>
                  <p className="text-[10px] text-slate-500 dark:text-slate-400">Active</p>
                </div>
                <div className="text-center rounded-lg bg-slate-50 p-2 dark:bg-slate-800/50">
                  <p className="text-lg font-bold text-slate-900 dark:text-white">{tech.completedJobs}</p>
                  <p className="text-[10px] text-slate-500 dark:text-slate-400">Done</p>
                </div>
                <div className="text-center rounded-lg bg-slate-50 p-2 dark:bg-slate-800/50">
                  <p className="text-lg font-bold text-amber-500">★ {tech.rating}</p>
                  <p className="text-[10px] text-slate-500 dark:text-slate-400">Rating</p>
                </div>
              </div>
              <div className="flex items-center gap-4 text-xs text-slate-500 dark:text-slate-400">
                <span className="flex items-center gap-1"><FiMail size={12} /> {tech.email}</span>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
