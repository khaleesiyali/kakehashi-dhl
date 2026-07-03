"use client";

import { useState } from "react";
import Terminal from "./Terminal";
import ArchitecturePanel from "./ArchitecturePanel";

const ROUTES = ["Yokohama → Osaka", "Tokyo → Nagoya"];
const CARGO_TYPES = ["Ambient, Standard Pallet", "Temperature-Controlled", "Hazmat Class 3"];

interface DhlState {
  customerId: string;
  contractPrice: string;
  route: string;
  departureWindow: string;
  cargoType: string;
  spareCapacity: string;
}

interface YamatoState {
  customerId: string;
  contractPrice: string;
  route: string;
  departureWindow: string;
  cargoType: string;
  cargoLoadNeeded: string;
}

const DHL_DEFAULTS: DhlState = {
  customerId: "CUST-EINSTEIN-8819",
  contractPrice: "¥450,000",
  route: "Yokohama → Osaka",
  departureWindow: "14:00",
  cargoType: "Ambient, Standard Pallet",
  spareCapacity: "3.2",
};

const YAMATO_DEFAULTS: YamatoState = {
  customerId: "YAM-TAKESHIMA-9921",
  contractPrice: "¥390,000",
  route: "Yokohama → Osaka",
  departureWindow: "14:00",
  cargoType: "Ambient, Standard Pallet",
  cargoLoadNeeded: "2.8",
};

type MatchResult = "match" | "no-match" | null;

const INPUT_STYLE: React.CSSProperties = {
  backgroundColor: "var(--navy)",
  color: "var(--offwhite)",
  border: "1px solid var(--navy-3)",
};

const INPUT_STYLE_YAMATO: React.CSSProperties = {
  backgroundColor: "var(--navy-2)",
  color: "var(--offwhite)",
  border: "1px solid var(--navy-3)",
};

function NodeField({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label
        className="block text-xs mb-1.5 font-medium"
        style={{ color: "var(--blue-muted)" }}
      >
        {label}
      </label>
      {children}
    </div>
  );
}

const inputClass =
  "w-full px-3 py-2 rounded-lg text-sm outline-none transition-colors";

