import express from "express";
import * as dotenv from "dotenv";
import https from "https";

import { middleware } from "./middleware";
import router from "./router";
import { E2EEncryptor, Credentials } from "./services";

dotenv.config({ path: "../.env" });

if (
  !process.env.SSL_KEY_PATH ||
  !process.env.SSL_CERTIFICATE_PATH ||
  !process.env.HOST ||
  !process.env.PORT
)
  throw new Error(
    "You must complete all the enviroment variables in the .env file at the root folder of the project."
  );

const app = express();

app.use(...middleware.public);
app.use("/", router);

Credentials.read();
E2EEncryptor.createECDH();

const server = https.createServer(Credentials.get()!, app);

server.listen(Number(process.env.PORT!), process.env.HOST!, () => {
  console.log(
    `Server running under https://${process.env.HOST}:${process.env.PORT}`
  );
});
