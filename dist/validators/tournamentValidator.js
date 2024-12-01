"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.tournamentUpdateValidator = exports.tournamentCreateValidator = void 0;
const joi_1 = __importDefault(require("joi"));
// Validator to create tournament
exports.tournamentCreateValidator = joi_1.default.object({
    name: joi_1.default.string().required(),
    description: joi_1.default.string().optional(),
    entry_fee: joi_1.default.number().min(0).optional(),
    start_time: joi_1.default.date().iso().required(),
    end_time: joi_1.default.date().iso().greater(joi_1.default.ref('start_time')).required(),
    prize_distribution: joi_1.default.object({
        "1st_place": joi_1.default.string().optional(),
        "2nd_place": joi_1.default.string().optional(),
        "3rd_place": joi_1.default.string().optional(),
    }).optional(),
});
// Validator to update tournament
exports.tournamentUpdateValidator = joi_1.default.object({
    name: joi_1.default.string().optional(), // Allow name to be optional, but validate if provided
    description: joi_1.default.string().optional(),
    entry_fee: joi_1.default.number().optional(),
    start_time: joi_1.default.date().iso().optional(),
    end_time: joi_1.default.date().iso().optional(),
    prize_distribution: joi_1.default.object({
        "1st_place": joi_1.default.number().optional(),
        "2nd_place": joi_1.default.number().optional(),
        "3rd_place": joi_1.default.number().optional()
    }).optional(),
});
