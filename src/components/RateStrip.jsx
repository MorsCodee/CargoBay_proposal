import { Plane, Truck, Ship } from 'lucide-react';

export default function RateStrip() {
  return (
    <div className="rate-strip">
      <div className="rate-item">
        <Plane size={14} className="rate-icon" /> Air (Fastest): <strong>CHF 5–15 / kg</strong>
      </div>
      <span className="rate-sep">|</span>
      <div className="rate-item">
        <Truck size={14} className="rate-icon" /> Road: <strong>CHF 1.2–2.5 / km</strong>
      </div>
      <span className="rate-sep">|</span>
      <div className="rate-item">
        <Ship size={14} className="rate-icon" /> Sea (Cheapest): <strong>CHF 80–250 / m³</strong>
      </div>
    </div>
  );
}
