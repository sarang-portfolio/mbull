import stockHistoryRepo from "./stockHistory.repo";
import { stockHistoryResponse } from "./stockHistory.responses";
import { IStockHistory } from "./stockHistory.types";

const countDocuments = async () => {
  try {
    const count = await stockHistoryRepo.stockHistoryLength();
    return count;
  } catch (err) {
    throw err;
  }
};

const getAllHistory = async () => {
  try {
    const history = await stockHistoryRepo.getAll();
    return history;
  } catch (err) {
    throw err;
  }
};

const getOneStockHistory = async (nseCode: string) => {
  try {
    const stockHistory = await stockHistoryRepo.getOne(nseCode);
    return stockHistory;
  } catch (err) {
    throw err;
  }
};

const addHistory = async (stockHistory: IStockHistory[]) => {
  try {
    const newHistory = await stockHistoryRepo.addHistory(stockHistory);
    return newHistory;
  } catch (err) {
    throw err;
  }
};

const updateStockHistory = async (
  stockId: string,
  stockHistory: IStockHistory
) => {
  try {
    const updatedStockHistory = await stockHistoryRepo.updateStockHistory(
      stockId,
      stockHistory
    );
    return updatedStockHistory;
  } catch (err) {
    throw err;
  }
};

const bulkUpdate = async (data: any) => {
  try {
    const result = await stockHistoryRepo.bulkUpdate(data);
    return result;
  } catch (err) {
    throw err;
  }
};

const stockPriceOverTime = async (nseCode: string) => {
  try {
    const stocks = await stockHistoryRepo.stockPriceOverTime(nseCode);
    const [stock] = stocks;
    return stock;
  } catch (err) {
    throw err;
  }
};

const stockPriceOver1Day = async (nseCode: string) => {
  try {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(0, 0, 0, 0);
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    yesterday.setHours(23, 59, 59, 999);
    const data = await stockHistoryRepo.stockPriceOver1Day(
      tomorrow,
      yesterday,
      nseCode
    );
    if (data) {
      const [stockFeed] = data;
      if (stockFeed.lastTradedPrice.length !== 0) {
        return stockFeed;
      }
    }
    throw stockHistoryResponse.NOT_FOUND;
  } catch (err) {
    throw err;
  }
};

const stockPriceOver5Days = async (nseCode: string) => {
  try {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(0, 0, 0, 0);
    const fiveDaysBefore = new Date();
    fiveDaysBefore.setDate(fiveDaysBefore.getDate() - 4);
    fiveDaysBefore.setHours(0, 0, 0, 0);
    const data = await stockHistoryRepo.stockPriceOver5Day(
      tomorrow,
      fiveDaysBefore,
      nseCode
    );
    if (data) {
      const [stockFeed] = data;
      if (stockFeed.lastTradedPrice.length !== 0) {
        return stockFeed;
      }
    }
    throw stockHistoryResponse.NOT_FOUND;
  } catch (err) {
    throw err;
  }
};

const stockPriceOver1Months = async (nseCode: string) => {
  try {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(0, 0, 0, 0);
    const oneMonthBefore = new Date();
    oneMonthBefore.setMonth(oneMonthBefore.getMonth() - 1);
    oneMonthBefore.setHours(0, 0, 0, 0);
    const data = await stockHistoryRepo.stockPriceOver1Month(
      tomorrow,
      oneMonthBefore,
      nseCode
    );
    if (data) {
      const [stockFeed] = data;
      if (stockFeed.lastTradedPrice.length !== 0) {
        return stockFeed;
      }
    }
    throw stockHistoryResponse.NOT_FOUND;
  } catch (err) {
    throw err;
  }
};

const stockPriceOver3Months = async (nseCode: string) => {
  try {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(0, 0, 0, 0);
    const threeMonthBefore = new Date();
    threeMonthBefore.setMonth(threeMonthBefore.getMonth() - 2);
    threeMonthBefore.setHours(0, 0, 0, 0);
    const data = await stockHistoryRepo.stockPriceOver3Month(
      tomorrow,
      threeMonthBefore,
      nseCode
    );
    if (data) {
      const [stockFeed] = data;
      if (stockFeed.lastTradedPrice.length !== 0) {
        return stockFeed;
      }
    }
    throw stockHistoryResponse.NOT_FOUND;
  } catch (err) {
    throw err;
  }
};

const stockPriceOver6Months = async (nseCode: string) => {
  try {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(0, 0, 0, 0);
    const sixMonthBefore = new Date();
    sixMonthBefore.setMonth(sixMonthBefore.getMonth() - 5);
    sixMonthBefore.setHours(0, 0, 0, 0);
    const data = await stockHistoryRepo.stockPriceOver6Month(
      tomorrow,
      sixMonthBefore,
      nseCode
    );
    if (data) {
      const [stockFeed] = data;
      if (stockFeed.lastTradedPrice.length !== 0) {
        return stockFeed;
      }
    }
    throw stockHistoryResponse.NOT_FOUND;
  } catch (err) {
    throw err;
  }
};

const stockPriceOver1Year = async (nseCode: string) => {
  try {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(0, 0, 0, 0);
    const oneYearBefore = new Date();
    oneYearBefore.setFullYear(oneYearBefore.getFullYear() - 1);
    oneYearBefore.setHours(0, 0, 0, 0);
    const data = await stockHistoryRepo.stockPriceOver1Year(
      tomorrow,
      oneYearBefore,
      nseCode
    );
    if (data) {
      const [stockFeed] = data;
      if (stockFeed.lastTradedPrice.length !== 0) {
        return stockFeed;
      }
    }
    throw stockHistoryResponse.NOT_FOUND;
  } catch (err) {
    throw err;
  }
};

export default {
  getAllHistory,
  addHistory,
  getOneStockHistory,
  updateStockHistory,
  countDocuments,
  bulkUpdate,
  stockPriceOverTime,
  stockPriceOver1Day,
  stockPriceOver5Days,
  stockPriceOver1Months,
  stockPriceOver3Months,
  stockPriceOver6Months,
  stockPriceOver1Year,
};
