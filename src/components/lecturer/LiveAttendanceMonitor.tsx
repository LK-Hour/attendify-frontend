import React, { useEffect, useState } from 'react';

interface Student {
  id: string;
  name: string;
  status: 'present' | 'late' | 'absent' | 'pending';
  checkInTime?: string;
  faceVerified: boolean;
  locationValid: boolean;
}

interface Stats {
  present: number;
  late: number;
  absent: number;
  pending: number;
  total: number;
}

interface LiveAttendanceMonitorProps {
  classId: string;
  sessionId: string;
  onSessionEnd: () => void;
}

export const LiveAttendanceMonitor: React.FC<LiveAttendanceMonitorProps> = ({
  classId,
  sessionId,
  onSessionEnd,
}) => {
  const [students, setStudents] = useState<Student[]>([]);
  const [stats, setStats] = useState<Stats>({
    present: 0,
    late: 0,
    absent: 0,
    pending: 0,
    total: 0,
  });

  // Simulated WebSocket/BroadcastChannel for real-time updates
  useEffect(() => {
    const channel = new BroadcastChannel('attendance_updates');
    
    channel.onmessage = (event) => {
      const data = event.data;
      if (data.type === 'STUDENT_CHECKED_IN' && data.classId === classId) {
        handleStudentCheckIn(data.student);
      }
    };

    return () => channel.close();
  }, [classId]);

  const handleStudentCheckIn = (student: Student) => {
    setStudents(prev => {
      const index = prev.findIndex(s => s.id === student.id);
      if (index >= 0) {
        const newStudents = [...prev];
        newStudents[index] = student;
        return newStudents;
      }
      return [...prev, student];
    });

    updateStats();
  };

  const updateStats = () => {
    const newStats = students.reduce(
      (acc, student) => {
        acc[student.status]++;
        acc.total = students.length;
        return acc;
      },
      { present: 0, late: 0, absent: 0, pending: 0, total: 0 }
    );
    setStats(newStats);
  };

  return (
    <div className="space-y-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white">
            Live Attendance
          </h3>
          <button
            onClick={onSessionEnd}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            End Session
          </button>
        </div>

        <div className="grid grid-cols-4 gap-4 mb-6">
          <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
            <div className="text-2xl font-bold text-green-600 dark:text-green-400">
              {stats.present}
            </div>
            <div className="text-sm text-green-600 dark:text-green-400">Present</div>
          </div>
          <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
            <div className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">
              {stats.late}
            </div>
            <div className="text-sm text-yellow-600 dark:text-yellow-400">Late</div>
          </div>
          <div className="p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
            <div className="text-2xl font-bold text-red-600 dark:text-red-400">
              {stats.absent}
            </div>
            <div className="text-sm text-red-600 dark:text-red-400">Absent</div>
          </div>
          <div className="p-4 bg-gray-50 dark:bg-gray-900/20 rounded-lg">
            <div className="text-2xl font-bold text-gray-600 dark:text-gray-400">
              {stats.pending}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Pending</div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-800">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Student
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Check-in Time
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Verification
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-900 dark:divide-gray-700">
              {students.map((student) => (
                <tr key={student.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900 dark:text-white">
                      {student.name}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full
                        ${student.status === 'present' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' : ''}
                        ${student.status === 'late' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' : ''}
                        ${student.status === 'absent' ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200' : ''}
                        ${student.status === 'pending' ? 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200' : ''}
                      `}
                    >
                      {student.status.charAt(0).toUpperCase() + student.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                    {student.checkInTime || '-'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-3 text-sm">
                      <span
                        className={`flex items-center gap-1 ${
                          student.faceVerified
                            ? 'text-green-600 dark:text-green-400'
                            : 'text-gray-400 dark:text-gray-600'
                        }`}
                      >
                        <span role="img" aria-label="face">👤</span>
                        Face
                      </span>
                      <span
                        className={`flex items-center gap-1 ${
                          student.locationValid
                            ? 'text-green-600 dark:text-green-400'
                            : 'text-gray-400 dark:text-gray-600'
                        }`}
                      >
                        <span role="img" aria-label="location">📍</span>
                        Location
                      </span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};