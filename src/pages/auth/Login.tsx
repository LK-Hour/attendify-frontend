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
    } catch {
      setError('Invalid credentials. Please try again.');
    }
  };

  return (
    <AuthLayout>
      <Card>
        <div className="mb-6 text-center sm:mb-8">
          <div className="mx-auto mb-3 flex items-center justify-center sm:mb-4">
            <img src={LogoSvg} alt="Attendify Logo" className="h-12 w-12 sm:h-16 sm:w-16" />
          </div>
          <h1 className="text-xl font-bold text-gray-900 dark:text-white sm:text-2xl">
            Welcome to Attendify
          </h1>
          <p className="mt-1 text-sm text-gray-600 dark:text-gray-400 sm:mt-2 sm:text-base">
            Sign in to your account
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="rounded-lg border border-red-200 bg-red-50 p-3 dark:border-red-800 dark:bg-red-900 sm:p-4">
              <p className="text-xs text-red-800 dark:text-red-200 sm:text-sm">{error}</p>
            </div>
          )}

          <div>
            <label className="mb-2 block text-xs font-medium text-gray-700 dark:text-gray-300 sm:text-sm">
              Role
            </label>
            <div className="grid grid-cols-3 gap-2">
              {(['student', 'lecturer', 'admin'] as UserRole[]).map((r) => (
                <button
                  key={r}
                  type="button"
                  onClick={() => setRole(r)}
                  className={`rounded-lg px-2 py-2 text-xs font-medium capitalize transition-colors sm:px-4 sm:text-base ${
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

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between sm:gap-0">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
              />
              <span className="text-xs text-gray-600 dark:text-gray-400 sm:text-sm">
                Remember me
              </span>
            </label>
            <Link
              to="/forgot-password"
              className="text-xs text-primary-600 hover:text-primary-700 dark:text-primary-400 sm:text-sm"
            >
              Forgot password?
            </Link>
          </div>

          <Button type="submit" variant="primary" fullWidth isLoading={isLoading}>
            Sign In
          </Button>
        </form>

        <div className="mt-4 text-center sm:mt-6">
          <p className="text-xs text-gray-600 dark:text-gray-400 sm:text-sm">
            Don't have an account?{' '}
            <Link
              to="/register"
              className="font-medium text-primary-600 hover:text-primary-700 dark:text-primary-400"
            >
              Sign up
            </Link>
          </p>
        </div>
      </Card>
    </AuthLayout>
  );
};
