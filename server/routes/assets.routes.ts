import { Router } from "express";
import AssetsController from "../controllers/Assets.controller";
import { auth } from "../middleware/auth";
import multer from "multer";

const upload = multer({ dest: "./uploads" });

const assetsRouter = Router();

assetsRouter
  .post(
    "/",
    auth,
    upload.single("file"),
    AssetsController.process,
    AssetsController.create,
  )
  .get("/", AssetsController.read)
  .get("/:id", AssetsController.readOne)
  .put("/:id", auth, AssetsController.update)
  .delete("/:id", auth, AssetsController.delete);

export default assetsRouter;
