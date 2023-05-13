import { resolve } from "path";
import { rename, unlink } from "fs/promises";
import type { Response, Request, NextFunction } from "express";
import { ObjectId } from "mongodb";
import ErrorResponse from "../utils/ErrorResponse";
import { getDateString } from "../utils/date";
import {
  getExtensionFromMimetype,
  createResizedImage,
  createPDFThumbnail,
} from "../utils/image";
import type { Size } from "../utils/image";
import { createVideoThumbnail } from "../utils/video";
import Asset, { AssetDocument } from "../models/Asset.model";
import User from "../models/User.model";
import { APP_ROOT } from "../app";

declare global {
  namespace Express {
    namespace Multer {
      interface File {
        created?: string;
        ext?: string;
      }
    }
  }
}

const findAssets = async (req: Request): Promise<any> => {
  const user = await User.findById(req.session.userId);
  let query = {};
  // filter user's assets
  if (!!user) Object.assign(query, { userId: req.session.userId });
  // query conditions
  if (req.params.id && req.params.id !== "image" && req.params.id !== "video") {
    Object.assign(query, { _id: new ObjectId(req.params.id) }); // find one item
  } else if (req.params.id === "image") {
    Object.assign(query, { mimetype: { $regex: "^image/*" } }); // find images
  } else if (req.params.id === "video") {
    Object.assign(query, { mimetype: { $regex: "^video/*" } }); // find videos
  }
  return await Asset.find(query);
};

const AssetsController = {
  process: async (req: Request, res: Response, next: NextFunction) => {
    if (!req.file) return next(new ErrorResponse("Invalid File", 400));

    const dateString = getDateString();
    const ext =
      getExtensionFromMimetype(req.file.mimetype) ||
      req.file.originalname.split(".")[1] ||
      "";
    const fileNameWithDate = `${req.file.filename}-${dateString}`;
    const renamedFile = `${fileNameWithDate}.${ext}`;

    await rename(req.file.path, `./uploads/${renamedFile}`);

    let thumbSize: Size = [0, 0];
    let smallSize: Size = [0, 0];
    let largeSize: Size = [0, 0];

    if (req.file.mimetype.includes("image")) {
      thumbSize = await createResizedImage(renamedFile, "thumb");
      smallSize = await createResizedImage(renamedFile, "small");
      largeSize = await createResizedImage(renamedFile, "large");
    } else if (req.file.mimetype === "application/pdf") {
      await createPDFThumbnail(renamedFile);
    } else if (req.file.mimetype.includes("video")) {
      await createVideoThumbnail({
        input: resolve(APP_ROOT, `uploads/${renamedFile}`),
        output: resolve(APP_ROOT, `uploads/thumb/${fileNameWithDate}.jpg`),
      });
    }

    Object.assign(req.file, {
      created: dateString,
      ext,
      filename: renamedFile,
      path: `uploads/${renamedFile}`,
      size: {
        thumb: thumbSize,
        small: smallSize,
        large: largeSize,
      },
    });

    next();
  },
  create: async (req: Request, res: Response, next: NextFunction) => {
    if (!req.file) return next(new ErrorResponse("Invalid file", 400));
    if (!("ext" in req.file) && !("created" in req.file)) {
      return next(new ErrorResponse("File info missing", 400));
    }
    try {
      const { filename, originalname, path, ext, created, mimetype } = req.file;
      await Asset.create({
        filename,
        originalname,
        path,
        ext,
        mimetype,
        created,
        userId: req.session.userId,
        size: req.file.size,
      });
      return res.json({ message: "File uploaded", path });
    } catch (error) {
      return error;
    }
  },
  read: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const assets = await findAssets(req);
      if (!assets) return next(new ErrorResponse("File doesn't exist", 404));
      return res.json(assets);
    } catch (error) {
      return error;
    }
  },
  update: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const asset = await findAssets(req);
      if (!asset) return next(new ErrorResponse("File doesn't exist", 404));
      await Asset.findByIdAndUpdate(req.params.id, req.body);
      return res.json({ message: `Asset ${req.params.id} updated.` });
    } catch (error) {
      return next(new ErrorResponse("An error occurred.", 500));
    }
  },
  delete: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const asset = await findAssets(req);
      if (!asset) return next(new ErrorResponse("File doesn't exist", 404));
      await Asset.findByIdAndDelete(req.params.id);
      // delete processed images
      if (asset.mimetype.includes("image/")) {
        await unlink(resolve(APP_ROOT, `uploads/thumb/${asset.filename}`));
        await unlink(resolve(APP_ROOT, `uploads/small/${asset.filename}`));
        await unlink(resolve(APP_ROOT, `uploads/large/${asset.filename}`));
      } else if (asset.mimetype.includes("pdf")) {
        await unlink(resolve(APP_ROOT, `uploads/thumb/${asset.filename}.png`));
      } else if (asset.mimetype.includes("video/")) {
        const filename = asset.filename.split(".")[0];
        await unlink(resolve(APP_ROOT, `uploads/thumb/${filename}.jpg`));
      }
      // delete asset
      await unlink(resolve(APP_ROOT, asset.path));
      return res.json({ message: `File ${req.params.id} deleted` });
    } catch (error) {
      return error;
    }
  },
};

export default AssetsController;
