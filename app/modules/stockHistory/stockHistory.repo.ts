import { stockHistoryModel } from "./stockHistory.schema";
import { IStockHistory } from "./stockHistory.types";

const getAll = () => stockHistoryModel.find({ isDeleted: false }).lean();

const getOne = (nseCode: string) =>
  stockHistoryModel.findOne({ nseCode: nseCode, isDeleted: false });

const addHistory = (stockHistory: IStockHistory[]) =>
  stockHistoryModel.create(stockHistory);

const stockHistoryLength = () =>
  stockHistoryModel.countDocuments({ isDeleted: false });

const getOneStockHistory = (stockId: string) =>
  stockHistoryModel.findOne({ _id: stockId, isDeleted: false });

const updateStockHistory = (stockId: string, stockHistory: IStockHistory) =>
  stockHistoryModel.findOneAndUpdate(
    {
      _id: stockId,
      isDeleted: false,
    },
    {
      $push: {
        todayOpen: stockHistory.todayOpen,
        todayHigh: stockHistory.todayHigh,
        todayLow: stockHistory.todayLow,
        todayClose: stockHistory.todayClose,
        lastTradedPrice: stockHistory.lastTradedPrice,
        dayChange: stockHistory.dayChange,
        dayChangePercentage: stockHistory.dayChangePercentage,
        volume: stockHistory.volume,
        totalBuyQuantity: stockHistory.totalBuyQuantity,
        totalSellQuantity: stockHistory.totalSellQuantity,
      },
    }
  );

const bulkUpdate = (data: any) => stockHistoryModel.bulkWrite(data);

const stockPriceOverTime = (nseCode: string) => {
  return stockHistoryModel.aggregate([
    {
      $match: {
        nseCode: nseCode,
      },
    },
    {
      $project: {
        _id: 0,
        companyName: 1,
        nseCode: 1,
        todayOpen: 1,
        todayHigh: 1,
        todayLow: 1,
        todayClose: 1,
        lastTradedPrice: 1,
        dayChange: 1,
        dayChangePercentage: 1,
        volume: 1,
        totalBuyQuantity: 1,
        totalSellQuantity: 1,
        yearHigh: 1,
        yearLow: 1,
      },
    },
  ]);
};

const stockPriceOver1Day = (tomorrow: Date, yesterday: Date, nseCode: string) =>
  stockHistoryModel.aggregate([
    {
      $match: { nseCode: nseCode },
    },
    {
      $project: {
        nseCode: 1,
        todayHigh: 1,
        todayLow: 1,
        volume: 1,
        totalBuyQuantity: 1,
        totalSellQuantity: 1,
        dayChange: 1,
        dayChangePercentage: 1,
        lastTradedPrice: {
          $filter: {
            input: "$lastTradedPrice",
            as: "ltp",
            cond: {
              $and: [
                { $gt: ["$$ltp.updatedAt", yesterday] },
                { $lt: ["$$ltp.updatedAt", tomorrow] },
              ],
            },
          },
        },
      },
    },
  ]);

const stockPriceOver5Day = (
  tomorrow: Date,
  fiveDaysBefore: Date,
  nseCode: string
) =>
  stockHistoryModel.aggregate([
    {
      $match: { nseCode: nseCode },
    },
    {
      $project: {
        nseCode: 1,
        todayHigh: 1,
        todayLow: 1,
        volume: 1,
        totalBuyQuantity: 1,
        totalSellQuantity: 1,
        dayChange: 1,
        dayChangePercentage: 1,
        lastTradedPrice: {
          $filter: {
            input: "$lastTradedPrice",
            as: "ltp",
            cond: {
              $and: [
                { $gte: ["$$ltp.updatedAt", fiveDaysBefore] },
                { $lt: ["$$ltp.updatedAt", tomorrow] },
              ],
            },
          },
        },
      },
    },
  ]);

const stockPriceOver1Month = (
  tomorrow: Date,
  oneMonthBefore: Date,
  nseCode: string
) =>
  stockHistoryModel.aggregate([
    {
      $match: { nseCode: nseCode },
    },
    {
      $project: {
        nseCode: 1,
        todayHigh: 1,
        todayLow: 1,
        volume: 1,
        totalBuyQuantity: 1,
        totalSellQuantity: 1,
        dayChange: 1,
        dayChangePercentage: 1,
        lastTradedPrice: {
          $filter: {
            input: "$lastTradedPrice",
            as: "ltp",
            cond: {
              $and: [
                { $gt: ["$$ltp.updatedAt", oneMonthBefore] },
                { $lt: ["$$ltp.updatedAt", tomorrow] },
              ],
            },
          },
        },
      },
    },
  ]);

const stockPriceOver3Month = (
  tomorrow: Date,
  threeMonthBefore: Date,
  nseCode: string
) =>
  stockHistoryModel.aggregate([
    {
      $match: { nseCode: nseCode },
    },
    {
      $project: {
        nseCode: 1,
        todayHigh: 1,
        todayLow: 1,
        volume: 1,
        totalBuyQuantity: 1,
        totalSellQuantity: 1,
        dayChange: 1,
        dayChangePercentage: 1,
        lastTradedPrice: {
          $filter: {
            input: "$lastTradedPrice",
            as: "ltp",
            cond: {
              $and: [
                { $gt: ["$$ltp.updatedAt", threeMonthBefore] },
                { $lt: ["$$ltp.updatedAt", tomorrow] },
              ],
            },
          },
        },
      },
    },
  ]);

const stockPriceOver6Month = (
  tomorrow: Date,
  sixMonthBefore: Date,
  nseCode: string
) =>
  stockHistoryModel.aggregate([
    {
      $match: { nseCode: nseCode },
    },
    {
      $project: {
        nseCode: 1,
        todayHigh: 1,
        todayLow: 1,
        volume: 1,
        totalBuyQuantity: 1,
        totalSellQuantity: 1,
        dayChange: 1,
        dayChangePercentage: 1,
        lastTradedPrice: {
          $filter: {
            input: "$lastTradedPrice",
            as: "ltp",
            cond: {
              $and: [
                { $gt: ["$$ltp.updatedAt", sixMonthBefore] },
                { $lt: ["$$ltp.updatedAt", tomorrow] },
              ],
            },
          },
        },
      },
    },
  ]);

const stockPriceOver1Year = (
  tomorrow: Date,
  oneYearBefore: Date,
  nseCode: string
) =>
  stockHistoryModel.aggregate([
    {
      $match: { nseCode: nseCode },
    },
    {
      $project: {
        nseCode: 1,
        todayHigh: 1,
        todayLow: 1,
        volume: 1,
        totalBuyQuantity: 1,
        totalSellQuantity: 1,
        dayChange: 1,
        dayChangePercentage: 1,
        lastTradedPrice: {
          $filter: {
            input: "$lastTradedPrice",
            as: "ltp",
            cond: {
              $and: [
                { $gt: ["$$ltp.updatedAt", oneYearBefore] },
                { $lt: ["$$ltp.updatedAt", tomorrow] },
              ],
            },
          },
        },
      },
    },
  ]);

export default {
  getAll,
  getOne,
  addHistory,
  getOneStockHistory,
  updateStockHistory,
  stockHistoryLength,
  bulkUpdate,
  stockPriceOverTime,
  stockPriceOver1Day,
  stockPriceOver5Day,
  stockPriceOver1Month,
  stockPriceOver3Month,
  stockPriceOver6Month,
  stockPriceOver1Year,
};
