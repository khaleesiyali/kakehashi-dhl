"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";

export default function Navbar() {
  const [user, setUser] = useState<string | null>(null);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    setUser(localStorage.getItem("kakehashi_user"));
  }, [pathname]);

  const signOut = () => {
    localStorage.removeItem("kakehashi_user");
    setUser(null);
    router.push("/");
  };

  const isDashboard = pathname?.startsWith("/dashboard");

  return (
    <nav
      className="sticky top-0 z-50"
      style={{
        backgroundColor: "var(--navy)",
        borderBottom: "1px solid var(--navy-2)",
      }}
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="shrink-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/kakehashi-logo.svg" alt="KAKEHASHI" style={{ height: "28px", width: "auto" }} />
        </Link>

        {/* Center nav links — hidden on dashboard (sidebar handles nav) */}
        {!isDashboard && (
          <div className="hidden md:flex items-center gap-8">
            {[
              { label: "Home", href: "/" },
              { label: "Network", href: "/#network" },
              { label: "About", href: "/#about" },
              { label: "Documentation", href: "/#docs" },
            ].map(({ label, href }) => (
              <Link
                key={label}
                href={href}
                className="text-sm transition-colors"
                style={{ color: "var(--blue-muted)" }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = "var(--offwhite)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = "var(--blue-muted)";
                }}
              >
                {label}
              </Link>
            ))}
          </div>
        )}

        {/* Right side — auth */}
        <div className="flex items-center gap-3">
          {user ? (
            <>
              <span className="text-sm hidden sm:block" style={{ color: "var(--blue-muted)" }}>
                {user}
              </span>
              {!isDashboard && (
                <Link
                  href="/dashboard"
                  className="text-sm px-4 py-2 rounded-lg font-medium transition-colors"
                  style={{ backgroundColor: "var(--teal)", color: "var(--navy)" }}
                >
                  Dashboard
                </Link>
              )}
              <button
                onClick={signOut}
                className="text-sm px-4 py-2 rounded-lg transition-colors"
                style={{
                  border: "1px solid var(--navy-3)",
                  color: "var(--blue-muted)",
                  backgroundColor: "transparent",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = "var(--rose)";
                  e.currentTarget.style.borderColor = "var(--rose)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = "var(--blue-muted)";
                  e.currentTarget.style.borderColor = "var(--navy-3)";
                }}
              >
                Sign Out
              </button>
            </>
          ) : (
            <Link
              href="/login"
              className="text-sm px-5 py-2 rounded-lg font-medium transition-colors"
              style={{ backgroundColor: "var(--teal)", color: "var(--navy)" }}
            >
              Sign In
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
