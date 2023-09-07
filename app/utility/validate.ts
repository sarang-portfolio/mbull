import { Request } from "express";
import Joi from "joi";

export const validator = (schema: Joi.ObjectSchema, data: Request) => {
  const { error } = schema.validate(data);
  if (error) {
    const [data] = error.details;
    throw data.message;
  }
};
