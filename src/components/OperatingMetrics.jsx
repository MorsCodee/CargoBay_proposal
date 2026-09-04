import React, { useEffect, useState } from 'react';

export default function OperatingMetrics() {
  // Calculated percentage shares based on median values of the provided ranges
  const shipmentsData = [
    { type: 'Air Freight', count: '3,000–5,000', share: 24, color: '#4285F4' },     /* Blue */
    { type: 'Sea Freight', count: '2,000–3,500', share: 16, color: '#34A853' },     /* Green */
    { type: 'Road Freight', count: '6,000–8,000', share: 41, color: '#E86024' },    /* Brand Orange */
    { type: 'Rail Freight', count: '800–1,500', share: 7, color: '#A855F7' },       /* Purple */
    { type: 'Courier & Express', count: '1,500–2,500', share: 12, color: '#FBA15A' }, /* Amber */
  ];

  const pricingData = [
    { icon: '✈️', service: 'Air Freight', price: 'CHF 5–15', unit: 'per kg' },
    { icon: '🛳️', service: 'Sea Freight (LCL)', price: 'CHF 80–250', unit: 'per CBM' },
    { icon: '📦', service: "Sea Freight (20' FCL)", price: 'CHF 1,200–3,500', unit: 'per container' },
    { icon: '🏗️', service: "Sea Freight (40' FCL)", price: 'CHF 2,000–5,500', unit: 'per container' },
    { icon: '🛣️', service: 'Road Freight (Europe)', price: 'CHF 1.20–2.50', unit: 'per km' },
    { icon: '🛤️', service: 'Rail Freight', price: 'CHF 700–2,500', unit: 'per shipment' },
    { icon: '📄', service: 'Customs Clearance', price: 'CHF 80–300', unit: 'per declaration' },
    { icon: '🛡️', service: 'Cargo Insurance', price: '0.3–1.0%', unit: 'of cargo value' },
  ];

  const [isMounted, setIsMounted] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState(null);

  useEffect(() => {
    setTimeout(() => setIsMounted(true), 100);
  }, []);

  // Calculate SVG stroke-dashoffset for each pie slice
  let cumulativePercent = 0;
  const getSliceOffset = (percent) => {
    const offset = 25 - cumulativePercent; // Starts at 12 o'clock
    cumulativePercent += percent;
    return offset;
  };

  return (
    <section className="operating-metrics-section">
      <style>{`
        .operating-metrics-section {
          background-color: #111316;
          padding: 6rem 4rem;
          color: #FFFFFF;
          font-family: 'Inter', sans-serif;
          position: relative;
          overflow: hidden;
        }

        .metrics-container {
          max-width: 1200px;
          margin: 0 auto;
          position: relative;
          z-index: 2;
        }

        /* Ambient Background Glow */
        .ambient-glow {
          position: absolute;
          width: 500px;
          height: 500px;
          background: radial-gradient(circle, rgba(232,96,36,0.05) 0%, rgba(17,19,22,0) 70%);
          top: 10%;
          left: 50%;
          transform: translateX(-50%);
          pointer-events: none;
          z-index: 1;
        }

        /* 1) Main Header - Centered with double dashes */
        .section-main-header {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 1.5rem;
          margin-bottom: 2rem;
          opacity: 0;
          animation: fadeUp 0.8s ease forwards;
        }

        .header-dash {
          width: 45px;
          height: 3px;
          background-color: #E86024;
          border-radius: 2px;
        }

        .section-main-header h2 {
          font-family: 'Poppins', sans-serif;
          font-size: 3rem;
          font-weight: 700;
          margin: 0;
          letter-spacing: -0.5px;
          color: #FFFFFF;
        }

        /* Disclaimer Text Box - NOW WITH HOVER ANIMATION */
        .disclaimer-box {
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(255, 255, 255, 0.05);
          border-radius: 8px;
          padding: 1.5rem 2rem;
          text-align: center;
          max-width: 900px;
          margin: 0 auto 4rem auto;
          opacity: 0;
          animation: fadeUp 0.8s ease 0.2s forwards;
          transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          cursor: default;
        }

        /* Shiny glowing border and zoom effect on hover */
        .disclaimer-box:hover {
          transform: scale(1.03);
          border-color: rgba(232, 96, 36, 0.6);
          box-shadow: 0 0 20px rgba(232, 96, 36, 0.2), inset 0 0 10px rgba(232, 96, 36, 0.1);
          background: rgba(255, 255, 255, 0.03);
        }

        .disclaimer-box p {
          color: #9CA3AF;
          font-style: italic;
          font-size: 1.05rem;
          margin: 0;
          line-height: 1.6;
        }

        /* Vertical Stack Layout (Over one another) */
        .metrics-stack {
          display: flex;
          flex-direction: column;
          gap: 4rem;
        }

        /* Panel Styling */
        .metrics-panel {
          background: #1A1D24;
          border: 1px solid rgba(255, 255, 255, 0.05);
          border-top: 3px solid #E86024;
          border-radius: 12px;
          padding: 3.5rem;
          box-shadow: 0 15px 35px rgba(0, 0, 0, 0.3);
          opacity: 0;
          animation: fadeUp 0.8s ease 0.4s forwards;
        }

        .panel-header {
          text-align: center;
          margin-bottom: 3.5rem;
        }

        .panel-header h3 {
          font-family: 'Poppins', sans-serif;
          font-size: 2.2rem;
          font-weight: 700;
          color: #FFFFFF;
          margin: 0 0 0.75rem 0;
        }

        .panel-subtitle {
          color: #6B7280;
          font-size: 1.05rem;
          text-transform: uppercase;
          letter-spacing: 1px;
          margin: 0;
        }

        /* --- DONUT CHART LAYOUT (TOP PANEL) --- */
        .chart-split-layout {
          display: grid;
          grid-template-columns: 1fr 1.3fr;
          gap: 4rem;
          align-items: center;
        }

        .chart-wrapper {
          position: relative;
          display: flex;
          justify-content: center;
          align-items: center;
          filter: drop-shadow(0 15px 25px rgba(0,0,0,0.5));
        }

        .donut-svg {
          width: 100%;
          max-width: 350px;
          transform: rotate(0deg);
        }

        .donut-slice {
          fill: transparent;
          stroke-width: 8;
          transition: stroke-dasharray 1.5s cubic-bezier(0.2, 1, 0.3, 1), transform 0.3s ease, stroke-width 0.3s ease, filter 0.3s ease, opacity 0.3s ease;
          cursor: pointer;
        }

        .donut-slice.active {
          stroke-width: 11;
          filter: brightness(1.2);
          z-index: 10;
        }
        
        .donut-slice.dimmed {
          opacity: 0.2;
        }

        .chart-center-text {
          position: absolute;
          text-align: center;
          pointer-events: none;
          transition: transform 0.3s ease;
        }

        .chart-center-text h4 {
          font-family: 'Poppins', sans-serif;
          margin: 0;
          line-height: 1;
          transition: all 0.3s ease;
        }

        .chart-center-text p {
          color: #9CA3AF;
          font-size: 0.75rem;
          margin: 0.5rem 0 0 0;
          text-transform: uppercase;
          letter-spacing: 1px;
          font-weight: 500;
        }

        /* --- DATA GRID ROWS (FOR TOP PANEL) --- */
        .data-grid {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
          position: relative;
        }

        .shipment-row {
          background: #13161C;
          border: 1px solid rgba(255, 255, 255, 0.03);
          border-radius: 8px;
          padding: 1rem 1.5rem;
          display: grid;
          grid-template-columns: 2fr 1.5fr 1fr;
          align-items: center;
          gap: 1.5rem;
          opacity: 0;
          transform: translateX(-20px);
          animation: slideIn 0.6s ease forwards;
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
          cursor: pointer;
          position: relative;
          z-index: 1;
        }

        .shipment-row.active {
          background: #20242C;
          transform: translateX(15px) scale(1.03);
          z-index: 10;
        }

        .shipment-row.dimmed {
          opacity: 0.3;
          transform: scale(0.98);
        }

        .col-type {
          font-weight: 500;
          font-size: 1rem;
          color: #F3F4F6;
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .color-dot {
          width: 10px;
          height: 10px;
          border-radius: 50%;
          flex-shrink: 0;
          transition: transform 0.3s ease;
        }
        
        .shipment-row.active .color-dot {
          transform: scale(1.5);
          box-shadow: 0 0 8px currentColor;
        }

        .col-share {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .share-bar-bg {
          flex: 1;
          height: 6px;
          background: rgba(255, 255, 255, 0.08);
          border-radius: 4px;
          overflow: hidden;
        }

        .share-bar-fill {
          height: 100%;
          border-radius: 4px;
          transform-origin: left;
          animation: scaleX 1s ease-out forwards;
        }

        .share-text {
          font-family: 'Poppins', sans-serif;
          font-weight: 700;
          width: 40px;
          text-align: right;
        }

        .col-count {
          text-align: right;
          color: #9CA3AF;
          font-size: 0.95rem;
        }

        .total-row {
          border-top: 1px dashed rgba(255, 255, 255, 0.15);
          margin-top: 0.5rem;
          padding: 1.25rem 1.5rem 0.5rem;
          display: grid;
          grid-template-columns: 2fr 1.5fr 1fr;
          gap: 1.5rem;
          transition: opacity 0.3s ease;
        }

        .total-row.dimmed { opacity: 0.3; }
        
        .total-text {
          color: #FFFFFF;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 1px;
        }

        /* --- PRICING GRID (BOTTOM PANEL) --- */
        .pricing-grid {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }

        .pricing-row {
          background: #13161C;
          border: 1px solid rgba(255, 255, 255, 0.03);
          border-radius: 8px;
          padding: 1.25rem 2rem;
          display: grid;
          grid-template-columns: 1.5fr 1fr 1fr;
          align-items: center;
          transition: all 0.3s ease;
          opacity: 0;
          transform: translateY(15px);
          animation: fadeUp 0.6s ease forwards;
        }

        .pricing-row:hover {
          background: #20242C;
          border-color: rgba(232, 96, 36, 0.3);
          transform: scale(1.01) translateY(-2px);
          box-shadow: 0 10px 20px rgba(0, 0, 0, 0.3);
        }

        .service-info {
          display: flex;
          align-items: center;
          gap: 1.25rem;
        }

        .icon-box {
          width: 42px;
          height: 42px;
          background: rgba(255, 255, 255, 0.05);
          border-radius: 8px;
          display: flex;
          justify-content: center;
          align-items: center;
          font-size: 1.4rem;
          flex-shrink: 0;
        }

        .service-name {
          font-weight: 500;
          color: #F3F4F6;
          font-size: 1.1rem;
        }

        .price-value {
          font-family: 'Poppins', sans-serif;
          font-weight: 700;
          color: #E86024;
          font-size: 1.15rem;
          text-align: right;
          transition: color 0.3s ease;
        }

        .price-unit {
          color: #6B7280;
          font-size: 0.95rem;
          text-align: right;
        }

        .pricing-row:hover .price-value {
          text-shadow: 0 0 10px rgba(232, 96, 36, 0.4);
        }

        /* Animations */
        @keyframes fadeUp { to { opacity: 1; transform: translateY(0); } }
        @keyframes slideIn { to { opacity: 1; transform: translateX(0); } }
        @keyframes scaleX { from { transform: scaleX(0); } to { transform: scaleX(1); } }

        /* Cascading Row Delays */
        .chart-split-layout .shipment-row:nth-child(2) { animation-delay: 0.5s; }
        .chart-split-layout .shipment-row:nth-child(3) { animation-delay: 0.6s; }
        .chart-split-layout .shipment-row:nth-child(4) { animation-delay: 0.7s; }
        .chart-split-layout .shipment-row:nth-child(5) { animation-delay: 0.8s; }
        .chart-split-layout .shipment-row:nth-child(6) { animation-delay: 0.9s; }

        .pricing-grid .pricing-row:nth-child(1) { animation-delay: 0.6s; }
        .pricing-grid .pricing-row:nth-child(2) { animation-delay: 0.7s; }
        .pricing-grid .pricing-row:nth-child(3) { animation-delay: 0.8s; }
        .pricing-grid .pricing-row:nth-child(4) { animation-delay: 0.9s; }
        .pricing-grid .pricing-row:nth-child(5) { animation-delay: 1.0s; }
        .pricing-grid .pricing-row:nth-child(6) { animation-delay: 1.1s; }
        .pricing-grid .pricing-row:nth-child(7) { animation-delay: 1.2s; }
        .pricing-grid .pricing-row:nth-child(8) { animation-delay: 1.3s; }

        @media (max-width: 900px) {
          .chart-split-layout {
            grid-template-columns: 1fr;
            gap: 3rem;
          }
          .donut-svg { max-width: 280px; }
          .metrics-panel { padding: 2rem; }
          .pricing-row, .shipment-row {
            grid-template-columns: 1fr;
            gap: 0.5rem;
            text-align: center;
          }
          .service-info { flex-direction: column; text-align: center; margin-bottom: 0.5rem; }
          .price-value, .price-unit, .col-count, .share-text { text-align: center; }
          .share-bar-bg { display: none; }
          .col-type { justify-content: center; }
        }
      `}</style>

      <div className="ambient-glow"></div>

      <div className="metrics-container">
        
        {/* Main Header */}
        <div className="section-main-header">
          <div className="header-dash"></div>
          <h2>Estimated Operating Metrics</h2>
          <div className="header-dash"></div>
        </div>

        {/* Disclaimer - Now with shiny glowing border and zoom on hover */}
        <div className="disclaimer-box">
          <p>
            Shipment volumes and pricing below are industry-based estimates for context; Cargobay provides customized quotations and does not publish fixed price plans or shipment volumes.
          </p>
        </div>

        {/* Stacked Panels (One over another) */}
        <div className="metrics-stack">
          
          {/* PANEL 1: Estimated Annual Shipments (Interactive Pie Chart) */}
          <div className="metrics-panel">
            <div className="panel-header">
              <h3>Estimated Annual Shipments</h3>
              <p className="panel-subtitle">By Transport Mode</p>
            </div>
            
            <div className="chart-split-layout">
              {/* LEFT: Animated Donut Chart */}
              <div className="chart-wrapper">
                <svg viewBox="0 0 40 40" className="donut-svg">
                  <circle cx="20" cy="20" r="15.915494309" fill="transparent" stroke="rgba(255,255,255,0.05)" strokeWidth="8" />
                  
                  {shipmentsData.map((item, index) => {
                    const dashOffset = getSliceOffset(item.share);
                    const isActive = hoveredIndex === index;
                    const isDimmed = hoveredIndex !== null && hoveredIndex !== index;
                    
                    return (
                      <circle 
                        key={index}
                        className={`donut-slice ${isActive ? 'active' : ''} ${isDimmed ? 'dimmed' : ''}`}
                        cx="20" cy="20" r="15.915494309"
                        stroke={item.color}
                        strokeDasharray={isMounted ? `${item.share} ${100 - item.share}` : `0 100`}
                        strokeDashoffset={dashOffset}
                        onMouseEnter={() => setHoveredIndex(index)}
                        onMouseLeave={() => setHoveredIndex(null)}
                      />
                    );
                  })}
                </svg>
                
                {/* Glowing Center Label (Adapts dynamically on hover) */}
                <div className="chart-center-text" style={{ transform: hoveredIndex !== null ? 'scale(1.1)' : 'scale(1)' }}>
                  <h4 style={{ 
                    color: hoveredIndex !== null ? shipmentsData[hoveredIndex].color : '#FFFFFF',
                    fontSize: hoveredIndex !== null ? '3rem' : '1.8rem' 
                  }}>
                    {hoveredIndex !== null ? `${shipmentsData[hoveredIndex].share}%` : '13k–20.5k'}
                  </h4>
                  <p>{hoveredIndex !== null ? 'SHARE' : 'TOTAL EST. SHIPMENTS'}</p>
                </div>
              </div>

              {/* RIGHT: Data Grid tied to Pie Chart */}
              <div className="data-grid">
                <div style={{ display: 'grid', gridTemplateColumns: '2fr 1.5fr 1fr', padding: '0 1.5rem 0.5rem', color: '#6B7280', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: '600', gap: '1.5rem' }}>
                  <div>Transport Mode</div>
                  <div>Est. Share</div>
                  <div style={{ textAlign: 'right' }}>Annual Shipments</div>
                </div>

                {shipmentsData.map((item, index) => {
                  const isActive = hoveredIndex === index;
                  const isDimmed = hoveredIndex !== null && hoveredIndex !== index;

                  return (
                    <div 
                      className={`shipment-row ${isActive ? 'active' : ''} ${isDimmed ? 'dimmed' : ''}`} 
                      key={index}
                      style={isActive ? { borderColor: item.color, boxShadow: `-5px 10px 25px ${item.color}40` } : {}}
                      onMouseEnter={() => setHoveredIndex(index)}
                      onMouseLeave={() => setHoveredIndex(null)}
                    >
                      <div className="col-type">
                        <span className="color-dot" style={{ backgroundColor: item.color, color: item.color }}></span>
                        {item.type}
                      </div>
                      <div className="col-share">
                        <div className="share-bar-bg">
                          <div className="share-bar-fill" style={{ width: `${item.share}%`, backgroundColor: item.color }}></div>
                        </div>
                        <div className="share-text" style={{ color: item.color }}>{item.share}%</div>
                      </div>
                      <div className="col-count">{item.count}</div>
                    </div>
                  );
                })}

                <div className={`total-row ${hoveredIndex !== null ? 'dimmed' : ''}`}>
                  <div className="total-text">Total Estimated</div>
                  <div></div>
                  <div className="col-count" style={{ color: '#FFFFFF', fontWeight: '700', fontSize: '1.1rem' }}>13,000–20,500</div>
                </div>
              </div>
            </div>
          </div>

          {/* PANEL 2: Estimated Freight Quotation Guide (Full Width) */}
          <div className="metrics-panel">
            <div className="panel-header">
              <h3>Estimated Freight Quotation Guide</h3>
              <p className="panel-subtitle">Typical Market Pricing</p>
            </div>
            
            <div className="pricing-grid">
              {pricingData.map((item, index) => (
                <div className="pricing-row" key={index}>
                  <div className="service-info">
                    <div className="icon-box">{item.icon}</div>
                    <div className="service-name">{item.service}</div>
                  </div>
                  
                  <div className="price-value">{item.price}</div>
                  <div className="price-unit">{item.unit}</div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}