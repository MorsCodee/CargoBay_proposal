import { AlertTriangle, Waves, Plane } from 'lucide-react';

export default function StatsRow() {
  return (
    <div className="stats-row">
      <div className="stat-card">
        <div className="stat-icon rose">
          <AlertTriangle size={18} />
        </div>
        <div className="stat-text">
          <div className="stat-label">Middle East Sea Routes</div>
          <div className="stat-value">
            +5–7 Day Delay <span className="stat-badge rose">MODERATE DELAY</span>
          </div>
        </div>
      </div>

      <div className="stat-card">
        <div className="stat-icon amber">
          <Waves size={18} />
        </div>
        <div className="stat-text">
          <div className="stat-label">Red Sea / Suez Route</div>
          <div className="stat-value">
            +10–14 Day Delay <span className="stat-badge amber">HIGH DELAY</span>
          </div>
        </div>
      </div>

      <div className="stat-card">
        <div className="stat-icon green">
          <Plane size={18} />
        </div>
        <div className="stat-text">
          <div className="stat-label">Air Cargo Routes</div>
          <div className="stat-value">
            Fast &amp; Direct <span className="stat-badge green">SAFE &amp; CLEAR</span>
          </div>
        </div>
      </div>
    </div>
  );
}
