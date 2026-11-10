import { isAxiosError } from "axios";

const FALLBACK = "Failed to fetch historical data. Please try again.";

/**
 * Mengubah error request menjadi pesan yang bisa dipahami pengguna.
 */
export const getErrorMessage = (error: unknown): string => {
  if (isAxiosError(error)) {
    const status = error.response?.status;

    if (status === 401 || status === 403) {
      return "The selected date range is outside what the free CoinGecko plan allows (last 365 days only).";
    }

    if (status === 429) {
      return "Too many requests to CoinGecko. Please wait a minute and try again.";
    }

    if (status === 404) {
      return "Price data for this asset was not found.";
    }

    if (error.code === "ECONNABORTED") {
      return "The request timed out. Please try again.";
    }

    if (!error.response) {
      return "Network error. Please check your connection or the API URL configuration.";
    }

    return `CoinGecko returned an error (HTTP ${status}).`;
  }

  return error instanceof Error ? error.message : FALLBACK;
};
