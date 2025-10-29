import { Navigate } from 'react-router-dom';
import { useAuthStore } from '../store';
import type { User } from '../types';

interface RoleRouteProps {
  children: React.ReactNode;
  allowedRoles: User['role'][];
}

export const RoleRoute: React.FC<RoleRouteProps> = ({ children, allowedRoles }) => {
  const { user, isAuthenticated } = useAuthStore();

  if (!isAuthenticated || !user) {
    return <Navigate to="/login" replace />;
  }

  if (!allowedRoles.includes(user.role)) {
    // Redirect to appropriate dashboard based on role
    const dashboardMap: Record<User['role'], string> = {
      student: '/student',
      lecturer: '/lecturer',
      admin: '/admin',
    };
    return <Navigate to={dashboardMap[user.role]} replace />;
  }

  return <>{children}</>;
};
