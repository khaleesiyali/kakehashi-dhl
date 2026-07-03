"use client";

import { useState, useCallback, useEffect } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "./Sidebar";
import GovernTab from "./GovernTab";
import OptimizeTab from "./OptimizeTab";
import ArchitecturePanel from "./ArchitecturePanel";
import DashboardView from "./DashboardView";
import { SEEDS } from "@/lib/seeds";
import type { Section } from "@/lib/types";

export default function DashboardShell() {
  const [user, setUser]                   = useState<string>("");
  const [activeSection, setActiveSection] = useState<Section>("dashboard");
  const [resetKey, setResetKey]           = useState(0);
  const [co2Saved, setCo2Saved]           = useState<number>(SEEDS.co2Saved);
  const [routeSavings, setRouteSavings]   = useState<number>(SEEDS.routeSavings);
  const [lanesDispatched, setLanes]       = useState<number>(SEEDS.lanesDispatched);
  const router = useRouter();

  useEffect(() => {
    const stored = localStorage.getItem("kakehashi_user");
    if (!stored) {
      router.push("/login");
      return;
    }
    setUser(stored);
  }, [router]);

  const handleReset = useCallback(() => {
    setCo2Saved(SEEDS.co2Saved);
    setRouteSavings(SEEDS.routeSavings);
    setLanes(SEEDS.lanesDispatched);
    setResetKey((k) => k + 1);
  }, []);

  const handleApproveB = useCallback(() => {
    setCo2Saved((v) => v + 470);
    setRouteSavings((v) => v + 110000);
    setLanes((v) => v + 1);
  }, []);

  if (!user) return null;

  return (
    <div className="flex" style={{ minHeight: "calc(100vh - 64px)" }}>
      <Sidebar activeSection={activeSection} onNavigate={setActiveSection} user={user} />

      {/* Main content */}
      <main className="flex-1 overflow-y-auto px-8 py-8" style={{ backgroundColor: "var(--navy)" }}>

        {/* ── Dashboard ────────────────────────────────────── */}
        {activeSection === "dashboard" && (
          <DashboardView
            co2Saved={co2Saved}
            routeSavings={routeSavings}
            lanesDispatched={lanesDispatched}
            onReset={handleReset}
            onNavigate={setActiveSection}
          />
        )}

        {/* ── Govern ───────────────────────────────────────── */}
        {activeSection === "govern" && (
          <div>
            <div className="mb-6">
              <p className="text-xs font-semibold uppercase tracking-widest mb-1" style={{ color: "var(--teal)" }}>Govern</p>
              <h1 className="text-xl font-bold" style={{ color: "var(--offwhite)" }}>Data Exchange</h1>
            </div>
            <GovernTab key={`govern-${resetKey}`} />
          </div>
        )}

        {/* ── Optimize ─────────────────────────────────────── */}
        {activeSection === "optimize" && (
          <div>
            <div className="mb-6">
              <p className="text-xs font-semibold uppercase tracking-widest mb-1" style={{ color: "var(--teal)" }}>Optimize</p>
              <h1 className="text-xl font-bold" style={{ color: "var(--offwhite)" }}>Route Control</h1>
            </div>
            <OptimizeTab
              key={`optimize-${resetKey}`}
              co2Saved={co2Saved}
              routeSavings={routeSavings}
              lanesDispatched={lanesDispatched}
              onApproveB={handleApproveB}
            />
          </div>
        )}

        {/* ── Docs ─────────────────────────────────────────── */}
        {activeSection === "docs" && (
          <div>
            <div className="mb-6">
              <h1 className="text-xl font-bold" style={{ color: "var(--offwhite)" }}>Documentation</h1>
              <p className="text-sm mt-1" style={{ color: "var(--blue-muted)" }}>
                Technical architecture underlying the Kakehashi network
              </p>
            </div>
            <ArchitecturePanel forceOpen />
          </div>
        )}
      </main>
    </div>
  );
}
