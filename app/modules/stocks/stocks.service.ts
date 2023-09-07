import stocksRepo from "./stocks.repo";
import { IStocks } from "./stocks.types";

const addStocks = async (data: any[]) => {
  try {
    const stocks = await stocksRepo.add(data);
    return stocks;
  } catch (error) {
    throw error;
  }
};

const getAll = async () => {
  try {
    const stocks = await stocksRepo.getAllStocks();
    return stocks;
  } catch (error) {
    throw error;
  }
};

const getStocks = async (
  pageNumber: number,
  pageSize: number,
  sortColumns: string[],
  sortDirections: string[]
) => {
  try {
    const stocks = await stocksRepo.getAll(
      pageNumber,
      pageSize,
      sortColumns,
      sortDirections
    );
    return stocks;
  } catch (err) {
    throw err;
  }
};

const getAllFreeStocks = async (
  pageNumber: number,
  sortColumns: string[],
  sortDirections: string[]
) => {
  try {
    const stocks = await stocksRepo.getAllFreeStocks(
      pageNumber,
      sortColumns,
      sortDirections
    );
    return stocks;
  } catch (err) {
    throw err;
  }
};

const getOneStock = async (id: string) => {
  try {
    const stock = await stocksRepo.getOne(id);
    return stock;
  } catch (err) {
    throw err;
  }
};

const updateStock = async (id: string, stocks: IStocks) => {
  try {
    const stock = await stocksRepo.update(id, stocks);
    return stock;
  } catch (err) {
    throw err;
  }
};

const removeStock = async (id: string) => {
  try {
    const stock = await stocksRepo.remove(id);
    return stock;
  } catch (err) {
    throw err;
  }
};

const bulkWriteStocks = async (data: any) => {
  try {
    const result = await stocksRepo.bulkWrite(data);
    return result;
  } catch (err) {
    throw err;
  }
};

const findAllNseCode = async () => {
  try {
    const data = await stocksRepo.findAllNseCode();
    const nseCodeArray = data.map((item) => item.nseCode);
    return nseCodeArray;
  } catch (err) {
    throw err;
  }
};

export default {
  addStocks,
  getStocks,
  getOneStock,
  updateStock,
  removeStock,
  getAll,
  bulkWriteStocks,
  findAllNseCode,
  getAllFreeStocks,
};
