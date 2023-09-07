import topGainersRepo from "./topGainers.repo";

const bulkWrite = async (stocks: any) => {
  try {
    const result = await topGainersRepo.bulkWrite(stocks);
    return result;
  } catch (err) {
    throw err;
  }
};

const getAllTopGainers = async (
  pageNumber: number,
  pageSize: number,
  sortColumns: string[],
  sortDirections: string[]
) => {
  try {
    const topGainers = await topGainersRepo.getAll(
      pageNumber,
      pageSize,
      sortColumns,
      sortDirections
    );
    return topGainers;
  } catch (err) {
    throw err;
  }
};

const getAll = async () => {
  try {
    const topGainers = await topGainersRepo.getAllStocks();
    return topGainers;
  } catch (err) {
    throw err;
  }
};

export default {
  bulkWrite,
  getAllTopGainers,
  getAll,
};
