import express from "express"
import protectRoutes from "../middlewares/protectRoutes.js"
import { getUserProfile, updateUserProfile } from "../controllers/user.controller.js";

const router = express.Router();

router.get("/profile/:username",protectRoutes, getUserProfile)
router.post("/update", protectRoutes, updateUserProfile)

export default router;