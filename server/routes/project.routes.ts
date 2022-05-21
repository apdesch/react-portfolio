import { Router } from "express";
import ProjectController from "../controllers/Project.controller";
import { auth } from "../middleware/auth";

const projectRouter = Router();

projectRouter
  .post("/", auth, ProjectController.create)
  .get("/", ProjectController.read)
  .get("/:id", ProjectController.readOne)
  .put("/:id", auth, ProjectController.update)
  .delete("/:id", auth, ProjectController.delete);

export default projectRouter;
