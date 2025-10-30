import type { ReactNode } from 'react';
import { Navbar, Footer } from '../organisms';

interface DashboardLayoutProps {
  children: ReactNode;
}

export const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  return (
    <div className="flex min-h-screen w-full flex-col overflow-x-hidden bg-gray-50 dark:bg-slate-950">
      <Navbar />
      <main className="w-full flex-1 pt-20">
        <div className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 lg:px-8">{children}</div>
      </main>
      <Footer />
    </div>
  );
};
