import { MessageHandler } from "../../utility/responseHandler";

export const walletResponse = {
  MONEY_ADDED: new MessageHandler(200, "MONEY ADDED SUCCESSFULLY!"),
  MONEY_NOT_ADDED: new MessageHandler(409, "MONEY NOT ADDED!"),
  WALLET_NOT_FOUND: new MessageHandler(404, "USER WALLET NOT FOUND!"),
  AMOUNT_DEBITED: new MessageHandler(200, "AMOUNT DEBITED SUCCESSFULLY"),
  AMOUNT_NOT_DEBITED: new MessageHandler(
    409,
    "AMOUNT NOT DEBITED, PLEASE ENSURE SUFFICIENT BALANCE"
  ),
};
