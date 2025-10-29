import { useEffect } from 'react';
import { AppRoutes } from './routes';
import { useUIStore } from './store';
import './i18n'; // Initialize i18next
import './App.css';

function App() {
  const { theme, setTheme } = useUIStore();

  // Initialize theme on mount
  useEffect(() => {
    // Get saved theme or check system preference
    const savedTheme = localStorage.getItem('ui-storage');
    const parsedSavedTheme = savedTheme ? JSON.parse(savedTheme)?.state?.theme : null;

    if (parsedSavedTheme) {
      setTheme(parsedSavedTheme);
    } else if (!theme) {
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches
        ? 'dark'
        : 'light';
      setTheme(systemTheme);
    } else {
      // Make sure the theme is applied to the document
      setTheme(theme);
    }

    // Listen for system theme changes
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e: MediaQueryListEvent) => {
      if (!parsedSavedTheme) {
        setTheme(e.matches ? 'dark' : 'light');
      }
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [setTheme, theme]);

  return <AppRoutes />;
}

export default App;
