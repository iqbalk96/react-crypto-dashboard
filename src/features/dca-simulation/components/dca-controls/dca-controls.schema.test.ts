import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { addDays, format } from "date-fns";

import { dcaControlsSchema } from "./dca-controls.schema";

// Tanggal tetap agar tes deterministik: 15 Juni 2025
const NOW = new Date("2025-06-15T12:00:00Z");

const daysAgo = (n: number) => format(addDays(NOW, -n), "yyyy-MM-dd");

const base = {
  assetId: "bitcoin",
  interval: "7",
  investmentAmount: "100",
};

const parse = (overrides: Record<string, unknown>) =>
  dcaControlsSchema.safeParse({ ...base, ...overrides });

const messages = (result: ReturnType<typeof parse>) =>
  result.success ? [] : result.error.issues.map((i) => i.message);

describe("dcaControlsSchema", () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(NOW);
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("menerima input yang valid dan mengubah nominal menjadi number", () => {
    const r = parse({ startDate: daysAgo(30), endDate: daysAgo(1) });

    expect(r.success).toBe(true);
    if (r.success) expect(r.data.investmentAmount).toBe(100);
  });

  it("menerima endDate = hari ini", () => {
    const r = parse({ startDate: daysAgo(30), endDate: daysAgo(0) });
    expect(r.success).toBe(true);
  });

  describe("nominal investasi", () => {
    it("menolak nominal kosong", () => {
      const r = parse({
        startDate: daysAgo(30),
        endDate: daysAgo(1),
        investmentAmount: "",
      });

      expect(r.success).toBe(false);
      expect(messages(r)).toContain("Investment amount must be greater than 0");
    });

    it("menolak nominal 0 dan negatif", () => {
      for (const amount of ["0", "-5"]) {
        const r = parse({
          startDate: daysAgo(30),
          endDate: daysAgo(1),
          investmentAmount: amount,
        });
        expect(r.success).toBe(false);
      }
    });
  });

  describe("tanggal", () => {
    it("menolak tanggal kosong", () => {
      const r = parse({ startDate: "", endDate: "" });

      expect(messages(r)).toEqual(
        expect.arrayContaining([
          "Start date is required",
          "End date is required",
        ]),
      );
    });

    it("menolak endDate di masa depan", () => {
      const r = parse({
        startDate: daysAgo(30),
        endDate: format(addDays(NOW, 3), "yyyy-MM-dd"),
      });

      expect(messages(r)).toContain("End date cannot be in the future");
    });

    it("menolak startDate di masa depan", () => {
      const r = parse({
        startDate: format(addDays(NOW, 2), "yyyy-MM-dd"),
        endDate: format(addDays(NOW, 5), "yyyy-MM-dd"),
      });

      expect(messages(r)).toContain("Start date cannot be in the future");
    });

    it("menolak startDate yang sama atau setelah endDate", () => {
      expect(
        messages(parse({ startDate: daysAgo(5), endDate: daysAgo(5) })),
      ).toContain("Start date must be before end date");

      expect(
        messages(parse({ startDate: daysAgo(1), endDate: daysAgo(5) })),
      ).toContain("Start date must be before end date");
    });
  });

  describe("batas rentang & batas data historis (365 hari)", () => {
    it("menerima rentang tepat 365 hari", () => {
      const r = parse({ startDate: daysAgo(365), endDate: daysAgo(0) });
      expect(r.success).toBe(true);
    });

    it("menolak rentang 366 hari", () => {
      const r = parse({ startDate: daysAgo(366), endDate: daysAgo(0) });

      expect(messages(r)).toContain("Date range cannot exceed 365 days");
    });

    it("menerima startDate tepat 365 hari lalu", () => {
      const r = parse({ startDate: daysAgo(365), endDate: daysAgo(300) });
      expect(r.success).toBe(true);
    });

    it("menolak startDate lebih dari 365 hari lalu (batas API gratis)", () => {
      const r = parse({ startDate: daysAgo(366), endDate: daysAgo(300) });

      expect(r.success).toBe(false);
      expect(messages(r).join(" ")).toMatch(/too old/i);
    });

    it("menolak rentang lama yang pendek (mis. 2024 saat sekarang 2025)", () => {
      const r = parse({ startDate: "2024-01-01", endDate: "2024-03-01" });

      expect(r.success).toBe(false);
      expect(messages(r).join(" ")).toMatch(/too old/i);
    });
  });

  describe("asset & interval", () => {
    it("menolak interval di luar 1/7/30", () => {
      const r = parse({
        startDate: daysAgo(30),
        endDate: daysAgo(1),
        interval: "14",
      });
      expect(r.success).toBe(false);
    });

    it("menerima interval 1, 7, dan 30", () => {
      for (const interval of ["1", "7", "30"]) {
        const r = parse({
          startDate: daysAgo(30),
          endDate: daysAgo(1),
          interval,
        });
        expect(r.success).toBe(true);
      }
    });

    it("menolak assetId kosong", () => {
      const r = parse({
        startDate: daysAgo(30),
        endDate: daysAgo(1),
        assetId: "",
      });
      expect(r.success).toBe(false);
    });
  });
});
