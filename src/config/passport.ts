import passport from 'passport';
import { Strategy as GoogleStrategy, Profile as GoogleProfile } from 'passport-google-oauth20';
import { Strategy as FacebookStrategy, Profile as FacebookProfile } from 'passport-facebook';
import { Strategy as AppleStrategy, VerifyCallback, Profile as AppleProfile } from 'passport-apple';
import dotenv from "dotenv";
dotenv.config();

// Define the user type
interface OAuthUser { id?: string; name?: string; email?: string; }

// Google Strategy

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    //   clientID: process.env.GOOGLE_CLIENT_ID!,
    //   clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      callbackURL: '/auth/google/callback',
    },
    (accessToken: string, refreshToken: string, profile: GoogleProfile, done: (error: any, user?: OAuthUser) => void) => {
      const { id, displayName, emails } = profile;
      const user: OAuthUser = {
        id,
        name: displayName,
        email: emails?.[0]?.value,
      };
      done(null, user); // Pass the user to the controller
    }
  )
);


// Facebook Strategy

passport.use(
  new FacebookStrategy(
    {
      clientID: process.env.FACEBOOK_APP_ID!,
      clientSecret: process.env.FACEBOOK_APP_SECRET!,
      // callbackURL: '/auth/facebook/callback',
      callbackURL: 'http://localhost:3000/auth/facebook/callback',
      profileFields: ['id', 'displayName', 'emails'], // Ensure email is included
    },
    (accessToken: string, refreshToken: string, profile: FacebookProfile, done: (error: any, user?: OAuthUser) => void) => {
      const { id, displayName, emails } = profile;
      const user: OAuthUser = {
        id,
        name: displayName,
        email: emails?.[0]?.value,
      };
      done(null, user);
    }
  )
);


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


export default passport;
