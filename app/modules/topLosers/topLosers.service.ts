import topLosersRepo from "./topLosers.repo";

const bulkWrite = async (stocks: any) => {
  try {
    const result = await topLosersRepo.bulkWrite(stocks);
    return result;
  } catch (err) {
    throw err;
  }
};

const getAlltopLosers = async (
  pageNumber: number,
  pageSize: number,
  sortColumns: string[],
  sortDirections: string[]
) => {
  try {
    const topLosers = await topLosersRepo.getAll(
      pageNumber,
      pageSize,
      sortColumns,
      sortDirections
    );
    return topLosers;
  } catch (err) {
    throw err;
  }
};

const getAll = async () => {
  try {
    const topLosers = await topLosersRepo.getAllStocks();
    return topLosers;
  } catch (err) {
    throw err;
  }
};

export default {
  bulkWrite,
  getAlltopLosers,
  getAll,
};
