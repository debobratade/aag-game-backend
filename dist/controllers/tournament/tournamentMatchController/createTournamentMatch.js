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
exports.createTournamentMatch = void 0;
const entryModel_1 = __importDefault(require("../../../models/tournament/entryModel"));
const tournamentModel_1 = __importDefault(require("../../../models/tournament/tournamentModel"));
const matchForTournamentModel_1 = __importDefault(require("../../../models/tournament/matchForTournamentModel"));
const tournamentMatchValidator_1 = require("../../../validators/tournamentMatchValidator");
// Create new match in a tournament
const createTournamentMatch = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { error: tournamentIdError } = tournamentMatchValidator_1.tournamentIdValidationSchema.validate(req.params);
        if (tournamentIdError) {
            return res.status(400).json({ message: tournamentIdError.details[0].message });
        }
        // Validate request body
        const { error: bodyError } = tournamentMatchValidator_1.matchValidationSchemaForTournament.validate(req.body);
        if (bodyError) {
            return res.status(400).json({ message: bodyError.details[0].message });
        }
        const { tournamentId } = req.params;
        const { team1Id, team2Id, start_time, end_time } = req.body;
        // Validate tournament
        const tournament = yield tournamentModel_1.default.findByPk(tournamentId);
        if (!tournament) {
            return res.status(404).json({ message: 'Tournament not found' });
        }
        // Validate entries (teams)
        const team1 = yield entryModel_1.default.findByPk(team1Id);
        const team2 = yield entryModel_1.default.findByPk(team2Id);
        if (!team1) {
            return res.status(404).json({ message: 'Team 1 not found' });
        }
        if (!team2) {
            return res.status(404).json({ message: 'Team 2 not found' });
        }
        if (team1.status !== 'granted') {
            return res.status(400).json({ message: 'Team 1 is not granted yet' });
        }
        if (team2.status !== 'granted') {
            return res.status(400).json({ message: 'Team 2 is not granted yet' });
        }
        // Create match
        const match = yield matchForTournamentModel_1.default.create({
            tournament_id: tournamentId,
            team1_id: team1Id,
            team2_id: team2Id,
            start_time,
            end_time,
            status: 'Pending',
        });
        return res.status(201).json(match);
    }
    catch (error) {
        console.error('Error creating match:', error);
        return res.status(500).json({ message: 'An error occurred while creating the match.' });
    }
});
exports.createTournamentMatch = createTournamentMatch;
