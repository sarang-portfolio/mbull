import { Router } from "express";
import { ResponseHandler } from "../../utility/responseHandler";
import securityQuestionService from "./securityQuestion.service";
import { ISecurityQuestion } from "./securityQuestion.types";
import { securityQuestionUrl } from "./securityQuestion.urls";

export const SecutiryQuestionRouter = Router();

SecutiryQuestionRouter.get(
  securityQuestionUrl.getAll,
  async (req, res, next) => {
    try {
      const result = await securityQuestionService.getAllQuestions();
      res.send(new ResponseHandler(result));
    } catch (err) {
      next(err);
    }
  }
);

SecutiryQuestionRouter.post(
  securityQuestionUrl.create,
  async (req, res, next) => {
    try {
      const result = await securityQuestionService.createQuestion(
        req.body as ISecurityQuestion
      );
      res.send(new ResponseHandler(result));
    } catch (err) {
      next(err);
    }
  }
);
