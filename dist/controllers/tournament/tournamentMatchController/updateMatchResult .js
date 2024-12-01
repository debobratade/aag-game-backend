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
const tournamentMatchValidator_1 = require("../../../validators/tournamentMatchValidator");
const matchForTournamentModel_1 = __importDefault(require("../../../models/tournament/matchForTournamentModel"));
const updateMatchResult = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { error: paramError } = tournamentMatchValidator_1.matchIdValidationSchema.validate(req.params);
        if (paramError) {
            return res.status(400).json({ message: paramError.details[0].message });
        }
        const { error: bodyError } = tournamentMatchValidator_1.resultValidationSchema.validate(req.body);
        if (bodyError) {
            return res.status(400).json({ message: bodyError.details[0].message });
        }
        const { matchId } = req.params;
        const { result } = req.body;
        const match = yield matchForTournamentModel_1.default.findByPk(matchId);
        if (!match) {
            return res.status(404).json({ message: 'Match not found' });
        }
        match.result = result;
        match.status = 'Completed';
        yield match.save();
        return res.status(200).json({
            message: 'Match result updated successfully',
            match,
        });
    }
    catch (error) {
        console.error('Error updating match result:', error);
        return res.status(500).json({ message: 'An error occurred while updating the match result.' });
    }
});
exports.updateMatchResult = updateMatchResult;
