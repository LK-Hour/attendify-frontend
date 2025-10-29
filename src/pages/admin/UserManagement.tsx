import { useState } from 'react';
import { DashboardLayout } from '../../components/templates';
import { Card } from '../../components/molecules';
import { Badge } from '../../components/atoms';

interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: 'student' | 'lecturer' | 'admin';
  status: 'active' | 'inactive';
}

export const UserManagement = () => {
  const [users, setUsers] = useState<User[]>([
    {
      id: '1',
      firstName: 'John',
      lastName: 'Doe',
      email: 'john@example.com',
      role: 'student',
      status: 'active',
    },
    {
      id: '2',
      firstName: 'Jane',
      lastName: 'Smith',
      email: 'jane@example.com',
      role: 'lecturer',
      status: 'active',
    },
  ]);

  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    role: 'student' as 'student' | 'lecturer' | 'admin',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newUser: User = {
      id: String(Date.now()),
      ...formData,
      status: 'active',
    };
    setUsers([...users, newUser]);
    setFormData({ firstName: '', lastName: '', email: '', role: 'student' });
    setShowForm(false);
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this user?')) {
      setUsers(users.filter((u) => u.id !== id));
    }
  };

  const getRoleBadge = (role: string) => {
    switch (role) {
      case 'admin':
        return <Badge variant="error">Admin</Badge>;
      case 'lecturer':
        return <Badge variant="info">Lecturer</Badge>;
      default:
        return <Badge variant="success">Student</Badge>;
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              User Management
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-2">
              Manage students, lecturers, and administrators
            </p>
          </div>
          <button
            onClick={() => setShowForm(!showForm)}
            className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors font-medium"
          >
            + Add User
          </button>
        </div>

        {/* Form */}
        {showForm && (
          <Card>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">New User</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    First Name
                  </label>
                  <input
                    type="text"
                    value={formData.firstName}
                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-primary-500 dark:bg-slate-800 dark:text-white"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Last Name
                  </label>
                  <input
                    type="text"
                    value={formData.lastName}
                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-primary-500 dark:bg-slate-800 dark:text-white"
                    required
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-primary-500 dark:bg-slate-800 dark:text-white"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Role
                </label>
                <select
                  value={formData.role}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      role: e.target.value as 'student' | 'lecturer' | 'admin',
                    })
                  }
                  className="w-full px-3 py-2 border border-gray-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-primary-500 dark:bg-slate-800 dark:text-white"
                >
                  <option value="student">Student</option>
                  <option value="lecturer">Lecturer</option>
                  <option value="admin">Admin</option>
                </select>
              </div>
              <div className="flex gap-2">
                <button
                  type="submit"
                  className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors font-medium"
                >
                  Create
                </button>
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 dark:bg-slate-700 dark:text-gray-300 dark:hover:bg-slate-600 transition-colors font-medium"
                >
                  Cancel
                </button>
              </div>
            </form>
          </Card>
        )}

        {/* User List */}
        <Card>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200 dark:border-slate-700">
                  <th className="text-left py-3 px-4 font-semibold text-gray-900 dark:text-white">
                    Name
                  </th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-900 dark:text-white">
                    Email
                  </th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-900 dark:text-white">
                    Role
                  </th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-900 dark:text-white">
                    Status
                  </th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-900 dark:text-white">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr
                    key={user.id}
                    className="border-b border-gray-200 dark:border-slate-700 hover:bg-gray-50 dark:hover:bg-slate-900"
                  >
                    <td className="py-3 px-4 text-gray-900 dark:text-white">
                      {user.firstName} {user.lastName}
                    </td>
                    <td className="py-3 px-4 text-gray-600 dark:text-gray-400">{user.email}</td>
                    <td className="py-3 px-4">{getRoleBadge(user.role)}</td>
                    <td className="py-3 px-4">
                      <Badge variant={user.status === 'active' ? 'success' : 'default'}>
                        {user.status}
                      </Badge>
                    </td>
                    <td className="py-3 px-4">
                      <button
                        onClick={() => handleDelete(user.id)}
                        className="text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 font-medium text-sm"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </DashboardLayout>
  );
};
