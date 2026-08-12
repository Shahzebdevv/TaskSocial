import { Router } from "express";
import {
  registerUser,
  loginUser,
  logout,
} from "../controllers/user.controller.js";

const authRouter = Router();

// Public Authentication endpoints
authRouter.route("/register").post(registerUser);
authRouter.route("/login").post(loginUser);
authRouter.route("/logout").post(logout);

export default authRouter;
