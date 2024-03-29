import connectDB from "./config/db";
import errorHandler from "./middleware/errorHandler";
import Logger from "./config/logger";
import app from "./app";

connectDB();

const port = process.env.API_PORT;

app.use(errorHandler);

const server = app.listen(port, (): void => {
  Logger.debug(`Server running on port ${port}.`);
});

process.on("unhandledRejection", (error): void => {
  Logger.error(error);
  server.close(() => process.exit(1));
});
