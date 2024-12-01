import crypto from 'crypto';
import https from 'https';

// Constants
const HOSTNAME = 'd93xy1.api.infobip.com';
const AUTHORIZATION_HEADER = 'App ce93de69f13d09d2f670d5ed4d86f92f-2e3c99e0-8a43-4913-ae8a-bfa8e01e2e06'; // Replace with your actual API key

// Function to generate OTP
export const generateOtp = (): string => {
  return crypto.randomInt(1000, 9999).toString();
};

// Function to create a 2FA application
const create2FAApplication = async (appName: string): Promise<string> => {
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
    const req = https.request(options, (res) => {
      let responseBody = '';

      res.on('data', (chunk) => {
        responseBody += chunk;
      });

      res.on('end', () => {
        try {
          const response = JSON.parse(responseBody);
          if (res.statusCode === 201 && response.applicationId) {
            resolve(response.applicationId);
          } else {
            reject(new Error(response.message || 'Failed to create 2FA application.'));
          }
        } catch (error) {
          reject(new Error('Failed to parse response from Infobip API.'));
        }
      });
    });

    req.on('error', reject);
    req.write(requestBody);
    req.end();
  });
};

// Function to create a message template
const createMessageTemplate = async (appId: string): Promise<string> => {
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
      const req = https.request(options, (res) => {
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
            } else {
              console.error('Error creating message template:', response);
              reject(new Error(response.message || 'Failed to create message template.'));
            }
          } catch (error) {
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
  };

// Function to deliver OTP
const deliverOTP = async (applicationId: string, messageId: string, phoneNumber: string, otp: string): Promise<void> => {
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
    const req = https.request(options, (res) => {
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
          } else {
            reject(new Error(response.message || 'Failed to deliver OTP.'));
          }
        } catch (error) {
          reject(new Error('Failed to parse response from Infobip API.'));
        }
      });
    });

    req.on('error', reject);
    req.write(postData);
    req.end();
  });
};

// Main function to orchestrate the process
export const sendOtp = async (phoneNumber: string): Promise<void> => {
  try {
    const otp = generateOtp();
    const applicationId = await create2FAApplication('My 2FA App');
    console.log(`Application ID: ${applicationId}`);
    const messageId = await createMessageTemplate(applicationId);
    console.log(`Message Template ID: ${messageId}`);
    await deliverOTP(applicationId, messageId, phoneNumber, otp);
  } catch (error: any) {
    console.error('Error sending OTP:', error.message);
  }
};

// Example usage
sendOtp('9609600699') // Replace with the recipient's phone number
  .then(() => console.log('OTP sent successfully.'))
  .catch((error) => console.error(error.message));
