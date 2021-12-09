import { Router } from "express";
import AssetController from "../controllers/Asset.controller";

const assetRouter = Router();

assetRouter
  .get("/", AssetController.read)
  .post("/:id", AssetController.create)
  .get("/:id", AssetController.readOne)
  .put("/:id", AssetController.update)
  .delete("/:id", AssetController.delete);

export default assetRouter;
