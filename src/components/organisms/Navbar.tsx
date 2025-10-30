import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';
import { ThemeToggle } from '../atoms';
import { LanguageSwitcher } from './LanguageSwitcher';
import { useAuthStore } from '../../store';
import LogoSvg from '../../assets/icons/logo.svg';

export const Navbar = () => {
  const { user, logout } = useAuthStore();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    setMobileMenuOpen(false);
  };

  // Navigation links based on user role
  const getNavigationLinks = () => {
    if (!user) return [];

    switch (user.role) {
      case 'student':
        return [
          { name: 'Dashboard', path: '/student/dashboard' },
          { name: 'Classes', path: '/student/classes' },
          { name: 'Check In', path: '/student/checkin' },
          { name: 'Attendance', path: '/student/attendance' },
          { name: 'Settings', path: '/student/settings' },
        ];
      case 'lecturer':
        return [
          { name: 'Dashboard', path: '/lecturer/dashboard' },
          { name: 'Classes', path: '/lecturer/classes' },
          { name: 'Requests', path: '/lecturer/requests' },
          { name: 'Reports', path: '/lecturer/reports' },
        ];
      case 'admin':
        return [
          { name: 'Dashboard', path: '/admin/dashboard' },
          { name: 'Analytics', path: '/admin/analytics' },
          { name: 'Users', path: '/admin/users' },
          { name: 'Campuses', path: '/admin/campuses' },
          { name: 'Settings', path: '/admin/settings' },
        ];
      default:
        return [];
    }
  };

  const navLinks = getNavigationLinks();

  // Get home path based on user role
  const getHomePath = () => {
    if (!user) return '/';

    switch (user.role) {
      case 'student':
        return '/student/dashboard';
      case 'lecturer':
        return '/lecturer/dashboard';
      case 'admin':
        return '/admin/dashboard';
      default:
        return '/';
    }
  };

  return (
    <nav className="fixed left-0 right-0 top-0 z-50 h-16 min-h-16 w-full border-b border-gray-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <div className="flex h-full max-w-full items-center px-4 lg:px-6">
        <div className="flex w-full items-center justify-between gap-4">
          {/* Left section */}
          <div className="flex flex-shrink-0 items-center gap-8">
            <Link to={getHomePath()} className="flex items-center gap-2 py-2">
              <img src={LogoSvg} alt="Attendify Logo" className="h-10 w-10 flex-shrink-0" />
              <span className="whitespace-nowrap text-xl font-bold text-gray-900 dark:text-white">
                Attendify
              </span>
            </Link>

            {/* Navigation Links */}
            {user && navLinks.length > 0 && (
              <div className="hidden items-center gap-1 lg:flex">
                {navLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`whitespace-nowrap rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                      location.pathname === link.path
                        ? 'bg-primary-100 text-primary-700 dark:bg-primary-900 dark:text-primary-300'
                        : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-slate-800'
                    }`}
                  >
                    {link.name}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Right section */}
          <div className="flex flex-shrink-0 items-center gap-3">
            {/* Mobile menu button */}
            {user && navLinks.length > 0 && (
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="rounded-lg p-2 text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-slate-800 lg:hidden"
                aria-label="Toggle menu"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  {mobileMenuOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  )}
                </svg>
              </button>
            )}

            <LanguageSwitcher />
            <ThemeToggle />
            {user && (
              <>
                <div className="ml-4 hidden h-10 items-center gap-3 border-l border-gray-200 pl-4 dark:border-slate-700 md:flex">
                  <div className="flex-shrink-0 text-right">
                    <p className="whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                      {user.firstName} {user.lastName}
                    </p>
                    <p className="whitespace-nowrap text-xs capitalize text-gray-500 dark:text-gray-400">
                      {user.role}
                    </p>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="flex-shrink-0 rounded-lg p-2 text-gray-700 transition-colors hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-slate-800"
                    aria-label="Logout"
                    title="Logout"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                      />
                    </svg>
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {user && mobileMenuOpen && (
        <div className="absolute left-0 right-0 top-16 border-b border-gray-200 bg-white shadow-lg dark:border-slate-800 dark:bg-slate-900 lg:hidden">
          <div className="space-y-1 px-4 py-2">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`block rounded-lg px-4 py-3 text-sm font-medium transition-colors ${
                  location.pathname === link.path
                    ? 'bg-primary-100 text-primary-700 dark:bg-primary-900 dark:text-primary-300'
                    : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-slate-800'
                }`}
              >
                {link.name}
              </Link>
            ))}

            {/* Mobile User Info & Logout */}
            <div className="mt-3 border-t border-gray-200 pt-3 dark:border-slate-700">
              <div className="mb-2 px-4 py-2">
                <p className="text-sm font-medium text-gray-900 dark:text-white">
                  {user.firstName} {user.lastName}
                </p>
                <p className="text-xs capitalize text-gray-500 dark:text-gray-400">{user.role}</p>
              </div>
              <button
                onClick={handleLogout}
                className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium text-red-600 transition-colors hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-950"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                  />
                </svg>
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};
