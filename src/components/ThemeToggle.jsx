import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../hooks/useTheme';

export default function ThemeToggle() {
  const { darkMode, toggleTheme } = useTheme();

  return (
    <button
      className="theme-toggle-btn"
      onClick={toggleTheme}
      aria-label="Toggle light/dark theme"
      type="button"
    >
      {darkMode ? <Sun size={20} color="#F2A93B" /> : <Moon size={20} color="#3E7BFA" />}
    </button>
  );
}