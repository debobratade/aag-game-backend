"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateEntryInputs = void 0;
const joi_1 = __importDefault(require("joi"));
// Validate the tournamentId and userId for entry
const validateEntryInputs = (tournamentId, userId) => {
    const schema = joi_1.default.object({
        tournamentId: joi_1.default.number().integer().positive().required().messages({
            'number.base': '"tournamentId" should be a number',
            'number.integer': '"tournamentId" should be an integer',
            'number.positive': '"tournamentId" should be a positive number',
            'any.required': '"tournamentId" is required'
        }),
        userId: joi_1.default.number().integer().positive().required().messages({
            'number.base': '"userId" should be a number',
            'number.integer': '"userId" should be an integer',
            'number.positive': '"userId" should be a positive number',
            'any.required': '"userId" is required'
        })
    });
    return schema.validate({ tournamentId, userId });
};
exports.validateEntryInputs = validateEntryInputs;
