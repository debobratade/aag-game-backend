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
exports.verifyOtpController = void 0;
const phoneNumberModel_1 = __importDefault(require("../../models/phoneNumberModel"));
const userValidator_1 = require("../../validators/userValidator");
const verifyOtpController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { error } = userValidator_1.verifyOtpSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }
        const { phoneNumber, otp } = req.body;
        const phoneRecord = yield phoneNumberModel_1.default.findOne({ where: { phoneNumber } });
        if (!phoneRecord) {
            return res.status(404).json({ message: "Phone number not found" });
        }
        if (phoneRecord.otp !== otp) {
            return res.status(400).json({ message: "Invalid OTP" });
        }
        if (!phoneRecord.isVerified) {
            phoneRecord.isVerified = true;
            yield phoneRecord.save();
        }
        return res.status(200).json({ message: "OTP verified successfully" });
    }
    catch (error) {
        console.error("Error verifying OTP:", error.message || error);
        return res.status(500).json({ message: "An error occurred while verifying OTP" });
    }
});
exports.verifyOtpController = verifyOtpController;
