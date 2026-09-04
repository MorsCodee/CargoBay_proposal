import React, { useEffect, useState } from 'react';

export default function BusinessOverview() {
  const customerData = [
    { type: 'Manufacturing Companies', share: 35, count: '150–200', color: '#E86024' }, /* Brand Orange */
    { type: 'Import & Export Companies', share: 30, count: '130–170', color: '#4285F4' }, /* Blue */
    { type: 'Retail & Wholesale Businesses', share: 15, count: '60–90', color: '#34A853' }, /* Green */
    { type: 'E-commerce Businesses', share: 10, count: '40–60', color: '#FBA15A' }, /* Amber */
    { type: 'Pharmaceutical & Healthcare', share: 5, count: '20–30', color: '#A855F7' }, /* Purple */
    { type: 'Other Businesses', share: 5, count: '20–30', color: '#64748B' }, /* Slate */
  ];

  // State to trigger the chart animation on mount
  const [isMounted, setIsMounted] = useState(false);
  // State to track which item is currently hovered (for cross-highlighting)
  const [hoveredIndex, setHoveredIndex] = useState(null);

  useEffect(() => {
    setTimeout(() => setIsMounted(true), 100);
  }, []);

  // Calculate SVG stroke-dashoffset for each pie slice
  let cumulativePercent = 0;
  const getSliceOffset = (percent) => {
    const offset = 25 - cumulativePercent; // 25 offsets the start to the top (12 o'clock)
    cumulativePercent += percent;
    return offset;
  };

  return (
    <section className="business-overview-section">
      <style>{`
        .business-overview-section {
          background-color: #111316;
          padding: 6rem 4rem;
          color: #FFFFFF;
          font-family: 'Inter', sans-serif;
          position: relative;
        }

        .bo-container {
          max-width: 1300px;
          margin: 0 auto;
        }

        /* 1) Main Header - Now Centered with double dashes */
        .section-main-header {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 1.5rem;
          margin-bottom: 3.5rem;
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

        /* 2) 3.1 Outer Card + Inner Enclosed Box */
        .info-card-outer {
          background: #1A1D24; 
          border: 1px solid rgba(255, 255, 255, 0.05);
          border-left: 4px solid #E86024;
          padding: 3rem;
          border-radius: 12px;
          margin-bottom: 4rem;
          text-align: center;
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4);
          opacity: 0;
          transform: translateY(20px);
          animation: fadeUp 0.8s ease 0.2s forwards;
          transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }

        .info-card-outer:hover {
          transform: scale(1.02) translateY(-5px);
          box-shadow: 0 25px 50px rgba(232, 96, 36, 0.15), 0 0 30px rgba(232, 96, 36, 0.1);
          border-color: rgba(232, 96, 36, 0.3);
        }

        .info-card-outer h3 {
          font-family: 'Poppins', sans-serif;
          font-size: 1.8rem;
          color: #E86024;
          margin: 0 0 1.5rem 0;
          font-weight: 600;
        }

        .inner-content-box {
          background: #13161C;
          border: 1px solid rgba(255, 255, 255, 0.06);
          border-radius: 8px;
          padding: 2.5rem 3rem;
          box-shadow: inset 0 2px 8px rgba(0, 0, 0, 0.5);
        }

        .inner-content-box p {
          color: #9CA3AF;
          font-size: 1.1rem;
          line-height: 1.8;
          margin: 0;
          text-align: justify;
        }

        .inner-content-box p strong {
          color: #9CA3AF;
          font-weight: 600;
        }

        /* 3) 3.2 Container for Header & Chart Data */
        .data-container {
          background: #1A1D24;
          border: 1px solid rgba(255, 255, 255, 0.05);
          border-top: 3px solid #E86024;
          border-radius: 12px;
          padding: 3.5rem;
          box-shadow: 0 15px 35px rgba(0, 0, 0, 0.3);
          opacity: 0;
          animation: fadeUp 0.8s ease 0.4s forwards;
        }

        .data-header-section {
          text-align: center;
          margin-bottom: 3rem;
        }

        .data-header-section h2 {
          font-family: 'Poppins', sans-serif;
          font-size: 2.2rem;
          font-weight: 700;
          color: #FFFFFF;
          margin: 0 0 0.75rem 0;
        }

        .data-disclaimer {
          color: #6B7280;
          font-size: 1.05rem;
          font-style: italic;
          margin: 0;
        }

        /* Split Layout: Chart (Left) & Grid (Right) */
        .data-split-layout {
          display: grid;
          grid-template-columns: 1fr 1.3fr;
          gap: 4rem;
          align-items: center;
        }

        /* --- ANIMATED DONUT CHART STYLES --- */
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
          font-size: 3rem;
          color: #FFFFFF;
          margin: 0;
          line-height: 1;
        }

        .chart-center-text p {
          color: #9CA3AF;
          font-size: 1rem;
          margin: 0.25rem 0 0 0;
          text-transform: uppercase;
          letter-spacing: 1px;
          font-weight: 500;
        }

        /* --- INTERACTIVE DATA GRID --- */
        .data-grid {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
          position: relative;
        }

        .data-row {
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

        .data-row.active {
          background: #20242C;
          transform: translateX(15px) scale(1.03);
          z-index: 10;
        }

        .data-row.dimmed {
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
        
        .data-row.active .color-dot {
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

        /* Totals Row */
        .total-row {
          border-top: 1px dashed rgba(255, 255, 255, 0.15);
          margin-top: 0.5rem;
          padding: 1.25rem 1.5rem 0.5rem;
          display: grid;
          grid-template-columns: 2fr 1.5fr 1fr;
          gap: 1.5rem;
          opacity: 0;
          animation: fadeUp 0.8s ease 1.2s forwards;
          transition: opacity 0.3s ease;
        }

        .total-row.dimmed {
          opacity: 0.3;
        }

        .total-text {
          color: #FFFFFF;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 1px;
        }

        /* Animations */
        @keyframes fadeUp { to { opacity: 1; transform: translateY(0); } }
        @keyframes slideIn { to { opacity: 1; transform: translateX(0); } }
        @keyframes scaleX { from { transform: scaleX(0); } to { transform: scaleX(1); } }

        /* Cascading Row Delays */
        .data-row:nth-child(2) { animation-delay: 0.5s; }
        .data-row:nth-child(3) { animation-delay: 0.6s; }
        .data-row:nth-child(4) { animation-delay: 0.7s; }
        .data-row:nth-child(5) { animation-delay: 0.8s; }
        .data-row:nth-child(6) { animation-delay: 0.9s; }
        .data-row:nth-child(7) { animation-delay: 1.0s; }

        @media (max-width: 1024px) {
          .data-split-layout {
            grid-template-columns: 1fr;
            gap: 3rem;
          }
          .donut-svg { max-width: 280px; }
          .data-container { padding: 2rem; }
          .data-row {
            grid-template-columns: 1.5fr 1fr 1fr;
            padding: 1rem;
            gap: 1rem;
          }
          .data-row.active { transform: translateX(5px) scale(1.02); }
          .share-bar-bg { display: none; }
          .info-card-outer { padding: 1.5rem; }
          .inner-content-box { padding: 1.5rem; }
          .section-main-header h2 { font-size: 2.2rem; }
        }
      `}</style>

      <div className="bo-container">
        
        {/* Main Header - Centered with dashes on both sides */}
        <div className="section-main-header">
          <div className="header-dash"></div>
          <h2>Business Overview</h2>
          <div className="header-dash"></div>
        </div>

        {/* 3.1 Card */}
        <div className="info-card-outer">
          <h3>Who Uses Cargobay</h3>
          <div className="inner-content-box">
            <p>
              Cargobay's typical customers are importers and exporters, manufacturers, retailers, e-commerce businesses, and other companies requiring international cargo transportation. As a <strong>freight forwarder rather than an asset-owning carrier</strong>, Cargobay's core value proposition is selecting and coordinating the right carriers for each shipment rather than operating its own aircraft, ships, or trucks.
            </p>
          </div>
        </div>

        {/* 3.2 Split Container */}
        <div className="data-container">
          
          <div className="data-header-section">
            <h2>Estimated Customer Profile</h2>
            <p className="data-disclaimer">The following customer-mix figures are industry-based estimates, not official Cargobay data.</p>
          </div>

          <div className="data-split-layout">
            
            {/* LEFT: Animated Donut Chart */}
            <div className="chart-wrapper">
              <svg viewBox="0 0 40 40" className="donut-svg">
                <circle cx="20" cy="20" r="15.915494309" fill="transparent" stroke="rgba(255,255,255,0.05)" strokeWidth="8" />
                
                {customerData.map((item, index) => {
                  const dashOffset = getSliceOffset(item.share);
                  const isActive = hoveredIndex === index;
                  const isDimmed = hoveredIndex !== null && hoveredIndex !== index;
                  
                  return (
                    <circle 
                      key={index}
                      className={`donut-slice ${isActive ? 'active' : ''} ${isDimmed ? 'dimmed' : ''}`}
                      cx="20" 
                      cy="20" 
                      r="15.915494309"
                      stroke={item.color}
                      strokeDasharray={isMounted ? `${item.share} ${100 - item.share}` : `0 100`}
                      strokeDashoffset={dashOffset}
                      onMouseEnter={() => setHoveredIndex(index)}
                      onMouseLeave={() => setHoveredIndex(null)}
                    />
                  );
                })}
              </svg>
              
              {/* Glowing Center Label */}
              <div className="chart-center-text" style={{ transform: hoveredIndex !== null ? 'scale(1.1)' : 'scale(1)' }}>
                <h4 style={{ color: hoveredIndex !== null ? customerData[hoveredIndex].color : '#FFFFFF' }}>
                  {hoveredIndex !== null ? `${customerData[hoveredIndex].share}%` : '100%'}
                </h4>
                <p>{hoveredIndex !== null ? 'SHARE' : 'TOTAL MIX'}</p>
              </div>
            </div>

            {/* RIGHT: Interactive Data Grid */}
            <div className="data-grid">
              
              <div style={{ display: 'grid', gridTemplateColumns: '2fr 1.5fr 1fr', padding: '0 1.5rem 0.5rem', color: '#6B7280', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: '600', gap: '1.5rem' }}>
                <div>Customer Type</div>
                <div>Est. Share</div>
                <div style={{ textAlign: 'right' }}>Active Customers</div>
              </div>

              {customerData.map((item, index) => {
                const isActive = hoveredIndex === index;
                const isDimmed = hoveredIndex !== null && hoveredIndex !== index;

                return (
                  <div 
                    className={`data-row ${isActive ? 'active' : ''} ${isDimmed ? 'dimmed' : ''}`} 
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
                <div className="total-text">Estimated Total</div>
                <div></div>
                <div className="col-count" style={{ color: '#FFFFFF', fontWeight: '700', fontSize: '1.1rem' }}>420–580</div>
              </div>

            </div>
          </div>
        </div>

      </div>
    </section>
  );
}