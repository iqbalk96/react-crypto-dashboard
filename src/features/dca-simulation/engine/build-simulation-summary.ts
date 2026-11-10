import { DCAInvestmentEvent } from "../types/domain.types";
import { DCASummary } from "../types/dca-summary.types";

export const buildSimulationSummary = (
  events: DCAInvestmentEvent[],
  latestPrice: number,
): DCASummary => {
  const totalInvested = events.reduce((sum, e) => sum + e.amountInvested, 0);
  const totalUnitsAccumulated = events.reduce((sum, e) => sum + e.unitsBought, 0);

  const currentValue = totalUnitsAccumulated * latestPrice;
  const totalReturn = currentValue - totalInvested;

  const totalReturnPercentage =
    totalInvested > 0 ? (totalReturn / totalInvested) * 100 : 0;

  const averageBuyPrice =
    totalUnitsAccumulated > 0 ? totalInvested / totalUnitsAccumulated : 0;

  const averageBuyVsCurrent =
    latestPrice > 0 ? ((averageBuyPrice - latestPrice) / latestPrice) * 100 : 0;

  return {
    totalInvested,
    currentValue,
    totalReturn,
    totalReturnPercentage,
    totalUnitsAccumulated,
    averageBuyPrice,
    totalPurchases: events.length,
    averageBuyVsCurrent,
  };
};
