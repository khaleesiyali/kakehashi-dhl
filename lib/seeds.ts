export const SEEDS = {
  co2Saved: 12400,
  routeSavings: 2860000,
  lanesDispatched: 7,
} as const;

export const SHIPMENTS = [
  { id: "DHL-TK-0231", origin: "Yokohama", destination: "Osaka", pallets: 14, window: "14:00" },
  { id: "DHL-TK-0232", origin: "Tokyo",    destination: "Osaka", pallets: 8,  window: "15:30" },
  { id: "DHL-TK-0233", origin: "Yokohama", destination: "Osaka", pallets: 22, window: "09:00" },
  { id: "DHL-TK-0234", origin: "Tokyo",    destination: "Osaka", pallets: 6,  window: "11:00" },
  { id: "DHL-TK-0235", origin: "Yokohama", destination: "Osaka", pallets: 18, window: "16:00" },
];
