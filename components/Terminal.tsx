"use client";

import { useEffect, useRef } from "react";

interface TerminalProps {
  lines: string[];
}

export default function Terminal({ lines }: TerminalProps) {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [lines]);

  return (
    <div
      className="rounded-xl p-4 overflow-y-auto max-h-72"
      style={{
        backgroundColor: "#0A1628",
        border: "1px solid var(--navy-2)",
        fontFamily: "var(--font-geist-mono), monospace",
        fontSize: "12px",
        lineHeight: "1.7",
      }}
    >
      {lines.map((line, i) => {
        let color = "var(--teal)";
        if (line.startsWith("[FILTER]")) color = "var(--blue-muted-2)";
        if (line.includes("No safe match") || line.includes("❌")) color = "var(--rose)";
        if (line.startsWith("[AAS QUERY]") || line.startsWith("[NETWORK]")) color = "var(--offwhite)";
        return (
          <div key={i} style={{ color }} className="whitespace-pre">
            {line}
          </div>
        );
      })}
      <div ref={bottomRef} />
    </div>
  );
}
