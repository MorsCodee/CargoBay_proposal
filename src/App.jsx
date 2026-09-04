import React from "react";
import Chatbot from "./components/ChatBot"; 
import CargobayHeader from "./components/CargobayHeaderV2";
import CargobayHero from "./components/CargobayHero";
import CargobayExecutiveSummary from "./components/CargobayExecutiveSummaryV2";
import CargobayCompanyIntro from "./components/CargobayCompanyIntroV2";
import MultimodalOptimizer from './MultimodalOptimizer';
import BusinessOverview from "./components/BusinessOverview";
import OperatingMetrics from "./components/OperatingMetrics";
import PainPoints from "./components/PainPoints";
import SolutionsAndStrengths from "./components/SolutionsAndStrengths";
import Conclusion from "./components/Conclusion";
import Financials from "./components/Financials";
import CargoBayWorkflow from "./components/Workflow";

export default function App() {

  return (
    <>
      <CargobayHeader />
      <CargobayHero />
      <CargobayExecutiveSummary />
      <CargobayCompanyIntro />
      <BusinessOverview />
      <OperatingMetrics />
      <PainPoints />
      <SolutionsAndStrengths />
      <Financials />
      <CargoBayWorkflow />
      <Chatbot />
      <MultimodalOptimizer />
      <Conclusion />
    </>
  );
}