import { useQuery } from "@tanstack/react-query";

import { getGlobalMarket } from "../services/global.service";
import { formatCompactNumber } from "@/shared/utils";

import {
  Coins,
  Globe,
  LineChart,
  TrendingUp,
} from "lucide-react";

export function useGlobalMarket() {
  const { data, isLoading, isFetching } = useQuery({
    queryKey: ["global-market"],
    queryFn: getGlobalMarket,
  });

  const stats = [
    {
      title: "Global Market Cap",
      value: isLoading
        ? "Loading..."
        : formatCompactNumber(data?.total_market_cap?.usd ?? 0),
      change: "Crypto market size",
      positive: true,
      icon: Globe,
    },
    {
      title: "24h Volume",
      value: isLoading
        ? "Loading..."
        : formatCompactNumber(data?.total_volume?.usd ?? 0),
      change: "Total trading volume",
      positive: true,
      icon: TrendingUp,
    },
    {
      title: "BTC Dominance",
      value: isLoading
        ? "Loading..."
        : `${data?.market_cap_percentage?.btc?.toFixed(1) ?? 0}%`,
      change: "Market dominance",
      positive: true,
      icon: LineChart,
    },
    {
      title: "Active Coins",
      value: isLoading
        ? "Loading..."
        : data?.active_cryptocurrencies?.toLocaleString() ?? "0",
      change: "Tracked assets",
      positive: true,
      icon: Coins,
    },
  ];

  return {
    data,
    stats,
    isLoading,
    isFetching, // optional tapi bagus buat background refresh state
  };
}