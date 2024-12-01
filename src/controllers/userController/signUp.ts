import { Request, Response } from "express";
import PhoneNumber from "../../models/phoneNumberModel";
import User from "../../models/userModel";
import { validateCreateUserPayload } from "../../validators/userValidator";

export const signUp = async (req: Request, res: Response): Promise<any> => {
  try {
    const { error } = validateCreateUserPayload(req.body);
    if (error) {
      res.status(400).json({ success: false, message: error.details[0].message });
      return;
    }

    const { name, email, phoneNumber } = req.body;
    const phoneRecord: any = await PhoneNumber.findOne({ where: { phoneNumber } });
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

    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      res.status(400).json({ success: false, message: "Email is already in use" });
      return;
    }

    const newUser = await User.create({
      username: name,
      email,
      phoneId: phoneRecord.id,
    });

    await PhoneNumber.update(
      { register: true },
      { where: { id: phoneRecord.id } }
    );

    res.status(201).json({
      success: true,
      message: "User created successfully",
      data: { user: newUser },
    });
  } catch (error: any) {
    console.error("Error creating user:", error);
    res.status(500).json({ success: false, message: "An error occurred while creating the user" });
  }
};
