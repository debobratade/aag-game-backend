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
exports.createTournament = void 0;
const tournamentValidator_1 = require("../../../validators/tournamentValidator");
const tournamentModel_1 = __importDefault(require("../../../models/tournament/tournamentModel"));
// Create new tournament
const createTournament = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { error, value } = tournamentValidator_1.tournamentCreateValidator.validate(req.body, { abortEarly: false });
        if (error) {
            return res.status(400).json({
                message: "Validation errors",
                details: error.details.map((detail) => detail.message.replace(/"/g, '')).join(', '),
            });
        }
        const { name, start_time, end_time } = value;
        // Additional validation for start_time and end_time
        const currentTime = new Date();
        // Ensure start_time is not in the past
        if (new Date(start_time) < currentTime) {
            return res.status(400).json({ message: 'Start time cannot be in the past' });
        }
        // Ensure end_time is not in the past
        if (new Date(end_time) < currentTime) {
            return res.status(400).json({ message: 'End time cannot be in the past' });
        }
        // Ensure end_time is greater than start_time
        if (new Date(start_time) >= new Date(end_time)) {
            return res.status(400).json({ message: 'End time must be greater than start time' });
        }
        // Check for conflicting tournaments
        const existingTournament = yield tournamentModel_1.default.findOne({
            where: { name },
            order: [['end_time', 'DESC']],
        });
        if (existingTournament) {
            const existingEndDate = new Date(existingTournament.end_time);
            const newStartDate = new Date(start_time);
            if (newStartDate <= existingEndDate) {
                return res.status(400).json({
                    message: `A tournament named ${name} is already scheduled from ${existingTournament.start_time} to ${existingTournament.end_time}.`,
                });
            }
        }
        // Create the tournament if no conflict
        const tournament = yield tournamentModel_1.default.create(value);
        return res.status(201).json({
            message: "Tournament created successfully",
            tournament,
        });
    }
    catch (error) {
        console.error("Error creating tournament:", error);
        return res.status(500).json({ message: "An error occurred while creating the tournament" });
    }
});
exports.createTournament = createTournament;
