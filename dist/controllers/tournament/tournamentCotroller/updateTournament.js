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
exports.updateTournament = void 0;
const tournamentValidator_1 = require("../../../validators/tournamentValidator");
const tournamentModel_1 = __importDefault(require("../../../models/tournament/tournamentModel"));
const updateTournament = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { name, start_time, end_time, description, entry_fee, prize_distribution } = req.body;
    const { error, value } = tournamentValidator_1.tournamentUpdateValidator.validate(req.body, { abortEarly: false });
    if (error) {
        return res.status(400).json({
            message: "Validation errors",
            details: error.details.map((detail) => detail.message.replace(/"/g, '')).join(', '),
        });
    }
    // Additional validation for start_time and end_time
    const currentTime = new Date();
    // Ensure the start time and end time are not in the past
    if (new Date(start_time) < currentTime) {
        return res.status(400).json({ message: 'Start time cannot be in the past' });
    }
    if (new Date(end_time) < currentTime) {
        return res.status(400).json({ message: 'End time cannot be in the past' });
    }
    // Ensure the end time is greater than start time
    if (new Date(start_time) >= new Date(end_time)) {
        return res.status(400).json({ message: 'End time must be greater than start time' });
    }
    try {
        const tournament = yield tournamentModel_1.default.findByPk(id);
        if (!tournament) {
            return res.status(404).json({ message: `Tournament with ID ${id} not found` });
        }
        yield tournament.update(value);
        return res.status(200).json({
            message: "Tournament updated successfully",
            tournament,
        });
    }
    catch (error) {
        console.error("Error updating tournament:", error);
        return res.status(500).json({ message: "An error occurred while updating the tournament" });
    }
});
exports.updateTournament = updateTournament;
