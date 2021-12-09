import dotenv from "dotenv";
import cors from "cors";
import morgan, { StreamOptions } from "morgan";
import { isDevelopment, Logger } from "config";
import app from "app";

if (isDevelopment) dotenv.config();

const API_PORT = process.env.API_PORT || 5000;
const stream: StreamOptions = { write: (message) => Logger.http(message) };

if (isDevelopment) {
  app.use(morgan(":method :url :status - :response-time ms", { stream }));
}
app.listen(API_PORT, () => Logger.debug(`Server running on port ${API_PORT}.`));
