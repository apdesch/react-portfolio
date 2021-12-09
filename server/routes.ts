import { Router } from "express";
import { badRequest } from "./controllers/HttpStatus.controller";
import assetRouter from "./routes/Asset.routes";

const router = Router();

router
  .use("/assets", assetRouter)
  .use("/projects", assetRouter)
  .use("/posts", assetRouter)
  .use("/pages", assetRouter)
  .use("/user", assetRouter)
  .get("/", badRequest);

export default router;
