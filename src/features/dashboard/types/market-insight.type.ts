export type CoinGeckoGlobalResponse = {
  data: {
    market_cap_change_percentage_24h_usd: number;
    market_cap_percentage: Record<string, number>;
    total_market_cap: Record<string, number>;
    active_cryptocurrencies: number;
  };
};

// UI Model (final shape untuk header)
export type MarketInsight = {
  trend: "bullish" | "bearish" | "neutral";
  btcDominance: number;
  volatility: "low" | "moderate" | "high";
  totalMarketCap: number;
  activeCoins: number;
};