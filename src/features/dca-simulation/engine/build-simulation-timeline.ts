import { DCAInvestmentEvent, DCATimelinePoint } from "../types/domain.types";
import { HistoricalPricePoint } from "../types/historical-price.types";

/**
 * Membuat deret waktu harian: harga, akumulasi investasi, akumulasi unit,
 * dan nilai portofolio pada setiap titik data (termasuk penanda pembelian).
 */
export const buildSimulationTimeline = (
  sortedData: HistoricalPricePoint[],
  events: DCAInvestmentEvent[],
): DCATimelinePoint[] => {
  const eventsByTimestamp = new Map<number, { amount: number; units: number }>();

  for (const e of events) {
    const prev = eventsByTimestamp.get(e.timestamp) ?? { amount: 0, units: 0 };
    eventsByTimestamp.set(e.timestamp, {
      amount: prev.amount + e.amountInvested,
      units: prev.units + e.unitsBought,
    });
  }

  let totalInvested = 0;
  let totalUnits = 0;

  return sortedData.map((point) => {
    const bought = eventsByTimestamp.get(point.timestamp);

    totalInvested += bought?.amount ?? 0;
    totalUnits += bought?.units ?? 0;

    return {
      timestamp: point.timestamp,
      date: new Date(point.timestamp).toISOString().slice(0, 10),
      price: point.price,
      totalInvested,
      totalUnits,
      portfolioValue: totalUnits * point.price,
      amountInvested: bought?.amount ?? 0,
      unitsBought: bought?.units ?? 0,
      bought: !!bought,
    };
  });
};
