import React from "react";
import { ThemeProvider, useTheme } from "./context/ThemeContext";
import Chatbot from "./components/ChatBot"; 
import CargobayHeader from "./components/CargobayHeaderV2";
import CargobayHero from "./components/CargobayHero";
import CargobayExecutiveSummary from "./components/CargobayExecutiveSummaryV2";
import CargobayCompanyIntro from "./components/CargobayCompanyIntroV2";

function AppShell() {
  const { darkMode } = useTheme();

  return (
    <>
      <CargobayHeader />
      <CargobayHero />
      <CargobayExecutiveSummary />
      <CargobayCompanyIntro />
      <Chatbot />
    </>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AppShell />
    </ThemeProvider>
  );
}