import { Router } from "express";
import UserController from "../controllers/User.controller";
import { protect } from "../middleware/auth";

const userRouter = Router();

userRouter
  .post("/", UserController.create)
  .get("/", protect, UserController.read)
  .put("/", protect, UserController.update)
  .delete("/", protect, UserController.delete)
  .post("/login", UserController.login);

export default userRouter;
