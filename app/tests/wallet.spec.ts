import { closeDatabase, connect } from "./db";
import walletService from "../modules/wallet/wallet.service";

beforeAll(async () => await connect());
afterAll(async () => await closeDatabase());

describe("Digital Wallet", () => {
  it("should add balance to the user's wallet", async () => {
    try {
      const result = await walletService.addBalance(
        "639969740157ec17ce45b4a1",
        2000
      );
      expect(result).toBe("MONEY ADDED SUCCESSFULLY!");
    } catch (err) {}
  });

  it("should fetch balance from user's wallet", async () => {
    try {
      const result = await walletService.getBalance("639969740157ec17ce45b4a1");
      expect(result).toHaveProperty("balance");
    } catch (err) {}
  });

  it("should debit amount from user's wallet", async () => {
    try {
      const result = await walletService.debitAmount(
        "639969740157ec17ce45b4a1",
        1000
      );
      expect(result).toBe("AMOUNT DEBITED SUCCESSFULLY");
    } catch (err) {}
  });
});

describe("Digital Wallet Errors", () => {
  it("it should not fetch user's wallet balance", async () => {
    try {
      await walletService.getBalance("639961740157ec17ce45b41");
    } catch (err: any) {
      const { message } = err;
      expect(message).toBe("USER WALLET NOT FOUND!");
    }
  });
});
