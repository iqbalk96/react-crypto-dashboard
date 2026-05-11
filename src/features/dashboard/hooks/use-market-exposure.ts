import { useQuery } from "@tanstack/react-query";
import { getMarketExposureRaw } from "../services/market-exposure.service";
import {
  MarketExposureSummary,
  MarketExposureItem,
} from "../types/market-exposure.type";

// optional color mapping
const COLOR_MAP: Record<string, string> = {
  bitcoin: "#f7931a",
  ethereum: "#627eea",
  others: "#94a3b8",
};

export function useMarketExposure() {
  return useQuery({
    queryKey: ["market-exposure"],
    queryFn: async (): Promise<MarketExposureSummary> => {
      const res = await getMarketExposureRaw();

      const marketCap = res.data.market_cap_percentage;
      const totalMarketCap = Number(
        Object.values(res.data.total_market_cap)[0] ?? 0
      );

      const items: MarketExposureItem[] = Object.entries(marketCap)
        .map(([key, value]) => ({
          name:
            key === "btc"
              ? "Bitcoin"
              : key === "eth"
              ? "Ethereum"
              : "Others",
          value: Number(value.toFixed(2)),
          color: COLOR_MAP[key] ?? COLOR_MAP.others,
        }))
        .sort((a, b) => b.value - a.value)
        .slice(0, 3);

      const marketChange24h =
        res.data.market_cap_change_percentage_24h_usd;

      return {
        items,
        totalMarketCap,
        marketChange24h,
      };
    },
    staleTime: 5000 * 60,
  });
}