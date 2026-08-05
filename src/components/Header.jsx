import ThemeToggle from './ThemeToggle';

export default function Header() {
  return (
    <header className="page-header">
      <div style={{ position: 'absolute', top: '1.25rem', right: '1.25rem', zIndex: 10 }}>
        <ThemeToggle />
      </div>
      <div className="eyebrow">
        <span className="eyebrow-dot"></span>
        CargoBay AG &nbsp;•&nbsp; Swiss Freight &amp; Logistics Helper
      </div>
      <h1 className="page-title">
        CARGOBAY <span className="hl">ASSISTANT</span>
      </h1>
      <p className="page-subtitle">
        Simple &amp; easy shipping answers! Instant prices, fast route recommendations, and delay warnings in plain words.
      </p>
    </header>
  );
}
