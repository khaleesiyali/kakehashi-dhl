"use client";

import MetricCard from "./MetricCard";
import type { Section } from "@/lib/types";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const CO2_DATA = [
  { month: "Jul", co2: 480 },
  { month: "Aug", co2: 720 },
  { month: "Sep", co2: 890 },
  { month: "Oct", co2: 1050 },
  { month: "Nov", co2: 1380 },
  { month: "Dec", co2: 1640 },
  { month: "Jan", co2: 1900 },
  { month: "Feb", co2: 2110 },
  { month: "Mar", co2: 2450 },
  { month: "Apr", co2: 2780 },
  { month: "May", co2: 3040 },
  { month: "Jun", co2: 3320 },
];

const LOAD_DATA = [
  { corridor: "TYO–OSA", before: 42, after: 78 },
  { corridor: "YOK–NGY", before: 38, after: 71 },
  { corridor: "OSA–FUK", before: 35, after: 68 },
  { corridor: "TYO–NGY", before: 44, after: 76 },
];

const RECENT_LANES = [
  { id: "KKH-2406-031", corridor: "Yokohama → Osaka", partner: "Yamato", co2: "−340 kg", savings: "¥45,000", status: "Completed" },
  { id: "KKH-2406-030", corridor: "Tokyo → Nagoya",   partner: "Sagawa", co2: "−280 kg", savings: "¥38,000", status: "Completed" },
  { id: "KKH-2406-029", corridor: "Osaka → Fukuoka",  partner: "Yamato", co2: "−410 kg", savings: "¥52,000", status: "Completed" },
  { id: "KKH-2406-028", corridor: "Tokyo → Osaka",    partner: "Sagawa", co2: "−370 kg", savings: "¥48,000", status: "Completed" },
];

const TOOLTIP_STYLE = {
  backgroundColor: "#1A2E45",
  border: "1px solid #16324A",
  borderRadius: "8px",
  color: "#F8FAFC",
  fontSize: "12px",
};

interface DashboardViewProps {
  co2Saved: number;
  routeSavings: number;
  lanesDispatched: number;
  onReset: () => void;
  onNavigate: (section: Section) => void;
}

