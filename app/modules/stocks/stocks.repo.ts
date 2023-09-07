import { stocksModel } from "./stocks.schema";
import { IStocks } from "./stocks.types";

const add = (stocks: any) => stocksModel.bulkWrite(stocks);

const update = (id: string, stocks: IStocks) =>
  stocksModel.findOneAndUpdate(
    {
      _id: id,
      isDeleted: false,
    },
    stocks
  );

const bulkWrite = (data: any[]) => stocksModel.bulkWrite(data);

const remove = (id: string) =>
  stocksModel.findOneAndUpdate(
    { _id: id, isDeleted: false },
    { isDeleted: true },
    { new: true }
  );

const getOne = (id: string) =>
  stocksModel.findOne({ _id: id, isDeleted: false });

const getAll = async (
  pageNumber: number,
  pageSize: number,
  sortColumns: string[],
  sortDirections: string[]
) => {
  const previousPageAvailable = (pageNumber || 1) > 1;
  const sort: any = {};
  sortColumns.forEach((col, index) => {
    sort[col] = sortDirections[index];
  });
  const stocks = await stocksModel
    .find({ isDeleted: false })
    .skip((pageNumber - 1) * pageSize)
    .limit(pageSize)
    .sort(sort);
  const nextPageAvailable = stocks.length === pageSize;
  return { previousPageAvailable, nextPageAvailable, stocks };
};

const getAllFreeStocks = async (
  pageNumber: number,
  sortColumns: string[],
  sortDirections: string[]
) => {
  const previousPageAvailable = (pageNumber || 1) > 1;
  const sort: any = {};
  sortColumns.forEach((col, index) => {
    sort[col] = Number(sortDirections[index]);
  });
  const stocks = await stocksModel
    .find({ isDeleted: false })
    .limit(10)
    .sort(sort);
  const nextPageAvailable = stocks.length !== 10;
  return { previousPageAvailable, nextPageAvailable, stocks };
};

const getAllStocks = () => stocksModel.find({ isDeleted: false });

const uniqueNseCode = () => stocksModel.distinct("nseCode");

const findAllNseCode = () =>
  stocksModel.find({ isDeleted: false }, { nseCode: 1 }).batchSize(4000);

export default {
  add,
  update,
  remove,
  getOne,
  getAll,
  getAllStocks,
  bulkWrite,
  uniqueNseCode,
  findAllNseCode,
  getAllFreeStocks,
};
