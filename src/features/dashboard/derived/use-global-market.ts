import { formatCompactNumber } from "@/shared/utils";

import {
  Coins,
  Globe,
  LineChart,
  TrendingUp,
} from "lucide-react";
import { useGlobalMarketBase } from "../hooks/use-global-market-base";

export function useGlobalMarket() {
  const { data, isLoading, isFetching } = useGlobalMarketBase();

  const stats = [
    {
      title: "Global Market Cap",
      value: isLoading
        ? "Loading..."
        : formatCompactNumber(data?.total_market_cap?.usd ?? 0),
      change: "Crypto market size",
      icon: Globe,
    },
    {
      title: "24h Volume",
      value: isLoading
        ? "Loading..."
        : formatCompactNumber(data?.total_volume?.usd ?? 0),
      change: "Total trading volume",
      icon: TrendingUp,
    },
    {
      title: "BTC Dominance",
      value: isLoading
        ? "Loading..."
        : `${data?.market_cap_percentage?.btc?.toFixed(1) ?? 0}%`,
      change: "Market dominance",
      icon: LineChart,
    },
    {
      title: "Active Coins",
      value: isLoading
        ? "Loading..."
        : data?.active_cryptocurrencies?.toLocaleString() ?? "0",
      change: "Tracked assets",
      icon: Coins,
    },
  ];

  return { stats, isLoading, isFetching };
}