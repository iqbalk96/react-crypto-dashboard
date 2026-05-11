import { api } from "@/shared/services/api";
import { CoinGeckoMarketCoin } from "../types/recent-activity.type";

export async function getMarketSnapshot(): Promise<CoinGeckoMarketCoin[]> {
  const response = await api.get<CoinGeckoMarketCoin[]>(
    "/coins/markets",
    {
      params: {
        vs_currency: "usd",
        order: "market_cap_desc",
        per_page: 10,
        page: 1,
        price_change_percentage: "24h",
      },
    }
  );

  return response.data;
}