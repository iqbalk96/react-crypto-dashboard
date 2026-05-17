import { api } from "@/shared/services/api";

import {
  HistoricalMarketChartResponse,
  HistoricalPricePoint,
} from "../types/historical-price.types";

export const fetchHistoricalPrices = async (
  assetId: string,
  days: number
): Promise<HistoricalPricePoint[]> => {
  const response =
    await api.get<HistoricalMarketChartResponse>(
      `/coins/${assetId}/market_chart`,
      {
        params: {
          vs_currency: "usd",
          days,
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