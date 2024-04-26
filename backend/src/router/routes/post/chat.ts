import { Response } from "express";
import { CustomRequest, CustomResponse, HttpStatus } from "../../../interfaces";
import { E2EEncryptor, getRandom } from "../../../services";

export const chat = (req: CustomRequest, res: Response) => {
  req.body.content =
    req.body.content.slice(0, 10).split("").reverse().join("") +
    ".\n" +
    getRandom("sentence");
  req.body.createdAt = new Date();
  req.body.author = "Express";
  req.body.emoji = getRandom("emoji");

  const body = E2EEncryptor.encrypt(req.body, req.UUID!);

  const statusCode = HttpStatus.ACCEPTED;
  const response: CustomResponse = {
    statusCode,
    body,
  };

  res.status(statusCode).send(response);
};
