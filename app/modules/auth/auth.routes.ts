import { Router } from "express";
import { ResponseHandler } from "../../utility/responseHandler";
import authService from "./auth.service";
import {
    ILoginCredentials,
    IResetPasswordCredentials,
    ISignUpCredentials,
} from "./auth.types";
import { authUrl } from "./auth.urls";
import {
    validateForgotPassword,
    validateLogin,
    validateResetPassword,
    validateSignUp,
} from "./auth.validate";

export const AuthRouter = Router();

AuthRouter.post(authUrl.login, validateLogin, async (req, res, next) => {
  try {
    const result = await authService.login(req.body as ILoginCredentials);
    res.send(new ResponseHandler(result));
  } catch (error) {
    next(error);
  }
});

AuthRouter.post(authUrl.signUp, validateSignUp, async (req, res, next) => {
  try {
    const result = await authService.signUp(req.body as ISignUpCredentials);
    res.send(new ResponseHandler(result));
  } catch (error) {
    next(error);
  }
});

AuthRouter.post(authUrl.userExists, async (req, res, next) => {
  try {
    const { email } = req.body;
    const result = await authService.userExists(email as string);
    res.send(new ResponseHandler(result));
  } catch (err) {
    next(err);
  }
});

AuthRouter.post(authUrl.refreshToken, async (req, res, next) => {
  try {
    const { refreshToken } = req.body;
    const result = await authService.refreshToken(refreshToken);
    res.send(new ResponseHandler(result));
  } catch (error) {
    next(error);
  }
});

AuthRouter.post(
  authUrl.forgotPassword,
  validateForgotPassword,
  async (req, res, next) => {
    try {
      const { email } = req.body;
      const result = await authService.forgotPassword(email);
      res.send(new ResponseHandler(result));
    } catch (error) {
      next(error);
    }
  }
);

AuthRouter.get(authUrl.getSecurityQuestion, async (req, res, next) => {
  try {
    const { token } = req.query;
    const result = await authService.getSecurityQuestion(token as string);
    res.send(new ResponseHandler(result));
  } catch (err) {
    next(err);
  }
});

AuthRouter.post(
  authUrl.resetPassword,
  validateResetPassword,
  async (req, res, next) => {
    try {
      const response = req.body;
      const result = await authService.resetPassword(
        response as IResetPasswordCredentials
      );
      res.send(new ResponseHandler(result));
    } catch (error) {
      next(error);
    }
  }
);

AuthRouter.post(authUrl.changePassword, async (req, res, next) => {
  try {
    const userId = res.locals.user._id;
    const { oldPassword, newPassword, confirmPassword } = req.body;
    const result = await authService.changePassword(
      userId,
      oldPassword,
      newPassword,
      confirmPassword
    );
    res.send(new ResponseHandler(result));
  } catch (error) {
    next(error);
  }
});

AuthRouter.post(authUrl.logout, async (req, res, next) => {
  try {
    const { refreshToken } = req.body;
    const result = await authService.logout(refreshToken);
    res.send(new ResponseHandler(result));
  } catch (error) {
    next(error);
  }
});
