import { useState } from 'react';
import { DashboardLayout } from '../../components/templates';
import { Card } from '../../components/molecules';
import { Badge } from '../../components/atoms';

interface AnalyticsData {
  totalStudents: number;
  totalLecturers: number;
  totalClasses: number;
  averageAttendance: number;
  activeSessions: number;
  monthlyGrowth: number;
}

interface DepartmentStats {
  id: string;
  name: string;
  students: number;
  attendance: number;
  classes: number;
}

export const Analytics = () => {
  const [timeRange, setTimeRange] = useState<'week' | 'month' | 'semester'>('month');

  const analyticsData: AnalyticsData = {
    totalStudents: 1234,
    totalLecturers: 45,
    totalClasses: 89,
    averageAttendance: 87.5,
    activeSessions: 12,
    monthlyGrowth: 8.2,
  };

  const departmentStats: DepartmentStats[] = [
    { id: '1', name: 'Computer Science', students: 456, attendance: 91.2, classes: 32 },
    { id: '2', name: 'Engineering', students: 389, attendance: 85.7, classes: 28 },
    { id: '3', name: 'Business', students: 234, attendance: 88.9, classes: 18 },
    { id: '4', name: 'Mathematics', students: 155, attendance: 92.1, classes: 11 },
  ];

  const recentActivity = [
    {
      action: 'New student registered',
      details: 'Somphors Kakada - Computer Science',
      time: '5 mins ago',
    },
    {
      action: 'Attendance session completed',
      details: 'Web Development - CS301',
      time: '15 mins ago',
    },
    { action: 'New class created', details: 'Mobile Development - CS401', time: '1 hour ago' },
    { action: 'System backup completed', details: 'Automatic backup', time: '2 hours ago' },
    {
      action: 'Lecturer account approved',
      details: 'Pov Sopheak - Engineering',
      time: '3 hours ago',
    },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white sm:text-3xl">
              Analytics & Reports
            </h1>
            <p className="mt-1 text-sm text-gray-600 dark:text-gray-400 sm:mt-2 sm:text-base">
              System-wide analytics and institutional reporting
            </p>
          </div>

          {/* Time Range Selector */}
          <div className="flex gap-2">
            {(['week', 'month', 'semester'] as const).map((range) => (
              <button
                key={range}
                onClick={() => setTimeRange(range)}
                className={`rounded-lg px-3 py-2 text-sm font-medium capitalize transition-colors sm:px-4 sm:text-base ${
                  timeRange === range
                    ? 'bg-primary-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-slate-800 dark:text-gray-300 dark:hover:bg-slate-700'
                }`}
              >
                {range}
              </button>
            ))}
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-6">
          <Card padding="md">
            <div className="text-center">
              <div className="mb-1 text-xl font-bold text-blue-600 dark:text-blue-400 sm:mb-2 sm:text-2xl lg:text-3xl">
                {analyticsData.totalStudents.toLocaleString()}
              </div>
              <div className="text-xs text-gray-600 dark:text-gray-400 sm:text-sm">
                Total Students
              </div>
            </div>
          </Card>

          <Card padding="md">
            <div className="text-center">
              <div className="mb-1 text-xl font-bold text-purple-600 dark:text-purple-400 sm:mb-2 sm:text-2xl lg:text-3xl">
                {analyticsData.totalLecturers}
              </div>
              <div className="text-xs text-gray-600 dark:text-gray-400 sm:text-sm">
                Total Lecturers
              </div>
            </div>
          </Card>

          <Card padding="md">
            <div className="text-center">
              <div className="mb-1 text-xl font-bold text-green-600 dark:text-green-400 sm:mb-2 sm:text-2xl lg:text-3xl">
                {analyticsData.totalClasses}
              </div>
              <div className="text-xs text-gray-600 dark:text-gray-400 sm:text-sm">
                Total Classes
              </div>
            </div>
          </Card>

          <Card padding="md">
            <div className="text-center">
              <div className="mb-1 text-xl font-bold text-yellow-600 dark:text-yellow-400 sm:mb-2 sm:text-2xl lg:text-3xl">
                {analyticsData.averageAttendance}%
              </div>
              <div className="text-xs text-gray-600 dark:text-gray-400 sm:text-sm">
                Avg Attendance
              </div>
            </div>
          </Card>

          <Card padding="md">
            <div className="text-center">
              <div className="mb-1 text-xl font-bold text-red-600 dark:text-red-400 sm:mb-2 sm:text-2xl lg:text-3xl">
                {analyticsData.activeSessions}
              </div>
              <div className="text-xs text-gray-600 dark:text-gray-400 sm:text-sm">
                Active Sessions
              </div>
            </div>
          </Card>

          <Card padding="md">
            <div className="text-center">
              <div className="mb-1 text-xl font-bold text-indigo-600 dark:text-indigo-400 sm:mb-2 sm:text-2xl lg:text-3xl">
                +{analyticsData.monthlyGrowth}%
              </div>
              <div className="text-xs text-gray-600 dark:text-gray-400 sm:text-sm">
                Monthly Growth
              </div>
            </div>
          </Card>
        </div>

        {/* Department Analytics */}
        <Card>
          <h2 className="mb-4 text-lg font-bold text-gray-900 dark:text-white sm:text-xl">
            Department Performance
          </h2>
          <div className="-mx-4 overflow-x-auto sm:mx-0">
            <div className="inline-block min-w-full align-middle">
              <div className="overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                  <thead>
                    <tr className="bg-gray-50 dark:bg-slate-900">
                      <th className="px-3 py-3 text-left text-xs font-medium text-gray-900 dark:text-white sm:px-4 sm:text-sm">
                        Department
                      </th>
                      <th className="px-3 py-3 text-left text-xs font-medium text-gray-900 dark:text-white sm:px-4 sm:text-sm">
                        Students
                      </th>
                      <th className="hidden px-3 py-3 text-left text-xs font-medium text-gray-900 dark:text-white sm:table-cell sm:px-4 sm:text-sm">
                        Classes
                      </th>
                      <th className="px-3 py-3 text-left text-xs font-medium text-gray-900 dark:text-white sm:px-4 sm:text-sm">
                        Attendance
                      </th>
                      <th className="hidden px-3 py-3 text-left text-xs font-medium text-gray-900 dark:text-white sm:px-4 sm:text-sm md:table-cell">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                    {departmentStats.map((dept) => (
                      <tr key={dept.id}>
                        <td className="whitespace-nowrap px-3 py-3 text-xs font-medium text-gray-900 dark:text-white sm:px-4 sm:text-sm">
                          {dept.name}
                        </td>
                        <td className="px-3 py-3 text-xs text-gray-600 dark:text-gray-400 sm:px-4 sm:text-sm">
                          {dept.students}
                        </td>
                        <td className="hidden px-3 py-3 text-xs text-gray-600 dark:text-gray-400 sm:table-cell sm:px-4 sm:text-sm">
                          {dept.classes}
                        </td>
                        <td className="px-3 py-3 sm:px-4">
                          <div className="flex items-center gap-2">
                            <div className="h-2 w-12 rounded-full bg-gray-200 dark:bg-gray-700 sm:w-16">
                              <div
                                className="h-2 rounded-full bg-primary-600"
                                style={{ width: `${dept.attendance}%` }}
                              />
                            </div>
                            <span className="whitespace-nowrap text-xs text-gray-600 dark:text-gray-400 sm:text-sm">
                              {dept.attendance}%
                            </span>
                          </div>
                        </td>
                        <td className="hidden px-3 py-3 sm:px-4 md:table-cell">
                          <Badge
                            variant={
                              dept.attendance >= 90
                                ? 'success'
                                : dept.attendance >= 80
                                  ? 'warning'
                                  : 'error'
                            }
                            size="sm"
                          >
                            {dept.attendance >= 90
                              ? 'Excellent'
                              : dept.attendance >= 80
                                ? 'Good'
                                : 'Needs Attention'}
                          </Badge>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </Card>

        {/* Recent System Activity */}
        <div className="grid grid-cols-1 gap-4 sm:gap-6 lg:grid-cols-2">
          <Card>
            <h2 className="mb-4 text-lg font-bold text-gray-900 dark:text-white sm:text-xl">
              Recent System Activity
            </h2>
            <div className="space-y-3">
              {recentActivity.map((activity, index) => (
                <div
                  key={index}
                  className="flex flex-col gap-2 rounded-lg bg-gray-50 p-3 dark:bg-slate-900 sm:flex-row sm:items-start sm:justify-between"
                >
                  <div className="min-w-0 flex-1">
                    <p className="break-words text-sm font-medium text-gray-900 dark:text-white">
                      {activity.action}
                    </p>
                    <p className="break-words text-sm text-gray-600 dark:text-gray-400">
                      {activity.details}
                    </p>
                  </div>
                  <span className="whitespace-nowrap text-xs text-gray-500 dark:text-gray-400 sm:ml-4">
                    {activity.time}
                  </span>
                </div>
              ))}
            </div>
          </Card>

          <Card>
            <h2 className="mb-4 text-lg font-bold text-gray-900 dark:text-white sm:text-xl">
              Quick Actions
            </h2>
            <div className="space-y-3">
              <button className="w-full rounded-lg border-2 border-dashed border-gray-300 p-3 text-left transition-colors hover:border-primary-500 hover:bg-primary-50 dark:border-slate-700 dark:hover:bg-primary-950">
                <div className="flex items-center gap-3">
                  <div className="flex-shrink-0 text-xl sm:text-2xl">📊</div>
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-gray-900 dark:text-white sm:text-base">
                      Generate Report
                    </p>
                    <p className="text-xs text-gray-600 dark:text-gray-400 sm:text-sm">
                      Export attendance data
                    </p>
                  </div>
                </div>
              </button>

              <button className="w-full rounded-lg border-2 border-dashed border-gray-300 p-3 text-left transition-colors hover:border-primary-500 hover:bg-primary-50 dark:border-slate-700 dark:hover:bg-primary-950">
                <div className="flex items-center gap-3">
                  <div className="flex-shrink-0 text-xl sm:text-2xl">🔄</div>
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-gray-900 dark:text-white sm:text-base">
                      System Backup
                    </p>
                    <p className="text-xs text-gray-600 dark:text-gray-400 sm:text-sm">
                      Create manual backup
                    </p>
                  </div>
                </div>
              </button>

              <button className="w-full rounded-lg border-2 border-dashed border-gray-300 p-3 text-left transition-colors hover:border-primary-500 hover:bg-primary-50 dark:border-slate-700 dark:hover:bg-primary-950">
                <div className="flex items-center gap-3">
                  <div className="flex-shrink-0 text-xl sm:text-2xl">📧</div>
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-gray-900 dark:text-white sm:text-base">
                      Send Notifications
                    </p>
                    <p className="text-xs text-gray-600 dark:text-gray-400 sm:text-sm">
                      Bulk messaging
                    </p>
                  </div>
                </div>
              </button>
            </div>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};
