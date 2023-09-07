import { model, Schema } from "mongoose";
import { BaseSchema } from "../../utility/base.schema";
import { IUser } from "./user.types";

const schema = new BaseSchema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  occupation: {
    type: String,
    required: true,
  },
  securityQuestion: {
    type: Schema.Types.ObjectId,
    ref: "securityquestions",
  },
  securityAnswer: {
    type: String,
    required: true,
  },
  refreshToken: {
    type: String,
  },
  subscriptionDetails: [
    new BaseSchema({
      subscriptionId: {
        type: Schema.Types.ObjectId,
        ref: "subscriptions",
      },
      startDate: {
        type: Number,
        required: true,
      },
      endDate: {
        type: Number,
        required: true,
      },
      status: String,
    }),
  ],
  subscriptionType: {
    type: String,
    required: true,
  },
});

type IUserDocument = Document & IUser;
export const userModel = model<IUserDocument>("user", schema);
