import { Router } from "express";

export class Route {
  constructor(public path: string, public router: Router) {}
}

type Method = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

export class ExcludedRoute {
  constructor(public path: string, public method: Method) {}
}

export type Routes = Route[];
export type ExcludedRoutes = ExcludedRoute[];
