import { queryOptions, useQuery } from "@tanstack/react-query";
import { isAxiosError } from "axios";

import { fetchHistoricalPrices }
  from "../services/dca-api.service";

/**
 * Opsi query dipisahkan dari hook agar dapat dipakai ulang
 * (mis. prefetch atau pengujian tanpa React).
 * Interval DCA sengaja tidak masuk query key: data harga sama untuk semua
 * interval, sehingga mengganti interval cukup menghitung ulang di engine
 * tanpa permintaan baru ke API.
 */
export const historicalDataQueryOptions = (
  assetId: string,
  startDate: string,
  endDate: string
) =>
  queryOptions({
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

export const useHistoricalData = (
  assetId: string,
  startDate: string,
  endDate: string
) => {
  return useQuery({
    ...historicalDataQueryOptions(
      assetId,
      startDate,
      endDate
    ),

    enabled:
      !!assetId && !!startDate && !!endDate,
  });
};
