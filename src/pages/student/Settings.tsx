import { useState } from 'react';
import { DashboardLayout } from '../../components/templates';
import { Card } from '../../components/molecules';
import { Button } from '../../components/atoms';
import { useAuthStore } from '../../store';

export const Settings = () => {
  const { user, updateProfile } = useAuthStore();
  const [isEditing, setIsEditing] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [passwordError, setPasswordError] = useState('');
  const [formData, setFormData] = useState({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    email: user?.email || '',
    phone: user?.phone || '',
  });

  if (!user || user.role !== 'student') return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updateProfile(formData);
      setIsEditing(false);
    } catch (error) {
      console.error('Failed to update profile:', error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
    setPasswordError('');
  };

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (
      !passwordData.currentPassword ||
      !passwordData.newPassword ||
      !passwordData.confirmPassword
    ) {
      setPasswordError('All fields are required');
      return;
    }

    if (passwordData.newPassword.length < 6) {
      setPasswordError('New password must be at least 6 characters');
      return;
    }

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setPasswordError('New passwords do not match');
      return;
    }

    // TODO: Implement actual password change logic with backend
    console.log('Password change requested');

    // Reset form and close modal
    setPasswordData({
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    });
    setPasswordError('');
    setShowPasswordModal(false);

    // Show success message (you can add a toast notification here)
    alert('Password changed successfully!');
  };

  const closePasswordModal = () => {
    setShowPasswordModal(false);
    setPasswordData({
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    });
    setPasswordError('');
  };

  return (
    <DashboardLayout>
      <div className="max-w-4xl space-y-4 sm:space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white sm:text-3xl">Settings</h1>
          <p className="mt-1 text-sm text-gray-600 dark:text-gray-400 sm:mt-2 sm:text-base">
            Manage your account settings and preferences
          </p>
        </div>

        {/* Profile Information */}
        <Card>
          <div className="mb-4 flex flex-col gap-3 sm:mb-6 sm:flex-row sm:items-center sm:justify-between sm:gap-0">
            <h2 className="text-lg font-bold text-gray-900 dark:text-white sm:text-xl">
              Profile Information
            </h2>
            {!isEditing && (
              <Button variant="secondary" size="sm" onClick={() => setIsEditing(true)}>
                Edit Profile
              </Button>
            )}
          </div>

          {isEditing ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-2 block text-xs font-medium text-gray-700 dark:text-gray-300 sm:text-sm">
                    First Name
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 focus:border-transparent focus:ring-2 focus:ring-primary-500 dark:border-slate-700 dark:bg-slate-900 dark:text-white sm:px-4 sm:text-base"
                  />
                </div>
                <div>
                  <label className="mb-2 block text-xs font-medium text-gray-700 dark:text-gray-300 sm:text-sm">
                    Last Name
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 focus:border-transparent focus:ring-2 focus:ring-primary-500 dark:border-slate-700 dark:bg-slate-900 dark:text-white sm:px-4 sm:text-base"
                  />
                </div>
              </div>

              <div>
                <label className="mb-2 block text-xs font-medium text-gray-700 dark:text-gray-300 sm:text-sm">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 focus:border-transparent focus:ring-2 focus:ring-primary-500 dark:border-slate-700 dark:bg-slate-900 dark:text-white sm:px-4 sm:text-base"
                />
              </div>

              <div>
                <label className="mb-2 block text-xs font-medium text-gray-700 dark:text-gray-300 sm:text-sm">
                  Phone Number
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Optional"
                  className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 focus:border-transparent focus:ring-2 focus:ring-primary-500 dark:border-slate-700 dark:bg-slate-900 dark:text-white sm:px-4 sm:text-base"
                />
              </div>

              <div className="flex flex-col gap-3 sm:flex-row">
                <Button type="submit" variant="primary">
                  Save Changes
                </Button>
                <Button
                  type="button"
                  variant="secondary"
                  onClick={() => {
                    setIsEditing(false);
                    setFormData({
                      firstName: user?.firstName || '',
                      lastName: user?.lastName || '',
                      email: user?.email || '',
                      phone: user?.phone || '',
                    });
                  }}
                >
                  Cancel
                </Button>
              </div>
            </form>
          ) : (
            <div className="space-y-4">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 sm:text-sm">
                    First Name
                  </label>
                  <p className="mt-1 text-sm text-gray-900 dark:text-white sm:text-base">
                    {user.firstName}
                  </p>
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 sm:text-sm">
                    Last Name
                  </label>
                  <p className="mt-1 text-sm text-gray-900 dark:text-white sm:text-base">
                    {user.lastName}
                  </p>
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 sm:text-sm">
                  Email
                </label>
                <p className="mt-1 break-all text-sm text-gray-900 dark:text-white sm:text-base">
                  {user.email}
                </p>
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 sm:text-sm">
                  Phone Number
                </label>
                <p className="mt-1 text-sm text-gray-900 dark:text-white sm:text-base">
                  {user.phone || 'Not provided'}
                </p>
              </div>

              {user.role === 'student' && 'studentId' in user && (
                <>
                  <div className="grid grid-cols-1 gap-4 border-t border-gray-200 pt-4 dark:border-slate-700 sm:grid-cols-2">
                    <div>
                      <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 sm:text-sm">
                        Student ID
                      </label>
                      <p className="mt-1 text-sm text-gray-900 dark:text-white sm:text-base">
                        {user.studentId}
                      </p>
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 sm:text-sm">
                        Major
                      </label>
                      <p className="mt-1 text-sm text-gray-900 dark:text-white sm:text-base">
                        {user.major}
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
                    <div>
                      <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 sm:text-sm">
                        Year
                      </label>
                      <p className="mt-1 text-sm text-gray-900 dark:text-white sm:text-base">
                        Year {user.year}
                      </p>
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 sm:text-sm">
                        Semester
                      </label>
                      <p className="mt-1 text-sm text-gray-900 dark:text-white sm:text-base">
                        Semester {user.semester}
                      </p>
                    </div>
                    <div className="col-span-2 sm:col-span-1">
                      <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 sm:text-sm">
                        Group
                      </label>
                      <p className="mt-1 text-sm text-gray-900 dark:text-white sm:text-base">
                        Group {user.group}
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                      <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 sm:text-sm">
                        Department
                      </label>
                      <p className="mt-1 text-sm text-gray-900 dark:text-white sm:text-base">
                        {user.department}
                      </p>
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 sm:text-sm">
                        Faculty
                      </label>
                      <p className="mt-1 text-sm text-gray-900 dark:text-white sm:text-base">
                        {user.faculty}
                      </p>
                    </div>
                  </div>
                </>
              )}
            </div>
          )}
        </Card>

        {/* Password Change */}
        <Card>
          <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between sm:gap-0">
            <div>
              <h2 className="text-lg font-bold text-gray-900 dark:text-white sm:text-xl">
                Security
              </h2>
              <p className="mt-1 text-xs text-gray-600 dark:text-gray-400 sm:text-sm">
                Manage your password and security settings
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-3 rounded-lg bg-gray-50 px-3 py-3 dark:bg-slate-800 sm:flex-row sm:items-center sm:justify-between sm:px-4 sm:py-4">
            <div>
              <p className="text-sm font-medium text-gray-900 dark:text-white sm:text-base">
                Password
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400 sm:text-sm">
                Last changed 30 days ago
              </p>
            </div>
            <Button variant="primary" size="sm" onClick={() => setShowPasswordModal(true)}>
              Change Password
            </Button>
          </div>
        </Card>

        {/* Notifications */}
        <Card>
          <h2 className="mb-4 text-lg font-bold text-gray-900 dark:text-white sm:text-xl">
            Notifications
          </h2>
          <div className="space-y-4">
            <div className="flex items-start justify-between gap-3 sm:items-center">
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium text-gray-900 dark:text-white sm:text-base">
                  Email Notifications
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400 sm:text-sm">
                  Receive email updates about your attendance
                </p>
              </div>
              <label className="relative inline-flex flex-shrink-0 cursor-pointer items-center">
                <input type="checkbox" defaultChecked className="peer sr-only" />
                <div className="peer h-6 w-11 rounded-full bg-gray-200 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-primary-600 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 dark:border-slate-600 dark:bg-slate-700 dark:peer-focus:ring-primary-800"></div>
              </label>
            </div>

            <div className="flex items-start justify-between gap-3 sm:items-center">
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium text-gray-900 dark:text-white sm:text-base">
                  Push Notifications
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400 sm:text-sm">
                  Receive push notifications for class reminders
                </p>
              </div>
              <label className="relative inline-flex flex-shrink-0 cursor-pointer items-center">
                <input type="checkbox" defaultChecked className="peer sr-only" />
                <div className="peer h-6 w-11 rounded-full bg-gray-200 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-primary-600 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 dark:border-slate-600 dark:bg-slate-700 dark:peer-focus:ring-primary-800"></div>
              </label>
            </div>

            <div className="flex items-start justify-between gap-3 sm:items-center">
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium text-gray-900 dark:text-white sm:text-base">
                  Absence Alerts
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400 sm:text-sm">
                  Get notified when you miss a class
                </p>
              </div>
              <label className="relative inline-flex flex-shrink-0 cursor-pointer items-center">
                <input type="checkbox" defaultChecked className="peer sr-only" />
                <div className="peer h-6 w-11 rounded-full bg-gray-200 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-primary-600 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 dark:border-slate-600 dark:bg-slate-700 dark:peer-focus:ring-primary-800"></div>
              </label>
            </div>
          </div>
        </Card>

        {/* Privacy */}
        <Card>
          <h2 className="mb-4 text-lg font-bold text-gray-900 dark:text-white sm:text-xl">
            Privacy
          </h2>
          <div className="space-y-4">
            <div className="flex items-start justify-between gap-3 sm:items-center">
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium text-gray-900 dark:text-white sm:text-base">
                  Face Recognition
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400 sm:text-sm">
                  Allow face recognition for check-in verification
                </p>
              </div>
              <label className="relative inline-flex flex-shrink-0 cursor-pointer items-center">
                <input type="checkbox" defaultChecked className="peer sr-only" />
                <div className="peer h-6 w-11 rounded-full bg-gray-200 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-primary-600 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 dark:border-slate-600 dark:bg-slate-700 dark:peer-focus:ring-primary-800"></div>
              </label>
            </div>

            <div className="flex items-start justify-between gap-3 sm:items-center">
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium text-gray-900 dark:text-white sm:text-base">
                  Location Services
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400 sm:text-sm">
                  Allow location tracking for attendance verification
                </p>
              </div>
              <label className="relative inline-flex flex-shrink-0 cursor-pointer items-center">
                <input type="checkbox" defaultChecked className="peer sr-only" />
                <div className="peer h-6 w-11 rounded-full bg-gray-200 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-primary-600 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 dark:border-slate-600 dark:bg-slate-700 dark:peer-focus:ring-primary-800"></div>
              </label>
            </div>
          </div>
        </Card>
      </div>

      {/* Password Change Modal */}
      {showPasswordModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex min-h-screen items-center justify-center px-4 pb-20 pt-4 text-center sm:block sm:p-0">
            {/* Background overlay */}
            <div
              className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity dark:bg-gray-900 dark:bg-opacity-75"
              onClick={closePasswordModal}
            ></div>

            {/* Modal panel */}
            <div className="inline-block transform overflow-hidden rounded-lg bg-white text-left align-bottom shadow-xl transition-all dark:bg-slate-800 sm:my-8 sm:w-full sm:max-w-lg sm:align-middle">
              <form onSubmit={handlePasswordSubmit}>
                {/* Modal Header */}
                <div className="border-b border-gray-200 bg-white px-4 pb-3 pt-4 dark:border-slate-700 dark:bg-slate-800 sm:px-6 sm:pb-4 sm:pt-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white sm:text-xl">
                      Change Password
                    </h3>
                    <button
                      type="button"
                      onClick={closePasswordModal}
                      className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300"
                    >
                      <svg
                        className="h-5 w-5 sm:h-6 sm:w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
                  </div>
                </div>

                {/* Modal Body */}
                <div className="bg-white px-4 py-3 dark:bg-slate-800 sm:px-6 sm:py-4">
                  {passwordError && (
                    <div className="mb-3 rounded-lg border border-red-200 bg-red-50 p-2 dark:border-red-800 dark:bg-red-900/20 sm:mb-4 sm:p-3">
                      <p className="text-xs text-red-600 dark:text-red-400 sm:text-sm">
                        {passwordError}
                      </p>
                    </div>
                  )}

                  <div className="space-y-3 sm:space-y-4">
                    <div>
                      <label className="mb-2 block text-xs font-medium text-gray-700 dark:text-gray-300 sm:text-sm">
                        Current Password
                      </label>
                      <input
                        type="password"
                        name="currentPassword"
                        value={passwordData.currentPassword}
                        onChange={handlePasswordChange}
                        className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 focus:border-transparent focus:ring-2 focus:ring-primary-500 dark:border-slate-700 dark:bg-slate-900 dark:text-white sm:px-4 sm:text-base"
                        placeholder="Enter current password"
                        required
                      />
                    </div>

                    <div>
                      <label className="mb-2 block text-xs font-medium text-gray-700 dark:text-gray-300 sm:text-sm">
                        New Password
                      </label>
                      <input
                        type="password"
                        name="newPassword"
                        value={passwordData.newPassword}
                        onChange={handlePasswordChange}
                        className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 focus:border-transparent focus:ring-2 focus:ring-primary-500 dark:border-slate-700 dark:bg-slate-900 dark:text-white sm:px-4 sm:text-base"
                        placeholder="Enter new password"
                        minLength={6}
                        required
                      />
                      <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                        Must be at least 6 characters
                      </p>
                    </div>

                    <div>
                      <label className="mb-2 block text-xs font-medium text-gray-700 dark:text-gray-300 sm:text-sm">
                        Confirm New Password
                      </label>
                      <input
                        type="password"
                        name="confirmPassword"
                        value={passwordData.confirmPassword}
                        onChange={handlePasswordChange}
                        className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 focus:border-transparent focus:ring-2 focus:ring-primary-500 dark:border-slate-700 dark:bg-slate-900 dark:text-white sm:px-4 sm:text-base"
                        placeholder="Confirm new password"
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* Modal Footer */}
                <div className="flex flex-col-reverse gap-2 bg-gray-50 px-4 py-3 dark:bg-slate-900 sm:flex-row sm:justify-end sm:gap-3 sm:px-6 sm:py-4">
                  <Button type="button" variant="secondary" onClick={closePasswordModal}>
                    Cancel
                  </Button>
                  <Button type="submit" variant="primary">
                    Update Password
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
};
