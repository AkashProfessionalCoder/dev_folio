import { Router } from "express";
import {
  register,
  login,
  getMe,
  updateProfile,
  debugEnv,
} from "../controllers/auth.controller.js";
import { authenticate } from "../middleware/auth.middleware.js";

const router = Router();

router.post("/register", register);
router.post("/login", login);
router.get("/debug-env", debugEnv);
router.get("/me", authenticate, getMe);
router.patch("/me", authenticate, updateProfile);

export default router;
