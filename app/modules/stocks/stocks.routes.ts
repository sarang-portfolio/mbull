import { Router } from "express";
import { permit } from "../../utility/authorize";
import { ResponseHandler } from "../../utility/responseHandler";
import { SUBSCRIPTION } from "../subscriptionType/subscriptionType.constants";
import stocksService from "./stocks.service";
import { stockUrls } from "./stocks.urls";

export const StockRouter = Router();

StockRouter.get(
  stockUrls.getAllStocks,
  permit([SUBSCRIPTION.PREMIUM, SUBSCRIPTION.BASIC, SUBSCRIPTION.FREE]),
  async (req, res, next) => {
    try {
      const pageNumber = Number(req.query.pageNumber) || 1;
      const pageSize = Number(req.query.pageSize) || 10;
      const sortColumns = req.query.sortColumns
        ? (req.query.sortColumns as any).split(",")
        : ["companyName"];
      const sortDirections = req.query.sortDirections
        ? (req.query.sortDirections as any).split(",")
        : [1];
      const subscriptionType = res.locals.user.subscription;
      switch (subscriptionType) {
        case SUBSCRIPTION.FREE:
          const stocks = await stocksService.getAllFreeStocks(
            pageNumber,
            sortColumns as string[],
            sortDirections as string[]
          );
          res.send(new ResponseHandler(stocks));
          break;
        case SUBSCRIPTION.PREMIUM:
          const result = await stocksService.getStocks(
            pageNumber,
            pageSize,
            sortColumns as string[],
            sortDirections as string[]
          );
          res.send(new ResponseHandler(result));
          break;
        case SUBSCRIPTION.BASIC:
          const stockData = await stocksService.getStocks(
            pageNumber,
            pageSize,
            sortColumns as string[],
            sortDirections as string[]
          );
          res.send(new ResponseHandler(stockData));
          break;
      }
    } catch (err) {
      next(err);
    }
  }
);

StockRouter.get(stockUrls.getOneStock, async (req, res, next) => {
  try {
    const stock = await stocksService.getOneStock(req.params.id);
    res.send(new ResponseHandler(stock));
  } catch (err) {
    next(err);
  }
});
