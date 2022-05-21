import { dirname } from "path";
import { fileURLToPath } from "url";
import express from "express";
import session from "express-session";
import cors from "cors";
import compression from "compression";
import { createClient } from "redis";
import connectRedis from "connect-redis";
import router from "./routes";
import { UserDocument } from "./models/User.model";

const CLIENT_URL = process.env.CLIENT_URL || "http://localhost:3000";
const SESSION_SECRET = process.env.SESSION_SECRET || "";
const SESSION_MAX_AGE = parseInt(process.env.SESSION_MAX_AGE || "") || 0;
const app = express();

const Store = connectRedis(session);
const client = createClient({ legacyMode: true });

client.on("error", (error) => console.error("Redis Client Error", error));

const sessionConfig = {
  secret: SESSION_SECRET,
  store: new Store({ client }),
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

app
  .set("json spaces", 2)
  .use(express.json())
  .use(compression())
  .use(cors({ origin: CLIENT_URL, credentials: true }))
  .use(session(sessionConfig))
  .use("/api", router)
  .use(
    "/uploads",
    express.static(dirname(fileURLToPath(import.meta.url)) + "/uploads"),
  )
  .use((req, res) => res.json({ error: "not a valid route" }));

try {
  await client.connect();
} catch (error) {
  console.error("Redis Error:", error);
}

export default app;
