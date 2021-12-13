import mongoose from "mongoose";
import isDevelopment from "./isDev";

const localDB = process.env.DB_URI_LOCAL || "";
const atlusDB = process.env.DB_URI_ATLUS || "";
const dbURI = isDevelopment ? localDB : atlusDB;

const connectDB = async () => {
  await mongoose.connect(dbURI);
  const which = isDevelopment ? "local" : "atlus";
  console.debug(`Connected to ${which} database`);
};

export default connectDB;
