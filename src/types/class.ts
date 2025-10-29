import type { Location } from './campus';

// Class Models
export interface Class {
  id: string;
  name: string;
  code: string;
  description?: string;
  lecturerId: string;
  campusId: string; // Campus this class belongs to
  buildingId: string; // Building where class is held
  roomId: string; // Room where class is held (geofence inherited from room)
  schedule: ClassSchedule[];
  location: Location; // Inherited from Room.geofence
  maxStudents?: number;
  enrolledStudents: string[]; // Student IDs
  semester: string;
  year: number;
  absenceLimit: number;
  lateLimit: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface ClassSchedule {
  dayOfWeek: number; // 0-6 (Sunday-Saturday)
  startTime: string; // "HH:mm" format
  endTime: string; // "HH:mm" format
  room: string;
}
