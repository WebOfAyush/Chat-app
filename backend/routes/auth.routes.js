import express from "express";
import protectRoutes from "../middlewares/protectRoutes.js";
import validate from "../middlewares/validate.js";
import { signin, signup, signout, getMe } from "../controllers/auth.controller.js";
import { signinSchema, signUpSchema } from "../schema/auth/authSchema.js";
const router = express.Router();
router.post("/signup", validate(signUpSchema), signup);
router.post("/signin", validate(signinSchema), signin);
router.post("/signout", protectRoutes, signout);
router.get("/me", protectRoutes, getMe)

export default router;
