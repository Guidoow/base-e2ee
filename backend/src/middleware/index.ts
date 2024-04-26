import { json, Request, text, urlencoded } from "express";
import cors, { CorsOptions } from "cors";

import access from "./access";
import signature from "./signature";
import decrypt from "./decrypt";

const corsOptions: CorsOptions = {
  exposedHeaders: ["X-Auth-UUID", "x-auth-uuid"],
  origin: "https://localhost",
  credentials: true,
};

export const middleware = {
  public: [
    text(),
    json(),
    urlencoded({ extended: true }),
    cors(corsOptions),
    access,
  ],
  private: [signature, decrypt],
};
