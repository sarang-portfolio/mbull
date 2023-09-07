import { NextFunction, Request, Response } from "express";
import Joi from "joi";
import { isValidObjectId } from "mongoose";
import { validator } from "../../utility/validate";

const fields = {
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
};

export const validateLogin = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const schema = Joi.object({
    ...fields,
    captcha: Joi.string().required(),
  });
  validator(schema, req.body);
  next();
};

export const validateSignUp = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const schema = Joi.object({
    ...fields,
    confirmPassword: Joi.string().min(6).required(),
    name: Joi.string().required(),
    phoneNumber: Joi.string().length(10).required(),
    occupation: Joi.string().required(),
    gender: Joi.string().required(),
    securityQuestion: Joi.string().custom((value, helpers: any) => {
      if (!isValidObjectId(value)) {
        return helpers.message("Invalid security question");
      }
      return value;
    }),
    securityAnswer: Joi.string().required(),
    captcha: Joi.string().required(),
  });

  validator(schema, req.body);
  next();
};

export const validateForgotPassword = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email } = fields;
  const schema = Joi.object({
    email,
  });

  validator(schema, req.body);
  next();
};

export const validateResetPassword = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    newPassword: Joi.string().min(6).required(),
    confirmNewPassword: Joi.string().min(6).required(),
  });

  validator(schema, req.body);
  next();
};
