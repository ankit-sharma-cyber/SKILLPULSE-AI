import { useState, type ReactNode } from "react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import {
  AlertTriangle,
  ArrowDownRight,
  ArrowUpRight,
  Bell,
  BrainCircuit,
  Building2,
  ChevronDown,
  ChevronRight,
  CircleHelp,
  Database,
  Download,
  FileText,
  Globe2,
  Layers3,
  LayoutDashboard,
  MapPin,
  Menu,
  Network,
  Play,
  Plus,
  RefreshCw,
  Search,
  Settings,
  ShieldAlert,
  SlidersHorizontal,
  Sparkles,
  Target,
  TrendingUp,
  Users,
  X,
  Zap,
  type LucideIcon,
} from "lucide-react";
import "./App.css";
import {
  districts,
  forecastData,
  gapRows,
  sectorData,
  skills,
  type Risk,
} from "./data";

type Page =
  | "overview"
  | "demand"
  | "supply"
  | "gap"
  | "forecast"
  | "districts"
  | "sectors"
  | "warnings"
  | "scenario"
  | "sources"
  | "reports"
  | "api"
  | "methodology";
type NavItem = [Page, string, LucideIcon];

const navGroups: { label: string; items: NavItem[] }[] = [
  {
    label: "Workspace",
    items: [
      ["overview", "Overview", LayoutDashboard],
      ["demand", "Labour Demand", TrendingUp],
      ["supply", "Training Supply", Building2],
      ["gap", "Gap Analysis", Target],
      ["forecast", "Forecast Center", BrainCircuit],
    ],
  },
  {
    label: "Intelligence",
    items: [
      ["districts", "District Intelligence", MapPin],
      ["sectors", "Sector Intelligence", Layers3],
      ["warnings", "Early Warnings", ShieldAlert],
      ["scenario", "Scenario Simulator", SlidersHorizontal],
    ],
  },
  {
    label: "Platform",
    items: [
      ["sources", "Data Sources", Database],
      ["reports", "Reports & Export", FileText],
      ["api", "API Center", Network],
      ["methodology", "Methodology", CircleHelp],
    ],
  },
];

const riskClass = (risk: Risk) => risk.toLowerCase();

function RiskBadge({ risk }: { risk: Risk }) {
  return (
    <span className={`risk-badge ${riskClass(risk)}`}>
      <span className="risk-dot" />
      {risk}
    </span>
  );
}

function Login({ onEnter }: { onEnter: () => void }) {
  return (
    <div className="login-shell">
      <div className="login-brand">
        <div className="brand-mark">
          <Zap size={20} fill="currentColor" />
        </div>
        <span>
          SKILLPULSE <b>AI</b>
        </span>
      </div>
      <div className="login-copy">
        <p className="eyebrow">MSDE / SIH26246</p>
        <h1>
          Know the skill gap
          <br />
          <em>before it becomes</em>
          <br />a workforce gap.
        </h1>
        <p>
          AI-powered labour market intelligence for smarter skill planning
          across India's districts, sectors and training systems.
        </p>
        <div className="signal-visual">
          <div className="india-outline">
            INDIA<span>∿</span>
          </div>
          <div className="signal signal-one">
            Demand <b>↑ 31%</b>
          </div>
          <div className="signal signal-two">
            Training supply <b>↑ 8%</b>
          </div>
          <div className="signal signal-three">
            Forecast confidence <b>91%</b>
          </div>
        </div>
      </div>
      <div className="login-panel">
        <div className="login-card">
          <div>
            <p className="eyebrow">PLANNING PORTAL</p>
            <h2>Welcome back</h2>
            <p className="muted">Sign in to your intelligence workspace.</p>
          </div>
          <label>
            Email address
            <input defaultValue="planner@skillpulse.ai" />
          </label>
          <label>
            Password
            <div className="input-with-action">
              <input type="password" defaultValue="demo123" />
              <span>Show</span>
            </div>
          </label>
          <label>
            Role
            <select defaultValue="central">
              <option value="central">Central Planner</option>
              <option>State Planner</option>
              <option>District Planner</option>
              <option>Analyst</option>
            </select>
          </label>
          <button className="primary-button full" onClick={onEnter}>
            Enter Planning Dashboard <ChevronRight size={17} />
          </button>
          <div className="demo-note">
            <Sparkles size={15} />
            <span>
              <b>Prototype Demo Mode</b>
              <br />
              Use the prefilled credentials to explore the judge journey.
            </span>
          </div>
        </div>
        <div className="login-footer">
          Aggregated planning insights · No personal data shown
        </div>
      </div>
    </div>
  );
}

function KpiCard({
  label,
  value,
  trend,
  helper,
  icon: Icon,
  tone = "rose",
  down = false,
  onClick,
}: {
  label: string;
  value: string;
  trend: string;
  helper: string;
  icon: typeof Zap;
  tone?: string;
  down?: boolean;
  onClick?: () => void;
}) {
  return (
    <button className={`kpi-card ${tone}`} onClick={onClick}>
      <div className="kpi-top">
        <span>
          {label}
          <CircleHelp size={14} />
        </span>
        <div className="kpi-icon">
          <Icon size={18} />
        </div>
      </div>
      <strong>{value}</strong>
      <div className={`trend ${down ? "down" : ""}`}>
        {down ? <ArrowDownRight size={15} /> : <ArrowUpRight size={15} />}
        {trend}
      </div>
      <p>{helper}</p>
      <div className="mini-bars">
        <i />
        <i />
        <i />
        <i />
        <i />
        <i />
        <i />
      </div>
    </button>
  );
}

