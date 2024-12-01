"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendOtp = exports.generateOtp = void 0;
const crypto_1 = __importDefault(require("crypto"));
const axios_1 = __importDefault(require("axios"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const API_KEY = process.env.FAST2SMS_API_key || '';
// Function to generate a 4-digit OTP
const generateOtp = () => {
    return crypto_1.default.randomInt(1000, 9999).toString();
};
exports.generateOtp = generateOtp;
// Function to send OTP Fast2sms
const sendOtp = (phoneNumber, otp) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Construct the API endpoint
        const url = 'https://www.fast2sms.com/dev/bulkV2';
        // Prepare the data to be sent in the request
        const data = new URLSearchParams();
        data.append('variables_values', otp); // OTP value
        data.append('route', 'otp'); // OTP route
        data.append('numbers', phoneNumber); // Phone number to send OTP
        data.append('flash', '0'); // Optional: '0' for regular SMS
        // Send POST request to Fast2SMS API
        const response = yield axios_1.default.post(url, data, {
            headers: {
                'authorization': API_KEY
            }
        });
        // Return true if OTP was sent successfully
        return response.data.return;
    }
    catch (error) {
        console.error('Error sending OTP:', error);
        return false; // Return false if an error occurred
    }
});
exports.sendOtp = sendOtp;
