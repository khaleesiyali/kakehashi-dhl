"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const DEMO_EMAIL = "demo@dhl.co.jp";
const DEMO_PASSWORD = "Kakehashi2025";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    await new Promise((r) => setTimeout(r, 600));

    if (email === DEMO_EMAIL && password === DEMO_PASSWORD) {
      localStorage.setItem("kakehashi_user", "DHL Dispatcher");
      router.push("/dashboard");
    } else {
      setError("Invalid credentials. Please use the demo account below.");
      setLoading(false);
    }
  };

  const inputStyle: React.CSSProperties = {
    backgroundColor: "var(--navy)",
    color: "var(--offwhite)",
    border: "1px solid var(--navy-3)",
  };

  return (
    <div
      className="min-h-[calc(100vh-64px)] flex flex-col items-center justify-center px-4"
      style={{ backgroundColor: "var(--navy)" }}
    >
      {/* Card */}
      <div
        className="w-full max-w-md rounded-2xl p-8"
        style={{ backgroundColor: "var(--navy-2)", border: "1px solid var(--navy-3)" }}
      >
        {/* Wordmark */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-block">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/kakehashi-logo.svg" alt="KAKEHASHI" style={{ height: "36px", width: "auto", margin: "0 auto" }} />
          </Link>
          <p className="text-sm mt-3" style={{ color: "var(--blue-muted)" }}>
            Dispatcher Login
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              className="block text-xs font-medium mb-1.5"
              style={{ color: "var(--blue-muted)" }}
            >
              Email address
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@company.com"
              className="w-full px-4 py-2.5 rounded-lg text-sm outline-none transition-colors"
              style={inputStyle}
            />
          </div>
          <div>
            <label
              className="block text-xs font-medium mb-1.5"
              style={{ color: "var(--blue-muted)" }}
            >
              Password
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-4 py-2.5 rounded-lg text-sm outline-none transition-colors"
              style={inputStyle}
            />
          </div>

          {error && (
            <p className="text-xs" style={{ color: "var(--rose)" }}>
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2.5 rounded-lg text-sm font-semibold transition-all disabled:opacity-60"
            style={{ backgroundColor: "var(--teal)", color: "var(--navy)" }}
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        {/* Demo credentials */}
        <div
          className="mt-6 rounded-lg px-4 py-3 text-xs"
          style={{
            backgroundColor: "var(--navy)",
            border: "1px solid var(--navy-3)",
            color: "var(--blue-muted)",
          }}
        >
          <p className="font-medium mb-1" style={{ color: "var(--offwhite)" }}>
            Demo credentials
          </p>
          <p>
            Email: <span style={{ color: "var(--teal)" }}>{DEMO_EMAIL}</span>
          </p>
          <p>
            Password: <span style={{ color: "var(--teal)" }}>{DEMO_PASSWORD}</span>
          </p>
        </div>
      </div>
    </div>
  );
}
