import { DCAInvestmentEvent } from "../types/domain.types";

export const calculateInvestmentEvent = (
  timestamp: number,
  price: number,
  amountInvested: number,
): DCAInvestmentEvent => ({
  timestamp,
  price,
  amountInvested,
  unitsBought: price > 0 ? amountInvested / price : 0,
});
