import { dirname } from "path";
import { fileURLToPath } from "url";
import express, { NextFunction, Request, Response } from "express";
import session from "express-session";
import cors from "cors";
import compression from "compression";
import { createClient } from "redis";
import connectRedis from "connect-redis";
import router from "./routes";
import { UserDocument } from "./models/User.model";

export const APP_ROOT = dirname(fileURLToPath(import.meta.url));

const CLIENT_URL = process.env.CLIENT_URL || "http://localhost:3000";
const SESSION_SECRET = process.env.SESSION_SECRET || "";
const SESSION_MAX_AGE = parseInt(process.env.SESSION_MAX_AGE || "") || 0;

const app = express();
const client = createClient();

client.on("error", (error) => {
  console.error("Redis Client Error", error);
  process.exit(1);
});

await client.connect();

const Store = new connectRedis({
  client,
});

const sessionConfig = {
  secret: SESSION_SECRET,
  store: Store,
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    secure: false,
    maxAge: SESSION_MAX_AGE,
  },
};

if (app.get("env") === "production") {
  app.set("trust proxy", 1);
  sessionConfig.cookie.secure = true;
}

declare module "express-session" {
  interface SessionData {
    userId?: string;
    user?: UserDocument;
  }
}

function coi(req: Request, res: Response, next: NextFunction) {
  res.setHeader("Cross-Origin-Opener-Policy", "same-origin");
  res.setHeader("Cross-Origin-Embedder-Policy", "require-corp");
  next();
}

app
  .set("json spaces", 2)
  .use(express.json())
  .use(compression())
  .use(cors({ origin: CLIENT_URL, credentials: true }))
  .use(coi)
  .use(session(sessionConfig))
  .use("/api", router)
  .use("/uploads", express.static(APP_ROOT + "/uploads"))
  .use((req, res) => res.json({ error: "not a valid route" }));

export default app;
