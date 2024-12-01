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
exports.enterTournament = void 0;
const entryValidators_1 = require("../../../validators/entryValidators");
const tournamentModel_1 = __importDefault(require("../../../models/tournament/tournamentModel"));
const userModel_1 = __importDefault(require("../../../models/userModel"));
const entryModel_1 = __importDefault(require("../../../models/tournament/entryModel"));
// Enter a user into a tournament
const enterTournament = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { tournamentId } = req.params;
        const { userId } = req.body;
        const { error } = (0, entryValidators_1.validateEntryInputs)(tournamentId, userId);
        if (error) {
            return res.status(400).json({
                message: "Validation failed",
                details: error.details.map((detail) => detail.message.replace(/"/g, '')).join(', '),
            });
        }
        const tournament = yield tournamentModel_1.default.findByPk(tournamentId);
        const user = yield userModel_1.default.findByPk(userId);
        if (!tournament) {
            return res.status(404).json({ message: 'Tournament not found' });
        }
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        // Check if the user is already entered into the tournament
        const existingEntry = yield entryModel_1.default.findOne({ where: { tournament_id: tournamentId, user_id: userId } });
        if (existingEntry) {
            return res.status(400).json({ message: 'User is already entered in this tournament' });
        }
        const entry = yield entryModel_1.default.create({
            tournament_id: tournamentId,
            user_id: userId,
            status: 'Pending', // Entry is initially pending
        });
        return res.status(201).json(entry);
    }
    catch (error) {
        return res.status(500).json({ message: error.message });
    }
});
exports.enterTournament = enterTournament;
