import { model } from "mongoose";
import { BaseSchema } from "../../utility/base.schema";
import { ISubscription } from "./subscription.types";

const schema = new BaseSchema({
  amount: {
    type: Number,
    required: true,
  },
  subscriptionType: {
    type: String,
    required: true,
  },
  validity: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  featureAccess: {
    type: [String],
    required: true,
  },
});

type ISubscriptionDocument = Document & ISubscription;
export const subscriptionModel = model<ISubscriptionDocument>(
  "subscription",
  schema
);
