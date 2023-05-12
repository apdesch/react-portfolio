import { Router } from "express";
import AssetsController from "../controllers/Asset.controller";
import { auth } from "../middleware/auth";
import multer from "multer";

const upload = multer({
  dest: "./uploads",
  limits: { fileSize: 100 * 1024 * 1024 },
});

const assetRouter = Router();

assetRouter
  .post(
    "/",
    auth,
    upload.single("file"),
    AssetsController.process,
    AssetsController.create,
  )
  .get("/", AssetsController.read)
  .get("/:id", AssetsController.read)
  .put("/:id", auth, AssetsController.update)
  .delete("/:id", auth, AssetsController.delete);

export default assetRouter;
