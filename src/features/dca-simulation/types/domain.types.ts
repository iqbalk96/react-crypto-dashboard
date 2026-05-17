// pure business/domain entities.

export type DCAConfig = {
  assetId: string;
  startDate: string;
  endDate: string;
  intervalDays: number;
  investmentAmount: number;
};