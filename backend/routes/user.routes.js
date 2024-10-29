import express from "express";
import protectRoutes from "../middlewares/protectRoutes.js";
import validate from "../middlewares/validate.js";
import {
  getUserProfile,
  updateUserProfile,
  searchUsers,
  getUserFriends,
} from "../controllers/user.controller.js";
import {
  searchUsersSchema,
  updateUserProfileSchema,
} from "../schema/user/userSchema.js";
import validateQuery from "../middlewares/validateQuery.js";

const router = express.Router();

router.get("/profile/:username", protectRoutes, getUserProfile);
router.post(
  "/update",
  protectRoutes,
  validate(updateUserProfileSchema),
  updateUserProfile
);
router.get(
  "/search",
  protectRoutes,
  validateQuery(searchUsersSchema),
  searchUsers
);
router.get("/friends", protectRoutes, getUserFriends)

export default router;
