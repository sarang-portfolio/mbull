import { walletModel } from "./wallet.schema";

const getUserBalance = (userId: string) =>
  walletModel.findOne({ userId: userId });

const addUserBalance = (userId: string, balance: number) =>
  walletModel.updateOne(
    {
      userId: userId,
    },
    { $inc: { balance } },
    { upsert: true }
  );

const debitAmount = (userId: string, amount: number) =>
  walletModel.updateOne(
    {
      userId: userId,
      balance: { $gt: amount },
    },
    {
      $inc: { balance: -amount },
    }
  );

export default {
  getUserBalance,
  addUserBalance,
  debitAmount,
};
