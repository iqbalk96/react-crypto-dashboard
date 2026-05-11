import { useQuery } from "@tanstack/react-query";
import { getMarketGlobal } from "../services/market-insight.service";
import { MarketInsight } from "../types/market-insight.type";

export function useMarketInsight() {
  return useQuery({
    queryKey: ["market-insight"],
    queryFn: async (): Promise<MarketInsight> => {
      const res = await getMarketGlobal();

      const data = res.data;

      // BTC dominance
      const btcDominance =
        data.market_cap_percentage?.btc ?? 0;

      // Market trend logic
      const marketChange =
        data.market_cap_change_percentage_24h_usd;

      let trend: MarketInsight["trend"] = "neutral";

      if (marketChange > 1) trend = "bullish";
      else if (marketChange < -1) trend = "bearish";

      // Volatility logic (simple MVP heuristic)
      let volatility: MarketInsight["volatility"] = "moderate";

      const absChange = Math.abs(marketChange);

      if (absChange < 1) volatility = "low";
      else if (absChange > 3) volatility = "high";

      // Total market cap (ambil first value)
      const totalMarketCap =
        Object.values(data.total_market_cap)[0] ?? 0;

      return {
        trend,
        btcDominance: Number(btcDominance.toFixed(2)),
        volatility,
        totalMarketCap,
        activeCoins: data.active_cryptocurrencies,
      };
    },
    staleTime: 1000 * 60,
  });
}