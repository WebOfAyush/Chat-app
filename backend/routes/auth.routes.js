import express from "express";
import protectRoutes from "../middlewares/protectRoutes.js"
import { signin, signup, signout, getMe } from "../controllers/auth.controller.js";
const router = express.Router();
router.post("/signup", signup);
router.post("/signin", signin);
router.post("/signout",protectRoutes, signout)
router.get("/me", protectRoutes, getMe)
export default router;
