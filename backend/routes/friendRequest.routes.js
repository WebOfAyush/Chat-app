import express from "express";
import validate from "../middlewares/validate.js";
import {
  sendfriendRequestSchema,
  acceptfriendRequestSchema,
  declinefriendRequestSchema,
} from "../schema/friend-request/friendRequestSchema.js";
import protectRoutes from "../middlewares/protectRoutes.js";
import {
  acceptFriendRequest,
  declineFriendRequest,
  sendfriendRequest,
  viewFriendRequests
} from "../controllers/friendRequest.controller.js";

const router = express.Router();
router.post(
  "/send",
  protectRoutes,
  validate(sendfriendRequestSchema),
  sendfriendRequest
);
router.post(
  "/accept",
  protectRoutes,
  validate(acceptfriendRequestSchema),
  acceptFriendRequest
);
router.post(
  "/decline",
  protectRoutes,
  validate(declinefriendRequestSchema),
  declineFriendRequest
);
router.get("/view", protectRoutes, viewFriendRequests)
export default router;
