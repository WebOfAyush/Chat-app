import express from "express"
import protectRoutes from "../middlewares/protectRoutes.js"
import validate from "../middlewares/validate.js"
import { getUserProfile, updateUserProfile, searchUsers, friendRequest } from "../controllers/user.controller.js";
import { friendRequestSchema, getUserProfileSchema, searchUsersSchema, updateUserProfileSchema } from "../schema/user/userSchema.js";
import  validateQuery  from "../middlewares/validateQuery.js";

const router = express.Router();

router.get("/profile/:username",protectRoutes,validate(getUserProfileSchema), getUserProfile)
router.post("/update", protectRoutes,validate(updateUserProfileSchema), updateUserProfile)
router.get("/search/", protectRoutes,validateQuery(searchUsersSchema), searchUsers)
router.post("/friendrequest",protectRoutes, validate(friendRequestSchema), friendRequest)

export default router;