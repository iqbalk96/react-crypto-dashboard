import { useGlobalMarketBase } from "../hooks/use-global-market-base";

// optional color mapping
const COLOR_MAP: Record<string, string> = {
  bitcoin: "#f7931a",
  ethereum: "#627eea",
  others: "#94a3b8",
};

export function useMarketExposure() {
  const { data, isLoading } = useGlobalMarketBase();

  const marketCap = data?.market_cap_percentage ?? {};

  const totalMarketCap =
    Object.values(data?.total_market_cap ?? {})[0] ?? 0;

  const items =
    Object.entries(marketCap)
      .map(([key, value]) => ({
        name:
          key === "btc"
            ? "Bitcoin"
            : key === "eth"
            ? "Ethereum"
            : "Others",
        value: Number((value as number).toFixed(2)),
        color: COLOR_MAP[key] ?? COLOR_MAP.others,
      }))
      .sort((a, b) => b.value - a.value)
      .slice(0, 3);

  return {
    data: {
      items,
      totalMarketCap,
    },
    isLoading,
  };
}