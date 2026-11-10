export const formatUsd = (value: number, maximumFractionDigits = 2) =>
  `$${value.toLocaleString("en-US", {
    minimumFractionDigits: 0,
    maximumFractionDigits,
  })}`;

// Untuk sumbu grafik: 65000 -> $65k, 150 -> $150
export const formatCompactUsd = (value: number) =>
  Math.abs(value) >= 1000
    ? `$${(value / 1000).toFixed(value % 1000 === 0 ? 0 : 1)}k`
    : `$${Math.round(value)}`;

export const formatUnits = (value: number) =>
  value.toLocaleString("en-US", { maximumFractionDigits: 6 });

export const formatPercent = (value: number) =>
  `${value >= 0 ? "+" : ""}${value.toFixed(2)}%`;
