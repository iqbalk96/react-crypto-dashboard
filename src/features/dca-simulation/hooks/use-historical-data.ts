import { useQuery } from "@tanstack/react-query";

import { fetchHistoricalPrices }
  from "../services/dca-api.service";

export const useHistoricalData = (
  assetId: string,
  days: number
) => {
  return useQuery({
    queryKey: [
      "historical-data",
      assetId,
      days,
    ],

    queryFn: () =>
      fetchHistoricalPrices(
        assetId,
        days
      ),

    enabled:
      !!assetId && days > 0,

    staleTime:
      1000 * 60 * 5,
  });
};