type BadgeColor = "grey" | "teal" | "gold" | "rose";

interface OptionCardProps {
  label: string;
  badge: string;
  badgeColor: BadgeColor;
  loadFactor: string;
  co2: string;
  co2Note: string;
  cost: string;
  reliability: string;
  isElevated: boolean;
  isSelected: boolean;
  onSelect: () => void;
}

const BADGE_STYLES: Record<BadgeColor, { bg: string; color: string }> = {
  grey: { bg: "rgba(160,184,200,0.2)", color: "#A0B8C8" },
  teal: { bg: "rgba(0,180,166,0.2)",   color: "#00B4A6" },
  gold: { bg: "rgba(244,185,66,0.2)",  color: "#F4B942" },
  rose: { bg: "rgba(255,138,138,0.2)", color: "#FF8A8A" },
};

export default function OptionCard({
  label,
  badge,
  badgeColor,
  loadFactor,
  co2,
  co2Note,
  cost,
  reliability,
  isElevated,
  isSelected,
  onSelect,
}: OptionCardProps) {
  const bs = BADGE_STYLES[badgeColor];

  return (
    <div
      onClick={onSelect}
      className="rounded-xl p-5 transition-all duration-200 cursor-pointer"
      style={{
        backgroundColor: "var(--navy-2)",
        border: isSelected
          ? "2px solid var(--teal)"
          : isElevated
          ? `2px solid ${badgeColor === "rose" ? "var(--rose)" : "var(--teal)"}`
          : "2px solid transparent",
        transform: isElevated && badgeColor !== "rose" && !isSelected ? "translateY(-3px)" : undefined,
        boxShadow: isSelected
          ? "0 0 0 3px rgba(0,180,166,0.25)"
          : isElevated && badgeColor !== "rose"
          ? "0 8px 28px rgba(0,180,166,0.18)"
          : undefined,
      }}
    >
      <div className="mb-4 flex items-start justify-between gap-2">
        <div>
          <p className="font-semibold text-sm mb-2" style={{ color: "var(--offwhite)" }}>
            {label}
          </p>
          <span
            className="text-xs px-2.5 py-1 rounded-full font-medium"
            style={{ backgroundColor: bs.bg, color: bs.color }}
          >
            {badge}
          </span>
        </div>
        {isSelected && (
          <span
            className="shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold"
            style={{ backgroundColor: "var(--teal)", color: "var(--navy)" }}
          >
            ✓
          </span>
        )}
      </div>
      <div className="space-y-2 text-xs">
        {[
          { k: "Load factor", v: loadFactor },
          { k: "CO₂", v: `${co2} ${co2Note}` },
          { k: "Cost", v: cost },
          { k: "Reliability", v: reliability },
        ].map(({ k, v }) => (
          <div key={k} className="flex justify-between gap-2">
            <span style={{ color: "var(--blue-muted)" }}>{k}</span>
            <span style={{ color: "var(--offwhite)" }} className="text-right">{v}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
