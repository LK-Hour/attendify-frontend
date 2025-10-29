import { useState } from 'react';
import { useAuthStore } from '../../store';
import { DashboardLayout } from '../../components/templates';
import { Card } from '../../components/molecules';
import { Badge } from '../../components/atoms';
import { QRGenerator } from '../../components/lecturer/QRGenerator';

export const LecturerDashboard = () => {
  const { user } = useAuthStore();
  const [activeSession, setActiveSession] = useState<string | null>(null);

  if (!user || user.role !== 'lecturer') return null;

  const todayClasses = [
    {
      id: '1',
      name: 'Web Development',
      code: 'CS301',
      time: '2:00 PM - 4:00 PM',
      room: 'A101',
      students: 35,
      present: 0,
      status: 'upcoming' as const,
    },
    {
      id: '2',
      name: 'Database Systems',
      code: 'CS302',
      time: '10:00 AM - 12:00 PM',
      room: 'B205',
      students: 32,
      present: 28,
      status: 'completed' as const,
    },
  ];

  const handleStartSession = (classId: string) => {
    setActiveSession(classId);
  };

  const handleStopSession = () => {
    setActiveSession(null);
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Welcome, {user.title} {user.firstName}! 👋
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Manage your classes and track attendance
          </p>
        </div>

        {/* Active Session */}
        {activeSession && (
          <Card>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                  Active Session - QR Code
                </h2>
                <button
                  onClick={handleStopSession}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium"
                >
                  Stop Session
                </button>
              </div>
              <QRGenerator sessionId={activeSession} classId={activeSession} />
            </div>
          </Card>
        )}

        {/* Today's Schedule */}
        <Card>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
            Today's Schedule
          </h2>
          <div className="space-y-4">
            {todayClasses.map((cls) => (
              <div
                key={cls.id}
                className="flex items-center justify-between p-4 rounded-lg bg-gray-50 dark:bg-slate-900 border border-gray-200 dark:border-slate-700"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="font-semibold text-gray-900 dark:text-white">{cls.name}</h3>
                    <span className="text-sm text-gray-500 dark:text-gray-400">({cls.code})</span>
                    <Badge
                      variant={
                        cls.status === 'completed'
                          ? 'success'
                          : 'default'
                      }
                    >
                      {cls.status}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                    <span>🕐 {cls.time}</span>
                    <span>📍 Room {cls.room}</span>
                    <span>
                      👥 {cls.present}/{cls.students} present
                    </span>
                  </div>
                </div>
                {cls.status === 'upcoming' && !activeSession && (
                  <button
                    onClick={() => handleStartSession(cls.id)}
                    className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors font-medium"
                  >
                    Start Session
                  </button>
                )}
                {cls.status === 'completed' && (
                  <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 dark:bg-slate-700 dark:text-gray-300 dark:hover:bg-slate-600 transition-colors font-medium">
                    View Report
                  </button>
                )}
              </div>
            ))}
          </div>
        </Card>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card padding="md">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary-600 dark:text-primary-400 mb-2">
                5
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Total Classes</div>
            </div>
          </Card>
          <Card padding="md">
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600 dark:text-green-400 mb-2">
                156
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Total Students</div>
            </div>
          </Card>
          <Card padding="md">
            <div className="text-center">
              <div className="text-3xl font-bold text-yellow-600 dark:text-yellow-400 mb-2">
                89%
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Avg. Attendance</div>
            </div>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};
