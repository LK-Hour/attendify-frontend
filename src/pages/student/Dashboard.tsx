import { useAuthStore } from '../../store';
import { DashboardLayout } from '../../components/templates';
import { Card } from '../../components/molecules';
import { Badge } from '../../components/atoms';

export const StudentDashboard = () => {
  const { user } = useAuthStore();

  if (!user || user.role !== 'student') return null;

  const stats = [
    { label: 'Total Classes', value: user.enrolledClasses.length, color: 'bg-blue-500' },
    { label: 'Attendance Rate', value: '92%', color: 'bg-green-500' },
    { label: 'This Week', value: '12/15', color: 'bg-yellow-500' },
    { label: 'Absences', value: '3', color: 'bg-red-500' },
  ];

  const recentClasses = [
    {
      id: '1',
      name: 'Web Development',
      code: 'CS301',
      time: 'Today, 2:00 PM',
      room: 'A101',
      status: 'present' as const,
    },
    {
      id: '2',
      name: 'Database Systems',
      code: 'CS302',
      time: 'Today, 10:00 AM',
      room: 'B205',
      status: 'present' as const,
    },
    {
      id: '3',
      name: 'Mobile Development',
      code: 'CS303',
      time: 'Yesterday, 3:00 PM',
      room: 'C301',
      status: 'absent' as const,
    },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Welcome Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Welcome back, {user.firstName}! 👋
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Here's your attendance overview for today
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat) => (
            <Card key={stat.label} padding="md" hover>
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-lg ${stat.color} flex items-center justify-center`}>
                  <span className="text-2xm font-bold text-white">{stat.value}</span>
                </div>
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{stat.label}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Recent Activity */}
        <Card>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Recent Classes</h2>
          <div className="space-y-3">
            {recentClasses.map((cls) => (
              <div
                key={cls.id}
                className="flex items-center justify-between p-4 rounded-lg bg-gray-50 dark:bg-slate-900 border border-gray-200 dark:border-slate-700"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-3">
                    <h3 className="font-semibold text-gray-900 dark:text-white">{cls.name}</h3>
                    <span className="text-sm text-gray-500 dark:text-gray-400">({cls.code})</span>
                  </div>
                  <div className="flex items-center gap-4 mt-1 text-sm text-gray-600 dark:text-gray-400">
                    <span>{cls.time}</span>
                    <span>•</span>
                    <span>Room {cls.room}</span>
                  </div>
                </div>
                <Badge variant={cls.status === 'present' ? 'success' : 'error'} size="md">
                  {cls.status === 'present' ? 'Present' : 'Absent'}
                </Badge>
              </div>
            ))}
          </div>
        </Card>

        {/* Quick Actions */}
        <Card>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button className="p-4 rounded-lg border-2 border-dashed border-gray-300 dark:border-slate-700 hover:border-primary-500 hover:bg-primary-50 dark:hover:bg-primary-950 transition-colors">
              <div className="text-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 mx-auto mb-2 text-primary-600 dark:text-primary-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z"
                  />
                </svg>
                <p className="font-medium text-gray-900 dark:text-white">Scan QR Code</p>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  Mark attendance
                </p>
              </div>
            </button>
            <button className="p-4 rounded-lg border-2 border-dashed border-gray-300 dark:border-slate-700 hover:border-primary-500 hover:bg-primary-50 dark:hover:bg-primary-950 transition-colors">
              <div className="text-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 mx-auto mb-2 text-primary-600 dark:text-primary-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                  />
                </svg>
                <p className="font-medium text-gray-900 dark:text-white">View Report</p>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  Attendance history
                </p>
              </div>
            </button>
            <button className="p-4 rounded-lg border-2 border-dashed border-gray-300 dark:border-slate-700 hover:border-primary-500 hover:bg-primary-50 dark:hover:bg-primary-950 transition-colors">
              <div className="text-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 mx-auto mb-2 text-primary-600 dark:text-primary-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                  />
                </svg>
                <p className="font-medium text-gray-900 dark:text-white">My Classes</p>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  View all classes
                </p>
              </div>
            </button>
          </div>
        </Card>
      </div>
    </DashboardLayout>
  );
};
