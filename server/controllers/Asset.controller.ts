import { Request, Response } from "express";
import Asset, { IAsset } from "models/Asset.model";
import { Payload } from "config/types";

const AssetController = {
  create: (req: Request, res: Response) => {
    const payload: Payload<string> = { message: "Asset created", status: 200 };
    return res.json(payload);
  },
  read: (req: Request, res: Response) => {
    const message = Asset.findOne("1");
    const payload: Payload<IAsset> = { message, status: 200 };
    return res.json(payload);
  },
  readOne: (req: Request, res: Response) => {
    const message = Asset.findOne("1");
    const payload: Payload<IAsset> = { message, status: 200 };
    return res.json(payload);
  },
  update: (req: Request, res: Response) => {
    const message = Asset.findOne("1");
    const payload: Payload<IAsset> = { message, status: 200 };
    return res.json(payload);
  },
  delete: (req: Request, res: Response) => {
    const message = Asset.findOne("1");
    const payload: Payload<IAsset> = { message, status: 200 };
    return res.json(payload);
  },
};

export default AssetController;
