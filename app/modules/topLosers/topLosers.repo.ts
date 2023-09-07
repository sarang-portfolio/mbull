import { topLoserModel } from "./topLosers.schema";

const bulkWrite = (stocks: any) => topLoserModel.bulkWrite(stocks);

const getAll = async (
  pageNumber: number,
  pageSize: number,
  sortColumns: string[],
  sortDirections: string[]
) => {
  try {
    const previousPageAvailable = pageNumber > 1;
    const sort: any = {};
    sortColumns.forEach((col, index) => {
      sort[col] = Number(sortDirections[index]);
    });
    const stocks = await topLoserModel
      .find({ isDeleted: false })
      .skip((pageNumber - 1) * pageSize)
      .limit(pageSize)
      .sort(sort);
    const nextPageAvailable = stocks.length === pageSize;
    return { previousPageAvailable, nextPageAvailable, stocks };
  } catch (err) {
    throw err;
  }
};

const getAllStocks = () => topLoserModel.find({ isDeleted: false });

export default {
  bulkWrite,
  getAll,
  getAllStocks,
};
