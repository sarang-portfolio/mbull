import { Router } from "express";
import { ResponseHandler } from "../../utility/responseHandler";
import subscriptionService from "./subscription.service";
import { ISubscription } from "./subscription.types";
import { subscriptionUrls } from "./subscription.urls";
import {
    validateAddSubscription,
    validateUpdateSubscription,
} from "./subscription.validate";

export const SubscriptionRouter = Router();

SubscriptionRouter.get(subscriptionUrls.getAll, async (req, res, next) => {
  try {
    const result = await subscriptionService.getAllSubscriptions();
    res.send(new ResponseHandler(result));
  } catch (err) {
    next(err);
  }
});

SubscriptionRouter.post(subscriptionUrls.purchase, async (req, res, next) => {
  try {
    const subscriptionId = req.params.id as string;
    const userId = res.locals.user.userId as string;
    const result = await subscriptionService.purchaseSubscription(
      userId,
      subscriptionId
    );
    res.send(new ResponseHandler(result));
  } catch (err) {
    next(err);
  }
});

SubscriptionRouter.post(
  subscriptionUrls.add,
  validateAddSubscription,
  async (req, res, next) => {
    try {
      const result = await subscriptionService.addSubscription(
        req.body as ISubscription
      );
      res.send(new ResponseHandler(result));
    } catch (err) {
      next(err);
    }
  }
);

SubscriptionRouter.get(subscriptionUrls.getOne, async (req, res, next) => {
  try {
    const result = await subscriptionService.getOneSubscription(
      req.params.id as string
    );
    res.send(new ResponseHandler(result));
  } catch (err) {
    next(err);
  }
});

SubscriptionRouter.put(
  subscriptionUrls.update,
  validateUpdateSubscription,
  async (req, res, next) => {
    try {
      const result = await subscriptionService.updateSubscription(
        req.params.id as string,
        req.body as ISubscription
      );
      res.send(new ResponseHandler(result));
    } catch (err) {
      next(err);
    }
  }
);
