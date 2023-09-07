import { ExcludedRoute, ExcludedRoutes, Route, Routes } from "./routes.types";
import { AuthRouter } from "../modules/auth/auth.routes";
import { UserRouter } from "../modules/user/user.routes";
import { StockRouter } from "../modules/stocks/stocks.routes";
import { SecutiryQuestionRouter } from "../modules/securityQuestion/securityQuestion.routes";
import { StockHistoryRouter } from "../modules/stockHistory/stockHistory.routes";
import { WalletRouter } from "../modules/wallet/wallet.routes";
import { SubscriptionRouter } from "../modules/subscription/subscription.routes";
import { TopGainerRouter } from "../modules/topGainers/topGainers.routes";
import { TopLoserRouter } from "../modules/topLosers/topLosers.routes";

export const routes: Routes = [
  new Route("/auth", AuthRouter),
  new Route("/user", UserRouter),
  new Route("/questions", SecutiryQuestionRouter),
  new Route("/stocks", StockRouter),
  new Route("/stockHistory", StockHistoryRouter),
  new Route("/wallet", WalletRouter),
  new Route("/subscription", SubscriptionRouter),
  new Route("/topgainers", TopGainerRouter),
  new Route("/toplosers", TopLoserRouter),
];

export const excludedRoutes: ExcludedRoutes = [
  new ExcludedRoute("/auth/login", "POST"),
  new ExcludedRoute("/auth/signup", "POST"),
  new ExcludedRoute("/auth/forgot-password", "POST"),
  new ExcludedRoute("/auth/reset-password/", "POST"),
  new ExcludedRoute("/auth/get-security-question", "GET"),
  new ExcludedRoute("/subscription/getAll", "GET"),
  new ExcludedRoute("/subscription/getOne/", "GET"),
  new ExcludedRoute("/questions", "GET"),
  new ExcludedRoute("/auth/user-exists", "GET"),
];
