import { create } from 'zustand';
import type { AttendanceSession, AttendanceRecord } from '../types';

interface AttendanceStore {
  sessions: AttendanceSession[];
  currentSession: AttendanceSession | null;
  attendanceRecords: AttendanceRecord[];
  isScanning: boolean;

  // Actions
  addSession: (session: AttendanceSession) => void;
  updateSession: (id: string, updates: Partial<AttendanceSession>) => void;
  endSession: (id: string) => void;
  setCurrentSession: (session: AttendanceSession | null) => void;
  setIsScanning: (isScanning: boolean) => void;
  addAttendanceRecord: (record: AttendanceRecord) => void;
}

export const useAttendanceStore = create<AttendanceStore>()((set) => ({
  sessions: [],
  currentSession: null,
  attendanceRecords: [],
  isScanning: false,

  addSession: (session) =>
    set((state) => ({
      sessions: [...state.sessions, session],
    })),

  updateSession: (id, updates) =>
    set((state) => ({
      sessions: state.sessions.map((session) =>
        session.id === id ? { ...session, ...updates } : session
      ),
      currentSession:
        state.currentSession?.id === id
          ? { ...state.currentSession, ...updates }
          : state.currentSession,
    })),

  endSession: (id) =>
    set((state) => ({
      sessions: state.sessions.map((session) =>
        session.id === id ? { ...session, status: 'ended' as const, endTime: new Date() } : session
      ),
      currentSession: state.currentSession?.id === id ? null : state.currentSession,
    })),

  setCurrentSession: (session) => set({ currentSession: session }),

  setIsScanning: (isScanning) => set({ isScanning }),

  addAttendanceRecord: (record) =>
    set((state) => ({
      attendanceRecords: [...state.attendanceRecords, record],
    })),
}));
