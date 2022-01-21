import fs from "fs/promises";
import { Response, Request, NextFunction } from "express";
import ErrorResponse from "../utils/ErrorResponse";
import { getDateString } from "../utils/date";
import { getExtensionFromMimetype, createResizedImage } from "../utils/image";
import Asset, { AssetDocument } from "../models/Asset.model";
import { Multer } from "multer";
import User from "../models/User.model";

interface UploadAsset extends Request {
  ext: string;
  created: string;
}

const AssetsController = {
  process: async (req: Request, res: Response, next: NextFunction) => {
    if (!req.file) return next(new ErrorResponse("Invalid File", 400));
    const dateString = getDateString();
    const ext = getExtensionFromMimetype(req.file.mimetype);
    const renamedFile = `${req.file.filename}-${dateString}.${ext}`;

    await fs.rename(req.file.path, `./uploads/${renamedFile}`);

    createResizedImage(renamedFile, "thumb");
    createResizedImage(renamedFile, "small");
    createResizedImage(renamedFile, "large");

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
      const { filename, path, ext, created, mimetype } = req.file;
      await Asset.create({
        filename,
        path,
        ext,
        mimetype,
        created,
        username: req.session.user?.username,
      });
      return res.json({ message: "File uploaded", path });
    } catch (error) {
      return error;
    }
  },
  read: async (req: Request, res: Response) => {
    try {
      const user = await User.findById(req.session.userId);
      const query = user ? { username: req.session.user?.username } : {};
      const assets = await Asset.find(query);
      return res.json(assets);
    } catch (error) {
      return error;
    }
  },
  readOne: async () => {},
  update: async () => {},
  delete: async () => {},
};

export default AssetsController;
