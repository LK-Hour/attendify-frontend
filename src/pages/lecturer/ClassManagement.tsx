import { useState } from 'react';
import { DashboardLayout } from '../../components/templates';
import { Card } from '../../components/molecules';
import { Badge } from '../../components/atoms';
import { QRGenerator } from '../../components/lecturer/QRGenerator';
import { LiveAttendanceMonitor } from '../../components/lecturer/LiveAttendanceMonitor';
import { FaceVerification } from '../../components/lecturer/FaceVerification';

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
  const [classes, setClasses] = useState<Class[]>([
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
        geofenceRadius: 50 // 50 meters radius
      },
      attendance: {
        present: 28,
        late: 5,
        absent: 2
      }
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
        geofenceRadius: 50
      },
      attendance: {
        present: 25,
        late: 4,
        absent: 3
      }
    }
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
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <QRGenerator
                sessionId={activeSession}
                classId={activeSession}
              />
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
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Class Management
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-2">
              Create and manage your classes, set attendance limits, and manage enrolled students
            </p>
          </div>
          <button
            onClick={() => setShowCreateModal(true)}
            className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
          >
            Create New Class
          </button>
        </div>

        {/* Class List */}
        <div className="grid gap-6">
          {classes.map((cls) => (
            <Card key={cls.id}>
              <div className="flex justify-between items-start">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                      {cls.name}
                    </h2>
                    <Badge variant="default">{cls.code}</Badge>
                  </div>
                  <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                    <p>📅 {cls.schedule}</p>
                    <p>📍 Room {cls.room}</p>
                    <p>👥 {cls.enrolledStudents} students enrolled</p>
                    <div className="flex gap-4">
                      <p>⚠️ Absence Limit: {cls.absenceLimit}</p>
                      <p>⏰ Late Limit: {cls.lateLimit}</p>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  {!activeSession ? (
                    <button
                      onClick={() => startSession(cls.id)}
                      className="px-3 py-1 bg-green-100 text-green-700 rounded hover:bg-green-200 transition-colors dark:bg-green-900 dark:text-green-100"
                    >
                      Start Session
                    </button>
                  ) : (
                    <button
                      disabled
                      className="px-3 py-1 bg-gray-100 text-gray-400 rounded dark:bg-gray-800"
                    >
                      Session Active
                    </button>
                  )}
                  <button className="px-3 py-1 bg-primary-100 text-primary-700 rounded hover:bg-primary-200 transition-colors dark:bg-primary-900 dark:text-primary-100">
                    Edit
                  </button>
                  <button className="px-3 py-1 bg-red-100 text-red-700 rounded hover:bg-red-200 transition-colors dark:bg-red-900 dark:text-red-100">
                    Delete
                  </button>
                </div>
              </div>
              
              <div className="mt-4 flex gap-4">
                <button className="text-sm text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300">
                  Manage Students →
                </button>
                <button className="text-sm text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300">
                  View Reports →
                </button>
                <button className="text-sm text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300">
                  Attendance Settings →
                </button>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Create Class Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 dark:bg-opacity-70">
          <Card className="w-full max-w-2xl">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              Create New Class
            </h2>
            <form className="space-y-6">
              {/* Class Details */}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Class Name
                  </label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
                    placeholder="e.g., Web Development"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Class Code
                  </label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
                    placeholder="e.g., CS301"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Absence Limit
                    </label>
                    <input
                      type="number"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
                      placeholder="e.g., 3"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Late Arrival Limit
                    </label>
                    <input
                      type="number"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
                      placeholder="e.g., 5"
                    />
                  </div>
                </div>
              </div>

              {/* Schedule and Room */}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Schedule
                  </label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 dark:border-gray-600 dark:bg-gray-800 dark:text-white">
                    <option>Monday, Wednesday 2:00 PM - 4:00 PM</option>
                    <option>Tuesday, Thursday 10:00 AM - 12:00 PM</option>
                    {/* Add more options */}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Room
                  </label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 dark:border-gray-600 dark:bg-gray-800 dark:text-white">
                    <option>A101</option>
                    <option>B205</option>
                    {/* Add more options */}
                  </select>
                </div>
              </div>

              {/* Actions */}
              <div className="flex justify-end gap-4 mt-6">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
                >
                  Create Class
                </button>
              </div>
            </form>
          </Card>
        </div>
      )}
    </DashboardLayout>
  );
};