import { useAuthStore } from '../../store';
import { DashboardLayout } from '../../components/templates';
import { Card } from '../../components/molecules';

export const AdminDashboard = () => {
  const { user } = useAuthStore();

  if (!user || user.role !== 'admin') return null;

  const stats = [
    { label: 'Total Campuses', value: '1', icon: '🏛️', color: 'bg-blue-500' },
    { label: 'Total Students', value: '1,234', icon: '👨‍🎓', color: 'bg-green-500' },
    { label: 'Total Lecturers', value: '45', icon: '👨‍🏫', color: 'bg-purple-500' },
    { label: 'Active Sessions', value: '12', icon: '📊', color: 'bg-yellow-500' },
  ];

  const recentActivities = [
    { action: 'New student registered', user: 'John Doe', time: '5 mins ago' },
    { action: 'Attendance session completed', user: 'Prof. Smith', time: '10 mins ago' },
    { action: 'New class created', user: 'Admin User', time: '1 hour ago' },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Admin Dashboard
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            System overview and management
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat) => (
            <Card key={stat.label} padding="md" hover>
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-lg ${stat.color} flex items-center justify-center text-2xl`}>
                  {stat.icon}
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">{stat.value}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{stat.label}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Recent Activity */}
        <Card>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
            Recent Activity
          </h2>
          <div className="space-y-3">
            {recentActivities.map((activity, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 rounded-lg bg-gray-50 dark:bg-slate-900"
              >
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">{activity.action}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{activity.user}</p>
                </div>
                <span className="text-sm text-gray-500 dark:text-gray-400">{activity.time}</span>
              </div>
            ))}
          </div>
        </Card>

        {/* Quick Actions */}
        <Card>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {[
              { label: 'Add Student', icon: '👤', path: '/admin/users' },
              { label: 'Add Lecturer', icon: '👨‍🏫', path: '/admin/users' },
              { label: 'Create Class', icon: '📚', path: '/admin/classes' },
              { label: 'View Reports', icon: '📊', path: '/admin/reports' },
            ].map((action) => (
              <button
                key={action.label}
                className="p-4 rounded-lg border-2 border-dashed border-gray-300 dark:border-slate-700 hover:border-primary-500 hover:bg-primary-50 dark:hover:bg-primary-950 transition-colors"
              >
                <div className="text-center">
                  <div className="text-3xl mb-2">{action.icon}</div>
                  <p className="font-medium text-gray-900 dark:text-white">{action.label}</p>
                </div>
              </button>
            ))}
          </div>
        </Card>
      </div>
    </DashboardLayout>
  );
};
