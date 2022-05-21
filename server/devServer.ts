import { config } from "dotenv";
import chalk from "chalk";
import morgan from "morgan";
import connectDB from "./config/db";
import errorHandler from "./middleware/errorHandler";
import app from "./app";
import isDevelopment from "./config/isDev";

if (isDevelopment) config({ path: "../.env" });

connectDB();

const port = process.env.API_PORT || 5000;

if (isDevelopment) app.use(morgan(":method :url :status - :response-time ms"));

app.use(errorHandler);

const server = app.listen(port, (): void => {
  process.stdout.write("\x1Bc");
  console.debug(
    chalk.green.bold`Server running at`,
    chalk.cyan`http://localhost:${port}`,
  );
});

process.on("SIGINT", (): void => {
  console.log(chalk.yellow`\nReceived close signal: server shutting down`);
  server.close(() => {
    console.log(chalk.yellow`Server shut down. Exiting`);
    process.exit(0);
  });
});

process.on("unhandledRejection", (error): void => {
  console.error(`Error: ${error}`);
  // server.close(() => process.exit(1));
});
