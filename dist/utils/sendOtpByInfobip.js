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
const https_1 = __importDefault(require("https"));
// Constants
const HOSTNAME = 'd93xy1.api.infobip.com';
const AUTHORIZATION_HEADER = 'App ce93de69f13d09d2f670d5ed4d86f92f-2e3c99e0-8a43-4913-ae8a-bfa8e01e2e06'; // Replace with your actual API key
// Function to generate OTP
const generateOtp = () => {
    return crypto_1.default.randomInt(1000, 9999).toString();
};
exports.generateOtp = generateOtp;
// Function to create a 2FA application
const create2FAApplication = (appName) => __awaiter(void 0, void 0, void 0, function* () {
    const options = {
        hostname: HOSTNAME,
        path: '/2fa/2/applications',
        method: 'POST',
        headers: {
            Authorization: AUTHORIZATION_HEADER,
            'Content-Type': 'application/json',
            Accept: 'application/json',
        },
    };
    const requestBody = JSON.stringify({
        name: appName,
        enabled: true,
        configuration: {
            pinAttempts: 10,
            allowMultiplePinVerifications: true,
            pinTimeToLive: '15m',
            verifyPinLimit: '1/3s',
            sendPinPerApplicationLimit: '100/1d',
            sendPinPerPhoneNumberLimit: '10/1d',
        },
    });
    return new Promise((resolve, reject) => {
        const req = https_1.default.request(options, (res) => {
            let responseBody = '';
            res.on('data', (chunk) => {
                responseBody += chunk;
            });
            res.on('end', () => {
                try {
                    const response = JSON.parse(responseBody);
                    if (res.statusCode === 201 && response.applicationId) {
                        resolve(response.applicationId);
                    }
                    else {
                        reject(new Error(response.message || 'Failed to create 2FA application.'));
                    }
                }
                catch (error) {
                    reject(new Error('Failed to parse response from Infobip API.'));
                }
            });
        });
        req.on('error', reject);
        req.write(requestBody);
        req.end();
    });
});
// Function to create a message template
const createMessageTemplate = (appId) => __awaiter(void 0, void 0, void 0, function* () {
    const options = {
        hostname: HOSTNAME,
        path: `/2fa/2/applications/${appId}/messages`,
        method: 'POST',
        headers: {
            Authorization: AUTHORIZATION_HEADER,
            'Content-Type': 'application/json',
            Accept: 'application/json',
        },
    };
    const postData = JSON.stringify({
        messageText: 'Your OTP is: {{pin}}',
        pinLength: 4, // Length of the PIN
        pinType: 'NUMERIC', // Type of PIN
        language: 'en', // Message language
        regional: {
            indiaDlt: {
                contentTemplateId: '<contentTemplateId>', // Replace with your DLT content template ID
                principalEntityId: '<principalEntityId>', // Replace with your DLT principal entity ID
            },
        },
        senderId: 'YourService', // Replace with your service sender ID
    });
    return new Promise((resolve, reject) => {
        const req = https_1.default.request(options, (res) => {
            let responseBody = '';
            res.on('data', (chunk) => {
                responseBody += chunk;
            });
            res.on('end', () => {
                try {
                    const response = JSON.parse(responseBody);
                    if (res.statusCode === 201 && response.messageId) {
                        console.log('Message template created successfully:', response);
                        resolve(response.messageId);
                    }
                    else {
                        console.error('Error creating message template:', response);
                        reject(new Error(response.message || 'Failed to create message template.'));
                    }
                }
                catch (error) {
                    reject(new Error('Failed to parse response from Infobip API.'));
                }
            });
        });
        req.on('error', (error) => {
            reject(error);
        });
        req.write(postData);
        req.end();
    });
});
// Function to deliver OTP
const deliverOTP = (applicationId, messageId, phoneNumber, otp) => __awaiter(void 0, void 0, void 0, function* () {
    const options = {
        hostname: HOSTNAME,
        path: '/2fa/2/pin',
        method: 'POST',
        headers: {
            Authorization: AUTHORIZATION_HEADER,
            'Content-Type': 'application/json',
            Accept: 'application/json',
        },
    };
    const postData = JSON.stringify({
        applicationId,
        messageId,
        from: '7001952981', // Replace with your sender number
        to: phoneNumber,
    });
    return new Promise((resolve, reject) => {
        const req = https_1.default.request(options, (res) => {
            let responseBody = '';
            res.on('data', (chunk) => {
                responseBody += chunk;
            });
            res.on('end', () => {
                try {
                    const response = JSON.parse(responseBody);
                    if (res.statusCode === 201 && response.pinId) {
                        console.log(`OTP ${otp} sent successfully to ${phoneNumber}`);
                        resolve();
                    }
                    else {
                        reject(new Error(response.message || 'Failed to deliver OTP.'));
                    }
                }
                catch (error) {
                    reject(new Error('Failed to parse response from Infobip API.'));
                }
            });
        });
        req.on('error', reject);
        req.write(postData);
        req.end();
    });
});
// Main function to orchestrate the process
const sendOtp = (phoneNumber) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const otp = (0, exports.generateOtp)();
        const applicationId = yield create2FAApplication('My 2FA App');
        console.log(`Application ID: ${applicationId}`);
        const messageId = yield createMessageTemplate(applicationId);
        console.log(`Message Template ID: ${messageId}`);
        yield deliverOTP(applicationId, messageId, phoneNumber, otp);
    }
    catch (error) {
        console.error('Error sending OTP:', error.message);
    }
});
exports.sendOtp = sendOtp;
// Example usage
(0, exports.sendOtp)('9609600699') // Replace with the recipient's phone number
    .then(() => console.log('OTP sent successfully.'))
    .catch((error) => console.error(error.message));
