import React from 'react';
import BusinessOverview from './BusinessOverview';
import OperatingMetrics from './OperatingMetrics';
import PainPoints from './PainPoints';
import SolutionsAndStrengths from './SolutionsAndStrengths';
import Conclusion from './Conclusion';

export default function App() {
  return (
    <div style={{ backgroundColor: '#111316', minHeight: '100vh', overflowX: 'hidden' }}>
      
      {/* 3. Business Overview Section */}
      <BusinessOverview />
      
      {/* 4. Estimated Operating Metrics Section */}
      <OperatingMetrics />
      
      {/* 5. Market Pain Points Section */}
      <PainPoints />

      {/* 6. Solution & Strengths Section */}
      <SolutionsAndStrengths />
      
      {/* 8. Conclusion & Outlook Section */}
      <Conclusion />

    </div>
  );
}