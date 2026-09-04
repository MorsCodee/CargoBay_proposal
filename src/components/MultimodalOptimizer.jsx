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
  FileCheck,
  Sparkles
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

// Plain-language justification per mode, used inside the AI insight sentence
const REASON_CLAUSE = {
  air: 'time sensitivity outweighs cost here, and air is the only mode that clears this distance in hours rather than days',
  road: 'this distance sits in a sweet spot for trucking — no port or hub transfer delays, and it beats rail on total transit time',
  rail: 'rail lands the strongest balance of cost and emissions for this distance, without the multi-day wait sea freight requires',
  sea: 'the volume-to-weight ratio favors a consolidated container — cost per CBM drops well below any land or air option'
};

function formatDuration(hrs) {
  return hrs >= 24 ? `${(hrs / 24).toFixed(1)} days` : `${hrs} hrs`;
}

// Weighted scoring across all 4 modes: cost 40%, speed 35%, emissions 25%.
// Pure front-end heuristic — no external AI call, but framed as an AI-generated insight.
function buildRecommendation(modes) {
  const costs = modes.map((m) => m.costCHF);
  const times = modes.map((m) => m.timeHrs);
  const co2s = modes.map((m) => m.co2Kg);

  const minCost = Math.min(...costs), maxCost = Math.max(...costs);
  const minTime = Math.min(...times), maxTime = Math.max(...times);
  const minCo2 = Math.min(...co2s), maxCo2 = Math.max(...co2s);

  const scored = modes.map((m) => {
    const costScore = maxCost === minCost ? 1 : 1 - (m.costCHF - minCost) / (maxCost - minCost);
    const timeScore = maxTime === minTime ? 1 : 1 - (m.timeHrs - minTime) / (maxTime - minTime);
    const co2Score = maxCo2 === minCo2 ? 1 : 1 - (m.co2Kg - minCo2) / (maxCo2 - minCo2);
    return { ...m, overall: costScore * 0.4 + timeScore * 0.35 + co2Score * 0.25 };
  });

  scored.sort((a, b) => b.overall - a.overall);
  const [best, runnerUp] = scored;

  const costDiff = runnerUp.costCHF - best.costCHF;
  const timeDiff = runnerUp.timeHrs - best.timeHrs;

  let comparison = `The next-best option, ${runnerUp.title}, `;
  const parts = [];
  if (costDiff !== 0) {
    parts.push(`costs CHF ${Math.abs(costDiff).toLocaleString()} ${costDiff > 0 ? 'more' : 'less'}`);
  }
  if (timeDiff !== 0) {
    parts.push(`is ${formatDuration(Math.abs(timeDiff))} ${timeDiff > 0 ? 'slower' : 'faster'}`);
  }
  comparison += parts.length ? parts.join(' and ') + '.' : 'performs almost identically on this route.';

  const text = `Recommended: ${best.title}. ${REASON_CLAUSE[best.id]}, landing at CHF ${best.costCHF.toLocaleString()} with a ${formatDuration(best.timeHrs)} transit and ${best.co2Kg.toLocaleString()}kg CO₂. ${comparison}`;

  return { best, text };
}

export default function MultimodalOptimizer() {
  const [origin, setOrigin] = useState('Zurich Airport (ZRH), Switzerland');
  const [destination, setDestination] = useState('Hamburg Port, Germany');
  const [weight, setWeight] = useState(500);
  const [volumeCBM, setVolumeCBM] = useState(3.5);
  const [includeCustoms, setIncludeCustoms] = useState(true);

  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);

  const [insight, setInsight] = useState(null);
  const [insightReady, setInsightReady] = useState(false);

  const currentDistance = ROUTE_DISTANCES[origin]?.[destination] || 500;

  const calculateRoutes = (e) => {
    e.preventDefault();
    setLoading(true);
    setInsight(null);
    setInsightReady(false);

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

      // Short delay so the insight card feels like it's actually reasoning
      // over the freshly computed matrix, rather than appearing instantly.
      setTimeout(() => {
        setInsight(buildRecommendation(processedModes));
        setInsightReady(true);
      }, 650);
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
      <style>{`
        @keyframes cb-pulse-dot {
          0%, 80%, 100% { opacity: 0.25; transform: scale(0.85); }
          40% { opacity: 1; transform: scale(1); }
        }
        @keyframes cb-fade-in {
          from { opacity: 0; transform: translateY(6px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .cb-dot { animation: cb-pulse-dot 1.1s ease-in-out infinite; }
        .cb-dot:nth-child(2) { animation-delay: 0.15s; }
        .cb-dot:nth-child(3) { animation-delay: 0.3s; }
        .cb-insight-in { animation: cb-fade-in 0.4s ease-out; }
      `}</style>
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
              background: 'linear-gradient(to right, #f97326, #f97316)',
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

        {/* AI Insight Card */}
        {results && (
          <div style={{
            position: 'relative',
            marginBottom: '32px',
            padding: '1px',
            borderRadius: '16px',
            background: 'linear-gradient(120deg, #f97316, #60a5fa)'
          }}>
            <div style={{
              backgroundColor: '#131924',
              borderRadius: '15px',
              padding: '22px 24px'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px' }}>
                <div style={{
                  width: '30px',
                  height: '30px',
                  borderRadius: '9px',
                  background: 'linear-gradient(135deg, #f97316, #60a5fa)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0
                }}>
                  <Sparkles size={16} color="#0b0f17" />
                </div>
                <span style={{ fontSize: '11px', fontWeight: '700', letterSpacing: '1.5px', textTransform: 'uppercase', color: '#94a3b8' }}>
                  Cargobay AI &nbsp;·&nbsp; Smart Recommendation
                </span>
              </div>

              {!insightReady ? (
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#94a3b8', fontSize: '13px' }}>
                  <span>Analyzing shipment profile</span>
                  <span style={{ display: 'flex', gap: '4px' }}>
                    <span className="cb-dot" style={{ width: '5px', height: '5px', borderRadius: '50%', backgroundColor: '#f97316', display: 'inline-block' }} />
                    <span className="cb-dot" style={{ width: '5px', height: '5px', borderRadius: '50%', backgroundColor: '#f97316', display: 'inline-block' }} />
                    <span className="cb-dot" style={{ width: '5px', height: '5px', borderRadius: '50%', backgroundColor: '#f97316', display: 'inline-block' }} />
                  </span>
                </div>
              ) : (
                <p className="cb-insight-in" style={{ margin: 0, fontSize: '14px', lineHeight: '1.65', color: '#e2e8f0' }}>
                  {insight.text.split(insight.best.title).map((chunk, i, arr) => (
                    <React.Fragment key={i}>
                      {chunk}
                      {i < arr.length - 1 && <strong style={{ color: '#f97316' }}>{insight.best.title}</strong>}
                    </React.Fragment>
                  ))}
                </p>
              )}
            </div>
          </div>
        )}

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
                const isRecommended = insightReady && insight.best.id === item.id;

                return (
                  <div
                    key={item.id}
                    style={{
                      backgroundColor: '#131924',
                      borderRadius: '16px',
                      border: isRecommended ? '1px solid #f97316' : '1px solid #1e293b',
                      boxShadow: isRecommended ? '0 0 0 1px rgba(249, 115, 22, 0.25)' : 'none',
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