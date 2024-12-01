"use strict";
// import { Request, Response } from 'express';
// import passport from '../../config/passport';
// import User from '../../models/userModel';
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
exports.facebookCallback = exports.facebookAuth = void 0;
const passport_1 = __importDefault(require("../../config/passport"));
const userModel_1 = __importDefault(require("../../models/userModel"));
const axios_1 = __importDefault(require("axios"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
// Facebook Authentication
exports.facebookAuth = passport_1.default.authenticate('facebook', { scope: ['email'] });
// Facebook Callback
const facebookCallback = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    passport_1.default.authenticate('facebook', (err, user) => __awaiter(void 0, void 0, void 0, function* () {
        if (err || !user) {
            return res.redirect('/auth/facebook/failure'); // Redirect on failure
        }
        try {
            // For testing, use the provided access token directly
            const accessToken = process.env.FACEBOOK_ACCESS_TOKEN;
            // Fetch user details from Facebook using Graph API with Axios
            const facebookRes = yield axios_1.default.get(`https://graph.facebook.com/me`, {
                params: {
                    access_token: accessToken,
                    fields: 'id,name,email,picture',
                },
            });
            const facebookData = facebookRes.data;
            const { id: facebookId, name, email, picture } = facebookData;
            // Check if the user already exists
            let existingUser = yield userModel_1.default.findOne({ where: { email } });
            if (!existingUser) {
                existingUser = yield userModel_1.default.create({
                    facebookId,
                    username: name,
                    email,
                    profilePictureUrl: picture.data.url,
                    isEmailVerified: true,
                });
            }
            // Optionally, generate JWT token or create a session here
            // const token = generateJwtToken(existingUser);
            res.status(200).json({ message: 'Facebook authentication successful', user: existingUser });
        }
        catch (error) {
            console.error('Error during Facebook callback:', error);
            res.status(500).json({ message: 'An error occurred while handling the Facebook callback' });
        }
    }))(req, res);
});
exports.facebookCallback = facebookCallback;
