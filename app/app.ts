import express from "express";
import { connectToMongoDB } from "./connections/connect.mongodb";
import { registerRoutes } from "./routes/routes.register";

export const startServer = async () => {
  try {
    const app = express();
    await connectToMongoDB();
    registerRoutes(app);

    const { PORT } = process.env;
    app.listen(PORT, () => console.log(`SERVER IS RUNNING ON PORT - ${PORT}`));
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};
