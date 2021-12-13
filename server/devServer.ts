require("dotenv").config({ path: "../.env" });
import morgan from "morgan";
import connectDB from "./config/db";
import errorHandler from "./middleware/errorHandler";
import app from "./app";

connectDB();

const port = process.env.API_PORT || 5000;

app.use(morgan(":method :url :status - :response-time ms"));
app.use(errorHandler);

const server = app.listen(port, (): void => {
  console.debug(`Server running on port ${port}.`);
});

process.on("unhandledRejection", (error): void => {
  console.debug(`Error: ${error}`);
  server.close(() => process.exit(1));
});
