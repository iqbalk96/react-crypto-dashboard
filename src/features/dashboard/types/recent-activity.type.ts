export type RecentActivityItem = {
  action: string;
  asset: string;
  amount: string;
  status: "Positive" | "Negative";
  time: string;
};

export type CoinGeckoMarketCoin = {
  id: string;
  name: string;
  symbol: string;

  current_price: number;
  price_change_percentage_24h: number;
  total_volume: number;
};