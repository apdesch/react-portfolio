import express from "express";
import cors from "cors";
import compression from "compression";
import cookieParser from "cookie-parser";
import { notFound } from "controllers/HttpStatus.controller";
import router from "routes";

const CLIENT_URL = process.env.CLIENT_URL || "http://localhost:3000";
const app = express();

app
  .set("json spaces", 2)
  .use(express.json())
  .use(compression())
  .use(cookieParser())
  .use(cors({ origin: CLIENT_URL, credentials: true }))
  .use("/api", router)
  .use(notFound);

export default app;
