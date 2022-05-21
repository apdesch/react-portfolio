import { Router } from "express";
import UserController from "../controllers/User.controller";
import { auth } from "../middleware/auth";

const userRouter = Router();

userRouter
  .post("/", auth, UserController.create)
  .get("/", auth, UserController.read)
  .put("/", auth, UserController.update)
  .delete("/", auth, UserController.delete)
  .post("/login", UserController.login);

export default userRouter;
