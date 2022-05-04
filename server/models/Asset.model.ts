import mongoose, { Schema, Model, ObjectId } from "mongoose";

export interface AssetDocument {
  filename: string;
  originalname: string;
  path: string;
  mimetype: string;
  ext: string;
  created: string;
  title: string;
  description: string;
  altText: string;
  username: string;
  userId: ObjectId;
}

const AssetSchema: Schema<AssetDocument> = new Schema({
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
  altText: {
    type: String,
  },
  username: {
    type: String,
    required: true,
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
