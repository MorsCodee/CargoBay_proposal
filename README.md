# CargoBay AG — Interactive Logistics Proposal & Financial Dashboard

A modern, responsive web application built with **React** and **Vite** that presents an interactive proposal and analytical dashboard for **Cargobay AG** (a privately held Swiss freight forwarder based at Zurich Airport).

This platform translates complex freight forwarding operational data, multimodal routing capabilities, and a 5-year financial performance model into an intuitive visual UI.

---

## Features

* **Interactive Multimodal Rate Engine:** Built-in rate estimator allowing users to calculate live pricing across Air, Sea, Road, and Rail modes with optional customs declaration add-ons.
* **Interactive Financial Analytics:**
* Stacked Revenue Breakdown by transport segment (2021–2025).
* Profitability comparison charts (Gross Profit vs. Net Profit).
* Interactive multi-line trend charts for Margin and Liquidity Ratios.
* Metric-switchable dropdown charts for Efficiency, Solvency, and Coverage Ratios.


* **Risk & Weaknesses Section (Section 7.1):** Structured breakdown of industry-typical operational risks, carrier dependencies, and currency exposures.
* **Interactive Pain Points & Strengths:** Expandable cards highlighting key logistics challenges and CargoBay's strategic solutions.
* **Full Responsive Design:** Tailored layouts built for desktop and mobile devices with glassmorphic UI design and dark theme aesthetic.

---

## Tech Stack

* **Frontend:** React 18 / 19
* **Build Tool:** Vite
* **Data Visualization:** Recharts
* **Styling:** CSS3 / Scoped Component Styles
* **Deployment Platform:** Vercel

---

## Project Structure

```text
CargoBay_proposal/
├── public/
│   └── favicon.ico
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── BusinessOverview.jsx
│   │   ├── CargobayCompanyIntroV2.jsx
│   │   ├── CargobayExecutiveSummaryV2.jsx
│   │   ├── CargobayHeaderV2.jsx
│   │   ├── CargobayHero.jsx
│   │   ├── ChatBot.jsx
│   │   ├── Conclusion.jsx
│   │   ├── Financials.jsx          
│   │   ├── OperatingMetrics.jsx
│   │   ├── PainPoints.jsx
│   │   └── SolutionsAndStrengths.jsx
│   ├── App.jsx                     
│   ├── main.jsx                    
│   └── MultimodalOptimizer.jsx     
├── index.html
├── package.json
└── vite.config.js

```

---

## Getting Started Locally

### Prerequisites

Ensure you have **Node.js** (v16 or higher) and **npm** installed.

### Installation

1. Clone the repository:
```bash
git clone https://github.com/your-username/CargoBay_proposal.git
cd CargoBay_proposal

```


2. Install dependencies:
```bash
npm install

```


3. Run the local development server:
```bash
npm run dev

```


4. Open `http://localhost:5173` in your browser.

---

## Build & Deployment

### Production Build

To compile the application for production:

```bash
npm run build

```

This generates a optimized `dist/` folder ready for deployment.

### Deploying to Vercel

1. Push your latest code to GitHub:
```bash
git add .
git commit -m "Prepare repository for production deployment"
git push origin main

```


2. Connect your GitHub repository on **Vercel**:
* **Framework Preset:** Vite
* **Build Command:** `npm run build`
* **Output Directory:** `dist`


3. Click **Deploy**.

---

## Disclaimer

*Cargobay AG is a privately held Swiss SME with no publicly disclosed financial statements. Financial models, customer mix percentages, and shipment volume figures presented in this application are illustrative estimates generated for analytical and presentation purposes.* 

## Prepared By:
*Team Èpsilon*
