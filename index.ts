import { config } from "dotenv";
config();

import { startServer } from "./app/app";
import { startServer as server } from "./cron/app/app";
startServer();
server();