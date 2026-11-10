import { api } from "@/shared/services/api";

import {
  HistoricalMarketChartResponse,
  HistoricalPricePoint,
} from "../types/historical-price.types";

const SECONDS_PER_DAY = 60 * 60 * 24;

// "yyyy-MM-dd" -> UNIX detik (00:00 UTC)
const toUnixSeconds = (date: string) =>
  Math.floor(Date.parse(`${date}T00:00:00Z`) / 1000);

export const fetchHistoricalPrices = async (
  assetId: string,
  startDate: string,
  endDate: string
): Promise<HistoricalPricePoint[]> => {
  const from = toUnixSeconds(startDate);
  // akhir hari endDate (23:59:59 UTC) agar harga endDate ikut terambil
  const to = toUnixSeconds(endDate) + SECONDS_PER_DAY - 1;

  const response =
    await api.get<HistoricalMarketChartResponse>(
      `/coins/${assetId}/market_chart/range`,
      {
        params: {
          vs_currency: "usd",
          from,
          to,
          interval: "daily",
        },
      }
    );

  return response.data.prices.map(
    ([timestamp, price]) => ({
      timestamp,
      price,
    })
  );
};
