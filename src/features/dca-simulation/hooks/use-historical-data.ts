import { useQuery } from "@tanstack/react-query";
import { isAxiosError } from "axios";

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

    // Error 4xx (batas plan gratis, rate limit) tidak akan berhasil bila diulang
    retry: (failureCount, error) => {
      if (isAxiosError(error)) {
        const status = error.response?.status;
        if (status && status >= 400 && status < 500) return false;
      }
      return failureCount < 2;
    },
  });
};
