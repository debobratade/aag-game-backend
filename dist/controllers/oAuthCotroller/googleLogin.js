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
exports.googleCallback = exports.googleAuth = void 0;
const passport_1 = __importDefault(require("../../config/passport"));
const userModel_1 = __importDefault(require("../../models/userModel"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
// Google Authentication
exports.googleAuth = passport_1.default.authenticate('google', { scope: ['profile', 'email'] });
// Google Callback
const googleCallback = (req, res) => {
    passport_1.default.authenticate('google', (err, user) => __awaiter(void 0, void 0, void 0, function* () {
        if (err || !user) {
            return res.status(401).json({ message: 'Google authentication failed' });
        }
        try {
            const { id: googleId, name, email } = user;
            // Check if the user already exists
            let existingUser = yield userModel_1.default.findOne({ where: { googleId } });
            if (!existingUser) {
                // If the user does not exist, create a new user
                existingUser = yield userModel_1.default.create({
                    googleId,
                    username: name,
                    email,
                });
            }
            // Optionally, generate JWT token or create a session here
            // const token = generateJwtToken(existingUser);
            res.status(200).json({ message: 'Google authentication successful', user: existingUser });
        }
        catch (error) {
            console.error('Error saving user:', error);
            res.status(500).json({ message: 'An error occurred while saving user information' });
        }
    }))(req, res);
};
exports.googleCallback = googleCallback;
