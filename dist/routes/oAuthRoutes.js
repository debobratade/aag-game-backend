"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const googleLogin_1 = require("../controllers/oAuthCotroller/googleLogin");
const facebookLogin_1 = require("../controllers/oAuthCotroller/facebookLogin");
const router = express_1.default.Router();
// Google OAuth
router.get('/google', googleLogin_1.googleAuth);
router.get('/google/callback', googleLogin_1.googleCallback);
// Facebook OAuth 
router.get('/facebook', facebookLogin_1.facebookAuth);
router.get('/facebook/callback', facebookLogin_1.facebookCallback);
// Optionally handle failure routes 
router.get('/auth/facebook/failure', (req, res) => {
    res.status(401).json({ message: 'Facebook authentication failed' });
});
exports.default = router;
