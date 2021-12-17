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
      setUserId(user, req, res);
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
      setUserId(user, req, res);
    } catch (error) {
      next(error);
    }
  },
  read: (req: Request, res: Response): Response => {
    const auth = !!req.session.userId;
    return res.json({ auth, ...{ user: req.session.user } });
  },
  update: (req: Request, res: Response): Response => {
    const { username } = req.body;
    return res.json({ username });
  },
  delete: (req: Request, res: Response): Response => {
    delete req.session["userId"];
    return res.json({ auth: false });
  },
};

const setUserId = (user: UserDocument, req: Request, res: Response) => {
  const payload = {
    username: user.username,
    email: user.email,
    name: user.name,
  };
  Object.assign(req.session, { userId: user.id, user: payload });
  return res.json({ auth: true });
};

export default UserController;
