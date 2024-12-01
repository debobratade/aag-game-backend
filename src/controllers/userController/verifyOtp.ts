import { Request, Response } from "express";
import PhoneNumber from "../../models/phoneNumberModel";
import { verifyOtpSchema } from "../../validators/userValidator";


export const verifyOtpController = async (req: Request, res: Response): Promise<any> => {
  try {
    const { error } = verifyOtpSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const { phoneNumber, otp } = req.body;
    const phoneRecord:any = await PhoneNumber.findOne({ where: { phoneNumber } });

    if (!phoneRecord) {
      return res.status(404).json({ message: "Phone number not found" });
    }

    if (phoneRecord.otp !== otp) {
      return res.status(400).json({ message: "Invalid OTP" });
    }

    if (!phoneRecord.isVerified) {
      phoneRecord.isVerified = true;
      await phoneRecord.save();
    }

    return res.status(200).json({ message: "OTP verified successfully" });
  } catch (error: any) {
    console.error("Error verifying OTP:", error.message || error);
    return res.status(500).json({ message: "An error occurred while verifying OTP" });
  }
};
