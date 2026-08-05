import React from "react";
import { ThemeProvider, useTheme } from "./context/ThemeContext";
import ThemeToggle from "./components/ThemeToggle";
import CargobayHeader from "./components/CargobayHeaderV2";
import CargobayHero from "./components/CargobayHero";
import CargobayExecutiveSummary from "./components/CargobayExecutiveSummaryV2";
import CargobayCompanyIntro from "./components/CargobayCompanyIntroV2";

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
      <CargobayHeader />
      <CargobayHero />
      <CargobayExecutiveSummary />
      <CargobayCompanyIntro />
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