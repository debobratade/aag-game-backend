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
exports.deleteLeague = void 0;
const leagueModel_1 = __importDefault(require("../../../models/league/leagueModel"));
const matchModel_1 = __importDefault(require("../../../models/league/matchModel"));
const teamModel_1 = __importDefault(require("../../../models/league/teamModel"));
// Delete league
const deleteLeague = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Find the league by ID
        const league = yield leagueModel_1.default.findByPk(req.params.id);
        if (!league) {
            return res.status(404).json({ message: 'League not found' });
        }
        // Delete associated matches and teams
        yield matchModel_1.default.destroy({ where: { leagueId: req.params.id } });
        yield teamModel_1.default.destroy({ where: { leagueId: req.params.id } });
        // Delete the league
        yield league.destroy();
        res.status(204).end();
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
exports.deleteLeague = deleteLeague;
