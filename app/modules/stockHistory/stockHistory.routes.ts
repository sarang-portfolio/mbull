import { Router } from "express";
import { permit } from "../../utility/authorize";
import { ResponseHandler } from "../../utility/responseHandler";
import { SUBSCRIPTION } from "../subscriptionType/subscriptionType.constants";
import stockHistoryService from "./stockHistory.service";
import { stockHistoryUrls } from "./stockHistory.urls";

export const StockHistoryRouter = Router();

StockHistoryRouter.get(stockHistoryUrls.getAll, async (req, res, next) => {
  try {
    const result = await stockHistoryService.getAllHistory();
    res.send(new ResponseHandler(result));
  } catch (err) {
    next(err);
  }
});

const stockHistoryFunctions: any = {
  "1day": stockHistoryService.stockPriceOver1Day,
  "5day": stockHistoryService.stockPriceOver5Days,
  "1month": stockHistoryService.stockPriceOver1Months,
  "3month": stockHistoryService.stockPriceOver3Months,
  "6month": stockHistoryService.stockPriceOver6Months,
  "1year": stockHistoryService.stockPriceOver1Year,
};

StockHistoryRouter.get(
  stockHistoryUrls.stockPriceOverTime,
  permit([SUBSCRIPTION.BASIC, SUBSCRIPTION.PREMIUM]),
  async (req, res, next) => {
    try {
      const feed = req.query.feed as string;
      let stock;
      if (feed in stockHistoryFunctions) {
        stock = await stockHistoryFunctions[feed](req.params.nseCode);
      } else {
        stock = await stockHistoryService.stockPriceOverTime(
          req.params.nseCode
        );
      }
      res.send(new ResponseHandler(stock));
    } catch (err) {
      next(err);
    }
  }
);
