import { useMemo } from "react";

import { runDCASimulation } from "../engine/run-dca-simulation";
import { getAsset } from "../utils/get-asset";

import type {
  DCAConfig,
  DCASimulationResult,
} from "../types/domain.types";

import { useHistoricalData } from "./use-historical-data";

/**
 * Menggabungkan pengambilan data historis dengan engine simulasi DCA.
 * Hasil simulasi di-memoize, hanya dihitung ulang jika config/data berubah.
 */
export const useDCASimulation = (config: DCAConfig | null) => {
  const query = useHistoricalData(
    config?.assetId ?? "",
    config?.startDate ?? "",
    config?.endDate ?? "",
  );

  const result: DCASimulationResult | null = useMemo(
    () =>
      config && query.data ? runDCASimulation(config, query.data) : null,
    [config, query.data],
  );

  const asset = getAsset(config?.assetId ?? "");

  return {
    result,
    asset,
    isLoading: query.isLoading,
    isError: query.isError,
    error: query.error,
  };
};
