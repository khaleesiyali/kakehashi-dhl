"use client";

import { useState } from "react";

const LAYERS = [
  {
    name: "Ouranos Ecosystem",
    badge: "Layer 1 — The Network",
    desc: "Japan's own government-backed data-sharing initiative (METI/IPA/NEDO, launched 2023), with a published reference architecture and a Supply Chain Data Collaboration track aimed at exactly this kind of logistics problem. In April 2025, Ouranos and Europe's Catena-X successfully demonstrated working interoperability between their data spaces. Kakehashi wouldn't need a brand-new governance body — it would run inside an ecosystem Japan already built.",
  },
  {
    name: "Eclipse Dataspace Connector (EDC)",
    badge: "Layer 2 — The Connector",
    desc: 'The real open-source software each company runs to keep its own data on its own servers, exchanging only specific, pre-agreed fields with a partner\'s connector. This is the literal technology Catena-X runs on. It\'s what enforces "data stays home" — not a metaphor.',
  },
  {
    name: "Asset Administration Shell (AAS)",
    badge: "Layer 3 — The Data Model",
    desc: "The standardized way to describe a physical asset digitally. A shipment's compatibility profile (temperature requirement, hazmat class, pallet type) would be represented as an AAS submodel — queryable by a partner's connector without exposing the customer or price fields sitting in the same record.",
  },
];

interface ArchitecturePanelProps {
  forceOpen?: boolean;
}

export default function ArchitecturePanel({ forceOpen = false }: ArchitecturePanelProps) {
  const [open, setOpen] = useState(forceOpen);

  const content = (
    <div className="space-y-3">
      {LAYERS.map((layer) => (
        <div key={layer.name} className="rounded-lg p-4" style={{ backgroundColor: "var(--navy)" }}>
          <div className="flex flex-wrap items-center gap-2 mb-1.5">
            <span className="font-semibold text-sm" style={{ color: "var(--offwhite)" }}>
              {layer.name}
            </span>
            <span
              className="text-xs px-2 py-0.5 rounded-full"
              style={{ backgroundColor: "rgba(0,180,166,0.15)", color: "var(--teal)" }}
            >
              {layer.badge}
            </span>
          </div>
          <p className="text-xs leading-5" style={{ color: "var(--blue-muted)" }}>
            {layer.desc}
          </p>
        </div>
      ))}
      <p className="text-xs italic pt-1" style={{ color: "var(--blue-muted-2)" }}>
        &ldquo;Kakehashi&apos;s Govern layer isn&apos;t a new invention — it&apos;s Ouranos Ecosystem (the
        network), EDC (the connector), and AAS (the data model), already real, already
        running.&rdquo;
      </p>
    </div>
  );

  if (forceOpen) {
    return <div className="space-y-3">{content}</div>;
  }

  return (
    <div
      className="rounded-xl overflow-hidden"
      style={{ border: "1px solid var(--navy-2)", backgroundColor: "var(--navy-2)" }}
    >
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between px-5 py-3 text-sm font-medium"
        style={{ color: "var(--teal)" }}
      >
        <span>The Real Architecture — Ouranos Ecosystem · EDC · AAS</span>
        <span className="text-xs ml-4">{open ? "▲ collapse" : "▼ expand"}</span>
      </button>

      {open && <div className="px-5 pb-6 pt-1">{content}</div>}
    </div>
  );
}
