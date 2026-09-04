import React from "react";
import Chatbot from "./components/ChatBot"; 
import CargobayHeader from "./components/CargobayHeaderV2";
import CargobayHero from "./components/CargobayHero";
import CargobayExecutiveSummary from "./components/CargobayExecutiveSummaryV2";
import CargobayCompanyIntro from "./components/CargobayCompanyIntroV2";
import MultimodalOptimizer from './components/MultimodalOptimizer';

export default function App() {

  return (
    <>
      <CargobayHeader />
      <CargobayHero />
      <CargobayExecutiveSummary />
      <CargobayCompanyIntro />
      <Chatbot />
      <MultimodalOptimizer />
    </>
  );
}