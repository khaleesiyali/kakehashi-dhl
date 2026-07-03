interface MetricCardProps {
  label: string;
  value: string;
  unit: string;
}

export default function MetricCard({ label, value, unit }: MetricCardProps) {
  return (
    <div className="rounded-xl p-5" style={{ backgroundColor: "var(--navy-2)" }}>
      <p className="text-xs mb-2" style={{ color: "var(--blue-muted)" }}>
        {label}
      </p>
      <p className="text-2xl font-bold" style={{ color: "var(--teal)" }}>
        {value}
      </p>
      {unit && (
        <p className="text-xs mt-1" style={{ color: "var(--blue-muted)" }}>
          {unit}
        </p>
      )}
    </div>
  );
}
