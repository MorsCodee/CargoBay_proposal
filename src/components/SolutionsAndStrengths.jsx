import React from 'react';

export default function SolutionsAndStrengths() {
  const strengthsData = [
    {
      id: 1,
      icon: "🔄",
      color: "#4285F4", // Blue
      title: "True multimodal capability",
      desc: "Cargobay offers air, sea, road, and rail freight under one roof, allowing customers to choose the optimal mode (or combination of modes) for cost, speed, and reliability trade-offs specific to each shipment."
    },
    {
      id: 2,
      icon: "📍",
      color: "#E86024", // Brand Orange
      title: "Strategic Zurich Airport location",
      desc: "Being headquartered directly at Zurich Airport (Freightbuilding West) provides direct proximity and operational efficiency for air freight handling a meaningful locational advantage for a freight forwarder."
    },
    {
      id: 3,
      icon: "🔗",
      color: "#34A853", // Green
      title: "Asset-light, carrier-agnostic model",
      desc: "As a pure freight forwarder without its own fleet, Cargobay can select the best-fit carrier for each shipment rather than being constrained to its own assets, potentially offering more flexible routing and capacity access."
    },
    {
      id: 4,
      icon: "📄",
      color: "#A855F7", // Purple
      title: "Comprehensive documentation and customs expertise",
      desc: "Handling of E-Dec, Carnet ATA, NCTS, Air Waybills, and Bills of Lading in-house reduces the administrative burden on customers engaging in international trade."
    },
    {
      id: 5,
      icon: "🧩",
      color: "#FBA15A", // Amber
      title: "Broad service integration",
      desc: "Combining core freight transport with customs clearance, warehousing, cargo insurance, and trade finance documentation support (letters of credit) positions Cargobay as a full-service logistics partner rather than a single-service provider."
    },
    {
      id: 6,
      icon: "🕰️",
      color: "#06B6D4", // Cyan
      title: "Long operating history",
      desc: "Founded in 2010, Cargobay has operated in the competitive Swiss and European freight forwarding market for over a decade, suggesting demonstrated business viability."
    },
    {
      id: 7,
      icon: "🌍",
      color: "#F43F5E", // Rose
      title: "Diversified estimated customer base",
      desc: "An estimated spread across manufacturing, import/export, retail, e-commerce, and pharmaceutical/healthcare customers (per industry-based estimates) would, if accurate, reduce dependency on any single customer segment."
    }
  ];

  return (
    <section className="solutions-section">
      <style>{`
        .solutions-section {
          background-color: #111316;
          padding: 6rem 4rem;
          color: #FFFFFF;
          font-family: 'Inter', sans-serif;
          position: relative;
          overflow: hidden;
        }

        .solutions-container {
          max-width: 1250px;
          margin: 0 auto;
          position: relative;
          z-index: 2;
        }

        /* Ambient Background Glow */
        .ambient-glow-solutions {
          position: absolute;
          width: 600px;
          height: 600px;
          background: radial-gradient(circle, rgba(232,96,36,0.03) 0%, rgba(17,19,22,0) 70%);
          top: 20%;
          left: 50%;
          transform: translateX(-50%);
          pointer-events: none;
          z-index: 1;
        }

        /* Main Header */
        .section-main-header {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 1.5rem;
          margin-bottom: 5rem;
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
          text-align: center;
        }

        /* Modern Masonry/Wrap Grid */
        .strengths-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
          gap: 2rem;
        }

        /* Span the first card across two columns on large screens for a dynamic layout */
        @media (min-width: 1100px) {
          .strength-card:nth-child(1),
          .strength-card:nth-child(2) {
            grid-column: span 1;
          }
        }

        /* Premium Glow Cards */
        .strength-card {
          background: #1A1D24;
          border: 1px solid rgba(255, 255, 255, 0.03);
          border-radius: 16px;
          padding: 2.5rem;
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
          position: relative;
          transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          opacity: 0;
          transform: translateY(30px);
          animation: fadeUp 0.8s ease forwards;
          box-shadow: 0 10px 30px rgba(0,0,0,0.2);
        }

        /* Cascading Entry Animation Delays */
        .strength-card:nth-child(1) { animation-delay: 0.1s; }
        .strength-card:nth-child(2) { animation-delay: 0.2s; }
        .strength-card:nth-child(3) { animation-delay: 0.3s; }
        .strength-card:nth-child(4) { animation-delay: 0.4s; }
        .strength-card:nth-child(5) { animation-delay: 0.5s; }
        .strength-card:nth-child(6) { animation-delay: 0.6s; }
        .strength-card:nth-child(7) { animation-delay: 0.7s; }

        /* Hover Effects */
        .strength-card:hover {
          transform: translateY(-8px) scale(1.02);
          background: #20242C;
          border-color: rgba(232, 96, 36, 0.4);
          box-shadow: 0 20px 40px rgba(0,0,0,0.4), 0 0 20px rgba(232,96,36,0.1);
        }

        /* Top Bar Indicator */
        .card-top-bar {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 4px;
          background: #E86024;
          border-top-left-radius: 16px;
          border-top-right-radius: 16px;
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .strength-card:hover .card-top-bar {
          opacity: 1;
        }

        /* Icon Wrapper */
        .icon-wrapper {
          width: 60px;
          height: 60px;
          border-radius: 14px;
          display: flex;
          justify-content: center;
          align-items: center;
          font-size: 1.8rem;
          background: rgba(255, 255, 255, 0.03);
          transition: transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }

        .strength-card:hover .icon-wrapper {
          transform: scale(1.15) rotate(-5deg);
        }

        /* Text Content */
        .card-content {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .card-title {
          font-family: 'Poppins', sans-serif;
          font-size: 1.35rem;
          font-weight: 600;
          color: #F3F4F6;
          margin: 0;
          line-height: 1.4;
        }

        .card-desc {
          color: #9CA3AF;
          font-size: 1.05rem;
          line-height: 1.7;
          margin: 0;
        }

        @keyframes fadeUp {
          to { opacity: 1; transform: translateY(0); }
        }

        @media (max-width: 900px) {
          .section-main-header h2 { font-size: 2.2rem; }
          .solutions-section { padding: 5rem 2rem; }
          .strengths-grid { grid-template-columns: 1fr; }
        }
      `}</style>

      <div className="ambient-glow-solutions"></div>

      <div className="solutions-container">
        
        {/* Main Header */}
        <div className="section-main-header">
          <div className="header-dash"></div>
          <h2>Solution & Strengths</h2>
          <div className="header-dash"></div>
        </div>

        {/* Dynamic Features Grid */}
        <div className="strengths-grid">
          {strengthsData.map((item) => (
            <div className="strength-card" key={item.id}>
              <div className="card-top-bar" style={{ backgroundColor: item.color }}></div>
              
              <div 
                className="icon-wrapper" 
                style={{ 
                  boxShadow: `0 0 15px ${item.color}20`, 
                  border: `1px solid ${item.color}40` 
                }}
              >
                {item.icon}
              </div>

              <div className="card-content">
                <h3 className="card-title">{item.title}</h3>
                <p className="card-desc">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}