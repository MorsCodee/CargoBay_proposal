import React from 'react';
import bgImage from './image6.jpeg'; // Ensure your image is named image6.jpg and is in the src folder!

export default function Conclusion() {
  return (
    <section className="conclusion-section">
      <style>{`
        .conclusion-section {
          background-color: #111316;
          /* Adjusted bottom padding from 8rem to 12rem to make room for the footer */
          padding: 8rem 4rem 12rem 4rem;
          color: #FFFFFF;
          font-family: 'Inter', sans-serif;
          position: relative;
          overflow: hidden;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        /* Blurred Background Image Layer */
        .bg-image-layer {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-size: cover;
          background-position: center;
          background-attachment: fixed; /* Creates a nice parallax effect when scrolling */
          /* Reduced blur and increased brightness so the image is recognizable */
          filter: blur(1px) brightness(0.5); 
          transform: scale(1.05); /* Prevents blurred edges from showing the background color */
          z-index: 0;
          pointer-events: none;
        }

        .conclusion-container {
          max-width: 1000px;
          width: 100%;
          position: relative;
          z-index: 2;
        }

        /* Main Header */
        .section-main-header {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 1.5rem;
          margin-bottom: 4rem;
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
          text-shadow: 0 4px 20px rgba(0,0,0,0.5);
        }

        /* Big Shiny Glassmorphism Box */
        .shiny-box {
          /* Highly transparent base state to see the image clearly */
          background: rgba(17, 19, 22, 0.35);
          backdrop-filter: blur(6px);
          -webkit-backdrop-filter: blur(6px);
          border: 1px solid rgba(232, 96, 36, 0.3);
          border-top: 4px solid #E86024;
          border-radius: 16px;
          padding: 4rem 5rem;
          box-shadow: 0 20px 50px rgba(0, 0, 0, 0.5), inset 0 0 20px rgba(232, 96, 36, 0.05);
          opacity: 0;
          transform: translateY(30px);
          animation: fadeUp 1s ease 0.3s forwards;
          transition: all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }

        /* The "Shiny" Hover Effect - Darkens and becomes super clear for reading */
        .shiny-box:hover {
          border-color: rgba(232, 96, 36, 0.8);
          box-shadow: 0 30px 60px rgba(0, 0, 0, 0.6), 0 0 30px rgba(232, 96, 36, 0.2), inset 0 0 25px rgba(232, 96, 36, 0.1);
          transform: translateY(-5px) scale(1.01);
          background: rgba(17, 19, 22, 0.85); /* Solidifies the background */
          backdrop-filter: blur(16px); /* Blurs out the background behind the text entirely */
        }

        /* Justified Text Styling */
        .conclusion-text {
          color: #D1D5DB; /* Slightly dim initially */
          font-size: 1.15rem;
          line-height: 1.8;
          text-align: justify;
          margin: 0 0 1.5rem 0;
          transition: color 0.5s ease;
        }

        /* Text brightens up when the box is hovered */
        .shiny-box:hover .conclusion-text {
          color: #FFFFFF;
        }

        .conclusion-text:last-child {
          margin-bottom: 0;
        }

        @keyframes fadeUp {
          to { opacity: 1; transform: translateY(0) scale(1); }
        }

        /* --- NEW FLOATING FOOTER STYLES --- */
        .floating-footer {
          position: absolute;
          bottom: 35px; /* Anchors it nicely inside the conclusion section */
          left: 50%;
          transform: translateX(-50%);
          background: rgba(17, 19, 22, 0.85);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border: 1px solid rgba(255, 255, 255, 0.05);
          border-top: 2px solid #E86024;
          padding: 0.8rem 2rem;
          border-radius: 50px;
          display: flex;
          align-items: center;
          gap: 1.5rem;
          z-index: 10; /* Keeps it above the background image */
          box-shadow: 0 15px 35px rgba(0, 0, 0, 0.4), inset 0 0 15px rgba(232, 96, 36, 0.05);
          color: #D1D5DB;
          font-size: 0.95rem;
          opacity: 0;
          animation: fadeUpFooter 1s ease 0.6s forwards; /* Fades in slightly after the main box */
        }

        .footer-text span {
          color: #E86024;
          font-weight: 600;
          letter-spacing: 0.5px;
        }

        .social-links {
          display: flex;
          gap: 1rem;
          align-items: center;
          border-left: 1px solid rgba(255, 255, 255, 0.1);
          padding-left: 1rem;
        }

        .social-icon {
          color: #9CA3AF;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .social-icon:hover {
          color: #E86024;
          transform: translateY(-2px);
          filter: drop-shadow(0 0 8px rgba(232, 96, 36, 0.4));
        }
        
        .social-icon svg {
          width: 20px;
          height: 20px;
          fill: currentColor;
        }

        @keyframes fadeUpFooter {
          to { opacity: 1; transform: translate(-50%, 0) scale(1); }
        }

        @media (max-width: 900px) {
          .conclusion-section { padding: 5rem 2rem 10rem 2rem; }
          .section-main-header h2 { font-size: 2.2rem; }
          .shiny-box { padding: 2.5rem 2rem; }
          .conclusion-text { font-size: 1.05rem; text-align: left; }
          .floating-footer { padding: 0.6rem 1.5rem; font-size: 0.85rem; width: 90%; justify-content: center;}
        }
      `}</style>

      {/* Background Image Layer */}
      <div 
        className="bg-image-layer" 
        style={{ backgroundImage: `url('${bgImage}')` }}
      ></div>

      <div className="conclusion-container">
        
        {/* Main Header */}
        <div className="section-main-header">
          <div className="header-dash"></div>
          <h2>Conclusion & Outlook</h2>
          <div className="header-dash"></div>
        </div>

        {/* Shiny Box with Justified Text */}
        <div className="shiny-box">
          <p className="conclusion-text">
            Cargobay AG is a Zurich Airport-based freight forwarding company providing air, sea, road, and rail logistics, along with customs, documentation, and warehousing services. Founded in 2010, it has built a credible presence in the Swiss logistics market through over a decade of operations.
          </p>
          <p className="conclusion-text">
            As Cargobay does not publicly disclose financial data, this report uses industry estimates and an illustrative financial model instead of verified company figures. These estimates are realistic but should not be considered Cargobay's actual financial performance. For accurate financial information, readers should contact the company directly.
          </p>
        </div>

      </div>

      {/* --- FLOATING FOOTER --- */}
      <div className="floating-footer" style={{ transform: 'translate(-50%, 30px)' }}>
        <div className="footer-text">
          Made by <span>Aerox ERP team</span>
        </div>

        <div className="social-links">
          
          {/* ---> PLACE YOUR LINKEDIN URL HERE <--- */}
          <a 
            href="https://www.linkedin.com/company/https-tally.so-r-zxgjgk-utm_source-ig&utm_medium-social&utm_content-link_in_bio&fbclid-paznrzaas0nud/posts/?feedView=all" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="social-icon" 
            aria-label="LinkedIn"
          >
            <svg viewBox="0 0 24 24">
              <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
            </svg>
          </a>

          {/* ---> PLACE YOUR INSTAGRAM URL HERE <--- */}
          <a 
            href="https://www.instagram.com/aerox.erp?igsh=MWhtc3Q0b2ppa2Q1dA==" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="social-icon" 
            aria-label="Instagram"
          >
            <svg viewBox="0 0 24 24">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
            </svg>
          </a>

        </div>
      </div>
    </section>
  );
}