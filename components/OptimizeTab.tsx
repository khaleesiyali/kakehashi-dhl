"use client";

import { useState, useCallback } from "react";
import MetricCard from "./MetricCard";
import OptionCard from "./OptionCard";
import { SHIPMENTS } from "@/lib/seeds";

type OptionKey = "A" | "B" | "C";

interface OptimizeTabProps {
  co2Saved: number;
  routeSavings: number;
  lanesDispatched: number;
  onApproveB: () => void;
}

export default function OptimizeTab({
  co2Saved,
  routeSavings,
  lanesDispatched,
  onApproveB,
}: OptimizeTabProps) {
  const [reliabilityScore, setReliabilityScore] = useState(96);
  const [selectedId, setSelectedId]             = useState(SHIPMENTS[0].id);
  const [selectedOption, setSelectedOption]     = useState<OptionKey>("B");
  const [approvedMessage, setApprovedMessage]   = useState("");

  const belowThreshold    = reliabilityScore < 90;
  const recommendedOption: OptionKey = belowThreshold ? "A" : "B";

  const handleApprove = useCallback(async () => {
    const isRecommended = selectedOption === recommendedOption;

    if (selectedOption === "B" && isRecommended) {
      const confetti = (await import("canvas-confetti")).default;
      confetti({
        particleCount: 160,
        spread: 80,
        origin: { y: 0.55 },
        colors: ["#00B4A6", "#F4B942", "#F8FAFC"],
      });
      onApproveB();
      setApprovedMessage(
        `✅ ${selectedId} dispatched on Kakehashi shared lane. CO₂ and cost savings logged.`
      );
    } else if (selectedOption === "A") {
      setApprovedMessage(
        `✅ ${selectedId} dispatched on DHL own fleet (Option A — safe fallback). No Kakehashi lane used; no shared savings recorded.`
      );
    } else {
      setApprovedMessage(
        `✅ ${selectedId} dispatched via Rail (Option C — green premium). Rail booking logged.`
      );
    }
  }, [selectedOption, recommendedOption, selectedId, onApproveB]);

  const OPTION_LABEL: Record<OptionKey, string> = {
    A: "Option A — Send Alone",
    B: "Option B — Consolidate",
    C: "Option C — Shift to Rail",
  };

  return (
    <div className="pb-12">
      <h2 className="text-lg font-semibold mb-2" style={{ color: "var(--offwhite)" }}>
        Control Tower Dashboard
      </h2>
      <p className="text-sm mb-6" style={{ color: "var(--blue-muted)" }}>
        DHL&apos;s internal AI engine recommends the optimal routing for each consignment.
        A human dispatcher makes the final call. The reliability slider shows how the system
        automatically protects DHL&apos;s SLA commitments.
      </p>

      {/* Metric cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <MetricCard
          label="Cumulative Carbon Reduction"
          value={co2Saved.toLocaleString()}
          unit="kg CO₂"
        />
        <MetricCard
          label="Accumulated Route Savings"
          value={`¥${routeSavings.toLocaleString()}`}
          unit=""
        />
        <MetricCard
          label="Dispatched Kakehashi Lanes"
          value={lanesDispatched.toString()}
          unit="lanes"
        />
      </div>

      {/* Pending shipments table */}
      <div
        className="rounded-xl overflow-hidden mb-6"
        style={{ border: "1px solid var(--navy-2)" }}
      >
        <div className="px-5 py-3" style={{ backgroundColor: "var(--navy-2)" }}>
          <h3 className="text-sm font-semibold" style={{ color: "var(--offwhite)" }}>
            Pending Shipments
          </h3>
        </div>
        <div className="overflow-x-auto" style={{ backgroundColor: "var(--navy)" }}>
          <table className="w-full text-xs min-w-[500px]">
            <thead>
              <tr style={{ borderBottom: "1px solid var(--navy-2)" }}>
                {["Consignment ID", "Origin", "Destination", "Pallets", "Departure Window"].map(
                  (col) => (
                    <th
                      key={col}
                      className="px-4 py-2.5 text-left font-medium"
                      style={{ color: "var(--blue-muted)" }}
                    >
                      {col}
                    </th>
                  )
                )}
              </tr>
            </thead>
            <tbody>
              {SHIPMENTS.map((s, i) => {
                const isActive = selectedId === s.id;
                return (
                  <tr
                    key={s.id}
                    className="cursor-pointer transition-colors"
                    style={{
                      borderBottom: i < SHIPMENTS.length - 1 ? "1px solid var(--navy-2)" : undefined,
                      backgroundColor: isActive ? "rgba(0,180,166,0.08)" : undefined,
                    }}
                    onClick={() => setSelectedId(s.id)}
                  >
                    <td
                      className="px-4 py-2.5 font-mono"
                      style={{ color: isActive ? "var(--teal)" : "var(--offwhite)" }}
                    >
                      {s.id}
                    </td>
                    <td className="px-4 py-2.5" style={{ color: "var(--offwhite)" }}>{s.origin}</td>
                    <td className="px-4 py-2.5" style={{ color: "var(--offwhite)" }}>{s.destination}</td>
                    <td className="px-4 py-2.5" style={{ color: "var(--offwhite)" }}>{s.pallets}</td>
                    <td className="px-4 py-2.5" style={{ color: "var(--offwhite)" }}>{s.window}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Consignment selector + Reliability slider */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <label
            className="block text-xs mb-2 font-medium"
            style={{ color: "var(--blue-muted)" }}
          >
            Select Consignment to Route
          </label>
          <select
            className="w-full px-3 py-2 rounded-lg text-sm outline-none"
            style={{
              backgroundColor: "var(--navy-2)",
              color: "var(--offwhite)",
              border: "1px solid var(--navy-3)",
            }}
            value={selectedId}
            onChange={(e) => setSelectedId(e.target.value)}
          >
            {SHIPMENTS.map((s) => (
              <option key={s.id} value={s.id}>
                {s.id} — {s.origin} → {s.destination}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-xs mb-2 font-medium" style={{ color: "var(--blue-muted)" }}>
            Partner Reliability Score:{" "}
            <span style={{ color: belowThreshold ? "var(--rose)" : "var(--teal)" }}>
              {reliabilityScore}%
            </span>
            <span className="ml-2" style={{ color: "var(--blue-muted)", fontWeight: "normal" }}>
              (threshold: 90%)
            </span>
          </label>
          <input
            type="range"
            min={0}
            max={100}
            value={reliabilityScore}
            onChange={(e) => setReliabilityScore(Number(e.target.value))}
            className={`w-full cursor-pointer ${belowThreshold ? "danger" : ""}`}
            style={{ accentColor: belowThreshold ? "var(--rose)" : "var(--teal)" }}
          />
          <div className="flex justify-between text-xs mt-1" style={{ color: "var(--blue-muted)" }}>
            <span>0%</span>
            <span style={{ color: "var(--rose)", fontSize: "10px" }}>▼ 90% threshold</span>
            <span>100%</span>
          </div>

          {belowThreshold && (
            <div
              className="mt-2 rounded-lg px-3 py-2 text-xs leading-5"
              style={{
                backgroundColor: "rgba(255,138,138,0.1)",
                border: "1px solid var(--rose)",
                color: "var(--rose)",
              }}
            >
              ⚠️ Partner reliability ({reliabilityScore}%) fell below the 90% threshold. Optimize
              has automatically reverted to Option A to protect DHL&apos;s customer SLA.
            </div>
          )}
        </div>
      </div>

      {/* Option cards — click to select */}
      <p className="text-xs mb-3" style={{ color: "var(--blue-muted)" }}>
        Select a routing option, then approve.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <OptionCard
          label="Send Alone"
          badge="BASELINE"
          badgeColor="grey"
          loadFactor="45%"
          co2="1,240 kg"
          co2Note="(baseline)"
          cost="¥520,000"
          reliability="100% (own fleet)"
          isElevated={belowThreshold}
          isSelected={selectedOption === "A"}
          onSelect={() => setSelectedOption("A")}
        />
        <OptionCard
          label="Consolidate (shared route)"
          badge={belowThreshold ? "NOT RECOMMENDED — below threshold" : "RECOMMENDED"}
          badgeColor={belowThreshold ? "rose" : "teal"}
          loadFactor="81%"
          co2="770 kg"
          co2Note="(−38%)"
          cost="¥410,000"
          reliability="96% (Ouranos-tracked)"
          isElevated={!belowThreshold}
          isSelected={selectedOption === "B"}
          onSelect={() => setSelectedOption("B")}
        />
        <OptionCard
          label="Shift to Rail (partial)"
          badge="GREENEST — COSTS MORE"
          badgeColor="gold"
          loadFactor="n/a (rail)"
          co2="600 kg"
          co2Note="(−52%)"
          cost="¥545,000"
          reliability="99% (scheduled)"
          isElevated={false}
          isSelected={selectedOption === "C"}
          onSelect={() => setSelectedOption("C")}
        />
      </div>

      {/* Approve button */}
      <div className="flex justify-center mb-4">
        <button
          onClick={handleApprove}
          className="px-8 py-3 rounded-xl font-semibold text-sm transition-all"
          style={{ backgroundColor: "var(--teal)", color: "var(--navy)" }}
        >
          Approve {OPTION_LABEL[selectedOption]}
          {selectedOption === recommendedOption && " (Recommended)"}
        </button>
      </div>

      {/* Approval message */}
      {approvedMessage && (
        <div
          className="rounded-xl px-5 py-3 text-sm text-center"
          style={{
            backgroundColor: "rgba(0,180,166,0.1)",
            border: "1px solid var(--teal)",
            color: "var(--teal)",
          }}
        >
          {approvedMessage}
        </div>
      )}
    </div>
  );
}
