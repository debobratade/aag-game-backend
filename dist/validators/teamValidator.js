"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateCreateTeam = void 0;
const joi_1 = __importDefault(require("joi"));
exports.validateCreateTeam = joi_1.default.object({
    name: joi_1.default.string().min(1).max(100).required().messages({
        'string.base': '"name" must be a string',
        'string.empty': '"name" cannot be empty',
        'string.min': '"name" must be at least 1 character long',
        'string.max': '"name" must not exceed 100 characters',
        'any.required': '"name" is required',
    }),
    userId: joi_1.default.number().integer().required().messages({
        'number.base': '"userId" must be a number',
        'number.integer': '"userId" must be an integer',
        'any.required': '"userId" is required',
    }),
});
