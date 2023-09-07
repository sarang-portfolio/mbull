import { MessageHandler } from "../../utility/responseHandler";

export const AuthReponse = {
  NOT_FOUND: new MessageHandler(404, "USER NOT FOUND"),
  INVALID_CREDENTIALS: new MessageHandler(401, "Invalid credentials"),
  USER_ALREADY_EXISTS: new MessageHandler(409, "USER ALREADY EXISTS"),
  SIGNUP_SUCCESSFUL: new MessageHandler(200, "USER SIGNUP SUCCESSFUL"),
  LOGOUT_SUCCESSFUL: new MessageHandler(200, "Logout successful"),
  PASSWORD_RESET_EMAIL_SENT: new MessageHandler(
    200,
    "Password reset email sent"
  ),
  PASSWORD_RESET_SUCCESSFUL: new MessageHandler(
    200,
    "Password reset successful"
  ),
  PASSWORD_RESET_FAILED: new MessageHandler(400, "Password reset failed"),
  PASSWORD_RESET_TOKEN_EXPIRED: new MessageHandler(
    400,
    "Password reset token expired"
  ),
  PASSWORD_RESET_TOKEN_INVALID: new MessageHandler(
    400,
    "Password reset token invalid"
  ),
  PASSWORD_RESET_TOKEN_REQUIRED: new MessageHandler(
    400,
    "Password reset token required"
  ),
  PASSWORD_CHANGED_SUCCESSFUL: new MessageHandler(
    200,
    "Password changed successful"
  ),
  PASSWORD_CHANGED_FAILED: new MessageHandler(400, "Password changed failed"),
  INVALID_SECURITY_ANSWER: new MessageHandler(400, "Invalid security answer"),
  PASSWORD_INCORRECT: new MessageHandler(400, "Password incorrect"),
};
