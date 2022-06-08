import type { Response, Request, NextFunction } from "express";
import errorHandler from "../middleware/errorHandler";
import Project, { ProjectDocument } from "../models/Project.model";
import ErrorResponse from "../utils/ErrorResponse";

const ProjectController = {
  create: async (req: Request, res: Response, next: NextFunction) => {
    const {
      title,
      description,
      company,
      date,
      image,
      alt,
      body,
      skills,
      tags,
      url,
    }: ProjectDocument = req.body;

    if (!title || !description) {
      const err = new ErrorResponse("Title and Description are required.");
      return errorHandler(err, res, next);
    }

    try {
      Project.create({
        title,
        description,
        company,
        date,
        image,
        alt,
        body,
        skills,
        tags,
        url,
      });
      return res.json({ message: "project created" });
    } catch (error) {
      return next(new ErrorResponse("An error occurred.", 500));
    }
  },
  read: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const projects = await Project.find();
      return res.json(projects);
    } catch (error) {
      return next(new ErrorResponse("An error occurred.", 500));
    }
  },
  readOne: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const project = await Project.findById(req.params.id);
      return res.json(project);
    } catch (error) {
      return next(new ErrorResponse("An error occurred.", 500));
    }
  },
  update: async (req: Request, res: Response, next: NextFunction) => {
    console.log("update");
    try {
      await Project.findByIdAndUpdate(req.params.id, req.body);
      return res.json({ message: `Project ${req.params.id} updated.` });
    } catch (error) {
      return next(new ErrorResponse("An error occurred.", 500));
    }
  },
  delete: async (req: Request, res: Response, next: NextFunction) => {
    try {
      await Project.findByIdAndDelete(req.params.id);
      return res.json({ message: `Project ${req.params.id} updated.` });
    } catch (error) {
      return next(new ErrorResponse("An error occurred.", 500));
    }
  },
};

export default ProjectController;
