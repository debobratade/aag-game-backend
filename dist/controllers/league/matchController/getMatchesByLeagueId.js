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
exports.getMatchesByLeagueId = void 0;
const matchModel_1 = __importDefault(require("../../../models/league/matchModel"));
const teamModel_1 = __importDefault(require("../../../models/league/teamModel"));
const leagueModel_1 = __importDefault(require("../../../models/league/leagueModel"));
// Get all matches in a league
const getMatchesByLeagueId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const leagueId = Number(req.params.leagueId);
        if (isNaN(leagueId)) {
            return res.status(400).json({ message: "Invalid match ID format" });
        }
        const matches = yield matchModel_1.default.findAll({
            where: { leagueId: leagueId },
            include: [
                { model: teamModel_1.default, as: "team1" },
                { model: teamModel_1.default, as: "team2" },
                { model: leagueModel_1.default, as: "league" },
            ],
        });
        res.status(200).json(matches);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
exports.getMatchesByLeagueId = getMatchesByLeagueId;
