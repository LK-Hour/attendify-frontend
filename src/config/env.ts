// Environment configuration
export const env = {
  // API Configuration
  apiBaseUrl: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api',
  mockApiEnabled: import.meta.env.VITE_MOCK_API_ENABLED === 'true',
  enableDevtools: import.meta.env.VITE_ENABLE_DEVTOOLS === 'true',

  // App Configuration
  appName: import.meta.env.VITE_APP_NAME || 'Attendify',

  // Feature Configuration
  qrRefreshInterval: Number(import.meta.env.VITE_QR_REFRESH_INTERVAL) || 5000, // 5 seconds
  faceConfidenceThreshold: Number(import.meta.env.VITE_FACE_CONFIDENCE_THRESHOLD) || 80, // 80%
  geofenceDefaultRadius: Number(import.meta.env.VITE_GEOFENCE_DEFAULT_RADIUS) || 100, // 100 meters

  // Environment
  isDevelopment: import.meta.env.DEV,
  isProduction: import.meta.env.PROD,
} as const;

// Validate required environment variables
const requiredEnvVars = ['VITE_API_BASE_URL'] as const;

requiredEnvVars.forEach((envVar) => {
  if (!import.meta.env[envVar] && import.meta.env.PROD) {
    console.warn(`Missing required environment variable: ${envVar}`);
  }
});

export default env;
