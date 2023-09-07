import { MessageHandler } from "../../utility/responseHandler";

export const subscriptionResponse = {
  SUBSCRIPTION_ADDED: new MessageHandler(
    201,
    "SUBSCRIPTION ADDED SUCCESSFULLY"
  ),
  SUBSCRIPTION_NOT_ADDED: new MessageHandler(409, "SUBSCRIPTION NOT ADDED"),
  SUBSCRIPTION_UPDATED: new MessageHandler(
    200,
    "SUBSCRIPTION UPDATED SUCCESSFULLY"
  ),
  SUBSCRIPTION_NOT_UPDATED: new MessageHandler(409, "SUBSCRIPTION NOT UPDATED"),
  SUBSCRIPTION_NOT_FOUND: new MessageHandler(404, "SUBSCRIPTION NOT FOUND"),
  SUBSCRIPTION_PURCHASED: new MessageHandler(
    200,
    "SUBSCRIPTION PURCHASED SUCCESSFULLY"
  ),
};
