// pure business/domain entities.

import type { DCASummary } from "./dca-summary.types";

export type DCAConfig = {
  assetId: string;
  startDate: string;
  endDate: string;
  intervalDays: number;
  investmentAmount: number;
};

export type DCAInvestmentEvent = {
  timestamp: number;
  price: number;
  amountInvested: number;
  unitsBought: number;
};

export type DCATimelinePoint = {
  timestamp: number;
  date: string; // yyyy-MM-dd (UTC)
  price: number;
  totalInvested: number;
  totalUnits: number;
  portfolioValue: number;
  // data pembelian pada titik ini (0 jika tidak ada pembelian)
  amountInvested: number;
  unitsBought: number;
  bought: boolean;
};

export type DCASimulationResult = {
  summary: DCASummary;
  events: DCAInvestmentEvent[];
  timeline: DCATimelinePoint[];
  latestPrice: number;
};
