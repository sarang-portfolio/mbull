import { MessageHandler } from "../../utility/responseHandler";

export const securityQuestionResponse = {
  SECURITY_QUESTION_NOT_FOUND: new MessageHandler(
    404,
    "Security question not found"
  ),
  SECURITY_QUESTION_CREATED: new MessageHandler(
    200,
    "Security question created"
  ),
  SECURITY_QUESTION_NOT_CREATED: new MessageHandler(
    400,
    "Security question not created"
  ),
};
