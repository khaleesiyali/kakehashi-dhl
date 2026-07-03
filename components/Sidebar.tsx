"use client";

import { useRouter } from "next/navigation";
import type { Section } from "@/lib/types";

interface SidebarProps {
  activeSection: Section;
  onNavigate: (section: Section) => void;
  user: string;
}

const NAV_ITEMS: { id: Section; label: string; sub?: string }[] = [
  { id: "dashboard", label: "Dashboard" },
  { id: "govern",   label: "Data Exchange",     sub: "Govern" },
  { id: "optimize", label: "Route Control",      sub: "Optimize" },
  { id: "docs",     label: "Documentation" },
];

export default function Sidebar({ activeSection, onNavigate, user }: SidebarProps) {
  const router = useRouter();

  const signOut = () => {
    localStorage.removeItem("kakehashi_user");
    router.push("/");
  };

  return (
    <aside
      className="flex flex-col shrink-0 w-60"
      style={{
        backgroundColor: "var(--navy-2)",
        borderRight: "1px solid var(--navy-3)",
        minHeight: "calc(100vh - 64px)",
      }}
    >
      {/* User info */}
      <div
        className="px-5 py-5"
        style={{ borderBottom: "1px solid var(--navy-3)" }}
      >
        <p className="text-xs mb-0.5 font-medium" style={{ color: "var(--blue-muted)" }}>
          Signed in as
        </p>
        <p className="text-sm font-semibold" style={{ color: "var(--offwhite)" }}>
          {user}
        </p>
      </div>

      {/* Nav items */}
      <nav className="flex-1 px-3 py-4 space-y-1">
        {NAV_ITEMS.map(({ id, label, sub }) => {
          const isActive = activeSection === id;
          return (
            <button
              key={id}
              onClick={() => onNavigate(id)}
              className="w-full text-left px-4 py-2.5 rounded-lg text-sm transition-all"
              style={{
                backgroundColor: isActive ? "rgba(0,180,166,0.12)" : "transparent",
                color: isActive ? "var(--teal)" : "var(--blue-muted)",
                borderLeft: isActive ? "2px solid var(--teal)" : "2px solid transparent",
              }}
            >
              {sub && (
                <span
                  className="block text-xs font-semibold uppercase tracking-widest mb-0.5"
                  style={{ color: isActive ? "var(--teal)" : "var(--navy-3)" }}
                >
                  {sub}
                </span>
              )}
              {label}
            </button>
          );
        })}
      </nav>

      {/* Sign out */}
      <div
        className="px-3 py-4"
        style={{ borderTop: "1px solid var(--navy-3)" }}
      >
        <button
          onClick={signOut}
          className="w-full text-left px-4 py-2.5 rounded-lg text-sm transition-colors"
          style={{ color: "var(--blue-muted)" }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = "var(--rose)";
            e.currentTarget.style.backgroundColor = "rgba(255,138,138,0.08)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = "var(--blue-muted)";
            e.currentTarget.style.backgroundColor = "transparent";
          }}
        >
          Sign Out
        </button>
      </div>
    </aside>
  );
}
