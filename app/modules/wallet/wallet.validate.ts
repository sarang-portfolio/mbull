import { NextFunction, Request, Response } from "express";
import Joi from "joi";
import { validator } from "../../utility/validate";

export const validateAddMoney = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const schema = Joi.object({
    amount: Joi.string().required(),
  });
  validator(schema, req.body);
  next();
};

export const validateDebitMoney = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const schema = Joi.object({
    amount: Joi.string().required(),
  });
  validator(schema, req.body);
  next();
};
