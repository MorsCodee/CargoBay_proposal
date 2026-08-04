import React, { useState } from 'react';
import { 
  Plane, 
  Ship, 
  Truck, 
  Train, 
  Zap, 
  DollarSign, 
  Leaf, 
  ArrowRight, 
  FileCheck
} from 'lucide-react';

const LOCATION_OPTIONS = [
  'Zurich Airport (ZRH), Switzerland',
  'Basel EuroAirport (BSL), Switzerland',
  'Geneva Airport (GVA), Switzerland',
  'Frankfurt Airport (FRA), Germany',
  'Hamburg Port, Germany',
  'Rotterdam Port, Netherlands',
  'Antwerp Port, Belgium',
  'Milan Logistics Hub, Italy',
  'Paris CDG Hub, France',
  'Vienna Logistics Hub, Austria'
];

const ROUTE_DISTANCES = {
  'Zurich Airport (ZRH), Switzerland': {
    'Basel EuroAirport (BSL), Switzerland': 90,
    'Geneva Airport (GVA), Switzerland': 280,
    'Frankfurt Airport (FRA), Germany': 400,
    'Hamburg Port, Germany': 800,
    'Rotterdam Port, Netherlands': 750,
    'Antwerp Port, Belgium': 680,
    'Milan Logistics Hub, Italy': 320,
    'Paris CDG Hub, France': 600,
    'Vienna Logistics Hub, Austria': 730
  },
  'Basel EuroAirport (BSL), Switzerland': {
    'Zurich Airport (ZRH), Switzerland': 90,
    'Geneva Airport (GVA), Switzerland': 250,
    'Frankfurt Airport (FRA), Germany': 330,
    'Hamburg Port, Germany': 760,
    'Rotterdam Port, Netherlands': 640,
    'Antwerp Port, Belgium': 570,
    'Milan Logistics Hub, Italy': 350,
    'Paris CDG Hub, France': 520,
    'Vienna Logistics Hub, Austria': 790
  },
  'Geneva Airport (GVA), Switzerland': {
    'Zurich Airport (ZRH), Switzerland': 280,
    'Basel EuroAirport (BSL), Switzerland': 250,
    'Frankfurt Airport (FRA), Germany': 560,
    'Hamburg Port, Germany': 990,
    'Rotterdam Port, Netherlands': 860,
    'Antwerp Port, Belgium': 780,
    'Milan Logistics Hub, Italy': 380,
    'Paris CDG Hub, France': 510,
    'Vienna Logistics Hub, Austria': 1010
  },
  'Frankfurt Airport (FRA), Germany': {
    'Zurich Airport (ZRH), Switzerland': 400,
    'Basel EuroAirport (BSL), Switzerland': 330,
    'Geneva Airport (GVA), Switzerland': 560,
    'Hamburg Port, Germany': 500,
    'Rotterdam Port, Netherlands': 380,
    'Antwerp Port, Belgium': 400,
    'Milan Logistics Hub, Italy': 660,
    'Paris CDG Hub, France': 570,
    'Vienna Logistics Hub, Austria': 710
  },
  'Hamburg Port, Germany': {
    'Zurich Airport (ZRH), Switzerland': 800,
    'Basel EuroAirport (BSL), Switzerland': 760,
    'Geneva Airport (GVA), Switzerland': 990,
    'Frankfurt Airport (FRA), Germany': 500,
    'Rotterdam Port, Netherlands': 450,
    'Antwerp Port, Belgium': 530,
    'Milan Logistics Hub, Italy': 1120,
    'Paris CDG Hub, France': 740,
    'Vienna Logistics Hub, Austria': 910
  },
  'Rotterdam Port, Netherlands': {
    'Zurich Airport (ZRH), Switzerland': 750,
    'Basel EuroAirport (BSL), Switzerland': 640,
    'Geneva Airport (GVA), Switzerland': 860,
    'Frankfurt Airport (FRA), Germany': 380,
    'Hamburg Port, Germany': 450,
    'Antwerp Port, Belgium': 100,
    'Milan Logistics Hub, Italy': 1050,
    'Paris CDG Hub, France': 430,
    'Vienna Logistics Hub, Austria': 1080
  },
  'Antwerp Port, Belgium': {
    'Zurich Airport (ZRH), Switzerland': 680,
    'Basel EuroAirport (BSL), Switzerland': 570,
    'Geneva Airport (GVA), Switzerland': 780,
    'Frankfurt Airport (FRA), Germany': 400,
    'Hamburg Port, Germany': 530,
    'Rotterdam Port, Netherlands': 100,
    'Milan Logistics Hub, Italy': 980,
    'Paris CDG Hub, France': 340,
    'Vienna Logistics Hub, Austria': 1010
  },
  'Milan Logistics Hub, Italy': {
    'Zurich Airport (ZRH), Switzerland': 320,
    'Basel EuroAirport (BSL), Switzerland': 350,
    'Geneva Airport (GVA), Switzerland': 380,
    'Frankfurt Airport (FRA), Germany': 660,
    'Hamburg Port, Germany': 1120,
    'Rotterdam Port, Netherlands': 1050,
    'Antwerp Port, Belgium': 980,
    'Paris CDG Hub, France': 850,
    'Vienna Logistics Hub, Austria': 860
  },
  'Paris CDG Hub, France': {
    'Zurich Airport (ZRH), Switzerland': 600,
    'Basel EuroAirport (BSL), Switzerland': 520,
    'Geneva Airport (GVA), Switzerland': 510,
    'Frankfurt Airport (FRA), Germany': 570,
    'Hamburg Port, Germany': 740,
    'Rotterdam Port, Netherlands': 430,
    'Antwerp Port, Belgium': 340,
    'Milan Logistics Hub, Italy': 850,
    'Vienna Logistics Hub, Austria': 1230
  },
  'Vienna Logistics Hub, Austria': {
    'Zurich Airport (ZRH), Switzerland': 730,
    'Basel EuroAirport (BSL), Switzerland': 790,
    'Geneva Airport (GVA), Switzerland': 1010,
    'Frankfurt Airport (FRA), Germany': 710,
    'Hamburg Port, Germany': 910,
    'Rotterdam Port, Netherlands': 1080,
    'Antwerp Port, Belgium': 1010,
    'Milan Logistics Hub, Italy': 860,
    'Paris CDG Hub, France': 1230
  }
};

