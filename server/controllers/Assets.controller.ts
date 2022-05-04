import fs, { rename } from "fs/promises";
import { Response, Request, NextFunction } from "express";
import ErrorResponse from "../utils/ErrorResponse";
import { getDateString } from "../utils/date";
import {
  getExtensionFromMimetype,
  createResizedImage,
  createPDFThumbnail,
} from "../utils/image";
import Asset from "../models/Asset.model";
import User from "../models/User.model";

interface UploadAsset extends Request {
  ext: string;
  created: string;
}

interface File {
  filename: string;
  originalname: string;
  path: string;
  ext: string;
  created: string;
  mimetype: string;
}

const AssetsController = {
  process: async (req: Request, res: Response, next: NextFunction) => {
    if (!req.file) return next(new ErrorResponse("Invalid File", 400));

    const dateString = getDateString();
    const ext =
      getExtensionFromMimetype(req.file.mimetype) ||
      req.file.originalname.split(".")[1] ||
      "";
    const renamedFile = `${req.file.filename}-${dateString}.${ext}`;

    await fs.rename(req.file.path, `./uploads/${renamedFile}`);

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
  delete: async (req: Request, res: Response) => {
    try {
      const asset = await Asset.findById(req.params.id);

      if (!asset) throw Error("Asset doesn't exist.");

      const document = await Asset.findByIdAndDelete(req.params.id);
      if (document) {
        if (asset.mimetype.includes("image/")) {
          await fs.unlink(`./uploads/thumb/${asset.filename}`);
          await fs.unlink(`./uploads/small/${asset.filename}`);
          await fs.unlink(`./uploads/large/${asset.filename}`);
        }
        if (asset.mimetype.includes("pdf")) {
          await fs.unlink(`./uploads/thumb/${asset.filename}.jpg`);
        }
        await fs.unlink(`./uploads/${asset.filename}`);
      }

      return res.json({ message: `File ${req.params.id} deleted` });
    } catch (error) {
      return error;
    }
  },
};

export default AssetsController;
