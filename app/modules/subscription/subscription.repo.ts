import { subscriptionModel } from "./subscription.schema";
import { ISubscription } from "./subscription.types";

const create = (subscription: ISubscription) =>
  subscriptionModel.create(subscription);

const getAll = () => subscriptionModel.find({ isDeleted: false });

const getOne = (id: string) =>
  subscriptionModel.findOne({ _id: id, isDeleted: false });

const update = (id: string, subscription: ISubscription) =>
  subscriptionModel.findByIdAndUpdate(
    { _id: id, isDeleted: false },
    subscription
  );

export default {
  create,
  getAll,
  getOne,
  update,
};
