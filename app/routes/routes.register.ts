import cors from "cors";
import { Application, NextFunction, Request, Response, json } from "express";
import { authorization } from "../utility/authorize";
import { ResponseHandler } from "../utility/responseHandler";
import { excludedRoutes, routes } from "./routes.data";

export const registerRoutes = async (app: Application) => {
  app.use(cors());
  app.use(json());
  app.use(authorization(excludedRoutes));

  for (let route of routes) {
    app.use(route.path, route.router);
  }

  app.use((response: any, req: Request, res: Response, next: NextFunction) => {
    res
      .status(response.statusCode || 500)
      .send(new ResponseHandler(null, response));
  });
};
