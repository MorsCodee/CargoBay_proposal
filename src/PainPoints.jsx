import React, { useState } from 'react';

// 1. IMPORT YOUR 5 IMAGES HERE
// Make sure the file names match exactly what you saved in your folder!
import img1 from './image1.jpeg'; 
import img2 from './image2.jpeg';
import img3 from './image3.jpeg';
import img4 from './image4.jpeg';
import img5 from './image5.jpeg';

export default function PainPoints() {
  const painPointsData = [
    {
      id: 1,
      title: "Time-critical shipment needs",
      desc: "Businesses moving electronics, pharmaceuticals, or perishable goods require rapid, reliable transport; Cargobay's rapid-response trucking (within an hour of notice) and express air freight directly target this need.",
      bgImage: img1 // 2. ASSIGN IMAGE 1 TO CARD 1
    },
    {
      id: 2,
      title: "Complex customs and cross-border documentation",
      desc: "International trade involves substantial paperwork (E-Dec, Carnet ATA, NCTS, Air Waybills, Bills of Lading), a burden many businesses lack the in-house expertise to manage themselves.",
      bgImage: img2 // 2. ASSIGN IMAGE 2 TO CARD 2
    },
    {
      id: 3,
      title: "Fragmented multimodal logistics",
      desc: "Businesses shipping goods internationally often need to coordinate across air, sea, road, and rail; Cargobay's multimodal transport organization consolidates this into a single point of contact.",
      bgImage: img3 // 2. ASSIGN IMAGE 3 TO CARD 3
    },
    {
      id: 4,
      title: "Limited access to carrier networks for smaller businesses",
      desc: "SMEs and e-commerce businesses in particular may lack the scale or relationships to negotiate directly and efficiently with global airlines, shipping lines, and rail operators.",
      bgImage: img4 // 2. ASSIGN IMAGE 4 TO CARD 4
    },
    {
      id: 5,
      title: "Cargo risk and financing complexity",
      desc: "Trade finance needs (letters of credit) and the risk of cargo loss or damage in transit are addressed through Cargobay's insurance and documentation support services.",
      bgImage: img5 // 2. ASSIGN IMAGE 5 TO CARD 5
    }
  ];

  const [flippedCards, setFlippedCards] = useState({});

  const toggleFlip = (id) => {
    setFlippedCards(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  return (
    <section className="pain-points-section">
      <style>{`
        .pain-points-section {
          background-color: #111316;
          padding: 6rem 4rem;
          color: #FFFFFF;
          font-family: 'Inter', sans-serif;
          position: relative;
          overflow: hidden; 
        }

        .pp-container {
          max-width: 1200px;
          margin: 0 auto;
        }

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
        }

        .cards-grid {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 2.5rem;
          max-width: 950px; 
          margin: 0 auto;
        }

        .flip-card {
          background-color: transparent;
          width: calc(50% - 1.25rem); 
          min-width: 320px;
          height: 380px;
          perspective: 1000px;
          cursor: pointer;
          opacity: 0;
          transform: translateY(20px);
          animation: fadeUp 0.8s ease forwards;
        }

        .flip-card:nth-child(1) { animation-delay: 0.2s; }
        .flip-card:nth-child(2) { animation-delay: 0.3s; }
        .flip-card:nth-child(3) { animation-delay: 0.4s; }
        .flip-card:nth-child(4) { animation-delay: 0.5s; }
        .flip-card:nth-child(5) { animation-delay: 0.6s; }

        .flip-card-inner {
          position: relative;
          width: 100%;
          height: 100%;
          transition: transform 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          transform-style: preserve-3d;
        }

        .flip-card.is-flipped .flip-card-inner {
          transform: rotateY(180deg);
        }

        .flip-card-front, .flip-card-back {
          position: absolute;
          width: 100%;
          height: 100%;
          backface-visibility: hidden;
          border-radius: 12px;
          padding: 2.5rem;
          display: flex;
          flex-direction: column;
          border: 1px solid rgba(255, 255, 255, 0.05);
          overflow: hidden;
        }

        .flip-card::before {
          content: '';
          position: absolute;
          top: 0; left: -100%;
          width: 50%; height: 100%;
          background: linear-gradient(to right, rgba(255,255,255,0) 0%, rgba(255,255,255,0.05) 50%, rgba(255,255,255,0) 100%);
          transform: skewX(-25deg);
          transition: 0.7s;
          z-index: 10;
          pointer-events: none;
        }

        .flip-card:hover::before {
          left: 150%;
        }

        .flip-card-front {
          background: #1A1D24;
          justify-content: center;
          align-items: center;
          text-align: center;
          box-shadow: 0 15px 35px rgba(0, 0, 0, 0.3);
          transition: box-shadow 0.3s ease, border-color 0.3s ease;
        }

        .card-bg-image {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-size: cover;
          background-position: center;
          opacity: 0.35; 
          filter: blur(2px) brightness(0.5); 
          z-index: 0;
          pointer-events: none;
          transition: opacity 0.3s ease, filter 0.3s ease;
        }

        .flip-card:hover .card-bg-image {
          opacity: 0.6; 
          filter: blur(1px) brightness(0.7);
        }

        .front-content {
          position: relative;
          z-index: 2;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .flip-card:hover .flip-card-front,
        .flip-card:hover .flip-card-back {
          border-color: rgba(232, 96, 36, 0.5);
          box-shadow: 0 0 25px rgba(232, 96, 36, 0.15), inset 0 0 10px rgba(232, 96, 36, 0.05);
        }

        .front-number {
          font-family: 'Poppins', sans-serif;
          font-size: 6rem;
          font-weight: 800;
          color: #111316;
          -webkit-text-stroke: 2px #E86024;
          line-height: 1;
          margin-bottom: 1rem;
          transition: all 0.3s ease;
        }

        .flip-card:hover .front-number {
          color: rgba(232, 96, 36, 0.1);
          text-shadow: 0 0 20px rgba(232, 96, 36, 0.3);
        }

        .front-label {
          color: #9CA3AF;
          font-size: 1.2rem;
          font-weight: 500;
          letter-spacing: 2px;
          text-transform: uppercase;
        }

        .click-hint {
          margin-top: 1.5rem;
          color: #E86024;
          font-size: 0.9rem;
          font-weight: 600;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          opacity: 0.7;
          transition: opacity 0.3s ease;
        }

        .flip-card:hover .click-hint {
          opacity: 1;
        }

        .flip-card-back {
          background: #20242C;
          border-top: 4px solid #E86024;
          transform: rotateY(180deg);
          justify-content: flex-start;
          text-align: left;
        }

        .back-title {
          font-family: 'Poppins', sans-serif;
          font-size: 1.4rem;
          font-weight: 600;
          color: #FFFFFF;
          margin: 0 0 1rem 0;
          line-height: 1.4;
        }

        .back-desc {
          color: #9CA3AF;
          font-size: 1.05rem;
          line-height: 1.7;
          margin: 0;
        }

        .back-number-watermark {
          position: absolute;
          bottom: -20px;
          right: 10px;
          font-size: 8rem;
          font-weight: 900;
          color: rgba(255, 255, 255, 0.02);
          pointer-events: none;
        }

        @keyframes fadeUp { to { opacity: 1; transform: translateY(0); } }

        @media (max-width: 900px) {
          .section-main-header h2 { font-size: 2.2rem; }
          .flip-card { width: 100%; height: 320px; }
          .front-number { font-size: 5rem; }
          .back-title { font-size: 1.2rem; }
          .back-desc { font-size: 0.95rem; }
        }
      `}</style>

      <div className="pp-container">
        
        <div className="section-main-header">
          <div className="header-dash"></div>
          <h2>Pain Points</h2>
          <div className="header-dash"></div>
        </div>

        <div className="cards-grid">
          {painPointsData.map((point) => (
            <div 
              key={point.id} 
              className={`flip-card ${flippedCards[point.id] ? 'is-flipped' : ''}`}
              onClick={() => toggleFlip(point.id)}
            >
              <div className="flip-card-inner">
                
                <div className="flip-card-front">
                  
                  {/* 3. DYNAMIC BACKGROUND IMAGE APPLIED HERE */}
                  <div 
                    className="card-bg-image" 
                    style={{ backgroundImage: `url('${point.bgImage}')` }}
                  ></div>

                  <div className="front-content">
                    <div className="front-number">0{point.id}</div>
                    <div className="front-label">Pain Point</div>
                    <div className="click-hint">
                      <span>↻</span> Click to reveal
                    </div>
                  </div>
                </div>

                <div className="flip-card-back">
                  <h3 className="back-title">{point.title}</h3>
                  <p className="back-desc">{point.desc}</p>
                  <div className="back-number-watermark">{point.id}</div>
                </div>

              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}