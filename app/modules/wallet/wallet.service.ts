import walletRepo from "./wallet.repo";
import { walletResponse } from "./wallet.responses";

const addBalance = async (userId: string, balance: number = 0) => {
  try {
    const result = await walletRepo.addUserBalance(userId, balance);
    return walletResponse.MONEY_ADDED;
  } catch (err) {
    throw walletResponse.MONEY_NOT_ADDED;
  }
};
const getBalance = async (userId: string) => {
  try {
    const balance = await walletRepo.getUserBalance(userId);
    return balance;
  } catch (err) {
    throw walletResponse.WALLET_NOT_FOUND;
  }
};

const debitAmount = async (userId: string, amount: number) => {
  try {
    const result = await walletRepo.debitAmount(userId, amount);
    if (!result.modifiedCount) {
      throw walletResponse.AMOUNT_NOT_DEBITED;
    }
    return walletResponse.AMOUNT_DEBITED;
  } catch (err) {
    throw err;
  }
};

export default {
  addBalance,
  getBalance,
  debitAmount,
};