function Filters({
  state,
  setState,
  district,
  setDistrict,
}: {
  state: string;
  setState: (v: string) => void;
  district: string;
  setDistrict: (v: string) => void;
}) {
  return (
    <div className="filters">
      <div className="filter-label">
        <SlidersHorizontal size={15} /> Intelligence scope
      </div>
      <select value={state} onChange={(e) => setState(e.target.value)}>
        <option>India</option>
        <option>Rajasthan</option>
        <option>Karnataka</option>
        <option>Maharashtra</option>
      </select>
      <select value={district} onChange={(e) => setDistrict(e.target.value)}>
        <option>All districts</option>
        {districts.map((item) => (
          <option key={item.name}>{item.name}</option>
        ))}
      </select>
      <select>
        <option>All sectors</option>
        {sectorData.map((item) => (
          <option key={item.name}>{item.name}</option>
        ))}
      </select>
      <select>
        <option>All trades</option>
        <option>AI / ML Engineer</option>
        <option>Cloud Technician</option>
        <option>Solar PV Technician</option>
      </select>
      <select>
        <option>Next 12 months</option>
        <option>Next 24 months</option>
      </select>
    </div>
  );
}

function ForecastChart({ compact = false }: { compact?: boolean }) {
  return (
    <div className={`chart-wrap ${compact ? "compact" : ""}`}>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={forecastData}
          margin={{ top: 15, right: 8, left: -18, bottom: 0 }}
        >
          <defs>
            <linearGradient id="demandFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#e889a8" stopOpacity={0.24} />
              <stop offset="100%" stopColor="#e889a8" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="supplyFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#8b72b8" stopOpacity={0.17} />
              <stop offset="100%" stopColor="#8b72b8" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid
            vertical={false}
            stroke="#f0dce4"
            strokeDasharray="3 5"
          />
          <XAxis
            dataKey="month"
            axisLine={false}
            tickLine={false}
            tick={{ fill: "#9a8e96", fontSize: 11 }}
            interval={compact ? 2 : 1}
          />
          <YAxis
            axisLine={false}
            tickLine={false}
            tick={{ fill: "#9a8e96", fontSize: 11 }}
            tickFormatter={(v) => `${v}M`}
          />
          <Tooltip
            contentStyle={{
              border: "1px solid #f0dce4",
              borderRadius: 12,
              boxShadow: "0 10px 30px #6f455014",
              fontSize: 12,
            }}
          />
          <Area
            type="monotone"
            dataKey="demand"
            stroke="#d95d6a"
            strokeWidth={2.5}
            fill="url(#demandFill)"
            name="Demand"
          />
          <Area
            type="monotone"
            dataKey="supply"
            stroke="#8b72b8"
            strokeWidth={2.5}
            fill="url(#supplyFill)"
            name="Supply"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

function MapPanel() {
  const [active, setActive] = useState(districts[0]);
  return (
    <div className="panel map-panel">
      <div className="panel-head">
        <div>
          <p className="eyebrow">GEOGRAPHIC SIGNAL</p>
          <h2>District-level skill gap heatmap</h2>
        </div>
        <button className="icon-button" title="Expand map">
          <Globe2 size={17} />
        </button>
      </div>
      <div className="map-content">
        <div className="india-map">
          <div className="map-label">
            INDIA<span>Skill Gap</span>
          </div>
          <div className="map-stem" />
          {districts.map((item) => (
            <button
              key={item.name}
              className={`map-point ${riskClass(item.risk)} ${active.name === item.name ? "active" : ""}`}
              style={{ left: `${item.x}%`, top: `${item.y}%` }}
              onClick={() => setActive(item)}
              aria-label={`Show ${item.name}`}
            >
              <span />
            </button>
          ))}
        </div>
        <div className="map-detail">
          <div className="detail-location">
            <MapPin size={16} />
            <b>{active.name}</b>
            <span>{active.state}</span>
          </div>
          <RiskBadge risk={active.risk} />
          <dl>
            <div>
              <dt>Top skill</dt>
              <dd>AI / ML Engineer</dd>
            </div>
            <div>
              <dt>Demand</dt>
              <dd>{active.demand}</dd>
            </div>
            <div>
              <dt>Supply</dt>
              <dd>{active.supply}</dd>
            </div>
            <div>
              <dt>Projected gap</dt>
              <dd
                className={
                  active.gap.startsWith("+") ? "danger-text" : "success-text"
                }
              >
                {active.gap}
              </dd>
            </div>
          </dl>
          <button className="text-button">
            Open district view <ChevronRight size={14} />
          </button>
        </div>
      </div>
      <div className="map-legend">
        <span>
          <i className="critical" />
          Acute shortage
        </span>
        <span>
          <i className="high" />
          Emerging shortage
        </span>
        <span>
          <i className="balanced" />
          Balanced
        </span>
        <span>
          <i className="oversupply" />
          Oversupply
        </span>
      </div>
    </div>
  );
}

function GapTable() {
  return (
    <div className="panel table-panel">
      <div className="panel-head">
        <div>
          <p className="eyebrow">PRIORITY SIGNALS</p>
          <h2>Top projected skill gaps</h2>
        </div>
        <button className="text-button">
          View all <ChevronRight size={14} />
        </button>
      </div>
      <div className="table-scroll">
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>Skill / trade</th>
              <th>Sector</th>
              <th>State</th>
              <th>Demand</th>
              <th>Supply</th>
              <th>Projected gap</th>
              <th>Risk</th>
            </tr>
          </thead>
          <tbody>
            {gapRows.map((row) => (
              <tr key={row.skill}>
                <td className="rank">{String(row.rank).padStart(2, "0")}</td>
                <td>
                  <b>{row.skill}</b>
                  <small>{row.growth} demand growth</small>
                </td>
                <td>{row.sector}</td>
                <td>{row.state}</td>
                <td>{row.demand.toLocaleString()}</td>
                <td>{row.supply.toLocaleString()}</td>
                <td className={row.gap > 0 ? "danger-text" : "success-text"}>
                  {row.gap > 0 ? "+" : ""}
                  {row.gap.toLocaleString()}
                </td>
                <td>
                  <RiskBadge risk={row.risk} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function Recommendation({ compact = false }: { compact?: boolean }) {
  return (
    <div className={`recommendation ${compact ? "compact" : ""}`}>
      <div className="ai-badge">
        <Sparkles size={15} /> AI planning recommendation
      </div>
      <h3>Prioritize Jaipur's AI/ML capacity expansion</h3>
      <p>
        Demand is projected to grow <b>31%</b> over the next 12 months while
        effective supply grows only 8%. Consider increasing relevant training
        capacity by <b>15–20%</b> and prioritizing advanced AI/ML modules.
      </p>
      <div className="recommendation-actions">
        <button className="primary-button">
          Add to planning report <Plus size={15} />
        </button>
        <button className="ghost-button">View supporting data</button>
      </div>
    </div>
  );
}

function PageScaffold({
  eyebrow,
  title,
  description,
  children,
}: {
  eyebrow: string;
  title: string;
  description: string;
  children: ReactNode;
}) {
  return (
    <>
      <div className="page-heading">
        <div>
          <p className="eyebrow">{eyebrow}</p>
          <h1>{title}</h1>
          <p>{description}</p>
        </div>
        <button className="ghost-button">
          <Download size={15} /> Export view
        </button>
      </div>
      {children}
    </>
  );
}

function Overview({
  setPage,
  state,
  setState,
  district,
  setDistrict,
}: {
  setPage: (page: Page) => void;
  state: string;
  setState: (v: string) => void;
  district: string;
  setDistrict: (v: string) => void;
}) {
  return (
    <>
      <div className="page-heading">
        <div>
          <p className="eyebrow">OVERVIEW / 05 OCT 2026</p>
          <h1>National Labour Market Intelligence</h1>
          <p>
            AI-powered overview of current and projected skill demand-supply
            gaps.
          </p>
        </div>
        <button className="demo-button" onClick={() => setPage("scenario")}>
          <Play size={15} fill="currentColor" /> Start guided demo
        </button>
      </div>
      <Filters
        state={state}
        setState={setState}
        district={district}
        setDistrict={setDistrict}
      />
      <div className="kpi-grid">
        <KpiCard
          label="Active labour demand"
          value="8.42M"
          trend="12.4% YoY"
          helper="Across 10 priority sectors"
          icon={TrendingUp}
        />
        <KpiCard
          label="Effective training supply"
          value="6.87M"
          trend="6.1% YoY"
          helper="Capacity + workforce signals"
          icon={Users}
          tone="purple"
        />
        <KpiCard
          label="Projected skill gap"
          value="1.55M"
          trend="Shortage"
          helper="Forecast horizon: 12 months"
          icon={Target}
          tone="rose"
        />
        <KpiCard
          label="High-risk trades"
          value="47"
          trend="+8 this quarter"
          helper="Need capacity intervention"
          icon={ShieldAlert}
          tone="orange"
          onClick={() => setPage("warnings")}
        />
        <KpiCard
          label="Oversupplied trades"
          value="31"
          trend="Needs review"
          helper="Potential seat reallocation"
          icon={ArrowDownRight}
          tone="blue"
          down
          onClick={() => setPage("gap")}
        />
        <KpiCard
          label="Districts requiring action"
          value="128"
          trend="Across 17 states"
          helper="Early warning threshold"
          icon={MapPin}
          tone="green"
          onClick={() => setPage("districts")}
        />
      </div>
      <div className="dashboard-grid">
        <div className="panel forecast-panel">
          <div className="panel-head">
            <div>
              <p className="eyebrow">DEMAND / SUPPLY SIGNAL</p>
              <h2>Labour demand vs training supply</h2>
              <p className="panel-subtitle">
                National index · 2024–2027 projection
              </p>
            </div>
            <div className="chart-legend">
              <span>
                <i className="legend-demand" />
                Demand
              </span>
              <span>
                <i className="legend-supply" />
                Supply
              </span>
              <span className="forecast-key">
                <i />
                Forecast
              </span>
            </div>
          </div>
          <ForecastChart />
        </div>
        <MapPanel />
      </div>
      <div className="lower-grid">
        <GapTable />
        <Recommendation />
      </div>
    </>
  );
}

function ForecastPage() {
  const [horizon, setHorizon] = useState("12 months");
  return (
    <PageScaffold
      eyebrow="MODEL INTELLIGENCE"
      title="AI Forecasting Center"
      description="Transparent projections built from labour demand, training capacity and industry signals."
    >
      <div className="forecast-controls">
        <div>
          <span>Forecast horizon</span>
          <div className="segmented">
            {["3 months", "6 months", "12 months", "24 months"].map((item) => (
              <button
                className={horizon === item ? "selected" : ""}
                onClick={() => setHorizon(item)}
                key={item}
              >
                {item}
              </button>
            ))}
          </div>
        </div>
        <label>
          Model
          <select>
            <option>Ensemble Forecast</option>
            <option>XGBoost</option>
            <option>Time Series</option>
          </select>
        </label>
      </div>
      <div className="metrics-row">
        <div>
          <span>Model accuracy</span>
          <b>91.3%</b>
          <small>Backtested on 24 months</small>
        </div>
        <div>
          <span>MAPE</span>
          <b>8.7%</b>
          <small>Within target threshold</small>
        </div>
        <div>
          <span>RMSE</span>
          <b>0.42</b>
          <small>Normalized error</small>
        </div>
        <div>
          <span>Confidence</span>
          <b className="purple-text">91%</b>
          <small>Signal quality: high</small>
        </div>
      </div>
      <div className="panel large-chart">
        <div className="panel-head">
          <div>
            <p className="eyebrow">
              ENSEMBLE FORECAST / {horizon.toUpperCase()}
            </p>
            <h2>Historical demand and projected trajectory</h2>
          </div>
          <div className="forecast-pill">
            <span /> Forecast begins Oct 2026
          </div>
        </div>
        <ForecastChart />
      </div>
      <div className="two-col">
        <div className="panel">
          <div className="panel-head">
            <div>
              <p className="eyebrow">EXPLAINABILITY</p>
              <h2>Top forecast drivers</h2>
            </div>
          </div>
          <div className="driver-list">
            {[
              ["Job posting growth", 86, "+28%"],
              ["Industry hiring signal", 72, "+22%"],
              ["Training capacity", 54, "+8%"],
              ["Historical trend", 49, "+19%"],
              ["Seasonality", 31, "Moderate"],
            ].map(([name, value, label]) => (
              <div className="driver" key={String(name)}>
                <div>
                  <b>{name}</b>
                  <span>{label}</span>
                </div>
                <div className="driver-bar">
                  <i style={{ width: `${value}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
        <Recommendation compact />
      </div>
    </PageScaffold>
  );
}

function WarningsPage({ setPage }: { setPage: (p: Page) => void }) {
  const alerts = [
    {
      level: "Critical",
      skill: "AI / ML Engineer",
      place: "Jaipur, Rajasthan",
      gap: "+15,400",
      time: "8 months",
      growth: "+31%",
      action: "Increase training capacity",
    },
    {
      level: "High",
      skill: "Solar PV Technician",
      place: "Rajasthan",
      gap: "+11,200",
      time: "12 months",
      growth: "+24%",
      action: "Open 6 new cohorts",
    },
    {
      level: "Oversupply",
      skill: "Data Entry Operator",
      place: "Rajasthan",
      gap: "8,700 surplus",
      time: "6 months",
      growth: "-12%",
      action: "Review future seat allocation",
    },
  ];
  return (
    <PageScaffold
      eyebrow="EARLY WARNING CENTER"
      title="Early Warning Intelligence"
      description="Identify future skill shortages and oversupply before they become critical."
    >
      <div className="warning-summary">
        <div>
          <ShieldAlert size={21} />
          <b>12</b>
          <span>active alerts</span>
        </div>
        <div>
          <AlertTriangle size={21} />
          <b>4</b>
          <span>critical in 90 days</span>
        </div>
        <div>
          <RefreshCw size={21} />
          <b>89%</b>
          <span>model confidence</span>
        </div>
        <button className="ghost-button" onClick={() => setPage("scenario")}>
          Open action center <ChevronRight size={15} />
        </button>
      </div>
      <div className="alert-grid">
        {alerts.map((alert) => (
          <div
            className={`alert-card ${riskClass(alert.level as Risk)}`}
            key={alert.skill}
          >
            <div className="alert-card-top">
              <RiskBadge risk={alert.level as Risk} />
              <span className="alert-time">Within {alert.time}</span>
            </div>
            <h2>{alert.skill}</h2>
            <p className="muted">
              <MapPin size={14} />
              {alert.place}
            </p>
            <div className="alert-stats">
              <div>
                <span>Projected gap</span>
                <b>{alert.gap}</b>
              </div>
              <div>
                <span>Demand growth</span>
                <b>{alert.growth}</b>
              </div>
            </div>
            <div className="alert-action">
              <span>Recommended action</span>
              <b>{alert.action}</b>
            </div>
            <button className="text-button">
              Open supporting data <ChevronRight size={14} />
            </button>
          </div>
        ))}
      </div>
      <div className="panel action-center">
        <div>
          <p className="eyebrow">PLANNING ACTION CENTER</p>
          <h2>AI/ML · Jaipur, Rajasthan</h2>
          <p>Turn the highest-priority signal into a planning decision.</p>
        </div>
        <div className="action-kpi">
          <b>+15,400</b>
          <span>Projected gap · 12 months</span>
        </div>
        <button className="primary-button" onClick={() => setPage("scenario")}>
          Simulate capacity <ChevronRight size={15} />
        </button>
      </div>
    </PageScaffold>
  );
}

function ScenarioPage() {
  const [capacity, setCapacity] = useState(20);
  const supply = Math.round(27100 * (1 + capacity / 100));
  const gap = 42500 - supply;
  const reduction = Math.round((1 - gap / 15400) * 100);
  const chart = forecastData.slice(8).map((item, i) => ({
    ...item,
    simulated: item.supply + (capacity / 20) * (i + 0.8),
  }));
  return (
    <PageScaffold
      eyebrow="DECISION SIMULATOR"
      title="What-if training capacity simulator"
      description="Simulate how changes in training capacity may affect future skill gaps before you commit resources."
    >
      <div className="scenario-layout">
        <div className="panel scenario-controls">
          <div className="panel-head">
            <div>
              <p className="eyebrow">SCENARIO INPUTS</p>
              <h2>Adjust the intervention</h2>
            </div>
            <SlidersHorizontal size={19} />
          </div>
          <label>
            Skill focus
            <select>
              <option>AI / ML Engineer</option>
              <option>Cloud Technician</option>
              <option>Solar PV Technician</option>
            </select>
          </label>
          <label>
            Location
            <select>
              <option>Jaipur, Rajasthan</option>
              <option>Bengaluru Urban, Karnataka</option>
              <option>Pune, Maharashtra</option>
            </select>
          </label>
          <label>
            Time horizon
            <select>
              <option>12 months</option>
              <option>24 months</option>
            </select>
          </label>
          <div className="range-label">
            <span>Training capacity change</span>
            <b>+{capacity}%</b>
          </div>
          <input
            type="range"
            min="-10"
            max="30"
            step="5"
            value={capacity}
            onChange={(e) => setCapacity(Number(e.target.value))}
          />
          <div className="range-scale">
            <span>-10%</span>
            <span>0%</span>
            <span>+10%</span>
            <span>+20%</span>
            <span>+30%</span>
          </div>
          <div className="scenario-presets">
            {[-10, 0, 10, 20, 30].map((item) => (
              <button
                className={capacity === item ? "active" : ""}
                key={item}
                onClick={() => setCapacity(item)}
              >
                {item > 0 ? "+" : ""}
                {item}%
              </button>
            ))}
          </div>
          <button className="primary-button full">
            Apply scenario to planning report <Plus size={15} />
          </button>
        </div>
        <div>
          <div className="scenario-cards">
            <div>
              <span>Current demand</span>
              <b>42,500</b>
              <small>AI/ML · Jaipur</small>
            </div>
            <div>
              <span>Simulated supply</span>
              <b>{supply.toLocaleString()}</b>
              <small>
                {capacity >= 0 ? "+" : ""}
                {capacity}% capacity
              </small>
            </div>
            <div className="highlight">
              <span>Projected gap</span>
              <b>{gap.toLocaleString()}</b>
              <small>
                {reduction > 0 ? `${reduction}% reduction` : "Gap increases"}
              </small>
            </div>
          </div>
          <div className="panel scenario-chart">
            <div className="panel-head">
              <div>
                <p className="eyebrow">SCENARIO OUTCOME</p>
                <h2>Supply trajectory under intervention</h2>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart
                data={chart}
                margin={{ top: 20, right: 10, left: -18, bottom: 0 }}
              >
                <CartesianGrid
                  vertical={false}
                  stroke="#f0dce4"
                  strokeDasharray="3 5"
                />
                <XAxis
                  dataKey="month"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#9a8e96", fontSize: 11 }}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#9a8e96", fontSize: 11 }}
                  tickFormatter={(v) => `${v}M`}
                />
                <Tooltip
                  contentStyle={{
                    border: "1px solid #f0dce4",
                    borderRadius: 12,
                  }}
                />
                <Line
                  dataKey="demand"
                  stroke="#d95d6a"
                  strokeWidth={2.5}
                  dot={false}
                />
                <Line
                  dataKey="supply"
                  stroke="#a996c5"
                  strokeWidth={2}
                  dot={false}
                />
                <Line
                  dataKey="simulated"
                  stroke="#39a96b"
                  strokeWidth={2.5}
                  strokeDasharray="6 5"
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="scenario-result">
            <div>
              <Sparkles size={18} />
              <div>
                <b>Potential gap reduction: {Math.max(0, reduction)}%</b>
                <span>
                  Increasing capacity to +{capacity}% closes the projected
                  shortage by {Math.max(0, reduction)}%.
                </span>
              </div>
            </div>
            <button className="ghost-button">Create recommendation</button>
          </div>
        </div>
      </div>
    </PageScaffold>
  );
}

function DistrictPage() {
  const [selected, setSelected] = useState("Jaipur");
  const item = districts.find((d) => d.name === selected) ?? districts[0];
  return (
    <PageScaffold
      eyebrow="GEOGRAPHIC INTELLIGENCE"
      title="District Skill Intelligence"
      description="Drill from national signals to the local skill, trade and capacity decision."
    >
      <div className="breadcrumbs">
        <span>India</span>
        <ChevronRight size={14} />
        <span>Rajasthan</span>
        <ChevronRight size={14} />
        <b>{item.name}</b>
        <ChevronRight size={14} />
        <span>IT & ITES</span>
      </div>
      <div className="district-layout">
        <div className="panel district-profile">
          <div className="district-title">
            <div className="district-avatar">
              <MapPin size={23} />
            </div>
            <div>
              <p className="eyebrow">DISTRICT PROFILE</p>
              <h2>
                {item.name}, {item.state}
              </h2>
              <p>Updated 05 Oct 2026 · Aggregated planning view</p>
            </div>
            <RiskBadge risk={item.risk} />
          </div>
          <div className="profile-kpis">
            <div>
              <span>Demand</span>
              <b>{item.demand}</b>
              <small>+18% growth</small>
            </div>
            <div>
              <span>Effective supply</span>
              <b>{item.supply}</b>
              <small>+7% growth</small>
            </div>
            <div>
              <span>Projected gap</span>
              <b className="danger-text">{item.gap}</b>
              <small>12 month horizon</small>
            </div>
            <div>
              <span>Placement rate</span>
              <b>68%</b>
              <small>Across 42 centres</small>
            </div>
          </div>
          <div className="district-drill">
            <span className="done">India</span>
            <ChevronRight size={13} />
            <span className="done">Rajasthan</span>
            <ChevronRight size={13} />
            <span className="active">{item.name}</span>
            <ChevronRight size={13} />
            <span>AI / ML</span>
          </div>
        </div>
        <div className="panel district-list">
          <div className="panel-head">
            <div>
              <p className="eyebrow">RANKING</p>
              <h2>District action list</h2>
            </div>
          </div>
          {districts.slice(0, 5).map((d) => (
            <button
              className={`district-row ${d.name === selected ? "selected" : ""}`}
              key={d.name}
              onClick={() => setSelected(d.name)}
            >
              <span>{d.name}</span>
              <small>{d.state}</small>
              <b>{d.gap}</b>
              <RiskBadge risk={d.risk} />
            </button>
          ))}
        </div>
      </div>
      <div className="two-col">
        <div className="panel">
          <div className="panel-head">
            <div>
              <p className="eyebrow">TOP SKILLS</p>
              <h2>What {item.name} needs next</h2>
            </div>
          </div>
          <div className="skill-list">
            {skills.map((skill, i) => (
              <div className="skill-row" key={skill.name}>
                <span className="skill-number">0{i + 1}</span>
                <div>
                  <b>{skill.name}</b>
                  <small>
                    Demand {skill.demand} · {skill.confidence} confidence
                  </small>
                </div>
                <strong>{skill.growth}</strong>
              </div>
            ))}
          </div>
        </div>
        <Recommendation compact />
      </div>
    </PageScaffold>
  );
}

function GapPage() {
  return (
    <PageScaffold
      eyebrow="MISMATCH ANALYSIS"
      title="Demand-Supply Gap Analysis"
      description="Make the core decision visible: forecast demand minus forecast supply equals the projected skill gap."
    >
      <div className="equation">
        <span>Forecast demand</span>
        <b>−</b>
        <span>Forecast supply</span>
        <b>=</b>
        <strong>Projected skill gap</strong>
      </div>
      <div className="gap-band">
        <span>Oversupply</span>
        <i style={{ left: "22%" }} />
        <i style={{ left: "53%" }} />
        <i className="danger" style={{ left: "84%" }} />
        <div className="band-line" />
        <div className="band-labels">
          <b>−8.7K</b>
          <span>Balanced</span>
          <b>+15.4K</b>
        </div>
        <div className="band-caption">
          <span>Supply exceeds demand</span>
          <span>Demand exceeds supply</span>
        </div>
      </div>
      <div className="category-grid">
        {[
          ["Acute shortage", "12 trades", "critical"],
          ["Emerging shortage", "35 trades", "high"],
          ["Balanced", "84 trades", "balanced"],
          ["Saturation risk", "18 trades", "oversupply"],
          ["Oversupply", "31 trades", "oversupply"],
        ].map((item) => (
          <div className={`category-card ${item[2]}`} key={item[0]}>
            <span className="category-dot" />
            <b>{item[0]}</b>
            <strong>{item[1]}</strong>
            <small>
              View trades <ChevronRight size={12} />
            </small>
          </div>
        ))}
      </div>
      <GapTable />
      <Recommendation />
    </PageScaffold>
  );
}

function SourcesPage() {
  return (
    <PageScaffold
      eyebrow="TRUST & DATA HEALTH"
      title="Data Sources & Data Health"
      description="Track the freshness, completeness and quality of every signal behind the intelligence layer."
    >
      <div className="health-strip">
        <div>
          <span>Data completeness</span>
          <b>94%</b>
          <div className="health-bar">
            <i style={{ width: "94%" }} />
          </div>
        </div>
        <div>
          <span>Mapping confidence</span>
          <b>91%</b>
          <div className="health-bar purple">
            <i style={{ width: "91%" }} />
          </div>
        </div>
        <div>
          <span>Forecast confidence</span>
          <b>89%</b>
          <div className="health-bar blue">
            <i style={{ width: "89%" }} />
          </div>
        </div>
        <div className="status-online">
          <span /> All systems operational
        </div>
      </div>
      <div className="source-grid">
        {[
          ["NCS", "2.4M", "Labour demand", "94%"],
          ["PLFS", "1.8M", "Workforce supply", "97%"],
          ["e-Shram", "4.2M", "Worker signals", "88%"],
          ["NCO / NSQF", "12,480", "Skill taxonomy", "99%"],
          ["Job market signals", "8.6M", "Hiring momentum", "91%"],
          ["Training capacity", "18,240", "Centre capacity", "93%"],
        ].map((source) => (
          <div className="source-card" key={source[0]}>
            <div className="source-icon">
              <Database size={17} />
            </div>
            <div>
              <h3>{source[0]}</h3>
              <span className="connected">
                <span /> Connected
              </span>
            </div>
            <dl>
              <div>
                <dt>Records</dt>
                <dd>{source[1]}</dd>
              </div>
              <div>
                <dt>Coverage</dt>
                <dd>{source[2]}</dd>
              </div>
              <div>
                <dt>Quality</dt>
                <dd>{source[3]}</dd>
              </div>
            </dl>
            <small>Last refresh · 05 Oct 2026, 06:00 IST</small>
          </div>
        ))}
      </div>
      <div className="panel pipeline">
        <div className="panel-head">
          <div>
            <p className="eyebrow">DATA PIPELINE</p>
            <h2>From raw signal to planning insight</h2>
          </div>
        </div>
        <div className="pipeline-steps">
          {[
            "Sources",
            "Ingestion",
            "Validation",
            "Normalization",
            "Analytics",
          ].map((step, i) => (
            <div key={step}>
              <div className="pipeline-icon">
                <Database size={18} />
              </div>
              <b>{step}</b>
              {i < 4 && <ChevronRight size={16} />}
            </div>
          ))}
        </div>
      </div>
    </PageScaffold>
  );
}

function ApiPage() {
  const [tab, setTab] = useState("GET /api/gap");
  return (
    <PageScaffold
      eyebrow="INTEGRATION CENTER"
      title="API & Integration Center"
      description="Connect SkillPulse intelligence to existing planning workflows through a clear, REST-style interface."
    >
      <div className="api-status">
        <div>
          <span /> API status <b>Operational</b>
        </div>
        <div>
          Requests today <b>18,421</b>
        </div>
        <div>
          Avg response <b>184ms</b>
        </div>
      </div>
      <div className="api-layout">
        <div className="panel api-menu">
          <p className="eyebrow">ENDPOINTS</p>
          {[
            "GET /api/demand",
            "GET /api/supply",
            "GET /api/gap",
            "GET /api/forecast",
            "GET /api/districts",
            "GET /api/alerts",
          ].map((item) => (
            <button
              className={tab === item ? "active" : ""}
              onClick={() => setTab(item)}
              key={item}
            >
              <span className="method">GET</span>
              {item.replace("GET ", "")}
              <ChevronRight size={14} />
            </button>
          ))}
        </div>
        <div className="panel api-code">
          <div className="code-head">
            <span>{tab}</span>
            <button className="icon-button">
              <Download size={15} />
            </button>
          </div>
          <pre>{`{
  "district": "Jaipur",
  "state": "Rajasthan",
  "skill": "AI/ML",
  "forecast_demand": 42500,
  "forecast_supply": 27100,
  "projected_gap": 15400,
  "risk": "HIGH",
  "confidence": 0.91
}`}</pre>
          <div className="code-response">
            <span>200</span> Response · application/json
          </div>
        </div>
      </div>
    </PageScaffold>
  );
}

function MethodologyPage() {
  return (
    <PageScaffold
      eyebrow="TRANSPARENCY LAYER"
      title="How SkillPulse AI works"
      description="A transparent intelligence pipeline designed to make every forecast explainable to a planner."
    >
      <div className="method-flow">
        {[
          "Data sources",
          "Ingestion & cleaning",
          "NCO / NSQF mapping",
          "Feature engineering",
          "Demand + supply index",
          "Forecasting engine",
          "Gap + risk logic",
          "Recommendation",
        ].map((step, i) => (
          <div key={step}>
            <span>0{i + 1}</span>
            <b>{step}</b>
            {i < 7 && <ChevronRight size={16} />}
          </div>
        ))}
      </div>
      <div className="method-grid">
        <div className="panel formula-panel">
          <p className="eyebrow">CORE LOGIC</p>
          <h2>Projected gap</h2>
          <div className="formula">
            Forecast demand <b>−</b> forecast supply <b>=</b>{" "}
            <strong>projected gap</strong>
          </div>
          <div className="logic-row">
            <span className="critical" /> Positive large gap <b>Shortage</b>
          </div>
          <div className="logic-row">
            <span className="balanced" /> Near-zero gap <b>Balanced</b>
          </div>
          <div className="logic-row">
            <span className="oversupply" /> Negative large gap <b>Oversupply</b>
          </div>
        </div>
        <div className="panel model-panel">
          <p className="eyebrow">MODEL EVALUATION</p>
          <h2>Confidence, not certainty</h2>
          <div className="model-metrics">
            <div>
              <b>8.7%</b>
              <span>MAPE</span>
            </div>
            <div>
              <b>0.42</b>
              <span>RMSE</span>
            </div>
            <div>
              <b>91%</b>
              <span>Backtest fit</span>
            </div>
          </div>
          <p>
            Forecast confidence reflects historical validation, signal quality,
            freshness and agreement across ensemble models.
          </p>
          <button className="text-button">
            View validation notes <ChevronRight size={14} />
          </button>
        </div>
      </div>
      <div className="panel architecture">
        <div className="panel-head">
          <div>
            <p className="eyebrow">SYSTEM ARCHITECTURE</p>
            <h2>Signals become action</h2>
          </div>
        </div>
        <div className="architecture-row">
          {[
            ["01", "DATA", "NCS · PLFS · e-Shram"],
            ["02", "INTELLIGENCE", "NLP · skill mapping"],
            ["03", "FORECAST", "Time series · XGBoost"],
            ["04", "DECISION", "Gap · risk · alerts"],
            ["05", "ACTION", "Dashboard · API · reports"],
          ].map((item, i) => (
            <div key={item[1]}>
              <span>{item[0]}</span>
              <b>{item[1]}</b>
              <small>{item[2]}</small>
              {i < 4 && <ChevronRight size={16} />}
            </div>
          ))}
        </div>
      </div>
    </PageScaffold>
  );
}

function GenericAnalyticsPage({
  title,
  eyebrow,
  description,
}: {
  title: string;
  eyebrow: string;
  description: string;
}) {
  return (
    <PageScaffold eyebrow={eyebrow} title={title} description={description}>
      <div className="analytics-top">
        <div className="panel big-stat">
          <p className="eyebrow">SIGNAL INDEX</p>
          <b>82.4</b>
          <span>
            <ArrowUpRight size={15} /> +12.4% vs last year
          </span>
          <div className="sparkline">
            <i />
            <i />
            <i />
            <i />
            <i />
            <i />
            <i />
            <i />
          </div>
        </div>
        <div className="panel bar-panel">
          <div className="panel-head">
            <h2>Demand by sector</h2>
            <span className="muted">Current index</span>
          </div>
          <ResponsiveContainer width="100%" height={180}>
            <BarChart
              data={sectorData}
              layout="vertical"
              margin={{ left: 10, right: 10 }}
            >
              <XAxis type="number" hide />
              <YAxis
                type="category"
                dataKey="name"
                axisLine={false}
                tickLine={false}
                width={95}
                tick={{ fill: "#756a72", fontSize: 11 }}
              />
              <Bar dataKey="demand" fill="#e889a8" radius={[0, 5, 5, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
      <div className="two-col">
        <div className="panel">
          <div className="panel-head">
            <div>
              <p className="eyebrow">EMERGING SKILLS</p>
              <h2>Skills gaining momentum</h2>
            </div>
          </div>
          <div className="skill-list">
            {skills.map((skill) => (
              <div className="skill-row" key={skill.name}>
                <span className="skill-number">
                  <Sparkles size={14} />
                </span>
                <div>
                  <b>{skill.name}</b>
                  <small>
                    {skill.demand} current demand · {skill.confidence}{" "}
                    confidence
                  </small>
                </div>
                <strong>{skill.growth}</strong>
              </div>
            ))}
          </div>
        </div>
        <Recommendation compact />
      </div>
    </PageScaffold>
  );
}

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [page, setPage] = useState<Page>("overview");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [state, setState] = useState("India");
  const [district, setDistrict] = useState("All districts");
  const [search, setSearch] = useState("");
  const currentTitle =
    navGroups.flatMap((g) => g.items).find((item) => item[0] === page)?.[1] ??
    "Overview";
  const filteredNav = navGroups
    .map((group) => ({
      ...group,
      items: group.items.filter(
        (item) =>
          !search || item[1].toLowerCase().includes(search.toLowerCase()),
      ),
    }))
    .filter((group) => group.items.length);
  if (!loggedIn) return <Login onEnter={() => setLoggedIn(true)} />;
  const renderPage = () => {
    if (page === "overview")
      return (
        <Overview
          setPage={setPage}
          state={state}
          setState={setState}
          district={district}
          setDistrict={setDistrict}
        />
      );
    if (page === "forecast") return <ForecastPage />;
    if (page === "warnings") return <WarningsPage setPage={setPage} />;
    if (page === "scenario") return <ScenarioPage />;
    if (page === "districts") return <DistrictPage />;
    if (page === "gap") return <GapPage />;
    if (page === "sources") return <SourcesPage />;
    if (page === "api") return <ApiPage />;
    if (page === "methodology") return <MethodologyPage />;
    return (
      <GenericAnalyticsPage
        title={
          page === "demand"
            ? "Labour Demand Intelligence"
            : page === "supply"
              ? "Training Supply & Capacity Intelligence"
              : "Sector Intelligence"
        }
        eyebrow={
          page === "demand"
            ? "DEMAND SIGNALS"
            : page === "supply"
              ? "SUPPLY SIGNALS"
              : "SECTOR SIGNALS"
        }
        description={
          page === "demand"
            ? "Understand where hiring momentum is building and which skills are shaping the next wave."
            : page === "supply"
              ? "See how current training capacity compares with workforce demand and placement outcomes."
              : "Compare demand growth, training capacity and forecast gaps across priority sectors."
        }
      />
    );
  };
  return (
    <div className="app-shell">
      <aside className={`sidebar ${mobileOpen ? "open" : ""}`}>
        <div className="sidebar-brand">
          <div className="brand-mark">
            <Zap size={18} fill="currentColor" />
          </div>
          <span>
            SKILLPULSE <b>AI</b>
          </span>
          <button className="mobile-close" onClick={() => setMobileOpen(false)}>
            <X size={18} />
          </button>
        </div>
        <div className="workspace-pill">
          <span className="avatar">MS</span>
          <span>
            <b>MSDE Planning</b>
            <small>Central workspace</small>
          </span>
          <ChevronDown size={14} />
        </div>
        <nav>
          {filteredNav.map((group) => (
            <div className="nav-group" key={group.label}>
              <p>{group.label}</p>
              {group.items.map(([key, label, Icon]) => (
                <button
                  className={page === key ? "active" : ""}
                  key={key}
                  onClick={() => {
                    setPage(key as Page);
                    setMobileOpen(false);
                  }}
                >
                  <Icon size={17} />
                  <span>{label}</span>
                  {key === "warnings" && <b className="nav-count">12</b>}
                </button>
              ))}
            </div>
          ))}
        </nav>
        <div className="sidebar-bottom">
          <div className="system-status">
            <span />
            <div>
              <b>System operational</b>
              <small>Refresh in 42 min</small>
            </div>
          </div>
          <div className="sidebar-user">
            <div className="avatar rose">AP</div>
            <span>
              <b>Ananya Prakash</b>
              <small>Central Planner</small>
            </span>
            <Settings size={16} />
          </div>
        </div>
      </aside>
      <main className="main">
        <header className="topbar">
          <button className="mobile-menu" onClick={() => setMobileOpen(true)}>
            <Menu size={20} />
          </button>
          <div className="breadcrumb">
            <span>SkillPulse AI</span>
            <ChevronRight size={14} />
            <b>{currentTitle}</b>
          </div>
          <div className="top-actions">
            <label className="search">
              <Search size={16} />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search intelligence..."
              />
            </label>
            <span className="refresh">
              <span /> Updated 8 min ago
            </span>
            <button className="icon-button notification">
              <Bell size={17} />
              <i />
            </button>
            <div className="avatar rose">AP</div>
          </div>
        </header>
        <div className="content">
          {renderPage()}
          <footer>
            <span>SKILLPULSE AI · SIH26246</span>
            <span>Aggregated planning insights · Prototype demo · 2026</span>
          </footer>
        </div>
      </main>
    </div>
  );
}

export default App;
