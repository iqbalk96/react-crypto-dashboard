import { useQuery } from "@tanstack/react-query";
import { getMarketSnapshot } from "../services/recent-activity.service";
import { RecentActivityItem } from "../types/recent-activity.type";

export function useRecentActivity() {
  return useQuery({
    queryKey: ["recent-activity"],
    queryFn: async (): Promise<RecentActivityItem[]> => {
      const coins = await getMarketSnapshot();

      const activities: RecentActivityItem[] = coins.map((coin) => {
        const change = coin.price_change_percentage_24h;

        let action = "";

        if (change > 3) action = "surged";
        else if (change > 0) action = "increased";
        else action = "dropped";

        return {
          action: `${coin.name} ${action} ${Math.abs(
            change
          ).toFixed(2)}%`,
          asset: coin.symbol.toUpperCase(),
          amount: `$${coin.current_price.toLocaleString()}`,
          status: change >= 0 ? "Positive" : "Negative",
          time: "now",
        };
      });

      return activities.slice(0, 5);
    },
    staleTime: 1000 * 60,
  });
}