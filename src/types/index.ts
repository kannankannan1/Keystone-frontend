export type Role = 'manager' | 'dispatcher' | 'technician' | 'customer';

export type WorkOrderStatus =
  | 'new'
  | 'assigned'
  | 'in_progress'
  | 'on_hold'
  | 'completed'
  | 'closed'
  | 'cancelled';

export type WorkOrderPriority = 'low' | 'medium' | 'high' | 'critical';

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: Role;
  avatar?: string;
  phone?: string;
  createdAt: string;
  updatedAt: string;
}

export interface AuthResponse {
  user: User;
  accessToken: string;
  refreshToken: string;
}

export interface Customer {
  id: string;
  companyName: string;
  contactName: string;
  email: string;
  phone: string;
  address: string;
  sites: Site[];
  createdAt: string;
}

export interface Site {
  id: string;
  customerId: string;
  customer?: Customer;
  name: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  lat?: number;
  lng?: number;
  contactName: string;
  contactPhone: string;
  createdAt: string;
}

export interface WorkOrder {
  id: string;
  title: string;
  description: string;
  status: WorkOrderStatus;
  priority: WorkOrderPriority;
  customerId: string;
  customer?: Customer;
  siteId: string;
  site?: Site;
  technicianId?: string;
  technician?: User;
  dispatcherId?: string;
  dispatcher?: User;
  estimatedHours?: number;
  actualHours?: number;
  scheduledDate?: string;
  completedDate?: string;
  tags: string[];
  comments: Comment[];
  activities: Activity[];
  timeLogs: TimeLog[];
  parts: PartUsage[];
  attachments: Attachment[];
  createdAt: string;
  updatedAt: string;
}

export interface Comment {
  id: string;
  userId: string;
  user?: User;
  workOrderId: string;
  content: string;
  createdAt: string;
}

export interface Activity {
  id: string;
  userId: string;
  user?: User;
  workOrderId: string;
  action: string;
  details?: string;
  createdAt: string;
}

export interface TimeLog {
  id: string;
  userId: string;
  user?: User;
  workOrderId: string;
  startTime: string;
  endTime?: string;
  duration: number;
  description: string;
  createdAt: string;
}

export interface PartUsage {
  id: string;
  workOrderId: string;
  partId: string;
  part?: Part;
  quantity: number;
  unitCost: number;
  notes?: string;
  createdAt: string;
}

export interface Part {
  id: string;
  name: string;
  sku: string;
  description: string;
  unitCost: number;
  stock: number;
}

export interface Attachment {
  id: string;
  fileName: string;
  originalName: string;
  fileUrl: string;
  fileType: string;
  fileSize: number;
  uploadedBy: string;
  uploadedAt: string;
  createdAt: string;
}

export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  read: boolean;
  link?: string;
  createdAt: string;
}

export interface DashboardStats {
  totalWorkOrders: number;
  openJobs: number;
  closedJobs: number;
  slaBreached: number;
  totalCustomers: number;
  totalTechnicians: number;
}

export interface ChartData {
  name: string;
  value: number;
  fill?: string;
}

export interface MonthlyData {
  month: string;
  completed: number;
  created: number;
}

export interface TechnicianPerformance {
  name: string;
  jobsCompleted: number;
  avgRating: number;
}

export interface PaginationParams {
  page: number;
  limit: number;
  search?: string;
  status?: WorkOrderStatus;
  priority?: WorkOrderPriority;
  technicianId?: string;
  customerId?: string;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface FilterState {
  search: string;
  status: WorkOrderStatus | '';
  priority: WorkOrderPriority | '';
  technicianId: string;
  dateFrom: string;
  dateTo: string;
}

export interface ThemeContextType {
  isDark: boolean;
  toggleTheme: () => void;
}
