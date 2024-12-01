"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const sendOtp_1 = require("../controllers/userController/sendOtp");
const verifyOtp_1 = require("../controllers/userController/verifyOtp");
const createPassword_1 = require("../controllers/userController/createPassword");
const signIn_1 = require("../controllers/userController/signIn");
const signUp_1 = require("../controllers/userController/signUp");
const router = express_1.default.Router();
// User route
router.post("/signup", signUp_1.signUp);
router.post("/signin", signIn_1.signInController);
router.post("/send-otp", sendOtp_1.sendOtpController);
router.post("/verify-otp", verifyOtp_1.verifyOtpController);
router.post("/create-password", createPassword_1.passwordController);
exports.default = router;
