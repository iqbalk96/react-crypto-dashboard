import { describe, expect, it } from "vitest";

import { runDCASimulation } from "./run-dca-simulation";
import type { DCAConfig } from "../types/domain.types";
import type { HistoricalPricePoint } from "../types/historical-price.types";

const DAY = 24 * 60 * 60 * 1000;
const T0 = Date.UTC(2024, 0, 1);

const makeData = (prices: number[]): HistoricalPricePoint[] =>
  prices.map((price, i) => ({ timestamp: T0 + i * DAY, price }));

const makeConfig = (overrides: Partial<DCAConfig> = {}): DCAConfig => ({
  assetId: "bitcoin",
  startDate: "2024-01-01",
  endDate: "2024-01-31",
  intervalDays: 1,
  investmentAmount: 100,
  ...overrides,
});

describe("runDCASimulation", () => {
  describe("hasil dihitung manual (daily)", () => {
    // harga 100, 200, 50, 100 → unit 1 + 0.5 + 2 + 1 = 4.5
    const result = runDCASimulation(makeConfig(), makeData([100, 200, 50, 100]));

    it("membeli setiap hari", () => {
      expect(result.summary.totalPurchases).toBe(4);
      expect(result.summary.totalInvested).toBe(400);
    });

    it("menghitung nilai akhir dan return", () => {
      expect(result.summary.totalUnitsAccumulated).toBeCloseTo(4.5, 10);
      expect(result.summary.currentValue).toBeCloseTo(450, 10);
      expect(result.summary.totalReturnPercentage).toBeCloseTo(12.5, 10);
    });

    it("harga terakhir diambil dari data terakhir", () => {
      expect(result.latestPrice).toBe(100);
    });
  });

  describe("interval pembelian (inti perbaikan bug #1)", () => {
    // 15 hari data (hari 0..14), harga naik 100..114
    const prices = Array.from({ length: 15 }, (_, i) => 100 + i);
    const data = makeData(prices);

    it("daily → 15 pembelian", () => {
      const r = runDCASimulation(makeConfig({ intervalDays: 1 }), data);
      expect(r.summary.totalPurchases).toBe(15);
      expect(r.summary.totalInvested).toBe(1500);
    });

    it("weekly → pembelian di hari 0, 7, 14", () => {
      const r = runDCASimulation(makeConfig({ intervalDays: 7 }), data);

      expect(r.summary.totalPurchases).toBe(3);
      expect(r.summary.totalInvested).toBe(300);

      const days = r.timeline
        .map((p, i) => (p.bought ? i : -1))
        .filter((i) => i >= 0);
      expect(days).toEqual([0, 7, 14]);
    });

    it("monthly (30 hari) pada data 15 hari → hanya satu pembelian di awal", () => {
      const r = runDCASimulation(makeConfig({ intervalDays: 30 }), data);

      expect(r.summary.totalPurchases).toBe(1);
      expect(r.summary.totalInvested).toBe(100);
      expect(r.summary.averageBuyPrice).toBe(100);
    });

    it("interval berbeda menghasilkan jumlah pembelian berbeda", () => {
      const counts = [1, 7, 30].map(
        (n) =>
          runDCASimulation(makeConfig({ intervalDays: n }), data).summary
            .totalPurchases,
      );

      expect(new Set(counts).size).toBe(3);
    });
  });

  describe("nominal investasi", () => {
    it("total investasi = jumlah pembelian × nominal", () => {
      const r = runDCASimulation(
        makeConfig({ investmentAmount: 250, intervalDays: 7 }),
        makeData(Array.from({ length: 15 }, () => 100)),
      );

      expect(r.summary.totalInvested).toBe(3 * 250);
    });

    it("harga konstan → return 0%", () => {
      const r = runDCASimulation(
        makeConfig(),
        makeData([100, 100, 100, 100]),
      );

      expect(r.summary.totalReturn).toBeCloseTo(0, 10);
      expect(r.summary.totalReturnPercentage).toBeCloseTo(0, 10);
    });
  });

  describe("konsistensi hasil", () => {
    const r = runDCASimulation(
      makeConfig({ intervalDays: 3 }),
      makeData([100, 120, 90, 110, 130, 80, 95, 105, 115, 125]),
    );
    const last = r.timeline[r.timeline.length - 1];

    it("titik terakhir timeline sama dengan ringkasan", () => {
      expect(last.totalInvested).toBe(r.summary.totalInvested);
      expect(last.totalUnits).toBeCloseTo(r.summary.totalUnitsAccumulated, 10);
      expect(last.portfolioValue).toBeCloseTo(r.summary.currentValue, 10);
    });

    it("jumlah event = jumlah titik beli di timeline", () => {
      expect(r.events).toHaveLength(r.timeline.filter((p) => p.bought).length);
      expect(r.events).toHaveLength(r.summary.totalPurchases);
    });
  });

  describe("input tidak ideal", () => {
    it("data kosong → hasil nol tanpa error", () => {
      const r = runDCASimulation(makeConfig(), []);

      expect(r.summary.totalPurchases).toBe(0);
      expect(r.summary.totalInvested).toBe(0);
      expect(r.timeline).toEqual([]);
      expect(r.latestPrice).toBe(0);
    });

    it("data tidak berurutan tetap dihitung berurutan", () => {
      const sorted = makeData([100, 200, 50, 100]);
      const shuffled = [sorted[2], sorted[0], sorted[3], sorted[1]];

      const a = runDCASimulation(makeConfig(), sorted);
      const b = runDCASimulation(makeConfig(), shuffled);

      expect(b.summary).toEqual(a.summary);
      expect(b.latestPrice).toBe(100);
    });

    it("tidak mengubah array data asli", () => {
      const data = makeData([100, 200, 50, 100]);
      const copy = [...data];
      const shuffled = [data[3], data[1], data[0], data[2]];
      const shuffledCopy = [...shuffled];

      runDCASimulation(makeConfig(), shuffled);

      expect(shuffled).toEqual(shuffledCopy);
      expect(data).toEqual(copy);
    });

    it("interval tidak valid → tidak ada pembelian", () => {
      const r = runDCASimulation(
        makeConfig({ intervalDays: 0 }),
        makeData([100, 110, 120]),
      );

      expect(r.summary.totalPurchases).toBe(0);
      expect(r.summary.totalInvested).toBe(0);
    });
  });
});
