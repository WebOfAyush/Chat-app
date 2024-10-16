import express from "express"
import protectRoutes from "../middlewares/protectRoutes.js"
import { getUserProfile, updateUserProfile, searchUsers, friendRequest } from "../controllers/user.controller.js";

const router = express.Router();

router.get("/profile/:username",protectRoutes, getUserProfile)
router.post("/update", protectRoutes, updateUserProfile)
router.get("/search/:query", protectRoutes, searchUsers)
router.post("/friendrequest", friendRequest)

export default router;