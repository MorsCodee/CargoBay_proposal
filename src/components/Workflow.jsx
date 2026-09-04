import React, { useState } from "react";

const palette = {
  bg: "#0A0B0F",
  panel: "#14161D",
  border: "#22242F",
  accent: "#F2863C",
  accentSoft: "rgba(242,134,60,0.14)",
  text: "#F3F4F6",
  muted: "#8B8F9C",
};

const steps = [
  {
    number: "01",
    title: "Enter shipment details",
    description: "Add origin, destination, weight and cargo category.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
        <rect x="6" y="3" width="12" height="18" rx="2" />
        <path d="M9 3V2a1 1 0 011-1h4a1 1 0 011 1v1" />
        <line x1="9" y1="9" x2="15" y2="9" />
        <line x1="9" y1="13" x2="15" y2="13" />
        <line x1="9" y1="17" x2="12.5" y2="17" />
      </svg>
    ),
  },
  {
    number: "02",
    title: "AI evaluates every mode",
    description: "Air, sea, road and rail are scored against your shipment in real time.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="9" />
        <circle cx="12" cy="12" r="5" />
        <circle cx="12" cy="12" r="1.4" fill="currentColor" stroke="none" />
        <line x1="12" y1="3" x2="12" y2="1" />
      </svg>
    ),
  },
  {
    number: "03",
    title: "Get a ranked recommendation",
    description: "Compare fastest, cheapest and greenest options before you book.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="12" width="4.5" height="9" rx="1" />
        <rect x="9.75" y="7" width="4.5" height="14" rx="1" />
        <rect x="16.5" y="3" width="4.5" height="18" rx="1" />
      </svg>
    ),
    chips: ["Fastest", "Cheapest", "Greenest"],
  },
];

function Node({ number }) {
  return (
    <div
      style={{
        width: 34,
        height: 34,
        borderRadius: "50%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: palette.panel,
        border: `1px solid ${palette.border}`,
        color: palette.accent,
        fontFamily: "'Sora', sans-serif",
        fontWeight: 600,
        fontSize: 13,
        flexShrink: 0,
      }}
    >
      {number}
    </div>
  );
}

function FlowTrack({ vertical = false, hidden = false }) {
  return (
    <div
      style={{
        position: "relative",
        overflow: "hidden",
        opacity: hidden ? 0 : 1,
        ...(vertical
          ? { width: 1, flex: 1, margin: "8px 0" }
          : { height: 2, flex: 1 }),
        background: vertical
          ? `linear-gradient(180deg, transparent, ${palette.border} 8%, ${palette.border} 92%, transparent)`
          : `linear-gradient(90deg, transparent, ${palette.border} 8%, ${palette.border} 92%, transparent)`,
      }}
    >
      <div
        className={vertical ? "cbw-sweep-v" : "cbw-sweep-h"}
        style={{
          position: "absolute",
          background: vertical
            ? `linear-gradient(180deg, transparent, ${palette.accent}, transparent)`
            : `linear-gradient(90deg, transparent, ${palette.accent}, transparent)`,
          opacity: 0.9,
          ...(vertical
            ? { left: 0, width: "100%", height: "40%" }
            : { top: 0, height: "100%", width: "40%" }),
        }}
      />
    </div>
  );
}

