import { useState } from 'react';

const COLORS = ['#f97316', '#22d3ee', '#a78bfa', '#fb923c'];
const PARTICLE_COUNT = 22;

function createParticles() {
  return Array.from({ length: PARTICLE_COUNT }, (_, index) => {
    const size = Math.random() * 2 + 1.5;
    return {
      id: index,
      style: {
        left: `${Math.random() * 100}vw`,
        width: `${size}px`,
        height: `${size}px`,
        background: COLORS[Math.floor(Math.random() * COLORS.length)],
        animationDuration: `${Math.random() * 14 + 10}s`,
        animationDelay: `${Math.random() * 12}s`,
      },
    };
  });
}

export default function BackgroundCanvas() {
  const [particles] = useState(createParticles);

  return (
    <div className="bg-canvas">
      <div className="bg-grid"></div>
      <div className="blob blob-1"></div>
      <div className="blob blob-2"></div>
      <div className="blob blob-3"></div>
      <div className="particles">
        {particles.map((p) => (
          <div key={p.id} className="particle" style={p.style} />
        ))}
      </div>
    </div>
  );
}


