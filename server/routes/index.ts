import { Router } from "express";
import userRouter from "./user.routes";
import assetRouter from "./asset.routes";
import projectRouter from "./project.routes";

const router = Router();

router
  .use("/assets", assetRouter)
  .use("/projects", projectRouter)
  .use("/user", userRouter);

export default router;
