import { useQuery } from "@tanstack/react-query";
import { getMarketPerformance } from "../services/market-performance.service";
import {
  CoinId,
  MarketRange,
} from "../types/market-performance.types";

export function useMarketPerformance(
  range: MarketRange,
  coin: CoinId
) {
  return useQuery({
    queryKey: ["market-performance", coin, range],
    queryFn: () => getMarketPerformance(coin, range),
    staleTime: 60 * 1000,
  });
}