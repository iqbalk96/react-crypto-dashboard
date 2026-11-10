import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { QueryClient } from "@tanstack/react-query";
import type { AxiosAdapter, InternalAxiosRequestConfig } from "axios";

import { api } from "@/shared/services/api";
import { fetchHistoricalPrices } from "../services/dca-api.service";
import { historicalDataQueryOptions } from "./use-historical-data";
import { runDCASimulation } from "../engine/run-dca-simulation";

/**
 * Eksperimen penghematan cache TanStack Query.
 *
 * Permintaan ke CoinGecko dihitung lewat adapter Axios tiruan (tanpa jaringan).
 * Pembanding (baseline) adalah pengambilan data langsung setiap kali pengguna
 * menjalankan simulasi, tanpa lapisan cache.
 */

const DAY = 24 * 60 * 60 * 1000;
const T0 = Date.UTC(2026, 9, 11); // 11 Okt 2026 (31 titik harian seperti data uji)

const fixture = {
  prices: Array.from({ length: 31 }, (_, i) => [T0 + i * DAY, 80_000 + i * 50]),
};
// Ukuran respons NYATA CoinGecko untuk 31 titik harian (prices + market_caps +
// total_volumes), diukur dari panggilan langsung ke API pada 10 November 2026.
// Fixture di atas hanya memuat prices sehingga ukurannya lebih kecil.
const payloadBytes = 3253;

let requestCount = 0;
let originalAdapter: typeof api.defaults.adapter;

const START = "2026-10-11";
const END = "2026-11-10";
const INTERVALS = [1, 7, 30] as const;
const ASSETS = ["bitcoin", "ethereum", "solana"] as const;

type Run = { assetId: string; intervalDays: number };

// Urutan eksekusi pengguna dalam satu sesi
const sessionA: Run[] = INTERVALS.map((i) => ({ assetId: "bitcoin", intervalDays: i }));
const sessionB: Run[] = ASSETS.flatMap((assetId) =>
  INTERVALS.map((intervalDays) => ({ assetId, intervalDays })),
);
const sessionC: Run[] = [...sessionB, ...sessionB]; // pengguna mengulang seluruh skenario

const config = (r: Run) => ({
  assetId: r.assetId,
  startDate: START,
  endDate: END,
  intervalDays: r.intervalDays,
  investmentAmount: 100,
});

const withCache = async (runs: Run[]) => {
  const client = new QueryClient();
  requestCount = 0;
  for (const r of runs) {
    const data = await client.fetchQuery(
      historicalDataQueryOptions(r.assetId, START, END),
    );
    runDCASimulation(config(r), data);
  }
  return requestCount;
};

const withoutCache = async (runs: Run[]) => {
  requestCount = 0;
  for (const r of runs) {
    const data = await fetchHistoricalPrices(r.assetId, START, END);
    runDCASimulation(config(r), data);
  }
  return requestCount;
};

describe("penghematan cache TanStack Query", () => {
  beforeEach(() => {
    originalAdapter = api.defaults.adapter;
    const adapter: AxiosAdapter = async (cfg: InternalAxiosRequestConfig) => {
      requestCount += 1;
      return {
        data: fixture,
        status: 200,
        statusText: "OK",
        headers: {},
        config: cfg,
      };
    };
    api.defaults.adapter = adapter;
  });

  afterEach(() => {
    api.defaults.adapter = originalAdapter;
    vi.restoreAllMocks();
  });

  it("mengganti interval pada aset dan rentang yang sama hanya memakai 1 request", async () => {
    expect(await withoutCache(sessionA)).toBe(3);
    expect(await withCache(sessionA)).toBe(1);
  });

  it("3 aset × 3 interval: 9 request tanpa cache, 3 request dengan cache", async () => {
    expect(await withoutCache(sessionB)).toBe(9);
    expect(await withCache(sessionB)).toBe(3);
  });

  it("mengulang seluruh skenario tidak menambah request baru", async () => {
    expect(await withoutCache(sessionC)).toBe(18);
    expect(await withCache(sessionC)).toBe(3);
  });

  it("merangkum hasil eksperimen", async () => {
    const rows = [
      ["A: 1 aset, 3 interval", sessionA],
      ["B: 3 aset × 3 interval", sessionB],
      ["C: skenario B diulang", sessionC],
    ] as const;

    const out: string[] = [];
    for (const [name, runs] of rows) {
      const base = await withoutCache(runs);
      const cached = await withCache(runs);
      const saved = ((base - cached) / base) * 100;
      out.push(
        `${name} | simulasi=${runs.length} | tanpa cache=${base} | dengan cache=${cached} | ` +
          `hemat=${saved.toFixed(1)}% | data=${(base * payloadBytes / 1024).toFixed(1)} KB → ` +
          `${(cached * payloadBytes / 1024).toFixed(1)} KB`,
      );
    }
    console.log(`\nUkuran satu respons (31 titik): ${payloadBytes} byte\n` + out.join("\n"));
    expect(out).toHaveLength(3);
  });

  it("rentang tanggal berbeda tetap menghasilkan request baru (cache tidak salah pakai)", async () => {
    const client = new QueryClient();
    requestCount = 0;
    await client.fetchQuery(historicalDataQueryOptions("bitcoin", START, END));
    await client.fetchQuery(historicalDataQueryOptions("bitcoin", "2026-10-12", END));
    expect(requestCount).toBe(2);
  });
});
