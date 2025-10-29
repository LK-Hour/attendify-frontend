import { useState } from 'react';
import { DashboardLayout } from '../../components/templates';
import { Card } from '../../components/molecules';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import * as XLSX from 'xlsx';

export const Reports = () => {
  const [dateRange, setDateRange] = useState({ start: '', end: '' });
  const [selectedClass, setSelectedClass] = useState('all');

  // Mock data for charts
  const weeklyData = [
    { day: 'Mon', attendance: 85, absent: 15 },
    { day: 'Tue', attendance: 92, absent: 8 },
    { day: 'Wed', attendance: 78, absent: 22 },
    { day: 'Thu', attendance: 88, absent: 12 },
    { day: 'Fri', attendance: 95, absent: 5 },
  ];

  const classData = [
    { name: 'Web Dev', value: 92 },
    { name: 'Database', value: 88 },
    { name: 'Mobile', value: 85 },
    { name: 'AI', value: 90 },
  ];

  const monthlyTrend = [
    { month: 'Jan', rate: 85 },
    { month: 'Feb', rate: 87 },
    { month: 'Mar', rate: 89 },
    { month: 'Apr', rate: 91 },
    { month: 'May', rate: 88 },
    { month: 'Jun', rate: 93 },
  ];

  const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444'];

  const handleExport = () => {
    // Sample data for export
    const exportData = [
      { Date: '2025-10-15', Class: 'Web Development', Present: 28, Absent: 4, Rate: '87.5%' },
      { Date: '2025-10-16', Class: 'Web Development', Present: 30, Absent: 2, Rate: '93.8%' },
      { Date: '2025-10-15', Class: 'Database Systems', Present: 25, Absent: 7, Rate: '78.1%' },
    ];

    const ws = XLSX.utils.json_to_sheet(exportData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Attendance Report');
    XLSX.writeFile(wb, `attendance_report_${new Date().toISOString().split('T')[0]}.xlsx`);
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Attendance Reports
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-2">
              Analytics and insights for attendance tracking
            </p>
          </div>
          <button
            onClick={handleExport}
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium flex items-center gap-2"
          >
            📊 Export Excel
          </button>
        </div>

        {/* Filters */}
        <Card>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Start Date
              </label>
              <input
                type="date"
                value={dateRange.start}
                onChange={(e) => setDateRange({ ...dateRange, start: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-primary-500 dark:bg-slate-800 dark:text-white"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                End Date
              </label>
              <input
                type="date"
                value={dateRange.end}
                onChange={(e) => setDateRange({ ...dateRange, end: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-primary-500 dark:bg-slate-800 dark:text-white"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Class
              </label>
              <select
                value={selectedClass}
                onChange={(e) => setSelectedClass(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-primary-500 dark:bg-slate-800 dark:text-white"
              >
                <option value="all">All Classes</option>
                <option value="web">Web Development</option>
                <option value="db">Database Systems</option>
                <option value="mobile">Mobile Development</option>
              </select>
            </div>
          </div>
        </Card>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Weekly Attendance */}
          <Card>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
              Weekly Attendance
            </h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={weeklyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="attendance" fill="#3b82f6" name="Present" />
                <Bar dataKey="absent" fill="#ef4444" name="Absent" />
              </BarChart>
            </ResponsiveContainer>
          </Card>

          {/* Class Distribution */}
          <Card>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
              Attendance by Class
            </h2>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={classData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) => `${name}: ${value}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {classData.map((_entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </Card>

          {/* Monthly Trend */}
          <Card className="lg:col-span-2">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
              Monthly Attendance Trend
            </h2>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={monthlyTrend}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="rate"
                  stroke="#3b82f6"
                  strokeWidth={2}
                  name="Attendance Rate (%)"
                />
              </LineChart>
            </ResponsiveContainer>
          </Card>
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card padding="md">
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600 dark:text-green-400 mb-2">
                89%
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Average Rate</div>
            </div>
          </Card>
          <Card padding="md">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                1,234
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Total Present</div>
            </div>
          </Card>
          <Card padding="md">
            <div className="text-center">
              <div className="text-3xl font-bold text-red-600 dark:text-red-400 mb-2">
                156
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Total Absent</div>
            </div>
          </Card>
          <Card padding="md">
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600 dark:text-purple-400 mb-2">
                45
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Total Sessions</div>
            </div>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};