function StepCard({ step, compact = false }) {
  const [hover, setHover] = useState(false);
  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        background: palette.panel,
        border: `1px solid ${hover ? "rgba(242,134,60,0.4)" : palette.border}`,
        borderRadius: 14,
        padding: compact ? 20 : 24,
        transform: hover ? "translateY(-2px)" : "translateY(0)",
        transition: "border-color 0.2s ease, transform 0.2s ease",
      }}
    >
      <div
        style={{
          width: 40,
          height: 40,
          borderRadius: 10,
          background: palette.accentSoft,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: palette.accent,
          marginBottom: compact ? 16 : 20,
        }}
      >
        {step.icon}
      </div>
      <h3
        style={{
          fontFamily: "'Sora', sans-serif",
          fontWeight: 600,
          fontSize: compact ? 16 : 18,
          margin: compact ? "0 0 6px 0" : "0 0 8px 0",
          color: palette.text,
        }}
      >
        {step.title}
      </h3>
      <p
        style={{
          fontSize: 14,
          lineHeight: 1.65,
          color: palette.muted,
          margin: step.chips ? "0 0 16px 0" : 0,
        }}
      >
        {step.description}
      </p>
      {step.chips && (
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
          {step.chips.map((chip) => (
            <span
              key={chip}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
                padding: "5px 10px",
                borderRadius: 999,
                border: `1px solid ${palette.border}`,
                fontSize: 12,
                color: palette.muted,
              }}
            >
              <span
                style={{
                  width: 6,
                  height: 6,
                  borderRadius: "50%",
                  background: palette.accent,
                }}
              />
              {chip}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

export default function CargoBayWorkflow() {
  return (
    <section style={{ background: palette.bg, color: palette.text, fontFamily: "'Inter', sans-serif" }}>
      {/* keyframes + the desktop/mobile switch — the only two things that can't be inline styles */}
      <style>{`
        @keyframes cbwSweepH { 0% { left: -40%; } 100% { left: 100%; } }
        @keyframes cbwSweepV { 0% { top: -40%; } 100% { top: 100%; } }
        .cbw-sweep-h { left: -40%; animation: cbwSweepH 4.5s ease-in-out infinite; }
        .cbw-sweep-v { top: -40%; animation: cbwSweepV 4.5s ease-in-out infinite; }
        @media (prefers-reduced-motion: reduce) {
          .cbw-sweep-h, .cbw-sweep-v { animation: none; opacity: 0.5; }
        }
        .cbw-desktop { display: none; }
        .cbw-mobile { display: block; }
        @media (min-width: 768px) {
          .cbw-desktop { display: block; }
          .cbw-mobile { display: none; }
        }
      `}</style>

      <div style={{ maxWidth: 1152, margin: "0 auto", padding: "80px 24px" }}>

        {/* Eyebrow + heading */}
        <div style={{ maxWidth: 640, marginBottom: 64 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
            <span style={{ width: 24, height: 1, background: palette.accent }} />
            <span style={{ fontSize: 12, letterSpacing: "0.18em", textTransform: "uppercase", color: palette.accent }}>
              How CargoBay Works
            </span>
          </div>
          <h2
            style={{
              fontFamily: "'Sora', sans-serif",
              fontSize: 34,
              lineHeight: 1.15,
              fontWeight: 600,
              margin: "0 0 16px 0",
              color: palette.text,
            }}
          >
            Three steps from shipment details to a routing decision
          </h2>
          <p style={{ fontSize: 15, lineHeight: 1.65, color: palette.muted, margin: 0 }}>
            Enter a few details about your shipment and the engine compares every mode
            to return a ranked plan in seconds.
          </p>
        </div>

        {/* Desktop flow */}
        <div className="cbw-desktop">
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 32, alignItems: "center", marginBottom: 24 }}>
            {steps.map((step, i) => (
              <div key={step.number} style={{ display: "flex", alignItems: "center", gap: 16 }}>
                <Node number={step.number} />
                <FlowTrack hidden={i === steps.length - 1} />
              </div>
            ))}
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 32 }}>
            {steps.map((step) => (
              <StepCard key={step.number} step={step} />
            ))}
          </div>
        </div>

        {/* Mobile flow */}
        <div className="cbw-mobile">
          <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
            {steps.map((step, i) => (
              <div key={step.number} style={{ display: "flex", gap: 20 }}>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                  <Node number={step.number} />
                  {i !== steps.length - 1 && <FlowTrack vertical />}
                </div>
                <div style={{ flex: 1 }}>
                  <StepCard step={step} compact />
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
