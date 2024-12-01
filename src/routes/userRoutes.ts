import express from "express";
import { sendOtpController } from "../controllers/userController/sendOtp";
import { verifyOtpController } from "../controllers/userController/verifyOtp";
import { passwordController } from "../controllers/userController/createPassword";
import { signInController } from "../controllers/userController/signIn";
import { signUp } from "../controllers/userController/signUp";


const router = express.Router();

// User route
router.post("/signup", signUp);
router.post("/signin", signInController);
router.post("/send-otp", sendOtpController);
router.post("/verify-otp", verifyOtpController);
router.post("/create-password", passwordController);


export default router;

















