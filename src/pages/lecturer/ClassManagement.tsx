import { useState } from 'react';
import { DashboardLayout } from '../../components/templates';
import { Card } from '../../components/molecules';
import { Badge } from '../../components/atoms';
import { QRGenerator } from '../../components/lecturer/QRGenerator';
import { LiveAttendanceMonitor } from '../../components/lecturer/LiveAttendanceMonitor';
interface Class {
  id: string;
  name: string;
  code: string;
  schedule: string;
  room: string;
  enrolledStudents: number;
  absenceLimit: number;
  lateLimit: number;
  location: {
    latitude: number;
    longitude: number;
    geofenceRadius: number;
  };
  attendance: {
    present: number;
    late: number;
    absent: number;
  };
}

export const ClassManagement = () => {
  const [classes] = useState<Class[]>([
    {
      id: '1',
      name: 'Web Development',
      code: 'CS301',
      schedule: 'Monday, Wednesday 2:00 PM - 4:00 PM',
      room: 'A101',
      enrolledStudents: 35,
      absenceLimit: 3,
      lateLimit: 5,
      location: {
        latitude: 11.5564,
        longitude: 104.9282,
        geofenceRadius: 50, // 50 meters radius
      },
      attendance: {
        present: 28,
        late: 5,
        absent: 2,
      },
    },
    {
      id: '2',
      name: 'Database Systems',
      code: 'CS302',
      schedule: 'Tuesday, Thursday 10:00 AM - 12:00 PM',
      room: 'B205',
      enrolledStudents: 32,
      absenceLimit: 3,
      lateLimit: 5,
      location: {
        latitude: 11.5564,
        longitude: 104.9282,
        geofenceRadius: 50,
      },
      attendance: {
        present: 25,
        late: 4,
        absent: 3,
      },
    },
  ]);

  const [showCreateModal, setShowCreateModal] = useState(false);
  const [activeSession, setActiveSession] = useState<string | null>(null);

  const startSession = (classId: string) => {
    setActiveSession(classId);
  };

  const endSession = () => {
    setActiveSession(null);
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Active Session */}
        {activeSession && (
          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <QRGenerator sessionId={activeSession} classId={activeSession} />
            </div>
            <div>
              <LiveAttendanceMonitor
                sessionId={activeSession}
                classId={activeSession}
                onSessionEnd={endSession}
              />
            </div>
          </div>
        )}

        {/* Header with Create Class Button */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white sm:text-3xl">
              Class Management
            </h1>
            <p className="mt-1 text-sm text-gray-600 dark:text-gray-400 sm:mt-2 sm:text-base">
              Create and manage your classes, set attendance limits, and manage enrolled students
            </p>
          </div>
          <button
            onClick={() => setShowCreateModal(true)}
            className="whitespace-nowrap rounded-lg bg-primary-600 px-4 py-2 text-sm text-white transition-colors hover:bg-primary-700 sm:text-base"
          >
            Create New Class
          </button>
        </div>

        {/* Class List */}
        <div className="grid gap-6">
          {classes.map((cls) => (
            <Card key={cls.id}>
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div className="min-w-0 flex-1">
                  <div className="mb-2 flex flex-wrap items-center gap-2 sm:gap-3">
                    <h2 className="text-lg font-bold text-gray-900 dark:text-white sm:text-xl">
                      {cls.name}
                    </h2>
                    <Badge variant="default" size="sm">
                      {cls.code}
                    </Badge>
                  </div>
                  <div className="space-y-2 text-xs text-gray-600 dark:text-gray-400 sm:text-sm">
                    <p>📅 {cls.schedule}</p>
                    <p>📍 Room {cls.room}</p>
                    <p>👥 {cls.enrolledStudents} students enrolled</p>
                    <div className="flex flex-col gap-2 sm:flex-row sm:gap-4">
                      <p>⚠️ Absence Limit: {cls.absenceLimit}</p>
                      <p>⏰ Late Limit: {cls.lateLimit}</p>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap">
                  {!activeSession ? (
                    <button
                      onClick={() => startSession(cls.id)}
                      className="rounded bg-green-100 px-3 py-2 text-xs text-green-700 transition-colors hover:bg-green-200 dark:bg-green-900 dark:text-green-100 sm:py-1 sm:text-sm"
                    >
                      Start Session
                    </button>
                  ) : (
                    <button
                      disabled
                      className="rounded bg-gray-100 px-3 py-2 text-xs text-gray-400 dark:bg-gray-800 sm:py-1 sm:text-sm"
                    >
                      Session Active
                    </button>
                  )}
                  <button className="rounded bg-primary-100 px-3 py-2 text-xs text-primary-700 transition-colors hover:bg-primary-200 dark:bg-primary-900 dark:text-primary-100 sm:py-1 sm:text-sm">
                    Edit
                  </button>
                  <button className="rounded bg-red-100 px-3 py-2 text-xs text-red-700 transition-colors hover:bg-red-200 dark:bg-red-900 dark:text-red-100 sm:py-1 sm:text-sm">
                    Delete
                  </button>
                </div>
              </div>

              <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:gap-4">
                <button className="text-xs text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300 sm:text-sm">
                  Manage Students →
                </button>
                <button className="text-xs text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300 sm:text-sm">
                  View Reports →
                </button>
                <button className="text-xs text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300 sm:text-sm">
                  Attendance Settings →
                </button>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Create Class Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4 dark:bg-opacity-70">
          <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto">
            <Card className="w-full">
              <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white sm:mb-6 sm:text-2xl">
                Create New Class
              </h2>
              <form className="space-y-4 sm:space-y-6">
                {/* Class Details */}
                <div className="space-y-3 sm:space-y-4">
                  <div>
                    <label className="mb-1 block text-xs font-medium text-gray-700 dark:text-gray-300 sm:text-sm">
                      Class Name
                    </label>
                    <input
                      type="text"
                      className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-primary-500 focus:ring-2 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
                      placeholder="e.g., Web Development"
                    />
                  </div>
                  <div>
                    <label className="mb-1 block text-xs font-medium text-gray-700 dark:text-gray-300 sm:text-sm">
                      Class Code
                    </label>
                    <input
                      type="text"
                      className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-primary-500 focus:ring-2 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
                      placeholder="e.g., CS301"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3 sm:gap-4">
                    <div>
                      <label className="mb-1 block text-xs font-medium text-gray-700 dark:text-gray-300 sm:text-sm">
                        Absence Limit
                      </label>
                      <input
                        type="number"
                        className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-primary-500 focus:ring-2 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
                        placeholder="e.g., 3"
                      />
                    </div>
                    <div>
                      <label className="mb-1 block text-xs font-medium text-gray-700 dark:text-gray-300 sm:text-sm">
                        Late Arrival Limit
                      </label>
                      <input
                        type="number"
                        className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-primary-500 focus:ring-2 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
                        placeholder="e.g., 5"
                      />
                    </div>
                  </div>
                </div>

                {/* Schedule and Room */}
                <div className="space-y-3 sm:space-y-4">
                  <div>
                    <label className="mb-1 block text-xs font-medium text-gray-700 dark:text-gray-300 sm:text-sm">
                      Schedule
                    </label>
                    <select className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-primary-500 focus:ring-2 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-800 dark:text-white">
                      <option>Monday, Wednesday 2:00 PM - 4:00 PM</option>
                      <option>Tuesday, Thursday 10:00 AM - 12:00 PM</option>
                      {/* Add more options */}
                    </select>
                  </div>
                  <div>
                    <label className="mb-1 block text-xs font-medium text-gray-700 dark:text-gray-300 sm:text-sm">
                      Room
                    </label>
                    <select className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-primary-500 focus:ring-2 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-800 dark:text-white">
                      <option>A101</option>
                      <option>B205</option>
                      {/* Add more options */}
                    </select>
                  </div>
                </div>

                {/* Actions */}
                <div className="mt-4 flex flex-col gap-2 sm:mt-6 sm:flex-row sm:justify-end sm:gap-4">
                  <button
                    type="button"
                    onClick={() => setShowCreateModal(false)}
                    className="w-full rounded-lg bg-gray-100 px-4 py-2 text-sm text-gray-700 transition-colors hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600 sm:w-auto"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="w-full rounded-lg bg-primary-600 px-4 py-2 text-sm text-white transition-colors hover:bg-primary-700 sm:w-auto"
                  >
                    Create Class
                  </button>
                </div>
              </form>
            </Card>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
};
