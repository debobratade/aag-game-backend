"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyOtpSchema = exports.sendOtpSchema = exports.validateCreateUserPayload = exports.validatePasswordPayload = void 0;
const joi_1 = __importDefault(require("joi"));
// Validator for password creation
const validatePasswordPayload = (payload) => {
    const schema = joi_1.default.object({
        phoneNumber: joi_1.default.string().pattern(/^\d+$/).required().messages({
            "string.empty": "Phone number is required",
            "string.pattern.base": "Phone number must be numeric",
        }),
        password: joi_1.default.string().min(6).required().messages({
            "string.empty": "Password is required",
            "string.min": "Password must be at least 6 characters",
        }),
    });
    return schema.validate(payload);
};
exports.validatePasswordPayload = validatePasswordPayload;
// Validator for creating a user
const validateCreateUserPayload = (payload) => {
    const schema = joi_1.default.object({
        name: joi_1.default.string().min(2).required().messages({
            "string.empty": "Name is required",
            "string.min": "Name must be at least 2 characters",
        }),
        email: joi_1.default.string().email().required().messages({
            "string.empty": "Email is required",
            "string.email": "Email must be a valid email address",
        }),
        phoneNumber: joi_1.default.string().pattern(/^\d+$/).required().messages({
            "string.empty": "Phone number is required",
            "string.pattern.base": "Phone number must be numeric",
        }),
    });
    return schema.validate(payload);
};
exports.validateCreateUserPayload = validateCreateUserPayload;
// Validator for phone number
exports.sendOtpSchema = joi_1.default.object({
    phoneNumber: joi_1.default.string()
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
exports.verifyOtpSchema = joi_1.default.object({
    phoneNumber: joi_1.default.string()
        .pattern(/^[0-9]+$/)
        .length(10)
        .required()
        .messages({
        "string.base": "Phone number must be a string.",
        "string.pattern.base": "Phone number must only contain numeric characters.",
        "string.length": "Phone number must be exactly 10 digits.",
        "any.required": "Phone number is required.",
    }),
    otp: joi_1.default.string()
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
