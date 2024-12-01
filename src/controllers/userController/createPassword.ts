import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import PhoneNumber from "../../models/phoneNumberModel";
import User from "../../models/userModel";
import SignIn from "../../models/signInModel";
import { validatePasswordPayload } from "../../validators/userValidator";


export const passwordController = async (req: Request, res: Response): Promise<void> => {
    try {
        const { error } = validatePasswordPayload(req.body);
        if (error) {
            res.status(400).json({ success: false, message: error.details[0].message });
            return;
        }
        
        const { phoneNumber, password } = req.body;

        // Fetch the phone number record
        const phoneRecord = await PhoneNumber.findOne({ where: { phoneNumber } });
        if (!phoneRecord || !phoneRecord.isVerified) {
            res.status(400).json({ success: false, message: "Phone number is not verified" });
            return;
        }

        // Find the associated user
        const user = await User.findOne({ where: { phoneId: phoneRecord.id } });
        if (!user) {
            res.status(404).json({ success: false, message: "User not found" });
            return;
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Save the sign-in record
        const signInRecord = await SignIn.create({
            userId: user.userId,
            phoneId: phoneRecord.id,
            password: hashedPassword,
        });

        res.status(201).json({
            success: true,
            message: "Password created successfully",
            // data: { signIn: signInRecord },  // If neede to return the data then uncomment
        });
    } catch (error: any) {
        console.error("Error creating sign-in record:", error);
        res.status(500).json({ success: false, message: "An error occurred while creating the sign-in record" });
    }
};
