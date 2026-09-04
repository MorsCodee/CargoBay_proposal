import React, { useEffect, useState, useRef } from 'react';

export default function Summary1() {
  const [animate, setAnimate] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const currentSection = sectionRef.current;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setAnimate(false);
          setTimeout(() => setAnimate(true), 50);
        } else {
          setAnimate(false);
        }
      },
      { threshold: 0.15 }
    );

    if (currentSection) {
      observer.observe(currentSection);
    }

    return () => {
      if (currentSection) {
        observer.unobserve(currentSection);
      }
    };
  }, []);

  const items = [
    {
      title: "No public financials",
      text: "Revenue and profitability not independently verifiable.",
      img: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?q=80&w=1000&auto=format&fit=crop"
    },
    {
      title: "Asset-light model",
      text: "Relies on third-party carriers; vulnerable during capacity shortages.",
      img: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=1000&auto=format&fit=crop"
    },
    {
      title: "Trade & rate exposure",
      text: "Sensitive to global volumes, fuel costs, and freight-rate cycles.",
      img: "https://images.unsplash.com/photo-1578575437130-527eed3abbec?q=80&w=1000&auto=format&fit=crop"
    },
    {
      title: "Competitive market",
      text: "Faces strong Swiss/European freight forwarding rivals.",
      img: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=1000&auto=format&fit=crop"
    },
    {
      title: "Currency risk",
      text: "CHF invoicing vs. USD/EUR benchmarks creates FX exposure.",
      img: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?q=80&w=1000&auto=format&fit=crop"
    }
  ];

  return (
    <div className="summary-container" id="summary" ref={sectionRef}>
      <style>{`
        *, *::before, *::after {
          box-sizing: border-box;
        }

        :root {
          --font-heading: 'Poppins', sans-serif;
          --font-body: 'Inter', sans-serif;
          --max-content-width: 1200px;
          --section-padding-desktop: 80px;
          --section-padding-mobile: 48px;
          --horizontal-padding-desktop: 64px;
          --horizontal-padding-mobile: 24px;
          --card-border-radius: 0px;

          --color-text-heading-1: #FFFFFF;
          --color-text-heading-2: #FF6F52;
          --color-card-title: #D86326;
        }

        .summary-container {
          position: relative;
          background-color: #0E1114; /* Pure dark theme background */
          color: var(--color-text-heading-1);
          font-family: var(--font-body);
          width: 100%;
          min-height: 100vh;
          margin: 0;
          padding: 0;
          overflow-x: hidden; /* Fixes right-edge overflow clipping */
        }

        .summary-container .content-wrapper {
          position: relative;
          z-index: 1;
          max-width: var(--max-content-width);
          margin: 0 auto;
          padding: var(--section-padding-desktop) var(--horizontal-padding-desktop);
          width: 100%;
        }

        .summary-main-title {
          font-family: var(--font-heading);
          font-weight: bold;
          font-size: 50px;
          color: var(--color-text-heading-1);
          line-height: 1.2;
          margin-bottom: 48px;
          margin-top: 10px;
          text-align: left;
        }

        .summary-main-title-2 {
          color: var(--color-text-heading-2);
        }

        @keyframes slideUpCard {
          from {
            opacity: 0;
            transform: translateY(60px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        /* Alternating Grid Row Layout */
        .alternating-rows-container {
          display: flex;
          flex-direction: column;
          gap: 32px;
          width: 100%;
        }

        .alternating-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 28px;
          align-items: stretch;
          width: 100%;
          opacity: 0;
          will-change: transform, opacity;
        }

        .alternating-row.animate-slide-up {
          animation: slideUpCard 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        .alternating-row.delay-1 { animation-delay: 0.1s; }
        .alternating-row.delay-2 { animation-delay: 0.25s; }
        .alternating-row.delay-3 { animation-delay: 0.4s; }
        .alternating-row.delay-4 { animation-delay: 0.55s; }
        .alternating-row.delay-5 { animation-delay: 0.7s; }

        /* Alternating Row Ordering */
        .alternating-row.reverse .row-card {
          order: 2;
        }
        .alternating-row.reverse .row-image-wrapper {
          order: 1;
        }

        .row-card {
          width: 100%;
        }

        /* Glossy Glassmorphic Card Styling */
        .summary-strength-card {
          background: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border: 1px solid rgba(255, 255, 255, 0.12);
          border-top: 1px solid rgba(255, 255, 255, 0.25);
          border-left: 1px solid rgba(255, 255, 255, 0.25);
          border-radius: var(--card-border-radius);
          box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.37);
          position: relative;
          overflow: hidden;
          padding: 28px 32px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          text-align: left;
          color: #FFFFFF;
          height: 100%;
          min-height: 200px;
          transition: transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease, background 0.3s ease;
        }

        .summary-strength-card::after {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 45%;
          background: linear-gradient(
            to bottom,
            rgba(255, 255, 255, 0.12) 0%,
            rgba(255, 255, 255, 0) 100%
          );
          pointer-events: none;
        }

        .summary-strength-card:hover {
          transform: translateY(-4px);
          background: rgba(255, 255, 255, 0.09);
          border-color: rgba(255, 255, 255, 0.3);
          box-shadow: 0 12px 40px 0 rgba(0, 0, 0, 0.5);
          cursor: pointer;
        }

        .summary-strength-title {
          font-family: var(--font-heading);
          font-weight: bold;
          font-size: 22px;
          margin-top: 0;
          margin-bottom: 12px;
          color: var(--color-card-title);
          text-shadow: 0 1px 2px rgba(0, 0, 0, 0.5);
        }

        .summary-strength-list {
          margin: 0;
          padding: 20px;
          list-style: disc inside;
          list-style-position: outside;
        }

        .summary-strength-list li {
          font-size: 16px;
          line-height: 1.6;
          font-weight: 400;
          color: rgba(255, 255, 255, 0.9);
        }

        .summary-strength-list li::marker {
          color: var(--color-card-title);
        }

        /* Image Wrapper with Matching Border Radius & Border */
        .row-image-wrapper {
          max-height: 220px;
          min-height: 100px;
          width: 100%;
          overflow: hidden;
          border-radius: var(--card-border-radius);
          border: 1px solid rgba(255, 255, 255, 0.12);
          box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.37);
          position: relative;
        }

        .row-image-wrapper img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          transition: transform 0.4s ease;
        }

        .alternating-row:hover .row-image-wrapper img {
          transform: scale(1.05);
        }

        /* Responsive Screen Fixes */
        @media (max-width: 750px) {
          .summary-container .content-wrapper {
            padding: var(--section-padding-mobile) var(--horizontal-padding-mobile);
          }

          .alternating-row {
            grid-template-columns: 1fr;
            gap: 16px;
          }

          .alternating-row.reverse .row-card {
            order: 1;
          }

          .alternating-row.reverse .row-image-wrapper {
            order: 2;
          }

          .row-image-wrapper {
            height: 200px;
          }
        }
      `}</style>

      <div className="content-wrapper"> 
        <h1 className="summary-main-title">
          Weaknesses <span className="summary-main-title-2">& Risks</span>
        </h1> 
        
        <div className="alternating-rows-container">
          {items.map((item, index) => {
            const isEven = index % 2 === 0;
            return (
              <div 
                key={index} 
                className={`alternating-row ${!isEven ? 'reverse' : ''} delay-${index + 1} ${animate ? 'animate-slide-up' : ''}`}
              >
                <div className="row-card">
                  <div className="summary-strength-card">
                    <h3 className="summary-strength-title">{item.title}</h3>
                    <ul className="summary-strength-list">
                      <li>{item.text}</li>
                    </ul>
                  </div>
                </div>

                <div className="row-image-wrapper">
                  <img src={item.img} alt={item.title} />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}