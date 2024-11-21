import express from "express";
import { login, signup } from "../controllers/AuthController.js";
const router = express.Router();
import * as middlewares from "../middlewares/auth.js";

router.post("/login", middlewares.validateSignup, login);

router.post("/signup", signup);

export default router;
