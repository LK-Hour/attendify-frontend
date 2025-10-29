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
    { action: 'New student registered', details: 'John Doe - Computer Science', time: '5 mins ago' },
    { action: 'Attendance session completed', details: 'Web Development - CS301', time: '15 mins ago' },
    { action: 'New class created', details: 'Mobile Development - CS401', time: '1 hour ago' },
    { action: 'System backup completed', details: 'Automatic backup', time: '2 hours ago' },
    { action: 'Lecturer account approved', details: 'Jane Smith - Engineering', time: '3 hours ago' },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Analytics & Reports
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-2">
              System-wide analytics and institutional reporting
            </p>
          </div>
          
          {/* Time Range Selector */}
          <div className="flex gap-2">
            {(['week', 'month', 'semester'] as const).map((range) => (
              <button
                key={range}
                onClick={() => setTimeRange(range)}
                className={`px-4 py-2 rounded-lg font-medium capitalize transition-colors ${
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
          <Card padding="md">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                {analyticsData.totalStudents.toLocaleString()}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Total Students</div>
            </div>
          </Card>
          
          <Card padding="md">
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600 dark:text-purple-400 mb-2">
                {analyticsData.totalLecturers}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Total Lecturers</div>
            </div>
          </Card>
          
          <Card padding="md">
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600 dark:text-green-400 mb-2">
                {analyticsData.totalClasses}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Total Classes</div>
            </div>
          </Card>
          
          <Card padding="md">
            <div className="text-center">
              <div className="text-3xl font-bold text-yellow-600 dark:text-yellow-400 mb-2">
                {analyticsData.averageAttendance}%
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Avg Attendance</div>
            </div>
          </Card>
          
          <Card padding="md">
            <div className="text-center">
              <div className="text-3xl font-bold text-red-600 dark:text-red-400 mb-2">
                {analyticsData.activeSessions}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Active Sessions</div>
            </div>
          </Card>
          
          <Card padding="md">
            <div className="text-center">
              <div className="text-3xl font-bold text-indigo-600 dark:text-indigo-400 mb-2">
                +{analyticsData.monthlyGrowth}%
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Monthly Growth</div>
            </div>
          </Card>
        </div>

        {/* Department Analytics */}
        <Card>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
            Department Performance
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-700">
                  <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">Department</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">Students</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">Classes</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">Attendance Rate</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">Status</th>
                </tr>
              </thead>
              <tbody>
                {departmentStats.map((dept) => (
                  <tr key={dept.id} className="border-b border-gray-100 dark:border-gray-800">
                    <td className="py-3 px-4 font-medium text-gray-900 dark:text-white">{dept.name}</td>
                    <td className="py-3 px-4 text-gray-600 dark:text-gray-400">{dept.students}</td>
                    <td className="py-3 px-4 text-gray-600 dark:text-gray-400">{dept.classes}</td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <div className="w-16 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                          <div
                            className="bg-primary-600 h-2 rounded-full"
                            style={{ width: `${dept.attendance}%` }}
                          />
                        </div>
                        <span className="text-sm text-gray-600 dark:text-gray-400">
                          {dept.attendance}%
                        </span>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <Badge
                        variant={
                          dept.attendance >= 90 ? 'success' :
                          dept.attendance >= 80 ? 'warning' : 'error'
                        }
                        size="sm"
                      >
                        {dept.attendance >= 90 ? 'Excellent' :
                         dept.attendance >= 80 ? 'Good' : 'Needs Attention'}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        {/* Recent System Activity */}
        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
              Recent System Activity
            </h2>
            <div className="space-y-3">
              {recentActivity.map((activity, index) => (
                <div
                  key={index}
                  className="flex items-start justify-between p-3 rounded-lg bg-gray-50 dark:bg-slate-900"
                >
                  <div className="flex-1">
                    <p className="font-medium text-gray-900 dark:text-white text-sm">
                      {activity.action}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {activity.details}
                    </p>
                  </div>
                  <span className="text-xs text-gray-500 dark:text-gray-400 ml-4">
                    {activity.time}
                  </span>
                </div>
              ))}
            </div>
          </Card>

          <Card>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
              Quick Actions
            </h2>
            <div className="space-y-3">
              <button className="w-full p-3 text-left rounded-lg border-2 border-dashed border-gray-300 dark:border-slate-700 hover:border-primary-500 hover:bg-primary-50 dark:hover:bg-primary-950 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="text-2xl">📊</div>
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">Generate Report</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Export attendance data</p>
                  </div>
                </div>
              </button>
              
              <button className="w-full p-3 text-left rounded-lg border-2 border-dashed border-gray-300 dark:border-slate-700 hover:border-primary-500 hover:bg-primary-50 dark:hover:bg-primary-950 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="text-2xl">🔄</div>
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">System Backup</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Create manual backup</p>
                  </div>
                </div>
              </button>
              
              <button className="w-full p-3 text-left rounded-lg border-2 border-dashed border-gray-300 dark:border-slate-700 hover:border-primary-500 hover:bg-primary-50 dark:hover:bg-primary-950 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="text-2xl">📧</div>
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">Send Notifications</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Bulk messaging</p>
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