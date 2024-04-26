import { Request, Response, NextFunction } from "express";
import { publicResources } from "../utils";
import { HttpStatus } from "../interfaces";

export default (req: Request, res: Response, next: NextFunction) => {
  console.log(`\n> Incoming request to [${req.url}]`);

  const allowed = Boolean(
    publicResources.includes(req.url) || // trying to access a public resource
      req.headers["x-auth-uuid"] //         trying to access a private resource
  );

  if (allowed) next();
  else
    res.status(HttpStatus.FORBIDDEN).send({
      statusCode: HttpStatus.FORBIDDEN,
      body: "Forbidden access, you must first establish a /handshake",
    });
};
