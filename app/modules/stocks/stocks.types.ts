export interface IStocks {
  _id?: string;
  companyName: string;
  marketCap: number;
  nseCode: string;
  todayOpen: number;
  todayHigh: number;
  todayLow: number;
  todayClose: number;
  lastTradedPrice: number;
  dayChange: number;
  dayChangePercentage: number;
  volume: number;
  totalBuyQuantity: number;
  totalSellQuantity: number;
  yearHigh: number;
  yearLow: number;
  createdAt?: Date;
  updatedAt?: Date;
  isDeleted?: boolean;
}

export interface IFilterQuery {
  marketCapRange?: number[];
  stockPrices?: number[];
}

export interface ISort {
  [key: string]: string | undefined | null;
}

export interface IStockAPI {
  CompanyName: string;
  MarketCap: number;
  NSECode: string;
  TodayOpen: number;
  TodayHigh: number;
  TodayLow: number;
  TodayClose: number;
  ltp: number;
  dayChange: string;
  dayChangePerc: string;
  volume: number;
  totalBuyQty: number;
  totalSellQty: number;
  YrHigh: number;
  YrLow: number;
}
