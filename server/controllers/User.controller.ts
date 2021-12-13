import { Response, Request, NextFunction } from "express";
import User, { UserDocument } from "../models/User.model";
import ErrorResponse from "../utils/ErrorResponse";

const UserController = {
  login: async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;
    if (!email || !password) {
      return next(new ErrorResponse("Email and password required"));
    }
    try {
      const user = await User.findOne({ email }).select("+password");
      const passwordMatch = user && (await user.checkPasswordMatch(password));

      if (!user || !passwordMatch) {
        return next(new ErrorResponse("Invalid credentials", 401));
      }
      sendToken(user, 200, res);
    } catch (error) {
      next(error);
    }
  },
  create: async (req: Request, res: Response, next: NextFunction) => {
    const { username, email, password } = req.body;
    try {
      const user = await User.create({
        username,
        email,
        password,
      });
      sendToken(user, 201, res);
    } catch (error) {
      next(error);
    }
  },
  read: (req: any, res: Response): Response => {
    const { username } = req.user;
    return res.json({ message: `Welcome ${username}` });
  },
  update: (req: Request, res: Response): Response => {
    const { username } = req.body;
    return res.json({ username });
  },
  delete: (req: Request, res: Response): Response => {
    return res.json({ message: "User removed" });
  },
};

const sendToken = (user: UserDocument, statusCode: number, res: Response) => {
  const token = user.getSignedToken();
  res.status(statusCode).json({ token });
};

export default UserController;
