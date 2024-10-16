import express from "express";
import validate from "../middlewares/validate.js";
import { sendfriendRequestSchema } from "../schema/friend-request/friendRequestSchema.js";
import protectRoutes from "../middlewares/protectRoutes.js";
import { acceptFriendRequest, sendfriendRequest } from "../controllers/friendRequest.controller.js";

const router = express.Router();
router.post(
  "/send",
  protectRoutes,
  validate(sendfriendRequestSchema),
  sendfriendRequest
);
router.get("/accept", protectRoutes, acceptFriendRequest);
export default router;
