# KAKEHASHI — Shared Logistics Network

A privacy-preserving shared freight corridor prototype for Japan's trunk logistics, built as a data-mining research project at Waseda University in collaboration with DHL Supply Chain Japan.

## Project Overview

Japan faces a projected **38% shortfall in truck drivers by 2030**. With 88.8% of domestic freight moving by road and an average load factor of just 40%, most trucks run half-empty — a dual crisis of carbon emissions and labour supply.

**Kakehashi** (橋, "bridge") proposes a privacy-preserving shared corridor where competing carriers consolidate freight without exposing sensitive commercial data to each other. It is inspired by Catena-X (the automotive industry's proven data-sharing standard) and built on Japan's own **Ouranos Ecosystem** government infrastructure.

### Key results from existing pilots
| Pilot | Improvement |
|---|---|
| JPIC chemicals corridor | +20% load factor |
| Seino / Nippon Express / Japan Post / Yamato joint relay | −36% CO₂ |
| Catena-X Ford/Flex/Micron | −46% carbon footprint error |

---

## How it works

### GOVERN — Privacy-Preserving Data Exchange

Each carrier runs its own **Eclipse Dataspace Connector (EDC)**. Private fields (customer identity, contract price, cargo contents) never leave the company's node. Only the **Asset Administration Shell (AAS)** compatibility submodel crosses the network — a standardised profile of cargo type, route, and time window.

- If the cargo compatibility submodels **match** → a shared lane is proposed  
- If they **don't match** (e.g. ambient vs. hazmat) → no data is exchanged and no match is returned

### OPTIMIZE — AI Route Control Tower

DHL's internal engine scores each consignment across three options:

| Option | Load Factor | CO₂ | Cost |
|---|---|---|---|
| A — Send Alone (baseline) | 45% | 1,240 kg | ¥520,000 |
| B — Consolidate (shared) | 81% | 770 kg (−38%) | ¥410,000 |
| C — Shift to Rail | n/a | 600 kg (−52%) | ¥545,000 |

A reliability threshold (default 90%) automatically reverts the recommendation to Option A if the partner's score drops below it, protecting DHL's customer SLA.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (App Router, Turbopack) |
| Styling | Tailwind CSS v4 |
| Charts | Recharts |
| Confetti | canvas-confetti |
| Font | Cinzel (wordmark), Geist (body) |
| Auth | localStorage mock (demo only) |
| Deploy | Vercel |

---

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Demo credentials
```
Email:    demo@dhl.co.jp
Password: Kakehashi2025
```

---

## Pages

| Route | Description |
|---|---|
| `/` | Marketing landing page |
| `/login` | Dispatcher login (mock auth) |
| `/dashboard` | Enterprise portal — Dashboard, Data Exchange, Route Control, Docs |

---

## Project Structure

```
app/
  page.tsx              # Landing page
  login/page.tsx        # Login
  dashboard/page.tsx    # Dashboard shell
components/
  Navbar.tsx            # Top navigation (auth-aware)
  LandingHero.tsx       # Marketing page content
  LoginForm.tsx         # Login form with mock auth
  Sidebar.tsx           # Dashboard sidebar navigation
  DashboardShell.tsx    # Dashboard layout + auth guard
  DashboardView.tsx     # Charts: CO₂ trend, load factor, recent lanes
  GovernTab.tsx         # EDC cross-match simulation
  OptimizeTab.tsx       # Routing decision dashboard
  OptionCard.tsx        # Selectable routing option card
  ArchitecturePanel.tsx # Expandable architecture explainer
  Terminal.tsx          # Animated terminal output
  MetricCard.tsx        # KPI metric display card
lib/
  seeds.ts              # Seed data for demo counters
  types.ts              # Shared TypeScript types
```

---

## Deploying to Vercel

```bash
npm run build   # verify build passes locally
```

Then connect the GitHub repository to [vercel.com](https://vercel.com) and deploy. No environment variables required — all data is static/seeded for the demo.

---

## Research Context

This prototype was developed for the **Kakehashi Data Mining Project** at Waseda University (2025–2026), exploring how Catena-X-style data governance can be applied to Japan's logistics industry to address the 2024 Problem — the labour and carbon crisis facing Japanese freight carriers.
