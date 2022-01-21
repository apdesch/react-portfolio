import mongoose, { Schema, Model, ObjectId } from "mongoose";

export interface AssetDocument {
  label: string;
  description: string;
  filename: string;
  path: string;
  mimetype: string;
  ext: string;
  altText: string;
  created: string;
  imageThumbPath: string;
  imageSmallPath: string;
  imageDetailPath: string;
  imageLargePath: string;
  username: string;
  userId: ObjectId;
}

const AssetSchema: Schema<AssetDocument> = new Schema({
  filename: {
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
  username: {
    type: String,
    required: true,
  },
  label: {
    type: String,
  },
  description: {
    type: String,
  },
  altText: {
    type: String,
  },
  imageThumbPath: {
    type: String,
  },
  imageSmallPath: {
    type: String,
  },
  imageDetailPath: {
    type: String,
  },
  imageLargePath: {
    type: String,
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    select: false,
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
