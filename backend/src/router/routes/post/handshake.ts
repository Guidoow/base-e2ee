import { Request as baseReq, Response as baseRes } from "express";

import { E2EEncryptor, RSAAuthenticator } from "../../../services";
import { HttpStatus, CustomResponse } from "../../../interfaces";

export const handshake = async (req: baseReq, res: baseRes) => {
  const PubKeyRSA = req.body.RSA;
  const UUID = RSAAuthenticator.registerClient(PubKeyRSA);

  const PubKeyECDH64 = req.body.ECDH;

  await E2EEncryptor.registerClient(PubKeyECDH64, UUID);

  res.setHeader("X-Auth-UUID", UUID as string);

  const body = E2EEncryptor.getPubKeyB64()!;
  const statusCode = HttpStatus.ACCEPTED;
  const response: CustomResponse = {
    statusCode,
    body,
  };

  res.status(statusCode).send(response);
};
