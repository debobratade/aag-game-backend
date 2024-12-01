"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resultValidationSchema = exports.matchIdValidationSchema = exports.tournamentIdValidationSchema = exports.matchValidationSchemaForTournament = void 0;
const joi_1 = __importDefault(require("joi"));
exports.matchValidationSchemaForTournament = joi_1.default.object({
    team1Id: joi_1.default.number().integer().positive().required().messages({
        'number.base': 'Team1 ID must be a positive number.',
        'number.integer': 'Team1 ID must be an integer.',
        'any.required': 'Team1 ID is required.',
    }),
    team2Id: joi_1.default.number().integer().positive().required().messages({
        'number.base': 'Team2 ID must be a positive number.',
        'number.integer': 'Team2 ID must be an integer.',
        'any.required': 'Team2 ID is required.',
    }),
    start_time: joi_1.default.date().iso().required().messages({
        'date.base': 'Start time must be a valid date.',
        'any.required': 'Start time is required.',
        'date.format': 'Start time must be in ISO 8601 format.',
    }),
    end_time: joi_1.default.date().iso().required().greater(joi_1.default.ref('start_time')).messages({
        'date.base': 'End time must be a valid date.',
        'any.required': 'End time is required.',
        'date.format': 'End time must be in ISO 8601 format.',
        'date.greater': 'End time must be later than start time.',
    }),
});
exports.tournamentIdValidationSchema = joi_1.default.object({
    tournamentId: joi_1.default.number().integer().positive().required().messages({
        'number.base': 'Tournament ID must be a positive number.',
        'number.integer': 'Tournament ID must be an integer.',
        'any.required': 'Tournament ID is required.',
    }),
});
exports.matchIdValidationSchema = joi_1.default.object({
    matchId: joi_1.default.number().integer().positive().required().messages({
        'number.base': 'Match ID must be a positive number.',
        'number.integer': 'Match ID must be an integer.',
        'any.required': 'Match ID is required.',
    }),
});
exports.resultValidationSchema = joi_1.default.object({
    result: joi_1.default.string().trim().min(3).required().messages({
        'string.base': 'Result must be a string.',
        'string.empty': 'Result cannot be empty.',
        'string.min': 'Result must be at least 3 characters long.',
        'any.required': 'Result is required.',
    }),
});
