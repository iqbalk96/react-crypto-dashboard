import { api } from "@/shared/services/api";

export async function getGlobalMarket() {
  const response = await api.get("/global");

  return response.data.data;
}