export default function GovernTab() {
  const [dhl, setDhl] = useState<DhlState>(DHL_DEFAULTS);
  const [yamato, setYamato] = useState<YamatoState>(YAMATO_DEFAULTS);
  const [running, setRunning] = useState(false);
  const [terminalLines, setTerminalLines] = useState<string[]>([]);
  const [matchResult, setMatchResult] = useState<MatchResult>(null);
  const [showWhatCrossed, setShowWhatCrossed] = useState(false);

  const runProtocol = () => {
    if (running) return;
    setRunning(true);
    setTerminalLines([]);
    setMatchResult(null);
    setShowWhatCrossed(false);

    const compatible = dhl.cargoType === yamato.cargoType;

    const lines = [
      "[DHL NODE]    Initializing Eclipse Dataspace Connector (EDC) instance ...",
      "[YAMATO NODE] Initializing Eclipse Dataspace Connector (EDC) instance ...",
      "[FILTER]      Customer ID     → [REDACTED]  (stays on DHL's EDC, never published)",
      "[FILTER]      Contract Price  → [REDACTED]  (stays on DHL's EDC, never published)",
      "[FILTER]      Customer ID     → [REDACTED]  (stays on Yamato's EDC, never published)",
      "[FILTER]      Contract Price  → [REDACTED]  (stays on Yamato's EDC, never published)",
      `[AAS QUERY]   Fetching Cargo Compatibility Submodel — DHL: ${dhl.cargoType}`,
      `[AAS QUERY]   Fetching Cargo Compatibility Submodel — Yamato: ${yamato.cargoType}`,
      `[AAS MATCH]   Compatibility submodels compared → ${compatible ? "MATCH ✓" : "NO MATCH ✗"}`,
      "[NETWORK]     Catalog published via Ouranos Ecosystem data space",
      compatible
        ? "[MATCH]       ✅ Match found."
        : "[MATCH]       ❌ No safe match — compatibility constraint failed.",
    ];

    lines.forEach((line, i) => {
      setTimeout(() => {
        setTerminalLines((prev) => [...prev, line]);
        if (i === lines.length - 1) {
          setMatchResult(compatible ? "match" : "no-match");
          setRunning(false);
        }
      }, 220 * (i + 1));
    });
  };

  return (
    <div className="pb-12">
      <h2 className="text-lg font-semibold mb-2" style={{ color: "var(--offwhite)" }}>
        Kakehashi Network Node
      </h2>
      <p className="text-sm mb-6" style={{ color: "var(--blue-muted)" }}>
        Each company runs its own Eclipse Dataspace Connector. Private fields never leave their
        node — only the AAS compatibility submodels are compared across the network.
      </p>

      {/* Three-column node grid */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_56px_1fr] gap-4 items-start mb-8">
        {/* DHL Node */}
        <div className="rounded-xl p-6" style={{ backgroundColor: "var(--navy-2)" }}>
          <div className="flex flex-wrap items-center gap-2 mb-5">
            <h3 className="font-semibold text-sm" style={{ color: "var(--offwhite)" }}>
              DHL Node
            </h3>
            <span
              className="text-xs px-2.5 py-0.5 rounded-full ml-auto"
              style={{ backgroundColor: "rgba(255,138,138,0.15)", color: "var(--rose)" }}
            >
              Private — never crosses the network
            </span>
          </div>
          <div className="space-y-3.5">
            <NodeField label="Customer ID">
              <input className={inputClass} style={INPUT_STYLE} value={dhl.customerId}
                onChange={(e) => setDhl((d) => ({ ...d, customerId: e.target.value }))} />
            </NodeField>
            <NodeField label="Contract Price">
              <input className={inputClass} style={INPUT_STYLE} value={dhl.contractPrice}
                onChange={(e) => setDhl((d) => ({ ...d, contractPrice: e.target.value }))} />
            </NodeField>
            <NodeField label="Trunk Route Corridor">
              <select className={inputClass} style={INPUT_STYLE} value={dhl.route}
                onChange={(e) => setDhl((d) => ({ ...d, route: e.target.value }))}>
                {ROUTES.map((r) => <option key={r}>{r}</option>)}
              </select>
            </NodeField>
            <NodeField label="Departure Window">
              <input className={inputClass} style={INPUT_STYLE} value={dhl.departureWindow}
                onChange={(e) => setDhl((d) => ({ ...d, departureWindow: e.target.value }))} />
            </NodeField>
            <NodeField label="Cargo Compatibility">
              <select className={inputClass} style={INPUT_STYLE} value={dhl.cargoType}
                onChange={(e) => setDhl((d) => ({ ...d, cargoType: e.target.value }))}>
                {CARGO_TYPES.map((c) => <option key={c}>{c}</option>)}
              </select>
            </NodeField>
            <NodeField label="Spare Capacity (m³)">
              <input type="number" step="0.1" min="0" className={inputClass} style={INPUT_STYLE}
                value={dhl.spareCapacity}
                onChange={(e) => setDhl((d) => ({ ...d, spareCapacity: e.target.value }))} />
            </NodeField>
          </div>
        </div>

        {/* Gate */}
        <div className="hidden lg:flex flex-col items-center justify-center pt-12 gap-2">
          <div
            className="w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold shrink-0"
            style={{ backgroundColor: "var(--navy-2)", color: "var(--teal)", border: "2px solid var(--teal)" }}
          >
            ⇄
          </div>
          <div className="w-px flex-1" style={{ backgroundColor: "var(--navy-2)", minHeight: "60px" }} />
        </div>

        {/* Yamato Node */}
        <div className="rounded-xl p-6" style={{ backgroundColor: "var(--navy-3)" }}>
          <div className="flex flex-wrap items-center gap-2 mb-5">
            <h3 className="font-semibold text-sm" style={{ color: "var(--offwhite)" }}>
              Yamato Node
            </h3>
            <span
              className="text-xs px-2.5 py-0.5 rounded-full ml-auto"
              style={{ backgroundColor: "rgba(255,138,138,0.15)", color: "var(--rose)" }}
            >
              Private — never crosses the network
            </span>
          </div>
          <div className="space-y-3.5">
            <NodeField label="Customer ID">
              <input className={inputClass} style={INPUT_STYLE_YAMATO} value={yamato.customerId}
                onChange={(e) => setYamato((y) => ({ ...y, customerId: e.target.value }))} />
            </NodeField>
            <NodeField label="Contract Price">
              <input className={inputClass} style={INPUT_STYLE_YAMATO} value={yamato.contractPrice}
                onChange={(e) => setYamato((y) => ({ ...y, contractPrice: e.target.value }))} />
            </NodeField>
            <NodeField label="Trunk Route Corridor">
              <select className={inputClass} style={INPUT_STYLE_YAMATO} value={yamato.route}
                onChange={(e) => setYamato((y) => ({ ...y, route: e.target.value }))}>
                {ROUTES.map((r) => <option key={r}>{r}</option>)}
              </select>
            </NodeField>
            <NodeField label="Departure Window">
              <input className={inputClass} style={INPUT_STYLE_YAMATO} value={yamato.departureWindow}
                onChange={(e) => setYamato((y) => ({ ...y, departureWindow: e.target.value }))} />
            </NodeField>
            <NodeField label="Cargo Compatibility">
              <select className={inputClass} style={INPUT_STYLE_YAMATO} value={yamato.cargoType}
                onChange={(e) => setYamato((y) => ({ ...y, cargoType: e.target.value }))}>
                {CARGO_TYPES.map((c) => <option key={c}>{c}</option>)}
              </select>
            </NodeField>
            <NodeField label="Cargo Load Needed (m³)">
              <input type="number" step="0.1" min="0" className={inputClass} style={INPUT_STYLE_YAMATO}
                value={yamato.cargoLoadNeeded}
                onChange={(e) => setYamato((y) => ({ ...y, cargoLoadNeeded: e.target.value }))} />
            </NodeField>
          </div>
        </div>
      </div>

      {/* Run button */}
      <div className="flex justify-center mb-6">
        <button
          onClick={runProtocol}
          disabled={running}
          className="px-8 py-3 rounded-xl font-semibold text-sm transition-all disabled:opacity-60 disabled:cursor-not-allowed"
          style={{
            backgroundColor: "var(--teal)",
            color: "var(--navy)",
          }}
        >
          {running ? "Running Protocol..." : "Run Cross-Match Protocol"}
        </button>
      </div>

      {/* Terminal output */}
      {terminalLines.length > 0 && (
        <div className="mb-4">
          <Terminal lines={terminalLines} />
        </div>
      )}

      {/* Match result banner */}
      {matchResult === "match" && (
        <div
          className="rounded-xl p-4 mb-4"
          style={{
            backgroundColor: "rgba(0,180,166,0.1)",
            border: "1px solid var(--teal)",
          }}
        >
          <p className="font-semibold text-sm mb-1" style={{ color: "var(--teal)" }}>
            ✅ MATCH FOUND
          </p>
          <p className="text-sm" style={{ color: "var(--offwhite)" }}>
            Combined load saves ~340 kg CO₂ and ~¥45,000 this week. Neither party has
            visibility into the other&apos;s internal customer matrices or pricing structures.
          </p>
          <button
            className="mt-3 text-xs underline"
            style={{ color: "var(--teal)" }}
            onClick={() => setShowWhatCrossed((v) => !v)}
          >
            {showWhatCrossed ? "▲ Hide" : "▼ Show"} what crossed vs. what stayed home
          </button>
          {showWhatCrossed && (
            <div className="mt-4 grid grid-cols-2 gap-6 text-xs">
              <div>
                <p className="font-semibold mb-2" style={{ color: "var(--teal)" }}>
                  ✅ Crossed the network
                </p>
                <ul className="space-y-1" style={{ color: "var(--offwhite)" }}>
                  <li>• Route segment</li>
                  <li>• Time window</li>
                  <li>• Spare capacity (m³)</li>
                  <li>• Cargo compatibility submodel</li>
                  <li>• CO₂ factor (kg/m³)</li>
                  <li>• Reliability score</li>
                </ul>
              </div>
              <div>
                <p className="font-semibold mb-2" style={{ color: "var(--rose)" }}>
                  🔒 Stayed home (never shared)
                </p>
                <ul className="space-y-1" style={{ color: "var(--offwhite)" }}>
                  <li>• Customer identity</li>
                  <li>• Contract price</li>
                  <li>• Cargo contents</li>
                  <li>• Internal shipment ID</li>
                  <li>• Pricing structures</li>
                </ul>
              </div>
            </div>
          )}
        </div>
      )}

      {matchResult === "no-match" && (
        <div
          className="rounded-xl p-4 mb-4"
          style={{
            backgroundColor: "rgba(255,138,138,0.08)",
            border: "1px solid var(--rose)",
          }}
        >
          <p className="font-semibold text-sm" style={{ color: "var(--rose)" }}>
            ❌ NO MATCH — Compatibility constraint failed
          </p>
          <p className="text-sm mt-1" style={{ color: "var(--blue-muted)" }}>
            DHL cargo ({dhl.cargoType}) is incompatible with Yamato cargo ({yamato.cargoType}).
            No data was exchanged. Neither company sees the other&apos;s information.
          </p>
        </div>
      )}

      {/* Architecture panel */}
      <div className="mt-8">
        <ArchitecturePanel />
      </div>
    </div>
  );
}
