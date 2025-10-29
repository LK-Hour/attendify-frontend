import { useState } from 'react';
import type { FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '../../components/atoms';
import { Card, FormField } from '../../components/molecules';
import { AuthLayout } from '../../components/templates';
import { useAuthStore } from '../../store';
import type { UserRole } from '../../types';
import LogoSvg from '../../assets/icons/logo.svg';

export const Login = () => {
  const navigate = useNavigate();
  const { login, isLoading } = useAuthStore();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<UserRole>('student');
  const [error, setError] = useState('');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      await login({ email, password, role });
      
      // Redirect based on role
      const dashboardRoutes = {
        student: '/student/dashboard',
        lecturer: '/lecturer/dashboard',
        admin: '/admin/dashboard',
      };
      
      navigate(dashboardRoutes[role], { replace: true });
    } catch (err) {
      setError('Invalid credentials. Please try again.');
    }
  };

  return (
    <AuthLayout>
      <Card>
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mx-auto mb-4">
            <img 
              src={LogoSvg} 
              alt="Attendify Logo" 
              className="w-16 h-16"
            />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Welcome to Attendify</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">Sign in to your account</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="p-4 rounded-lg bg-red-50 dark:bg-red-900 border border-red-200 dark:border-red-800">
              <p className="text-sm text-red-800 dark:text-red-200">{error}</p>
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Role
            </label>
            <div className="grid grid-cols-3 gap-2">
              {(['student', 'lecturer', 'admin'] as UserRole[]).map((r) => (
                <button
                  key={r}
                  type="button"
                  onClick={() => setRole(r)}
                  className={`px-4 py-2 rounded-lg font-medium capitalize transition-colors ${
                    role === r
                      ? 'bg-primary-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-slate-800 dark:text-gray-300 dark:hover:bg-slate-700'
                  }`}
                >
                  {r}
                </button>
              ))}
            </div>
          </div>

          <FormField
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
          />

          <FormField
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            required
          />

          <div className="flex items-center justify-between">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                className="w-4 h-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
              />
              <span className="text-sm text-gray-600 dark:text-gray-400">Remember me</span>
            </label>
            <Link
              to="/forgot-password"
              className="text-sm text-primary-600 hover:text-primary-700 dark:text-primary-400"
            >
              Forgot password?
            </Link>
          </div>

          <Button type="submit" variant="primary" fullWidth isLoading={isLoading}>
            Sign In
          </Button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Don't have an account?{' '}
            <Link to="/register" className="text-primary-600 hover:text-primary-700 dark:text-primary-400 font-medium">
              Sign up
            </Link>
          </p>
        </div>
      </Card>
    </AuthLayout>
  );
};
