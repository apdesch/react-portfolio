import { rename, unlink } from "fs/promises";
import type { Response, Request, NextFunction } from "express";
import ErrorResponse from "../utils/ErrorResponse";
import { getDateString } from "../utils/date";
import {
  getExtensionFromMimetype,
  createResizedImage,
  createPDFThumbnail,
} from "../utils/image";
import Asset, { AssetDocument } from "../models/Asset.model";
import User from "../models/User.model";

type FindMethod = "one" | "update" | "delete";

declare global {
  namespace Express {
    namespace Multer {
      interface File {
        created?: string,
        ext?: string,
      }
    }
  }
}

const findAssets = async (req: Request, method?: FindMethod) => {
  const user = await User.findById(req.session.userId);
  const query = user ? { userId: req.session.userId } : {};
  switch (method) {
    case "one":
      return await Asset.findOne(query);
    case "update":
      return await Asset.findOneAndUpdate(query);
    case "delete":
      return await Asset.findOneAndDelete(query);
    default:
      return await Asset.find(query);
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
    const renamedFile = `${req.file.filename}-${dateString}.${ext}`;

    await rename(req.file.path, `./uploads/${renamedFile}`);

    if (req.file.mimetype.includes("image/")) {
      await createResizedImage(renamedFile, "thumb");
      await createResizedImage(renamedFile, "small");
      await createResizedImage(renamedFile, "large");
    }

    if (req.file.mimetype === "application/pdf") {
      await createPDFThumbnail(renamedFile);
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
      const assets = await Asset.find({ userId: req.session.userId });
      if (!assets) return next(new ErrorResponse("File doesn't exist", 404));
      return res.json(assets);
    } catch (error) {
      return error;
    }
  },
  readOne: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const asset = await findAssets(req, "one");
      if (!asset) return next(new ErrorResponse("File doesn't exist", 404));
      return res.json(asset);
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

      const document = await Asset.findByIdAndDelete(req.params.id);

      if (document) {
        if (asset.mimetype.includes("image/")) {
          await unlink(`./uploads/thumb/${asset.filename}`);
          await unlink(`./uploads/small/${asset.filename}`);
          await unlink(`./uploads/large/${asset.filename}`);
        }
        if (asset.mimetype.includes("pdf")) {
          await unlink(`./uploads/thumb/${asset.filename}.png`);
        }
        await unlink(`./uploads/${asset.filename}`);
      }

      return res.json({ message: `File ${req.params.id} deleted` });
    } catch (error) {
      return error;
    }
  },
};

export default AssetsController;
