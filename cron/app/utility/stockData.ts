import fetch from "node-fetch";
import { IStockHistory } from "../../../app/modules/stockHistory/stockHistory.types";
import stocksService from "../../../app/modules/stocks/stocks.service";
import { IStockAPI, IStocks } from "../../../app/modules/stocks/stocks.types";
import {
    ITopGainer,
    ITopGainerAPI,
} from "../../../app/modules/topGainers/topGainers.types";
import {
    ItopLoser,
    ItopLoserAPI,
} from "../../../app/modules/topLosers/topLosers.types";

export const stockData = async () => {
  try {
    const { STOCK_API_URL } = process.env;
    const response = await fetch(STOCK_API_URL as string);
    const stocks = await response.json();
    const { data } = stocks;
    const stockList: IStocks[] = [];
    data.forEach((item: IStockAPI) => {
      const val = Object.values(item);
      if (!val.includes(null) && item) {
        stockList.push({
          companyName: item.CompanyName,
          marketCap: item.MarketCap,
          nseCode: item.NSECode,
          todayOpen: item.TodayOpen,
          todayHigh: item.TodayHigh,
          todayLow: item.TodayLow,
          todayClose: item.TodayClose,
          lastTradedPrice: item.ltp,
          dayChange: parseInt(item.dayChange),
          dayChangePercentage: parseInt(item.dayChangePerc),
          volume: item.volume,
          totalBuyQuantity: item.totalBuyQty,
          totalSellQuantity: item.totalSellQty,
          yearHigh: item.YrHigh,
          yearLow: item.YrLow,
        });
      }
    });
    return stockList;
  } catch (err) {
    throw err;
  }
};

export async function stockHistoryData() {
  try {
    const { LIVE_STOCK_FEED_API } = process.env;
    const data = await stocksService.findAllNseCode();
    const stockList: IStockHistory[] = [];
    const liveStockFeed: IStockHistory[] = [];
    const chunkSize = 40;
    const requests = [];
    for (let i = 0; i < data.length; i += chunkSize) {
      const chunk = data.slice(i, i + chunkSize);
      requests.push(
        handleBatch(chunk, stockList, LIVE_STOCK_FEED_API as string)
      );
    }
    await Promise.all(requests);
    stockList.forEach((item: any) => {
      const val = Object.values(item);
      if (item && !val.includes(null)) {
        liveStockFeed.push({
          nseCode: item.NSECode,
          todayOpen: [
            {
              todayOpen: item.TodayOpen,
            },
          ],
          todayHigh: [
            {
              todayHigh: item.TodayHigh,
            },
          ],
          todayLow: [
            {
              todayLow: item.TodayLow,
            },
          ],
          todayClose: [
            {
              todayClose: item.TodayClose,
            },
          ],
          lastTradedPrice: [
            {
              lastTradedPrice: item.ltp,
            },
          ],
          dayChange: [
            {
              dayChange: parseInt(item.dayChange),
            },
          ],
          dayChangePercentage: [
            {
              dayChangePercentage: parseInt(item.dayChangePerc),
            },
          ],
          volume: [
            {
              volume: item.volume,
            },
          ],
          totalBuyQuantity: [
            {
              totalBuyQuantity: item.totalBuyQty,
            },
          ],
          totalSellQuantity: [
            {
              totalSellQuantity: item.totalSellQty,
            },
          ],
        });
      }
    });
    return liveStockFeed;
  } catch (err) {
    throw err;
  }
}

const handleBatch = async (
  batch: string[],
  stockList: IStockHistory[],
  LIVE_STOCK_FEED_API: string
) => {
  let stockFeedLink = `${LIVE_STOCK_FEED_API}&nsecode=${batch.join(",")}`;
  let retries = 3;
  while (retries) {
    try {
      const response = await fetch(stockFeedLink);
      if (response.ok) {
        const json = await response.json();
        if (json.status === "1") {
          for (const stock in json.data) {
            if (json.data.hasOwnProperty(stock)) {
              stockList.push(json.data[stock]);
            }
          }
        } else {
          return null;
        }
      }
      break;
    } catch (err: any) {
      console.log(`Error: ${err.message}`);
    }
    retries -= 1;
    await new Promise((resolve) => setTimeout(resolve, 1000));
  }
};

export const topGainers = async () => {
  try {
    const { TOP_GAINERS_API } = process.env;
    const response = await fetch(TOP_GAINERS_API as string);
    const stocks = await response.json();
    const { data } = stocks;
    const stockList: ITopGainer[] = [];
    data.forEach((item: ITopGainerAPI) => {
      const val = Object.values(item);
      if (!val.includes(null) && item) {
        stockList.push({
          companyName: item.CompanyName,
          marketCap: item.MarketCap,
          nseCode: item.NSECode,
          todayHigh: item.TodayHigh,
          todayLow: item.TodayLow,
          lastTradedPrice: item.ltp,
          dayChange: parseInt(item.dayChange),
          dayChangePercentage: parseInt(item.dayChangePerc),
          yearHigh: item.YrHigh,
          yearLow: item.YrLow,
        });
      }
    });
    return stockList;
  } catch (err) {
    throw err;
  }
};

export const topLosers = async () => {
  try {
    const { TOP_LOSERS_API } = process.env;
    const response = await fetch(TOP_LOSERS_API as string);
    const stocks = await response.json();
    const { data } = stocks;
    const stockList: ItopLoser[] = [];
    data.forEach((item: ItopLoserAPI) => {
      const val = Object.values(item);
      if (!val.includes(null) && item) {
        stockList.push({
          companyName: item.CompanyName,
          marketCap: item.MarketCap,
          nseCode: item.NSECode,
          todayHigh: item.TodayHigh,
          todayLow: item.TodayLow,
          lastTradedPrice: item.ltp,
          dayChange: parseInt(item.dayChange),
          dayChangePercentage: parseInt(item.dayChangePerc),
          yearHigh: item.YrHigh,
          yearLow: item.YrLow,
        });
      }
    });
    return stockList;
  } catch (err) {
    throw err;
  }
};
