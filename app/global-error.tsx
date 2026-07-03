"use client";

export default function GlobalError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html>
      <body style={{ backgroundColor: "#0F1B2D", color: "#F8FAFC", fontFamily: "sans-serif", display: "flex", alignItems: "center", justifyContent: "center", minHeight: "100vh" }}>
        <div style={{ textAlign: "center" }}>
          <h2 style={{ color: "#FF8A8A" }}>Something went wrong</h2>
          <button onClick={reset} style={{ marginTop: "1rem", padding: "0.5rem 1.5rem", backgroundColor: "#00B4A6", color: "#0F1B2D", border: "none", borderRadius: "8px", cursor: "pointer" }}>
            Try again
          </button>
        </div>
      </body>
    </html>
  );
}
