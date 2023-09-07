import { model, Schema } from "mongoose";
import { BaseSchema } from "../../utility/base.schema";
import { IWallet } from "./wallet.types";

const schema = new BaseSchema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "users",
  },
  balance: {
    type: Number,
    required: true,
    default: 0,
  },
});

type IWalletDocument = Document & IWallet;
export const walletModel = model<IWalletDocument>("wallet", schema);
