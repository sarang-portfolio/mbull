import { Router } from "express";
import { ResponseHandler } from "../../utility/responseHandler";
import walletService from "./wallet.service";
import { walletUrls } from "./wallet.urls";
import { validateAddMoney, validateDebitMoney } from "./wallet.validate";

export const WalletRouter = Router();

WalletRouter.get(walletUrls.getBalance, async (req, res, next) => {
  try {
    const userId = res.locals.user.userId as string;
    const result = await walletService.getBalance(userId);
    res.send(new ResponseHandler(result));
  } catch (err) {
    next(err);
  }
});

WalletRouter.post(
  walletUrls.addBalance,
  validateAddMoney,
  async (req, res, next) => {
    try {
      const userId = res.locals.user.userId as string;
      const result = await walletService.addBalance(
        userId,
        Number(req.body.amount as string)
      );
      res.send(new ResponseHandler(result));
    } catch (err) {
      next(err);
    }
  }
);

WalletRouter.post(
  walletUrls.debitAmount,
  validateDebitMoney,
  async (req, res, next) => {
    try {
      const userId = res.locals.user.userId as string;
      const result = await walletService.debitAmount(
        userId,
        Number(req.body.amount as string)
      );
      res.send(new ResponseHandler(result));
    } catch (err) {
      next(err);
    }
  }
);
