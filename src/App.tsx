import { useEffect } from 'react';
import { AppRoutes } from './routes';
import { useUIStore } from './store';
import './i18n'; // Initialize i18next
import './App.css';

function App() {
  const { theme, setTheme } = useUIStore();

  // Initialize theme on mount
  useEffect(() => {
    // Check system preference if no theme is set
    if (!theme) {
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches
        ? 'dark'
        : 'light';
      setTheme(systemTheme);
    } else {
      setTheme(theme);
    }
  }, [theme, setTheme]);

  return <AppRoutes />;
}

export default App;
