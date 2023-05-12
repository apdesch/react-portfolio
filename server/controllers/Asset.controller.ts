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
import { createVideoThumbnail } from "../utils/video";
import Asset, { AssetDocument } from "../models/Asset.model";
import User from "../models/User.model";
import { APP_ROOT } from "../app";

type FindMethod = "one" | "update" | "delete";

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

const findAssets = async (req: Request, method?: FindMethod) => {
  const user = await User.findById(req.session.userId);
  let query = {};

  // filter user's assets
  if (!!user) Object.assign(query, { userId: req.session.userId });

  // find one item
  if (req.params.id) {
    Object.assign(query, { _id: new ObjectId(req.params.id) });
  } else if (req.query.t) {
    // filter based on query params
    Object.assign(query, req.query.t);
  }

  // switch methods
  switch (method) {
    case "update":
      return await Asset.findOneAndUpdate(query);
    case "delete":
      return await Asset.findOneAndDelete(query);
    default: {
      return await Asset.find(query);
    }
  }
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

    if (req.file.mimetype.includes("image")) {
      await createResizedImage(renamedFile, "thumb");
      await createResizedImage(renamedFile, "small");
      await createResizedImage(renamedFile, "large");
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
      const asset = await findAssets(req, "update");
      if (!asset) return next(new ErrorResponse("File doesn't exist", 404));
      return res.json(asset);
    } catch (error) {
      return error;
    }
  },
  delete: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const asset = (await findAssets(req, "delete")) as AssetDocument;

      if (!asset) throw Error("Asset doesn't exist.");

      await Asset.findByIdAndDelete(req.params.id);

      if (asset.mimetype.includes("image/")) {
        await unlink(resolve(APP_ROOT, `uploads/thumb/${asset.filename}`));
        await unlink(resolve(APP_ROOT, `uploads/small/${asset.filename}`));
        await unlink(resolve(APP_ROOT, `uploads/large/${asset.filename}`));
      } else if (asset.mimetype.includes("pdf")) {
        await unlink(resolve(APP_ROOT, `uploads/thumb/${asset.filename}.png`));
      } else if (asset.mimetype.includes("video/")) {
        await unlink(
          resolve(
            APP_ROOT,
            `uploads/thumb/${asset.filename.split(".")[0]}.jpg`,
          ),
        );
      }
      await unlink(resolve(APP_ROOT, asset.path));

      return res.json({ message: `File ${req.params.id} deleted` });
    } catch (error) {
      return error;
    }
  },
};

export default AssetsController;
