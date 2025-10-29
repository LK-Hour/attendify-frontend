import type { ReactNode } from 'react';
import { Navbar, Footer } from '../organisms';

interface DashboardLayoutProps {
  children: ReactNode;
}

export const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-slate-950 w-full overflow-x-hidden">
      <Navbar />
      <main className="flex-1 w-full pt-20">
        <div className="w-full max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
          {children}
        </div>
      </main>
      <Footer />
    </div>
  );
};
