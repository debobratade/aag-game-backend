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
exports.deleteTournament = void 0;
const entryModel_1 = __importDefault(require("../../../models/tournament/entryModel"));
const matchForTournamentModel_1 = __importDefault(require("../../../models/tournament/matchForTournamentModel"));
const tournamentModel_1 = __importDefault(require("../../../models/tournament/tournamentModel"));
const deleteTournament = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    if (!id || isNaN(Number(id))) {
        return res.status(400).json({ message: 'Invalid tournament ID' });
    }
    try {
        yield entryModel_1.default.destroy({
            where: { tournament_id: id }
        });
        yield matchForTournamentModel_1.default.destroy({
            where: { tournament_id: id }
        });
        const deletedCount = yield tournamentModel_1.default.destroy({
            where: { id }
        });
        if (deletedCount === 0) {
            return res.status(404).json({ message: 'Tournament not found' });
        }
        return res.status(204).end();
    }
    catch (error) {
        console.error('Error deleting tournament:', error);
        return res.status(500).json({ message: 'An error occurred while deleting the tournament' });
    }
});
exports.deleteTournament = deleteTournament;