export default function MultimodalOptimizer() {
  const [origin, setOrigin] = useState('Zurich Airport (ZRH), Switzerland');
  const [destination, setDestination] = useState('Hamburg Port, Germany');
  const [weight, setWeight] = useState(500);
  const [volumeCBM, setVolumeCBM] = useState(3.5);
  const [includeCustoms, setIncludeCustoms] = useState(true);

  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);

  const currentDistance = ROUTE_DISTANCES[origin]?.[destination] || 500;

  const calculateRoutes = (e) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      const weightTons = weight / 1000;
      const customsFee = includeCustoms ? 150 : 0; 

      const modes = [
        {
          id: 'air',
          title: 'Air Freight Services',
          sub: 'Global Express & Hub Charter',
          icon: Plane,
          timeHrs: Math.round((currentDistance / 750) + 4),
          costCHF: Math.round((weight * 8.5) + customsFee), 
          co2Kg: Math.round(weightTons * currentDistance * 0.500),
          reliability: '98%'
        },
        {
          id: 'road',
          title: 'Road Freight (Europe)',
          sub: 'Rapid-Response European Trucking',
          icon: Truck,
          timeHrs: Math.round((currentDistance / 65) + 2),
          costCHF: Math.round((currentDistance * 1.85) + customsFee), 
          co2Kg: Math.round(weightTons * currentDistance * 0.105),
          reliability: '94%'
        },
        {
          id: 'rail',
          title: 'Cross-Border Rail Cargo',
          sub: 'Eco-Friendly Overland Logistics',
          icon: Train,
          timeHrs: Math.round((currentDistance / 45) + 10),
          costCHF: Math.round(700 + (currentDistance * 0.85) + customsFee), 
          co2Kg: Math.round(weightTons * currentDistance * 0.028),
          reliability: '92%'
        },
        {
          id: 'sea',
          title: 'Sea Freight Operations',
          sub: 'LCL Consolidated Container Shipping',
          icon: Ship,
          timeHrs: Math.round((currentDistance / 25) + 36),
          costCHF: Math.round((volumeCBM * 165) + customsFee), 
          co2Kg: Math.round(weightTons * currentDistance * 0.015),
          reliability: '89%'
        }
      ];

      // Identify minimums for badge labels across all 4 modes
      const minTime = Math.min(...modes.map(m => m.timeHrs));
      const minCost = Math.min(...modes.map(m => m.costCHF));
      const minCO2 = Math.min(...modes.map(m => m.co2Kg));

      const processedModes = modes.map(mode => {
        let badge = null;
        let badgeBg = '';
        let badgeColor = '';
        let badgeIcon = null;

        if (mode.timeHrs === minTime) {
          badge = 'Fastest Delivery';
          badgeBg = 'rgba(59, 130, 246, 0.2)';
          badgeColor = '#60a5fa';
          badgeIcon = Zap;
        } else if (mode.costCHF === minCost) {
          badge = 'Best Value';
          badgeBg = 'rgba(249, 115, 22, 0.2)';
          badgeColor = '#fb923c';
          badgeIcon = DollarSign;
        } else if (mode.co2Kg === minCO2) {
          badge = 'Lowest Carbon';
          badgeBg = 'rgba(16, 185, 129, 0.2)';
          badgeColor = '#34d399';
          badgeIcon = Leaf;
        }

        return { ...mode, badge, badgeBg, badgeColor, badgeIcon };
      });

      setResults(processedModes);
      setLoading(false);
    }, 400);
  };

  return (
    <div style={{
      width: '100%',
      backgroundColor: '#0b0f17',
      color: '#f1f5f9',
      padding: '48px 24px',
      fontFamily: 'system-ui, -apple-system, sans-serif',
      minHeight: '100vh',
      boxSizing: 'border-box'
    }}>
      <div style={{ maxWidth: '1152px', margin: '0 auto' }}>
        
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <p style={{ fontSize: '12px', fontWeight: '600', letterSpacing: '2px', color: '#60a5fa', textTransform: 'uppercase', marginBottom: '8px' }}>
            — Cargobay Rate Engine
          </p>
          <h2 style={{ fontSize: '32px', fontWeight: '800', color: '#ffffff', margin: '0 0 12px 0' }}>
            MULTIMODAL <span style={{ color: '#f97316' }}>OPTIMIZER.</span>
          </h2>
          <p style={{ color: '#94a3b8', fontSize: '14px', maxWidth: '600px', margin: '0 auto', lineHeight: '1.5' }}>
            Live rate estimates calculated using Cargobay AG estimated quotation metrics (CHF 5–15/kg Air, CHF 1.2–2.5/km Road, CHF 80–250/CBM Sea).
          </p>
        </div>

        {/* Dynamic Calculator Form */}
        <form onSubmit={calculateRoutes} style={{
          backgroundColor: 'rgba(19, 25, 36, 0.8)',
          padding: '28px',
          borderRadius: '16px',
          border: '1px solid #1e293b',
          marginBottom: '48px'
        }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px', marginBottom: '20px' }}>
            
            {/* Origin Dropdown */}
            <div>
              <label style={{ display: 'block', fontSize: '11px', fontWeight: '700', textTransform: 'uppercase', color: '#94a3b8', marginBottom: '8px' }}>
                Origin Hub
              </label>
              <select
                value={origin}
                onChange={(e) => {
                  const newOrigin = e.target.value;
                  setOrigin(newOrigin);
                  if (newOrigin === destination) {
                    const nextAvailable = LOCATION_OPTIONS.find(loc => loc !== newOrigin);
                    setDestination(nextAvailable);
                  }
                }}
                style={{ width: '100%', backgroundColor: '#0b0f17', border: '1px solid #334155', borderRadius: '10px', padding: '12px', color: '#e2e8f0', fontSize: '13px', boxSizing: 'border-box' }}
              >
                {LOCATION_OPTIONS.map((loc) => (
                  <option key={loc} value={loc}>
                    {loc}
                  </option>
                ))}
              </select>
            </div>

            {/* Destination Dropdown */}
            <div>
              <label style={{ display: 'block', fontSize: '11px', fontWeight: '700', textTransform: 'uppercase', color: '#94a3b8', marginBottom: '8px' }}>
                Destination Hub
              </label>
              <select
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                style={{ width: '100%', backgroundColor: '#0b0f17', border: '1px solid #334155', borderRadius: '10px', padding: '12px', color: '#e2e8f0', fontSize: '13px', boxSizing: 'border-box' }}
              >
                {LOCATION_OPTIONS.filter((loc) => loc !== origin).map((loc) => (
                  <option key={loc} value={loc}>
                    {loc}
                  </option>
                ))}
              </select>
            </div>

            {/* Weight Input */}
            <div>
              <label style={{ display: 'block', fontSize: '11px', fontWeight: '700', textTransform: 'uppercase', color: '#94a3b8', marginBottom: '8px' }}>
                Weight (kg)
              </label>
              <input
                type="number"
                min="1"
                value={weight}
                onChange={(e) => setWeight(Number(e.target.value))}
                style={{ width: '100%', backgroundColor: '#0b0f17', border: '1px solid #334155', borderRadius: '10px', padding: '11px 12px', color: '#e2e8f0', fontSize: '14px', boxSizing: 'border-box' }}
                required
              />
            </div>

            {/* Volume CBM Input */}
            <div>
              <label style={{ display: 'block', fontSize: '11px', fontWeight: '700', textTransform: 'uppercase', color: '#94a3b8', marginBottom: '8px' }}>
                Volume (CBM)
              </label>
              <input
                type="number"
                step="0.1"
                min="0.1"
                value={volumeCBM}
                onChange={(e) => setVolumeCBM(Number(e.target.value))}
                style={{ width: '100%', backgroundColor: '#0b0f17', border: '1px solid #334155', borderRadius: '10px', padding: '11px 12px', color: '#e2e8f0', fontSize: '14px', boxSizing: 'border-box' }}
                required
              />
            </div>

          </div>

          {/* Options & Distance Indicator */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px', paddingTop: '16px', borderTop: '1px solid #1e293b' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '13px', color: '#cbd5e1' }}>
              <input
                type="checkbox"
                checked={includeCustoms}
                onChange={(e) => setIncludeCustoms(e.target.checked)}
                style={{ accentColor: '#f97316', width: '16px', height: '16px' }}
              />
              <span>Include Customs Clearance Declaration (+CHF 150)</span>
            </label>

            <div style={{ fontSize: '12px', color: '#94a3b8', backgroundColor: '#0b0f17', padding: '6px 12px', borderRadius: '8px', border: '1px solid #1e293b' }}>
              Calculated Distance: <strong style={{ color: '#f97316' }}>{currentDistance} km</strong>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{
              marginTop: '24px',
              width: '100%',
              background: 'linear-gradient(to right, #f97316, #f59e0b)',
              color: '#ffffff',
              fontWeight: '700',
              padding: '14px',
              borderRadius: '10px',
              border: 'none',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              fontSize: '14px'
            }}
          >
            {loading ? (
              <span>Calculating Live Freight Quotation...</span>
            ) : (
              <>
                <span>Generate Route Comparison</span>
                <ArrowRight size={16} />
              </>
            )}
          </button>
        </form>

        {/* Results Matrix showing all 4 modes */}
        {results && (
          <div>
            <h3 style={{ fontSize: '12px', fontWeight: '600', letterSpacing: '1px', color: '#94a3b8', textTransform: 'uppercase', marginBottom: '24px' }}>
              Optimized Multimodal Strategy Matrix
            </h3>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px' }}>
              {results.map((item) => {
                const IconComponent = item.icon;
                const BadgeIcon = item.badgeIcon;

                return (
                  <div
                    key={item.id}
                    style={{
                      backgroundColor: '#131924',
                      borderRadius: '16px',
                      border: '1px solid #1e293b',
                      padding: '24px',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between'
                    }}
                  >
                    <div>
                      {/* Badge Header */}
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', minHeight: '26px' }}>
                        {item.badge ? (
                          <span style={{
                            backgroundColor: item.badgeBg,
                            color: item.badgeColor,
                            padding: '4px 10px',
                            borderRadius: '6px',
                            fontSize: '11px',
                            fontWeight: '700',
                            textTransform: 'uppercase',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '6px'
                          }}>
                            {BadgeIcon && <BadgeIcon size={14} />}
                            {item.badge}
                          </span>
                        ) : <div />}
                        <span style={{ fontSize: '12px', color: '#64748b' }}>{item.reliability} Reliability</span>
                      </div>

                      {/* Icon + Title */}
                      <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
                        <div style={{ padding: '12px', backgroundColor: 'rgba(30, 41, 59, 0.8)', borderRadius: '12px', color: '#f97316' }}>
                          <IconComponent size={24} />
                        </div>
                        <div>
                          <h4 style={{ fontWeight: '700', color: '#ffffff', fontSize: '16px', margin: 0 }}>{item.title}</h4>
                          <p style={{ fontSize: '12px', color: '#94a3b8', margin: '2px 0 0 0' }}>{item.sub}</p>
                        </div>
                      </div>

                      {/* Metrics */}
                      <div style={{ padding: '16px 0', borderTop: '1px solid #1e293b', fontSize: '14px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                          <span style={{ color: '#94a3b8' }}>Est. Quote Price:</span>
                          <span style={{ fontWeight: '700', color: '#f97316', fontSize: '18px' }}>CHF {item.costCHF.toLocaleString()}</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                          <span style={{ color: '#94a3b8' }}>Transit Duration:</span>
                          <span style={{ fontWeight: '600', color: '#e2e8f0' }}>
                            {item.timeHrs >= 24 ? `${(item.timeHrs / 24).toFixed(1)} days` : `${item.timeHrs} hrs`}
                          </span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                          <span style={{ color: '#94a3b8' }}>Est. CO₂ Footprint:</span>
                          <span style={{ fontWeight: '600', color: '#e2e8f0' }}>{item.co2Kg.toLocaleString()} kg</span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px', color: '#64748b', backgroundColor: 'rgba(19, 25, 36, 0.4)', padding: '14px', borderRadius: '10px', border: '1px solid #1e293b', marginTop: '16px' }}>
              <FileCheck size={16} color="#f97316" />
              <span>Quotes derived from Cargobay AG estimated rate parameters. Includes optional customs clearance (E-Dec / Carnet ATA).</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}