import { topGainerModel } from "./topGainers.schema";
import { ITopGainer } from "./topGainers.types";

const bulkWrite = (stocks: any) => topGainerModel.bulkWrite(stocks);

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
    const stocks = await topGainerModel
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

const getAllStocks = () => topGainerModel.find({ isDeleted: false });

export default {
  bulkWrite,
  getAll,
  getAllStocks,
};
