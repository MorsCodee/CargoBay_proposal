import React from "react";
import { Sun, Moon } from "lucide-react";
import { useTheme } from "../context/ThemeContext";

export default function ThemeToggle() {
  const { darkMode, toggleTheme } = useTheme();

  return (
    <>
      <style>{`
        .theme-toggle-btn {
          position: fixed;
          top: 24px;
          right: 32px;
          z-index: 1000;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          border: 1px solid;
          box-shadow: 0 4px 12px rgba(0,0,0,0.12);
          transition: border-color 0.15s ease, transform 0.15s ease, background-color 0.2s ease;
        }
        .theme-toggle-btn:hover {
          transform: translateY(-2px);
        }
      `}</style>

      <button
        className="theme-toggle-btn"
        onClick={toggleTheme}
        aria-label="Toggle light/dark theme"
        type="button"
        style={{
          background: darkMode ? "#1D242C" : "#FFFFFF",
          borderColor: darkMode ? "#323C48" : "#E5E7EB",
        }}
      >
        {darkMode ? <Sun size={20} color="#F2A93B" /> : <Moon size={20} color="#3E7BFA" />}
      </button>
    </>
  );
}