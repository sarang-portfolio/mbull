import { model } from "mongoose";
import { BaseSchema } from "../../utility/base.schema";
import { IStocks } from "./stocks.types";

const schema = new BaseSchema({
  companyName: {
    type: String,
    required: true,
  },
  marketCap: {
    type: Number,
    required: true,
  },
  nseCode: {
    type: String,
    required: true,
    index: true,
  },
  todayOpen: {
    type: Number,
    required: true,
  },
  todayHigh: {
    type: Number,
    required: true,
  },
  todayLow: {
    type: Number,
    required: true,
  },
  todayClose: {
    type: Number,
    required: true,
  },
  lastTradedPrice: {
    type: Number,
    required: true,
  },
  dayChange: {
    type: Number,
    required: true,
  },
  dayChangePercentage: {
    type: Number,
    required: true,
  },
  volume: {
    type: Number,
    required: true,
  },
  totalBuyQuantity: {
    type: Number,
    required: true,
  },
  totalSellQuantity: {
    type: Number,
    required: true,
  },
  yearHigh: {
    type: Number,
    required: true,
  },
  yearLow: {
    type: Number,
    required: true,
  },
});

type IStocksDocument = Document & IStocks;
export const stocksModel = model<IStocksDocument>("stocks", schema);
