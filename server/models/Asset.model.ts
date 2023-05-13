import type { Model, ObjectId } from "mongoose";
import mongoose from "mongoose";

interface ImageSizes {
  thumb?: number[][];
  small?: number[][];
  large?: number[][];
}

export interface AssetDocument {
  id: string;
  filename: string;
  originalname: string;
  path: string;
  mimetype: string;
  ext: string;
  created: string;
  title?: string;
  description?: string;
  altText?: string;
  category?: string;
  userId: ObjectId;
  tags?: string[];
  size?: ImageSizes;
}

const AssetSchema: mongoose.Schema<AssetDocument> = new mongoose.Schema({
  filename: {
    type: String,
    required: true,
  },
  originalname: {
    type: String,
    required: true,
  },
  path: {
    type: String,
    required: true,
  },
  mimetype: {
    type: String,
    required: true,
  },
  ext: {
    type: String,
    required: true,
  },
  created: {
    type: String,
    required: true,
  },
  title: {
    type: String,
  },
  description: {
    type: String,
  },
  category: {
    type: String,
  },
  altText: {
    type: String,
  },
  tags: [
    {
      type: String,
    },
  ],
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    select: false,
  },
  size: {
    thumb: [{ type: Number }, { type: Number }],
    small: [{ type: Number }, { type: Number }],
    large: [{ type: Number }, { type: Number }],
  },
});

AssetSchema.set("toJSON", {
  virtuals: true,
  transform: (doc, converted) => {
    delete converted._id;
    delete converted.__v;
  },
});

const Asset: Model<AssetDocument> = mongoose.model<AssetDocument>(
  "Asset",
  AssetSchema,
);

export default Asset;
