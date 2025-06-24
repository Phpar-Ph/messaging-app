import express from "express";
import { protectRoute } from "../middleware/authMiddleware.js";
import {
  signup,
  login,
  logout,
  checkAuth,
  updateProfile,
} from "../controller/authController.js";
const authRouter = express.Router();

authRouter.post("/signup", signup);
authRouter.post("/login", login);
authRouter.post("/logout", logout);

authRouter.put("/update-profile", protectRoute, updateProfile);

authRouter.get("/check", protectRoute, checkAuth);

export default authRouter;
