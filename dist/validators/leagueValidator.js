"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateGetLeaguesQuery = exports.validateCreateLeague = void 0;
const Joi = __importStar(require("joi"));
// Validation schema for creating a new league
exports.validateCreateLeague = Joi.object({
    name: Joi.string().min(3).max(100).required().messages({
        'string.base': 'name should be a type of text',
        'string.empty': 'name cannot be empty',
        'string.min': 'name should have at least 3 characters',
        'string.max': 'name should not exceed 100 characters',
        'any.required': 'name is a required field',
    }),
    entry_fee: Joi.number().positive().precision(2).required().messages({
        'number.base': 'entry_fee must be a valid number',
        'number.positive': 'entry_fee must be a positive number',
        'number.precision': 'entry_fee must have up to 2 decimal places',
        'any.required': 'entry_fee is a required field',
    }),
    start_time: Joi.date().iso().min('now').required().messages({
        'date.base': 'start_time must be a valid date',
        'date.iso': 'start_time must be in ISO 8601 format',
        'date.min': 'start_time must not be in the past',
        'any.required': 'start_time is a required field',
    }),
    end_time: Joi.date().iso().greater(Joi.ref('start_time')).required().messages({
        'date.base': 'end_time must be a valid date',
        'date.iso': 'end_time must be in ISO 8601 format',
        'date.greater': 'end_time must be later than start_time',
        'any.required': 'end_time is a required field',
    }),
});
//  validating query parameters
exports.validateGetLeaguesQuery = Joi.object({
    page: Joi.number().integer().min(1).optional(),
    limit: Joi.number().integer().min(1).optional(),
    name: Joi.string().optional(),
    sortBy: Joi.string().valid('start_time', 'end_time', 'name').optional(),
    order: Joi.string().valid('ASC', 'DESC').optional(),
});
