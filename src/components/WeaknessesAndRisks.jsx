import React from "react";

const RISKS_DATA = [
  {
    title: "No public financial disclosure",
    description:
      "As a private Swiss SME, Cargobay's actual revenue, profitability, and financial health are not independently verifiable from public information.",
  },
  {
    title: "Asset-light dependency on carrier partners",
    description:
      "Because Cargobay does not own its own aircraft, ships, or extensive truck fleet, its service reliability is partly dependent on the capacity and performance of third-party carrier partners, particularly during periods of global shipping or air-cargo capacity constraints.",
  },
  {
    title: "Exposure to global trade and freight-rate volatility",
    description:
      "Freight forwarding revenue is sensitive to global trade volumes, fuel costs, and freight rate fluctuations — cyclical risks common to the entire logistics industry, not specific to Cargobay.",
  },
  {
    title: "Competitive Swiss/European freight forwarding market",
    description:
      "Cargobay operates in a market with numerous established freight forwarders based at Zurich Airport and across Switzerland and Europe, requiring continuous service differentiation.",
  },
  {
    title: "Currency risk",
    description:
      "As a Swiss company invoicing in CHF for internationally priced freight services (often benchmarked in USD or EUR globally), Cargobay carries some inherent currency exposure typical of the freight forwarding industry.",
  },
];

export default function WeaknessesAndRisks() {
  return (
    <section className="cb-risks-section">
      <style>{`
        .cb-risks-section {
          background: #000000;
          color: #D8DCE6;
          padding: 60px 24px;
          border-top: 1px solid #2C303E;
          border-bottom: 1px solid #2C303E;
          font-family: 'Inter', sans-serif;
        }

        .cb-risks-container {
          max-width: 1200px;
          margin: 0 auto;
        }

        .cb-risks-title {
          font-family: 'Poppins', sans-serif;
          font-size: 28px;
          font-weight: 600;
          color: #FFFFFF;
          margin-bottom: 30px;
        }

        .cb-risks-title span {
          color: #D86326; /* Warehousing/Accent orange */
        }

        .cb-risks-list {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .cb-risk-card {
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid #2C303E;
          border-left: 4px solid #D64933; /* Warning red accent */
          padding: 20px;
          transition: border-color 0.2s ease, background 0.2s ease;
        }

        .cb-risk-card:hover {
          background: rgba(255, 255, 255, 0.05);
          border-color: #D8763F;
        }

        .cb-risk-header {
          font-family: 'Poppins', sans-serif;
          font-weight: 600;
          font-size: 16px;
          color: #FFFFFF;
          margin-bottom: 8px;
        }

        .cb-risk-body {
          font-size: 15px;
          line-height: 1.5;
          color: #868EA3;
        }
      `}</style>

      <div className="cb-risks-container">
        <h2 className="cb-risks-title">
          7.1 Weaknesses & <span>Risks</span> (General, Industry-Typical)
        </h2>

        <ul className="cb-risks-list">
          {RISKS_DATA.map((risk, idx) => (
            <li key={idx} className="cb-risk-card">
              <div className="cb-risk-header">• {risk.title}</div>
              <div className="cb-risk-body">{risk.description}</div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}