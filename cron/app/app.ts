import express from "express";
import {
    stockListCron,
    updateStockHistoryCron,
    updateTopGainersTopLosersCron,
} from "./utility/cron";

export const startServer = async () => {
  try {
    const app = express();
    stockListCron.start();
    updateStockHistoryCron.start();
    updateTopGainersTopLosersCron.start();

    const { CRON_PORT } = process.env;
    app.listen(CRON_PORT, () =>
      console.log(`SERVER IS RUNNING ON PORT - ${CRON_PORT}`)
    );
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};
