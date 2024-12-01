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
exports.signUp = void 0;
const phoneNumberModel_1 = __importDefault(require("../../models/phoneNumberModel"));
const userModel_1 = __importDefault(require("../../models/userModel"));
const userValidator_1 = require("../../validators/userValidator");
const signUp = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { error } = (0, userValidator_1.validateCreateUserPayload)(req.body);
        if (error) {
            res.status(400).json({ success: false, message: error.details[0].message });
            return;
        }
        const { name, email, phoneNumber } = req.body;
        const phoneRecord = yield phoneNumberModel_1.default.findOne({ where: { phoneNumber } });
        if (!phoneRecord) {
            res.status(404).json({ success: false, message: "Phone number is not exist!" });
            return;
        }
        if (!phoneRecord.isVerified) {
            res.status(400).json({ success: false, message: "Phone number is not verified" });
            return;
        }
        if (phoneRecord.register) {
            res.status(400).json({ success: false, message: "Phone number already register! Do login." });
            return;
        }
        const existingUser = yield userModel_1.default.findOne({ where: { email } });
        if (existingUser) {
            res.status(400).json({ success: false, message: "Email is already in use" });
            return;
        }
        const newUser = yield userModel_1.default.create({
            username: name,
            email,
            phoneId: phoneRecord.id,
        });
        yield phoneNumberModel_1.default.update({ register: true }, { where: { id: phoneRecord.id } });
        res.status(201).json({
            success: true,
            message: "User created successfully",
            data: { user: newUser },
        });
    }
    catch (error) {
        console.error("Error creating user:", error);
        res.status(500).json({ success: false, message: "An error occurred while creating the user" });
    }
});
exports.signUp = signUp;
