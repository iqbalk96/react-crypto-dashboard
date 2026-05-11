import { useGlobalMarketBase } from "../hooks/use-global-market-base";

export function useMarketInsight() {
  const { data, isLoading } = useGlobalMarketBase();

  console.log(data?.total_market_cap);

  const change = data?.market_cap_change_percentage_24h_usd ?? 0;

  return {
    trend: change > 1 ? "bullish" : change < -1 ? "bearish" : "neutral",

    btcDominance: Number((data?.market_cap_percentage?.btc ?? 0).toFixed(2)),

    volatility:
      Math.abs(change) < 1 ? "low" : Math.abs(change) > 3 ? "high" : "moderate",

    totalMarketCap: data?.total_market_cap?.usd ?? 0,

    activeCoins: data?.active_cryptocurrencies,

    isLoading,
  };
}
