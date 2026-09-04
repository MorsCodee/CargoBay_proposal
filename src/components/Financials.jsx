import React, { useState, useRef, useEffect } from "react";
import {
  BarChart,
  Bar,
  Cell,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import BgImg from './bg.jpeg';
import solvency from './solvency.png';
import revenue from './trends.png';

/* ------------------------------------------------------------------
   WEAKNESSES & RISKS DATA
------------------------------------------------------------------- */
const RISKS_DATA = [
  {
    title: "No public financial disclosure",
    description:
      "As a private Swiss SME, Cargobay's actual revenue, profitability, and financial health are not independently verifiable from public information.",
  },
  {
    title: "Asset-light dependency on carrier partners",
    description:
      "Because Cargobay does not own its own aircraft, ships, or extensive truck fleet, its service reliability is partly dependent on the capacity and performance of third-party carrier partners, particularly during periods of global shipping or air-cargo capacity constraints.",
  },
  {
    title: "Exposure to global trade and freight-rate volatility",
    description:
      "Freight forwarding revenue is sensitive to global trade volumes, fuel costs, and freight rate fluctuations — cyclical risks common to the entire logistics industry, not specific to Cargobay.",
  },
  {
    title: "Competitive Swiss/European freight forwarding market",
    description:
      "Cargobay operates in a market with numerous established freight forwarders based at Zurich Airport and across Switzerland and Europe, requiring continuous service differentiation.",
  },
  {
    title: "Currency risk",
    description:
      "As a Swiss company invoicing in CHF for internationally priced freight services (often benchmarked in USD or EUR globally), Cargobay carries some inherent currency exposure typical of the freight forwarding industry.",
  },
];

/* ------------------------------------------------------------------
   SINGLE SOURCE OF TRUTH
   Both the stacked bar chart and the table below read from this one
   array. Edit values here and everything updates together.
------------------------------------------------------------------- */
const REVENUE_ROWS = [
  { key: "airFreight", label: "Air Freight Revenue", 2021: 1850, 2022: 2350, 2023: 2950, 2024: 3650, 2025: 4450 },
  { key: "seaFreight", label: "Sea Freight Revenue", 2021: 1200, 2022: 1550, 2023: 1950, 2024: 2400, 2025: 2900 },
  { key: "roadFreight", label: "Road Freight Revenue", 2021: 950, 2022: 1250, 2023: 1650, 2024: 2050, 2025: 2550 },
  { key: "railFreight", label: "Rail Freight Revenue", 2021: 420, 2022: 520, 2023: 650, 2024: 780, 2025: 950 },
  { key: "customs", label: "Customs & Documentation", 2021: 280, 2022: 360, 2023: 450, 2024: 580, 2025: 700 },
  { key: "warehousing", label: "Warehousing & Other Services", 2021: 300, 2022: 400, 2023: 520, 2024: 670, 2025: 850 },
];

const YEARS = [2021, 2022, 2023, 2024, 2025];

/* Stack order (bottom -> top), each tied to its row key + a CSS var for color */
const SEGMENTS = [
  { key: "airFreight", name: "Air Freight", color: "var(--color-air)" },
  { key: "seaFreight", name: "Sea Freight", color: "var(--color-sea)" },
  { key: "roadFreight", name: "Road Freight", color: "var(--color-road)" },
  { key: "railFreight", name: "Rail Freight", color: "var(--color-rail)" },
  { key: "customs", name: "Customs & Docs", color: "var(--color-customs)" },
  { key: "warehousing", name: "Warehousing & Other", color: "var(--color-warehousing)" },
];

const BAR_RADIUS = 0; // corner radius applied to the outer edges of the stack

/* Chart data is derived from REVENUE_ROWS -- one row per year, one field per segment */
function buildChartData() {
  return YEARS.map((year) => {
    const entry = { year };
    REVENUE_ROWS.forEach((row) => {
      entry[row.key] = row[year];
    });
    return entry;
  });
}

function formatNumber(n) {
  return n.toLocaleString("en-US");
}

function getYearTotal(year) {
  return REVENUE_ROWS.reduce((sum, row) => sum + row[year], 0);
}

/* ------------------------------------------------------------------
   Second chart: Gross Profit vs Net Profit, grouped (not stacked) bars,
   one bar per metric per year. Same single-source-of-truth pattern as
   the revenue table/chart above.
------------------------------------------------------------------- */
const PROFIT_ROWS = [
  { key: "grossProfit", label: "Gross Profit", 2021: 1350, 2022: 1790, 2023: 2350, 2024: 2990, 2025: 3780 },
  { key: "netProfit", label: "Net Profit", 2021: 148, 2022: 340, 2023: 588, 2024: 868, 2025: 1212 },
];

const PROFIT_SEGMENTS = [
  { key: "grossProfit", name: "Gross Profit", color: "var(--color-sea)" },
  { key: "netProfit", name: "Net Profit", color: "var(--color-warehousing)" },
];

function buildProfitChartData() {
  return YEARS.map((year) => {
    const entry = { year };
    PROFIT_ROWS.forEach((row) => {
      entry[row.key] = row[year];
    });
    return entry;
  });
}

/* ------------------------------------------------------------------
   Detailed income statement table (matches the source research report).
   "subtotal" rows render bold with a navy label; "expense" rows render
   their (negative) value in red; "final" is the bottom-line Net Profit,
   bold and green like the source table.
------------------------------------------------------------------- */
const INCOME_STATEMENT_ROWS = [
  { label: "Total Revenue", type: "subtotal", values: { 2021: 5000, 2022: 6430, 2023: 8170, 2024: 10130, 2025: 12400 } },
  { label: "Cost of Services", type: "expense", values: { 2021: -3650, 2022: -4640, 2023: -5820, 2024: -7140, 2025: -8620 } },
  { label: "Gross Profit", type: "subtotal", values: { 2021: 1350, 2022: 1790, 2023: 2350, 2024: 2990, 2025: 3780 } },
  { label: "Salaries & Employee Benefits", type: "expense", values: { 2021: -650, 2022: -760, 2023: -900, 2024: -1050, 2025: -1250 } },
  { label: "Marketing & Sales", type: "expense", values: { 2021: -120, 2022: -150, 2023: -190, 2024: -240, 2025: -300 } },
  { label: "Administrative Expenses", type: "expense", values: { 2021: -220, 2022: -250, 2023: -290, 2024: -340, 2025: -400 } },
  { label: "IT & Office Expenses", type: "expense", values: { 2021: -90, 2022: -105, 2023: -120, 2024: -145, 2025: -170 } },
  { label: "Depreciation", type: "expense", values: { 2021: -60, 2022: -70, 2023: -80, 2024: -90, 2025: -100 } },
  { label: "Operating Profit (EBIT)", type: "subtotal", values: { 2021: 210, 2022: 455, 2023: 770, 2024: 1125, 2025: 1560 } },
  { label: "Finance Costs", type: "expense", values: { 2021: -25, 2022: -30, 2023: -35, 2024: -40, 2025: -45 } },
  { label: "Profit Before Tax", type: "subtotal", values: { 2021: 185, 2022: 425, 2023: 735, 2024: 1085, 2025: 1515 } },
  { label: "Income Tax (20%)", type: "expense", values: { 2021: -37, 2022: -85, 2023: -147, 2024: -217, 2025: -303 } },
  { label: "Net Profit", type: "final", values: { 2021: 148, 2022: 340, 2023: 588, 2024: 868, 2025: 1212 } },
];

/* ------------------------------------------------------------------
   Third chart: Margin Trends (% of Revenue) as a multi-line chart.
------------------------------------------------------------------- */
const MARGIN_ROWS = [
  { key: "grossMargin", label: "Gross Margin", 2021: 27.0, 2022: 27.8, 2023: 28.8, 2024: 29.5, 2025: 30.5 },
  { key: "operatingMargin", label: "Operating Margin", 2021: 4.2, 2022: 7.1, 2023: 9.4, 2024: 11.1, 2025: 12.6 },
  { key: "netMargin", label: "Net Margin", 2021: 3.0, 2022: 5.3, 2023: 7.2, 2024: 8.6, 2025: 9.8 },
  { key: "returnonAssets", label: "Return on Assets (ROA)", 2021: 4.9, 2022: 8.8, 2023: 11.9, 2024: 14.1, 2025: 16.2 },
  { key: "returnonEquity", label: "Return on Equity (ROE)", 2021: 8.2, 2022: 14.6, 2023: 18.5, 2024: 21.3, 2025: 23.8 },
];

const MARGIN_SEGMENTS = [
  { key: "grossMargin", name: "Gross Margin", color: "var(--color-air)" },
  { key: "operatingMargin", name: "Operating Margin", color: "var(--color-warehousing)" },
  { key: "netMargin", name: "Net Margin", color: "var(--color-rail)" },
];

const MARGIN_SEGMENTS_1 = [
  { key: "grossMargin", name: "Gross Margin", color: "var(--color-air)" },
  { key: "operatingMargin", name: "Operating Margin", color: "var(--color-warehousing)" },
  { key: "netMargin", name: "Net Margin", color: "var(--color-rail)" },
  { key: "returnonAssets", name: "Return on Assets (ROA)", color: "var(--color-sea)" },
  { key: "returnonEquity", name: "Return on Equity (ROE)", color: "var(--color-customs)" },
];

function buildMarginChartData() {
  return YEARS.map((year) => {
    const entry = { year };
    MARGIN_ROWS.forEach((row) => {
      entry[row.key] = row[year];
    });
    return entry;
  });
}

function formatPercent(n) {
  return `${n.toFixed(1)}%`;
}

/* ------------------------------------------------------------------
   Fourth chart: Liquidity Trends (% of Revenue) as a multi-line chart.
------------------------------------------------------------------- */
const LIQUIDITY_ROWS = [
  { key: "grossLiquidity", label: "Gross Liquidity", 2021: 2.10, 2022: 2.18, 2023: 2.24, 2024: 2.31, 2025: 2.38 },
  { key: "operatingLiquidity", label: "Operating Liquidity", 2021: 1.78, 2022: 1.84, 2023: 1.90, 2024: 1.95, 2025: 2.01 },
  { key: "netLiquidity", label: "Net Liquidity", 2021: 0.62, 2022: 0.68, 2023: 0.73, 2024: 0.79, 2025: 0.86 },
];

const LIQUIDITY_SEGMENTS = [
  { key: "grossLiquidity", name: "Gross Liquidity", color: "var(--color-air)" },
  { key: "operatingLiquidity", name: "Operating Liquidity", color: "var(--color-warehousing)" },
  { key: "netLiquidity", name: "Net Liquidity", color: "var(--color-rail)" },
];

function buildLiquidityChartData() {
  return YEARS.map((year) => {
    const entry = { year };
    LIQUIDITY_ROWS.forEach((row) => {
      entry[row.key] = row[year];
    });
    return entry;
  });
}

/* ------------------------------------------------------------------
   Fifth chart: Efficiency, Solvency & Coverage Ratios.
------------------------------------------------------------------- */
const EFFICIENCY_ROWS = [
  { key: "totalAssetTurnover", label: "Total Asset Turnover", 2021: 1.66, 2022: 1.67, 2023: 1.65, 2024: 1.64, 2025: 1.65 },
  { key: "fixedAssetTurnover", label: "Fixed Asset Turnover", 2021: 4.00, 2022: 4.12, 2023: 4.18, 2024: 4.25, 2025: 4.34 },
  { key: "receivableTurnover", label: "Receivable Turnover", 2021: 8.3, 2022: 8.5, 2023: 8.8, 2024: 9.0, 2025: 9.3 },
];

const EFFICIENCY_SEGMENTS = [
  { key: "totalAssetTurnover", name: "Total Asset Turnover", color: "var(--color-rail)" },
  { key: "fixedAssetTurnover", name: "Fixed Asset Turnover", color: "var(--color-customs)" },
  { key: "receivableTurnover", name: "Receivable Turnover", color: "var(--color-warehousing)" },
];

function buildEfficiencyChartData() {
  return YEARS.map((year) => {
    const entry = { year };
    EFFICIENCY_ROWS.forEach((row) => {
      entry[row.key] = row[year];
    });
    return entry;
  });
}

function formatRatio(n) {
  return n.toFixed(2);
}

/* ------------------------------------------------------------------
   Sixth chart: Solvency Ratios. 
------------------------------------------------------------------- */
const SOLVENCY_ROWS = [
  { key: "debtToAssets", label: "Debt-to-Assets", 2021: 0.40, 2022: 0.39, 2023: 0.38, 2024: 0.37, 2025: 0.36 },
  { key: "debtToEquity", label: "Debt-to-Equity", 2021: 0.67, 2022: 0.64, 2023: 0.61, 2024: 0.59, 2025: 0.56 },
  { key: "equityRatio", label: "Equity Ratio", 2021: 0.60, 2022: 0.61, 2023: 0.62, 2024: 0.63, 2025: 0.64 },
];

const SOLVENCY_SEGMENTS = [
  { key: "debtToAssets", name: "Debt-to-Assets", color: "var(--color-rail)" },
  { key: "debtToEquity", name: "Debt-to-Equity", color: "var(--color-customs)" },
  { key: "equityRatio", name: "Equity Ratio", color: "var(--color-warehousing)" },
];

function buildSolvencyChartData() {
  return YEARS.map((year) => {
    const entry = { year };
    SOLVENCY_ROWS.forEach((row) => {
      entry[row.key] = row[year];
    });
    return entry;
  });
}

/* ------------------------------------------------------------------
   Seventh chart: Coverage Ratios.
------------------------------------------------------------------- */
const COVERAGE_ROWS = [
  { key: "interestCoverage", label: "Interest Coverage (EBIT ÷ Finance Cost)", 2021: 8.4, 2022: 15.2, 2023: 22.0, 2024: 28.1, 2025: 34.7 },
  { key: "operatingCashFlowRatio", label: "Operating Cash Flow Ratio", 2021: 0.82, 2022: 0.90, 2023: 1.02, 2024: 1.14, 2025: 1.28 },
  { key: "cashFlowToTotalDebt", label: "Cash Flow to Total Debt", 2021: 0.26, 2022: 0.31, 2023: 0.38, 2024: 0.46, 2025: 0.54 },
];

const COVERAGE_SEGMENTS = [
  { key: "interestCoverage", name: "Interest Coverage (EBIT ÷ Finance Cost)", color: "var(--color-rail)" },
  { key: "operatingCashFlowRatio", name: "Operating Cash Flow Ratio", color: "var(--color-customs)" },
  { key: "cashFlowToTotalDebt", name: "Cash Flow to Total Debt", color: "var(--color-warehousing)" },
];

const COVERAGE_SEGMENTS_1 = [
  { key: "operatingCashFlowRatio", name: "Operating Cash Flow Ratio", color: "var(--color-customs)" },
  { key: "cashFlowToTotalDebt", name: "Cash Flow to Total Debt", color: "var(--color-warehousing)" },
];

function buildCoverageChartData() {
  return YEARS.map((year) => {
    const entry = { year };
    COVERAGE_ROWS.forEach((row) => {
      entry[row.key] = row[year];
    });
    return entry;
  });
}

/* ------------------------------------------------------------------
   Shared floating tooltip for the line charts.
------------------------------------------------------------------- */
function LineTooltipBox({ hovered, formatter }) {
  if (!hovered) return null;
  return (
    <div className="cb-tooltip" style={{ left: hovered.x, top: hovered.y, borderColor: hovered.color }}>
      <div className="cb-tooltip__year">{hovered.year}</div>
      <div className="cb-tooltip__row">
        <span className="cb-tooltip__swatch" style={{ background: hovered.color }} />
        <span className="cb-tooltip__name">{hovered.name}</span>
      </div>
      <div className="cb-tooltip__value" style={{ color: hovered.color }}>
        {formatter(hovered.value)}
      </div>
    </div>
  );
}

/* Custom dot component */
function HoverDot(props) {
  const { cx, cy, payload, dataKey, seg, hovered, onHover, onLeave } = props;
  if (cx == null || cy == null) return null;
  const isActive = hovered && hovered.key === seg.key && hovered.year === payload.year;
  return (
    <g
      onMouseEnter={() =>
        onHover({
          key: seg.key,
          name: seg.name,
          color: seg.color,
          value: payload[dataKey],
          year: payload.year,
          x: cx,
          y: cy,
        })
      }
      onMouseLeave={onLeave}
      style={{ cursor: "pointer" }}
    >
      <circle cx={cx} cy={cy} r={12} fill="transparent" />
      <circle
        cx={cx}
        cy={cy}
        r={isActive ? 6 : 4}
        fill={seg.color}
        stroke="var(--color-surface)"
        strokeWidth={2}
        style={{ transition: "r 150ms ease" }}
      />
    </g>
  );
}

/* Custom dropdown */
function MetricDropdown({ options, value, onChange }) {
  const [open, setOpen] = useState(false);
  const wrapRef = useRef(null);
  const selected = options.find((o) => o.key === value) || options[0];

  useEffect(() => {
    function handleClickOutside(e) {
      if (wrapRef.current && !wrapRef.current.contains(e.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="cb-dropdown" ref={wrapRef}>
      <button
        type="button"
        className="cb-dropdown__button"
        data-open={open}
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        <span className="cb-dropdown__swatch" style={{ background: selected.color }} />
        <span>{selected.name}</span>
        <svg className="cb-dropdown__chevron" width="14" height="14" viewBox="0 0 24 24" fill="none">
          <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {open && (
        <ul className="cb-dropdown__menu" role="listbox">
          {options.map((opt) => (
            <li key={opt.key} role="option" aria-selected={opt.key === value}>
              <button
                type="button"
                className={"cb-dropdown__item" + (opt.key === value ? " is-active" : "")}
                onClick={() => {
                  onChange(opt.key);
                  setOpen(false);
                }}
              >
                <span className="cb-dropdown__swatch" style={{ background: opt.color }} />
                {opt.name}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default function CargobayRevenue() {
  const chartData = buildChartData();
  const [hovered, setHovered] = useState(null);
  const chartWrapRef = useRef(null);

  const profitChartData = buildProfitChartData();
  const [hoveredProfit, setHoveredProfit] = useState(null);
  const profitChartWrapRef = useRef(null);

  const marginChartData = buildMarginChartData();
  const [hoveredMargin, setHoveredMargin] = useState(null);

  const liquidityChartData = buildLiquidityChartData();
  const [hoveredLiquidity, setHoveredLiquidity] = useState(null);

  const efficiencyChartData = buildEfficiencyChartData();
  const [selectedEfficiencyMetric, setSelectedEfficiencyMetric] = useState(EFFICIENCY_SEGMENTS[0].key);
  const selectedEfficiencySeg = EFFICIENCY_SEGMENTS.find((s) => s.key === selectedEfficiencyMetric);
  const [hoveredEfficiency, setHoveredEfficiency] = useState(null);

  const solvencyChartData = buildSolvencyChartData();
  const [selectedSolvencyMetric, setSelectedSolvencyMetric] = useState(SOLVENCY_SEGMENTS[0].key);
  const selectedSolvencySeg = SOLVENCY_SEGMENTS.find((s) => s.key === selectedSolvencyMetric);
  const [hoveredSolvency, setHoveredSolvency] = useState(null);

  const coverageChartData = buildCoverageChartData();
  const [selectedCoverageMetric, setSelectedCoverageMetric] = useState(COVERAGE_SEGMENTS_1[0].key);
  const selectedCoverageSeg = COVERAGE_SEGMENTS.find((s) => s.key === selectedCoverageMetric);
  const [hoveredCoverage, setHoveredCoverage] = useState(null);

  function handleSegmentEnter(seg, row, event) {
    const container = chartWrapRef.current;
    if (!container || !event || typeof event.clientX !== "number") return;
    const rect = container.getBoundingClientRect();
    setHovered({
      key: seg.key,
      name: seg.name,
      color: seg.color,
      value: row[seg.key] || 0,
      year: row.year,
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
    });
  }

  function handleSegmentLeave() {
    setHovered(null);
  }

  function handleProfitSegmentEnter(seg, row, event) {
    const container = profitChartWrapRef.current;
    if (!container || !event || typeof event.clientX !== "number") return;
    const rect = container.getBoundingClientRect();
    setHoveredProfit({
      key: seg.key,
      name: seg.name,
      color: seg.color,
      value: row[seg.key] || 0,
      year: row.year,
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
    });
  }

  function handleProfitSegmentLeave() {
    setHoveredProfit(null);
  }

  return (
    <div className="cb-root">
      <style>{`
        :root {
        /* ---- Palette ---- */
        --color-ink: #D8DCE6;
        --color-air: #A8DADC;
        --color-sea: #037171;
        --color-road: #C99A4A;
        --color-rail: #414288;
        --color-customs: #5CA084;
        --color-warehousing: #D86326;
        --color-card-title: var(--color-warehousing);

        --color-bg: #0B0C10;
        --color-surface: #000000;
        --color-border: #2C303E;
        --color-text: #D8DCE6;
        --color-text-muted: #868EA3;

        --color-highlight: #D8763F;
        --color-warehousing-light: #332720;

        --font-heading: 'Poppins', 'Segoe UI', sans-serif;
        --font-body: 'Inter', 'Segoe UI', sans-serif;

        --radius: 0px;
        --max-content-width: 1200px;

        --shadow-card: 0 20px 45px -12px rgba(15, 35, 64, 0.18);
        --shadow-card-hover: 0 20px 45px -12px rgba(214, 73, 51, 0.35);
        --shadow-tooltip: 0 12px 28px -6px rgba(15, 35, 64, 0.28);

        --section-padding-desktop: 80px;
        --section-padding-mobile: 48px;
        --horizontal-padding-desktop: 64px;
        --horizontal-padding-mobile: 24px;
      }

        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@500;600;700&family=Inter:wght@400;500;600;700&display=swap');

        .cb-root {
          font-family: var(--font-body);
          background: var(--color-bg);
          color: var(--color-text);
          width: 100%;
          box-sizing: border-box;
        }

        .cb-root::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-size: cover;
          background-position: center;
          opacity: 0.15;
          filter: brightness(0.7) contrast(1.1);
          pointer-events: none;
          z-index: 0;
        }

        .cb-root *, .cb-root *::before, .cb-root *::after {
          box-sizing: border-box;
        }

        .financial-content-wrapper {
          position: relative;
          z-index: 1;
          max-width: var(--max-content-width);
          margin: 0 auto;
          padding: var(--section-padding-desktop) var(--horizontal-padding-desktop);
          width: 100%;
        }

        @media (max-width: 750px) {
          .financial-content-wrapper {
            padding: var(--section-padding-mobile) var(--horizontal-padding-mobile);
          }
        }

        .cb-eyebrow {
          font-family: var(--font-heading);
          font-size: 13px;
          font-weight: 600;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--color-sea);
          margin: 0 0 8px;
        }

        .cb-title {
          font-family: var(--font-heading);
          font-size: 28px;
          font-weight: 600;
          color: var(--color-ink);
          margin: 0 0 6px;
          margin-bottom: 30px;
        }
        .cb-title.cb-title-1 {
          margin-top: 100px;
        }

        .cb-subtitle {
          font-size: 15px;
          color: var(--color-text-muted);
          margin: 0 0 32px;
        }

        .cb-stripe {
          height: 6px;
          border-radius: var(--radius);
          overflow: hidden;
          display: flex;
          margin-bottom: 32px;
        }
        .cb-stripe span { flex: 1; }

        .cb-card {
          background: var(--color-surface);
          border: 2px solid var(--color-border);
          border-radius: var(--radius);
          padding: 32px;
          margin-bottom: 40px;
          box-shadow: var(--shadow-card);
          transition: border-color 180ms ease, box-shadow 180ms ease;
        }
        .cb-card:hover {
          border-color: var(--color-highlight);
          box-shadow: var(--shadow-card-hover);
        }
        .cb-card.cb-card-1 {
          margin-top: 80px;
        }
        .cb-card.cb-card-2 {
          margin-top: 40px;
        }

        .cb-chart-heading {
          text-align: center;
          color: #ffffff;
          font-family: var(--font-heading);
          font-weight: 600;
          font-size: 21px;
          padding: 16px 24px;
          border-radius: 0px;
          background: var(--color-warehousing);
          box-shadow: 0 8px 20px -6px rgba(15, 35, 64, 0.3);
          margin-bottom: 40px;
        }

        .cb-chart-wrap {
          width: 100%;
          height: 420px;
          position: relative;
        }

        .cb-select-row {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          margin-bottom: 20px;
        }

        .cb-select-label {
          color: var(--color-text);
          font-family: var(--font-heading);
          font-weight: 500;
          font-size: 16px;
        }

        .cb-dropdown {
          position: relative;
          display: inline-block;
        }
        .cb-dropdown__button {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 10px 16px;
          border-radius: var(--radius);
          border: 2px solid var(--color-border);
          background: var(--color-surface);
          color: var(--color-text);
          font-family: var(--font-heading);
          font-weight: 500;
          font-size: 15px;
          cursor: pointer;
          transition: border-color 150ms ease, box-shadow 150ms ease;
        }
        .cb-dropdown__button:hover,
        .cb-dropdown__button[data-open="true"] {
          border-color: var(--color-highlight);
          box-shadow: var(--shadow-card-hover);
        }
        .cb-dropdown__chevron {
          color: var(--color-text-muted);
          transition: transform 150ms ease;
          flex-shrink: 0;
        }
        .cb-dropdown__button[data-open="true"] .cb-dropdown__chevron {
          transform: rotate(180deg);
        }
        .cb-dropdown__menu {
          position: absolute;
          top: calc(100% + 8px);
          left: 0;
          min-width: 100%;
          background: var(--color-surface);
          border: 2px solid var(--color-border);
          border-radius: var(--radius);
          box-shadow: var(--shadow-card-hover);
          padding: 6px;
          margin: 0;
          list-style: none;
          max-height: 280px;
          overflow-y: auto;
          z-index: 20;
        }
        .cb-dropdown__item {
          display: flex;
          align-items: center;
          gap: 8px;
          width: 100%;
          padding: 9px 10px;
          border-radius: 0px;
          border: none;
          background: transparent;
          color: var(--color-text);
          font-family: var(--font-body);
          font-size: 14px;
          text-align: left;
          white-space: nowrap;
          cursor: pointer;
          transition: background-color 120ms ease;
        }
        .cb-dropdown__item:hover,
        .cb-dropdown__item.is-active {
          background: var(--color-warehousing-light);
        }

        .cb-tooltip {
          position: absolute;
          transform: translate(-50%, calc(-100% - 14px));
          background: var(--color-surface);
          color: var(--color-text);
          border-radius: 0px;
          border: 2px solid var(--color-border);
          padding: 12px 16px;
          font-size: 13px;
          min-width: 160px;
          box-shadow: var(--shadow-tooltip);
          pointer-events: none;
          z-index: 5;
          white-space: nowrap;
        }
        .cb-tooltip__year {
          font-family: var(--font-heading);
          font-weight: 600;
          margin-bottom: 8px;
          font-size: 13px;
          color: var(--color-text-muted);
        }
        .cb-tooltip__row {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 6px;
        }
        .cb-tooltip__swatch {
          width: 10px;
          height: 10px;
          border-radius: 0px;
          flex-shrink: 0;
        }
        .cb-tooltip__name {
          font-weight: 500;
        }
        .cb-tooltip__value {
          font-family: var(--font-heading);
          font-weight: 700;
          font-size: 20px;
        }

        .cb-legend {
          display: grid;
          grid-template-columns: repeat(6, auto);
          justify-content: center;
          gap: 10px 24px;
          margin-top: 20px;
          font-size: 15px;
          color: var(--color-text-muted);
        }
        .cb-legend__item {
          display: flex;
          align-items: center;
          gap: 6px;
          white-space: nowrap;
        }
        .cb-legend__swatch {
          width: 10px;
          height: 10px;
          border-radius: 0px;
          flex-shrink: 0;
        }
        @media (max-width: 900px) {
          .cb-legend { grid-template-columns: repeat(3, auto); }
        }
        @media (max-width: 600px) {
          .cb-legend { grid-template-columns: repeat(2, auto); }
        }

        .cb-table-card {
          background: var(--color-surface);
          border: 2px solid var(--color-border);
          border-radius: var(--radius);
          overflow: hidden;
          box-shadow: var(--shadow-card);
          transition: border-color 180ms ease, box-shadow 180ms ease;
        }
        .cb-table-card:hover {
          border-color: var(--color-highlight);
          box-shadow: var(--shadow-card-hover);
        }

        .cb-table-header { padding: 20px 24px 0; }
        .cb-table-scroll {
          overflow-x: auto;
          -webkit-overflow-scrolling: touch;
          padding: 20px 24px 24px;
        }

        .cb-table {
          width: 100%;
          min-width: 620px;
          border-collapse: separate;
          font-size: 15px;
        }

        .cb-table thead th {
          font-family: var(--font-heading);
          font-weight: 600;
          font-size: 16px;
          text-align: right;
          color: #fff;
          background: var(--color-warehousing);
          padding: 12px 16px;
          white-space: nowrap;
        }
        .cb-table thead th:first-child {
          text-align: left;
          border-top-left-radius: 0px;
        }
        .cb-table thead th:last-child {
          border-top-right-radius: 0px;
        }

        .cb-table tbody td {
          padding: 12px 16px;
          text-align: right;
          white-space: nowrap;
          border-bottom: 1px solid var(--color-border);
          background: var(--color-surface);
          transition: background-color 150ms ease;
        }
        .cb-table tbody td:first-child {
          text-align: left;
          font-weight: 500;
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .cb-table tbody tr:hover td,
        .cb-table tfoot tr:hover td {
          background: var(--color-warehousing-light);
        }

        .cb-swatch {
          width: 10px;
          height: 10px;
          border-radius: 0px;
          flex-shrink: 0;
        }

        .cb-table tfoot td {
          padding: 12px 16px;
          text-align: right;
          font-family: var(--font-heading);
          font-weight: 700;
          color: var(--color-text);
          background: var(--color-surface);
          border-top: 2px solid var(--color-warehousing);
        }
        .cb-table tfoot td:first-child { text-align: left; }

        .cb-is-caption {
          font-size: 13px;
          font-style: italic;
          color: var(--color-text-muted);
          margin: 0 0 4px;
        }

        .cb-is-table tbody tr.cb-is-row--subtotal td {
          font-weight: 700;
          color: var(--color-highlight);
        }
        .cb-is-table tbody tr.cb-is-row--subtotal td:first-child {
          color: var(--color-highlight);
        }
        .cb-is-table tbody tr.cb-is-row--final td {
          font-weight: 700;
          color: #1E9E5A;
          border-top: 2px solid var(--color-warehousing);
        }
        .cb-is-table tbody td.cb-is-negative {
          color: #D64933;
        }

        /* ---- WEAKNESSES & RISKS STYLES ---- */
        .cb-risks-section-container {
          margin-bottom: 60px;
        }
        .cb-risks-list {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 16px;
        }
        .cb-risk-card {
          background: var(--color-surface);
          border: 1px solid var(--color-border);
          border-left: 4px solid #D64933;
          padding: 20px;
          transition: border-color 180ms ease, background-color 180ms ease;
        }
        .cb-risk-card:hover {
          background: rgba(255, 255, 255, 0.03);
          border-color: var(--color-highlight);
        }
        .cb-risk-header {
          font-family: var(--font-heading);
          font-weight: 600;
          font-size: 16px;
          color: #FFFFFF;
          margin-bottom: 8px;
        }
        .cb-risk-body {
          font-size: 15px;
          line-height: 1.5;
          color: var(--color-text-muted);
        }

        @media (max-width: 600px) {
          .cb-card { padding: 20px; }
          .cb-chart-wrap { height: 300px; }
          .cb-title { font-size: 22px; }
        }

        .portfolio-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 30px;
          width: 100%;
          margin-bottom: 24px;
          box-sizing: border-box;     
          margin-top: 60px;     
        }

        @media (max-width: 900px) {
          .portfolio-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 700px) {
          .portfolio-grid { grid-template-columns: 1fr; }
        }

        .financial-strength-card {
          background: rgba(255, 255, 255, 0.07);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border: 1px solid rgba(255, 255, 255, 0.15);
          border-top: 1px solid rgba(255, 255, 255, 0.3);
          border-left: 1px solid rgba(255, 255, 255, 0.3);
          box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.37);
          position: relative;
          overflow: hidden;
          padding: 20px;
          display: flex;
          flex-direction: column;
          justify-content: flex-start;
          text-align: left;
          color: #FFFFFF;
          box-sizing: border-box;
          opacity: 1;
        }

        .financial-strength-card::after {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 45%;
          background: linear-gradient(
            to bottom,
            rgba(255, 255, 255, 0.15) 0%,
            rgba(255, 255, 255, 0) 100%
          );
          pointer-events: none;
        }

        .financial-card-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 12px;
        }

        .financial-strength-title {
          font-family: var(--font-heading, sans-serif);
          font-weight: bold;
          font-size: 22px;
          margin: 0;
          color: var(--color-card-title, var(--color-warehousing));
          text-shadow: 0 1px 2px rgba(0, 0, 0, 0.5);
          text-align: left;
        }

        .financial-card-icon {
          width: 60px;
          height: 60px;
          object-fit: contain;
        }

        .financial-strength-list {
          margin: 0;
          padding-left: 20px;
          list-style-type: disc;
          list-style-position: outside;
          text-align: left;
        }

        .financial-strength-list li {
          font-size: 16px;
          line-height: 1.4;
          font-weight: 400;
          margin-bottom: 6px;
          color: rgba(255, 255, 255, 0.9);
        }

        .financial-strength-list li::marker {
          color: var(--color-card-title, var(--color-warehousing));
        }

        .financial-main-title {
          font-family: var(--font-heading);
          font-weight: bold;
          font-size: 50px;
          color: var(--color-text-heading-1, #FFFFFF);
          line-height: 1.2;
          margin-bottom: 48px;
          margin-top: 10px;
          text-align: left;
        }

        .financial-main-title-2 {
          color: var(--color-warehousing);
        }

        .financial-section {
          position: relative;
          overflow: hidden;
          width: 100%;
          margin-left: 0;
          padding: 0;
          border-top: 1px solid var(--color-border);
          border-bottom: 1px solid var(--color-border);
          background-image: var(--bg-img);
          background-attachment: fixed;
          background-position: center;
          background-repeat: no-repeat;
          background-size: cover;
          background-color: rgba(0, 0, 0, 0.85);
          background-blend-mode: overlay;
        }

        .financial-section::before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-image: var(--bg-img);
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;
          background-attachment: fixed;
          opacity: 0.15;
          filter: brightness(0.6);
          pointer-events: none;
          z-index: 0;
        }

        .financial-section > * {
          position: relative;
          z-index: 1;
        }
      `}</style>

      <div className="financial-section" style={{ '--bg-img': `url("${BgImg}")` }}>
        <div className="financial-content-wrapper">
          
          {/* ---------------- 7.1 WEAKNESSES & RISKS SECTION ---------------- */}
          <div className="cb-risks-section-container">
            <h1 className="financial-main-title">
              Weaknesses & <span className="financial-main-title-2">Risks</span>
            </h1>

            <h2 className="cb-title">7.1 Industry-Typical Risk Factors</h2>

            <div className="cb-stripe">
              {SEGMENTS.map((s) => (
                <span key={s.key} style={{ background: s.color }} />
              ))}
            </div>

            <ul className="cb-risks-list">
              {RISKS_DATA.map((risk, idx) => (
                <li key={idx} className="cb-risk-card">
                  <div className="cb-risk-header">• {risk.title}</div>
                  <div className="cb-risk-body">{risk.description}</div>
                </li>
              ))}
            </ul>
          </div>

          {/* ---------------- FINANCIAL ANALYSIS SECTION ---------------- */}
          <h1 className="financial-main-title">
            Financial <span className="financial-main-title-2">Analysis</span>
          </h1>

          <h2 className="cb-title">Estimated 5-Year Income Statement</h2>

          <div className="cb-stripe">
            {SEGMENTS.map((s) => (
              <span key={s.key} style={{ background: s.color }} />
            ))}
          </div>

          {/* ---------------- CHART ---------------- */}
          <div className="cb-card">
            <div className="cb-chart-heading">Revenue by Segment</div>
            <div className="cb-chart-wrap" ref={chartWrapRef}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={chartData}
                  margin={{ top: 8, right: 8, left: 0, bottom: 0 }}
                  barCategoryGap="35%"
                >
                  <CartesianGrid stroke="var(--color-border)" vertical={false} />
                  <XAxis
                    dataKey="year"
                    tick={{ fill: "var(--color-text-muted)", fontSize: 13, fontFamily: "var(--font-body)" }}
                    axisLine={{ stroke: "var(--color-border)" }}
                    tickLine={false}
                  />
                  <YAxis
                    tick={{ fill: "var(--color-text-muted)", fontSize: 13, fontFamily: "var(--font-body)" }}
                    axisLine={false}
                    tickLine={false}
                    width={56}
                  />
                  {SEGMENTS.map((seg, idx) => {
                    const isBottom = idx === 0;
                    const isTop = idx === SEGMENTS.length - 1;
                    const radius = isTop
                      ? [BAR_RADIUS, BAR_RADIUS, 0, 0]
                      : isBottom
                      ? [0, 0, BAR_RADIUS, BAR_RADIUS]
                      : [0, 0, 0, 0];
                    return (
                      <Bar key={seg.key} dataKey={seg.key} stackId="revenue" radius={radius} maxBarSize={72}>
                        {chartData.map((row) => (
                          <Cell
                            key={`${seg.key}-${row.year}`}
                            fill={seg.color}
                            opacity={
                              hovered && hovered.year === row.year && hovered.key !== seg.key ? 0.35 : 1
                            }
                            style={{ transition: "opacity 150ms ease", cursor: "pointer" }}
                            onMouseEnter={(...args) =>
                              handleSegmentEnter(seg, row, args[args.length - 1])
                            }
                            onMouseLeave={handleSegmentLeave}
                          />
                        ))}
                      </Bar>
                    );
                  })}
                </BarChart>
              </ResponsiveContainer>

              {hovered && (
                <div
                  className="cb-tooltip"
                  style={{
                    left: hovered.x,
                    top: hovered.y,
                    borderColor: hovered.color,
                  }}
                >
                  <div className="cb-tooltip__year">{hovered.year}</div>
                  <div className="cb-tooltip__row">
                    <span className="cb-tooltip__swatch" style={{ background: hovered.color }} />
                    <span className="cb-tooltip__name">{hovered.name}</span>
                  </div>
                  <div className="cb-tooltip__value" style={{ color: hovered.color }}>
                    {formatNumber(hovered.value)}
                  </div>
                </div>
              )}
            </div>

            <div className="cb-legend">
              {SEGMENTS.map((seg) => (
                <div className="cb-legend__item" key={seg.key}>
                  <span className="cb-legend__swatch" style={{ background: seg.color }} />
                  <span>{seg.name}</span>
                </div>
              ))}
            </div>
          </div>

          {/* ---------------- TABLE ---------------- */}
          <div className="cb-table-card">
            <div className="cb-table-header"></div>
            <div className="cb-table-scroll">
              <table className="cb-table">
                <thead>
                  <tr>
                    <th>Particulars</th>
                    {YEARS.map((y) => (
                      <th key={y}>{y}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {REVENUE_ROWS.map((row) => {
                    const seg = SEGMENTS.find((s) => s.key === row.key);
                    return (
                      <tr key={row.key}>
                        <td>
                          <span className="cb-swatch" style={{ background: seg ? seg.color : "var(--color-ink)" }} />
                          {row.label}
                        </td>
                        {YEARS.map((y) => (
                          <td key={y}>{formatNumber(row[y])}</td>
                        ))}
                      </tr>
                    );
                  })}
                </tbody>
                <tfoot>
                  <tr>
                    <td>Total Revenue</td>
                    {YEARS.map((y) => (
                      <td key={y}>{formatNumber(getYearTotal(y))}</td>
                    ))}
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>

          {/* ---------------- PROFIT CHART (grouped bars) ---------------- */}
          <div className="cb-card cb-card-1">
            <div className="cb-chart-heading">Gross Profit vs Net Profit</div>
            <div className="cb-chart-wrap" ref={profitChartWrapRef}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={profitChartData}
                  margin={{ top: 8, right: 8, left: 0, bottom: 0 }}
                  barCategoryGap="35%"
                  barGap={8}
                >
                  <CartesianGrid stroke="var(--color-border)" vertical={false} />
                  <XAxis
                    dataKey="year"
                    tick={{ fill: "var(--color-text-muted)", fontSize: 13, fontFamily: "var(--font-body)" }}
                    axisLine={{ stroke: "var(--color-border)" }}
                    tickLine={false}
                  />
                  <YAxis
                    tick={{ fill: "var(--color-text-muted)", fontSize: 13, fontFamily: "var(--font-body)" }}
                    axisLine={false}
                    tickLine={false}
                    width={56}
                  />
                  {PROFIT_SEGMENTS.map((seg) => (
                    <Bar key={seg.key} dataKey={seg.key} radius={[BAR_RADIUS, BAR_RADIUS, 0, 0]} maxBarSize={72}>
                      {profitChartData.map((row) => (
                        <Cell
                          key={`${seg.key}-${row.year}`}
                          fill={seg.color}
                          opacity={
                            hoveredProfit && hoveredProfit.year === row.year && hoveredProfit.key !== seg.key
                              ? 0.35
                              : 1
                          }
                          style={{ transition: "opacity 150ms ease", cursor: "pointer" }}
                          onMouseEnter={(...args) =>
                            handleProfitSegmentEnter(seg, row, args[args.length - 1])
                          }
                          onMouseLeave={handleProfitSegmentLeave}
                        />
                      ))}
                    </Bar>
                  ))}
                </BarChart>
              </ResponsiveContainer>

              {hoveredProfit && (
                <div
                  className="cb-tooltip"
                  style={{
                    left: hoveredProfit.x,
                    top: hoveredProfit.y,
                    borderColor: hoveredProfit.color,
                  }}
                >
                  <div className="cb-tooltip__year">{hoveredProfit.year}</div>
                  <div className="cb-tooltip__row">
                    <span className="cb-tooltip__swatch" style={{ background: hoveredProfit.color }} />
                    <span className="cb-tooltip__name">{hoveredProfit.name}</span>
                  </div>
                  <div className="cb-tooltip__value" style={{ color: hoveredProfit.color }}>
                    {formatNumber(hoveredProfit.value)}
                  </div>
                </div>
              )}
            </div>

            <div className="cb-legend">
              {PROFIT_SEGMENTS.map((seg) => (
                <div className="cb-legend__item" key={seg.key}>
                  <span className="cb-legend__swatch" style={{ background: seg.color }} />
                  <span>{seg.name}</span>
                </div>
              ))}
            </div>
          </div>

          {/* ---------------- INCOME STATEMENT DETAIL TABLE ---------------- */}
          <div className="cb-table-card">
            <div className="cb-table-header"></div>
            <div className="cb-table-scroll">
              <table className="cb-table cb-is-table">
                <thead>
                  <tr>
                    <th>Particulars</th>
                    {YEARS.map((y) => (
                      <th key={y}>{y}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {INCOME_STATEMENT_ROWS.map((row) => (
                    <tr key={row.label} className={`cb-is-row--${row.type}`}>
                      <td>{row.label}</td>
                      {YEARS.map((y) => (
                        <td key={y} className={row.values[y] < 0 ? "cb-is-negative" : ""}>
                          {row.values[y] < 0
                            ? `(${formatNumber(Math.abs(row.values[y]))})`
                            : formatNumber(row.values[y])}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <h2 className="cb-title cb-title-1">Estimated Profitability Ratios</h2>

          <div className="cb-stripe">
            {SEGMENTS.map((s) => (
              <span key={s.key} style={{ background: s.color }} />
            ))}
          </div>

          {/* ---------------- MARGIN TRENDS (line chart) ---------------- */}
          <div className="cb-card">
            <div className="cb-chart-heading">Margin Trends</div>
            <div className="cb-chart-wrap">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={marginChartData} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
                  <CartesianGrid stroke="var(--color-border)" vertical={false} />
                  <XAxis
                    dataKey="year"
                    tick={{ fill: "var(--color-text-muted)", fontSize: 13, fontFamily: "var(--font-body)" }}
                    axisLine={{ stroke: "var(--color-border)" }}
                    tickLine={false}
                  />
                  <YAxis
                    tickFormatter={(v) => `${v}%`}
                    tick={{ fill: "var(--color-text-muted)", fontSize: 13, fontFamily: "var(--font-body)" }}
                    axisLine={false}
                    tickLine={false}
                    width={56}
                  />
                  {MARGIN_SEGMENTS.map((seg) => (
                    <Line
                      key={seg.key}
                      type="monotone"
                      dataKey={seg.key}
                      name={seg.name}
                      stroke={seg.color}
                      strokeWidth={3}
                      dot={(dotProps) => (
                        <HoverDot
                          key={`${seg.key}-${dotProps.payload.year}`}
                          {...dotProps}
                          seg={seg}
                          hovered={hoveredMargin}
                          onHover={setHoveredMargin}
                          onLeave={() => setHoveredMargin(null)}
                        />
                      )}
                      activeDot={false}
                      isAnimationActive={false}
                    />
                  ))}
                </LineChart>
              </ResponsiveContainer>

              <LineTooltipBox hovered={hoveredMargin} formatter={formatPercent} />
            </div>

            <div className="cb-legend">
              {MARGIN_SEGMENTS.map((seg) => (
                <div className="cb-legend__item" key={seg.key}>
                  <span className="cb-legend__swatch" style={{ background: seg.color }} />
                  <span>{seg.name}</span>
                </div>
              ))}
            </div>
          </div>

          {/* ---------------- TABLE ---------------- */}
          <div className="cb-table-card">
            <div className="cb-table-header"></div>
            <div className="cb-table-scroll">
              <table className="cb-table">
                <thead>
                  <tr>
                    <th>Particulars</th>
                    {YEARS.map((y) => (
                      <th key={y}>{y}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {MARGIN_ROWS.map((row) => {
                    const seg = MARGIN_SEGMENTS_1.find((s) => s.key === row.key);
                    return (
                      <tr key={row.key}>
                        <td>
                          <span className="cb-swatch" style={{ background: seg ? seg.color : "var(--color-ink)" }} />
                          {row.label}
                        </td>
                        {YEARS.map((y) => (
                          <td key={y}>{formatNumber(row[y])}</td>
                        ))}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          <h2 className="cb-title cb-title-1">Estimated Liquidity Ratios</h2>

          <div className="cb-stripe">
            {SEGMENTS.map((s) => (
              <span key={s.key} style={{ background: s.color }} />
            ))}
          </div>

          {/* ---------------- LIQUIDITY TRENDS (line chart) ---------------- */}
          <div className="cb-card">
            <div className="cb-chart-heading">Liquidity Trends</div>
            <div className="cb-chart-wrap">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={liquidityChartData} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
                  <CartesianGrid stroke="var(--color-border)" vertical={false} />
                  <XAxis
                    dataKey="year"
                    tick={{ fill: "var(--color-text-muted)", fontSize: 13, fontFamily: "var(--font-body)" }}
                    axisLine={{ stroke: "var(--color-border)" }}
                    tickLine={false}
                  />
                  <YAxis
                    tick={{ fill: "var(--color-text-muted)", fontSize: 13, fontFamily: "var(--font-body)" }}
                    axisLine={false}
                    tickLine={false}
                    width={56}
                  />
                  {LIQUIDITY_SEGMENTS.map((seg) => (
                    <Line
                      key={seg.key}
                      type="monotone"
                      dataKey={seg.key}
                      name={seg.name}
                      stroke={seg.color}
                      strokeWidth={3}
                      dot={(dotProps) => (
                        <HoverDot
                          key={`${seg.key}-${dotProps.payload.year}`}
                          {...dotProps}
                          seg={seg}
                          hovered={hoveredLiquidity}
                          onHover={setHoveredLiquidity}
                          onLeave={() => setHoveredLiquidity(null)}
                        />
                      )}
                      activeDot={false}
                      isAnimationActive={false}
                    />
                  ))}
                </LineChart>
              </ResponsiveContainer>

              <LineTooltipBox hovered={hoveredLiquidity} formatter={formatRatio} />
            </div>

            <div className="cb-legend">
              {LIQUIDITY_SEGMENTS.map((seg) => (
                <div className="cb-legend__item" key={seg.key}>
                  <span className="cb-legend__swatch" style={{ background: seg.color }} />
                  <span>{seg.name}</span>
                </div>
              ))}
            </div>
          </div>

          {/* ---------------- TABLE ---------------- */}
          <div className="cb-table-card">
            <div className="cb-table-header"></div>
            <div className="cb-table-scroll">
              <table className="cb-table">
                <thead>
                  <tr>
                    <th>Particulars</th>
                    {YEARS.map((y) => (
                      <th key={y}>{y}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {LIQUIDITY_ROWS.map((row) => {
                    const seg = LIQUIDITY_SEGMENTS.find((s) => s.key === row.key);
                    return (
                      <tr key={row.key}>
                        <td>
                          <span className="cb-swatch" style={{ background: seg ? seg.color : "var(--color-ink)" }} />
                          {row.label}
                        </td>
                        {YEARS.map((y) => (
                          <td key={y}>{formatNumber(row[y])}</td>
                        ))}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          <h2 className="cb-title cb-title-1">Efficiency, Solvency & Coverage Ratios</h2>

          <div className="cb-stripe">
            {SEGMENTS.map((s) => (
              <span key={s.key} style={{ background: s.color }} />
            ))}
          </div>

          {/* ---------------- EFFICIENCY / SOLVENCY / COVERAGE (dropdown line chart) ---------------- */}
          <div className="cb-card">
            <div className="cb-chart-heading">Efficiency Trends</div>

            <div className="cb-select-row">
              <span className="cb-select-label">Metric:</span>
              <MetricDropdown
                options={EFFICIENCY_SEGMENTS}
                value={selectedEfficiencyMetric}
                onChange={setSelectedEfficiencyMetric}
              />
            </div>

            <div className="cb-chart-wrap">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={efficiencyChartData} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
                  <CartesianGrid stroke="var(--color-border)" vertical={false} />
                  <XAxis
                    dataKey="year"
                    tick={{ fill: "var(--color-text-muted)", fontSize: 13, fontFamily: "var(--font-body)" }}
                    axisLine={{ stroke: "var(--color-border)" }}
                    tickLine={false}
                  />
                  <YAxis
                    tick={{ fill: "var(--color-text-muted)", fontSize: 13, fontFamily: "var(--font-body)" }}
                    axisLine={false}
                    tickLine={false}
                    width={56}
                  />
                  <Line
                    type="monotone"
                    dataKey={selectedEfficiencyMetric}
                    name={selectedEfficiencySeg.name}
                    stroke={selectedEfficiencySeg.color}
                    strokeWidth={3}
                    dot={(dotProps) => (
                      <HoverDot
                        key={`${selectedEfficiencySeg.key}-${dotProps.payload.year}`}
                        {...dotProps}
                        seg={selectedEfficiencySeg}
                        hovered={hoveredEfficiency}
                        onHover={setHoveredEfficiency}
                        onLeave={() => setHoveredEfficiency(null)}
                      />
                    )}
                    activeDot={false}
                    isAnimationActive={false}
                  />
                </LineChart>
              </ResponsiveContainer>

              <LineTooltipBox hovered={hoveredEfficiency} formatter={formatRatio} />
            </div>
          </div>

          {/* ---------------- TABLE ---------------- */}
          <div className="cb-table-card">
            <div className="cb-table-header"></div>
            <div className="cb-table-scroll">
              <table className="cb-table">
                <thead>
                  <tr>
                    <th>Particulars</th>
                    {YEARS.map((y) => (
                      <th key={y}>{y}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {EFFICIENCY_ROWS.map((row) => {
                    const seg = EFFICIENCY_SEGMENTS.find((s) => s.key === row.key);
                    return (
                      <tr key={row.key}>
                        <td>
                          <span className="cb-swatch" style={{ background: seg ? seg.color : "var(--color-ink)" }} />
                          {row.label}
                        </td>
                        {YEARS.map((y) => (
                          <td key={y}>{formatRatio(row[y])}</td>
                        ))}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* ---------------- SOLVENCY (dropdown line chart) ---------------- */}
          <div className="cb-card cb-card-1">
            <div className="cb-chart-heading">Solvency Trends</div>

            <div className="cb-select-row">
              <span className="cb-select-label">Metric:</span>
              <MetricDropdown
                options={SOLVENCY_SEGMENTS}
                value={selectedSolvencyMetric}
                onChange={setSelectedSolvencyMetric}
              />
            </div>

            <div className="cb-chart-wrap">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={solvencyChartData} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
                  <CartesianGrid stroke="var(--color-border)" vertical={false} />
                  <XAxis
                    dataKey="year"
                    tick={{ fill: "var(--color-text-muted)", fontSize: 13, fontFamily: "var(--font-body)" }}
                    axisLine={{ stroke: "var(--color-border)" }}
                    tickLine={false}
                  />
                  <YAxis
                    tick={{ fill: "var(--color-text-muted)", fontSize: 13, fontFamily: "var(--font-body)" }}
                    axisLine={false}
                    tickLine={false}
                    width={56}
                  />
                  <Line
                    type="monotone"
                    dataKey={selectedSolvencyMetric}
                    name={selectedSolvencySeg.name}
                    stroke={selectedSolvencySeg.color}
                    strokeWidth={3}
                    dot={(dotProps) => (
                      <HoverDot
                        key={`${selectedSolvencySeg.key}-${dotProps.payload.year}`}
                        {...dotProps}
                        seg={selectedSolvencySeg}
                        hovered={hoveredSolvency}
                        onHover={setHoveredSolvency}
                        onLeave={() => setHoveredSolvency(null)}
                      />
                    )}
                    activeDot={false}
                    isAnimationActive={false}
                  />
                </LineChart>
              </ResponsiveContainer>

              <LineTooltipBox hovered={hoveredSolvency} formatter={formatRatio} />
            </div>
          </div>

          {/* ---------------- TABLE ---------------- */}
          <div className="cb-table-card">
            <div className="cb-table-header"></div>
            <div className="cb-table-scroll">
              <table className="cb-table">
                <thead>
                  <tr>
                    <th>Particulars</th>
                    {YEARS.map((y) => (
                      <th key={y}>{y}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {SOLVENCY_ROWS.map((row) => {
                    const seg = SOLVENCY_SEGMENTS.find((s) => s.key === row.key);
                    return (
                      <tr key={row.key}>
                        <td>
                          <span className="cb-swatch" style={{ background: seg ? seg.color : "var(--color-ink)" }} />
                          {row.label}
                        </td>
                        {YEARS.map((y) => (
                          <td key={y}>{formatRatio(row[y])}</td>
                        ))}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* ---------------- COVERAGE (dropdown line chart) ---------------- */}
          <div className="cb-card cb-card-1">
            <div className="cb-chart-heading">Coverage Trends</div>

            <div className="cb-select-row">
              <span className="cb-select-label">Metric:</span>
              <MetricDropdown
                options={COVERAGE_SEGMENTS_1}
                value={selectedCoverageMetric}
                onChange={setSelectedCoverageMetric}
              />
            </div>

            <div className="cb-chart-wrap">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={coverageChartData} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
                  <CartesianGrid stroke="var(--color-border)" vertical={false} />
                  <XAxis
                    dataKey="year"
                    tick={{ fill: "var(--color-text-muted)", fontSize: 13, fontFamily: "var(--font-body)" }}
                    axisLine={{ stroke: "var(--color-border)" }}
                    tickLine={false}
                  />
                  <YAxis
                    tick={{ fill: "var(--color-text-muted)", fontSize: 13, fontFamily: "var(--font-body)" }}
                    axisLine={false}
                    tickLine={false}
                    width={56}
                  />
                  <Line
                    type="monotone"
                    dataKey={selectedCoverageMetric}
                    name={selectedCoverageSeg.name}
                    stroke={selectedCoverageSeg.color}
                    strokeWidth={3}
                    dot={(dotProps) => (
                      <HoverDot
                        key={`${selectedCoverageSeg.key}-${dotProps.payload.year}`}
                        {...dotProps}
                        seg={selectedCoverageSeg}
                        hovered={hoveredCoverage}
                        onHover={setHoveredCoverage}
                        onLeave={() => setHoveredCoverage(null)}
                      />
                    )}
                    activeDot={false}
                    isAnimationActive={false}
                  />
                </LineChart>
              </ResponsiveContainer>

              <LineTooltipBox hovered={hoveredCoverage} formatter={formatRatio} />
            </div>
          </div>

          {/* ---------------- TABLE ---------------- */}
          <div className="cb-table-card">
            <div className="cb-table-header"></div>
            <div className="cb-table-scroll">
              <table className="cb-table">
                <thead>
                  <tr>
                    <th>Particulars</th>
                    {YEARS.map((y) => (
                      <th key={y}>{y}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {COVERAGE_ROWS.map((row) => {
                    const seg = COVERAGE_SEGMENTS.find((s) => s.key === row.key);
                    return (
                      <tr key={row.key}>
                        <td>
                          <span className="cb-swatch" style={{ background: seg ? seg.color : "var(--color-ink)" }} />
                          {row.label}
                        </td>
                        {YEARS.map((y) => (
                          <td key={y}>{formatRatio(row[y])}</td>
                        ))}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          <h2 className="cb-title cb-title-1">Summary of Financial Trends</h2>
          <div className="portfolio-grid">      
            <div className="financial-strength-card">
              <div className="financial-card-header">
                <h3 className="financial-strength-title">Revenue</h3>
                <img src={revenue} alt="Revenue" className="financial-card-icon" />
              </div>
              <ul className="financial-strength-list">
                <li>Total revenue grew by 148% from 2021 to 2025.</li>
                <li>Air Freight contributing over 35% of overall revenue by 2025.</li>
                <li>Sea and Road Freight doubled their output.</li>
                <li>Total revenue nearly turned 2.5x from 2021 to 2025.</li>
              </ul>
            </div>

            <div className="financial-strength-card">
              <div className="financial-card-header">
                <h3 className="financial-strength-title">Liquidity</h3>
                <img src={solvency} alt="Liquidity" className="financial-card-icon" />
              </div>
              <ul className="financial-strength-list">
                <li>Current ratio greater than 2.0x.</li>
                <li>Quick & cash ratios steadily improving.</li>
                <li>Strong short-term position.</li>
              </ul>
            </div>
            
            <div className="financial-strength-card">
              <div className="financial-card-header">
                <h3 className="financial-strength-title">Coverage</h3>
                <img src={revenue} alt="Coverage" className="financial-card-icon" />
              </div>
              <ul className="financial-strength-list">
                <li>Interest coverage increases from 8.4x to 34.7x.</li>
                <li>Cash flow ratio greater than 1.0x from 2023.</li>
                <li>Provides robust debt-servicing capacity.</li>
              </ul>
            </div>            
                        
            <div className="financial-strength-card">
              <div className="financial-card-header">
                <h3 className="financial-strength-title">Efficiency</h3>
                <img src={solvency} alt="Efficiency" className="financial-card-icon" />
              </div>
              <ul className="financial-strength-list">
                <li>Asset turnover ~1.65x (stable).</li>
                <li>Fixed asset & receivable turnover improving.</li>
              </ul>
            </div>
            
            <div className="financial-strength-card">
              <div className="financial-card-header">
                <h3 className="financial-strength-title">Solvency</h3>
                <img src={revenue} alt="Solvency" className="financial-card-icon" />
              </div>
              <ul className="financial-strength-list">
                <li>Debt-to-assets decreases from 40% to 36%.</li>
                <li>Debt-to-equity decreases from 0.67 to 0.56.</li>
                <li>Lower leverage, stronger capital base.</li>
              </ul>
            </div>

            <div className="financial-strength-card">
              <div className="financial-card-header">
                <h3 className="financial-strength-title">Profitability</h3>
                <img src={solvency} alt="Profitability" className="financial-card-icon" />
              </div>
              <ul className="financial-strength-list">
                <li>Gross margin increases from 27% to 30.5%.</li>
                <li>Net margin increases from 3% to 9.8%.</li>
                <li>ROA increases from 4.9% to 16.2%.</li>
                <li>ROE increases from 8.2% to 23.8%.</li>
                <li>Proving rising returns.</li>
              </ul>
            </div>           
          </div>
        </div>
      </div>
    </div>
  );
}