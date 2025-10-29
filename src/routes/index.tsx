import { RouterProvider } from 'react-router-dom';
import { router } from './router';

export const AppRoutes = () => {
  return (
    <div className="min-h-screen bg-white text-slate-900 dark:bg-slate-950 dark:text-slate-100">
      <RouterProvider router={router} />
    </div>
  );
};
