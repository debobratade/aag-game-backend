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
exports.signInController = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const phoneNumberModel_1 = __importDefault(require("../../models/phoneNumberModel"));
const userModel_1 = __importDefault(require("../../models/userModel"));
const signInModel_1 = __importDefault(require("../../models/signInModel"));
const signInController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { phoneNumber, password } = req.body;
        if (!phoneNumber || !password) {
            res.status(400).json({ message: "Phone number and password are required" });
            return;
        }
        const phoneRecord = yield phoneNumberModel_1.default.findOne({ where: { phoneNumber } });
        if (!phoneRecord || !phoneRecord.isVerified) {
            res.status(400).json({ message: "Phone number is not verified" });
            return;
        }
        const user = yield userModel_1.default.findOne({ where: { phoneId: phoneRecord.id } });
        if (!user) {
            res.status(400).json({ message: "User not found" });
            return;
        }
        const signInRecord = yield signInModel_1.default.findOne({ where: { userId: user.userId } });
        if (!signInRecord) {
            res.status(400).json({ message: "Sign-in record not found" });
            return;
        }
        const isMatch = yield bcryptjs_1.default.compare(password, signInRecord.password);
        if (!isMatch) {
            res.status(401).json({ message: "Invalid password" });
            return;
        }
        // Generate JWT token
        const token = jsonwebtoken_1.default.sign({ id: user.userId }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.status(200).json({ message: "Login successful", token });
    }
    catch (error) {
        console.error("Error during sign-in:", error);
        res.status(500).json({ message: "An error occurred while signing in" });
    }
});
exports.signInController = signInController;
