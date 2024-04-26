import express from "express";
import * as dotenv from "dotenv";
import https from "https";

import { middleware } from "./middleware";
import router from "./router";
import { E2EEncryptor, Credentials } from "./services";

dotenv.config();

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
