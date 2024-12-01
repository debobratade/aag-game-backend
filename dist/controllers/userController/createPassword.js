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
exports.passwordController = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const phoneNumberModel_1 = __importDefault(require("../../models/phoneNumberModel"));
const userModel_1 = __importDefault(require("../../models/userModel"));
const signInModel_1 = __importDefault(require("../../models/signInModel"));
const userValidator_1 = require("../../validators/userValidator");
const passwordController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { error } = (0, userValidator_1.validatePasswordPayload)(req.body);
        if (error) {
            res.status(400).json({ success: false, message: error.details[0].message });
            return;
        }
        const { phoneNumber, password } = req.body;
        // Fetch the phone number record
        const phoneRecord = yield phoneNumberModel_1.default.findOne({ where: { phoneNumber } });
        if (!phoneRecord || !phoneRecord.isVerified) {
            res.status(400).json({ success: false, message: "Phone number is not verified" });
            return;
        }
        // Find the associated user
        const user = yield userModel_1.default.findOne({ where: { phoneId: phoneRecord.id } });
        if (!user) {
            res.status(404).json({ success: false, message: "User not found" });
            return;
        }
        // Hash the password
        const hashedPassword = yield bcryptjs_1.default.hash(password, 10);
        // Save the sign-in record
        const signInRecord = yield signInModel_1.default.create({
            userId: user.userId,
            phoneId: phoneRecord.id,
            password: hashedPassword,
        });
        res.status(201).json({
            success: true,
            message: "Password created successfully",
            // data: { signIn: signInRecord },  // If neede to return the data then uncomment
        });
    }
    catch (error) {
        console.error("Error creating sign-in record:", error);
        res.status(500).json({ success: false, message: "An error occurred while creating the sign-in record" });
    }
});
exports.passwordController = passwordController;
