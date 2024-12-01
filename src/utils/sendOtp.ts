import crypto from "crypto";
import axios from 'axios';
import dotenv from "dotenv";
dotenv.config();

const API_KEY: string = process.env.FAST2SMS_API_key || '';

// Function to generate a 4-digit OTP
export const generateOtp = (): string => {
  return crypto.randomInt(1000, 9999).toString(); 
};

// Mock function to send OTP and return a boolean indicating success

// Type for the response from the Fast2SMS API
interface Fast2SMSResponse {
  return: boolean;
  request_id: string;
  message: string[];
}

// Function to send OTP Fast2sms
export const sendOtp = async (phoneNumber: string, otp: string): Promise<boolean> => {
  try {
    // Construct the API endpoint
    const url: string = 'https://www.fast2sms.com/dev/bulkV2';

    // Prepare the data to be sent in the request
    const data = new URLSearchParams();
    data.append('variables_values', otp);  // OTP value
    data.append('route', 'otp');            // OTP route
    data.append('numbers', phoneNumber);   // Phone number to send OTP
    data.append('flash', '0');              // Optional: '0' for regular SMS

    // Send POST request to Fast2SMS API
    const response = await axios.post<Fast2SMSResponse>(url, data, {
      headers: {
        'authorization': API_KEY
      }
    });

    // Return true if OTP was sent successfully
    return response.data.return;
  } catch (error) {
    console.error('Error sending OTP:', error);
    return false; // Return false if an error occurred
  }
};




