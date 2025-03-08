import express from "express";
import {
  getProfile,
  loginUser,
  registerUser,
} from "../controllers/UserController.js";
import { protect } from "../middleware/verfiyToken.js";

const router = express.Router();

// Route to get all users

router.post("/register", registerUser);
router.post("/login", loginUser);
// router.get("/logout", handleLogoutUser);
router.get("/profile", protect, getProfile);

export default router;
