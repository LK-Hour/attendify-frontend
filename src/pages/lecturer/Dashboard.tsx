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
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white sm:text-3xl">
            Welcome, {user.title} {user.firstName}! 👋
          </h1>
          <p className="mt-1 text-sm text-gray-600 dark:text-gray-400 sm:mt-2 sm:text-base">
            Manage your classes and track attendance
          </p>
        </div>

        {/* Active Session */}
        {activeSession && (
          <Card>
            <div className="space-y-4">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <h2 className="text-lg font-bold text-gray-900 dark:text-white sm:text-xl">
                  Active Session - QR Code
                </h2>
                <button
                  onClick={handleStopSession}
                  className="rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-red-700 sm:text-base"
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
          <h2 className="mb-4 text-lg font-bold text-gray-900 dark:text-white sm:text-xl">
            Today's Schedule
          </h2>
          <div className="space-y-4">
            {todayClasses.map((cls) => (
              <div
                key={cls.id}
                className="flex flex-col gap-3 rounded-lg border border-gray-200 bg-gray-50 p-4 dark:border-slate-700 dark:bg-slate-900 sm:flex-row sm:items-center sm:justify-between"
              >
                <div className="min-w-0 flex-1">
                  <div className="mb-2 flex flex-wrap items-center gap-2 sm:gap-3">
                    <h3 className="text-sm font-semibold text-gray-900 dark:text-white sm:text-base">
                      {cls.name}
                    </h3>
                    <span className="text-xs text-gray-500 dark:text-gray-400 sm:text-sm">
                      ({cls.code})
                    </span>
                    <Badge variant={cls.status === 'completed' ? 'success' : 'default'} size="sm">
                      {cls.status}
                    </Badge>
                  </div>
                  <div className="flex flex-wrap items-center gap-3 text-xs text-gray-600 dark:text-gray-400 sm:gap-4 sm:text-sm">
                    <span className="whitespace-nowrap">🕐 {cls.time}</span>
                    <span className="whitespace-nowrap">📍 Room {cls.room}</span>
                    <span className="whitespace-nowrap">
                      👥 {cls.present}/{cls.students} present
                    </span>
                  </div>
                </div>
                {cls.status === 'upcoming' && !activeSession && (
                  <button
                    onClick={() => handleStartSession(cls.id)}
                    className="w-full rounded-lg bg-primary-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-primary-700 sm:w-auto sm:text-base"
                  >
                    Start Session
                  </button>
                )}
                {cls.status === 'completed' && (
                  <button className="w-full rounded-lg bg-gray-200 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-300 dark:bg-slate-700 dark:text-gray-300 dark:hover:bg-slate-600 sm:w-auto sm:text-base">
                    View Report
                  </button>
                )}
              </div>
            ))}
          </div>
        </Card>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <Card padding="md">
            <div className="text-center">
              <div className="mb-1 text-2xl font-bold text-primary-600 dark:text-primary-400 sm:mb-2 sm:text-3xl">
                5
              </div>
              <div className="text-xs text-gray-600 dark:text-gray-400 sm:text-sm">
                Total Classes
              </div>
            </div>
          </Card>
          <Card padding="md">
            <div className="text-center">
              <div className="mb-1 text-2xl font-bold text-green-600 dark:text-green-400 sm:mb-2 sm:text-3xl">
                156
              </div>
              <div className="text-xs text-gray-600 dark:text-gray-400 sm:text-sm">
                Total Students
              </div>
            </div>
          </Card>
          <Card padding="md">
            <div className="text-center">
              <div className="mb-1 text-2xl font-bold text-yellow-600 dark:text-yellow-400 sm:mb-2 sm:text-3xl">
                89%
              </div>
              <div className="text-xs text-gray-600 dark:text-gray-400 sm:text-sm">
                Avg. Attendance
              </div>
            </div>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};
