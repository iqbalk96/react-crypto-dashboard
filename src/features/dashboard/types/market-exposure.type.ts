// Raw API response (CoinGecko /global)
export type CoinGeckoGlobalResponse = {
  data: {
    market_cap_percentage: Record<string, number>;
    total_market_cap: Record<string, number>;
    market_cap_change_percentage_24h_usd: number;
  };
};

// UI-ready model
export type MarketExposureItem = {
  name: string;
  value: number;
  color?: string;
};

export type MarketExposureSummary = {
  items: MarketExposureItem[];
  totalMarketCap: number;
  marketChange24h: number;
};