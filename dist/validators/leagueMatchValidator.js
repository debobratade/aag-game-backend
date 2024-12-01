"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateCreateMatch = void 0;
const joi_1 = __importDefault(require("joi"));
exports.validateCreateMatch = joi_1.default.object({
    team1Id: joi_1.default.number().integer().required().messages({
        'number.base': '"team1Id" must be a number',
        'number.integer': '"team1Id" must be an integer',
        'any.required': '"team1Id" is required',
    }),
    team2Id: joi_1.default.number().integer().required().messages({
        'number.base': '"team2Id" must be a number',
        'number.integer': '"team2Id" must be an integer',
        'any.required': '"team2Id" is required',
    }),
    start_time: joi_1.default.date()
        .iso()
        .greater('now')
        .required()
        .messages({
        'date.base': '"start_time" must be a valid ISO date',
        'date.greater': '"start_time" must be in the future',
        'any.required': '"start_time" is required',
    }),
    end_time: joi_1.default.date()
        .iso()
        .greater(joi_1.default.ref('start_time'))
        .required()
        .messages({
        'date.base': '"end_time" must be a valid ISO date',
        'date.greater': '"end_time" must be after "start_time" and in the future',
        'any.required': '"end_time" is required',
    }),
    result: joi_1.default.string().optional().messages({
        'string.base': '"result" must be a string',
    }),
});
