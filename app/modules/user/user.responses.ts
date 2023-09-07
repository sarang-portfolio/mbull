import { MessageHandler } from "../../utility/responseHandler";

export const userReponse = {
  USER_PROFILE_UPDATED: new MessageHandler(200, "USER PROFILE UPDATED!"),
  USER_PROFILE_NOT_UPDATED: new MessageHandler(
    409,
    "USER PROFILE NOT UPDATED!"
  ),
  USER_PROFILE_NOT_FOUND: new MessageHandler(404, "USER PROFILE NOT FOUND!"),
};
