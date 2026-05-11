import { useQuery } from "@tanstack/react-query";

import { getMarketOverview } from "../services/market.service";

export function useMarketOverview() {
  return useQuery({
    queryKey: ["market-overview"],
    queryFn: getMarketOverview,
    staleTime: 1000 * 60,
    refetchInterval: 1000 * 60,
  });
}