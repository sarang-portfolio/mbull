import { JwtPayload } from "jsonwebtoken";
import {
  createAccessToken,
  createRefreshToken,
  verifyRefreshToken,
  verifyToken,
} from "../../utility/authorize";
import { comparePassword, createHash } from "../../utility/password";
import securityQuestionService from "../securityQuestion/securityQuestion.service";
import subscriptionService from "../subscription/subscription.service";
import { ISubscription } from "../subscription/subscription.types";
import { SUBSCRIPTION } from "../subscriptionType/subscriptionType.constants";
import userService from "../user/user.service";
import { IUser } from "../user/user.types";
import walletService from "../wallet/wallet.service";
import { AuthReponse } from "./auth.responses";
import {
  ILoginCredentials,
  IResetPasswordCredentials,
  ISignUpCredentials,
} from "./auth.types";
import { verifyCaptcha } from "../../utility/captcha";

const login = async (credentials: ILoginCredentials) => {
  try {
    const isCapchaValid = await verifyCaptcha(credentials.captcha);
    if (!isCapchaValid) {
      throw "FAILED CAPTCHA VERIFICATION";
    }
    const user: IUser = (await userService.getUserByEmail(
      credentials.email
    )) as IUser;
    if (!user) {
      throw AuthReponse.NOT_FOUND;
    }
    const isPasswordValid = await comparePassword(
      credentials.password,
      user.password
    );
    if (!isPasswordValid) {
      throw AuthReponse.INVALID_CREDENTIALS;
    }
    const subscriptionInfo: any = user.subscriptionDetails.find(
      (item: any) => item.status === "ACTIVE"
    );
    if (subscriptionInfo) {
      if (new Date() > subscriptionInfo.endDate) {
        await userService.updateUserSubscription(
          user?._id as string,
          subscriptionInfo._id
        );
      }
    }
    const accessToken = createAccessToken({
      userId: user._id,
      subscription: user.subscriptionType,
    });
    const refreshToken = createRefreshToken({
      userId: user._id,
      subscription: user.subscriptionType,
    });
    await userService.updateUser(user._id as string, { refreshToken });
    return {
      accessToken,
      refreshToken,
      subscriptionType: user.subscriptionType,
    };
  } catch (error) {
    throw error;
  }
};

const signUp = async (credentials: ISignUpCredentials) => {
  try {
    const isCapchaValid = await verifyCaptcha(credentials.captcha);
    if (!isCapchaValid) {
      throw "FAILED CAPTCHA VERIFICATION";
    }
    if (credentials.password !== credentials.confirmPassword) {
      throw "PASSWORDS DO NOT MATCH";
    }
    const { email, password } = credentials;
    const user = await userService.getUserByEmail(email);
    if (user) {
      throw AuthReponse.USER_ALREADY_EXISTS;
    }
    const hashedPassword = await createHash(password);
    const subscriptions = await subscriptionService.getAllSubscriptions();
    const freeSubscription = subscriptions.find(
      (subscription: ISubscription) => subscription.subscriptionType === "FREE"
    );
    await userService.createUser({
      email,
      name: credentials.name,
      password: hashedPassword,
      securityQuestion: credentials.securityQuestion,
      securityAnswer: credentials.securityAnswer,
      gender: credentials.gender,
      occupation: credentials.occupation,
      phoneNumber: credentials.phoneNumber,
      subscriptionDetails: [
        {
          subscriptionId: freeSubscription?._id,
          startDate: Date.now(),
          endDate: Date.parse(
            new Date(new Date().setMonth(new Date().getMonth() + 1)).toString()
          ),
          status: "ACTIVE",
        },
      ],
      subscriptionType: SUBSCRIPTION.FREE,
    });
    const userDetails: IUser = (await userService.getUserByEmail(
      email
    )) as IUser;
    await walletService.addBalance(userDetails._id as string);
    return AuthReponse.SIGNUP_SUCCESSFUL;
  } catch (error) {
    throw error;
  }
};

