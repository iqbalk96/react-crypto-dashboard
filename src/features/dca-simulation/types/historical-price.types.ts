export interface HistoricalPricePoint {
  timestamp: number;
  price: number;
}

export interface HistoricalMarketChartResponse {
  prices: [number, number][];
}