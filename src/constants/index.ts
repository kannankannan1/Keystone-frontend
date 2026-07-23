import type { WorkOrderStatus, WorkOrderPriority, ChartData } from '@/types';

export const APP_NAME = 'KEYSTONE';
export const APP_TAGLINE = 'Field Service Management Platform';

export const ROUTES = {
  LOGIN: '/login',
  FORGOT_PASSWORD: '/forgot-password',
  DASHBOARD: '/dashboard',
  WORK_ORDERS: '/work-orders',
  WORK_ORDER_DETAIL: '/work-orders/:id',
  WORK_ORDER_CREATE: '/work-orders/create',
  WORK_ORDER_EDIT: '/work-orders/:id/edit',
  KANBAN: '/kanban',
  REPORTS: '/reports',
  SETTINGS: '/settings',
  CUSTOMERS: '/customers',
  SITES: '/sites',
  TECHNICIANS: '/technicians',
  NOT_FOUND: '*',
} as const;

export const STATUS_LABELS: Record<WorkOrderStatus, string> = {
  new: 'New',
  assigned: 'Assigned',
  in_progress: 'In Progress',
  on_hold: 'On Hold',
  completed: 'Completed',
  closed: 'Closed',
  cancelled: 'Cancelled',
};

export const STATUS_COLORS: Record<WorkOrderStatus, string> = {
  new: 'bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300',
  assigned: 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/40 dark:text-indigo-300',
  in_progress: 'bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300',
  on_hold: 'bg-orange-100 text-orange-700 dark:bg-orange-900/40 dark:text-orange-300',
  completed: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300',
  closed: 'bg-slate-100 text-slate-700 dark:bg-slate-700 dark:text-slate-300',
  cancelled: 'bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300',
};

export const PRIORITY_LABELS: Record<WorkOrderPriority, string> = {
  low: 'Low',
  medium: 'Medium',
  high: 'High',
  critical: 'Critical',
};

export const PRIORITY_COLORS: Record<WorkOrderPriority, string> = {
  low: 'bg-slate-100 text-slate-600 dark:bg-slate-700 dark:text-slate-300',
  medium: 'bg-blue-100 text-blue-600 dark:bg-blue-900/40 dark:text-blue-300',
  high: 'bg-orange-100 text-orange-600 dark:bg-orange-900/40 dark:text-orange-300',
  critical: 'bg-red-100 text-red-600 dark:bg-red-900/40 dark:text-red-300',
};

export const PRIORITY_DOTS: Record<WorkOrderPriority, string> = {
  low: 'bg-slate-400',
  medium: 'bg-blue-500',
  high: 'bg-orange-500',
  critical: 'bg-red-500',
};

export const STATUS_ORDER: WorkOrderStatus[] = [
  'new',
  'assigned',
  'in_progress',
  'on_hold',
  'completed',
  'closed',
  'cancelled',
];

export const KANBAN_COLUMNS = STATUS_ORDER.filter(
  (s) => !['closed', 'cancelled'].includes(s)
);

export const ROLE_LABELS: Record<string, string> = {
  manager: 'Manager',
  dispatcher: 'Dispatcher',
  technician: 'Technician',
  customer: 'Customer',
};

export const ROLE_COLORS: Record<string, string> = {
  manager: 'bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-300',
  dispatcher: 'bg-cyan-100 text-cyan-700 dark:bg-cyan-900/40 dark:text-cyan-300',
  technician: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300',
  customer: 'bg-slate-100 text-slate-700 dark:bg-slate-700 dark:text-slate-300',
};

export const PIE_CHART_COLORS = [
  '#3B82F6',
  '#6366F1',
  '#F59E0B',
  '#F97316',
  '#10B981',
  '#6B7280',
  '#EF4444',
];

export const MONTHS = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];

export const SAMPLE_MONTHLY_DATA = [
  { month: 'Jan', completed: 45, created: 52 },
  { month: 'Feb', completed: 38, created: 44 },
  { month: 'Mar', completed: 55, created: 48 },
  { month: 'Apr', completed: 47, created: 51 },
  { month: 'May', completed: 62, created: 55 },
  { month: 'Jun', completed: 58, created: 63 },
  { month: 'Jul', completed: 71, created: 60 },
  { month: 'Aug', completed: 65, created: 68 },
  { month: 'Sep', completed: 72, created: 59 },
  { month: 'Oct', completed: 68, created: 73 },
  { month: 'Nov', completed: 81, created: 70 },
  { month: 'Dec', completed: 76, created: 65 },
];

export const SAMPLE_STATUS_DATA: ChartData[] = [
  { name: 'New', value: 18, fill: '#3B82F6' },
  { name: 'Assigned', value: 12, fill: '#6366F1' },
  { name: 'In Progress', value: 24, fill: '#F59E0B' },
  { name: 'On Hold', value: 8, fill: '#F97316' },
  { name: 'Completed', value: 35, fill: '#10B981' },
  { name: 'Closed', value: 22, fill: '#6B7280' },
  { name: 'Cancelled', value: 5, fill: '#EF4444' },
];

export const SAMPLE_TECHNICIAN_DATA = [
  { name: 'John Smith', jobsCompleted: 34, avgRating: 4.8 },
  { name: 'Sarah Johnson', jobsCompleted: 28, avgRating: 4.6 },
  { name: 'Mike Chen', jobsCompleted: 41, avgRating: 4.9 },
  { name: 'Emily Davis', jobsCompleted: 22, avgRating: 4.5 },
  { name: 'Alex Kumar', jobsCompleted: 37, avgRating: 4.7 },
];

export const SAMPLE_SLA_DATA = [
  { month: 'Jan', compliance: 92 },
  { month: 'Feb', compliance: 88 },
  { month: 'Mar', compliance: 95 },
  { month: 'Apr', compliance: 91 },
  { month: 'May', compliance: 87 },
  { month: 'Jun', compliance: 93 },
  { month: 'Jul', compliance: 96 },
  { month: 'Aug', compliance: 89 },
  { month: 'Sep', compliance: 94 },
  { month: 'Oct', compliance: 90 },
  { month: 'Nov', compliance: 97 },
  { month: 'Dec', compliance: 93 },
];
