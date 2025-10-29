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

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 w-full h-16 min-h-16 bg-white border-b border-gray-200 dark:bg-slate-900 dark:border-slate-800 shadow-sm">
      <div className="h-full px-4 lg:px-6 flex items-center max-w-full">
        <div className="flex items-center justify-between w-full gap-4">
          {/* Left section */}
          <div className="flex items-center gap-8 flex-shrink-0">
            <Link to="/" className="flex items-center gap-2 py-2">
              <img 
                src={LogoSvg} 
                alt="Attendify Logo" 
                className="w-10 h-10 flex-shrink-0"
              />
              <span className="text-xl font-bold text-gray-900 dark:text-white whitespace-nowrap">Attendify</span>
            </Link>

            {/* Navigation Links */}
            {user && navLinks.length > 0 && (
              <div className="hidden lg:flex items-center gap-1">
                {navLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${
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
          <div className="flex items-center gap-3 flex-shrink-0">
            {/* Mobile menu button */}
            {user && navLinks.length > 0 && (
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2 rounded-lg text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-slate-800"
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
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            )}

            <LanguageSwitcher />
            <ThemeToggle />
            {user && (
              <>
                <div className="hidden md:flex items-center gap-3 ml-4 pl-4 border-l border-gray-200 dark:border-slate-700 h-10">
                  <div className="text-right flex-shrink-0">
                    <p className="text-sm font-medium text-gray-900 dark:text-white whitespace-nowrap">
                      {user.firstName} {user.lastName}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 capitalize whitespace-nowrap">
                      {user.role}
                    </p>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="p-2 rounded-lg text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-slate-800 transition-colors flex-shrink-0"
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
        <div className="lg:hidden absolute top-16 left-0 right-0 bg-white dark:bg-slate-900 border-b border-gray-200 dark:border-slate-800 shadow-lg">
          <div className="px-4 py-2 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`block px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                  location.pathname === link.path
                    ? 'bg-primary-100 text-primary-700 dark:bg-primary-900 dark:text-primary-300'
                    : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-slate-800'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};
