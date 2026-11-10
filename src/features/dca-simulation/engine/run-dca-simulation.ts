import {
  DCAConfig,
  DCAInvestmentEvent,
  DCASimulationResult,
} from "../types/domain.types";
import { HistoricalPricePoint } from "../types/historical-price.types";

import { generateInvestmentSchedule } from "./generate-investment-schedule";
import { findNearestPrice } from "./find-nearest-price";
import { calculateInvestmentEvent } from "./calculate-investment-event";
import { buildSimulationSummary } from "./build-simulation-summary";
import { buildSimulationTimeline } from "./build-simulation-timeline";

export const runDCASimulation = (
  config: DCAConfig,
  historicalData: HistoricalPricePoint[],
): DCASimulationResult => {
  const sorted = [...historicalData].sort((a, b) => a.timestamp - b.timestamp);

  if (sorted.length === 0) {
    return {
      summary: buildSimulationSummary([], 0),
      events: [],
      timeline: [],
      latestPrice: 0,
    };
  }

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

  return {
    summary: buildSimulationSummary(events, latestPrice),
    events,
    timeline: buildSimulationTimeline(sorted, events),
    latestPrice,
  };
};
