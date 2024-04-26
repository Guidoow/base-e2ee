import { Request as baseReq, Response as baseRes, NextFunction } from "express";

import { RSAAuthenticator } from "../services";
import { HttpStatus, CustomResponse } from "../interfaces";

export default (req: baseReq, res: baseRes, next: NextFunction) => {
  const UUID = req.headers["x-auth-uuid"] as string;
  const signature = req.headers["x-auth-signature"] as string;

  if (UUID && signature) {
    const validSignature = RSAAuthenticator.validateSignature(
      UUID,
      signature,
      req.body
    );

    if (validSignature) next();
    else {
      const body = "Invalid Signature.";
      const statusCode = HttpStatus.FORBIDDEN;
      const response: CustomResponse = {
        statusCode,
        body,
      };

      res.status(statusCode).send(response);
    }
  } else {
    const body = "UUID or Signature not specified.";
    const statusCode = HttpStatus.BAD_REQUEST;
    const response: CustomResponse = {
      statusCode,
      body,
    };

    res.status(statusCode).send(response);
  }
};
