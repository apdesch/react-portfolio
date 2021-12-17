import { NextFunction, Request, Response } from "express";
import ErrorResponse from "../utils/ErrorResponse";
import User from "../models/User.model";

const auth = async (req: Request, res: Response, next: NextFunction) => {
  if (!("userId" in req.session)) return res.json({ auth: false });
  try {
    const user = await User.findById(req.session.userId);
    if (!user) return res.json({ auth: false });
    next();
  } catch (error) {
    return next(new ErrorResponse("No authorized access", 401));
  }
};

export { auth };
