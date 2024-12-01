"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const passport_1 = __importDefault(require("passport"));
const passport_google_oauth20_1 = require("passport-google-oauth20");
const passport_facebook_1 = require("passport-facebook");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
// Google Strategy
passport_1.default.use(new passport_google_oauth20_1.Strategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    //   clientID: process.env.GOOGLE_CLIENT_ID!,
    //   clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    callbackURL: '/auth/google/callback',
}, (accessToken, refreshToken, profile, done) => {
    var _a;
    const { id, displayName, emails } = profile;
    const user = {
        id,
        name: displayName,
        email: (_a = emails === null || emails === void 0 ? void 0 : emails[0]) === null || _a === void 0 ? void 0 : _a.value,
    };
    done(null, user); // Pass the user to the controller
}));
// Facebook Strategy
passport_1.default.use(new passport_facebook_1.Strategy({
    clientID: process.env.FACEBOOK_APP_ID,
    clientSecret: process.env.FACEBOOK_APP_SECRET,
    // callbackURL: '/auth/facebook/callback',
    callbackURL: 'http://localhost:3000/auth/facebook/callback',
    profileFields: ['id', 'displayName', 'emails'], // Ensure email is included
}, (accessToken, refreshToken, profile, done) => {
    var _a;
    const { id, displayName, emails } = profile;
    const user = {
        id,
        name: displayName,
        email: (_a = emails === null || emails === void 0 ? void 0 : emails[0]) === null || _a === void 0 ? void 0 : _a.value,
    };
    done(null, user);
}));
// // Apple Strategy
// passport.use(
//   new AppleStrategy(
//     {
//       clientID: process.env.APPLE_CLIENT_ID!,
//       teamID: process.env.APPLE_TEAM_ID!,
//       keyID: process.env.APPLE_KEY_ID!,
//       privateKeyString: process.env.APPLE_PRIVATE_KEY!,
//       callbackURL: '/auth/apple/callback',
//       passReqToCallback: true, // Pass the request object
//     },
//     (
//       req: Express.Request,
//       accessToken: string,
//       refreshToken: string,
//       idToken: any,
//       profile: AppleProfile,
//       done: VerifyCallback
//     ) => {
//       try {
//         const user = {
//           id: profile.id,
//           name: profile.displayName || '',
//           email: profile.email || '',
//         };
//         return done(null, user);
//       } catch (err: any) {
//         return done(err);
//       }
//     }
//   )
// );
exports.default = passport_1.default;
