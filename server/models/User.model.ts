import mongoose, { Schema, Model } from "mongoose";
import bcrypt from "bcrypt";
import { duplicateCollectionItem } from "../utils/validation";

export interface IUser {
  id: string;
  username: string;
  email: string;
  password: string;
  name: string;
  admin: boolean;
  photo: string;
  resetPasswordToken: string;
  resetPasswordExpire: string;
}

export interface UserDocument extends IUser {
  checkPasswordMatch: (password: string) => Promise<boolean>;
  getSignedToken: () => {};
}

const UserSchema: Schema<UserDocument> = new Schema({
  username: {
    type: String,
    required: [true, "Username is required"],
    lowercase: true,
    match: [/^[\A-z][\w\.]{2,20}$/, "Invalid username"],
    validate: async (username: string) =>
      await duplicateCollectionItem(User, { username }),
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    lowercase: true,
    match: [
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      "Invalid email",
    ],
    validate: async (email: string) =>
      await duplicateCollectionItem(User, { email }),
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    minlength: [6, "Password must be at least 6 characters"],
    select: false,
  },
  name: {
    type: String,
  },
  admin: {
    type: Boolean,
  },
  photo: {
    type: String,
  },
  resetPasswordToken: String,
  resetPasswordExpire: Date,
});

UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

UserSchema.methods.checkPasswordMatch = async function (
  password: string,
): Promise<boolean> {
  const result = await bcrypt.compare(password, this.password);
  return result;
};

const User: Model<UserDocument> = mongoose.model<UserDocument>(
  "User",
  UserSchema,
);

export default User;
