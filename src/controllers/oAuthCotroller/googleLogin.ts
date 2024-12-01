import { Request, Response } from 'express';
import passport from '../../config/passport';
import User from '../../models/userModel';
import dotenv from "dotenv";
dotenv.config();

// Google Authentication
export const googleAuth = passport.authenticate('google', { scope: ['profile', 'email'] });

// Google Callback
export const googleCallback = (req: Request, res: Response) => {
    passport.authenticate('google', async (err: any, user: any) => {
        if (err || !user) {
            return res.status(401).json({ message: 'Google authentication failed' });
        }

        try {
            const { id: googleId, name, email } = user;

            // Check if the user already exists
            let existingUser = await User.findOne({ where: { googleId } });

            if (!existingUser) {
                // If the user does not exist, create a new user
                existingUser = await User.create({
                    googleId,
                    username: name,
                    email,
                });
            }

            // Optionally, generate JWT token or create a session here
            // const token = generateJwtToken(existingUser);

            res.status(200).json({ message: 'Google authentication successful', user: existingUser });
        } catch (error) {
            console.error('Error saving user:', error);
            res.status(500).json({ message: 'An error occurred while saving user information' });
        }
    })(req, res);
};
