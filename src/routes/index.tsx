import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import { PrivateRoute } from './PrivateRoute';
import { RoleRoute } from './RoleRoute';
import { Login, Register, ForgotPassword } from '../pages/auth';
import { StudentDashboard, Classes, CheckIn, Attendance, Settings as StudentSettings } from '../pages/student';
import { LecturerDashboard, Reports } from '../pages/lecturer';
import { AdminDashboard, CampusManagement, UserManagement, Settings } from '../pages/admin';

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
  return <RouterProvider router={router} />;
};

export default router;
