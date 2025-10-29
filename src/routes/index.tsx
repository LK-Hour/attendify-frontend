import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import { PrivateRoute } from './PrivateRoute';
import { RoleRoute } from './RoleRoute';
import { Login, Register, ForgotPassword } from '../pages/auth';
import { StudentDashboard, Classes, CheckIn, Attendance, Settings as StudentSettings } from '../pages/student';
import { LecturerDashboard, ClassManagement, RequestManagement, Reports } from '../pages/lecturer';
import { AdminDashboard, Analytics, CampusManagement, UserManagement, Settings } from '../pages/admin';

const NotFoundPage = () => <div>404 - Page Not Found</div>;

const router = createBrowserRouter([
  {
    path: '/',
    element: <Navigate to="/login" replace />,
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/register',
    element: <Register />,
  },
  {
    path: '/forgot-password',
    element: <ForgotPassword />,
  },
  {
    path: '/student/dashboard',
    element: (
      <PrivateRoute>
        <RoleRoute allowedRoles={['student']}>
          <StudentDashboard />
        </RoleRoute>
      </PrivateRoute>
    ),
  },
  {
    path: '/student/classes',
    element: (
      <PrivateRoute>
        <RoleRoute allowedRoles={['student']}>
          <Classes />
        </RoleRoute>
      </PrivateRoute>
    ),
  },
  {
    path: '/student/checkin',
    element: (
      <PrivateRoute>
        <RoleRoute allowedRoles={['student']}>
          <CheckIn />
        </RoleRoute>
      </PrivateRoute>
    ),
  },
  {
    path: '/student/attendance',
    element: (
      <PrivateRoute>
        <RoleRoute allowedRoles={['student']}>
          <Attendance />
        </RoleRoute>
      </PrivateRoute>
    ),
  },
  {
    path: '/student/settings',
    element: (
      <PrivateRoute>
        <RoleRoute allowedRoles={['student']}>
          <StudentSettings />
        </RoleRoute>
      </PrivateRoute>
    ),
  },
  {
    path: '/lecturer/*',
    element: (
      <PrivateRoute>
        <RoleRoute allowedRoles={['lecturer']}>
          <LecturerDashboard />
        </RoleRoute>
      </PrivateRoute>
    ),
  },
  {
    path: '/lecturer/dashboard',
    element: (
      <PrivateRoute>
        <RoleRoute allowedRoles={['lecturer']}>
          <LecturerDashboard />
        </RoleRoute>
      </PrivateRoute>
    ),
  },
  {
    path: '/lecturer/classes',
    element: (
      <PrivateRoute>
        <RoleRoute allowedRoles={['lecturer']}>
          <ClassManagement />
        </RoleRoute>
      </PrivateRoute>
    ),
  },
  {
    path: '/lecturer/requests',
    element: (
      <PrivateRoute>
        <RoleRoute allowedRoles={['lecturer']}>
          <RequestManagement />
        </RoleRoute>
      </PrivateRoute>
    ),
  },
  {
    path: '/lecturer/reports',
    element: (
      <PrivateRoute>
        <RoleRoute allowedRoles={['lecturer']}>
          <Reports />
        </RoleRoute>
      </PrivateRoute>
    ),
  },
  {
    path: '/admin/*',
    element: (
      <PrivateRoute>
        <RoleRoute allowedRoles={['admin']}>
          <AdminDashboard />
        </RoleRoute>
      </PrivateRoute>
    ),
  },
  {
    path: '/admin/dashboard',
    element: (
      <PrivateRoute>
        <RoleRoute allowedRoles={['admin']}>
          <AdminDashboard />
        </RoleRoute>
      </PrivateRoute>
    ),
  },
  {
    path: '/admin/analytics',
    element: (
      <PrivateRoute>
        <RoleRoute allowedRoles={['admin']}>
          <Analytics />
        </RoleRoute>
      </PrivateRoute>
    ),
  },
  {
    path: '/admin/campuses',
    element: (
      <PrivateRoute>
        <RoleRoute allowedRoles={['admin']}>
          <CampusManagement />
        </RoleRoute>
      </PrivateRoute>
    ),
  },
  {
    path: '/admin/users',
    element: (
      <PrivateRoute>
        <RoleRoute allowedRoles={['admin']}>
          <UserManagement />
        </RoleRoute>
      </PrivateRoute>
    ),
  },
  {
    path: '/admin/settings',
    element: (
      <PrivateRoute>
        <RoleRoute allowedRoles={['admin']}>
          <Settings />
        </RoleRoute>
      </PrivateRoute>
    ),
  },
  {
    path: '*',
    element: <NotFoundPage />,
  },
]);

export const AppRoutes = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100">
      <RouterProvider router={router} />
    </div>
  );
};

export default router;
