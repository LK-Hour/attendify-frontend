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
    if (!passwordData.currentPassword || !passwordData.newPassword || !passwordData.confirmPassword) {
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
      <div className="space-y-6 max-w-4xl">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Settings</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Manage your account settings and preferences
          </p>
        </div>

        {/* Profile Information */}
        <Card>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">Profile Information</h2>
            {!isEditing && (
              <Button variant="secondary" size="sm" onClick={() => setIsEditing(true)}>
                Edit Profile
              </Button>
            )}
          </div>

          {isEditing ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    First Name
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Last Name
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Optional"
                  className="w-full px-4 py-2 border border-gray-300 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>

              <div className="flex gap-3">
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
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-500 dark:text-gray-400">
                    First Name
                  </label>
                  <p className="mt-1 text-gray-900 dark:text-white">{user.firstName}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-500 dark:text-gray-400">
                    Last Name
                  </label>
                  <p className="mt-1 text-gray-900 dark:text-white">{user.lastName}</p>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-500 dark:text-gray-400">
                  Email
                </label>
                <p className="mt-1 text-gray-900 dark:text-white">{user.email}</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-500 dark:text-gray-400">
                  Phone Number
                </label>
                <p className="mt-1 text-gray-900 dark:text-white">
                  {user.phone || 'Not provided'}
                </p>
              </div>

              {user.role === 'student' && 'studentId' in user && (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-gray-200 dark:border-slate-700">
                    <div>
                      <label className="block text-sm font-medium text-gray-500 dark:text-gray-400">
                        Student ID
                      </label>
                      <p className="mt-1 text-gray-900 dark:text-white">{user.studentId}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-500 dark:text-gray-400">
                        Major
                      </label>
                      <p className="mt-1 text-gray-900 dark:text-white">{user.major}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-500 dark:text-gray-400">
                        Year
                      </label>
                      <p className="mt-1 text-gray-900 dark:text-white">Year {user.year}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-500 dark:text-gray-400">
                        Semester
                      </label>
                      <p className="mt-1 text-gray-900 dark:text-white">Semester {user.semester}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-500 dark:text-gray-400">
                        Group
                      </label>
                      <p className="mt-1 text-gray-900 dark:text-white">Group {user.group}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-500 dark:text-gray-400">
                        Department
                      </label>
                      <p className="mt-1 text-gray-900 dark:text-white">{user.department}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-500 dark:text-gray-400">
                        Faculty
                      </label>
                      <p className="mt-1 text-gray-900 dark:text-white">{user.faculty}</p>
                    </div>
                  </div>
                </>
              )}
            </div>
          )}
        </Card>

        {/* Password Change */}
        <Card>
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                Security
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                Manage your password and security settings
              </p>
            </div>
          </div>
          <div className="flex items-center justify-between py-4 px-4 bg-gray-50 dark:bg-slate-800 rounded-lg">
            <div>
              <p className="font-medium text-gray-900 dark:text-white">Password</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Last changed 30 days ago
              </p>
            </div>
            <Button variant="primary" onClick={() => setShowPasswordModal(true)}>
              Change Password
            </Button>
          </div>
        </Card>

        {/* Notifications */}
        <Card>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Notifications</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-900 dark:text-white">
                  Email Notifications
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Receive email updates about your attendance
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" defaultChecked className="sr-only peer" />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 dark:peer-focus:ring-primary-800 rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-slate-600 peer-checked:bg-primary-600"></div>
              </label>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-900 dark:text-white">Push Notifications</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Receive push notifications for class reminders
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" defaultChecked className="sr-only peer" />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 dark:peer-focus:ring-primary-800 rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-slate-600 peer-checked:bg-primary-600"></div>
              </label>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-900 dark:text-white">
                  Absence Alerts
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Get notified when you miss a class
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" defaultChecked className="sr-only peer" />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 dark:peer-focus:ring-primary-800 rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-slate-600 peer-checked:bg-primary-600"></div>
              </label>
            </div>
          </div>
        </Card>

        {/* Privacy */}
        <Card>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Privacy</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-900 dark:text-white">
                  Face Recognition
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Allow face recognition for check-in verification
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" defaultChecked className="sr-only peer" />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 dark:peer-focus:ring-primary-800 rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-slate-600 peer-checked:bg-primary-600"></div>
              </label>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-900 dark:text-white">
                  Location Services
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Allow location tracking for attendance verification
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" defaultChecked className="sr-only peer" />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 dark:peer-focus:ring-primary-800 rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-slate-600 peer-checked:bg-primary-600"></div>
              </label>
            </div>
          </div>
        </Card>
      </div>

      {/* Password Change Modal */}
      {showPasswordModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
            {/* Background overlay */}
            <div
              className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75 dark:bg-gray-900 dark:bg-opacity-75"
              onClick={closePasswordModal}
            ></div>

            {/* Modal panel */}
            <div className="inline-block align-bottom bg-white dark:bg-slate-800 rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <form onSubmit={handlePasswordSubmit}>
                {/* Modal Header */}
                <div className="bg-white dark:bg-slate-800 px-6 pt-6 pb-4 border-b border-gray-200 dark:border-slate-700">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                      Change Password
                    </h3>
                    <button
                      type="button"
                      onClick={closePasswordModal}
                      className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300"
                    >
                      <svg
                        className="h-6 w-6"
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
                <div className="bg-white dark:bg-slate-800 px-6 py-4">
                  {passwordError && (
                    <div className="mb-4 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                      <p className="text-sm text-red-600 dark:text-red-400">{passwordError}</p>
                    </div>
                  )}

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Current Password
                      </label>
                      <input
                        type="password"
                        name="currentPassword"
                        value={passwordData.currentPassword}
                        onChange={handlePasswordChange}
                        className="w-full px-4 py-2 border border-gray-300 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        placeholder="Enter current password"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        New Password
                      </label>
                      <input
                        type="password"
                        name="newPassword"
                        value={passwordData.newPassword}
                        onChange={handlePasswordChange}
                        className="w-full px-4 py-2 border border-gray-300 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        placeholder="Enter new password"
                        minLength={6}
                        required
                      />
                      <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                        Must be at least 6 characters
                      </p>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Confirm New Password
                      </label>
                      <input
                        type="password"
                        name="confirmPassword"
                        value={passwordData.confirmPassword}
                        onChange={handlePasswordChange}
                        className="w-full px-4 py-2 border border-gray-300 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        placeholder="Confirm new password"
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* Modal Footer */}
                <div className="bg-gray-50 dark:bg-slate-900 px-6 py-4 flex flex-col-reverse sm:flex-row sm:justify-end gap-3">
                  <Button
                    type="button"
                    variant="secondary"
                    onClick={closePasswordModal}
                  >
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
