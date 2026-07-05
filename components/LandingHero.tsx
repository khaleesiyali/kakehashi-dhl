"use client";

import Link from "next/link";

const STATS = [
  { value: "38%", label: "Driver shortfall by 2030" },
  { value: "88.8%", label: "Freight moved by truck" },
  { value: "40%", label: "Average truck load factor" },
  { value: "28%", label: "CO₂ reduction in JPIC pilot" },
];

const FEATURES = [
  {
    title: "Data Governance",
    tag: "Eclipse Dataspace Connector",
    desc: "Competitors share only what they agree to. Customer identities and contract prices never leave each company's own connector — enforced technically, not by trust.",
  },
  {
    title: "AI Route Optimization",
    tag: "DHL Control Tower",
    desc: "DHL's internal engine scores each shipment by CO₂, cost, and partner reliability. Human dispatchers make the final call. The system automatically protects service commitments.",
  },
  {
    title: "Ouranos Ecosystem",
    tag: "Japan Government Infrastructure",
    desc: "Built on Japan's own METI-backed data-sharing network — already proven to interoperate with Europe's Catena-X. No new governing body required.",
  },
];

const TRACKS = [
  {
    label: "Track A",
    title: "Shared Corridor",
    status: "Phase 0",
    statusColor: "var(--gold)",
    desc: "Pilot for sharing trunk-transport capacity on the Tokyo–Osaka corridor, governed by JPIC.",
  },
  {
    label: "Track B",
    title: "Digital-Twin Warehouses",
    status: "Live",
    statusColor: "var(--teal)",
    desc: "Real-time asset administration shell deployment across DHL Japan warehouse network.",
  },
];

