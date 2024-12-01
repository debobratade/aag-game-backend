import Joi from "joi";

// Validator for password creation
export const validatePasswordPayload = (payload: object) => {
    const schema = Joi.object({
        phoneNumber: Joi.string().pattern(/^\d+$/).required().messages({
            "string.empty": "Phone number is required",
            "string.pattern.base": "Phone number must be numeric",
        }),
        password: Joi.string().min(6).required().messages({
            "string.empty": "Password is required",
            "string.min": "Password must be at least 6 characters",
        }),
    });

    return schema.validate(payload);
};


// Validator for creating a user
export const validateCreateUserPayload = (payload: object) => {
    const schema = Joi.object({
        name: Joi.string().min(2).required().messages({
            "string.empty": "Name is required",
            "string.min": "Name must be at least 2 characters",
        }),
        email: Joi.string().email().required().messages({
            "string.empty": "Email is required",
            "string.email": "Email must be a valid email address",
        }),
        phoneNumber: Joi.string().pattern(/^\d+$/).required().messages({
            "string.empty": "Phone number is required",
            "string.pattern.base": "Phone number must be numeric",
        }),
    });

    return schema.validate(payload);
};


// Validator for phone number
export const sendOtpSchema = Joi.object({
    phoneNumber: Joi.string()
        .pattern(/^[0-9]+$/)
        .length(10)
        .required()
        .messages({
            "string.base": "Phone number must be a string.",
            "string.pattern.base": "Phone number must only contain numeric characters.",
            "string.length": "Phone number must be exactly 10 digits.",
            "any.required": "Phone number is required.",
        }),
});


// Validator for OTP verification
export const verifyOtpSchema = Joi.object({
    phoneNumber: Joi.string()
        .pattern(/^[0-9]+$/)
        .length(10)
        .required()
        .messages({
            "string.base": "Phone number must be a string.",
            "string.pattern.base": "Phone number must only contain numeric characters.",
            "string.length": "Phone number must be exactly 10 digits.",
            "any.required": "Phone number is required.",
        }),
    otp: Joi.string()
        .pattern(/^[0-9]+$/)
        .length(4)
        .required()
        .messages({
            "string.base": "OTP must be a string.",
            "string.pattern.base": "OTP must only contain numeric characters.",
            "string.length": "OTP must be exactly 4 digits.",
            "any.required": "OTP is required.",
        }),
});