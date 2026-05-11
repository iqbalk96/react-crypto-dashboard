export type MarketRange = "1D" | "7D" | "1M" | "3M" | "1Y";

export type CoinId = "bitcoin" | "ethereum" | "binancecoin";

export type MarketChartPoint = {
  date: string;
  value: number;
};

export type MarketPerformanceResponse = {
  currentValue: number;
  changePercent: number;
  chartData: MarketChartPoint[];
};