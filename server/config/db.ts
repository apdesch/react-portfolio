import { config } from "dotenv";
import chalk from "chalk";
import mongoose from "mongoose";
import isDevelopment from "./isDev";

if (isDevelopment) config({ path: "../.env" });;

const localDB = process.env.DB_URI_LOCAL || "";
const atlusDB = process.env.DB_URI_ATLUS || "";
const dbURI = isDevelopment ? localDB : atlusDB;

const connectDB = async () => {
  await mongoose.connect(dbURI);
  const which = isDevelopment ? "local" : "atlus";
  console.debug(chalk.green.bold(`Connected to ${which} database\n`));
};

export default connectDB;
