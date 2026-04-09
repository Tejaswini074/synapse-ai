import express from "express";
import {
  register,
  login,
  googleAuth,
  googleCallback,
  githubAuth,
  githubCallback,
} from "../controllers/authController.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/google", googleAuth);
router.get("/google/callback", googleCallback);
router.get("/github", githubAuth);
router.get("/github/callback", githubCallback);

export default router;
