import { api } from "@/shared/services/api";
import { CoinGeckoGlobalResponse } from "../types/market-insight.type";

export async function getMarketGlobal(): Promise<CoinGeckoGlobalResponse> {
  const response = await api.get<CoinGeckoGlobalResponse>("/global");
  return response.data;
}