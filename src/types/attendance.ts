import type { Location } from './campus';

// Attendance Models
export interface AttendanceSession {
  id: string;
  classId: string;
  lecturerId: string;
  startTime: Date;
  endTime?: Date;
  status: 'active' | 'ended';
  qrCode: string;
  qrExpiry: Date;
  location: Location;
  attendanceRecords: AttendanceRecord[];
  lateGracePeriod: number; // minutes
  notes?: string;
}

export interface AttendanceRecord {
  id: string;
  sessionId: string;
  studentId: string;
  classId: string;
  timestamp: Date;
  status: 'present' | 'late' | 'absent';
  checkInMethod: 'qr'; // Only QR method (manual removed, face required)
  location?: {
    latitude: number;
    longitude: number;
    accuracy: number;
  };
  deviceFingerprint?: string;
  faceVerified: boolean; // REQUIRED - every check-in must verify face
  faceConfidence: number; // Must be >= 80%
  geofenceValidation: {
    withinGeofence: boolean;
    distanceFromRoom: number; // in meters
  };
}

// Request Models
export interface AttendanceRequest {
  id: string;
  type: 'late' | 'absence';
  studentId: string;
  classId: string;
  sessionId?: string;
  reason: string;
  estimatedArrivalTime?: Date;
  absenceStartDate?: Date;
  absenceEndDate?: Date;
  supportingDocuments?: string[]; // URLs
  status: 'pending' | 'approved' | 'rejected';
  lecturerResponse?: string;
  submittedAt: Date;
  respondedAt?: Date;
  respondedBy?: string;
}

// Analytics Models
export interface AttendanceAnalytics {
  classId: string;
  totalSessions: number;
  averageAttendance: number;
  presentCount: number;
  lateCount: number;
  absentCount: number;
  trendData: {
    date: Date;
    attendanceRate: number;
  }[];
  studentPerformance: {
    studentId: string;
    attendanceRate: number;
    lateCount: number;
    absentCount: number;
  }[];
}
