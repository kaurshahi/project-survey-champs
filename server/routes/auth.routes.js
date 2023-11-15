import express from "express";
import authCtrl from "../controllers/auth.controller.js";

const router = express.Router();

// User sign-in route
router.route("/auth/signin").post(authCtrl.signin);

// JWT-based authentication middleware
router.use("/api", authCtrl.requireSignin);

// Protected routes requiring JWT authentication
router.route("/api/auth/signout").get(authCtrl.signout);

export default router;
