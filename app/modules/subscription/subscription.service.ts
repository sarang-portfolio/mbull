import userService from "../user/user.service";
import walletService from "../wallet/wallet.service";
import subscriptionRepo from "./subscription.repo";
import { subscriptionResponse } from "./subscription.responses";
import {
    ISubscription,
    IUserSubscription,
    IUserSubscriptionDetails,
} from "./subscription.types";

const addSubscription = async (subscription: ISubscription) => {
  try {
    const result = await subscriptionRepo.create(subscription);
    return subscriptionResponse.SUBSCRIPTION_ADDED;
  } catch (err) {
    throw subscriptionResponse.SUBSCRIPTION_NOT_ADDED;
  }
};

const getAllSubscriptions = async () => {
  try {
    const result = await subscriptionRepo.getAll();
    return result;
  } catch (err) {
    throw subscriptionResponse.SUBSCRIPTION_NOT_FOUND;
  }
};

const getOneSubscription = async (id: string) => {
  try {
    const result = await subscriptionRepo.getOne(id);
    return result;
  } catch (err) {
    throw subscriptionResponse.SUBSCRIPTION_NOT_FOUND;
  }
};

const updateSubscription = async (id: string, subscription: ISubscription) => {
  try {
    const result = await subscriptionRepo.update(id, subscription);
    return subscriptionResponse.SUBSCRIPTION_UPDATED;
  } catch (err) {
    throw subscriptionResponse.SUBSCRIPTION_NOT_UPDATED;
  }
};

const purchaseSubscription = async (userId: string, subscriptionId: string) => {
  try {
    const userSubscriptions: IUserSubscription =
      (await userService.getUserSubscriptions(userId)) as IUserSubscription;
    const activeSubscription: IUserSubscriptionDetails = (
      userSubscriptions.subscriptionDetails as IUserSubscriptionDetails[]
    ).find(
      (item: IUserSubscriptionDetails) => item.status === "ACTIVE"
    ) as IUserSubscriptionDetails;
    if (activeSubscription) {
      await userService.updateUserSubscription(
        userId,
        activeSubscription._id as string
      );
    }
    const subscription: ISubscription = (await getOneSubscription(
      subscriptionId
    )) as ISubscription;
    const newSubscription: IUserSubscriptionDetails = {
      subscriptionId: subscriptionId,
      startDate: Date.now(),
      endDate: Date.parse(
        new Date(
          new Date().setMonth(new Date().getMonth() + subscription.validity)
        ).toString()
      ),
      status: "ACTIVE",
    };
    const purchased = await walletService.debitAmount(
      userId,
      subscription.amount
    );
    if (purchased) {
      await userService.addUserSubscription(userId, newSubscription);
      await userService.updateUser(userId, {
        subscriptionType: subscriptionId,
      });
      return subscriptionResponse.SUBSCRIPTION_PURCHASED;
    }
  } catch (err) {
    throw err;
  }
};

export default {
  addSubscription,
  getAllSubscriptions,
  getOneSubscription,
  updateSubscription,
  purchaseSubscription,
};
