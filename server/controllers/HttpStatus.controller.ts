import { Request, Response } from "express";
import HTTP_STATUS_CODES from "http-status-enum";
import { Payload } from "config/types";

enum HTTP_STATUS_MESSAGE {
  BAD_REQUEST = "Bad Request",
  INTERNAL_SERVER_ERROR = "Something went wrong",
  NOT_FOUND = "Not a valid route",
}

const badRequest = (req: Request, res: Response): Response => {
  const status = HTTP_STATUS_CODES.BAD_REQUEST;
  const message = HTTP_STATUS_MESSAGE.BAD_REQUEST;
  const payload: Payload<string> = { message, status };
  return res.status(status).json(payload);
};

const internalError = (req: Request, res: Response) => {
  const status = HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR;
  const message = HTTP_STATUS_MESSAGE.INTERNAL_SERVER_ERROR;
  const payload: Payload<string> = { message, status };
  return res.status(status).json(payload);
};

const notFound = (req: Request, res: Response) => {
  const status = HTTP_STATUS_CODES.NOT_FOUND;
  const message = HTTP_STATUS_MESSAGE.NOT_FOUND;
  const payload: Payload<string> = { message, status };
  return res.status(status).json(payload);
};

export { badRequest, internalError, notFound };
