import { useState } from 'react';
import type { FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '../../components/atoms';
import { Card, FormField } from '../../components/molecules';
import { AuthLayout } from '../../components/templates';
import LogoSvg from '../../assets/icons/logo.svg';

export const Register = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    studentId: '',
    password: '',
    confirmPassword: '',
    major: '',
    year: 1,
    semester: 1,
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setIsLoading(true);
    try {
      // Mock registration - would call API in production
      await new Promise((resolve) => setTimeout(resolve, 1500));
      navigate('/login', { state: { message: 'Registration successful! Please log in.' } });
    } catch (err) {
      setError('Registration failed. Please try again.');
    } finally {
      setIsLoading(false);
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
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Create Account</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">Register as a student</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="p-4 rounded-lg bg-red-50 dark:bg-red-900 border border-red-200 dark:border-red-800">
              <p className="text-sm text-red-800 dark:text-red-200">{error}</p>
            </div>
          )}

          <div className="grid grid-cols-2 gap-4">
            <FormField
              label="First Name"
              type="text"
              value={formData.firstName}
              onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
              placeholder="John"
              required
            />
            <FormField
              label="Last Name"
              type="text"
              value={formData.lastName}
              onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
              placeholder="Doe"
              required
            />
          </div>

          <FormField
            label="Email"
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            placeholder="john.doe@student.cadt.edu.kh"
            required
          />

          <FormField
            label="Student ID"
            type="text"
            value={formData.studentId}
            onChange={(e) => setFormData({ ...formData, studentId: e.target.value })}
            placeholder="S20210001"
            required
          />

          <FormField
            label="Major"
            type="text"
            value={formData.major}
            onChange={(e) => setFormData({ ...formData, major: e.target.value })}
            placeholder="Computer Science"
            required
          />

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                Year <span className="text-red-500">*</span>
              </label>
              <select
                value={formData.year}
                onChange={(e) => setFormData({ ...formData, year: Number(e.target.value) })}
                className="w-full px-4 py-2 text-sm bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-slate-900 dark:text-slate-100 dark:border-slate-700"
                required
              >
                {[1, 2, 3, 4].map((y) => (
                  <option key={y} value={y}>
                    Year {y}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                Semester <span className="text-red-500">*</span>
              </label>
              <select
                value={formData.semester}
                onChange={(e) => setFormData({ ...formData, semester: Number(e.target.value) })}
                className="w-full px-4 py-2 text-sm bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-slate-900 dark:text-slate-100 dark:border-slate-700"
                required
              >
                {[1, 2].map((s) => (
                  <option key={s} value={s}>
                    Semester {s}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <FormField
            label="Password"
            type="password"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            placeholder="Min. 8 characters"
            required
          />

          <FormField
            label="Confirm Password"
            type="password"
            value={formData.confirmPassword}
            onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
            placeholder="Re-enter password"
            required
          />

          <Button type="submit" variant="primary" fullWidth isLoading={isLoading}>
            Create Account
          </Button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Already have an account?{' '}
            <Link to="/login" className="text-primary-600 hover:text-primary-700 dark:text-primary-400 font-medium">
              Sign in
            </Link>
          </p>
        </div>
      </Card>
    </AuthLayout>
  );
};
