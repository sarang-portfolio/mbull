import { Router } from "express";
import { permit } from "../../utility/authorize";
import { ResponseHandler } from "../../utility/responseHandler";
import { SUBSCRIPTION } from "../subscriptionType/subscriptionType.constants";
import topGainersService from "./topGainers.service";
import { topGainerUrls } from "./topGainers.urls";

export const TopGainerRouter = Router();

TopGainerRouter.get(
  topGainerUrls.getAll,
  permit([SUBSCRIPTION.PREMIUM]),
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
      const result = await topGainersService.getAllTopGainers(
        pageNumber,
        pageSize,
        sortColumns as string[],
        sortDirections as string[]
      );
      res.send(new ResponseHandler(result));
    } catch (err) {
      throw err;
    }
  }
);
