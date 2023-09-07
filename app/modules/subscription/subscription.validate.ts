import { NextFunction, Request, Response } from "express";
import Joi from "joi";
import { validator } from "../../utility/validate";

export const validateAddSubscription = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const schema = Joi.object({
    amount: Joi.number().required(),
    subscriptionType: Joi.string().required(),
    validity: Joi.number().required(),
    description: Joi.string().required(),
    featureAccess: Joi.array().items(Joi.string()),
  });
  validator(schema, req.body);
  next();
};

export const validateUpdateSubscription = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const schema = Joi.object({
    amount: Joi.number().required(),
    subscriptionType: Joi.string().required(),
    validity: Joi.number().required(),
    description: Joi.string().required(),
  });
  validator(schema, req.body);
  next();
};
