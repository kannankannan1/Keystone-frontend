import { useEffect } from 'react';
import { useUIStore } from '@/store';

export function useTheme() {
  const { theme, setTheme } = useUIStore();

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [theme]);

  return {
    isDark: theme === 'dark',
    toggleTheme: () => setTheme(theme === 'dark' ? 'light' : 'dark'),
  };
}
