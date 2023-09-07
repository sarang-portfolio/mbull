export interface IStockHistory {
  _id?: string;
  nseCode: string;
  todayOpen: object[];
  todayHigh: object[];
  todayLow: object[];
  todayClose: object[];
  lastTradedPrice: object[];
  dayChange: object[];
  dayChangePercentage: object[];
  volume: object[];
  totalBuyQuantity: object[];
  totalSellQuantity: object[];
  createdAt?: Date;
  updatedAt?: Date;
  isDeleted?: boolean;
}
