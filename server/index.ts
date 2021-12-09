import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import compression from "compression";
import morgan, { StreamOptions } from "morgan";
import { isDevelopment, Logger } from "./config";
import { notFound } from "./controllers/HttpStatus.controller";
import router from "./routes";

const stream: StreamOptions = { write: (message) => Logger.http(message) };

if (isDevelopment) dotenv.config();

const API_PORT = process.env.API_PORT || 5000;
const app = express();

if (isDevelopment) {
  app.use(morgan(":method :url :status - :response-time ms", { stream }));
}

app
  .set("json spaces", 2)
  .use(compression())
  .use(cors())
  .use("/api", router)
  .use(notFound);
app.listen(API_PORT, () => Logger.debug(`Server running on port ${API_PORT}.`));
