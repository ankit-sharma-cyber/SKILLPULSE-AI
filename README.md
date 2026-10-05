# SKILLPULSE AI

> From Labour Data to Future Skill Intelligence

SKILLPULSE AI is an interactive decision-support and forecasting prototype for the Smart India Hackathon problem statement **SIH26246**:

> AI-Enabled Labour Market Intelligence and Skill Demand-Supply Forecasting Engine

The prototype is designed for the Ministry of Skill Development and Entrepreneurship (MSDE), state skill planners, district officers, NCVET / Sector Skill Council analysts, and training-capacity planners.

It turns fragmented labour-market signals into a planning workflow:

```text
DATA -> INTELLIGENCE -> FORECAST -> GAP -> EARLY WARNING -> ACTION
```

## What The Prototype Demonstrates

SkillPulse AI helps planners answer:

- Where is labour demand increasing?
- Which skills and trades are becoming oversupplied?
- Which districts are facing future shortages?
- How does training capacity compare with demand?
- What may the demand-supply gap look like over the next 12 months?
- Which interventions should be considered first?

The interface is a connected prototype rather than a collection of static mockups. It uses coherent local mock data and shared values across the dashboard, district view, forecast center, warning center, and scenario simulator.

## Judge Demo Flow

1. Open the login screen at `http://localhost:5173/`.
2. Use the prefilled demo credentials:
   - Email: `planner@skillpulse.ai`
   - Password: `demo123`
   - Role: `Central Planner`
3. Enter the planning dashboard.
4. Review the national KPIs and the demand-versus-supply forecast.
5. Click district points on the heatmap to inspect Jaipur, Bengaluru, Pune, Kota, Ajmer, and Chennai.
6. Open **District Intelligence** to drill into the local skill picture.
7. Open **Forecast Center** to inspect model metrics, forecast drivers, and confidence.
8. Open **Early Warnings** to review shortage and oversupply alerts.
9. Open **Scenario Simulator** and change training capacity. The simulated supply and projected gap update dynamically.
10. Use **Data Sources**, **Reports & Export**, **API Center**, and **Methodology** to explain trust, integration, outputs, and the underlying intelligence pipeline.

The main demo story is:

```text
Labour demand
      |
Training supply
      |
AI forecast
      |
Projected gap
      |
Early warning
      |
Planning action
```

## Included Views

### Workspace

- **Overview**: National KPIs, filters, demand-supply forecast, district heatmap, top skill gaps, and AI recommendation.
- **Labour Demand**: Demand index, sector distribution, and emerging skills.
- **Training Supply**: Supply-oriented capacity view using the same planning data model.
- **Gap Analysis**: Forecast demand minus forecast supply, risk categories, and ranked gaps.
- **Forecast Center**: Forecast horizon controls, ensemble model metrics, forecast drivers, and confidence.

### Intelligence

- **District Intelligence**: Interactive district selection, drill-down breadcrumbs, profile metrics, rankings, and top skills.
- **Sector Intelligence**: Sector demand distribution and growth-oriented skill signals.
- **Early Warnings**: Critical shortages, emerging shortages, oversupply risks, time to impact, and recommended actions.
- **Scenario Simulator**: What-if training capacity controls with dynamically recalculated supply, gap, and potential reduction.

### Platform

- **Data Sources**: Source health, completeness, mapping confidence, freshness, and pipeline stages.
- **Reports & Export**: National report preview and prototype report/export actions.
- **API Center**: REST-style endpoint browser and sample JSON response.
- **Methodology**: Gap formula, risk logic, model evaluation, and system architecture.

## Core Mock Data

The prototype uses local, aggregated mock data. It does not require government API access, credentials, or a backend service.

The primary demonstration signal is:

| Metric                 | Jaipur AI / ML example |
| ---------------------- | ---------------------: |
| Forecast demand        |                 42,500 |
| Forecast supply        |                 27,100 |
| Projected gap          |                +15,400 |
| Demand growth          |                   +31% |
| Training supply growth |                    +8% |
| Forecast confidence    |                    91% |

The data includes realistic Indian states, districts, sectors, skills, demand signals, supply indicators, risk categories, and forecast values. The shared source of truth is [src/data.ts](src/data.ts).

## Technology

- React 19
- TypeScript
- Vite
- Recharts
- Lucide React
- CSS design system with responsive layout
- Mock REST-style API examples
- Local static data model

The original product concept allows a future Python/FastAPI/PostgreSQL/ML service layer. This repository focuses on the local frontend prototype and keeps the integration boundary visible through the API and methodology screens.

## Project Structure

```text
.
├── public/
│   └── favicon.svg
├── src/
│   ├── App.tsx       # Application shell, views, interactions, and reusable UI pieces
│   ├── App.css       # Light rose product design system and responsive layout
│   ├── data.ts       # Shared typed mock data and forecast values
│   ├── index.css     # Global browser and typography reset
│   └── main.tsx      # React application entry point
├── index.html
├── package.json
├── tsconfig.json
└── vite.config.ts
```

## Run Locally

Requirements:

- Node.js 18 or newer
- npm 9 or newer

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Open the URL printed by Vite, normally:

```text
http://localhost:5173/
```

For a network-accessible local server:

```bash
npx vite --host 0.0.0.0
```

## Validation

Create a production build:

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

The build runs TypeScript validation followed by the Vite production build.

## Design Direction

SkillPulse AI uses a premium light pink and soft rose visual system intended to feel like government technology plus a modern analytics product:

- Background: `#FFF7FA`
- Main soft pink: `#F9C5D5`
- Primary rose: `#E889A8`
- Deep rose: `#C95F82`
- Dark text: `#2D2430`
- AI purple: `#8B72B8`
- Information blue: `#668FCF`
- Success: `#39A96B`
- Warning: `#F2A541`
- Danger: `#D95D6A`
- Borders: `#F0DCE4`

Risk labels always include text as well as color:

- Critical: dark rose
- High: orange
- Medium: amber
- Balanced: green
- Oversupply: purple

## Product Architecture Concept

A production version can expand the prototype into the following service architecture:

```text
Data sources
  -> Ingestion and validation
  -> NCO / NSQF / skill normalization
  -> Feature engineering
  -> Demand and supply indexes
  -> Time-series / XGBoost / ensemble forecasting
  -> Gap calculation
  -> Risk classification
  -> Recommendation engine
  -> Dashboard / reports / API
```

Suggested future services:

- **FastAPI** for REST endpoints
- **PostgreSQL** for normalized labour-market and training data
- **Pandas / NumPy** for feature engineering
- **scikit-learn / XGBoost** for predictive modelling
- **NLP skill mapping** for occupation, trade, and raw job-title normalization
- **Scheduled ingestion jobs** for source freshness and validation

## Trust, Privacy, and Limitations

- All displayed data is aggregated and intended for planning use.
- No personal worker records are shown.
- Forecasts are decision-support suggestions, not guaranteed predictions.
- Confidence indicators communicate uncertainty rather than hiding it.
- The current dataset is local mock data and is not connected to live MSDE, NCS, PLFS, e-Shram, NCVET, or job portal systems.
- The API screen presents integration examples only; it is not a live backend.

## Repository

GitHub: [ankit-sharma-cyber/SKILLPULSE-AI](https://github.com/ankit-sharma-cyber/SKILLPULSE-AI)

## License

No license has been specified for this prototype yet.

## Footer Copy

**SKILLPULSE AI**  
AI-Enabled Labour Market Intelligence & Skill Demand-Supply Forecasting  
Prototype for Smart India Hackathon 2026 · SIH26246
