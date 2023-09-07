export interface ItopLoser {
  _id?: string;
  companyName: string;
  marketCap: number;
  nseCode: string;
  todayHigh: number;
  todayLow: number;
  lastTradedPrice: number;
  dayChange: number;
  dayChangePercentage: number;
  yearHigh: number;
  yearLow: number;
  createdAt?: Date;
  updatedAt?: Date;
  isDeleted?: boolean;
}

export interface ItopLoserAPI {
  CompanyName: string;
  MarketCap: number;
  NSECode: string;
  TodayHigh: number;
  TodayLow: number;
  ltp: number;
  dayChange: string;
  dayChangePerc: string;
  YrHigh: number;
  YrLow: number;
}
