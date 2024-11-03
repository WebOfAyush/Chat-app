import express from "express";
import protectRoutes from "../middlewares/protectRoutes.js";
import validate from "../middlewares/validate.js";
import { sendMessage, getMessages } from "../controllers/message.controller.js";
import { sendMessageSchema } from "../schema/message/messageSchema.js";

const router = express.Router();


router.post(
  "/send",
  validate(sendMessageSchema),
  protectRoutes,
  sendMessage,
);
router.get(
  "/:id",
  protectRoutes,
  getMessages,
);

export default router;
