import { useState } from 'react';
import { DashboardLayout } from '../../components/templates';
import { Card } from '../../components/molecules';
import { Badge } from '../../components/atoms';
import { useAuthStore } from '../../store';

interface AttendanceRecord {
  id: string;
  className: string;
  classCode: string;
  date: string;
  time: string;
  status: 'present' | 'absent' | 'late';
  lecturer: string;
  room: string;
}

export const Attendance = () => {
  const { user } = useAuthStore();
  const [filterStatus, setFilterStatus] = useState<'all' | 'present' | 'absent' | 'late'>('all');

  if (!user || user.role !== 'student') return null;

  // Mock attendance data
  const attendanceRecords: AttendanceRecord[] = [
    {
      id: '1',
      className: 'Web Development',
      classCode: 'CS301',
      date: '2025-10-19',
      time: '14:00',
      status: 'present',
      lecturer: 'Dr. Jane Smith',
      room: 'A101',
    },
    {
      id: '2',
      className: 'Database Systems',
      classCode: 'CS302',
      date: '2025-10-19',
      time: '10:00',
      status: 'present',
      lecturer: 'Prof. John Doe',
      room: 'B205',
    },
    {
      id: '3',
      className: 'Mobile Development',
      classCode: 'CS303',
      date: '2025-10-18',
      time: '15:00',
      status: 'absent',
      lecturer: 'Dr. Sarah Lee',
      room: 'C301',
    },
    {
      id: '4',
      className: 'Web Development',
      classCode: 'CS301',
      date: '2025-10-17',
      time: '14:00',
      status: 'late',
      lecturer: 'Dr. Jane Smith',
      room: 'A101',
    },
    {
      id: '5',
      className: 'Database Systems',
      classCode: 'CS302',
      date: '2025-10-17',
      time: '10:00',
      status: 'present',
      lecturer: 'Prof. John Doe',
      room: 'B205',
    },
  ];

  const filteredRecords =
    filterStatus === 'all'
      ? attendanceRecords
      : attendanceRecords.filter((record) => record.status === filterStatus);

  const stats = {
    total: attendanceRecords.length,
    present: attendanceRecords.filter((r) => r.status === 'present').length,
    absent: attendanceRecords.filter((r) => r.status === 'absent').length,
    late: attendanceRecords.filter((r) => r.status === 'late').length,
  };

  const attendanceRate = ((stats.present / stats.total) * 100).toFixed(1);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Attendance History</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            View your complete attendance record
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card padding="md" hover>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">
                {stats.total}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">Total Sessions</div>
            </div>
          </Card>
          <Card padding="md" hover>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600 dark:text-green-400">
                {stats.present}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">Present</div>
            </div>
          </Card>
          <Card padding="md" hover>
            <div className="text-center">
              <div className="text-3xl font-bold text-red-600 dark:text-red-400">
                {stats.absent}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">Absent</div>
            </div>
          </Card>
          <Card padding="md" hover>
            <div className="text-center">
              <div className="text-3xl font-bold text-yellow-600 dark:text-yellow-400">
                {attendanceRate}%
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">Attendance Rate</div>
            </div>
          </Card>
        </div>

        {/* Filter Tabs */}
        <Card>
          <div className="flex flex-wrap gap-2 mb-4">
            <button
              onClick={() => setFilterStatus('all')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                filterStatus === 'all'
                  ? 'bg-primary-600 text-white'
                  : 'bg-gray-100 dark:bg-slate-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-slate-700'
              }`}
            >
              All ({stats.total})
            </button>
            <button
              onClick={() => setFilterStatus('present')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                filterStatus === 'present'
                  ? 'bg-green-600 text-white'
                  : 'bg-gray-100 dark:bg-slate-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-slate-700'
              }`}
            >
              Present ({stats.present})
            </button>
            <button
              onClick={() => setFilterStatus('absent')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                filterStatus === 'absent'
                  ? 'bg-red-600 text-white'
                  : 'bg-gray-100 dark:bg-slate-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-slate-700'
              }`}
            >
              Absent ({stats.absent})
            </button>
            <button
              onClick={() => setFilterStatus('late')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                filterStatus === 'late'
                  ? 'bg-yellow-600 text-white'
                  : 'bg-gray-100 dark:bg-slate-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-slate-700'
              }`}
            >
              Late ({stats.late})
            </button>
          </div>

          {/* Attendance Records Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200 dark:border-slate-700">
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-900 dark:text-white">
                    Date
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-900 dark:text-white">
                    Class
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-900 dark:text-white">
                    Lecturer
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-900 dark:text-white">
                    Room
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-900 dark:text-white">
                    Time
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-900 dark:text-white">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredRecords.map((record) => (
                  <tr
                    key={record.id}
                    className="border-b border-gray-100 dark:border-slate-800 hover:bg-gray-50 dark:hover:bg-slate-800"
                  >
                    <td className="py-3 px-4 text-sm text-gray-900 dark:text-gray-300">
                      {new Date(record.date).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                      })}
                    </td>
                    <td className="py-3 px-4">
                      <div className="text-sm font-medium text-gray-900 dark:text-white">
                        {record.className}
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">
                        {record.classCode}
                      </div>
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-900 dark:text-gray-300">
                      {record.lecturer}
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-900 dark:text-gray-300">
                      {record.room}
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-900 dark:text-gray-300">
                      {record.time}
                    </td>
                    <td className="py-3 px-4">
                      <Badge
                        variant={
                          record.status === 'present'
                            ? 'success'
                            : record.status === 'absent'
                            ? 'error'
                            : 'warning'
                        }
                        size="md"
                      >
                        {record.status.charAt(0).toUpperCase() + record.status.slice(1)}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredRecords.length === 0 && (
            <div className="text-center py-8">
              <p className="text-gray-500 dark:text-gray-400">
                No {filterStatus !== 'all' ? filterStatus : ''} records found
              </p>
            </div>
          )}
        </Card>
      </div>
    </DashboardLayout>
  );
};
