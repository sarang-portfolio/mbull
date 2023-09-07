import mongoose from "mongoose";
import { userModel } from "./user.schema";
import { IUser } from "./user.types";

const createUser = (user: IUser) => userModel.create(user);

const getUserById = (id: string) => userModel.findById(id);

const getUserByEmail = (email: string) => userModel.findOne({ email });

const updateUser = (id: string, user: any) =>
  userModel.findByIdAndUpdate(id, user, { new: true });

const deleteUser = (id: string) =>
  userModel.findByIdAndUpdate(id, { isDeleted: true }, { new: true });

const userProfile = (id: string) =>
  userModel.aggregate([
    {
      $match: {
        _id: new mongoose.Types.ObjectId(id),
      },
    },
    {
      $project: {
        name: 1,
        email: 1,
        phoneNumber: 1,
        occupation: 1,
        gender: 1,
      },
    },
  ]);

const updateUserSubscription = (id: string, subscriptionId: string) =>
  userModel.findOneAndUpdate(
    { _id: id, "subscriptionDetails._id": subscriptionId },
    { "subscriptionDetails.$.status": "INACTIVE" }
  );

const getUserSubscriptions = (userId: string) =>
  userModel.findOne({ _id: userId }).select("subscriptionDetails");

const addUserSubscription = (userId: string, subscription: object) =>
  userModel.findOneAndUpdate(
    { _id: userId },
    { $push: { subscriptionDetails: subscription } }
  );

export default {
  createUser,
  getUserById,
  getUserByEmail,
  updateUser,
  deleteUser,
  userProfile,
  updateUserSubscription,
  getUserSubscriptions,
  addUserSubscription,
};
