import { MessageHandler } from "../../utility/responseHandler";

export const stockHistoryResponse = {
  NOT_FOUND: new MessageHandler(404, "STOCK FEED NOT FOUND!"),
};
