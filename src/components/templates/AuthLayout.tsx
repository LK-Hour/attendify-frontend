import type { ReactNode } from 'react';
import { Footer } from '../organisms';

interface AuthLayoutProps {
  children: ReactNode;
}

export const AuthLayout = ({ children }: AuthLayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-slate-950">
      <div className="flex-1 flex items-center justify-center px-4 py-8 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8">
          {children}
        </div>
      </div>
      <Footer />
    </div>
  );
};
