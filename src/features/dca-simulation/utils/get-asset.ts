import { SUPPORTED_ASSETS } from "../constants/supported-assets";

export const getAsset = (assetId: string) =>
  SUPPORTED_ASSETS.find((a) => a.id === assetId) ?? {
    id: assetId,
    symbol: assetId.toUpperCase(),
    name: assetId,
  };
