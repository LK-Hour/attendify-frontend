// Base User Models
export interface BaseUser {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: 'student' | 'lecturer' | 'admin';
  profilePhoto?: string;
  phone?: string;
  createdAt: Date;
  updatedAt: Date;
  isActive: boolean;
  lastLogin?: Date;
}

export interface Student extends BaseUser {
  role: 'student';
  studentId: string;
  major: string;
  year: number;
  semester: number;
  group: string;
  department: string;
  faculty: string;
  campusId: string;
  enrolledClasses: string[]; // Class IDs
  deviceFingerprint?: string;
}

export interface Lecturer extends BaseUser {
  role: 'lecturer';
  lecturerId: string;
  department: string;
  faculty: string;
  campusId: string;
  title: string; // Dr., Prof., etc.
  officeLocation?: string;
  officeHours?: string;
}

export interface Admin extends BaseUser {
  role: 'admin';
  adminId: string;
  permissions: string[];
  department: string;
  campusId: string; // Each admin belongs to one campus
  isSuperAdmin: boolean; // Can manage multiple campuses
}

export type User = Student | Lecturer | Admin;
export type UserRole = 'student' | 'lecturer' | 'admin';

export interface LoginCredentials {
  email: string;
  password: string;
  role: UserRole;
}

export interface ProfileUpdate {
  firstName?: string;
  lastName?: string;
  phone?: string;
  profilePhoto?: string;
}
