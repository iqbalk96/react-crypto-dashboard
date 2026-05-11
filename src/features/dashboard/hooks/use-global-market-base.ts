import { useQuery } from "@tanstack/react-query";
import { getGlobalMarket } from "../services/global.service";

export function useGlobalMarketBase() {
  return useQuery({
    queryKey: ["global"],
    queryFn: getGlobalMarket,
    staleTime: 60 * 1000,
  });
}