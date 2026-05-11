import { api } from "@/shared/services/api";

import { MarketAsset } from "../types/market.type";

export async function getMarketOverview(): Promise<MarketAsset[]> {
  const response = await api.get<MarketAsset[]>(
    "/coins/markets",
    {
      params: {
        vs_currency: "usd",
        order: "market_cap_desc",
        per_page: 5,
        page: 1,
        sparkline: false,
      },
    }
  );

  return response.data;
}