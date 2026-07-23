import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import { Button, Card, Breadcrumb } from '@/components/common';

interface WorkOrderForm {
  title: string;
  description: string;
  priority: string;
  customerId: string;
  siteId: string;
  technicianId: string;
  scheduledDate: string;
  estimatedHours: number;
}

export function WorkOrderCreatePage() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm<WorkOrderForm>();

  const onSubmit = (data: WorkOrderForm) => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      navigate('/work-orders');
    }, 1000);
  };

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        <Breadcrumb items={[{ label: 'Dashboard', href: '/dashboard' }, { label: 'Work Orders', href: '/work-orders' }, { label: 'Create' }]} />
        <h1 className="mt-4 text-2xl font-bold text-slate-900 dark:text-white">Create Work Order</h1>
      </motion.div>

      <Card>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <label className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300">Title</label>
              <input {...register('title', { required: true })} className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm dark:border-slate-600 dark:bg-slate-700 dark:text-white" placeholder="Work order title" />
              {errors.title && <p className="mt-1 text-xs text-red-500">Required</p>}
            </div>

            <div className="sm:col-span-2">
              <label className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300">Description</label>
              <textarea {...register('description', { required: true })} rows={4} className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm dark:border-slate-600 dark:bg-slate-700 dark:text-white" placeholder="Describe the work to be done..." />
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300">Priority</label>
              <select {...register('priority', { required: true })} className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm dark:border-slate-600 dark:bg-slate-700 dark:text-white">
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
                <option value="critical">Critical</option>
              </select>
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300">Customer</label>
              <select {...register('customerId', { required: true })} className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm dark:border-slate-600 dark:bg-slate-700 dark:text-white">
                <option value="">Select customer</option>
                <option value="1">Acme Corp</option>
                <option value="2">TechStart Inc</option>
                <option value="3">GreenLife Co</option>
              </select>
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300">Site</label>
              <select {...register('siteId', { required: true })} className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm dark:border-slate-600 dark:bg-slate-700 dark:text-white">
                <option value="">Select site</option>
                <option value="1">Headquarters</option>
                <option value="2">Branch Office</option>
              </select>
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300">Assign Technician</label>
              <select {...register('technicianId')} className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm dark:border-slate-600 dark:bg-slate-700 dark:text-white">
                <option value="">Unassigned</option>
                <option value="1">John Smith</option>
                <option value="2">Sarah Johnson</option>
                <option value="3">Mike Chen</option>
              </select>
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300">Scheduled Date</label>
              <input type="datetime-local" {...register('scheduledDate')} className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm dark:border-slate-600 dark:bg-slate-700 dark:text-white" />
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300">Estimated Hours</label>
              <input type="number" {...register('estimatedHours', { min: 0 })} className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm dark:border-slate-600 dark:bg-slate-700 dark:text-white" placeholder="0" />
            </div>
          </div>

          <div className="flex justify-end gap-3 border-t border-slate-200 pt-6 dark:border-slate-700">
            <Button variant="ghost" type="button" onClick={() => navigate('/work-orders')}>Cancel</Button>
            <Button type="submit" isLoading={isLoading}>Create Work Order</Button>
          </div>
        </form>
      </Card>
    </div>
  );
}
