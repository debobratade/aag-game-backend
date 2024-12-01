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
exports.updateMatchResult = void 0;
const matchModel_1 = __importDefault(require("../../../models/league/matchModel"));
const joi_1 = __importDefault(require("joi"));
// Validation schema for the result
const resultSchema = joi_1.default.object({
    result: joi_1.default.string()
        .valid("Team 1 Won", "Team 2 Won", "Draw")
        .required()
        .messages({
        "any.only": "Result must be one of 'Team 1 Won', 'Team 2 Won', or 'Draw'.",
        "string.base": "Result must be a string.",
        "any.required": "Result is required.",
    }),
});
// Update match result
const updateMatchResult = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const matchId = Number(req.params.matchId);
        if (isNaN(matchId)) {
            return res.status(400).json({ message: "Invalid match ID format" });
        }
        // Validate input data
        const { error } = resultSchema.validate(req.body, { abortEarly: false });
        if (error) {
            return res.status(400).json({
                message: "Validation error",
                details: error.details.map((detail) => detail.message),
            });
        }
        // Check if the match exists
        const match = yield matchModel_1.default.findByPk(matchId);
        if (!match) {
            return res.status(404).json({ message: "Match not found" });
        }
        // Update and save the result
        match.result = req.body.result;
        yield match.save();
        res.status(200).json({ message: "Match result updated successfully", match });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
exports.updateMatchResult = updateMatchResult;
