import { DCAConfig, DCAInvestmentEvent } from "../types/domain.types";
import { DCASummary } from "../types/dca-summary.types";
import { HistoricalPricePoint } from "../types/historical-price.types";

import { generateInvestmentSchedule } from "./generate-investment-schedule";
import { findNearestPrice } from "./find-nearest-price";
import { calculateInvestmentEvent } from "./calculate-investment-event";
import { buildSimulationSummary } from "./build-simulation-summary";

export const runDCASimulation = (
  config: DCAConfig,
  historicalData: HistoricalPricePoint[],
): DCASummary => {
  const sorted = [...historicalData].sort((a, b) => a.timestamp - b.timestamp);

  if (sorted.length === 0) return buildSimulationSummary([], 0);

  const schedule = generateInvestmentSchedule(
    sorted[0].timestamp,
    sorted[sorted.length - 1].timestamp,
    config.intervalDays,
  );

  const events: DCAInvestmentEvent[] = [];

  for (const timestamp of schedule) {
    const point = findNearestPrice(sorted, timestamp);
    if (!point) continue;

    events.push(
      calculateInvestmentEvent(point.timestamp, point.price, config.investmentAmount),
    );
  }

  const latestPrice = sorted[sorted.length - 1].price;

  return buildSimulationSummary(events, latestPrice);
};
