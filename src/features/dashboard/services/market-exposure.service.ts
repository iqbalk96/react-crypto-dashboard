import { api } from "@/shared/services/api";
import { CoinGeckoGlobalResponse } from "../types/market-exposure.type";

export async function getMarketExposureRaw(): Promise<CoinGeckoGlobalResponse> {
  const response = await api.get<CoinGeckoGlobalResponse>("/global");
  return response.data;
}