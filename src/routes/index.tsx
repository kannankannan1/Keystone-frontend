import { createBrowserRouter, Navigate } from 'react-router-dom';
import { MainLayout } from '@/layouts/MainLayout';
import { AuthLayout } from '@/layouts/AuthLayout';
import { ProtectedRoute } from './ProtectedRoute';
import { LoginPage } from '@/pages/auth/LoginPage';
import { ForgotPasswordPage } from '@/pages/auth/ForgotPasswordPage';
import { DashboardPage } from '@/pages/DashboardPage';
import { WorkOrderListPage } from '@/pages/work-orders/WorkOrderListPage';
import { WorkOrderDetailPage } from '@/pages/work-orders/WorkOrderDetailPage';
import { WorkOrderCreatePage } from '@/pages/work-orders/WorkOrderCreatePage';
import { KanbanBoardPage } from '@/pages/kanban/KanbanBoardPage';
import { ReportsPage } from '@/pages/reports/ReportsPage';
import { SettingsPage } from '@/pages/settings/SettingsPage';
import { CustomersPage } from '@/pages/dispatcher/CustomersPage';
import { SitesPage } from '@/pages/dispatcher/SitesPage';
import { TechniciansPage } from '@/pages/dispatcher/TechniciansPage';
import { NotFoundPage } from '@/pages/common/NotFoundPage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AuthLayout />,
    children: [
      { path: 'login', element: <LoginPage /> },
      { path: 'forgot-password', element: <ForgotPasswordPage /> },
    ],
  },
  {
    path: '/',
    element: (
      <ProtectedRoute>
        <MainLayout />
      </ProtectedRoute>
    ),
    children: [
      { index: true, element: <Navigate to="/dashboard" replace /> },
      { path: 'dashboard', element: <DashboardPage /> },
      { path: 'work-orders', element: <WorkOrderListPage /> },
      { path: 'work-orders/create', element: <WorkOrderCreatePage /> },
      { path: 'work-orders/:id', element: <WorkOrderDetailPage /> },
      { path: 'work-orders/:id/edit', element: <WorkOrderCreatePage /> },
      { path: 'kanban', element: <KanbanBoardPage /> },
      { path: 'reports', element: <ReportsPage /> },
      { path: 'settings', element: <SettingsPage /> },
      {
        path: 'customers',
        element: (
          <ProtectedRoute allowedRoles={['manager', 'dispatcher']}>
            <CustomersPage />
          </ProtectedRoute>
        ),
      },
      {
        path: 'sites',
        element: (
          <ProtectedRoute allowedRoles={['manager', 'dispatcher']}>
            <SitesPage />
          </ProtectedRoute>
        ),
      },
      {
        path: 'technicians',
        element: (
          <ProtectedRoute allowedRoles={['manager', 'dispatcher']}>
            <TechniciansPage />
          </ProtectedRoute>
        ),
      },
    ],
  },
  { path: '*', element: <NotFoundPage /> },
]);
