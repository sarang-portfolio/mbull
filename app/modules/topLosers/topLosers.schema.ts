import { model } from "mongoose";
import { BaseSchema } from "../../utility/base.schema";
import { ItopLoser } from "./topLosers.types";

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
  },
  todayHigh: {
    type: Number,
    required: true,
  },
  todayLow: {
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
  yearHigh: {
    type: Number,
    required: true,
  },
  yearLow: {
    type: Number,
    required: true,
  },
});

type ItopLoserDocument = Document & ItopLoser;
export const topLoserModel = model<ItopLoserDocument>("topLoser", schema);
