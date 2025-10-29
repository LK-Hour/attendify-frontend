import { useAuthStore } from '../../store';
import { DashboardLayout } from '../../components/templates';
import { Card } from '../../components/molecules';
import { Badge } from '../../components/atoms';

export const Classes = () => {
  const { user } = useAuthStore();

  if (!user || user.role !== 'student') return null;

  const classes = [
    {
      id: '1',
      name: 'Web Development',
      code: 'CS301',
      lecturer: 'Dr. John Smith',
      schedule: 'Mon, Wed 2:00 PM - 4:00 PM',
      room: 'A101',
      attendance: 18,
      total: 20,
      status: 'active' as const,
    },
    {
      id: '2',
      name: 'Database Systems',
      code: 'CS302',
      lecturer: 'Prof. Jane Doe',
      schedule: 'Tue, Thu 10:00 AM - 12:00 PM',
      room: 'B205',
      attendance: 19,
      total: 20,
      status: 'active' as const,
    },
    {
      id: '3',
      name: 'Mobile Development',
      code: 'CS303',
      lecturer: 'Dr. Bob Johnson',
      schedule: 'Fri 3:00 PM - 6:00 PM',
      room: 'C301',
      attendance: 15,
      total: 20,
      status: 'active' as const,
    },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">My Classes</h1>
            <p className="text-gray-600 dark:text-gray-400 mt-2">
              You're enrolled in {classes.length} classes this semester
            </p>
          </div>
        </div>

        {/* Classes Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {classes.map((cls) => {
            const attendanceRate = Math.round((cls.attendance / cls.total) * 100);
            return (
              <Card key={cls.id} padding="lg" hover>
                <div className="space-y-4">
                  {/* Header */}
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                        {cls.name}
                      </h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{cls.code}</p>
                    </div>
                    <Badge variant="success" size="md">
                      {cls.status}
                    </Badge>
                  </div>

                  {/* Details */}
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                        />
                      </svg>
                      <span>{cls.lecturer}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      <span>{cls.schedule}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                      <span>Room {cls.room}</span>
                    </div>
                  </div>

                  {/* Attendance Progress */}
                  <div>
                    <div className="flex items-center justify-between text-sm mb-2">
                      <span className="text-gray-600 dark:text-gray-400">Attendance</span>
                      <span className="font-semibold text-gray-900 dark:text-white">
                        {cls.attendance}/{cls.total} ({attendanceRate}%)
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-slate-700 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full ${
                          attendanceRate >= 90
                            ? 'bg-green-500'
                            : attendanceRate >= 75
                              ? 'bg-yellow-500'
                              : 'bg-red-500'
                        }`}
                        style={{ width: `${attendanceRate}%` }}
                      />
                    </div>
                  </div>

                  {/* Actions */}
                  <button className="w-full px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors font-medium">
                    View Details
                  </button>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </DashboardLayout>
  );
};
