// pure business/domain entities.

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
