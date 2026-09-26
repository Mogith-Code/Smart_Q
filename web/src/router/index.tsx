import { createBrowserRouter, Navigate } from 'react-router-dom';
import { AdminLayout } from '../layouts/AdminLayout';
import { AdminDashboard } from '../pages/admin/Dashboard';
import { AdminAnalytics } from '../pages/admin/Analytics';
import { AdminMIS } from '../pages/admin/MIS';
import { AdminServices } from '../pages/admin/Services';
import { AdminStaff } from '../pages/admin/Staff';
import { AdminBranches } from '../pages/admin/Branches';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AdminLayout />,
    children: [
      {
        index: true,
        element: <AdminDashboard />,
      },
      {
        path: 'dashboard',
        element: <AdminDashboard />,
      },
      {
        path: 'analytics',
        element: <AdminAnalytics />,
      },
      {
        path: 'mis',
        element: <AdminMIS />,
      },
      {
        path: 'services',
        element: <AdminServices />,
      },
      {
        path: 'staff',
        element: <AdminStaff />,
      },
      {
        path: 'branches',
        element: <AdminBranches />,
      },
      {
        path: '*',
        element: <Navigate to="/" replace />,
      },
    ],
  },
]);
