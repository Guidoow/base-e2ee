import { Response, NextFunction } from "express";
import { publicResources } from "../utils";
import { E2EEncryptor } from "../services";
import { CustomRequest, HttpStatus } from "../interfaces";

export default (req: CustomRequest, res: Response, next: NextFunction) => {
  const wantsPrivateResource = !publicResources.includes(req.url);
  const hasBody = Boolean(req.body);
  if (wantsPrivateResource || hasBody) {
    const UUID = req.headers["x-auth-uuid"] as String;

    req.UUID = UUID;

    try {
      req.body = E2EEncryptor.decrypt(req.body, req.UUID);
    } catch (error) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        body: "Server error, refresh your ECDH key.",
      });
    }
  }

  next();
};
