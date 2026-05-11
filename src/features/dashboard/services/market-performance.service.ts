import { api } from "@/shared/services/api";
import {
  CoinId,
  MarketRange,
  MarketPerformanceResponse,
} from "../types/market-performance.types";

const RANGE_TO_DAYS: Record<MarketRange, number> = {
  "1D": 1,
  "7D": 7,
  "1M": 30,
  "3M": 90,
  "1Y": 365,
};

function formatChartData(prices: [number, number][]) {
  return prices.map(([timestamp, price]) => ({
    date: new Date(timestamp).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    }),
    value: price,
  }));
}

export async function getMarketPerformance(
  coin: CoinId,
  range: MarketRange
): Promise<MarketPerformanceResponse> {
  const days = RANGE_TO_DAYS[range];

  const response = await api.get(`/coins/${coin}/market_chart`, {
    params: {
      vs_currency: "usd",
      days,
    },
  });

  const prices: [number, number][] = response.data.prices;

  const chartData = formatChartData(prices);

  const first = prices[0]?.[1] ?? 0;
  const last = prices[prices.length - 1]?.[1] ?? 0;

  const changePercent = first ? ((last - first) / first) * 100 : 0;

  return {
    currentValue: last,
    changePercent,
    chartData,
  };
}