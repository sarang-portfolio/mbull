import userRepo from "./user.repo";
import { userReponse } from "./user.responses";
import { IUser } from "./user.types";

const createUser = async (user: IUser) => {
  try {
    return await userRepo.createUser(user);
  } catch (error) {
    throw error;
  }
};

const getUserById = async (id: string) => {
  try {
    return await userRepo.getUserById(id);
  } catch (error) {
    throw error;
  }
};

const getUserByEmail = async (email: string) => {
  try {
    const user = await userRepo.getUserByEmail(email);
    return user;
  } catch (error) {
    throw error;
  }
};

const updateUser = async (id: string, user: any) => {
  try {
    await userRepo.updateUser(id, user);
    return userReponse.USER_PROFILE_UPDATED;
  } catch (error) {
    throw userReponse.USER_PROFILE_NOT_UPDATED;
  }
};

const deleteUser = async (id: string) => {
  try {
    return await userRepo.deleteUser(id);
  } catch (error) {
    throw error;
  }
};

const userProfile = async (id: string) => {
  try {
    const userProfile = await userRepo.userProfile(id);
    const [profile] = userProfile;
    return profile;
  } catch (error) {
    throw userReponse.USER_PROFILE_NOT_FOUND;
  }
};

const updateUserSubscription = async (
  userId: string,
  subscriptionId: string
) => {
  try {
    const result = await userRepo.updateUserSubscription(
      userId,
      subscriptionId
    );
    return result;
  } catch (err) {
    throw err;
  }
};

const getUserSubscriptions = async (userId: string) => {
  try {
    const subscriptions = await userRepo.getUserSubscriptions(userId);
    return subscriptions;
  } catch (err) {
    throw err;
  }
};

const addUserSubscription = async (userId: string, subscription: object) => {
  try {
    const result = await userRepo.addUserSubscription(userId, subscription);
    return result;
  } catch (err) {
    throw err;
  }
};

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
