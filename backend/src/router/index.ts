import { Router } from "express";

import { middleware } from "../middleware";
import { chat, handshake } from "./routes/post";

const router = Router();

router.post("/handshake", handshake);

router.use(...middleware.private);

router.post("/chat", chat);

export default router;
