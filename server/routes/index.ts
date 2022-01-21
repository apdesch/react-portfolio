import { Router } from "express";
import userRouter from "./user.routes";
import assetsRouter from "./assets.routes";

const router = Router();

router
  .use("/assets", assetsRouter)
  // .use("/projects")
  // .use("/posts")
  // .use("/pages")
  .use("/user", userRouter);

export default router;
