// import { Request, Response } from 'express';
// import passport from '../../config/passport';
// import User from '../../models/userModel';

// // Facebook Authentication
// export const facebookAuth = passport.authenticate('facebook', { scope: ['email'] });

// // Facebook Callback
// export const facebookCallback = (req: Request, res: Response) => {
//   passport.authenticate('facebook', async (err:any, user:any) => {
//     if (err || !user) {
//       return res.redirect('/auth/facebook/failure'); // Redirect on failure
//     }

//     try {
//       const { id: facebookId, displayName: name, emails } = user;

//       // Check if the user already exists
//       let existingUser = await User.findOne({ where: { facebookId } });

//       if (!existingUser) {
//         // If the user does not exist, create a new user
//         existingUser = await User.create({
//           facebookId,
//           username: name,
//           email: emails?.[0]?.value,
//         });
//       }

//       // Optionally, generate JWT token or create a session here
//       // const token = generateJwtToken(existingUser);

//       res.redirect('/profile'); // Redirect to the profile page on success
//     } catch (error) {
//       console.error('Error saving user:', error);
//       res.status(500).json({ message: 'An error occurred while saving user information' });
//     }
//   })(req, res);
// };


import { Request, Response } from 'express';
import passport from '../../config/passport';
import User from '../../models/userModel';
import axios from 'axios'; 
import dotenv from "dotenv";
dotenv.config();

// Facebook Authentication
export const facebookAuth = passport.authenticate('facebook', { scope: ['email'] });

// Facebook Callback
export const facebookCallback = async (req: Request, res: Response) => {
  passport.authenticate('facebook', async (err: any, user: any) => {
    if (err || !user) {
      return res.redirect('/auth/facebook/failure'); // Redirect on failure
    }

    try {
      // For testing, use the provided access token directly
      const accessToken = process.env.FACEBOOK_ACCESS_TOKEN

      // Fetch user details from Facebook using Graph API with Axios
      const facebookRes = await axios.get(`https://graph.facebook.com/me`, {
        params: {
          access_token: accessToken,
          fields: 'id,name,email,picture',
        },
      });

      const facebookData = facebookRes.data;
      const { id: facebookId, name, email, picture } = facebookData;

      // Check if the user already exists
      let existingUser = await User.findOne({ where: { email } });

      if (!existingUser) {
        existingUser = await User.create({
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
    } catch (error) {
      console.error('Error during Facebook callback:', error);
      res.status(500).json({ message: 'An error occurred while handling the Facebook callback' });
    }
  })(req, res);
};
