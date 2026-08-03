import React from "react";
import { ThemeProvider, useTheme } from "./context/ThemeContext";
import ThemeToggle from "./components/ThemeToggle";
function AppShell() {
  const { darkMode } = useTheme();

  return (
    <div
      style={{
        backgroundColor: darkMode ? "#000000" : "#FFFFFF",
        color: darkMode ? "#FFFFFF" : "#1F2937",
        minHeight: "100vh",
        width: "100%",
        overflowX: "hidden",
        transition: "background-color 0.3s ease, color 0.3s ease",
        position: "relative",
      }}
    >
      <ThemeToggle />
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AppShell />
    </ThemeProvider>
  );
}