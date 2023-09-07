import { BaseSchema } from "../../utility/base.schema";
import { model } from "mongoose";
import { IStockHistory } from "./stockHistory.types";

const schema = new BaseSchema({
  nseCode: {
    type: String,
    required: true,
    index: true,
  },
  todayOpen: [
    new BaseSchema({
      todayOpen: Number,
    }),
  ],
  todayHigh: [
    new BaseSchema({
      todayHigh: Number,
    }),
  ],
  todayLow: [
    new BaseSchema({
      todayLow: Number,
    }),
  ],
  todayClose: [
    new BaseSchema({
      todayClose: Number,
    }),
  ],
  lastTradedPrice: [
    new BaseSchema({
      lastTradedPrice: Number,
    }),
  ],
  dayChange: [
    new BaseSchema({
      dayChange: Number,
    }),
  ],
  dayChangePercentage: [
    new BaseSchema({
      dayChangePercentage: Number,
    }),
  ],
  volume: [
    new BaseSchema({
      volume: Number,
    }),
  ],
  totalBuyQuantity: [
    new BaseSchema({
      totalBuyQuantity: Number,
    }),
  ],
  totalSellQuantity: [
    new BaseSchema({
      totalSellQuantity: Number,
    }),
  ],
});

type IStockHistoryDocument = Document & IStockHistory;
export const stockHistoryModel = model<IStockHistoryDocument>(
  "stockHistory",
  schema
);
