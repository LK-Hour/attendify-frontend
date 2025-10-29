import { useState } from 'react';
import type { FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../../components/atoms';
import { Card, FormField } from '../../components/molecules';
import { AuthLayout } from '../../components/templates';
import LogoSvg from '../../assets/icons/logo.svg';

export const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      // Mock password reset - would call API in production
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setIsSubmitted(true);
    } catch (err) {
      setError('Failed to send reset email. Please try again.');
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
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            {isSubmitted ? 'Check Your Email' : 'Forgot Password?'}
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            {isSubmitted
              ? "We've sent a password reset link to your email"
              : 'Enter your email to reset your password'}
          </p>
        </div>

        {isSubmitted ? (
          <div className="space-y-6">
            <div className="p-4 rounded-lg bg-green-50 dark:bg-green-900 border border-green-200 dark:border-green-800">
              <div className="flex items-start gap-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                <div className="flex-1">
                  <p className="text-sm font-medium text-green-800 dark:text-green-200">
                    Email sent successfully!
                  </p>
                  <p className="text-sm text-green-700 dark:text-green-300 mt-1">
                    Check your inbox at <strong>{email}</strong> and follow the instructions to reset your password.
                  </p>
                </div>
              </div>
            </div>

            <Link to="/login">
              <Button variant="primary" fullWidth>
                Back to Login
              </Button>
            </Link>

            <div className="text-center">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Didn't receive the email?{' '}
                <button
                  onClick={() => setIsSubmitted(false)}
                  className="text-primary-600 hover:text-primary-700 dark:text-primary-400 font-medium"
                >
                  Try again
                </button>
              </p>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="p-4 rounded-lg bg-red-50 dark:bg-red-900 border border-red-200 dark:border-red-800">
                <p className="text-sm text-red-800 dark:text-red-200">{error}</p>
              </div>
            )}

            <FormField
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              helperText="We'll send you a link to reset your password"
              required
            />

            <Button type="submit" variant="primary" fullWidth isLoading={isLoading}>
              Send Reset Link
            </Button>

            <div className="text-center">
              <Link
                to="/login"
                className="text-sm text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200"
              >
                ← Back to login
              </Link>
            </div>
          </form>
        )}
      </Card>
    </AuthLayout>
  );
};
