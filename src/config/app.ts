import { env } from './env';

// App-wide configuration
export const appConfig = {
  // Authentication
  auth: {
    sessionTimeout: 30 * 60 * 1000, // 30 minutes in milliseconds
    maxLoginAttempts: 5,
    loginLockoutDuration: 15 * 60 * 1000, // 15 minutes
  },

  // Attendance
  attendance: {
    qrRefreshInterval: env.qrRefreshInterval,
    faceConfidenceThreshold: env.faceConfidenceThreshold,
    maxFaceDetectionAttempts: 3,
    lateGracePeriod: 10, // minutes
  },

  // Geofencing
  geofence: {
    defaultRadius: env.geofenceDefaultRadius,
    minRadius: 50, // meters
    maxRadius: 200, // meters
  },

  // Pagination
  pagination: {
    defaultPageSize: 20,
    pageSizeOptions: [10, 20, 50, 100],
  },

  // Notifications
  notifications: {
    autoCloseDelay: 4000, // 4 seconds
    maxVisible: 5,
  },

  // File Upload
  fileUpload: {
    maxSize: 5 * 1024 * 1024, // 5MB
    allowedTypes: ['image/jpeg', 'image/png', 'image/webp', 'application/pdf'],
  },
} as const;

export default appConfig;
