// Notification Models
export interface Notification {
  id: string;
  userId: string;
  type: 'info' | 'success' | 'warning' | 'error';
  title: string;
  message: string;
  actionUrl?: string;
  isRead: boolean;
  createdAt: Date;
}

// API Response Types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

// Real-time Event Types
export type RealtimeEventType =
  | 'STUDENT_CHECKED_IN'
  | 'SESSION_STARTED'
  | 'SESSION_ENDED'
  | 'REQUEST_SUBMITTED'
  | 'REQUEST_APPROVED'
  | 'REQUEST_REJECTED'
  | 'USER_ONLINE'
  | 'USER_OFFLINE';

export interface RealtimeEvent {
  type: RealtimeEventType;
  payload: any;
  timestamp: Date;
  userId?: string;
}
