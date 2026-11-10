import { useQuery } from "@tanstack/react-query";

import { fetchHistoricalPrices }
  from "../services/dca-api.service";

export const useHistoricalData = (
  assetId: string,
  startDate: string,
  endDate: string
) => {
  return useQuery({
    queryKey: [
      "historical-data",
      assetId,
      startDate,
      endDate,
    ],

    queryFn: () =>
      fetchHistoricalPrices(
        assetId,
        startDate,
        endDate
      ),

    enabled:
      !!assetId && !!startDate && !!endDate,

    staleTime:
      1000 * 60 * 5,
  });
};