const userExists = async (email: string) => {
  try {
    const user = await userService.getUserByEmail(email);
    if (user) {
      return { exists: true };
    }
    return { exists: false };
  } catch (error) {
    throw error;
  }
};

const forgotPassword = async (email: string) => {
  try {
    const user: IUser = (await userService.getUserByEmail(email)) as IUser;
    if (!user) {
      throw AuthReponse.NOT_FOUND;
    }
    const securityQuestion = await securityQuestionService.getOneById(
      user.securityQuestion as string
    );
    const securityAnswer = user.securityAnswer;
    return { securityQuestion, securityAnswer };
  } catch (error) {
    throw error;
  }
};

const resetPassword = async (response: IResetPasswordCredentials) => {
  try {
    if (response.newPassword !== response.confirmNewPassword) {
      throw AuthReponse.PASSWORD_INCORRECT;
    }
    const user: IUser = (await userService.getUserByEmail(
      response.email
    )) as IUser;
    const hashedPassword = await createHash(response.newPassword);
    await userService.updateUser(user._id as string, {
      password: hashedPassword,
    });
    return AuthReponse.PASSWORD_RESET_SUCCESSFUL;
  } catch (error) {
    throw error;
  }
};

const changePassword = async (
  userId: string,
  oldPassword: string,
  newPassword: string,
  confirmPassword: string
) => {
  try {
    if (newPassword !== confirmPassword) {
      throw AuthReponse.PASSWORD_INCORRECT;
    }
    const user: IUser = (await userService.getUserById(userId)) as IUser;
    if (!user) {
      throw AuthReponse.NOT_FOUND;
    }
    const isPasswordValid = await comparePassword(oldPassword, user.password);
    if (!isPasswordValid) {
      throw AuthReponse.INVALID_CREDENTIALS;
    }
    const hashedPassword = await createHash(newPassword);
    await userService.updateUser(userId, { password: hashedPassword });
    return AuthReponse.PASSWORD_CHANGED_SUCCESSFUL;
  } catch (error) {
    throw error;
  }
};

const refreshToken = async (refreshToken: string) => {
  try {
    const payload: JwtPayload = verifyRefreshToken(refreshToken) as JwtPayload;
    const user: IUser = (await userService.getUserById(
      payload.userId
    )) as IUser;
    if (!user) {
      throw AuthReponse.NOT_FOUND;
    }
    const newAccessToken = createAccessToken({
      userId: user._id,
      subscription: user.subscriptionType,
    });
    const newRefreshToken = createRefreshToken({
      userId: user._id,
      subscription: user.subscriptionType,
    });
    await userService.updateUser(user._id as string, {
      refreshToken: newRefreshToken,
    });
    return { accessToken: newAccessToken, refreshToken: newRefreshToken };
  } catch (error) {
    throw error;
  }
};

const logout = async (refreshToken: string) => {
  try {
    const payload: JwtPayload = verifyRefreshToken(refreshToken) as JwtPayload;
    const user: IUser = (await userService.getUserById(
      payload.userId
    )) as IUser;
    if (!user) {
      throw AuthReponse.NOT_FOUND;
    }
    await userService.updateUser(user._id as string, { refreshToken: "" });
    return AuthReponse.LOGOUT_SUCCESSFUL;
  } catch (error) {
    throw error;
  }
};

const getSecurityQuestion = async (token: string) => {
  try {
    const payload: JwtPayload = verifyToken(token) as JwtPayload;
    const user: IUser = (await userService.getUserById(
      payload.userId
    )) as IUser;
    const securityQuestion = await securityQuestionService.getOneById(
      user.securityQuestion
    );
    if (!user) {
      throw AuthReponse.NOT_FOUND;
    } else {
      return securityQuestion;
    }
  } catch (error) {
    throw error;
  }
};

export default {
  login,
  signUp,
  refreshToken,
  logout,
  forgotPassword,
  resetPassword,
  changePassword,
  getSecurityQuestion,
  userExists,
};
