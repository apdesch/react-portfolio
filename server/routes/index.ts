import { Router } from "express";
import userRouter from "./user.routes";

const router = Router();

router
  // .use("/assets")
  // .use("/projects")
  // .use("/posts")
  // .use("/pages")
  .use("/user", userRouter);

export default router;
