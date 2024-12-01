import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import PhoneNumber from "../../models/phoneNumberModel";
import User from "../../models/userModel";
import SignIn from "../../models/signInModel";

export const signInController = async (req: Request, res: Response): Promise<void> => {
    try {
        const { phoneNumber, password } = req.body;

        if (!phoneNumber || !password) {
            res.status(400).json({ message: "Phone number and password are required" });
            return;
        }
        const phoneRecord = await PhoneNumber.findOne({ where: { phoneNumber } });

        if (!phoneRecord || !phoneRecord.isVerified) {
            res.status(400).json({ message: "Phone number is not verified" });
            return;
        }

        const user = await User.findOne({ where: { phoneId: phoneRecord.id } });

        if (!user) {
            res.status(400).json({ message: "User not found" });
            return;
        }

        const signInRecord = await SignIn.findOne({ where: { userId: user.userId } });

        if (!signInRecord) {
            res.status(400).json({ message: "Sign-in record not found" });
            return;
        }

        const isMatch = await bcrypt.compare(password, signInRecord.password);
        if (!isMatch) {
            res.status(401).json({ message: "Invalid password" });
            return;
        }

        // Generate JWT token
        const token = jwt.sign({ id: user.userId }, process.env.JWT_SECRET!, { expiresIn: '1h' });

        res.status(200).json({ message: "Login successful", token });
    } catch (error: any) {
        console.error("Error during sign-in:", error);
        res.status(500).json({ message: "An error occurred while signing in" });
    }
};
