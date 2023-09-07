import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { ExcludedRoutes } from "../routes/routes.types";

export const createAccessToken = (payload: JwtPayload) => {
  const { JWT_ACCESS_TOKEN_SECRET_KEY, JWT_ACCESS_TOKEN_EXPIRES_IN } =
    process.env;
  const token = jwt.sign(payload, JWT_ACCESS_TOKEN_SECRET_KEY as string, {
    expiresIn: JWT_ACCESS_TOKEN_EXPIRES_IN,
  });
  return token;
};

export const verifyToken = (token: string) => {
  const { JWT_ACCESS_TOKEN_SECRET_KEY } = process.env;
  const payload = jwt.verify(token, JWT_ACCESS_TOKEN_SECRET_KEY as string);
  return payload;
};

export const createRefreshToken = (payload: JwtPayload) => {
  const { JWT_REFRESH_TOKEN_SECRET_KEY, JWT_REFRESH_TOKEN_EXPIRES_IN } =
    process.env;
  const token = jwt.sign(payload, JWT_REFRESH_TOKEN_SECRET_KEY as string, {
    expiresIn: JWT_REFRESH_TOKEN_EXPIRES_IN,
  });
  return token;
};

export const verifyRefreshToken = (token: string) => {
  const { JWT_REFRESH_TOKEN_SECRET_KEY } = process.env;
  const payload = jwt.verify(token, JWT_REFRESH_TOKEN_SECRET_KEY as string);
  return payload;
};

export const authorization = (ExcludedRoutes: ExcludedRoutes) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      if (
        ExcludedRoutes.find(
          (eRoutes) =>
            req.url.includes(eRoutes.path) && eRoutes.method == req.method
        )
      ) {
        return next();
      }
      const token = req.headers.authorization as string;
      const payload = verifyToken(token);
      res.locals.user = payload;

      return next();
    } catch (error) {
      next({ statusCode: 401, message: "UNAUTHORIZED" });
    }
  };
};

export const permit = (permittedSubscriptionTypes: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (permittedSubscriptionTypes.includes(res.locals.user.subscription)) {
      return next();
    }

    next({ statusCode: 401, message: "UNAUTHORIZED" });
  };
};
