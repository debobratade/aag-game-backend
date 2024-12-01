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
exports.matchmake = void 0;
const joi_1 = __importDefault(require("joi"));
const database_1 = __importDefault(require("../../../database/database"));
const entryModel_1 = __importDefault(require("../../../models/tournament/entryModel"));
const matchForTournamentModel_1 = __importDefault(require("../../../models/tournament/matchForTournamentModel"));
// Joi validation schema for the request body
const matchmakeValidationSchema = joi_1.default.object({
    tournamentId: joi_1.default.number().integer().positive().required().messages({
        'number.base': 'Tournament ID must be a number.',
        'number.integer': 'Tournament ID must be an integer.',
        'number.positive': 'Tournament ID must be positive.',
        'any.required': 'Tournament ID is required.',
    }),
});
// Matchmake for a tournament
const matchmake = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { error } = matchmakeValidationSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }
    const { tournamentId } = req.body;
    // Start a transaction
    const transaction = yield database_1.default.transaction();
    try {
        // Retrieve all pending entries for the tournament
        const pendingEntries = yield entryModel_1.default.findAll({
            where: { tournament_id: tournamentId, status: 'pending' },
            transaction,
        });
        if (pendingEntries.length < 2) {
            yield transaction.rollback();
            return res.status(400).json({ message: 'Not enough participants to matchmake.' });
        }
        // Group entries into pairs and create matches
        const matchesData = [];
        const updatedEntries = [];
        for (let i = 0; i < pendingEntries.length; i += 2) {
            if (i + 1 < pendingEntries.length) {
                const team1 = pendingEntries[i];
                const team2 = pendingEntries[i + 1];
                // Prepare match data for bulk creation
                matchesData.push({
                    tournament_id: tournamentId,
                    team1_id: team1.id,
                    team2_id: team2.id,
                    start_time: new Date(),
                    status: 'Matched',
                });
                // Update entry statuses
                team1.status = 'Matched';
                team2.status = 'Matched';
                updatedEntries.push(team1, team2);
            }
        }
        // Bulk create matches
        const matches = yield matchForTournamentModel_1.default.bulkCreate(matchesData, { transaction });
        // Bulk update entry statuses
        yield entryModel_1.default.bulkCreate(updatedEntries, { updateOnDuplicate: ['status'], transaction });
        // Commit the transaction
        yield transaction.commit();
        return res.status(201).json(matches);
    }
    catch (error) {
        // Rollback the transaction in case of errors
        yield transaction.rollback();
        console.error('Error during matchmaking:', error);
        return res.status(500).json({ message: 'An error occurred during matchmaking.' });
    }
});
exports.matchmake = matchmake;