export default function DashboardView({
  co2Saved,
  routeSavings,
  lanesDispatched,
  onReset,
  onNavigate,
}: DashboardViewProps) {
  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-bold" style={{ color: "var(--offwhite)" }}>
            Dashboard
          </h1>
          <p className="text-sm mt-1" style={{ color: "var(--blue-muted)" }}>
            Cumulative performance across all Kakehashi shared lanes
          </p>
        </div>
        <button
          onClick={onReset}
          className="text-xs px-4 py-2 rounded-lg transition-colors"
          style={{
            border: "1px solid var(--navy-3)",
            color: "var(--blue-muted)",
            backgroundColor: "transparent",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = "var(--teal)";
            e.currentTarget.style.borderColor = "var(--teal)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = "var(--blue-muted)";
            e.currentTarget.style.borderColor = "var(--navy-3)";
          }}
        >
          Reset Demo
        </button>
      </div>

      {/* KPI cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <MetricCard label="Cumulative Carbon Reduction" value={co2Saved.toLocaleString()} unit="kg CO₂" />
        <MetricCard label="Accumulated Route Savings"   value={`¥${routeSavings.toLocaleString()}`} unit="" />
        <MetricCard label="Dispatched Kakehashi Lanes"  value={lanesDispatched.toString()} unit="lanes" />
      </div>

      {/* Charts row */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mb-8">

        {/* CO₂ reduction trend */}
        <div
          className="rounded-xl p-5"
          style={{ backgroundColor: "var(--navy-2)", border: "1px solid var(--navy-3)" }}
        >
          <p className="text-sm font-semibold mb-1" style={{ color: "var(--offwhite)" }}>
            CO₂ Reduction Trend
          </p>
          <p className="text-xs mb-5" style={{ color: "var(--blue-muted)" }}>
            Monthly cumulative kg saved via shared lanes
          </p>
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={CO2_DATA} margin={{ top: 4, right: 8, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="co2Grad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%"  stopColor="#00B4A6" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#00B4A6" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#16324A" />
              <XAxis dataKey="month" tick={{ fill: "#A0B8C8", fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: "#A0B8C8", fontSize: 11 }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={TOOLTIP_STYLE} formatter={(v) => [v != null ? `${Number(v).toLocaleString()} kg` : "—", "CO₂ saved"]} />
              <Area type="monotone" dataKey="co2" stroke="#00B4A6" strokeWidth={2} fill="url(#co2Grad)" dot={false} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Load factor improvement */}
        <div
          className="rounded-xl p-5"
          style={{ backgroundColor: "var(--navy-2)", border: "1px solid var(--navy-3)" }}
        >
          <p className="text-sm font-semibold mb-1" style={{ color: "var(--offwhite)" }}>
            Load Factor by Corridor
          </p>
          <p className="text-xs mb-5" style={{ color: "var(--blue-muted)" }}>
            Before vs. after Kakehashi lane consolidation (%)
          </p>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={LOAD_DATA} margin={{ top: 4, right: 8, left: -20, bottom: 0 }} barCategoryGap="30%" barGap={4}>
              <CartesianGrid strokeDasharray="3 3" stroke="#16324A" />
              <XAxis dataKey="corridor" tick={{ fill: "#A0B8C8", fontSize: 10 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: "#A0B8C8", fontSize: 11 }} axisLine={false} tickLine={false} domain={[0, 100]} />
              <Tooltip contentStyle={TOOLTIP_STYLE} formatter={(v) => [`${v}%`]} />
              <Legend wrapperStyle={{ fontSize: "11px", color: "#A0B8C8" }} />
              <Bar dataKey="before" name="Before" fill="#3B6A8E" radius={[3, 3, 0, 0]} activeBar={{ fill: "#4D84A8" }} />
              <Bar dataKey="after"  name="After"  fill="#00B4A6" radius={[3, 3, 0, 0]} activeBar={{ fill: "#33D4C4" }} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent shared lanes */}
      <div
        className="rounded-xl overflow-hidden mb-8"
        style={{ border: "1px solid var(--navy-2)" }}
      >
        <div className="px-5 py-3 flex items-center justify-between" style={{ backgroundColor: "var(--navy-2)" }}>
          <h3 className="text-sm font-semibold" style={{ color: "var(--offwhite)" }}>
            Recent Shared Lanes
          </h3>
          <span className="text-xs" style={{ color: "var(--blue-muted)" }}>Last 4 dispatches</span>
        </div>
        <div className="overflow-x-auto" style={{ backgroundColor: "var(--navy)" }}>
          <table className="w-full text-xs min-w-[580px]">
            <thead>
              <tr style={{ borderBottom: "1px solid var(--navy-2)" }}>
                {["Lane ID", "Corridor", "Partner", "CO₂ Saving", "Cost Saving", "Status"].map((col) => (
                  <th
                    key={col}
                    className="px-4 py-2.5 text-left font-medium"
                    style={{ color: "var(--blue-muted)" }}
                  >
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {RECENT_LANES.map((row, i) => (
                <tr
                  key={row.id}
                  style={{ borderBottom: i < RECENT_LANES.length - 1 ? "1px solid var(--navy-2)" : undefined }}
                >
                  <td className="px-4 py-2.5 font-mono" style={{ color: "var(--teal)" }}>{row.id}</td>
                  <td className="px-4 py-2.5" style={{ color: "var(--offwhite)" }}>{row.corridor}</td>
                  <td className="px-4 py-2.5" style={{ color: "var(--offwhite)" }}>{row.partner}</td>
                  <td className="px-4 py-2.5" style={{ color: "var(--teal)" }}>{row.co2}</td>
                  <td className="px-4 py-2.5" style={{ color: "var(--gold)" }}>{row.savings}</td>
                  <td className="px-4 py-2.5">
                    <span
                      className="px-2.5 py-0.5 rounded-full text-xs font-medium"
                      style={{ backgroundColor: "rgba(0,180,166,0.15)", color: "var(--teal)" }}
                    >
                      {row.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Quick actions */}
      <h2
        className="text-xs font-semibold uppercase tracking-widest mb-4"
        style={{ color: "var(--blue-muted)" }}
      >
        Quick Actions
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <button
          onClick={() => onNavigate("govern")}
          className="rounded-xl p-5 text-left transition-all"
          style={{ backgroundColor: "var(--navy-2)", border: "1px solid var(--navy-3)" }}
          onMouseEnter={(e) => { e.currentTarget.style.borderColor = "var(--teal)"; }}
          onMouseLeave={(e) => { e.currentTarget.style.borderColor = "var(--navy-3)"; }}
        >
          <p className="text-xs font-semibold uppercase tracking-widest mb-1" style={{ color: "var(--teal)" }}>Govern</p>
          <p className="text-sm font-semibold mb-1" style={{ color: "var(--offwhite)" }}>Run Cross-Match Protocol</p>
          <p className="text-xs" style={{ color: "var(--blue-muted)" }}>
            Simulate EDC-based data exchange between DHL and partner nodes
          </p>
        </button>
        <button
          onClick={() => onNavigate("optimize")}
          className="rounded-xl p-5 text-left transition-all"
          style={{ backgroundColor: "var(--navy-2)", border: "1px solid var(--navy-3)" }}
          onMouseEnter={(e) => { e.currentTarget.style.borderColor = "var(--teal)"; }}
          onMouseLeave={(e) => { e.currentTarget.style.borderColor = "var(--navy-3)"; }}
        >
          <p className="text-xs font-semibold uppercase tracking-widest mb-1" style={{ color: "var(--teal)" }}>Optimize</p>
          <p className="text-sm font-semibold mb-1" style={{ color: "var(--offwhite)" }}>Dispatch Pending Shipments</p>
          <p className="text-xs" style={{ color: "var(--blue-muted)" }}>
            Review AI routing recommendations and approve lane assignments
          </p>
        </button>
      </div>
    </div>
  );
}
