import { model } from "mongoose";
import { BaseSchema } from "../../utility/base.schema";
import { ISecurityQuestion } from "./securityQuestion.types";

export const schema = new BaseSchema({
  question: {
    type: String,
    required: true,
  },
});

type ISecurityQuestionDocument = Document & ISecurityQuestion;
export const securityQuestionModel = model<ISecurityQuestionDocument>(
  "securityQuestion",
  schema
);
