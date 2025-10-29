import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { User, LoginCredentials, ProfileUpdate } from '../types';

interface AuthStore {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;

  // Actions
  login: (credentials: LoginCredentials) => Promise<void>;
  logout: () => void;
  refreshToken: () => Promise<void>;
  updateProfile: (data: ProfileUpdate) => Promise<void>;
  setUser: (user: User | null) => void;
  setToken: (token: string | null) => void;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,

      login: async (credentials: LoginCredentials) => {
        set({ isLoading: true });
        try {
          // TODO: Implement with MSW mock API
          // const response = await authApi.login(credentials);

          // Mock implementation for now
          let mockUser: User;

          if (credentials.role === 'student') {
            mockUser = {
              id: '1',
              email: credentials.email,
              firstName: 'John',
              lastName: 'Doe',
              role: 'student',
              isActive: true,
              createdAt: new Date(),
              updatedAt: new Date(),
              studentId: 'ST2023001',
              major: 'Computer Science',
              year: 3,
              semester: 1,
              group: 'A',
              department: 'Computer Science',
              faculty: 'Engineering',
              campusId: 'campus-1',
              enrolledClasses: ['class-1', 'class-2', 'class-3'],
            };
          } else if (credentials.role === 'lecturer') {
            mockUser = {
              id: '2',
              email: credentials.email,
              firstName: 'Jane',
              lastName: 'Smith',
              role: 'lecturer',
              isActive: true,
              createdAt: new Date(),
              updatedAt: new Date(),
              lecturerId: 'LC2023001',
              department: 'Computer Science',
              faculty: 'Engineering',
              campusId: 'campus-1',
              title: 'Dr.',
              officeLocation: 'Building A, Room 301',
              officeHours: 'Mon-Fri 2:00-4:00 PM',
            };
          } else {
            mockUser = {
              id: '3',
              email: credentials.email,
              firstName: 'Admin',
              lastName: 'User',
              role: 'admin',
              isActive: true,
              createdAt: new Date(),
              updatedAt: new Date(),
              adminId: 'AD2023001',
              permissions: ['manage_users', 'manage_campuses', 'view_reports'],
              department: 'Administration',
              campusId: 'campus-1',
              isSuperAdmin: true,
            };
          }

          const mockToken = 'mock-jwt-token-' + Date.now();

          set({
            user: mockUser,
            token: mockToken,
            isAuthenticated: true,
            isLoading: false,
          });
        } catch (error) {
          set({ isLoading: false });
          throw error;
        }
      },

      logout: () => {
        set({
          user: null,
          token: null,
          isAuthenticated: false,
        });
      },

      refreshToken: async () => {
        // TODO: Implement token refresh logic
        const { token } = get();
        if (token) {
          // Mock refresh
          set({ token: 'refreshed-' + token });
        }
      },

      updateProfile: async (data: ProfileUpdate) => {
        set({ isLoading: true });
        try {
          // TODO: Implement with MSW mock API
          const { user } = get();
          if (user) {
            set({
              user: { ...user, ...data },
              isLoading: false,
            });
          }
        } catch (error) {
          set({ isLoading: false });
          throw error;
        }
      },

      setUser: (user) => set({ user, isAuthenticated: !!user }),
      setToken: (token) => set({ token }),
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        user: state.user,
        token: state.token,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);
