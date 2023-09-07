import { job } from "cron";
import stockHistoryService from "../../../app/modules/stockHistory/stockHistory.service";
import stocksService from "../../../app/modules/stocks/stocks.service";
import topGainersService from "../../../app/modules/topGainers/topGainers.service";
import topLosersService from "../../../app/modules/topLosers/topLosers.service";
import {
    stockData,
    stockHistoryData,
    topGainers,
    topLosers,
} from "./stockData";

export const stockListCron = job("*/10 * * * * *", async () => {
  try {
    const start = performance.now();
    await updateStockList();
    const end = performance.now();
    console.log("TIME TAKEN", end - start);
  } catch (err) {
    console.log(err);
  }
});

const updateStockList = async () => {
  try {
    const data = await stockData();
    console.log(data.length);
    const stocks = await stocksService.getAll();
    const upsertObj = [];
    if (data.length >= stocks.length) {
      for (let d of data) {
        const stock = {
          companyName: d.companyName,
          marketCap: d.marketCap,
          nseCode: d.nseCode,
          todayOpen: d.todayOpen,
          todayHigh: d.todayHigh,
          todayLow: d.todayLow,
          todayClose: d.todayClose,
          lastTradedPrice: d.lastTradedPrice,
          dayChange: d.dayChange,
          dayChangePercentage: d.dayChangePercentage,
          volume: d.volume,
          totalBuyQuantity: d.totalBuyQuantity,
          totalSellQuantity: d.totalSellQuantity,
          yearHigh: d.yearHigh,
          yearLow: d.yearLow,
        };
        const upsertDoc = {
          updateOne: {
            filter: { nseCode: stock.nseCode },
            update: stock,
            upsert: true,
          },
        };
        upsertObj.push(upsertDoc);
      }
      await stocksService.addStocks(upsertObj);
      console.log("DATA INSERTED");
    }
  } catch (err) {
    console.log(err);
  }
};

export const updateStockHistoryCron = job("*/10 * * * * *", async () => {
  try {
    const start = performance.now();
    await updateStockHistory();
    const end = performance.now();
    console.log("TIME TAKEN", end - start);
  } catch (err) {
    console.log(err);
  }
});

export const updateStockHistory = async () => {
  try {
    const newStockHistory = await stockHistoryData();
    console.log(newStockHistory.length);
    let insertedDocuments = 0;
    let updatedDocuments = 0;
    for (let stock of newStockHistory) {
      const { nseCode } = stock;
      const existingStock = await stockHistoryService.getOneStockHistory(
        nseCode
      );
      let bulkOps = {};
      if (existingStock) {
        const fieldsToUpdate = [
          "todayOpen",
          "todayClose",
          "todayHigh",
          "todayLow",
          "lastTradedPrice",
          "dayChange",
          "dayChangePercentage",
          "volume",
          "totalBuyQuantity",
          "totalSellQuantity",
        ];
        let updates: any = {};
        for (let field of fieldsToUpdate) {
          if (
            (existingStock as any)[field][
              (existingStock as any)[field].length - 1
            ][field] !== (stock as any)[field][0][field]
          ) {
            updates[field] = (stock as any)[field][0];
          }
        }
        if (Object.keys(updates).length > 0) {
          bulkOps = {
            updateOne: {
              filter: { nseCode },
              update: {
                $push: updates,
              },
              upsert: true,
            },
          };
          updatedDocuments++;
        } else {
          continue;
        }
      } else {
        bulkOps = {
          insertOne: {
            document: stock,
          },
        };
        insertedDocuments++;
      }
      const result = await stockHistoryService.bulkUpdate([bulkOps]);
    }
    console.log(
      `${insertedDocuments} stocks inserted, ${updatedDocuments} stocks updated`
    );
  } catch (err) {
    console.log(err);
  }
};

export const updateTopGainersTopLosersCron = job("*/10 * * * * *", async () => {
  try {
    const start = performance.now();
    await updateTopGainers();
    await updateTopLosers();
    const end = performance.now();
    console.log("TIME TAKEN", end - start);
  } catch (err) {
    console.log(err);
  }
});

export const updateTopGainers = async () => {
  try {
    const data = await topGainers();
    const stocks = await topGainersService.getAll();
    const upsertObj = [];
    if (data.length >= stocks.length) {
      for (let topGainers of data) {
        const stock = {
          companyName: topGainers.companyName,
          marketCap: topGainers.marketCap,
          nseCode: topGainers.nseCode,
          todayHigh: topGainers.todayHigh,
          todayLow: topGainers.todayLow,
          lastTradedPrice: topGainers.lastTradedPrice,
          dayChange: topGainers.dayChange,
          dayChangePercentage: topGainers.dayChangePercentage,
          yearHigh: topGainers.yearHigh,
          yearLow: topGainers.yearLow,
        };
        const upsertDoc = {
          updateOne: {
            filter: { nseCode: stock.nseCode },
            update: stock,
            upsert: true,
          },
        };
        upsertObj.push(upsertDoc);
      }
      await topGainersService.bulkWrite(upsertObj);
      return "DATA INSERTED";
    }
  } catch (err) {
    console.log(err);
  }
};

const updateTopLosers = async () => {
  try {
    const data = await topLosers();
    const stocks = await topLosersService.getAll();
    const upsertObj = [];
    if (data.length >= stocks.length) {
      for (let topLosers of data) {
        const stock = {
          companyName: topLosers.companyName,
          marketCap: topLosers.marketCap,
          nseCode: topLosers.nseCode,
          todayHigh: topLosers.todayHigh,
          todayLow: topLosers.todayLow,
          lastTradedPrice: topLosers.lastTradedPrice,
          dayChange: topLosers.dayChange,
          dayChangePercentage: topLosers.dayChangePercentage,
          yearHigh: topLosers.yearHigh,
          yearLow: topLosers.yearLow,
        };
        const upsertDoc = {
          updateOne: {
            filter: { nseCode: stock.nseCode },
            update: stock,
            upsert: true,
          },
        };
        upsertObj.push(upsertDoc);
      }
      await topLosersService.bulkWrite(upsertObj);
      console.log("DATA INSERTED");
    }
  } catch (err) {
    console.log(err);
  }
};
