import { DCAConfig } from "../types/domain.types";

import { DCASummary } from "../types/dca-summary.types";

import { HistoricalPricePoint } from "../types/historical-price.types";

export const runDCASimulation = (
  config: DCAConfig,
  historicalData: HistoricalPricePoint[],
): DCASummary => {
  let totalInvested = 0;

  let totalUnitsAccumulated = 0;

  historicalData.forEach((point) => {
    totalInvested += config.investmentAmount;

    totalUnitsAccumulated += config.investmentAmount / point.price;
  });

  const latestPrice = historicalData[historicalData.length - 1]?.price ?? 0;

  const currentValue = totalUnitsAccumulated * latestPrice;

  const totalReturn = currentValue - totalInvested;

  const totalReturnPercentage =
    totalInvested > 0 ? (totalReturn / totalInvested) * 100 : 0;

  const averageBuyPrice =
    totalUnitsAccumulated > 0 ? totalInvested / totalUnitsAccumulated : 0;

  const totalPurchases = historicalData.length;

  const averageBuyVsCurrent =
    latestPrice > 0 ? ((averageBuyPrice - latestPrice) / latestPrice) * 100 : 0;

  return {
    totalInvested,

    currentValue,

    totalReturn,

    totalReturnPercentage,

    totalUnitsAccumulated,

    averageBuyPrice,

    totalPurchases,

    averageBuyVsCurrent,
  };
};
