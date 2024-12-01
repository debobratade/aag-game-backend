import { Request, Response } from "express";
import { generateOtp, sendOtp } from "../../utils/sendOtp";
import PhoneNumber from "../../models/phoneNumberModel";
import { sendOtpSchema } from "../../validators/userValidator";


export const sendOtpController = async (req: Request, res: Response): Promise<any> => {
  try {
    const { error } = sendOtpSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const { phoneNumber } = req.body;

    const isRegistered = await PhoneNumber.findOne({
      where: { phoneNumber, register: true },
    });

    if (isRegistered) {
      return res.status(400).json({ success: false, message: "Phone number already registered! Please log in." });
    }

    // Generate OTP
    const otp = generateOtp();

    if (!otp) {
      return res.status(500).json({ message: "Failed to generate OTP" });
    }

    // Send OTP (simulate with true for now)
    // const otpSent = await sendOtp(phoneNumber, otp); // Need to do KYC 
    const otpSent = true // set true as default
    if (!otpSent) {
      return res.status(500).json({ message: "Failed to send OTP" });
    }

    // Upsert phone number and OTP in the database
    await PhoneNumber.upsert({ phoneNumber, otp });

    return res.status(200).json({ otp, message: "OTP sent successfully" });
  } catch (error: any) {
    console.error("Error in sendOtpController:", error.message || error);
    return res.status(500).json({ message: "An error occurred while processing the request" });
  }
};
