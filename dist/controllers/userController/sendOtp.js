"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendOtpController = void 0;
const sendOtp_1 = require("../../utils/sendOtp");
const phoneNumberModel_1 = __importDefault(require("../../models/phoneNumberModel"));
const userValidator_1 = require("../../validators/userValidator");
const sendOtpController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { error } = userValidator_1.sendOtpSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }
        const { phoneNumber } = req.body;
        const isRegistered = yield phoneNumberModel_1.default.findOne({
            where: { phoneNumber, register: true },
        });
        if (isRegistered) {
            return res.status(400).json({ success: false, message: "Phone number already registered! Please log in." });
        }
        // Generate OTP
        const otp = (0, sendOtp_1.generateOtp)();
        if (!otp) {
            return res.status(500).json({ message: "Failed to generate OTP" });
        }
        // Send OTP (simulate with true for now)
        // const otpSent = await sendOtp(phoneNumber, otp); // Need to do KYC 
        const otpSent = true; // set true as default
        if (!otpSent) {
            return res.status(500).json({ message: "Failed to send OTP" });
        }
        // Upsert phone number and OTP in the database
        yield phoneNumberModel_1.default.upsert({ phoneNumber, otp });
        return res.status(200).json({ otp, message: "OTP sent successfully" });
    }
    catch (error) {
        console.error("Error in sendOtpController:", error.message || error);
        return res.status(500).json({ message: "An error occurred while processing the request" });
    }
});
exports.sendOtpController = sendOtpController;
