import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import ErrorResponse from "../utils/ErrorResponse";
import User from "../models/User.model";

type UserPayload = {
  id: string;
};

const protect = async (req: Request, res: Response, next: NextFunction) => {
  let token;
  if (req.headers?.authorization?.startsWith("Bearer ")) {
    token = req.headers.authorization.split(" ").pop();
  }
  if (!token) return next(new ErrorResponse("No authorized access", 401));
  try {
    const jwtSecret = process.env.JWT_SECRET || "";
    const decode = jwt.verify(token, jwtSecret);
    const user = await User.findById((decode as UserPayload).id);
    if (!user) return next(new ErrorResponse("User not found", 404));
    Object.assign(req, { user });
    next();
  } catch (error) {
    return next(new ErrorResponse("No authorized access", 401));
  }
};

export { protect };
