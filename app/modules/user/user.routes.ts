import { Router } from "express";
import { ResponseHandler } from "../../utility/responseHandler";
import userService from "./user.service";
import { userUrl } from "./user.urls";

export const UserRouter = Router();

UserRouter.get(userUrl.profile, async (req, res, next) => {
  try {
    const userId = res.locals.user.userId;
    const result = await userService.userProfile(userId);
    res.send(new ResponseHandler(result));
  } catch (err) {
    next(err);
  }
});

UserRouter.put(userUrl.update, async (req, res, next) => {
  try {
    const userId = res.locals.user.userId;
    const result = await userService.updateUser(userId, req.body);
    res.send(new ResponseHandler(result));
  } catch (err) {
    next(err);
  }
});
