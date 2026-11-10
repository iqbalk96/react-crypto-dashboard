import { describe, expect, it } from "vitest";

import { buildSimulationTimeline } from "./build-simulation-timeline";
import { calculateInvestmentEvent } from "./calculate-investment-event";

const DAY = 24 * 60 * 60 * 1000;
const T0 = Date.UTC(2024, 0, 1);

const data = [100, 200, 50, 100].map((price, i) => ({
  timestamp: T0 + i * DAY,
  price,
}));

describe("buildSimulationTimeline", () => {
  it("memiliki satu titik untuk setiap data harga", () => {
    const timeline = buildSimulationTimeline(data, []);

    expect(timeline).toHaveLength(data.length);
    expect(timeline.map((p) => p.date)).toEqual([
      "2024-01-01",
      "2024-01-02",
      "2024-01-03",
      "2024-01-04",
    ]);
  });

  it("tanpa pembelian: investasi, unit, dan nilai portofolio tetap 0", () => {
    const timeline = buildSimulationTimeline(data, []);

    for (const p of timeline) {
      expect(p.bought).toBe(false);
      expect(p.totalInvested).toBe(0);
      expect(p.totalUnits).toBe(0);
      expect(p.portfolioValue).toBe(0);
    }
  });

  it("mengakumulasi investasi dan unit hanya pada hari pembelian", () => {
    // beli di hari ke-0 (harga 100) dan hari ke-2 (harga 50), $100 masing-masing
    const events = [
      calculateInvestmentEvent(data[0].timestamp, 100, 100),
      calculateInvestmentEvent(data[2].timestamp, 50, 100),
    ];

    const t = buildSimulationTimeline(data, events);

    expect(t.map((p) => p.bought)).toEqual([true, false, true, false]);
    expect(t.map((p) => p.totalInvested)).toEqual([100, 100, 200, 200]);
    expect(t.map((p) => p.totalUnits)).toEqual([1, 1, 3, 3]);
  });

  it("nilai portofolio = total unit × harga pada hari itu", () => {
    const events = [
      calculateInvestmentEvent(data[0].timestamp, 100, 100),
      calculateInvestmentEvent(data[2].timestamp, 50, 100),
    ];

    const t = buildSimulationTimeline(data, events);

    expect(t.map((p) => p.portfolioValue)).toEqual([
      100, // 1 × 100
      200, // 1 × 200
      150, // 3 × 50
      300, // 3 × 100
    ]);
  });

  it("mencatat nominal dan unit yang dibeli pada hari pembelian", () => {
    const events = [calculateInvestmentEvent(data[2].timestamp, 50, 100)];

    const t = buildSimulationTimeline(data, events);

    expect(t[2].amountInvested).toBe(100);
    expect(t[2].unitsBought).toBe(2);
    expect(t[1].amountInvested).toBe(0);
    expect(t[1].unitsBought).toBe(0);
  });
});
