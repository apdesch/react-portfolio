import type { Model } from "mongoose";
import mongoose from "mongoose";

export interface ProjectDocument {
  id: string;
  title: string;
  description: string;
  company?: string;
  date?: Date;
  type?: string;
  image?: string;
  alt?: string;
  body?: string;
  skills?: string[];
  tags?: string[];
  url?: string;
}

const ProjectSchema: mongoose.Schema<ProjectDocument> = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Title is required"],
  },
  description: {
    type: String,
    required: [true, "Description is required"],
  },
  company: {
    type: String,
  },
  date: {
    type: Date,
  },
  type: {
    type: String,
  },
  image: {
    type: String,
  },
  alt: {
    type: String,
  },
  body: {
    type: String,
  },
  tags: [
    {
      type: String,
    },
  ],
  skills: [
    {
      type: String,
    },
  ],
  url: {
    type: String,
  },
});

ProjectSchema.set("toJSON", {
  virtuals: true,
  transform: (doc, converted) => {
    delete converted._id;
    delete converted.__v;
  },
});

const Project: Model<ProjectDocument> = mongoose.model<ProjectDocument>(
  "Project",
  ProjectSchema,
);

export default Project;
