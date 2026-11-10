import { HistoricalPricePoint } from "../types/historical-price.types";

/**
 * Mencari titik harga yang paling dekat dengan timestamp target.
 * historicalData diasumsikan terurut naik berdasarkan timestamp.
 */
export const findNearestPrice = (
  historicalData: HistoricalPricePoint[],
  targetTimestamp: number,
): HistoricalPricePoint | null => {
  if (historicalData.length === 0) return null;

  let nearest = historicalData[0];
  let nearestDiff = Math.abs(nearest.timestamp - targetTimestamp);

  for (const point of historicalData) {
    const diff = Math.abs(point.timestamp - targetTimestamp);
    if (diff < nearestDiff) {
      nearest = point;
      nearestDiff = diff;
    }
  }

  return nearest;
};