export default function LandingHero() {
  return (
    <div style={{ backgroundColor: "var(--navy)" }}>
      {/* ── Hero ───────────────────────────────────────────────── */}
      <section
        className="relative overflow-hidden px-6 py-28 text-center"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0,180,166,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(0,180,166,0.04) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      >
        {/* Glow */}
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full blur-[120px] pointer-events-none"
          style={{ backgroundColor: "rgba(0,180,166,0.07)" }}
        />

        <div className="relative max-w-3xl mx-auto">
          <span
            className="inline-block text-xs font-semibold tracking-widest px-3 py-1 rounded-full mb-6"
            style={{
              backgroundColor: "rgba(0,180,166,0.12)",
              color: "var(--teal)",
              border: "1px solid rgba(0,180,166,0.25)",
            }}
          >
            Japan Shared Freight Initiative
          </span>

          <h1
            className="text-5xl sm:text-6xl font-bold leading-tight mb-6"
            style={{ color: "var(--offwhite)", letterSpacing: "-0.02em" }}
          >
            Bridging Japan&apos;s
            <br />
            <span style={{ color: "var(--teal)" }}>Logistics Networks</span>
          </h1>

          <p
            className="text-lg leading-8 mb-10 max-w-2xl mx-auto"
            style={{ color: "var(--blue-muted)" }}
          >
            A privacy-preserving shared corridor for Japan&apos;s trunk freight — reducing carbon
            emissions, addressing the driver shortage, and improving load factors without
            exchanging a single sensitive field.
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/login"
              className="px-7 py-3 rounded-lg font-semibold text-sm transition-all"
              style={{ backgroundColor: "var(--teal)", color: "var(--navy)" }}
            >
              Access Dashboard
            </Link>
            <a
              href="#architecture"
              className="px-7 py-3 rounded-lg font-semibold text-sm transition-all"
              style={{
                border: "1px solid var(--navy-3)",
                color: "var(--offwhite)",
                backgroundColor: "transparent",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "var(--teal)";
                e.currentTarget.style.color = "var(--teal)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "var(--navy-3)";
                e.currentTarget.style.color = "var(--offwhite)";
              }}
            >
              View Architecture
            </a>
          </div>
        </div>
      </section>

      {/* ── Stats bar ──────────────────────────────────────────── */}
      <section
        style={{ borderTop: "1px solid var(--navy-2)", borderBottom: "1px solid var(--navy-2)" }}
      >
        <div className="max-w-5xl mx-auto px-6 py-10 grid grid-cols-2 sm:grid-cols-4 gap-8">
          {STATS.map(({ value, label }) => (
            <div key={label} className="text-center">
              <p
                className="text-3xl font-bold mb-1"
                style={{ color: "var(--teal)" }}
              >
                {value}
              </p>
              <p className="text-xs leading-5" style={{ color: "var(--blue-muted)" }}>
                {label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Feature cards ──────────────────────────────────────── */}
      <section id="architecture" className="max-w-6xl mx-auto px-6 py-20">
        <div className="text-center mb-12">
          <h2
            className="text-2xl font-bold mb-3"
            style={{ color: "var(--offwhite)" }}
          >
            Built on Proven Infrastructure
          </h2>
          <p className="text-sm" style={{ color: "var(--blue-muted)" }}>
            Every layer already exists and runs in production elsewhere. Kakehashi applies it to logistics.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {FEATURES.map(({ title, tag, desc }) => (
            <div
              key={title}
              className="rounded-xl p-6 transition-all"
              style={{
                backgroundColor: "var(--navy-2)",
                border: "1px solid var(--navy-3)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "var(--teal)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "var(--navy-3)";
              }}
            >
              <span
                className="inline-block text-xs px-2.5 py-1 rounded-full mb-4 font-medium"
                style={{
                  backgroundColor: "rgba(0,180,166,0.12)",
                  color: "var(--teal)",
                }}
              >
                {tag}
              </span>
              <h3
                className="text-base font-semibold mb-2"
                style={{ color: "var(--offwhite)" }}
              >
                {title}
              </h3>
              <p className="text-sm leading-6" style={{ color: "var(--blue-muted)" }}>
                {desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Network status ─────────────────────────────────────── */}
      <section
        id="network"
        className="max-w-6xl mx-auto px-6 pb-20"
      >
        <div className="text-center mb-10">
          <h2
            className="text-2xl font-bold mb-3"
            style={{ color: "var(--offwhite)" }}
          >
            Network Status
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {TRACKS.map(({ label, title, status, statusColor, desc }) => (
            <div
              key={label}
              className="rounded-xl p-6"
              style={{
                backgroundColor: "var(--navy-2)",
                borderLeft: `4px solid ${statusColor}`,
              }}
            >
              <div className="flex items-center justify-between mb-3">
                <div>
                  <span
                    className="text-xs font-semibold uppercase tracking-widest"
                    style={{ color: statusColor }}
                  >
                    {label}
                  </span>
                  <h3
                    className="text-base font-semibold mt-1"
                    style={{ color: "var(--offwhite)" }}
                  >
                    {title}
                  </h3>
                </div>
                <span
                  className="text-xs px-3 py-1 rounded-full font-semibold"
                  style={{
                    backgroundColor: `${statusColor}22`,
                    color: statusColor,
                    border: `1px solid ${statusColor}44`,
                  }}
                >
                  {status}
                </span>
              </div>
              <p className="text-sm leading-6" style={{ color: "var(--blue-muted)" }}>
                {desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── About section ──────────────────────────────────────── */}
      <section
        id="about"
        style={{ borderTop: "1px solid var(--navy-2)" }}
        className="max-w-6xl mx-auto px-6 py-20"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-2xl font-bold mb-4" style={{ color: "var(--offwhite)" }}>
              The 2024 Problem
            </h2>
            <p className="text-sm leading-7 mb-4" style={{ color: "var(--blue-muted)" }}>
              Japan faces a projected 38% shortfall in truck drivers by 2030. With 88.8% of
              domestic freight moving by road and an average load factor of just 40%, most
              trucks run half-empty — a dual crisis of carbon and labour.
            </p>
            <p className="text-sm leading-7" style={{ color: "var(--blue-muted)" }}>
              Kakehashi proposes a privacy-preserving shared corridor inspired by Catena-X,
              the automotive industry&apos;s proven data-sharing standard, adapted for logistics
              through Japan&apos;s own Ouranos Ecosystem.
            </p>
          </div>
          <div className="space-y-4">
            {[
              { metric: "20%", detail: "Load factor improvement — JPIC chemicals pilot" },
              { metric: "36%", detail: "CO₂ reduction — Seino, Nippon Express, Japan Post, Yamato joint relay" },
              { metric: "46%", detail: "Carbon footprint error reduction — Catena-X Ford/Flex/Micron pilot" },
            ].map(({ metric, detail }) => (
              <div
                key={metric}
                className="flex items-center gap-4 rounded-xl px-5 py-4"
                style={{ backgroundColor: "var(--navy-2)" }}
              >
                <span
                  className="text-2xl font-bold shrink-0"
                  style={{ color: "var(--teal)" }}
                >
                  {metric}
                </span>
                <p className="text-sm" style={{ color: "var(--blue-muted)" }}>
                  {detail}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Footer ─────────────────────────────────────────────── */}
      <footer
        style={{ borderTop: "1px solid var(--navy-2)" }}
        className="px-6 py-10"
      >
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/kakehashi-logo.svg" alt="KAKEHASHI" style={{ height: "24px", width: "auto" }} />
          <p className="text-xs" style={{ color: "var(--blue-muted)" }}>
            © 2026 Kakehashi 
          </p>
        </div>
      </footer>
    </div>
  );
}
